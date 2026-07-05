import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { F as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/UnauthorizedView-1ss5bzKA.js
var import_jsx_runtime = require_jsx_runtime();
function UnauthorizedView() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-[var(--cream)] text-[var(--ink)] pt-24 sm:pt-32 pb-16 sm:pb-24 flex items-center justify-center px-4 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-20 -right-20 w-48 h-48 bg-[var(--crimson)]/10 rounded-full blur-3xl pointer-events-none" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-16 -left-16 w-40 h-40 bg-[var(--amber)]/10 rounded-full blur-3xl pointer-events-none" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-[var(--shadow-card)] border border-[var(--ink)]/5 overflow-hidden text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--crimson)] via-[var(--amber)] to-[var(--crimson)]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-20 h-20 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-red-100",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								xmlns: "http://www.w3.org/2000/svg",
								fill: "none",
								viewBox: "0 0 24 24",
								strokeWidth: 1.5,
								stroke: "currentColor",
								className: "w-10 h-10 animate-pulse",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									strokeLinecap: "round",
									strokeLinejoin: "round",
									d: "M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-2xl sm:text-3xl text-[var(--maroon)] mb-3",
							children: "You seem lost"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[var(--ink)]/65 text-sm font-medium leading-relaxed mb-8",
							children: "You don't have permission to access the Admin Dashboard. Let's get you back to where you belong."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => navigate({ to: "/" }),
								className: "w-full h-12 sm:h-14 rounded-full bg-gradient-to-r from-[var(--crimson)] to-[var(--maroon)] text-white font-bold text-base hover:shadow-lg hover:shadow-[var(--crimson)]/20 transition duration-200 flex items-center justify-center gap-2 group",
								children: ["Go to Home Page", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									xmlns: "http://www.w3.org/2000/svg",
									fill: "none",
									viewBox: "0 0 24 24",
									strokeWidth: 2,
									stroke: "currentColor",
									className: "w-4 h-4 group-hover:translate-x-1 transition-transform",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										strokeLinecap: "round",
										strokeLinejoin: "round",
										d: "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => navigate({ to: "/shop" }),
								className: "w-full h-12 sm:h-14 rounded-full bg-white border border-[var(--ink)]/10 text-[var(--ink)]/80 hover:bg-[var(--cream)]/30 font-bold text-base transition duration-200",
								children: "Browse Shop"
							})]
						})
					]
				})
			]
		})
	});
}
//#endregion
export { UnauthorizedView as t };
