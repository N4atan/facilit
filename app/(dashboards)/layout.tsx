import Header from "@/components/ui/Header";
import { SideBarContent } from "@/components/ui/SideBarContent";
import { Boxes, GalleryVertical, GalleryVerticalEnd, Package, PackageSearch, Users } from "lucide-react";
import Link from "next/link";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>



            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}



                    <Header />

                    {/* Page content here */}
                    <main className="flex flex-1 w-full flex-col p-4 lg:px-14 lg:py-12 gap-12">{children}</main>
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <SideBarContent />
                </div>
            </div>
        </>
    );
}
