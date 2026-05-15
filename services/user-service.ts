// Em src/services/, você isola as funções que buscam ou manipulam dados diretamente na fonte. Essas funções rodam apenas no servidor.
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

export async function createNewUser(name: string, email: string, hashedPassword: string): Promise<User> {
    return prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            previousPassword: hashedPassword
        }
    });
}

export async function getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
}

export async function getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
        where: { id },
        include: {
            tickets: true,
        },
    });
}

export async function getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
        where: { email },
        include: {
            tickets: true,
        },
    });
}

export async function deleteUserById(id: string): Promise<User> {
    return prisma.user.delete({ where: { id } });
}

export async function updateUserById(id: string, name?: string, email?: string, password?: string): Promise<User> {
    return prisma.user.update({ where: { id }, data: { name, email, password } });
}