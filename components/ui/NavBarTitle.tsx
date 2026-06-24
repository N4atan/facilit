"use client"

import { usePathname } from "next/navigation";


export const NavBarTitle = () => {
    const pathname = usePathname();
    const title = pathname.split('/')[1];
    return (
        <div className="px-4 capitalize font-bold text-xl">{title}</div>
    )
}