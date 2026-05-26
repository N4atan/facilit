import Header from "@/components/ui/Header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
        <Header />
        <main className="flex flex-1 w-full flex-col px-14 py-12 gap-12">
            {children}
        </main>
        </>
    );
}
