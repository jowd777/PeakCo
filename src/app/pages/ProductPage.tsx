import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { ShoppingBag, ArrowLeft, Shield, Zap, Package, ChevronDown, ChevronUp } from "lucide-react";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { ProductCard } from "../components/ProductCard";

export function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products } = useProducts();

  const product = products.find((p) => p.id === id);

  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("durability");

  if (!product) {
    return (
      <div className="bg-[#080808] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p
            className="font-bebas text-[#333]"
            style={{ fontSize: "80px", letterSpacing: "0.05em" }}
          >
            NOT FOUND
          </p>
          <Link
            to="/shop"
            className="text-[#e31f3d] font-barlow tracking-widest hover:text-red-400"
            style={{ fontSize: "13px", fontWeight: 600 }}
          >
            BACK TO SHOP
          </Link>
        </div>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    navigate("/checkout");
  };

  const getColorHex = (color: string) => {
    const c = color.toLowerCase();
    if (c.includes("black") || c.includes("midnight")) return "#222";
    if (c.includes("white") || c.includes("cream") || c.includes("vintage white")) return "#eee";
    if (c.includes("red") || c.includes("fire") || c.includes("orange")) return "#e31f3d";
    if (c.includes("navy")) return "#1a3a6b";
    if (c.includes("olive") || c.includes("forest")) return "#5a6e3e";
    if (c.includes("grey") || c.includes("gray") || c.includes("cement") || c.includes("charcoal") || c.includes("storm")) return "#666";
    if (c.includes("khaki") || c.includes("sand") || c.includes("stone") || c.includes("beige")) return "#c4a96d";
    if (c.includes("blue") || c.includes("denim")) return "#3a6ea5";
    if (c.includes("gold")) return "#c9a227";
    return "#888";
  };

  return (
    <div className="bg-[#080808] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        <div className="flex items-center gap-2" style={{ fontSize: "12px" }}>
          <Link to="/" className="text-[#555] hover:text-white transition-colors">HOME</Link>
          <span className="text-[#333]">/</span>
          <Link to="/shop" className="text-[#555] hover:text-white transition-colors">SHOP</Link>
          <span className="text-[#333]">/</span>
          <span className="text-[#888]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#555] hover:text-white transition-colors mb-8 font-barlow tracking-widest"
          style={{ fontSize: "12px", fontWeight: 600 }}
        >
          <ArrowLeft size={14} /> BACK
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <div>
            <div className="relative overflow-hidden bg-[#111] aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span
                  className={`absolute top-4 left-4 px-3 py-1 font-barlow tracking-widest ${
                    product.badge === "LIMITED DROP"
                      ? "bg-[#e31f3d] text-white"
                      : "bg-white text-[#080808]"
                  }`}
                  style={{ fontSize: "11px", fontWeight: 700 }}
                >
                  {product.badge}
                </span>
              )}
              {product.stock <= 10 && (
                <div className="absolute bottom-4 left-4 right-4 bg-[#080808]/80 border border-[#e31f3d]/30 px-4 py-2">
                  <p className="text-[#e31f3d]" style={{ fontSize: "12px", fontWeight: 600 }}>
                    ⚡ Only {product.stock} units remaining
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div>
            <p
              className="font-barlow text-[#555] tracking-widest mb-2"
              style={{ fontSize: "11px", fontWeight: 700 }}
            >
              {product.category === "snapback"
                ? "HIGH CROWN SNAPBACK"
                : product.category === "camper"
                ? "5-PANEL CAMPER CAP"
                : "VINTAGE DAD HAT"}
            </p>
            <h1
              className="font-bebas text-white mb-1"
              style={{ fontSize: "clamp(36px, 6vw, 60px)", letterSpacing: "0.03em", lineHeight: 1 }}
            >
              {product.name}
            </h1>
            <p
              className="text-[#e31f3d] mb-6"
              style={{ fontSize: "28px", fontWeight: 700 }}
            >
              ${product.price.toFixed(2)}
            </p>

            <p className="text-[#888] mb-8" style={{ fontSize: "14px", lineHeight: "1.8" }}>
              {product.longDescription}
            </p>

            {/* Color */}
            <div className="mb-6">
              <p
                className="font-barlow text-[#666] tracking-widest mb-3"
                style={{ fontSize: "11px", fontWeight: 700 }}
              >
                COLOR: <span className="text-white">{selectedColor}</span>
              </p>
              <div className="flex items-center gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    title={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? "border-white scale-110"
                        : "border-[#333] hover:border-[#555]"
                    }`}
                    style={{ background: getColorHex(color) }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-6">
              <p
                className="font-barlow text-[#666] tracking-widest mb-3"
                style={{ fontSize: "11px", fontWeight: 700 }}
              >
                SIZE: <span className="text-white">{selectedSize}</span>
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border font-barlow tracking-widest transition-colors ${
                      selectedSize === size
                        ? "border-white bg-white text-[#080808]"
                        : "border-[#333] text-[#666] hover:border-[#555] hover:text-white"
                    }`}
                    style={{ fontSize: "12px", fontWeight: 600 }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p
                className="font-barlow text-[#666] tracking-widest mb-3"
                style={{ fontSize: "11px", fontWeight: 700 }}
              >
                QUANTITY
              </p>
              <div className="flex items-center border border-[#222] w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#666] hover:text-white hover:bg-[#1a1a1a] transition-colors"
                  style={{ fontSize: "18px" }}
                >
                  −
                </button>
                <span
                  className="w-12 text-center text-white"
                  style={{ fontSize: "15px" }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#666] hover:text-white hover:bg-[#1a1a1a] transition-colors"
                  style={{ fontSize: "18px" }}
                >
                  +
                </button>
              </div>
              <p className="text-[#555] mt-1" style={{ fontSize: "12px" }}>
                {product.stock} in stock
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 font-barlow tracking-widest flex items-center justify-center gap-2 transition-all ${
                  added
                    ? "bg-green-600 text-white"
                    : "bg-[#e31f3d] text-white hover:bg-red-600"
                }`}
                style={{ fontSize: "14px", fontWeight: 700 }}
              >
                <ShoppingBag size={16} />
                {added ? "ADDED TO CART ✓" : "ADD TO CART"}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-4 border border-white text-white font-barlow tracking-widest hover:bg-white hover:text-[#080808] transition-all"
                style={{ fontSize: "14px", fontWeight: 700 }}
              >
                BUY NOW
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mb-8 border-t border-[#1e1e1e] pt-6">
              {[
                { icon: <Shield size={16} />, label: "AUTHENTIC", sub: "100% Genuine" },
                { icon: <Package size={16} />, label: "FREE SHIP", sub: "Orders over $75" },
                { icon: <Zap size={16} />, label: "FAST DROP", sub: "2-4 business days" },
              ].map((b) => (
                <div key={b.label} className="text-center">
                  <div className="text-[#e31f3d] flex justify-center mb-1">{b.icon}</div>
                  <p
                    className="font-barlow text-white tracking-widest"
                    style={{ fontSize: "10px", fontWeight: 700 }}
                  >
                    {b.label}
                  </p>
                  <p className="text-[#555]" style={{ fontSize: "10px" }}>
                    {b.sub}
                  </p>
                </div>
              ))}
            </div>

            {/* Accordion: Durability */}
            {[
              {
                key: "durability",
                label: "DURABILITY & CONSTRUCTION",
                content: (
                  <div className="space-y-3">
                    {[
                      { label: "Crown", value: product.durability.crown },
                      { label: "Brim", value: product.durability.brim },
                      { label: "Material", value: product.durability.material },
                    ].map((item) => (
                      <div key={item.label} className="flex gap-3">
                        <span
                          className="font-barlow text-[#e31f3d] shrink-0 tracking-widest"
                          style={{ fontSize: "11px", fontWeight: 700, minWidth: "60px" }}
                        >
                          {item.label.toUpperCase()}
                        </span>
                        <span className="text-[#888]" style={{ fontSize: "13px", lineHeight: "1.6" }}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                key: "details",
                label: "PRODUCT DETAILS",
                content: (
                  <ul className="space-y-2">
                    {[
                      "Reinforced 6-panel construction",
                      "One-size snapback closure (adjustable)",
                      "Embroidered Peak Co. branding",
                      "Moisture-wicking inner sweatband",
                      "Shape-memory brim technology",
                    ].map((d) => (
                      <li key={d} className="flex items-start gap-2 text-[#888]" style={{ fontSize: "13px" }}>
                        <span className="text-[#e31f3d] mt-0.5">—</span> {d}
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                key: "shipping",
                label: "SHIPPING & RETURNS",
                content: (
                  <div className="text-[#888] space-y-2" style={{ fontSize: "13px", lineHeight: "1.7" }}>
                    <p>Free standard shipping on orders over $75. Standard shipping takes 3–5 business days.</p>
                    <p>Limited drop items are final sale. All other items eligible for 30-day returns in original condition.</p>
                  </div>
                ),
              },
            ].map((section) => (
              <div key={section.key} className="border-t border-[#1e1e1e]">
                <button
                  onClick={() =>
                    setExpandedSection(expandedSection === section.key ? null : section.key)
                  }
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <span
                    className="font-barlow text-white tracking-widest"
                    style={{ fontSize: "12px", fontWeight: 700 }}
                  >
                    {section.label}
                  </span>
                  {expandedSection === section.key ? (
                    <ChevronUp size={14} className="text-[#555]" />
                  ) : (
                    <ChevronDown size={14} className="text-[#555]" />
                  )}
                </button>
                {expandedSection === section.key && (
                  <div className="pb-5">{section.content}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="border-t border-[#1e1e1e] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2
              className="font-bebas text-white mb-10"
              style={{ fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "0.05em" }}
            >
              YOU MIGHT ALSO LIKE
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
