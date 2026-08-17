import { auth } from "@/auth";
import { Book, GalleryVerticalEnd, Home, Package, Users } from "lucide-react";
import Link from "next/link";


export async function SideBarContent () {

    const session = await auth();

    return (
        <div className="flex min-h-full flex-col items-start bg-base-300 md:bg-base-200/20 border-r border-base-content/10 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
                {/* List item */}
                <li>
                    <Link href={"/"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2" data-tip="Homepage">
                        {/* Home icon */}
                        <Home size={16} className="my-1.5 inline-block size-4" />
                        <span className="is-drawer-close:hidden">Homepage</span>
                    </Link>
                </li>

                {/* List item */}
                <li>
                    <Link href={"/chamados/csc"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2" data-tip="Chamados CSC">
                        <GalleryVerticalEnd size={16} className="my-1.5 inline-block size-4" />
                        <span className="is-drawer-close:hidden">Chamados CSC</span>
                    </Link>
                </li>

                <li>
                    <Link href={"/carrinhos"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2" data-tip="Carrinhos">
                        <Package size={16} className="my-1.5 inline-block size-4" />
                        <span className="is-drawer-close:hidden">Carrinhos</span>
                    </Link>
                </li>

                <li>
                    <Link href={"/docs"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2" data-tip="Documentação">
                        <Book size={16} className="my-1.5 inline-block size-4" />
                        <span className="is-drawer-close:hidden">Documentação</span>
                    </Link>
                </li>

                {session?.user.role === "ADMIN" && (
                    <li>
                        <Link href={"/usuarios"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2" data-tip="Usuários">
                            <Users size={16} className="my-1.5 inline-block size-4" />
                            <span className="is-drawer-close:hidden">Usuários</span>
                        </Link>
                    </li>
                )}
            </ul>

        </div>
    )
}