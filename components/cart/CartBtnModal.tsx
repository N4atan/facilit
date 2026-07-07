"use client";

import { Edit, Plus } from "lucide-react";
import CartCreateForm from "./CartCreateForm";
import { Cart } from "@prisma/client";

type Props = {
    isEditing?: boolean;
    cart?: Cart;
}

export default function CartBtnModal({ isEditing, cart }: Props) {
    const modalId = isEditing ? `modal_edit_cart_${cart?.id}` : "modal_add_cart";

    const openModal = () => {
        const modal = document.getElementById(modalId) as HTMLDialogElement;
        modal?.showModal();
    };

    return (
        <>
            {isEditing ? (
                <button className="btn btn-sm btn-ghost tooltip tooltip-primary text-base-content/70 hover:text-primary" data-tip="Editar" onClick={openModal}>
                    <Edit size={16} />
                </button>
            ) : (
                <button className="btn btn-primary btn-outline" onClick={openModal}>
                    <Plus size={16} />
                    Adicionar Carrinho
                </button>
            )}

            <dialog id={modalId} className="modal">
                <CartCreateForm isModal cart={cart} />
            </dialog>
        </>
    );
}
