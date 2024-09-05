"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

// Define the type for cart item
interface CartItem {
    id: number;
    color: string;
    quantity: number;
}

// Define the context type
interface ShoppingCartContextType {
    getItemQuantity: (id: number, color: string) => number;
    increaseCartQuantity: (id: number, color: string) => void;
    decreaseCartQuantity: (id: number, color: string) => void;
    removeFromCart: (id: number, color: string) => void;
    emptyCart: () => void;
    cartItems: CartItem[];
    openCart: () => void;
    closeCart: () => void;
    cartQuantity: number;
}

// Create the context with a default value of undefined
const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

// Custom hook to use the shopping cart context
export function useShoppingCart() {
    const context = useContext(ShoppingCartContext);
    if (!context) {
        throw new Error("useShoppingCart must be used within a ShoppingCartProvider");
    }
    return context;
}

// Provider component
export function ShoppingCartProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    function getItemQuantity(id: number, color: string): number {
        return cartItems.find(item => item.id === id && item.color === color)?.quantity || 0;
    }

    function increaseCartQuantity(id: number, color: string): void {
        setCartItems(currentItems => {
            const existingItem = currentItems.find(item => item.id === id && item.color === color);
            if (existingItem) {
                return currentItems.map(item =>
                    item.id === id && item.color === color
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...currentItems, { id, color, quantity: 1 }];
            }
        });
    }

    function decreaseCartQuantity(id: number, color: string): void {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id && item.color === color)?.quantity === 1) {
                return currentItems.filter(item => !(item.id === id && item.color === color));
            } else {
                return currentItems.map(item =>
                    item.id === id && item.color === color
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }
        });
    }

    function removeFromCart(id: number, color: string): void {
        setCartItems(currentItems => {
            return currentItems.filter(item => !(item.id === id && item.color === color));
        });
    }

    function emptyCart(): void {
        setCartItems([]);
    }

    return (
        <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, emptyCart, cartItems, openCart, closeCart, cartQuantity }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    );
}
