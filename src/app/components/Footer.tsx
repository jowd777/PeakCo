import { Link } from "react-router";
import { Instagram, Twitter, Youtube, Music } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#080808] border-t border-[#1e1e1e]">
      {/* Newsletter */}
      <div className="bg-[#e31f3d] py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-barlow text-white tracking-widest mb-1" style={{ fontSize: "13px", fontWeight: 600 }}>
            JOIN THE COLLECTIVE
          </p>
          <h2
            className="font-bebas text-white mb-6"
            style={{ fontSize: "clamp(36px, 6vw, 60px)", letterSpacing: "0.05em" }}
          >
            GET EARLY ACCESS TO DROPS
          </h2>
          {subscribed ? (
            <p className="text-white font-barlow" style={{ fontSize: "16px", fontWeight: 500 }}>
              You're in. Watch your inbox. 🔥
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 bg-white/10 border border-white/30 text-white placeholder-white/60 px-4 py-3 outline-none focus:border-white"
                style={{ fontSize: "14px" }}
              />
              <button
                type="submit"
                className="bg-[#080808] text-white px-8 py-3 font-barlow tracking-widest hover:bg-black transition-colors"
                style={{ fontSize: "13px", fontWeight: 700 }}
              >
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-1 mb-4">
              <span
                className="font-bebas text-white tracking-widest"
                style={{ fontSize: "28px", letterSpacing: "0.15em" }}
              >
                PEAK
              </span>
              <span className="font-bebas text-[#e31f3d]" style={{ fontSize: "28px" }}>
                CO.
              </span>
            </div>
            <p className="text-[#666]" style={{ fontSize: "13px", lineHeight: "1.7" }}>
              Premium headwear for the streets, the stage, and the culture.
              Born from hip-hop. Built to last.
            </p>
            <div className="flex items-center gap-4 mt-5">
              {[
                { icon: <Instagram size={16} />, href: "#" },
                { icon: <Twitter size={16} />, href: "#" },
                { icon: <Youtube size={16} />, href: "#" },
                { icon: <Music size={16} />, href: "#" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="text-[#555] hover:text-[#e31f3d] transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4
              className="font-barlow text-white tracking-widest mb-4"
              style={{ fontSize: "12px", fontWeight: 700 }}
            >
              SHOP
            </h4>
            <ul className="space-y-3">
              {["All Products", "Snapbacks", "Camper Caps", "Dad Hats", "Limited Drops"].map((l) => (
                <li key={l}>
                  <Link
                    to="/shop"
                    className="text-[#666] hover:text-white transition-colors"
                    style={{ fontSize: "13px" }}
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4
              className="font-barlow text-white tracking-widest mb-4"
              style={{ fontSize: "12px", fontWeight: 700 }}
            >
              INFO
            </h4>
            <ul className="space-y-3">
              {["About Peak Co.", "Size Guide", "Shipping & Returns", "Care Instructions", "Contact Us"].map(
                (l) => (
                  <li key={l}>
                    <a href="#" className="text-[#666] hover:text-white transition-colors" style={{ fontSize: "13px" }}>
                      {l}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4
              className="font-barlow text-white tracking-widest mb-4"
              style={{ fontSize: "12px", fontWeight: 700 }}
            >
              LEGAL
            </h4>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-[#666] hover:text-white transition-colors" style={{ fontSize: "13px" }}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[#1e1e1e] pt-8">
          <h4
            className="font-barlow text-white tracking-widest mb-4"
            style={{ fontSize: "12px", fontWeight: 700 }}
          >
            CUSTOMER SUPPORT
          </h4>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {[
              "English (US)",
              "Filipino",
              "Bisaya",
              "Español",
              "日本語",
              "한국어",
              "中文(简体)",
              "More languages...",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[#666] hover:text-white transition-colors"
                style={{ fontSize: "12px" }}
              >
                {item}
              </a>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {[
              "Sign Up",
              "Log In",
              "Messenger",
              "Facebook Lite",
              "Video",
              "Meta Pay",
              "Meta Store",
              "Meta Quest",
              "Ray-Ban Meta",
              "Meta AI",
              "Instagram",
              "Threads",
              "Privacy Policy",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[#555] hover:text-white transition-colors"
                style={{ fontSize: "11px" }}
              >
                {item}
              </a>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
            {[
              "Privacy Center",
              "About",
              "Create Ad",
              "Create Page",
              "Developers",
              "Careers",
              "Cookies",
              "Ad choices",
              "Terms",
              "Help",
              "Contact",
              "Uploading & Non-Users",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[#555] hover:text-white transition-colors"
                style={{ fontSize: "11px" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[#1e1e1e] px-4 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[#444]" style={{ fontSize: "12px" }}>
            © 2026 Peak Co. All rights reserved.
          </p>
          <p className="text-[#444]" style={{ fontSize: "12px" }}>
            Reach Your Peak.
          </p>
        </div>
      </div>
    </footer>
  );
}
