"use client"

import { UserPlus, UserX } from "lucide-react";
import { User } from "@prisma/client";
import { useState, useEffect } from "react";
import { handleDeleteUserById, handleFetchAllUsers } from "@/actions/user-actions";
import { UserWithoutPassword } from "@/services/user-service";
import { showCodeToast } from "@/components/ui/toast-code";
import UserCreateForm from "@/components/layout/user-create-form";
import toast from "react-hot-toast";



export default function Home() {
    const [users, setUsers] = useState<UserWithoutPassword[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            setUsers(await handleFetchAllUsers());
        } catch (error) {
            showCodeToast("Erro ao buscar usuários", error, "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await handleDeleteUserById(id);
            toast.success("Usuário removido com sucesso!");
            fetchData();
        } catch (error: any) {
            showCodeToast("Erro ao remover usuário", error.message, "error");
        }
    };



    return (
        <>

            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-content">Usuários</h1>

                <button className="btn btn-sm btn-primary btn-outline" onClick={() => (document.getElementById("modal_add_user") as HTMLDialogElement)?.showModal()}>
                    <UserPlus size={16} />
                    Adicionar
                </button>
            </div>

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                {isLoading ? (
                    <div className="skeleton w-full h-32"></div>
                ) : (
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                {Object.keys(users[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}

                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button className="btn btn-sm btn-ghost tooltip tooltip-error" data-tip="Remover" onClick={() => handleDelete(user.id)}>
                                            <UserX size={16} color="red" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <dialog id="modal_add_user" className="modal modal-bottom sm:modal-middle">
                <UserCreateForm isModal onCreateUser={() => fetchData()}/>
            </dialog>

        </>
    );
}
