import TicketCreateModal from "@/components/layout/ticket-create-modal"
import { TicketWithAuthor } from "@/services/ticket-service"
import { TicketStatus } from "@prisma/client";
import { Calendar, Clock, CheckCircle2, X } from "lucide-react"

const badgeComponent = (status: TicketStatus, date: Date) => {
    <div className={`badge ${status === TicketStatus.ABERTO ? "badge-success" : status === TicketStatus.EM_ANDAMENTO ? "badge-warning" : "badge-error"} gap-1.5 text-xs`}>
        {status === TicketStatus.ABERTO ? <Calendar size={12} /> : status === TicketStatus.EM_ANDAMENTO ? <Clock size={12} /> : <CheckCircle2 size={12} />}
        {new Date(date).toLocaleDateString("pt-BR", { timeZone: "UTC" })}
    </div>
}

type Props = {
    ticket: TicketWithAuthor
}

export const CardTicketKanban = ({ ticket }: Props) => {
    return (
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



                {ticket.status == TicketStatus.EM_ANDAMENTO && (
                    <div className="badge badge-ghost gap-1.5 text-xs">
                        <Clock size={12} />
                        {new Date(ticket.openAt).toLocaleDateString("pt-BR", { timeZone: "UTC" })}
                    </div>
                )}

                {ticket.status == TicketStatus.RESOLVIDO && (
                    <div className="badge badge-success gap-1.5 text-xs">
                        <CheckCircle2 size={14} />
                        {new Date(ticket.closedAt!).toLocaleDateString("pt-BR", { timeZone: "UTC" })}
                    </div>
                )}

                {ticket.status == TicketStatus.CANCELADO && (
                    <div className="badge badge-error gap-1.5 text-xs">
                        <X size={14} />
                        {new Date(ticket.closedAt!).toLocaleDateString("pt-BR", { timeZone: "UTC" })}
                    </div>
                )}


                <div className="flex flex-1 items-center justify-end  gap-2">
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
    )
}