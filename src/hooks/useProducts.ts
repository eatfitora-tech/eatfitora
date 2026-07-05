import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import imgCashews from "@/assets/product-cashews.webp";
import imgAlmonds from "@/assets/product-almonds.webp";
import imgPistachios from "@/assets/product-pistachios.webp";
import imgDates from "@/assets/product-dates.webp";
import imgWalnuts from "@/assets/product-walnuts.webp";
import imgApricots from "@/assets/product-apricots.webp";

export type ProductCategory = string;

export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  category: ProductCategory;
  description: string;
  specifications?: Record<string, string>;
  rating: number;
  reviewsCount: number;
};

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Jumbo Cashews",
    tagline: "W240 · slow-roasted",
    price: 1150,
    originalPrice: 1450,
    image: imgCashews,
    badge: "Bestseller",
    category: "Nuts",
    description:
      "Our signature jumbo cashews are slow-roasted in small batches to preserve their buttery texture and rich flavor. Perfect for snacking, baking, or gifting.",
    specifications: { Origin: "India", Grade: "W240", Roast: "Slow, Low Heat" },
    rating: 4.9,
    reviewsCount: 420,
  },
  {
    id: "2",
    name: "Mamra Almonds",
    tagline: "Sun-dried Kashmiri",
    price: 1450,
    originalPrice: 1800,
    image: imgAlmonds,
    category: "Nuts",
    description:
      "Premium Mamra almonds sourced directly from Kashmir. Known for their distinct shape and high oil content, offering exceptional health benefits and crunch.",
    specifications: { Origin: "Kashmir, India", Type: "Mamra", Processing: "Sun-dried" },
    rating: 4.8,
    reviewsCount: 315,
  },
  {
    id: "3",
    name: "Pistachios",
    tagline: "Cracked & salted",
    price: 1280,
    originalPrice: 1600,
    image: imgPistachios,
    badge: "New",
    category: "Nuts",
    description:
      "Lightly salted and roasted to perfection. These pistachios are naturally open and easy to crack, making them an addictive healthy snack.",
    specifications: { Origin: "Iran", Salt: "Himalayan Pink Salt" },
    rating: 4.7,
    reviewsCount: 156,
  },
  {
    id: "4",
    name: "Medjool Dates",
    tagline: "Soft, caramel-sweet",
    price: 950,
    originalPrice: 1200,
    image: imgDates,
    category: "Dry Fruits",
    description:
      "The 'king of dates'. These Medjool dates are large, soft, and bursting with a natural caramel-like sweetness. A perfect energy booster.",
    specifications: { Origin: "California, USA", Texture: "Soft, Chewy", Sweetness: "High" },
    rating: 5.0,
    reviewsCount: 892,
  },
  {
    id: "5",
    name: "Walnut Halves",
    tagline: "Buttery California",
    price: 1080,
    originalPrice: 1350,
    image: imgWalnuts,
    category: "Nuts",
    description:
      "Fresh, buttery walnut halves with zero bitterness. Packed with Omega-3s and perfect for brain health.",
    specifications: { Origin: "California, USA", Size: "Halves" },
    rating: 4.6,
    reviewsCount: 204,
  },
  {
    id: "6",
    name: "Dried Apricots",
    tagline: "Turkish, unsulfured",
    price: 880,
    originalPrice: 1100,
    image: imgApricots,
    category: "Dry Fruits",
    description:
      "Naturally sweet and tart unsulfured apricots. Sun-dried to preserve their dark color and intense flavor.",
    specifications: { Origin: "Turkey", Processing: "Unsulfured, Sun-dried" },
    rating: 4.8,
    reviewsCount: 412,
  },
];

const PRODUCTS_KEY = "fitora_products_v2";

const getProducts = (): Product[] => {
  const stored = localStorage.getItem(PRODUCTS_KEY);
  if (!stored) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  }
  return JSON.parse(stored);
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newProduct: Omit<Product, "id">) => {
      const products = getProducts();
      const product = { ...newProduct, id: crypto.randomUUID() };
      const updated = [...products, product];
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
      return product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedProduct: Product) => {
      const products = getProducts();
      const updated = products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
      return updatedProduct;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const products = getProducts();
      const updated = products.filter((p) => p.id !== id);
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

const CATEGORIES_KEY = "fitora_categories";
const DEFAULT_CATEGORIES: string[] = ["Nuts", "Dry Fruits", "Mixes", "Gift Boxes"];

const getCategories = (): string[] => {
  if (typeof window === "undefined") return DEFAULT_CATEGORIES;
  const stored = localStorage.getItem(CATEGORIES_KEY);
  if (!stored) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(DEFAULT_CATEGORIES));
    return DEFAULT_CATEGORIES;
  }
  return JSON.parse(stored);
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCategory: string) => {
      const categories = getCategories();
      const trimmed = newCategory.trim();
      if (!trimmed) throw new Error("Category name cannot be empty");
      if (categories.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
        throw new Error("Category already exists");
      }
      const updated = [...categories, trimmed];
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updated));
      return trimmed;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (categoryToDelete: string) => {
      const categories = getCategories();
      const updated = categories.filter((c) => c !== categoryToDelete);
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updated));
      return categoryToDelete;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
