"use client"

import { Icon, Kanban, Table } from "lucide-react";

type options_table = {
    title: string;
    value: string;
    icon: string;
}

const Icone = ({ icon }: { icon: string }) => {
    switch (icon) {
        case "table":
            return <Table size={16} />
        case "kanban":
            return <Kanban size={16} />
        default:
            return null
    }
}

export const TabListViewOptions = [
    {
        title: "Tabela",
        value: "table",
        icon: "table",
    },
    {
        title: "Kanban",
        value: "kanban",
        icon: "kanban",
    },
]

export const TabListView = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
    return (
        <div role="tablist" className="tabs tabs-box">
            {TabListViewOptions.map((op) => (
                <a key={op.value} role="tab" className={`tab gap-2 ${activeTab === op.value ? "tab-active" : ""}`} onClick={() => setActiveTab(op.value)}>
                    <Icone icon={op.icon} />
                    {op.title}
                </a>
            ))}
        </div>
    )
}
