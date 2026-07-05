import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useStore } from "./useStore-Dbv8EsSq.mjs";
import { F as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useDeleteProduct, i as useDeleteCategory, n as useAddProduct, o as useProducts, r as useCategories, s as useUpdateProduct, t as useAddCategory } from "./useProducts-1oxHq1hv.mjs";
import { M as Pen, O as ChevronLeft, d as Plus, i as Upload, o as Trash2, p as Package, u as Search } from "../_libs/lucide-react.mjs";
import { t as UnauthorizedView } from "./UnauthorizedView-1ss5bzKA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BdJU4nnR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminDashboardWrapper() {
	if (useStore((state) => state.user)?.role !== "admin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnauthorizedView, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDashboard, {});
}
function AdminDashboard() {
	const { data: products, isLoading } = useProducts();
	const addProduct = useAddProduct();
	const updateProduct = useUpdateProduct();
	const deleteProduct = useDeleteProduct();
	const logout = useStore((state) => state.logout);
	const navigate = useNavigate();
	const { data: categories } = useCategories();
	const addCategory = useAddCategory();
	const deleteCategory = useDeleteCategory();
	const [newCategoryName, setNewCategoryName] = (0, import_react.useState)("");
	const [isEditing, setIsEditing] = (0, import_react.useState)(null);
	const [isAdding, setIsAdding] = (0, import_react.useState)(false);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const filteredProducts = products?.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
	const handleDelete = async (id) => {
		if (confirm("Are you sure you want to delete this product?")) await deleteProduct.mutateAsync(id);
	};
	const handleAddCategory = async (e) => {
		e.preventDefault();
		if (!newCategoryName.trim()) return;
		try {
			await addCategory.mutateAsync(newCategoryName);
			setNewCategoryName("");
		} catch (err) {
			alert(err.message || "Failed to add category");
		}
	};
	const handleDeleteCategory = async (category) => {
		if (confirm(`Are you sure you want to delete category "${category}"?`)) try {
			await deleteCategory.mutateAsync(category);
		} catch (err) {
			alert(err.message || "Failed to delete category");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-[var(--cream)] text-[var(--ink)] px-4 sm:px-6 py-20 sm:py-24 md:px-12 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-6xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 sm:gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[var(--ink)]/20 grid place-items-center hover:bg-[var(--ink)]/5 transition flex-shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-4 h-4 sm:w-5 sm:h-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl sm:text-3xl md:text-4xl text-[var(--maroon)]",
						children: "Product Dashboard"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs sm:text-sm text-[var(--ink)]/60 font-semibold mt-0.5 sm:mt-1",
						children: "Manage your e-commerce inventory"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						logout();
						navigate({ to: "/admin-login" });
					},
					className: "flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--ink)]/10 text-sm font-bold hover:bg-[var(--ink)]/5 transition self-end sm:self-auto",
					children: "Logout"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-2xl sm:rounded-3xl shadow-[var(--shadow-card)] border border-[var(--ink)]/10 overflow-hidden flex flex-col md:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full md:w-64 bg-[var(--sand)] p-4 sm:p-6 border-b md:border-b-0 md:border-r border-[var(--ink)]/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-4 sm:mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[var(--crimson)] text-white grid place-items-center shadow-md",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "w-4 h-4 sm:w-5 sm:h-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-base sm:text-lg text-[var(--maroon)]",
							children: "Inventory"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 md:grid-cols-1 gap-3 sm:gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-[var(--ink)]/5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-[var(--ink)]/60 font-bold uppercase tracking-wider",
									children: "Total Products"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-3xl sm:text-4xl text-[var(--crimson)] mt-1",
									children: products?.length || 0
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setIsAdding(true),
								className: "w-full h-11 sm:h-12 rounded-full bg-[var(--amber)] text-[var(--maroon)] font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition shadow-md text-sm sm:text-base self-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4 sm:w-5 sm:h-5" }), " Add Product"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-[var(--ink)]/5 col-span-2 md:col-span-1 mt-1 sm:mt-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-[var(--ink)]/60 font-bold uppercase tracking-wider mb-2",
										children: "Categories"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-1.5 md:flex-col md:space-y-0 max-h-40 overflow-y-auto pr-1",
										children: categories?.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center bg-[var(--cream)] px-2.5 py-1.5 rounded-lg text-xs font-semibold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cat }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => handleDeleteCategory(cat),
												className: "text-red-500 hover:text-red-700 transition font-bold ml-2",
												title: "Delete Category",
												children: "✕"
											})]
										}, cat))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: handleAddCategory,
										className: "mt-3 flex gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "New category...",
											value: newCategoryName,
											onChange: (e) => setNewCategoryName(e.target.value),
											className: "flex-1 px-3 h-8 text-xs rounded-lg bg-[var(--cream)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--amber)] font-medium w-full min-w-0"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											className: "w-8 h-8 rounded-lg bg-[var(--crimson)] text-white font-bold text-sm hover:bg-[var(--maroon)] transition grid place-items-center shrink-0",
											children: "+"
										})]
									})
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 p-4 sm:p-6 flex flex-col min-h-[400px] sm:min-h-[600px]",
					children: isAdding || isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductForm, {
						initialData: isEditing || void 0,
						onSave: async (data) => {
							if (isEditing) await updateProduct.mutateAsync({
								...data,
								id: isEditing.id
							});
							else await addProduct.mutateAsync(data);
							setIsAdding(false);
							setIsEditing(null);
						},
						onCancel: () => {
							setIsAdding(false);
							setIsEditing(null);
						}
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 sm:w-5 sm:h-5 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[var(--ink)]/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Search products...",
									value: searchQuery,
									onChange: (e) => setSearchQuery(e.target.value),
									className: "w-full h-10 sm:h-12 pl-10 sm:pl-12 pr-4 rounded-full bg-[var(--cream)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--amber)] font-medium transition text-sm sm:text-base"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 overflow-auto rounded-xl sm:rounded-2xl border border-[var(--ink)]/10 hidden sm:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left border-collapse",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-[var(--sand)] sticky top-0 z-10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3 sm:p-4 text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider border-b border-[var(--ink)]/10",
											children: "Product"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3 sm:p-4 text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider border-b border-[var(--ink)]/10",
											children: "Price"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3 sm:p-4 text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider border-b border-[var(--ink)]/10 hidden md:table-cell",
											children: "Badge"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3 sm:p-4 text-xs font-bold text-[var(--ink)]/60 uppercase tracking-wider border-b border-[var(--ink)]/10 text-right",
											children: "Actions"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 4,
									className: "p-8 text-center font-bold text-[var(--ink)]/50",
									children: "Loading inventory..."
								}) }) : filteredProducts?.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 4,
									className: "p-8 text-center font-bold text-[var(--ink)]/50",
									children: "No products found."
								}) }) : filteredProducts?.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-[var(--ink)]/5 hover:bg-[var(--sand)]/50 transition",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 sm:p-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3 sm:gap-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[var(--sand)] to-[#fce5b8] p-1 flex-shrink-0 border border-[var(--ink)]/5",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: p.image,
														alt: p.name,
														className: "w-full h-full object-contain drop-shadow-sm"
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "font-bold text-[var(--maroon)] text-sm sm:text-base truncate",
														children: p.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-xs text-[var(--ink)]/60 mt-0.5 truncate",
														children: p.tagline
													})]
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "p-3 sm:p-4 font-display text-lg sm:text-xl text-[var(--crimson)]",
											children: ["₹", p.price.toFixed(2)]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 sm:p-4 hidden md:table-cell",
											children: p.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "px-2 py-1 rounded bg-[var(--amber)]/20 text-[var(--maroon)] text-xs font-bold uppercase tracking-wider",
												children: p.badge
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-[var(--ink)]/30",
												children: "—"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 sm:p-4 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-end gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setIsEditing(p),
													className: "w-8 h-8 rounded-full bg-[var(--cream)] border border-[var(--ink)]/10 grid place-items-center hover:bg-[var(--amber)] text-[var(--ink)]/70 hover:text-[var(--maroon)] transition",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "w-4 h-4" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleDelete(p.id),
													className: "w-8 h-8 rounded-full bg-[var(--cream)] border border-[var(--ink)]/10 grid place-items-center hover:bg-red-50 text-[var(--ink)]/70 hover:text-red-500 transition",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
												})]
											})
										})
									]
								}, p.id)) })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 space-y-3 sm:hidden",
							children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-8 text-center font-bold text-[var(--ink)]/50",
								children: "Loading inventory..."
							}) : filteredProducts?.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-8 text-center font-bold text-[var(--ink)]/50",
								children: "No products found."
							}) : filteredProducts?.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-[var(--cream)]/50 rounded-xl border border-[var(--ink)]/5 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--sand)] to-[#fce5b8] p-1 flex-shrink-0 border border-[var(--ink)]/5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: p.image,
												alt: p.name,
												className: "w-full h-full object-contain drop-shadow-sm"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-bold text-[var(--maroon)] text-sm truncate",
												children: p.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-[var(--ink)]/60 truncate",
												children: p.tagline
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-display text-lg text-[var(--crimson)] flex-shrink-0",
											children: ["₹", p.price.toFixed(2)]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mt-2.5 pt-2.5 border-t border-[var(--ink)]/5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: p.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-2 py-0.5 rounded bg-[var(--amber)]/20 text-[var(--maroon)] text-xs font-bold uppercase tracking-wider",
										children: p.badge
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-[var(--ink)]/30",
										children: "No badge"
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setIsEditing(p),
											className: "w-8 h-8 rounded-full bg-white border border-[var(--ink)]/10 grid place-items-center hover:bg-[var(--amber)] text-[var(--ink)]/70 hover:text-[var(--maroon)] transition",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "w-3.5 h-3.5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => handleDelete(p.id),
											className: "w-8 h-8 rounded-full bg-white border border-[var(--ink)]/10 grid place-items-center hover:bg-red-50 text-[var(--ink)]/70 hover:text-red-500 transition",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
										})]
									})]
								})]
							}, p.id))
						})
					] })
				})]
			})]
		})
	});
}
function ProductForm({ initialData, onSave, onCancel }) {
	const { data: categories } = useCategories();
	const [formData, setFormData] = (0, import_react.useState)({
		name: initialData?.name || "",
		tagline: initialData?.tagline || "",
		price: initialData?.price || 0,
		originalPrice: initialData?.originalPrice || "",
		image: initialData?.image || "/logo1.png",
		badge: initialData?.badge || "",
		category: initialData?.category || "",
		description: initialData?.description || ""
	});
	(0, import_react.useEffect)(() => {
		if (!formData.category && categories && categories.length > 0) setFormData((prev) => ({
			...prev,
			category: categories[0]
		}));
		else if (categories && categories.length > 0 && formData.category && !categories.includes(formData.category)) setFormData((prev) => ({
			...prev,
			category: categories[0]
		}));
	}, [categories, formData.category]);
	const handleImageUpload = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setFormData((prev) => ({
					...prev,
					image: reader.result
				}));
			};
			reader.readAsDataURL(file);
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formData.image) {
			alert("Please upload an image or provide an image URL.");
			return;
		}
		const dataToSave = {
			...formData,
			rating: initialData?.rating ?? 5,
			reviewsCount: initialData?.reviewsCount ?? 0
		};
		if (formData.originalPrice === "") delete dataToSave.originalPrice;
		else dataToSave.originalPrice = Number(formData.originalPrice);
		onSave(dataToSave);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex-1 flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 sm:mb-6 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl sm:text-3xl text-[var(--maroon)]",
				children: initialData ? "Edit Product" : "New Product"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onCancel,
				className: "text-sm font-bold text-[var(--ink)]/60 hover:text-[var(--ink)] transition",
				children: "Cancel"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "space-y-4 sm:space-y-5 flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider",
							children: "Product Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type: "text",
							value: formData.name,
							onChange: (e) => setFormData({
								...formData,
								name: e.target.value
							}),
							className: "w-full h-10 sm:h-11 px-4 rounded-xl bg-[var(--cream)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--amber)] font-medium transition text-sm sm:text-base"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3 sm:gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider",
								children: "Selling Price (₹)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								type: "number",
								step: "1",
								value: formData.price,
								onChange: (e) => setFormData({
									...formData,
									price: parseFloat(e.target.value)
								}),
								className: "w-full h-10 sm:h-11 px-4 rounded-xl bg-[var(--cream)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--amber)] font-medium transition text-sm sm:text-base"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider",
								children: "Compare Price (₹)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								step: "1",
								value: formData.originalPrice,
								onChange: (e) => setFormData({
									...formData,
									originalPrice: e.target.value
								}),
								className: "w-full h-10 sm:h-11 px-4 rounded-xl bg-[var(--cream)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--amber)] font-medium transition text-sm sm:text-base"
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider",
						children: "Tagline"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						type: "text",
						placeholder: "e.g., Slow-roasted Californian",
						value: formData.tagline,
						onChange: (e) => setFormData({
							...formData,
							tagline: e.target.value
						}),
						className: "w-full h-10 sm:h-11 px-4 rounded-xl bg-[var(--cream)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--amber)] font-medium transition text-sm sm:text-base"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider",
								children: "Product Image"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "md:col-span-2 border-2 border-dashed border-[var(--ink)]/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-[var(--cream)]/30 hover:bg-[var(--cream)]/60 transition flex flex-col items-center justify-center min-h-[120px] sm:min-h-[160px] text-center relative group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "file",
										accept: "image/*",
										onChange: handleImageUpload,
										className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
									}), formData.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col items-center gap-2 sm:gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: formData.image,
											alt: "Preview",
											className: "h-16 sm:h-24 object-contain rounded-lg drop-shadow-md"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-[var(--ink)]/60 font-medium",
											children: "Click or drag new image to replace"
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-6 h-6 sm:w-8 sm:h-8 text-[var(--ink)]/40" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs sm:text-sm font-semibold text-[var(--ink)]/70",
												children: "Upload Product Image"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-[var(--ink)]/40",
												children: "Drag & drop or click to choose file"
											})
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col justify-between h-full space-y-3 sm:space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider block",
											children: "Or Paste Image URL"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "e.g., https://example.com/image.jpg",
											value: formData.image,
											onChange: (e) => setFormData({
												...formData,
												image: e.target.value
											}),
											className: "w-full h-10 sm:h-11 px-4 rounded-xl bg-[var(--cream)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--amber)] font-medium transition text-sm sm:text-base"
										})]
									}), formData.image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setFormData({
											...formData,
											image: ""
										}),
										className: "w-full h-9 sm:h-10 rounded-full border border-[var(--ink)]/10 text-xs font-bold text-red-500 hover:bg-red-50 transition",
										children: "Clear Image"
									})]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 md:col-span-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider",
								children: "Category"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: formData.category,
								onChange: (e) => setFormData({
									...formData,
									category: e.target.value
								}),
								className: "w-full h-10 sm:h-11 px-4 rounded-xl bg-[var(--cream)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--amber)] font-medium transition text-sm sm:text-base",
								children: categories?.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: cat,
									children: cat
								}, cat))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 md:col-span-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider",
								children: "Badge (optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "e.g., Bestseller",
								value: formData.badge,
								onChange: (e) => setFormData({
									...formData,
									badge: e.target.value
								}),
								className: "w-full h-10 sm:h-11 px-4 rounded-xl bg-[var(--cream)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--amber)] font-medium transition text-sm sm:text-base"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pt-4 sm:pt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "h-11 sm:h-12 px-6 sm:px-8 rounded-full bg-[var(--crimson)] text-white font-bold hover:scale-[1.02] transition shadow-md flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center",
						children: initialData ? "Save Changes" : "Create Product"
					})
				})
			]
		})]
	});
}
//#endregion
export { AdminDashboardWrapper as component };
