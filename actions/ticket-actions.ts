"use server";

import { createNewTicket, getAllTickets, TicketWithAuthor } from "@/services/ticket-service";
import { Ticket, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { getUserByEmail } from "@/services/user-service";

export async function handleFetchAllTickets(): Promise<TicketWithAuthor[]> {
    try {
        return await getAllTickets();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function handleCreateNewTicket(ticketData: {
    id_csc: string;
    category: string;
    description: string;
    openAt: Date;
}): Promise<Ticket> {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            throw new Error("Usuário não autenticado");
        }

        const user = await getUserByEmail(session.user.email);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        const newTicket = await createNewTicket({
            id_csc: ticketData.id_csc,
            category: ticketData.category,
            description: ticketData.description,
            authorId: user.id,
            openAt: ticketData.openAt,
        });

        revalidatePath("/chamados/csc");
        return newTicket;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message || "Erro desconhecido ao criar chamado.");
    }
}