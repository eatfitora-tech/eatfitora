import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useStore } from "./useStore-Dbv8EsSq.mjs";
import { F as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as ArrowRight, E as EyeOff, S as Lock, T as Eye, k as Check, v as Mail, x as LogIn } from "../_libs/lucide-react.mjs";
import { t as useAuth } from "./useAuth-QGxqvN1h.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Big7IU-e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [resetSent, setResetSent] = (0, import_react.useState)(false);
	const cart = useStore((state) => state.cart);
	const navigate = useNavigate();
	const { signIn, signInWithGoogle, resetPassword } = useAuth();
	const handleLogin = async (e) => {
		e.preventDefault();
		if (!email.trim()) {
			setError("Please enter your email or username");
			return;
		}
		if (!password.trim()) {
			setError("Please enter your password");
			return;
		}
		setIsLoading(true);
		setError("");
		try {
			await signIn(email, password);
			if (useStore.getState().user?.role === "admin") navigate({ to: "/admin" });
			else if (cart.length > 0) navigate({ to: "/checkout/address" });
			else navigate({ to: "/" });
		} catch (err) {
			setError(err.message || "Invalid email or password");
		} finally {
			setIsLoading(false);
		}
	};
	const handleGoogleLogin = async () => {
		setIsLoading(true);
		setError("");
		try {
			await signInWithGoogle();
		} catch (err) {
			setError(err.message || "Google sign-in failed");
			setIsLoading(false);
		}
	};
	const handleForgotPassword = async () => {
		if (!email.trim()) {
			setError("Enter your email above, then click Forgot Password");
			return;
		}
		setIsLoading(true);
		setError("");
		try {
			await resetPassword(email);
			setResetSent(true);
		} catch (err) {
			setError(err.message || "Failed to send reset email");
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-[var(--cream)] text-[var(--ink)] pt-24 sm:pt-28 pb-16 sm:pb-24 flex items-center justify-center px-4 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-20 -right-20 w-48 h-48 bg-[var(--amber)]/15 rounded-full blur-3xl pointer-events-none" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-16 -left-16 w-40 h-40 bg-[var(--crimson)]/10 rounded-full blur-3xl pointer-events-none" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-[var(--shadow-card)] border border-[var(--ink)]/5 overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--crimson)] via-[var(--amber)] to-[var(--crimson)]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[var(--crimson)] to-[var(--maroon)] rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6 text-white shadow-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "w-6 h-6 sm:w-7 sm:h-7" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center mb-6 sm:mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-2xl sm:text-3xl text-[var(--maroon)] mb-2",
								children: "Welcome Back"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[var(--ink)]/55 text-xs sm:text-sm font-medium",
								children: "Sign in to your account to continue"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleGoogleLogin,
							disabled: isLoading,
							className: "w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-white border-2 border-[var(--ink)]/10 hover:border-[var(--ink)]/20 hover:bg-[var(--cream)]/50 transition-all duration-200 font-semibold text-[var(--ink)]/80 flex items-center justify-center gap-3 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed group text-sm sm:text-base",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								width: "20",
								height: "20",
								viewBox: "0 0 24 24",
								className: "shrink-0 group-hover:scale-110 transition-transform",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z",
										fill: "#4285F4"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
										fill: "#34A853"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
										fill: "#FBBC05"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
										fill: "#EA4335"
									})
								]
							}), "Continue with Google"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 my-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 h-px bg-[var(--ink)]/10" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-[var(--ink)]/35 uppercase tracking-widest",
									children: "or"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 h-px bg-[var(--ink)]/10" })
							]
						}),
						resetSent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-green-50 border border-green-200 text-green-700 text-sm font-semibold px-4 py-3 rounded-xl mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 shrink-0" }), "Password reset link sent! Check your email."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleLogin,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "login-email",
										className: "text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider pl-1",
										children: "Email or Username"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--ink)]/30 pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "login-email",
											type: "text",
											placeholder: "Email or username",
											value: email,
											onChange: (e) => {
												setEmail(e.target.value);
												setError("");
												setResetSent(false);
											},
											className: "w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-5 rounded-xl sm:rounded-2xl bg-[var(--cream)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--amber)] focus:ring-4 focus:ring-[var(--amber)]/10 font-medium transition-all text-sm sm:text-base"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "login-password",
										className: "text-xs font-bold text-[var(--ink)]/70 uppercase tracking-wider pl-1",
										children: "Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--ink)]/30 pointer-events-none" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "login-password",
												type: showPassword ? "text" : "password",
												value: password,
												onChange: (e) => {
													setPassword(e.target.value);
													setError("");
												},
												className: "w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-12 sm:pr-14 rounded-xl sm:rounded-2xl bg-[var(--cream)] border border-[var(--ink)]/10 focus:outline-none focus:border-[var(--amber)] focus:ring-4 focus:ring-[var(--amber)]/10 font-medium transition-all text-sm sm:text-base"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setShowPassword(!showPassword),
												className: "absolute right-4 top-1/2 -translate-y-1/2 text-[var(--ink)]/40 hover:text-[var(--ink)]/70 transition-colors p-1",
												"aria-label": showPassword ? "Hide password" : "Show password",
												children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "w-5 h-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-5 h-5" })
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: handleForgotPassword,
										className: "text-sm font-semibold text-[var(--crimson)] hover:text-[var(--maroon)] transition-colors hover:underline underline-offset-2",
										children: "Forgot Password?"
									})
								}),
								error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-red-50 border border-red-200 text-red-600 text-sm font-semibold px-4 py-3 rounded-xl animate-in fade-in duration-200",
									children: error
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: isLoading,
									className: "w-full h-12 sm:h-14 rounded-full bg-gradient-to-r from-[var(--crimson)] to-[var(--maroon)] text-white font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-[var(--crimson)]/25 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none group",
									children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Sign In", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-0.5 transition-transform" })] })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 pt-6 border-t border-[var(--ink)]/5 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-medium text-[var(--ink)]/50",
								children: [
									"Don't have an account?",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/signup",
										className: "text-[var(--crimson)] hover:text-[var(--maroon)] font-bold transition-colors hover:underline underline-offset-2",
										children: "Create Account"
									})
								]
							})
						})
					]
				})
			]
		})
	});
}
//#endregion
export { Login as component };
