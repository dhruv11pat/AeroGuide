import { sign, verify } from 'jsonwebtoken';
import { User } from './database.types';

// Lazy getters for environment variables to ensure they're available at runtime
const getJWTSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return secret;
};

const getJWTExpiresIn = () => process.env.JWT_EXPIRES_IN || '7d';

export interface JWTPayload {
  userId: string;
  email: string;
  role: 'user' | 'admin';
  iat?: number;
  exp?: number;
}

export function generateToken(user: User): string {
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  return sign(payload, getJWTSecret(), {
    expiresIn: getJWTExpiresIn() as any,
  });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = verify(token, getJWTSecret()) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader) return null;
  
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }
  
  return parts[1];
}
