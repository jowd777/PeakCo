export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

export interface Order {
  id: string;
  customer: string;
  email: string;
  items: number;
  total: number;
  status: OrderStatus;
  date: string;
}

export const MOCK_ORDERS: Order[] = [
  { id: "ORD-7A2F", customer: "Marcus Webb", email: "marcus@example.com", items: 2, total: 124.98, status: "shipped", date: "2026-03-05" },
  { id: "ORD-3C9B", customer: "Leila Okonkwo", email: "leila@example.com", items: 1, total: 64.99, status: "processing", date: "2026-03-06" },
  { id: "ORD-8D1E", customer: "Tyler Nguyen", email: "tyler@example.com", items: 3, total: 152.97, status: "delivered", date: "2026-03-01" },
  { id: "ORD-5F4A", customer: "Aisha Browne", email: "aisha@example.com", items: 1, total: 54.99, status: "processing", date: "2026-03-07" },
  { id: "ORD-2B6C", customer: "Devon Hill", email: "devon@example.com", items: 2, total: 87.98, status: "cancelled", date: "2026-02-28" },
  { id: "ORD-9E3F", customer: "Zara Kapoor", email: "zara@example.com", items: 1, total: 39.99, status: "delivered", date: "2026-02-25" },
];

const STORAGE_KEY = "peak-co-orders";

function isOrder(value: unknown): value is Order {
  if (typeof value !== "object" || value === null) return false;
  const order = value as Record<string, unknown>;
  return typeof order.id === "string"
    && typeof order.customer === "string"
    && typeof order.email === "string"
    && typeof order.items === "number"
    && typeof order.total === "number"
    && ["processing", "shipped", "delivered", "cancelled"].includes(String(order.status))
    && typeof order.date === "string";
}

export function readOrders(): Order[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  const parsed: unknown = JSON.parse(stored);
  if (!Array.isArray(parsed) || !parsed.every(isOrder)) {
    throw new Error("Saved orders are invalid. Clear the peak-co-orders localStorage entry to reset demo orders.");
  }

  return parsed;
}

export function saveOrders(orders: Order[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}
