"use client";

import { useState } from "react";
import { 
    Download, 
    ChevronRight, 
    ChevronLeft, 
    HelpCircle, 
    Puzzle, 
    CheckCircle2,
    Info
} from "lucide-react";

export default function ExtensionGuideModal() {
    const [step, setStep] = useState(1);
    const modalId = "modal_extension_guide";

    const openModal = () => {
        const modal = document.getElementById(modalId) as HTMLDialogElement;
        modal?.showModal();
    };

    const handleDownload = () => {
        // O arquivo zip será gerado ou servido da pasta public
        window.location.href = "/chrome-ext.zip";
    };

    return (
        <>
            {/* Botão de Ativação no Painel */}
            <button 
                className="btn btn-soft btn-secondary gap-2" 
                onClick={openModal}
                title="Aprenda a instalar e utilizar a extensão de captura"
            >
                <Puzzle size={16} />
                Usar Extensão
            </button>

            {/* Modal de Passo-a-Passo */}
            <dialog id={modalId} className="modal">
                <div className="modal-box max-w-2xl bg-base-100 p-6 rounded-2xl shadow-2xl relative border border-base-content/10">
                    
                    {/* Botão de Fechar */}
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button>
                    </form>

                    {/* Cabeçalho */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
                            <Puzzle size={24} className="animate-pulse" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black uppercase tracking-tighter italic leading-none">
                                Captura de Chamados
                            </h3>
                            <p className="text-xs text-base-content/60 mt-1">Guia de instalação e configuração da extensão do Chrome</p>
                        </div>
                    </div>

                    {/* Barra de Progresso (Steps DaisyUI v5) */}
                    <ul className="steps w-full text-[10px] sm:text-xs font-black uppercase tracking-wider mb-8">
                        <li className={`step ${step >= 1 ? "step-primary" : ""}`}>Download</li>
                        <li className={`step ${step >= 2 ? "step-primary" : ""}`}>Instalação</li>
                        <li className={`step ${step >= 3 ? "step-primary" : ""}`}>Utilização</li>
                        <li className={`step ${step >= 4 ? "step-primary" : ""}`}>Pronto!</li>
                    </ul>

                    {/* Conteúdo Dinâmico com base no Step */}
                    <div className="py-2 min-h-[260px] flex flex-col justify-between">
                        
                        {step === 1 && (
                            <div className="space-y-4 animate-fadeIn">
                                <div className="badge badge-primary gap-1 font-bold uppercase tracking-wider text-[10px]">Passo 1</div>
                                <h4 className="text-lg font-black uppercase tracking-tight italic">Baixar os arquivos da extensão</h4>
                                <p className="text-sm text-base-content/70 leading-relaxed">
                                    Para realizar o scraping (importação automática de chamados de outras abas), você precisa da nossa extensão do Google Chrome. Baixe o pacote compactado abaixo:
                                </p>
                                
                                <div className="bg-base-200/50 border border-base-content/5 p-4 rounded-xl flex items-center gap-3">
                                    <div className="bg-base-300 p-2 rounded-lg text-base-content/70">
                                        <Puzzle size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs font-bold font-mono">chrome-ext.zip</div>
                                        <div className="text-[10px] text-base-content/50">Tamanho aproximado: ~10 KB</div>
                                    </div>
                                    <button 
                                        type="button"
                                        className="btn btn-primary btn-sm gap-2" 
                                        onClick={handleDownload}
                                    >
                                        <Download size={14} />
                                        Download
                                    </button>
                                </div>

                                <div className="alert alert-info shadow-sm text-xs py-2 px-3">
                                    <Info size={16} className="shrink-0" />
                                    <span>Após concluir o download, <strong>extraia/descompacte</strong> o arquivo ZIP em uma pasta fácil de encontrar (ex: Área de Trabalho ou Documentos).</span>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4 animate-fadeIn">
                                <div className="badge badge-primary gap-1 font-bold uppercase tracking-wider text-[10px]">Passo 2</div>
                                <h4 className="text-lg font-black uppercase tracking-tight italic">Instalar no Google Chrome</h4>
                                <p className="text-sm text-base-content/70 leading-relaxed">
                                    Como a extensão é interna e otimizada para o nosso fluxo, você deve carregá-la no Modo do Desenvolvedor:
                                </p>

                                <div className="join join-vertical w-full border border-base-content/10 bg-base-200/20">
                                    <div className="collapse collapse-arrow join-item border-b border-base-content/10">
                                        <input type="radio" name="install-accordion" defaultChecked />
                                        <div className="collapse-title text-sm font-bold flex items-center gap-2">
                                            <span className="badge badge-sm badge-neutral">A</span>
                                            Acesse a tela de Extensões
                                        </div>
                                        <div className="collapse-content text-xs text-base-content/80 space-y-2">
                                            <p>Abra o navegador Google Chrome, abra uma nova aba e acesse o endereço:</p>
                                            <div className="flex items-center gap-2">
                                                <kbd className="kbd kbd-sm font-mono text-primary bg-base-300">chrome://extensions</kbd>
                                                <span className="text-xs text-base-content/50">(Copie e cole na barra de endereços do Chrome)</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="collapse collapse-arrow join-item border-b border-base-content/10">
                                        <input type="radio" name="install-accordion" />
                                        <div className="collapse-title text-sm font-bold flex items-center gap-2">
                                            <span className="badge badge-sm badge-neutral">B</span>
                                            Ative o Modo do Desenvolvedor
                                        </div>
                                        <div className="collapse-content text-xs text-base-content/80">
                                            <p>No canto superior direito da página de Extensões do Chrome, ative a chave seletora com o texto <strong>Modo do desenvolvedor</strong>.</p>
                                        </div>
                                    </div>

                                    <div className="collapse collapse-arrow join-item">
                                        <input type="radio" name="install-accordion" />
                                        <div className="collapse-title text-sm font-bold flex items-center gap-2">
                                            <span className="badge badge-sm badge-neutral">C</span>
                                            Carregar sem compactação
                                        </div>
                                        <div className="collapse-content text-xs text-base-content/80 space-y-2">
                                            <p>1. Clique no botão <strong>Carregar sem compactação</strong> (localizado no canto superior esquerdo).</p>
                                            <p>2. Selecione a pasta que você descompactou no <strong>Passo 1</strong> (deve conter os arquivos <code className="bg-base-300 px-1 py-0.5 rounded font-mono">manifest.json</code> e <code className="bg-base-300 px-1 py-0.5 rounded font-mono">script.js</code>).</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-4 animate-fadeIn">
                                <div className="badge badge-primary gap-1 font-bold uppercase tracking-wider text-[10px]">Passo 3</div>
                                <h4 className="text-lg font-black uppercase tracking-tight italic">Como Capturar Chamados</h4>
                                <p className="text-sm text-base-content/70 leading-relaxed">
                                    Com a extensão instalada, a importação é instantânea:
                                </p>

                                <div className="space-y-3">
                                    <div className="flex gap-3 items-start bg-base-200/50 border border-base-content/5 p-3 rounded-xl">
                                        <div className="bg-neutral text-neutral-content w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                                        <div>
                                            <h5 className="text-xs font-bold uppercase">Abra o chamado original</h5>
                                            <p className="text-xs text-base-content/60 mt-0.5">
                                                Navegue até o sistema de chamados original e clique no chamado desejado para abrir o modal de detalhes do ticket.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 items-start bg-base-200/50 border border-base-content/5 p-3 rounded-xl">
                                        <div className="bg-neutral text-neutral-content w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                                        <div>
                                            <h5 className="text-xs font-bold uppercase">Clique no ícone do Facilit</h5>
                                            <p className="text-xs text-base-content/60 mt-0.5">
                                                Clique no ícone da extensão <strong>Facilit CSC</strong> (um ícone azul de quebra-cabeça ou logo no canto superior direito do Chrome).
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 items-start bg-base-200/50 border border-base-content/5 p-3 rounded-xl">
                                        <div className="bg-primary text-primary-content w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                                        <div>
                                            <h5 className="text-xs font-bold uppercase flex items-center gap-1.5">
                                                Importação Automática
                                                <span className="badge badge-success badge-xs font-black uppercase tracking-wider text-[8px] py-1">Sem esforço</span>
                                            </h5>
                                            <p className="text-xs text-base-content/60 mt-0.5">
                                                A extensão irá raspar as informações da página e criar automaticamente um novo chamado em andamento dentro do Facilit!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="text-center py-6 space-y-4 animate-fadeIn">
                                <div className="flex justify-center text-success">
                                    <CheckCircle2 size={64} className="animate-bounce" />
                                </div>
                                <h4 className="text-2xl font-black uppercase tracking-tight italic">Instalação Concluída!</h4>
                                <p className="text-sm text-base-content/70 max-w-md mx-auto leading-relaxed">
                                    Agora você está pronto para importar chamados de forma automatizada e rápida diretamente do portal de suporte original.
                                </p>
                                
                            </div>
                        )}

                        {/* Botões de Ação do Rodapé */}
                        <div className="flex justify-between items-center mt-6 pt-4 border-t border-base-content/10">
                            <div>
                                {step > 1 && step < 4 && (
                                    <button 
                                        type="button"
                                        className="btn btn-soft btn-sm gap-1"
                                        onClick={() => setStep(step - 1)}
                                    >
                                        <ChevronLeft size={14} />
                                        Anterior
                                    </button>
                                )}
                            </div>
                            <div>
                                {step < 4 ? (
                                    <button 
                                        type="button"
                                        className="btn btn-primary btn-sm gap-1"
                                        onClick={() => setStep(step + 1)}
                                    >
                                        Próximo
                                        <ChevronRight size={14} />
                                    </button>
                                ) : (
                                    <form method="dialog">
                                        <button 
                                            className="btn btn-success btn-sm"
                                            onClick={() => setStep(1)}
                                        >
                                            Concluir
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </dialog>
        </>
    );
}
