import type { SiteContent } from "./types";

/**
 * Fontes: currículo do LinkedIn (out/2026), README e código do repositório
 * github.com/djotanas/jotline e respostas na conversa. Nada além disso.
 */
const content: SiteContent = {
  locale: "pt-BR",
  siteUrl: "https://www.jonatassennas.com.br/",

  meta: {
    title: "Jonatas Sennas | Desenvolvedor Fullstack Flutter e .NET",
    description:
      "Desenvolvedor fullstack pleno no Rio de Janeiro. Construo apps em Flutter, APIs em C#/.NET e interfaces em React. Veja experiência, projeto pessoal e contato.",
    ogImageAlt: "Jonatas Sennas, desenvolvedor fullstack pleno: Flutter, C#/.NET e React",
  },

  ui: {
    skipLink: "Pular para o conteúdo",
    navLabel: "Seções",
    current: "atual",
    ongoing: "em andamento",
    stackLabel: "Stack",
    plannedLabel: "Próximas fases",
    months: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
  },

  person: {
    name: "Jonatas Sennas",
    role: "Desenvolvedor Fullstack Pleno",
    location: "Nova Iguaçu, RJ",
    email: "sennasjonatas@gmail.com",
    phone: "+5521964050775",
    phoneDisplay: "(21) 96405-0775",
    linkedin: "https://www.linkedin.com/in/jonatassennas/",
    github: "https://github.com/djotanas",
    photoAlt: "Foto de Jonatas Sennas sorrindo, de camisa branca",
  },

  status: {
    label: "status",
    text: "Fullstack pleno na Aride, aberto a conversar sobre novas oportunidades",
  },

  nav: [
    { label: "Experiência", href: "#experiencia" },
    { label: "Projeto", href: "#projeto" },
    { label: "Trajetória", href: "#trajetoria" },
    { label: "Contato", href: "#contato" },
  ],

  hero: {
    eyebrow: "Desenvolvedor fullstack pleno",
    stack: ["Flutter", "C#/.NET", "React"],
    lead: "Soluções completas, da tela à API.",
    intro:
      "Como trabalho com Flutter, Dart e C#/.NET, entendo o produto de ponta a ponta, do app ao serviço que o sustenta. Hoje sou desenvolvedor fullstack na Aride e, como voluntário, desenvolvo o app da Associação Mama Thula.",
    cta: { label: "Entrar em contato", href: "#contato" },
  },

  experience: {
    eyebrow: "01 / Experiência",
    heading: "Experiência como desenvolvedor fullstack, mobile Flutter e backend .NET",
    items: [
      {
        company: "Aride Brasil",
        role: "Desenvolvedor Fullstack Pleno",
        start: "2026-09",
        location: "Niterói, RJ",
        highlights: [
          "Atuei no desenvolvimento do módulo de campanhas de notificação e entreguei os fluxos de criação e edição, os filtros de busca e a moderação nas duas primeiras semanas após a contratação.",
          "Atuo na reestruturação do harness da equipe, aplicando princípios como progressive disclosure para reduzir o gasto de tokens.",
        ],
        stack: [
          "C#", ".NET 8", "CQRS", "DDD", "SQS", "MySQL", "Hangfire", "React", "TypeScript",
          "Vite", "Tailwind CSS", "TanStack Query", "Vitest", "Playwright",
          "Bitbucket Pipelines", "Jira", "Claude Code",
        ],
      },
      {
        company: "MamaThula",
        role: "Desenvolvedor Mobile Flutter (voluntário)",
        start: "2026-09",
        location: "Remoto",
        summary:
          "Desenvolvo o app mobile da Associação Mama Thula, que apoia famílias com acesso à justiça e acolhimento. O app reúne acompanhamento de processos, busca de pessoa, SOS, agendamento de atendimento e orientações jurídicas.",
        highlights: [
          "Evoluo e corrijo funcionalidades em Flutter com Clean Architecture e MVVM.",
          "Integro o app ao Supabase: Auth, Postgres, RPC, Storage e Edge Functions.",
          "Escrevo testes unitários e de widget com o pacote flutter_test.",
        ],
        stack: ["Flutter", "Dart", "Supabase", "Provider", "Clean Architecture", "MVVM", "GitHub Actions"],
      },
      {
        company: "TopMed Saúde Digital",
        role: "Desenvolvedor de Software, Mobile Flutter e Backend C#/.NET",
        start: "2024-03",
        end: "2026-08",
        summary:
          "Ajudei a construir e manter o Saúde 24h, app em Flutter que apoia a operação de telemedicina da empresa, com arquitetura mobile modular integrada aos serviços em .NET.",
        highlights: [
          "Desenvolvi e mantive integrações em tempo real entre Flutter e .NET, com Server-Sent Events e Firebase Cloud Messaging, que reduziram de forma consistente o não comparecimento de pacientes às consultas.",
          "Implementei uma API em tempo real com WebSockets e SignalR para a comunicação entre paciente e enfermeiro. O canal substituiu videochamadas e simplificou o atendimento com menor custo operacional.",
          "Configurei pipelines de CI/CD no Azure DevOps, o que deixou as entregas em produção e homologação mais rápidas e confiáveis.",
          "Criei dashboards no Grafana para monitorar as APIs REST e os WebSockets, acelerando a identificação de problemas em produção.",
          "Implementei padrões de Clean Architecture para reduzir o acoplamento do código.",
        ],
        stack: [
          "Flutter", "Dart", "MobX", "Flutter Modular", "C#", ".NET", "SQL Server",
          "Entity Framework", "SignalR", "Firebase Cloud Messaging", "Azure DevOps", "Grafana",
        ],
      },
    ],
  },

  project: {
    eyebrow: "02 / Projeto pessoal",
    heading: "Jotline, app de notas offline-first",
    iconAlt: "Ícone do Jotline",
    paragraphs: [
      "O Jotline é um app mobile de notas organizado em cadernos. A proposta é funcionar inteiro sem internet e sincronizar sozinho quando a conexão volta: o aparelho é a fonte da verdade para quem escreve, e a nuvem serve de backup e de ponte entre dispositivos.",
      "O projeto está na fase 1, um app local sem conta e sem servidor, com cadernos, páginas, editor de blocos e lixeira sobre SQLite. As próximas fases preveem conta e sincronização entre aparelhos e, depois, compartilhamento com papéis e histórico de versões.",
      "Registro cada decisão de arquitetura em ADRs no repositório (37 até agora), da escolha do SQLite local ao modelo de blocos do editor.",
    ],
    stackNow: ["Flutter", "Dart", "Riverpod", "Drift", "SQLite"],
    stackPlanned: ["ASP.NET Core 10", "EF Core 10", "Postgres", "Supabase", "PowerSync"],
    repo: "https://github.com/djotanas/jotline",
  },

  journey: {
    eyebrow: "03 / Trajetória",
    heading: "Da farmácia ao desenvolvimento",
    paragraphs: [
      "Comecei na tecnologia com o técnico em Informática do Cefet/RJ. Depois cursei Farmácia na UFRRJ e, em 2022, mudei de carreira para o desenvolvimento de software com a formação em Engenharia de Software da Driven. Hoje curso Tecnologia em Sistemas de Computação na UFF.",
      "Participo da comunidade Tech Leads Club, onde estudo desenvolvimento assistido por IA, acompanho workshops e faço parte do clube do livro, que agora lê Software Architecture: The Hard Parts. No médio prazo, quero chegar à liderança técnica: sempre gostei de mentorar pessoas e de compartilhar o que aprendo.",
    ],
    educationHeading: "Formação",
    education: [
      {
        institution: "Universidade Federal Fluminense (UFF)",
        course: "Tecnologia em Sistemas de Computação",
        start: "2025-03",
        end: "2028-12",
        ongoing: true,
      },
      {
        institution: "Driven Education",
        course: "Engenharia de Software",
        start: "2022-09",
        end: "2023-07",
      },
      {
        institution: "Universidade Federal Rural do Rio de Janeiro (UFRRJ)",
        course: "Bacharelado em Farmácia",
        start: "2017",
        end: "2023",
      },
      {
        institution: "Cefet/RJ",
        course: "Técnico Integrado em Informática",
        start: "2014-02",
        end: "2017-05",
      },
    ],
  },

  learnings: {
    enabled: false,
    eyebrow: "04 / Aprendizados",
    heading: "O que estou estudando",
    notes: [],
  },

  contact: {
    eyebrow: "04 / Contato",
    heading: "Contato",
    text: "Aberto a conversar sobre novas oportunidades.",
    button: "Enviar e-mail",
    labels: { email: "E-mail", phone: "Telefone", linkedin: "LinkedIn", github: "GitHub", location: "Local" },
  },

  footer: {
    copyright: "© 2026 Jonatas Sennas",
    builtWith: "feito com Vite",
  },
};

export default content;
