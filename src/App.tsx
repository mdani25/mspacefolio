import { useEffect, useState } from "react";
import heroPortrait from "./assets/images/profile (1).png";
import aboutPortrait from "./assets/images/profile (2).png";
import resumePdf from "./assets/resume/manikandan_s.pdf";
import mspaceLogo from "./assets/images/MSpace-logo.png";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  dark?: boolean;
  external?: boolean;
};

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function PrimaryButton({ href, children, dark, external }: ButtonProps) {
  return (
    <a
      className={`button button-primary ${dark ? "button-light" : ""}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span>{children}</span>
      <Arrow diagonal={external} />
    </a>
  );
}

function SecondaryButton({ href, children, dark, external }: ButtonProps) {
  return (
    <a
      className={`button button-secondary ${dark ? "on-dark" : ""}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span>{children}</span>
      <Arrow diagonal={external} />
    </a>
  );
}

function SectionHeading({
  number,
  label,
  children,
  description,
}: {
  number: string;
  label: string;
  children: React.ReactNode;
  description?: string;
}) {
  return (
    <header className="section-heading reveal">
      <div className="eyebrow">
        <span>{number}</span>
        <span>/</span>
        <span>{label}</span>
      </div>
      <div>
        <h2>{children}</h2>
        {description && <p>{description}</p>}
      </div>
    </header>
  );
}

const navItems = [
  ["home", "Home"],
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["contact", "Contact"],
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const sections = navItems
      .map(([id]) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55%", threshold: [0, 0.2, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`} aria-label="Main navigation">
      <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
        <img src={mspaceLogo} alt="M's Space" className="brand-logo" />
        <span>M's Space</span>
      </a>
      <div className={`nav-panel ${menuOpen ? "open" : ""}`}>
        <div className="nav-links">
          {navItems.map(([id, label]) => (
            <a
              className={active === id ? "active" : ""}
              href={`#${id}`}
              key={id}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
        <a
          className="resume-link"
          href={resumePdf}
          download="Manikandan_S_Resume.pdf"
          title="Download Manikandan's resume"
        >
          Download Resume <Arrow />
        </a>
      </div>
      <button
        className={`menu-button ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen((value) => !value)}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        <span />
        <span />
      </button>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-copy">
        <div className="hero-kicker hero-reveal">
          <span className="status-dot" />
          A Space for Code, Creativity &amp; Innovation.
        </div>
        <h1>
          <span className="hero-reveal delay-1">Building</span>
          <span className="hero-reveal delay-2">
            <em>digital experiences</em>
          </span>
          <span className="hero-reveal delay-3">that make an impact.</span>
        </h1>
        <div className="hero-bottom hero-reveal delay-4">
          <p>
            I&apos;m Manikandan — a Software Engineer building scalable web and mobile applications
            through thoughtful engineering, modern technologies, and intelligent solutions.
          </p>
          <div className="hero-actions">
            <PrimaryButton href="#projects">Explore my work</PrimaryButton>
            <SecondaryButton href="#contact">Let&apos;s connect</SecondaryButton>
          </div>
        </div>
      </div>
      <div className="hero-portrait hero-reveal delay-3">
        <div className="portrait-frame">
          <img src={heroPortrait} alt="Manikandan S — Software Engineer" />
          <div className="portrait-overlay">
            <span>Engineer</span>
            <span>01 — 25</span>
          </div>
        </div>
        <div className="role-list">
          <span>Software Engineer</span>
          <span>Full-Stack Developer</span>
          <span>AI/ML Enthusiast</span>
        </div>
      </div>
      <div className="hero-footer">
        <div className="availability">
          <span className="pulse" />
          Open to opportunities
        </div>
        <a href="#statistics" className="scroll-cue">
          Scroll to discover <span>↓</span>
        </a>
      </div>
    </section>
  );
}

const stats = [
  ["1+", "Years of experience"],
  ["12+", "ReactJS modules built"],
  ["25+", "REST API endpoints"],
  ["3", "Production products"],
  ["8.34", "Academic CGPA"],
];

function Statistics() {
  return (
    <section className="statistics" id="statistics" aria-label="Professional statistics">
      {stats.map(([number, label], index) => (
        <div
          className="stat reveal"
          style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}
          key={label}
        >
          <strong>{number}</strong>
          <span>{label}</span>
        </div>
      ))}
    </section>
  );
}

function About() {
  const details = [
    ["Location", "Chennai, Tamil Nadu, India"],
    ["Education", "B.E. Computer Science and Engineering"],
    ["Graduation", "May 2025"],
    ["Focus", "Full-Stack Development, AI/ML"],
  ];
  return (
    <section className="section about" id="about">
      <SectionHeading number="01" label="About">
        Engineer by profession.
        <br />
        <span className="muted-heading">Curious by nature.</span>
      </SectionHeading>
      <div className="about-grid">
        <div className="about-statement reveal">
          <p className="lead">
            I&apos;m a Computer Science graduate and Software Engineer from Chennai, India. I enjoy
            transforming complex ideas into reliable, intuitive digital products.
          </p>
          <div className="body-copy">
            <p>
              My experience spans full-stack web development, cross-platform mobile applications,
              backend engineering, database optimization, and AI/ML experimentation.
            </p>
            <p>
              I believe great software is built at the intersection of thoughtful design, clean
              architecture, and practical problem-solving.
            </p>
          </div>
        </div>
        <figure className="about-image reveal">
          <img src={aboutPortrait} alt="Manikandan S" />
          <figcaption>
            <span>Based in Chennai</span>
            <span>13.0827° N, 80.2707° E</span>
          </figcaption>
        </figure>
        <div className="personal-details reveal">
          {details.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const experiences = [
  {
    number: "01",
    role: "Software Developer",
    company: "Dikshi Technologies",
    place: "Chennai, India",
    date: "May 2025 — Present",
    summary:
      "Building enterprise-grade web and mobile products, developing REST APIs, and optimizing database performance.",
    achievements: [
      "Built 12+ ReactJS modules for enterprise applications.",
      "Improved average page load time by 30% using code splitting and memoization.",
      "Designed and integrated 25+ .NET REST API endpoints.",
      "Supported 3 client products through backend and frontend development.",
      "Reduced SQL report generation time from 12 seconds to under 4 seconds.",
      "Resolved 40+ Jira tickets across 6 sprints with 95% on-time delivery.",
    ],
    work: "Puvi W Mart · Dikshi Technologies Web Platform",
  },
  {
    number: "02",
    role: "App Developer Intern",
    company: "Vayusstra Aerospace",
    place: "Chennai, India",
    date: "February 2024 — April 2024",
    summary: "Created cross-platform mobile tools and real-time operational dashboards.",
    achievements: [
      "Developed 2 cross-platform applications using Flutter.",
      "Created real-time operational dashboards.",
      "Improved app startup time by 25%.",
      "Delivered 3 feature updates with a 5-member team.",
    ],
  },
  {
    number: "03",
    role: "Java Development Intern",
    company: "DLK Technologies",
    place: "Chennai, India",
    date: "June 2023 — August 2023",
    summary: "Developed and maintained Java SaaS modules in an Agile environment.",
    achievements: [
      "Developed 5+ Java SaaS modules.",
      "Integrated third-party APIs.",
      "Fixed 30+ backend defects.",
      "Collaborated across 8 Agile sprints.",
    ],
  },
];

function ExperienceTimeline() {
  return (
    <section className="section experience" id="experience">
      <SectionHeading number="02" label="Experience">
        Where I&apos;ve made
        <br />
        <span className="muted-heading">an impact.</span>
      </SectionHeading>
      <div className="timeline">
        {experiences.map((item) => (
          <article className="experience-item reveal" key={item.role + item.company}>
            <div className="experience-index">{item.number}</div>
            <div className="experience-title">
              <h3>{item.role}</h3>
              <p>{item.company}</p>
              <span>{item.place}</span>
            </div>
            <div className="experience-details">
              <time>{item.date}</time>
              <p className="experience-summary">{item.summary}</p>
              <ul>
                {item.achievements.map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
              {item.work && (
                <div className="featured-work">
                  <span>Featured production work</span>
                  <strong>{item.work}</strong>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

type Project = {
  number: string;
  title: string;
  category: string;
  description: string;
  achievements: string[];
  tech: string[];
  theme: string;
  github?: string;
  live?: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "Accessing Textbooks with Graphic Images",
    category: "Assistive Technology · AI · Full-Stack",
    description:
      "A web platform that transforms textbook diagrams into audio-ready descriptions to improve learning accessibility for visually impaired students.",
    achievements: [
      "92% recognition accuracy",
      "Under 5 sec processing",
      "Hackathon runner-up among 100+ teams",
    ],
    tech: ["ReactJS", "Python", "OCR", "TensorFlow"],
    theme: "accessibility",
    github: "https://github.com/mdani25/CodeMavericks-DXC.git",
  },
  {
    number: "02",
    title: "Student Engagement Analysis",
    category: "Artificial Intelligence · Computer Vision",
    description:
      "A real-time student engagement monitoring system using computer vision and deep learning, with automatic reporting.",
    achievements: ["Custom CNN model", "20+ FPS processing", "Published research"],
    tech: ["Python", "CNN", "OpenCV", "TensorFlow"],
    theme: "analytics",
    github: "https://github.com/mdani25/Student-Engagement-Analysis.git",
  },
  {
    number: "03",
    title: "FAKE NEWS DETECTION USING NLP",
    category: "Natural Language Processing · AI",
    description:
      "An NLP-powered system that classifies news articles as real or fake using machine learning models trained on labelled datasets.",
    achievements: ["NLP pipeline", "Classification model", "Accuracy benchmarking"],
    tech: ["Python", "NLP", "Scikit-learn", "Pandas"],
    theme: "analytics",
    github: "https://github.com/mdani25/FAKE-NEWS-DETECTION-USING-NLP.git",
  },
  {
    number: "04",
    title: "EH Hospital Website",
    category: "Healthcare · Web Development",
    description:
      "A production hospital website with service listings, appointment booking, and responsive design built for real patients.",
    achievements: ["Responsive UI", "Appointment flow", "Production deployment"],
    tech: ["React", "CSS", "Vercel"],
    theme: "enterprise",
    github: "https://github.com/mdani25/eh-hospital.git",
    live: "https://eh-hospital-kld6vk3de-manisekar6911-7116s-projects.vercel.app/",
  },
  {
    number: "05",
    title: "M's Space — AI Workspace",
    category: "Personal · AI Tools",
    description:
      "A personal AI-powered workspace where I experiment, build, and deploy intelligent tools and utilities.",
    achievements: ["AI integrations", "Cloudflare Workers", "Personal productivity"],
    tech: ["Cloudflare Workers", "AI APIs", "JavaScript"],
    theme: "mobile",
    live: "https://mspace.manisekar0927.workers.dev/",
  },
  {
    number: "06",
    title: "Open Tech Jobs",
    category: "Job Board · Open Source",
    description:
      "A live job board aggregating open tech roles, making it easier for developers to find opportunities.",
    achievements: ["GitHub Pages deployment", "Job aggregation", "Open source"],
    tech: ["HTML", "CSS", "JavaScript"],
    theme: "accessibility",
    github: "https://github.com/mdani25/open-tech-jobs.git",
    live: "https://mdani25.github.io/open-tech-jobs/",
  },
  {
    number: "07",
    title: "Puvi W Mart",
    category: "E-commerce · Production Application",
    description:
      "A live grocery e-commerce application with customer-facing shopping, checkout, order tracking and management functionality. Available on App Store and Google Play.",
    achievements: ["Authentication", "Product catalog", "Cart & checkout", "Order tracking"],
    tech: ["React Native", "REST APIs", "SQL Server"],
    theme: "mobile",
    live: "https://apps.apple.com/in/app/puvi-w-mart/id6771751658",
  },
  {
    number: "08",
    title: "Dikshi Technologies Web Platform",
    category: "Enterprise Web Development",
    description:
      "Production frontend modules for a responsive business platform, built around reusable components and refined interaction patterns.",
    achievements: ["Responsive UI", "Reusable React components", "Interface refinement"],
    tech: ["ReactJS", "JavaScript", "CSS"],
    theme: "enterprise",
    live: "https://www.dikshitech.com/",
  },
];

function ProjectVisual({ theme }: { theme: string }) {
  if (theme === "accessibility") {
    return (
      <div className="visual-canvas accessibility-ui">
        <div className="mock-nav">
          <b>Clarity</b>
          <span>Textbook reader</span>
          <i />
        </div>
        <div className="book-layout">
          <div className="diagram-panel">
            <span>FIG. 04</span>
            <div className="orbit">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="transcript">
            <small>AI DESCRIPTION</small>
            <h4>Visuals, made audible.</h4>
            <div className="text-lines">
              <i />
              <i />
              <i />
              <i />
            </div>
            <button>▶ Listen to description</button>
          </div>
        </div>
      </div>
    );
  }
  if (theme === "analytics") {
    return (
      <div className="visual-canvas analytics-ui">
        <div className="analytics-side">
          <b>En.</b>
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="analytics-main">
          <div className="mock-nav">
            <span>Live session / CS-402</span>
            <b>09:42</b>
          </div>
          <div className="metric-row">
            <div>
              <small>ENGAGEMENT</small>
              <strong>87%</strong>
              <em>+12.4%</em>
            </div>
            <div>
              <small>ACTIVE</small>
              <strong>24/28</strong>
              <em>Live</em>
            </div>
          </div>
          <div className="chart">
            {[45, 62, 55, 74, 68, 84, 78, 92, 87].map((height, index) => (
              <i style={{ height: `${height}%` }} key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (theme === "mobile") {
    return (
      <div className="visual-canvas mobile-ui">
        <div className="phone phone-one">
          <div className="phone-top">
            <b>puvi.</b>
            <span>⌁</span>
          </div>
          <small>Good morning</small>
          <h4>
            Fresh groceries,
            <br />
            delivered.
          </h4>
          <div className="produce-grid">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="phone phone-two">
          <div className="product-image">01</div>
          <small>FRESH PRODUCE</small>
          <h4>
            Organic
            <br />
            vegetables
          </h4>
          <div className="price">
            <strong>₹240</strong>
            <button>Add to cart</button>
          </div>
        </div>
        <span className="mobile-caption">SHOP · TRACK · ENJOY</span>
      </div>
    );
  }
  return (
    <div className="visual-canvas enterprise-ui">
      <div className="enterprise-top">
        <b>DIKSHI®</b>
        <span>Services　About　Contact</span>
      </div>
      <div className="enterprise-hero">
        <small>ENGINEERING WHAT'S NEXT</small>
        <h4>
          Ideas into
          <br />
          <em>impact.</em>
        </h4>
      </div>
      <div className="enterprise-cards">
        <i>01</i>
        <i>02</i>
        <i>03</i>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`project-card reveal ${index % 2 ? "reverse" : ""}`}>
      <div className="project-visual">
        <ProjectVisual theme={project.theme} />
      </div>
      <div className="project-copy">
        <div className="project-number">{project.number} / {String(projects.length).padStart(2, "0")}</div>
        <p className="project-category">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <ul>
          {project.achievements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="tech-list">
          {project.tech.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="project-links">
          {project.github && (
            <a
              className="project-link-btn"
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${project.title} source on GitHub`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
          )}
          {project.live && (
            <a
              className="project-link-btn project-link-btn--live"
              href={project.live}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${project.title} live`}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Live Site
            </a>
          )}
          {!project.github && !project.live && (
            <span className="project-link-placeholder" title="Project link not currently available">
              Case study <span>Link available soon</span>
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section className="section projects" id="projects">
      <SectionHeading
        number="03"
        label="Selected Work"
        description="A selection of research, production, and product engineering work."
      >
        Selected work.
        <br />
        <span className="muted-heading">Real-world solutions.</span>
      </SectionHeading>
      <div className="project-list">
        {projects.map((project, index) => (
          <ProjectCard project={project} index={index} key={project.title} />
        ))}
      </div>
    </section>
  );
}

const skillGroups = [
  {
    category: "Programming",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    items: ["Python", "JavaScript", "C", "SQL"],
  },
  {
    category: "Frontend & Mobile",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/>
      </svg>
    ),
    items: ["ReactJS", "React Native", "MERN Stack", "Flutter", "HTML", "CSS"],
  },
  {
    category: "Backend & APIs",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
      </svg>
    ),
    items: ["ASP.NET MVC", "Entity Framework", "REST APIs"],
  },
  {
    category: "Databases",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
      </svg>
    ),
    items: ["SQL Server", "MySQL", "MongoDB"],
  },
  {
    category: "AI & Machine Learning",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4z"/><path d="M6.343 17.657A8 8 0 0 1 4 12"/><path d="M17.657 17.657A8 8 0 0 0 20 12"/><path d="M12 10v4"/><path d="M9 20h6"/>
      </svg>
    ),
    items: ["TensorFlow", "OpenCV", "CNN", "OCR", "Image Recognition"],
  },
  {
    category: "Cloud & Infrastructure",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
      </svg>
    ),
    items: ["AWS Fundamentals", "Cloudflare Workers", "Linux", "Windows"],
  },
  {
    category: "Testing & Automation",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    items: ["Selenium", "Jenkins"],
  },
  {
    category: "Tools & Methods",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    items: ["Git", "GitHub", "Jira", "Agile / Scrum"],
  },
  {
    category: "Core Computer Science",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
      </svg>
    ),
    items: ["Data Structures", "Algorithms", "OOP", "OS", "DBMS", "Distributed Systems"],
  },
];

function SkillGrid() {
  return (
    <section className="section skills" id="skills">
      <SectionHeading number="04" label="Expertise">
        Tools I use.
        <br />
        <span className="muted-heading">Technologies I build with.</span>
      </SectionHeading>
      <div className="skill-grid">
        {skillGroups.map(({ category, icon, items }, index) => (
          <article className="skill-group reveal" key={category}>
            <div className="skill-group-header">
              <span className="skill-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="skill-icon" aria-hidden="true">{icon}</span>
            </div>
            <h3>{category}</h3>
            <p>{items.join(" · ")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const education = [
  {
    degree: "Bachelor of Engineering",
    subject: "Computer Science and Engineering",
    school: "Prince Shri Venkateshwara Padmavathy Engineering College",
    date: "May 2025",
    result: "CGPA 8.34 / 10",
  },
  {
    degree: "Higher Secondary Certificate",
    subject: "Computer Science",
    school: "Shri A Ganesan Higher Secondary School",
    date: "2021",
    result: "88.16%",
  },
  {
    degree: "SSLC",
    subject: "Secondary Education",
    school: "Shri A Ganesan Higher Secondary School",
    date: "—",
    result: "76.8%",
  },
];

function EducationItem({ item, index }: { item: (typeof education)[0]; index: number }) {
  return (
    <article className="education-item reveal">
      <span>{String(index + 1).padStart(2, "0")}</span>
      <div>
        <h3>{item.degree}</h3>
        <p>{item.subject}</p>
      </div>
      <p>
        {item.school}
        <br />
        <small>Chennai, India</small>
      </p>
      <div>
        <time>{item.date}</time>
        <strong>{item.result}</strong>
      </div>
    </article>
  );
}

const achievements = [
  ["Cisco", "Network Essentials"],
  ["Microsoft", "MS Office Fundamentals"],
  ["CSRI", "Web Development Diploma"],
  ["LeetCode", "120+ problems solved"],
  ["Assistive Technology Hackathon", "Nationwide runner-up"],
  ["DIGINOVA'25", "Web Design · Second Prize"],
];

function Education() {
  return (
    <section className="section education" id="education">
      <SectionHeading number="05" label="Education">
        Foundations for
        <br />
        <span className="muted-heading">lifelong learning.</span>
      </SectionHeading>
      <div className="education-list">
        {education.map((item, index) => (
          <EducationItem item={item} index={index} key={item.degree} />
        ))}
      </div>
      <div className="credentials">
        <div className="credential-intro reveal">
          <span>Credentials / Recognition</span>
          <h3>
            Always learning.
            <br />
            Always building.
          </h3>
        </div>
        <div className="credential-list">
          {achievements.map(([source, title], index) => (
            <div className="credential reveal" key={source}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{title}</strong>
              <p>{source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact" id="contact">
      <div className="contact-top">
        <div className="eyebrow light">
          <span>06</span>
          <span>/</span>
          <span>Contact</span>
        </div>
        <div className="availability light">
          <span className="pulse" />
          Open to opportunities
        </div>
      </div>
      <div className="contact-main reveal">
        <h2>
          Have an idea?
          <br />
          <em>Let&apos;s build something meaningful.</em>
        </h2>
        <div className="contact-side">
          <p>
            I&apos;m always interested in connecting with people, exploring opportunities, and
            building impactful technology.
          </p>
          <div className="contact-actions">
            <PrimaryButton dark href="mailto:manisekar6911@gmail.com">
              Send me an email
            </PrimaryButton>
            <SecondaryButton dark external href="https://linkedin.com/in/manikandan-s-md2510">
              Connect on LinkedIn
            </SecondaryButton>
          </div>
        </div>
      </div>
      <div className="contact-details">
        <div>
          <span>Name</span>
          <strong>Manikandan S</strong>
        </div>
        <div>
          <span>Location</span>
          <strong>Chennai, Tamil Nadu, India</strong>
        </div>
        <div>
          <span>Phone</span>
          <a href="tel:+919952001673">+91 99520 01673</a>
        </div>
        <div>
          <span>Email</span>
          <a href="mailto:manisekar6911@gmail.com">manisekar6911@gmail.com</a>
        </div>
      </div>
      <div className="contact-links">
        <a href="https://github.com/md0927" target="_blank" rel="noreferrer">
          GitHub (md0927) <Arrow diagonal />
        </a>
        <a href="https://github.com/mdani25" target="_blank" rel="noreferrer">
          GitHub (mdani25) <Arrow diagonal />
        </a>
        <a href="https://mdani25.netlify.app" target="_blank" rel="noreferrer">
          Current portfolio <Arrow diagonal />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <a className="brand footer-brand" href="#home">
        <img src={mspaceLogo} alt="M's Space" className="brand-logo" />
        <span>M's Space</span>
      </a>
      <p>Built from scratch. Shipped with purpose.</p>
      <div>
        <span>© 2026 Manikandan S.</span>
        <a href="https://github.com/mdani25" target="_blank" rel="noreferrer">
          GH
        </a>
        <a href="https://linkedin.com/in/manikandan-s-md2510" target="_blank" rel="noreferrer">
          LI
        </a>
      </div>
    </footer>
  );
}

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -50px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
    };
  }, []);
}

export default function App() {
  useReveal();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Statistics />
        <About />
        <ExperienceTimeline />
        <Projects />
        <SkillGrid />
        <Education />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
