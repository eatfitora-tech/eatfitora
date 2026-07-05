import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useStore } from "./useStore-Dbv8EsSq.mjs";
import { F as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as ArrowRight, S as Lock, l as ShieldCheck, n as User } from "../_libs/lucide-react.mjs";
import { t as UnauthorizedView } from "./UnauthorizedView-1ss5bzKA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-login-Bp5FFBMW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLogin() {
	const [username, setUsername] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const login = useStore((state) => state.login);
	const navigate = useNavigate();
	if (useStore((state) => state.user)?.role === "user") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnauthorizedView, {});
	const handleLogin = (e) => {
		e.preventDefault();
		if (username === "fitora-admin" && password === "Fitora@2026!") {
			login("admin", "admin");
			navigate({ to: "/admin" });
		} else setError("Invalid credentials. Please check your username and password.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-[var(--sand)] text-[var(--ink)] pt-24 sm:pt-32 pb-16 sm:pb-24 flex items-center justify-center px-4 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-[var(--shadow-card)] border border-[var(--ink)]/5 text-center relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-32 h-32 bg-[var(--amber)]/10 rounded-full blur-3xl -mr-16 -mt-16" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-14 h-14 sm:w-16 sm:h-16 bg-[var(--amber)]/20 rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6 text-[var(--amber)] shadow-inner relative z-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-7 h-7 sm:w-8 sm:h-8" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl sm:text-3xl text-[var(--maroon)] mb-2 relative z-10",
					children: "Admin Portal"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[var(--ink)]/60 text-xs sm:text-sm mb-6 sm:mb-8 font-medium relative z-10",
					children: "Sign in to manage inventory and orders"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleLogin,
					className: "space-y-4 sm:space-y-5 text-left relative z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 sm:space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider pl-1",
								children: "Username"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-4 h-4 sm:w-5 sm:h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink)]/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									type: "text",
									placeholder: "Enter admin username",
									value: username,
									onChange: (e) => {
										setUsername(e.target.value);
										setError("");
									},
									className: `w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-5 rounded-xl sm:rounded-2xl bg-[var(--cream)] border ${error ? "border-red-400 focus:ring-red-400/20" : "border-[var(--ink)]/10 focus:border-[var(--amber)] focus:ring-[var(--amber)]/10"} focus:outline-none focus:ring-4 font-medium transition-all text-sm sm:text-base`
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 sm:space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider pl-1",
									children: "Password"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4 sm:w-5 sm:h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink)]/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										type: "password",
										placeholder: "Enter admin password",
										value: password,
										onChange: (e) => {
											setPassword(e.target.value);
											setError("");
										},
										className: `w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-5 rounded-xl sm:rounded-2xl bg-[var(--cream)] border ${error ? "border-red-400 focus:ring-red-400/20" : "border-[var(--ink)]/10 focus:border-[var(--amber)] focus:ring-[var(--amber)]/10"} focus:outline-none focus:ring-4 font-medium transition-all text-sm sm:text-base`
									})]
								}),
								error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-red-500 text-xs font-bold pl-1 mt-1",
									children: error
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							className: "w-full h-12 sm:h-14 mt-3 sm:mt-4 rounded-full bg-[var(--amber)] text-[var(--maroon)] font-bold text-base sm:text-lg hover:bg-[#e6a928] transition shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2",
							children: ["Access Dashboard ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4 sm:w-5 sm:h-5" })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 sm:mt-8 text-sm font-medium text-[var(--ink)]/50 relative z-10 border-t border-[var(--ink)]/5 pt-5 sm:pt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "text-[var(--ink)]/70 hover:text-[var(--maroon)] transition font-bold flex items-center justify-center gap-2",
						children: "Return to User Login"
					})
				})
			]
		})
	});
}
//#endregion
export { AdminLogin as component };
