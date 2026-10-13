import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { ShoppingBag, Search, User, Menu, X, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";

export function Navbar() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#080808] border-b border-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span
                className="font-bebas text-white tracking-widest"
                style={{ fontSize: "26px", letterSpacing: "0.15em" }}
              >
                PEAK
              </span>
              <span
                className="font-bebas text-[#e31f3d]"
                style={{ fontSize: "26px" }}
              >
                CO.
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {[
                { label: "HOME", path: "/" },
                { label: "SHOP", path: "/shop" },
                { label: "ABOUT", path: "/#about" },
                { label: "ADMIN", path: "/admin" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-barlow tracking-widest transition-colors ${
                    isActive(item.path)
                      ? "text-[#e31f3d]"
                      : "text-[#aaa] hover:text-white"
                  }`}
                  style={{ fontSize: "13px", fontWeight: 600 }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-[#aaa] hover:text-white transition-colors p-2"
              >
                <Search size={18} />
              </button>
              <Link
                to="/login"
                className="text-[#aaa] hover:text-white transition-colors p-2"
              >
                <User size={18} />
              </Link>
              <Link to="/cart" className="relative text-[#aaa] hover:text-white transition-colors p-2">
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#e31f3d] text-white rounded-full flex items-center justify-center"
                    style={{ width: "16px", height: "16px", fontSize: "10px", fontWeight: 700 }}>
                    {totalItems}
                  </span>
                )}
              </Link>
              <button
                className="md:hidden text-[#aaa] hover:text-white transition-colors p-2"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="border-t border-[#1e1e1e] py-3">
              <form onSubmit={handleSearch} className="flex items-center gap-3">
                <Search size={16} className="text-[#555]" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search caps, styles, collections..."
                  className="flex-1 bg-transparent text-white placeholder-[#555] outline-none"
                  style={{ fontSize: "14px" }}
                />
                <button type="submit" className="text-[#e31f3d] hover:text-red-400 transition-colors">
                  <ChevronRight size={18} />
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#080808] flex flex-col pt-16">
          <nav className="flex flex-col p-6 gap-1">
            {[
              { label: "HOME", path: "/" },
              { label: "SHOP", path: "/shop" },
              { label: "CART", path: "/cart" },
              { label: "LOGIN", path: "/login" },
              { label: "ADMIN", path: "/admin" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="font-bebas text-white border-b border-[#1e1e1e] py-4 flex items-center justify-between hover:text-[#e31f3d] transition-colors"
                style={{ fontSize: "32px", letterSpacing: "0.05em" }}
              >
                {item.label}
                <ChevronRight size={20} className="text-[#555]" />
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
