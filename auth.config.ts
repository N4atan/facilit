import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [], // Será configurado no auth.ts
} satisfies NextAuthConfig
