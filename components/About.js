import { useEffect, useRef } from 'react';

const TERMINAL_LINES = [
  { text: 'mallika.init() → ✓ ready', cls: '' },
  { text: '> Full-Stack Developer | 5yr', cls: '' },
  { text: '// React • Next.js • Node • Python', cls: 'cmt' },
];

export default function About() {
  const sectionRef  = useRef(null);
  const cardRef     = useRef(null);
  const contentRef  = useRef(null);
  const lineRefs    = useRef([]);
  const statRefs    = useRef([]);

  useEffect(() => {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        /* terminal typing */
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        });
        lineRefs.current.forEach((el, i) => {
          if (!el) return;
          const full = TERMINAL_LINES[i].text;
          tl.call(() => {
            let j = 0;
            const iv = setInterval(() => {
              el.textContent = full.slice(0, j++);
              if (j > full.length) clearInterval(iv);
            }, 45);
          }, [], i * 1.3);
        });

        /* stat counters */
        statRefs.current.forEach(el => {
          if (!el) return;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '+';
          ScrollTrigger.create({
            trigger: el, start: 'top 85%', once: true,
            onEnter: () => {
              gsap.to({ val: 0 }, {
                val: target, duration: 1.6, ease: 'power2.out',
                onUpdate() { el.textContent = Math.round(this.targets()[0].val) + suffix; }
              });
            }
          });
        });

        /* slide in card + content */
        gsap.fromTo(cardRef.current,
          { opacity: 0, x: -70 },
          { opacity: 1, x: 0, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
        );
        gsap.fromTo(contentRef.current,
          { opacity: 0, x: 70 },
          { opacity: 1, x: 0, duration: 1.1, ease: 'power3.out', delay: 0.15,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
        );
      });
    });
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="section-head">
        <div>
          <span className="section-tag">Get To Know Me</span>
          <h2 className="section-title"><span>About Me</span></h2>
        </div>
        <p className="section-desc">A quick look at who I am, how I work, and the numbers behind my journey so far.</p>
      </div>

      <div className="about-grid">
        {/* Visual card */}
        <div className="about-visual-wrap" ref={cardRef}>
          <div className="glass-card">
            <div className="corner-accent tl" />
            <div className="corner-accent tr" />
            <div className="corner-accent bl" />
            <div className="corner-accent br" />

            <div className="terminal-wrap">
              <div className="terminal">
                <div className="terminal-bar">
                  <span className="terminal-dot red" />
                  <span className="terminal-dot yellow" />
                  <span className="terminal-dot green" />
                  <span className="terminal-title">mallika.dev — zsh</span>
                </div>
                <div className="terminal-body">
                  {TERMINAL_LINES.map((l, i) => (
                    <div className="terminal-row" key={i}>
                      <span className="terminal-prompt">›</span>
                      <span
                        className={`terminal-line${l.cls ? ' ' + l.cls : ''}`}
                        ref={el => lineRefs.current[i] = el}
                      />
                    </div>
                  ))}
                  <span className="terminal-cursor" />
                </div>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <div className="badge badge-1">
            <span className="badge-dot cyan" />Available for work
          </div>
          <div className="badge badge-2">⚛ React Specialist</div>
          <div className="badge badge-3">🚀 5+ Yrs Experience</div>
        </div>

        {/* Content */}
        <div className="about-content" ref={contentRef}>
          <p className="about-lead">
            I'm a <span className="hl">full-stack developer</span> who enjoys turning ideas into interfaces that feel effortless to use.
          </p>
          <p className="about-para">
            I work primarily with React, Next.js, and NodeJS — comfortable across the stack when a project calls for it,
            and focused on motion and detail that make products feel alive.
          </p>

          <div className="about-tags">
            {['React','Next.js','JavaScript','TypeScript','Node.js','MongoDB','Tailwind','Figma'].map(t => (
              <span key={t}>{t}</span>
            ))}
          </div>

          <div className="about-stats">
            {[
              { count: 20,  suffix: '+', label: 'Projects Completed' },
              { count: 10,  suffix: '+', label: 'Technologies Used'  },
              { count: 100, suffix: '%', label: 'Client Satisfaction' },
              { count: 5,   suffix: '+', label: 'Years Building'     },
            ].map((s, i) => (
              <div className="stat-box" key={i}>
                <div
                  className="stat-num"
                  data-count={s.count}
                  data-suffix={s.suffix}
                  ref={el => statRefs.current[i] = el}
                >
                  {s.count}{s.suffix}
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <a href="#contact" className="btn btn-primary">
            Let's Talk <span className="arrow-icon">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
