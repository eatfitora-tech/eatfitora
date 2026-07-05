import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { F as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as useProducts } from "./useProducts-1oxHq1hv.mjs";
import { u as Search } from "../_libs/lucide-react.mjs";
import { t as ProductCard } from "./ProductCard-CrdDkCMX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-Cuwah_wx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const navigate = useNavigate();
	const initialQuery = new URLSearchParams(window.location.search).get("q") || "";
	const [query, setQuery] = (0, import_react.useState)(initialQuery);
	const { data: products, isLoading } = useProducts();
	const handleSearch = (e) => {
		e.preventDefault();
		navigate({
			to: "/search",
			search: { q: query }
		});
	};
	const results = products?.filter((p) => p.name.toLowerCase().includes(initialQuery.toLowerCase()) || p.description.toLowerCase().includes(initialQuery.toLowerCase()) || p.category.toLowerCase().includes(initialQuery.toLowerCase())) || [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-[var(--cream)] min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSearch,
					className: "max-w-2xl mx-auto mb-10 sm:mb-16 relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: query,
							onChange: (e) => setQuery(e.target.value),
							placeholder: "Search for nuts, dry fruits...",
							className: "w-full h-12 sm:h-16 pl-11 sm:pl-14 pr-20 sm:pr-6 rounded-full border-2 border-[var(--ink)]/10 bg-white text-base sm:text-lg outline-none focus:border-[var(--amber)] shadow-sm transition"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-[var(--ink)]/40" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "absolute right-1.5 sm:right-2 top-1.5 sm:top-2 bottom-1.5 sm:bottom-2 px-4 sm:px-6 rounded-full bg-[var(--crimson)] text-[var(--cream)] font-bold text-sm sm:text-base hover:scale-[1.03] transition",
							children: "Search"
						})
					]
				}),
				initialQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-3xl text-[var(--maroon)]",
						children: [
							results.length,
							" results for \"",
							initialQuery,
							"\""
						]
					})
				}),
				isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center font-bold text-[var(--maroon)] text-xl py-20",
					children: "Searching..."
				}) : initialQuery && results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-16 h-16 text-[var(--ink)]/20 mx-auto mb-6" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-3xl text-[var(--maroon)] mb-4",
							children: "No harvest found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[var(--ink)]/60",
							children: "Try searching for something else like \"Cashews\" or \"Sweet\"."
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
					children: results.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.id))
				})
			]
		})
	});
}
//#endregion
export { SearchPage as component };
