import { redirect } from "next/navigation";

export default function RootPage() {
    // O redirecionamento real e proteção de rotas acontece no middleware (proxy.ts).
    // Esta página existe para evitar erros do Turbopack (Failed to write app endpoint /page)
    // caso ele tente compilar a raiz do projeto de forma proativa.
    redirect("/chamados/csc");
}
