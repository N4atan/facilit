"use server";

import { createNewTicket, deleteTicketByIdCSC, getAllTickets, TicketWithAuthor, updateTicketById } from "@/services/ticket-service";
import { Ticket, Prisma } from "@prisma/client";
import { TicketStatus } from "@/lib/enums";
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

export async function handleUpdateTicket(
    id_csc: string,
    ticketData: {
        category: string;
        description: string;
        openAt: Date;
        status: TicketStatus;
        closedAt?: Date | null;
    }
): Promise<Ticket> {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            throw new Error("Usuário não autenticado");
        }

        ticketData.closedAt = 
            (ticketData.status === TicketStatus.RESOLVIDO && !ticketData.closedAt) 
            ? new Date() : null;

        const updatedTicket = await updateTicketById(id_csc, {
            category: ticketData.category,
            description: ticketData.description,
            openAt: ticketData.openAt,
            status: ticketData.status,
            closedAt: ticketData.closedAt
        });

        revalidatePath("/chamados/csc");
        return updatedTicket;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message || "Erro desconhecido ao atualizar chamado.");
    }
}

export async function handleDeleteTicketByIdCSC(id_csc: string) {
    try {
        await deleteTicketByIdCSC(id_csc);
        revalidatePath("/chamados/csc");
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message || "Erro desconhecido ao deletar chamado.");
    }
}