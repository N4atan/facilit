import { Search } from "lucide-react";

export function InputSearch({ placeholder }: { placeholder: string }) {
    return (
        <div className="join">
            <input className="input join-item overflow-ellipsis" type="search" required placeholder={placeholder} />
            <button className="btn btn-soft join-item"><Search size={16} /></button>
        </div>
    )
}
