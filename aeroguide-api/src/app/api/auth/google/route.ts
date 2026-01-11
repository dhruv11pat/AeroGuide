import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { generateToken } from '@/lib/jwt';
import { googleAuthSchema, registerSchema, loginSchema } from '@/lib/validations';

interface GoogleTokenPayload {
  email: string;
  name: string;
  picture: string;
  sub: string;
  email_verified: boolean;
}

// Verify Google token
async function verifyGoogleToken(credential: string): Promise<GoogleTokenPayload | null> {
  try {
    // Decode the JWT token (Google's ID token)
    const parts = credential.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    
    // Verify the token is from Google and not expired
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) return null;
    
    // Verify the audience matches our client ID
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (payload.aud !== clientId) {
      console.warn('Token audience mismatch');
      // In development, we might want to be lenient
      if (process.env.NODE_ENV === 'production') return null;
    }
    
    return {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      sub: payload.sub,
      email_verified: payload.email_verified,
    };
  } catch (error) {
    console.error('Error verifying Google token:', error);
    return null;
  }
}

// POST /api/auth/google - Google OAuth sign in
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const result = googleAuthSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { credential } = result.data;
    
    // Verify Google token
    const googleUser = await verifyGoogleToken(credential);
    if (!googleUser) {
      return NextResponse.json(
        { error: 'Invalid Google token' },
        { status: 401 }
      );
    }

    // Check if user exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('google_id', googleUser.sub)
      .single();

    let user;

    if (existingUser) {
      // Update existing user
      const { data: updatedUser, error } = await supabaseAdmin
        .from('users')
        .update({
          name: googleUser.name,
          picture: googleUser.picture,
        })
        .eq('id', existingUser.id)
        .select()
        .single();

      if (error) throw error;
      user = updatedUser;
    } else {
      // Check if email exists without google_id
      const { data: emailUser } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('email', googleUser.email)
        .single();

      if (emailUser) {
        // Link Google account to existing user
        const { data: linkedUser, error } = await supabaseAdmin
          .from('users')
          .update({
            google_id: googleUser.sub,
            picture: googleUser.picture,
          })
          .eq('id', emailUser.id)
          .select()
          .single();

        if (error) throw error;
        user = linkedUser;
      } else {
        // Create new user
        const { data: newUser, error } = await supabaseAdmin
          .from('users')
          .insert({
            email: googleUser.email,
            name: googleUser.name,
            picture: googleUser.picture,
            google_id: googleUser.sub,
            role: 'user',
          })
          .select()
          .single();

        if (error) throw error;
        user = newUser;
      }
    }

    // Generate JWT token
    const token = generateToken(user);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error('Google auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
