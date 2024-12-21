import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};



export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Skip middleware for `/api/auth` routes
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Add other middleware logic here
  return NextResponse.next();
}