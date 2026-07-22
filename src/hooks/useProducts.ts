import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import imgCashews from "@/assets/catalog-cashews.webp";
import imgAlmonds from "@/assets/catalog-almonds.webp";
import imgPistachios from "@/assets/catalog-pistachios.webp";
import imgDates from "@/assets/catalog-dates.webp";
import imgWalnuts from "@/assets/catalog-walnuts.webp";
import imgApricots from "@/assets/catalog-apricots.webp";
import imgRoyalMix from "@/assets/catalog-royal-mix.webp";
import imgAlmondCashew from "@/assets/catalog-almond-cashew.webp";

export type ProductCategory = string;

export type WeightOption = {
  weight: string;
  price: number;
  originalPrice?: number;
};

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
  sku: string;
  stockQuantity: number;
  lowStockThreshold: number;
  isActive: boolean;
  weightOptions?: WeightOption[];
  /** Set only on a cart copy of a product. */
  selectedWeight?: string;
  /** True when this item is displayed from the built-in catalog but is not yet stored in Supabase. */
  isFallback?: boolean;
};

type ProductRow = Omit<
  Product,
  | "weightOptions"
  | "selectedWeight"
  | "isFallback"
  | "stockQuantity"
  | "lowStockThreshold"
  | "isActive"
> & {
  specifications?: Record<string, unknown>;
  stock_quantity: number;
  low_stock_threshold: number;
  is_active: boolean;
};

const WEIGHT_OPTIONS_KEY = "__weightOptions";

function productFromRow(row: ProductRow): Product {
  const rawOptions = row.specifications?.[WEIGHT_OPTIONS_KEY];
  const weightOptions = Array.isArray(rawOptions)
    ? rawOptions.filter(
        (option): option is WeightOption =>
          Boolean(option) &&
          typeof option === "object" &&
          typeof option.weight === "string" &&
          typeof option.price === "number",
      )
    : undefined;
  const specifications = Object.fromEntries(
    Object.entries(row.specifications || {}).filter(([key]) => key !== WEIGHT_OPTIONS_KEY),
  ) as Record<string, string>;

  return {
    ...row,
    specifications,
    weightOptions: weightOptions?.length ? weightOptions : undefined,
    sku: row.sku || `FIT-${row.id.slice(0, 8).toUpperCase()}`,
    stockQuantity: Number(row.stock_quantity ?? 0),
    lowStockThreshold: Number(row.low_stock_threshold ?? 5),
    isActive: row.is_active ?? true,
  };
}

function productToRow(product: Omit<Product, "id"> | Product) {
  const {
    weightOptions,
    selectedWeight: _selectedWeight,
    isFallback: _isFallback,
    stockQuantity,
    lowStockThreshold,
    isActive,
    ...row
  } = product;
  return {
    ...row,
    stock_quantity: stockQuantity,
    low_stock_threshold: lowStockThreshold,
    is_active: isActive,
    specifications: {
      ...(row.specifications || {}),
      ...(weightOptions?.length ? { [WEIGHT_OPTIONS_KEY]: weightOptions } : {}),
    },
  };
}

export function getProductPrice(product: Product) {
  return product.weightOptions?.[0]?.price ?? product.price;
}

export function productCartKey(product: Pick<Product, "id" | "selectedWeight">) {
  return `${product.id}::${product.selectedWeight || "default"}`;
}

export const STARTER_PRODUCTS: Product[] = [
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
    sku: "FIT-CAS-W240",
    stockQuantity: 100,
    lowStockThreshold: 10,
    isActive: true,
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
    sku: "FIT-ALM-MAMRA",
    stockQuantity: 100,
    lowStockThreshold: 10,
    isActive: true,
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
    sku: "FIT-PIS-SALT",
    stockQuantity: 100,
    lowStockThreshold: 10,
    isActive: true,
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
    sku: "FIT-DAT-MED",
    stockQuantity: 100,
    lowStockThreshold: 10,
    isActive: true,
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
    sku: "FIT-WAL-HALF",
    stockQuantity: 100,
    lowStockThreshold: 10,
    isActive: true,
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
    sku: "FIT-APR-UNS",
    stockQuantity: 100,
    lowStockThreshold: 10,
    isActive: true,
  },
  {
    id: "local-royal-mix",
    name: "Fitora Royal Mix",
    tagline: "Six premium favourites",
    price: 349,
    originalPrice: 399,
    image: imgRoyalMix,
    badge: "Popular",
    category: "Mixes",
    description:
      "A balanced everyday mix of almonds, cashews, pistachios, walnuts, dates, and apricots. Freshness-packed for work, travel, and gifting.",
    specifications: { Contents: "6 premium varieties", Processing: "Small-batch packed" },
    rating: 4.9,
    reviewsCount: 186,
    sku: "FIT-MIX-ROYAL",
    stockQuantity: 100,
    lowStockThreshold: 10,
    isActive: true,
    weightOptions: [
      { weight: "250 g", price: 349, originalPrice: 399 },
      { weight: "500 g", price: 649, originalPrice: 749 },
      { weight: "1 kg", price: 1199, originalPrice: 1399 },
    ],
  },
  {
    id: "local-almond-cashew-duo",
    name: "Almond Cashew Duo",
    tagline: "Crunchy everyday combo",
    price: 399,
    originalPrice: 475,
    image: imgAlmondCashew,
    badge: "Value Pack",
    category: "Mixes",
    description:
      "A family-friendly combination of buttery jumbo cashews and crunchy premium almonds, packed fresh without artificial preservatives.",
    specifications: { Contents: "Almonds & cashews", BestFor: "Daily snacking" },
    rating: 4.8,
    reviewsCount: 124,
    sku: "FIT-MIX-DUO",
    stockQuantity: 100,
    lowStockThreshold: 10,
    isActive: true,
    weightOptions: [
      { weight: "250 g", price: 399, originalPrice: 475 },
      { weight: "500 g", price: 749, originalPrice: 899 },
      { weight: "1 kg", price: 1399, originalPrice: 1699 },
    ],
  },
];

const imageMap: Record<string, string> = {
  "/assets/product-cashews.webp": imgCashews,
  "/assets/product-almonds.webp": imgAlmonds,
  "/assets/product-pistachios.webp": imgPistachios,
  "/assets/product-dates.webp": imgDates,
  "/assets/product-walnuts.webp": imgWalnuts,
  "/assets/product-apricots.webp": imgApricots,
  "/assets/catalog-royal-mix.webp": imgRoyalMix,
  "/assets/catalog-almond-cashew.webp": imgAlmondCashew,
};

export function resolveProductImage(image: string | null | undefined) {
  if (!image) return "/logo1.webp";
  return imageMap[image] || image;
}

const starterDatabaseImages: Record<string, string> = {
  "1": "/assets/product-cashews.webp",
  "2": "/assets/product-almonds.webp",
  "3": "/assets/product-pistachios.webp",
  "4": "/assets/product-dates.webp",
  "5": "/assets/product-walnuts.webp",
  "6": "/assets/product-apricots.webp",
  "local-royal-mix": "/assets/catalog-royal-mix.webp",
  "local-almond-cashew-duo": "/assets/catalog-almond-cashew.webp",
};

import { supabase } from "@/lib/supabase";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    retry: 1,
    staleTime: 60_000,
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.warn("Using the built-in product catalog because Supabase is unavailable.", error);
        return STARTER_PRODUCTS.map((product) => ({ ...product, isFallback: true }));
      }

      if (!data?.length) {
        return STARTER_PRODUCTS.map((product) => ({ ...product, isFallback: true }));
      }

      return data.map((p) => {
        const product = productFromRow(p as ProductRow);
        return { ...product, image: resolveProductImage(product.image) };
      });
    },
  });
};

export const useImportStarterCatalog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const rows = STARTER_PRODUCTS.map(({ id, ...product }) =>
        productToRow({ ...product, image: starterDatabaseImages[id] || product.image }),
      );
      const { data, error } = await supabase.from("products").insert(rows).select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newProduct: Omit<Product, "id">) => {
      const { data, error } = await supabase
        .from("products")
        .insert([productToRow(newProduct)])
        .select()
        .single();

      if (error) throw error;
      return data;
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
      const { id, ...updates } = updatedProduct;
      const { data, error } = await supabase
        .from("products")
        .update(productToRow(updates))
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
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
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    retry: 1,
    staleTime: 60_000,
    queryFn: async (): Promise<string[]> => {
      const { data, error } = await supabase
        .from("categories")
        .select("name")
        .order("created_at", { ascending: true });

      if (error) {
        console.warn("Using built-in categories because Supabase is unavailable.", error);
        return ["Nuts", "Dry Fruits", "Mixes"];
      }
      return data.length ? data.map((c) => c.name) : ["Nuts", "Dry Fruits", "Mixes"];
    },
  });
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCategory: string) => {
      const trimmed = newCategory.trim();
      if (!trimmed) throw new Error("Category name cannot be empty");

      const { data, error } = await supabase
        .from("categories")
        .insert([{ name: trimmed }])
        .select()
        .single();

      if (error) {
        if (error.code === "23505") throw new Error("Category already exists");
        throw error;
      }
      return data.name;
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
      const { error } = await supabase.from("categories").delete().eq("name", categoryToDelete);

      if (error) throw error;
      return categoryToDelete;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
