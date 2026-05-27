"use client";

import { FileEdit, FilePen, FilePlusCorner } from "lucide-react";
import TicketCreateForm from "./ticket-create-form";
import { Ticket } from "@prisma/client";

type Props = {
    isEditing?: boolean;
    ticket?: Ticket;
}

export default function TicketCreateModal({ isEditing, ticket }: Props) {
    const modalId = isEditing ? `modal_edit_ticket_${ticket?.id}` : "modal_add_ticket";

    const openModal = () => {
        const modal = document.getElementById(modalId) as HTMLDialogElement;
        modal?.showModal();
    };
    return (
        <>
            {isEditing ? (
                <button className="btn btn-sm btn-ghost tooltip tooltip-info" data-tip="Editar" onClick={openModal}>
                    <FileEdit size={16} />
                </button>
            ) : (
                <button className="btn btn-primary" onClick={openModal}>
                    <FilePlusCorner size={16} />
                    Registrar Novo Chamado
                </button>
            )}

            <dialog id={modalId} className="modal ">
                <TicketCreateForm isModal ticket={ticket as Ticket} />
            </dialog>
        </>
    );
}
