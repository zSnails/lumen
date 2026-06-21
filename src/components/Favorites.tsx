import { useFavoritesStore, type Favorite } from "../store/favoritesStore";
import { useFavoriteModal } from "./AddFavoriteModal";

export function Favorites() {
    const { favorites } = useFavoritesStore();
    return <div className="grid grid-cols-4 gap-4">
        {favorites.map((fav, idx) => (
            <FavoriteElement key={`${fav.title}-${idx}`} {...fav} />
        ))}
        <AddFavoriteElement />
    </div>;
}

type FavoriteElementProps = Readonly<Favorite>;

export function AddFavoriteElement() {
    const { open } = useFavoriteModal();
    return <div className="flex items-center flex-col gap-2 w-fit mx-auto">
        <button
            onClick={open}
            className="flex gap-2 items-center hover:-translate-y-1 transition-all duration-300 justify-center border border-border hover:border-cyan-400/60 hover:cursor-pointer border-dashed w-40 h-40 aspect-square bg-card/50 hover:bg-cyan-900/70 rounded-4xl">
            <Add />
            Add
            {/* <div className="font-sans text-steel"> */}
            {/* </div> */}
        </button>
    </div>;
}

export function FavoriteElement({ title, href }: FavoriteElementProps) {
    return <div className="flex items-center flex-col gap-2 w-fit mx-auto">
        <a className="flex active:bg-cyan-900/70 hover:bg-card hover:-translate-y-1 transition-all duration-300 items-center justify-center border border-border w-40 h-40 bg-card/50 aspect-square rounded-4xl" href={href}>
            <i className="text-center">
                {title}
            </i>
        </a>
        {/*
            <div className="font-sans text-steel">
        {title}
        </div>
            */}
    </div>;
}

function Add() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
}
