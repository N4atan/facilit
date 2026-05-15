"use server"

import { createNewUser, deleteUserById, getAllUsers, getUserById, getUserByEmail, updateUserById } from "@/services/user-service";
import { User } from "@prisma/client";

export async function handleCreateNewUser(formData: FormData): Promise<Object> {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!name || !email || !password) {
            throw new Error("Name, email, and password are required");
        }

        const userExists = await getUserByEmail(email);

        if (userExists) {
            throw new Error("User already exists");
        }

        const newUser = await createNewUser(name, email, password)

        // revalidatePath();

        return { message: "User created successfully", user: newUser }
    } catch (error) {
        console.error(error);
        return { message: "Failed to create user", error };
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


