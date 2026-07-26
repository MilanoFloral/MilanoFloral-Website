import {
  Gem,
  Sparkles,
  WandSparkles
} from "lucide-react";

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Packages", href: "/packages" },
  { label: "Contact", href: "/contact" }
];

export const services = [
  {
    icon: "calendar",
    title: "Wedding Planning",
    description: "Calm, considered planning from your first moodboard to the final farewell.",
    details: ["Concept and budget planning", "Vendor coordination", "Wedding-day management"]
  },
  {
    icon: "flower",
    title: "Floral & Venue Styling",
    description: "Layered florals, refined tablescapes and immersive spaces shaped around your story.",
    details: ["Ceremony installations", "Reception styling", "Bridal and entourage florals"]
  },
  {
    icon: "map",
    title: "Destination Events",
    description: "Thoughtful local knowledge and seamless coordination for celebrations away from home.",
    details: ["Venue sourcing", "Guest logistics", "Multi-day event planning"]
  },
  {
    icon: "party",
    title: "Event Management",
    description: "Professional production for engagements, homecomings, private dinners and brand events.",
    details: ["Run sheets and logistics", "Supplier management", "On-site direction"]
  },
  {
    icon: "sparkles",
    title: "Wedding Fireworks",
    description: "Elegant pyrotechnic moments designed for unforgettable wedding celebrations.",
    details: ["Venue-safe planning", "Timed displays", "Fountains and waterfall effects"]
  },
  {
    icon: "camera",
    title: "Creative Direction",
    description: "A cohesive visual language across stationery, décor, lighting and photographic moments.",
    details: ["Mood and colour direction", "Shot-ready styling", "Installation supervision"]
  }
];

export const portfolio = [
  {
    title: "Ivory Garden",
    category: "Wedding Styling",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=85",
    size: "large"
  },
  {
    title: "Blush Vows",
    category: "Floral Design",
    image: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=85",
    size: "small"
  },
  {
    title: "Candlelit Romance",
    category: "Reception Styling",
    image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1200&q=85",
    size: "small"
  },
  {
    title: "Coastal Promise",
    category: "Destination Wedding",
    image: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1600&q=85",
    size: "large"
  },
  {
    title: "Champagne Evening",
    category: "Private Celebration",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85",
    size: "small"
  },
  {
    title: "Golden Finale",
    category: "Wedding Fireworks",
    image: "https://images.unsplash.com/photo-1533236897111-3e94666b2edf?auto=format&fit=crop&w=1200&q=85",
    size: "small"
  }
];

export const packages = [
  {
    name: "Platinum",
    price: "LKR 70,000",
    icon: WandSparkles,
    description: "A refined entrance or cake-cutting moment with elegant ground effects.",
    features: ["Colour display shells", "Short colour and crackling effects", "Golden fountain", "Event timing consultation"]
  },
  {
    name: "Silver",
    price: "LKR 95,000",
    icon: Gem,
    featured: true,
    description: "A balanced signature display for couples seeking a memorable evening highlight.",
    features: ["Extended colour effects", "Sky rocket set", "Silver and golden fountains", "Venue coordination"]
  },
  {
    name: "Gold",
    price: "LKR 125,000",
    icon: Sparkles,
    description: "Our most immersive wedding finale with layered sky and waterfall effects.",
    features: ["Premium colour display shells", "Niagara waterfall", "Multi-effect finale", "Full display coordination"]
  }
];

export const testimonials = [
  {
    quote: "Every detail felt effortless and deeply personal. The room reveal was more beautiful than we imagined.",
    name: "Amaya & Dilan",
    event: "Garden wedding"
  },
  {
    quote: "MilanoFloral translated a few saved images into a celebration that felt completely ours.",
    name: "Nethmi & Ashen",
    event: "City reception"
  },
  {
    quote: "The team was calm, precise and warm from planning through to the final sparkler moment.",
    name: "Ruwani & Kavishka",
    event: "Destination celebration"
  }
];

export const process = [
  { step: "01", title: "Discover", description: "We learn your story, priorities, venue and investment range." },
  { step: "02", title: "Design", description: "You receive a cohesive creative direction, plan and proposal." },
  { step: "03", title: "Refine", description: "We coordinate suppliers, details, timings and final approvals." },
  { step: "04", title: "Celebrate", description: "Our team installs, manages and quietly perfects every moment." }
];
