import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://agimoment.com"; // Replace if your domain is different

  // Assuming default locale is 'en' and you have an 'about' page
  // Add other static routes here as needed
  const staticRoutes = [
    "/",
    "/about",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map(route => ({
    url: `${baseUrl}${route === "/" ? "" : route}`, // Handle base URL concatenation
    lastModified: new Date(), // Use current date, or fetch dynamically if possible
    changeFrequency: "monthly", // Adjust based on how often content changes
    priority: route === "/" ? 1 : 0.8, // Give homepage higher priority
  }));

  return sitemapEntries;
}
