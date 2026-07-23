(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime/runtime-types.d.ts" />
/// <reference path="../../../shared/runtime/dev-globals.d.ts" />
/// <reference path="../../../shared/runtime/dev-protocol.d.ts" />
/// <reference path="../../../shared/runtime/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateB.type === 'total') {
        // A total update replaces the entire chunk, so it supersedes any prior update.
        return updateB;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/components/Navbar.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
    _s();
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('home');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            const onScroll = {
                "Navbar.useEffect.onScroll": ()=>{
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
                }
            }["Navbar.useEffect.onScroll"];
            window.addEventListener('scroll', onScroll);
            return ({
                "Navbar.useEffect": ()=>window.removeEventListener('scroll', onScroll)
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: `navbar${scrolled ? ' scrolled' : ''}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "nav-logo",
                        children: [
                            "MC",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "nav-links",
                        children: NAV_ITEMS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "nav-right",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "https://www.linkedin.com/in/mallika-chauhan",
                                className: "nav-cta",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FaLinkedinIn"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `nav-toggle${menuOpen ? ' active' : ''}`,
                                onClick: ()=>setMenuOpen((o)=>!o),
                                "aria-label": "Toggle menu",
                                "aria-expanded": menuOpen,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                        fileName: "[project]/components/Navbar.js",
                                        lineNumber: 54,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                        fileName: "[project]/components/Navbar.js",
                                        lineNumber: 54,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mobile-overlay${menuOpen ? ' open' : ''}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mobile-menu",
                    children: [
                        NAV_ITEMS.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: `#${item.toLowerCase()}`,
                                className: "mobile-link",
                                onClick: ()=>setMenuOpen(false),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mobile-social",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "https://www.linkedin.com/in/mallika-chauhan",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    children: "LinkedIn ↗"
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.js",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
_s(Navbar, "byRSGZBcOV/9KRS+8xWeG9tJht8=");
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Hero.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Hero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dynamic.js [client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
;
;
const ThreeBackground = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/components/ThreeBackground.js [client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/components/ThreeBackground.js [client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = ThreeBackground;
const ROLES = [
    'Front-End Developer',
    'Full-Stack Engineer',
    'UI/UX Craftsman',
    'React Specialist'
];
function Hero() {
    _s();
    const tagRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const line0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const line1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const line2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const descRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ctaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Hero.useEffect": ()=>{
            // Dynamically import gsap only on client
            Promise.all([
                __turbopack_context__.A("[project]/node_modules/gsap/index.js [client] (ecmascript, async loader)"),
                __turbopack_context__.A("[project]/node_modules/gsap/ScrollTrigger.js [client] (ecmascript, async loader)")
            ]).then({
                "Hero.useEffect": ([{ default: gsap }, { ScrollTrigger }])=>{
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
                    const rotate = {
                        "Hero.useEffect.rotate": ()=>{
                            idx = (idx + 1) % ROLES.length;
                            gsap.to(roleEl, {
                                y: '-100%',
                                opacity: 0,
                                duration: 0.35,
                                ease: 'power2.in',
                                onComplete: {
                                    "Hero.useEffect.rotate": ()=>{
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
                                }["Hero.useEffect.rotate"]
                            });
                        }
                    }["Hero.useEffect.rotate"];
                    const iv = setInterval(rotate, 2800);
                    return ({
                        "Hero.useEffect": ()=>clearInterval(iv)
                    })["Hero.useEffect"];
                }
            }["Hero.useEffect"]);
        }
    }["Hero.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "hero",
        id: "home",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThreeBackground, {}, void 0, false, {
                fileName: "[project]/components/Hero.js",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hero-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hero-tag",
                        ref: tagRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "line",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "line",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "line",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "role-rotator",
                        ref: rotRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Currently working as"
                            }, void 0, false, {
                                fileName: "[project]/components/Hero.js",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "role-window",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "hero-desc",
                        ref: descRef,
                        children: "I'm Mallika Chauhan — I bridge the gap between robust architecture and refined design, building scalable backend systems and pixel-perfect interfaces with React, Next.js, and Node.js."
                    }, void 0, false, {
                        fileName: "[project]/components/Hero.js",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hero-cta",
                        ref: ctaRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#projects",
                                className: "btn btn-primary border-0",
                                children: [
                                    "View Work ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#contact",
                                className: "text-decoration-none  btnSecondary",
                                children: [
                                    "Get In Touch ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hero-scroll",
                ref: scrollRef,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_s(Hero, "lBra6NUjOerzz5TpWhXoySGNpGg=");
_c1 = Hero;
var _c, _c1;
__turbopack_context__.k.register(_c, "ThreeBackground");
__turbopack_context__.k.register(_c1, "Hero");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/About.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>About
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
    _s();
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const contentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lineRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const statRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "About.useEffect": ()=>{
            __turbopack_context__.A("[project]/node_modules/gsap/index.js [client] (ecmascript, async loader)").then({
                "About.useEffect": ({ default: gsap })=>{
                    __turbopack_context__.A("[project]/node_modules/gsap/ScrollTrigger.js [client] (ecmascript, async loader)").then({
                        "About.useEffect": ({ ScrollTrigger })=>{
                            gsap.registerPlugin(ScrollTrigger);
                            /* terminal typing */ const tl = gsap.timeline({
                                scrollTrigger: {
                                    trigger: sectionRef.current,
                                    start: 'top 70%'
                                }
                            });
                            lineRefs.current.forEach({
                                "About.useEffect": (el, i)=>{
                                    if (!el) return;
                                    const full = TERMINAL_LINES[i].text;
                                    tl.call({
                                        "About.useEffect": ()=>{
                                            let j = 0;
                                            const iv = setInterval({
                                                "About.useEffect.iv": ()=>{
                                                    el.textContent = full.slice(0, j++);
                                                    if (j > full.length) clearInterval(iv);
                                                }
                                            }["About.useEffect.iv"], 45);
                                        }
                                    }["About.useEffect"], [], i * 1.3);
                                }
                            }["About.useEffect"]);
                            /* stat counters */ statRefs.current.forEach({
                                "About.useEffect": (el)=>{
                                    if (!el) return;
                                    const target = parseInt(el.dataset.count, 10);
                                    const suffix = el.dataset.suffix || '+';
                                    ScrollTrigger.create({
                                        trigger: el,
                                        start: 'top 85%',
                                        once: true,
                                        onEnter: {
                                            "About.useEffect": ()=>{
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
                                        }["About.useEffect"]
                                    });
                                }
                            }["About.useEffect"]);
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
                        }
                    }["About.useEffect"]);
                }
            }["About.useEffect"]);
        }
    }["About.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "about",
        id: "about",
        ref: sectionRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "section-head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "section-tag",
                                children: "Get To Know Me"
                            }, void 0, false, {
                                fileName: "[project]/components/About.js",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "section-title",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "about-grid",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "about-visual-wrap",
                        ref: cardRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "corner-accent tl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/About.js",
                                        lineNumber: 82,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "corner-accent tr"
                                    }, void 0, false, {
                                        fileName: "[project]/components/About.js",
                                        lineNumber: 83,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "corner-accent bl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/About.js",
                                        lineNumber: 84,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "corner-accent br"
                                    }, void 0, false, {
                                        fileName: "[project]/components/About.js",
                                        lineNumber: 85,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "terminal-wrap",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "terminal",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "terminal-bar",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "terminal-dot red"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/About.js",
                                                            lineNumber: 90,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "terminal-dot yellow"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/About.js",
                                                            lineNumber: 91,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "terminal-dot green"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/About.js",
                                                            lineNumber: 92,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "terminal-body",
                                                    children: [
                                                        TERMINAL_LINES.map((l, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "terminal-row",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "terminal-prompt",
                                                                        children: "›"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/About.js",
                                                                        lineNumber: 98,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "badge badge-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "badge badge-2",
                                children: "⚛ React Specialist"
                            }, void 0, false, {
                                fileName: "[project]/components/About.js",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "about-content",
                        ref: contentRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "about-lead",
                                children: [
                                    "I'm a ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "about-para",
                                children: "I work primarily with React, Next.js, and NodeJS — comfortable across the stack when a project calls for it, and focused on motion and detail that make products feel alive."
                            }, void 0, false, {
                                fileName: "[project]/components/About.js",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                ].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat-box",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#contact",
                                className: "btn btn-primary",
                                children: [
                                    "Let's Talk ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_s(About, "fkVGrmBSdGdvkiRemh8WmLLdLUU=");
_c = About;
var _c;
__turbopack_context__.k.register(_c, "About");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Skills.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Skills
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
    _s();
    const gridRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Skills.useEffect": ()=>{
            __turbopack_context__.A("[project]/node_modules/gsap/index.js [client] (ecmascript, async loader)").then({
                "Skills.useEffect": ({ default: gsap })=>{
                    __turbopack_context__.A("[project]/node_modules/gsap/ScrollTrigger.js [client] (ecmascript, async loader)").then({
                        "Skills.useEffect": ({ ScrollTrigger })=>{
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
                        }
                    }["Skills.useEffect"]);
                }
            }["Skills.useEffect"]);
        }
    }["Skills.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "skills",
                className: "skills",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "section-head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "section-tag",
                                        children: "What I Work With"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Skills.js",
                                        lineNumber: 44,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "section-title",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "skills-marquee",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "marquee-track",
                            children: [
                                ...SKILLS,
                                ...SKILLS
                            ].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "skills-grid",
                        ref: gridRef,
                        children: SKILLS.map((skill, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "skill-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: skill.icon,
                                        alt: skill.name,
                                        width: 48,
                                        height: 48
                                    }, void 0, false, {
                                        fileName: "[project]/components/Skills.js",
                                        lineNumber: 61,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "marquee2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "marquee2-track",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                "CLEAN CODE ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                    fileName: "[project]/components/Skills.js",
                                    lineNumber: 70,
                                    columnNumber: 28
                                }, this),
                                " RESPONSIVE DESIGN ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                    fileName: "[project]/components/Skills.js",
                                    lineNumber: 70,
                                    columnNumber: 52
                                }, this),
                                " PIXEL PERFECT ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                    fileName: "[project]/components/Skills.js",
                                    lineNumber: 70,
                                    columnNumber: 72
                                }, this),
                                " USER FOCUSED ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                "CLEAN CODE ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                    fileName: "[project]/components/Skills.js",
                                    lineNumber: 71,
                                    columnNumber: 28
                                }, this),
                                " RESPONSIVE DESIGN ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                    fileName: "[project]/components/Skills.js",
                                    lineNumber: 71,
                                    columnNumber: 52
                                }, this),
                                " PIXEL PERFECT ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                    fileName: "[project]/components/Skills.js",
                                    lineNumber: 71,
                                    columnNumber: 72
                                }, this),
                                " USER FOCUSED ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
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
_s(Skills, "6IkscvtsCtgQtCC3YQqzNlV0IN8=");
_c = Skills;
var _c;
__turbopack_context__.k.register(_c, "Skills");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/PixelFast.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PixelFast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
    _s();
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cardsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PixelFast.useEffect": ()=>{
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
            const onMouseMove = {
                "PixelFast.useEffect.onMouseMove": (e)=>{
                    const rect = section.getBoundingClientRect();
                    const mx = e.clientX - rect.left;
                    const my = e.clientY - rect.top;
                    for(let i = 0; i < 5; i++)particles.push(new Particle(mx, my));
                }
            }["PixelFast.useEffect.onMouseMove"];
            section.addEventListener('mousemove', onMouseMove);
            let raf;
            const animate = {
                "PixelFast.useEffect.animate": ()=>{
                    raf = requestAnimationFrame(animate);
                    ctx.clearRect(0, 0, W, H);
                    for(let i = particles.length - 1; i >= 0; i--){
                        particles[i].update();
                        particles[i].draw();
                        if (particles[i].life <= 0) particles.splice(i, 1);
                    }
                }
            }["PixelFast.useEffect.animate"];
            animate();
            const onResize = {
                "PixelFast.useEffect.onResize": ()=>{
                    W = section.offsetWidth;
                    H = section.offsetHeight;
                    canvas.width = W;
                    canvas.height = H;
                }
            }["PixelFast.useEffect.onResize"];
            window.addEventListener('resize', onResize);
            /* ── GSAP CARD ANIMATIONS ── */ __turbopack_context__.A("[project]/node_modules/gsap/index.js [client] (ecmascript, async loader)").then({
                "PixelFast.useEffect": ({ default: gsap })=>{
                    __turbopack_context__.A("[project]/node_modules/gsap/ScrollTrigger.js [client] (ecmascript, async loader)").then({
                        "PixelFast.useEffect": ({ ScrollTrigger })=>{
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
                        }
                    }["PixelFast.useEffect"]);
                }
            }["PixelFast.useEffect"]);
            return ({
                "PixelFast.useEffect": ()=>{
                    cancelAnimationFrame(raf);
                    section.removeEventListener('mousemove', onMouseMove);
                    window.removeEventListener('resize', onResize);
                }
            })["PixelFast.useEffect"];
        }
    }["PixelFast.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "pixel-fast",
        id: "services",
        ref: sectionRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                className: "pixel-fast-canvas",
                ref: canvasRef
            }, void 0, false, {
                fileName: "[project]/components/PixelFast.js",
                lineNumber: 135,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pixel-fast-grid"
            }, void 0, false, {
                fileName: "[project]/components/PixelFast.js",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pixel-fast-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "section-head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "section-tag",
                                        children: "Why Work With Me"
                                    }, void 0, false, {
                                        fileName: "[project]/components/PixelFast.js",
                                        lineNumber: 141,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "section-title",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Pixel Fast."
                                            }, void 0, false, {
                                                fileName: "[project]/components/PixelFast.js",
                                                lineNumber: 143,
                                                columnNumber: 15
                                            }, this),
                                            ' ',
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pixel-fast-cards",
                        children: FEATURES.map((feat, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pf-card",
                                ref: (el)=>cardsRef.current[i] = el,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pf-card-icon",
                                        children: feat.icon
                                    }, void 0, false, {
                                        fileName: "[project]/components/PixelFast.js",
                                        lineNumber: 155,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: feat.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/PixelFast.js",
                                        lineNumber: 156,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
_s(PixelFast, "J13NCQp7NJbozZmhHdId1PJySPs=");
_c = PixelFast;
var _c;
__turbopack_context__.k.register(_c, "PixelFast");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Process.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Process
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
    _s();
    const stepRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Process.useEffect": ()=>{
            __turbopack_context__.A("[project]/node_modules/gsap/index.js [client] (ecmascript, async loader)").then({
                "Process.useEffect": ({ default: gsap })=>{
                    __turbopack_context__.A("[project]/node_modules/gsap/ScrollTrigger.js [client] (ecmascript, async loader)").then({
                        "Process.useEffect": ({ ScrollTrigger })=>{
                            gsap.registerPlugin(ScrollTrigger);
                            stepRefs.current.forEach({
                                "Process.useEffect": (el, i)=>{
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
                                }
                            }["Process.useEffect"]);
                        }
                    }["Process.useEffect"]);
                }
            }["Process.useEffect"]);
        }
    }["Process.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "process",
        className: "process",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "section-head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "section-tag",
                                children: "How I Work"
                            }, void 0, false, {
                                fileName: "[project]/components/Process.js",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "section-title",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "process-steps",
                children: STEPS.map((step, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "process-step",
                        ref: (el)=>stepRefs.current[i] = el,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "step-num",
                                children: step.num
                            }, void 0, false, {
                                fileName: "[project]/components/Process.js",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "step-content",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: step.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/Process.js",
                                        lineNumber: 65,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
_s(Process, "tb4g5P4UgZJQ6wtreolfN/CDrXw=");
_c = Process;
var _c;
__turbopack_context__.k.register(_c, "Process");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Projects.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Projects
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
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
    _s();
    const rowRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const imgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lineRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const numBgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isEven = index % 2 === 0;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectRow.useEffect": ()=>{
            const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].context({
                "ProjectRow.useEffect.ctx": ()=>{
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
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(line, {
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
                    /* ── Image: clip-path wipe from the "outside" ── */ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(img, {
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
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(numBg, {
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
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(textEls, {
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
                }
            }["ProjectRow.useEffect.ctx"], rowRef);
            return ({
                "ProjectRow.useEffect": ()=>ctx.revert()
            })["ProjectRow.useEffect"];
        }
    }["ProjectRow.useEffect"], [
        isEven
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "proj-divider",
                ref: lineRef
            }, void 0, false, {
                fileName: "[project]/components/Projects.js",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                ref: rowRef,
                href: proj.link,
                target: "_blank",
                rel: "noopener noreferrer",
                className: `proj-row${isEven ? '' : ' proj-row--rev'}`,
                style: {
                    '--acc': proj.accent
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "proj-row-bg-num",
                        ref: numBgRef,
                        children: proj.num
                    }, void 0, false, {
                        fileName: "[project]/components/Projects.js",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "proj-row-img-col",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: imgRef,
                            className: "proj-row-img-frame",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "proj-row-img-border"
                                }, void 0, false, {
                                    fileName: "[project]/components/Projects.js",
                                    lineNumber: 179,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "proj-row-text-col",
                        ref: textRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "proj-row-meta",
                                "data-reveal": true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "proj-row-num",
                                        children: proj.num
                                    }, void 0, false, {
                                        fileName: "[project]/components/Projects.js",
                                        lineNumber: 188,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "proj-row-slash",
                                        children: "/"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Projects.js",
                                        lineNumber: 189,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "proj-row-cat-label",
                                        children: proj.category
                                    }, void 0, false, {
                                        fileName: "[project]/components/Projects.js",
                                        lineNumber: 190,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "proj-row-title",
                                "data-reveal": true,
                                children: proj.title
                            }, void 0, false, {
                                fileName: "[project]/components/Projects.js",
                                lineNumber: 194,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "proj-row-desc",
                                "data-reveal": true,
                                children: proj.desc
                            }, void 0, false, {
                                fileName: "[project]/components/Projects.js",
                                lineNumber: 196,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "proj-row-tags",
                                "data-reveal": true,
                                children: proj.tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "proj-row-cta",
                                "data-reveal": true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "proj-row-link-text",
                                        children: "View Project"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Projects.js",
                                        lineNumber: 205,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_s(ProjectRow, "3giroiFfio9hzaFLQ/PUfg5bIZg=");
_c = ProjectRow;
function Projects() {
    _s1();
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const headRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const counterRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useInView"])(sectionRef, {
        once: true,
        margin: '-60px'
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Projects.useEffect": ()=>{
            const section = sectionRef.current;
            if (!section) return;
            const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].context({
                "Projects.useEffect.ctx": ()=>{
                    /* Section heading stagger */ if (headRef.current) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(headRef.current.querySelectorAll('[data-reveal]'), {
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
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(obj, {
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
                }
            }["Projects.useEffect.ctx"], section);
            return ({
                "Projects.useEffect": ()=>ctx.revert()
            })["Projects.useEffect"];
        }
    }["Projects.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "projects",
        className: "projects",
        ref: sectionRef,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container-fluid px-3 px-md-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "section-head",
                    ref: headRef,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "section-tag",
                                    "data-reveal": true,
                                    children: "Selected Work"
                                }, void 0, false, {
                                    fileName: "[project]/components/Projects.js",
                                    lineNumber: 268,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "proj-divider proj-divider--top"
                }, void 0, false, {
                    fileName: "[project]/components/Projects.js",
                    lineNumber: 282,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "proj-list",
                    children: [
                        PROJECTS.map((proj, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProjectRow, {
                                proj: proj,
                                index: i
                            }, proj.num, false, {
                                fileName: "[project]/components/Projects.js",
                                lineNumber: 287,
                                columnNumber: 13
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "proj-cta-line"
                        }, void 0, false, {
                            fileName: "[project]/components/Projects.js",
                            lineNumber: 301,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "mailto:mallikachauhan2118@gmail.com",
                            className: "btn btn-primary",
                            children: [
                                "Start a Project ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_s1(Projects, "HeTaG7fe+gm9qGab6hu5vtuHzxM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c1 = Projects;
var _c, _c1;
__turbopack_context__.k.register(_c, "ProjectRow");
__turbopack_context__.k.register(_c1, "Projects");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Contact.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Contact
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
function Contact() {
    _s();
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const contentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Contact.useEffect": ()=>{
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
            const handleMouseMove = {
                "Contact.useEffect.handleMouseMove": (e)=>{
                    const rect = section.getBoundingClientRect();
                    mouse.x = e.clientX - rect.left;
                    mouse.y = e.clientY - rect.top;
                }
            }["Contact.useEffect.handleMouseMove"];
            const handleMouseLeave = {
                "Contact.useEffect.handleMouseLeave": ()=>{
                    mouse.x = -1000;
                    mouse.y = -1000;
                }
            }["Contact.useEffect.handleMouseLeave"];
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
            }, {
                "Contact.useEffect.particles": (_, i)=>({
                        x: Math.random() * W,
                        y: Math.random() * H,
                        baseX: 0,
                        baseY: 0,
                        vx: (Math.random() - 0.5) * 0.6,
                        vy: (Math.random() - 0.5) * 0.6,
                        size: 1.5 + Math.random() * 2.5,
                        color: colors[i % colors.length],
                        alpha: 0.2 + Math.random() * 0.5
                    })
            }["Contact.useEffect.particles"]);
            let raf;
            const draw = {
                "Contact.useEffect.draw": ()=>{
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
                    particles.forEach({
                        "Contact.useEffect.draw": (p, i)=>{
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
                        }
                    }["Contact.useEffect.draw"]);
                }
            }["Contact.useEffect.draw"];
            draw();
            // Handle Window Resize
            const onResize = {
                "Contact.useEffect.onResize": ()=>{
                    W = canvas.width = section.offsetWidth;
                    H = canvas.height = section.offsetHeight;
                }
            }["Contact.useEffect.onResize"];
            window.addEventListener('resize', onResize);
            // ── GSAP CONTENT REVEAL ──
            const ctxAnimation = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].context({
                "Contact.useEffect.ctxAnimation": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].fromTo(contentRef.current, {
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
                }
            }["Contact.useEffect.ctxAnimation"], sectionRef);
            return ({
                "Contact.useEffect": ()=>{
                    cancelAnimationFrame(raf);
                    section.removeEventListener('mousemove', handleMouseMove);
                    section.removeEventListener('mouseleave', handleMouseLeave);
                    window.removeEventListener('resize', onResize);
                    ctxAnimation.revert();
                }
            })["Contact.useEffect"];
        }
    }["Contact.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "contact",
        id: "contact",
        ref: sectionRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                className: "contact-bg-canvas",
                ref: canvasRef
            }, void 0, false, {
                fileName: "[project]/components/Contact.js",
                lineNumber: 158,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "contact-grid-bg"
            }, void 0, false, {
                fileName: "[project]/components/Contact.js",
                lineNumber: 159,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "orb orb-1"
            }, void 0, false, {
                fileName: "[project]/components/Contact.js",
                lineNumber: 162,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "orb orb-2"
            }, void 0, false, {
                fileName: "[project]/components/Contact.js",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "contact-content",
                ref: contentRef,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "section-tag",
                        children: "Get In Touch"
                    }, void 0, false, {
                        fileName: "[project]/components/Contact.js",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "contact-title",
                        children: [
                            "Let's build",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/components/Contact.js",
                                lineNumber: 169,
                                columnNumber: 22
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "contact-sub",
                        children: "Your next big idea deserves world-class creative execution. Let's talk and turn your vision into something extraordinary."
                    }, void 0, false, {
                        fileName: "[project]/components/Contact.js",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "mailto:mallikachauhan2118@gmail.com",
                        className: "contact-email",
                        children: "mallikachauhan2118@gmail.com"
                    }, void 0, false, {
                        fileName: "[project]/components/Contact.js",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "contact-info-grid",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "contact-block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        children: "Phone"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Contact.js",
                                        lineNumber: 184,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "contact-block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        children: "LinkedIn"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Contact.js",
                                        lineNumber: 188,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "contact-block",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        children: "Location"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Contact.js",
                                        lineNumber: 198,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_s(Contact, "xPm+lMGpEB8DkF642SaDYWV2tPg=");
_c = Contact;
var _c;
__turbopack_context__.k.register(_c, "Contact");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Footer.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
function Footer() {
    const year = new Date().getFullYear();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "d-flex align-items-center justify-content-center ",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/FloatingShapes.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FloatingShapes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
function FloatingShapes() {
    _s();
    const triangleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hexRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ringRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const crossRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FloatingShapes.useEffect": ()=>{
            __turbopack_context__.A("[project]/node_modules/gsap/index.js [client] (ecmascript, async loader)").then({
                "FloatingShapes.useEffect": ({ default: gsap })=>{
                    __turbopack_context__.A("[project]/node_modules/gsap/ScrollTrigger.js [client] (ecmascript, async loader)").then({
                        "FloatingShapes.useEffect": ({ ScrollTrigger })=>{
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
                                onEnter: {
                                    "FloatingShapes.useEffect": ()=>gsap.to(triangleRef.current, {
                                            x: 'calc(75vw - 40px)',
                                            y: 'calc(30vh)',
                                            duration: 1.8,
                                            ease: 'power2.inOut'
                                        })
                                }["FloatingShapes.useEffect"],
                                onLeaveBack: {
                                    "FloatingShapes.useEffect": ()=>gsap.to(triangleRef.current, {
                                            x: 'calc(82vw - 40px)',
                                            y: '8vh',
                                            duration: 1.8,
                                            ease: 'power2.inOut'
                                        })
                                }["FloatingShapes.useEffect"]
                            });
                            ScrollTrigger.create({
                                trigger: '#projects',
                                start: 'top 60%',
                                onEnter: {
                                    "FloatingShapes.useEffect": ()=>gsap.to(triangleRef.current, {
                                            x: '8vw',
                                            y: 'calc(65vh)',
                                            duration: 2.2,
                                            ease: 'power2.inOut'
                                        })
                                }["FloatingShapes.useEffect"],
                                onLeaveBack: {
                                    "FloatingShapes.useEffect": ()=>gsap.to(triangleRef.current, {
                                            x: 'calc(75vw - 40px)',
                                            y: '30vh',
                                            duration: 2.2,
                                            ease: 'power2.inOut'
                                        })
                                }["FloatingShapes.useEffect"]
                            });
                            // Hex: hero → skills → process
                            ScrollTrigger.create({
                                trigger: '#skills',
                                start: 'top 60%',
                                onEnter: {
                                    "FloatingShapes.useEffect": ()=>gsap.to(hexRef.current, {
                                            x: 'calc(88vw - 50px)',
                                            y: '42vh',
                                            duration: 1.9,
                                            ease: 'power2.inOut'
                                        })
                                }["FloatingShapes.useEffect"],
                                onLeaveBack: {
                                    "FloatingShapes.useEffect": ()=>gsap.to(hexRef.current, {
                                            x: '6vw',
                                            y: '18vh',
                                            duration: 1.9,
                                            ease: 'power2.inOut'
                                        })
                                }["FloatingShapes.useEffect"]
                            });
                            ScrollTrigger.create({
                                trigger: '#process',
                                start: 'top 60%',
                                onEnter: {
                                    "FloatingShapes.useEffect": ()=>gsap.to(hexRef.current, {
                                            x: '4vw',
                                            y: '70vh',
                                            duration: 2.0,
                                            ease: 'power2.inOut'
                                        })
                                }["FloatingShapes.useEffect"],
                                onLeaveBack: {
                                    "FloatingShapes.useEffect": ()=>gsap.to(hexRef.current, {
                                            x: 'calc(88vw - 50px)',
                                            y: '42vh',
                                            duration: 2.0,
                                            ease: 'power2.inOut'
                                        })
                                }["FloatingShapes.useEffect"]
                            });
                            // Ring: hero → services → contact
                            ScrollTrigger.create({
                                trigger: '#services',
                                start: 'top 60%',
                                onEnter: {
                                    "FloatingShapes.useEffect": ()=>gsap.to(ringRef.current, {
                                            x: '12vw',
                                            y: '55vh',
                                            duration: 2.1,
                                            ease: 'power2.inOut'
                                        })
                                }["FloatingShapes.useEffect"],
                                onLeaveBack: {
                                    "FloatingShapes.useEffect": ()=>gsap.to(ringRef.current, {
                                            x: 'calc(90vw - 60px)',
                                            y: '25vh',
                                            duration: 2.1,
                                            ease: 'power2.inOut'
                                        })
                                }["FloatingShapes.useEffect"]
                            });
                            ScrollTrigger.create({
                                trigger: '#contact',
                                start: 'top 60%',
                                onEnter: {
                                    "FloatingShapes.useEffect": ()=>gsap.to(ringRef.current, {
                                            x: 'calc(80vw - 60px)',
                                            y: '75vh',
                                            duration: 2.3,
                                            ease: 'power2.inOut'
                                        })
                                }["FloatingShapes.useEffect"],
                                onLeaveBack: {
                                    "FloatingShapes.useEffect": ()=>gsap.to(ringRef.current, {
                                            x: '12vw',
                                            y: '55vh',
                                            duration: 2.3,
                                            ease: 'power2.inOut'
                                        })
                                }["FloatingShapes.useEffect"]
                            });
                        }
                    }["FloatingShapes.useEffect"]);
                }
            }["FloatingShapes.useEffect"]);
        }
    }["FloatingShapes.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "floating-shapes",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_s(FloatingShapes, "TgaCcjceejL7VOXiPs0RIdO5lvM=");
_c = FloatingShapes;
var _c;
__turbopack_context__.k.register(_c, "FloatingShapes");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/index.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Navbar$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Navbar.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Hero$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Hero.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$About$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/About.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skills$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Skills.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PixelFast$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/PixelFast.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Projects$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Projects.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Contact$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Contact.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Footer.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FloatingShapes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/FloatingShapes.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
    _s();
    const preloaderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const barFillRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cursorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cursorRingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const progressBarRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            /* ── PRELOADER ── */ let progress = 0;
            const interval = setInterval({
                "Home.useEffect.interval": ()=>{
                    progress += Math.random() * 18;
                    if (progress >= 100) {
                        progress = 100;
                        clearInterval(interval);
                        setTimeout({
                            "Home.useEffect.interval": ()=>{
                                const pl = preloaderRef.current;
                                if (!pl) return;
                                pl.style.opacity = '0';
                                pl.style.transform = 'scale(1.05)';
                                pl.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
                                setTimeout({
                                    "Home.useEffect.interval": ()=>{
                                        if (pl) pl.style.display = 'none';
                                    }
                                }["Home.useEffect.interval"], 700);
                            }
                        }["Home.useEffect.interval"], 300);
                    }
                    if (barFillRef.current) barFillRef.current.style.width = `${Math.min(progress, 100)}%`;
                }
            }["Home.useEffect.interval"], 80);
            /* ── CURSOR ── */ const cursor = cursorRef.current;
            const ring = cursorRingRef.current;
            let curX = window.innerWidth / 2;
            let curY = window.innerHeight / 2;
            let ringX = curX;
            let ringY = curY;
            const onMove = {
                "Home.useEffect.onMove": (e)=>{
                    curX = e.clientX;
                    curY = e.clientY;
                    if (cursor) {
                        cursor.style.left = `${curX}px`;
                        cursor.style.top = `${curY}px`;
                    }
                }
            }["Home.useEffect.onMove"];
            window.addEventListener('mousemove', onMove);
            let rafId;
            const lerpRing = {
                "Home.useEffect.lerpRing": ()=>{
                    ringX += (curX - ringX) * 0.1;
                    ringY += (curY - ringY) * 0.1;
                    if (ring) {
                        ring.style.left = `${ringX}px`;
                        ring.style.top = `${ringY}px`;
                    }
                    rafId = requestAnimationFrame(lerpRing);
                }
            }["Home.useEffect.lerpRing"];
            lerpRing();
            const addHoverListeners = {
                "Home.useEffect.addHoverListeners": ()=>{
                    const els = document.querySelectorAll('a, button, .btn, .skill-card, .project-card, .pf-card');
                    els.forEach({
                        "Home.useEffect.addHoverListeners": (el)=>{
                            el.addEventListener('mouseenter', {
                                "Home.useEffect.addHoverListeners": ()=>{
                                    if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
                                    if (ring) {
                                        ring.style.transform = 'translate(-50%,-50%) scale(1.8)';
                                        ring.style.borderColor = 'var(--accent2)';
                                    }
                                }
                            }["Home.useEffect.addHoverListeners"]);
                            el.addEventListener('mouseleave', {
                                "Home.useEffect.addHoverListeners": ()=>{
                                    if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(1)';
                                    if (ring) {
                                        ring.style.transform = 'translate(-50%,-50%) scale(1)';
                                        ring.style.borderColor = 'var(--accent1)';
                                    }
                                }
                            }["Home.useEffect.addHoverListeners"]);
                        }
                    }["Home.useEffect.addHoverListeners"]);
                }
            }["Home.useEffect.addHoverListeners"];
            setTimeout(addHoverListeners, 1500);
            /* ── SCROLL PROGRESS ── */ const onScroll = {
                "Home.useEffect.onScroll": ()=>{
                    const scrollTop = window.scrollY;
                    const docH = document.body.scrollHeight - window.innerHeight;
                    if (progressBarRef.current) progressBarRef.current.style.width = `${scrollTop / docH * 100}%`;
                }
            }["Home.useEffect.onScroll"];
            window.addEventListener('scroll', onScroll);
            return ({
                "Home.useEffect": ()=>{
                    clearInterval(interval);
                    cancelAnimationFrame(rafId);
                    window.removeEventListener('mousemove', onMove);
                    window.removeEventListener('scroll', onScroll);
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        children: "Mallika Chauhan — Full Stack Developer & UI/UX Craftsman"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Full-stack developer building scalable backend systems and pixel-perfect interfaces with React, Next.js, and Node.js."
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "keywords",
                        content: "Mallika Chauhan, Full Stack Developer, React, Next.js, UI/UX, Portfolio, India"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:title",
                        content: "Mallika Chauhan — Full Stack Developer"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:description",
                        content: "Building scalable systems and pixel-perfect interfaces."
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "preloader",
                ref: preloaderRef,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "preloader-inner",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            children: "MALLIKA"
                        }, void 0, false, {
                            fileName: "[project]/pages/index.js",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "preloader-bar",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grain-overlay"
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cursor",
                ref: cursorRef
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cursor-ring",
                ref: cursorRingRef
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed-progress",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "site-wrapper",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FloatingShapes$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Navbar$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Hero$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$About$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Skills$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PixelFast$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Projects$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Contact$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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
_s(Home, "y8Aul1gjDLB4TznONu3FcPr3Lj0=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/index.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if ("TURBOPACK compile-time truthy", 1) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/index\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__1k9t0_q._.js.map