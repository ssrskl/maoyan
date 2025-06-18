import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import mdx from "@mdx-js/rollup";
import { resolve } from "node:path";
import remarkFrontmatter from "remark-frontmatter";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import remarkDirective from "remark-directive";

const rehypePrettyCodeOptions = {

  theme: "github-light",
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }), 
    viteReact(), 
    tailwindcss(), 
    mdx({
      remarkPlugins: [remarkFrontmatter,remarkGfm,remarkDirective],
      rehypePlugins: [rehypeSlug,[rehypePrettyCode,rehypePrettyCodeOptions]],
    })
  ],
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  }
});
