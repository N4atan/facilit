import { Package, PackageOpen, Laptop, PackageSearch} from "lucide-react";
import { getAllCarts } from "@/services/cart-service";
import CartBtnModal from "@/components/cart/CartBtnModal";
import CartCard from "@/components/cart/CartCard";

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
                    <div className="stat-figure text-error"><Package className="w-10 h-10 inline-block" /></div>
                    <div className="stat-title">Carrinhos Trancados</div>
                    <div className="stat-value text-error">{lockedCartsCount}</div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-info"><PackageOpen className="w-10 h-10 inline-block" /></div>
                    <div className="stat-title">Carrinhos Em Uso</div>
                    <div className="stat-value text-info">{inUseCartsCount}</div>
                </div>
                <div className="stat">
                    <div className="stat-figure"><PackageSearch className="w-10 h-10 inline-block" /></div>
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
                    <div className="flex flex-col md:flex-row flex-wrap gap-6 justify-center">
                        {carts.map((cart) => (
                            <CartCard key={cart.id} cart={cart} />
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-content">Últimas Movimentações</h2>
                </div>

                {false ? <div className="border border-base-content/10 border-dashed rounded-md h-52 bg-base-200/30"></div> : null}

                {true && (
                    <div className="">
                        <ul className="card card-border card-md hover:border-base-content/30 transition-all duration-200">
                            <li className="last:border-0 border-b border-base-content/10 w-full p-2 px-4 lg:p-5 lg:px-8 flex flex-row items-center gap-2 lg:gap-4 hover:bg-base-200/40 transition-all duration-200">
                                <div className="p-3 rounded-full bg-base-200/30 text-info">
                                    <PackageOpen size={24} />
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
