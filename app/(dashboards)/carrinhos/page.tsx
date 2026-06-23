import { FolderLock, FolderOpen, Laptop, Tag, User, Folders } from "lucide-react";
import { getAllCarts } from "@/services/cart-service";
import CartBtnModal from "@/components/cart/CartBtnModal";

export default async function Carrinhos() {
    const carts = await getAllCarts();

    const lockedCartsCount = carts.filter((c) => c.status === "FECHADO").length;
    const inUseCartsCount = carts.filter((c) => c.status === "ABERTO").length;
    const totalCartsCount = carts.length;

    return (
        <>
            <h1 className="text-3xl font-bold text-content">Gestão de Carrinhos</h1>

            <div className="stats border border-base-content/10 stats-vertical md:stats-horizontal">
                <div className="stat">
                    <div className="stat-figure text-error"><FolderLock className="w-10 h-10 inline-block" /></div>
                    <div className="stat-title">Carrinhos Trancados</div>
                    <div className="stat-value text-error">{lockedCartsCount}</div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-info"><FolderOpen className="w-10 h-10 inline-block" /></div>
                    <div className="stat-title">Carrinhos Em Uso</div>
                    <div className="stat-value text-info">{inUseCartsCount}</div>
                </div>
                <div className="stat">
                    <div className="stat-figure"><Folders className="w-10 h-10 inline-block" /></div>
                    <div className="stat-title">Total de Carrinhos</div>
                    <div className="stat-value">{totalCartsCount}</div>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-content">Lista de Carrinhos</h2>
                    <CartBtnModal />
                </div>

                {carts.length === 0 ? (
                    <div className="border border-base-content/10 border-dashed rounded-md h-52 bg-base-200/30 flex flex-col gap-2 items-center justify-center text-base-content/50">
                        <Laptop size={32} className="opacity-50" />
                        <span>Nenhum carrinho cadastrado</span>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row flex-wrap gap-6">
                        {carts.map((cart) => (
                            <div key={cart.id} className="card card-border card-md max-w-xs hover:border-base-content/30 transition-all duration-200 min-w-[300px]">
                                <div className="card-body">
                                    <div className="flex items-center justify-between">
                                        <span className="card-title">{cart.name}</span>
                                        {cart.status === "ABERTO" ? (
                                            <span className="tooltip tooltip-info tooltip-top badge badge-info" data-tip="Em Uso">
                                                <FolderOpen size={16} />
                                            </span>
                                        ) : (
                                            <span className="tooltip tooltip-error tooltip-top badge badge-error" data-tip="Trancado">
                                                <FolderLock size={16} />
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 text-base-content/70 mt-2">
                                        <Laptop size={14} />
                                        <span>{cart.actualNotebooks}/{cart.totalNotebooks} Notebooks</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-base-content/70">
                                        <Tag size={14} />
                                        <span>{cart.patrimony}</span>
                                    </div>
                                </div>

                                <div className="card-action flex flex-row justify-between p-4 border-t border-base-content/10 bg-base-200/30 text-base-content/70">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-sm">{cart.school}</span>
                                    </div>
                                    <span className="text-sm">{cart.room}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-content">Últimas Movimentações</h2>
                    <button className="btn btn-primary btn-outline">Registrar Movimentação</button>
                </div>

                {false ? <div className="border border-base-content/10 border-dashed rounded-md h-52 bg-base-200/30"></div> : null}

                {true && (
                    <div className="">
                        <ul className="card card-border card-md hover:border-base-content/30 transition-all duration-200">
                            <li className="last:border-0 border-b border-base-content/10 w-full p-5 px-8 flex flex-row items-center gap-4 hover:bg-base-200/40 transition-all duration-200">
                                <div className="p-3 rounded-full bg-base-200/30 text-info">
                                    <FolderOpen size={24} />
                                </div>

                                <div className="flex-1">
                                    <div className="flex gap-2 items-center">
                                        <span className="card-title">Nome do Carrinho</span>
                                        <span className="text-base-content/70 font-medium text-sm">Ação</span>
                                    </div>
                                    <span className="text-base-content/50 font-medium text-sm">Prof. Ana Silva ¨ | Sala X | Obs.</span>
                                </div>

                                <div className="flex flex-col items-end">
                                    <span className="text-base-content/70 font-medium text-sm">Hora e Data</span>
                                    <span className="text-base-content/50 font-medium text-sm">Quem Operou</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}
