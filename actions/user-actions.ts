"use server"

import { createNewUser, deleteUserById, getAllUsers, getUserById, getUserByEmail, updateUserById, UserWithoutPassword } from "@/services/user-service";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export async function handleCreateNewUser(userData: { name: string, email: string, password: string }): Promise<User> {
    try {
        const name: string = userData.name;
        const email: string = userData.email.toLowerCase();
        const password: string = userData.password;

        if (!name || !email || !password) {
            throw new Error("Name, email, and password are required");
        }

        const userExists = await getUserByEmail(email);

        if (userExists) {
            throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword: string = await bcrypt.hash(password, salt);


        // revalidatePath();

        return await createNewUser(name, email, hashedPassword);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function handleFetchAllUsers(): Promise<UserWithoutPassword[]> {
    try {
        return await getAllUsers();
    } catch (error) {
        console.error(error);
        return [];
    }
}


export async function handleDeleteUserById(userId: string): Promise<void> {
    try {
        await deleteUserById(userId);
    } catch (error) {
        console.error(error);
        throw error;
    }
}