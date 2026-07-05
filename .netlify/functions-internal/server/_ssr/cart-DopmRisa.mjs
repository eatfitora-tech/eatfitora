import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as useStore } from "./useStore-Dbv8EsSq.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as ArrowRight, c as ShoppingBag, d as Plus, m as Minus, o as Trash2 } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-DopmRisa.js
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const { cart, updateQuantity, removeFromCart, user } = useStore();
	const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
	const delivery = subtotal > 40 || cart.length === 0 ? 0 : 5;
	const total = subtotal + delivery;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-[var(--cream)] min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-5xl mx-auto px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl sm:text-5xl md:text-6xl text-[var(--maroon)] mb-6 sm:mb-10",
				children: "Your Cart"
			}), cart.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center shadow-sm border border-[var(--ink)]/10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-20 h-20 bg-[var(--sand)] rounded-full grid place-items-center mx-auto mb-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "w-10 h-10 text-[var(--amber)]" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl text-[var(--crimson)] mb-4",
						children: "Your bowl is empty"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[var(--ink)]/70 mb-8 max-w-md mx-auto",
						children: "Looks like you haven't added any premium nuts or dry fruits to your cart yet. Let's fix that!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						className: "inline-flex items-center gap-2 h-12 px-8 rounded-full bg-[var(--amber)] text-[var(--maroon)] font-bold hover:scale-[1.03] transition shadow-xl",
						children: "Start Shopping"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-3 gap-6 sm:gap-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-2 space-y-4",
					children: cart.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 flex gap-3 sm:gap-4 md:gap-6 shadow-sm border border-[var(--ink)]/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-24 h-24 md:w-32 md:h-32 bg-[var(--sand)] rounded-xl shrink-0 overflow-hidden relative",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item.product.image,
								alt: item.product.name,
								className: "absolute inset-0 w-full h-full object-contain p-2 md:p-4 drop-shadow-md"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 flex flex-col justify-between py-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl md:text-2xl text-[var(--maroon)]",
									children: item.product.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs md:text-sm text-[var(--ink)]/60 font-medium",
									children: item.product.tagline
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-display text-xl md:text-2xl text-[var(--crimson)]",
									children: ["₹", (item.product.price * item.quantity).toFixed(2)]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center bg-[var(--cream)] rounded-full border border-[var(--ink)]/10",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => updateQuantity(item.product.id, item.quantity - 1),
											className: "w-8 h-8 md:w-10 md:h-10 grid place-items-center text-[var(--ink)]/60 hover:text-[var(--maroon)] transition",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "w-3.5 h-3.5 md:w-4 md:h-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-8 md:w-10 text-center font-bold text-sm md:text-base",
											children: item.quantity
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => updateQuantity(item.product.id, item.quantity + 1),
											className: "w-8 h-8 md:w-10 md:h-10 grid place-items-center text-[var(--ink)]/60 hover:text-[var(--maroon)] transition",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3.5 h-3.5 md:w-4 md:h-4" })
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => removeFromCart(item.product.id),
									className: "text-sm text-red-500 font-semibold flex items-center gap-1.5 hover:bg-red-50 px-3 py-1.5 rounded-full transition",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" }),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden md:inline",
											children: "Remove"
										})
									]
								})]
							})]
						})]
					}, item.product.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm border border-[var(--ink)]/10 sticky top-24 sm:top-32",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl sm:text-3xl text-[var(--maroon)] mb-4 sm:mb-6",
							children: "Order Summary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 text-sm font-medium text-[var(--ink)]/80 mb-6 border-b border-[var(--ink)]/10 pb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", subtotal.toFixed(2)] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Delivery Charge" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: delivery === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-green-600",
										children: "Free"
									}) : `₹${delivery.toFixed(2)}` })]
								}),
								delivery > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-[var(--crimson)] bg-[var(--crimson)]/10 px-3 py-2 rounded-lg mt-2",
									children: [
										"Add ₹",
										(40 - subtotal).toFixed(2),
										" more for free delivery!"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-lg",
								children: "Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-display text-3xl sm:text-4xl text-[var(--crimson)]",
								children: ["₹", total.toFixed(2)]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: user ? "/checkout/address" : "/login",
							className: "flex items-center justify-center gap-2 w-full h-12 sm:h-14 rounded-full bg-[var(--crimson)] text-[var(--cream)] font-bold text-base sm:text-lg hover:scale-[1.03] transition shadow-xl",
							children: ["Proceed to Checkout ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-5 h-5" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-center text-xs text-[var(--ink)]/50 mt-4 font-medium",
							children: [
								"Checkout is completed via WhatsApp.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"No payment required now."
							]
						})
					]
				}) })]
			})]
		})
	});
}
//#endregion
export { CartPage as component };
