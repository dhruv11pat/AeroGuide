import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, supabase } from '@/lib/supabase';
import { withAdmin, withOptionalAuth } from '@/lib/middleware';
import { createSchoolSchema, schoolSearchSchema } from '@/lib/validations';
import { JWTPayload } from '@/lib/jwt';

// GET /api/schools - List schools with search/filter
async function getSchools(req: NextRequest, user: JWTPayload | null) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Parse query params
    const params = schoolSearchSchema.safeParse({
      limit: searchParams.get('limit') || undefined,
      offset: searchParams.get('offset') || undefined,
      search: searchParams.get('search') || undefined,
      location: searchParams.get('location') || undefined,
      certification: searchParams.get('certification') || undefined,
      minRating: searchParams.get('minRating') || undefined,
    });

    if (!params.success) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: params.error.flatten() },
        { status: 400 }
      );
    }

    const { limit, offset, search, location, certification, minRating } = params.data;

    // Build query
    let query = supabase
      .from('schools')
      .select('*, training_programs(*)', { count: 'exact' })
      .eq('is_active', true)
      .order('rating', { ascending: false });

    // Apply filters
    if (search) {
      query = query.or(`name.ilike.%${search}%,location.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (location) {
      query = query.ilike('location', `%${location}%`);
    }

    if (certification) {
      query = query.contains('certifications', [certification]);
    }

    if (minRating) {
      query = query.gte('rating', minRating);
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: schools, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      schools,
      total: count || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Get schools error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch schools' },
      { status: 500 }
    );
  }
}

// POST /api/schools - Create a new school (admin only)
async function createSchool(req: NextRequest, user: JWTPayload) {
  try {
    const body = await req.json();
    
    // Validate input
    const result = createSchoolSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { programs, ...schoolData } = result.data;

    // Create school
    const { data: school, error: schoolError } = await supabaseAdmin
      .from('schools')
      .insert({
        ...schoolData,
        email: schoolData.email || null,
        website: schoolData.website || null,
      })
      .select()
      .single();

    if (schoolError) throw schoolError;

    // Create training programs if provided
    if (programs && programs.length > 0) {
      const programsWithSchoolId = programs.map((p: any) => ({
        ...p,
        school_id: school.id,
      }));

      const { error: programsError } = await supabaseAdmin
        .from('training_programs')
        .insert(programsWithSchoolId);

      if (programsError) {
        console.error('Error creating programs:', programsError);
      }
    }

    // Fetch complete school with programs
    const { data: completeSchool } = await supabaseAdmin
      .from('schools')
      .select('*, training_programs(*)')
      .eq('id', school.id)
      .single();

    return NextResponse.json({ school: completeSchool }, { status: 201 });
  } catch (error) {
    console.error('Create school error:', error);
    return NextResponse.json(
      { error: 'Failed to create school' },
      { status: 500 }
    );
  }
}

export const GET = withOptionalAuth(getSchools);
export const POST = withAdmin(createSchool);
