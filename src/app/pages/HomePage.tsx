import { Link } from "react-router";
import { ArrowRight, Play, ChevronRight } from "lucide-react";
import { useProducts } from "../context/ProductContext";
import { ProductCard } from "../components/ProductCard";

const HERO_IMG =
  "https://images.unsplash.com/photo-1768981205607-d1ef669cf95d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400";
const GRAFFITI_IMG =
  "https://images.unsplash.com/photo-1770900100249-1b7f6c9268f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000";
const DJ_IMG =
  "https://images.unsplash.com/photo-1764649841586-f18a6a88ad18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";
const DANCER_IMG =
  "https://images.unsplash.com/photo-1588671815815-b0cd3b2a9189?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";
const ARTIST_IMG =
  "https://images.unsplash.com/photo-1767878719358-2c6c29d380a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";
const MODEL_IMG =
  "https://images.unsplash.com/photo-1635650804263-1a1941e14df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";

export function HomePage() {
  const { featuredProducts, limitedDropProducts } = useProducts();

  return (
    <div className="bg-[#080808]">
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Peak Co. Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        </div>

        {/* Accent stripe */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#e31f3d]" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="max-w-2xl">
            <p
              className="font-barlow text-[#e31f3d] tracking-widest mb-3"
              style={{ fontSize: "13px", fontWeight: 700 }}
            >
              — PEAK CO. SS2026 COLLECTION
            </p>
            <h1
              className="font-bebas text-white"
              style={{
                fontSize: "clamp(72px, 12vw, 140px)",
                lineHeight: 0.9,
                letterSpacing: "0.02em",
              }}
            >
              REACH YOUR
              <br />
              <span className="text-[#e31f3d]">PEAK.</span>
            </h1>
            <p
              className="text-[#888] mt-6 mb-10 max-w-md"
              style={{ fontSize: "15px", lineHeight: "1.7" }}
            >
              Premium headwear forged in the streets. Inspired by 90s hip-hop.
              Built for creators, DJs, dancers — those who refuse to settle.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="bg-[#e31f3d] text-white px-8 py-4 font-barlow tracking-widest flex items-center gap-2 hover:bg-red-600 transition-colors"
                style={{ fontSize: "14px", fontWeight: 700 }}
              >
                SHOP NOW <ArrowRight size={16} />
              </Link>
              <a
                href="#story"
                className="border border-[#333] text-white px-8 py-4 font-barlow tracking-widest flex items-center gap-2 hover:border-white transition-colors"
                style={{ fontSize: "14px", fontWeight: 700 }}
              >
                OUR STORY <Play size={14} />
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-16 pt-8 border-t border-[#1e1e1e]">
              {[
                { val: "9+", label: "STYLES" },
                { val: "3", label: "SILHOUETTES" },
                { val: "50K+", label: "COMMUNITY" },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    className="font-bebas text-white"
                    style={{ fontSize: "32px", letterSpacing: "0.05em" }}
                  >
                    {s.val}
                  </p>
                  <p
                    className="font-barlow text-[#555] tracking-widest"
                    style={{ fontSize: "11px", fontWeight: 600 }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-[#e31f3d] to-transparent" />
          <p
            className="font-barlow text-[#444] tracking-widest"
            style={{ fontSize: "10px", fontWeight: 600 }}
          >
            SCROLL
          </p>
        </div>
      </section>

      {/* ─── MARQUEE ────────────────────────────────────────────────────────── */}
      <div className="bg-[#e31f3d] py-3 overflow-hidden">
        <div className="flex gap-8 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="font-bebas text-white shrink-0 tracking-widest"
              style={{ fontSize: "14px" }}
            >
              REACH YOUR PEAK &nbsp;•&nbsp; NEW DROP &nbsp;•&nbsp; PREMIUM HEADWEAR &nbsp;•&nbsp; STREET CULTURE &nbsp;•&nbsp; HIP-HOP INSPIRED &nbsp;•&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ─── FEATURED PRODUCTS ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p
              className="font-barlow text-[#e31f3d] tracking-widest mb-2"
              style={{ fontSize: "12px", fontWeight: 700 }}
            >
              THE LINEUP
            </p>
            <h2
              className="font-bebas text-white"
              style={{ fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "0.03em" }}
            >
              FEATURED STYLES
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden sm:flex items-center gap-2 text-[#666] hover:text-white transition-colors font-barlow tracking-widest"
            style={{ fontSize: "12px", fontWeight: 600 }}
          >
            VIEW ALL <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 sm:hidden text-center">
          <Link
            to="/shop"
            className="font-barlow text-[#666] hover:text-white transition-colors tracking-widest"
            style={{ fontSize: "13px", fontWeight: 600 }}
          >
            VIEW ALL PRODUCTS →
          </Link>
        </div>
      </section>

      {/* ─── LIMITED DROP ───────────────────────────────────────────────────── */}
      <section className="bg-[#0d0d0d] border-y border-[#1e1e1e] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Text side */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-[#e31f3d] rounded-full animate-pulse" />
                <span
                  className="font-barlow text-[#e31f3d] tracking-widest"
                  style={{ fontSize: "12px", fontWeight: 700 }}
                >
                  LIMITED AVAILABILITY
                </span>
              </div>
              <h2
                className="font-bebas text-white mb-4"
                style={{ fontSize: "clamp(48px, 8vw, 96px)", lineHeight: 0.95, letterSpacing: "0.03em" }}
              >
                LIMITED
                <br />
                <span className="text-[#e31f3d]">DROP</span>
                <br />
                COLLECTION
              </h2>
              <p
                className="text-[#666] mb-8 max-w-sm"
                style={{ fontSize: "14px", lineHeight: "1.7" }}
              >
                These pieces are produced in extremely limited quantities.
                Once sold out, they're gone forever. No restocks. No waiting list.
              </p>
              <Link
                to="/shop?filter=limited"
                className="border border-[#e31f3d] text-[#e31f3d] px-8 py-3 font-barlow tracking-widest hover:bg-[#e31f3d] hover:text-white transition-all inline-flex items-center gap-2"
                style={{ fontSize: "13px", fontWeight: 700 }}
              >
                SHOP DROPS <ArrowRight size={14} />
              </Link>
            </div>

            {/* Products */}
            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {limitedDropProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BRAND STORY ────────────────────────────────────────────────────── */}
      <section id="story" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={GRAFFITI_IMG}
                  alt="Urban street culture"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative border */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-[#e31f3d]" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-[#e31f3d]" />
              {/* Year badge */}
              <div className="absolute bottom-8 left-8 bg-[#080808] border border-[#1e1e1e] p-4">
                <p
                  className="font-bebas text-[#e31f3d]"
                  style={{ fontSize: "36px", lineHeight: 1 }}
                >
                  1994
                </p>
                <p
                  className="font-barlow text-[#555] tracking-widest"
                  style={{ fontSize: "10px", fontWeight: 600 }}
                >
                  CULTURE FOUNDED
                </p>
              </div>
            </div>

            {/* Text */}
            <div>
              <p
                className="font-barlow text-[#e31f3d] tracking-widest mb-3"
                style={{ fontSize: "12px", fontWeight: 700 }}
              >
                THE PEAK STORY
              </p>
              <h2
                className="font-bebas text-white mb-6"
                style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 0.95, letterSpacing: "0.03em" }}
              >
                BORN IN THE
                <br />
                STREETS.
                <br />
                <span className="text-[#e31f3d]">BUILT FOR</span>
                <br />
                THE CULTURE.
              </h2>
              <div className="space-y-4 text-[#777]" style={{ fontSize: "14px", lineHeight: "1.8" }}>
                <p>
                  Peak Co. was born from a single idea: the people who move culture deserve gear
                  that moves with them. We built our headwear for MCs who spit bars at 2am, for
                  DJs who play until sunrise, and for dancers who leave everything on the floor.
                </p>
                <p>
                  Every cap is engineered with reinforced crown construction and shape-memory brim
                  technology — because when you're in motion, your fit shouldn't be.
                </p>
                <p>
                  The 90s gave us the blueprint. We built the house.
                </p>
              </div>
              <div className="flex items-center gap-8 mt-8 pt-8 border-t border-[#1e1e1e]">
                {[
                  { val: "Shape-Memory", label: "BRIM TECH" },
                  { val: "Reinforced", label: "CROWN" },
                  { val: "Premium", label: "MATERIALS" },
                ].map((s) => (
                  <div key={s.label}>
                    <p
                      className="font-barlow text-white"
                      style={{ fontSize: "15px", fontWeight: 700 }}
                    >
                      {s.val}
                    </p>
                    <p
                      className="font-barlow text-[#555] tracking-widest mt-0.5"
                      style={{ fontSize: "10px", fontWeight: 600 }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FULL-WIDTH LIFESTYLE ───────────────────────────────────────────── */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={MODEL_IMG}
          alt="Streetwear lifestyle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#080808]/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h2
              className="font-bebas text-white"
              style={{
                fontSize: "clamp(60px, 14vw, 160px)",
                letterSpacing: "0.05em",
                lineHeight: 1,
                textShadow: "0 0 80px rgba(227,31,61,0.4)",
              }}
            >
              PEAK MINDSET
            </h2>
          </div>
        </div>
      </section>

      {/* ─── COMMUNITY ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0d0d0d] border-t border-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p
              className="font-barlow text-[#e31f3d] tracking-widest mb-3"
              style={{ fontSize: "12px", fontWeight: 700 }}
            >
              THE COLLECTIVE
            </p>
            <h2
              className="font-bebas text-white"
              style={{ fontSize: "clamp(40px, 7vw, 80px)", letterSpacing: "0.03em" }}
            >
              ARTIST COLLABORATIONS
            </h2>
            <p
              className="text-[#666] mt-3 max-w-lg mx-auto"
              style={{ fontSize: "14px", lineHeight: "1.7" }}
            >
              Peak Co. partners with the culture's most creative forces — DJs, dancers,
              street artists — to keep the energy alive and authentic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {[
              {
                img: DJ_IMG,
                name: "DJ CRUX",
                role: "TURNTABLIST & PRODUCER",
                quote: "Peak Co. is the only cap that keeps my energy right.",
              },
              {
                img: DANCER_IMG,
                name: "MIKA STORM",
                role: "B-GIRL & CHOREOGRAPHER",
                quote: "I need gear that moves like I do. Nothing else compares.",
              },
              {
                img: ARTIST_IMG,
                name: "GHOST TAGz",
                role: "MURALIST & STREET ARTIST",
                quote: "Real culture, real craft. Peak Co. represents the streets.",
              },
            ].map((artist, i) => (
              <div key={i} className="group relative overflow-hidden aspect-[3/4]">
                <img
                  src={artist.img}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p
                    className="font-bebas text-white"
                    style={{ fontSize: "24px", letterSpacing: "0.05em" }}
                  >
                    {artist.name}
                  </p>
                  <p
                    className="font-barlow text-[#e31f3d] tracking-widest mb-3"
                    style={{ fontSize: "10px", fontWeight: 700 }}
                  >
                    {artist.role}
                  </p>
                  <p
                    className="text-[#aaa] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ fontSize: "13px", lineHeight: "1.5", fontStyle: "italic" }}
                  >
                    "{artist.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
