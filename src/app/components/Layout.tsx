import { Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

// Pages that use their own full-screen layout (no footer)
const MINIMAL_PAGES = ["/login", "/checkout", "/admin"];

export function Layout() {
  const { pathname } = useLocation();
  const isMinimal = MINIMAL_PAGES.some((p) => pathname.startsWith(p));

  return (
    <div className="bg-[#080808] min-h-screen flex flex-col">
      {!isMinimal && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isMinimal && <Footer />}
    </div>
  );
}
