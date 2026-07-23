module.exports = [
"[project]/components/ThreeBackground.js [ssr] (ecmascript, next/dynamic entry, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/[root-of-the-server]__20-8nw4._.js",
  "server/chunks/ssr/components_ThreeBackground_1e_a6y_.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/components/ThreeBackground.js [ssr] (ecmascript, next/dynamic entry)");
    });
});
}),
"[project]/node_modules/gsap/index.js [ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_gsap_1hvq0r7._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/node_modules/gsap/index.js [ssr] (ecmascript)");
    });
});
}),
"[project]/node_modules/gsap/ScrollTrigger.js [ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_gsap_1r2wm14._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/node_modules/gsap/ScrollTrigger.js [ssr] (ecmascript)");
    });
});
}),
];