import { auth } from "@/auth"
import { logout } from "@/actions/auth-actions";
import { ActionListItem } from "./ActionListItem";
import { ChevronDown, LogOut, UserKey, Users } from "lucide-react";
import Link from "next/dist/client/link";
import { ThemeToggle } from "./ThemeToggle";
import Logo from '@/public/favicon.svg'
import Image from 'next/image'
import { UserRole } from "@prisma/client";
import { NavBarTitle } from "./NavBarTitle";

const links = [
    { href: "/chamados/csc", label: "Chamados CSC" },
]

export default async function Header() {
    const session = await auth();

    console.log(session)

    return (
        <header className="navbar bg-base-100 w-full border-b border-base-content/10">
            <div className="navbar-start">
                <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                    {/* Sidebar toggle icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                </label>

                <NavBarTitle />
            </div>

            <div className="navbar-end">
                {session?.user && (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full border border-base-300 bg-base-300">
                                <img
                                    alt="Foto de Perfil"
                                    src="https://i1-e.pinimg.com/1200x/70/39/82/70398275aa144fe877a92a04edefd7de.jpg" />
                            </div>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-2 w-52 p-2 shadow">
                            <li className="menu-title text-base-content/70">
                                <span>{session.user.email}</span>
                            </li>

                            <li><div className="divider m-0"></div></li>

                            <ActionListItem
                                text="Trocar Senha"
                                icon={<UserKey size={14} />}
                                action={logout}
                            />

                            <ThemeToggle />

                            {/* Usando o nosso novo componente de item da lista interativo */}
                            <ActionListItem
                                text="Logout"
                                icon={<LogOut size={14} />}
                                action={logout}
                            />
                        </ul>
                    </div>
                )}
            </div>
        </header >
    )
}