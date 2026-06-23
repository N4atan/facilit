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
