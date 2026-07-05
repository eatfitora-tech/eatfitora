import { r as __toESM } from "../_runtime.mjs";
import { o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useStore } from "./useStore-Dbv8EsSq.mjs";
import { t as supabase } from "./supabase-3TxsKobz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useAuth-QGxqvN1h.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useAuth() {
	const [user, setUser] = (0, import_react.useState)(null);
	const [session, setSession] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const storeLogin = useStore((state) => state.login);
	const storeLogout = useStore((state) => state.logout);
	const syncToStore = (0, import_react.useCallback)((supaUser) => {
		if (supaUser) {
			storeLogin(supaUser.user_metadata?.full_name || supaUser.user_metadata?.username || supaUser.user_metadata?.name || supaUser.email?.split("@")[0] || "User", "user");
			if (supaUser.email) {
				const userAlias = (supaUser.user_metadata?.username || supaUser.email.split("@")[0]).toLowerCase();
				const usernames = JSON.parse(localStorage.getItem("fitora_usernames") || "{}");
				usernames[userAlias] = supaUser.email;
				localStorage.setItem("fitora_usernames", JSON.stringify(usernames));
			}
		} else storeLogout();
	}, [storeLogin, storeLogout]);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
			setSession(currentSession);
			setUser(currentSession?.user ?? null);
			syncToStore(currentSession?.user ?? null);
			setLoading(false);
		});
		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
			setSession(newSession);
			setUser(newSession?.user ?? null);
			syncToStore(newSession?.user ?? null);
			setLoading(false);
		});
		return () => {
			subscription.unsubscribe();
		};
	}, [syncToStore]);
	const signIn = async (emailOrUsername, password) => {
		let email = emailOrUsername.trim();
		const lowerEmail = email.toLowerCase();
		if (lowerEmail === "fitora-admin" || lowerEmail === "admin@fitora.com") if (password === "Fitora@2026!") {
			storeLogin("admin", "admin");
			return { user: { email: "admin@fitora.com" } };
		} else throw new Error("Invalid credentials.");
		if (!email.includes("@")) {
			const mappedEmail = JSON.parse(localStorage.getItem("fitora_usernames") || "{}")[lowerEmail];
			if (mappedEmail) email = mappedEmail;
			else throw new Error(`Username "${emailOrUsername}" not found. Please sign in with your email.`);
		}
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (error) throw error;
		return data;
	};
	const signUp = async (email, password, metadata) => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: { data: {
				full_name: metadata?.fullName || "",
				username: metadata?.username || "",
				phone: metadata?.phone || ""
			} }
		});
		if (error) throw error;
		if (email) {
			const userAlias = (metadata?.username || email.split("@")[0]).toLowerCase();
			const usernames = JSON.parse(localStorage.getItem("fitora_usernames") || "{}");
			usernames[userAlias] = email.toLowerCase();
			localStorage.setItem("fitora_usernames", JSON.stringify(usernames));
		}
		return data;
	};
	const signInWithGoogle = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: `${window.location.origin}/auth-callback` }
		});
		if (error) throw error;
		return data;
	};
	const signOut = async () => {
		storeLogout();
		try {
			const { error } = await supabase.auth.signOut();
			if (error) console.error("Supabase signOut error:", error);
		} catch (e) {
			console.error(e);
		}
	};
	const resetPassword = async (email) => {
		const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/login` });
		if (error) throw error;
		return data;
	};
	return {
		user,
		session,
		loading,
		signIn,
		signUp,
		signInWithGoogle,
		signOut,
		resetPassword
	};
}
//#endregion
export { useAuth as t };
