export const portfolioData = {
  pt: {
    hero: {
      title: "Projetando produtos digitais de alto impacto com clareza e estratégia.",
      subtitle: "Senior Product Designer especializada em UX/UI e experiência de produtos digitais.",
      cta: {
        primary: "Ver Projetos",
        secondary: "Entrar em Contato"
      }
    },
    about: {
      title: "Sobre Mim",
      bio: [
        "Sou uma Senior Product Designer com mais de 8 anos de experiência criando produtos digitais que fazem a diferença. Especialista em Interaction Design pela CESAR School, tenho paixão por transformar problemas complexos em soluções elegantes e centradas no usuário.",
        "Minha abordagem combina pensamento estratégico de produto com excelência em design visual. Trabalho end-to-end, desde a descoberta e pesquisa até a entrega final e medição de impacto.",
        "Colaborei com times de produto em grandes empresas e projetos governamentais, sempre focada em criar experiências que realmente importam para as pessoas."
      ],
      differentials: [
        "Visão estratégica de produto aliada a execução impecável",
        "Experiência com projetos de alto impacto em governo e grandes empresas",
        "Atuação end-to-end em todo o ciclo de vida do produto",
        "Liderança em pesquisa, discovery e validação de soluções"
      ],
      skills: [
        { name: "UX Research", description: "Entrevistas, surveys, testes de usabilidade e análise de dados" },
        { name: "UI Design", description: "Design visual, design systems e prototipação" },
        { name: "Product Thinking", description: "Estratégia de produto, roadmap e priorização" },
        { name: "Prototyping", description: "Figma, Adobe XD, Sketch e ferramentas de prototipação" },
        { name: "Design Systems", description: "Criação e manutenção de sistemas de design escaláveis" },
        { name: "User Testing", description: "Planejamento e execução de testes com usuários" }
      ]
    },
    projects: [
      {
        id: "bids",
        title: "BIDS - Boletim Integrado de Defesa Social",
        description: "Redesign completo do sistema de registro de boletins de ocorrência para cidadãos e policiais, reduzindo barreiras de acesso e aumentando a eficiência do processo.",
        tags: ["Governo", "UX Research", "Service Design"],
        category: "Government",
        nda: false,
        hero: {
          title: "BIDS - Boletim Integrado de Defesa Social",
          subtitle: "Transformando o registro de ocorrências policiais em Pernambuco",
          client: "Secretaria de Defesa Social - Governo de Pernambuco",
          role: "Lead Product Designer",
          year: "2022-2023"
        },
        context: {
          title: "Contexto",
          description: "Os cidadãos e policiais enfrentavam barreiras significativas ao registrar boletins de ocorrência. O processo era moroso, fragmentado e gerava retrabalho. O desafio era: como transformar a experiência de registro para ambas as populações, reduzindo barreiras e melhorando a eficiência?"
        },
        challenge: {
          title: "O Desafio",
          description: "Criar um sistema integrado que atendesse às necessidades distintas de cidadãos (acesso simples e rápido) e policiais (workflow eficiente e dados confiáveis), enquanto garantia a segurança e integridade das informações."
        },
        process: {
          title: "Processo",
          steps: [
            {
              name: "Research",
              description: "Realizamos 100+ pesquisas com policiais e 20 entrevistas com cidadãos (18-55 anos). Analisamos 4 delegacias virtuais em diferentes estados do Brasil."
            },
            {
              name: "Discovery",
              description: "Mapeamos as principais dores: acesso limitado, falta de feedback, retrabalho e dados inconsistentes. Priorizamos soluções com base em impacto e viabilidade."
            },
            {
              name: "Ideation",
              description: "Co-criação com stakeholders para definir três interfaces distintas: portal cidadão, sistema policial e dashboards de gestão."
            },
            {
              name: "Validation",
              description: "Testes de usabilidade com protótipos de alta fidelidade validaram a solução antes do desenvolvimento."
            }
          ]
        },
        solution: {
          title: "Solução",
          description: "Criamos o BIDS - um sistema integrado com:",
          features: [
            "Portal do Cidadão: registro online com autenticação gov.br",
            "Sistema Policial: workflow otimizado com dashboards e filtros",
            "Interface Interativa: atualização das delegacias presenciais",
            "Integração de Dados: redução de retrabalho e maior confiabilidade estatística"
          ]
        },
        impact: {
          title: "Impacto",
          results: [
            "Registro mais rápido e acessível para cidadãos",
            "Workflows policiais padronizados e eficientes",
            "Dados de segurança pública mais confiáveis",
            "Redução significativa de retrabalho"
          ]
        }
      },
      {
        id: "enterprise-mobile",
        title: "Enterprise Mobile Platform",
        description: "Plataforma mobile empresarial para gestão de força de trabalho em campo, otimizando processos e aumentando produtividade.",
        tags: ["Enterprise", "Mobile", "NDA"],
        category: "Enterprise",
        nda: true,
        hero: {
          title: "Enterprise Mobile Platform",
          subtitle: "Transformando a gestão de operações em campo",
          client: "Leading Tech Enterprise",
          role: "Senior Product Designer",
          year: "2021-2022"
        },
        context: {
          title: "Contexto",
          description: "Uma grande empresa de tecnologia precisava modernizar suas operações de campo, onde milhares de técnicos gerenciavam tarefas diárias sem ferramentas adequadas. O objetivo era criar uma plataforma mobile que centralizasse informações e otimizasse workflows."
        },
        challenge: {
          title: "O Desafio",
          description: "Criar uma experiência mobile intuitiva para usuários com diferentes níveis de alfabetização digital, funcionando offline e sincronizando dados de forma confiável em áreas com conectividade limitada."
        },
        process: {
          title: "Processo",
          steps: [
            {
              name: "Research",
              description: "Shadowing de técnicos em campo, entrevistas com gestores e análise de workflows existentes."
            },
            {
              name: "Discovery",
              description: "Identificamos que 60% do tempo era perdido em tarefas administrativas manuais. Oportunidade: automatização e simplificação."
            },
            {
              name: "Design",
              description: "Criamos um design system mobile-first com componentes otimizados para uso com uma mão e em ambientes externos."
            },
            {
              name: "Testing",
              description: "Testes em campo com protótipos validaram a usabilidade em condições reais."
            }
          ]
        },
        solution: {
          title: "Solução",
          description: "Plataforma mobile com:",
          features: [
            "Dashboard visual com tarefas priorizadas",
            "Modo offline com sincronização automática",
            "Captura de fotos e assinaturas digitais",
            "Navegação simplificada e acessível",
            "Notificações inteligentes"
          ]
        },
        impact: {
          title: "Impacto",
          results: [
            "40% de redução no tempo de tarefas administrativas",
            "Aumento na satisfação dos técnicos de campo",
            "Melhoria na qualidade dos dados coletados",
            "ROI positivo em 6 meses"
          ]
        }
      },
      {
        id: "design-system",
        title: "Corporate Design System",
        description: "Criação de um design system corporativo escalável para unificar a experiência de produtos em múltiplas plataformas.",
        tags: ["Design System", "Enterprise", "NDA"],
        category: "Enterprise",
        nda: true,
        hero: {
          title: "Corporate Design System",
          subtitle: "Unificando a experiência de produtos digitais",
          client: "Global Technology Company",
          role: "Lead Designer - Design System",
          year: "2020-2021"
        },
        context: {
          title: "Contexto",
          description: "A empresa possuía mais de 15 produtos digitais, cada um com sua própria linguagem visual e padrões de interação. Isso gerava inconsistência na experiência do usuário e retrabalho constante para os times de design e desenvolvimento."
        },
        challenge: {
          title: "O Desafio",
          description: "Criar um sistema de design robusto e escalável que pudesse ser adotado por múltiplos times, mantendo consistência sem limitar a criatividade, e que fosse tecnicamente viável para diferentes stacks."
        },
        process: {
          title: "Processo",
          steps: [
            {
              name: "Audit",
              description: "Auditoria completa de todos os produtos existentes, catalogando componentes, padrões e inconsistências."
            },
            {
              name: "Foundation",
              description: "Definição de fundamentos: tipografia, cores, espaçamento, iconografia e princípios de design."
            },
            {
              name: "Components",
              description: "Criação de biblioteca de componentes reutilizáveis com documentação detalhada."
            },
            {
              name: "Adoption",
              description: "Estratégia de adoção gradual com treinamentos e suporte aos times."
            }
          ]
        },
        solution: {
          title: "Solução",
          description: "Design System completo com:",
          features: [
            "60+ componentes documentados",
            "Biblioteca Figma com variantes e auto-layout",
            "Tokens de design exportáveis para código",
            "Guidelines de acessibilidade (WCAG 2.1 AA)",
            "Documentação interativa com exemplos de uso"
          ]
        },
        impact: {
          title: "Impacto",
          results: [
            "50% de redução no tempo de design de novas features",
            "Consistência visual em todos os produtos",
            "Adoção por 100% dos times em 12 meses",
            "Melhoria nas métricas de acessibilidade"
          ]
        }
      },
      {
        id: "transparency-portal",
        title: "Portal da Transparência",
        description: "Portal de transparência governamental para facilitar o acesso dos cidadãos a informações públicas de forma clara e acessível.",
        tags: ["Governo", "Acessibilidade", "UX"],
        category: "Government",
        nda: false,
        hero: {
          title: "Portal da Transparência",
          subtitle: "Democratizando o acesso à informação pública",
          client: "Governo de Pernambuco",
          role: "Product Designer",
          year: "2021"
        },
        context: {
          title: "Contexto",
          description: "O portal existente tinha baixa adesão e dificuldades de navegação. Cidadãos relatavam frustração ao buscar informações sobre gastos públicos, contratos e outras informações de transparência."
        },
        challenge: {
          title: "O Desafio",
          description: "Redesenhar a experiência para tornar informações complexas acessíveis e compreensíveis para cidadãos com diferentes níveis de educação e alfabetização digital."
        },
        process: {
          title: "Processo",
          steps: [
            {
              name: "Research",
              description: "Pesquisa com cidadãos, análise de dados de uso e benchmarking de portais de outros estados."
            },
            {
              name: "Information Architecture",
              description: "Reestruturação completa da arquitetura de informação com base em card sorting e tree testing."
            },
            {
              name: "Design",
              description: "Criação de interfaces acessíveis (WCAG 2.1 AA) com visualizações de dados simplificadas."
            },
            {
              name: "Testing",
              description: "Testes de usabilidade com diferentes perfis de usuários."
            }
          ]
        },
        solution: {
          title: "Solução",
          description: "Portal redesenhado com:",
          features: [
            "Busca inteligente com filtros intuitivos",
            "Visualizações de dados simplificadas",
            "Acessibilidade WCAG 2.1 AA",
            "Downloads de dados abertos",
            "Interface responsiva"
          ]
        },
        impact: {
          title: "Impacto",
          results: [
            "Aumento de 200% no acesso ao portal",
            "Redução de 60% nas solicitações de suporte",
            "Feedback positivo de 85% dos usuários",
            "Reconhecimento em prêmio de inovação governamental"
          ]
        }
      }
    ],
    experience: [
      {
        role: "Senior Product Designer",
        company: "Samsung Electronics",
        period: "2020 - 2023",
        current: false,
        description: [
          "Liderei o design de produtos mobile para plataformas corporativas",
          "Criei e mantive design system usado por múltiplos times",
          "Colaborei com times globais em projetos de alto impacto",
          "Conduzi pesquisas de UX e testes de usabilidade em larga escala"
        ]
      },
      {
        role: "Product Designer",
        company: "Secretaria de Defesa Social - Governo de Pernambuco",
        period: "2022 - 2023",
        current: false,
        description: [
          "Liderei o redesign do sistema BIDS de boletins de ocorrência",
          "Realizei pesquisas com 100+ policiais e 20 cidadãos",
          "Colaborei com equipes multidisciplinares (dev, PM, stakeholders)",
          "Entreguei solução que melhorou significativamente a eficiência operacional"
        ]
      },
      {
        role: "UX/UI Designer",
        company: "Facilit Tecnologia",
        period: "2018 - 2020",
        current: false,
        description: [
          "Desenvolvi produtos digitais para clientes do setor financeiro e varejo",
          "Criei protótipos de alta fidelidade e conduzi testes de usabilidade",
          "Trabalhei em metodologias ágeis com times de desenvolvimento",
          "Contribuí para a criação de processos de design da empresa"
        ]
      },
      {
        role: "Designer",
        company: "Diário de Pernambuco",
        period: "2016 - 2018",
        current: false,
        description: [
          "Design editorial digital e impresso",
          "Criação de interfaces para produtos digitais do jornal",
          "Colaboração com equipe de conteúdo e jornalismo",
          "Otimização de experiência de leitura em plataformas digitais"
        ]
      }
    ],
    contact: {
      title: "Vamos construir algo impactante juntos.",
      description: "Estou sempre aberta a discutir novos projetos, oportunidades criativas ou parcerias. Entre em contato!",
      email: "keziahcosta@gmail.com",
      location: "Recife, Brasil",
      cta: "Enviar mensagem"
    }
  },
  en: {
    hero: {
      title: "Designing high-impact digital products with clarity and strategy.",
      subtitle: "Senior Product Designer specialized in UX/UI and digital product experience.",
      cta: {
        primary: "View Projects",
        secondary: "Get in Touch"
      }
    },
    about: {
      title: "About Me",
      bio: [
        "I'm a Senior Product Designer with over 8 years of experience creating digital products that make a difference. Specialist in Interaction Design from CESAR School, I'm passionate about transforming complex problems into elegant, user-centered solutions.",
        "My approach combines strategic product thinking with visual design excellence. I work end-to-end, from discovery and research to final delivery and impact measurement.",
        "I've collaborated with product teams at major companies and government projects, always focused on creating experiences that truly matter to people."
      ],
      differentials: [
        "Strategic product vision coupled with flawless execution",
        "Experience with high-impact projects in government and large enterprises",
        "End-to-end ownership across the entire product lifecycle",
        "Leadership in research, discovery, and solution validation"
      ],
      skills: [
        { name: "UX Research", description: "Interviews, surveys, usability testing, and data analysis" },
        { name: "UI Design", description: "Visual design, design systems, and prototyping" },
        { name: "Product Thinking", description: "Product strategy, roadmap, and prioritization" },
        { name: "Prototyping", description: "Figma, Adobe XD, Sketch, and prototyping tools" },
        { name: "Design Systems", description: "Creation and maintenance of scalable design systems" },
        { name: "User Testing", description: "Planning and execution of user testing" }
      ]
    },
    projects: [
      {
        id: "bids",
        title: "BIDS - Integrated Public Safety Report",
        description: "Complete redesign of the police report registration system for citizens and police officers, reducing access barriers and increasing process efficiency.",
        tags: ["Government", "UX Research", "Service Design"],
        category: "Government",
        nda: false,
        hero: {
          title: "BIDS - Integrated Public Safety Report",
          subtitle: "Transforming police reporting in Pernambuco",
          client: "Public Safety Secretariat - Pernambuco Government",
          role: "Lead Product Designer",
          year: "2022-2023"
        },
        context: {
          title: "Context",
          description: "Citizens and police officers faced significant barriers when filing police reports. The process was slow, fragmented, and generated rework. The challenge was: how can we transform the registration experience for both populations, reducing barriers and improving efficiency?"
        },
        challenge: {
          title: "The Challenge",
          description: "Create an integrated system that met the distinct needs of citizens (simple and fast access) and police officers (efficient workflow and reliable data), while ensuring information security and integrity."
        },
        process: {
          title: "Process",
          steps: [
            {
              name: "Research",
              description: "We conducted 100+ surveys with police officers and 20 interviews with citizens (ages 18-55). Analyzed virtual police stations in 4 different Brazilian states."
            },
            {
              name: "Discovery",
              description: "Mapped key pain points: limited access, lack of feedback, rework, and inconsistent data. Prioritized solutions based on impact and feasibility."
            },
            {
              name: "Ideation",
              description: "Co-creation with stakeholders to define three distinct interfaces: citizen portal, police system, and management dashboards."
            },
            {
              name: "Validation",
              description: "Usability testing with high-fidelity prototypes validated the solution before development."
            }
          ]
        },
        solution: {
          title: "Solution",
          description: "We created BIDS - an integrated system with:",
          features: [
            "Citizen Portal: online registration with gov.br authentication",
            "Police System: optimized workflow with dashboards and filters",
            "Interactive Interface: updated in-person precinct systems",
            "Data Integration: reduced rework and improved statistical reliability"
          ]
        },
        impact: {
          title: "Impact",
          results: [
            "Faster and more accessible registration for citizens",
            "Standardized and efficient police workflows",
            "More reliable public safety data",
            "Significant reduction in rework"
          ]
        }
      },
      {
        id: "enterprise-mobile",
        title: "Enterprise Mobile Platform",
        description: "Enterprise mobile platform for field workforce management, optimizing processes and increasing productivity.",
        tags: ["Enterprise", "Mobile", "NDA"],
        category: "Enterprise",
        nda: true,
        hero: {
          title: "Enterprise Mobile Platform",
          subtitle: "Transforming field operations management",
          client: "Leading Tech Enterprise",
          role: "Senior Product Designer",
          year: "2021-2022"
        },
        context: {
          title: "Context",
          description: "A major technology company needed to modernize its field operations, where thousands of technicians managed daily tasks without adequate tools. The goal was to create a mobile platform that centralized information and optimized workflows."
        },
        challenge: {
          title: "The Challenge",
          description: "Create an intuitive mobile experience for users with varying levels of digital literacy, working offline and reliably syncing data in areas with limited connectivity."
        },
        process: {
          title: "Process",
          steps: [
            {
              name: "Research",
              description: "Field technician shadowing, manager interviews, and existing workflow analysis."
            },
            {
              name: "Discovery",
              description: "Identified that 60% of time was wasted on manual administrative tasks. Opportunity: automation and simplification."
            },
            {
              name: "Design",
              description: "Created a mobile-first design system with components optimized for one-handed use and outdoor environments."
            },
            {
              name: "Testing",
              description: "Field testing with prototypes validated usability under real conditions."
            }
          ]
        },
        solution: {
          title: "Solution",
          description: "Mobile platform with:",
          features: [
            "Visual dashboard with prioritized tasks",
            "Offline mode with automatic sync",
            "Photo capture and digital signatures",
            "Simplified and accessible navigation",
            "Smart notifications"
          ]
        },
        impact: {
          title: "Impact",
          results: [
            "40% reduction in administrative task time",
            "Increased field technician satisfaction",
            "Improved quality of collected data",
            "Positive ROI in 6 months"
          ]
        }
      },
      {
        id: "design-system",
        title: "Corporate Design System",
        description: "Creation of a scalable corporate design system to unify product experience across multiple platforms.",
        tags: ["Design System", "Enterprise", "NDA"],
        category: "Enterprise",
        nda: true,
        hero: {
          title: "Corporate Design System",
          subtitle: "Unifying digital product experience",
          client: "Global Technology Company",
          role: "Lead Designer - Design System",
          year: "2020-2021"
        },
        context: {
          title: "Context",
          description: "The company had over 15 digital products, each with its own visual language and interaction patterns. This generated user experience inconsistency and constant rework for design and development teams."
        },
        challenge: {
          title: "The Challenge",
          description: "Create a robust and scalable design system that could be adopted by multiple teams, maintaining consistency without limiting creativity, and technically viable for different stacks."
        },
        process: {
          title: "Process",
          steps: [
            {
              name: "Audit",
              description: "Complete audit of all existing products, cataloging components, patterns, and inconsistencies."
            },
            {
              name: "Foundation",
              description: "Definition of foundations: typography, colors, spacing, iconography, and design principles."
            },
            {
              name: "Components",
              description: "Creation of reusable component library with detailed documentation."
            },
            {
              name: "Adoption",
              description: "Gradual adoption strategy with training and team support."
            }
          ]
        },
        solution: {
          title: "Solution",
          description: "Complete Design System with:",
          features: [
            "60+ documented components",
            "Figma library with variants and auto-layout",
            "Design tokens exportable to code",
            "Accessibility guidelines (WCAG 2.1 AA)",
            "Interactive documentation with usage examples"
          ]
        },
        impact: {
          title: "Impact",
          results: [
            "50% reduction in design time for new features",
            "Visual consistency across all products",
            "100% team adoption in 12 months",
            "Improved accessibility metrics"
          ]
        }
      },
      {
        id: "transparency-portal",
        title: "Transparency Portal",
        description: "Government transparency portal to facilitate citizen access to public information in a clear and accessible way.",
        tags: ["Government", "Accessibility", "UX"],
        category: "Government",
        nda: false,
        hero: {
          title: "Transparency Portal",
          subtitle: "Democratizing access to public information",
          client: "Pernambuco Government",
          role: "Product Designer",
          year: "2021"
        },
        context: {
          title: "Context",
          description: "The existing portal had low adoption and navigation difficulties. Citizens reported frustration when searching for information about public spending, contracts, and other transparency information."
        },
        challenge: {
          title: "The Challenge",
          description: "Redesign the experience to make complex information accessible and understandable for citizens with different levels of education and digital literacy."
        },
        process: {
          title: "Process",
          steps: [
            {
              name: "Research",
              description: "Citizen research, usage data analysis, and benchmarking of portals from other states."
            },
            {
              name: "Information Architecture",
              description: "Complete information architecture restructuring based on card sorting and tree testing."
            },
            {
              name: "Design",
              description: "Creation of accessible interfaces (WCAG 2.1 AA) with simplified data visualizations."
            },
            {
              name: "Testing",
              description: "Usability testing with different user profiles."
            }
          ]
        },
        solution: {
          title: "Solution",
          description: "Redesigned portal with:",
          features: [
            "Smart search with intuitive filters",
            "Simplified data visualizations",
            "WCAG 2.1 AA accessibility",
            "Open data downloads",
            "Responsive interface"
          ]
        },
        impact: {
          title: "Impact",
          results: [
            "200% increase in portal access",
            "60% reduction in support requests",
            "85% positive user feedback",
            "Recognition in government innovation award"
          ]
        }
      }
    ],
    experience: [
      {
        role: "Senior Product Designer",
        company: "Samsung Electronics",
        period: "2020 - 2023",
        current: false,
        description: [
          "Led mobile product design for corporate platforms",
          "Created and maintained design system used by multiple teams",
          "Collaborated with global teams on high-impact projects",
          "Conducted large-scale UX research and usability testing"
        ]
      },
      {
        role: "Product Designer",
        company: "Public Safety Secretariat - Pernambuco Government",
        period: "2022 - 2023",
        current: false,
        description: [
          "Led BIDS police report system redesign",
          "Conducted research with 100+ police officers and 20 citizens",
          "Collaborated with multidisciplinary teams (dev, PM, stakeholders)",
          "Delivered solution that significantly improved operational efficiency"
        ]
      },
      {
        role: "UX/UI Designer",
        company: "Facilit Tecnologia",
        period: "2018 - 2020",
        current: false,
        description: [
          "Developed digital products for financial and retail sector clients",
          "Created high-fidelity prototypes and conducted usability testing",
          "Worked in agile methodologies with development teams",
          "Contributed to creating company design processes"
        ]
      },
      {
        role: "Designer",
        company: "Diário de Pernambuco",
        period: "2016 - 2018",
        current: false,
        description: [
          "Digital and print editorial design",
          "Interface creation for newspaper digital products",
          "Collaboration with content and journalism team",
          "Reading experience optimization on digital platforms"
        ]
      }
    ],
    contact: {
      title: "Let's build something impactful together.",
      description: "I'm always open to discussing new projects, creative opportunities, or partnerships. Get in touch!",
      email: "keziahcosta@gmail.com",
      location: "Recife, Brazil",
      cta: "Send message"
    }
  }
};
