import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { withAdmin } from '@/lib/middleware';
import { JWTPayload } from '@/lib/jwt';

// GET /api/reviews - Get all reviews (admin - for moderation)
async function getAllReviews(req: NextRequest, user: JWTPayload) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status'); // pending, approved, rejected, or all
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabaseAdmin
      .from('reviews')
      .select(`
        *,
        user:users(name, email, picture),
        school:schools(name, location)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status && status !== 'all') {
      query = query.eq('status', status as "pending" | "approved" | "rejected");
    }

    const { data: reviews, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      reviews,
      total: count || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export const GET = withAdmin(getAllReviews);
