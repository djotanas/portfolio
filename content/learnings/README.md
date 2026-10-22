# Aprendizados (planejado)

Espaço para notas curtas sobre o que estou estudando. Ainda desligado.

## Como está preparado hoje

- O tipo `LearningNote` (em `content/types.ts`) define cada nota: `slug`, `title`, `date`, `summary`, `tags`.
- `content/pt-BR.ts` tem o bloco `learnings` com `enabled: false` e `notes: []`.
- `src/render/page.ts` já renderiza a seção `#aprendizados` (cartões em grade) entre Trajetória e Contato. Ela só aparece com `enabled: true` e pelo menos uma nota.

## Fase 1: seção na home

1. Adicione notas em `learnings.notes`.
2. Mude `enabled` para `true`.
3. Renumere os eyebrows: Aprendizados vira `04`, Contato vira `05`.
4. Adicione `{ label: "Aprendizados", href: "#aprendizados" }` em `nav`.

## Fase 2: uma página por nota (quando o texto crescer)

- Guarde cada nota como `content/learnings/<slug>.md` com frontmatter (title, date, summary, tags).
- No plugin `static-site` (`vite.config.ts`), leia os arquivos, gere `aprendizados/<slug>/index.html` e uma página de índice `aprendizados/index.html`, e adicione as URLs ao sitemap e ao `llms.txt`.
- Cada página leva JSON-LD `BlogPosting` com `author` apontando para `#person`.
- Os cartões da home passam a linkar para a página da nota.
