import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, supabase } from '@/lib/supabase';
import { withAdmin, withOptionalAuth } from '@/lib/middleware';
import { updateSchoolSchema } from '@/lib/validations';
import { JWTPayload } from '@/lib/jwt';

// GET /api/schools/[id] - Get single school with all details
async function getSchool(
  req: NextRequest,
  user: JWTPayload | null,
  context?: { params: Record<string, string> }
) {
  try {
    const params = context?.params;
    const id = params?.id;

    if (!id) {
        return NextResponse.json({ error: 'School ID required' }, { status: 400 });
    }

    // Fetch school with programs and approved reviews
    const { data: school, error } = await supabase
      .from('schools')
      .select(`
        *,
        training_programs(*),
        reviews(
          id,
          rating,
          text,
          course,
          created_at,
          user:users(name, picture)
        )
      `)
      .eq('id', id)
      .eq('is_active', true)
      .eq('reviews.status', 'approved')
      .single();

    if (error || !school) {
      return NextResponse.json(
        { error: 'School not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ school });
  } catch (error) {
    console.error('Get school error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch school' },
      { status: 500 }
    );
  }
}

// PUT /api/schools/[id] - Update school (admin only)
async function updateSchool(
  req: NextRequest,
  user: JWTPayload,
  context?: { params: Record<string, string> }
) {
  try {
    const id = context?.params?.id;
    if (!id) {
      return NextResponse.json({ error: 'School ID required' }, { status: 400 });
    }

    const body = await req.json();
    
    // Validate input
    const result = updateSchoolSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { programs, ...schoolData } = result.data;

    // Update school
    const { data: school, error: schoolError } = await supabaseAdmin
      .from('schools')
      .update(schoolData)
      .eq('id', id)
      .select()
      .single();

    if (schoolError) throw schoolError;

    // Update programs if provided
    if (programs !== undefined) {
      // Delete existing programs
      await supabaseAdmin
        .from('training_programs')
        .delete()
        .eq('school_id', id);

      // Insert new programs
      if (programs.length > 0) {
        const programsWithSchoolId = programs.map((p: any) => ({
          ...p,
          school_id: id,
        }));

        await supabaseAdmin
          .from('training_programs')
          .insert(programsWithSchoolId);
      }
    }

    // Fetch complete school
    const { data: completeSchool } = await supabaseAdmin
      .from('schools')
      .select('*, training_programs(*)')
      .eq('id', id)
      .single();

    return NextResponse.json({ school: completeSchool });
  } catch (error) {
    console.error('Update school error:', error);
    return NextResponse.json(
      { error: 'Failed to update school' },
      { status: 500 }
    );
  }
}

// DELETE /api/schools/[id] - Soft delete school (admin only)
async function deleteSchool(
  req: NextRequest,
  user: JWTPayload,
  context?: { params: Record<string, string> }
) {
  try {
    const id = context?.params?.id;
    if (!id) {
      return NextResponse.json({ error: 'School ID required' }, { status: 400 });
    }

    // Soft delete by setting is_active to false
    const { error } = await supabaseAdmin
      .from('schools')
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ message: 'School deleted successfully' });
  } catch (error) {
    console.error('Delete school error:', error);
    return NextResponse.json(
      { error: 'Failed to delete school' },
      { status: 500 }
    );
  }
}

export const GET = withOptionalAuth(getSchool);
export const PUT = withAdmin(updateSchool);
export const DELETE = withAdmin(deleteSchool);
