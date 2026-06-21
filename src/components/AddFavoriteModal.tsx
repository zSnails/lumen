import { createContext, useCallback, useContext, useRef, useSyncExternalStore, type ComponentProps, type Ref } from "react";
import { useForm } from "react-hook-form";
import { useFavoritesStore, type Favorite } from "../store/favoritesStore";

const FavoriteModalContext = createContext<{ isOpen: boolean; open: () => void; close: () => void; } | null>(null);

export function useFavoriteModal() {
    const ctx = useContext(FavoriteModalContext);
    if (!ctx) throw new Error("useFavoriteModal must be called under a AddFavoriteModalProvider");
    return ctx;
}

type FormValues = Omit<Favorite, 'id'>;

export function AddFavoriteModalProvider({ children }: ComponentProps<"div">) {
    const dialog = useRef<HTMLDialogElement | null>(null);
    const isOpen = useSyncExternalStore((onStoreChange) => {
        const abortController = new AbortController();
        dialog.current?.addEventListener("toggle", () => {
            onStoreChange();
        }, { signal: abortController.signal });
        return () => abortController.abort();
    }, () => dialog.current?.open ?? false);

    const form = useForm<FormValues>();

    const open = () => {
        dialog.current?.showModal();
    }
    const close = () => {
        dialog.current?.close();
        form.reset();
    }

    const { addFavorite } = useFavoritesStore();

    const handleSubmit = useCallback((values: FormValues) => {
        addFavorite({ id: crypto.randomUUID(), ...values });
        close();
    }, [addFavorite, close]);

    return <FavoriteModalContext.Provider value={{
        isOpen,
        open,
        close
    }}>
        <Modal dialogRef={dialog}>
            <div className="p-4">
                <form className="w-full flex flex-col gap-4" onSubmit={form.handleSubmit(handleSubmit)} >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title">Title</label>
                        <Input id="title" placeholder="Reddit" {...form.register("title", { required: true })} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="href">URL</label>
                        <Input id="href" placeholder="https://reddit.com" {...form.register("href", { required: true })} />
                    </div>
                    <div className="w-full items-center justify-end flex flex-row gap-2">
                        <button type="submit" className="py-3 px-5 hover:bg-card/90 hover:cursor-pointer active:translate-y-0 active:bg-cyan-400 active:text-night hover:-translate-y-1 transition-all duration-300 bg-card/50 rounded-2xl">Done</button>
                    </div>
                </form>
            </div>
        </Modal>
        {children}
    </FavoriteModalContext.Provider>
}

export function Input({ className, ...props }: ComponentProps<"input">) {
    return <input className={`bg-card py-3.5 px-5 rounded-full ${className ?? ''}`} {...props} />
}

export type ModalProps = {
    onOpen?: () => void;
    onClose?: () => void;
    dialogRef: Ref<HTMLDialogElement | null>;
}

export function Modal({ children, dialogRef }: ComponentProps<"div"> & ModalProps) {

    const { close } = useFavoriteModal();

    return <dialog
        ref={dialogRef}
        onCancel={e => {
            e.preventDefault();
            e.stopPropagation();
            close();
        }}
        className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-fit w-fit bg-night text-bone rounded-4xl"
    >
        <div className="flex flex-col m-5">
            {children}
            {/*
                <div className="w-full items-center justify-end flex flex-row gap-2">
            <button type="reset" onClick={() => close()} className="py-3 px-5 hover:bg-red-500 hover:cursor-pointer active:bg-red-700 hover:-translate-y-1 transition-all duration-300 bg-red-500/50 rounded-2xl">Cancel</button>
            <button type="submit" onClick={() => close()} className="py-3 px-5 hover:bg-card/90 hover:cursor-pointer active:bg-cyan-400 active:text-night hover:-translate-y-1 transition-all duration-300 bg-card/50 rounded-2xl">Done</button>
            </div>
                */}
        </div>
    </dialog>
}
