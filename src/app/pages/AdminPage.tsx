import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  TrendingUp,
  Plus,
  Edit2,
  Trash2,
  X,
  ArrowLeft,
} from "lucide-react";
import { type Product } from "../data/products";
import { useProducts } from "../context/ProductContext";
import { MOCK_ORDERS, readOrders, saveOrders, type Order, type OrderStatus } from "../data/orders";

type AdminSection = "dashboard" | "products" | "orders";

const STATUS_COLORS: Record<OrderStatus, string> = {
  processing: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  shipped: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  delivered: "text-green-400 bg-green-400/10 border-green-400/20",
  cancelled: "text-red-400 bg-red-400/10 border-red-400/20",
};

const MONTHLY_SALES = [
  { month: "Oct", revenue: 4200 },
  { month: "Nov", revenue: 5800 },
  { month: "Dec", revenue: 8900 },
  { month: "Jan", revenue: 6700 },
  { month: "Feb", revenue: 7400 },
  { month: "Mar", revenue: 9200 },
];

export function AdminPage() {
  const { products: productList, addProduct, updateProduct, deleteProduct } = useProducts();
  const [section, setSection] = useState<AdminSection>("dashboard");
  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = readOrders();
    return savedOrders.length ? savedOrders : MOCK_ORDERS;
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductCategory, setNewProductCategory] = useState<Product["category"]>("snapback");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productError, setProductError] = useState("");

  useEffect(() => {
    saveOrders(orders);
  }, [orders]);

  const totalRevenue = orders.filter(o => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  const totalOrders = orders.length;
  const activeOrders = orders.filter(o => o.status === "processing" || o.status === "shipped").length;

  const maxRevenue = Math.max(...MONTHLY_SALES.map(s => s.revenue));

  const handleDeleteProduct = (id: string) => {
    if (confirm("Delete this product?")) {
      deleteProduct(id);
    }
  };

  const handleAddProduct = () => {
    const price = Number(newProductPrice);
    if (!newProductName.trim() || !Number.isFinite(price) || price <= 0) {
      setProductError("Enter a product name and a price greater than zero.");
      return;
    }
    const id = newProductName.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
    const newProduct: Product = {
      id,
      name: newProductName.trim().toUpperCase(),
      price,
      category: newProductCategory,
      image: "https://images.unsplash.com/photo-1662103627854-ae7551d1eddb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      description: "New product description",
      longDescription: "New product long description",
      stock: 10,
      colors: ["Black"],
      sizes: ["One Size"],
      durability: { crown: "Standard crown", brim: "Standard brim", material: "Cotton" },
    };
    addProduct(newProduct);
    setShowAddModal(false);
    setNewProductName("");
    setNewProductPrice("");
    setProductError("");
  };

  const navItems: { id: AdminSection; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "DASHBOARD", icon: <LayoutDashboard size={16} /> },
    { id: "products", label: "PRODUCTS", icon: <Package size={16} /> },
    { id: "orders", label: "ORDERS", icon: <ShoppingCart size={16} /> },
  ];

  return (
    <div className="bg-[#080808] min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-56 bg-[#0d0d0d] border-r border-[#1e1e1e] flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-1.5">
            <span className="font-bebas text-white tracking-widest" style={{ fontSize: "20px", letterSpacing: "0.15em" }}>
              PEAK
            </span>
            <span className="font-bebas text-[#e31f3d]" style={{ fontSize: "20px" }}>
              CO.
            </span>
          </div>
          <p className="text-[#444]" style={{ fontSize: "10px", marginTop: "2px" }}>
            ADMIN PANEL
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setSection(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 mb-1 font-barlow tracking-widest transition-colors ${
                section === item.id
                  ? "bg-[#e31f3d]/10 text-[#e31f3d] border-l-2 border-[#e31f3d]"
                  : "text-[#555] hover:text-white hover:bg-[#1a1a1a]"
              }`}
              style={{ fontSize: "11px", fontWeight: 700 }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-[#1e1e1e]">
          <Link
            to="/"
            className="flex items-center gap-2 text-[#444] hover:text-white transition-colors px-3 py-2 font-barlow tracking-widest"
            style={{ fontSize: "11px", fontWeight: 600 }}
          >
            <ArrowLeft size={14} /> BACK TO STORE
          </Link>
        </div>
      </aside>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-56 min-w-0">
        {/* Topbar */}
        <div className="sticky top-0 z-10 bg-[#0d0d0d] border-b border-[#1e1e1e] px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#555] hover:text-white transition-colors"
            >
              <LayoutDashboard size={20} />
            </button>
            <h1
              className="font-bebas text-white tracking-widest"
              style={{ fontSize: "22px" }}
            >
              {section === "dashboard" ? "OVERVIEW" : section === "products" ? "PRODUCT MANAGEMENT" : "ORDERS"}
            </h1>
          </div>
          {section === "products" && (
            <button
              onClick={() => { setProductError(""); setShowAddModal(true); }}
              className="bg-[#e31f3d] text-white px-4 py-2 font-barlow tracking-widest flex items-center gap-2 hover:bg-red-600 transition-colors"
              style={{ fontSize: "12px", fontWeight: 700 }}
            >
              <Plus size={14} /> ADD PRODUCT
            </button>
          )}
        </div>

        <div className="p-4 sm:p-6">
          {/* ─── DASHBOARD ───────────────────────────────────── */}
          {section === "dashboard" && (
            <div>
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "TOTAL REVENUE", value: `$${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, sub: "+12% vs last month", icon: <TrendingUp size={18} /> },
                  { label: "TOTAL ORDERS", value: String(totalOrders), sub: `${activeOrders} active`, icon: <ShoppingCart size={18} /> },
                  { label: "PRODUCTS", value: String(productList.length), sub: `${productList.filter(p => p.badge === "LIMITED DROP").length} limited drops`, icon: <Package size={18} /> },
                  { label: "AVG ORDER", value: `$${(totalRevenue / totalOrders).toFixed(2)}`, sub: "Per transaction", icon: <TrendingUp size={18} /> },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#111] border border-[#1e1e1e] p-4 sm:p-5">
                    <div className="flex items-start justify-between mb-3">
                      <p
                        className="font-barlow text-[#555] tracking-widest"
                        style={{ fontSize: "10px", fontWeight: 700 }}
                      >
                        {stat.label}
                      </p>
                      <span className="text-[#e31f3d]">{stat.icon}</span>
                    </div>
                    <p
                      className="font-bebas text-white"
                      style={{ fontSize: "28px", letterSpacing: "0.03em" }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-[#444]" style={{ fontSize: "11px" }}>
                      {stat.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* Revenue chart */}
              <div className="bg-[#111] border border-[#1e1e1e] p-5 mb-6">
                <h3
                  className="font-bebas text-white tracking-widest mb-5"
                  style={{ fontSize: "18px" }}
                >
                  REVENUE OVERVIEW — LAST 6 MONTHS
                </h3>
                <div className="flex items-end gap-3 h-40">
                  {MONTHLY_SALES.map((s) => (
                    <div key={s.month} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[#555]" style={{ fontSize: "10px" }}>
                        ${(s.revenue / 1000).toFixed(1)}k
                      </span>
                      <div
                        className="w-full bg-[#e31f3d] transition-all"
                        style={{ height: `${(s.revenue / maxRevenue) * 100}px`, minHeight: "4px" }}
                      />
                      <span
                        className="font-barlow text-[#555] tracking-widest"
                        style={{ fontSize: "10px", fontWeight: 600 }}
                      >
                        {s.month}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent orders */}
              <div className="bg-[#111] border border-[#1e1e1e] p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bebas text-white tracking-widest" style={{ fontSize: "18px" }}>
                    RECENT ORDERS
                  </h3>
                  <button
                    onClick={() => setSection("orders")}
                    className="text-[#e31f3d] font-barlow tracking-widest hover:text-red-400 transition-colors"
                    style={{ fontSize: "11px", fontWeight: 700 }}
                  >
                    VIEW ALL →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#1e1e1e]">
                        {["ORDER", "CUSTOMER", "TOTAL", "STATUS"].map((h) => (
                          <th
                            key={h}
                            className="text-left pb-2 text-[#444] font-barlow tracking-widest"
                            style={{ fontSize: "10px", fontWeight: 700 }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 4).map((order) => (
                        <tr key={order.id} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a] transition-colors">
                          <td className="py-3 text-[#888]" style={{ fontSize: "12px" }}>{order.id}</td>
                          <td className="py-3 text-white" style={{ fontSize: "13px" }}>{order.customer}</td>
                          <td className="py-3 text-white" style={{ fontSize: "13px" }}>${order.total.toFixed(2)}</td>
                          <td className="py-3">
                            <span
                              className={`px-2 py-0.5 border font-barlow tracking-widest ${STATUS_COLORS[order.status]}`}
                              style={{ fontSize: "10px", fontWeight: 700 }}
                            >
                              {order.status.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ─── PRODUCTS ────────────────────────────────────── */}
          {section === "products" && (
            <div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#1e1e1e]">
                      {["PRODUCT", "CATEGORY", "PRICE", "STOCK", "BADGE", "ACTIONS"].map((h) => (
                        <th
                          key={h}
                          className="text-left pb-3 text-[#444] font-barlow tracking-widest"
                          style={{ fontSize: "10px", fontWeight: 700, paddingRight: "16px" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b border-[#1a1a1a] hover:bg-[#111] transition-colors"
                      >
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 overflow-hidden bg-[#1a1a1a] shrink-0">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-white" style={{ fontSize: "13px" }}>
                              {product.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <span
                            className="font-barlow text-[#666] tracking-widest"
                            style={{ fontSize: "11px", fontWeight: 600 }}
                          >
                            {product.category.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-white" style={{ fontSize: "13px" }}>
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="py-3 pr-4">
                          <span
                            className={product.stock <= 10 ? "text-[#e31f3d]" : "text-green-400"}
                            style={{ fontSize: "13px" }}
                          >
                            {product.stock}
                          </span>
                        </td>
                        <td className="py-3 pr-4">
                          {product.badge ? (
                            <span
                              className="bg-[#e31f3d]/10 text-[#e31f3d] border border-[#e31f3d]/20 px-2 py-0.5 font-barlow tracking-widest"
                              style={{ fontSize: "10px", fontWeight: 700 }}
                            >
                              {product.badge}
                            </span>
                          ) : (
                            <span className="text-[#333]" style={{ fontSize: "12px" }}>—</span>
                          )}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="text-[#555] hover:text-white transition-colors p-1"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-[#555] hover:text-[#e31f3d] transition-colors p-1"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ─── ORDERS ──────────────────────────────────────── */}
          {section === "orders" && (
            <div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#1e1e1e]">
                      {["ORDER ID", "CUSTOMER", "EMAIL", "ITEMS", "TOTAL", "STATUS", "DATE"].map((h) => (
                        <th
                          key={h}
                          className="text-left pb-3 text-[#444] font-barlow tracking-widest"
                          style={{ fontSize: "10px", fontWeight: 700, paddingRight: "16px" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-[#1a1a1a] hover:bg-[#111] transition-colors">
                        <td className="py-3 pr-4 text-[#888]" style={{ fontSize: "12px" }}>{order.id}</td>
                        <td className="py-3 pr-4 text-white" style={{ fontSize: "13px" }}>{order.customer}</td>
                        <td className="py-3 pr-4 text-[#666]" style={{ fontSize: "12px" }}>{order.email}</td>
                        <td className="py-3 pr-4 text-[#888]" style={{ fontSize: "13px" }}>{order.items}</td>
                        <td className="py-3 pr-4 text-white" style={{ fontSize: "13px" }}>${order.total.toFixed(2)}</td>
                        <td className="py-3 pr-4">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              setOrders(prev =>
                                prev.map(o =>
                                  o.id === order.id ? { ...o, status: e.target.value as OrderStatus } : o
                                )
                              )
                            }
                            className={`border px-2 py-1 outline-none cursor-pointer bg-transparent font-barlow tracking-widest ${STATUS_COLORS[order.status]}`}
                            style={{ fontSize: "10px", fontWeight: 700 }}
                          >
                            <option value="processing">PROCESSING</option>
                            <option value="shipped">SHIPPED</option>
                            <option value="delivered">DELIVERED</option>
                            <option value="cancelled">CANCELLED</option>
                          </select>
                        </td>
                        <td className="py-3 text-[#555]" style={{ fontSize: "12px" }}>{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-[#111] border border-[#1e1e1e] p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bebas text-white tracking-widest" style={{ fontSize: "22px" }}>
                ADD PRODUCT
              </h2>
              <button onClick={() => setShowAddModal(false)} className="text-[#555] hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[#555] mb-1" style={{ fontSize: "11px" }}>PRODUCT NAME *</label>
                <input
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#222] px-4 py-3 text-white outline-none focus:border-[#e31f3d] transition-colors"
                  style={{ fontSize: "14px" }}
                  placeholder="e.g. SHADOW PEAK SNAPBACK"
                />
              </div>
              <div>
                <label className="block text-[#555] mb-1" style={{ fontSize: "11px" }}>PRICE ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#222] px-4 py-3 text-white outline-none focus:border-[#e31f3d] transition-colors"
                  style={{ fontSize: "14px" }}
                  placeholder="49.99"
                />
              </div>
              <div>
                <label className="block text-[#555] mb-1" style={{ fontSize: "11px" }}>CATEGORY *</label>
                <select
                  value={newProductCategory}
                  onChange={(e) => setNewProductCategory(e.target.value as Product["category"])}
                  className="w-full bg-[#0d0d0d] border border-[#222] px-4 py-3 text-white outline-none focus:border-[#e31f3d] transition-colors"
                  style={{ fontSize: "14px" }}
                >
                  <option value="snapback">Snapback</option>
                  <option value="camper">Camper Cap</option>
                  <option value="dad-hat">Dad Hat</option>
                </select>
              </div>
            </div>
            {productError && (
              <p className="text-[#e31f3d] mt-3" style={{ fontSize: "12px" }} role="alert">
                {productError}
              </p>
            )}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddProduct}
                className="flex-1 bg-[#e31f3d] text-white py-3 font-barlow tracking-widest hover:bg-red-600 transition-colors"
                style={{ fontSize: "13px", fontWeight: 700 }}
              >
                ADD PRODUCT
              </button>
              <button
                onClick={() => { setShowAddModal(false); setProductError(""); }}
                className="flex-1 border border-[#333] text-[#666] py-3 font-barlow tracking-widest hover:border-white hover:text-white transition-colors"
                style={{ fontSize: "13px", fontWeight: 700 }}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-[#111] border border-[#1e1e1e] p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bebas text-white tracking-widest" style={{ fontSize: "22px" }}>
                EDIT PRODUCT
              </h2>
              <button onClick={() => setEditingProduct(null)} className="text-[#555] hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[#555] mb-1" style={{ fontSize: "11px" }}>NAME</label>
                <input
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-[#0d0d0d] border border-[#222] px-4 py-3 text-white outline-none focus:border-[#e31f3d] transition-colors"
                  style={{ fontSize: "14px" }}
                />
              </div>
              <div>
                <label className="block text-[#555] mb-1" style={{ fontSize: "11px" }}>PRICE ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                  className="w-full bg-[#0d0d0d] border border-[#222] px-4 py-3 text-white outline-none focus:border-[#e31f3d] transition-colors"
                  style={{ fontSize: "14px" }}
                />
              </div>
              <div>
                <label className="block text-[#555] mb-1" style={{ fontSize: "11px" }}>STOCK</label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingProduct({ ...editingProduct, stock: Math.max(0, editingProduct.stock - 1) })}
                    className="w-10 h-10 border border-[#222] flex items-center justify-center text-[#666] hover:text-white hover:bg-[#1a1a1a] transition-colors"
                    style={{ fontSize: "16px" }}
                  >
                    −
                  </button>
                  <span className="text-white w-8 text-center" style={{ fontSize: "16px" }}>
                    {editingProduct.stock}
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditingProduct({ ...editingProduct, stock: editingProduct.stock + 1 })}
                    className="w-10 h-10 border border-[#222] flex items-center justify-center text-[#666] hover:text-white hover:bg-[#1a1a1a] transition-colors"
                    style={{ fontSize: "16px" }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            {productError && (
              <p className="text-[#e31f3d] mt-3" style={{ fontSize: "12px" }} role="alert">
                {productError}
              </p>
            )}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  if (!editingProduct.name.trim() || !Number.isFinite(editingProduct.price) || editingProduct.price <= 0) {
                    setProductError("Enter a product name and a price greater than zero.");
                    return;
                  }
                  updateProduct({ ...editingProduct, name: editingProduct.name.trim() });
                  setEditingProduct(null);
                  setProductError("");
                }}
                className="flex-1 bg-[#e31f3d] text-white py-3 font-barlow tracking-widest hover:bg-red-600 transition-colors"
                style={{ fontSize: "13px", fontWeight: 700 }}
              >
                SAVE CHANGES
              </button>
              <button
                onClick={() => { setEditingProduct(null); setProductError(""); }}
                className="flex-1 border border-[#333] text-[#666] py-3 font-barlow tracking-widest hover:border-white hover:text-white transition-colors"
                style={{ fontSize: "13px", fontWeight: 700 }}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}