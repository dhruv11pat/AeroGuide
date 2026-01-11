import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { withAdmin } from '@/lib/middleware';
import { updateReviewStatusSchema } from '@/lib/validations';
import { JWTPayload } from '@/lib/jwt';

// PATCH /api/reviews/[id] - Update review status (admin only)
async function updateReviewStatus(
  req: NextRequest,
  user: JWTPayload,
  context?: { params: Record<string, string> }
) {
  try {
    const reviewId = context?.params?.id;
    if (!reviewId) {
      return NextResponse.json({ error: 'Review ID required' }, { status: 400 });
    }

    const body = await req.json();
    
    // Validate input
    const result = updateReviewStatusSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { status } = result.data;

    // Update review status
    const { data: review, error } = await supabaseAdmin
      .from('reviews')
      .update({ status })
      .eq('id', reviewId)
      .select(`
        *,
        user:users(name, picture),
        school:schools(name)
      `)
      .single();

    if (error) throw error;

    return NextResponse.json({ review });
  } catch (error) {
    console.error('Update review error:', error);
    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    );
  }
}

// DELETE /api/reviews/[id] - Delete review (admin only)
async function deleteReview(
  req: NextRequest,
  user: JWTPayload,
  context?: { params: Record<string, string> }
) {
  try {
    const reviewId = context?.params?.id;
    if (!reviewId) {
      return NextResponse.json({ error: 'Review ID required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('reviews')
      .delete()
      .eq('id', reviewId);

    if (error) throw error;

    return NextResponse.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Delete review error:', error);
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    );
  }
}

export const PATCH = withAdmin(updateReviewStatus);
export const DELETE = withAdmin(deleteReview);
