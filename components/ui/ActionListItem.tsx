"use client"

import Link from "next/dist/client/link";
import { ReactNode, useTransition } from "react";

interface ActionListItemProps {
    text: string;
    icon?: ReactNode;
    action?: () => any | Promise<any>;
    href?: string;
}

export function ActionListItem({ text, icon, action, href }: ActionListItemProps) {
    const [isPending, startTransition] = useTransition();

    return (
        <li>
            {href ? (
                <Link href={href} className={`flex items-center gap-2 cursor-pointer ${isPending ? "opacity-50 pointer-events-none" : ""}`}>
                    {icon && <span>{icon}</span>}
                    {text}
                    {isPending && <span className="loading loading-spinner loading-xs ml-auto"></span>}
                </Link>
            ) : (
                <a
                    onClick={() => startTransition(() => action ? action() : null)}
                    className={`flex items-center justify-between gap-2 cursor-pointer ${isPending ? "opacity-50 pointer-events-none" : ""}`}
                >
                    {text}
                    {icon && <span>{icon}</span>}
                    {isPending && <span className="loading loading-spinner loading-xs ml-auto"></span>}
                </a>
            )}
        </li>
    );
}
