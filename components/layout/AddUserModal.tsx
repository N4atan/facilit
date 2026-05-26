"use client";

import { UserPlus } from "lucide-react";
import UserCreateForm from "./user-create-form";

export default function AddUserModal() {
    const openModal = () => {
        const modal = document.getElementById("modal_add_user") as HTMLDialogElement;
        modal?.showModal();
    };

    return (
        <>
            <button className="btn btn-sm btn-primary btn-outline" onClick={openModal}>
                <UserPlus size={16} />
                Adicionar
            </button>

            <dialog id="modal_add_user" className="modal modal-bottom sm:modal-middle">
                <UserCreateForm isModal />
            </dialog>
        </>
    );
}
