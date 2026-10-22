import type { SiteContent } from "../../content/types";

/** /llms.txt: o mesmo conteúdo do site em Markdown, para agentes e LLMs. */
export const renderLlmsTxt = (c: SiteContent): string => {
  const p = c.person;
  const range = (s: string, e?: string) => `${s} – ${e ?? c.ui.current}`;
  const lines = [
    `# ${p.name}`,
    "",
    `> ${p.role}. ${c.hero.stack.join(", ")}. ${c.hero.lead}`,
    "",
    c.hero.intro,
    "",
    `- Site: ${c.siteUrl}`,
    `- E-mail: ${p.email}`,
    `- ${c.contact.labels.phone}: ${p.phoneDisplay}`,
    `- LinkedIn: ${p.linkedin}`,
    `- GitHub: ${p.github}`,
    `- ${c.contact.labels.location}: ${p.location}`,
    `- ${c.status.label}: ${c.status.text}`,
    "",
    `## ${c.experience.heading}`,
    "",
    ...c.experience.items.flatMap((e) => [
      `### ${e.company} · ${e.role} (${range(e.start, e.end)})`,
      "",
      ...(e.summary ? [e.summary, ""] : []),
      ...e.highlights.map((h) => `- ${h}`),
      "",
      `${c.ui.stackLabel}: ${e.stack.join(", ")}`,
      "",
    ]),
    `## ${c.project.heading}`,
    "",
    ...c.project.paragraphs.flatMap((t) => [t, ""]),
    `${c.ui.stackLabel}: ${c.project.stackNow.join(", ")}`,
    `${c.ui.plannedLabel}: ${c.project.stackPlanned.join(", ")}`,
    `Repositório: ${c.project.repo}`,
    "",
    `## ${c.journey.heading}`,
    "",
    ...c.journey.paragraphs.flatMap((t) => [t, ""]),
    `### ${c.journey.educationHeading}`,
    "",
    ...c.journey.education.map(
      (e) => `- ${e.course}, ${e.institution} (${range(e.start, e.end)}${e.ongoing ? `, ${c.ui.ongoing}` : ""})`,
    ),
    "",
  ];
  return lines.join("\n");
};
