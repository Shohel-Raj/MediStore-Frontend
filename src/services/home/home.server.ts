"use server";

/**
 * ==============================
 * Type Definitions
 * ==============================
 */

export type Product = {
  id: string;
  name: string;
  description?: string;
  manufacturer?: string;
  dosageForm?: string;
  strength?: string;
  price: number;
  discountPrice?: number | null;
  stock: number;
  image?: string | null;
};

export type HomeData = {
  latest: Product[];
  discounted: Product[];
  topSelling: Product[];
  categories: string[];
};

/**
 * ==============================
 * Config
 * ==============================
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL as string;

// Revalidate every 5 minutes (good for landing page)
const fetchOptions: RequestInit & { next?: { revalidate: number } } = {
  next: { revalidate: 180 },
};

/**
 * ==============================
 * Generic Fetch Helper
 * ==============================
 */

async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/home${endpoint}`, fetchOptions);

    if (!res.ok) {
      console.error(`API Error: ${endpoint}`, res.status);
      return [] as unknown as T;
    }

    const json = await res.json();

    // unwrap .data if present
    if ("data" in json) {
      return json.data as T;
    }

    return json as T;
  } catch (error) {
    console.error(`Fetch failed: ${endpoint}`, error);
    return [] as unknown as T;
  }
}

/**
 * ==============================
 * Section Fetchers
 * ==============================
 */

async function getLatestProducts() {
  return fetchFromAPI<Product[]>("/latest-products");
}

async function getDiscountedProducts() {
  return fetchFromAPI<Product[]>("/discounted-products");
}

async function getTopSellingProducts() {
  return fetchFromAPI<Product[]>("/top-selling-products");
}

async function getCategories() {
  return fetchFromAPI<string[]>("/categories");
}

/**
 * ==============================
 * Main Home Data Function
 * ==============================
 */

export async function getHomeData(): Promise<HomeData> {
  const [latest, discounted, topSelling, categories] = await Promise.all([
    getLatestProducts(),
    getDiscountedProducts(),
    getTopSellingProducts(),
    getCategories(),
  ]);

  return {
    latest,
    discounted,
    topSelling,
    categories,
  };
}