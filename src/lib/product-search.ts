import type { Product } from "@/hooks/useProducts";

function normalize(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, " ");
}

function isSubsequence(query: string, value: string) {
  let queryIndex = 0;
  for (const character of value) {
    if (character === query[queryIndex]) queryIndex += 1;
    if (queryIndex === query.length) return true;
  }
  return false;
}

export function searchProducts(products: Product[], rawQuery: string) {
  const query = normalize(rawQuery);
  if (!query) return products;

  return products
    .map((product) => {
      const name = normalize(product.name);
      const category = normalize(product.category);
      const tagline = normalize(product.tagline);
      const description = normalize(product.description);
      const words = name.split(" ");
      let score = 0;

      if (name === query) score = 100;
      else if (name.startsWith(query)) score = 90;
      else if (words.some((word) => word.startsWith(query))) score = 80;
      else if (name.includes(query)) score = 70;
      else if (category.startsWith(query)) score = 60;
      else if (tagline.includes(query)) score = 50;
      else if (description.includes(query)) score = 40;
      else if (query.length >= 2 && isSubsequence(query, name)) score = 20;

      return { product, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name))
    .map((result) => result.product);
}
