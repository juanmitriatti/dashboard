import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { sql } from '@vercel/postgres';

export const authConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Credentials not provided');
        }

        const { email, password } = credentials;

        const result = await sql`
          SELECT * FROM users WHERE email = ${email}
        `;

        const user = result.rows[0];

        if (!user) {
          throw new Error('No user found with this email');
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
          throw new Error('Invalid password');
        }

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    // JWT Callback
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    // Session Callback
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
        };
      }
      return session;
    },

    // Custom Authorization Logic
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
};
