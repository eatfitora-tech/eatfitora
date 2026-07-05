import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useStore-Dbv8EsSq.js
var useStore = create()(persist((set) => ({
	user: null,
	cart: [],
	wishlist: [],
	orders: [],
	login: (name, role) => set({ user: {
		name,
		role
	} }),
	logout: () => set({ user: null }),
	addToCart: (product, quantity = 1) => set((state) => {
		if (state.cart.find((item) => item.product.id === product.id)) return { cart: state.cart.map((item) => item.product.id === product.id ? {
			...item,
			quantity: item.quantity + quantity
		} : item) };
		return { cart: [...state.cart, {
			product,
			quantity
		}] };
	}),
	removeFromCart: (productId) => set((state) => ({ cart: state.cart.filter((item) => item.product.id !== productId) })),
	updateQuantity: (productId, quantity) => set((state) => ({ cart: state.cart.map((item) => item.product.id === productId ? {
		...item,
		quantity: Math.max(1, quantity)
	} : item) })),
	clearCart: () => set({ cart: [] }),
	toggleWishlist: (productId) => set((state) => ({ wishlist: state.wishlist.includes(productId) ? state.wishlist.filter((id) => id !== productId) : [...state.wishlist, productId] })),
	addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] }))
}), { name: "fitora-storage" }));
//#endregion
export { useStore as t };
