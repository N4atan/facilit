"use client"

import { ReactNode, useTransition } from "react";

interface ActionListItemProps {
    text: string;
    icon?: ReactNode;
    action: () => any | Promise<any>;
}

export function ActionListItem({ text, icon, action }: ActionListItemProps) {
    const [isPending, startTransition] = useTransition();

    return (
        <li>
            <a 
                onClick={() => startTransition(() => action())} 
                className={`flex items-center gap-2 cursor-pointer ${isPending ? "opacity-50 pointer-events-none" : ""}`}
            >
                {icon && <span>{icon}</span>}
                {text}
                {isPending && <span className="loading loading-spinner loading-xs ml-auto"></span>}
            </a>
        </li>
    );
}
