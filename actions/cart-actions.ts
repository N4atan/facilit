"use server";

import { checkDuplicatePatrimony, createNewCart, deleteCartByPatrimony, getAllCarts, getCartById, updateCart } from "@/services/cart-service";
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

export async function handleDeleteCartByPatrimony(patrimony: string): Promise<Cart> {
    try {
        const deletedCart = await deleteCartByPatrimony(patrimony);
        revalidatePath("/carrinhos");
        return deletedCart;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message || "Erro desconhecido ao deletar carrinho.");
    }
}

export async function handleGetCartById(id: string) : Promise<Cart> {
    try {
        const cart = await getCartById(id);
        if(!cart){
            throw new Error("Carrinho não encontrado");
        }
        return cart;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message || "Erro desconhecido ao buscar carrinho.");
    }
}

export async function handleGetAllCarts() : Promise<Cart[]> {
    try {
        const carts = await getAllCarts();
        return carts;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message || "Erro desconhecido ao buscar carrinhos.");
    }
}

export async function handleUpdateCart(
    id: string,
    cartData: {
        school: string;
        room: string;
        name: string;
        totalNotebooks: number;
        actualNotebooks: number;
    }
): Promise<Cart> {
    try {
        const existingCart = await getCartById(id);
        if (!existingCart) {
            throw new Error("Carrinho não encontrado");
        }

    
        const updatedCart = await updateCart(id, {
            school: cartData.school,
            room: cartData.room,
            name: cartData.name,
            totalNotebooks: Number(cartData.totalNotebooks),
            actualNotebooks: Number(cartData.actualNotebooks),
        });

        revalidatePath("/carrinhos");
        return updatedCart;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message || "Erro desconhecido ao atualizar carrinho.");
    }
}