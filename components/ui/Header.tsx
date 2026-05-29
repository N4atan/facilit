import { auth } from "@/auth"
import { logout } from "@/actions/auth-actions";
import { ActionListItem } from "./action-list-item";
import { ChevronDown, LogOut, Users } from "lucide-react";
import Link from "next/dist/client/link";
import { ThemeToggle } from "./ThemeToggle";

const links = [
    { href: "/chamados/csc", label: "Chamados CSC" },
]

export default async function Header() {
    const session = await auth();

    return (
        <header className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Facilit - SL</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href}>{link.label}</Link>
                        </li>
                    ))}
                    <li className="dropdown">
                        <div tabIndex={0} >
                            Administrador
                            <ChevronDown size={12} />
                        </div>
                        <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <ActionListItem
                                text="Usuários"
                                icon={<Users size={16} />}
                                href="/usuarios"
                            />
                        </ul>
                    </li>
                </ul>
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
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li className="menu-title text-base-content/70 border-b border-base-200">
                                <span>{session.user.email}</span>
                            </li>
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>

                            <ThemeToggle />

                            {/* Usando o nosso novo componente de item da lista interativo */}
                            <ActionListItem
                                text="Logout"
                                icon={<LogOut size={16} />}
                                action={logout}
                            />
                        </ul>
                    </div>
                )}
            </div>
        </header >
    )
}