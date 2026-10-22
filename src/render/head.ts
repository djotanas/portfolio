import type { SiteContent } from "../../content/types";
import { esc } from "./page";

/** Dados estruturados: Person + WebSite + ProfilePage. */
export const jsonLd = (c: SiteContent) => {
  const p = c.person;
  const url = c.siteUrl;
  const current = c.experience.items.find((e) => !e.end);
  const person = {
    "@type": "Person",
    "@id": `${url}#person`,
    name: p.name,
    jobTitle: p.role,
    url,
    image: `${url}img/jonatas-sennas.jpg`,
    email: `mailto:${p.email}`,
    telephone: p.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nova Iguaçu",
      addressRegion: "RJ",
      addressCountry: "BR",
    },
    sameAs: [p.linkedin, p.github],
    ...(current && { worksFor: { "@type": "Organization", name: current.company } }),
    alumniOf: c.journey.education.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.institution,
    })),
    knowsAbout: [
      "Flutter", "Dart", "C#", ".NET", "React", "TypeScript", "SignalR",
      "Supabase", "Clean Architecture", "Azure DevOps", "Grafana",
    ],
    knowsLanguage: "pt-BR",
  };
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        url,
        name: p.name,
        inLanguage: c.locale,
        publisher: { "@id": `${url}#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}#profile`,
        url,
        name: c.meta.title,
        inLanguage: c.locale,
        mainEntity: { "@id": `${url}#person` },
        isPartOf: { "@id": `${url}#website` },
      },
    ],
  };
  // "<" escapado para não fechar o <script> por acidente.
  return JSON.stringify(graph).replace(/</g, "\\u003c");
};

export const renderHead = (c: SiteContent): string => {
  const url = c.siteUrl;
  const og = `${url}og.png`;
  return `
    <title>${esc(c.meta.title)}</title>
    <meta name="description" content="${esc(c.meta.description)}">
    <meta name="author" content="${esc(c.person.name)}">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <link rel="canonical" href="${url}">
    <link rel="alternate" hreflang="${c.locale}" href="${url}">
    <link rel="alternate" hreflang="x-default" href="${url}">
    <link rel="me" href="${c.person.linkedin}">
    <link rel="me" href="${c.person.github}">

    <meta property="og:type" content="profile">
    <meta property="og:locale" content="${c.locale.replace("-", "_")}">
    <meta property="og:site_name" content="${esc(c.person.name)}">
    <meta property="og:title" content="${esc(c.meta.title)}">
    <meta property="og:description" content="${esc(c.meta.description)}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${og}">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${esc(c.meta.ogImageAlt)}">
    <meta property="profile:first_name" content="Jonatas">
    <meta property="profile:last_name" content="Sennas">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(c.meta.title)}">
    <meta name="twitter:description" content="${esc(c.meta.description)}">
    <meta name="twitter:image" content="${og}">
    <meta name="twitter:image:alt" content="${esc(c.meta.ogImageAlt)}">

    <script type="application/ld+json">${jsonLd(c)}</script>`;
};
