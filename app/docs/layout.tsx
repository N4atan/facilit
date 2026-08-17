
import { handleFetchAllDocumentsWithoutMd } from "@/actions/document-action";
import Header from "@/components/ui/Header";
import HeaderDocs from "@/components/ui/HeaderDocs";
import { QueryProvider } from "@/providers/QueryClientProvider";
import { CategoryDocs } from "@prisma/client";
import Link from "next/link";

import { use } from "react";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const documents = use(handleFetchAllDocumentsWithoutMd());


    return (
        <>
            <HeaderDocs />
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center p-4 md:p-8 md:px-10">
                    {/* Page content here */}
                    {children}
                </div>
                <div className="drawer-side scrollbar-thin border-r border-r-base-200">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>


                    <ul className="menu  bg-base-100 w-60 min-h-screen ">
                        <li>
                            <h2 className="menu-title">Começe por aqui</h2>
                            <ul>
                                <li>
                                    <Link href={'/docs/'}>
                                        Introdução à Wiki
                                    </Link>

                                </li>
                            </ul>
                        </li>


                        <li>
                            <h2 className="menu-title">Infraestrutura</h2>
                            <ul>
                                {documents.filter(d => d.category == CategoryDocs.INFRAESTRUTURA).map((doc) => (
                                    <li key={doc.slug}>
                                        <Link href={`/docs/${doc.slug}`} >
                                            {doc.title}
                                            olá
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li>
                            <h2 className="menu-title">Rotina</h2>
                            <ul>
                                {documents.filter(d => d.category == CategoryDocs.ROTINA).map((doc) => (
                                    <li key={doc.slug}>
                                        <Link href={`/docs/${doc.slug}`} >
                                            {doc.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li>
                            <h2 className="menu-title">Eventos</h2>
                            <ul>
                                {documents.filter(d => d.category == CategoryDocs.EVENTOS).map((doc) => (
                                    <li key={doc.slug}>
                                        <Link href={`/docs/${doc.slug}`} >
                                            {doc.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li>
                            <h2 className="menu-title">Sistemas</h2>
                            <ul>
                                {documents.filter(d => d.category == CategoryDocs.SISTEMAS).map((doc) => (
                                    <li key={doc.slug}>
                                        <Link href={`/docs/${doc.slug}`} >
                                            {doc.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>

                </div>
            </div>

        </>
    );
}
