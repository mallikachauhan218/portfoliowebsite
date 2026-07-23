import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── PROJECT DATA ─────────────────────────────────────────────── */
const PROJECTS = [
  {
    num: '01',
    title: 'Agricultural System',
    desc: 'Comprehensive irrigation & agricultural management platform for Khedut — product catalogs, service pages, and dealer networks across India.',
    tags: ['WordPress', 'Elementor', 'PHP'],
    link: 'https://www.khedutirrigation.com/',
    img: '/img/khedut_home.png',
    accent: '#a855f7',
    year: '2024',
    category: 'Web Platform',
  },
  {
    num: '02',
    title: 'Forex & CFX Trading',
    desc: 'High-performance trading platform with real-time data, dashboards & multi-language support for NAMH Global.',
    tags: ['Next JS', 'Node', 'Tailwind'],
    link: 'https://www.namhglobal.com/',
    img: '/img/namh_home.png',
    accent: '#06b6d4',
    year: '2024',
    category: 'FinTech',
  },
  {
    num: '03',
    title: 'Salon Booking Platform',
    desc: 'Full-featured beauty salon system with appointments, stylist profiles & integrated payment processing.',
    tags: ['Figma', 'Next JS', 'Node'],
    link: 'https://thecrazybeauty.com/',
    img: '/img/tcb_ss.png',
    accent: '#f97316',
    year: '2023',
    category: 'SaaS',
  },
  {
    num: '04',
    title: 'Tour Booking Platform',
    desc: 'Mekka Booking — travel & tour management with multi-step booking flows, itinerary builders, and API integrations.',
    tags: ['Next JS', 'PHP', 'API'],
    link: 'https://www.mekkabooking.com/',
    img: '/img/mekka_ss.png',
    accent: '#a855f7',
    year: '2023',
    category: 'Travel Tech',
  },
  {
    num: '05',
    title: 'E-Commerce Wellness',
    desc: 'Thrive Juice Co. — wellness brand store with product customization, subscription plans & health-focused UX.',
    tags: ['React', 'PHP'],
    link: 'https://thrivejuiceco.com/',
    img: '/img/juice_ss.png',
    accent: '#06b6d4',
    year: '2023',
    category: 'E-Commerce',
  },
  {
    num: '06',
    title: 'Waste Management',
    desc: 'Environmental tech platform connecting citizens and businesses with waste management & eco-friendly disposal solutions.',
    tags: ['HTML', 'CSS', 'Bootstrap'],
    link: 'https://thetrash.co.in/',
    img: '/img/trashco_ss.png',
    accent: '#f97316',
    year: '2022',
    category: 'GreenTech',
  },
];

/* ── SINGLE PROJECT ROW ───────────────────────────────────────── */
function ProjectRow({ proj, index }) {
  const rowRef    = useRef(null);
  const imgRef    = useRef(null);
  const textRef   = useRef(null);
  const lineRef   = useRef(null);
  const numBgRef  = useRef(null);
  const isEven    = index % 2 === 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const row  = rowRef.current;
      const img  = imgRef.current;
      const text = textRef.current;
      const line = lineRef.current;
      const numBg = numBgRef.current;

      const st = { trigger: row, start: 'top 80%', once: true };

      /* ── Divider line draws left → right ── */
      if (line) {
        gsap.fromTo(line,
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { ...st, start: 'top 88%' } }
        );
      }

      /* ── Image: clip-path wipe from the "outside" ── */
      gsap.fromTo(img,
        {
          clipPath: isEven
            ? 'inset(0 100% 0 0 round 16px)'
            : 'inset(0 0 0 100% round 16px)',
          scale: 1.08,
        },
        {
          clipPath: 'inset(0 0% 0 0% round 16px)',
          scale: 1,
          duration: 1.35,
          ease: 'expo.out',
          scrollTrigger: st,
        }
      );

      /* ── Ghost number fades in ── */
      if (numBg) {
        gsap.fromTo(numBg,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
            scrollTrigger: st }
        );
      }

      /* ── Text block: individual elements stagger ── */
      const textEls = text.querySelectorAll('[data-reveal]');
      gsap.fromTo(textEls,
        { y: 40, opacity: 0, filter: 'blur(5px)' },
        {
          y: 0, opacity: 1, filter: 'blur(0px)',
          stagger: 0.09,
          duration: 0.75,
          ease: 'power3.out',
          delay: 0.18,
          scrollTrigger: st,
        }
      );
    }, rowRef);

    return () => ctx.revert();
  }, [isEven]);

  return (
    <>
      {/* Divider line */}
      <div className="proj-divider" ref={lineRef} />

      {/* Row */}
      <a
        ref={rowRef}
        href={proj.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`proj-row${isEven ? '' : ' proj-row--rev'}`}
        style={{ '--acc': proj.accent }}
      >
        {/* Ghost background number */}
        <span className="proj-row-bg-num" ref={numBgRef}>{proj.num}</span>

        {/* ── Image column ── */}
        <div className="proj-row-img-col">
          <div ref={imgRef} className="proj-row-img-frame">
            <img
              src={proj.img}
              alt={proj.title}
              className="proj-row-img"
              onError={(e) => {
                e.target.src = `https://picsum.photos/seed/${30 + index}/900/560`;
              }}
            />
            {/* Accent border that appears on hover */}
            <div className="proj-row-img-border" />
            {/* Category chip in image corner */}
            <div className="proj-row-cat-chip">{proj.category}</div>
          </div>
        </div>

        {/* ── Text column ── */}
        <div className="proj-row-text-col" ref={textRef}>
          <div className="proj-row-meta" data-reveal>
            <span className="proj-row-num">{proj.num}</span>
            <span className="proj-row-slash">/</span>
            <span className="proj-row-cat-label">{proj.category}</span>
            <span className="proj-row-year">{proj.year}</span>
          </div>

          <h3 className="proj-row-title" data-reveal>{proj.title}</h3>

          <p className="proj-row-desc" data-reveal>{proj.desc}</p>

          <div className="proj-row-tags" data-reveal>
            {proj.tags.map((tag) => (
              <span key={tag} className="proj-row-tag">{tag}</span>
            ))}
          </div>

          <div className="proj-row-cta" data-reveal>
            <span className="proj-row-link-text">View Project</span>
            <span className="proj-row-arrow">↗</span>
          </div>
        </div>
      </a>
    </>
  );
}

/* ── MAIN SECTION ────────────────────────────────────────────── */
export default function Projects() {
  const sectionRef  = useRef(null);
  const headRef     = useRef(null);
  const counterRef  = useRef(null);
  const isInView    = useInView(sectionRef, { once: true, margin: '-60px' });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* Section heading stagger */
      if (headRef.current) {
        gsap.fromTo(
          headRef.current.querySelectorAll('[data-reveal]'),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            stagger: 0.1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: headRef.current, start: 'top 82%', once: true },
          }
        );
      }

      /* Counter count-up */
      if (counterRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: PROJECTS.length,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate() {
            if (counterRef.current)
              counterRef.current.textContent =
                String(Math.round(obj.val)).padStart(2, '0');
          },
          scrollTrigger: { trigger: section, start: 'top 70%', once: true },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="container-fluid px-3 px-md-4">

        {/* ── Section Head ── */}
        <div className="section-head" ref={headRef}>
          <div>
            <span className="section-tag" data-reveal>Selected Work</span>
            <h2 className="section-title" data-reveal>
              Featured Projects{' '}
              {/* <span className="proj-counter-badge">
                <span ref={counterRef}>00</span>
              </span> */}
            </h2>
          </div>
          <p className="section-desc" data-reveal>
            A curated selection of projects that reflect how I design and build for the web.
          </p>
        </div>

        {/* ── Last divider before the list starts ── */}
        <div className="proj-divider proj-divider--top" />

        {/* ── Project Rows ── */}
        <div className="proj-list">
          {PROJECTS.map((proj, i) => (
            <ProjectRow key={proj.num} proj={proj} index={i} />
          ))}
          {/* Final bottom line */}
          <div className="proj-divider proj-divider--bottom" />
        </div>

        {/* ── CTA ── */}
        <motion.div
          className="proj-cta-strip d-flex align-items-center justify-content-center gap-4 mt-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="proj-cta-line" />
          <a href="mailto:mallikachauhan2118@gmail.com" className="btn btn-primary">
            Start a Project <span className="arrow-icon">↗</span>
          </a>
          <span className="proj-cta-line" />
        </motion.div>

      </div>
    </section>
  );
}
