import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin')
  
  // Get allowed origins from env or default to *
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || '*')
    .split(',')
    .map(o => o.trim())
    
  // Check if origin is allowed
  const isAllowed = allowedOrigins.includes('*') || (origin && allowedOrigins.includes(origin))
  
  // Handle preflight options request
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 200 })
    
    if (isAllowed && origin) {
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT,OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization')
      response.headers.set('Access-Control-Allow-Credentials', 'true')
    }
    
    return response
  }
  
  // Handle simple requests
  const response = NextResponse.next()
  
  if (isAllowed && origin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT,OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }

  return response
}

export const config = {
  matcher: '/api/:path*',
}
