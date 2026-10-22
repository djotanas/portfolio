import type { Education, Experience, SiteContent } from "../../content/types";

/** Escapa texto para HTML. Todo conteúdo passa por aqui. */
export const esc = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatDate = (iso: string, c: SiteContent): string => {
  const [y, m] = iso.split("-");
  return m ? `${c.ui.months[Number(m) - 1]} ${y}` : y;
};

const period = (start: string, end: string | undefined, c: SiteContent, ongoing = false) => {
  const endLabel = end ? formatDate(end, c) : c.ui.current;
  const endAttr = end ? ` datetime="${end}"` : "";
  return `<time datetime="${start}">${formatDate(start, c)}</time> – ${
    end ? `<time${endAttr}>${endLabel}</time>` : endLabel
  }${ongoing ? ` <span class="muted">(${c.ui.ongoing})</span>` : ""}`;
};

const tags = (items: string[], label: string) =>
  `<ul class="tags" aria-label="${esc(label)}">${items
    .map((t) => `<li class="tag">${esc(t)}</li>`)
    .join("")}</ul>`;

/** "Flutter • C#/.NET • React" com o separador em accent. */
const stackLine = (items: string[]) =>
  items.map((t) => `<span>${esc(t)}</span>`).join(`<span class="sep" aria-hidden="true"> • </span>`);

const promptLink = (href: string, extraClass = "") => {
  const text = href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  return `<a class="prompt ${extraClass}" href="${esc(href)}" rel="me noopener" target="_blank"><span class="prompt-sign" aria-hidden="true">&gt;</span> ${esc(text)}</a>`;
};

const header = (c: SiteContent) => `
<a class="skip-link" href="#conteudo">${esc(c.ui.skipLink)}</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="./" aria-label="jonatassennas, início">
      <span class="prompt-sign" aria-hidden="true">&gt;</span> jonatassennas
    </a>
    <nav aria-label="${esc(c.ui.navLabel)}">
      <ul class="nav-list">
        ${c.nav.map((l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`).join("")}
      </ul>
    </nav>
  </div>
</header>`;

const status = (c: SiteContent) => `
<div class="status-bar">
  <p class="container status"><span class="status-dot" aria-hidden="true"></span><span class="status-label">${esc(
    c.status.label,
  )}:</span> ${esc(c.status.text)}</p>
</div>`;

const hero = (c: SiteContent) => `
<section class="hero" aria-labelledby="hero-title">
  <div class="container hero-grid">
    <div class="hero-text">
      <p class="eyebrow">${esc(c.hero.eyebrow)}</p>
      <h1 id="hero-title" class="display-xl">${esc(c.person.name)}</h1>
      <p class="hero-stack">${stackLine(c.hero.stack)}</p>
      <p class="lead">${esc(c.hero.lead)}</p>
      <p class="hero-intro">${esc(c.hero.intro)}</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="${c.hero.cta.href}">${esc(c.hero.cta.label)}</a>
        ${promptLink(c.person.github, "prompt-cursor")}
      </div>
    </div>
    <div class="hero-photo">
      <picture>
        <source srcset="/img/jonatas-sennas.webp" type="image/webp">
        <img src="/img/jonatas-sennas.jpg" alt="${esc(c.person.photoAlt)}" width="400" height="400" fetchpriority="high" decoding="async">
      </picture>
    </div>
  </div>
</section>`;

const sectionHead = (id: string, eyebrow: string, heading: string) => `
  <p class="eyebrow">${esc(eyebrow)}</p>
  <h2 id="${id}-title" class="heading">${esc(heading)}</h2>`;

const experienceItem = (e: Experience, c: SiteContent) => `
<li>
  <article class="xp-card">
    <p class="xp-period">${period(e.start, e.end, c)}${e.location ? `<br><span class="muted">${esc(e.location)}</span>` : ""}</p>
    <div class="xp-body">
      <h3 class="title">${esc(e.company)}</h3>
      <p class="xp-role">${esc(e.role)}</p>
      ${e.summary ? `<p>${esc(e.summary)}</p>` : ""}
      <ul class="xp-list">${e.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
      ${tags(e.stack, `${c.ui.stackLabel}: ${e.company}`)}
    </div>
  </article>
</li>`;

const experience = (c: SiteContent) => `
<section id="experiencia" class="section" aria-labelledby="experiencia-title">
  <div class="container">
    ${sectionHead("experiencia", c.experience.eyebrow, c.experience.heading)}
    <ol class="xp-timeline">${c.experience.items.map((e) => experienceItem(e, c)).join("")}</ol>
  </div>
</section>`;

const project = (c: SiteContent) => `
<section id="projeto" class="section section-alt" aria-labelledby="projeto-title">
  <div class="container project-grid">
    <div class="project-visual">
      <img src="/img/jotline-icon.svg" alt="${esc(c.project.iconAlt)}" width="160" height="160" loading="lazy" decoding="async">
    </div>
    <div class="project-text">
      ${sectionHead("projeto", c.project.eyebrow, c.project.heading)}
      ${c.project.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
      <div class="project-stacks">
        <div>
          <h3 class="label-heading">${esc(c.ui.stackLabel)}</h3>
          ${tags(c.project.stackNow, `${c.ui.stackLabel}: Jotline`)}
        </div>
        <div>
          <h3 class="label-heading">${esc(c.ui.plannedLabel)}</h3>
          ${tags(c.project.stackPlanned, `${c.ui.plannedLabel}: Jotline`)}
        </div>
      </div>
      ${promptLink(c.project.repo)}
    </div>
  </div>
</section>`;

const educationItem = (e: Education, c: SiteContent) => `
<li class="edu">
  <p class="edu-period">${period(e.start, e.end, c, e.ongoing)}</p>
  <p class="edu-course">${esc(e.course)}</p>
  <p class="edu-inst">${esc(e.institution)}</p>
</li>`;

const journey = (c: SiteContent) => `
<section id="trajetoria" class="section" aria-labelledby="trajetoria-title">
  <div class="container journey-grid">
    <div class="journey-text">
      ${sectionHead("trajetoria", c.journey.eyebrow, c.journey.heading)}
      ${c.journey.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
    </div>
    <div class="journey-edu">
      <h3 class="label-heading">${esc(c.journey.educationHeading)}</h3>
      <ol class="edu-list">${c.journey.education.map((e) => educationItem(e, c)).join("")}</ol>
    </div>
  </div>
</section>`;

/** Seção planejada. Só aparece quando learnings.enabled = true e há notas. */
const learnings = (c: SiteContent) => {
  if (!c.learnings.enabled || c.learnings.notes.length === 0) return "";
  return `
<section id="aprendizados" class="section section-alt" aria-labelledby="aprendizados-title">
  <div class="container">
    ${sectionHead("aprendizados", c.learnings.eyebrow, c.learnings.heading)}
    <ul class="notes">${c.learnings.notes
      .map(
        (n) => `<li class="note-card"><article>
          <p class="xp-period"><time datetime="${n.date}">${formatDate(n.date, c)}</time></p>
          <h3 class="title">${esc(n.title)}</h3>
          <p>${esc(n.summary)}</p>
          ${tags(n.tags, n.title)}
        </article></li>`,
      )
      .join("")}</ul>
  </div>
</section>`;
};

const contact = (c: SiteContent) => {
  const p = c.person;
  const rows: [string, string, string, boolean][] = [
    [c.contact.labels.email, `mailto:${p.email}`, p.email, false],
    [c.contact.labels.phone, `tel:${p.phone}`, p.phoneDisplay, false],
    [c.contact.labels.linkedin, p.linkedin, "linkedin.com/in/jonatassennas", true],
    [c.contact.labels.github, p.github, "github.com/djotanas", true],
  ];
  return `
<section id="contato" class="section section-contact" aria-labelledby="contato-title">
  <div class="container contact-grid">
    <div>
      ${sectionHead("contato", c.contact.eyebrow, c.contact.heading)}
      <p class="lead contact-text">${esc(c.contact.text)}</p>
      <a class="btn btn-primary" href="mailto:${p.email}">${esc(p.email)}</a>
    </div>
    <address class="contact-list">
      <dl>
        ${rows
          .map(
            ([label, href, text, ext]) => `<div class="contact-row"><dt>${esc(label)}</dt><dd><a href="${esc(href)}"${
              ext ? ' rel="me noopener" target="_blank"' : ""
            }>${esc(text)}</a></dd></div>`,
          )
          .join("")}
        <div class="contact-row"><dt>${esc(c.contact.labels.location)}</dt><dd>${esc(p.location)}</dd></div>
      </dl>
    </address>
  </div>
</section>`;
};

const footer = (c: SiteContent) => `
<footer class="site-footer">
  <div class="container footer-inner">
    <p>${esc(c.footer.copyright)}</p>
    <p class="muted"><span class="prompt-sign" aria-hidden="true">&gt;</span> ${esc(c.footer.builtWith)}</p>
  </div>
</footer>`;

export const renderBody = (c: SiteContent): string =>
  [
    header(c),
    status(c),
    `<main id="conteudo" tabindex="-1">`,
    hero(c),
    experience(c),
    project(c),
    journey(c),
    learnings(c),
    contact(c),
    `</main>`,
    footer(c),
  ].join("\n");
