import { useEffect, useRef } from 'react';

export default function FloatingShapes() {
  const triangleRef = useRef(null);
  const hexRef      = useRef(null);
  const ringRef     = useRef(null);
  const dotRef      = useRef(null);
  const crossRef    = useRef(null);

  useEffect(() => {
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        /* Idle float animations */
        gsap.to(triangleRef.current, { y: -22, rotation: 18,  duration: 3.2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        gsap.to(hexRef.current,      { y:  16, rotation: -12, duration: 4.1, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.2 });
        gsap.to(ringRef.current,     { y: -14, rotation:  25, duration: 3.7, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2.1 });
        gsap.to(dotRef.current,      { y:  18, rotation:  -8, duration: 2.9, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.7 });
        gsap.to(crossRef.current,    { y: -10, rotation:  45, duration: 5.0, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 3.0 });

        /* Scroll-driven cross-section movement */

        // Triangle: hero → about → projects
        ScrollTrigger.create({
          trigger: '#about',
          start: 'top 60%',
          onEnter:    () => gsap.to(triangleRef.current, { x: 'calc(75vw - 40px)', y: 'calc(30vh)', duration: 1.8, ease: 'power2.inOut' }),
          onLeaveBack: () => gsap.to(triangleRef.current, { x: 'calc(82vw - 40px)', y: '8vh',       duration: 1.8, ease: 'power2.inOut' }),
        });
        ScrollTrigger.create({
          trigger: '#projects',
          start: 'top 60%',
          onEnter:    () => gsap.to(triangleRef.current, { x: '8vw', y: 'calc(65vh)', duration: 2.2, ease: 'power2.inOut' }),
          onLeaveBack: () => gsap.to(triangleRef.current, { x: 'calc(75vw - 40px)', y: '30vh',      duration: 2.2, ease: 'power2.inOut' }),
        });

        // Hex: hero → skills → process
        ScrollTrigger.create({
          trigger: '#skills',
          start: 'top 60%',
          onEnter:    () => gsap.to(hexRef.current, { x: 'calc(88vw - 50px)', y: '42vh', duration: 1.9, ease: 'power2.inOut' }),
          onLeaveBack: () => gsap.to(hexRef.current, { x: '6vw', y: '18vh', duration: 1.9, ease: 'power2.inOut' }),
        });
        ScrollTrigger.create({
          trigger: '#process',
          start: 'top 60%',
          onEnter:    () => gsap.to(hexRef.current, { x: '4vw', y: '70vh', duration: 2.0, ease: 'power2.inOut' }),
          onLeaveBack: () => gsap.to(hexRef.current, { x: 'calc(88vw - 50px)', y: '42vh', duration: 2.0, ease: 'power2.inOut' }),
        });

        // Ring: hero → services → contact
        ScrollTrigger.create({
          trigger: '#services',
          start: 'top 60%',
          onEnter:    () => gsap.to(ringRef.current, { x: '12vw', y: '55vh', duration: 2.1, ease: 'power2.inOut' }),
          onLeaveBack: () => gsap.to(ringRef.current, { x: 'calc(90vw - 60px)', y: '25vh', duration: 2.1, ease: 'power2.inOut' }),
        });
        ScrollTrigger.create({
          trigger: '#contact',
          start: 'top 60%',
          onEnter:    () => gsap.to(ringRef.current, { x: 'calc(80vw - 60px)', y: '75vh', duration: 2.3, ease: 'power2.inOut' }),
          onLeaveBack: () => gsap.to(ringRef.current, { x: '12vw', y: '55vh', duration: 2.3, ease: 'power2.inOut' }),
        });
      });
    });
  }, []);

  return (
    <div className="floating-shapes" aria-hidden="true">
      {/* Triangle */}
      <div
        ref={triangleRef}
        className="shape shape-triangle"
        style={{ position: 'absolute', top: '8vh', left: '82vw' }}
      />
      {/* Hexagon */}
      <div
        ref={hexRef}
        className="shape shape-hex"
        style={{ position: 'absolute', top: '18vh', left: '6vw' }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="shape shape-ring"
        style={{ position: 'absolute', top: '25vh', left: '90vw' }}
      />
      {/* Dot cluster */}
      <div
        ref={dotRef}
        className="shape shape-dot-cluster"
        style={{ position: 'absolute', top: '55vh', left: '3vw' }}
      />
      {/* Cross */}
      <div
        ref={crossRef}
        className="shape shape-cross"
        style={{ position: 'absolute', top: '70vh', left: '92vw' }}
      />
    </div>
  );
}
