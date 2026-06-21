import { useCallback, useRef } from "react"
import { Input } from "./AddFavoriteModal";

export function SearchBar() {
    const query = useRef<HTMLInputElement | null>(null);

    const handleSubmit = useCallback(() => {
        globalThis.open(`https://google.com/search?q=${encodeURIComponent(query.current?.value ?? "")}`);
    }, []);

    return <form className="w-full mx-auto max-w-xl" role="search" onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
    }}>
        <div className={`w-full border-border focus-within:border-cyan-400 group flex items-center gap-3 px-5 py-3.5 border rounded-full bg-card/50 backdrop-blur-xl transition-all duration-300`}>
            <Search />
            <Input
                required
                ref={query}
                placeholder="Search or type an URL to begin"
                inputMode="search"
                autoComplete="off"
            />
            <button type="submit" className="bg-cyan-400 rounded-full p-2 text-night hover:bg-cyan-500 hover:text-bone hover:-translate-y-1 transition-all transition-300 hover:cursor-pointer">
                <ArrowUpRight />
            </button>
        </div>
    </form>
}

function Search() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>
}

function ArrowUpRight() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
}
