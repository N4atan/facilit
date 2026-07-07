"use client";

import { useState } from "react";
import { PackageSearch } from "lucide-react";
import Link from "next/link";
import { Cart } from "@prisma/client";
import toast from "react-hot-toast";

interface CartOpenFormProps {
    cart: Cart;
    session: {
        user?: {
            name?: string | null;
            email?: string | null;
            id?: string | null;
            role?: string | null;
        } | null;
    } | null;
}

export default function CartOpenForm({ cart, session }: CartOpenFormProps) {
    const [room, setRoom] = useState(cart?.room || '');
    const [professorName, setProfessorName] = useState('');
    const [openingStaffName, setOpeningStaffName] = useState(session?.user?.name || '');
    const [counterNotes, setCounterNotes] = useState<number>(cart?.actualNotebooks || 0);
    const [expectedNotebooks, setExpectedNotebooks] = useState<number>(cart?.actualNotebooks || 0);
    const [notesText, setNotesText] = useState<string>('');

    const diffInNotebooks = counterNotes !== expectedNotebooks;

    return (



            <div className="card">
                <div className="card-body">
                    <h1 className="text-5xl font-black uppercase tracking-tighter italic leading-none mb-3">Formulário de Abertura</h1>
                    <p className="text-md text-base-content/70">Preencha os dados abaixo para abrir o carrinho.</p>

                    <div className="divider"></div>

                    <form className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <fieldset className="fieldset">
                                <legend className="text-lg font-black uppercase">Nome do Carrinho</legend>
                                <input type="text" className="input w-full" value={cart?.name || ''} disabled />
                                <p className="label">O nome do carrinho não pode ser alterado.</p>
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="text-lg font-black uppercase ">
                                    Local do Carrinho <span className="text-red-500">*</span>
                                </legend>
                                <input
                                    type="text"
                                    className="input w-full"
                                    value={room}
                                    onChange={(e) => setRoom(e.target.value)}
                                />
                                <p className="label">Onde o carrinho está localizado.</p>
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="text-lg font-black uppercase ">
                                    Quantidade de Notebooks <span className="text-red-500">*</span>
                                </legend>
                                <input
                                    type="number"
                                    className="input w-full"
                                    value={counterNotes}
                                    onChange={(e) => setCounterNotes(Number(e.target.value))}
                                />
                                <p className="label">O valor esperado é <span className="font-bold">{cart?.actualNotebooks}</span>.</p>
                            </fieldset>
                        </div>

                        <fieldset className="fieldset">
                            <legend className="text-lg font-black uppercase ">
                                Qual Professor Solicitou ? <span className="text-red-500">*</span>
                            </legend>
                            <input
                                type="text"
                                className="input w-full"
                                value={professorName}
                                onChange={(e) => setProfessorName(e.target.value)}
                            />
                            <p className="label">O nome do professor que solicitou a abertura do carrinho.</p>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="text-lg font-black uppercase ">
                                Quem Está Realizando a Abertura ? <span className="text-red-500">*</span>
                            </legend>
                            <input
                                type="text"
                                className="input w-full"
                                disabled={!!session}
                                value={openingStaffName}
                                onChange={(e) => setOpeningStaffName(e.target.value)}
                            />
                            <p className="label">O nome do responsável por abrir o carrinho.</p>
                        </fieldset>

                        <fieldset className="fieldset lg:col-span-2">
                            <legend className={`text-lg font-black uppercase`}>Observações {diffInNotebooks && <span className="text-red-500">*</span>}</legend>
                            <div className="label whitespace-normal">Este campo só será obrigatório caso a quantidade de notebooks seja diferente da esperada.</div>
                            <textarea
                                className={`textarea w-full ${diffInNotebooks && 'textarea-error'}`}
                                value={notesText}
                                onChange={(e) => setNotesText(e.target.value)}
                                required={diffInNotebooks}
                            />
                        </fieldset>
                    </form>
                </div>

                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => toast("Em Desenvolvimento")}>Abrir Carrinho</button>
                </div>
            </div>

    );
}
