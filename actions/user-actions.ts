"use server"

import { createNewUser, deleteUserById, getAllUsers, getUserById, getUserByEmail, updateUserById } from "@/services/user-service";
import { User } from "@prisma/client";

export async function handleCreateNewUser(userData: { name: string, email: string, password: string }): Promise<User> {
    try {
        const name = userData.name;
        const email = userData.email;
        const password = userData.password;

        if (!name || !email || !password) {
            throw new Error("Name, email, and password are required");
        }

        const userExists = await getUserByEmail(email);

        if (userExists) {
            throw new Error("User already exists");
        }


        // revalidatePath();

        return await createNewUser(name, email, password);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function handleFetchAllUsers(): Promise<User[]> {
    try {
        return await getAllUsers();
    } catch (error) {
        console.error(error);
        return [];
    }
}


