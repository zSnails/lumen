import { useState } from "react"

export function SearchBar() {
    const [focused, setFocused] = useState<boolean>(false);

    return <form className="w-full mx-auto max-w-xl" role="search">
        <div className={`w-full group flex items-center gap-3 px-5 py-3.5 border rounded-full bg-card/50 backdrop-blur-xl transition-all duration-300 ${focused
            ? "border-cyan-400/60"
            : "border-border hover:border-border/80"
            }`}>
            <Search />
            <input
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search or type an URL to begin"
                inputMode="search"
                autoComplete="off"
                className="w-full text-base text-bone bg-transparent focus:outline-none placeholder:text-muted-foreground/70"
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
