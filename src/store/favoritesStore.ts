import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Favorite = {
    id: `${string}-${string}-${string}-${string}-${string}`;
    title: string;
    href: string;
};

export type FavoritesStoreState = {
    favorites: Array<Favorite>;

    addFavorite: (favorite: Favorite) => Favorite;
    removeFavorite: (favorite: Favorite) => Favorite;
};

export const useFavoritesStore = create<FavoritesStoreState>()(
    persist((set, _) => ({
        favorites: [],
        addFavorite: (favorite: Favorite) => {
            set(s => ({ favorites: [...s.favorites, favorite] }));
            return favorite;
        },
        removeFavorite: (favorite: Favorite) => {
            set(s => ({ favorites: s.favorites.filter(f => f.id !== favorite.id) }));
            return favorite;
        },
    } satisfies FavoritesStoreState), { name: "favorites" })
);
