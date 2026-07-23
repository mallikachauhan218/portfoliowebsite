import { useEffect, useRef } from 'react';

const SKILLS = [
  { name: 'React JS',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next JS',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Node JS',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Figma',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'HTML',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Tailwind',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'WordPress',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg' },
];

export default function Skills() {
  const gridRef = useRef(null);

  useEffect(() => {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const cards = gridRef.current?.querySelectorAll('.skill-card');
        if (!cards) return;
        gsap.fromTo(cards,
          { opacity: 0, y: 40, scale: 0.88 },
          {
            opacity: 1, y: 0, scale: 1,
            stagger: { each: 0.07, grid: 'auto', from: 'center' },
            duration: 0.75,
            ease: 'back.out(1.4)',
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%' }
          }
        );
      });
    });
  }, []);

  return (
    <>
      <section id="skills" className="skills">
        <div className="section-head">
          <div>
            <span className="section-tag">What I Work With</span>
            <h2 className="section-title"><span>Skills &amp; Tools</span></h2>
          </div>
          <p className="section-desc">Technologies I use to design, build and ship products end to end.</p>
        </div>

        <div className="skills-marquee">
          <div className="marquee-track">
            {[...SKILLS, ...SKILLS].map((s, i) => (
              <span key={i}>{s.name.toUpperCase()}</span>
            ))}
          </div>
        </div>

        <div className="skills-grid" ref={gridRef}>
          {SKILLS.map((skill, i) => (
            <div className="skill-card" key={i}>
              <img src={skill.icon} alt={skill.name} width={48} height={48} />
              <p>{skill.name}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="marquee2">
        <div className="marquee2-track">
          <span>CLEAN CODE <i /> RESPONSIVE DESIGN <i /> PIXEL PERFECT <i /> USER FOCUSED <i /></span>
          <span>CLEAN CODE <i /> RESPONSIVE DESIGN <i /> PIXEL PERFECT <i /> USER FOCUSED <i /></span>
        </div>
      </div>
    </>
  );
}
