import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as useStore } from "./useStore-Dbv8EsSq.mjs";
import { F as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as MessageCircle, j as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as useAddresses } from "./useAddresses-Kxh1kiGA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/summary-CugEO4-L.js
var import_jsx_runtime = require_jsx_runtime();
function SummaryPage() {
	const navigate = useNavigate();
	const addressId = new URLSearchParams(window.location.search).get("addressId");
	const { cart, clearCart, addOrder } = useStore();
	const { addresses, isLoading } = useAddresses();
	const address = addresses.find((a) => a.id === addressId) || addresses[0];
	const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
	const delivery = subtotal > 1500 || cart.length === 0 ? 0 : 50;
	const total = subtotal + delivery;
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-[var(--cream)] min-h-screen pt-32 pb-20 flex justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-8 h-8 border-4 border-[var(--crimson)]/20 border-t-[var(--crimson)] rounded-full animate-spin" })
	});
	if (!address || cart.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-[var(--cream)] min-h-screen pt-32 pb-20 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl text-[var(--maroon)]",
			children: "Invalid Order State"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => navigate({ to: "/cart" }),
			className: "mt-6 font-bold text-[var(--crimson)] hover:underline",
			children: "Return to Cart"
		})]
	});
	const handlePlaceOrder = () => {
		addOrder({
			id: `ORD-${Math.floor(Math.random() * 1e4)}`,
			date: (/* @__PURE__ */ new Date()).toISOString(),
			items: cart,
			total,
			subtotal,
			delivery,
			status: "Pending",
			address
		});
		clearCart();
		const businessNumber = "919440007093";
		let message = `🛒 *NEW ORDER*\n\n`;
		message += `*Customer Details*\n`;
		message += `Name: ${address.fullName}\n`;
		message += `Phone: ${address.phone}\n\n`;
		message += `*Delivery Address*\n`;
		message += `${address.house}, ${address.street}\n`;
		message += `${address.area}, ${address.city}, ${address.state} ${address.pincode}\n`;
		if (address.landmark) message += `Landmark: ${address.landmark}\n`;
		if (address.notes) message += `Notes: ${address.notes}\n`;
		message += `\n*Products*\n`;
		cart.forEach((item) => {
			message += `- ${item.product.name} (x${item.quantity}) - ₹${(item.product.price * item.quantity).toFixed(2)}\n`;
		});
		message += `\n*Billing*\n`;
		message += `Subtotal: ₹${subtotal.toFixed(2)}\n`;
		message += `Delivery: ${delivery === 0 ? "Free" : `₹${delivery.toFixed(2)}`}\n`;
		message += `*Total: ₹${total.toFixed(2)}*\n\n`;
		message += `Thank you!`;
		const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;
		window.open(whatsappUrl, "_blank");
		navigate({ to: "/profile" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-[var(--cream)] min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-4xl mx-auto px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => navigate({ to: "/checkout/address" }),
					className: "flex items-center gap-2 text-[var(--ink)]/60 hover:text-[var(--maroon)] font-bold text-sm mb-8 transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-4 h-4" }), " Back to Address"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl sm:text-4xl md:text-5xl text-[var(--maroon)] mb-6 sm:mb-10",
					children: "Review your bowl"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid lg:grid-cols-2 gap-6 sm:gap-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm border border-[var(--ink)]/10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-bold text-[var(--ink)]/50 uppercase tracking-wider mb-4",
									children: "Delivery Details"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-bold text-lg text-[var(--maroon)] mb-1",
									children: address.fullName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-[var(--ink)]/70 leading-relaxed mb-2",
									children: [
										address.house,
										", ",
										address.street,
										", ",
										address.area,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										address.city,
										", ",
										address.state,
										" ",
										address.pincode
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-[var(--ink)]/70 font-medium",
									children: address.phone
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm border border-[var(--ink)]/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-sm font-bold text-[var(--ink)]/50 uppercase tracking-wider mb-4",
								children: [
									"Order Items (",
									cart.length,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-4",
								children: cart.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-4 border-b border-[var(--ink)]/5 pb-4 last:border-0 last:pb-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: item.product.image,
										alt: item.product.name,
										className: "w-16 h-16 object-contain bg-[var(--sand)] rounded-lg p-2"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-bold text-[var(--maroon)]",
												children: item.product.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-[var(--ink)]/60 font-medium mb-1",
												children: item.product.category
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Qty: ", item.quantity] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-bold text-[var(--crimson)]",
													children: ["₹", (item.product.price * item.quantity).toFixed(2)]
												})]
											})
										]
									})]
								}, item.product.id))
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-[var(--ink)]/10 sticky top-24 sm:top-32",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl sm:text-3xl text-[var(--maroon)] mb-4 sm:mb-6",
								children: "Final Bill"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 text-sm font-medium text-[var(--ink)]/80 mb-6 border-b border-[var(--ink)]/10 pb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", subtotal.toFixed(2)] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Delivery Charge" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: delivery === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-green-600",
										children: "Free"
									}) : `₹${delivery.toFixed(2)}` })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center mb-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-lg text-[var(--maroon)]",
									children: "Total to pay"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-3xl sm:text-5xl text-[var(--crimson)]",
									children: ["₹", total.toFixed(2)]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handlePlaceOrder,
								className: "flex items-center justify-center gap-3 w-full h-14 sm:h-16 rounded-full bg-[#25D366] text-white font-bold text-base sm:text-lg hover:bg-[#20bd5a] transition shadow-xl hover:shadow-2xl hover:-translate-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-6 h-6" }), " Place Order via WhatsApp"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-center text-xs text-[var(--ink)]/50 mt-5 font-medium leading-relaxed",
								children: "Clicking this will open WhatsApp with your order details pre-filled. We'll chat there to arrange payment and delivery!"
							})
						]
					}) })]
				})
			]
		})
	});
}
//#endregion
export { SummaryPage as component };
