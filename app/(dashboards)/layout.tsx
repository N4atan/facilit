import Header from "@/components/ui/Header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <main className="min-h-full flex flex-col">
            <Header />
            <div className="flex-1 p-10 bg-white dark:bg-black">
                {children}
            </div>
        </main>

    );
}
