"use client";

import { useState } from "react";
import { TabListView } from "@/components/ui/TabListView";
import { InputSearch } from "@/components/ui/InputSearch";
import { CloudDownload } from "lucide-react";
import TicketCreateModal from "@/components/tickets/TicketCreateModal";
import TicketTable from "@/components/tickets/TicketTable";
import { TicketWithAuthor } from "@/services/ticket-service";
import { TicketStatus } from "@/lib/enums";
import TicketKanbanColumn from "./TicketKanbanColumn";
import { exportToExcel } from "@/lib/xlsx-exportes";
import ExtensionGuideModal from "./ExtensionGuideModal";

interface TicketDashboardProps {
    tickets: TicketWithAuthor[];
    isFetching?: boolean;

}

export default function TicketDashboard({ tickets, isFetching }: TicketDashboardProps) {
    const [tab, setTab] = useState<"table" | "kanban">("kanban");

    return (
        <div className="card border border-base-content/10 rounded-lg p-4 gap-5">
            <div className="flex flex-wrap justify-between items-center gap-5 mt-4">
                <TabListView activeTab={tab} setActiveTab={(e) => setTab(e as "table" | "kanban")} />

                {/* TODO: Filtros por autor */}

                <div className="flex items-center gap-5">
                    <ExtensionGuideModal />

                    <button className="btn btn-soft btn-secondary" onClick={() => exportToExcel({ data: tickets, name: `Facilit-ChamadosCSC` })}>
                        <CloudDownload size={16} />
                        Exportar
                    </button>

                    <TicketCreateModal />
                </div>
            </div>

            {isFetching ? (
                <div className="skeleton w-full h-96"></div>
            ) : tab === "table" ? (
                <TicketTable tickets={tickets} />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <TicketKanbanColumn status={TicketStatus.EM_ANDAMENTO} tickets={tickets} />
                    <TicketKanbanColumn status={TicketStatus.RESOLVIDO} tickets={tickets} />
                </div>
            )}
        </div>
    );
}
