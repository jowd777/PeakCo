export type Category = "snapback" | "camper" | "dad-hat";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  hoverImage?: string;
  description: string;
  longDescription: string;
  stock: number;
  badge?: string;
  colors: string[];
  sizes: string[];
  durability: {
    crown: string;
    brim: string;
    material: string;
  };
}

export const products: Product[] = [
  {
    id: "block-king-snapback",
    name: "BLOCK KING SNAPBACK",
    price: 59.99,
    category: "snapback",
    image: "https://images.unsplash.com/photo-1662103627854-ae7551d1eddb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    description: "The flagship 6-panel high crown snapback.",
    longDescription:
      "The Block King is our flagship piece — a high-crown 6-panel snapback built for the streets and the stage. Structured with a reinforced crown that holds its shape no matter how hard you go, this cap is the go-to for MCs, DJs, and creators who demand the best.",
    stock: 18,
    badge: "BESTSELLER",
    colors: ["Black", "White", "Charcoal"],
    sizes: ["S/M", "M/L", "L/XL"],
    durability: {
      crown: "Reinforced 6-panel high crown with shape-memory foam insert",
      brim: "Flat brim with memory-flex technology — stays straight under pressure",
      material: "100% Heavyweight Cotton Twill with moisture-wicking sweatband",
    },
  },
  {
    id: "urban-crown-snapback",
    name: "URBAN CROWN SNAPBACK",
    price: 64.99,
    category: "snapback",
    image: "https://images.unsplash.com/photo-1768981205607-d1ef669cf95d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    description: "High-profile crown with embroidered Peak Co. logo.",
    longDescription:
      "Rise above the crowd with the Urban Crown Snapback. Its towering high-profile silhouette pays homage to the golden era of 90s hip-hop while delivering modern durability. The embossed Peak Co. logo on the front panel is a statement of ambition.",
    stock: 12,
    colors: ["Navy/Red", "Black/Gold", "Forest"],
    sizes: ["S/M", "M/L", "L/XL"],
    durability: {
      crown: "High-profile 6-panel crown with structured front panel",
      brim: "Flat brim with anti-curl reinforcement band",
      material: "Wool-blend front panels with nylon back panels",
    },
  },
  {
    id: "fire-drill-snapback",
    name: "FIRE DRILL SNAPBACK",
    price: 54.99,
    category: "snapback",
    image: "https://images.unsplash.com/photo-1656093219351-6b40e542b344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    description: "Limited drop — bold red colorway, only 50 made.",
    longDescription:
      "The Fire Drill is a statement. This limited-drop snapback in our signature Peak Red colorway was designed for those who show up and show out. Only 50 units produced. Once it's gone, it's gone.",
    stock: 7,
    badge: "LIMITED DROP",
    colors: ["Peak Red", "Blood Orange"],
    sizes: ["S/M", "M/L"],
    durability: {
      crown: "Reinforced structured crown with 6-panel construction",
      brim: "Heat-pressed flat brim with double-stitched edge",
      material: "Durable polyester-cotton blend with rubberized logo patch",
    },
  },
  {
    id: "summit-camper",
    name: "SUMMIT CAMPER CAP",
    price: 49.99,
    category: "camper",
    image: "https://images.unsplash.com/photo-1746725262229-4af327c651f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    description: "5-panel camper built for movement and style.",
    longDescription:
      "The Summit Camper Cap is built for those who are always on the move. Its 5-panel construction sits low and sleek, making it the perfect cap for dancers, runners, and street artists who need full range of motion without sacrificing style.",
    stock: 24,
    colors: ["Olive", "Sand", "Black"],
    sizes: ["One Size"],
    durability: {
      crown: "5-panel low-profile crown with structured front panel",
      brim: "Curved brim with shape-retention wire",
      material: "Ripstop nylon with mesh back panel for breathability",
    },
  },
  {
    id: "street-trace-camper",
    name: "STREET TRACE CAMPER",
    price: 44.99,
    category: "camper",
    image: "https://images.unsplash.com/photo-1635650804263-1a1941e14df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    description: "Lightweight 5-panel for the everyday explorer.",
    longDescription:
      "Stripped back, stripped down. The Street Trace Camper is our cleanest silhouette — a minimal 5-panel that lets your energy do the talking. Lightweight and breathable, this is the cap you throw on when you're out creating.",
    stock: 19,
    colors: ["Black", "White", "Cement"],
    sizes: ["One Size"],
    durability: {
      crown: "Soft 5-panel crown with nylon front panel",
      brim: "Short curved brim with anti-fade coating",
      material: "Lightweight cotton-nylon blend with moisture-wicking liner",
    },
  },
  {
    id: "trail-rider-camper",
    name: "TRAIL RIDER CAMPER",
    price: 47.99,
    category: "camper",
    image: "https://images.unsplash.com/photo-1746725262229-4af327c651f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    description: "Limited edition technical camper cap.",
    longDescription:
      "The Trail Rider is our most technical camper cap yet. Engineered for performance, built for the streets. The water-resistant exterior and ventilated mesh crown make this the go-to for any environment.",
    stock: 9,
    badge: "LIMITED DROP",
    colors: ["Storm Grey", "Midnight"],
    sizes: ["One Size"],
    durability: {
      crown: "5-panel structured crown with ventilated mesh panels",
      brim: "Curved technical brim with DWR water-resistant coating",
      material: "4-way stretch technical fabric with UV protection",
    },
  },
  {
    id: "throwback-dad-hat",
    name: "90s THROWBACK DAD HAT",
    price: 39.99,
    category: "dad-hat",
    image: "https://images.unsplash.com/photo-1643104896146-97cd7fa47dde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    description: "Unstructured dad hat with vintage feel.",
    longDescription:
      "The 90s Throwback takes you back to the golden era. This unstructured, low-profile dad hat captures the relaxed cool of vintage hip-hop style. Worn forward or back, it's an instant classic.",
    stock: 31,
    badge: "BESTSELLER",
    colors: ["Khaki", "Stone", "Vintage White"],
    sizes: ["One Size"],
    durability: {
      crown: "Unstructured 6-panel crown with soft, pre-curved profile",
      brim: "Pre-curved brim with flexible shape-memory insert",
      material: "Stone-washed 100% cotton for a broken-in, vintage feel",
    },
  },
  {
    id: "faded-glory-dad-hat",
    name: "FADED GLORY DAD HAT",
    price: 42.99,
    category: "dad-hat",
    image: "https://images.unsplash.com/photo-1643104896146-97cd7fa47dde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    description: "Washed denim dad hat — worn, raw, real.",
    longDescription:
      "Real ones know: the best caps are the ones that tell a story. The Faded Glory Dad Hat starts with a washed denim finish that gives it that worn, lived-in aesthetic right from the first wear. No break-in required.",
    stock: 15,
    colors: ["Washed Blue", "Faded Black", "Washed Olive"],
    sizes: ["One Size"],
    durability: {
      crown: "Soft 6-panel unstructured crown with garment-washed finish",
      brim: "Curved brim with durable stitching throughout",
      material: "Heavy-wash denim cotton blend — pre-distressed for authenticity",
    },
  },
  {
    id: "peak-classic-dad-hat",
    name: "PEAK CLASSIC DAD HAT",
    price: 37.99,
    category: "dad-hat",
    image: "https://images.unsplash.com/photo-1643104896146-97cd7fa47dde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    description: "The OG — embroidered logo on unstructured cotton.",
    longDescription:
      "The one that started it all. The Peak Classic is our original dad hat — a soft, unstructured cotton cap with the embroidered Peak Co. wordmark on the crown. Simple. Iconic. Timeless.",
    stock: 6,
    badge: "LIMITED DROP",
    colors: ["Black/White", "All Black", "Cream"],
    sizes: ["One Size"],
    durability: {
      crown: "Premium unstructured cotton crown with embroidered branding",
      brim: "Soft pre-curved brim with edge stitching",
      material: "Premium combed cotton twill — breathable and lightweight",
    },
  },
];
