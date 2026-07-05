import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useProducts-1oxHq1hv.js
var DEFAULT_PRODUCTS = [
	{
		id: "1",
		name: "Jumbo Cashews",
		tagline: "W240 · slow-roasted",
		price: 1150,
		originalPrice: 1450,
		image: "/assets/product-cashews-DoSO-jE-.png",
		badge: "Bestseller",
		category: "Nuts",
		description: "Our signature jumbo cashews are slow-roasted in small batches to preserve their buttery texture and rich flavor. Perfect for snacking, baking, or gifting.",
		specifications: {
			Origin: "India",
			Grade: "W240",
			Roast: "Slow, Low Heat"
		},
		rating: 4.9,
		reviewsCount: 420
	},
	{
		id: "2",
		name: "Mamra Almonds",
		tagline: "Sun-dried Kashmiri",
		price: 1450,
		originalPrice: 1800,
		image: "/assets/product-almonds-CaOPOY27.png",
		category: "Nuts",
		description: "Premium Mamra almonds sourced directly from Kashmir. Known for their distinct shape and high oil content, offering exceptional health benefits and crunch.",
		specifications: {
			Origin: "Kashmir, India",
			Type: "Mamra",
			Processing: "Sun-dried"
		},
		rating: 4.8,
		reviewsCount: 315
	},
	{
		id: "3",
		name: "Pistachios",
		tagline: "Cracked & salted",
		price: 1280,
		originalPrice: 1600,
		image: "/assets/product-pistachios-BkZd02mS.png",
		badge: "New",
		category: "Nuts",
		description: "Lightly salted and roasted to perfection. These pistachios are naturally open and easy to crack, making them an addictive healthy snack.",
		specifications: {
			Origin: "Iran",
			Salt: "Himalayan Pink Salt"
		},
		rating: 4.7,
		reviewsCount: 156
	},
	{
		id: "4",
		name: "Medjool Dates",
		tagline: "Soft, caramel-sweet",
		price: 950,
		originalPrice: 1200,
		image: "/assets/product-dates-BsH4Sdwr.png",
		category: "Dry Fruits",
		description: "The 'king of dates'. These Medjool dates are large, soft, and bursting with a natural caramel-like sweetness. A perfect energy booster.",
		specifications: {
			Origin: "California, USA",
			Texture: "Soft, Chewy",
			Sweetness: "High"
		},
		rating: 5,
		reviewsCount: 892
	},
	{
		id: "5",
		name: "Walnut Halves",
		tagline: "Buttery California",
		price: 1080,
		originalPrice: 1350,
		image: "/assets/product-walnuts-CgLQ7K5L.png",
		category: "Nuts",
		description: "Fresh, buttery walnut halves with zero bitterness. Packed with Omega-3s and perfect for brain health.",
		specifications: {
			Origin: "California, USA",
			Size: "Halves"
		},
		rating: 4.6,
		reviewsCount: 204
	},
	{
		id: "6",
		name: "Dried Apricots",
		tagline: "Turkish, unsulfured",
		price: 880,
		originalPrice: 1100,
		image: "/assets/product-apricots-d_Ov8PLL.png",
		category: "Dry Fruits",
		description: "Naturally sweet and tart unsulfured apricots. Sun-dried to preserve their dark color and intense flavor.",
		specifications: {
			Origin: "Turkey",
			Processing: "Unsulfured, Sun-dried"
		},
		rating: 4.8,
		reviewsCount: 412
	}
];
var PRODUCTS_KEY = "fitora_products";
var getProducts = () => {
	const stored = localStorage.getItem(PRODUCTS_KEY);
	if (!stored) {
		localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
		return DEFAULT_PRODUCTS;
	}
	return JSON.parse(stored);
};
var useProducts = () => {
	return useQuery({
		queryKey: ["products"],
		queryFn: getProducts
	});
};
var useAddProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (newProduct) => {
			const products = getProducts();
			const product = {
				...newProduct,
				id: crypto.randomUUID()
			};
			const updated = [...products, product];
			localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
			return product;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		}
	});
};
var useUpdateProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (updatedProduct) => {
			const updated = getProducts().map((p) => p.id === updatedProduct.id ? updatedProduct : p);
			localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
			return updatedProduct;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		}
	});
};
var useDeleteProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id) => {
			const updated = getProducts().filter((p) => p.id !== id);
			localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
			return id;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		}
	});
};
var CATEGORIES_KEY = "fitora_categories";
var DEFAULT_CATEGORIES = [
	"Nuts",
	"Dry Fruits",
	"Mixes",
	"Gift Boxes"
];
var getCategories = () => {
	if (typeof window === "undefined") return DEFAULT_CATEGORIES;
	const stored = localStorage.getItem(CATEGORIES_KEY);
	if (!stored) {
		localStorage.setItem(CATEGORIES_KEY, JSON.stringify(DEFAULT_CATEGORIES));
		return DEFAULT_CATEGORIES;
	}
	return JSON.parse(stored);
};
var useCategories = () => {
	return useQuery({
		queryKey: ["categories"],
		queryFn: getCategories
	});
};
var useAddCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (newCategory) => {
			const categories = getCategories();
			const trimmed = newCategory.trim();
			if (!trimmed) throw new Error("Category name cannot be empty");
			if (categories.some((c) => c.toLowerCase() === trimmed.toLowerCase())) throw new Error("Category already exists");
			const updated = [...categories, trimmed];
			localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updated));
			return trimmed;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		}
	});
};
var useDeleteCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (categoryToDelete) => {
			const updated = getCategories().filter((c) => c !== categoryToDelete);
			localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updated));
			return categoryToDelete;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		}
	});
};
//#endregion
export { useDeleteProduct as a, useDeleteCategory as i, useAddProduct as n, useProducts as o, useCategories as r, useUpdateProduct as s, useAddCategory as t };
