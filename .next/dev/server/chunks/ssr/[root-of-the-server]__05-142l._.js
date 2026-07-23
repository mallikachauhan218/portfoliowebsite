module.exports = [
"[project]/components/Navbar.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [ssr] (ecmascript)");
;
;
;
const NAV_ITEMS = [
    'Home',
    'About',
    'Skills',
    'Process',
    'Projects',
    'Contact'
];
function Navbar() {
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('home');
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const onScroll = ()=>{
            setScrolled(window.scrollY > 60);
            // Active section detection
            for (const id of [
                'home',
                'about',
                'skills',
                'services',
                'process',
                'projects',
                'contact'
            ]){
                const el = document.getElementById(id);
                if (!el) continue;
                const rect = el.getBoundingClientRect();
                if (rect.top <= 120 && rect.bottom > 120) {
                    setActive(id);
                    break;
                }
            }
        };
        window.addEventListener('scroll', onScroll);
        return ()=>window.removeEventListener('scroll', onScroll);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                className: `navbar${scrolled ? ' scrolled' : ''}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "nav-logo",
                        children: [
                            "MC",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                children: "."
                            }, void 0, false, {
                                fileName: "[project]/components/Navbar.js",
                                lineNumber: 29,
                                columnNumber: 37
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Navbar.js",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                        className: "nav-links",
                        children: NAV_ITEMS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                    href: `#${item.toLowerCase()}`,
                                    className: active === item.toLowerCase() ? 'active' : '',
                                    children: item
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.js",
                                    lineNumber: 34,
                                    columnNumber: 15
                                }, this)
                            }, item, false, {
                                fileName: "[project]/components/Navbar.js",
                                lineNumber: 33,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/Navbar.js",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "nav-right",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                href: "https://www.linkedin.com/in/mallika-chauhan",
                                className: "nav-cta",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaLinkedinIn"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.js",
                                    lineNumber: 46,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Navbar.js",
                                lineNumber: 45,
                                columnNumber: 12
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: `nav-toggle${menuOpen ? ' active' : ''}`,
                                onClick: ()=>setMenuOpen((o)=>!o),
                                "aria-label": "Toggle menu",
                                "aria-expanded": menuOpen,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {}, void 0, false, {
                                        fileName: "[project]/components/Navbar.js",
                                        lineNumber: 54,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {}, void 0, false, {
                                        fileName: "[project]/components/Navbar.js",
                                        lineNumber: 54,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {}, void 0, false, {
                                        fileName: "[project]/components/Navbar.js",
                                        lineNumber: 54,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Navbar.js",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Navbar.js",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Navbar.js",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: `mobile-overlay${menuOpen ? ' open' : ''}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "mobile-menu",
                    children: [
                        NAV_ITEMS.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                href: `#${item.toLowerCase()}`,
                                className: "mobile-link",
                                onClick: ()=>setMenuOpen(false),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "mobile-link-num",
                                        children: [
                                            "0",
                                            i + 1
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Navbar.js",
                                        lineNumber: 69,
                                        columnNumber: 15
                                    }, this),
                                    item
                                ]
                            }, item, true, {
                                fileName: "[project]/components/Navbar.js",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "mobile-social",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                    href: "https://www.linkedin.com/in/mallika-chauhan",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    children: "LinkedIn ↗"
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.js",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                    href: "mailto:mallikachauhan2118@gmail.com",
                                    children: "Email ↗"
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.js",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Navbar.js",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Navbar.js",
                    lineNumber: 61,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Navbar.js",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/components/Hero.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Hero
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dynamic.js [ssr] (ecmascript)");
;
;
;
;
const ThreeBackground = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/components/ThreeBackground.js [ssr] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/components/ThreeBackground.js [client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const ROLES = [
    'Front-End Developer',
    'Full-Stack Engineer',
    'UI/UX Craftsman',
    'React Specialist'
];
function Hero() {
    const tagRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const line0 = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const line1 = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const line2 = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const rotRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const descRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const ctaRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        // Dynamically import gsap only on client
        Promise.all([
            __turbopack_context__.A("[project]/node_modules/gsap/index.js [ssr] (ecmascript, async loader)"),
            __turbopack_context__.A("[project]/node_modules/gsap/ScrollTrigger.js [ssr] (ecmascript, async loader)")
        ]).then(([{ default: gsap }, { ScrollTrigger }])=>{
            gsap.registerPlugin(ScrollTrigger);
            const tl = gsap.timeline({
                delay: 2.2
            });
            tl.to(tagRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power3.out'
            }).to([
                line0.current,
                line1.current,
                line2.current
            ], {
                y: '0%',
                stagger: 0.13,
                duration: 0.9,
                ease: 'power4.out'
            }, '-=0.4').to(rotRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.4').to(descRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.4').to(ctaRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.3').to(scrollRef.current, {
                opacity: 1,
                duration: 0.5
            }, '-=0.2');
            // Role rotator
            let idx = 0;
            const roleEl = document.querySelector('.role-text');
            if (!roleEl) return;
            const rotate = ()=>{
                idx = (idx + 1) % ROLES.length;
                gsap.to(roleEl, {
                    y: '-100%',
                    opacity: 0,
                    duration: 0.35,
                    ease: 'power2.in',
                    onComplete: ()=>{
                        roleEl.textContent = ROLES[idx];
                        gsap.fromTo(roleEl, {
                            y: '100%',
                            opacity: 0
                        }, {
                            y: '0%',
                            opacity: 1,
                            duration: 0.35,
                            ease: 'power2.out'
                        });
                    }
                });
            };
            const iv = setInterval(rotate, 2800);
            return ()=>clearInterval(iv);
        });
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        className: "hero",
        id: "home",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ThreeBackground, {}, void 0, false, {
                fileName: "[project]/components/Hero.js",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "hero-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "hero-tag",
                        ref: tagRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "dot"
                            }, void 0, false, {
                                fileName: "[project]/components/Hero.js",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this),
                            "OPEN FOR FREELANCE & FULL-TIME ROLES"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Hero.js",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "line",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    ref: line0,
                                    children: "Full-Stack"
                                }, void 0, false, {
                                    fileName: "[project]/components/Hero.js",
                                    lineNumber: 65,
                                    columnNumber: 34
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Hero.js",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "line",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "grad",
                                    ref: line1,
                                    children: "Engineer &"
                                }, void 0, false, {
                                    fileName: "[project]/components/Hero.js",
                                    lineNumber: 66,
                                    columnNumber: 34
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Hero.js",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "line",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    ref: line2,
                                    children: "UI/UX Craftsman"
                                }, void 0, false, {
                                    fileName: "[project]/components/Hero.js",
                                    lineNumber: 67,
                                    columnNumber: 34
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Hero.js",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Hero.js",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "role-rotator",
                        ref: rotRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                children: "Currently working as"
                            }, void 0, false, {
                                fileName: "[project]/components/Hero.js",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "role-window",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "role-text",
                                    children: "Front-End Developer"
                                }, void 0, false, {
                                    fileName: "[project]/components/Hero.js",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Hero.js",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Hero.js",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "hero-desc",
                        ref: descRef,
                        children: "I'm Mallika Chauhan — I bridge the gap between robust architecture and refined design, building scalable backend systems and pixel-perfect interfaces with React, Next.js, and Node.js."
                    }, void 0, false, {
                        fileName: "[project]/components/Hero.js",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "hero-cta",
                        ref: ctaRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                href: "#projects",
                                className: "btn btn-primary border-0",
                                children: [
                                    "View Work ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "arrow-icon",
                                        children: "↓"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Hero.js",
                                        lineNumber: 84,
                                        columnNumber: 23
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Hero.js",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                href: "#contact",
                                className: "text-decoration-none  btnSecondary",
                                children: [
                                    "Get In Touch ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "arrow-icon",
                                        children: "↗"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Hero.js",
                                        lineNumber: 87,
                                        columnNumber: 26
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Hero.js",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Hero.js",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Hero.js",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "hero-scroll",
                ref: scrollRef,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "scroll-line"
                    }, void 0, false, {
                        fileName: "[project]/components/Hero.js",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    "SCROLL"
                ]
            }, void 0, true, {
                fileName: "[project]/components/Hero.js",
                lineNumber: 92,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Hero.js",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/About.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>About
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
const TERMINAL_LINES = [
    {
        text: 'mallika.init() → ✓ ready',
        cls: ''
    },
    {
        text: '> Full-Stack Developer | 5yr',
        cls: ''
    },
    {
        text: '// React • Next.js • Node • Python',
        cls: 'cmt'
    }
];
function About() {
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const cardRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const contentRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const lineRefs = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])([]);
    const statRefs = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        __turbopack_context__.A("[project]/node_modules/gsap/index.js [ssr] (ecmascript, async loader)").then(({ default: gsap })=>{
            __turbopack_context__.A("[project]/node_modules/gsap/ScrollTrigger.js [ssr] (ecmascript, async loader)").then(({ ScrollTrigger })=>{
                gsap.registerPlugin(ScrollTrigger);
                /* terminal typing */ const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%'
                    }
                });
                lineRefs.current.forEach((el, i)=>{
                    if (!el) return;
                    const full = TERMINAL_LINES[i].text;
                    tl.call(()=>{
                        let j = 0;
                        const iv = setInterval(()=>{
                            el.textContent = full.slice(0, j++);
                            if (j > full.length) clearInterval(iv);
                        }, 45);
                    }, [], i * 1.3);
                });
                /* stat counters */ statRefs.current.forEach((el)=>{
                    if (!el) return;
                    const target = parseInt(el.dataset.count, 10);
                    const suffix = el.dataset.suffix || '+';
                    ScrollTrigger.create({
                        trigger: el,
                        start: 'top 85%',
                        once: true,
                        onEnter: ()=>{
                            gsap.to({
                                val: 0
                            }, {
                                val: target,
                                duration: 1.6,
                                ease: 'power2.out',
                                onUpdate () {
                                    el.textContent = Math.round(this.targets()[0].val) + suffix;
                                }
                            });
                        }
                    });
                });
                /* slide in card + content */ gsap.fromTo(cardRef.current, {
                    opacity: 0,
                    x: -70
                }, {
                    opacity: 1,
                    x: 0,
                    duration: 1.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%'
                    }
                });
                gsap.fromTo(contentRef.current, {
                    opacity: 0,
                    x: 70
                }, {
                    opacity: 1,
                    x: 0,
                    duration: 1.1,
                    ease: 'power3.out',
                    delay: 0.15,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%'
                    }
                });
            });
        });
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        className: "about",
        id: "about",
        ref: sectionRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "section-head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "section-tag",
                                children: "Get To Know Me"
                            }, void 0, false, {
                                fileName: "[project]/components/About.js",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                className: "section-title",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    children: "About Me"
                                }, void 0, false, {
                                    fileName: "[project]/components/About.js",
                                    lineNumber: 73,
                                    columnNumber: 41
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/About.js",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/About.js",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "section-desc",
                        children: "A quick look at who I am, how I work, and the numbers behind my journey so far."
                    }, void 0, false, {
                        fileName: "[project]/components/About.js",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/About.js",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "about-grid",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "about-visual-wrap",
                        ref: cardRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "glass-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "corner-accent tl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/About.js",
                                        lineNumber: 82,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "corner-accent tr"
                                    }, void 0, false, {
                                        fileName: "[project]/components/About.js",
                                        lineNumber: 83,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "corner-accent bl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/About.js",
                                        lineNumber: 84,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "corner-accent br"
                                    }, void 0, false, {
                                        fileName: "[project]/components/About.js",
                                        lineNumber: 85,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "terminal-wrap",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "terminal",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "terminal-bar",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "terminal-dot red"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/About.js",
                                                            lineNumber: 90,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "terminal-dot yellow"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/About.js",
                                                            lineNumber: 91,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "terminal-dot green"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/About.js",
                                                            lineNumber: 92,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "terminal-title",
                                                            children: "mallika.dev — zsh"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/About.js",
                                                            lineNumber: 93,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/About.js",
                                                    lineNumber: 89,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "terminal-body",
                                                    children: [
                                                        TERMINAL_LINES.map((l, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "terminal-row",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        className: "terminal-prompt",
                                                                        children: "›"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/About.js",
                                                                        lineNumber: 98,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        className: `terminal-line${l.cls ? ' ' + l.cls : ''}`,
                                                                        ref: (el)=>lineRefs.current[i] = el
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/About.js",
                                                                        lineNumber: 99,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, i, true, {
                                                                fileName: "[project]/components/About.js",
                                                                lineNumber: 97,
                                                                columnNumber: 21
                                                            }, this)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "terminal-cursor"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/About.js",
                                                            lineNumber: 105,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/About.js",
                                                    lineNumber: 95,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/About.js",
                                            lineNumber: 88,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/About.js",
                                        lineNumber: 87,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/About.js",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "badge badge-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "badge-dot cyan"
                                    }, void 0, false, {
                                        fileName: "[project]/components/About.js",
                                        lineNumber: 113,
                                        columnNumber: 13
                                    }, this),
                                    "Available for work"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/About.js",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "badge badge-2",
                                children: "⚛ React Specialist"
                            }, void 0, false, {
                                fileName: "[project]/components/About.js",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "badge badge-3",
                                children: "🚀 5+ Yrs Experience"
                            }, void 0, false, {
                                fileName: "[project]/components/About.js",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/About.js",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "about-content",
                        ref: contentRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "about-lead",
                                children: [
                                    "I'm a ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "hl",
                                        children: "full-stack developer"
                                    }, void 0, false, {
                                        fileName: "[project]/components/About.js",
                                        lineNumber: 122,
                                        columnNumber: 19
                                    }, this),
                                    " who enjoys turning ideas into interfaces that feel effortless to use."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/About.js",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "about-para",
                                children: "I work primarily with React, Next.js, and NodeJS — comfortable across the stack when a project calls for it, and focused on motion and detail that make products feel alive."
                            }, void 0, false, {
                                fileName: "[project]/components/About.js",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "about-tags",
                                children: [
                                    'React',
                                    'Next.js',
                                    'JavaScript',
                                    'TypeScript',
                                    'Node.js',
                                    'MongoDB',
                                    'Tailwind',
                                    'Figma'
                                ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        children: t
                                    }, t, false, {
                                        fileName: "[project]/components/About.js",
                                        lineNumber: 131,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/About.js",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "about-stats",
                                children: [
                                    {
                                        count: 20,
                                        suffix: '+',
                                        label: 'Projects Completed'
                                    },
                                    {
                                        count: 10,
                                        suffix: '+',
                                        label: 'Technologies Used'
                                    },
                                    {
                                        count: 100,
                                        suffix: '%',
                                        label: 'Client Satisfaction'
                                    },
                                    {
                                        count: 5,
                                        suffix: '+',
                                        label: 'Years Building'
                                    }
                                ].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "stat-box",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "stat-num",
                                                "data-count": s.count,
                                                "data-suffix": s.suffix,
                                                ref: (el)=>statRefs.current[i] = el,
                                                children: [
                                                    s.count,
                                                    s.suffix
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/About.js",
                                                lineNumber: 143,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "stat-label",
                                                children: s.label
                                            }, void 0, false, {
                                                fileName: "[project]/components/About.js",
                                                lineNumber: 151,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/components/About.js",
                                        lineNumber: 142,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/About.js",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                href: "#contact",
                                className: "btn btn-primary",
                                children: [
                                    "Let's Talk ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "arrow-icon",
                                        children: "↗"
                                    }, void 0, false, {
                                        fileName: "[project]/components/About.js",
                                        lineNumber: 157,
                                        columnNumber: 24
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/About.js",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/About.js",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/About.js",
                lineNumber: 78,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/About.js",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/Skills.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Skills
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
const SKILLS = [
    {
        name: 'React JS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
    },
    {
        name: 'Next JS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'
    },
    {
        name: 'Node JS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
    },
    {
        name: 'Python',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
    },
    {
        name: 'Figma',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'
    },
    {
        name: 'HTML',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
    },
    {
        name: 'CSS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
    },
    {
        name: 'JavaScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
    },
    {
        name: 'Tailwind',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'
    },
    {
        name: 'WordPress',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg'
    }
];
function Skills() {
    const gridRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        __turbopack_context__.A("[project]/node_modules/gsap/index.js [ssr] (ecmascript, async loader)").then(({ default: gsap })=>{
            __turbopack_context__.A("[project]/node_modules/gsap/ScrollTrigger.js [ssr] (ecmascript, async loader)").then(({ ScrollTrigger })=>{
                gsap.registerPlugin(ScrollTrigger);
                const cards = gridRef.current?.querySelectorAll('.skill-card');
                if (!cards) return;
                gsap.fromTo(cards, {
                    opacity: 0,
                    y: 40,
                    scale: 0.88
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    stagger: {
                        each: 0.07,
                        grid: 'auto',
                        from: 'center'
                    },
                    duration: 0.75,
                    ease: 'back.out(1.4)',
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 80%'
                    }
                });
            });
        });
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                id: "skills",
                className: "skills",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "section-head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "section-tag",
                                        children: "What I Work With"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Skills.js",
                                        lineNumber: 44,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                        className: "section-title",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            children: "Skills & Tools"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Skills.js",
                                            lineNumber: 45,
                                            columnNumber: 43
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Skills.js",
                                        lineNumber: 45,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Skills.js",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "section-desc",
                                children: "Technologies I use to design, build and ship products end to end."
                            }, void 0, false, {
                                fileName: "[project]/components/Skills.js",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Skills.js",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "skills-marquee",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "marquee-track",
                            children: [
                                ...SKILLS,
                                ...SKILLS
                            ].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    children: s.name.toUpperCase()
                                }, i, false, {
                                    fileName: "[project]/components/Skills.js",
                                    lineNumber: 53,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/Skills.js",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Skills.js",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "skills-grid",
                        ref: gridRef,
                        children: SKILLS.map((skill, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "skill-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                        src: skill.icon,
                                        alt: skill.name,
                                        width: 48,
                                        height: 48
                                    }, void 0, false, {
                                        fileName: "[project]/components/Skills.js",
                                        lineNumber: 61,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        children: skill.name
                                    }, void 0, false, {
                                        fileName: "[project]/components/Skills.js",
                                        lineNumber: 62,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/Skills.js",
                                lineNumber: 60,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/Skills.js",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Skills.js",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "marquee2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "marquee2-track",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            children: [
                                "CLEAN CODE ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {}, void 0, false, {
                                    fileName: "[project]/components/Skills.js",
                                    lineNumber: 70,
                                    columnNumber: 28
                                }, this),
                                " RESPONSIVE DESIGN ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {}, void 0, false, {
                                    fileName: "[project]/components/Skills.js",
                                    lineNumber: 70,
                                    columnNumber: 52
                                }, this),
                                " PIXEL PERFECT ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {}, void 0, false, {
                                    fileName: "[project]/components/Skills.js",
                                    lineNumber: 70,
                                    columnNumber: 72
                                }, this),
                                " USER FOCUSED ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {}, void 0, false, {
                                    fileName: "[project]/components/Skills.js",
                                    lineNumber: 70,
                                    columnNumber: 91
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Skills.js",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            children: [
                                "CLEAN CODE ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {}, void 0, false, {
                                    fileName: "[project]/components/Skills.js",
                                    lineNumber: 71,
                                    columnNumber: 28
                                }, this),
                                " RESPONSIVE DESIGN ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {}, void 0, false, {
                                    fileName: "[project]/components/Skills.js",
                                    lineNumber: 71,
                                    columnNumber: 52
                                }, this),
                                " PIXEL PERFECT ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {}, void 0, false, {
                                    fileName: "[project]/components/Skills.js",
                                    lineNumber: 71,
                                    columnNumber: 72
                                }, this),
                                " USER FOCUSED ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {}, void 0, false, {
                                    fileName: "[project]/components/Skills.js",
                                    lineNumber: 71,
                                    columnNumber: 91
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Skills.js",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Skills.js",
                    lineNumber: 69,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Skills.js",
                lineNumber: 68,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/components/PixelFast.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PixelFast
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
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
    }
];
function PixelFast() {
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const cardsRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const section = sectionRef.current;
        const canvas = canvasRef.current;
        if (!section || !canvas) return;
        /* ── MOUSE-TRACKING PARTICLE CANVAS ── */ const ctx = canvas.getContext('2d');
        let W = section.offsetWidth;
        let H = section.offsetHeight;
        canvas.width = W;
        canvas.height = H;
        const COLORS = [
            'rgba(168,85,247,',
            'rgba(6,182,212,',
            'rgba(249,115,22,'
        ];
        const particles = [];
        class Particle {
            constructor(x, y){
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 4;
                this.vy = (Math.random() - 0.5) * 4 - 1.5;
                this.life = 1;
                this.decay = 0.014 + Math.random() * 0.02;
                this.size = 2 + Math.random() * 5;
                this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
                this.glow = Math.random() > 0.5;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.vy += 0.05; // slight gravity
                this.vx *= 0.97;
                this.life -= this.decay;
            }
            draw() {
                ctx.save();
                ctx.globalAlpha = this.life * 0.85;
                if (this.glow) {
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = `${this.color}0.6)`;
                }
                ctx.fillStyle = `${this.color}${this.life.toFixed(2)})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }
        const onMouseMove = (e)=>{
            const rect = section.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;
            for(let i = 0; i < 5; i++)particles.push(new Particle(mx, my));
        };
        section.addEventListener('mousemove', onMouseMove);
        let raf;
        const animate = ()=>{
            raf = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, W, H);
            for(let i = particles.length - 1; i >= 0; i--){
                particles[i].update();
                particles[i].draw();
                if (particles[i].life <= 0) particles.splice(i, 1);
            }
        };
        animate();
        const onResize = ()=>{
            W = section.offsetWidth;
            H = section.offsetHeight;
            canvas.width = W;
            canvas.height = H;
        };
        window.addEventListener('resize', onResize);
        /* ── GSAP CARD ANIMATIONS ── */ __turbopack_context__.A("[project]/node_modules/gsap/index.js [ssr] (ecmascript, async loader)").then(({ default: gsap })=>{
            __turbopack_context__.A("[project]/node_modules/gsap/ScrollTrigger.js [ssr] (ecmascript, async loader)").then(({ ScrollTrigger })=>{
                gsap.registerPlugin(ScrollTrigger);
                gsap.fromTo(cardsRef.current.filter(Boolean), {
                    opacity: 0,
                    y: 55,
                    scale: 0.93
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    stagger: 0.14,
                    duration: 0.85,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 72%'
                    }
                });
            });
        });
        return ()=>{
            cancelAnimationFrame(raf);
            section.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        className: "pixel-fast",
        id: "services",
        ref: sectionRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("canvas", {
                className: "pixel-fast-canvas",
                ref: canvasRef
            }, void 0, false, {
                fileName: "[project]/components/PixelFast.js",
                lineNumber: 135,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "pixel-fast-grid"
            }, void 0, false, {
                fileName: "[project]/components/PixelFast.js",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "pixel-fast-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "section-head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "section-tag",
                                        children: "Why Work With Me"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PixelFast.js",
                                        lineNumber: 141,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                        className: "section-title",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                children: "Pixel Fast."
                                            }, void 0, false, {
                                                fileName: "[project]/components/PixelFast.js",
                                                lineNumber: 143,
                                                columnNumber: 15
                                            }, this),
                                            ' ',
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: 'var(--accent2)'
                                                },
                                                children: "Always."
                                            }, void 0, false, {
                                                fileName: "[project]/components/PixelFast.js",
                                                lineNumber: 144,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/PixelFast.js",
                                        lineNumber: 142,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/PixelFast.js",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "section-desc",
                                children: "Move your cursor here — I craft experiences where every pixel and interaction tells a story."
                            }, void 0, false, {
                                fileName: "[project]/components/PixelFast.js",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PixelFast.js",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "pixel-fast-cards",
                        children: FEATURES.map((feat, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "pf-card",
                                ref: (el)=>cardsRef.current[i] = el,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "pf-card-icon",
                                        children: feat.icon
                                    }, void 0, false, {
                                        fileName: "[project]/components/PixelFast.js",
                                        lineNumber: 155,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        children: feat.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/PixelFast.js",
                                        lineNumber: 156,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        children: feat.desc
                                    }, void 0, false, {
                                        fileName: "[project]/components/PixelFast.js",
                                        lineNumber: 157,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/PixelFast.js",
                                lineNumber: 154,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/PixelFast.js",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PixelFast.js",
                lineNumber: 138,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/PixelFast.js",
        lineNumber: 134,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/Process.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Process
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
const STEPS = [
    {
        num: '01',
        title: 'DISCOVER',
        desc: 'Deep-dive into your brand, audience, and goals. Research-backed strategy ensures every creative decision has purpose and direction.'
    },
    {
        num: '02',
        title: 'CREATE',
        desc: 'Concepts come to life with obsessive attention to detail. Every frame, pixel, and interaction is crafted with clear intention.'
    },
    {
        num: '03',
        title: 'REFINE',
        desc: 'Tight feedback loops and rapid iteration. Polished until every element exceeds expectations — both yours and mine.'
    },
    {
        num: '04',
        title: 'DELIVER',
        desc: 'Launch-ready assets delivered fast and flawlessly. Ongoing support ensures your creative investment keeps performing.'
    }
];
function Process() {
    const stepRefs = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        __turbopack_context__.A("[project]/node_modules/gsap/index.js [ssr] (ecmascript, async loader)").then(({ default: gsap })=>{
            __turbopack_context__.A("[project]/node_modules/gsap/ScrollTrigger.js [ssr] (ecmascript, async loader)").then(({ ScrollTrigger })=>{
                gsap.registerPlugin(ScrollTrigger);
                stepRefs.current.forEach((el, i)=>{
                    if (!el) return;
                    gsap.fromTo(el, {
                        opacity: 0,
                        y: 50,
                        scale: 0.95
                    }, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        delay: i * 0.12,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 82%'
                        }
                    });
                });
            });
        });
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        id: "process",
        className: "process",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "section-head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "section-tag",
                                children: "How I Work"
                            }, void 0, false, {
                                fileName: "[project]/components/Process.js",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                className: "section-title",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    children: "My Process"
                                }, void 0, false, {
                                    fileName: "[project]/components/Process.js",
                                    lineNumber: 55,
                                    columnNumber: 41
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Process.js",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Process.js",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "section-desc",
                        children: "Four precise steps from concept to delivery. No guesswork, no delays — just relentless craft."
                    }, void 0, false, {
                        fileName: "[project]/components/Process.js",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Process.js",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "process-steps",
                children: STEPS.map((step, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "process-step",
                        ref: (el)=>stepRefs.current[i] = el,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "step-num",
                                children: step.num
                            }, void 0, false, {
                                fileName: "[project]/components/Process.js",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "step-content",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        children: step.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/Process.js",
                                        lineNumber: 65,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        children: step.desc
                                    }, void 0, false, {
                                        fileName: "[project]/components/Process.js",
                                        lineNumber: 66,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Process.js",
                                lineNumber: 64,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/components/Process.js",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/Process.js",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Process.js",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/Projects.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Projects
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import, [project]/node_modules/framer-motion)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
/* ── PROJECT DATA ─────────────────────────────────────────────── */ const PROJECTS = [
    {
        num: '01',
        title: 'Agricultural System',
        desc: 'Comprehensive irrigation & agricultural management platform for Khedut — product catalogs, service pages, and dealer networks across India.',
        tags: [
            'WordPress',
            'Elementor',
            'PHP'
        ],
        link: 'https://www.khedutirrigation.com/',
        img: '/img/khedut_home.png',
        accent: '#a855f7',
        year: '2024',
        category: 'Web Platform'
    },
    {
        num: '02',
        title: 'Forex & CFX Trading',
        desc: 'High-performance trading platform with real-time data, dashboards & multi-language support for NAMH Global.',
        tags: [
            'Next JS',
            'Node',
            'Tailwind'
        ],
        link: 'https://www.namhglobal.com/',
        img: '/img/namh_home.png',
        accent: '#06b6d4',
        year: '2024',
        category: 'FinTech'
    },
    {
        num: '03',
        title: 'Salon Booking Platform',
        desc: 'Full-featured beauty salon system with appointments, stylist profiles & integrated payment processing.',
        tags: [
            'Figma',
            'Next JS',
            'Node'
        ],
        link: 'https://thecrazybeauty.com/',
        img: '/img/tcb_ss.png',
        accent: '#f97316',
        year: '2023',
        category: 'SaaS'
    },
    {
        num: '04',
        title: 'Tour Booking Platform',
        desc: 'Mekka Booking — travel & tour management with multi-step booking flows, itinerary builders, and API integrations.',
        tags: [
            'Next JS',
            'PHP',
            'API'
        ],
        link: 'https://www.mekkabooking.com/',
        img: '/img/mekka_ss.png',
        accent: '#a855f7',
        year: '2023',
        category: 'Travel Tech'
    },
    {
        num: '05',
        title: 'E-Commerce Wellness',
        desc: 'Thrive Juice Co. — wellness brand store with product customization, subscription plans & health-focused UX.',
        tags: [
            'React',
            'PHP'
        ],
        link: 'https://thrivejuiceco.com/',
        img: '/img/juice_ss.png',
        accent: '#06b6d4',
        year: '2023',
        category: 'E-Commerce'
    },
    {
        num: '06',
        title: 'Waste Management',
        desc: 'Environmental tech platform connecting citizens and businesses with waste management & eco-friendly disposal solutions.',
        tags: [
            'HTML',
            'CSS',
            'Bootstrap'
        ],
        link: 'https://thetrash.co.in/',
        img: '/img/trashco_ss.png',
        accent: '#f97316',
        year: '2022',
        category: 'GreenTech'
    }
];
/* ── SINGLE PROJECT ROW ───────────────────────────────────────── */ function ProjectRow({ proj, index }) {
    const rowRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const imgRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const textRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const lineRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const numBgRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const isEven = index % 2 === 0;
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].context(()=>{
            const row = rowRef.current;
            const img = imgRef.current;
            const text = textRef.current;
            const line = lineRef.current;
            const numBg = numBgRef.current;
            const st = {
                trigger: row,
                start: 'top 80%',
                once: true
            };
            /* ── Divider line draws left → right ── */ if (line) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(line, {
                    scaleX: 0,
                    transformOrigin: 'left'
                }, {
                    scaleX: 1,
                    duration: 1.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        ...st,
                        start: 'top 88%'
                    }
                });
            }
            /* ── Image: clip-path wipe from the "outside" ── */ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(img, {
                clipPath: isEven ? 'inset(0 100% 0 0 round 16px)' : 'inset(0 0 0 100% round 16px)',
                scale: 1.08
            }, {
                clipPath: 'inset(0 0% 0 0% round 16px)',
                scale: 1,
                duration: 1.35,
                ease: 'expo.out',
                scrollTrigger: st
            });
            /* ── Ghost number fades in ── */ if (numBg) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(numBg, {
                    opacity: 0,
                    y: 30
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1.0,
                    ease: 'power3.out',
                    scrollTrigger: st
                });
            }
            /* ── Text block: individual elements stagger ── */ const textEls = text.querySelectorAll('[data-reveal]');
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(textEls, {
                y: 40,
                opacity: 0,
                filter: 'blur(5px)'
            }, {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                stagger: 0.09,
                duration: 0.75,
                ease: 'power3.out',
                delay: 0.18,
                scrollTrigger: st
            });
        }, rowRef);
        return ()=>ctx.revert();
    }, [
        isEven
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "proj-divider",
                ref: lineRef
            }, void 0, false, {
                fileName: "[project]/components/Projects.js",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                ref: rowRef,
                href: proj.link,
                target: "_blank",
                rel: "noopener noreferrer",
                className: `proj-row${isEven ? '' : ' proj-row--rev'}`,
                style: {
                    '--acc': proj.accent
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "proj-row-bg-num",
                        ref: numBgRef,
                        children: proj.num
                    }, void 0, false, {
                        fileName: "[project]/components/Projects.js",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "proj-row-img-col",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            ref: imgRef,
                            className: "proj-row-img-frame",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: proj.img,
                                    alt: proj.title,
                                    className: "proj-row-img",
                                    onError: (e)=>{
                                        e.target.src = `https://picsum.photos/seed/${30 + index}/900/560`;
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/Projects.js",
                                    lineNumber: 170,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "proj-row-img-border"
                                }, void 0, false, {
                                    fileName: "[project]/components/Projects.js",
                                    lineNumber: 179,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "proj-row-cat-chip",
                                    children: proj.category
                                }, void 0, false, {
                                    fileName: "[project]/components/Projects.js",
                                    lineNumber: 181,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Projects.js",
                            lineNumber: 169,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Projects.js",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "proj-row-text-col",
                        ref: textRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "proj-row-meta",
                                "data-reveal": true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "proj-row-num",
                                        children: proj.num
                                    }, void 0, false, {
                                        fileName: "[project]/components/Projects.js",
                                        lineNumber: 188,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "proj-row-slash",
                                        children: "/"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Projects.js",
                                        lineNumber: 189,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "proj-row-cat-label",
                                        children: proj.category
                                    }, void 0, false, {
                                        fileName: "[project]/components/Projects.js",
                                        lineNumber: 190,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "proj-row-year",
                                        children: proj.year
                                    }, void 0, false, {
                                        fileName: "[project]/components/Projects.js",
                                        lineNumber: 191,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Projects.js",
                                lineNumber: 187,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                className: "proj-row-title",
                                "data-reveal": true,
                                children: proj.title
                            }, void 0, false, {
                                fileName: "[project]/components/Projects.js",
                                lineNumber: 194,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "proj-row-desc",
                                "data-reveal": true,
                                children: proj.desc
                            }, void 0, false, {
                                fileName: "[project]/components/Projects.js",
                                lineNumber: 196,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "proj-row-tags",
                                "data-reveal": true,
                                children: proj.tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "proj-row-tag",
                                        children: tag
                                    }, tag, false, {
                                        fileName: "[project]/components/Projects.js",
                                        lineNumber: 200,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/Projects.js",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "proj-row-cta",
                                "data-reveal": true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "proj-row-link-text",
                                        children: "View Project"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Projects.js",
                                        lineNumber: 205,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "proj-row-arrow",
                                        children: "↗"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Projects.js",
                                        lineNumber: 206,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Projects.js",
                                lineNumber: 204,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Projects.js",
                        lineNumber: 186,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Projects.js",
                lineNumber: 156,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
function Projects() {
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const headRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const counterRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const isInView = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__["useInView"])(sectionRef, {
        once: true,
        margin: '-60px'
    });
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const section = sectionRef.current;
        if (!section) return;
        const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].context(()=>{
            /* Section heading stagger */ if (headRef.current) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(headRef.current.querySelectorAll('[data-reveal]'), {
                    y: 40,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.85,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headRef.current,
                        start: 'top 82%',
                        once: true
                    }
                });
            }
            /* Counter count-up */ if (counterRef.current) {
                const obj = {
                    val: 0
                };
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(obj, {
                    val: PROJECTS.length,
                    duration: 1.5,
                    ease: 'power2.out',
                    onUpdate () {
                        if (counterRef.current) counterRef.current.textContent = String(Math.round(obj.val)).padStart(2, '0');
                    },
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 70%',
                        once: true
                    }
                });
            }
        }, section);
        return ()=>ctx.revert();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        id: "projects",
        className: "projects",
        ref: sectionRef,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "container-fluid px-3 px-md-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "section-head",
                    ref: headRef,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "section-tag",
                                    "data-reveal": true,
                                    children: "Selected Work"
                                }, void 0, false, {
                                    fileName: "[project]/components/Projects.js",
                                    lineNumber: 268,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    className: "section-title",
                                    "data-reveal": true,
                                    children: [
                                        "Featured Projects",
                                        ' '
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Projects.js",
                                    lineNumber: 269,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Projects.js",
                            lineNumber: 267,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "section-desc",
                            "data-reveal": true,
                            children: "A curated selection of projects that reflect how I design and build for the web."
                        }, void 0, false, {
                            fileName: "[project]/components/Projects.js",
                            lineNumber: 276,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Projects.js",
                    lineNumber: 266,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "proj-divider proj-divider--top"
                }, void 0, false, {
                    fileName: "[project]/components/Projects.js",
                    lineNumber: 282,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "proj-list",
                    children: [
                        PROJECTS.map((proj, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ProjectRow, {
                                proj: proj,
                                index: i
                            }, proj.num, false, {
                                fileName: "[project]/components/Projects.js",
                                lineNumber: 287,
                                columnNumber: 13
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "proj-divider proj-divider--bottom"
                        }, void 0, false, {
                            fileName: "[project]/components/Projects.js",
                            lineNumber: 290,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Projects.js",
                    lineNumber: 285,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$framer$2d$motion$29$__["motion"].div, {
                    className: "proj-cta-strip d-flex align-items-center justify-content-center gap-4 mt-5",
                    initial: {
                        opacity: 0,
                        y: 30
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: true,
                        margin: '-40px'
                    },
                    transition: {
                        duration: 0.7,
                        ease: 'easeOut'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "proj-cta-line"
                        }, void 0, false, {
                            fileName: "[project]/components/Projects.js",
                            lineNumber: 301,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                            href: "mailto:mallikachauhan2118@gmail.com",
                            className: "btn btn-primary",
                            children: [
                                "Start a Project ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "arrow-icon",
                                    children: "↗"
                                }, void 0, false, {
                                    fileName: "[project]/components/Projects.js",
                                    lineNumber: 303,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Projects.js",
                            lineNumber: 302,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            className: "proj-cta-line"
                        }, void 0, false, {
                            fileName: "[project]/components/Projects.js",
                            lineNumber: 305,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Projects.js",
                    lineNumber: 294,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Projects.js",
            lineNumber: 263,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Projects.js",
        lineNumber: 262,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/Contact.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Contact
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [ssr] (ecmascript)");
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
function Contact() {
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const contentRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const section = sectionRef.current;
        const canvas = canvasRef.current;
        if (!section || !canvas) return;
        const ctx = canvas.getContext('2d');
        let W = canvas.width = section.offsetWidth;
        let H = canvas.height = section.offsetHeight;
        // Mouse coordinates tracking
        const mouse = {
            x: -1000,
            y: -1000,
            radius: 180
        };
        const handleMouseMove = (e)=>{
            const rect = section.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        const handleMouseLeave = ()=>{
            mouse.x = -1000;
            mouse.y = -1000;
        };
        section.addEventListener('mousemove', handleMouseMove);
        section.addEventListener('mouseleave', handleMouseLeave);
        // Particle Configuration
        const PARTICLE_COUNT = 45;
        const MAX_DISTANCE = 140;
        const colors = [
            'rgba(168,85,247,',
            'rgba(6,182,212,',
            'rgba(249,115,22,'
        ];
        const particles = Array.from({
            length: PARTICLE_COUNT
        }, (_, i)=>({
                x: Math.random() * W,
                y: Math.random() * H,
                baseX: 0,
                baseY: 0,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
                size: 1.5 + Math.random() * 2.5,
                color: colors[i % colors.length],
                alpha: 0.2 + Math.random() * 0.5
            }));
        let raf;
        const draw = ()=>{
            raf = requestAnimationFrame(draw);
            ctx.clearRect(0, 0, W, H);
            // 1. Mouse Spotlight Ambient Glow
            if (mouse.x > 0 && mouse.y > 0) {
                const spotlight = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius * 1.5);
                spotlight.addColorStop(0, 'rgba(168,85,247,0.12)');
                spotlight.addColorStop(0.5, 'rgba(6,182,212,0.04)');
                spotlight.addColorStop(1, 'transparent');
                ctx.fillStyle = spotlight;
                ctx.fillRect(0, 0, W, H);
            }
            // 2. Update & Draw Particles
            particles.forEach((p, i)=>{
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
                    p.x -= dx / dist * force * 1.5;
                    p.y -= dy / dist * force * 1.5;
                }
                // Render Particle Dot
                ctx.fillStyle = `${p.color}${p.alpha})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                // 3. Draw Connecting Mesh Lines
                for(let j = i + 1; j < particles.length; j++){
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
        const onResize = ()=>{
            W = canvas.width = section.offsetWidth;
            H = canvas.height = section.offsetHeight;
        };
        window.addEventListener('resize', onResize);
        // ── GSAP CONTENT REVEAL ──
        const ctxAnimation = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].context(()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(contentRef.current, {
                opacity: 0,
                y: 60
            }, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    invalidateOnRefresh: true
                }
            });
        }, sectionRef);
        return ()=>{
            cancelAnimationFrame(raf);
            section.removeEventListener('mousemove', handleMouseMove);
            section.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', onResize);
            ctxAnimation.revert();
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
        className: "contact",
        id: "contact",
        ref: sectionRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("canvas", {
                className: "contact-bg-canvas",
                ref: canvasRef
            }, void 0, false, {
                fileName: "[project]/components/Contact.js",
                lineNumber: 158,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "contact-grid-bg"
            }, void 0, false, {
                fileName: "[project]/components/Contact.js",
                lineNumber: 159,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "orb orb-1"
            }, void 0, false, {
                fileName: "[project]/components/Contact.js",
                lineNumber: 162,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "orb orb-2"
            }, void 0, false, {
                fileName: "[project]/components/Contact.js",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "contact-content",
                ref: contentRef,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "section-tag",
                        children: "Get In Touch"
                    }, void 0, false, {
                        fileName: "[project]/components/Contact.js",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        className: "contact-title",
                        children: [
                            "Let's build",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/components/Contact.js",
                                lineNumber: 169,
                                columnNumber: 22
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "grad",
                                children: "something great."
                            }, void 0, false, {
                                fileName: "[project]/components/Contact.js",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Contact.js",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "contact-sub",
                        children: "Your next big idea deserves world-class creative execution. Let's talk and turn your vision into something extraordinary."
                    }, void 0, false, {
                        fileName: "[project]/components/Contact.js",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                        href: "mailto:mallikachauhan2118@gmail.com",
                        className: "contact-email",
                        children: "mallikachauhan2118@gmail.com"
                    }, void 0, false, {
                        fileName: "[project]/components/Contact.js",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "contact-info-grid",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "contact-block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                        children: "Phone"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Contact.js",
                                        lineNumber: 184,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "tel:+919687690985",
                                        children: "+91 96876 90985"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Contact.js",
                                        lineNumber: 185,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Contact.js",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "contact-block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                        children: "LinkedIn"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Contact.js",
                                        lineNumber: 188,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                        href: "https://www.linkedin.com/in/mallika-chauhan",
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        children: "mallika-chauhan"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Contact.js",
                                        lineNumber: 189,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Contact.js",
                                lineNumber: 187,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "contact-block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                        children: "Location"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Contact.js",
                                        lineNumber: 198,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        children: "India 🇮🇳"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Contact.js",
                                        lineNumber: 199,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Contact.js",
                                lineNumber: 197,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Contact.js",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Contact.js",
                lineNumber: 165,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Contact.js",
        lineNumber: 157,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/Footer.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
function Footer() {
    const year = new Date().getFullYear();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
        className: "d-flex align-items-center justify-content-center ",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "text-center",
            children: [
                "© ",
                year,
                " Mallika Chauhan. All rights reserved."
            ]
        }, void 0, true, {
            fileName: "[project]/components/Footer.js",
            lineNumber: 5,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Footer.js",
        lineNumber: 4,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/FloatingShapes.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FloatingShapes
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
function FloatingShapes() {
    const triangleRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const hexRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const ringRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const dotRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const crossRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        __turbopack_context__.A("[project]/node_modules/gsap/index.js [ssr] (ecmascript, async loader)").then(({ default: gsap })=>{
            __turbopack_context__.A("[project]/node_modules/gsap/ScrollTrigger.js [ssr] (ecmascript, async loader)").then(({ ScrollTrigger })=>{
                gsap.registerPlugin(ScrollTrigger);
                /* Idle float animations */ gsap.to(triangleRef.current, {
                    y: -22,
                    rotation: 18,
                    duration: 3.2,
                    yoyo: true,
                    repeat: -1,
                    ease: 'sine.inOut'
                });
                gsap.to(hexRef.current, {
                    y: 16,
                    rotation: -12,
                    duration: 4.1,
                    yoyo: true,
                    repeat: -1,
                    ease: 'sine.inOut',
                    delay: 1.2
                });
                gsap.to(ringRef.current, {
                    y: -14,
                    rotation: 25,
                    duration: 3.7,
                    yoyo: true,
                    repeat: -1,
                    ease: 'sine.inOut',
                    delay: 2.1
                });
                gsap.to(dotRef.current, {
                    y: 18,
                    rotation: -8,
                    duration: 2.9,
                    yoyo: true,
                    repeat: -1,
                    ease: 'sine.inOut',
                    delay: 0.7
                });
                gsap.to(crossRef.current, {
                    y: -10,
                    rotation: 45,
                    duration: 5.0,
                    yoyo: true,
                    repeat: -1,
                    ease: 'sine.inOut',
                    delay: 3.0
                });
                /* Scroll-driven cross-section movement */ // Triangle: hero → about → projects
                ScrollTrigger.create({
                    trigger: '#about',
                    start: 'top 60%',
                    onEnter: ()=>gsap.to(triangleRef.current, {
                            x: 'calc(75vw - 40px)',
                            y: 'calc(30vh)',
                            duration: 1.8,
                            ease: 'power2.inOut'
                        }),
                    onLeaveBack: ()=>gsap.to(triangleRef.current, {
                            x: 'calc(82vw - 40px)',
                            y: '8vh',
                            duration: 1.8,
                            ease: 'power2.inOut'
                        })
                });
                ScrollTrigger.create({
                    trigger: '#projects',
                    start: 'top 60%',
                    onEnter: ()=>gsap.to(triangleRef.current, {
                            x: '8vw',
                            y: 'calc(65vh)',
                            duration: 2.2,
                            ease: 'power2.inOut'
                        }),
                    onLeaveBack: ()=>gsap.to(triangleRef.current, {
                            x: 'calc(75vw - 40px)',
                            y: '30vh',
                            duration: 2.2,
                            ease: 'power2.inOut'
                        })
                });
                // Hex: hero → skills → process
                ScrollTrigger.create({
                    trigger: '#skills',
                    start: 'top 60%',
                    onEnter: ()=>gsap.to(hexRef.current, {
                            x: 'calc(88vw - 50px)',
                            y: '42vh',
                            duration: 1.9,
                            ease: 'power2.inOut'
                        }),
                    onLeaveBack: ()=>gsap.to(hexRef.current, {
                            x: '6vw',
                            y: '18vh',
                            duration: 1.9,
                            ease: 'power2.inOut'
                        })
                });
                ScrollTrigger.create({
                    trigger: '#process',
                    start: 'top 60%',
                    onEnter: ()=>gsap.to(hexRef.current, {
                            x: '4vw',
                            y: '70vh',
                            duration: 2.0,
                            ease: 'power2.inOut'
                        }),
                    onLeaveBack: ()=>gsap.to(hexRef.current, {
                            x: 'calc(88vw - 50px)',
                            y: '42vh',
                            duration: 2.0,
                            ease: 'power2.inOut'
                        })
                });
                // Ring: hero → services → contact
                ScrollTrigger.create({
                    trigger: '#services',
                    start: 'top 60%',
                    onEnter: ()=>gsap.to(ringRef.current, {
                            x: '12vw',
                            y: '55vh',
                            duration: 2.1,
                            ease: 'power2.inOut'
                        }),
                    onLeaveBack: ()=>gsap.to(ringRef.current, {
                            x: 'calc(90vw - 60px)',
                            y: '25vh',
                            duration: 2.1,
                            ease: 'power2.inOut'
                        })
                });
                ScrollTrigger.create({
                    trigger: '#contact',
                    start: 'top 60%',
                    onEnter: ()=>gsap.to(ringRef.current, {
                            x: 'calc(80vw - 60px)',
                            y: '75vh',
                            duration: 2.3,
                            ease: 'power2.inOut'
                        }),
                    onLeaveBack: ()=>gsap.to(ringRef.current, {
                            x: '12vw',
                            y: '55vh',
                            duration: 2.3,
                            ease: 'power2.inOut'
                        })
                });
            });
        });
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "floating-shapes",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                ref: triangleRef,
                className: "shape shape-triangle",
                style: {
                    position: 'absolute',
                    top: '8vh',
                    left: '82vw'
                }
            }, void 0, false, {
                fileName: "[project]/components/FloatingShapes.js",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                ref: hexRef,
                className: "shape shape-hex",
                style: {
                    position: 'absolute',
                    top: '18vh',
                    left: '6vw'
                }
            }, void 0, false, {
                fileName: "[project]/components/FloatingShapes.js",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                ref: ringRef,
                className: "shape shape-ring",
                style: {
                    position: 'absolute',
                    top: '25vh',
                    left: '90vw'
                }
            }, void 0, false, {
                fileName: "[project]/components/FloatingShapes.js",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                ref: dotRef,
                className: "shape shape-dot-cluster",
                style: {
                    position: 'absolute',
                    top: '55vh',
                    left: '3vw'
                }
            }, void 0, false, {
                fileName: "[project]/components/FloatingShapes.js",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                ref: crossRef,
                className: "shape shape-cross",
                style: {
                    position: 'absolute',
                    top: '70vh',
                    left: '92vw'
                }
            }, void 0, false, {
                fileName: "[project]/components/FloatingShapes.js",
                lineNumber: 96,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/FloatingShapes.js",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
}),
"[project]/pages/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Navbar$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Navbar.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Hero$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Hero.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$About$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/About.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skills$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Skills.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PixelFast$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/PixelFast.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Process$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Process.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Projects$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Projects.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Contact$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Contact.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Footer.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FloatingShapes$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/FloatingShapes.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Projects$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Projects$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
;
;
;
;
function Home() {
    const preloaderRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const barFillRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const cursorRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const cursorRingRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const progressBarRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        /* ── PRELOADER ── */ let progress = 0;
        const interval = setInterval(()=>{
            progress += Math.random() * 18;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(()=>{
                    const pl = preloaderRef.current;
                    if (!pl) return;
                    pl.style.opacity = '0';
                    pl.style.transform = 'scale(1.05)';
                    pl.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
                    setTimeout(()=>{
                        if (pl) pl.style.display = 'none';
                    }, 700);
                }, 300);
            }
            if (barFillRef.current) barFillRef.current.style.width = `${Math.min(progress, 100)}%`;
        }, 80);
        /* ── CURSOR ── */ const cursor = cursorRef.current;
        const ring = cursorRingRef.current;
        let curX = window.innerWidth / 2;
        let curY = window.innerHeight / 2;
        let ringX = curX;
        let ringY = curY;
        const onMove = (e)=>{
            curX = e.clientX;
            curY = e.clientY;
            if (cursor) {
                cursor.style.left = `${curX}px`;
                cursor.style.top = `${curY}px`;
            }
        };
        window.addEventListener('mousemove', onMove);
        let rafId;
        const lerpRing = ()=>{
            ringX += (curX - ringX) * 0.1;
            ringY += (curY - ringY) * 0.1;
            if (ring) {
                ring.style.left = `${ringX}px`;
                ring.style.top = `${ringY}px`;
            }
            rafId = requestAnimationFrame(lerpRing);
        };
        lerpRing();
        const addHoverListeners = ()=>{
            const els = document.querySelectorAll('a, button, .btn, .skill-card, .project-card, .pf-card');
            els.forEach((el)=>{
                el.addEventListener('mouseenter', ()=>{
                    if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
                    if (ring) {
                        ring.style.transform = 'translate(-50%,-50%) scale(1.8)';
                        ring.style.borderColor = 'var(--accent2)';
                    }
                });
                el.addEventListener('mouseleave', ()=>{
                    if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(1)';
                    if (ring) {
                        ring.style.transform = 'translate(-50%,-50%) scale(1)';
                        ring.style.borderColor = 'var(--accent1)';
                    }
                });
            });
        };
        setTimeout(addHoverListeners, 1500);
        /* ── SCROLL PROGRESS ── */ const onScroll = ()=>{
            const scrollTop = window.scrollY;
            const docH = document.body.scrollHeight - window.innerHeight;
            if (progressBarRef.current) progressBarRef.current.style.width = `${scrollTop / docH * 100}%`;
        };
        window.addEventListener('scroll', onScroll);
        return ()=>{
            clearInterval(interval);
            cancelAnimationFrame(rafId);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('scroll', onScroll);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "Mallika Chauhan — Full Stack Developer & UI/UX Craftsman"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Full-stack developer building scalable backend systems and pixel-perfect interfaces with React, Next.js, and Node.js."
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "keywords",
                        content: "Mallika Chauhan, Full Stack Developer, React, Next.js, UI/UX, Portfolio, India"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:title",
                        content: "Mallika Chauhan — Full Stack Developer"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:description",
                        content: "Building scalable systems and pixel-perfect interfaces."
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:type",
                        content: "website"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "preloader",
                ref: preloaderRef,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "preloader-inner",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                            children: "MALLIKA"
                        }, void 0, false, {
                            fileName: "[project]/pages/index.js",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "preloader-bar",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "preloader-bar-fill",
                                ref: barFillRef
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 119,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/index.js",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "preloader-sub",
                            children: "Loading experience..."
                        }, void 0, false, {
                            fileName: "[project]/pages/index.js",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/index.js",
                    lineNumber: 116,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grain-overlay"
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "cursor",
                ref: cursorRef
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "cursor-ring",
                ref: cursorRingRef
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "fixed-progress",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "fixed-progress-bar",
                    ref: progressBarRef
                }, void 0, false, {
                    fileName: "[project]/pages/index.js",
                    lineNumber: 130,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "site-wrapper",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FloatingShapes$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Navbar$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Hero$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$About$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skills$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PixelFast$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Process$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Projects$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Contact$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 134,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__05-142l._.js.map