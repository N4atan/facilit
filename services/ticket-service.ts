
import { prisma } from "@/lib/prisma";
import { Prisma, Ticket } from "@prisma/client";

export type TicketWithAuthor = Prisma.TicketGetPayload<{
    include: {
        author: {
            select: {
                id: true;
                name: true;
                email: true;
            }
        }
    }
}>;

export async function createNewTicket(ticket: Prisma.TicketUncheckedCreateInput): Promise<Ticket> {
    return prisma.ticket.create({
        data: ticket
    });
}

export async function getAllTickets(): Promise<TicketWithAuthor[]> {
    return prisma.ticket.findMany({
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            }
        },
        orderBy: {
            openAt: "desc"
        }
    });
}

export async function getTicketByIdCSC(id_csc: string): Promise<TicketWithAuthor | null> {
    return prisma.ticket.findUnique({
        where: { id_csc },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            }
        }
    });
}

export async function deleteTicketByIdCSC(id_csc: string): Promise<Ticket> {
    return prisma.ticket.delete({ where: { id_csc } });
}

export async function updateTicketById(id_csc: string, ticket: Prisma.TicketUpdateInput): Promise<Ticket> {
    return prisma.ticket.update({
        where: { id_csc },
        data: ticket
    });
}

export async function getTicketsByUser(userId: string): Promise<TicketWithAuthor[]> {
    return prisma.ticket.findMany({
        where: { authorId: userId },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            }
        }
    });
}

export async function checkDuplicateTicket(id_csc: string): Promise<boolean> {
    const ticket = await prisma.ticket.count({ where: { id_csc } });
    return ticket > 0;
}