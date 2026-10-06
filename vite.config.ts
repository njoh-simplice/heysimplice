import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import matter from "gray-matter";
import { CONTACT_EMAIL, SITE_URL } from "./src/constants/site.ts";

/**
 * Fill index.html's __SITE_URL__ / __CONTACT_EMAIL__ placeholders from
 * src/constants/site.ts, so the domain lives in one file. Runs for dev, build
 * and the SSR build alike; prerender.mjs reads the already-substituted
 * dist/index.html as its template.
 */
function siteConstants(): Plugin {
  return {
    name: "site-constants",
    transformIndexHtml: {
      order: "pre",
      handler: (html) =>
        html
          .replaceAll("__SITE_URL__", SITE_URL)
          .replaceAll("__CONTACT_EMAIL__", CONTACT_EMAIL),
    },
  };
}

/**
 * Parse Markdown frontmatter at build time. `import x from "./post.md"` (and
 * `import.meta.glob` over `.md`) then yields `{ frontmatter, content }` — so
 * gray-matter and js-yaml stay in the build and never ship to the browser.
 */
function markdownFrontmatter(): Plugin {
  return {
    name: "markdown-frontmatter",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith(".md")) return null;
      const { data, content } = matter(code);
      return {
        code:
          `export const frontmatter = ${JSON.stringify(data)};\n` +
          `export const content = ${JSON.stringify(content)};\n`,
        map: null,
      };
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), markdownFrontmatter(), siteConstants()],
  build: {
    // react-markdown + the unified/micromark stack push the single bundle a
    // little past the 500 kB default. It's a deliberate trade (see routes.tsx:
    // the blog post route stays eager so prerendered articles don't flash).
    chunkSizeWarningLimit: 700,
  },
});
