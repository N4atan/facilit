'use server'

import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"


export async function authenticate({ email, password }: { email: string, password: string }) {
  try {
    // O primeiro argumento é o ID do provider ("credentials")
    // O segundo são os dados do formulário
    await signIn("credentials", { email, password })
    
  } catch (error) {
    if (error instanceof AuthError) {

      switch (error.type) {
        case "CredentialsSignin":
          return "E-mail ou senha inválidos."
        default:
          return "Ocorreu um erro inesperado."
      }
    }
    // IMPORTANTE: Você precisa lançar o erro novamente se não for um AuthError
    // porque o NextAuth usa redirecionamentos que funcionam lançando erros internamente.
    throw error
  }
}


export async function logout() {
    try {
        await signOut({ redirectTo: '/login'})
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "E-mail ou senha inválidos."
                default:
                    return "Ocorreu um erro inesperado."
            }
        }
        throw error
    }
}