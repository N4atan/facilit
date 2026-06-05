"use client";

import { Calendar } from "lucide-react";
import { TicketStatus } from "@/lib/enums";
import { TicketWithAuthor } from "@/services/ticket-service";
import TicketCreateModal from "./ticket-create-modal";
import { CardTicketKanban } from "../ui/cards/card-ticket-kanban";

interface TicketKanbanColumnProps {
    status: TicketStatus;
    tickets: TicketWithAuthor[];
}

const STATUS_CONFIG: Record<TicketStatus, { label: string; dotClass: string }> = {
    ABERTO: { label: "Aberto", dotClass: "bg-primary" },
    EM_ANDAMENTO: { label: "Em Andamento", dotClass: "bg-warning" },
    RESOLVIDO: { label: "Resolvido", dotClass: "bg-success" },
    CANCELADO: { label: "Cancelado", dotClass: "bg-error" },
};

export default function TicketKanbanColumn({ status, tickets }: TicketKanbanColumnProps) {
    const config = STATUS_CONFIG[status];
    const filteredTickets = tickets.filter((ticket) => ticket.status === status);
    console.log(filteredTickets)
    return (
        <div className="border border-base-content/10 rounded-lg p-4 gap-5 bg-base-200 flex flex-col h-full">
            <div className="flex gap-2 items-center mb-2">
                <div className={`w-3 h-3 rounded-full ${config.dotClass}`}></div>
                <h2 className="text-sm font-semibold text-content/60 text-left">
                    {config.label} ({filteredTickets.length})
                </h2>
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto max-h-[70vh] pr-1">
                {filteredTickets.length === 0 ? (
                    <div className="p-8 text-center text-xs text-content/40 border border-dashed border-base-content/15 rounded-lg bg-base-100/50">
                        Nenhum chamado
                    </div>
                ) : (
                    filteredTickets.map((ticket) => (
                        <CardTicketKanban key={ticket.id} ticket={ticket} />
                    ))
                )}
            </div>
        </div>
    );
}
