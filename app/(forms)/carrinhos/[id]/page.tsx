import { handleGetCartById } from "@/actions/cart-actions";
import { auth } from "@/auth";
import CartOpenForm from "@/components/cart/CartOpenForm";
import { PackageSearch } from "lucide-react";
import Link from "next/link";

export default async function PageOpenCart({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const cart = await handleGetCartById(id);
    const session = await auth();

    return (
        <main className="flex flex-1 w-full flex-col p-4 lg:px-14 lg:py-12 gap-12">
            {session?.user && (
                <div className="breadcrumbs hidden sm:block">
                    <ul>
                        <li>
                            <Link href="/carrinhos">
                                <PackageSearch size={14} />
                                Carrinhos
                            </Link>
                        </li>
                        <li>Abertura {cart.name} - {cart.room}</li>
                    </ul>
                </div>
            )}

            <CartOpenForm
                cart={cart}
                session={session}
            />
        </main>
    );
}
