"use client";

import { FilePlusCorner } from "lucide-react";
import TicketCreateForm from "./ticket-create-form";

export default function TicketCreateModal() {
    const openModal = () => {
        const modal = document.getElementById("modal_add_ticket") as HTMLDialogElement;
        modal?.showModal();
    };

    return (
        <>
            <button className="btn btn-primary" onClick={openModal}>
                <FilePlusCorner size={16} />
                Registrar Novo Chamado
            </button>

            <dialog id="modal_add_ticket" className="modal modal-bottom sm:modal-middle">
                <TicketCreateForm isModal />
            </dialog>
        </>
    );
}
