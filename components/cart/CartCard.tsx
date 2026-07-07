"use client"

import { handleDeleteCartByPatrimony } from "@/actions/cart-actions";
import { Cart } from "@prisma/client";
import { FileBox, Laptop, MapPinCheck, Package, PackageOpen, PackageX, QrCode, Tag } from "lucide-react";
import toast from "react-hot-toast";
import { showCodeToast } from "../ui/ToastCode";
import CardQRCodeBtn from "./CardQRCodeBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CartBtnModal from "./CartBtnModal";


export default function CartCard({ cart }: { cart: Cart }) {
    const queryClient = useQueryClient();


    const mutateDeleteCart = useMutation({
        mutationFn: handleDeleteCartByPatrimony,
        onSuccess: () => {
            toast.success("Carrinho deletado com sucesso");
            queryClient.invalidateQueries({ queryKey: ["carts"] });
        },
        onError: (error: any) => {
            console.error(error);
            showCodeToast("Erro ao deletar carrinho", error, "error");
        },
    });

    return (
        <div key={cart.id} className="card card-border card-md w-full lg:max-w-xs hover:border-base-content/30 transition-all duration-200 min-w-[300px]">
            <div className="card-body">
                <div className="flex items-center justify-between">
                    <span className="card-title">{cart.name}</span>
                    {cart.status === "ABERTO" ? (
                        <span className="tooltip tooltip-info tooltip-top badge badge-info" data-tip="Em Uso">
                            <PackageOpen size={16} />
                        </span>
                    ) : (
                        <span className="tooltip tooltip-error tooltip-top badge badge-error" data-tip="Trancado">
                            <Package size={16} />
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2 text-base-content/70 mt-2">
                    <Laptop size={14} />
                    <span>{cart.actualNotebooks}/{cart.totalNotebooks} Notebooks</span>
                </div>

                <div className="flex items-center gap-2 text-base-content/70">
                    <Tag size={14} />
                    <span>{cart.patrimony}</span>
                </div>

                <div className="flex items-center gap-2 text-base-content/70">
                    <MapPinCheck size={14} />
                    <span>{cart.school} - {cart.room}</span>
                </div>
            </div>

            <div className="card-action flex flex-row justify-end gap-2 px-4 p-2 border-t border-base-content/10 ">
                <CardQRCodeBtn cart={cart} />

                
                <CartBtnModal isEditing={true} cart={cart}/>

                <button className="btn btn-sm btn-ghost tooltip tooltip-error text-base-content/70 hover:text-error" data-tip="Excluir" onClick={() => mutateDeleteCart.mutate(cart.patrimony)}>
                    <PackageX size={16} />
                </button>
            </div>
        </div>
    )
}