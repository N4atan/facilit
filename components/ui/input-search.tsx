import { Search } from "lucide-react";


export function InputSearch({ placeholder }: { placeholder: string }) {
    return (
        <label className="input">
            <Search className="h-[1em] opacity-50" />
            <input type="search" required placeholder={placeholder} />
        </label>
    )
}
