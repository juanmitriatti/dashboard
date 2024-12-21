'use client'; // Required to mark this as a Client Component

import { SessionProvider } from "next-auth/react";

export default function SessionProviderWrapper({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}