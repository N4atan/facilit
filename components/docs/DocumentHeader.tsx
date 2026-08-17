"use client";
import React from "react";
import { FilePen } from "lucide-react";

type Props = {
        title?: string | null;
        category?: string | null;
        lastUpdated?: string | Date | null;
        onEdit?: () => void;
};

export default function DocumentHeader({ title, lastUpdated, category, onEdit }: Props) {
        const formatted = lastUpdated ? new Date(lastUpdated).toLocaleDateString('pt-BR', {
                day: '2-digit', month: '2-digit', year: 'numeric'
        }) : null;

        return (
                <div>
                        <span className="text-sm font-semibold text-primary ">{category}</span>

                        <h1 className="text-4xl font-extrabold text-content">{title}</h1>
                        
                        <div className="flex flex-row text-sm opacity-75 font-thin gap-6 mt-4">
                                {formatted && <span>Última atualização em {formatted}</span>}
                                <span className="flex items-center gap-1 link link-hover" onClick={onEdit}>
                                        <FilePen size={14} className="opacity-60" />
                                        Editar página
                                </span>
                        </div>

                        <div className="divider w-full"></div>
                </div>
        );
}
