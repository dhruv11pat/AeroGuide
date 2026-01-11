import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/middleware';
import { supabaseAdmin } from '@/lib/supabase';
import { JWTPayload } from '@/lib/jwt';

// GET /api/auth/me - Get current user
async function handler(req: NextRequest, user: JWTPayload) {
  try {
    const { data: userData, error } = await supabaseAdmin
      .from('users')
      .select('id, email, name, picture, role, created_at')
      .eq('id', user.userId)
      .single();

    if (error || !userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user: userData });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Failed to get user' },
      { status: 500 }
    );
  }
}

export const GET = withAuth(handler);
