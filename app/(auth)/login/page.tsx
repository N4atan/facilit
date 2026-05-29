"use client"

import { LoginForm } from "@/components/layout/auth/login-form";
import { RegisterForm } from "@/components/layout/auth/register-form";
import { useState } from 'react';


export default function LoginPage() {
    const [ isLogin, setIsLogin ] = useState(true)

    return (
        <div className="flex h-screen w-full bg-base-100 ">
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
                { isLogin ? <LoginForm setIsLogin={setIsLogin} /> : <RegisterForm setIsLogin={setIsLogin} /> }
            </div>
        </div>
    );
}