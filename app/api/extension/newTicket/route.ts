import { auth } from "@/auth"
import { prisma } from "@/lib/prisma";
import { getUserByName } from "@/services/user-service";
import { revalidatePath } from "next/cache";

function getCorsHeaders(origin: string | null) {
    const originToUse = origin || "https://csc.senacrs.com.br";
    return {
        "Access-Control-Allow-Origin": originToUse,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
    };
}

export async function OPTIONS(req: Request) {
    const origin = req.headers.get("origin");
    return new Response(null, {
        status: 204,
        headers: getCorsHeaders(origin),
    });
}

export async function POST(req: Request) {
    const origin = req.headers.get("origin");
    const responseHeaders = getCorsHeaders(origin);

    try {
        const { id_csc, description, category, openAt, status, authorName } = await req.json();

        if (!id_csc || !description || !category || !openAt || !status || !authorName) {
            return new Response("Dados inválidos", {
                status: 400,
                headers: responseHeaders
            });
        }

        const user = await getUserByName(authorName);

        if (!user) {
            return new Response("Usuário não encontrado", {
                status: 404,
                headers: responseHeaders
            });
        }

        const ticket = await prisma.ticket.create({
            data: {
                id_csc,
                description,
                category,
                openAt: new Date(openAt),
                status,
                authorId: user.id
            },
        });

        revalidatePath("/chamados/csc");
        
        return new Response(JSON.stringify({ message: "Chamado criado com sucesso", ticket }), {
            status: 201,
            headers: {
                ...responseHeaders,
                "Content-Type": "application/json"
            }
        });

    } catch (error) {
        console.error(error);
        return new Response("Erro ao criar chamado", {
            status: 500,
            headers: responseHeaders
        });
    }
}