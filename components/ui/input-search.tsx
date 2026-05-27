import { Search } from "lucide-react";


export function InputSearch() {
    return (
        <label className="input">
            <Search className="h-[1em] opacity-50" />
            <input type="search" required placeholder="Pesquisar" />
        </label>
    )
}
