import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react, r as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { t as useStore } from "./useStore-Dbv8EsSq.mjs";
import { I as useRouter, O as redirect, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$14 } from "../_productId-BXIgLeua.mjs";
import { n as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { A as ArrowRight, N as House, c as ShoppingBag, g as Menu, n as User, t as X, u as Search } from "../_libs/lucide-react.mjs";
import { t as useAuth } from "./useAuth-QGxqvN1h.mjs";
import { t as hero_bowl_default } from "./hero-bowl-BuIiS9-l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DAf_UZ3C.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DfWil2-P.css";
function Nav({ tone = "light" }) {
	const [isSearchOpen, setIsSearchOpen] = (0, import_react.useState)(false);
	const [isMenuOpen, setIsMenuOpen] = (0, import_react.useState)(false);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const onDark = tone === "dark";
	const cartCount = useStore((state) => state.cart.reduce((sum, item) => sum + item.quantity, 0));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: `fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-sm transition-colors ${onDark ? "bg-[var(--crimson)]/95 text-[var(--cream)] border-b border-white/10" : "bg-[var(--cream)]/95 text-[var(--ink)] border-b border-[var(--ink)]/10"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 py-1 flex items-center justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "block shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo1.png",
						alt: "Fitora Logo",
						className: "h-10 sm:h-12 md:h-14 max-w-[200px] sm:max-w-[280px] object-contain drop-shadow-md"
					})
				}),
				isSearchOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					action: "/search",
					className: `flex-1 max-w-xl mx-3 sm:mx-4 md:mx-8 flex items-center gap-2 sm:gap-3 rounded-full px-4 sm:px-5 py-2 border transition-all group ${onDark ? "bg-white/10 border-white/20 text-white focus-within:bg-white focus-within:text-[var(--ink)]" : "bg-black/5 border-black/10 text-[var(--ink)] focus-within:bg-white focus-within:border-[var(--amber)]"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 opacity-60 shrink-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "q",
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							autoFocus: true,
							type: "text",
							placeholder: "Search harvest...",
							className: "flex-1 bg-transparent border-none outline-none placeholder-current opacity-80 focus:opacity-100 text-sm sm:text-base min-w-0"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setIsSearchOpen(false),
							className: "opacity-60 hover:opacity-100 p-1 shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold",
					children: [
						"Home",
						"Shop",
						"Profile"
					].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l === "Home" ? "/" : `/${l.toLowerCase()}`,
						className: "opacity-80 hover:opacity-100 transition",
						children: l
					}, l))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 sm:gap-2",
					children: [
						!isSearchOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsSearchOpen(true),
							className: `w-9 h-9 sm:w-10 sm:h-10 rounded-full grid place-items-center transition ${onDark ? "hover:bg-white/10" : "hover:bg-black/5"}`,
							"aria-label": "Search",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/cart",
							className: "h-9 sm:h-11 pl-3 sm:pl-4 pr-4 sm:pr-5 rounded-full bg-[var(--amber)] text-[var(--maroon)] text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 sm:gap-2 hover:scale-[1.03] transition shadow-lg shrink-0 relative",
							children: [
								"Cart",
								cartCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-4 sm:min-w-5 h-4 sm:h-5 px-1 sm:px-1.5 rounded-full bg-[var(--crimson)] text-white text-[10px] sm:text-[11px] font-bold grid place-items-center leading-none",
									children: cartCount
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsMenuOpen(true),
							className: `md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full grid place-items-center ${onDark ? "hover:bg-white/10" : "hover:bg-black/5"}`,
							"aria-label": "Menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "w-4 h-4" })
						})
					]
				})
			]
		})
	}), isMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[60] md:hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 bg-black/40 backdrop-blur-sm",
			onClick: () => setIsMenuOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute top-0 right-0 w-72 h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between p-5 border-b border-[var(--ink)]/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl text-[var(--maroon)]",
						children: "Menu"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setIsMenuOpen(false),
						className: "w-9 h-9 rounded-full hover:bg-[var(--ink)]/5 grid place-items-center transition",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex-1 p-4 space-y-1",
					children: [
						{
							label: "Home",
							to: "/",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "w-5 h-5" })
						},
						{
							label: "Shop",
							to: "/shop",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "w-5 h-5" })
						},
						{
							label: "Profile",
							to: "/profile",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-5 h-5" })
						}
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						onClick: () => setIsMenuOpen(false),
						className: "flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-[var(--ink)]/80 hover:bg-[var(--sand)]/60 hover:text-[var(--maroon)] transition",
						children: [item.icon, item.label]
					}, item.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 border-t border-[var(--ink)]/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/cart",
						onClick: () => setIsMenuOpen(false),
						className: "flex items-center justify-center gap-2 w-full h-12 rounded-full bg-[var(--amber)] text-[var(--maroon)] font-bold hover:scale-[1.02] transition shadow-md",
						children: ["View Cart", cartCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-5 h-5 px-1.5 rounded-full bg-[var(--crimson)] text-white text-[11px] font-bold grid place-items-center",
							children: cartCount
						})]
					})
				})
			]
		})]
	})] });
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-[var(--maroon)] text-[var(--cream)]/80 border-t border-white/10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mb-4 sm:mb-6 block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo1.png",
						alt: "Fitora Logo",
						className: "h-16 sm:h-24 max-w-[220px] sm:max-w-[300px] object-contain drop-shadow-md"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs sm:text-sm max-w-sm",
					children: "Premium nuts and dry fruits, cracked fresh and shipped worldwide. Built with love (and a lot of peanut shells)."
				})]
			}), [{
				h: "Shop",
				links: [
					"Nuts",
					"Dry Fruits",
					"Mixes",
					"Gift Boxes"
				]
			}].map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display text-xl sm:text-2xl text-[var(--amber)] mb-2 sm:mb-3",
				children: col.h
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1.5 sm:space-y-2 text-xs sm:text-sm",
				children: col.links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: `/shop`,
					search: { category: l },
					className: "hover:text-[var(--amber)] transition",
					children: l
				}) }, l))
			})] }, col.h))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-white/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-xs text-center sm:text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "© 2026 Fitora. All shells cracked respectfully." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Made with warmth." })]
			})
		})]
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$13 = createRootRouteWithContext()({
	head: () => ({
		meta: [{ charSet: "utf-8" }, {
			name: "viewport",
			content: "width=device-width, initial-scale=1"
		}],
		links: [{
			rel: "icon",
			href: "/logo1.png"
		}, {
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function TopProgressBar() {
	const isPending = useRouterState().status === "pending";
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let interval;
		if (isPending) {
			setVisible(true);
			setProgress(10);
			interval = setInterval(() => {
				setProgress((prev) => {
					if (prev >= 90) return 90;
					return prev + (100 - prev) * .1;
				});
			}, 200);
		} else {
			setProgress(100);
			const timeout = setTimeout(() => {
				setVisible(false);
				setProgress(0);
			}, 300);
			return () => clearTimeout(timeout);
		}
		return () => clearInterval(interval);
	}, [isPending]);
	if (!visible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed top-0 left-0 h-1 bg-[var(--amber)] z-[99999] transition-all duration-300 ease-out",
		style: {
			width: `${progress}%`,
			opacity: progress === 100 ? 0 : 1,
			boxShadow: "0 0 10px var(--amber), 0 0 5px var(--amber)"
		}
	});
}
function RootComponent() {
	const { queryClient } = Route$13.useRouteContext();
	useAuth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopProgressBar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col min-h-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			]
		})]
	});
}
var $$splitComponentImporter$12 = () => import("./wishlist-CZfeQKr5.mjs");
var Route$12 = createFileRoute("/wishlist")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./signup-Ca1VfAqA.mjs");
var Route$11 = createFileRoute("/signup")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./shop-qMMWvFRS.mjs");
var Route$10 = createFileRoute("/shop")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./search-Cuwah_wx.mjs");
var Route$9 = createFileRoute("/search")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./profile-C7Rchwc5.mjs");
var Route$8 = createFileRoute("/profile")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./login-Big7IU-e.mjs");
var Route$7 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./cart-DopmRisa.mjs");
var Route$6 = createFileRoute("/cart")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./auth-callback-CIPfHfBm.mjs");
var Route$5 = createFileRoute("/auth-callback")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./admin-login-Bp5FFBMW.mjs");
var Route$4 = createFileRoute("/admin-login")({
	beforeLoad: () => {
		if (useStore.getState().user?.role === "admin") throw redirect({ to: "/admin" });
	},
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./admin-BdJU4nnR.mjs");
var Route$3 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./routes-DvVX4IP-.mjs");
var Route$2 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "Fitora — Premium Nuts & Dry Fruits, Cracked Fresh" },
			{
				name: "description",
				content: "Hand-picked nuts and dry fruits — cashews, almonds, pistachios, dates and more. Roasted in small batches and delivered to your door."
			},
			{
				property: "og:title",
				content: "Fitora — Premium Nuts & Dry Fruits"
			},
			{
				property: "og:description",
				content: "Hand-picked, small-batch roasted nuts and dry fruits delivered fresh."
			},
			{
				property: "og:image",
				content: hero_bowl_default
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Caveat+Brush&family=Fraunces:opsz,wght@9..144,500;9..144,700;9..144,900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
			}
		]
	}),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./summary-CugEO4-L.mjs");
var Route$1 = createFileRoute("/checkout/summary")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./address-BQh6EP_6.mjs");
var Route = createFileRoute("/checkout/address")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var WishlistRoute = Route$12.update({
	id: "/wishlist",
	path: "/wishlist",
	getParentRoute: () => Route$13
});
var SignupRoute = Route$11.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => Route$13
});
var ShopRoute = Route$10.update({
	id: "/shop",
	path: "/shop",
	getParentRoute: () => Route$13
});
var SearchRoute = Route$9.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => Route$13
});
var ProfileRoute = Route$8.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Route$13
});
var LoginRoute = Route$7.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$13
});
var CartRoute = Route$6.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$13
});
var AuthCallbackRoute = Route$5.update({
	id: "/auth-callback",
	path: "/auth-callback",
	getParentRoute: () => Route$13
});
var AdminLoginRoute = Route$4.update({
	id: "/admin-login",
	path: "/admin-login",
	getParentRoute: () => Route$13
});
var AdminRoute = Route$3.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$13
});
var IndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var ProductProductIdRoute = Route$14.update({
	id: "/product/$productId",
	path: "/product/$productId",
	getParentRoute: () => Route$13
});
var CheckoutSummaryRoute = Route$1.update({
	id: "/checkout/summary",
	path: "/checkout/summary",
	getParentRoute: () => Route$13
});
var rootRouteChildren = {
	IndexRoute,
	AdminRoute,
	AdminLoginRoute,
	AuthCallbackRoute,
	CartRoute,
	LoginRoute,
	ProfileRoute,
	SearchRoute,
	ShopRoute,
	SignupRoute,
	WishlistRoute,
	CheckoutAddressRoute: Route.update({
		id: "/checkout/address",
		path: "/checkout/address",
		getParentRoute: () => Route$13
	}),
	CheckoutSummaryRoute,
	ProductProductIdRoute
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
