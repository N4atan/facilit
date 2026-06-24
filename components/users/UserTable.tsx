"use client";

import { UserWithoutPassword } from "@/services/user-service"
import { RotateCcwKey, UserX } from "lucide-react";
import { handleDeleteUserById } from "@/actions/user-actions";
import toast from "react-hot-toast";
import { showCodeToast } from "@/components/ui/ToastCode";

type Props = {
    users: UserWithoutPassword[];
    isLoading?: boolean;
}

const keyMap: Record<string, string> = {

    "name": "Nome",
    "email": "Email",
    "role": "Perfil",
    "status": "Status",
    "createdAt": "Criado em"
};

const roleMap: Record<string, string> = {
    "ADMIN": "badge badge-info",
    "USER": "badge badge-secondary",
};

const statusMap: Record<string, string> = {
    "ATIVO": "badge badge-success",
    "INATIVO": "badge badge-error",
};

export default function UserTable({ users, isLoading }: Props) {
    const handleDelete = async (id: string) => {
        try {
            if (!confirm("Tem certeza que deseja remover este usuário?")) return;
            
            await handleDeleteUserById(id);

            toast.success("Usuário removido com sucesso!");
        } catch (error: any) {
            showCodeToast("Erro ao remover usuário", error.message, "error");
        }
    };

    if (isLoading) return (
        <div className="skeleton w-full h-32"></div>
    )

    if (users.length === 0) return (
        <div className="card card-border w-full bg-base-200">
            <div className="card-body">
                <div className="flex items-center justify-center rounded-full p-4 bg-base-300">
                    <UserX size={40} />
                </div>

                <h2 className="card-title">Nenhum Usuário Encontrado...</h2>
                <p className="text-xs text-content/60">
                    Que tal começar adicionando o seu primeiro usuário para gerenciar a equipe?
                </p>
            </div>
        </div>
    )

    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        {Object.keys(keyMap).map((key) => (
                            <th key={key}>{keyMap[key]}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>

                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td><span className={roleMap[user.role]}>{user.role}</span></td>
                            <td><span className={statusMap[user.status]}>{user.status}</span></td>
                            <td>{new Date(user.createdAt).toLocaleDateString('pt-BR')}</td>
                            <td>
                                <button className="btn btn-sm btn-ghost tooltip tooltip-neutral" data-tip="Resetar Senha" onClick={() => handleDelete(user.id)}>
                                    <RotateCcwKey size={16} />
                                </button>
                                <button className="btn btn-sm btn-ghost tooltip tooltip-error" data-tip="Remover" onClick={() => handleDelete(user.id)}>
                                    <UserX size={16} color="red" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
