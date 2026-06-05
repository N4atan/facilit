"use client";

import { useState } from "react";
import { Ticket } from "@prisma/client";
import { TicketStatus } from "@/lib/enums";
import { handleCreateNewTicket, handleUpdateTicket } from "@/actions/ticket-actions";
import { ClipboardList, Tag } from "lucide-react";
import { showCodeToast } from "../ui/toast-code";
import toast from "react-hot-toast";

interface TicketCreateFormProps {
    isModal?: boolean;
    onCreateTicket?: () => void;
    ticket?: Ticket;
}

export default function TicketCreateForm({ isModal, onCreateTicket, ticket }: TicketCreateFormProps) {
    const [idCsc, setIdCsc] = useState(ticket?.id_csc || "");
    const [category, setCategory] = useState(ticket?.category || "");
    const [description, setDescription] = useState(ticket?.description || "");
    const [openAt, setOpenAt] = useState<string>(
        ticket?.openAt
            ? new Date(ticket.openAt).toISOString().split('T')[0]
            : ""
    );
    const [status, setStatus] = useState<TicketStatus>(
        (ticket?.status as unknown as TicketStatus) || TicketStatus.EM_ANDAMENTO
    );
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            if (ticket) {
                const result = await handleUpdateTicket(ticket.id_csc, {
                    category,
                    description,
                    openAt: new Date(openAt),
                    status,
                });

                showCodeToast("Chamado atualizado com sucesso!", result, 'success');
            } else {
                const result = await handleCreateNewTicket({
                    id_csc: idCsc,
                    category,
                    description,
                    openAt: new Date(openAt),
                });

                toast.success("Chamado criado com sucesso!");
                resetForm();
            }

            if (isModal) {
                const modalId = ticket ? `modal_edit_ticket_${ticket.id}` : "modal_add_ticket";
                (document.getElementById(modalId) as HTMLDialogElement)?.close();
                onCreateTicket?.();
            }
        } catch (error: any) {
            showCodeToast(ticket ? "Erro ao atualizar chamado" : "Erro ao criar chamado", error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setIdCsc("");
        setCategory("");
        setDescription("");
        setOpenAt("");
    };

    const formId = ticket ? `form-editTicket-${ticket.id}` : "form-registerTicket";

    return (
        <div className={`card bg-base-100 max-w-3xl ${isModal ? "modal-box" : ""}`}>
            <div className="card-body">
                <h2 className="card-title text-xl font-bold">
                    {ticket ? "Editar Chamado" : "Registrando Novo Chamado"}
                </h2>
                <form id={formId} onSubmit={onSubmit} className={`grid grid-cols-1 ${ticket ? "lg:grid-cols-2" : "lg:grid-cols-3"} gap-4`}>

                    <fieldset className="fieldset ">
                        <legend className="fieldset-legend">Id da CSC</legend>
                        <label className="input w-full flex items-center gap-2">
                            <ClipboardList size={18} />
                            <input
                                type="text"
                                placeholder="Digite o ID do chamado na CSC"
                                value={idCsc}
                                disabled={isLoading || !!ticket}
                                required
                                onChange={(e) => setIdCsc(e.target.value)}
                                className="grow"
                            />
                        </label>
                    </fieldset>

                    <fieldset className="fieldset">
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

                    

                    <fieldset className="fieldset ">
                        <legend className="fieldset-legend">Data de Abertura</legend>
                        <div className="date-picker-input">
                            <input
                                type="date"
                                value={openAt}
                                disabled={isLoading}
                                required
                                onChange={(e) => setOpenAt(e.target.value)}
                                className="input w-full flex items-center gap-2"
                            />
                        </div>
                    </fieldset>

                    {ticket && (
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Status</legend>
                            <select
                                value={status}
                                disabled={isLoading}
                                required
                                onChange={(e) => setStatus(e.target.value as TicketStatus)}
                                className="select w-full"
                            >
                                <option disabled={true}>Selecione o status</option>
                                <option value={TicketStatus.ABERTO}>ABERTO</option>
                                <option value={TicketStatus.EM_ANDAMENTO}>EM ANDAMENTO</option>
                                <option value={TicketStatus.RESOLVIDO}>RESOLVIDO</option>
                                <option value={TicketStatus.CANCELADO}>CANCELADO</option>
                            </select>
                        </fieldset>
                    )}

                    <fieldset className={`fieldset ${ticket ? "lg:col-span-2" : "lg:col-span-3"}`}>
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

                </form>

                <div className="card-actions justify-end mt-6">
                    {isModal && (
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={() => {
                                const modalId = ticket ? `modal_edit_ticket_${ticket.id}` : "modal_add_ticket";
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
                            <span>{ticket ? "Salvar" : "Registrar"}</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
