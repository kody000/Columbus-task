"use client";

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import {Product} from "@/types/productTypes";

export interface CartItem {
    articleNumber: Product["articleNumber"];
    title: Product["title"];
    price: number;
    quantity: number;
}

interface CartContextValue {
    items: CartItem[];
    totalCount: number;
    addItem: (product: Product) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = useCallback((product: Product) => {
        setItems((prev) => {
            const existing = prev.find(
                (item) => item.articleNumber === product.articleNumber,
            );

            if (existing) {
                return prev.map((item) =>
                    item.articleNumber === product.articleNumber
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                );
            }

            return [
                ...prev,
                {
                    articleNumber: product.articleNumber,
                    title: product.title,
                    price: product.price,
                    quantity: 1,
                },
            ];
        });
    }, []);

    const totalCount = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items],
    );

    const value = useMemo<CartContextValue>(
        () => ({ items, totalCount, addItem }),
        [items, totalCount, addItem],
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}