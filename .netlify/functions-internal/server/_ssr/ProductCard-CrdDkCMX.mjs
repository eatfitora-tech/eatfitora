import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useStore } from "./useStore-Dbv8EsSq.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Plus, k as Check, m as Minus } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-CrdDkCMX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ p }) {
	const { addToCart, updateQuantity, removeFromCart } = useStore();
	const [justAdded, setJustAdded] = (0, import_react.useState)(false);
	const cartItem = useStore((state) => state.cart.find((item) => item.product.id === p.id));
	const quantity = cartItem ? cartItem.quantity : 0;
	const handleAddToCart = (e) => {
		e.preventDefault();
		e.stopPropagation();
		addToCart(p, 1);
		setJustAdded(true);
		setTimeout(() => setJustAdded(false), 1500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: `/product/${p.id}`,
		className: "group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-[var(--ink)]/8 hover:shadow-[var(--shadow-3d)] transition-all duration-500 hover:-translate-y-1 block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-square overflow-hidden bg-gradient-to-br from-[var(--sand)] via-[#fce5b8] to-[var(--amber)]/40",
			children: [p.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute top-3 left-3 sm:top-4 sm:left-4 z-10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[var(--crimson)] text-[var(--cream)] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider",
				children: p.badge
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: p.image,
				alt: p.name,
				loading: "lazy",
				className: "absolute inset-0 w-full h-full object-contain p-6 sm:p-8 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3 drop-shadow-2xl"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-3.5 sm:p-5 flex items-center justify-between gap-2 sm:gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-lg sm:text-2xl leading-tight truncate text-[var(--maroon)]",
					children: p.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] sm:text-xs text-[var(--ink)]/60 mt-0.5 truncate font-medium",
					children: p.tagline
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-end mr-0.5 sm:mr-1",
					children: [p.originalPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[9px] sm:text-[10px] text-[var(--ink)]/40 line-through font-bold leading-none mb-0.5",
						children: ["₹", p.originalPrice.toFixed(2)]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-display text-lg sm:text-2xl text-[var(--crimson)] leading-none",
						children: ["₹", p.price.toFixed(2)]
					})]
				}), quantity > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center bg-white rounded-full border border-[var(--ink)]/10 shadow-sm h-10 px-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: (e) => {
								e.preventDefault();
								e.stopPropagation();
								if (quantity === 1) removeFromCart(p.id);
								else updateQuantity(p.id, quantity - 1);
							},
							className: "w-8 h-8 grid place-items-center text-[var(--ink)]/60 hover:text-[var(--maroon)] transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "w-3.5 h-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-6 text-center font-bold text-sm text-[var(--ink)]",
							children: quantity
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: (e) => {
								e.preventDefault();
								e.stopPropagation();
								updateQuantity(p.id, quantity + 1);
							},
							className: "w-8 h-8 grid place-items-center text-[var(--ink)]/60 hover:text-[var(--maroon)] transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3.5 h-3.5" })
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleAddToCart,
					"aria-label": `Add ${p.name} to cart`,
					className: `w-10 h-10 rounded-full grid place-items-center hover:scale-110 transition shadow-md shrink-0 ${justAdded ? "bg-green-600 text-white" : "bg-[var(--crimson)] text-[var(--cream)]"}`,
					children: justAdded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" })
				})]
			})]
		})]
	});
}
//#endregion
export { ProductCard as t };
