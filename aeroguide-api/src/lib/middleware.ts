import { NextRequest, NextResponse } from 'next/server';
import { extractTokenFromHeader, verifyToken, JWTPayload } from './jwt';

export interface AuthenticatedRequest extends NextRequest {
  user?: JWTPayload;
}

export type RouteHandler = (
  req: NextRequest,
  context?: { params: Record<string, string> }
) => Promise<NextResponse>;

export type AuthenticatedRouteHandler = (
  req: NextRequest,
  user: JWTPayload,
  context?: { params: Record<string, string> }
) => Promise<NextResponse>;

// Middleware to check if user is authenticated
export function withAuth(handler: AuthenticatedRouteHandler): RouteHandler {
  return async (req: NextRequest, context?: { params: Record<string, string> }) => {
    const authHeader = req.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    return handler(req, payload, context);
  };
}

// Middleware to check if user is an admin
export function withAdmin(handler: AuthenticatedRouteHandler): RouteHandler {
  return async (req: NextRequest, context?: { params: Record<string, string> }) => {
    const authHeader = req.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    if (payload.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    return handler(req, payload, context);
  };
}

// Optional auth - doesn't fail if no token, but attaches user if present
export function withOptionalAuth(
  handler: (req: NextRequest, user: JWTPayload | null, context?: { params: Record<string, string> }) => Promise<NextResponse>
): RouteHandler {
  return async (req: NextRequest, context?: { params: Record<string, string> }) => {
    const authHeader = req.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);

    let user: JWTPayload | null = null;
    if (token) {
      user = verifyToken(token);
    }

    return handler(req, user, context);
  };
}

// Helper to create consistent API responses
export function apiResponse<T>(data: T, status: number = 200): NextResponse {
  return NextResponse.json(data, { status });
}

export function apiError(message: string, status: number = 400): NextResponse {
  return NextResponse.json({ error: message }, { status });
}
