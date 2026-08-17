import { auth } from "@/auth"
import { logout } from "@/actions/auth-actions";
import { ActionListItem } from "./ActionListItem";
import { Book, ChevronDown, LogOut, Menu, Plus, UserKey, Users } from "lucide-react";
import Link from "next/dist/client/link";
import { ThemeToggle } from "./ThemeToggle";
import Logo from '@/public/favicon.svg'
import Image from 'next/image'
import { UserRole } from "@prisma/client";
import { NavBarTitle } from "./NavBarTitle";

const links = [
	{ href: "/chamados/csc", label: "Chamados CSC" },
]

export default async function HeaderDocs() {
	const session = await auth();

	return (
		<header className="navbar bg-base-100 w-full border-b border-base-content/10">
			<div className="navbar-start md:px-4 gap-2">
				<label htmlFor="my-drawer-3" className="btn btn-ghost drawer-button lg:hidden">
					<Menu size={24} />
				</label>

				<div className="flex items-center ">
					<Book size={24} className="text-primary" />

					<h1 className="px-4 capitalize font-bold text-xl">
						Facilit
						<span className="mx-2 font-thin opacity-70">Docs</span>
					</h1>
				</div>
			</div>

			<div className="navbar-end gap-4">
				<Link href='/docs/novo'>
					<button className="btn btn-soft btn-primary btn-sm ">
						<Plus size={14} />
						<span className="hidden md:inline-block ml-2">Nova Página</span>
					</button>
				</Link>

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