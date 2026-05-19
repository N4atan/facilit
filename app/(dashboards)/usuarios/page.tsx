import UserCreateForm from "@/components/layout/user-create-form";

export default function Home() {
    return (
        <div className="flex flex-1 w-full flex-col items-center justify-between py-32 px-16 sm:items-start">
            <h1 className="text-3xl font-bold text-content">Gerencie os usuários</h1>
            <UserCreateForm />
        </div>
    );
}
