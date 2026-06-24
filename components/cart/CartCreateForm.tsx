"use client";

import { useState } from "react";
import { Cart } from "@prisma/client";
import { handleCreateNewCart } from "@/actions/cart-actions";
import { Tag, School, MapPin, Laptop, ClipboardList } from "lucide-react";
import { showCodeToast } from "@/components/ui/ToastCode";
import toast from "react-hot-toast";

interface CartCreateFormProps {
    isModal?: boolean;
    onCreateCart?: () => void;
    cart?: Cart;
}

export default function CartCreateForm({ isModal, onCreateCart, cart }: CartCreateFormProps) {
    const [name, setName] = useState(cart?.name || "");
    const [patrimony, setPatrimony] = useState(cart?.patrimony || "");
    const [school, setSchool] = useState(cart?.school || "");
    const [room, setRoom] = useState(cart?.room || "");
    const [totalNotebooks, setTotalNotebooks] = useState<number | "">(cart?.totalNotebooks ?? 24);
    const [actualNotebooks, setActualNotebooks] = useState<number | "">(cart?.actualNotebooks ?? 24);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            if (Number(actualNotebooks) > Number(totalNotebooks)) {
                throw new Error("Quantidade atual de notebooks não pode ser maior que o total.");
            }

            if (cart) {
                // Se no futuro precisar de edição de carrinho:
                // await handleUpdateCart(cart.id, { ... });
            } else {
                const result = await handleCreateNewCart({
                    name,
                    patrimony,
                    school,
                    room,
                    totalNotebooks: Number(totalNotebooks),
                    actualNotebooks: Number(actualNotebooks),
                });

                toast.success("Carrinho criado com sucesso!");
                resetForm();
            }

            if (isModal) {
                const modalId = cart ? `modal_edit_cart_${cart.id}` : "modal_add_cart";
                (document.getElementById(modalId) as HTMLDialogElement)?.close();
                onCreateCart?.();
            }
        } catch (error: any) {
            showCodeToast(cart ? "Erro ao atualizar carrinho" : "Erro ao criar carrinho", error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setName("");
        setPatrimony("");
        setSchool("");
        setRoom("");
        setTotalNotebooks(24);
        setActualNotebooks(24);
    };

    const formId = cart ? `form-editCart-${cart.id}` : "form-registerCart";

    return (
        <div className={`card bg-base-100 max-w-3xl ${isModal ? "modal-box" : ""}`}>
            <div className="card-body">
                <h2 className="card-title text-xl font-bold">
                    {cart ? "Editar Carrinho" : "Novo Carrinho"}
                </h2>
                <form id={formId} onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <fieldset className="fieldset col-span-1 md:col-span-2">
                        <legend className="fieldset-legend">Nome do Carrinho</legend>
                        <label className="input w-full flex items-center gap-2">
                            <ClipboardList size={18} />
                            <input
                                type="text"
                                placeholder="Ex: Carrinho Cinza, Carrinho Preto"
                                value={name}
                                disabled={isLoading}
                                required
                                onChange={(e) => setName(e.target.value)}
                                className="grow"
                            />
                        </label>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Patrimônio</legend>
                        <label className="input w-full flex items-center gap-2">
                            <Tag size={18} />
                            <input
                                type="text"
                                placeholder="Digite o patrimônio único"
                                value={patrimony}
                                disabled={isLoading || !!cart}
                                required
                                onChange={(e) => setPatrimony(e.target.value.trim())}
                                className="grow"
                            />
                        </label>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Máximo de Notebooks no Carrinho</legend>
                        <label className="input w-full flex items-center gap-2">
                            <Laptop size={18} />
                            <input
                                type="number"
                                placeholder="Ex: 24"
                                value={totalNotebooks}
                                disabled={isLoading}
                                required
                                min={1}
                                onChange={(e) => {
                                    const val = e.target.value === "" ? "" : Number(e.target.value);
                                    setTotalNotebooks(val);
                                    if (typeof val === "number" && (actualNotebooks === "" || actualNotebooks > val)) {
                                        setActualNotebooks(val);
                                    }
                                }}
                                className="grow"
                            />
                            
                        </label>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Escola</legend>
                            <select className="select grow" value={school} onChange={(e) => setSchool(e.target.value)} disabled={isLoading} required >
                                <option disabled value="">Selecione a escola</option>
                                <option value="Centro">Centro</option>
                                <option value="Unisinos">Unisinos</option>
                            </select>
                        
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Sala Padrão / Destino</legend>
                        <label className="input w-full flex items-center gap-2">
                            <MapPin size={18} />
                            <input
                                type="text"
                                placeholder="Ex: Sala 202, Auditório"
                                value={room}
                                disabled={isLoading}
                                required
                                onChange={(e) => setRoom(e.target.value)}
                                className="grow"
                            />
                        </label>
                    </fieldset>



                    <fieldset className="fieldset col-span-1 md:col-span-2">
                        <legend className="fieldset-legend">Notebooks Atuais Disponíveis</legend>
                        <label className="input w-full flex items-center gap-2">
                            <Laptop size={18} />
                            <input
                                type="number"
                                placeholder="Ex: 24"
                                value={actualNotebooks}
                                disabled={isLoading}
                                required
                                min={0}
                                max={typeof totalNotebooks === "number" ? totalNotebooks : undefined}
                                onChange={(e) => setActualNotebooks(e.target.value === "" ? "" : Number(e.target.value))}
                                className="grow"
                            />
                        </label>
                    </fieldset>

                </form>

                <div className="card-actions justify-end mt-6">
                    {isModal && (
                        <button
                          type="button"
                          className="btn btn-ghost"
                          onClick={() => {
                              const modalId = cart ? `modal_edit_cart_${cart.id}` : "modal_add_cart";
                              (document.getElementById(modalId) as HTMLDialogElement)?.close();
                          }}
                          disabled={isLoading}
                        >
                            Cancelar
                        </button>
                    )}

                    <button
                        className="btn btn-primary"
                        form={formId}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                            <span>{cart ? "Salvar" : "Registrar"}</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
