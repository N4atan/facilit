import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

export default NextAuth(authConfig).auth((req) => {
  const isLoggedIn = !!req.auth
  const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register")
  const isRootPage = req.nextUrl.pathname === "/"

  // Se estiver acessando a raiz do site ("/")
  if (isRootPage) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/chamados/csc", req.nextUrl))
    }
    return Response.redirect(new URL("/login", req.nextUrl))
  }

  // Lógica para a tela de login
  if (isAuthPage) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/usuarios", req.nextUrl))
    }
    return null
  }

  // Qualquer outra rota: se não estiver logado, manda pro login
  if (!isLoggedIn && !isAuthPage) {
    return Response.redirect(new URL("/login", req.nextUrl))
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}