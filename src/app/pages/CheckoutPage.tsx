import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { readOrders, saveOrders } from "../data/orders";

type Step = "shipping" | "payment" | "confirmed";

interface ShippingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();

  const [step, setStep] = useState<Step>("shipping");
  const [orderId, setOrderId] = useState("");
  const [shipping, setShipping] = useState<ShippingForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const shippingCost = totalPrice >= 75 ? 0 : 8.99;
  const total = totalPrice + shippingCost;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const id = `ORD-${Date.now().toString(36).toUpperCase()}`;
      const orders = readOrders();
      saveOrders([
        {
          id,
          customer: `${shipping.firstName} ${shipping.lastName}`.trim(),
          email: shipping.email,
          items: items.reduce((count, item) => count + item.quantity, 0),
          total,
          status: "processing",
          date: new Date().toISOString().slice(0, 10),
        },
        ...orders,
      ]);
      setOrderId(id);
      clearCart();
      setStep("confirmed");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Could not save the demo order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const STEPS = ["SHIPPING", "PAYMENT", "CONFIRMED"];
  const stepIndex = step === "shipping" ? 0 : step === "payment" ? 1 : 2;

  if (step === "confirmed") {
    return (
      <div className="bg-[#080808] min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
          <h1
            className="font-bebas text-white mb-3"
            style={{ fontSize: "clamp(40px, 8vw, 72px)", letterSpacing: "0.05em" }}
          >
            DEMO ORDER SAVED
          </h1>
          <p className="text-[#888] mb-2" style={{ fontSize: "14px" }}>
            This storefront is a static demo. No payment was taken and no shipment will be created.
          </p>
          <p className="text-[#555] mb-8" style={{ fontSize: "13px" }}>
            Order #{orderId} • Demo confirmation for {shipping.email}
          </p>
          <div className="bg-[#111] border border-[#1e1e1e] p-5 mb-8 text-left">
            <p
              className="font-barlow text-[#666] tracking-widest mb-3"
              style={{ fontSize: "11px", fontWeight: 700 }}
            >
              SHIPPING TO
            </p>
            <p className="text-white" style={{ fontSize: "14px" }}>
              {shipping.firstName} {shipping.lastName}
            </p>
            <p className="text-[#888]" style={{ fontSize: "13px" }}>
              {shipping.address}, {shipping.city}, {shipping.state} {shipping.zip}
            </p>
          </div>
          <Link
            to="/shop"
            className="bg-[#e31f3d] text-white px-8 py-4 font-barlow tracking-widest hover:bg-red-600 transition-colors inline-block"
            style={{ fontSize: "14px", fontWeight: 700 }}
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0 && step !== "confirmed") {
    return (
      <div className="bg-[#080808] min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="font-bebas text-[#333]" style={{ fontSize: "60px", letterSpacing: "0.05em" }}>
            YOUR CART IS EMPTY
          </p>
          <Link
            to="/shop"
            className="text-[#e31f3d] font-barlow tracking-widest hover:text-red-400 mt-3 inline-block"
            style={{ fontSize: "13px", fontWeight: 600 }}
          >
            BACK TO SHOP
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#080808] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <span className="font-bebas text-white tracking-widest" style={{ fontSize: "22px" }}>
              PEAK
            </span>
            <span className="font-bebas text-[#e31f3d]" style={{ fontSize: "22px" }}>
              CO.
            </span>
          </div>
          <Link
            to="/cart"
            className="flex items-center gap-2 text-[#555] hover:text-white transition-colors font-barlow tracking-widest"
            style={{ fontSize: "12px", fontWeight: 600 }}
          >
            <ArrowLeft size={14} /> BACK TO CART
          </Link>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-12">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center gap-2 px-1 ${i <= stepIndex ? "text-white" : "text-[#444]"}`}>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    i < stepIndex
                      ? "bg-green-600"
                      : i === stepIndex
                      ? "bg-[#e31f3d]"
                      : "bg-[#222]"
                  }`}
                  style={{ fontSize: "11px", fontWeight: 700 }}
                >
                  {i < stepIndex ? "✓" : i + 1}
                </div>
                <span
                  className="font-barlow tracking-widest hidden sm:block"
                  style={{ fontSize: "11px", fontWeight: 700 }}
                >
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-px w-8 sm:w-16 mx-2 ${i < stepIndex ? "bg-green-600" : "bg-[#222]"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            {step === "shipping" && (
              <form onSubmit={handleShippingSubmit}>
                <h2
                  className="font-bebas text-white mb-6"
                  style={{ fontSize: "28px", letterSpacing: "0.05em" }}
                >
                  SHIPPING INFORMATION
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[#666] mb-1" style={{ fontSize: "11px" }}>
                      FIRST NAME *
                    </label>
                    <input
                      required
                      value={shipping.firstName}
                      onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })}
                      className="w-full bg-[#111] border border-[#222] px-4 py-3 text-white outline-none focus:border-[#e31f3d] transition-colors"
                      style={{ fontSize: "14px" }}
                    />
                  </div>
                  <div>
                    <label className="block text-[#666] mb-1" style={{ fontSize: "11px" }}>
                      LAST NAME *
                    </label>
                    <input
                      required
                      value={shipping.lastName}
                      onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })}
                      className="w-full bg-[#111] border border-[#222] px-4 py-3 text-white outline-none focus:border-[#e31f3d] transition-colors"
                      style={{ fontSize: "14px" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[#666] mb-1" style={{ fontSize: "11px" }}>
                      EMAIL ADDRESS *
                    </label>
                    <input
                      required
                      type="email"
                      value={shipping.email}
                      onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                      className="w-full bg-[#111] border border-[#222] px-4 py-3 text-white outline-none focus:border-[#e31f3d] transition-colors"
                      style={{ fontSize: "14px" }}
                    />
                  </div>
                  <div>
                    <label className="block text-[#666] mb-1" style={{ fontSize: "11px" }}>
                      PHONE
                    </label>
                    <input
                      type="tel"
                      value={shipping.phone}
                      onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                      className="w-full bg-[#111] border border-[#222] px-4 py-3 text-white outline-none focus:border-[#e31f3d] transition-colors"
                      style={{ fontSize: "14px" }}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-[#666] mb-1" style={{ fontSize: "11px" }}>
                    STREET ADDRESS *
                  </label>
                  <input
                    required
                    value={shipping.address}
                    onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                    className="w-full bg-[#111] border border-[#222] px-4 py-3 text-white outline-none focus:border-[#e31f3d] transition-colors"
                    style={{ fontSize: "14px" }}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[#666] mb-1" style={{ fontSize: "11px" }}>
                      CITY *
                    </label>
                    <input
                      required
                      value={shipping.city}
                      onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                      className="w-full bg-[#111] border border-[#222] px-4 py-3 text-white outline-none focus:border-[#e31f3d] transition-colors"
                      style={{ fontSize: "14px" }}
                    />
                  </div>
                  <div>
                    <label className="block text-[#666] mb-1" style={{ fontSize: "11px" }}>
                      STATE *
                    </label>
                    <input
                      required
                      value={shipping.state}
                      onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                      className="w-full bg-[#111] border border-[#222] px-4 py-3 text-white outline-none focus:border-[#e31f3d] transition-colors"
                      style={{ fontSize: "14px" }}
                    />
                  </div>
                  <div>
                    <label className="block text-[#666] mb-1" style={{ fontSize: "11px" }}>
                      ZIP CODE *
                    </label>
                    <input
                      required
                      value={shipping.zip}
                      onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                      className="w-full bg-[#111] border border-[#222] px-4 py-3 text-white outline-none focus:border-[#e31f3d] transition-colors"
                      style={{ fontSize: "14px" }}
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-[#666] mb-1" style={{ fontSize: "11px" }}>
                    COUNTRY *
                  </label>
                  <select
                    value={shipping.country}
                    onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                    className="w-full bg-[#111] border border-[#222] px-4 py-3 text-white outline-none focus:border-[#e31f3d] transition-colors"
                    style={{ fontSize: "14px" }}
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#e31f3d] text-white py-4 font-barlow tracking-widest hover:bg-red-600 transition-colors"
                  style={{ fontSize: "14px", fontWeight: 700 }}
                >
                  CONTINUE TO PAYMENT →
                </button>
              </form>
            )}

            {step === "payment" && (
              <form onSubmit={handlePaymentSubmit}>
                <h2
                  className="font-bebas text-white mb-6"
                  style={{ fontSize: "28px", letterSpacing: "0.05em" }}
                >
                  DEMO CHECKOUT
                </h2>
                <div className="bg-[#111] border border-[#e31f3d]/40 p-6 mb-6">
                  <p className="text-white mb-2" style={{ fontSize: "14px", fontWeight: 600 }}>
                    No payment provider is connected.
                  </p>
                  <p className="text-[#888]" style={{ fontSize: "13px", lineHeight: 1.6 }}>
                    Placing this demo order saves it only in this browser's local storage. Do not enter payment details;
                    this static site cannot process payments or fulfill orders.
                  </p>
                </div>
                {errorMessage && (
                  <div className="my-4 border border-red-500/40 bg-red-500/10 p-3 text-red-300" style={{ fontSize: "13px" }} role="alert">
                    {errorMessage}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#e31f3d] text-white py-4 font-barlow tracking-widest hover:bg-red-600 transition-colors disabled:opacity-60"
                  style={{ fontSize: "14px", fontWeight: 700 }}
                >
                  {isSubmitting ? "SAVING..." : "SAVE DEMO ORDER - $" + total.toFixed(2)}
                </button>
                <button
                  type="button"
                  onClick={() => setStep("shipping")}
                  className="w-full mt-3 text-[#555] hover:text-white font-barlow tracking-widest transition-colors"
                  style={{ fontSize: "12px", fontWeight: 600 }}
                >
                  ← BACK TO SHIPPING
                </button>
              </form>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-[#111] border border-[#1e1e1e] p-6 sticky top-24">
              <h2
                className="font-bebas text-white mb-5"
                style={{ fontSize: "22px", letterSpacing: "0.05em" }}
              >
                ORDER SUMMARY
              </h2>
              <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                    className="flex items-center gap-3"
                  >
                    <div className="relative w-12 h-12 shrink-0 bg-[#1a1a1a]">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#e31f3d] text-white rounded-full flex items-center justify-center" style={{ fontSize: "9px" }}>
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white truncate" style={{ fontSize: "13px" }}>{item.product.name}</p>
                      <p className="text-[#555]" style={{ fontSize: "11px" }}>
                        {item.selectedColor} / {item.selectedSize}
                      </p>
                    </div>
                    <p className="text-white" style={{ fontSize: "13px" }}>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#222] pt-4 space-y-2">
                <div className="flex justify-between text-[#666]" style={{ fontSize: "13px" }}>
                  <span>SUBTOTAL</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#666]" style={{ fontSize: "13px" }}>
                  <span>SHIPPING</span>
                  <span>{shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-white pt-2 border-t border-[#222]" style={{ fontSize: "16px", fontWeight: 600 }}>
                  <span>TOTAL</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <p className="text-[#555] mt-5" style={{ fontSize: "11px", lineHeight: 1.5 }}>
                Demo only — order data stays in this browser and is not sent to a server.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
