"use client";

import { FilePen, File } from "lucide-react";
import { TicketWithAuthor } from "@/services/ticket-service";

type Props = {
    tickets: TicketWithAuthor[];
    isLoading?: boolean;
}

function TicketStatus(status: string) {
    switch (status) {
        case "ABERTO":
            return <span className="badge badge-primary ">ABERTO</span>;
        case "EM_ANDAMENTO":
            return <span className="badge badge-warning ">EM ANDAMENTO</span>;
        case "RESOLVIDO":
            return <span className="badge badge-success ">RESOLVIDO</span>;
        case "FECHADO":
            return <span className="badge badge-error ">FECHADO</span>;
        default:
            return <span className="badge badge-ghost">{status}</span>;
    }
}

export default function TicketTable({ tickets, isLoading }: Props) {

    if (isLoading) return (
        <div className="skeleton w-full h-32"></div>
    )

    if (tickets.length === 0) return (
        <div className="card card-border w-full bg-base-200">
            <div className="card-body items-center justify-center">
                <div className="rounded-full p-4 bg-base-300">
                    <File size={40} />
                </div>

                <h2 className="card-title">Nenhum chamado CSC encontrado...</h2>
                <p className="text-xs text-content/60">
                    Caso um chamado CSC seja aberto, ele será listado aqui.
                </p>
            </div>
        </div>
    )

    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>Id CSC</th>
                        <th>Categoria</th>
                        <th>Descrição</th>
                        <th>Abertura</th>
                        <th>Status</th>
                        <th>Aberto p/</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket.id_csc}>
                            <td>{ticket.id_csc}</td>
                            <td>{ticket.category}</td>
                            <td>{ticket.description}</td>
                            <td>{new Date(ticket.openAt).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</td>
                            <td>{TicketStatus(ticket.status)}</td>
                            <td>{ticket.author.name}</td>
                            <td>
                                <button className="btn btn-sm btn-ghost tooltip tooltip-info" data-tip="Editar">
                                    <FilePen size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}