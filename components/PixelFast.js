import { useEffect, useRef } from 'react';

const FEATURES = [
  {
    icon: '⚡',
    title: 'Pixel Perfect',
    desc: 'Every element crafted to exact specifications, ensuring flawless visual consistency across all devices and browsers.'
  },
  {
    icon: '🚀',
    title: 'Fast Delivery',
    desc: 'Optimized workflows and clean code that deliver projects on time, every time — without ever sacrificing quality.'
  },
  {
    icon: '🔄',
    title: '24/7 Revisions',
    desc: 'Unlimited refinements until the result exceeds expectations. Your satisfaction is the only finish line that matters.'
  },
  {
    icon: '🛡️',
    title: 'Clean Code',
    desc: 'Maintainable, scalable architecture built on industry best practices, modern standards, and thoughtful documentation.'
  },
];

export default function PixelFast() {
  const sectionRef = useRef(null);
  const canvasRef  = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas) return;

    /* ── MOUSE-TRACKING PARTICLE CANVAS ── */
    const ctx = canvas.getContext('2d');
    let W = section.offsetWidth;
    let H = section.offsetHeight;
    canvas.width  = W;
    canvas.height = H;

    const COLORS = ['rgba(168,85,247,', 'rgba(6,182,212,', 'rgba(249,115,22,'];
    const particles = [];

    class Particle {
      constructor(x, y) {
        this.x    = x;
        this.y    = y;
        this.vx   = (Math.random() - 0.5) * 4;
        this.vy   = (Math.random() - 0.5) * 4 - 1.5;
        this.life = 1;
        this.decay = 0.014 + Math.random() * 0.02;
        this.size  = 2 + Math.random() * 5;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.glow  = Math.random() > 0.5;
      }
      update() {
        this.x  += this.vx;
        this.y  += this.vy;
        this.vy += 0.05; // slight gravity
        this.vx *= 0.97;
        this.life -= this.decay;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.life * 0.85;
        if (this.glow) {
          ctx.shadowBlur  = 15;
          ctx.shadowColor = `${this.color}0.6)`;
        }
        ctx.fillStyle = `${this.color}${this.life.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const onMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      for (let i = 0; i < 5; i++) particles.push(new Particle(mx, my));
    };
    section.addEventListener('mousemove', onMouseMove);

    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, W, H);
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) particles.splice(i, 1);
      }
    };
    animate();

    const onResize = () => {
      W = section.offsetWidth;
      H = section.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    window.addEventListener('resize', onResize);

    /* ── GSAP CARD ANIMATIONS ── */
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(
          cardsRef.current.filter(Boolean),
          { opacity: 0, y: 55, scale: 0.93 },
          {
            opacity: 1, y: 0, scale: 1,
            stagger: 0.14,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 72%' }
          }
        );
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section className="pixel-fast" id="services" ref={sectionRef}>
      <canvas className="pixel-fast-canvas" ref={canvasRef} />
      <div className="pixel-fast-grid" />

      <div className="pixel-fast-content">
        <div className="section-head">
          <div>
            <span className="section-tag">Why Work With Me</span>
            <h2 className="section-title">
              <span>Pixel Fast.</span>{' '}
              <span style={{ color: 'var(--accent2)' }}>Always.</span>
            </h2>
          </div>
          <p className="section-desc">
            Move your cursor here — I craft experiences where every pixel and interaction tells a story.
          </p>
        </div>

        <div className="pixel-fast-cards">
          {FEATURES.map((feat, i) => (
            <div className="pf-card" key={i} ref={el => cardsRef.current[i] = el}>
              <div className="pf-card-icon">{feat.icon}</div>
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
