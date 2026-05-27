"use client";

import { useState } from "react";
import { Ticket } from "@prisma/client";
import { handleCreateNewTicket } from "@/actions/ticket-actions";
import { ClipboardList, Tag, FileText } from "lucide-react";
import { showCodeToast } from "../ui/toast-code";

interface TicketCreateFormProps {
    isModal?: boolean;
    onCreateTicket?: () => void;
}

export default function TicketCreateForm({ isModal, onCreateTicket }: TicketCreateFormProps) {
    const [idCsc, setIdCsc] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [openAt, setOpenAt] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            const result = await handleCreateNewTicket({
                id_csc: idCsc,
                category: category,
                description: description,
                openAt: new Date(openAt),
            });

            showCodeToast("Chamado criado com sucesso!", result, 'success');
            resetForm();

            if (isModal) {
                (document.getElementById("modal_add_ticket") as HTMLDialogElement)?.close();
                onCreateTicket?.();
            }
        } catch (error: any) {
            showCodeToast("Erro ao criar chamado", error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setIdCsc("");
        setCategory("");
        setDescription("");
    };

    return (
        <div className={`card bg-base-100 w-96 shadow-sm ${isModal ? "modal-box" : ""}`}>
            <div className="card-body">
                <h2 className="card-title text-xl font-bold">Registrar Novo Chamado</h2>
                <form id="form-registerTicket" onSubmit={onSubmit}>

                    <fieldset className="fieldset mt-4">
                        <legend className="fieldset-legend">Id da CSC</legend>
                        <label className="input w-full flex items-center gap-2">
                            <ClipboardList size={18} />
                            <input
                                type="text"
                                placeholder="Digite o ID do chamado na CSC"
                                value={idCsc}
                                disabled={isLoading}
                                required
                                onChange={(e) => setIdCsc(e.target.value)}
                                className="grow"
                            />
                        </label>

                    </fieldset>

                    <fieldset className="fieldset mt-2">
                        <legend className="fieldset-legend">Categoria</legend>
                        <label className="input w-full flex items-center gap-2">
                            <Tag size={18} />
                            <input
                                type="text"
                                placeholder="Ex: Intune, Software, Email"
                                value={category}
                                disabled={isLoading}
                                required
                                onChange={(e) => setCategory(e.target.value)}
                                className="grow"
                            />
                        </label>
                    </fieldset>

                    <fieldset className="fieldset mt-2">
                        <legend className="fieldset-legend">Descrição</legend>
                        <textarea
                            placeholder="Descrição detalhada do chamado..."
                            value={description}
                            disabled={isLoading}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                            className="textarea w-full h-24 resize-vertical"
                        />
                    </fieldset>

                    <fieldset className="fieldset mt-2">
                        <legend className="fieldset-legend">Data de Abertura</legend>
                        <div className="date-picker-input">
                            <input
                                type="date"
                                disabled={isLoading}
                                required
                                onChange={(e) => setOpenAt(e.target.value)}
                                className="input w-full flex items-center gap-2"
                            />
                        </div>
                    </fieldset>

                </form>

                <div className="card-actions justify-end mt-6">
                    {isModal && (
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={() => (document.getElementById("modal_add_ticket") as HTMLDialogElement)?.close()}
                            disabled={isLoading}
                        >
                            Cancelar
                        </button>
                    )}

                    <button
                        className="btn btn-primary"
                        form="form-registerTicket"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                            <span>Registrar</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
