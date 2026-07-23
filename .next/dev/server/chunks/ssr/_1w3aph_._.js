module.exports = [
"[project]/components/ThreeBackground.js [ssr] (ecmascript, next/dynamic entry, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/[root-of-the-server]__1f6i5zi._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/components/ThreeBackground.js [ssr] (ecmascript, next/dynamic entry)");
    });
});
}),
"[project]/node_modules/gsap/index.js [ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_gsap_index_0zauydz.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/node_modules/gsap/index.js [ssr] (ecmascript)");
    });
});
}),
"[project]/node_modules/gsap/ScrollTrigger.js [ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.resolve().then(() => {
        return parentImport("[project]/node_modules/gsap/ScrollTrigger.js [ssr] (ecmascript)");
    });
});
}),
];