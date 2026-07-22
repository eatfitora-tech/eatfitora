import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, productCartKey } from "@/hooks/useProducts";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  house: string;
  street: string;
  area: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
}

export interface User {
  name: string;
  role: "user" | "admin";
}

interface AppState {
  user: User | null;
  cart: CartItem[];
  wishlist: string[]; // Product IDs

  // Auth Actions
  login: (name: string, role: "user" | "admin") => void;
  logout: () => void;

  // Cart Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (cartKey: string) => void;
  updateQuantity: (cartKey: string, quantity: number) => void;
  clearCart: () => void;

  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      cart: [],
      wishlist: [],

      login: (name, role) => set({ user: { name, role } }),
      logout: () => set({ user: null }),

      addToCart: (product, quantity = 1) =>
        set((state) => {
          const key = productCartKey(product);
          const existing = state.cart.find((item) => productCartKey(item.product) === key);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                productCartKey(item.product) === key
                  ? {
                      ...item,
                      quantity: Math.min(
                        item.quantity + quantity,
                        item.product.stockQuantity ?? Number.MAX_SAFE_INTEGER,
                      ),
                    }
                  : item,
              ),
            };
          }
          const availableStock = product.stockQuantity ?? Number.MAX_SAFE_INTEGER;
          if (availableStock <= 0) return { cart: state.cart };
          return {
            cart: [...state.cart, { product, quantity: Math.min(quantity, availableStock) }],
          };
        }),

      removeFromCart: (cartKey) =>
        set((state) => ({
          cart: state.cart.filter((item) => productCartKey(item.product) !== cartKey),
        })),

      updateQuantity: (cartKey, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            productCartKey(item.product) === cartKey
              ? {
                  ...item,
                  quantity: Math.min(
                    Math.max(1, quantity),
                    item.product.stockQuantity ?? Number.MAX_SAFE_INTEGER,
                  ),
                }
              : item,
          ),
        })),

      clearCart: () => set({ cart: [] }),

      toggleWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.includes(productId)
            ? state.wishlist.filter((id) => id !== productId)
            : [...state.wishlist, productId],
        })),
    }),
    {
      name: "fitora-storage",
    },
  ),
);
