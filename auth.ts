import NextAuth, { CredentialsSignin, type DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config"
import { JWT } from "next-auth/jwt"


declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    role?: string
  }
}

export class UserInactiveError extends CredentialsSignin {
  code = "user_inactive"
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      // Aqui configuramos o login por E-mail e Senha
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // 1. Busque o usuário no seu banco via Prisma
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user) return null

        if (user.status !== 'ATIVO') {
          throw new UserInactiveError();
        }

        // 2. Verifique a senha (use bcrypt para comparar)
        const isValid = await bcrypt.compare(credentials.password as string, user.password);

        if (!isValid) return null;

        return user
      },
    }),
  ],
  session: { strategy: "jwt" }, // Obrigatório ao usar Credentials
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
      }
      if (token.role) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
})