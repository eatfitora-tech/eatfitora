import { r as __toESM } from "./_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { t as useStore } from "./_ssr/useStore-Dbv8EsSq.mjs";
import { F as useNavigate, g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./_productId-BXIgLeua.mjs";
import { o as useProducts } from "./_ssr/useProducts-1oxHq1hv.mjs";
import { a as Truck, c as ShoppingBag, d as Plus, j as ArrowLeft, k as Check, l as ShieldCheck, m as Minus, s as Star, w as Heart } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_productId-GTu-dVqW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductDetailsPage() {
	const { productId } = Route.useParams();
	const navigate = useNavigate();
	const { data: products, isLoading } = useProducts();
	const { addToCart, wishlist, toggleWishlist } = useStore();
	const [quantity, setQuantity] = (0, import_react.useState)(1);
	const [justAdded, setJustAdded] = (0, import_react.useState)(false);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen pt-32 pb-20 text-center font-bold text-[var(--maroon)]",
		children: "Loading product..."
	});
	const product = products?.find((p) => p.id === productId);
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-[var(--cream)] min-h-screen pt-32 pb-20 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl text-[var(--maroon)]",
			children: "Product not found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => navigate({ to: "/shop" }),
			className: "mt-6 font-bold text-[var(--crimson)] hover:underline",
			children: "Back to Shop"
		})]
	});
	const handleAddToCart = () => {
		addToCart(product, quantity);
		setJustAdded(true);
		setTimeout(() => setJustAdded(false), 2e3);
	};
	const isWishlisted = wishlist.includes(product.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-[var(--cream)] min-h-screen pt-24 pb-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/shop",
					className: "inline-flex items-center gap-2 text-sm font-bold text-[var(--ink)]/60 hover:text-[var(--maroon)] transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-4 h-4" }), " Back to Shop"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--sand)] via-[#fce5b8] to-[var(--amber)]/40 flex items-center justify-center p-8 sm:p-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: product.image,
							alt: product.name,
							className: "w-full h-full object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.4)]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => toggleWishlist(product.id),
							className: "absolute top-6 right-6 w-12 h-12 bg-white rounded-full grid place-items-center shadow-lg hover:scale-110 transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `w-6 h-6 ${isWishlisted ? "fill-[var(--crimson)] text-[var(--crimson)]" : "text-[var(--ink)]/40"}` })
						}),
						product.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute top-6 left-6 px-4 py-1.5 rounded-full bg-[var(--crimson)] text-[var(--cream)] text-xs font-bold uppercase tracking-wider shadow-lg",
							children: product.badge
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-bold text-[var(--ink)]/50 uppercase tracking-widest mb-3",
							children: product.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl sm:text-5xl md:text-6xl text-[var(--maroon)] leading-[1.1] mb-2",
							children: product.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xl sm:text-2xl text-[var(--crimson)] font-bold",
								children: ["₹", product.price.toFixed(2)]
							}), product.originalPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-lg text-[var(--ink)]/40 line-through font-bold",
								children: ["₹", product.originalPrice.toFixed(2)]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex text-[var(--amber)]",
								children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `w-5 h-5 ${i < Math.floor(product.rating) ? "fill-current" : ""}` }, i))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm font-medium text-[var(--ink)]/60",
								children: [
									product.rating,
									" (",
									product.reviewsCount,
									" reviews)"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[var(--ink)]/75 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10",
							children: product.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-4 sm:gap-6 mb-8 sm:mb-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center bg-white rounded-full border border-[var(--ink)]/10 shadow-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQuantity(Math.max(1, quantity - 1)),
										className: "w-12 h-12 grid place-items-center text-[var(--ink)]/60 hover:text-[var(--maroon)] transition",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "w-4 h-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-12 text-center font-bold text-lg",
										children: quantity
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQuantity(quantity + 1),
										className: "w-12 h-12 grid place-items-center text-[var(--ink)]/60 hover:text-[var(--maroon)] transition",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" })
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleAddToCart,
								className: `flex-1 min-w-[180px] flex items-center justify-center gap-2 h-12 rounded-full font-bold text-base sm:text-lg transition shadow-xl ${justAdded ? "bg-green-600 text-white scale-[1.03]" : "bg-[var(--crimson)] text-[var(--cream)] hover:scale-[1.03]"}`,
								children: justAdded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-5 h-5" }), " Added to Cart!"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "w-5 h-5" }),
									" Add to Cart — ₹",
									(product.price * quantity).toFixed(2)
								] })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 border-t border-b border-[var(--ink)]/10 py-4 sm:py-6 mb-6 sm:mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 rounded-full bg-[var(--sand)] text-[var(--maroon)] grid place-items-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "w-5 h-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-bold text-[var(--ink)]/80",
									children: "48-hour delivery"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 rounded-full bg-[var(--sand)] text-[var(--maroon)] grid place-items-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-5 h-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-bold text-[var(--ink)]/80",
									children: "Quality guaranteed"
								})]
							})]
						}),
						product.specifications && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-[var(--maroon)] text-lg mb-4",
							children: "Specifications"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: Object.entries(product.specifications).map(([key, val]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-sm border-b border-[var(--ink)]/5 pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[var(--ink)]/60",
									children: key
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-[var(--ink)]/90",
									children: val
								})]
							}, key))
						})] })
					]
				})]
			})]
		})
	});
}
//#endregion
export { ProductDetailsPage as component };
