"use client";

import { useState, useEffect } from "react";
import { User } from "@prisma/client";
import { handleCreateNewUser } from "@/actions/user-actions";
import { KeyIcon, KeyRound, Mail, User as UserIcon } from "lucide-react";
import { showCodeToast } from "@/components/ui/ToastCode";

export default function UserCreateForm({isModal, onCreateUser } : {isModal?: boolean, onCreateUser?: () => void}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            const result = await handleCreateNewUser({ name, email, password });

            showCodeToast("Usuário criado com sucesso!", result, 'success');
            resetForm();

        } catch (error: any) {
            showCodeToast("Erro ao criar usuário", error.message, 'error');
        } finally {
            setIsLoading(false);
            resetForm();
            if (isModal) {
                (document.getElementById("modal_add_user") as HTMLDialogElement)?.close();
                onCreateUser?.();
            }
        }
    }

    const resetForm = () => {
        setName("");
        setEmail("");
        setPassword("");
    }

    return (
        <div className={`card bg-base-100 w-96 shadow-sm ${isModal ? "modal-box" : ""}`}>
            <div className="card-body">
                <h2 className="card-title">Adicionando Novo Usuário</h2>
                <form id="#form-registerUser" onSubmit={onSubmit}>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">E-mail</legend>
                        <label htmlFor="" className="input">
                            <Mail size={18} />
                            <input type="text" placeholder="xxxxxxx@senacrs.com.br" disabled={isLoading} required onChange={(e) => setEmail(e.target.value.toLowerCase().trim())} />
                        </label>
                        <p className="label">Utilize o email institucional para criar login</p>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Nome Completo</legend>
                        <label htmlFor="" className="input">
                            <UserIcon size={18} />
                            <input type="text" placeholder="Digite o nome completo" disabled={isLoading} required onChange={(e) => setName(e.target.value.trim())} />
                        </label>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Senha</legend>
                        <label htmlFor="" className="input">
                            <KeyRound size={18} />
                            <input type="password" placeholder="Digite a senha" disabled={isLoading} required onChange={(e) => setPassword(e.target.value.trim())} />
                        </label>
                    </fieldset>

                </form>

                <div className="card-actions justify-end mt-6">
                    {isModal && (
                        <button className="btn" onClick={() => (document.getElementById("modal_add_user") as HTMLDialogElement)?.close()}>
                            Cancelar
                        </button>
                    )}
                    
                    <button className="btn btn-primary" form="#form-registerUser" type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                            <span>Salvar</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )

}
