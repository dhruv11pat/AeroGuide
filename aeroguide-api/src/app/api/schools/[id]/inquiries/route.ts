import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { withAuth } from '@/lib/middleware';
import { createInquirySchema } from '@/lib/validations';
import { JWTPayload } from '@/lib/jwt';

// GET /api/schools/[id]/inquiries - Get inquiries for a school (for school admin)
async function getInquiries(
  req: NextRequest,
  user: JWTPayload,
  context?: { params: Record<string, string> }
) {
  try {
    const id = context?.params?.id;

    if (!id) {
        return NextResponse.json({ error: 'School ID required' }, { status: 400 });
    }

    const { data: inquiries, error } = await supabase
      .from('inquiries')
      .select('*')
      .eq('school_id', id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ inquiries });
  } catch (error) {
    console.error('Get inquiries error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

// POST /api/schools/[id]/inquiries - Submit an inquiry
async function createInquiry(
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
    const result = createInquirySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: result.error.flatten() },
        { status: 400 }
      );
    }

    // Check if school exists
    const { data: school } = await supabase
      .from('schools')
      .select('id, name, email')
      .eq('id', schoolId)
      .eq('is_active', true)
      .single();

    if (!school) {
      return NextResponse.json(
        { error: 'School not found' },
        { status: 404 }
      );
    }

    // Create inquiry using admin client to bypass RLS
    const { data: inquiry, error } = await supabaseAdmin
      .from('inquiries')
      .insert({
        school_id: schoolId,
        user_id: user?.userId || null,
        ...result.data,
      })
      .select()
      .single();

    if (error) throw error;

    // TODO: Send email notification to school
    // This would integrate with SendGrid/Resend

    return NextResponse.json({ 
      inquiry,
      message: 'Inquiry submitted successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Create inquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}

export const POST = withAuth(createInquiry);
export const GET = withAuth(getInquiries);
