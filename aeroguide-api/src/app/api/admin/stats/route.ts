import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { withAdmin } from '@/lib/middleware';
import { JWTPayload } from '@/lib/jwt';

// GET /api/admin/stats - Get dashboard statistics
async function getStats(req: NextRequest, user: JWTPayload) {
  try {
    // Get counts
    const [
      { count: schoolsCount },
      { count: usersCount },
      { count: reviewsCount },
      { count: pendingReviewsCount },
      { count: inquiriesCount },
      { count: pendingInquiriesCount },
      { count: messagesCount },
      { count: newMessagesCount },
    ] = await Promise.all([
      supabaseAdmin.from('schools').select('*', { count: 'exact', head: true }).eq('is_active', true),
      supabaseAdmin.from('users').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('reviews').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('reviews').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabaseAdmin.from('inquiries').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabaseAdmin.from('contact_messages').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    ]);

    // Get recent activity
    const { data: recentReviews } = await supabaseAdmin
      .from('reviews')
      .select('id, rating, created_at, school:schools(name), user:users(name)')
      .order('created_at', { ascending: false })
      .limit(5);

    const { data: recentInquiries } = await supabaseAdmin
      .from('inquiries')
      .select('id, name, inquiry_type, created_at, school:schools(name)')
      .order('created_at', { ascending: false })
      .limit(5);

    return NextResponse.json({
      stats: {
        schools: schoolsCount || 0,
        users: usersCount || 0,
        reviews: {
          total: reviewsCount || 0,
          pending: pendingReviewsCount || 0,
        },
        inquiries: {
          total: inquiriesCount || 0,
          pending: pendingInquiriesCount || 0,
        },
        messages: {
          total: messagesCount || 0,
          new: newMessagesCount || 0,
        },
      },
      recent: {
        reviews: recentReviews || [],
        inquiries: recentInquiries || [],
      },
    });
  } catch (error) {
    console.error('Get stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}

export const GET = withAdmin(getStats);
