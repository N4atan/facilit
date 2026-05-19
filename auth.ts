import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config"

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

        // 2. Verifique a senha (use bcrypt para comparar)
        const isValid = await bcrypt.compare(credentials.password as string, user.password);

        if (!isValid) return null

        return user
      },
    }),
  ],
  session: { strategy: "jwt" }, // Obrigatório ao usar Credentials
})