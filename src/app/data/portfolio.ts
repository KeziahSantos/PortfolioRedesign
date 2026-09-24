export const portfolioData = {
  pt: {
    hero: {
      title: "Projetando produtos digitais de alto impacto com clareza e estratégia.",
      subtitle: "Sênior Product Designer especializada em UX/UI, Product Discovery e IA aplicada ao Design.",
      cta: {
        primary: "Ver Projetos",
        secondary: "Entrar em Contato"
      }
    },
    about: {
      title: "Sobre Mim",
      bio: [
        "Sênior Product Designer com mais de 20 anos de experiência em Design Digital e atuação também em Product Ownership. Experiência end-to-end em Discovery, UX Research, Product Discovery, arquitetura da informação, jornadas, fluxos, wireframes, prototipação, UI, Design Systems, acessibilidade e testes de usabilidade. Desde a Samsung, exerço responsabilidades relacionadas a PO, conectando usuário, negócio e tecnologia; atualmente também atuo nessa frente em projetos de transformação digital no Governo de Pernambuco. Especialista em Design de Interação para Artefatos Digitais pelo CESAR School e com formação recente em IA para Design.",
        "Minha abordagem combina pensamento estratégico de produto com excelência em design visual. Trabalho end-to-end, desde a descoberta e pesquisa até a entrega final e medição de impacto.",
        "Colaborei com times de produto em grandes empresas e projetos governamentais, sempre focada em criar experiências que realmente importam para as pessoas."
      ],
      differentials: [
        "20+ anos transformando problemas complexos em experiências digitais",
        "Visão estratégica de produto + execução hands-on",
        "Discovery, Research e Design orientados por evidências",
        "Experiência end-to-end, do problema ao produto",
        "Conexão entre usuário, negócio e tecnologia",
        "Experiência em governo, grandes empresas e produtos de alta complexidade",
        "Product Design + responsabilidades de Product Owner",
        "Design Systems, acessibilidade e qualidade de experiência",
        "IA aplicada a Discovery, ideação e prototipação"
      ],
      skills: [
        { name: "Product Discovery", description: "Identificação e definição de problemas, mapeamento de oportunidades, jornadas, hipóteses e construção de soluções a partir das necessidades dos usuários." },
        { name: "UX Research", description: "Entrevistas, pesquisas, mapeamento de dores, análise de necessidades e testes de usabilidade para gerar insights e apoiar decisões de produto." },
        { name: "Product Thinking", description: "Conexão entre usuário, negócio e tecnologia, transformando necessidades em estratégias, requisitos e soluções viáveis." },
        { name: "Product Ownership", description: "Refinamento de necessidades, definição de requisitos, priorização, alinhamento com stakeholders e acompanhamento da evolução das entregas." },
        { name: "UX/UI Design", description: "Criação de experiências e interfaces digitais, desde arquitetura da informação e fluxos até wireframes, protótipos e interfaces de alta fidelidade." },
        { name: "Design Systems", description: "Criação, aplicação e evolução de sistemas de design para garantir consistência, escalabilidade, eficiência e qualidade nas experiências digitais." },
        { name: "Prototyping", description: "Criação de wireframes, fluxos e protótipos de baixa a alta fidelidade utilizando Figma, Figma Make, Figma AI, Adobe XD e Sketch." },
        { name: "Usability Testing", description: "Planejamento e execução de testes com usuários para validar soluções, identificar problemas de usabilidade e orientar melhorias." },
        { name: "Accessibility", description: "Aplicação de princípios de acessibilidade, usabilidade e WCAG na construção de produtos digitais mais inclusivos." },
        { name: "AI for Design", description: "Uso de IA e ferramentas como ChatGPT, Gemini, Figma AI, Figma Make e Google Stitch para apoiar Discovery, ideação, prototipação e documentação." }
      ]
    },
    projects: [
      {
        id: "bids",
        title: "BIDS - Boletim Integrado de Defesa Social",
        description: "Redesenhando um serviço público essencial: transformamos o registro de ocorrências em uma experiência mais simples, acessível e confiável para cidadãos e profissionais da segurança pública.",
        tags: ["Governo", "UX Research", "Service Design", "Acessibilidade", "Segurança Pública"],
        category: "Government",
        nda: false,
        hero: {
          title: "BIDS - Boletim Integrado de Defesa Social",
          subtitle: "Redesenhando um serviço público essencial",
          client: "Polícia Civil - Governo de Pernambuco",
          role: "Senior Product Designer",
          year: "2022 - 2023"
        },
        context: {
          title: "Contexto",
          description: "Quando alguém precisa registrar uma ocorrência, a última coisa de que precisa é de uma experiência digital complicada. Um Boletim de Ocorrência é mais do que um formulário: muitas vezes, é o primeiro passo depois de uma situação inesperada, estressante ou de vulnerabilidade. Por trás dessa interação aparentemente simples, existe um ecossistema complexo, em que cidadãos tentam explicar o que aconteceu, profissionais da segurança pública trabalham com grandes volumes de informação e sistemas precisam se comunicar com confiabilidade. O desafio não era simplesmente criar uma nova interface. Era repensar a experiência por trás do serviço."
        },
        challenge: {
          title: "O Desafio",
          description: "Como transformar a experiência do registro de ocorrências para a população e para os servidores policiais, reduzindo as barreiras de acesso e melhorando a eficiência do processo? O objetivo era reduzir fricção, simplificar a jornada e, ao mesmo tempo, estruturar melhor os dados para quem atua no atendimento e na investigação."
        },
        process: {
          title: "Processo",
          steps: [
            {
              name: "Questionários",
              description: "Coletamos dados quantitativos com mais de 100 servidores da Polícia Civil e 20 cidadãos de 18 a 55 anos, com diferentes níveis de letramento digital."
            },
            {
              name: "Entrevistas",
              description: "Realizamos entrevistas em profundidade para compreender dores, necessidades e oportunidades de melhoria na experiência de registro de ocorrências."
            },
            {
              name: "Análise Comparativa",
              description: "Estudamos experiências de delegacias virtuais de São Paulo, Rio de Janeiro, Minas Gerais e Ceará para identificar padrões e melhores práticas."
            },
            {
              name: "Prototipagem",
              description: "Exploramos fluxos, validamos decisões com protótipos navegáveis e iteramos a solução antes da implementação."
            }
          ]
        },
        solution: {
          title: "Solução",
          description: "Mais do que modernizar a interface, o projeto reorganizou a jornada, simplificou fluxos e tornou mais claras as decisões e ações em cada etapa do serviço.",
          features: [
            "Portal do cidadão com registro online e autenticação gov.br",
            "Sistema interno policial com relatórios, filtros e acompanhamento de status",
            "Nova aba de relatórios para gestão e verificação de boletins",
            "Interface renovada para a Delegacia Interativa",
            "Uso de Design System para consistência, acessibilidade e escalabilidade",
            "Redução de retrabalho e melhoria da confiabilidade estatística"
          ]
        },
        impact: {
          title: "Impacto",
          results: [
            "Experiência mais clara e acessível para cidadãos em momentos de vulnerabilidade",
            "Fluxo de trabalho policial mais padronizado, eficiente e previsível",
            "Melhoria na qualidade e confiabilidade dos dados coletados",
            "Redução de retrabalho e maior capacidade de gestão da segurança pública"
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
        id: "exp-001",
        role: "Senior Product Designer | Product Owner",
        company: "Join Creative Tech · Projetos para o Governo de Pernambuco",
        period: "2025 – atual",
        current: true,
        description: [
          "Atuo no desenvolvimento e evolução de produtos e serviços digitais para cidadãos e servidores",
          "Conduzo Discovery, UX Research, definição de problemas, jornadas, fluxos e arquitetura da informação",
          "Desenvolvo wireframes, protótipos e interfaces, aplicando Design System, acessibilidade e usabilidade",
          "Exerço responsabilidades de Product Owner, conectando usuários, stakeholders, negócio e tecnologia",
          "Participo da definição e priorização de requisitos e acompanho a evolução das entregas",
          "Utilizo IA e ferramentas como Figma Make, Figma AI, Google Stitch, ChatGPT e Gemini no processo de Design"
        ]
      },
      {
        id: "exp-002",
        role: "Senior Product Designer",
        company: "Samsung Electronics",
        period: "2020 - 2024",
        current: false,
        description: [
          "Atuei no desenvolvimento de produtos digitais, conectando necessidades dos usuários, objetivos de negócio e tecnologia",
          "Exerci responsabilidades de Product Owner, participando do levantamento e priorização de necessidades, requisitos e entregas",
          "Conduzi Discovery, pesquisas, mapeamento de dores, jornadas e identificação de oportunidades",
          "Desenvolvi wireframes, protótipos e interfaces de alta fidelidade",
          "Trabalhei em parceria com Desenvolvimento e QA, garantindo qualidade e viabilidade das soluções",
          "Atuei em equipes multidisciplinares e contribuí para a formação de designers por meio de mentoria e onboarding"
        ]
      },
      {
        id: "exp-003",
        role: "UX/UI Designer",
        company: "Facilit Tecnologia",
        period: "2018 - 2020",
        current: false,
        description: [
          "Atuei no produto Target, plataforma de governança para planejamento estratégico, gestão de projetos e indicadores",
          "Conduzi pesquisas, mapeamento de problemas, cenários e jornadas",
          "Desenvolvi wireframes e protótipos e participei de testes com usuários",
          "Trabalhei de forma colaborativa com Design, Desenvolvimento e QA",
          "Participei de projeto para licitação governamental do Ministério Público"
        ]
      },
      {
        id: "exp-004",
        role: "Designer",
        company: "Diário de Pernambuco",
        period: "2016 - 2018",
        current: false,
        description: [
          "Atuei na pesquisa e evolução de produtos digitais para web, mobile, TV e rádio",
          "Criei jornadas, wireframes, protótipos de baixa e alta fidelidade e interfaces digitais",
          "Orientei outros designers e colaborei em projetos multidisciplinares",
          "Participei de projetos reconhecidos em festivais de Design Digital no Brasil"
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
        description: "Redesigning an essential public service: transforming incident reporting into a simpler, more accessible and reliable experience for citizens and public safety professionals.",
        tags: ["Government", "UX Research", "Service Design", "Accessibility", "Public Safety"],
        category: "Government",
        nda: false,
        hero: {
          title: "BIDS - Integrated Public Safety Report",
          subtitle: "Redesigning an essential public service",
          client: "Police Civil - Pernambuco Government",
          role: "Senior Product Designer",
          year: "2022 - 2023"
        },
        context: {
          title: "Context",
          description: "When someone needs to file an incident report, the last thing they need is a complicated digital experience. A police report is more than a form: it is often the first step after an unexpected, stressful, or vulnerable situation. Behind that seemingly simple interaction sits a complex ecosystem in which citizens try to explain what happened, public safety professionals work with large volumes of information, and systems must communicate reliably. The challenge was not simply to create a new interface. It was to rethink the experience behind the service."
        },
        challenge: {
          title: "The Challenge",
          description: "How can we transform the experience of filing incident reports for the public and police officers, reducing access barriers and improving process efficiency? The goal was to lower friction, simplify the journey, and structure data better for those responsible for service and investigation."
        },
        process: {
          title: "Process",
          steps: [
            {
              name: "Questionnaires",
              description: "We collected quantitative data from more than 100 police officers and 20 citizens aged 18 to 55 with different levels of digital literacy."
            },
            {
              name: "Interviews",
              description: "We conducted in-depth interviews to understand pain points, needs, and improvement opportunities in the incident reporting experience."
            },
            {
              name: "Comparative Analysis",
              description: "We studied virtual precinct experiences from São Paulo, Rio de Janeiro, Minas Gerais, and Ceará to identify patterns and best practices."
            },
            {
              name: "Prototyping",
              description: "We explored user flows, validated decisions with interactive prototypes, and iterated the solution before implementation."
            }
          ]
        },
        solution: {
          title: "Solution",
          description: "More than a visual refresh, the project reorganized the journey, simplified flows, and clarified the decisions and actions needed at each stage of the service.",
          features: [
            "Citizen portal with online registration and gov.br authentication",
            "Internal police system with reports, filters, and status tracking",
            "New reports tab for management and verification of incident records",
            "Renewed Interactive Delegacy interface",
            "Design System usage for consistency, accessibility, and scalability",
            "Reduced rework and improved statistical reliability"
          ]
        },
        impact: {
          title: "Impact",
          results: [
            "Clearer and more accessible experience for citizens in vulnerable moments",
            "More standardized, efficient, and predictable workflow for police teams",
            "Improved quality and reliability of collected data",
            "Reduced rework and greater management capacity for public safety"
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
