import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import PixelFast from '../components/PixelFast';
import Process from '../components/Process';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import FloatingShapes from '../components/FloatingShapes';

export default function Home() {
  const preloaderRef = useRef(null);
  const barFillRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    /* ── PRELOADER ── */
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 18;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          const pl = preloaderRef.current;
          if (!pl) return;
          pl.style.opacity = '0';
          pl.style.transform = 'scale(1.05)';
          pl.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
          setTimeout(() => { if (pl) pl.style.display = 'none'; }, 700);
        }, 300);
      }
      if (barFillRef.current) barFillRef.current.style.width = `${Math.min(progress, 100)}%`;
    }, 80);

    /* ── CURSOR ── */
    const cursor = cursorRef.current;
    const ring = cursorRingRef.current;
    let curX = window.innerWidth / 2;
    let curY = window.innerHeight / 2;
    let ringX = curX;
    let ringY = curY;

    const onMove = (e) => {
      curX = e.clientX;
      curY = e.clientY;
      if (cursor) {
        cursor.style.left = `${curX}px`;
        cursor.style.top = `${curY}px`;
      }
    };
    window.addEventListener('mousemove', onMove);

    let rafId;
    const lerpRing = () => {
      ringX += (curX - ringX) * 0.1;
      ringY += (curY - ringY) * 0.1;
      if (ring) {
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
      }
      rafId = requestAnimationFrame(lerpRing);
    };
    lerpRing();

    const addHoverListeners = () => {
      const els = document.querySelectorAll('a, button, .btn, .skill-card, .project-card, .pf-card');
      els.forEach(el => {
        el.addEventListener('mouseenter', () => {
          if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
          if (ring) { ring.style.transform = 'translate(-50%,-50%) scale(1.8)'; ring.style.borderColor = 'var(--accent2)'; }
        });
        el.addEventListener('mouseleave', () => {
          if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(1)';
          if (ring) { ring.style.transform = 'translate(-50%,-50%) scale(1)'; ring.style.borderColor = 'var(--accent1)'; }
        });
      });
    };
    setTimeout(addHoverListeners, 1500);

    /* ── SCROLL PROGRESS ── */
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docH = document.body.scrollHeight - window.innerHeight;
      if (progressBarRef.current) progressBarRef.current.style.width = `${(scrollTop / docH) * 100}%`;
    };
    window.addEventListener('scroll', onScroll);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Mallika Chauhan — Full Stack Developer & UI/UX Craftsman</title>
        <meta name="description" content="Full-stack developer building scalable backend systems and pixel-perfect interfaces with React, Next.js, and Node.js." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Mallika Chauhan, Full Stack Developer, React, Next.js, UI/UX, Portfolio, India" />
        <meta property="og:title" content="Mallika Chauhan — Full Stack Developer" />
        <meta property="og:description" content="Building scalable systems and pixel-perfect interfaces." />
        <meta property="og:type" content="website" />
      </Head>

      {/* Preloader */}
      <div className="preloader" ref={preloaderRef}>
        <div className="preloader-inner">
          <h1>MALLIKA</h1>
          <div className="preloader-bar">
            <div className="preloader-bar-fill" ref={barFillRef} />
          </div>
          <p className="preloader-sub">Loading experience...</p>
        </div>
      </div>

      {/* Global FX */}
      <div className="grain-overlay" />
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={cursorRingRef} />
      <div className="fixed-progress">
        <div className="fixed-progress-bar" ref={progressBarRef} />
      </div>

      {/* Site */}
      <div className="site-wrapper">
        <FloatingShapes />
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <PixelFast />
        <Process />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
