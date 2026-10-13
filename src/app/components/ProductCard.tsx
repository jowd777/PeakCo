import { Link } from "react-router";
import { ShoppingBag } from "lucide-react";
import type { Product } from "../data/products";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, product.colors[0], product.sizes[0]);
  };

  return (
    <Link to={`/shop/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-[#111] aspect-square mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-2 py-1 font-barlow tracking-widest ${
              product.badge === "LIMITED DROP"
                ? "bg-[#e31f3d] text-white"
                : "bg-white text-[#080808]"
            }`}
            style={{ fontSize: "10px", fontWeight: 700 }}
          >
            {product.badge}
          </span>
        )}
        {/* Quick add */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 bg-[#080808]/90 text-white py-3 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-[#e31f3d]"
          style={{ fontSize: "12px" }}
        >
          <ShoppingBag size={14} />
          <span className="font-barlow tracking-widest" style={{ fontWeight: 700 }}>
            QUICK ADD
          </span>
        </button>
        {/* Stock indicator */}
        {product.stock <= 10 && (
          <span
            className="absolute top-3 right-3 bg-[#080808]/80 text-[#e31f3d] px-2 py-1"
            style={{ fontSize: "10px", fontWeight: 600 }}
          >
            {product.stock} LEFT
          </span>
        )}
      </div>
      <div>
        <p className="text-[#666]" style={{ fontSize: "11px", letterSpacing: "0.1em" }}>
          {product.category === "snapback"
            ? "SNAPBACK"
            : product.category === "camper"
            ? "CAMPER CAP"
            : "DAD HAT"}
        </p>
        <h3
          className="font-barlow text-white mt-0.5"
          style={{ fontSize: "15px", fontWeight: 600 }}
        >
          {product.name}
        </h3>
        <p className="text-[#e31f3d] mt-0.5" style={{ fontSize: "15px", fontWeight: 600 }}>
          ${product.price.toFixed(2)}
        </p>
        <div className="flex items-center gap-1.5 mt-2">
          {product.colors.slice(0, 4).map((c) => (
            <div
              key={c}
              className="w-3 h-3 rounded-full border border-[#333]"
              title={c}
              style={{
                background:
                  c.toLowerCase().includes("black") || c.toLowerCase().includes("midnight")
                    ? "#222"
                    : c.toLowerCase().includes("white") || c.toLowerCase().includes("cream")
                    ? "#eee"
                    : c.toLowerCase().includes("red") || c.toLowerCase().includes("fire") || c.toLowerCase().includes("orange")
                    ? "#e31f3d"
                    : c.toLowerCase().includes("navy")
                    ? "#1a3a6b"
                    : c.toLowerCase().includes("olive") || c.toLowerCase().includes("forest")
                    ? "#5a6e3e"
                    : c.toLowerCase().includes("grey") || c.toLowerCase().includes("gray") || c.toLowerCase().includes("cement") || c.toLowerCase().includes("charcoal")
                    ? "#666"
                    : c.toLowerCase().includes("khaki") || c.toLowerCase().includes("sand") || c.toLowerCase().includes("stone") || c.toLowerCase().includes("beige")
                    ? "#c4a96d"
                    : c.toLowerCase().includes("blue") || c.toLowerCase().includes("denim")
                    ? "#3a6ea5"
                    : "#888",
              }}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-[#555]" style={{ fontSize: "11px" }}>
              +{product.colors.length - 4}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
