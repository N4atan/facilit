"use server";

import { checkDuplicatePatrimony, createNewCart } from "@/services/cart-service";
import { Cart } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function handleCreateNewCart(cartData: {
    patrimony: string;
    school: string;
    room: string;
    name: string;
    totalNotebooks: number;
    actualNotebooks: number;
}): Promise<Cart> {
    try {
        if (await checkDuplicatePatrimony(cartData.patrimony)) {
            throw new Error("Já existe um carrinho cadastrado com esse patrimônio");
        }

        const newCart = await createNewCart({
            patrimony: cartData.patrimony,
            school: cartData.school,
            room: cartData.room,
            name: cartData.name,
            totalNotebooks: Number(cartData.totalNotebooks),
            actualNotebooks: Number(cartData.actualNotebooks),
        });

        revalidatePath("/carrinhos");
        return newCart;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message || "Erro desconhecido ao criar carrinho.");
    }
}
