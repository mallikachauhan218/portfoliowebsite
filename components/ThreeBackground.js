"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ThreeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* ── RENDERER ── */
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 8;

    /* ── PARTICLES (dot background) ── */
    const particleCount = 900;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0xa855f7,          // -- accent1 purple
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    /* ── GLOBE GROUP ── */
    const globeGroup = new THREE.Group();
    globeGroup.position.set(3.2, -0.3, -2);
    scene.add(globeGroup);

    // Wireframe sphere (lat/lon lines)
    const sphereGeo = new THREE.SphereGeometry(2, 36, 18);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphere);

    // Solid dark core (occludes back wireframe)
    const coreGeo = new THREE.SphereGeometry(1.96, 36, 36);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x050510, transparent: true, opacity: 0.92 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(core);

    // Atmosphere glow ring (thin torus at equator)
    const eq1Geo = new THREE.TorusGeometry(2.04, 0.007, 8, 128);
    const eq1Mat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.95 }); // cyan
    const equator = new THREE.Mesh(eq1Geo, eq1Mat);
    globeGroup.add(equator);

    // Tilted orbital ring 1 (purple)
    const orb1Geo = new THREE.TorusGeometry(2.35, 0.005, 8, 128);
    const orb1Mat = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.75 });
    const orbital1 = new THREE.Mesh(orb1Geo, orb1Mat);
    orbital1.rotation.x = Math.PI / 3;
    orbital1.rotation.y = Math.PI / 5;
    globeGroup.add(orbital1);

    // Tilted orbital ring 2 (orange)
    const orb2Geo = new THREE.TorusGeometry(2.65, 0.004, 8, 128);
    const orb2Mat = new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.5 });
    const orbital2 = new THREE.Mesh(orb2Geo, orb2Mat);
    orbital2.rotation.x = -Math.PI / 4;
    orbital2.rotation.z = Math.PI / 6;
    globeGroup.add(orbital2);

    // Outer glow halo
    const haloGeo = new THREE.SphereGeometry(2.2, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.02, side: THREE.BackSide });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    globeGroup.add(halo);

    // Orbiting dot 1 (cyan, on orbital1 path)
    const dot1Geo = new THREE.SphereGeometry(0.065, 12, 12);
    const dot1Mat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
    const dot1 = new THREE.Mesh(dot1Geo, dot1Mat);
    scene.add(dot1); // not in group so we can position freely

    // Orbiting dot 2 (orange, on orbital2 path)
    const dot2Geo = new THREE.SphereGeometry(0.05, 12, 12);
    const dot2Mat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
    const dot2 = new THREE.Mesh(dot2Geo, dot2Mat);
    scene.add(dot2);

    /* ── SMALL SECONDARY ICOSA (background decoration) ── */
    const icoGeo = new THREE.IcosahedronGeometry(0.8, 0);
    const icoMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.07 });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(-4, 2, -4);
    scene.add(ico);

    /* ── MOUSE ── */
    let mouseX = 0, mouseY = 0;
    const onMove = (e) => {
      mouseX = e.clientX / window.innerWidth  - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMove);

    /* ── RESIZE ── */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    /* ── ANIMATE ── */
    let t = 0;
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.012;

      // Particles drift
      points.rotation.y += 0.0009;
      points.rotation.x += 0.0003;

      // Globe self-rotate
      globeGroup.rotation.y += 0.004;

      // Independent ring rotations
      orbital1.rotation.z += 0.006;
      orbital2.rotation.y += 0.004;
      ico.rotation.y += 0.002;
      ico.rotation.x += 0.001;

      // Dot 1 orbit (on orbital1 plane)
      const r1 = 2.35;
      const angle1 = t * 0.7;
      // Orbital1 is rotated x=PI/3, y=PI/5 + globe rotY
      const gRotY = globeGroup.rotation.y;
      dot1.position.x = globeGroup.position.x + r1 * Math.cos(angle1) * Math.cos(Math.PI / 5 + gRotY);
      dot1.position.y = globeGroup.position.y + r1 * Math.sin(Math.PI / 3) * Math.sin(angle1);
      dot1.position.z = globeGroup.position.z + r1 * Math.cos(angle1) * Math.sin(Math.PI / 5 + gRotY);

      // Dot 2 orbit (on orbital2 plane)
      const r2 = 2.65;
      const angle2 = -t * 0.5 + Math.PI;
      dot2.position.x = globeGroup.position.x + r2 * Math.cos(angle2);
      dot2.position.y = globeGroup.position.y + r2 * Math.sin(-Math.PI / 4) * Math.sin(angle2);
      dot2.position.z = globeGroup.position.z + r2 * Math.sin(angle2) * Math.cos(Math.PI / 6);

      // Mouse parallax camera
      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.025;
      camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.025;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    /* ── SCROLL: globe extra rotation ── */
    const scrollTween = gsap.to(globeGroup.rotation, {
      y: "+=6.28318", // one full extra turn
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
      },
    });

    /* ── SCROLL: particle drift ── */
    const particleTween = gsap.to(points.rotation, {
      y: "+=3.5",
      ease: "none",
      scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 1 },
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      scrollTween.scrollTrigger?.kill(); scrollTween.kill();
      particleTween.scrollTrigger?.kill(); particleTween.kill();
      [pGeo, pMat, sphereGeo, sphereMat, coreGeo, coreMat,
       eq1Geo, eq1Mat, orb1Geo, orb1Mat, orb2Geo, orb2Mat,
       haloGeo, haloMat, dot1Geo, dot1Mat, dot2Geo, dot2Mat,
       icoGeo, icoMat].forEach(o => o.dispose?.());
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="threeCanvas" />;
}
