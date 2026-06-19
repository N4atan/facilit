"use client"

import { Mail, KeyRound, Link } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { authenticate } from "@/actions/auth-actions";

export const LoginForm = ({ setIsLogin }: { setIsLogin: (isLogin: boolean) => void }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            await authenticate({ email, password });
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <div className="card w-full max-w-md shrink-0 shadow-2xl lg:shadow-none">
            <div className="card-body">
                <div className="text-center lg:text-left mb-8">
                    <h2 className="text-3xl font-bold text-content">Bem-vindo(a)!</h2>
                    <p className="text-content mt-2 opacity-80">Insira suas credenciais para acessar o painel.</p>
                </div>

                <form id="form-login" onSubmit={onSubmit}>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">E-mail</legend>
                        <label htmlFor="" className="input w-full">
                            <Mail size={18} />
                            <input type="text" placeholder="email@senacrs.com.br" disabled={isLoading} required onChange={(e) => setEmail(e.target.value.toLowerCase().trim())} />
                        </label>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Senha</legend>
                        <label htmlFor="" className="input w-full">
                            <KeyRound size={18} />
                            <input type="password" placeholder="**********" disabled={isLoading} required onChange={(e) => setPassword(e.target.value.trim())} />
                        </label>
                    </fieldset>

                    <div className="form-control mt-10">
                        <button type="submit" className="btn btn-primary w-full">Entrar</button>
                    </div>
                </form>

                <div className="divider text-content opacity-80 text-sm mt-8">Não possui acesso?</div>
                <div className="text-center">
                    <span onClick={() => setIsLogin(false)} className="link link-hover text-content text-sm font-medium cursor-pointer">Solicitar criação de conta</span>
                </div>
            </div>
        </div>
    )
}
