import React, { useEffect, useMemo, useState } from "react";
import "./index.scss";

type Locale = "en" | "es";
type Filter = "all" | "fullstack" | "backend" | "tools" | "algorithms";

type Project = {
  id: string;
  title: string;
  subtitle: { en: string; es: string };
  description: { en: string; es: string };
  detail: { en: string; es: string };
  tags: string[];
  filters: Filter[];
  repo: string;
};

const projects: Project[] = [
  {
    id: "spotify",
    title: "Spotify Stats",
    subtitle: { en: "Music insights · Full-stack", es: "Datos musicales · Full-stack" },
    description: {
      en: "A personal music dashboard that turns Spotify listening data into useful insights.",
      es: "Un panel musical que transforma los datos de escucha de Spotify en información útil."
    },
    detail: {
      en: "The app connects to Spotify through OAuth, reads profile and listening data, and exposes endpoints for top tracks, artists, genres and recently played music. It can also build a playlist from a listener’s top tracks.",
      es: "La aplicación se conecta a Spotify mediante OAuth, consulta el perfil y los hábitos de escucha y ofrece endpoints para canciones, artistas, géneros y reproducciones recientes. También puede crear una playlist a partir de las canciones más escuchadas."
    },
    tags: ["Node.js", "Express", "Passport", "MongoDB", "Spotify API", "OAuth"],
    filters: ["fullstack", "backend"],
    repo: "https://github.com/raimundo-vicuna/spotify-stats"
  },
  {
    id: "chat",
    title: "Nexus Chat",
    subtitle: { en: "Real-time messaging · Full-stack", es: "Mensajería en tiempo real · Full-stack" },
    description: {
      en: "A multi-channel chat experience with live presence, message history and reactions.",
      es: "Una experiencia de chat multicanal con presencia en vivo, historial de mensajes y reacciones."
    },
    detail: {
      en: "Built with Express and Socket.IO, with PostgreSQL persistence for users, messages and reactions. The server includes account registration and login with bcrypt password hashing, online-user updates, typing indicators and channel-based message delivery.",
      es: "Construido con Express y Socket.IO, con persistencia en PostgreSQL para usuarios, mensajes y reacciones. El servidor incluye registro e inicio de sesión con contraseñas protegidas mediante bcrypt, estado de usuarios conectados, indicadores de escritura y distribución de mensajes por canal."
    },
    tags: ["Node.js", "Socket.IO", "Express", "PostgreSQL", "bcrypt"],
    filters: ["fullstack", "backend"],
    repo: "https://github.com/raimundo-vicuna/chat-app"
  },
  {
    id: "ccapi",
    title: "Colo-Colo API",
    subtitle: { en: "REST API · Backend", es: "API REST · Backend" },
    description: {
      en: "A lightweight API to explore club history and retrieve player information.",
      es: "Una API ligera para consultar la historia del club y obtener información de sus jugadores."
    },
    detail: {
      en: "An Express API with routes for historical data, the player collection and individual player lookups by shirt number. It returns structured JSON responses and a not-found response when a player cannot be matched.",
      es: "Una API desarrollada con Express que expone rutas para datos históricos, el listado de jugadores y búsquedas individuales por número de camiseta. Devuelve respuestas JSON estructuradas y un estado de no encontrado cuando no existe coincidencia."
    },
    tags: ["JavaScript", "Node.js", "Express", "REST", "JSON"],
    filters: ["backend"],
    repo: "https://github.com/raimundo-vicuna/CC-API"
  },
  {
    id: "todo",
    title: "ToDo List",
    subtitle: { en: "Task manager · Backend", es: "Gestor de tareas · Backend" },
    description: {
      en: "A list manager for creating projects, organising tasks and tracking completion.",
      es: "Un gestor de listas para crear proyectos, organizar tareas y seguir su progreso."
    },
    detail: {
      en: "A Flask application backed by SQLAlchemy. It supports creating, renaming and deleting lists, adding tasks, toggling completion and removing items, with database-backed models and server-rendered views.",
      es: "Una aplicación Flask respaldada por SQLAlchemy. Permite crear, renombrar y eliminar listas, añadir tareas, cambiar su estado y borrar elementos, con modelos persistidos en base de datos y vistas renderizadas en el servidor."
    },
    tags: ["Python", "Flask", "SQLAlchemy", "PostgreSQL"],
    filters: ["backend", "tools"],
    repo: "https://github.com/raimundo-vicuna/toDoList"
  },
  {
    id: "sudoku",
    title: "Sudoku Solver",
    subtitle: { en: "Computer vision · Algorithms", es: "Visión artificial · Algoritmos" },
    description: {
      en: "A Python solver that recognises a Sudoku board and works through the puzzle.",
      es: "Un solucionador en Python que reconoce un tablero de Sudoku y resuelve el desafío."
    },
    detail: {
      en: "The project combines image processing, K-nearest-neighbours digit recognition and a backtracking solver. It detects the board in a screenshot, extracts the cells, predicts the digits and calculates a solution.",
      es: "El proyecto combina procesamiento de imágenes, reconocimiento de dígitos con K-Nearest Neighbours y un algoritmo de backtracking. Detecta el tablero en una captura, separa las celdas, predice los números y calcula una solución."
    },
    tags: ["Python", "OpenCV", "scikit-learn", "NumPy", "Backtracking"],
    filters: ["algorithms", "tools"],
    repo: "https://github.com/raimundo-vicuna/sudoku.com-solver-main"
  },
  {
    id: "days",
    title: "Days",
    subtitle: { en: "Date utility · Front-end", es: "Herramienta de fechas · Front-end" },
    description: {
      en: "A simple date tracker that shows how long remains until, or has passed since, an event.",
      es: "Un contador de fechas que muestra cuánto falta para un evento o cuánto tiempo ha pasado."
    },
    detail: {
      en: "A browser-based utility with editable target dates and day, week and month calculations. It keeps the interaction focused: choose a date, save it and see the countdown update.",
      es: "Una utilidad web con fechas editables y cálculos en días, semanas y meses. La interacción es directa: eliges una fecha, la guardas y el contador se actualiza."
    },
    tags: ["JavaScript", "HTML", "CSS", "Moment.js"],
    filters: ["tools"],
    repo: "https://github.com/raimundo-vicuna/days"
  }
];

const copy = {
  en: {
    nav: { about: "About", projects: "Projects", stack: "Stack", activity: "GitHub", contact: "Contact" },
    hero: {
      eyebrow: "Backend-focused developer · Chile",
      title: "I build thoughtful software for real-world ideas.",
      body: "From APIs and integrations to real-time apps, I enjoy turning complex ideas into useful, dependable products.",
      primary: "Explore projects",
      secondary: "View GitHub",
      note: "A selection of experiments, tools and products."
    },
    about: {
      eyebrow: "A little about me",
      title: "Curious by nature. Focused on building things that work.",
      body: "I’m Raimundo, a backend-focused developer who enjoys working across the whole product experience. I’m interested in how data, APIs and clean interfaces come together to solve practical problems.",
      body2: "My projects range from music data and real-time communication to REST APIs, task tools and algorithmic experiments. I value clear structure, useful details and software that feels considered.",
      principles: [
        { number: "01", title: "Purpose first", body: "Start with the problem, then choose the simplest useful solution." },
        { number: "02", title: "Think in systems", body: "Build with data, integrations and maintainability in mind." },
        { number: "03", title: "Details matter", body: "Make the experience clear, responsive and easy to use." }
      ]
    },
    projects: {
      eyebrow: "Selected work",
      title: "A few things I’ve built.",
      body: "Different problems, different tools — each project is an opportunity to learn by making.",
      all: "All",
      fullstack: "Full-stack",
      backend: "Backend & APIs",
      tools: "Tools",
      algorithms: "Algorithms",
      details: "Project details",
      source: "Source code",
      empty: "No projects in this category yet."
    },
    stack: {
      eyebrow: "Tools of the trade",
      title: "A practical, evolving toolkit.",
      body: "Technologies I’ve used across projects and experiments.",
      groups: [
        { title: "Languages & frameworks", items: ["JavaScript", "TypeScript", "Python", "React", "Node.js", "Express", "Flask"] },
        { title: "Data & integrations", items: ["PostgreSQL", "MongoDB", "SQLAlchemy", "REST APIs", "Socket.IO", "OAuth", "Spotify API"] },
        { title: "Tools & platforms", items: ["Git", "GitHub", "Docker", "AWS", "Linux", "OpenCV", "NumPy"] }
      ]
    },
    activity: {
      eyebrow: "Open source & learning",
      title: "My work lives in the open.",
      body: "GitHub is where I document ideas, experiment with technologies and keep improving through real projects. Visit my profile to see the latest repositories, commits and contribution activity.",
      profile: "View GitHub activity",
      repos: "Browse repositories",
      handle: "github.com/raimundo-vicuna",
      label: "Code, experiments & ongoing learning"
    },
    contact: {
      eyebrow: "Have something in mind?",
      title: "Let’s make something useful.",
      body: "Have a project idea, a question, or want to connect? The easiest way to reach me is through GitHub.",
      cta: "Connect on GitHub",
      availability: "Open to interesting conversations"
    },
    footer: "Designed and built with care.",
    modal: { close: "Close", source: "Explore source code", stack: "Built with" }
  },
  es: {
    nav: { about: "Sobre mí", projects: "Proyectos", stack: "Tecnologías", activity: "GitHub", contact: "Contacto" },
    hero: {
      eyebrow: "Desarrollador con foco en backend · Chile",
      title: "Construyo software pensado para ideas reales.",
      body: "Desde APIs e integraciones hasta aplicaciones en tiempo real, disfruto transformar ideas complejas en productos útiles y confiables.",
      primary: "Ver proyectos",
      secondary: "Ver GitHub",
      note: "Una selección de experimentos, herramientas y productos."
    },
    about: {
      eyebrow: "Un poco sobre mí",
      title: "Curioso por naturaleza. Enfocado en crear cosas que funcionen.",
      body: "Soy Raimundo, desarrollador con foco en backend y con interés en trabajar en toda la experiencia de un producto. Me gusta explorar cómo se conectan los datos, las APIs y las interfaces claras para resolver problemas prácticos.",
      body2: "Mis proyectos van desde datos musicales y comunicación en tiempo real hasta APIs REST, herramientas de tareas y experimentos con algoritmos. Valoro la estructura clara, los detalles útiles y el software bien pensado.",
      principles: [
        { number: "01", title: "Primero el propósito", body: "Entender el problema antes de elegir la solución más simple y útil." },
        { number: "02", title: "Pensar en sistemas", body: "Diseñar considerando los datos, las integraciones y el mantenimiento." },
        { number: "03", title: "Los detalles importan", body: "Crear experiencias claras, adaptables y fáciles de usar." }
      ]
    },
    projects: {
      eyebrow: "Trabajo seleccionado",
      title: "Algunas cosas que he creado.",
      body: "Problemas y herramientas diferentes; cada proyecto es una oportunidad para aprender construyendo.",
      all: "Todos",
      fullstack: "Full-stack",
      backend: "Backend y APIs",
      tools: "Herramientas",
      algorithms: "Algoritmos",
      details: "Ver detalles",
      source: "Código fuente",
      empty: "Todavía no hay proyectos en esta categoría."
    },
    stack: {
      eyebrow: "Herramientas de trabajo",
      title: "Un conjunto de herramientas práctico y en evolución.",
      body: "Tecnologías que he utilizado en proyectos y experimentos.",
      groups: [
        { title: "Lenguajes y frameworks", items: ["JavaScript", "TypeScript", "Python", "React", "Node.js", "Express", "Flask"] },
        { title: "Datos e integraciones", items: ["PostgreSQL", "MongoDB", "SQLAlchemy", "APIs REST", "Socket.IO", "OAuth", "Spotify API"] },
        { title: "Herramientas y plataformas", items: ["Git", "GitHub", "Docker", "AWS", "Linux", "OpenCV", "NumPy"] }
      ]
    },
    activity: {
      eyebrow: "Código abierto y aprendizaje",
      title: "Mi trabajo está a la vista.",
      body: "GitHub es el lugar donde documento ideas, experimento con tecnologías y sigo mejorando a través de proyectos reales. En mi perfil puedes ver los repositorios, commits y actividad más recientes.",
      profile: "Ver actividad en GitHub",
      repos: "Explorar repositorios",
      handle: "github.com/raimundo-vicuna",
      label: "Código, experimentos y aprendizaje continuo"
    },
    contact: {
      eyebrow: "¿Tienes algo en mente?",
      title: "Construyamos algo útil.",
      body: "¿Tienes una idea de proyecto, una pregunta o quieres conectar? La forma más sencilla de contactarme es a través de GitHub.",
      cta: "Conectar en GitHub",
      availability: "Abierto a buenas conversaciones"
    },
    footer: "Diseñado y construido con dedicación.",
    modal: { close: "Cerrar", source: "Explorar código fuente", stack: "Desarrollado con" }
  }
};

function getInitialLocale(): Locale {
  try {
    const saved = window.localStorage.getItem("rv-portfolio-language");
    if (saved === "en" || saved === "es") return saved;
  } catch (_) {
    // Storage may be unavailable; use the browser language instead.
  }
  const browserLanguage = typeof navigator !== "undefined"
    ? (navigator.languages && navigator.languages[0]) || navigator.language || "en"
    : "en";
  return browserLanguage.toLowerCase().startsWith("es") ? "es" : "en";
}

function ProjectPreview({ id }: { id: string }) {
  if (id === "spotify") {
    return (
      <div className="project-preview spotify-preview" aria-hidden="true">
        <div className="preview-topline"><span>YOUR SOUND</span><span className="preview-dot" /></div>
        <div className="spotify-preview-main">
          <div className="spotify-disc"><span>♫</span></div>
          <div className="spotify-copy"><strong>Listening overview</strong><small>Your music, in focus</small></div>
        </div>
        <div className="spotify-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="spotify-preview-footer"><span>TOP TRACKS</span><b>01 — 10</b><span>ARTISTS</span><b>01 — 10</b></div>
      </div>
    );
  }
  if (id === "chat") {
    return (
      <div className="project-preview chat-preview" aria-hidden="true">
        <div className="chat-sidebar"><b>N.</b><span className="active-channel"># general</span><span># ideas</span><span># tech</span></div>
        <div className="chat-window">
          <div className="chat-window-head"><strong># general</strong><small><i /> 12 online</small></div>
          <div className="chat-message"><b className="avatar avatar-one">A</b><span><strong>Alex</strong><small>Hey, how’s the build going?</small></span></div>
          <div className="chat-message right-message"><span><strong>You</strong><small>Almost there. Testing the API now.</small></span><b className="avatar avatar-two">R</b></div>
          <div className="chat-message"><b className="avatar avatar-three">M</b><span><strong>Max</strong><small>Looks good from here ✨</small></span></div>
          <div className="chat-compose">Write a message… <span>↗</span></div>
        </div>
      </div>
    );
  }
  if (id === "ccapi") {
    return (
      <div className="project-preview api-preview" aria-hidden="true">
        <div className="code-toolbar"><span /><span /><span /><small>api / players</small></div>
        <div className="endpoint-row"><b>GET</b><span>/history</span><em>200 OK</em></div>
        <div className="endpoint-row"><b>GET</b><span>/players</span><em>200 OK</em></div>
        <div className="endpoint-row"><b>GET</b><span>/players/:number</span><em>200 OK</em></div>
        <div className="json-snippet"><span>{"{"}</span><p><i>"name"</i>: <b>"Player"</b>,</p><p><i>"number"</i>: <b>10</b></p><span>{"}"}</span></div>
      </div>
    );
  }
  if (id === "todo") {
    return (
      <div className="project-preview todo-preview" aria-hidden="true">
        <div className="todo-head"><span>MY WORKSPACE</span><b>•••</b></div>
        <strong>Things to move forward</strong>
        <div className="todo-item"><i className="checked">✓</i><span>Review API structure</span><small>Done</small></div>
        <div className="todo-item"><i /> <span>Update project notes</span><small>Today</small></div>
        <div className="todo-item"><i /><span>Ship a small improvement</span><small>Next</small></div>
        <div className="todo-progress"><span /></div>
      </div>
    );
  }
  if (id === "sudoku") {
    const numbers = [0,0,4,0,0,8,0,1,0, 2,0,0,0,5,0,0,0,7, 0,7,0,1,0,0,4,0,0, 0,0,2,0,0,0,1,0,0, 8,0,0,6,0,2,0,0,3, 0,0,9,0,0,0,5,0,0, 0,0,5,0,0,4,0,8,0, 1,0,0,0,8,0,0,0,6, 0,4,0,7,0,0,2,0,0];
    return (
      <div className="project-preview sudoku-preview" aria-hidden="true">
        <div className="sudoku-top"><span>PUZZLE ANALYSIS</span><b>09 × 09</b></div>
        <div className="sudoku-grid">{numbers.map((number, index) => <i className={number === 0 ? "" : "filled"} key={index}>{number || ""}</i>)}</div>
        <div className="sudoku-bottom"><span>Image recognition</span><b>Backtracking engine</b></div>
      </div>
    );
  }
  return (
    <div className="project-preview days-preview" aria-hidden="true">
      <div className="days-mini-top"><span>EVENT TRACKER</span><b>↗</b></div>
      <div className="days-date"><small>COUNTING DOWN TO</small><strong>OCT <b>24</b></strong><span>Saturday · 2026</span></div>
      <div className="days-counts"><div><b>24</b><small>DAYS</small></div><div><b>03</b><small>WEEKS</small></div><div><b>01</b><small>MONTHS</small></div></div>
    </div>
  );
}

function App() {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = copy[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = locale === "es"
      ? "Raimundo Vicuña — Desarrollador"
      : "Raimundo Vicuña — Developer";
    try {
      window.localStorage.setItem("rv-portfolio-language", locale);
    } catch (_) {
      // The language switch still works for the current session.
    }
  }, [locale]);

  useEffect(() => {
    if (!activeProject) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveProject(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activeProject]);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t.projects.all },
    { id: "fullstack", label: t.projects.fullstack },
    { id: "backend", label: t.projects.backend },
    { id: "tools", label: t.projects.tools },
    { id: "algorithms", label: t.projects.algorithms }
  ];

  const visibleProjects = useMemo(
    () => projects.filter((project) => activeFilter === "all" || project.filters.includes(activeFilter)),
    [activeFilter]
  );

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="Raimundo Vicuña home"><span>RV</span><i /></a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span /><span />
          </button>
          <nav className={mobileMenuOpen ? "main-nav nav-open" : "main-nav"} aria-label="Main navigation">
            <a href="#about" onClick={closeMenu}>{t.nav.about}</a>
            <a href="#projects" onClick={closeMenu}>{t.nav.projects}</a>
            <a href="#stack" onClick={closeMenu}>{t.nav.stack}</a>
            <a href="#activity" onClick={closeMenu}>{t.nav.activity}</a>
            <a href="#contact" onClick={closeMenu}>{t.nav.contact}</a>
          </nav>
          <div className="language-switch" role="group" aria-label="Language">
            <button type="button" className={locale === "en" ? "selected" : ""} onClick={() => setLocale("en")} aria-pressed={locale === "en"}>EN</button>
            <button type="button" className={locale === "es" ? "selected" : ""} onClick={() => setLocale("es")} aria-pressed={locale === "es"}>ES</button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-mark" />{t.hero.eyebrow}</div>
            <h1>{t.hero.title}</h1>
            <p className="hero-description">{t.hero.body}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">{t.hero.primary}<span>↗</span></a>
              <a className="button button-secondary" href="https://github.com/raimundo-vicuna" target="_blank" rel="noreferrer">{t.hero.secondary}<span>↗</span></a>
            </div>
            <div className="hero-note"><span className="note-line" />{t.hero.note}</div>
          </div>
          <div className="hero-art" aria-label="Abstract code workspace illustration">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="hero-float-card float-card-top"><span className="tiny-icon">⌘</span><div><small>BUILDING</small><b>Useful things</b></div><i>↗</i></div>
            <div className="code-card">
              <div className="code-card-head"><div className="window-dots"><i /><i /><i /></div><span>app.ts</span><span className="code-head-right">01 / 03</span></div>
              <div className="code-lines">
                <p><span>01</span><i>const</i> idea <b>=</b> <em>"make it useful"</em></p>
                <p><span>02</span><i>function</i> <strong>build</strong>() {"{"}</p>
                <p><span>03</span><label>return</label> <em>clarity</em> <b>+</b> <em>curiosity</em></p>
                <p><span>04</span>{"}"}</p>
              </div>
              <div className="code-card-foot"><span><i /> SYSTEMS ONLINE</span><b>R. VICUÑA</b></div>
            </div>
            <div className="hero-float-card float-card-bottom"><span className="pulse-dot" /><div><small>FOCUS AREA</small><b>Backend · APIs · Apps</b></div></div>
            <div className="hero-vertical-label">IDEAS → SOFTWARE → IMPACT</div>
          </div>
        </section>

        <div className="intro-strip">
          <div className="section-wrap intro-strip-inner">
            <span>01 / ENGINEERING</span><i /><span>02 / PRODUCT THINKING</span><i /><span>03 / CONTINUOUS LEARNING</span>
          </div>
        </div>

        <section id="about" className="section-wrap content-section about-section">
          <div className="section-heading">
            <span className="section-kicker">{t.about.eyebrow}</span>
            <h2>{t.about.title}</h2>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p>{t.about.body}</p>
              <p>{t.about.body2}</p>
            </div>
            <div className="principles-grid">
              {t.about.principles.map((item) => (
                <div className="principle" key={item.number}>
                  <span>{item.number}</span>
                  <div><h3>{item.title}</h3><p>{item.body}</p></div>
                  <b>↗</b>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="projects-section">
          <div className="section-wrap content-section">
            <div className="projects-heading">
              <div className="section-heading">
                <span className="section-kicker">{t.projects.eyebrow}</span>
                <h2>{t.projects.title}</h2>
                <p className="section-intro">{t.projects.body}</p>
              </div>
              <span className="project-count">06 <i>/</i>  selected</span>
            </div>
            <div className="filter-row" role="group" aria-label="Filter projects">
              {filters.map((filter) => (
                <button
                  type="button"
                  key={filter.id}
                  className={activeFilter === filter.id ? "filter-chip active" : "filter-chip"}
                  onClick={() => setActiveFilter(filter.id)}
                  aria-pressed={activeFilter === filter.id}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <div className="projects-grid">
              {visibleProjects.map((project, index) => (
                <article className={"project-card project-" + project.id} key={project.id} style={{ animationDelay: (index * 70) + "ms" }}>
                  <div className="project-card-meta"><span>{project.subtitle[locale]}</span><span className="project-index">0{projects.indexOf(project) + 1}</span></div>
                  <ProjectPreview id={project.id} />
                  <div className="project-card-copy">
                    <h3>{project.title}</h3>
                    <p>{project.description[locale]}</p>
                    <div className="tag-row">{project.tags.slice(0, 5).map((tag) => <span className="tech-tag" key={tag}>{tag}</span>)}</div>
                    <div className="project-card-actions">
                      <button type="button" onClick={() => setActiveProject(project)}>{t.projects.details}<span>↗</span></button>
                      <a href={project.repo} target="_blank" rel="noreferrer" aria-label={t.projects.source + ": " + project.title}>{t.projects.source}<span>↗</span></a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {visibleProjects.length === 0 && <p className="empty-state">{t.projects.empty}</p>}
            <div className="all-projects-link"><a href="https://github.com/raimundo-vicuna?tab=repositories" target="_blank" rel="noreferrer">{t.activity.repos}<span>↗</span></a></div>
          </div>
        </section>

        <section id="stack" className="section-wrap content-section stack-section">
          <div className="section-heading">
            <span className="section-kicker">{t.stack.eyebrow}</span>
            <h2>{t.stack.title}</h2>
            <p className="section-intro">{t.stack.body}</p>
          </div>
          <div className="stack-grid">
            {t.stack.groups.map((group, index) => (
              <div className="stack-card" key={group.title}>
                <div className="stack-card-top"><span>0{index + 1}</span><b>{index === 0 ? "↗" : index === 1 ? "⌘" : "＋"}</b></div>
                <h3>{group.title}</h3>
                <div className="stack-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="activity" className="activity-section">
          <div className="section-wrap activity-inner">
            <div className="activity-copy">
              <span className="section-kicker">{t.activity.eyebrow}</span>
              <h2>{t.activity.title}</h2>
              <p>{t.activity.body}</p>
              <div className="activity-actions">
                <a className="button button-primary" href="https://github.com/raimundo-vicuna?tab=overview" target="_blank" rel="noreferrer">{t.activity.profile}<span>↗</span></a>
                <a className="text-link" href="https://github.com/raimundo-vicuna?tab=repositories" target="_blank" rel="noreferrer">{t.activity.repos}<span>↗</span></a>
              </div>
            </div>
            <a className="github-profile-card" href="https://github.com/raimundo-vicuna" target="_blank" rel="noreferrer">
              <div className="github-card-top"><span className="github-mark">⌘</span><span>GITHUB / PROFILE</span><b>↗</b></div>
              <div className="github-handle">{t.activity.handle}</div>
              <div className="github-card-bottom"><span><i /> {t.activity.label}</span><b>↗</b></div>
              <div className="github-card-lines"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
            </a>
          </div>
        </section>

        <section id="contact" className="section-wrap content-section contact-section">
          <div className="contact-panel">
            <div className="contact-left"><span className="section-kicker">{t.contact.eyebrow}</span><h2>{t.contact.title}</h2><p>{t.contact.body}</p></div>
            <div className="contact-right"><span className="contact-status"><i />{t.contact.availability}</span><a className="button button-primary" href="https://github.com/raimundo-vicuna" target="_blank" rel="noreferrer">{t.contact.cta}<span>↗</span></a></div>
            <div className="contact-watermark">RV</div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-wrap footer-inner"><a className="footer-brand" href="#top">RV<span>.</span></a><span>© {new Date().getFullYear()} Raimundo Vicuña</span><span>{t.footer}</span><a href="https://github.com/raimundo-vicuna" target="_blank" rel="noreferrer">GitHub ↗</a></div>
      </footer>

      {activeProject && (
        <div className="modal-backdrop" role="presentation" onClick={() => setActiveProject(null)}>
          <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}>
            <div className="modal-topline"><span>{activeProject.subtitle[locale]}</span><button type="button" onClick={() => setActiveProject(null)} aria-label={t.modal.close}>×</button></div>
            <ProjectPreview id={activeProject.id} />
            <h2 id="modal-title">{activeProject.title}</h2>
            <p>{activeProject.detail[locale]}</p>
            <span className="modal-stack-label">{t.modal.stack}</span>
            <div className="tag-row modal-tags">{activeProject.tags.map((tag) => <span className="tech-tag" key={tag}>{tag}</span>)}</div>
            <div className="modal-actions"><a className="button button-primary" href={activeProject.repo} target="_blank" rel="noreferrer">{t.modal.source}<span>↗</span></a><button type="button" className="button button-secondary" onClick={() => setActiveProject(null)}>{t.modal.close}</button></div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
