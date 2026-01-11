import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { generateToken } from '@/lib/jwt';
import { registerSchema } from '@/lib/validations';
import bcrypt from 'bcryptjs';

// POST /api/auth/register - Email/password registration
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { email, password, name } = result.data;

    // Check if user exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password (stored separately or in a password_hash column if needed)
    // For now, we're focusing on Google OAuth, but this is here for future expansion
    const passwordHash = await bcrypt.hash(password, 12);

    // Create new user
    const { data: newUser, error } = await supabaseAdmin
      .from('users')
      .insert({
        email,
        name,
        role: 'user',
      })
      .select()
      .single();

    if (error) throw error;

    // Generate JWT token
    const token = generateToken(newUser);

    return NextResponse.json({
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        picture: newUser.picture,
        role: newUser.role,
      },
      token,
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
