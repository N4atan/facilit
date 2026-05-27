"use client";

import { Calendar } from "lucide-react";
import { TicketStatus } from "@/lib/enums";
import { TicketWithAuthor } from "@/services/ticket-service";
import TicketCreateModal from "./ticket-create-modal";

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
                        <div
                            key={ticket.id}
                            className="card bg-base-100 border border-base-content/10 hover:border-base-content/30 transition-all duration-300 rounded-lg p-4 gap-4 shadow-xs"
                        >
                            <div className="flex justify-between items-start gap-2">
                                <p className="card-title text-md font-semibold text-content/80 text-left">
                                    {ticket.category}
                                </p>
                                <span className="text-xs font-mono bg-base-200 px-2 py-0.5 rounded text-content/60 shrink-0">
                                    #{ticket.id_csc}
                                </span>
                            </div>
                            <p className="text-sm text-content/70 text-left break-words">
                                {ticket.description}
                            </p>

                            <div className="card-actions justify-between items-center mt-2 pt-2 border-t border-base-content/5">
                                <div className="badge badge-ghost gap-1.5 text-xs">
                                    <Calendar size={12} />
                                    {new Date(ticket.openAt).toLocaleDateString("pt-BR", { timeZone: "UTC" })}
                                </div>

                                <div className="flex items-center gap-2">
                                    <TicketCreateModal isEditing ticket={ticket} />
                                    <div className="tooltip tooltip-left" data-tip={ticket.author.name}>
                                        <div className="avatar">
                                            <div className="w-8 h-8 rounded-full bg-neutral text-neutral-content flex justify-center items-center">
                                                <span className="text-xs font-bold">
                                                    {ticket.author.name.slice(0, 1).toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
