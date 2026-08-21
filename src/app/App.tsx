import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "motion/react";
import { Toaster, toast } from "sonner";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { Navbar } from "./components/ui/Navbar";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Work } from "./pages/Work";
import { CaseDetail } from "./pages/CaseDetail";
import { Experience } from "./pages/Experience";
import { Contact } from "./pages/Contact";
import {
  LayoutGrid, List, Lock, Plus, Edit2, Trash2, Eye, EyeOff,
  Copy, LogOut, X, Search,
  Shield, FileText, Globe, Clock, CheckCircle, AlertCircle,
  ArrowLeft, Layers, GripVertical, ChevronUp, ChevronDown,
  Save, Send, Briefcase, UserCircle, Upload, Quote, Star,
  Mic, ExternalLink, MapPin, Tag, Download,
} from "lucide-react";

// ─── Portfolio routing types ──────────────────────────────────────────────────

type Page = "home" | "about" | "work" | "case" | "experience" | "talks" | "contact";

// ─── CMS Types ────────────────────────────────────────────────────────────────

type Status = "draft" | "published";
type CaseCategory = "Product Design" | "UX Research" | "Design Systems" | "Visual Design" | "Mobile" | "Web";
type ViewMode = "grid" | "list";
type AppMode = "portfolio" | "adminLogin" | "admin" | "ndaGate" | "caseViewer";

interface HistoryEntry { action: string; date: string; }

interface CMSCase {
  id: string;
  title: string;
  titleEn?: string;
  subtitle: string;
  subtitleEn?: string;
  description: string;
  descriptionEn?: string;
  category: CaseCategory;
  tags: string[];
  status: Status;
  isNDA: boolean;
  ndaPassword: string;
  coverColor: string;
  coverImage: string;
  client: string;
  role: string;
  year: string;
  duration: string;
  content: string;
  contentEn?: string;
  results: string[];
  tools: string[];
  links: { label: string; url: string }[];
  createdAt: string;
  updatedAt: string;
  history: HistoryEntry[];
}

// ─── CMS Initial Data ─────────────────────────────────────────────────────────

const ADMIN_EMAIL = "admin@portfolio.com";
const ADMIN_PASSWORD = "Design2026!";

const INITIAL_CMS_CASES: CMSCase[] = [
  {
    id: "cms-001",
    title: "Pernambuco Digital Government",
    subtitle: "Redesigning public services for 9.6 million citizens",
    description: "Led the end-to-end UX redesign of Pernambuco's state digital platform (SETD), consolidating 40+ legacy services into a unified, accessible experience.",
    category: "Product Design",
    tags: ["Government", "Design System", "Accessibility", "WCAG 2.1"],
    status: "published",
    isNDA: false,
    ndaPassword: "",
    coverColor: "#1A1A1D",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&auto=format",
    client: "SETD – Secretaria de Desenvolvimento Econômico",
    role: "Senior Product Designer (Lead)",
    year: "2024",
    duration: "14 months",
    content: "Extensive audit of 40+ services spread across disconnected portals with inconsistent UX, zero responsive support, and WCAG AA compliance rates below 30%.\n\nWe conducted 68 user interviews across urban and rural Pernambuco, mapping pain points across income levels, digital literacy, and connectivity constraints.\n\nThe resulting Pernambuco Design System (PDS) — 140+ components, full dark/light mode, WCAG AA certified — became the foundation for the next 3 years of state digital infrastructure.",
    results: [
      "Task completion rate increased from 34% to 87%",
      "Support call volume reduced by 52% in 6 months",
      "WCAG AA compliance achieved across all 40+ services",
      "System adopted by 6 secretariats within 8 months",
    ],
    tools: ["Figma", "FigJam", "Maze", "Hotjar", "Zeroheight"],
    links: [{ label: "Case Study PDF", url: "#" }],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-11-20T14:30:00Z",
    history: [
      { action: "Published", date: "2024-11-20T14:30:00Z" },
      { action: "Created", date: "2024-01-15T10:00:00Z" },
    ],
  },
  {
    id: "cms-002",
    title: "Apex Electronics — Galaxy OS",
    subtitle: "Reimagining the smart device ecosystem UX",
    description: "Worked embedded with the product team at Apex Electronics to redesign the core OS interaction model across their flagship mobile and tablet lineup.",
    category: "Mobile",
    tags: ["Mobile OS", "Interaction Design", "Cross-platform"],
    status: "published",
    isNDA: true,
    ndaPassword: "apex2024",
    coverColor: "#0B1628",
    coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop&auto=format",
    client: "Apex Electronics (name changed, NDA)",
    role: "Product Design Lead",
    year: "2023",
    duration: "18 months",
    content: "Deep collaboration with hardware, software, and marketing teams at one of the world's largest consumer electronics companies.\n\nWe ran 120+ usability sessions across 8 countries, building a cross-cultural interaction model accommodating right-to-left languages, varying screen sizes, and diverse usage patterns.\n\nThe design system we built — codenamed Meridian — shipped with firmware v14 across 12 device SKUs.",
    results: [
      "User-rated ease of use score increased 28 NPS points post-launch",
      "First-week retention improved 19% over previous OS version",
      "Gesture adoption rate: 73% within 30 days",
      "Meridian Design System adopted by 3 product teams",
    ],
    tools: ["Figma", "ProtoPie", "Principle", "UserTesting", "Lottie"],
    links: [],
    createdAt: "2023-03-10T08:00:00Z",
    updatedAt: "2024-03-01T11:00:00Z",
    history: [
      { action: "Published", date: "2024-03-01T11:00:00Z" },
      { action: "NDA password set", date: "2023-12-10T10:00:00Z" },
      { action: "Created", date: "2023-03-10T08:00:00Z" },
    ],
  },
];

const CASE_CATEGORIES: CaseCategory[] = ["Product Design", "UX Research", "Design Systems", "Visual Design", "Mobile", "Web"];
const COVER_COLORS = ["#0B0B0C", "#1A1A1D", "#0B1628", "#1E3A5F", "#1A2E1A", "#2D1B1B", "#1E1E2E", "#2A2A1A"];

// ─── CMS Helpers ──────────────────────────────────────────────────────────────

// ─── Experience Types & Data ──────────────────────────────────────────────────

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  current: boolean;
  description: string[];
  descriptionEn?: string[];
}

const INITIAL_EXPERIENCE: ExperienceItem[] = [
  {
    id: "exp-001",
    role: "Senior Product Designer",
    company: "Samsung Electronics",
    period: "2020 - 2023",
    current: false,
    description: [
      "Liderei o design de produtos mobile para plataformas corporativas",
      "Criei e mantive design system usado por múltiplos times",
      "Colaborei com times globais em projetos de alto impacto",
      "Conduzi pesquisas de UX e testes de usabilidade em larga escala",
    ],
  },
  {
    id: "exp-002",
    role: "Product Designer",
    company: "Secretaria de Defesa Social - Governo de Pernambuco",
    period: "2022 - 2023",
    current: false,
    description: [
      "Liderei o redesign do sistema BIDS de boletins de ocorrência",
      "Realizei pesquisas com 100+ policiais e 20 cidadãos",
      "Colaborei com equipes multidisciplinares (dev, PM, stakeholders)",
      "Entreguei solução que melhorou significativamente a eficiência operacional",
    ],
  },
  {
    id: "exp-003",
    role: "UX/UI Designer",
    company: "Facilit Tecnologia",
    period: "2018 - 2020",
    current: false,
    description: [
      "Desenvolvi produtos digitais para clientes do setor financeiro e varejo",
      "Criei protótipos de alta fidelidade e conduzi testes de usabilidade",
      "Trabalhei em metodologias ágeis com times de desenvolvimento",
      "Contribuí para a criação de processos de design da empresa",
    ],
  },
  {
    id: "exp-004",
    role: "Designer",
    company: "Diário de Pernambuco",
    period: "2016 - 2018",
    current: false,
    description: [
      "Design editorial digital e impresso",
      "Criação de interfaces para produtos digitais do jornal",
      "Colaboração com equipe de conteúdo e jornalismo",
      "Otimização de experiência de leitura em plataformas digitais",
    ],
  },
];

function loadExperience(): ExperienceItem[] {
  try { const s = localStorage.getItem("portfolio_experience_v1"); return s ? JSON.parse(s) : INITIAL_EXPERIENCE; } catch { return INITIAL_EXPERIENCE; }
}
function saveExperience(e: ExperienceItem[]) { localStorage.setItem("portfolio_experience_v1", JSON.stringify(e)); }

// ─── About Types & Data ───────────────────────────────────────────────────────

interface SkillItem { name: string; description: string; }

interface AboutContent {
  heroTitle: string;
  heroSubtitle: string;
  photo: string | null;
  cvFile: string | null;
  cvFileName: string;
  bio: string[];
  bioEn?: string[];
  differentials: string[];
  differentialsEn?: string[];
  skills: SkillItem[];
}

const INITIAL_ABOUT: AboutContent = {
  heroTitle: "",
  heroSubtitle: "",
  photo: null,
  cvFile: null,
  cvFileName: "Keziah_Santos_CV.pdf",
  bio: [
    "Sou uma Senior Product Designer com mais de 8 anos de experiência criando produtos digitais que fazem a diferença. Especialista em Interaction Design pela CESAR School, tenho paixão por transformar problemas complexos em soluções elegantes e centradas no usuário.",
    "Minha abordagem combina pensamento estratégico de produto com excelência em design visual. Trabalho end-to-end, desde a descoberta e pesquisa até a entrega final e medição de impacto.",
    "Colaborei com times de produto em grandes empresas e projetos governamentais, sempre focada em criar experiências que realmente importam para as pessoas.",
  ],
  differentials: [
    "Visão estratégica de produto aliada a execução impecável",
    "Experiência com projetos de alto impacto em governo e grandes empresas",
    "Atuação end-to-end em todo o ciclo de vida do produto",
    "Liderança em pesquisa, discovery e validação de soluções",
  ],
  skills: [
    { name: "UX Research", description: "Entrevistas, surveys, testes de usabilidade e análise de dados" },
    { name: "UI Design", description: "Design visual, design systems e prototipação" },
    { name: "Product Thinking", description: "Estratégia de produto, roadmap e priorização" },
    { name: "Prototyping", description: "Figma, Adobe XD, Sketch e ferramentas de prototipação" },
    { name: "Design Systems", description: "Criação e manutenção de sistemas de design escaláveis" },
    { name: "User Testing", description: "Planejamento e execução de testes com usuários" },
  ],
};

function loadAbout(): AboutContent {
  try { const s = localStorage.getItem("portfolio_about_v1"); return s ? JSON.parse(s) : INITIAL_ABOUT; } catch { return INITIAL_ABOUT; }
}
function saveAbout(a: AboutContent) { localStorage.setItem("portfolio_about_v1", JSON.stringify(a)); }

// ─── Recommendations Types & Data ─────────────────────────────────────────────

interface Recommendation {
  id: string;
  name: string;
  role: string;
  company: string;
  relationship: string;
  date: string;
  text: string;
  photo: string | null;
}

const INITIAL_RECOMMENDATIONS: Recommendation[] = [
  {
    id: "rec-001",
    name: "Carlos Mendes",
    role: "Head of Product",
    company: "SETD – Governo de Pernambuco",
    relationship: "Carlos gerenciou Keziah diretamente",
    date: "Novembro de 2024",
    text: "Keziah é uma das profissionais mais completas com quem já trabalhei. Sua capacidade de traduzir necessidades complexas de governo em experiências simples e acessíveis é rara. Liderou o redesign de toda nossa plataforma digital com maestria técnica e sensibilidade humana. O resultado foi um aumento expressivo na adoção dos serviços e redução significativa nas chamadas de suporte.",
    photo: null,
  },
  {
    id: "rec-002",
    name: "Ana Luiza Ferreira",
    role: "Product Manager",
    company: "Apex Electronics",
    relationship: "Ana Luiza trabalhou com Keziah no mesmo time",
    date: "Março de 2024",
    text: "Trabalhar com a Keziah foi uma das melhores experiências da minha carreira. Ela tem uma visão de produto extraordinária aliada a uma execução impecável em design. Sua habilidade de facilitar workshops, alinhar stakeholders e ainda entregar protótipos de alta fidelidade no mesmo sprint é algo que realmente diferencia seu trabalho.",
    photo: null,
  },
  {
    id: "rec-003",
    name: "Rafael Torres",
    role: "Engineering Lead",
    company: "Facilit Tecnologia",
    relationship: "Rafael trabalhou com Keziah no mesmo time",
    date: "Outubro de 2023",
    text: "Do ponto de vista de engenharia, a Keziah é o tipo de designer que todo time de produto sonha em ter. Ela entende profundamente as restrições técnicas sem perder a ambição de criar experiências excepcionais. Suas especificações são precisas, suas revisões construtivas e sua parceria com o time de dev é exemplar.",
    photo: null,
  },
];

function loadRecommendations(): Recommendation[] {
  try { const s = localStorage.getItem("portfolio_recs_v1"); return s ? JSON.parse(s) : INITIAL_RECOMMENDATIONS; } catch { return INITIAL_RECOMMENDATIONS; }
}
function saveRecommendations(r: Recommendation[]) { localStorage.setItem("portfolio_recs_v1", JSON.stringify(r)); }

// ─── Talks Types & Data ────────────────────────────────────────────────────────

type TalkType = "Palestra" | "Aula" | "Conversa" | "Podcast" | "Workshop" | "Painel";

interface Talk {
  id: string;
  title: string;
  titleEn?: string;
  event: string;
  type: TalkType;
  date: string;
  location: string;
  description: string;
  descriptionEn?: string;
  link: string;
  coverImage: string | null;
  tags: string[];
}

interface TalksSection {
  visible: boolean;
  talks: Talk[];
}

const INITIAL_TALKS: TalksSection = {
  visible: true,
  talks: [
    {
      id: "talk-001",
      title: "Design de Serviços no Setor Público",
      event: "Gov.Design Summit",
      type: "Palestra",
      date: "Outubro 2024",
      location: "Recife, PE",
      description: "Como aplicar princípios de Service Design para transformar serviços governamentais em experiências humanas, acessíveis e eficientes. Cases reais do Governo de Pernambuco.",
      link: "",
      coverImage: null,
      tags: ["Service Design", "Governo", "UX"],
    },
    {
      id: "talk-002",
      title: "Design Systems em Escala: da Teoria à Prática",
      event: "UX Conf Brasil",
      type: "Palestra",
      date: "Junho 2024",
      location: "Online",
      description: "Lições aprendidas ao construir e manter um design system adotado por 14 times de produto. Estratégias de adoção, governança e contribuição distribuída.",
      link: "",
      coverImage: null,
      tags: ["Design Systems", "Figma", "Escalabilidade"],
    },
    {
      id: "talk-003",
      title: "Carreira em Product Design: do Brasil para o Mundo",
      event: "Mulheres em Tech PE",
      type: "Conversa",
      date: "Março 2024",
      location: "Recife, PE",
      description: "Bate-papo sobre trajetória profissional, posicionamento para vagas internacionais e como construir um portfólio que atravessa fronteiras.",
      link: "",
      coverImage: null,
      tags: ["Carreira", "Diversidade", "Internacional"],
    },
  ],
};

function loadTalks(): TalksSection {
  try { const s = localStorage.getItem("portfolio_talks_v1"); return s ? JSON.parse(s) : INITIAL_TALKS; } catch { return INITIAL_TALKS; }
}
function saveTalks(t: TalksSection) { localStorage.setItem("portfolio_talks_v1", JSON.stringify(t)); }

// ─── CMS Helpers ──────────────────────────────────────────────────────────────

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}
function newId() { return `case-${Date.now()}`; }
function loadCases(): CMSCase[] {
  try { const s = localStorage.getItem("portfolio_cms_v2"); return s ? JSON.parse(s) : INITIAL_CMS_CASES; } catch { return INITIAL_CMS_CASES; }
}
function saveCases(c: CMSCase[]) { localStorage.setItem("portfolio_cms_v2", JSON.stringify(c)); }

// ─── Claude Translation ───────────────────────────────────────────────────────

function loadApiKey(): string { try { return localStorage.getItem("portfolio_claude_api_key") || ""; } catch { return ""; } }
function saveApiKey(k: string) { localStorage.setItem("portfolio_claude_api_key", k); }

async function translateWithClaude(text: string, apiKey: string): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5",
      max_tokens: 4096,
      messages: [{ role: "user", content: `Translate the following Portuguese text to English. Return ONLY the translated text, preserve formatting (newlines, bullet points, HTML tags if present), no explanations:\n\n${text}` }],
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: { message?: string } }).error?.message || `API error ${res.status}`);
  }
  const data = await res.json() as { content: { text: string }[] };
  return data.content[0].text;
}

function TranslateButton({ onClick, loading, label = "Traduzir para EN" }: { onClick: () => void; loading: boolean; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Globe size={11} />
      {loading ? "Traduzindo…" : label}
    </button>
  );
}

// ─── Rich Text Editor ─────────────────────────────────────────────────────────

const RTE_FONT_SIZES = [8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 28, 32, 36, 48, 60, 72];

const RTE_FONTS = [
  { label: "Sans-serif", value: "Inter, system-ui, sans-serif" },
  { label: "Serif", value: "Georgia, 'Times New Roman', serif" },
  { label: "Display", value: "'DM Serif Display', Georgia, serif" },
  { label: "Mono", value: "'Courier New', Courier, monospace" },
];

const RICH_TEXT_STYLES = `
  .rte-body { font-size: 11px; line-height: 1.75; }
  .rte-body p { font-size: inherit; line-height: 1.75; margin-bottom: 8px; }
  .rte-body h2 { font-size: 20px; font-weight: 600; line-height: 1.3; margin: 20px 0 8px; color: inherit; }
  .rte-body h3 { font-size: 24px; font-weight: 700; line-height: 1.25; margin: 24px 0 10px; color: inherit; }
  .rte-body ul { list-style: disc; padding-left: 20px; margin-bottom: 8px; font-size: inherit; }
  .rte-body ol { list-style: decimal; padding-left: 20px; margin-bottom: 8px; font-size: inherit; }
  .rte-body li { margin-bottom: 3px; }
  .rte-body blockquote {
    margin: 20px 0;
    padding: 18px 22px 18px 22px;
    background: rgba(122,158,136,0.07);
    border-left: 3px solid #7A9E88;
    border-radius: 0 12px 12px 0;
    font-style: italic;
    font-size: 14px;
    color: #555;
    position: relative;
  }
  .rte-body blockquote::before {
    content: '"';
    font-size: 52px;
    line-height: 1;
    color: #7A9E88;
    opacity: 0.3;
    position: absolute;
    top: 6px;
    left: 14px;
    font-family: Georgia, serif;
  }
  .rte-body blockquote p { font-size: 14px; margin: 0; padding-left: 26px; color: inherit; }
  .rte-body img {
    max-width: 100%;
    border-radius: 10px;
    margin: 16px auto;
    display: block;
    box-shadow: 0 4px 24px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.07);
  }
  .rte-body a { color: #7A9E88; text-decoration: underline; }
`;

function RtBtn({ children, onClick, title, active = false }: { children: React.ReactNode; onClick: (e: React.MouseEvent) => void; title?: string; active?: boolean }) {
  return (
    <button
      type="button"
      onMouseDown={onClick}
      title={title}
      className={`flex items-center justify-center px-2 py-1.5 rounded text-xs transition-colors select-none ${active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
    >
      {children}
    </button>
  );
}

function RtDivider() { return <div className="w-px h-4 bg-border shrink-0" />; }

function RichTextEditor({ value, onChange, placeholder = "Escreva aqui…", minHeight = 300 }: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const textColorRef = useRef<HTMLInputElement>(null);
  const hlColorRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [fontSize, setFontSize] = useState(11);
  const [textColor, setTextColor] = useState("#111111");
  const [hlColor, setHlColor] = useState("#FFFF00");
  const isInitialized = useRef(false);

  useEffect(() => {
    if (editorRef.current && !isInitialized.current) {
      editorRef.current.innerHTML = value || "";
      isInitialized.current = true;
    }
  }, []);

  useEffect(() => {
    if (editorRef.current && !isFocused) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value, isFocused]);

  const focus = () => editorRef.current?.focus();

  const exec = (cmd: string, val?: string) => {
    focus();
    document.execCommand(cmd, false, val);
    handleInput();
  };

  const handleInput = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const applyFontSize = (e: React.MouseEvent, dir: 1 | -1) => {
    e.preventDefault();
    const idx = RTE_FONT_SIZES.indexOf(fontSize);
    const next = RTE_FONT_SIZES[Math.max(0, Math.min(RTE_FONT_SIZES.length - 1, idx + dir))];
    if (next === fontSize) return;
    setFontSize(next);
    focus();
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const frag = range.cloneContents();
      const wrap = document.createElement("span");
      wrap.style.fontSize = `${next}px`;
      wrap.appendChild(frag);
      range.deleteContents();
      range.insertNode(wrap);
      const newRange = document.createRange();
      newRange.setStartAfter(wrap);
      newRange.collapse(true);
      sel.removeAllRanges();
      sel.addRange(newRange);
    } else {
      document.execCommand("styleWithCSS", false, "true");
      document.execCommand("fontSize", false, "7");
      const fontEls = editorRef.current?.querySelectorAll("font[size='7']");
      fontEls?.forEach(el => {
        (el as HTMLElement).removeAttribute("size");
        (el as HTMLElement).style.fontSize = `${next}px`;
      });
    }
    handleInput();
  };

  const handleFontFamily = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    focus();
    document.execCommand("fontName", false, e.target.value);
    handleInput();
  };

  const applyColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setTextColor(color);
    focus();
    document.execCommand("foreColor", false, color);
    handleInput();
  };

  const applyHighlight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setHlColor(color);
    focus();
    document.execCommand("hiliteColor", false, color);
    handleInput();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("Imagem máx. 5 MB"); return; }
    const reader = new FileReader();
    reader.onload = ev => {
      const src = ev.target?.result as string;
      focus();
      document.execCommand("insertHTML", false, `<img src="${src}" style="max-width:100%;border-radius:10px;display:block;margin:16px auto;box-shadow:0 4px 24px rgba(0,0,0,0.13),0 1px 4px rgba(0,0,0,0.07);" />`);
      handleInput();
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const isEmpty = !value || value === "" || value === "<br>";

  return (
    <>
      <style>{RICH_TEXT_STYLES}</style>
      <div className={`rounded-xl border transition-all overflow-hidden ${isFocused ? "border-foreground ring-2 ring-ring/20" : "border-border"}`}>

        {/* ── Toolbar ── */}
        <div className="flex items-center gap-1 px-2 py-1.5 border-b border-border bg-muted/30 flex-wrap">

          {/* Font family */}
          <select
            onMouseDown={e => e.stopPropagation()}
            onChange={handleFontFamily}
            className="text-[11px] text-muted-foreground bg-transparent border border-border rounded px-1.5 py-0.5 hover:border-foreground focus:outline-none cursor-pointer"
            style={{ maxWidth: 90 }}
          >
            {RTE_FONTS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>

          <RtDivider />

          {/* Font size stepper */}
          <div className="flex items-center gap-0.5 border border-border rounded overflow-hidden">
            <RtBtn onClick={e => applyFontSize(e, -1)} title="Diminuir fonte">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </RtBtn>
            <span className="text-[11px] text-foreground font-mono w-6 text-center select-none leading-none py-1">{fontSize}</span>
            <RtBtn onClick={e => applyFontSize(e, 1)} title="Aumentar fonte">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </RtBtn>
          </div>

          <RtDivider />

          {/* B / I / U / S */}
          <RtBtn onClick={e => { e.preventDefault(); exec("bold"); }} title="Negrito (Ctrl+B)">
            <span className="font-bold text-xs">B</span>
          </RtBtn>
          <RtBtn onClick={e => { e.preventDefault(); exec("italic"); }} title="Itálico (Ctrl+I)">
            <span className="italic text-xs">I</span>
          </RtBtn>
          <RtBtn onClick={e => { e.preventDefault(); exec("underline"); }} title="Sublinhado (Ctrl+U)">
            <span className="underline text-xs">U</span>
          </RtBtn>
          <RtBtn onClick={e => { e.preventDefault(); exec("strikeThrough"); }} title="Tachado">
            <span className="line-through text-xs">S</span>
          </RtBtn>

          <RtDivider />

          {/* Text color */}
          <div className="relative" title="Cor do texto">
            <RtBtn onClick={e => { e.preventDefault(); textColorRef.current?.click(); }}>
              <span className="flex flex-col items-center gap-px">
                <span className="text-xs font-bold leading-none" style={{ color: textColor }}>A</span>
                <span className="w-3.5 h-0.5 rounded-sm" style={{ backgroundColor: textColor }} />
              </span>
            </RtBtn>
            <input ref={textColorRef} type="color" value={textColor} onChange={applyColor}
              className="absolute opacity-0 w-0 h-0 pointer-events-none" />
          </div>

          {/* Highlight color */}
          <div className="relative" title="Realçar texto">
            <RtBtn onClick={e => { e.preventDefault(); hlColorRef.current?.click(); }}>
              <span className="flex flex-col items-center gap-px">
                <svg width="11" height="11" viewBox="0 0 24 24" fill={hlColor} stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2a1 1 0 0 1 .894.553l7 14A1 1 0 0 1 19 18H5a1 1 0 0 1-.894-1.447l7-14A1 1 0 0 1 12 2z"/>
                  <line x1="5" y1="20" x2="19" y2="20" strokeWidth="2"/>
                </svg>
                <span className="w-3.5 h-0.5 rounded-sm" style={{ backgroundColor: hlColor }} />
              </span>
            </RtBtn>
            <input ref={hlColorRef} type="color" value={hlColor} onChange={applyHighlight}
              className="absolute opacity-0 w-0 h-0 pointer-events-none" />
          </div>

          <RtDivider />

          {/* Alignment */}
          <RtBtn onClick={e => { e.preventDefault(); exec("justifyLeft"); }} title="Alinhar à esquerda">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/>
            </svg>
          </RtBtn>
          <RtBtn onClick={e => { e.preventDefault(); exec("justifyCenter"); }} title="Centralizar">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </RtBtn>
          <RtBtn onClick={e => { e.preventDefault(); exec("justifyRight"); }} title="Alinhar à direita">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="6" y1="18" x2="21" y2="18"/>
            </svg>
          </RtBtn>

          <RtDivider />

          {/* Lists */}
          <RtBtn onClick={e => { e.preventDefault(); exec("insertUnorderedList"); }} title="Lista com marcadores">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/>
              <circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none"/>
            </svg>
          </RtBtn>
          <RtBtn onClick={e => { e.preventDefault(); exec("insertOrderedList"); }} title="Lista numerada">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/>
              <path d="M4 6h1v4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 10h2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M6 14H4l2 2-2 2h2" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </RtBtn>

          <RtDivider />

          {/* Block styles */}
          <RtBtn onClick={e => { e.preventDefault(); exec("formatBlock", "p"); }} title="Texto normal (11px)">
            <span className="text-[10px] font-medium">¶</span>
          </RtBtn>
          <RtBtn onClick={e => { e.preventDefault(); exec("formatBlock", "h2"); }} title="Título H2 (20px)">
            <span className="font-bold" style={{ fontSize: 11 }}>H2</span>
          </RtBtn>
          <RtBtn onClick={e => { e.preventDefault(); exec("formatBlock", "h3"); }} title="Título H3 (24px)">
            <span className="font-bold" style={{ fontSize: 13 }}>H3</span>
          </RtBtn>

          {/* Blockquote */}
          <RtBtn onClick={e => { e.preventDefault(); exec("formatBlock", "blockquote"); }} title="Citação">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm14 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
            </svg>
          </RtBtn>

          <RtDivider />

          {/* Image upload */}
          <label className="flex items-center gap-1 px-2 py-1.5 rounded text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer" title="Inserir imagem">
            <Upload size={11} />
            <span>Imagem</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>

          {/* Undo / Redo */}
          <RtDivider />
          <RtBtn onClick={e => { e.preventDefault(); exec("undo"); }} title="Desfazer (Ctrl+Z)">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/>
            </svg>
          </RtBtn>
          <RtBtn onClick={e => { e.preventDefault(); exec("redo"); }} title="Refazer (Ctrl+Y)">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 14 20 9 15 4"/><path d="M4 20v-7a4 4 0 0 1 4-4h12"/>
            </svg>
          </RtBtn>

        </div>

        {/* ── Editable area ── */}
        <div className="relative">
          {isEmpty && !isFocused && (
            <div className="absolute top-3 left-4 text-xs text-muted-foreground pointer-events-none select-none">{placeholder}</div>
          )}
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => { setIsFocused(false); handleInput(); }}
            style={{ minHeight }}
            className="rte-body px-4 py-3 text-foreground focus:outline-none"
          />
        </div>
      </div>
    </>
  );
}

// ─── CMS Sub-components ───────────────────────────────────────────────────────

// ─── Pastel chip colour system (same palette as Tag.tsx) ─────────────────────

const PASTEL_CHIPS = [
  { bg: "#F8E8D8", color: "#8C5A3A" },
  { bg: "#DDD4F8", color: "#5A4A8C" },
  { bg: "#D0F0D4", color: "#3A7A48" },
  { bg: "#F8D4E0", color: "#8C4A60" },
  { bg: "#FAF0C8", color: "#7A6800" },
  { bg: "#F0D4BA", color: "#7A4A22" },
  { bg: "#C8EEF0", color: "#2A6A70" },
  { bg: "#E0DCC8", color: "#625E3A" },
];

function hashStr(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % PASTEL_CHIPS.length;
}

function PastelChip({ label, className = "" }: { label: string; className?: string }) {
  const { bg, color } = PASTEL_CHIPS[hashStr(label)];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
      style={{ backgroundColor: bg, color }}
    >
      {label}
    </span>
  );
}

function CmsBadge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "published" | "draft" | "nda" | "tag" }) {
  const s = {
    default: "bg-secondary text-secondary-foreground",
    published: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    draft: "bg-amber-50 text-amber-700 border border-amber-200",
    nda: "bg-orange-50 text-orange-700 border border-orange-200",
    tag: "bg-muted text-muted-foreground",
  };
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${s[variant]}`}>{children}</span>;
}

// ─── NDA Gate ─────────────────────────────────────────────────────────────────

function NDAGate({ item, onUnlock, onBack }: { item: CMSCase; onUnlock: () => void; onBack: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === item.ndaPassword) { onUnlock(); }
    else { setError(true); setShake(true); setTimeout(() => setShake(false), 600); }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-12 transition-colors">
          <ArrowLeft size={14} /> Voltar aos projetos
        </button>
        <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center mb-6">
          <Lock size={20} className="text-orange-600" />
        </div>
        <h1 className="text-2xl font-semibold text-foreground mb-1">Acesso restrito — NDA</h1>
        <p className="text-muted-foreground text-sm mb-2">{item.title}</p>
        <p className="text-muted-foreground text-sm mb-8">Este case está protegido por NDA. Insira a senha de acesso para visualizar em modo leitura.</p>
        <form onSubmit={handleSubmit} className={shake ? "[animation:shake_0.5s_ease]" : ""}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-1.5">Senha de acesso</label>
            <input type="password" value={pw} onChange={e => { setPw(e.target.value); setError(false); }} placeholder="Digite a senha" autoFocus
              className={`w-full px-4 py-3 rounded-xl border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all text-sm ${error ? "border-red-300 focus:ring-red-200" : "border-border focus:ring-ring/20"}`} />
            {error && <p className="mt-2 text-xs text-red-600 flex items-center gap-1"><AlertCircle size={12} /> Senha incorreta.</p>}
          </div>
          <button type="submit" className="w-full bg-foreground text-background py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
            Acessar Case
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-muted-foreground">Conteúdo disponível apenas em modo leitura. Reprodução proibida.</p>
      </div>
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}`}</style>
    </div>
  );
}

// ─── CMS Case Viewer ──────────────────────────────────────────────────────────

function useNDAProtection(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const blockContextMenu = (e: MouseEvent) => e.preventDefault();
    const blockPrintKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "P" || e.key === "s" || e.key === "S")) {
        e.preventDefault();
      }
    };
    const blockPrint = () => {
      // triggered by window.print()
    };
    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("keydown", blockPrintKey);
    window.addEventListener("beforeprint", blockPrint);
    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("keydown", blockPrintKey);
      window.removeEventListener("beforeprint", blockPrint);
    };
  }, [active]);
}

function CMSCaseViewer({ item, onBack, isAdmin, onEdit }: { item: CMSCase; onBack: () => void; isAdmin: boolean; onEdit?: () => void }) {
  useNDAProtection(item.isNDA);
  const { lang } = useLanguage();
  const isEn = lang === "en";
  const title = (isEn && item.titleEn) ? item.titleEn : item.title;
  const subtitle = (isEn && item.subtitleEn) ? item.subtitleEn : item.subtitle;
  const description = (isEn && item.descriptionEn) ? item.descriptionEn : item.description;
  const content = (isEn && item.contentEn) ? item.contentEn : item.content;

  return (
    <div
      className="min-h-screen bg-background"
      style={item.isNDA ? { userSelect: "none", WebkitUserSelect: "none" } as React.CSSProperties : undefined}
    >
      {/* NDA print block — visible only when printing */}
      {item.isNDA && (
        <style>{`
          @media print {
            body * { visibility: hidden !important; }
            #nda-print-block, #nda-print-block * { visibility: visible !important; }
            #nda-print-block {
              position: fixed; inset: 0; display: flex;
              flex-direction: column; align-items: center; justify-content: center;
              background: white; z-index: 99999;
            }
          }
        `}</style>
      )}
      {item.isNDA && <div id="nda-print-block" style={{ display: "none" }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e07c00" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <p style={{ fontSize: "24px", fontWeight: "700", marginTop: "24px", color: "#111" }}>Conteúdo protegido por NDA</p>
        <p style={{ fontSize: "16px", color: "#666", marginTop: "8px", textAlign: "center", maxWidth: "420px" }}>
          Este projeto está sob acordo de não divulgação e não pode ser reproduzido, impresso ou compartilhado fora do ambiente autorizado.
        </p>
      </div>}

      {/* NDA watermark overlay */}
      {item.isNDA && (
        <div
          aria-hidden
          style={{
            position: "fixed", inset: 0, zIndex: 40, pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 80px, rgba(0,0,0,0.018) 80px, rgba(0,0,0,0.018) 160px)",
          }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} style={{
              position: "absolute",
              top: `${(i % 5) * 22 + 10}%`,
              left: `${Math.floor(i / 5) * 28 - 4}%`,
              fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em",
              color: "rgba(0,0,0,0.055)", transform: "rotate(-35deg)",
              whiteSpace: "nowrap", userSelect: "none",
            }}>CONFIDENCIAL · NDA</span>
          ))}
        </div>
      )}

      <div className="min-h-screen bg-background">
      <div className="relative h-72 md:h-96 overflow-hidden" style={{ backgroundColor: item.coverColor }}>
        {item.coverImage && <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover opacity-40" />}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
          <div className="flex items-center gap-3 mb-4">
            {item.isNDA && <CmsBadge variant="nda"><Lock size={10} /> NDA</CmsBadge>}
            <PastelChip label={item.category} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{title}</h1>
          <p className="text-white/70 text-lg max-w-2xl">{subtitle}</p>
        </div>
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-sm">
            <ArrowLeft size={14} /> {isAdmin ? "Dashboard" : "Projetos"}
          </button>
          {isAdmin && onEdit && (
            <button onClick={onEdit} className="flex items-center gap-2 text-white/70 hover:text-white text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-sm transition-colors">
              <Edit2 size={14} /> Editar
            </button>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 pb-12 border-b border-border">
          {[{ label: "Cliente", value: item.client }, { label: "Papel", value: item.role }, { label: "Ano", value: item.year }, { label: "Duração", value: item.duration }].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
              <p className="text-sm font-medium text-foreground">{value || "—"}</p>
            </div>
          ))}
        </div>
        <p className="text-lg text-foreground leading-relaxed mb-10">{description}</p>
        <style>{`
          .case-body p { font-size: 11px; line-height: 1.8; margin-bottom: 10px; color: var(--muted-foreground, #6b7280); }
          .case-body h2 { font-size: 20px; font-weight: 600; line-height: 1.3; margin: 28px 0 10px; color: var(--foreground, #111); }
          .case-body h3 { font-size: 24px; font-weight: 700; line-height: 1.25; margin: 32px 0 12px; color: var(--foreground, #111); }
          .case-body blockquote {
            margin: 24px 0;
            padding: 20px 24px 20px 24px;
            background: rgba(122,158,136,0.07);
            border-left: 3px solid #7A9E88;
            border-radius: 0 12px 12px 0;
            font-style: italic;
            font-size: 15px;
            line-height: 1.7;
            color: #555;
            position: relative;
          }
          .case-body blockquote::before {
            content: '"';
            font-size: 60px;
            line-height: 1;
            color: #7A9E88;
            opacity: 0.3;
            position: absolute;
            top: 6px;
            left: 14px;
            font-family: Georgia, serif;
          }
          .case-body blockquote p { font-size: 15px; margin: 0; padding-left: 28px; color: inherit; }
          .case-body img {
            max-width: 100%;
            border-radius: 12px;
            margin: 24px auto;
            display: block;
            box-shadow: 0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.07);
          }
          .case-body strong { font-weight: 600; color: var(--foreground, #111); }
          .case-body em { font-style: italic; }
          .case-body [style*="text-align: center"], .case-body [style*="text-align:center"] { text-align: center; }
        `}</style>
        <div className="mb-12">
          {content.includes("<") ? (
            <div className="case-body" dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            content.split("\n\n").map((p, i) => <p key={i} className="text-muted-foreground leading-relaxed mb-4 text-[11px]">{p}</p>)
          )}
        </div>
        {item.results.length > 0 && (
          <div className="mb-12 p-6 bg-muted rounded-2xl">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Resultados</h3>
            <ul className="space-y-3">
              {item.results.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle size={16} className="text-emerald-600 mt-0.5 shrink-0" />{r}
                </li>
              ))}
            </ul>
          </div>
        )}
        {item.isNDA && (
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <Shield size={12} /> Acesso somente leitura. Conteúdo protegido por NDA. Reprodução ou distribuição proibida.
            </p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

// ─── Admin Login ──────────────────────────────────────────────────────────────

function AdminLogin({ onLogin, onBack }: { onLogin: () => void; onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) { onLogin(); }
    else { setError(true); }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-12 transition-colors">
          <ArrowLeft size={14} /> Voltar ao portfólio
        </button>
        <div className="w-12 h-12 rounded-2xl bg-foreground flex items-center justify-center mb-6">
          <Layers size={20} className="text-background" />
        </div>
        <h1 className="text-2xl font-semibold text-foreground mb-1">Admin — Portfolio CMS</h1>
        <p className="text-muted-foreground text-sm mb-8">Acesso restrito. Apenas usuários autorizados.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
            <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(false); }} placeholder="admin@portfolio.com"
              className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Senha</label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} value={password} onChange={e => { setPassword(e.target.value); setError(false); }} placeholder="••••••••"
                className={`w-full px-4 py-3 pr-11 rounded-xl border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all text-sm ${error ? "border-red-300 focus:ring-red-200" : "border-border focus:ring-ring/20"}`} />
              <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {error && <p className="mt-2 text-xs text-red-600 flex items-center gap-1"><AlertCircle size={12} /> Credenciais inválidas.</p>}
          </div>
          <button type="submit" className="w-full bg-foreground text-background py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity mt-2">
            Entrar
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-muted-foreground">admin@portfolio.com / Design2026!</p>
      </div>
    </div>
  );
}

// ─── Case Editor ──────────────────────────────────────────────────────────────

const EMPTY: Omit<CMSCase, "id" | "createdAt" | "updatedAt" | "history"> = {
  title: "", titleEn: "", subtitle: "", subtitleEn: "", description: "", descriptionEn: "", category: "Product Design",
  tags: [], status: "draft", isNDA: false, ndaPassword: "", coverColor: "#0B0B0C",
  coverImage: "", client: "", role: "", year: new Date().getFullYear().toString(),
  duration: "", content: "", contentEn: "", results: [], tools: [], links: [],
};

function CaseEditor({ item, onSave, onCancel, isNew, apiKey }: { item?: CMSCase; onSave: (d: CMSCase) => void; onCancel: () => void; isNew: boolean; apiKey: string }) {
  const [form, setForm] = useState<CMSCase>(item ? { ...item } : { ...EMPTY, id: newId(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), history: [] });
  const [tagInput, setTagInput] = useState("");
  const [toolInput, setToolInput] = useState("");
  const [tab, setTab] = useState<"info" | "content" | "access">("info");
  const [translating, setTranslating] = useState(false);

  const upd = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  const handleTranslateAll = async () => {
    if (!apiKey) { toast.error("Configure a chave API Claude primeiro (ícone ⚙ no menu)"); return; }
    setTranslating(true);
    try {
      const [titleEn, subtitleEn, descriptionEn, contentEn] = await Promise.all([
        form.title ? translateWithClaude(form.title, apiKey) : Promise.resolve(""),
        form.subtitle ? translateWithClaude(form.subtitle, apiKey) : Promise.resolve(""),
        form.description ? translateWithClaude(form.description, apiKey) : Promise.resolve(""),
        form.content ? translateWithClaude(form.content, apiKey) : Promise.resolve(""),
      ]);
      setForm(f => ({ ...f, titleEn, subtitleEn, descriptionEn, contentEn }));
      toast.success("Tradução gerada com sucesso!");
    } catch (e) {
      toast.error(`Erro na tradução: ${(e as Error).message}`);
    } finally {
      setTranslating(false);
    }
  };

  const addTag = () => { const t = tagInput.trim(); if (t && !form.tags.includes(t)) upd("tags", [...form.tags, t]); setTagInput(""); };
  const addTool = () => { const t = toolInput.trim(); if (t && !form.tools.includes(t)) upd("tools", [...form.tools, t]); setToolInput(""); };

  const handleSave = (status?: Status) => {
    if (!form.title.trim()) { toast.error("Título obrigatório"); return; }
    onSave({ ...form, status: status || form.status });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onCancel} className="text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft size={16} /></button>
          <span className="text-sm font-medium text-foreground">{isNew ? "Novo Case" : "Editar Case"}</span>
          <CmsBadge variant={form.status === "published" ? "published" : "draft"}>
            {form.status === "published" ? <><CheckCircle size={10} /> Publicado</> : <><Clock size={10} /> Rascunho</>}
          </CmsBadge>
        </div>
        <div className="flex items-center gap-2">
          <TranslateButton onClick={handleTranslateAll} loading={translating} />
          <button onClick={() => handleSave("draft")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-border hover:border-foreground px-4 py-2 rounded-lg transition-all">
            <Save size={13} /> Salvar rascunho
          </button>
          <button onClick={() => handleSave("published")} className="flex items-center gap-2 text-sm bg-foreground text-background px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
            <Send size={13} /> Publicar
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border px-6 shrink-0">
        {(["info", "content", "access"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px capitalize ${tab === t ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {t === "info" ? "Informações" : t === "content" ? "Conteúdo" : "Acesso & NDA"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {tab === "info" && (
          <>
            {/* Preview */}
            <div className="relative h-32 rounded-2xl overflow-hidden" style={{ backgroundColor: form.coverColor }}>
              {form.coverImage && <img src={form.coverImage} alt="" className="w-full h-full object-cover opacity-40" />}
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <p className="text-white font-semibold">{form.title || "Título do case"}</p>
                <p className="text-white/60 text-sm">{form.subtitle || "Subtítulo"}</p>
              </div>
            </div>
            {/* Cover color */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Cor do cover</label>
              <div className="flex gap-2 flex-wrap">
                {COVER_COLORS.map(c => (
                  <button key={c} onClick={() => upd("coverColor", c)} className={`w-8 h-8 rounded-full hover:scale-110 transition-transform ${form.coverColor === c ? "ring-2 ring-offset-2 ring-foreground" : ""}`} style={{ backgroundColor: c }} />
                ))}
                <input type="color" value={form.coverColor} onChange={e => upd("coverColor", e.target.value)} className="w-8 h-8 rounded-full cursor-pointer border-none" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Título *</label>
                <input value={form.title} onChange={e => upd("title", e.target.value)} placeholder="Título do case" className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Subtítulo</label>
                <input value={form.subtitle} onChange={e => upd("subtitle", e.target.value)} placeholder="Tagline curta" className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Descrição</label>
                <textarea value={form.description} onChange={e => upd("description", e.target.value)} rows={3} placeholder="Visão geral do case" className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Categoria</label>
                  <select value={form.category} onChange={e => upd("category", e.target.value as CaseCategory)} className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 appearance-none">
                    {CASE_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Cliente</label>
                  <input value={form.client} onChange={e => upd("client", e.target.value)} placeholder="Nome do cliente" className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Papel</label>
                  <input value={form.role} onChange={e => upd("role", e.target.value)} placeholder="Seu papel" className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Ano / Duração</label>
                  <div className="flex gap-2">
                    <input value={form.year} onChange={e => upd("year", e.target.value)} placeholder="2024" className="w-20 px-3 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
                    <input value={form.duration} onChange={e => upd("duration", e.target.value)} placeholder="6 meses" className="flex-1 px-3 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
                  </div>
                </div>
              </div>
            </div>
            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.tags.map(t => {
                  const { bg, color } = PASTEL_CHIPS[hashStr(t)];
                  return <span key={t} style={{ backgroundColor: bg, color }} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium">{t}<button onClick={() => upd("tags", form.tags.filter(x => x !== t))} style={{ color }}><X size={10} /></button></span>;
                })}
              </div>
              <div className="flex gap-2">
                <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="Adicionar tag…" className="flex-1 px-4 py-2 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
                <button onClick={addTag} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-all">Add</button>
              </div>
            </div>
            {/* Tools */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Ferramentas</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.tools.map(t => {
                  const { bg, color } = PASTEL_CHIPS[hashStr(t)];
                  return <span key={t} style={{ backgroundColor: bg, color }} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium">{t}<button onClick={() => upd("tools", form.tools.filter(x => x !== t))} style={{ color }}><X size={10} /></button></span>;
                })}
              </div>
              <div className="flex gap-2">
                <input value={toolInput} onChange={e => setToolInput(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTool())} placeholder="Adicionar ferramenta…" className="flex-1 px-4 py-2 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
                <button onClick={addTool} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-all">Add</button>
              </div>
            </div>
          </>
        )}

        {tab === "content" && (
          <>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-foreground">Corpo do case (PT)</label>
              </div>
              <RichTextEditor
                value={form.content}
                onChange={v => upd("content", v)}
                placeholder="Escreva o case completo aqui… Use a barra de ferramentas para formatar."
                minHeight={280}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
                Corpo do case (EN) <Globe size={12} className="text-muted-foreground" />
              </label>
              <RichTextEditor
                value={form.contentEn || ""}
                onChange={v => upd("contentEn", v)}
                placeholder="English version — use the Traduzir para EN button above or edit manually…"
                minHeight={200}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
                Descrição (EN) <Globe size={12} className="text-muted-foreground" />
              </label>
              <textarea value={form.descriptionEn || ""} onChange={e => upd("descriptionEn", e.target.value)} rows={3} placeholder="English overview…" className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 resize-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Resultados / Impacto</label>
              <div className="space-y-2 mb-2">
                {form.results.map((r, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input value={r} onChange={e => { const rs = [...form.results]; rs[i] = e.target.value; upd("results", rs); }} className="flex-1 px-4 py-2 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
                    <button onClick={() => upd("results", form.results.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-red-500 transition-colors"><X size={14} /></button>
                  </div>
                ))}
              </div>
              <button onClick={() => upd("results", [...form.results, ""])} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"><Plus size={13} /> Adicionar resultado</button>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">URL da imagem de capa</label>
              <input value={form.coverImage} onChange={e => upd("coverImage", e.target.value)} placeholder="https://images.unsplash.com/…" className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
            </div>
          </>
        )}

        {tab === "access" && (
          <>
            <div className="p-5 rounded-2xl border border-border">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="font-medium text-foreground text-sm">Protegido por NDA</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Visitantes precisam de senha para visualizar.</p>
                </div>
                <button onClick={() => upd("isNDA", !form.isNDA)} className={`w-10 h-6 rounded-full transition-colors relative shrink-0 ${form.isNDA ? "bg-foreground" : "bg-switch-background"}`}>
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${form.isNDA ? "left-[18px]" : "left-0.5"}`} />
                </button>
              </div>
            </div>
            {form.isNDA && (
              <div className="p-5 rounded-2xl border border-orange-200 bg-orange-50">
                <div className="flex items-center gap-2 mb-4">
                  <Shield size={15} className="text-orange-600" />
                  <p className="text-sm font-medium text-orange-800">Configurações de acesso NDA</p>
                </div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Senha de acesso</label>
                <input value={form.ndaPassword} onChange={e => upd("ndaPassword", e.target.value)} type="text" placeholder="Defina uma senha para visitantes"
                  className="w-full px-4 py-2.5 rounded-xl border border-orange-200 bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-orange-200" />
                <p className="mt-2 text-xs text-orange-600">Visitantes com essa senha têm acesso apenas em modo leitura.</p>
              </div>
            )}
            <div className="p-5 rounded-2xl border border-border">
              <p className="font-medium text-foreground text-sm mb-1">Status de publicação</p>
              <p className="text-xs text-muted-foreground mb-4">Controla a visibilidade para visitantes.</p>
              <div className="flex gap-3">
                {(["draft", "published"] as Status[]).map(s => (
                  <button key={s} onClick={() => upd("status", s)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${form.status === s ? "bg-foreground text-background border-foreground" : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"}`}>
                    {s === "published" ? <span className="flex items-center justify-center gap-2"><Globe size={13} /> Publicado</span> : <span className="flex items-center justify-center gap-2"><FileText size={13} /> Rascunho</span>}
                  </button>
                ))}
              </div>
            </div>
            {form.history.length > 0 && (
              <div>
                <p className="text-sm font-medium text-foreground mb-3">Histórico</p>
                <div className="space-y-2">
                  {form.history.map((h, i) => (
                    <div key={i} className="flex items-center justify-between text-xs py-2 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{h.action}</span>
                      <span className="text-muted-foreground">{fmtDate(h.date)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────

// ─── Recommendations Editor ───────────────────────────────────────────────────

const EMPTY_REC: Omit<Recommendation, "id"> = {
  name: "", role: "", company: "", relationship: "", date: "", text: "", photo: null,
};

function RecommendationsEditor({ items, onSave, onClose }: {
  items: Recommendation[];
  onSave: (r: Recommendation[]) => void;
  onClose: () => void;
}) {
  const [list, setList] = useState<Recommendation[]>(items.map(r => ({ ...r })));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Recommendation, "id">>(EMPTY_REC);

  const openEdit = (r: Recommendation) => { setEditingId(r.id); setForm({ name: r.name, role: r.role, company: r.company, relationship: r.relationship, date: r.date, text: r.text, photo: r.photo }); };
  const openNew = () => { setEditingId("__new__"); setForm({ ...EMPTY_REC }); };
  const cancel = () => setEditingId(null);

  const saveEdit = () => {
    if (!form.name.trim() || !form.text.trim()) { toast.error("Nome e texto são obrigatórios"); return; }
    if (editingId === "__new__") {
      setList(l => [...l, { id: `rec-${Date.now()}`, ...form }]);
    } else {
      setList(l => l.map(r => r.id === editingId ? { ...r, ...form } : r));
    }
    setEditingId(null);
  };

  const del = (id: string) => setList(l => l.filter(r => r.id !== id));
  const move = (id: string, dir: -1 | 1) => {
    const arr = [...list];
    const idx = arr.findIndex(r => r.id === id);
    const next = idx + dir;
    if (next < 0 || next >= arr.length) return;
    [arr[idx], arr[next]] = [arr[next], arr[idx]];
    setList(arr);
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) { toast.error("Máx. 3 MB"); return; }
    const reader = new FileReader();
    reader.onload = ev => setForm(f => ({ ...f, photo: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  // Avatar helper — initials fallback
  const initials = (name: string) => name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft size={16} /></button>
          <span className="text-sm font-medium text-foreground">Recomendações</span>
        </div>
        <button onClick={() => { onSave(list); toast.success("Recomendações salvas"); onClose(); }}
          className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
          <Save size={13} /> Salvar tudo
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-3">

        {/* Inline form */}
        {editingId !== null && (
          <div className="p-5 rounded-2xl border-2 border-foreground bg-muted/20 mb-4 space-y-4">
            <p className="text-sm font-semibold text-foreground">{editingId === "__new__" ? "Nova recomendação" : "Editar recomendação"}</p>

            {/* Photo upload */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-accent flex items-center justify-center shrink-0 border-2 border-border">
                {form.photo
                  ? <img src={form.photo} alt="" className="w-full h-full object-cover" />
                  : <span className="text-white text-sm font-bold">{form.name ? initials(form.name) : "?"}</span>}
              </div>
              <label className="cursor-pointer flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-border hover:border-foreground px-3 py-1.5 rounded-lg transition-all">
                <Upload size={13} /> {form.photo ? "Trocar foto" : "Adicionar foto"}
                <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
              </label>
              {form.photo && (
                <button onClick={() => setForm(f => ({ ...f, photo: null }))} className="text-xs text-red-500 hover:text-red-700 transition-colors">Remover</button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Nome *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Nome completo"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Cargo</label>
                <input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="Head of Product"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Empresa</label>
                <input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Nome da empresa"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Data</label>
                <input value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} placeholder="Novembro de 2024"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Relação (como no LinkedIn)</label>
              <input value={form.relationship} onChange={e => setForm(f => ({ ...f, relationship: e.target.value }))} placeholder="Ex: Carlos gerenciou Keziah diretamente"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Texto da recomendação *</label>
              <textarea value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} rows={5}
                placeholder="Cole aqui o texto exato da recomendação do LinkedIn..."
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 resize-none leading-relaxed" />
            </div>

            <div className="flex gap-2">
              <button onClick={saveEdit} className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                <CheckCircle size={13} /> Confirmar
              </button>
              <button onClick={cancel} className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-all">
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* List */}
        {list.map((r, idx) => (
          <div key={r.id} className="group flex items-start gap-3 p-4 rounded-xl border border-border hover:border-foreground/20 transition-all">
            <div className="flex flex-col gap-0.5 shrink-0 mt-1">
              <button onClick={() => move(r.id, -1)} disabled={idx === 0} className="p-0.5 rounded text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"><ChevronUp size={13} /></button>
              <button onClick={() => move(r.id, 1)} disabled={idx === list.length - 1} className="p-0.5 rounded text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"><ChevronDown size={13} /></button>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-accent flex items-center justify-center shrink-0">
              {r.photo
                ? <img src={r.photo} alt={r.name} className="w-full h-full object-cover" />
                : <span className="text-white text-xs font-bold">{initials(r.name)}</span>}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{r.name || "—"}</p>
              <p className="text-xs text-muted-foreground">{r.role}{r.company ? ` · ${r.company}` : ""}</p>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2 italic">"{r.text}"</p>
            </div>
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <button onClick={() => openEdit(r)} className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><Edit2 size={14} /></button>
              <button onClick={() => del(r.id)} className="p-1.5 rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}

        {editingId === null && (
          <button onClick={openNew}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-all">
            <Plus size={14} /> Adicionar recomendação
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Talks Editor ─────────────────────────────────────────────────────────────

const TALK_TYPES: TalkType[] = ["Palestra", "Aula", "Conversa", "Podcast", "Workshop", "Painel"];

const EMPTY_TALK: Omit<Talk, "id"> = {
  title: "", event: "", type: "Palestra", date: "", location: "",
  description: "", link: "", coverImage: null, tags: [],
};

function TalksEditor({ section, onSave, onClose, apiKey = "" }: {
  section: TalksSection;
  onSave: (s: TalksSection) => void;
  onClose: () => void;
  apiKey?: string;
}) {
  const [visible, setVisible] = useState(section.visible);
  const [talks, setTalks] = useState<Talk[]>(section.talks.map(t => ({ ...t })));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Talk, "id">>(EMPTY_TALK);
  const [tagInput, setTagInput] = useState("");
  const [translatingId, setTranslatingId] = useState<string | null>(null);

  const handleTranslateTalk = async (talk: Talk) => {
    if (!apiKey) { toast.error("Configure a chave API Claude primeiro"); return; }
    setTranslatingId(talk.id);
    try {
      const [titleEn, descriptionEn] = await Promise.all([
        talk.title ? translateWithClaude(talk.title, apiKey) : Promise.resolve(""),
        talk.description ? translateWithClaude(talk.description, apiKey) : Promise.resolve(""),
      ]);
      setTalks(l => l.map(t => t.id === talk.id ? { ...t, titleEn, descriptionEn } : t));
      toast.success("Palestra traduzida!");
    } catch (e) {
      toast.error(`Erro: ${(e as Error).message}`);
    } finally {
      setTranslatingId(null);
    }
  };

  const openEdit = (t: Talk) => {
    setEditingId(t.id);
    setForm({ title: t.title, event: t.event, type: t.type, date: t.date, location: t.location, description: t.description, link: t.link, coverImage: t.coverImage, tags: [...t.tags] });
    setTagInput("");
  };
  const openNew = () => { setEditingId("__new__"); setForm({ ...EMPTY_TALK, tags: [] }); setTagInput(""); };
  const cancel = () => setEditingId(null);

  const saveEdit = () => {
    if (!form.title.trim()) { toast.error("Título obrigatório"); return; }
    if (editingId === "__new__") {
      setTalks(l => [{ id: `talk-${Date.now()}`, ...form }, ...l]);
    } else {
      setTalks(l => l.map(t => t.id === editingId ? { ...t, ...form } : t));
    }
    setEditingId(null);
  };

  const del = (id: string) => setTalks(l => l.filter(t => t.id !== id));
  const move = (id: string, dir: -1 | 1) => {
    const arr = [...talks];
    const idx = arr.findIndex(t => t.id === id);
    const next = idx + dir;
    if (next < 0 || next >= arr.length) return;
    [arr[idx], arr[next]] = [arr[next], arr[idx]];
    setTalks(arr);
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) setForm(f => ({ ...f, tags: [...f.tags, t] }));
    setTagInput("");
  };

  const handleCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) { toast.error("Máx. 3 MB"); return; }
    const reader = new FileReader();
    reader.onload = ev => setForm(f => ({ ...f, coverImage: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const TYPE_COLORS: Record<TalkType, string> = {
    Palestra: "bg-purple-50 text-purple-700 border-purple-200",
    Aula: "bg-blue-50 text-blue-700 border-blue-200",
    Conversa: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Podcast: "bg-orange-50 text-orange-700 border-orange-200",
    Workshop: "bg-amber-50 text-amber-700 border-amber-200",
    Painel: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft size={16} /></button>
          <span className="text-sm font-medium text-foreground">Palestras & Talks</span>
        </div>
        <button
          onClick={() => { onSave({ visible, talks }); toast.success("Palestras salvas"); onClose(); }}
          className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Save size={13} /> Salvar tudo
        </button>
      </div>

      {/* Visibility toggle */}
      <div className="px-6 py-4 border-b border-border shrink-0">
        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/40">
          <div>
            <p className="text-sm font-medium text-foreground">Visível no menu</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {visible ? "A seção aparece na navegação do portfólio" : "Seção oculta — conteúdo salvo mas não exibido"}
            </p>
          </div>
          <button
            onClick={() => setVisible(v => !v)}
            className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${visible ? "bg-foreground" : "bg-switch-background"}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${visible ? "left-[22px]" : "left-0.5"}`} />
          </button>
        </div>
        {!visible && (
          <p className="mt-2 text-xs text-amber-600 flex items-center gap-1.5">
            <EyeOff size={12} /> Seção oculta. Ative o toggle para exibir no portfólio.
          </p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-3">

        {/* Inline form */}
        {editingId !== null && (
          <div className="p-5 rounded-2xl border-2 border-foreground bg-muted/20 mb-4 space-y-4">
            <p className="text-sm font-semibold text-foreground">{editingId === "__new__" ? "Nova entrada" : "Editar entrada"}</p>

            {/* Cover image */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-2">Imagem de capa (opcional)</label>
              {form.coverImage ? (
                <div className="relative w-full h-28 rounded-xl overflow-hidden group">
                  <img src={form.coverImage} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setForm(f => ({ ...f, coverImage: null }))}
                    className="absolute top-2 right-2 bg-black/60 text-white rounded-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={13} />
                  </button>
                </div>
              ) : (
                <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground border border-dashed border-border hover:border-foreground px-4 py-2.5 rounded-xl transition-all w-fit">
                  <Upload size={13} /> Adicionar imagem
                  <input type="file" accept="image/*" className="hidden" onChange={handleCover} />
                </label>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-foreground mb-1">Título *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Título da palestra ou aula"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Tipo</label>
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as TalkType }))}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 appearance-none">
                  {TALK_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Evento / Programa</label>
                <input value={form.event} onChange={e => setForm(f => ({ ...f, event: e.target.value }))} placeholder="Nome do evento"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Data</label>
                <input value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} placeholder="Outubro 2024"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Local</label>
                <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Recife, PE ou Online"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-foreground mb-1">Link (gravação, slides…)</label>
                <input value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} placeholder="https://…"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-foreground mb-1">Descrição</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
                  placeholder="Descreva o tema abordado…"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 resize-none leading-relaxed" />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-medium text-foreground mb-2">Tags</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {form.tags.map(t => {
                  const { bg, color } = PASTEL_CHIPS[hashStr(t)];
                  return (
                    <span key={t} style={{ backgroundColor: bg, color }} className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium">
                      {t}<button onClick={() => setForm(f => ({ ...f, tags: f.tags.filter(x => x !== t) }))} style={{ color }}><X size={10} /></button>
                    </span>
                  );
                })}
              </div>
              <div className="flex gap-2">
                <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())}
                  placeholder="Adicionar tag…"
                  className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
                <button onClick={addTag} className="px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-all">Add</button>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={saveEdit} className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                <CheckCircle size={13} /> Confirmar
              </button>
              <button onClick={cancel} className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-all">
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* List */}
        {talks.map((t, idx) => (
          <div key={t.id} className="group flex items-start gap-3 p-4 rounded-xl border border-border hover:border-foreground/20 transition-all">
            <div className="flex flex-col gap-0.5 shrink-0 mt-1">
              <button onClick={() => move(t.id, -1)} disabled={idx === 0} className="p-0.5 rounded text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"><ChevronUp size={13} /></button>
              <button onClick={() => move(t.id, 1)} disabled={idx === talks.length - 1} className="p-0.5 rounded text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"><ChevronDown size={13} /></button>
            </div>
            {t.coverImage && (
              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-muted">
                <img src={t.coverImage} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${TYPE_COLORS[t.type]}`}>{t.type}</span>
                <span className="text-sm font-semibold text-foreground truncate">{t.title || "—"}</span>
              </div>
              <p className="text-xs text-muted-foreground">{t.event}{t.location ? ` · ${t.location}` : ""}{t.date ? ` · ${t.date}` : ""}</p>
            </div>
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <button onClick={() => handleTranslateTalk(t)} title="Traduzir EN" disabled={translatingId === t.id}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-40">
                <Globe size={14} />
              </button>
              <button onClick={() => openEdit(t)} className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><Edit2 size={14} /></button>
              <button onClick={() => del(t.id)} className="p-1.5 rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}

        {editingId === null && (
          <button onClick={openNew}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-all">
            <Plus size={14} /> Adicionar entrada
          </button>
        )}
      </div>
    </div>
  );
}

// ─── About Editor ─────────────────────────────────────────────────────────────

function AboutEditor({ content, onSave, onClose, apiKey = "" }: {
  content: AboutContent;
  onSave: (c: AboutContent) => void;
  onClose: () => void;
  apiKey?: string;
}) {
  const [form, setForm] = useState<AboutContent>({
    heroTitle: content.heroTitle ?? "",
    heroSubtitle: content.heroSubtitle ?? "",
    photo: content.photo ?? null,
    cvFile: content.cvFile ?? null,
    cvFileName: content.cvFileName ?? "Keziah_Santos_CV.pdf",
    bio: [...content.bio],
    bioEn: content.bioEn ? [...content.bioEn] : undefined,
    differentials: [...content.differentials],
    differentialsEn: content.differentialsEn ? [...content.differentialsEn] : undefined,
    skills: content.skills.map(s => ({ ...s })),
  });
  const [tab, setTab] = useState<"photo" | "cv" | "bio" | "differentials" | "skills">("photo");
  const [translatingAbout, setTranslatingAbout] = useState(false);

  const handleTranslateAbout = async () => {
    if (!apiKey) { toast.error("Configure a chave API Claude primeiro"); return; }
    setTranslatingAbout(true);
    try {
      const [bioEn, differentialsEn] = await Promise.all([
        Promise.all(form.bio.map(b => translateWithClaude(b, apiKey))),
        Promise.all(form.differentials.map(d => translateWithClaude(d, apiKey))),
      ]);
      setForm(f => ({ ...f, bioEn, differentialsEn }));
      toast.success("Bio e diferenciais traduzidos!");
    } catch (e) {
      toast.error(`Erro: ${(e as Error).message}`);
    } finally {
      setTranslatingAbout(false);
    }
  };

  const handleSave = () => { onSave(form); toast.success("Sobre mim salvo"); onClose(); };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("Imagem muito grande. Máximo 5 MB."); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm(f => ({ ...f, photo: ev.target?.result as string }));
      toast.success("Foto carregada");
    };
    reader.readAsDataURL(file);
  };

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { toast.error("PDF muito grande. Máximo 10 MB."); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm(f => ({ ...f, cvFile: ev.target?.result as string, cvFileName: file.name }));
      toast.success("CV carregado: " + file.name);
    };
    reader.readAsDataURL(file);
  };

  // Bio helpers
  const updBio = (i: number, v: string) => setForm(f => { const b = [...f.bio]; b[i] = v; return { ...f, bio: b }; });
  const addBio = () => setForm(f => ({ ...f, bio: [...f.bio, ""] }));
  const removeBio = (i: number) => setForm(f => ({ ...f, bio: f.bio.filter((_, j) => j !== i) }));

  // Differentials helpers
  const updDiff = (i: number, v: string) => setForm(f => { const d = [...f.differentials]; d[i] = v; return { ...f, differentials: d }; });
  const addDiff = () => setForm(f => ({ ...f, differentials: [...f.differentials, ""] }));
  const removeDiff = (i: number) => setForm(f => ({ ...f, differentials: f.differentials.filter((_, j) => j !== i) }));
  const moveDiff = (i: number, dir: -1 | 1) => {
    const arr = [...form.differentials];
    const next = i + dir;
    if (next < 0 || next >= arr.length) return;
    [arr[i], arr[next]] = [arr[next], arr[i]];
    setForm(f => ({ ...f, differentials: arr }));
  };

  // Skills helpers
  const updSkill = (i: number, key: keyof SkillItem, v: string) => setForm(f => { const s = [...f.skills]; s[i] = { ...s[i], [key]: v }; return { ...f, skills: s }; });
  const addSkill = () => setForm(f => ({ ...f, skills: [...f.skills, { name: "", description: "" }] }));
  const removeSkill = (i: number) => setForm(f => ({ ...f, skills: f.skills.filter((_, j) => j !== i) }));

  const tabs = [
    { id: "photo", label: "Foto" },
    { id: "cv", label: "Currículo (CV)" },
    { id: "bio", label: "Bio" },
    { id: "differentials", label: "Diferenciais" },
    { id: "skills", label: "Habilidades" },
  ] as const;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft size={16} /></button>
          <span className="text-sm font-medium text-foreground">Sobre Mim — About</span>
        </div>
        <div className="flex items-center gap-2">
          <TranslateButton onClick={handleTranslateAbout} loading={translatingAbout} label="Traduzir Bio EN" />
          <button onClick={handleSave} className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
            <Save size={13} /> Salvar tudo
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border px-6 shrink-0">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${tab === t.id ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">

        {/* Photo tab */}
        {tab === "photo" && (
          <div className="space-y-6">
            <p className="text-xs text-muted-foreground">
              A foto aparece ao lado da sua bio na página About e também na prévia da Home. Formatos: JPG, PNG, WebP. Máx. 5 MB.
            </p>

            {/* Current photo preview */}
            {form.photo ? (
              <div className="relative w-48 group">
                <img
                  src={form.photo}
                  alt="Foto de perfil"
                  className="w-48 h-56 object-cover rounded-2xl border border-border shadow-sm"
                />
                <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <label className="cursor-pointer flex items-center gap-1.5 bg-white text-foreground text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-secondary transition-colors">
                    <Upload size={12} /> Trocar
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  </label>
                  <button
                    onClick={() => setForm(f => ({ ...f, photo: null }))}
                    className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 size={12} /> Remover
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-56 rounded-2xl border-2 border-dashed border-border hover:border-foreground/40 transition-colors cursor-pointer bg-muted/30 hover:bg-muted/50 group">
                <div className="flex flex-col items-center gap-3 text-center px-6">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-secondary transition-colors">
                    <Upload size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Clique para adicionar sua foto</p>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG ou WebP · Máx. 5 MB</p>
                  </div>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </label>
            )}

            {form.photo && (
              <p className="text-xs text-muted-foreground">
                Passe o mouse sobre a foto para ver as opções de trocar ou remover.
              </p>
            )}
          </div>
        )}

        {/* CV tab */}
        {tab === "cv" && (
          <div className="space-y-6">
            <p className="text-xs text-muted-foreground">
              Faça upload do seu CV em PDF. Ele será disponibilizado como botão "Baixar CV" na página Sobre e na Home. Máx. 10 MB.
            </p>

            {form.cvFile ? (
              <div className="p-5 rounded-2xl border border-border bg-muted/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><path d="M9 13h6M9 17h4"/></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{form.cvFileName}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">PDF carregado · pronto para download</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={form.cvFile}
                    download={form.cvFileName}
                    className="text-xs text-muted-foreground hover:text-foreground border border-border hover:border-foreground px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5"
                  >
                    <Download size={12} /> Testar
                  </a>
                  <label className="cursor-pointer text-xs text-muted-foreground hover:text-foreground border border-border hover:border-foreground px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5">
                    <Upload size={12} /> Substituir
                    <input type="file" accept="application/pdf" className="hidden" onChange={handleCVUpload} />
                  </label>
                  <button
                    onClick={() => setForm(f => ({ ...f, cvFile: null, cvFileName: "Keziah_Santos_CV.pdf" }))}
                    className="text-xs text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition-all"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-40 rounded-2xl border-2 border-dashed border-border hover:border-foreground/40 transition-colors cursor-pointer bg-muted/30 hover:bg-muted/50 group">
                <div className="flex flex-col items-center gap-3 text-center px-6">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-secondary transition-colors">
                    <Upload size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Clique para fazer upload do CV</p>
                    <p className="text-xs text-muted-foreground mt-1">Somente PDF · Máx. 10 MB</p>
                  </div>
                </div>
                <input type="file" accept="application/pdf" className="hidden" onChange={handleCVUpload} />
              </label>
            )}

            {form.cvFile && (
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Nome do arquivo para download</label>
                <input
                  value={form.cvFileName}
                  onChange={e => setForm(f => ({ ...f, cvFileName: e.target.value }))}
                  placeholder="Keziah_Santos_CV.pdf"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
                <p className="mt-1.5 text-xs text-muted-foreground">Este é o nome que o arquivo terá ao ser baixado pelo visitante.</p>
              </div>
            )}
          </div>
        )}

        {/* Bio tab */}
        {tab === "bio" && (
          <>
            {/* Hero text — shown on the home page */}
            <div className="p-4 rounded-2xl border border-border bg-muted/30 space-y-3 mb-2">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Frase principal — Home</p>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Título (frase grande)</label>
                <textarea
                  value={form.heroTitle}
                  onChange={e => setForm(f => ({ ...f, heroTitle: e.target.value }))}
                  rows={2}
                  placeholder="Designing high-impact digital products with clarity and strategy."
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 resize-none leading-relaxed"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Subtítulo</label>
                <textarea
                  value={form.heroSubtitle}
                  onChange={e => setForm(f => ({ ...f, heroSubtitle: e.target.value }))}
                  rows={2}
                  placeholder="Senior Product Designer especializada em UX/UI…"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 resize-none leading-relaxed"
                />
              </div>
            </div>

            <p className="text-xs text-muted-foreground">Cada bloco vira um parágrafo na página About. Adicione quantos quiser.</p>
            {form.bio.map((p, i) => (
              <div key={i} className="flex gap-2 items-start">
                <textarea
                  value={p}
                  onChange={e => updBio(i, e.target.value)}
                  rows={3}
                  placeholder={`Parágrafo ${i + 1}`}
                  className="flex-1 px-4 py-3 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 resize-none leading-relaxed"
                />
                <button onClick={() => removeBio(i)} className="mt-2 text-muted-foreground hover:text-red-500 transition-colors shrink-0"><X size={15} /></button>
              </div>
            ))}
            <button onClick={addBio} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors">
              <Plus size={13} /> Adicionar parágrafo
            </button>
          </>
        )}

        {/* Differentials tab */}
        {tab === "differentials" && (
          <>
            <p className="text-xs text-muted-foreground">Aparecem como bullets na seção de diferenciais.</p>
            <div className="space-y-2">
              {form.differentials.map((d, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <div className="flex flex-col gap-0.5 shrink-0">
                    <button onClick={() => moveDiff(i, -1)} disabled={i === 0} className="p-0.5 rounded text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"><ChevronUp size={13} /></button>
                    <button onClick={() => moveDiff(i, 1)} disabled={i === form.differentials.length - 1} className="p-0.5 rounded text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"><ChevronDown size={13} /></button>
                  </div>
                  <input
                    value={d}
                    onChange={e => updDiff(i, e.target.value)}
                    placeholder="Descreva um diferencial"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
                  />
                  <button onClick={() => removeDiff(i)} className="text-muted-foreground hover:text-red-500 transition-colors shrink-0"><X size={14} /></button>
                </div>
              ))}
            </div>
            <button onClick={addDiff} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors">
              <Plus size={13} /> Adicionar diferencial
            </button>
          </>
        )}

        {/* Skills tab */}
        {tab === "skills" && (
          <>
            <p className="text-xs text-muted-foreground">Cada habilidade aparece como card na página About.</p>
            <div className="space-y-3">
              {form.skills.map((s, i) => (
                <div key={i} className="p-4 rounded-xl border border-border space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      value={s.name}
                      onChange={e => updSkill(i, "name", e.target.value)}
                      placeholder="Nome da habilidade"
                      className="flex-1 px-3 py-2 rounded-lg border border-border bg-input-background text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring/20"
                    />
                    <button onClick={() => removeSkill(i)} className="text-muted-foreground hover:text-red-500 transition-colors shrink-0"><X size={14} /></button>
                  </div>
                  <textarea
                    value={s.description}
                    onChange={e => updSkill(i, "description", e.target.value)}
                    rows={2}
                    placeholder="Descrição da habilidade"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 resize-none"
                  />
                </div>
              ))}
            </div>
            <button onClick={addSkill} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors">
              <Plus size={13} /> Adicionar habilidade
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Journey (Experience) Editor ─────────────────────────────────────────────

const EMPTY_EXP: Omit<ExperienceItem, "id"> = {
  role: "", company: "", period: "", current: false, description: [""],
};

function JourneyEditor({ items, onSave, onClose, apiKey = "" }: {
  items: ExperienceItem[];
  onSave: (items: ExperienceItem[]) => void;
  onClose: () => void;
  apiKey?: string;
}) {
  const [list, setList] = useState<ExperienceItem[]>(items.map(i => ({ ...i })));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<ExperienceItem, "id">>(EMPTY_EXP);
  const [translatingId, setTranslatingId] = useState<string | null>(null);

  const handleTranslateItem = async (item: ExperienceItem) => {
    if (!apiKey) { toast.error("Configure a chave API Claude (botão API Claude no menu)"); return; }
    setTranslatingId(item.id);
    try {
      const descriptionEn = await Promise.all(item.description.map(d => translateWithClaude(d, apiKey)));
      setList(l => l.map(i => i.id === item.id ? { ...i, descriptionEn } : i));
      toast.success("Experiência traduzida!");
    } catch (e) {
      toast.error(`Erro: ${(e as Error).message}`);
    } finally {
      setTranslatingId(null);
    }
  };

  const openEdit = (item: ExperienceItem) => {
    setEditingId(item.id);
    setForm({ role: item.role, company: item.company, period: item.period, current: item.current, description: [...item.description] });
  };

  const openNew = () => {
    setEditingId("__new__");
    setForm({ ...EMPTY_EXP, description: [""] });
  };

  const cancelEdit = () => { setEditingId(null); };

  const saveEdit = () => {
    if (!form.role.trim() || !form.company.trim()) { toast.error("Cargo e empresa são obrigatórios"); return; }
    const cleanDesc = form.description.filter(d => d.trim() !== "");
    if (editingId === "__new__") {
      setList(l => [{ id: `exp-${Date.now()}`, ...form, description: cleanDesc }, ...l]);
    } else {
      setList(l => l.map(i => i.id === editingId ? { ...i, ...form, description: cleanDesc } : i));
    }
    setEditingId(null);
  };

  const deleteItem = (id: string) => setList(l => l.filter(i => i.id !== id));

  const moveItem = (id: string, dir: -1 | 1) => {
    const arr = [...list];
    const idx = arr.findIndex(i => i.id === id);
    const next = idx + dir;
    if (next < 0 || next >= arr.length) return;
    [arr[idx], arr[next]] = [arr[next], arr[idx]];
    setList(arr);
  };

  const updDesc = (idx: number, val: string) =>
    setForm(f => { const d = [...f.description]; d[idx] = val; return { ...f, description: d }; });

  const addDesc = () => setForm(f => ({ ...f, description: [...f.description, ""] }));
  const removeDesc = (idx: number) => setForm(f => ({ ...f, description: f.description.filter((_, i) => i !== idx) }));

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft size={16} /></button>
          <span className="text-sm font-medium text-foreground">My Journey — Experiência</span>
        </div>
        <button
          onClick={() => { onSave(list); toast.success("Experiências salvas"); onClose(); }}
          className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Save size={13} /> Salvar tudo
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {/* Inline edit form */}
        {editingId !== null && (
          <div className="p-5 rounded-2xl border-2 border-foreground bg-muted/30 mb-4 space-y-4">
            <p className="text-sm font-semibold text-foreground mb-3">{editingId === "__new__" ? "Nova experiência" : "Editar experiência"}</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Cargo *</label>
                <input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="Senior Product Designer"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Empresa *</label>
                <input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Nome da empresa"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Período</label>
                <input value={form.period} onChange={e => setForm(f => ({ ...f, period: e.target.value }))} placeholder="2022 - Presente"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, current: !f.current }))}
                    className={`w-9 h-5 rounded-full transition-colors relative ${form.current ? "bg-foreground" : "bg-switch-background"}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${form.current ? "left-[18px]" : "left-0.5"}`} />
                  </button>
                  <span className="text-sm text-foreground">Emprego atual</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-2">Descrição / Atividades</label>
              <div className="space-y-2">
                {form.description.map((d, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={d} onChange={e => updDesc(i, e.target.value)} placeholder="Descreva uma atividade ou conquista"
                      className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20" />
                    <button onClick={() => removeDesc(i)} className="text-muted-foreground hover:text-red-500 transition-colors"><X size={14} /></button>
                  </div>
                ))}
              </div>
              <button onClick={addDesc} className="mt-2 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                <Plus size={12} /> Adicionar linha
              </button>
            </div>

            <div className="flex gap-2 pt-1">
              <button onClick={saveEdit} className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                <CheckCircle size={13} /> Confirmar
              </button>
              <button onClick={cancelEdit} className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-all">
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* List */}
        {list.map((item, idx) => (
          <div key={item.id} className="group flex items-start gap-3 p-4 rounded-xl border border-border hover:border-foreground/20 transition-all">
            {/* Move arrows */}
            <div className="flex flex-col gap-0.5 shrink-0 mt-1">
              <button onClick={() => moveItem(item.id, -1)} disabled={idx === 0}
                className="p-0.5 rounded text-muted-foreground hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed transition-colors">
                <ChevronUp size={13} />
              </button>
              <button onClick={() => moveItem(item.id, 1)} disabled={idx === list.length - 1}
                className="p-0.5 rounded text-muted-foreground hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed transition-colors">
                <ChevronDown size={13} />
              </button>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-semibold text-foreground">{item.role || "—"}</span>
                {item.current && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium">Atual</span>}
              </div>
              <p className="text-xs text-accent font-medium">{item.company}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.period}</p>
              {item.description.length > 0 && (
                <ul className="mt-2 space-y-0.5">
                  {item.description.slice(0, 2).map((d, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex gap-1.5"><span className="text-accent">•</span>{d}</li>
                  ))}
                  {item.description.length > 2 && (
                    <li className="text-xs text-muted-foreground">+{item.description.length - 2} mais…</li>
                  )}
                </ul>
              )}
            </div>

            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <button onClick={() => handleTranslateItem(item)} title="Traduzir EN" disabled={translatingId === item.id}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-40">
                <Globe size={14} />
              </button>
              <button onClick={() => openEdit(item)} title="Editar"
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><Edit2 size={14} /></button>
              <button onClick={() => deleteItem(item.id)} title="Excluir"
                className="p-1.5 rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}

        {/* Add new */}
        {editingId === null && (
          <button onClick={openNew}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-all">
            <Plus size={14} /> Adicionar experiência
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Dashboard section type ───────────────────────────────────────────────────

type DashSection = "list" | "editor" | "preview";

function AdminDashboard({ cases, onCasesChange, experience, onExperienceChange, aboutContent, onAboutChange, recommendations, onRecommendationsChange, talksSection, onTalksChange, onLogout }: {
  cases: CMSCase[];
  onCasesChange: (c: CMSCase[]) => void;
  experience: ExperienceItem[];
  onExperienceChange: (e: ExperienceItem[]) => void;
  aboutContent: AboutContent;
  onAboutChange: (a: AboutContent) => void;
  recommendations: Recommendation[];
  onRecommendationsChange: (r: Recommendation[]) => void;
  talksSection: TalksSection;
  onTalksChange: (t: TalksSection) => void;
  onLogout: () => void;
}) {
  const [section, setSection] = useState<DashSection>("list");
  const [showJourney, setShowJourney] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showRecs, setShowRecs] = useState(false);
  const [showTalks, setShowTalks] = useState(false);
  const [editing, setEditing] = useState<CMSCase | undefined>();
  const [isNew, setIsNew] = useState(false);
  const [preview, setPreview] = useState<CMSCase | undefined>();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | Status>("all");
  const [filterNDA, setFilterNDA] = useState<"all" | "nda" | "public">("all");
  const [delConfirm, setDelConfirm] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState(() => loadApiKey());
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKeyDraft, setApiKeyDraft] = useState("");
  // drag state
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const isFiltering = search !== "" || filterStatus !== "all" || filterNDA !== "all";

  const filtered = cases.filter(c => {
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStatus !== "all" && c.status !== filterStatus) return false;
    if (filterNDA === "nda" && !c.isNDA) return false;
    if (filterNDA === "public" && c.isNDA) return false;
    return true;
  });

  const stats = { total: cases.length, published: cases.filter(c => c.status === "published").length, draft: cases.filter(c => c.status === "draft").length, nda: cases.filter(c => c.isNDA).length };

  const handleSave = (data: CMSCase) => {
    const now = new Date().toISOString();
    const entry: HistoryEntry = { action: data.status === "published" ? "Publicado" : "Salvo como rascunho", date: now };
    const updated = { ...data, updatedAt: now, history: [entry, ...(data.history || [])] };
    if (isNew) { onCasesChange([updated, ...cases]); toast.success("Case criado"); }
    else { onCasesChange(cases.map(c => c.id === updated.id ? updated : c)); toast.success("Case atualizado"); }
    setSection("list"); setEditing(undefined); setIsNew(false);
  };

  const handleDelete = (id: string) => { onCasesChange(cases.filter(c => c.id !== id)); setDelConfirm(null); toast.success("Case excluído"); };
  const handleDuplicate = (c: CMSCase) => {
    const now = new Date().toISOString();
    const dup = { ...c, id: newId(), title: `${c.title} (Cópia)`, status: "draft" as Status, createdAt: now, updatedAt: now, history: [{ action: "Duplicado", date: now }] };
    onCasesChange([dup, ...cases]); toast.success("Case duplicado como rascunho");
  };

  // Reorder by swapping positions in the full cases array
  const reorder = (fromId: string, toId: string) => {
    if (fromId === toId) return;
    const arr = [...cases];
    const from = arr.findIndex(c => c.id === fromId);
    const to = arr.findIndex(c => c.id === toId);
    if (from === -1 || to === -1) return;
    const [item] = arr.splice(from, 1);
    arr.splice(to, 0, item);
    onCasesChange(arr);
  };

  const moveCase = (id: string, dir: -1 | 1) => {
    const arr = [...cases];
    const idx = arr.findIndex(c => c.id === id);
    const next = idx + dir;
    if (next < 0 || next >= arr.length) return;
    [arr[idx], arr[next]] = [arr[next], arr[idx]];
    onCasesChange(arr);
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDragId(id);
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setOverId(id);
  };
  const handleDrop = (e: React.DragEvent, toId: string) => {
    e.preventDefault();
    if (dragId) reorder(dragId, toId);
    setDragId(null);
    setOverId(null);
  };
  const handleDragEnd = () => { setDragId(null); setOverId(null); };

  // Shared sidebar to avoid repetition
  type ActiveSection = "cases" | "about" | "journey" | "recs" | "talks";
  const resetSections = () => { setShowAbout(false); setShowJourney(false); setShowRecs(false); setShowTalks(false); };

  const AdminSidebar = ({ active }: { active: ActiveSection }) => (
    <aside className="w-56 shrink-0 bg-foreground flex flex-col">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center"><Layers size={14} className="text-white" /></div>
          <div><p className="text-white text-xs font-semibold leading-none">Portfolio CMS</p><p className="text-white/40 text-[10px] mt-0.5">Admin</p></div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {([
          { id: "cases", label: "Cases", icon: LayoutGrid, action: () => resetSections() },
          { id: "about", label: "Sobre Mim", icon: UserCircle, action: () => { resetSections(); setShowAbout(true); } },
          { id: "recs", label: "Recomendações", icon: Quote, action: () => { resetSections(); setShowRecs(true); } },
          { id: "talks", label: "Palestras & Talks", icon: Mic, action: () => { resetSections(); setShowTalks(true); }, badge: !talksSection.visible },
          { id: "journey", label: "My Journey", icon: Briefcase, action: () => { resetSections(); setShowJourney(true); } },
        ] as { id: ActiveSection; label: string; icon: React.ElementType; action: () => void; badge?: boolean }[]).map(item => (
          <button key={item.id} onClick={item.action}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${active === item.id ? "bg-white/10 text-white" : "text-white/50 hover:text-white hover:bg-white/5"}`}>
            <item.icon size={14} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && <EyeOff size={11} className="opacity-60" title="Oculto no portfólio" />}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-white/10 space-y-0.5">
        <button onClick={() => { setApiKeyDraft(apiKey); setShowApiKeyInput(s => !s); }}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors">
          <Globe size={14} /> API Claude {apiKey ? <span className="ml-auto text-[10px] text-emerald-400">✓</span> : null}
        </button>
        <button onClick={onLogout} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors"><LogOut size={14} /> Sair do admin</button>
      </div>
    </aside>
  );

  if (showTalks) {
    return (
      <div className="flex h-screen overflow-hidden bg-background">
        <AdminSidebar active="talks" />
        <main className="flex-1 flex flex-col overflow-hidden">
          <TalksEditor section={talksSection} onSave={onTalksChange} onClose={resetSections} apiKey={apiKey} />
        </main>
      </div>
    );
  }

  if (showRecs) {
    return (
      <div className="flex h-screen overflow-hidden bg-background">
        <AdminSidebar active="recs" />
        <main className="flex-1 flex flex-col overflow-hidden">
          <RecommendationsEditor items={recommendations} onSave={onRecommendationsChange} onClose={() => setShowRecs(false)} />
        </main>
      </div>
    );
  }

  if (showAbout) {
    return (
      <div className="flex h-screen overflow-hidden bg-background">
        <AdminSidebar active="about" />
        <main className="flex-1 flex flex-col overflow-hidden">
          <AboutEditor content={aboutContent} onSave={onAboutChange} onClose={() => setShowAbout(false)} apiKey={apiKey} />
        </main>
      </div>
    );
  }

  if (showJourney) {
    return (
      <div className="flex h-screen overflow-hidden bg-background">
        <AdminSidebar active="journey" />
        <main className="flex-1 flex flex-col overflow-hidden">
          <JourneyEditor items={experience} onSave={onExperienceChange} onClose={resetSections} apiKey={apiKey} />
        </main>
      </div>
    );
  }

  if (section === "editor") {
    return <div className="h-screen flex flex-col overflow-hidden bg-background"><CaseEditor item={editing} onSave={handleSave} onCancel={() => setSection("list")} isNew={isNew} apiKey={apiKey} /></div>;
  }
  if (section === "preview" && preview) {
    return (
      <div className="relative">
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-foreground/90 text-background text-xs px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
          <Eye size={12} /> Preview — <button onClick={() => setSection("list")} className="underline">Sair</button>
        </div>
        <CMSCaseViewer item={preview} onBack={() => setSection("list")} isAdmin={true} onEdit={() => { setEditing(preview); setIsNew(false); setSection("editor"); }} />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AdminSidebar active="cases" />

      {/* API Key Modal */}
      {showApiKeyInput && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setShowApiKeyInput(false)}>
          <div className="bg-background rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-base font-semibold text-foreground mb-1">Chave API Claude</h2>
            <p className="text-xs text-muted-foreground mb-4">Necessária para auto-tradução PT→EN. Armazenada apenas no seu navegador.</p>
            <input
              type="password"
              value={apiKeyDraft}
              onChange={e => setApiKeyDraft(e.target.value)}
              placeholder="sk-ant-…"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={() => { saveApiKey(apiKeyDraft); setApiKey(apiKeyDraft); setShowApiKeyInput(false); toast.success("Chave salva!"); }}
                className="flex-1 bg-foreground text-background py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
              >Salvar</button>
              <button onClick={() => setShowApiKeyInput(false)} className="px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="shrink-0 border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-base font-semibold text-foreground">Cases</h1>
            <p className="text-xs text-muted-foreground">{stats.total} total · {stats.published} publicados · {stats.draft} rascunhos</p>
          </div>
          <button onClick={() => { setEditing(undefined); setIsNew(true); setSection("editor"); }} className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
            <Plus size={14} /> Novo Case
          </button>
        </div>

        {/* Stats */}
        <div className="shrink-0 grid grid-cols-4 border-b border-border">
          {[{ label: "Total", value: stats.total, icon: Layers }, { label: "Publicados", value: stats.published, icon: Globe }, { label: "Rascunhos", value: stats.draft, icon: FileText }, { label: "NDA", value: stats.nda, icon: Lock }].map(({ label, value, icon: Icon }) => (
            <div key={label} className="px-6 py-4 border-r border-border last:border-0">
              <div className="flex items-center gap-2 mb-1"><Icon size={13} className="text-muted-foreground" /><p className="text-xs text-muted-foreground">{label}</p></div>
              <p className="text-2xl font-semibold text-foreground">{value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="shrink-0 px-6 py-3 border-b border-border flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar cases…" className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-border bg-input-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20" />
          </div>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as typeof filterStatus)} className="px-3 py-1.5 rounded-lg border border-border bg-input-background text-sm text-foreground focus:outline-none appearance-none">
            <option value="all">Todos status</option>
            <option value="published">Publicados</option>
            <option value="draft">Rascunhos</option>
          </select>
          <select value={filterNDA} onChange={e => setFilterNDA(e.target.value as typeof filterNDA)} className="px-3 py-1.5 rounded-lg border border-border bg-input-background text-sm text-foreground focus:outline-none appearance-none">
            <option value="all">Todos</option>
            <option value="nda">Só NDA</option>
            <option value="public">Só público</option>
          </select>
          <div className="ml-auto flex items-center gap-1 border border-border rounded-lg p-0.5">
            <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}><LayoutGrid size={13} /></button>
            <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}><List size={13} /></button>
          </div>
        </div>

        {/* Ordering hint */}
        {!isFiltering && cases.length > 1 && (
          <div className="shrink-0 px-6 py-2 bg-muted/50 border-b border-border flex items-center gap-2">
            <GripVertical size={13} className="text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              {viewMode === "grid" ? "Arraste pelo ícone ⠿ para reordenar os cases." : "Use as setas ou arraste pelo ícone ⠿ para reordenar."}
            </p>
          </div>
        )}
        {isFiltering && (
          <div className="shrink-0 px-6 py-2 bg-amber-50 border-b border-amber-100 flex items-center gap-2">
            <p className="text-xs text-amber-700">Filtros ativos — limpe os filtros para reordenar os cases.</p>
            <button onClick={() => { setSearch(""); setFilterStatus("all"); setFilterNDA("all"); }} className="ml-auto text-xs text-amber-800 underline font-medium">Limpar filtros</button>
          </div>
        )}

        {/* Cases */}
        <div className="flex-1 overflow-y-auto p-6">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <p className="text-sm font-medium text-foreground mb-1">Nenhum case encontrado</p>
              <button onClick={() => { setEditing(undefined); setIsNew(true); setSection("editor"); }} className="mt-4 flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"><Plus size={13} /> Novo Case</button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(c => {
                const isDragging = dragId === c.id;
                const isOver = overId === c.id && dragId !== c.id;
                return (
                  <div
                    key={c.id}
                    draggable={!isFiltering}
                    onDragStart={e => handleDragStart(e, c.id)}
                    onDragOver={e => handleDragOver(e, c.id)}
                    onDrop={e => handleDrop(e, c.id)}
                    onDragEnd={handleDragEnd}
                    className={`group rounded-2xl border overflow-hidden transition-all duration-150 ${isDragging ? "opacity-40 scale-95" : "opacity-100"} ${isOver ? "border-foreground ring-2 ring-foreground/20 shadow-lg" : "border-border hover:border-foreground/20 hover:shadow-md"}`}
                  >
                    <div className="relative h-36 overflow-hidden" style={{ backgroundColor: c.coverColor }}>
                      {c.coverImage && <img src={c.coverImage} alt={c.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity" />}
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        {c.isNDA && <CmsBadge variant="nda"><Lock size={9} /> NDA</CmsBadge>}
                        <CmsBadge variant={c.status === "published" ? "published" : "draft"}>{c.status === "published" ? "Publicado" : "Rascunho"}</CmsBadge>
                      </div>
                      {/* Drag handle */}
                      {!isFiltering && (
                        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
                          <div className="bg-white/90 rounded-lg px-2 py-1 flex items-center gap-1 shadow text-xs text-foreground/60">
                            <GripVertical size={12} /> arrastar
                          </div>
                        </div>
                      )}
                      <div className="absolute top-2.5 right-2.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {[{ icon: Eye, action: () => { setPreview(c); setSection("preview"); }, title: "Preview" },
                          { icon: Edit2, action: () => { setEditing(c); setIsNew(false); setSection("editor"); }, title: "Editar" },
                          { icon: Copy, action: () => handleDuplicate(c), title: "Duplicar" },
                          { icon: Trash2, action: () => setDelConfirm(c.id), title: "Excluir" }].map(({ icon: Icon, action, title }) => (
                          <button key={title} onClick={action} title={title} className="w-7 h-7 bg-white/90 rounded-lg flex items-center justify-center hover:bg-white transition-colors shadow">
                            <Icon size={12} className="text-foreground" />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">{c.category} · {c.year}</p>
                      <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">{c.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{c.subtitle}</p>
                      <p className="text-[10px] text-muted-foreground mt-3">Atualizado {fmtDate(c.updatedAt)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-1.5">
              {filtered.map((c, idx) => {
                const isDragging = dragId === c.id;
                const isOver = overId === c.id && dragId !== c.id;
                const globalIdx = cases.findIndex(x => x.id === c.id);
                return (
                  <div
                    key={c.id}
                    draggable={!isFiltering}
                    onDragStart={e => handleDragStart(e, c.id)}
                    onDragOver={e => handleDragOver(e, c.id)}
                    onDrop={e => handleDrop(e, c.id)}
                    onDragEnd={handleDragEnd}
                    className={`group flex items-center gap-3 p-3 rounded-xl border transition-all duration-150 ${isDragging ? "opacity-40 scale-98" : ""} ${isOver ? "border-foreground ring-2 ring-foreground/10 bg-muted/30" : "border-border hover:border-foreground/20"}`}
                  >
                    {/* Drag handle + position number */}
                    <div className={`flex items-center gap-1 shrink-0 ${isFiltering ? "opacity-30" : "cursor-grab active:cursor-grabbing"}`}>
                      <span className="text-[10px] text-muted-foreground w-4 text-right">{globalIdx + 1}</span>
                      <GripVertical size={14} className="text-muted-foreground" />
                    </div>

                    <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0" style={{ backgroundColor: c.coverColor }}>
                      {c.coverImage && <img src={c.coverImage} alt="" className="w-full h-full object-cover opacity-50" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium text-foreground truncate">{c.title}</span>
                        {c.isNDA && <CmsBadge variant="nda"><Lock size={9} /> NDA</CmsBadge>}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{c.category} · {c.client} · {c.year}</p>
                    </div>

                    <CmsBadge variant={c.status === "published" ? "published" : "draft"}>
                      {c.status === "published" ? <><CheckCircle size={9} /> Publicado</> : <><Clock size={9} /> Rascunho</>}
                    </CmsBadge>

                    {/* Up / down arrows */}
                    {!isFiltering && (
                      <div className="flex flex-col gap-0.5 shrink-0">
                        <button onClick={() => moveCase(c.id, -1)} disabled={globalIdx === 0} title="Mover para cima"
                          className="p-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-20 disabled:cursor-not-allowed">
                          <ChevronUp size={13} />
                        </button>
                        <button onClick={() => moveCase(c.id, 1)} disabled={globalIdx === cases.length - 1} title="Mover para baixo"
                          className="p-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-20 disabled:cursor-not-allowed">
                          <ChevronDown size={13} />
                        </button>
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground shrink-0 hidden lg:block">{fmtDate(c.updatedAt)}</p>

                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => { setPreview(c); setSection("preview"); }} title="Preview" className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><Eye size={14} /></button>
                      <button onClick={() => { setEditing(c); setIsNew(false); setSection("editor"); }} title="Editar" className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><Edit2 size={14} /></button>
                      <button onClick={() => handleDuplicate(c)} title="Duplicar" className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><Copy size={14} /></button>
                      <button onClick={() => setDelConfirm(c.id)} title="Excluir" className="p-1.5 rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Delete confirm */}
      {delConfirm && (
        <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl border border-border shadow-xl p-6 max-w-sm w-full">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-4"><Trash2 size={18} className="text-red-600" /></div>
            <h3 className="text-base font-semibold text-foreground mb-2">Excluir case</h3>
            <p className="text-sm text-muted-foreground mb-6">"{cases.find(c => c.id === delConfirm)?.title}" será excluído permanentemente. Essa ação não pode ser desfeita.</p>
            <div className="flex gap-3">
              <button onClick={() => setDelConfirm(null)} className="flex-1 py-2.5 rounded-xl border border-border text-sm text-foreground hover:bg-muted transition-colors">Cancelar</button>
              <button onClick={() => handleDelete(delConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors">Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Talks Page ───────────────────────────────────────────────────────────────

const TYPE_BADGE: Record<TalkType, string> = {
  Palestra: "bg-purple-50 text-purple-700 border border-purple-200",
  Aula: "bg-blue-50 text-blue-700 border border-blue-200",
  Conversa: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Podcast: "bg-orange-50 text-orange-700 border border-orange-200",
  Workshop: "bg-amber-50 text-amber-700 border border-amber-200",
  Painel: "bg-rose-50 text-rose-700 border border-rose-200",
};

function TalksPage({ talks }: { talks: Talk[] }) {
  const { lang } = useLanguage();
  const [filter, setFilter] = useState<TalkType | "all">("all");

  const types = Array.from(new Set(talks.map(t => t.type))) as TalkType[];
  const filtered = filter === "all" ? talks : talks.filter(t => t.type === filter);

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-8 md:px-24">

        {/* Header */}
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="mb-16">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
            {lang === "pt" ? "Compartilhando conhecimento" : "Sharing knowledge"}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
            {lang === "pt" ? "Palestras & Talks" : "Talks & Lectures"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {lang === "pt"
              ? "Palestras, aulas, workshops e conversas sobre design de produto, UX e carreira."
              : "Talks, lectures, workshops and conversations about product design, UX and career."}
          </p>
        </motion.div>

        {/* Type filter */}
        {types.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-12">
            <button onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter === "all" ? "bg-foreground text-background" : "bg-secondary text-foreground hover:bg-secondary/80"}`}>
              {lang === "pt" ? "Todos" : "All"}
            </button>
            {types.map(t => (
              <button key={t} onClick={() => setFilter(t)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter === t ? "bg-foreground text-background" : "bg-secondary text-foreground hover:bg-secondary/80"}`}>
                {t}
              </button>
            ))}
          </div>
        )}

        {/* Talks list */}
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">{lang === "pt" ? "Nenhuma entrada encontrada." : "No entries found."}</p>
        ) : (
          <div className="space-y-0">
            {filtered.map((talk, i) => (
              <motion.div
                key={talk.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className={`group grid md:grid-cols-[1fr_auto] gap-6 py-8 ${i < filtered.length - 1 ? "border-b border-border" : ""}`}
              >
                {/* Left: cover + content */}
                <div className="flex gap-5 items-start">
                  {/* Cover or type icon */}
                  <div className="shrink-0 mt-0.5">
                    {talk.coverImage ? (
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted">
                        <img src={talk.coverImage} alt={talk.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center">
                        <Mic size={22} className="text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Badge + title */}
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${TYPE_BADGE[talk.type]}`}>
                        {talk.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-accent transition-colors leading-snug">
                      {(lang === "en" && talk.titleEn) ? talk.titleEn : talk.title}
                    </h3>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground mb-3">
                      {talk.event && <span className="font-medium text-foreground">{talk.event}</span>}
                      {talk.event && (talk.location || talk.date) && <span>·</span>}
                      {talk.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={11} /> {talk.location}
                        </span>
                      )}
                      {talk.date && <span>{talk.date}</span>}
                    </div>

                    {talk.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {(lang === "en" && talk.descriptionEn) ? talk.descriptionEn : talk.description}
                      </p>
                    )}

                    {/* Tags */}
                    {talk.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {talk.tags.map(tag => (
                          <PastelChip key={tag} label={tag} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: link */}
                {talk.link && (
                  <div className="flex md:items-start md:justify-end">
                    <a href={talk.link} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground border border-border hover:border-foreground hover:text-foreground px-3 py-1.5 rounded-lg transition-all shrink-0 mt-0.5">
                      <ExternalLink size={11} />
                      {lang === "pt" ? "Assistir" : "Watch"}
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Portfolio Wrapper (original layout) ──────────────────────────────────────

function PortfolioApp({ onAdminClick, cmsCases, onViewCMSCase, experienceItems, aboutContent, recommendations, talksSection }: {
  onAdminClick: () => void;
  cmsCases: CMSCase[];
  onViewCMSCase: (id: string) => void;
  experienceItems: ExperienceItem[];
  aboutContent: AboutContent;
  recommendations: Recommendation[];
  talksSection: TalksSection;
}) {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const { lang, setLang } = useLanguage();

  // Published CMS cases converted to the minimal shape Work/Home expect
  const extraProjects = cmsCases
    .filter(c => c.status === "published")
    .map(c => ({
      id: c.id,
      title: c.title,
      description: c.description,
      tags: c.tags,
      category: c.category,
    }));

  const handleNavigate = (page: string, projectId?: string) => {
    // If the ID belongs to a CMS case, open the CMS viewer instead
    if (page === "case" && projectId && cmsCases.find(c => c.id === projectId)) {
      onViewCMSCase(projectId);
      return;
    }
    setCurrentPage(page as Page);
    if (projectId) setSelectedProject(projectId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => { document.documentElement.style.scrollBehavior = "smooth"; }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentLang={lang} onLanguageChange={setLang} onNavigate={handleNavigate} showTalks={talksSection.visible} />

      {currentPage === "home" && <Home onNavigate={handleNavigate} extraProjects={extraProjects} heroTitle={aboutContent.heroTitle} heroSubtitle={aboutContent.heroSubtitle} aboutBio={aboutContent.bio[0]} aboutPhoto={aboutContent.photo} aboutCvFile={aboutContent.cvFile} aboutCvFileName={aboutContent.cvFileName} />}
      {currentPage === "about" && <About content={aboutContent} recommendations={recommendations} />}
      {currentPage === "work" && <Work onNavigate={handleNavigate} extraProjects={extraProjects} />}
      {currentPage === "case" && <CaseDetail projectId={selectedProject} onNavigate={handleNavigate} />}
      {currentPage === "experience" && <Experience items={experienceItems} />}
      {currentPage === "talks" && <TalksPage talks={talksSection.talks} />}
      {currentPage === "contact" && <Contact />}

      {/* Footer */}
      <footer className="border-t border-border py-12 px-8 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-muted-foreground text-base">
              © 2026 Keziah Santos. {lang === "pt" ? "Todos os direitos reservados." : "All rights reserved."}
            </p>
            <div className="flex gap-6 items-center">
              <a href="mailto:keziahcosta@gmail.com" className="text-muted-foreground hover:text-accent transition-colors text-base">Email</a>
              <a href="https://www.linkedin.com/in/keziahsantos" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors text-base">LinkedIn</a>
              <button onClick={onAdminClick} title="Admin" className="text-muted-foreground/20 hover:text-muted-foreground/60 transition-colors p-1 rounded">
                <Lock size={12} />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const initialMode: AppMode = window.location.hash === "#admin" ? "adminLogin" : "portfolio";
  const [isAdmin, setIsAdmin] = useState(false);
  const [cmsCases, setCmsCases] = useState<CMSCase[]>(loadCases);
  const [experienceItems, setExperienceItems] = useState<ExperienceItem[]>(loadExperience);
  const [aboutContent, setAboutContent] = useState<AboutContent>(loadAbout);
  const [recommendations, setRecommendations] = useState<Recommendation[]>(loadRecommendations);
  const [talksSection, setTalksSection] = useState<TalksSection>(loadTalks);
  const [ndaTarget, setNdaTarget] = useState<CMSCase | null>(null);
  const [viewerTarget, setViewerTarget] = useState<CMSCase | null>(null);
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());

  const handleCasesChange = useCallback((c: CMSCase[]) => { setCmsCases(c); saveCases(c); }, []);
  const handleExperienceChange = useCallback((e: ExperienceItem[]) => { setExperienceItems(e); saveExperience(e); }, []);
  const handleAboutChange = useCallback((a: AboutContent) => { setAboutContent(a); saveAbout(a); }, []);
  const handleRecommendationsChange = useCallback((r: Recommendation[]) => { setRecommendations(r); saveRecommendations(r); }, []);
  const handleTalksChange = useCallback((t: TalksSection) => { setTalksSection(t); saveTalks(t); }, []);

  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === "#admin") setMode("adminLogin");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const handleLogin = () => { setIsAdmin(true); setMode("admin"); window.history.replaceState(null, "", " "); toast.success("Bem-vinda, Keziah!"); };
  const handleLogout = () => { setIsAdmin(false); setMode("portfolio"); window.history.replaceState(null, "", " "); toast("Sessão encerrada"); };

  const handleViewCMSCase = (id: string) => {
    const c = cmsCases.find(x => x.id === id);
    if (!c) return;
    if (c.isNDA && !unlocked.has(id)) {
      setNdaTarget(c);
      setMode("ndaGate");
    } else {
      setViewerTarget(c);
      setMode("caseViewer");
    }
  };

  return (
    <LanguageProvider>
      {mode === "portfolio" && (
        <PortfolioApp
          onAdminClick={() => setMode("adminLogin")}
          cmsCases={cmsCases}
          onViewCMSCase={handleViewCMSCase}
          experienceItems={experienceItems}
          aboutContent={aboutContent}
          recommendations={recommendations}
          talksSection={talksSection}
        />
      )}
      {mode === "adminLogin" && <AdminLogin onLogin={handleLogin} onBack={() => setMode("portfolio")} />}
      {mode === "admin" && isAdmin && <AdminDashboard cases={cmsCases} onCasesChange={handleCasesChange} experience={experienceItems} onExperienceChange={handleExperienceChange} aboutContent={aboutContent} onAboutChange={handleAboutChange} recommendations={recommendations} onRecommendationsChange={handleRecommendationsChange} talksSection={talksSection} onTalksChange={handleTalksChange} onLogout={handleLogout} />}
      {mode === "ndaGate" && ndaTarget && (
        <NDAGate item={ndaTarget} onUnlock={() => { setUnlocked(s => new Set([...s, ndaTarget.id])); setViewerTarget(ndaTarget); setMode("caseViewer"); }} onBack={() => setMode("portfolio")} />
      )}
      {mode === "caseViewer" && viewerTarget && (
        <CMSCaseViewer item={viewerTarget} onBack={() => setMode("portfolio")} isAdmin={isAdmin} onEdit={isAdmin ? () => setMode("admin") : undefined} />
      )}
      <Toaster richColors position="bottom-right" />
    </LanguageProvider>
  );
}
