import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { products as initialProducts, type Product } from "../data/products";

interface ProductContextValue {
  products: Product[];
  featuredProducts: Product[];
  limitedDropProducts: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

const STORAGE_KEY = "peak-co-products";
const FEATURED_IDS = ["block-king-snapback", "summit-camper", "throwback-dad-hat"];
const ProductContext = createContext<ProductContextValue | null>(null);

function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) return false;
  const product = value as Record<string, unknown>;
  return typeof product.id === "string"
    && typeof product.name === "string"
    && typeof product.price === "number"
    && typeof product.category === "string"
    && typeof product.image === "string"
    && typeof product.description === "string"
    && typeof product.longDescription === "string"
    && typeof product.stock === "number"
    && Array.isArray(product.colors)
    && Array.isArray(product.sizes)
    && typeof product.durability === "object"
    && product.durability !== null;
}

function loadProducts(): Product[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return initialProducts;

  const parsed: unknown = JSON.parse(stored);
  if (!Array.isArray(parsed) || !parsed.every(isProduct)) {
    throw new Error("Saved products are invalid. Clear the peak-co-products localStorage entry to reset the catalog.");
  }

  return parsed;
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(loadProducts);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const value = useMemo<ProductContextValue>(() => ({
    products,
    featuredProducts: products.filter((product) => FEATURED_IDS.includes(product.id)),
    limitedDropProducts: products.filter((product) => product.badge === "LIMITED DROP"),
    addProduct: (product) => setProducts((current) => [product, ...current]),
    updateProduct: (product) =>
      setProducts((current) => current.map((item) => item.id === product.id ? product : item)),
    deleteProduct: (id) => setProducts((current) => current.filter((product) => product.id !== id)),
  }), [products]);

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within ProductProvider");
  return context;
}
