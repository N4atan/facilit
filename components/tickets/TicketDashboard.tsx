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

interface TicketDashboardProps {
    tickets: TicketWithAuthor[];
}

export default function TicketDashboard({ tickets }: TicketDashboardProps) {
    const [tab, setTab] = useState<"table" | "kanban">("kanban");

    return (
        <div className="card border border-base-content/10 rounded-lg p-4 gap-5">
            <div className="flex flex-wrap justify-between items-center gap-5 mt-4">
                <TabListView activeTab={tab} setActiveTab={(e) => setTab(e as "table" | "kanban")} />

                {/* TODO: Filtros por autor */}

                <div className="flex items-center gap-5">
                    <button className="btn btn-soft btn-secondary" onClick={() => exportToExcel({ data: tickets, name: `Facilit-ChamadosCSC` })}>
                        <CloudDownload size={16} />
                        Exportar
                    </button>

                    <TicketCreateModal />
                </div>
            </div>

            {tab === "table" ? (
                <TicketTable tickets={tickets} />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2  gap-4 mt-2">

                    <TicketKanbanColumn status={TicketStatus.EM_ANDAMENTO} tickets={tickets} />
                    <TicketKanbanColumn status={TicketStatus.RESOLVIDO} tickets={tickets} />
                    
                </div>
            )}
        </div>
    );
}
