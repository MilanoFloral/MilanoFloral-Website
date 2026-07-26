import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "MilanoFloral", short_name: "MilanoFloral", description: "Wedding planning and floral design in Sri Lanka.", start_url: "/", display: "standalone", background_color: "#f8f4ef", theme_color: "#9f6f65", icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }] };
}
