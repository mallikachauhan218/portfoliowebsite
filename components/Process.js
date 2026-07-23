import { useEffect, useRef } from 'react';

const STEPS = [
  {
    num: '01',
    title: 'DISCOVER',
    desc: 'Deep-dive into your brand, audience, and goals. Research-backed strategy ensures every creative decision has purpose and direction.',
  },
  {
    num: '02',
    title: 'CREATE',
    desc: 'Concepts come to life with obsessive attention to detail. Every frame, pixel, and interaction is crafted with clear intention.',
  },
  {
    num: '03',
    title: 'REFINE',
    desc: 'Tight feedback loops and rapid iteration. Polished until every element exceeds expectations — both yours and mine.',
  },
  {
    num: '04',
    title: 'DELIVER',
    desc: 'Launch-ready assets delivered fast and flawlessly. Ongoing support ensures your creative investment keeps performing.',
  },
];

export default function Process() {
  const stepRefs = useRef([]);

  useEffect(() => {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        stepRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.fromTo(el,
            { opacity: 0, y: 50, scale: 0.95 },
            {
              opacity: 1, y: 0, scale: 1,
              duration: 0.8,
              delay: i * 0.12,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 82%' }
            }
          );
        });
      });
    });
  }, []);

  return (
    <section id="process" className="process">
      <div className="section-head">
        <div>
          <span className="section-tag">How I Work</span>
          <h2 className="section-title"><span>My Process</span></h2>
        </div>
        <p className="section-desc">Four precise steps from concept to delivery. No guesswork, no delays — just relentless craft.</p>
      </div>

      <div className="process-steps">
        {STEPS.map((step, i) => (
          <div className="process-step" key={i} ref={el => stepRefs.current[i] = el}>
            <div className="step-num">{step.num}</div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
