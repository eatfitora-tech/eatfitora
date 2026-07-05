import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as useStore } from "./useStore-Dbv8EsSq.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as useProducts } from "./useProducts-1oxHq1hv.mjs";
import { w as Heart } from "../_libs/lucide-react.mjs";
import { t as ProductCard } from "./ProductCard-CrdDkCMX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wishlist-CZfeQKr5.js
var import_jsx_runtime = require_jsx_runtime();
function WishlistPage() {
	const { wishlist } = useStore();
	const { data: products, isLoading } = useProducts();
	const wishlistedProducts = products?.filter((p) => wishlist.includes(p.id)) || [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-[var(--cream)] min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-8 h-8 sm:w-10 sm:h-10 text-[var(--crimson)] fill-[var(--crimson)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl sm:text-5xl md:text-6xl text-[var(--maroon)]",
					children: "Your Wishlist"
				})]
			}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center font-bold text-[var(--maroon)] text-xl py-20",
				children: "Loading wishlist..."
			}) : wishlistedProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-3xl p-12 text-center shadow-sm border border-[var(--ink)]/10 max-w-2xl mx-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-16 h-16 text-[var(--ink)]/20 mx-auto mb-6" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl text-[var(--crimson)] mb-4",
						children: "Nothing here yet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[var(--ink)]/70 mb-8",
						children: "Save your favorite nuts and dry fruits by clicking the heart icon on any product page."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						className: "inline-flex items-center gap-2 h-12 px-8 rounded-full bg-[var(--amber)] text-[var(--maroon)] font-bold hover:scale-[1.03] transition shadow-xl",
						children: "Explore the Harvest"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
				children: wishlistedProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.id))
			})]
		})
	});
}
//#endregion
export { WishlistPage as component };
