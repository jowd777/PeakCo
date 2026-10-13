import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { SlidersHorizontal, X } from "lucide-react";
import { type Category } from "../data/products";
import { useProducts } from "../context/ProductContext";
import { ProductCard } from "../components/ProductCard";

type SortOption = "featured" | "price-asc" | "price-desc" | "name";

const CATEGORY_LABELS: Record<string, string> = {
  all: "ALL",
  snapback: "SNAPBACKS",
  camper: "CAMPER CAPS",
  "dad-hat": "DAD HATS",
};

export function ShopPage() {
  const { products } = useProducts();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const filterParam = searchParams.get("filter") || "";

  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);

  const filtered = useMemo(() => {
    let list = [...products];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.includes(q)
      );
    }

    // Filter limited
    if (filterParam === "limited") {
      list = list.filter((p) => p.badge === "LIMITED DROP");
    }

    // Category
    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Price
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [products, searchQuery, filterParam, activeCategory, sortBy, priceRange]);

  return (
    <div className="bg-[#080808] min-h-screen">
      {/* Header */}
      <div className="bg-[#0d0d0d] border-b border-[#1e1e1e] py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <p
            className="font-barlow text-[#e31f3d] tracking-widest mb-2"
            style={{ fontSize: "12px", fontWeight: 700 }}
          >
            PEAK CO. STORE
          </p>
          <h1
            className="font-bebas text-white"
            style={{ fontSize: "clamp(40px, 7vw, 80px)", letterSpacing: "0.03em" }}
          >
            {searchQuery
              ? `RESULTS: "${searchQuery.toUpperCase()}"`
              : filterParam === "limited"
              ? "LIMITED DROPS"
              : "SHOP ALL CAPS"}
          </h1>
          <p className="text-[#555] mt-1" style={{ fontSize: "13px" }}>
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Category tabs */}
          <div className="flex items-center gap-1 flex-wrap">
            {(["all", "snapback", "camper", "dad-hat"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-barlow tracking-widest px-4 py-2 transition-colors ${
                  activeCategory === cat
                    ? "bg-[#e31f3d] text-white"
                    : "bg-[#111] text-[#666] hover:text-white border border-[#222]"
                }`}
                style={{ fontSize: "12px", fontWeight: 700 }}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-[#111] border border-[#222] text-[#888] px-4 py-2 outline-none hover:border-[#444] transition-colors cursor-pointer"
              style={{ fontSize: "12px" }}
            >
              <option value="featured">FEATURED</option>
              <option value="price-asc">PRICE: LOW TO HIGH</option>
              <option value="price-desc">PRICE: HIGH TO LOW</option>
              <option value="name">NAME A–Z</option>
            </select>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 border px-4 py-2 font-barlow tracking-widest transition-colors ${
                showFilters
                  ? "border-[#e31f3d] text-[#e31f3d]"
                  : "border-[#222] text-[#666] hover:border-white hover:text-white"
              }`}
              style={{ fontSize: "12px", fontWeight: 700 }}
            >
              <SlidersHorizontal size={13} />
              FILTER
            </button>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="bg-[#111] border border-[#1e1e1e] p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3
                className="font-barlow text-white tracking-widest"
                style={{ fontSize: "14px", fontWeight: 700 }}
              >
                FILTERS
              </h3>
              <button
                onClick={() => {
                  setPriceRange([0, 100]);
                  setActiveCategory("all");
                }}
                className="text-[#555] hover:text-white text-xs flex items-center gap-1 transition-colors"
              >
                <X size={12} /> CLEAR ALL
              </button>
            </div>
            <div>
              <p
                className="font-barlow text-[#666] tracking-widest mb-3"
                style={{ fontSize: "11px", fontWeight: 600 }}
              >
                PRICE RANGE: ${priceRange[0]} – ${priceRange[1] === 100 ? "100+" : priceRange[1]}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-[#555]" style={{ fontSize: "12px" }}>$0</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  className="flex-1 accent-[#e31f3d]"
                />
                <span className="text-[#555]" style={{ fontSize: "12px" }}>$100+</span>
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p
              className="font-bebas text-[#333]"
              style={{ fontSize: "clamp(40px, 8vw, 80px)", letterSpacing: "0.05em" }}
            >
              NO RESULTS FOUND
            </p>
            <p className="text-[#555] mt-2" style={{ fontSize: "14px" }}>
              Try a different search or filter
            </p>
            <button
              onClick={() => setActiveCategory("all")}
              className="mt-6 border border-[#333] text-[#666] px-6 py-2 hover:border-white hover:text-white transition-colors font-barlow tracking-widest"
              style={{ fontSize: "12px", fontWeight: 600 }}
            >
              CLEAR FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
