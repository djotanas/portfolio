/**
 * Forma do conteúdo do site. Cada idioma é um arquivo em content/<locale>.ts
 * que exporta um objeto deste tipo. O HTML é gerado no build a partir dele,
 * então o site sai estático e indexável, sem JavaScript para renderizar texto.
 */

export interface Link {
  label: string;
  href: string;
}

export interface Experience {
  company: string;
  role: string;
  /** Datas em ISO (AAAA-MM). `end` vazio = atual. */
  start: string;
  end?: string;
  location?: string;
  summary?: string;
  highlights: string[];
  stack: string[];
}

export interface Education {
  institution: string;
  course: string;
  start: string;
  end: string;
  /** true quando ainda em curso (end é a previsão). */
  ongoing?: boolean;
}

/**
 * Aprendizados: notas curtas sobre o que estou estudando.
 * Planejado para uma fase futura (ver content/learnings/README.md).
 * Enquanto `learnings.enabled` for false, a seção não é renderizada.
 */
export interface LearningNote {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
}

export interface SiteContent {
  locale: string;
  /** URL pública com barra no final. */
  siteUrl: string;
  meta: {
    title: string;
    description: string;
    ogImageAlt: string;
  };
  ui: {
    skipLink: string;
    navLabel: string;
    current: string;
    ongoing: string;
    stackLabel: string;
    plannedLabel: string;
    months: string[];
  };
  person: {
    name: string;
    role: string;
    location: string;
    email: string;
    phone: string;
    phoneDisplay: string;
    linkedin: string;
    github: string;
    photoAlt: string;
  };
  status: {
    label: string;
    text: string;
  };
  nav: Link[];
  hero: {
    eyebrow: string;
    stack: string[];
    lead: string;
    intro: string;
    cta: Link;
  };
  experience: {
    eyebrow: string;
    heading: string;
    items: Experience[];
  };
  project: {
    eyebrow: string;
    heading: string;
    iconAlt: string;
    paragraphs: string[];
    stackNow: string[];
    stackPlanned: string[];
    repo: string;
  };
  journey: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    educationHeading: string;
    education: Education[];
  };
  learnings: {
    enabled: boolean;
    eyebrow: string;
    heading: string;
    notes: LearningNote[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    text: string;
    labels: { email: string; phone: string; linkedin: string; github: string; location: string };
  };
  footer: {
    copyright: string;
    builtWith: string;
  };
}
