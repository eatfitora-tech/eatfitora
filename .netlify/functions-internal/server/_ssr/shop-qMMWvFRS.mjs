import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { o as useProducts, r as useCategories } from "./useProducts-1oxHq1hv.mjs";
import { t as ProductCard } from "./ProductCard-CrdDkCMX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-qMMWvFRS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ShopPage() {
	const { data: products, isLoading: isProductsLoading } = useProducts();
	const { data: dbCategories, isLoading: isCategoriesLoading } = useCategories();
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("All");
	const categories = ["All", ...dbCategories || []];
	const isLoading = isProductsLoading || isCategoriesLoading;
	const filteredProducts = products?.filter((p) => selectedCategory === "All" ? true : p.category === selectedCategory) || [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-[var(--cream)] min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-8 sm:mb-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl sm:text-5xl md:text-6xl text-[var(--maroon)]",
						children: "The Harvest"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 sm:mt-4 text-[var(--ink)]/75 max-w-2xl mx-auto text-sm sm:text-base",
						children: "Browse our curated selection of premium dry fruits and wholesome snacks, carefully sourced and freshness-packed to deliver exceptional taste,crunch, and nutrition in every bite."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-12",
					children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setSelectedCategory(cat),
						className: `px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold transition-all shadow-sm text-xs sm:text-sm ${selectedCategory === cat ? "bg-[var(--crimson)] text-[var(--cream)]" : "bg-white text-[var(--ink)] border border-[var(--ink)]/10 hover:bg-[var(--sand)] hover:border-[var(--sand)]"}`,
						children: cat
					}, cat))
				}),
				isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center font-bold text-[var(--maroon)] text-xl py-20",
					children: "Loading harvest..."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
					children: filteredProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.id))
				})
			]
		})
	});
}
//#endregion
export { ShopPage as component };
