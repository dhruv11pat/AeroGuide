import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { withAuth, withAdmin } from '@/lib/middleware';
import { createReviewSchema, updateReviewStatusSchema } from '@/lib/validations';
import { JWTPayload } from '@/lib/jwt';

// GET /api/schools/[id]/reviews - Get reviews for a school
async function getReviews(
  req: NextRequest,
  user: JWTPayload,
  context?: { params: Record<string, string> }
) {
  try {
    const id = context?.params?.id;
    if (!id) {
        return NextResponse.json({ error: 'School ID required' }, { status: 400 });
    }
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'approved';

    const { data: reviews, error } = await supabase
      .from('reviews')
      .select(`
        id,
        rating,
        text,
        course,
        status,
        created_at,
        user:users(name, picture)
      `)
      .eq('school_id', id)
      .eq('status', status as "pending" | "approved" | "rejected")
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Get reviews error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// POST /api/schools/[id]/reviews - Create a review (authenticated)
async function createReview(
  req: NextRequest,
  user: JWTPayload,
  context?: { params: Record<string, string> }
) {
  try {
    const schoolId = context?.params?.id;
    if (!schoolId) {
      return NextResponse.json({ error: 'School ID required' }, { status: 400 });
    }

    const body = await req.json();
    
    // Validate input
    const result = createReviewSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: result.error.flatten() },
        { status: 400 }
      );
    }

    // Check if school exists
    const { data: school } = await supabase
      .from('schools')
      .select('id')
      .eq('id', schoolId)
      .eq('is_active', true)
      .single();

    if (!school) {
      return NextResponse.json(
        { error: 'School not found' },
        { status: 404 }
      );
    }

    // Check if user already reviewed this school
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('id')
      .eq('school_id', schoolId)
      .eq('user_id', user.userId)
      .single();

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this school' },
        { status: 409 }
      );
    }

    // Create review
    const { data: review, error } = await supabase
      .from('reviews')
      .insert({
        school_id: schoolId,
        user_id: user.userId,
        ...result.data,
        status: 'pending', // Reviews require approval
      })
      .select(`
        id,
        rating,
        text,
        course,
        status,
        created_at
      `)
      .single();

    if (error) throw error;

    return NextResponse.json({ 
      review,
      message: 'Review submitted and pending approval'
    }, { status: 201 });
  } catch (error) {
    console.error('Create review error:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}

export const POST = withAuth(createReview);
export const GET = withAuth(getReviews);
