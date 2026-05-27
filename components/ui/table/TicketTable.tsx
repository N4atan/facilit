"use client";

import { FilePen, File, FileX } from "lucide-react";
import { TicketWithAuthor } from "@/services/ticket-service";
import toast from "react-hot-toast";
import { showCodeToast } from "../toast-code";
import { handleDeleteTicketByIdCSC } from "@/actions/ticket-actions";
import TicketCreateModal from "@/components/layout/ticket-create-modal";

type Props = {
    tickets: TicketWithAuthor[];
    isLoading?: boolean;
}

import { TicketStatus as PrismaTicketStatus } from "@/lib/enums";

export function TicketStatus(status: PrismaTicketStatus | string) {
    switch (status) {
        case PrismaTicketStatus.ABERTO:
            return <span className="badge badge-primary ">ABERTO</span>;
        case PrismaTicketStatus.EM_ANDAMENTO:
            return <span className="badge badge-warning ">EM ANDAMENTO</span>;
        case PrismaTicketStatus.RESOLVIDO:
            return <span className="badge badge-success ">RESOLVIDO</span>;
        case PrismaTicketStatus.CANCELADO:
            return <span className="badge badge-error ">CANCELADO</span>;
        default:
            return <span className="badge badge-ghost">{status}</span>;
    }
}



export default function TicketTable({ tickets, isLoading }: Props) {

    const handleDelete = async (id_csc: string) => {
        try {
            const confirm = window.confirm("Tem certeza que deseja excluir este chamado?");
            if (!confirm) return;

            await handleDeleteTicketByIdCSC(id_csc);
            toast.success("Chamado removido com sucesso!");
        } catch (error: any) {
            showCodeToast("Erro ao remover chamado", error.message, "error");
        }
    }

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
            <table className="table table-zebra overflow-x-auto">
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
                                <div className="flex gap-2">
                                    <TicketCreateModal isEditing ticket={ticket} />
                                    <button className="btn btn-sm btn-ghost tooltip tooltip-error" data-tip="Excluir" onClick={() => handleDelete(ticket.id_csc)}>
                                        <FileX size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}