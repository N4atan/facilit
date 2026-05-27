import { InputSearch } from "@/components/ui/input-search";
import { CloudDownload, Kanban, Table } from "lucide-react";
import { Suspense, use } from "react";
import { handleFetchAllTickets } from "@/actions/ticket-actions";
import TicketTable from "@/components/ui/table/TicketTable";
import TicketCreateModal from "@/components/layout/ticket-create-modal";

export default function Home() {
    const tickets = use(handleFetchAllTickets());

    const openTicketsCount = tickets.filter(t => t.status === "ABERTO" || t.status === "EM_ANDAMENTO").length;
    const closedTicketsCount = tickets.filter(t => t.status === "RESOLVIDO" || t.status === "FECHADO").length;
    const totalTicketsCount = tickets.length;

    return (
        <>
            <h1 className="text-3xl font-bold text-content">Gestão de Chamados - CSC</h1>
            <div className="flex justify-end items-center gap-5 mt-4">

                <div role="tablist" className="tabs tabs-lift flex-1">
                    <a role="tab" className="tab gap-2 tab-active">
                        <Table size={16} />
                        Tabela
                    </a>
                    <a role="tab" className="tab gap-2">
                        <Kanban size={16} />
                        Kanban
                    </a>
                </div>

                <InputSearch />

                <button className="btn btn-outline">
                    <CloudDownload size={16} />
                    Exportar
                </button>

                <TicketCreateModal />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                <div className="border rounded-box border-base-content/10 p-5 bg-base-100 shadow-sm">
                    <h2 className="text-sm font-semibold text-content/60">Chamados Abertos</h2>
                    <p className="text-3xl font-bold text-content mt-2">{openTicketsCount}</p>
                </div>
                <div className="border rounded-box border-base-content/10 p-5 bg-base-100 shadow-sm">
                    <h2 className="text-sm font-semibold text-content/60">Chamados Fechados</h2>
                    <p className="text-3xl font-bold text-content mt-2">{closedTicketsCount}</p>
                </div>
                <div className="border rounded-box border-base-content/10 p-5 bg-base-100 shadow-sm">
                    <h2 className="text-sm font-semibold text-content/60">Total de Chamados</h2>
                    <p className="text-3xl font-bold text-content mt-2">{totalTicketsCount}</p>
                </div>
            </div>

            <div className="mt-8">
                <Suspense fallback={<div className="skeleton w-full h-32"></div>}>
                    <TicketTable tickets={tickets} />
                </Suspense>
            </div>
        </>
    );
}