import { prisma } from "@/lib/prisma";
import { Prisma, Cart } from "@prisma/client";

export async function createNewCart(cart: Prisma.CartUncheckedCreateInput): Promise<Cart> {
    return prisma.cart.create({
        data: cart
    });
}

export async function getAllCarts(): Promise<Cart[]> {
    return prisma.cart.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
}

export async function checkDuplicatePatrimony(patrimony: string): Promise<boolean> {
    const count = await prisma.cart.count({ where: { patrimony } });
    return count > 0;
}

export async function deleteCartByPatrimony(patrimony: string): Promise<Cart> {
    return prisma.cart.delete({ where: { patrimony } });
}

export async function getCartById(id: string): Promise<Cart | null> {
    return prisma.cart.findUnique({
        where: { id }
    });
}

export async function updateCart(id: string, cart: Prisma.CartUncheckedUpdateInput): Promise<Cart> {
    return prisma.cart.update({
        where: { id },
        data: cart
    });
}