"use client"

import { Mail, KeyRound } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setIsLoading(true);

        } catch (error: any) {
            
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="flex h-screen w-full bg-base-200 lg:bg-white">
            {/* Seção da Imagem */}
            <div
                className="hidden lg:flex flex-1 relative bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.adsttc.com/media/images/61a8/1887/f91c/817a/e800/0009/newsletter/B_FECOM%C3%89RCIO_SESC_SENAC_RS_-_EMPENA_NORTE_E_CENTRO_DE_CONVIV%C3%8ANCIAS_-_LEONARDO_FINOTTI.jpg?1638406240')" }}
            >
                {/* Overlay para dar um toque mais premium e escurecer levemente a imagem */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/10"></div>

                {/* Texto sobreposto na imagem (opcional, dá um ar profissional) */}
                <div className="absolute bottom-12 left-12 text-white max-w-md">
                    <h1 className="text-4xl font-bold mb-2 shadow-sm">Sistema Facilit</h1>
                    <p className="text-lg opacity-90 text-white/90">Acesso restrito para colaboradores Senac São Leopoldo.</p>
                </div>
            </div>

            {/* Seção do Formulário */}
            <div className="flex-1 flex items-center justify-center p-8 lg:p-16 w-full">
                <div className="card w-full max-w-md shrink-0 shadow-2xl lg:shadow-none bg-white">
                    <div className="card-body">
                        <div className="text-center lg:text-left mb-8">
                            <h2 className="text-3xl font-bold text-content">Bem-vindo(a)</h2>
                            <p className="text-content mt-2 opacity-80">Insira suas credenciais para acessar o painel.</p>
                        </div>

                        <form id="form-login">
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">E-mail</legend>
                                <label htmlFor="" className="input w-full">
                                    <Mail size={18} />
                                    <input type="text" placeholder="email@senacrs.com.br" disabled={isLoading} required onChange={(e) => setEmail(e.target.value)} />
                                </label>
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Senha</legend>
                                <label htmlFor="" className="input w-full">
                                    <KeyRound size={18} />
                                    <input type="password" placeholder="**********" disabled={isLoading} required onChange={(e) => setPassword(e.target.value)} />
                                </label>
                            </fieldset>

                            

                            <div className="form-control mt-10">
                                <button type="submit" className="btn btn-primary w-full">Entrar</button>
                            </div>
                        </form>

                        <div className="divider text-content opacity-80 text-sm mt-8">Precisa de acesso?</div>
                        <div className="text-center">
                            <a className="link link-hover text-content text-sm font-medium" onClick={() => toast("Em Desenvolvimento!", {icon: "📎"})}>Solicitar criação de conta</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}