import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const canvasRef  = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext('2d');
    let W = (canvas.width = section.offsetWidth);
    let H = (canvas.height = section.offsetHeight);

    // Mouse coordinates tracking
    const mouse = { x: -1000, y: -1000, radius: 180 };

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);

    // Particle Configuration
    const PARTICLE_COUNT = 45;
    const MAX_DISTANCE = 140;
    const colors = ['rgba(168,85,247,', 'rgba(6,182,212,', 'rgba(249,115,22,'];

    const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      baseX: 0,
      baseY: 0,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: 1.5 + Math.random() * 2.5,
      color: colors[i % colors.length],
      alpha: 0.2 + Math.random() * 0.5,
    }));

    let raf;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);

      // 1. Mouse Spotlight Ambient Glow
      if (mouse.x > 0 && mouse.y > 0) {
        const spotlight = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, mouse.radius * 1.5
        );
        spotlight.addColorStop(0, 'rgba(168,85,247,0.12)');
        spotlight.addColorStop(0.5, 'rgba(6,182,212,0.04)');
        spotlight.addColorStop(1, 'transparent');
        ctx.fillStyle = spotlight;
        ctx.fillRect(0, 0, W, H);
      }

      // 2. Update & Draw Particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wall bouncing
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        // Mouse Interactivity (Subtle Push / Pull)
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }

        // Render Particle Dot
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // 3. Draw Connecting Mesh Lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ldx = p.x - p2.x;
          const ldy = p.y - p2.y;
          const lineDist = Math.sqrt(ldx * ldx + ldy * ldy);

          if (lineDist < MAX_DISTANCE) {
            const lineAlpha = (1 - lineDist / MAX_DISTANCE) * 0.25;
            ctx.strokeStyle = `${p.color}${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
    };

    draw();

    // Handle Window Resize
    const onResize = () => {
      W = canvas.width = section.offsetWidth;
      H = canvas.height = section.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    // ── GSAP CONTENT REVEAL ──
    const ctxAnimation = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            invalidateOnRefresh: true,
          },
        }
      );
    }, sectionRef);

    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', onResize);
      ctxAnimation.revert();
    };
  }, []);

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <canvas className="contact-bg-canvas" ref={canvasRef} />
      <div className="contact-grid-bg" />

      {/* Decorative ambient glowing backdrops */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="contact-content" ref={contentRef}>
        <span className="section-tag">Get In Touch</span>

        <h2 className="contact-title">
          Let's build<br />
          <span className="grad">something great.</span>
        </h2>

        <p className="contact-sub">
          Your next big idea deserves world-class creative execution.
          Let's talk and turn your vision into something extraordinary.
        </p>

        <a href="mailto:mallikachauhan2118@gmail.com" className="contact-email">
          mallikachauhan2118@gmail.com
        </a>

        <div className="contact-info-grid">
          <div className="contact-block">
            <h4>Phone</h4>
            <a href="tel:+919687690985">+91 96876 90985</a>
          </div>
          <div className="contact-block">
            <h4>LinkedIn</h4>
            <a
              href="https://www.linkedin.com/in/mallika-chauhan"
              target="_blank"
              rel="noopener noreferrer"
            >
              mallika-chauhan
            </a>
          </div>
          <div className="contact-block">
            <h4>Location</h4>
            <span>India 🇮🇳</span>
          </div>
        </div>
      </div>
    </section>
  );
}