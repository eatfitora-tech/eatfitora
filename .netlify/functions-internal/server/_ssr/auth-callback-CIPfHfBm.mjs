import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useStore } from "./useStore-Dbv8EsSq.mjs";
import { F as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./supabase-3TxsKobz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-callback-CIPfHfBm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthCallback() {
	const navigate = useNavigate();
	const cart = useStore((state) => state.cart);
	const login = useStore((state) => state.login);
	(0, import_react.useEffect)(() => {
		const handleCallback = async () => {
			const { data: { session } } = await supabase.auth.getSession();
			if (session?.user) {
				login(session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split("@")[0] || "User", "user");
				if (cart.length > 0) navigate({ to: "/checkout/address" });
				else navigate({ to: "/" });
			} else navigate({ to: "/login" });
		};
		handleCallback();
	}, [
		navigate,
		cart,
		login
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-[var(--cream)] flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-12 h-12 border-4 border-[var(--crimson)]/20 border-t-[var(--crimson)] rounded-full animate-spin mx-auto mb-6" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-[var(--maroon)] mb-2",
					children: "Signing you in..."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-[var(--ink)]/50 font-medium",
					children: "Just a moment while we verify your account."
				})
			]
		})
	});
}
//#endregion
export { AuthCallback as component };
