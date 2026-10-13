import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

type Mode = "login" | "register";

export function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "register" && form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Demo: just navigate to home
    navigate("/");
  };

  return (
    <div className="bg-[#080808] min-h-screen flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden items-center justify-center">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #080808 0%, #1a0408 50%, #080808 100%)",
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(#e31f3d 1px, transparent 1px), linear-gradient(90deg, #e31f3d 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 text-center px-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <span
              className="font-bebas text-white tracking-widest"
              style={{ fontSize: "48px", letterSpacing: "0.15em" }}
            >
              PEAK
            </span>
            <span className="font-bebas text-[#e31f3d]" style={{ fontSize: "48px" }}>
              CO.
            </span>
          </div>
          <h2
            className="font-bebas text-white mb-4"
            style={{ fontSize: "clamp(48px, 7vw, 80px)", lineHeight: 0.9, letterSpacing: "0.03em" }}
          >
            REACH YOUR
            <br />
            <span className="text-[#e31f3d]">PEAK.</span>
          </h2>
          <p className="text-[#555] max-w-xs" style={{ fontSize: "14px", lineHeight: "1.7" }}>
            Join the Peak Co. collective. Early access to limited drops, exclusive
            member discounts, and culture-first content.
          </p>

          {/* Benefits */}
          <div className="mt-12 text-left space-y-4 max-w-xs">
            {[
              "Early access to limited drops",
              "10% off your first order",
              "Member-only collaborations",
              "Free shipping on $75+",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[#e31f3d] rounded-full shrink-0" />
                <p className="text-[#666]" style={{ fontSize: "13px" }}>
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-16">
        <div className="w-full max-w-md">
          {/* Logo - mobile only */}
          <div className="flex items-center gap-1 mb-10 lg:hidden">
            <span className="font-bebas text-white tracking-widest" style={{ fontSize: "28px", letterSpacing: "0.15em" }}>
              PEAK
            </span>
            <span className="font-bebas text-[#e31f3d]" style={{ fontSize: "28px" }}>
              CO.
            </span>
          </div>

          {/* Toggle */}
          <div className="flex bg-[#111] border border-[#1e1e1e] p-1 mb-8">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(""); }}
                className={`flex-1 py-2.5 font-barlow tracking-widest transition-colors ${
                  mode === m ? "bg-[#e31f3d] text-white" : "text-[#555] hover:text-white"
                }`}
                style={{ fontSize: "12px", fontWeight: 700 }}
              >
                {m === "login" ? "LOG IN" : "REGISTER"}
              </button>
            ))}
          </div>

          <h1
            className="font-bebas text-white mb-2"
            style={{ fontSize: "36px", letterSpacing: "0.05em" }}
          >
            {mode === "login" ? "WELCOME BACK" : "CREATE ACCOUNT"}
          </h1>
          <p className="text-[#555] mb-8" style={{ fontSize: "13px" }}>
            {mode === "login"
              ? "Sign in to your Peak Co. account."
              : "Join the collective. Start your journey."}
          </p>
          <p className="text-[#e31f3d] mb-6" style={{ fontSize: "12px" }} role="note">
            Static demo only: accounts and passwords are not saved or verified.
          </p>

          {error && (
            <div className="bg-[#e31f3d]/10 border border-[#e31f3d]/30 px-4 py-3 mb-5">
              <p className="text-[#e31f3d]" style={{ fontSize: "13px" }}>
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#555] mb-1" style={{ fontSize: "11px" }}>
                    FIRST NAME *
                  </label>
                  <input
                    required
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full bg-[#111] border border-[#222] px-4 py-3 text-white placeholder-[#333] outline-none focus:border-[#e31f3d] transition-colors"
                    style={{ fontSize: "14px" }}
                  />
                </div>
                <div>
                  <label className="block text-[#555] mb-1" style={{ fontSize: "11px" }}>
                    LAST NAME *
                  </label>
                  <input
                    required
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full bg-[#111] border border-[#222] px-4 py-3 text-white placeholder-[#333] outline-none focus:border-[#e31f3d] transition-colors"
                    style={{ fontSize: "14px" }}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[#555] mb-1" style={{ fontSize: "11px" }}>
                EMAIL ADDRESS *
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full bg-[#111] border border-[#222] px-4 py-3 text-white placeholder-[#333] outline-none focus:border-[#e31f3d] transition-colors"
                style={{ fontSize: "14px" }}
              />
            </div>

            <div>
              <label className="block text-[#555] mb-1" style={{ fontSize: "11px" }}>
                PASSWORD *
              </label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-[#111] border border-[#222] px-4 py-3 text-white placeholder-[#333] outline-none focus:border-[#e31f3d] transition-colors pr-12"
                  style={{ fontSize: "14px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#444] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {mode === "register" && (
              <div>
                <label className="block text-[#555] mb-1" style={{ fontSize: "11px" }}>
                  CONFIRM PASSWORD *
                </label>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-[#111] border border-[#222] px-4 py-3 text-white placeholder-[#333] outline-none focus:border-[#e31f3d] transition-colors"
                  style={{ fontSize: "14px" }}
                />
              </div>
            )}

            {mode === "login" && (
              <div className="flex justify-end">
                <a href="#" className="text-[#555] hover:text-[#e31f3d] transition-colors" style={{ fontSize: "12px" }}>
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#e31f3d] text-white py-4 font-barlow tracking-widest hover:bg-red-600 transition-colors flex items-center justify-center gap-2 mt-2"
              style={{ fontSize: "14px", fontWeight: 700 }}
            >
              {mode === "login" ? "LOG IN" : "CREATE ACCOUNT"} <ArrowRight size={16} />
            </button>
          </form>

          <p className="text-center text-[#444] mt-8" style={{ fontSize: "12px" }}>
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
              className="text-[#e31f3d] hover:text-red-400 transition-colors"
            >
              {mode === "login" ? "Register" : "Log in"}
            </button>
          </p>

          <div className="mt-8 pt-6 border-t border-[#1e1e1e] text-center">
            <Link
              to="/"
              className="text-[#444] hover:text-white transition-colors font-barlow tracking-widest"
              style={{ fontSize: "11px", fontWeight: 600 }}
            >
              ← BACK TO STORE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
