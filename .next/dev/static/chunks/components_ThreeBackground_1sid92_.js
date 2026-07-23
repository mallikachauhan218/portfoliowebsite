(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ThreeBackground.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ThreeBackground
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
function ThreeBackground() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThreeBackground.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            /* ── RENDERER ── */ const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WebGLRenderer"]({
                canvas,
                alpha: true,
                antialias: true
            });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setSize(window.innerWidth, window.innerHeight);
            const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Scene"]();
            const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"](60, window.innerWidth / window.innerHeight, 0.1, 100);
            camera.position.z = 8;
            /* ── PARTICLES (dot background) ── */ const particleCount = 900;
            const positions = new Float32Array(particleCount * 3);
            for(let i = 0; i < particleCount; i++){
                positions[i * 3] = (Math.random() - 0.5) * 22;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
            }
            const pGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            pGeo.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["BufferAttribute"](positions, 3));
            const pMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PointsMaterial"]({
                size: 0.045,
                color: 0xa855f7,
                transparent: true,
                opacity: 0.55,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["AdditiveBlending"]
            });
            const points = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Points"](pGeo, pMat);
            scene.add(points);
            /* ── GLOBE GROUP ── */ const globeGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Group"]();
            globeGroup.position.set(3.2, -0.3, -2);
            scene.add(globeGroup);
            // Wireframe sphere (lat/lon lines)
            const sphereGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SphereGeometry"](2, 36, 18);
            const sphereMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: 0xa855f7,
                wireframe: true,
                transparent: true,
                opacity: 0.1
            });
            const sphere = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Mesh"](sphereGeo, sphereMat);
            globeGroup.add(sphere);
            // Solid dark core (occludes back wireframe)
            const coreGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SphereGeometry"](1.96, 36, 36);
            const coreMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: 0x050510,
                transparent: true,
                opacity: 0.92
            });
            const core = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Mesh"](coreGeo, coreMat);
            globeGroup.add(core);
            // Atmosphere glow ring (thin torus at equator)
            const eq1Geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["TorusGeometry"](2.04, 0.007, 8, 128);
            const eq1Mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: 0x06b6d4,
                transparent: true,
                opacity: 0.95
            }); // cyan
            const equator = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Mesh"](eq1Geo, eq1Mat);
            globeGroup.add(equator);
            // Tilted orbital ring 1 (purple)
            const orb1Geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["TorusGeometry"](2.35, 0.005, 8, 128);
            const orb1Mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: 0xa855f7,
                transparent: true,
                opacity: 0.75
            });
            const orbital1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Mesh"](orb1Geo, orb1Mat);
            orbital1.rotation.x = Math.PI / 3;
            orbital1.rotation.y = Math.PI / 5;
            globeGroup.add(orbital1);
            // Tilted orbital ring 2 (orange)
            const orb2Geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["TorusGeometry"](2.65, 0.004, 8, 128);
            const orb2Mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: 0xf97316,
                transparent: true,
                opacity: 0.5
            });
            const orbital2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Mesh"](orb2Geo, orb2Mat);
            orbital2.rotation.x = -Math.PI / 4;
            orbital2.rotation.z = Math.PI / 6;
            globeGroup.add(orbital2);
            // Outer glow halo
            const haloGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SphereGeometry"](2.2, 32, 32);
            const haloMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: 0xa855f7,
                transparent: true,
                opacity: 0.02,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["BackSide"]
            });
            const halo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Mesh"](haloGeo, haloMat);
            globeGroup.add(halo);
            // Orbiting dot 1 (cyan, on orbital1 path)
            const dot1Geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.065, 12, 12);
            const dot1Mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: 0x06b6d4
            });
            const dot1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Mesh"](dot1Geo, dot1Mat);
            scene.add(dot1); // not in group so we can position freely
            // Orbiting dot 2 (orange, on orbital2 path)
            const dot2Geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.05, 12, 12);
            const dot2Mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: 0xf97316
            });
            const dot2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Mesh"](dot2Geo, dot2Mat);
            scene.add(dot2);
            /* ── SMALL SECONDARY ICOSA (background decoration) ── */ const icoGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["IcosahedronGeometry"](0.8, 0);
            const icoMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: 0x06b6d4,
                wireframe: true,
                transparent: true,
                opacity: 0.07
            });
            const ico = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Mesh"](icoGeo, icoMat);
            ico.position.set(-4, 2, -4);
            scene.add(ico);
            /* ── MOUSE ── */ let mouseX = 0, mouseY = 0;
            const onMove = {
                "ThreeBackground.useEffect.onMove": (e)=>{
                    mouseX = e.clientX / window.innerWidth - 0.5;
                    mouseY = e.clientY / window.innerHeight - 0.5;
                }
            }["ThreeBackground.useEffect.onMove"];
            window.addEventListener("mousemove", onMove);
            /* ── RESIZE ── */ const onResize = {
                "ThreeBackground.useEffect.onResize": ()=>{
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                }
            }["ThreeBackground.useEffect.onResize"];
            window.addEventListener("resize", onResize);
            /* ── ANIMATE ── */ let t = 0;
            let raf;
            const animate = {
                "ThreeBackground.useEffect.animate": ()=>{
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
                }
            }["ThreeBackground.useEffect.animate"];
            animate();
            /* ── SCROLL: globe extra rotation ── */ const scrollTween = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(globeGroup.rotation, {
                y: "+=6.28318",
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 2
                }
            });
            /* ── SCROLL: particle drift ── */ const particleTween = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(points.rotation, {
                y: "+=3.5",
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1
                }
            });
            return ({
                "ThreeBackground.useEffect": ()=>{
                    cancelAnimationFrame(raf);
                    window.removeEventListener("mousemove", onMove);
                    window.removeEventListener("resize", onResize);
                    scrollTween.scrollTrigger?.kill();
                    scrollTween.kill();
                    particleTween.scrollTrigger?.kill();
                    particleTween.kill();
                    [
                        pGeo,
                        pMat,
                        sphereGeo,
                        sphereMat,
                        coreGeo,
                        coreMat,
                        eq1Geo,
                        eq1Mat,
                        orb1Geo,
                        orb1Mat,
                        orb2Geo,
                        orb2Mat,
                        haloGeo,
                        haloMat,
                        dot1Geo,
                        dot1Mat,
                        dot2Geo,
                        dot2Mat,
                        icoGeo,
                        icoMat
                    ].forEach({
                        "ThreeBackground.useEffect": (o)=>o.dispose?.()
                    }["ThreeBackground.useEffect"]);
                    renderer.dispose();
                }
            })["ThreeBackground.useEffect"];
        }
    }["ThreeBackground.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        id: "threeCanvas"
    }, void 0, false, {
        fileName: "[project]/components/ThreeBackground.js",
        lineNumber: 208,
        columnNumber: 10
    }, this);
}
_s(ThreeBackground, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = ThreeBackground;
var _c;
__turbopack_context__.k.register(_c, "ThreeBackground");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ThreeBackground.js [client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/ThreeBackground.js [client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_ThreeBackground_1sid92_.js.map