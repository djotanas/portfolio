import { defineConfig, type Plugin } from "vite";
import ptBR from "./content/pt-BR";
import type { SiteContent } from "./content/types";
import { renderHead } from "./src/render/head";
import { renderBody } from "./src/render/page";
import { renderLlmsTxt } from "./src/render/llms";

/**
 * Idiomas publicados. Para adicionar inglês:
 * 1. crie content/en.ts exportando um SiteContent (siteUrl terminando em /en/);
 * 2. adicione aqui { dir: "en", content: en };
 * 3. crie en/index.html copiando index.html (o plugin preenche o resto).
 * Lembre de incluir os hreflang alternados em src/render/head.ts.
 */
const locales: { dir: string; content: SiteContent }[] = [{ dir: "", content: ptBR }];

const lastmod = new Date().toISOString().slice(0, 10);

function staticSite(): Plugin {
  const byPath = (path: string) => {
    const dir = path.replace(/^\//, "").replace(/\/?index\.html$/, "");
    return locales.find((l) => l.dir === dir)?.content ?? ptBR;
  };
  return {
    name: "static-site",
    transformIndexHtml: {
      order: "pre",
      handler(html, ctx) {
        const c = byPath(ctx.path);
        return html
          .replace("%LANG%", c.locale)
          .replace("<!--head-->", renderHead(c))
          .replace("<!--body-->", renderBody(c));
      },
    },
    generateBundle: {
      order: "post",
      handler(_opts, bundle) {
      // CSS inline no HTML (são ~12 kB) para não bloquear a primeira pintura,
      // e preload das duas fontes usadas acima da dobra.
      const css = Object.values(bundle).find((a) => a.type === "asset" && a.fileName.endsWith(".css"));
      const fonts = Object.values(bundle)
        .filter((a) => /ibm-plex-sans-latin-(400|700)-normal.*\.woff2$/.test(a.fileName))
        .map((a) => `<link rel="preload" href="/${a.fileName}" as="font" type="font/woff2" crossorigin>`)
        .join("");
      if (css && css.type === "asset") {
        for (const a of Object.values(bundle)) {
          if (a.type !== "asset" || !a.fileName.endsWith(".html")) continue;
          a.source = String(a.source).replace(
            /<link rel="stylesheet"[^>]*href="\/[^"]*\.css"[^>]*>/,
            `${fonts}<style>${String(css.source)}</style>`,
          );
        }
        delete bundle[css.fileName];
      }

      const urls = locales
        .map((l) => `  <url>\n    <loc>${l.content.siteUrl}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
        .join("\n");
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\n\nSitemap: ${ptBR.siteUrl}sitemap.xml\n`,
      });
      this.emitFile({ type: "asset", fileName: "llms.txt", source: renderLlmsTxt(ptBR) });
      },
    },
  };
}

export default defineConfig({
  plugins: [staticSite()],
  build: {
    target: "es2020",
    cssCodeSplit: false,
    rollupOptions: {
      input: Object.fromEntries(
        locales.map((l) => [l.dir || "main", l.dir ? `${l.dir}/index.html` : "index.html"]),
      ),
    },
  },
});
