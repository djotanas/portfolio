# jonatassennas.com.br

Portfólio de Jonatas Sennas. Vite, HTML gerado no build, sem framework e sem JavaScript no cliente.

## Rodando

```bash
npm install
npm run dev       # desenvolvimento
npm run build     # checa tipos e gera dist/
npm run preview   # serve o dist/
npm run og        # regenera public/og.png (precisa de Python + Playwright)
```

## Onde está cada coisa

| Caminho | O quê |
| --- | --- |
| `content/pt-BR.ts` | Todo o texto do site. Editar conteúdo é só aqui. |
| `content/types.ts` | Forma do conteúdo, compartilhada entre idiomas. |
| `content/learnings/` | Plano da seção de aprendizados (desligada). |
| `src/render/` | Funções que transformam o conteúdo em HTML, `<head>`, JSON-LD e `llms.txt`. |
| `src/styles/tokens.css` | Tokens do design system "Portfólio djotanas". |
| `src/styles/main.css` | Estilos dos componentes. |
| `vite.config.ts` | Plugin `static-site`: injeta o HTML, gera `sitemap.xml`, `robots.txt` e `llms.txt`, e coloca o CSS inline. |
| `scripts/og.*` | Gera a imagem de compartilhamento (1200×630). |

## Inglês (l10n)

O conteúdo já é separado por idioma. Para publicar em inglês:

1. Crie `content/en.ts` exportando um `SiteContent` traduzido, com `locale: "en"` e `siteUrl: "https://www.jonatassennas.com.br/en/"`.
2. Em `vite.config.ts`, adicione `{ dir: "en", content: en }` em `locales`.
3. Copie `index.html` para `en/index.html`.
4. Em `src/render/head.ts`, troque os `hreflang` fixos por uma lista de todos os idiomas.
5. Adicione um seletor PT/EN no cabeçalho.

## SEO incluído

- `title`, `description`, canonical, `hreflang`, Open Graph e Twitter Card com imagem 1200×630.
- JSON-LD com `Person`, `WebSite` e `ProfilePage`.
- `sitemap.xml`, `robots.txt` e `llms.txt` gerados no build a partir do mesmo conteúdo.
- HTML semântico (um `h1`, seções com `aria-labelledby`, `address`, `time`), link para pular ao conteúdo, foco visível e `prefers-reduced-motion`.
- Fontes servidas pelo próprio site (Fontsource) com preload, CSS inline, foto em WebP com dimensões fixas.

## Publicação

O `dist/` é estático e roda em qualquer host (Vercel, Netlify, Cloudflare Pages, GitHub Pages). Aponte `www.jonatassennas.com.br` para o host e redirecione o domínio sem `www` para ele, já que o canonical usa `www`.
