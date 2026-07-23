import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { entry: "server" },
      pages: [
        { path: "/" },
        { path: "/shop" },
        { path: "/contact" },
        { path: "/privacy" },
        { path: "/terms" },
        { path: "/shipping" },
        { path: "/returns" },
      ],
      prerender: {
        enabled: true,
        autoStaticPathsDiscovery: false,
        crawlLinks: false,
        failOnError: true,
      },
      // A hand-maintained public sitemap supplies useful crawl priorities.
      sitemap: { enabled: false },
    }),
    nitro({
      preset: "netlify",
    }),
    react(),
  ],
  css: { transformer: "lightningcss" },
  resolve: {
    alias: {
      "@": `${process.cwd()}/src`,
    },
  },
});
