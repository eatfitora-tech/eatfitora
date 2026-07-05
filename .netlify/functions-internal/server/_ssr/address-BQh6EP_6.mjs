import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { F as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as ArrowRight, _ as MapPin, j as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as useAddresses } from "./useAddresses-Kxh1kiGA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/address-BQh6EP_6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AddressPage() {
	const navigate = useNavigate();
	const { addresses, addAddress, isAdding, isLoading } = useAddresses();
	const [selectedAddressId, setSelectedAddressId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (addresses.length > 0 && !selectedAddressId) setSelectedAddressId(addresses[0].id);
	}, [addresses, selectedAddressId]);
	const [formData, setFormData] = (0, import_react.useState)({
		fullName: "",
		phone: "",
		house: "",
		street: "",
		area: "",
		landmark: "",
		city: "",
		state: "",
		pincode: "",
		notes: ""
	});
	const handleSaveAndContinue = async (e) => {
		e.preventDefault();
		const newAddress = {
			fullName: formData.fullName,
			phone: formData.phone,
			house: formData.house,
			street: formData.street,
			area: formData.area,
			landmark: formData.landmark,
			city: formData.city,
			state: formData.state,
			pincode: formData.pincode,
			notes: formData.notes
		};
		try {
			navigate({
				to: "/checkout/summary",
				search: { addressId: (await addAddress(newAddress)).id }
			});
		} catch (error) {
			console.error("Failed to save address", error);
		}
	};
	const handleContinueWithSaved = () => {
		if (selectedAddressId) navigate({
			to: "/checkout/summary",
			search: { addressId: selectedAddressId }
		});
	};
	const inputClass = "w-full bg-white border border-[var(--ink)]/10 rounded-xl px-4 py-3 outline-none focus:border-[var(--amber)] focus:ring-2 focus:ring-[var(--amber)]/20 transition";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-[var(--cream)] min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-3xl mx-auto px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => navigate({ to: "/cart" }),
					className: "flex items-center gap-2 text-[var(--ink)]/60 hover:text-[var(--maroon)] font-bold text-sm mb-8 transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-4 h-4" }), " Back to Cart"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl sm:text-4xl md:text-5xl text-[var(--maroon)] mb-6 sm:mb-10",
					children: "Where to?"
				}),
				isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center my-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-8 h-8 border-4 border-[var(--crimson)]/20 border-t-[var(--crimson)] rounded-full animate-spin" })
				}) : addresses.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-bold text-[var(--ink)]/50 uppercase tracking-wider mb-4",
							children: "Saved Addresses"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4",
							children: addresses.map((addr) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => setSelectedAddressId(addr.id),
								className: `cursor-pointer rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 transition-all ${selectedAddressId === addr.id ? "border-[var(--crimson)] bg-white shadow-md" : "border-[var(--ink)]/10 bg-white/50 hover:bg-white"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-[var(--maroon)]",
											children: addr.fullName
										}), selectedAddressId === addr.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-5 h-5 rounded-full bg-[var(--crimson)] text-white grid place-items-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3 h-3" })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-[var(--ink)]/70 leading-relaxed",
										children: [
											addr.house,
											", ",
											addr.street,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											addr.area,
											", ",
											addr.city,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											addr.state,
											" ",
											addr.pincode
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-[var(--ink)]/50 mt-2 font-medium",
										children: addr.phone
									})
								]
							}, addr.id))
						}),
						selectedAddressId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleContinueWithSaved,
							className: "mt-4 sm:mt-6 flex items-center justify-center gap-2 w-full h-12 sm:h-14 rounded-full bg-[var(--crimson)] text-[var(--cream)] font-bold text-base sm:text-lg hover:scale-[1.03] transition shadow-xl",
							children: ["Deliver Here ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-5 h-5" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 my-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 h-px bg-[var(--ink)]/10" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-[var(--ink)]/40 uppercase tracking-widest",
									children: "OR Add New"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 h-px bg-[var(--ink)]/10" })
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-10 shadow-sm border border-[var(--ink)]/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl sm:text-3xl text-[var(--maroon)] mb-6 sm:mb-8",
						children: "New Delivery Address"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSaveAndContinue,
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid sm:grid-cols-2 gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-2",
									children: "Full Name *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									type: "text",
									className: inputClass,
									onChange: (e) => setFormData({
										...formData,
										fullName: e.target.value
									})
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-2",
									children: "Phone Number *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									type: "tel",
									className: inputClass,
									onChange: (e) => setFormData({
										...formData,
										phone: e.target.value
									})
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid sm:grid-cols-2 gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-2",
									children: "House / Flat No. *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									type: "text",
									className: inputClass,
									onChange: (e) => setFormData({
										...formData,
										house: e.target.value
									})
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-2",
									children: "Street Name *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									type: "text",
									className: inputClass,
									onChange: (e) => setFormData({
										...formData,
										street: e.target.value
									})
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid sm:grid-cols-2 gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-2",
									children: "Area / Locality *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									type: "text",
									className: inputClass,
									onChange: (e) => setFormData({
										...formData,
										area: e.target.value
									})
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-2",
									children: "Landmark (Optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									className: inputClass,
									onChange: (e) => setFormData({
										...formData,
										landmark: e.target.value
									})
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid sm:grid-cols-3 gap-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-2",
										children: "City *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										type: "text",
										className: inputClass,
										onChange: (e) => setFormData({
											...formData,
											city: e.target.value
										})
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-2",
										children: "State *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										type: "text",
										className: inputClass,
										onChange: (e) => setFormData({
											...formData,
											state: e.target.value
										})
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-2",
										children: "Pincode *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										type: "text",
										className: inputClass,
										onChange: (e) => setFormData({
											...formData,
											pincode: e.target.value
										})
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-2",
								children: "Delivery Notes (Optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								className: inputClass,
								placeholder: "e.g. Leave at the front door",
								onChange: (e) => setFormData({
									...formData,
									notes: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: isAdding,
								className: "flex items-center justify-center gap-2 w-full h-12 sm:h-14 rounded-full bg-[var(--crimson)] text-[var(--cream)] font-bold text-base sm:text-lg hover:scale-[1.03] transition shadow-xl mt-4 disabled:opacity-70 disabled:hover:scale-100",
								children: [
									isAdding ? "Saving..." : "Save & Continue",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-5 h-5" })
								]
							})
						]
					})]
				})
			]
		})
	});
}
//#endregion
export { AddressPage as component };
