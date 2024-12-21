import NextAuth from 'next-auth';
import { authConfig } from '@/app/lib/auth';

export const runtime = 'nodejs'; // Explicitly set Node.js runtime

export default NextAuth(authConfig);
