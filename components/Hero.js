import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const ThreeBackground = dynamic(() => import('./ThreeBackground'), { ssr: false });

const ROLES = ['Front-End Developer', 'Full-Stack Engineer', 'UI/UX Craftsman', 'React Specialist'];

export default function Hero() {
  const tagRef   = useRef(null);
  const line0    = useRef(null);
  const line1    = useRef(null);
  const line2    = useRef(null);
  const rotRef   = useRef(null);
  const descRef  = useRef(null);
  const ctaRef   = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Dynamically import gsap only on client
    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({ delay: 2.2 });
      tl.to(tagRef.current,  { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
        .to([line0.current, line1.current, line2.current],
            { y: '0%', stagger: 0.13, duration: 0.9, ease: 'power4.out' }, '-=0.4')
        .to(rotRef.current,  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .to(ctaRef.current,  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .to(scrollRef.current, { opacity: 1, duration: 0.5 }, '-=0.2');

      // Role rotator
      let idx = 0;
      const roleEl = document.querySelector('.role-text');
      if (!roleEl) return;
      const rotate = () => {
        idx = (idx + 1) % ROLES.length;
        gsap.to(roleEl, {
          y: '-100%', opacity: 0, duration: 0.35, ease: 'power2.in',
          onComplete: () => {
            roleEl.textContent = ROLES[idx];
            gsap.fromTo(roleEl, { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.35, ease: 'power2.out' });
          }
        });
      };
      const iv = setInterval(rotate, 2800);
      return () => clearInterval(iv);
    });
  }, []);

  return (
    <section className="hero" id="home">
      <ThreeBackground />

      <div className="hero-content">
        <div className="hero-tag" ref={tagRef}>
          <span className="dot" />
          OPEN FOR FREELANCE &amp; FULL-TIME ROLES
        </div>

        <h1>
          <span className="line"><span ref={line0}>Full-Stack</span></span>
          <span className="line"><span className="grad" ref={line1}>Engineer &amp;</span></span>
          <span className="line"><span ref={line2}>UI/UX Craftsman</span></span>
        </h1>

        <div className="role-rotator" ref={rotRef}>
          <span>Currently working as</span>
          <div className="role-window">
            <span className="role-text">Front-End Developer</span>
          </div>
        </div>

        <p className="hero-desc" ref={descRef}>
          I'm Mallika Chauhan — I bridge the gap between robust architecture and refined design,
          building scalable backend systems and pixel-perfect interfaces with React, Next.js, and Node.js.
        </p>

        <div className="hero-cta" ref={ctaRef}>
          <a href="#projects" className="btn btn-primary border-0">
            View Work <span className="arrow-icon">↓</span>
          </a>
          <a href="#contact" className="text-decoration-none  btnSecondary">
            Get In Touch <span className="arrow-icon">↗</span>
          </a>
        </div>
      </div>

      <div className="hero-scroll" ref={scrollRef}>
        <div className="scroll-line" />
        SCROLL
      </div>
    </section>
  );
}
