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

    const open = useCallback(() => {
        dialog.current?.showModal();
    }, []);
    const close = useCallback(() => {
        dialog.current?.close();
        form.reset();
    }, [form]);

    const { addFavorite } = useFavoritesStore();

    const handleSubmit = useCallback((values: FormValues) => {
        addFavorite({ id: crypto.randomUUID(), ...values });
        close();
    }, [addFavorite, close]);

    const inputCls = "transition-all duration-300 focus:border-cyan-400 border border-border rounded-full px-5 py-3.5";

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
                        <Input inputMode="text" type="text" className={inputCls} required id="title" placeholder="Reddit" {...form.register("title", { required: true })} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="href">URL</label>
                        <Input inputMode="url" type="url" className={inputCls} required id="href" placeholder="https://reddit.com" {...form.register("href", { required: true })} />
                    </div>
                    <div className="w-full items-center justify-end flex flex-row gap-2">
                        <button type="reset" onClick={() => close()} className="py-3 px-5 hover:bg-red-500 hover:cursor-pointer active:bg-red-700 hover:-translate-y-1 transition-all duration-300 bg-red-500/50 rounded-2xl">Cancel</button>
                        <button type="submit" className="py-3 px-5 hover:bg-card/90 hover:cursor-pointer active:translate-y-0 active:bg-cyan-400 active:text-night hover:-translate-y-1 transition-all duration-300 bg-card/50 rounded-2xl">Add</button>
                    </div>
                </form>
            </div>
        </Modal>
        {children}
    </FavoriteModalContext.Provider>
}

export function Input({ className, ...props }: ComponentProps<"input">) {
    return <input className={`w-full text-base text-bone bg-transparent focus:outline-none placeholder:text-muted-foreground/70 ${className ?? ''}`} {...props} />
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
