import { handleFetchAllUsers } from "@/actions/user-actions";
import UserTable from "@/components/ui/table/UserTable";
import AddUserModal from "@/components/layout/AddUserModal";
import { Suspense, use } from "react";
import { InputSearch } from "@/components/ui/input-search";

export default function Home() {
    const users = use(handleFetchAllUsers());

    return (
        <>
            <h1 className="text-3xl font-bold text-content">Gerencie os Usuários do Sistema</h1>
            <div className="flex justify-end items-center gap-5">
                {/* TODO: Implementar filter, sort */}
                {/* TODO: Implementar formas de visualização */}
                <InputSearch placeholder="Pesquise pelo nome ou email" />
                <AddUserModal />
            </div>

            <Suspense fallback={<div className="skeleton w-full h-32"></div>}>
                <UserTable users={users} />
            </Suspense>
        </>
    );
}
