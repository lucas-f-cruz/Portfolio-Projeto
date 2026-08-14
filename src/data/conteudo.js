// ============================================================
//  PORTFÓLIO — ARQUIVO DE CONTEÚDO
//  Edite este arquivo para atualizar todas as informações
//  sem precisar mexer nos componentes.
// ============================================================

// ── INFORMAÇÕES PESSOAIS ─────────────────────────────────────
export const PERFIL = {
  nome: "Lucas Cruz",
  titulo: "Desenvolvedor Full Stack",
  descricao: "Apaixonado por tecnologia e desenvolvimento. Criando soluções web completas do frontend ao backend.",
  email: "lucasifrn2012@gmail.com",
  whatsapp: "558499990000",
  endereco: "Ceará-Mirim, Rio Grande do Norte, Brasil",
  github: "https://github.com/lucas-f-cruz",
  linkedin: "https://www.linkedin.com/in/lucasfcc/",
};

// ── CÓDIGO ANIMADO NO HERO ───────────────────────────────────
export const CODIGO_HERO = [
  { tipo: "chave", texto: "const developer = {" },
  { tipo: "chave", texto: "  nome: ", valor: "'Lucas Cruz'," },
  { tipo: "chave", texto: "  habilidades: ", valor: "['React', 'Node'," },
  { tipo: "chave", texto: "    ", valor: "'TypeScript', 'Java'," },
  { tipo: "chave", texto: "    ", valor: "'MongoDB', 'MySQL'," },
  { tipo: "chave", texto: "    ", valor: "'Git', 'n8n', 'Hostinger']," },
  { tipo: "bool", texto: "  dedicado: ", valor: "true," },
  { tipo: "bool", texto: "  aprendizadoRapido: ", valor: "true," },
  { tipo: "bool", texto: "  resolveProblemas: ", valor: "true," },
  { tipo: "fn", texto: "  contratavel: ", valor: "function(FullStack) {" },
  { tipo: "retorno", texto: "    return this.hardWorker" },
  { tipo: "retorno", texto: "      && this.skills.length >= 10" },
  { tipo: "chave", texto: "  }" },
  { tipo: "chave", texto: "};" },
];

// ── SKILLS ───────────────────────────────────────────────────
export const SKILLS = [
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", nome: "HTML" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", nome: "CSS" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", nome: "JavaScript" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", nome: "TypeScript" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", nome: "React" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", nome: "Node.js" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", nome: "Java" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", nome: "MySQL" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", nome: "PostgreSQL" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", nome: "MongoDB" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", nome: "Git" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", nome: "GitHub", filtro: "invert(1)" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", nome: "Docker" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", nome: "Linux" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg", nome: "Vite" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", nome: "Python" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/shadcnui.svg", nome: "shadcn/ui", filtro: "invert(1)" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/hostinger.svg", nome: "Hostinger", filtro: "invert(48%) sepia(79%) saturate(476%) hue-rotate(218deg)" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/n8n.svg", nome: "n8n", filtro: "invert(48%) sepia(79%) saturate(476%) hue-rotate(100deg)" },
];

// ── PROJETOS ─────────────────────────────────────────────────
export const PROJETOS = [
  {
    nome: "Mac Gym",
    categoria: "LANDING PAGE",
    ferramentas: ["React", "Vite", "CSS", "Vercel"],
    funcao: "Desenvolvedor Full Stack",
    descricao: "Site completo para academia com carrossel de imagens, planos, horários, modalidades e botão WhatsApp flutuante.",
    url: "https://macgym.vercel.app",
    github: "https://github.com/lucas-f-cruz/macgym",
  },
  {
    nome: "DevClub",
    categoria: "SITE INSTITUCIONAL",
    ferramentas: ["React", "Vite", "Three.js", "GSAP", "Lenis"],
    funcao: "Desenvolvedor Full Stack",
    descricao: "Site institucional com logo animada em partículas 3D e cubo de vidro no Hero, construído pra um concurso.",
    url: "#",
    github: "https://github.com/lucas-f-cruz/app-concurso-devclub",
  },
  {
    nome: "Damião Capotaria",
    categoria: "LANDING PAGE",
    ferramentas: ["React", "TypeScript", "Tailwind", "shadcn/ui"],
    funcao: "Desenvolvedor Frontend",
    descricao: "Landing page para capotaria automotiva, com design moderno usando shadcn/ui e Tailwind.",
    url: "#",
    github: "https://github.com/lucas-f-cruz/damiao-capotaria",
  },
  {
    nome: "Portfólio Pessoal",
    categoria: "PORTFÓLIO",
    ferramentas: ["React", "Vite", "CSS"],
    funcao: "Desenvolvedor Frontend",
    descricao: "Portfólio profissional com animações, seções de projetos, skills, experiência e formulário de contato.",
    url: "#",
    github: "https://github.com/lucas-f-cruz",
  },
  {
    nome: "Med Alert",
    categoria: "APLICATIVO WEB",
    ferramentas: ["React", "Vite", "CSS"],
    funcao: "Desenvolvedor Frontend e Backend",
    descricao: "Site de alerta médico com informações de saúde dos medicamentos cadastrados, usando React para frontend e backend integração com API de medicamentos futuro.",
    url: "#",
    github: "https://github.com/lucas-f-cruz/medalert",
  },
];

// ── EXPERIÊNCIAS ─────────────────────────────────────────────
export const EXPERIENCIAS = [
  {
    periodo: "2025 - Atual",
    cargo: "Desenvolvedor Full Stack Freelancer",
    empresa: "Autônomo",
    desc: "Desenvolvimento de sites e sistemas para clientes locais.",
  },
  {
    periodo: "2026 - Atual",
    cargo: "Desenvolvedor Frontend",
    empresa: "Projetos Pessoais",
    desc: "Criação de interfaces modernas com React e integração com APIs.",
  },
];

// ── FORMAÇÃO ─────────────────────────────────────────────────
export const FORMACAO = [
  { periodo: "2025-2026 - Atual", curso: "Ciência da Computação", instituicao: "Estácio (Cursando)" },
  { periodo: "2026 - Atual", curso: "Desenvolvedor Full Stack", instituicao: "Dev Club (Cursando)" },
  { periodo: "2026", curso: "Desenvolvedor Front End", instituicao: "Dev Club (Cursando)" },
  { periodo: "2012 - 2016", curso: "Técnico em Informática (Ensino Médio Integrado)", instituicao: "IFRN/JC" },
];

// ── NAVEGAÇÃO ────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Sobre", id: "sobre" },
  { label: "Experiência", id: "experiencia" },
  { label: "Skills", id: "skills" },
  { label: "Formação", id: "formacao" },
  { label: "Projetos", id: "projetos" },
  { label: "Contato", id: "contato" },
];
