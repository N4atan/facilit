import { handleFetchAllUsers } from "@/actions/user-actions";
import UserTable from "@/components/ui/table/UserTable";
import AddUserModal from "@/components/layout/AddUserModal";
import { Suspense, use } from "react";

export default function Home() {
    const users = use(handleFetchAllUsers());

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-content">Usuários</h1>
                <AddUserModal />
            </div>

            <Suspense fallback={<div className="skeleton w-full h-32"></div>}>
                <UserTable users={users} />
            </Suspense>
        </>
    );
}
