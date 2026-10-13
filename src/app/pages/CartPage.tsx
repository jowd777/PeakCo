import { Link, useNavigate } from "react-router";
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";

export function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const shipping = totalPrice >= 75 ? 0 : 8.99;
  const total = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <div className="bg-[#080808] min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag size={64} className="text-[#222] mx-auto mb-6" />
          <h1
            className="font-bebas text-white mb-3"
            style={{ fontSize: "clamp(48px, 10vw, 80px)", letterSpacing: "0.05em" }}
          >
            YOUR BAG IS EMPTY
          </h1>
          <p className="text-[#555] mb-8" style={{ fontSize: "14px" }}>
            Looks like you haven't added anything yet.
          </p>
          <Link
            to="/shop"
            className="bg-[#e31f3d] text-white px-8 py-4 font-barlow tracking-widest hover:bg-red-600 transition-colors inline-flex items-center gap-2"
            style={{ fontSize: "14px", fontWeight: 700 }}
          >
            SHOP NOW <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#080808] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1
              className="font-bebas text-white"
              style={{ fontSize: "clamp(36px, 7vw, 64px)", letterSpacing: "0.03em" }}
            >
              YOUR BAG
            </h1>
            <p className="text-[#555]" style={{ fontSize: "13px" }}>
              {totalItems} item{totalItems !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#555] hover:text-white transition-colors font-barlow tracking-widest"
            style={{ fontSize: "12px", fontWeight: 600 }}
          >
            <ArrowLeft size={14} /> CONTINUE SHOPPING
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-px">
            {items.map((item, i) => (
              <div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                className="bg-[#111] p-4 sm:p-6 flex gap-4 sm:gap-6"
              >
                {/* Image */}
                <Link to={`/shop/${item.product.id}`} className="shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 overflow-hidden bg-[#1a1a1a]">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[#555]" style={{ fontSize: "11px", letterSpacing: "0.08em" }}>
                        {item.product.category === "snapback"
                          ? "SNAPBACK"
                          : item.product.category === "camper"
                          ? "CAMPER CAP"
                          : "DAD HAT"}
                      </p>
                      <Link
                        to={`/shop/${item.product.id}`}
                        className="font-barlow text-white hover:text-[#e31f3d] transition-colors block"
                        style={{ fontSize: "15px", fontWeight: 600 }}
                      >
                        {item.product.name}
                      </Link>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[#666]" style={{ fontSize: "12px" }}>
                          {item.selectedColor}
                        </span>
                        <span className="text-[#333]">·</span>
                        <span className="text-[#666]" style={{ fontSize: "12px" }}>
                          {item.selectedSize}
                        </span>
                      </div>
                    </div>
                    <p
                      className="text-white shrink-0"
                      style={{ fontSize: "15px", fontWeight: 600 }}
                    >
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity */}
                    <div className="flex items-center border border-[#222]">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedColor,
                            item.selectedSize,
                            item.quantity - 1
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center text-[#666] hover:text-white hover:bg-[#1a1a1a] transition-colors"
                        style={{ fontSize: "16px" }}
                      >
                        −
                      </button>
                      <span
                        className="w-8 text-center text-white"
                        style={{ fontSize: "13px" }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedColor,
                            item.selectedSize,
                            item.quantity + 1
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center text-[#666] hover:text-white hover:bg-[#1a1a1a] transition-colors"
                        style={{ fontSize: "16px" }}
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() =>
                        removeFromCart(
                          item.product.id,
                          item.selectedColor,
                          item.selectedSize
                        )
                      }
                      className="text-[#444] hover:text-[#e31f3d] transition-colors flex items-center gap-1"
                      style={{ fontSize: "12px" }}
                    >
                      <Trash2 size={13} /> REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#111] border border-[#1e1e1e] p-6 sticky top-24">
              <h2
                className="font-bebas text-white mb-6"
                style={{ fontSize: "24px", letterSpacing: "0.05em" }}
              >
                ORDER SUMMARY
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-[#888]" style={{ fontSize: "13px" }}>
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#888]" style={{ fontSize: "13px" }}>
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-500">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[#555]" style={{ fontSize: "11px" }}>
                    Add ${(75 - totalPrice).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>

              <div className="border-t border-[#1e1e1e] pt-4 mb-6">
                <div className="flex justify-between">
                  <span
                    className="font-barlow text-white tracking-widest"
                    style={{ fontSize: "14px", fontWeight: 700 }}
                  >
                    TOTAL
                  </span>
                  <span
                    className="text-white"
                    style={{ fontSize: "18px", fontWeight: 700 }}
                  >
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Promo code */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="PROMO CODE"
                  className="flex-1 bg-[#0d0d0d] border border-[#222] px-3 py-2 text-[#888] placeholder-[#444] outline-none focus:border-[#555]"
                  style={{ fontSize: "12px" }}
                />
                <button
                  className="bg-[#222] text-[#888] px-4 py-2 hover:bg-[#333] hover:text-white transition-colors font-barlow tracking-widest"
                  style={{ fontSize: "12px", fontWeight: 600 }}
                >
                  APPLY
                </button>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-[#e31f3d] text-white py-4 font-barlow tracking-widest hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                style={{ fontSize: "14px", fontWeight: 700 }}
              >
                CHECKOUT <ArrowRight size={16} />
              </Link>

              <p className="text-center text-[#444] mt-4" style={{ fontSize: "11px" }}>
                Secure checkout • SSL encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
