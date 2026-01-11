import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createContactSchema } from '@/lib/validations';

// POST /api/contact - Submit contact form
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const result = createContactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: result.error.flatten() },
        { status: 400 }
      );
    }

    // Create contact message
    const { data: message, error } = await supabase
      .from('contact_messages')
      .insert(result.data)
      .select()
      .single();

    if (error) throw error;

    // TODO: Send email notification to admin
    // This would integrate with SendGrid/Resend

    return NextResponse.json({ 
      message: 'Message sent successfully',
      id: message.id
    }, { status: 201 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
