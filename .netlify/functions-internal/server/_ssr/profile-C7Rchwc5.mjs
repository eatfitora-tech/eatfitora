import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useStore } from "./useStore-Dbv8EsSq.mjs";
import { F as useNavigate, P as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as ArrowRight, D as ExternalLink, _ as MapPin, b as LogOut, d as Plus, o as Trash2, p as Package } from "../_libs/lucide-react.mjs";
import { t as useAuth } from "./useAuth-QGxqvN1h.mjs";
import { t as useAddresses } from "./useAddresses-Kxh1kiGA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-C7Rchwc5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const { user, orders } = useStore();
	const { addresses, isLoading, addAddress, isAdding, deleteAddress, isDeleting } = useAddresses();
	const { signOut } = useAuth();
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = (0, import_react.useState)("orders");
	const [showAddForm, setShowAddForm] = (0, import_react.useState)(false);
	const [saveError, setSaveError] = (0, import_react.useState)("");
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
	const handleSaveAddress = async (e) => {
		e.preventDefault();
		try {
			await addAddress({
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
			});
			setShowAddForm(false);
			setSaveError("");
			setFormData({
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
		} catch (err) {
			console.error("Failed to add address", err);
			setSaveError(err.message || "Failed to save address. Check console for details.");
		}
	};
	const inputClass = "w-full bg-[var(--cream)] border border-[var(--ink)]/10 rounded-xl px-4 py-3 outline-none focus:border-[var(--amber)] focus:ring-2 focus:ring-[var(--amber)]/20 transition";
	const handleLogout = async () => {
		try {
			await signOut();
			navigate({ to: "/" });
		} catch (err) {
			console.error("Logout failed", err);
			navigate({ to: "/" });
		}
	};
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/login" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-[var(--cream)] min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-6xl mx-auto px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl sm:text-5xl md:text-6xl text-[var(--maroon)] mb-6 sm:mb-10",
				children: "Your Profile"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-4 gap-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-[var(--ink)]/10 mb-4 sm:mb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[var(--crimson)] text-white grid place-items-center font-display text-xl sm:text-2xl",
										children: user?.name?.[0]?.toUpperCase() || "U"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-bold text-lg sm:text-xl text-[var(--maroon)]",
									children: user?.name || "Happy Snacker"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs sm:text-sm text-[var(--ink)]/60 mb-3 sm:mb-4",
									children: "Member since 2026"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleLogout,
									className: "flex items-center gap-2 text-sm font-bold text-[var(--ink)]/50 hover:text-[var(--crimson)] transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "w-4 h-4" }), " Logout"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("orders"),
							className: `w-full flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 rounded-xl font-bold transition-all text-left text-sm sm:text-base ${activeTab === "orders" ? "bg-[var(--crimson)] text-[var(--cream)] shadow-md" : "bg-transparent text-[var(--ink)]/70 hover:bg-white"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "w-5 h-5" }), " My Orders"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("addresses"),
							className: `w-full flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 rounded-xl font-bold transition-all text-left text-sm sm:text-base ${activeTab === "addresses" ? "bg-[var(--crimson)] text-[var(--cream)] shadow-md" : "bg-transparent text-[var(--ink)]/70 hover:bg-white"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-5 h-5" }), " Saved Addresses"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleLogout,
							className: "w-full flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all text-left text-sm sm:text-base",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "w-5 h-5" }), " Logout"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-3",
					children: [activeTab === "orders" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl sm:text-3xl text-[var(--maroon)] mb-4 sm:mb-6",
						children: "Order History"
					}), orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center shadow-sm border border-[var(--ink)]/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "w-12 h-12 text-[var(--ink)]/20 mx-auto mb-4" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-xl text-[var(--maroon)] mb-2",
								children: "No orders yet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[var(--ink)]/60 text-sm",
								children: "When you place an order, it will show up here."
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-6",
						children: orders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-[var(--ink)]/10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 border-b border-[var(--ink)]/10 pb-4 sm:pb-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-bold text-[var(--ink)]/50 uppercase tracking-wider mb-1",
											children: "Order ID"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-bold text-[var(--maroon)]",
											children: order.id
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-bold text-[var(--ink)]/50 uppercase tracking-wider mb-1",
											children: "Date"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-bold text-[var(--maroon)]",
											children: new Date(order.date).toLocaleDateString()
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-bold text-[var(--ink)]/50 uppercase tracking-wider mb-1",
											children: "Status"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `font-bold inline-flex px-3 py-1 rounded-full text-xs ${order.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`,
											children: order.status
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-bold text-[var(--ink)]/50 uppercase tracking-wider mb-1",
											children: "Total"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-bold text-[var(--crimson)]",
											children: ["₹", order.total.toFixed(2)]
										})] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-4",
									children: order.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: item.product.image,
												alt: item.product.name,
												className: "w-12 h-12 bg-[var(--sand)] rounded overflow-hidden p-1"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-bold text-sm text-[var(--maroon)]",
													children: item.product.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-xs text-[var(--ink)]/60",
													children: ["Qty: ", item.quantity]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "font-bold text-sm",
												children: ["₹", (item.product.price * item.quantity).toFixed(2)]
											})
										]
									}, item.product.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 pt-6 border-t border-[var(--ink)]/10 flex justify-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "flex items-center gap-2 text-sm font-bold text-[var(--amber)] hover:text-[var(--maroon)] transition",
										children: ["Track via WhatsApp ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-4 h-4" })]
									})
								})
							]
						}, order.id))
					})] }), activeTab === "addresses" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl sm:text-3xl text-[var(--maroon)]",
							children: "Saved Addresses"
						}), !showAddForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setShowAddForm(true),
							className: "flex items-center gap-2 px-4 py-2 bg-[var(--crimson)] text-white rounded-full font-bold text-sm hover:scale-[1.02] transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), " Add New"]
						})]
					}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center my-12",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-8 h-8 border-4 border-[var(--crimson)]/20 border-t-[var(--crimson)] rounded-full animate-spin" })
					}) : showAddForm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-sm border border-[var(--ink)]/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-xl text-[var(--maroon)]",
								children: "New Address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowAddForm(false),
								className: "text-sm font-bold text-[var(--ink)]/50 hover:text-[var(--crimson)] transition",
								children: "Cancel"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSaveAddress,
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid sm:grid-cols-2 gap-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-1.5",
										children: "Full Name *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										type: "text",
										className: inputClass,
										value: formData.fullName,
										onChange: (e) => setFormData({
											...formData,
											fullName: e.target.value
										})
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-1.5",
										children: "Phone *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										type: "tel",
										className: inputClass,
										value: formData.phone,
										onChange: (e) => setFormData({
											...formData,
											phone: e.target.value
										})
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid sm:grid-cols-2 gap-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-1.5",
										children: "House / Flat No. *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										type: "text",
										className: inputClass,
										value: formData.house,
										onChange: (e) => setFormData({
											...formData,
											house: e.target.value
										})
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-1.5",
										children: "Street *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										type: "text",
										className: inputClass,
										value: formData.street,
										onChange: (e) => setFormData({
											...formData,
											street: e.target.value
										})
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid sm:grid-cols-3 gap-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-1.5",
											children: "Area *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											required: true,
											type: "text",
											className: inputClass,
											value: formData.area,
											onChange: (e) => setFormData({
												...formData,
												area: e.target.value
											})
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-1.5",
											children: "City *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											required: true,
											type: "text",
											className: inputClass,
											value: formData.city,
											onChange: (e) => setFormData({
												...formData,
												city: e.target.value
											})
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-1.5",
											children: "Pincode *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											required: true,
											type: "text",
											className: inputClass,
											value: formData.pincode,
											onChange: (e) => setFormData({
												...formData,
												pincode: e.target.value
											})
										})] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid sm:grid-cols-2 gap-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-1.5",
										children: "State *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										type: "text",
										className: inputClass,
										value: formData.state,
										onChange: (e) => setFormData({
											...formData,
											state: e.target.value
										})
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider mb-1.5",
										children: "Landmark"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										className: inputClass,
										value: formData.landmark,
										onChange: (e) => setFormData({
											...formData,
											landmark: e.target.value
										})
									})] })]
								}),
								saveError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-red-50 border border-red-200 text-red-600 text-sm font-semibold px-4 py-3 rounded-xl",
									children: saveError
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									disabled: isAdding,
									className: "w-full h-12 rounded-full bg-[var(--crimson)] text-[var(--cream)] font-bold flex items-center justify-center gap-2 mt-4 hover:bg-[var(--maroon)] transition disabled:opacity-50",
									children: [
										isAdding ? "Saving..." : "Save Address",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })
									]
								})
							]
						})]
					}) : addresses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white rounded-3xl p-10 text-center shadow-sm border border-[var(--ink)]/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-12 h-12 text-[var(--ink)]/20 mx-auto mb-4" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-xl text-[var(--maroon)] mb-2",
								children: "No saved addresses"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[var(--ink)]/60 text-sm mb-6",
								children: "Add an address so you can checkout faster next time."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setShowAddForm(true),
								className: "px-6 py-3 bg-[var(--amber)] text-white rounded-full font-bold inline-flex items-center gap-2 hover:bg-[var(--maroon)] transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), " Add Address"]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid sm:grid-cols-2 gap-6",
						children: addresses.map((addr) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white rounded-3xl p-6 shadow-sm border border-[var(--ink)]/10 relative group",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => deleteAddress(addr.id),
									disabled: isDeleting,
									className: "absolute top-4 right-4 p-2 text-[var(--ink)]/30 hover:text-red-500 hover:bg-red-50 rounded-full transition opacity-0 group-hover:opacity-100 disabled:opacity-50",
									title: "Delete address",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-bold text-lg text-[var(--maroon)] mb-1 pr-8",
									children: addr.fullName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-[var(--ink)]/70 leading-relaxed mb-4",
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
									className: "text-sm text-[var(--ink)]/70 font-medium",
									children: addr.phone
								})
							]
						}, addr.id))
					})] })]
				})]
			})]
		})
	});
}
//#endregion
export { ProfilePage as component };
