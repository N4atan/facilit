"use client";

import { useState, useEffect } from "react";
import { User } from "@prisma/client";
import { handleCreateNewUser } from "@/actions/user-actions";
import { KeyIcon, KeyRound, Link, Mail, User as UserIcon } from "lucide-react";
import { showCodeToast } from "@/components/ui/ToastCode";
import toast from "react-hot-toast";

export const RegisterForm = ({ setIsLogin }: { setIsLogin: (isLogin: boolean) => void }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            const result = await handleCreateNewUser({ name, email, password });

            if (!result) return toast.error("Erro desconhecido ao criar usuário")

            toast.success("Solicitação enviada com sucesso!")
            onReset();

        } catch (error: any) {
            showCodeToast("Erro ao criar usuário", error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    }

    const onReset = () => {
        setName("");
        setEmail("");
        setPassword("");
    }

    return (
        <div className="card w-full max-w-md shrink-0 shadow-2xl lg:shadow-none">
            <div className="card-body">
                <div className="text-center lg:text-left mb-8">
                    <h2 className="text-3xl font-bold text-content">Solicite seu Acesso.</h2>
                    <p className="text-content mt-2 opacity-80">Cadastre-se com seu e-mail @senacrs. O seu acesso será ativado manualmente por um membro da nossa equipe em breve.</p>
                </div>

                <form onSubmit={onSubmit}>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">E-mail</legend>
                        <label htmlFor="" className="input w-full">
                            <Mail size={18} />
                            <input type="text" placeholder="email@senacrs.com.br" disabled={isLoading} required onChange={(e) => setEmail(e.target.value)} />
                        </label>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Nome Completo</legend>
                        <label htmlFor="" className="input w-full">
                            <UserIcon size={18} />
                            <input type="text" placeholder="Digite o nome completo" disabled={isLoading} required onChange={(e) => setName(e.target.value)} />
                        </label>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Senha</legend>
                        <label htmlFor="" className="input w-full">
                            <KeyRound size={18} />
                            <input type="password" placeholder="*********" disabled={isLoading} required onChange={(e) => setPassword(e.target.value)} />
                        </label>
                    </fieldset>

                    <div className="form-control mt-8">
                        <button type="submit" className="btn btn-primary w-full">Registrar</button>
                    </div>

                </form>

                <div className="divider text-content opacity-80 text-sm mt-4">Já possui acesso?</div>
                <div className="text-center">
                    <span onClick={() => setIsLogin(true)} className="link link-hover text-content text-sm font-medium cursor-pointer">Entrar</span>
                </div>
            </div>
        </div>
    )

}
