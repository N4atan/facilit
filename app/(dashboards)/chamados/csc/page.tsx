import { handleFetchAllTickets } from "@/actions/ticket-actions";
import TicketDashboard from "@/components/tickets/TicketDashboard";
import { TicketStatus } from "@/lib/enums";

export default async function Home() {
    const tickets = await handleFetchAllTickets();

    const openTicketsCount = tickets.filter(t => t.status === TicketStatus.ABERTO || t.status === TicketStatus.EM_ANDAMENTO).length;
    const closedTicketsCount = tickets.filter(t => t.status === TicketStatus.RESOLVIDO).length;
    const cancelTicketsCount = tickets.filter(t => t.status === TicketStatus.CANCELADO).length;
    const totalTicketsCount = tickets.length;

    return (
        <>
            <h1 className="text-3xl font-bold text-content">Gestão de Chamados - CSC</h1>


            <div className="stats border border-base-content/10 stats-vertical md:stats-horizontal">
                <div className="stat">
                    <div className="stat-title">Chamados em Atendimento</div>
                    <div className="stat-value">{openTicketsCount}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Chamados Encerrados</div>
                    <div className="stat-value text-success">{closedTicketsCount}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Chamados Cancelados</div>
                    <div className="stat-value text-error">{cancelTicketsCount}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Total de Chamados</div>
                    <div className="stat-value">{totalTicketsCount}</div>
                </div>
            </div>

            <TicketDashboard tickets={tickets} />
        </>
    );
}
