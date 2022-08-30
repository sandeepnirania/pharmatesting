/*
Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license/
*/
(function () {
    if (!window.CKEDITOR || !window.CKEDITOR.dom) {
        window.CKEDITOR || (window.CKEDITOR = function () {
            var a = /(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i, h = {
                timestamp: "M199", version: "4.17.2 (Full)", revision: "cb93181c83", rnd: Math.floor(900 * Math.random()) + 100, _: { pending: [], basePathSrcPattern: a }, status: "unloaded", basePath: function () {
                    var b = window.CKEDITOR_BASEPATH || ""; if (!b) for (var f = document.getElementsByTagName("script"), k = 0; k < f.length; k++) { var m = f[k].src.match(a); if (m) { b = m[1]; break } } -1 == b.indexOf(":/") &&
                        "//" != b.slice(0, 2) && (b = 0 === b.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] + b : location.href.match(/^[^\?]*\/(?:)/)[0] + b); if (!b) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.'; return b
                }(), getUrl: function (a) { -1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a); return a = this.appendTimestamp(a) }, appendTimestamp: function (a) {
                    if (!this.timestamp || "/" === a.charAt(a.length - 1) || /[&?]t=/.test(a)) return a;
                    var b = 0 <= a.indexOf("?") ? "\x26" : "?"; return a + b + "t\x3d" + this.timestamp
                }, domReady: function () {
                    function a() { try { document.addEventListener ? (document.removeEventListener("DOMContentLoaded", a, !1), window.removeEventListener("load", a, !1), b()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a), window.detachEvent("onload", a), b()) } catch (m) { } } function b() { for (var a; a = k.shift();)a() } var k = []; return function (b) {
                        function g() {
                            try { document.documentElement.doScroll("left") } catch (c) {
                                setTimeout(g,
                                    1); return
                            } a()
                        } k.push(b); "complete" === document.readyState && setTimeout(a, 1); if (1 == k.length) if (document.addEventListener) document.addEventListener("DOMContentLoaded", a, !1), window.addEventListener("load", a, !1); else if (document.attachEvent) { document.attachEvent("onreadystatechange", a); window.attachEvent("onload", a); b = !1; try { b = !window.frameElement } catch (e) { } document.documentElement.doScroll && b && g() }
                    }
                }()
            }, f = window.CKEDITOR_GETURL; if (f) { var b = h.getUrl; h.getUrl = function (a) { return f.call(h, a) || b.call(h, a) } } return h
        }());
        (function () {
            var a = {}; CKEDITOR.event || (CKEDITOR.event = function () { }, CKEDITOR.event.implementOn = function (a) { var f = CKEDITOR.event.prototype, b; for (b in f) null == a[b] && (a[b] = f[b]) }, CKEDITOR.event.prototype = function () {
                function h(a) { var l = f(this); return l[a] || (l[a] = new b(a)) } var f = function (a) { a = a.getPrivate && a.getPrivate() || a._ || (a._ = {}); return a.events || (a.events = {}) }, b = function (a) { this.name = a; this.listeners = [] }; b.prototype = {
                    getListenerIndex: function (a) {
                        for (var b = 0, k = this.listeners; b < k.length; b++)if (k[b].fn ==
                            a) return b; return -1
                    }
                }; return {
                    define: function (a, b) { var k = h.call(this, a); CKEDITOR.tools.extend(k, b, !0) }, on: function (b, f, k, m, g) {
                        function e(n, g, e, u) { n = { name: b, sender: this, editor: n, data: g, listenerData: m, stop: e, cancel: u, removeListener: c }; return !1 === f.call(k, n) ? a : n.data } function c() { n.removeListener(b, f) } var n = this, u = h.call(this, b); if (0 > u.getListenerIndex(f)) {
                            u = u.listeners; k || (k = this); isNaN(g) && (g = 10); e.fn = f; e.priority = g; for (var w = u.length - 1; 0 <= w; w--)if (u[w].priority <= g) return u.splice(w + 1, 0, e), { removeListener: c };
                            u.unshift(e)
                        } return { removeListener: c }
                    }, once: function () { var a = Array.prototype.slice.call(arguments), b = a[1]; a[1] = function (a) { a.removeListener(); return b.apply(this, arguments) }; return this.on.apply(this, a) }, capture: function () { CKEDITOR.event.useCapture = 1; var a = this.on.apply(this, arguments); CKEDITOR.event.useCapture = 0; return a }, fire: function () {
                        var b = 0, l = function () { b = 1 }, k = 0, m = function () { k = 1 }; return function (g, e, c) {
                            var n = f(this)[g]; g = b; var u = k; b = k = 0; if (n) {
                                var h = n.listeners; if (h.length) for (var h = h.slice(0),
                                    p, q = 0; q < h.length; q++) { if (n.errorProof) try { p = h[q].call(this, c, e, l, m) } catch (r) { } else p = h[q].call(this, c, e, l, m); p === a ? k = 1 : "undefined" != typeof p && (e = p); if (b || k) break }
                            } e = k ? !1 : "undefined" == typeof e ? !0 : e; b = g; k = u; return e
                        }
                    }(), fireOnce: function (a, b, k) { b = this.fire(a, b, k); delete f(this)[a]; return b }, removeListener: function (a, b) { var k = f(this)[a]; if (k) { var m = k.getListenerIndex(b); 0 <= m && k.listeners.splice(m, 1) } }, removeAllListeners: function () { var a = f(this), b; for (b in a) delete a[b] }, hasListeners: function (a) {
                        return (a =
                            f(this)[a]) && 0 < a.listeners.length
                    }
                }
            }())
        })(); CKEDITOR.editor || (CKEDITOR.editor = function () { CKEDITOR._.pending.push([this, arguments]); CKEDITOR.event.call(this) }, CKEDITOR.editor.prototype.fire = function (a, h) { a in { instanceReady: 1, loaded: 1 } && (this[a] = !0); return CKEDITOR.event.prototype.fire.call(this, a, h, this) }, CKEDITOR.editor.prototype.fireOnce = function (a, h) { a in { instanceReady: 1, loaded: 1 } && (this[a] = !0); return CKEDITOR.event.prototype.fireOnce.call(this, a, h, this) }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype));
        CKEDITOR.env || (CKEDITOR.env = function () {
            var a = navigator.userAgent.toLowerCase(), h = a.match(/edge[ \/](\d+.?\d*)/), f = -1 < a.indexOf("trident/"), f = !(!h && !f), f = {
                ie: f, edge: !!h, webkit: !f && -1 < a.indexOf(" applewebkit/"), air: -1 < a.indexOf(" adobeair/"), mac: -1 < a.indexOf("macintosh"), quirks: "BackCompat" == document.compatMode && (!document.documentMode || 10 > document.documentMode), mobile: -1 < a.indexOf("mobile"), iOS: /(ipad|iphone|ipod)/.test(a), isCustomDomain: function () {
                    if (!this.ie) return !1; var a = document.domain, b = window.location.hostname;
                    return a != b && a != "[" + b + "]"
                }, secure: "https:" == location.protocol
            }; f.gecko = "Gecko" == navigator.product && !f.webkit && !f.ie; f.webkit && (-1 < a.indexOf("chrome") ? f.chrome = !0 : f.safari = !0); var b = 0; f.ie && (b = h ? parseFloat(h[1]) : f.quirks || !document.documentMode ? parseFloat(a.match(/msie (\d+)/)[1]) : document.documentMode, f.ie9Compat = 9 == b, f.ie8Compat = 8 == b, f.ie7Compat = 7 == b, f.ie6Compat = 7 > b || f.quirks); f.gecko && (h = a.match(/rv:([\d\.]+)/)) && (h = h[1].split("."), b = 1E4 * h[0] + 100 * (h[1] || 0) + 1 * (h[2] || 0)); f.air && (b = parseFloat(a.match(/ adobeair\/(\d+)/)[1]));
            f.webkit && (b = parseFloat(a.match(/ applewebkit\/(\d+)/)[1])); f.version = b; f.isCompatible = !(f.ie && 7 > b) && !(f.gecko && 4E4 > b) && !(f.webkit && 534 > b); f.hidpi = 2 <= window.devicePixelRatio; f.needsBrFiller = f.gecko || f.webkit || f.ie && 10 < b; f.needsNbspFiller = f.ie && 11 > b; f.cssClass = "cke_browser_" + (f.ie ? "ie" : f.gecko ? "gecko" : f.webkit ? "webkit" : "unknown"); f.quirks && (f.cssClass += " cke_browser_quirks"); f.ie && (f.cssClass += " cke_browser_ie" + (f.quirks ? "6 cke_browser_iequirks" : f.version)); f.air && (f.cssClass += " cke_browser_air");
            f.iOS && (f.cssClass += " cke_browser_ios"); f.hidpi && (f.cssClass += " cke_hidpi"); return f
        }()); "unloaded" == CKEDITOR.status && function () {
            CKEDITOR.event.implementOn(CKEDITOR); CKEDITOR.loadFullCore = function () { if ("basic_ready" != CKEDITOR.status) CKEDITOR.loadFullCore._load = 1; else { delete CKEDITOR.loadFullCore; var a = document.createElement("script"); a.type = "text/javascript"; a.src = CKEDITOR.basePath + "ckeditor.js"; document.getElementsByTagName("head")[0].appendChild(a) } }; CKEDITOR.loadFullCoreTimeout = 0; CKEDITOR.add =
                function (a) { (this._.pending || (this._.pending = [])).push(a) }; (function () { CKEDITOR.domReady(function () { var a = CKEDITOR.loadFullCore, h = CKEDITOR.loadFullCoreTimeout; a && (CKEDITOR.status = "basic_ready", a && a._load ? a() : h && setTimeout(function () { CKEDITOR.loadFullCore && CKEDITOR.loadFullCore() }, 1E3 * h)) }) })(); CKEDITOR.status = "basic_loaded"
        }(); "use strict"; CKEDITOR.VERBOSITY_WARN = 1; CKEDITOR.VERBOSITY_ERROR = 2; CKEDITOR.verbosity = CKEDITOR.VERBOSITY_WARN | CKEDITOR.VERBOSITY_ERROR; CKEDITOR.warn = function (a, h) {
            CKEDITOR.verbosity &
            CKEDITOR.VERBOSITY_WARN && CKEDITOR.fire("log", { type: "warn", errorCode: a, additionalData: h })
        }; CKEDITOR.error = function (a, h) { CKEDITOR.verbosity & CKEDITOR.VERBOSITY_ERROR && CKEDITOR.fire("log", { type: "error", errorCode: a, additionalData: h }) }; CKEDITOR.on("log", function (a) {
            if (window.console && window.console.log) {
                var h = console[a.data.type] ? a.data.type : "log", f = a.data.errorCode; if (a = a.data.additionalData) console[h]("[CKEDITOR] Error code: " + f + ".", a); else console[h]("[CKEDITOR] Error code: " + f + "."); console[h]("[CKEDITOR] For more information about this error go to https://ckeditor.com/docs/ckeditor4/latest/guide/dev_errors.html#" +
                    f)
            }
        }, null, null, 999); CKEDITOR.dom = {}; (function () {
            function a(c, a, b) { this._minInterval = c; this._context = b; this._lastOutput = this._scheduledTimer = 0; this._output = CKEDITOR.tools.bind(a, b || {}); var g = this; this.input = function () { function c() { g._lastOutput = (new Date).getTime(); g._scheduledTimer = 0; g._call() } if (!g._scheduledTimer || !1 !== g._reschedule()) { var a = (new Date).getTime() - g._lastOutput; a < g._minInterval ? g._scheduledTimer = setTimeout(c, g._minInterval - a) : c() } } } function h(c, b, g) {
                a.call(this, c, b, g); this._args =
                    []; var e = this; this.input = CKEDITOR.tools.override(this.input, function (c) { return function () { e._args = Array.prototype.slice.call(arguments); c.call(this) } })
            } var f = [], b = CKEDITOR.env.gecko ? "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.ie ? "-ms-" : "", d = /&/g, l = />/g, k = /</g, m = /"/g, g = /&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g, e = { lt: "\x3c", gt: "\x3e", amp: "\x26", quot: '"', nbsp: " ", shy: "­" }, c = function (c, a) { return "#" == a[0] ? String.fromCharCode(parseInt(a.slice(1), 10)) : e[a] }; CKEDITOR.on("reset", function () { f = [] }); CKEDITOR.tools =
            {
                arrayCompare: function (c, a) { if (!c && !a) return !0; if (!c || !a || c.length != a.length) return !1; for (var b = 0; b < c.length; b++)if (c[b] != a[b]) return !1; return !0 }, getIndex: function (c, a) { for (var b = 0; b < c.length; ++b)if (a(c[b])) return b; return -1 }, clone: function (c) {
                    var a; if (c && c instanceof Array) { a = []; for (var b = 0; b < c.length; b++)a[b] = CKEDITOR.tools.clone(c[b]); return a } if (null === c || "object" != typeof c || c instanceof String || c instanceof Number || c instanceof Boolean || c instanceof Date || c instanceof RegExp || c.nodeType || c.window ===
                        c) return c; a = new c.constructor; for (b in c) a[b] = CKEDITOR.tools.clone(c[b]); return a
                }, capitalize: function (c, a) { return c.charAt(0).toUpperCase() + (a ? c.slice(1) : c.slice(1).toLowerCase()) }, extend: function (c) { var a = arguments.length, b, g; "boolean" == typeof (b = arguments[a - 1]) ? a-- : "boolean" == typeof (b = arguments[a - 2]) && (g = arguments[a - 1], a -= 2); for (var e = 1; e < a; e++) { var d = arguments[e] || {}; CKEDITOR.tools.array.forEach(CKEDITOR.tools.object.keys(d), function (a) { if (!0 === b || null == c[a]) if (!g || a in g) c[a] = d[a] }) } return c },
                prototypedCopy: function (c) { var a = function () { }; a.prototype = c; return new a }, copy: function (c) { var a = {}, b; for (b in c) a[b] = c[b]; return a }, isArray: function (c) { return "[object Array]" == Object.prototype.toString.call(c) }, isEmpty: function (c) { for (var a in c) if (c.hasOwnProperty(a)) return !1; return !0 }, cssVendorPrefix: function (c, a, g) { if (g) return b + c + ":" + a + ";" + c + ":" + a; g = {}; g[c] = a; g[b + c] = a; return g }, cssStyleToDomStyle: function () {
                    var c = document.createElement("div").style, a = "undefined" != typeof c.cssFloat ? "cssFloat" :
                        "undefined" != typeof c.styleFloat ? "styleFloat" : "float"; return function (c) { return "float" == c ? a : c.replace(/-./g, function (c) { return c.substr(1).toUpperCase() }) }
                }(), buildStyleHtml: function (c) { c = [].concat(c); for (var a, b = [], g = 0; g < c.length; g++)if (a = c[g]) /@import|[{}]/.test(a) ? b.push("\x3cstyle\x3e" + a + "\x3c/style\x3e") : (a = CKEDITOR.appendTimestamp(a), b.push('\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' + a + '"\x3e')); return b.join("") }, htmlEncode: function (c) {
                    return void 0 === c || null === c ? "" : String(c).replace(d,
                        "\x26amp;").replace(l, "\x26gt;").replace(k, "\x26lt;")
                }, htmlDecode: function (a) { return a.replace(g, c) }, htmlEncodeAttr: function (c) { return CKEDITOR.tools.htmlEncode(c).replace(m, "\x26quot;") }, htmlDecodeAttr: function (c) { return CKEDITOR.tools.htmlDecode(c) }, transformPlainTextToHtml: function (c, a) {
                    var b = a == CKEDITOR.ENTER_BR, g = this.htmlEncode(c.replace(/\r\n/g, "\n")), g = g.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;"), e = a == CKEDITOR.ENTER_P ? "p" : "div"; if (!b) {
                        var d = /\n{2}/g; if (d.test(g)) var m = "\x3c" + e + "\x3e", k =
                            "\x3c/" + e + "\x3e", g = m + g.replace(d, function () { return k + m }) + k
                    } g = g.replace(/\n/g, "\x3cbr\x3e"); b || (g = g.replace(new RegExp("\x3cbr\x3e(?\x3d\x3c/" + e + "\x3e)"), function (c) { return CKEDITOR.tools.repeat(c, 2) })); g = g.replace(/^ | $/g, "\x26nbsp;"); return g = g.replace(/(>|\s) /g, function (c, a) { return a + "\x26nbsp;" }).replace(/ (?=<)/g, "\x26nbsp;")
                }, getNextNumber: function () { var c = 0; return function () { return ++c } }(), getNextId: function () { return "cke_" + this.getNextNumber() }, getUniqueId: function () {
                    for (var c = "e", a = 0; 8 > a; a++)c +=
                        Math.floor(65536 * (1 + Math.random())).toString(16).substring(1); return c
                }, override: function (c, a) { var b = a(c); b.prototype = c.prototype; return b }, setTimeout: function (c, a, b, g, e) { e || (e = window); b || (b = e); return e.setTimeout(function () { g ? c.apply(b, [].concat(g)) : c.apply(b) }, a || 0) }, throttle: function (c, a, b) { return new this.buffers.throttle(c, a, b) }, trim: function () { var c = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g; return function (a) { return a.replace(c, "") } }(), ltrim: function () {
                    var c = /^[ \t\n\r]+/g; return function (a) {
                        return a.replace(c,
                            "")
                    }
                }(), rtrim: function () { var c = /[ \t\n\r]+$/g; return function (a) { return a.replace(c, "") } }(), indexOf: function (c, a) { if ("function" == typeof a) for (var b = 0, g = c.length; b < g; b++) { if (a(c[b])) return b } else { if (c.indexOf) return c.indexOf(a); b = 0; for (g = c.length; b < g; b++)if (c[b] === a) return b } return -1 }, search: function (c, a) { var b = CKEDITOR.tools.indexOf(c, a); return 0 <= b ? c[b] : null }, bind: function (c, a) { var b = Array.prototype.slice.call(arguments, 2); return function () { return c.apply(a, b.concat(Array.prototype.slice.call(arguments))) } },
                createClass: function (c) {
                    var a = c.$, b = c.base, g = c.privates || c._, e = c.proto; c = c.statics; !a && (a = function () { b && this.base.apply(this, arguments) }); if (g) var d = a, a = function () { var c = this._ || (this._ = {}), a; for (a in g) { var b = g[a]; c[a] = "function" == typeof b ? CKEDITOR.tools.bind(b, this) : b } d.apply(this, arguments) }; b && (a.prototype = this.prototypedCopy(b.prototype), a.prototype.constructor = a, a.base = b, a.baseProto = b.prototype, a.prototype.base = function v() { this.base = b.prototype.base; b.apply(this, arguments); this.base = v }); e &&
                        this.extend(a.prototype, e, !0); c && this.extend(a, c, !0); return a
                }, addFunction: function (c, a) { return f.push(function () { return c.apply(a || this, arguments) }) - 1 }, removeFunction: function (c) { f[c] = null }, callFunction: function (c) { var a = f[c]; return a && a.apply(window, Array.prototype.slice.call(arguments, 1)) }, cssLength: function () { var c = /^-?\d+\.?\d*px$/, a; return function (b) { a = CKEDITOR.tools.trim(b + "") + "px"; return c.test(a) ? a : b || "" } }(), convertToPx: function () {
                    var c; return function (a) {
                        c || (c = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"\x3e\x3c/div\x3e',
                            CKEDITOR.document), CKEDITOR.document.getBody().append(c)); if (!/%$/.test(a)) { var b = 0 > parseFloat(a); b && (a = a.replace("-", "")); c.setStyle("width", a); a = c.$.clientWidth; return b ? -a : a } return a
                    }
                }(), repeat: function (c, a) { return Array(a + 1).join(c) }, tryThese: function () { for (var c, a = 0, b = arguments.length; a < b; a++) { var g = arguments[a]; try { c = g(); break } catch (e) { } } return c }, genKey: function () { return Array.prototype.slice.call(arguments).join("-") }, defer: function (c) {
                    return function () {
                        var a = arguments, b = this; window.setTimeout(function () {
                            c.apply(b,
                                a)
                        }, 0)
                    }
                }, normalizeCssText: function (c, a) { var b = [], g, e = CKEDITOR.tools.parseCssText(c, !0, a); for (g in e) b.push(g + ":" + e[g]); b.sort(); return b.length ? b.join(";") + ";" : "" }, convertRgbToHex: function (c) { return c.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function (c, a, b, g) { c = [a, b, g]; for (a = 0; 3 > a; a++)c[a] = ("0" + parseInt(c[a], 10).toString(16)).slice(-2); return "#" + c.join("") }) }, normalizeHex: function (c) {
                    return c.replace(/#(([0-9a-f]{3}){1,2})($|;|\s+)/gi, function (c, a, b, g) {
                        c = a.toLowerCase(); 3 == c.length &&
                            (c = c.split(""), c = [c[0], c[0], c[1], c[1], c[2], c[2]].join("")); return "#" + c + g
                    })
                }, _isValidColorFormat: function (c) { if (!c) return !1; c = c.replace(/\s+/g, ""); return /^[a-z0-9()#%,./]+$/i.test(c) }, parseCssText: function (c, a, b) {
                    var g = {}; b && (c = (new CKEDITOR.dom.element("span")).setAttribute("style", c).getAttribute("style") || ""); c && (c = CKEDITOR.tools.normalizeHex(CKEDITOR.tools.convertRgbToHex(c))); if (!c || ";" == c) return g; c.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (c, b, e) {
                        a && (b =
                            b.toLowerCase(), "font-family" == b && (e = e.replace(/\s*,\s*/g, ",")), e = CKEDITOR.tools.trim(e)); g[b] = e
                    }); return g
                }, writeCssText: function (c, a) { var b, g = []; for (b in c) g.push(b + ":" + c[b]); a && g.sort(); return g.join("; ") }, objectCompare: function (c, a, b) { var g; if (!c && !a) return !0; if (!c || !a) return !1; for (g in c) if (c[g] != a[g]) return !1; if (!b) for (g in a) if (c[g] != a[g]) return !1; return !0 }, objectKeys: function (c) { return CKEDITOR.tools.object.keys(c) }, convertArrayToObject: function (c, a) {
                    var b = {}; 1 == arguments.length && (a = !0);
                    for (var g = 0, e = c.length; g < e; ++g)b[c[g]] = a; return b
                }, getStyledSpans: function (c, a) { var b = CKEDITOR.env.ie && 8 == CKEDITOR.env.version ? c.toUpperCase() : c, b = a.find("span[style*\x3d" + b + "]").toArray(); return CKEDITOR.tools.array.filter(b, function (a) { return !!a.getStyle(c) }) }, fixDomain: function () { for (var c; ;)try { c = window.parent.document.domain; break } catch (a) { c = c ? c.replace(/.+?(?:\.|$)/, "") : document.domain; if (!c) break; document.domain = c } return !!c }, eventsBuffer: function (c, a, b) { return new this.buffers.event(c, a, b) },
                enableHtml5Elements: function (c, a) { for (var b = "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video".split(" "), g = b.length, e; g--;)e = c.createElement(b[g]), a && c.appendChild(e) }, checkIfAnyArrayItemMatches: function (c, a) { for (var b = 0, g = c.length; b < g; ++b)if (c[b].match(a)) return !0; return !1 }, checkIfAnyObjectPropertyMatches: function (c, a) { for (var b in c) if (b.match(a)) return !0; return !1 }, keystrokeToString: function (c,
                    a) { var b = this.keystrokeToArray(c, a); b.display = b.display.join("+"); b.aria = b.aria.join("+"); return b }, keystrokeToArray: function (c, a) { var b = a & 16711680, g = a & 65535, e = CKEDITOR.env.mac, d = [], m = []; b & CKEDITOR.CTRL && (d.push(e ? "⌘" : c[17]), m.push(e ? c[224] : c[17])); b & CKEDITOR.ALT && (d.push(e ? "⌥" : c[18]), m.push(c[18])); b & CKEDITOR.SHIFT && (d.push(e ? "⇧" : c[16]), m.push(c[16])); g && (c[g] ? (d.push(c[g]), m.push(c[g])) : (d.push(String.fromCharCode(g)), m.push(String.fromCharCode(g)))); return { display: d, aria: m } }, transparentImageData: "data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw\x3d\x3d",
                getCookie: function (c) { c = c.toLowerCase(); for (var a = document.cookie.split(";"), b, g, e = 0; e < a.length; e++)if (b = a[e].split("\x3d"), g = decodeURIComponent(CKEDITOR.tools.trim(b[0]).toLowerCase()), g === c) return decodeURIComponent(1 < b.length ? b[1] : ""); return null }, setCookie: function (c, a) { document.cookie = encodeURIComponent(c) + "\x3d" + encodeURIComponent(a) + ";path\x3d/" }, getCsrfToken: function () {
                    var c = CKEDITOR.tools.getCookie("ckCsrfToken"); if (!c || 40 != c.length) {
                        var c = [], a = ""; if (window.crypto && window.crypto.getRandomValues) c =
                            new Uint8Array(40), window.crypto.getRandomValues(c); else for (var b = 0; 40 > b; b++)c.push(Math.floor(256 * Math.random())); for (b = 0; b < c.length; b++)var g = "abcdefghijklmnopqrstuvwxyz0123456789".charAt(c[b] % 36), a = a + (.5 < Math.random() ? g.toUpperCase() : g); c = a; CKEDITOR.tools.setCookie("ckCsrfToken", c)
                    } return c
                }, escapeCss: function (c) {
                    if (c) if (window.CSS && CSS.escape) c = CSS.escape(c); else {
                        c = String(c); for (var a = c.length, b = -1, g, e = "", d = c.charCodeAt(0); ++b < a;)g = c.charCodeAt(b), e = 0 == g ? e + "�" : 127 == g || 1 <= g && 31 >= g || 0 == b && 48 <=
                            g && 57 >= g || 1 == b && 48 <= g && 57 >= g && 45 == d ? e + ("\\" + g.toString(16) + " ") : 0 == b && 1 == a && 45 == g ? e + ("\\" + c.charAt(b)) : 128 <= g || 45 == g || 95 == g || 48 <= g && 57 >= g || 65 <= g && 90 >= g || 97 <= g && 122 >= g ? e + c.charAt(b) : e + ("\\" + c.charAt(b)); c = e
                    } else c = ""; return c
                }, getMouseButton: function (c) { return (c = c && c.data ? c.data.$ : c) ? CKEDITOR.tools.normalizeMouseButton(c.button) : !1 }, normalizeMouseButton: function (c, a) {
                    if (!CKEDITOR.env.ie || 9 <= CKEDITOR.env.version && !CKEDITOR.env.ie6Compat) return c; for (var b = [[CKEDITOR.MOUSE_BUTTON_LEFT, 1], [CKEDITOR.MOUSE_BUTTON_MIDDLE,
                        4], [CKEDITOR.MOUSE_BUTTON_RIGHT, 2]], g = 0; g < b.length; g++) { var e = b[g]; if (e[0] === c && a) return e[1]; if (!a && e[1] === c) return e[0] }
                }, convertHexStringToBytes: function (c) { var a = [], b = c.length / 2, g; for (g = 0; g < b; g++)a.push(parseInt(c.substr(2 * g, 2), 16)); return a }, convertBytesToBase64: function (c) {
                    var a = "", b = c.length, g; for (g = 0; g < b; g += 3) {
                        var e = c.slice(g, g + 3), d = e.length, m = [], k; if (3 > d) for (k = d; 3 > k; k++)e[k] = 0; m[0] = (e[0] & 252) >> 2; m[1] = (e[0] & 3) << 4 | e[1] >> 4; m[2] = (e[1] & 15) << 2 | (e[2] & 192) >> 6; m[3] = e[2] & 63; for (k = 0; 4 > k; k++)a = k <= d ?
                            a + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(m[k]) : a + "\x3d"
                    } return a
                }, style: {
                    parse: {
                        _borderStyle: "none hidden dotted dashed solid double groove ridge inset outset".split(" "), _widthRegExp: /^(thin|medium|thick|[\+-]?\d+(\.\d+)?[a-z%]+|[\+-]?0+(\.0+)?|\.\d+[a-z%]+)$/, _rgbaRegExp: /rgba?\(\s*\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*(?:,\s*[0-9.]+\s*)?\)/gi, _hslaRegExp: /hsla?\(\s*[0-9.]+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[0-9.]+\s*)?\)/gi, background: function (c) {
                            var a = {}, b = this._findColor(c);
                            b.length && (a.color = b[0], CKEDITOR.tools.array.forEach(b, function (a) { c = c.replace(a, "") })); if (c = CKEDITOR.tools.trim(c)) a.unprocessed = c; return a
                        }, margin: function (c) { return CKEDITOR.tools.style.parse.sideShorthand(c, function (c) { return c.match(/(?:\-?[\.\d]+(?:%|\w*)|auto|inherit|initial|unset|revert)/g) || ["0px"] }) }, sideShorthand: function (c, a) {
                            function b(c) { g.top = e[c[0]]; g.right = e[c[1]]; g.bottom = e[c[2]]; g.left = e[c[3]] } var g = {}, e = a ? a(c) : c.split(/\s+/); switch (e.length) {
                                case 1: b([0, 0, 0, 0]); break; case 2: b([0,
                                    1, 0, 1]); break; case 3: b([0, 1, 2, 1]); break; case 4: b([0, 1, 2, 3])
                            }return g
                        }, border: function (c) { return CKEDITOR.tools.style.border.fromCssRule(c) }, _findColor: function (c) { var a = [], b = CKEDITOR.tools.array, a = a.concat(c.match(this._rgbaRegExp) || []), a = a.concat(c.match(this._hslaRegExp) || []); return a = a.concat(b.filter(c.split(/\s+/), function (c) { return c.match(/^\#[a-f0-9]{3}(?:[a-f0-9]{3})?$/gi) ? !0 : c.toLowerCase() in CKEDITOR.tools.style.parse._colors })) }
                    }
                }, array: {
                    filter: function (c, a, b) {
                        var g = []; this.forEach(c,
                            function (e, d) { a.call(b, e, d, c) && g.push(e) }); return g
                    }, find: function (c, a, b) { for (var g = c.length, e = 0; e < g;) { if (a.call(b, c[e], e, c)) return c[e]; e++ } }, forEach: function (c, a, b) { var g = c.length, e; for (e = 0; e < g; e++)a.call(b, c[e], e, c) }, map: function (c, a, b) { for (var g = [], e = 0; e < c.length; e++)g.push(a.call(b, c[e], e, c)); return g }, reduce: function (c, a, b, g) { for (var e = 0; e < c.length; e++)b = a.call(g, b, c[e], e, c); return b }, every: function (c, a, b) { if (!c.length) return !0; a = this.filter(c, a, b); return c.length === a.length }, some: function (c,
                        a, b) { for (var g = 0; g < c.length; g++)if (a.call(b, c[g], g, c)) return !0; return !1 }, zip: function (c, a) { return CKEDITOR.tools.array.map(c, function (c, b) { return [c, a[b]] }) }, unique: function (c) { return this.filter(c, function (a, b) { return b === CKEDITOR.tools.array.indexOf(c, a) }) }
                }, object: {
                    DONT_ENUMS: "toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" "), entries: function (c) { return CKEDITOR.tools.array.map(CKEDITOR.tools.object.keys(c), function (a) { return [a, c[a]] }) }, values: function (c) {
                        return CKEDITOR.tools.array.map(CKEDITOR.tools.object.keys(c),
                            function (a) { return c[a] })
                    }, keys: function (c) { var a = Object.prototype.hasOwnProperty, b = [], g = CKEDITOR.tools.object.DONT_ENUMS; if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (!c || "object" !== typeof c)) { a = []; if ("string" === typeof c) for (b = 0; b < c.length; b++)a.push(String(b)); return a } for (var e in c) b.push(e); if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version) for (e = 0; e < g.length; e++)a.call(c, g[e]) && b.push(g[e]); return b }, findKey: function (c, a) { if ("object" !== typeof c) return null; for (var b in c) if (c[b] === a) return b; return null },
                    merge: function (c, a) { var b = CKEDITOR.tools, g = b.clone(c), e = b.clone(a); b.array.forEach(b.object.keys(e), function (c) { g[c] = "object" === typeof e[c] && "object" === typeof g[c] ? b.object.merge(g[c], e[c]) : e[c] }); return g }
                }, getAbsoluteRectPosition: function (c, a) {
                    function b(c) { if (c) { var a = c.getClientRect(); g.top += a.top; g.left += a.left; "x" in g && "y" in g && (g.x += a.x, g.y += a.y); b(c.getWindow().getFrame()) } } var g = CKEDITOR.tools.copy(a); b(c.getFrame()); var e = CKEDITOR.document.getWindow().getScrollPosition(); g.top += e.y; g.left +=
                        e.x; "x" in g && "y" in g && (g.y += e.y, g.x += e.x); g.right = g.left + g.width; g.bottom = g.top + g.height; return g
                }
            }; a.prototype = { reset: function () { this._lastOutput = 0; this._clearTimer() }, _reschedule: function () { return !1 }, _call: function () { this._output() }, _clearTimer: function () { this._scheduledTimer && clearTimeout(this._scheduledTimer); this._scheduledTimer = 0 } }; h.prototype = CKEDITOR.tools.prototypedCopy(a.prototype); h.prototype._reschedule = function () { this._scheduledTimer && this._clearTimer() }; h.prototype._call = function () {
                this._output.apply(this._context,
                    this._args)
            }; CKEDITOR.tools.buffers = {}; CKEDITOR.tools.buffers.event = a; CKEDITOR.tools.buffers.throttle = h; CKEDITOR.tools.style.border = CKEDITOR.tools.createClass({
                $: function (c) { c = c || {}; this.width = c.width; this.style = c.style; this.color = c.color; this._.normalize() }, _: { normalizeMap: { color: [[/windowtext/g, "black"]] }, normalize: function () { for (var c in this._.normalizeMap) { var a = this[c]; a && (this[c] = CKEDITOR.tools.array.reduce(this._.normalizeMap[c], function (c, a) { return c.replace(a[0], a[1]) }, a)) } } }, proto: {
                    toString: function () {
                        return CKEDITOR.tools.array.filter([this.width,
                        this.style, this.color], function (c) { return !!c }).join(" ")
                    }
                }, statics: {
                    fromCssRule: function (c) { var a = {}, b = c.split(/\s+/g); c = CKEDITOR.tools.style.parse._findColor(c); c.length && (a.color = c[0]); CKEDITOR.tools.array.forEach(b, function (c) { a.style || -1 === CKEDITOR.tools.indexOf(CKEDITOR.tools.style.parse._borderStyle, c) ? !a.width && CKEDITOR.tools.style.parse._widthRegExp.test(c) && (a.width = c) : a.style = c }); return new CKEDITOR.tools.style.border(a) }, splitCssValues: function (c, a) {
                        a = a || {}; var b = CKEDITOR.tools.array.reduce(["width",
                            "style", "color"], function (b, g) { var e = c["border-" + g] || a[g]; b[g] = e ? CKEDITOR.tools.style.parse.sideShorthand(e) : null; return b }, {}); return CKEDITOR.tools.array.reduce(["top", "right", "bottom", "left"], function (a, g) { var e = {}, d; for (d in b) { var m = c["border-" + g + "-" + d]; e[d] = m ? m : b[d] && b[d][g] } a["border-" + g] = new CKEDITOR.tools.style.border(e); return a }, {})
                    }
                }
            }); CKEDITOR.tools.array.indexOf = CKEDITOR.tools.indexOf; CKEDITOR.tools.array.isArray = CKEDITOR.tools.isArray; CKEDITOR.MOUSE_BUTTON_LEFT = 0; CKEDITOR.MOUSE_BUTTON_MIDDLE =
                1; CKEDITOR.MOUSE_BUTTON_RIGHT = 2
        })(); CKEDITOR.dtd = function () {
            var a = CKEDITOR.tools.extend, h = function (a, c) { for (var b = CKEDITOR.tools.clone(a), g = 1; g < arguments.length; g++) { c = arguments[g]; for (var d in c) delete b[d] } return b }, f = {}, b = {}, d = { address: 1, article: 1, aside: 1, blockquote: 1, details: 1, div: 1, dl: 1, fieldset: 1, figure: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, hr: 1, main: 1, menu: 1, nav: 1, ol: 1, p: 1, pre: 1, section: 1, table: 1, ul: 1 }, l = { command: 1, link: 1, meta: 1, noscript: 1, script: 1, style: 1 }, k = {},
            m = { "#": 1 }, g = { center: 1, dir: 1, noframes: 1 }; a(f, { a: 1, abbr: 1, area: 1, audio: 1, b: 1, bdi: 1, bdo: 1, br: 1, button: 1, canvas: 1, cite: 1, code: 1, command: 1, datalist: 1, del: 1, dfn: 1, em: 1, embed: 1, i: 1, iframe: 1, img: 1, input: 1, ins: 1, kbd: 1, keygen: 1, label: 1, map: 1, mark: 1, meter: 1, noscript: 1, object: 1, output: 1, progress: 1, q: 1, ruby: 1, s: 1, samp: 1, script: 1, select: 1, small: 1, span: 1, strong: 1, sub: 1, sup: 1, textarea: 1, time: 1, u: 1, "var": 1, video: 1, wbr: 1 }, m, { acronym: 1, applet: 1, basefont: 1, big: 1, font: 1, isindex: 1, strike: 1, style: 1, tt: 1 }); a(b, d, f, g); h =
            {
                a: h(f, { a: 1, button: 1 }), abbr: f, address: b, area: k, article: b, aside: b, audio: a({ source: 1, track: 1 }, b), b: f, base: k, bdi: f, bdo: f, blockquote: b, body: b, br: k, button: h(f, { a: 1, button: 1 }), canvas: f, caption: b, cite: f, code: f, col: k, colgroup: { col: 1 }, command: k, datalist: a({ option: 1 }, f), dd: b, del: f, details: a({ summary: 1 }, b), dfn: f, div: b, dl: { dt: 1, dd: 1 }, dt: b, em: f, embed: k, fieldset: a({ legend: 1 }, b), figcaption: b, figure: a({ figcaption: 1 }, b), footer: b, form: b, h1: f, h2: f, h3: f, h4: f, h5: f, h6: f, head: a({ title: 1, base: 1 }, l), header: b, hgroup: {
                    h1: 1,
                    h2: 1, h3: 1, h4: 1, h5: 1, h6: 1
                }, hr: k, html: a({ head: 1, body: 1 }, b, l), i: f, iframe: m, img: k, input: k, ins: f, kbd: f, keygen: k, label: f, legend: f, li: b, link: k, main: b, map: b, mark: f, menu: a({ li: 1 }, b), meta: k, meter: h(f, { meter: 1 }), nav: b, noscript: a({ link: 1, meta: 1, style: 1 }, f), object: a({ param: 1 }, f), ol: { li: 1 }, optgroup: { option: 1 }, option: m, output: f, p: f, param: k, pre: f, progress: h(f, { progress: 1 }), q: f, rp: f, rt: f, ruby: a({ rp: 1, rt: 1 }, f), s: f, samp: f, script: m, section: b, select: { optgroup: 1, option: 1 }, small: f, source: k, span: f, strong: f, style: m, sub: f,
                summary: a({ h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }, f), sup: f, table: { caption: 1, colgroup: 1, thead: 1, tfoot: 1, tbody: 1, tr: 1 }, tbody: { tr: 1 }, td: b, textarea: m, tfoot: { tr: 1 }, th: b, thead: { tr: 1 }, time: h(f, { time: 1 }), title: m, tr: { th: 1, td: 1 }, track: k, u: f, ul: { li: 1 }, "var": f, video: a({ source: 1, track: 1 }, b), wbr: k, acronym: f, applet: a({ param: 1 }, b), basefont: k, big: f, center: b, dialog: k, dir: { li: 1 }, font: f, isindex: k, noframes: b, strike: f, tt: f
            }; a(h, {
                $block: a({ audio: 1, dd: 1, dt: 1, figcaption: 1, li: 1, video: 1 }, d, g), $blockLimit: {
                    article: 1, aside: 1, audio: 1,
                    body: 1, caption: 1, details: 1, dir: 1, div: 1, dl: 1, fieldset: 1, figcaption: 1, figure: 1, footer: 1, form: 1, header: 1, hgroup: 1, main: 1, menu: 1, nav: 1, ol: 1, section: 1, table: 1, td: 1, th: 1, tr: 1, ul: 1, video: 1
                }, $cdata: { script: 1, style: 1 }, $editable: { address: 1, article: 1, aside: 1, blockquote: 1, body: 1, details: 1, div: 1, fieldset: 1, figcaption: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, main: 1, nav: 1, p: 1, pre: 1, section: 1 }, $empty: {
                    area: 1, base: 1, basefont: 1, br: 1, col: 1, command: 1, dialog: 1, embed: 1, hr: 1, img: 1, input: 1, isindex: 1,
                    keygen: 1, link: 1, meta: 1, param: 1, source: 1, track: 1, wbr: 1
                }, $inline: f, $list: { dl: 1, ol: 1, ul: 1 }, $listItem: { dd: 1, dt: 1, li: 1 }, $nonBodyContent: a({ body: 1, head: 1, html: 1 }, h.head), $nonEditable: { applet: 1, audio: 1, button: 1, embed: 1, iframe: 1, map: 1, object: 1, option: 1, param: 1, script: 1, textarea: 1, video: 1 }, $object: { applet: 1, audio: 1, button: 1, hr: 1, iframe: 1, img: 1, input: 1, object: 1, select: 1, table: 1, textarea: 1, video: 1 }, $removeEmpty: {
                    abbr: 1, acronym: 1, b: 1, bdi: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1,
                    mark: 1, meter: 1, output: 1, q: 1, ruby: 1, s: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, time: 1, tt: 1, u: 1, "var": 1
                }, $tabIndex: { a: 1, area: 1, button: 1, input: 1, object: 1, select: 1, textarea: 1 }, $tableContent: { caption: 1, col: 1, colgroup: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1 }, $transparent: { a: 1, audio: 1, canvas: 1, del: 1, ins: 1, map: 1, noscript: 1, object: 1, video: 1 }, $intermediate: { caption: 1, colgroup: 1, dd: 1, dt: 1, figcaption: 1, legend: 1, li: 1, optgroup: 1, option: 1, rp: 1, rt: 1, summary: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1 }
            });
            return h
        }(); CKEDITOR.dom.event = function (a) { this.$ = a }; CKEDITOR.dom.event.prototype = {
            getKey: function () { return this.$.keyCode || this.$.which }, getKeystroke: function () { var a = this.getKey(); if (this.$.ctrlKey || this.$.metaKey) a += CKEDITOR.CTRL; this.$.shiftKey && (a += CKEDITOR.SHIFT); this.$.altKey && (a += CKEDITOR.ALT); return a }, preventDefault: function (a) { var h = this.$; h.preventDefault ? h.preventDefault() : h.returnValue = !1; a && this.stopPropagation() }, stopPropagation: function () {
                var a = this.$; a.stopPropagation ? a.stopPropagation() :
                    a.cancelBubble = !0
            }, getTarget: function () { var a = this.$.target || this.$.srcElement; return a ? new CKEDITOR.dom.node(a) : null }, getPhase: function () { return this.$.eventPhase || 2 }, getPageOffset: function () { var a = this.getTarget().getDocument().$; return { x: this.$.pageX || this.$.clientX + (a.documentElement.scrollLeft || a.body.scrollLeft), y: this.$.pageY || this.$.clientY + (a.documentElement.scrollTop || a.body.scrollTop) } }
        }; CKEDITOR.CTRL = 1114112; CKEDITOR.SHIFT = 2228224; CKEDITOR.ALT = 4456448; CKEDITOR.EVENT_PHASE_CAPTURING = 1;
        CKEDITOR.EVENT_PHASE_AT_TARGET = 2; CKEDITOR.EVENT_PHASE_BUBBLING = 3; CKEDITOR.HISTORY_NATIVE = 1; CKEDITOR.HISTORY_HASH = 2; CKEDITOR.HISTORY_OFF = 0; CKEDITOR.dom.domObject = function (a) { a && (this.$ = a) }; CKEDITOR.dom.domObject.prototype = function () {
            var a = function (a, f) { return function (b) { "undefined" != typeof CKEDITOR && a.fire(f, new CKEDITOR.dom.event(b)) } }; return {
                getPrivate: function () { var a; (a = this.getCustomData("_")) || this.setCustomData("_", a = {}); return a }, on: function (h) {
                    var f = this.getCustomData("_cke_nativeListeners");
                    f || (f = {}, this.setCustomData("_cke_nativeListeners", f)); f[h] || (f = f[h] = a(this, h), this.$.addEventListener ? this.$.addEventListener(h, f, !!CKEDITOR.event.useCapture) : this.$.attachEvent && this.$.attachEvent("on" + h, f)); return CKEDITOR.event.prototype.on.apply(this, arguments)
                }, removeListener: function (a) {
                    CKEDITOR.event.prototype.removeListener.apply(this, arguments); if (!this.hasListeners(a)) {
                        var f = this.getCustomData("_cke_nativeListeners"), b = f && f[a]; b && (this.$.removeEventListener ? this.$.removeEventListener(a,
                            b, !1) : this.$.detachEvent && this.$.detachEvent("on" + a, b), delete f[a])
                    }
                }, removeAllListeners: function () { try { var a = this.getCustomData("_cke_nativeListeners"), f; for (f in a) { var b = a[f]; this.$.detachEvent ? this.$.detachEvent("on" + f, b) : this.$.removeEventListener && this.$.removeEventListener(f, b, !1); delete a[f] } } catch (d) { if (!CKEDITOR.env.edge || -2146828218 !== d.number) throw d; } CKEDITOR.event.prototype.removeAllListeners.call(this) }
            }
        }(); (function (a) {
            var h = {}; CKEDITOR.on("reset", function () { h = {} }); a.equals = function (a) {
                try {
                    return a &&
                        a.$ === this.$
                } catch (b) { return !1 }
            }; a.setCustomData = function (a, b) { var d = this.getUniqueId(); (h[d] || (h[d] = {}))[a] = b; return this }; a.getCustomData = function (a) { var b = this.$["data-cke-expando"]; return (b = b && h[b]) && a in b ? b[a] : null }; a.removeCustomData = function (a) { var b = this.$["data-cke-expando"], b = b && h[b], d, l; b && (d = b[a], l = a in b, delete b[a]); return l ? d : null }; a.clearCustomData = function () { this.removeAllListeners(); var a = this.getUniqueId(); a && delete h[a] }; a.getUniqueId = function () {
                return this.$["data-cke-expando"] ||
                    (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber())
            }; CKEDITOR.event.implementOn(a)
        })(CKEDITOR.dom.domObject.prototype); CKEDITOR.dom.node = function (a) { return a ? new CKEDITOR.dom[a.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : a.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : a.nodeType == CKEDITOR.NODE_TEXT ? "text" : a.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : a.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" : "domObject"](a) : this }; CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject; CKEDITOR.NODE_ELEMENT =
            1; CKEDITOR.NODE_DOCUMENT = 9; CKEDITOR.NODE_TEXT = 3; CKEDITOR.NODE_COMMENT = 8; CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11; CKEDITOR.POSITION_IDENTICAL = 0; CKEDITOR.POSITION_DISCONNECTED = 1; CKEDITOR.POSITION_FOLLOWING = 2; CKEDITOR.POSITION_PRECEDING = 4; CKEDITOR.POSITION_IS_CONTAINED = 8; CKEDITOR.POSITION_CONTAINS = 16; CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
                appendTo: function (a, h) { a.append(this, h); return a }, clone: function (a, h) {
                    function f(b) {
                        b["data-cke-expando"] && (b["data-cke-expando"] = !1); if (b.nodeType == CKEDITOR.NODE_ELEMENT ||
                            b.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) if (h || b.nodeType != CKEDITOR.NODE_ELEMENT || b.removeAttribute("id", !1), a) { b = b.childNodes; for (var d = 0; d < b.length; d++)f(b[d]) }
                    } function b(d) { if (d.type == CKEDITOR.NODE_ELEMENT || d.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) { if (d.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) { var k = d.getName(); ":" == k[0] && d.renameNode(k.substring(1)) } if (a) for (k = 0; k < d.getChildCount(); k++)b(d.getChild(k)) } } var d = this.$.cloneNode(a); f(d); d = new CKEDITOR.dom.node(d); CKEDITOR.env.ie && 9 > CKEDITOR.env.version &&
                        (this.type == CKEDITOR.NODE_ELEMENT || this.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) && b(d); return d
                }, hasPrevious: function () { return !!this.$.previousSibling }, hasNext: function () { return !!this.$.nextSibling }, insertAfter: function (a) { a.$.parentNode.insertBefore(this.$, a.$.nextSibling); return a }, insertBefore: function (a) { a.$.parentNode.insertBefore(this.$, a.$); return a }, insertBeforeMe: function (a) { this.$.parentNode.insertBefore(a.$, this.$); return a }, getAddress: function (a) {
                    for (var h = [], f = this.getDocument().$.documentElement,
                        b = this; b && b != f;) { var d = b.getParent(); d && h.unshift(this.getIndex.call(b, a)); b = d } return h
                }, getDocument: function () { return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument) }, getIndex: function (a) {
                    function h(a, b) { var d = b ? a.getNext() : a.getPrevious(); return d && d.type == CKEDITOR.NODE_TEXT ? d.isEmpty() ? h(d, b) : d : null } var f = this, b = -1, d; if (!this.getParent() || a && f.type == CKEDITOR.NODE_TEXT && f.isEmpty() && !h(f) && !h(f, !0)) return -1; do if (!a || f.equals(this) || f.type != CKEDITOR.NODE_TEXT || !d &&
                        !f.isEmpty()) b++, d = f.type == CKEDITOR.NODE_TEXT; while (f = f.getPrevious()); return b
                }, getNextSourceNode: function (a, h, f) { if (f && !f.call) { var b = f; f = function (a) { return !a.equals(b) } } a = !a && this.getFirst && this.getFirst(); var d; if (!a) { if (this.type == CKEDITOR.NODE_ELEMENT && f && !1 === f(this, !0)) return null; a = this.getNext() } for (; !a && (d = (d || this).getParent());) { if (f && !1 === f(d, !0)) return null; a = d.getNext() } return !a || f && !1 === f(a) ? null : h && h != a.type ? a.getNextSourceNode(!1, h, f) : a }, getPreviousSourceNode: function (a, h, f) {
                    if (f &&
                        !f.call) { var b = f; f = function (a) { return !a.equals(b) } } a = !a && this.getLast && this.getLast(); var d; if (!a) { if (this.type == CKEDITOR.NODE_ELEMENT && f && !1 === f(this, !0)) return null; a = this.getPrevious() } for (; !a && (d = (d || this).getParent());) { if (f && !1 === f(d, !0)) return null; a = d.getPrevious() } return !a || f && !1 === f(a) ? null : h && a.type != h ? a.getPreviousSourceNode(!1, h, f) : a
                }, getPrevious: function (a) { var h = this.$, f; do f = (h = h.previousSibling) && 10 != h.nodeType && new CKEDITOR.dom.node(h); while (f && a && !a(f)); return f }, getNext: function (a) {
                    var h =
                        this.$, f; do f = (h = h.nextSibling) && new CKEDITOR.dom.node(h); while (f && a && !a(f)); return f
                }, getParent: function (a) { var h = this.$.parentNode; return h && (h.nodeType == CKEDITOR.NODE_ELEMENT || a && h.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ? new CKEDITOR.dom.node(h) : null }, getParents: function (a) { var h = this, f = []; do f[a ? "push" : "unshift"](h); while (h = h.getParent()); return f }, getCommonAncestor: function (a) {
                    if (a.equals(this)) return this; if (a.contains && a.contains(this)) return a; var h = this.contains ? this : this.getParent();
                    do if (h.contains(a)) return h; while (h = h.getParent()); return null
                }, getPosition: function (a) {
                    var h = this.$, f = a.$; if (h.compareDocumentPosition) return h.compareDocumentPosition(f); if (h == f) return CKEDITOR.POSITION_IDENTICAL; if (this.type == CKEDITOR.NODE_ELEMENT && a.type == CKEDITOR.NODE_ELEMENT) {
                        if (h.contains) { if (h.contains(f)) return CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING; if (f.contains(h)) return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING } if ("sourceIndex" in h) return 0 > h.sourceIndex ||
                            0 > f.sourceIndex ? CKEDITOR.POSITION_DISCONNECTED : h.sourceIndex < f.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING
                    } h = this.getAddress(); a = a.getAddress(); for (var f = Math.min(h.length, a.length), b = 0; b < f; b++)if (h[b] != a[b]) return h[b] < a[b] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING; return h.length < a.length ? CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
                }, getAscendant: function (a, h) {
                    var f = this.$, b, d; h || (f = f.parentNode);
                    "function" == typeof a ? (d = !0, b = a) : (d = !1, b = function (b) { b = "string" == typeof b.nodeName ? b.nodeName.toLowerCase() : ""; return "string" == typeof a ? b == a : b in a }); for (; f;) { if (b(d ? new CKEDITOR.dom.node(f) : f)) return new CKEDITOR.dom.node(f); try { f = f.parentNode } catch (l) { f = null } } return null
                }, hasAscendant: function (a, h) { var f = this.$; h || (f = f.parentNode); for (; f;) { if (f.nodeName && f.nodeName.toLowerCase() == a) return !0; f = f.parentNode } return !1 }, move: function (a, h) { a.append(this.remove(), h) }, remove: function (a) {
                    var h = this.$, f = h.parentNode;
                    if (f) { if (a) for (; a = h.firstChild;)f.insertBefore(h.removeChild(a), h); f.removeChild(h) } return this
                }, replace: function (a) { this.insertBefore(a); a.remove() }, trim: function () { this.ltrim(); this.rtrim() }, ltrim: function () { for (var a; this.getFirst && (a = this.getFirst());) { if (a.type == CKEDITOR.NODE_TEXT) { var h = CKEDITOR.tools.ltrim(a.getText()), f = a.getLength(); if (h) h.length < f && (a.split(f - h.length), this.$.removeChild(this.$.firstChild)); else { a.remove(); continue } } break } }, rtrim: function () {
                    for (var a; this.getLast && (a = this.getLast());) {
                        if (a.type ==
                            CKEDITOR.NODE_TEXT) { var h = CKEDITOR.tools.rtrim(a.getText()), f = a.getLength(); if (h) h.length < f && (a.split(h.length), this.$.lastChild.parentNode.removeChild(this.$.lastChild)); else { a.remove(); continue } } break
                    } CKEDITOR.env.needsBrFiller && (a = this.$.lastChild) && 1 == a.type && "br" == a.nodeName.toLowerCase() && a.parentNode.removeChild(a)
                }, isReadOnly: function (a) {
                    var h = this; this.type != CKEDITOR.NODE_ELEMENT && (h = this.getParent()); CKEDITOR.env.edge && h && h.is("textarea", "input") && (a = !0); if (!a && h && "undefined" != typeof h.$.isContentEditable) return !(h.$.isContentEditable ||
                        h.data("cke-editable")); for (; h;) { if (h.data("cke-editable")) return !1; if (h.hasAttribute("contenteditable")) return "false" == h.getAttribute("contenteditable"); h = h.getParent() } return !0
                }
            }); CKEDITOR.dom.window = function (a) { CKEDITOR.dom.domObject.call(this, a) }; CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject; CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
                focus: function () { this.$.focus() }, getViewPaneSize: function () {
                    var a = this.$.document, h = "CSS1Compat" == a.compatMode; return {
                        width: (h ? a.documentElement.clientWidth :
                            a.body.clientWidth) || 0, height: (h ? a.documentElement.clientHeight : a.body.clientHeight) || 0
                    }
                }, getScrollPosition: function () { var a = this.$; if ("pageXOffset" in a) return { x: a.pageXOffset || 0, y: a.pageYOffset || 0 }; a = a.document; return { x: a.documentElement.scrollLeft || a.body.scrollLeft || 0, y: a.documentElement.scrollTop || a.body.scrollTop || 0 } }, getFrame: function () { var a = this.$.frameElement; return a ? new CKEDITOR.dom.element.get(a) : null }
            }); CKEDITOR.dom.document = function (a) { CKEDITOR.dom.domObject.call(this, a) }; CKEDITOR.dom.document.prototype =
                new CKEDITOR.dom.domObject; CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
                    type: CKEDITOR.NODE_DOCUMENT, appendStyleSheet: function (a) { a = CKEDITOR.appendTimestamp(a); if (this.$.createStyleSheet) this.$.createStyleSheet(a); else { var h = new CKEDITOR.dom.element("link"); h.setAttributes({ rel: "stylesheet", type: "text/css", href: a }); this.getHead().append(h) } }, appendStyleText: function (a) {
                        if (this.$.createStyleSheet) { var h = this.$.createStyleSheet(""); h.cssText = a } else {
                            var f = new CKEDITOR.dom.element("style", this);
                            f.append(new CKEDITOR.dom.text(a, this)); this.getHead().append(f)
                        } return h || f.$.sheet
                    }, createElement: function (a, h) { var f = new CKEDITOR.dom.element(a, this); h && (h.attributes && f.setAttributes(h.attributes), h.styles && f.setStyles(h.styles)); return f }, createText: function (a) { return new CKEDITOR.dom.text(a, this) }, focus: function () { this.getWindow().focus() }, getActive: function () { var a; try { a = this.$.activeElement } catch (h) { return null } return new CKEDITOR.dom.element(a) }, getById: function (a) {
                        return (a = this.$.getElementById(a)) ?
                            new CKEDITOR.dom.element(a) : null
                    }, getByAddress: function (a, h) { for (var f = this.$.documentElement, b = 0; f && b < a.length; b++) { var d = a[b]; if (h) for (var l = -1, k = 0; k < f.childNodes.length; k++) { var m = f.childNodes[k]; if (!0 !== h || 3 != m.nodeType || !m.previousSibling || 3 != m.previousSibling.nodeType) if (l++, l == d) { f = m; break } } else f = f.childNodes[d] } return f ? new CKEDITOR.dom.node(f) : null }, getElementsByTag: function (a, h) { CKEDITOR.env.ie && 8 >= document.documentMode || !h || (a = h + ":" + a); return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(a)) },
                    getHead: function () { var a = this.$.getElementsByTagName("head")[0]; return a = a ? new CKEDITOR.dom.element(a) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), !0) }, getBody: function () { return new CKEDITOR.dom.element(this.$.body) }, getDocumentElement: function () { return new CKEDITOR.dom.element(this.$.documentElement) }, getWindow: function () { return new CKEDITOR.dom.window(this.$.parentWindow || this.$.defaultView) }, write: function (a) {
                        this.$.open("text/html", "replace"); CKEDITOR.env.ie && (a = a.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i,
                            '$\x26\n\x3cscript data-cke-temp\x3d"1"\x3e(' + CKEDITOR.tools.fixDomain + ")();\x3c/script\x3e")); this.$.write(a); this.$.close()
                    }, find: function (a) { return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(a)) }, findOne: function (a) { return (a = this.$.querySelector(a)) ? new CKEDITOR.dom.element(a) : null }, _getHtml5ShivFrag: function () { var a = this.getCustomData("html5ShivFrag"); a || (a = this.$.createDocumentFragment(), CKEDITOR.tools.enableHtml5Elements(a, !0), this.setCustomData("html5ShivFrag", a)); return a }
                }); CKEDITOR.dom.nodeList =
                    function (a) { this.$ = a }; CKEDITOR.dom.nodeList.prototype = { count: function () { return this.$.length }, getItem: function (a) { return 0 > a || a >= this.$.length ? null : (a = this.$[a]) ? new CKEDITOR.dom.node(a) : null }, toArray: function () { return CKEDITOR.tools.array.map(this.$, function (a) { return new CKEDITOR.dom.node(a) }) } }; CKEDITOR.dom.element = function (a, h) { "string" == typeof a && (a = (h ? h.$ : document).createElement(a)); CKEDITOR.dom.domObject.call(this, a) }; CKEDITOR.dom.element.get = function (a) {
                        return (a = "string" == typeof a ? document.getElementById(a) ||
                            document.getElementsByName(a)[0] : a) && (a.$ ? a : new CKEDITOR.dom.element(a))
                    }; CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node; CKEDITOR.dom.element.createFromHtml = function (a, h) { var f = new CKEDITOR.dom.element("div", h); f.setHtml(a); return f.getFirst().remove() }; CKEDITOR.dom.element.setMarker = function (a, h, f, b) {
                        var d = h.getCustomData("list_marker_id") || h.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"), l = h.getCustomData("list_marker_names") || h.setCustomData("list_marker_names",
                            {}).getCustomData("list_marker_names"); a[d] = h; l[f] = 1; return h.setCustomData(f, b)
                    }; CKEDITOR.dom.element.clearAllMarkers = function (a) { for (var h in a) CKEDITOR.dom.element.clearMarkers(a, a[h], 1) }; CKEDITOR.dom.element.clearMarkers = function (a, h, f) { var b = h.getCustomData("list_marker_names"), d = h.getCustomData("list_marker_id"), l; for (l in b) h.removeCustomData(l); h.removeCustomData("list_marker_names"); f && (h.removeCustomData("list_marker_id"), delete a[d]) }; (function () {
                        function a(a, b) {
                            return -1 < (" " + a + " ").replace(l,
                                " ").indexOf(" " + b + " ")
                        } function h(a) { var b = !0; a.$.id || (a.$.id = "cke_tmp_" + CKEDITOR.tools.getNextNumber(), b = !1); return function () { b || a.removeAttribute("id") } } function f(a, b) { var e = CKEDITOR.tools.escapeCss(a.$.id); return "#" + e + " " + b.split(/,\s*/).join(", #" + e + " ") } function b(a) { for (var b = 0, e = 0, c = k[a].length; e < c; e++)b += parseFloat(this.getComputedStyle(k[a][e]) || 0, 10) || 0; return b } var d = document.createElement("_").classList, d = "undefined" !== typeof d && null !== String(d.add).match(/\[Native code\]/gi), l = /[\n\t\r]/g;
                        CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
                            type: CKEDITOR.NODE_ELEMENT, addClass: d ? function (a) { this.$.classList.add(a); return this } : function (b) { var g = this.$.className; g && (a(g, b) || (g += " " + b)); this.$.className = g || b; return this }, removeClass: d ? function (a) { var b = this.$; b.classList.remove(a); b.className || b.removeAttribute("class"); return this } : function (b) {
                                var g = this.getAttribute("class"); g && a(g, b) && ((g = g.replace(new RegExp("(?:^|\\s+)" + b + "(?\x3d\\s|$)"), "").replace(/^\s+/, "")) ? this.setAttribute("class",
                                    g) : this.removeAttribute("class")); return this
                            }, hasClass: function (b) { return a(this.$.className, b) }, append: function (a, b) { "string" == typeof a && (a = this.getDocument().createElement(a)); b ? this.$.insertBefore(a.$, this.$.firstChild) : this.$.appendChild(a.$); return a }, appendHtml: function (a) { if (this.$.childNodes.length) { var b = new CKEDITOR.dom.element("div", this.getDocument()); b.setHtml(a); b.moveChildren(this) } else this.setHtml(a) }, appendText: function (a) {
                                null != this.$.text && CKEDITOR.env.ie && 9 > CKEDITOR.env.version ?
                                this.$.text += a : this.append(new CKEDITOR.dom.text(a))
                            }, appendBogus: function (a) { if (a || CKEDITOR.env.needsBrFiller) { for (a = this.getLast(); a && a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(a.getText());)a = a.getPrevious(); a && a.is && a.is("br") || (a = this.getDocument().createElement("br"), CKEDITOR.env.gecko && a.setAttribute("type", "_moz"), this.append(a)) } }, breakParent: function (a, b) {
                                var e = new CKEDITOR.dom.range(this.getDocument()); e.setStartAfter(this); e.setEndAfter(a); var c = e.extractContents(!1, b || !1), d; e.insertNode(this.remove());
                                if (CKEDITOR.env.ie && !CKEDITOR.env.edge) { for (e = new CKEDITOR.dom.element("div"); d = c.getFirst();)d.$.style.backgroundColor && (d.$.style.backgroundColor = d.$.style.backgroundColor), e.append(d); e.insertAfter(this); e.remove(!0) } else c.insertAfterNode(this)
                            }, contains: document.compareDocumentPosition ? function (a) { return !!(this.$.compareDocumentPosition(a.$) & 16) } : function (a) { var b = this.$; return a.type != CKEDITOR.NODE_ELEMENT ? b.contains(a.getParent().$) : b != a.$ && b.contains(a.$) }, focus: function () {
                                function a() { try { this.$.focus() } catch (b) { } }
                                return function (b) { b ? CKEDITOR.tools.setTimeout(a, 100, this) : a.call(this) }
                            }(), getHtml: function () { var a = this.$.innerHTML; return CKEDITOR.env.ie ? a.replace(/<\?[^>]*>/g, "") : a }, getOuterHtml: function () { if (this.$.outerHTML) return this.$.outerHTML.replace(/<\?[^>]*>/, ""); var a = this.$.ownerDocument.createElement("div"); a.appendChild(this.$.cloneNode(!0)); return a.innerHTML }, getClientRect: function (a) {
                                var b = CKEDITOR.tools.extend({}, this.$.getBoundingClientRect()); !b.width && (b.width = b.right - b.left); !b.height &&
                                    (b.height = b.bottom - b.top); return a ? CKEDITOR.tools.getAbsoluteRectPosition(this.getWindow(), b) : b
                            }, setHtml: CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? function (a) { try { var b = this.$; if (this.getParent()) return b.innerHTML = a; var e = this.getDocument()._getHtml5ShivFrag(); e.appendChild(b); b.innerHTML = a; e.removeChild(b); return a } catch (c) { this.$.innerHTML = ""; b = new CKEDITOR.dom.element("body", this.getDocument()); b.$.innerHTML = a; for (b = b.getChildren(); b.count();)this.append(b.getItem(0)); return a } } : function (a) {
                                return this.$.innerHTML =
                                    a
                            }, setText: function () { var a = document.createElement("p"); a.innerHTML = "x"; a = a.textContent; return function (b) { this.$[a ? "textContent" : "innerText"] = b } }(), getAttribute: function () {
                                var a = function (a) { return this.$.getAttribute(a, 2) }; return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (a) {
                                    switch (a) {
                                        case "class": a = "className"; break; case "http-equiv": a = "httpEquiv"; break; case "name": return this.$.name; case "tabindex": return a = this.$.getAttribute(a, 2), 0 !== a && 0 === this.$.tabIndex && (a = null),
                                            a; case "checked": return a = this.$.attributes.getNamedItem(a), (a.specified ? a.nodeValue : this.$.checked) ? "checked" : null; case "hspace": case "value": return this.$[a]; case "style": return this.$.style.cssText; case "contenteditable": case "contentEditable": return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") : null
                                    }return this.$.getAttribute(a, 2)
                                } : a
                            }(), getAttributes: function (a) {
                                var b = {}, e = this.$.attributes, c; a = CKEDITOR.tools.isArray(a) ? a : []; for (c = 0; c < e.length; c++)-1 ===
                                    CKEDITOR.tools.indexOf(a, e[c].name) && (b[e[c].name] = e[c].value); return b
                            }, getChildren: function () { return new CKEDITOR.dom.nodeList(this.$.childNodes) }, getClientSize: function () { return { width: this.$.clientWidth, height: this.$.clientHeight } }, getComputedStyle: document.defaultView && document.defaultView.getComputedStyle ? function (a) { var b = this.getWindow().$.getComputedStyle(this.$, null); return b ? b.getPropertyValue(a) : "" } : function (a) { return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)] }, getDtd: function () {
                                var a =
                                    CKEDITOR.dtd[this.getName()]; this.getDtd = function () { return a }; return a
                            }, getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag, getTabIndex: function () { var a = this.$.tabIndex; return 0 !== a || CKEDITOR.dtd.$tabIndex[this.getName()] || 0 === parseInt(this.getAttribute("tabindex"), 10) ? a : -1 }, getText: function () { return this.$.textContent || this.$.innerText || "" }, getWindow: function () { return this.getDocument().getWindow() }, getId: function () { return this.$.id || null }, getNameAtt: function () {
                                return this.$.name ||
                                    null
                            }, getName: function () { var a = this.$.nodeName.toLowerCase(); if (CKEDITOR.env.ie && 8 >= document.documentMode) { var b = this.$.scopeName; "HTML" != b && (a = b.toLowerCase() + ":" + a) } this.getName = function () { return a }; return this.getName() }, getValue: function () { return this.$.value }, getFirst: function (a) { var b = this.$.firstChild; (b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getNext(a)); return b }, getLast: function (a) { var b = this.$.lastChild; (b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getPrevious(a)); return b }, getStyle: function (a) { return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] },
                            is: function () { var a = this.getName(); if ("object" == typeof arguments[0]) return !!arguments[0][a]; for (var b = 0; b < arguments.length; b++)if (arguments[b] == a) return !0; return !1 }, isEditable: function (a) {
                                var b = this.getName(); return this.isReadOnly() || "none" == this.getComputedStyle("display") || "hidden" == this.getComputedStyle("visibility") || CKEDITOR.dtd.$nonEditable[b] || CKEDITOR.dtd.$empty[b] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount() ? !1 : !1 !== a ? (a = CKEDITOR.dtd[b] ||
                                    CKEDITOR.dtd.span, !(!a || !a["#"])) : !0
                            }, isIdentical: function (a) {
                                var b = this.clone(0, 1); a = a.clone(0, 1); b.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]); a.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]); if (b.$.isEqualNode) return b.$.style.cssText = CKEDITOR.tools.normalizeCssText(b.$.style.cssText), a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText), b.$.isEqualNode(a.$); b = b.getOuterHtml(); a =
                                    a.getOuterHtml(); if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version && this.is("a")) { var e = this.getParent(); e.type == CKEDITOR.NODE_ELEMENT && (e = e.clone(), e.setHtml(b), b = e.getHtml(), e.setHtml(a), a = e.getHtml()) } return b == a
                            }, isVisible: function () { var a = (this.$.offsetHeight || this.$.offsetWidth) && "hidden" != this.getComputedStyle("visibility"), b, e; a && CKEDITOR.env.webkit && (b = this.getWindow(), !b.equals(CKEDITOR.document.getWindow()) && (e = b.$.frameElement) && (a = (new CKEDITOR.dom.element(e)).isVisible())); return !!a }, isEmptyInlineRemoveable: function () {
                                if (!CKEDITOR.dtd.$removeEmpty[this.getName()]) return !1;
                                for (var a = this.getChildren(), b = 0, e = a.count(); b < e; b++) { var c = a.getItem(b); if (c.type != CKEDITOR.NODE_ELEMENT || !c.data("cke-bookmark")) if (c.type == CKEDITOR.NODE_ELEMENT && !c.isEmptyInlineRemoveable() || c.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(c.getText())) return !1 } return !0
                            }, hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function () {
                                for (var a = this.$.attributes, b = 0; b < a.length; b++) {
                                    var e = a[b]; switch (e.nodeName) {
                                        case "class": if (this.getAttribute("class")) return !0; case "data-cke-expando": continue;
                                        default: if (e.specified) return !0
                                    }
                                } return !1
                            } : function () { var a = this.$.attributes, b = a.length, e = { "data-cke-expando": 1, _moz_dirty: 1 }; return 0 < b && (2 < b || !e[a[0].nodeName] || 2 == b && !e[a[1].nodeName]) }, hasAttribute: function () {
                                function a(b) {
                                    var e = this.$.attributes.getNamedItem(b); if ("input" == this.getName()) switch (b) { case "class": return 0 < this.$.className.length; case "checked": return !!this.$.checked; case "value": return b = this.getAttribute("type"), "checkbox" == b || "radio" == b ? "on" != this.$.value : !!this.$.value }return e ?
                                        e.specified : !1
                                } return CKEDITOR.env.ie ? 8 > CKEDITOR.env.version ? function (b) { return "name" == b ? !!this.$.name : a.call(this, b) } : a : function (a) { return !!this.$.attributes.getNamedItem(a) }
                            }(), hide: function () { this.setStyle("display", "none") }, moveChildren: function (a, b) { var e = this.$; a = a.$; if (e != a) { var c; if (b) for (; c = e.lastChild;)a.insertBefore(e.removeChild(c), a.firstChild); else for (; c = e.firstChild;)a.appendChild(e.removeChild(c)) } }, mergeSiblings: function () {
                                function a(b, e, c) {
                                    if (e && e.type == CKEDITOR.NODE_ELEMENT) {
                                        for (var d =
                                            []; e.data("cke-bookmark") || e.isEmptyInlineRemoveable();)if (d.push(e), e = c ? e.getNext() : e.getPrevious(), !e || e.type != CKEDITOR.NODE_ELEMENT) return; if (b.isIdentical(e)) { for (var k = c ? b.getLast() : b.getFirst(); d.length;)d.shift().move(b, !c); e.moveChildren(b, !c); e.remove(); k && k.type == CKEDITOR.NODE_ELEMENT && k.mergeSiblings() }
                                    }
                                } return function (b) { if (!1 === b || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) a(this, this.getNext(), !0), a(this, this.getPrevious()) }
                            }(), show: function () {
                                this.setStyles({
                                    display: "",
                                    visibility: ""
                                })
                            }, setAttribute: function () {
                                var a = function (a, b) { this.$.setAttribute(a, b); return this }; return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (b, e) { "class" == b ? this.$.className = e : "style" == b ? this.$.style.cssText = e : "tabindex" == b ? this.$.tabIndex = e : "checked" == b ? this.$.checked = e : "contenteditable" == b ? a.call(this, "contentEditable", e) : a.apply(this, arguments); return this } : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function (b, e) {
                                    if ("src" == b && e.match(/^http:\/\//)) try {
                                        a.apply(this,
                                            arguments)
                                    } catch (c) { } else a.apply(this, arguments); return this
                                } : a
                            }(), setAttributes: function (a) { for (var b in a) this.setAttribute(b, a[b]); return this }, setValue: function (a) { this.$.value = a; return this }, removeAttribute: function () { var a = function (a) { this.$.removeAttribute(a) }; return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (a) { "class" == a ? a = "className" : "tabindex" == a ? a = "tabIndex" : "contenteditable" == a && (a = "contentEditable"); this.$.removeAttribute(a) } : a }(), removeAttributes: function (a) {
                                if (CKEDITOR.tools.isArray(a)) for (var b =
                                    0; b < a.length; b++)this.removeAttribute(a[b]); else for (b in a = a || this.getAttributes(), a) a.hasOwnProperty(b) && this.removeAttribute(b)
                            }, removeStyle: function (a) {
                                var b = this.$.style; if (b.removeProperty || "border" != a && "margin" != a && "padding" != a) b.removeProperty ? b.removeProperty(a) : b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a)), this.$.style.cssText || this.removeAttribute("style"); else {
                                    var e = ["top", "left", "right", "bottom"], c; "border" == a && (c = ["color", "style", "width"]); for (var b = [], d = 0; d < e.length; d++)if (c) for (var k =
                                        0; k < c.length; k++)b.push([a, e[d], c[k]].join("-")); else b.push([a, e[d]].join("-")); for (a = 0; a < b.length; a++)this.removeStyle(b[a])
                                }
                            }, setStyle: function (a, b) { this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] = b; return this }, setStyles: function (a) { for (var b in a) this.setStyle(b, a[b]); return this }, setOpacity: function (a) { CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? (a = Math.round(100 * a), this.setStyle("filter", 100 <= a ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity\x3d" + a + ")")) : this.setStyle("opacity", a) }, unselectable: function () {
                                this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select",
                                    "none")); if (CKEDITOR.env.ie) { this.setAttribute("unselectable", "on"); for (var a, b = this.getElementsByTag("*"), e = 0, c = b.count(); e < c; e++)a = b.getItem(e), a.setAttribute("unselectable", "on") }
                            }, getPositionedAncestor: function () { for (var a = this; "html" != a.getName();) { if ("static" != a.getComputedStyle("position")) return a; a = a.getParent() } return null }, getDocumentPosition: function (a) {
                                var b = 0, e = 0, c = this.getDocument(), d = c.getBody(), k = "BackCompat" == c.$.compatMode; if (document.documentElement.getBoundingClientRect && (CKEDITOR.env.ie ?
                                    8 !== CKEDITOR.env.version : 1)) { var f = this.$.getBoundingClientRect(), l = c.$.documentElement, h = l.clientTop || d.$.clientTop || 0, r = l.clientLeft || d.$.clientLeft || 0, A = !0; CKEDITOR.env.ie && (A = c.getDocumentElement().contains(this), c = c.getBody().contains(this), A = k && c || !k && A); A && (CKEDITOR.env.webkit || CKEDITOR.env.ie && 12 <= CKEDITOR.env.version ? (b = d.$.scrollLeft || l.scrollLeft, e = d.$.scrollTop || l.scrollTop) : (e = k ? d.$ : l, b = e.scrollLeft, e = e.scrollTop), b = f.left + b - r, e = f.top + e - h) } else for (h = this, r = null; h && "body" != h.getName() &&
                                        "html" != h.getName();) { b += h.$.offsetLeft - h.$.scrollLeft; e += h.$.offsetTop - h.$.scrollTop; h.equals(this) || (b += h.$.clientLeft || 0, e += h.$.clientTop || 0); for (; r && !r.equals(h);)b -= r.$.scrollLeft, e -= r.$.scrollTop, r = r.getParent(); r = h; h = (f = h.$.offsetParent) ? new CKEDITOR.dom.element(f) : null } a && (f = this.getWindow(), h = a.getWindow(), !f.equals(h) && f.$.frameElement && (a = (new CKEDITOR.dom.element(f.$.frameElement)).getDocumentPosition(a), b += a.x, e += a.y)); document.documentElement.getBoundingClientRect || !CKEDITOR.env.gecko ||
                                            k || (b += this.$.clientLeft ? 1 : 0, e += this.$.clientTop ? 1 : 0); return { x: b, y: e }
                            }, scrollIntoView: function (a) { var b = this.getParent(); if (b) { do if ((b.$.clientWidth && b.$.clientWidth < b.$.scrollWidth || b.$.clientHeight && b.$.clientHeight < b.$.scrollHeight) && !b.is("body") && this.scrollIntoParent(b, a, 1), b.is("html")) { var e = b.getWindow(); try { var c = e.$.frameElement; c && (b = new CKEDITOR.dom.element(c)) } catch (d) { } } while (b = b.getParent()) } }, scrollIntoParent: function (a, b, e) {
                                var c, d, k, f; function l(c, b) {
                                    /body|html/.test(a.getName()) ?
                                    a.getWindow().$.scrollBy(c, b) : (a.$.scrollLeft += c, a.$.scrollTop += b)
                                } function h(a, c) { var b = { x: 0, y: 0 }; if (!a.is(A ? "body" : "html")) { var g = a.$.getBoundingClientRect(); b.x = g.left; b.y = g.top } g = a.getWindow(); g.equals(c) || (g = h(CKEDITOR.dom.element.get(g.$.frameElement), c), b.x += g.x, b.y += g.y); return b } function r(a, b) { return parseInt(a.getComputedStyle("margin-" + b) || 0, 10) || 0 } !a && (a = this.getWindow()); k = a.getDocument(); var A = "BackCompat" == k.$.compatMode; a instanceof CKEDITOR.dom.window && (a = A ? k.getBody() : k.getDocumentElement());
                                CKEDITOR.env.webkit && (k = this.getEditor(!1)) && (k._.previousScrollTop = null); k = a.getWindow(); d = h(this, k); var v = h(a, k), D = this.$.offsetHeight; c = this.$.offsetWidth; var t = a.$.clientHeight, y = a.$.clientWidth; k = d.x - r(this, "left") - v.x || 0; f = d.y - r(this, "top") - v.y || 0; c = d.x + c + r(this, "right") - (v.x + y) || 0; d = d.y + D + r(this, "bottom") - (v.y + t) || 0; (0 > f || 0 < d) && l(0, !0 === b ? f : !1 === b ? d : 0 > f ? f : d); e && (0 > k || 0 < c) && l(0 > k ? k : c, 0)
                            }, setState: function (a, b, e) {
                                b = b || "cke"; switch (a) {
                                    case CKEDITOR.TRISTATE_ON: this.addClass(b + "_on"); this.removeClass(b +
                                        "_off"); this.removeClass(b + "_disabled"); e && this.setAttribute("aria-pressed", !0); e && this.removeAttribute("aria-disabled"); break; case CKEDITOR.TRISTATE_DISABLED: this.addClass(b + "_disabled"); this.removeClass(b + "_off"); this.removeClass(b + "_on"); e && this.setAttribute("aria-disabled", !0); e && this.removeAttribute("aria-pressed"); break; default: this.addClass(b + "_off"), this.removeClass(b + "_on"), this.removeClass(b + "_disabled"), e && this.removeAttribute("aria-pressed"), e && this.removeAttribute("aria-disabled")
                                }
                            },
                            getFrameDocument: function () { var a = this.$; try { a.contentWindow.document } catch (b) { a.src = a.src } return a && new CKEDITOR.dom.document(a.contentWindow.document) }, copyAttributes: function (a, b) {
                                var e = this.$.attributes; b = b || {}; for (var c = 0; c < e.length; c++) { var d = e[c], k = d.nodeName.toLowerCase(), f; if (!(k in b)) if ("checked" == k && (f = this.getAttribute(k))) a.setAttribute(k, f); else if (!CKEDITOR.env.ie || this.hasAttribute(k)) f = this.getAttribute(k), null === f && (f = d.nodeValue), a.setAttribute(k, f) } "" !== this.$.style.cssText &&
                                    (a.$.style.cssText = this.$.style.cssText)
                            }, renameNode: function (a) { if (this.getName() != a) { var b = this.getDocument(); a = new CKEDITOR.dom.element(a, b); this.copyAttributes(a); this.moveChildren(a); this.getParent(!0) && this.$.parentNode.replaceChild(a.$, this.$); a.$["data-cke-expando"] = this.$["data-cke-expando"]; this.$ = a.$; delete this.getName } }, getChild: function () {
                                function a(b, e) { var c = b.childNodes; if (0 <= e && e < c.length) return c[e] } return function (b) {
                                    var e = this.$; if (b.slice) for (b = b.slice(); 0 < b.length && e;)e = a(e,
                                        b.shift()); else e = a(e, b); return e ? new CKEDITOR.dom.node(e) : null
                                }
                            }(), getChildCount: function () { return this.$.childNodes.length }, disableContextMenu: function () { function a(b) { return b.type == CKEDITOR.NODE_ELEMENT && b.hasClass("cke_enable_context_menu") } this.on("contextmenu", function (b) { b.data.getTarget().getAscendant(a, !0) || b.data.preventDefault() }) }, getDirection: function (a) {
                                return a ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir ||
                                    "ltr" : this.getStyle("direction") || this.getAttribute("dir")
                            }, data: function (a, b) { a = "data-" + a; if (void 0 === b) return this.getAttribute(a); !1 === b ? this.removeAttribute(a) : this.setAttribute(a, b); return null }, getEditor: function (a) { var b = CKEDITOR.instances, e, c, d; a = a || void 0 === a; for (e in b) if (c = b[e], c.element.equals(this) && c.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || !a && (d = c.editable()) && (d.equals(this) || d.contains(this))) return c; return null }, find: function (a) {
                                var b = h(this); a = new CKEDITOR.dom.nodeList(this.$.querySelectorAll(f(this,
                                    a))); b(); return a
                            }, findOne: function (a) { var b = h(this); a = this.$.querySelector(f(this, a)); b(); return a ? new CKEDITOR.dom.element(a) : null }, forEach: function (a, b, e) { if (!(e || b && this.type != b)) var c = a(this); if (!1 !== c) { e = this.getChildren(); for (var d = 0; d < e.count(); d++)c = e.getItem(d), c.type == CKEDITOR.NODE_ELEMENT ? c.forEach(a, b) : b && c.type != b || a(c) } }, fireEventHandler: function (a, b) {
                                var e = "on" + a, c = this.$; if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version) {
                                    var d = c.ownerDocument.createEventObject(), k; for (k in b) d[k] = b[k]; c.fireEvent(e,
                                        d)
                                } else c[c[a] ? a : e](b)
                            }, isDetached: function () { var a = this.getDocument(), b = a.getDocumentElement(); return b.equals(this) || b.contains(this) ? !CKEDITOR.env.ie || 8 < CKEDITOR.env.version && !CKEDITOR.env.quirks ? !a.$.defaultView : !1 : !0 }
                        }); var k = { width: ["border-left-width", "border-right-width", "padding-left", "padding-right"], height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"] }; CKEDITOR.dom.element.prototype.setSize = function (a, g, e) {
                            "number" == typeof g && (!e || CKEDITOR.env.ie && CKEDITOR.env.quirks ||
                                (g -= b.call(this, a)), this.setStyle(a, g + "px"))
                        }; CKEDITOR.dom.element.prototype.getSize = function (a, g) { var e = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(a)], this.$["client" + CKEDITOR.tools.capitalize(a)]) || 0; g && (e -= b.call(this, a)); return e }
                    })(); CKEDITOR.dom.documentFragment = function (a) { a = a || CKEDITOR.document; this.$ = a.type == CKEDITOR.NODE_DOCUMENT ? a.$.createDocumentFragment() : a }; CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.element.prototype, {
                        type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
                        insertAfterNode: function (a) { a = a.$; a.parentNode.insertBefore(this.$, a.nextSibling) }, getHtml: function () { var a = new CKEDITOR.dom.element("div"); this.clone(1, 1).appendTo(a); return a.getHtml().replace(/\s*data-cke-expando=".*?"/g, "") }
                    }, !0, { append: 1, appendBogus: 1, clone: 1, getFirst: 1, getHtml: 1, getLast: 1, getParent: 1, getNext: 1, getPrevious: 1, appendTo: 1, moveChildren: 1, insertBefore: 1, insertAfterNode: 1, replace: 1, trim: 1, type: 1, ltrim: 1, rtrim: 1, getDocument: 1, getChildCount: 1, getChild: 1, getChildren: 1 }); CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype,
                        CKEDITOR.dom.document.prototype, !0, { find: 1, findOne: 1 }); (function () {
                            function a(a, b) {
                                var c = this.range; if (this._.end) return null; if (!this._.start) { this._.start = 1; if (c.collapsed) return this.end(), null; c.optimize() } var e, g = c.startContainer; e = c.endContainer; var d = c.startOffset, k = c.endOffset, f, l = this.guard, n = this.type, h = a ? "getPreviousSourceNode" : "getNextSourceNode"; if (!a && !this._.guardLTR) {
                                    var m = e.type == CKEDITOR.NODE_ELEMENT ? e : e.getParent(), C = e.type == CKEDITOR.NODE_ELEMENT ? e.getChild(k) : e.getNext(); this._.guardLTR =
                                        function (a, b) { return (!b || !m.equals(a)) && (!C || !a.equals(C)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root)) }
                                } if (a && !this._.guardRTL) { var E = g.type == CKEDITOR.NODE_ELEMENT ? g : g.getParent(), G = g.type == CKEDITOR.NODE_ELEMENT ? d ? g.getChild(d - 1) : null : g.getPrevious(); this._.guardRTL = function (a, b) { return (!b || !E.equals(a)) && (!G || !a.equals(G)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root)) } } var H = a ? this._.guardRTL : this._.guardLTR; f = l ? function (a, b) { return !1 === H(a, b) ? !1 : l(a, b) } : H; this.current ? e = this.current[h](!1,
                                    n, f) : (a ? e.type == CKEDITOR.NODE_ELEMENT && (e = 0 < k ? e.getChild(k - 1) : !1 === f(e, !0) ? null : e.getPreviousSourceNode(!0, n, f)) : (e = g, e.type == CKEDITOR.NODE_ELEMENT && ((e = e.getChild(d)) || (e = !1 === f(g, !0) ? null : g.getNextSourceNode(!0, n, f)))), e && !1 === f(e) && (e = null)); for (; e && !this._.end;) { this.current = e; if (!this.evaluator || !1 !== this.evaluator(e)) { if (!b) return e } else if (b && this.evaluator) return !1; e = e[h](!1, n, f) } this.end(); return this.current = null
                            } function h(b) { for (var c, e = null; c = a.call(this, b);)e = c; return e } CKEDITOR.dom.walker =
                                CKEDITOR.tools.createClass({ $: function (a) { this.range = a; this._ = {} }, proto: { end: function () { this._.end = 1 }, next: function () { return a.call(this) }, previous: function () { return a.call(this, 1) }, checkForward: function () { return !1 !== a.call(this, 0, 1) }, checkBackward: function () { return !1 !== a.call(this, 1, 1) }, lastForward: function () { return h.call(this) }, lastBackward: function () { return h.call(this, 1) }, reset: function () { delete this.current; this._ = {} } } }); var f = {
                                    block: 1, "list-item": 1, table: 1, "table-row-group": 1, "table-header-group": 1,
                                    "table-footer-group": 1, "table-row": 1, "table-column-group": 1, "table-column": 1, "table-cell": 1, "table-caption": 1
                                }, b = { absolute: 1, fixed: 1 }; CKEDITOR.dom.element.prototype.isBlockBoundary = function (a) { return "none" != this.getComputedStyle("float") || this.getComputedStyle("position") in b || !f[this.getComputedStyle("display")] ? !!(this.is(CKEDITOR.dtd.$block) || a && this.is(a)) : !0 }; CKEDITOR.dom.walker.blockBoundary = function (a) { return function (b) { return !(b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary(a)) } }; CKEDITOR.dom.walker.listItemBoundary =
                                    function () { return this.blockBoundary({ br: 1 }) }; CKEDITOR.dom.walker.bookmark = function (a, b) { function c(a) { return a && a.getName && "span" == a.getName() && a.data("cke-bookmark") } return function (e) { var g, d; g = e && e.type != CKEDITOR.NODE_ELEMENT && (d = e.getParent()) && c(d); g = a ? g : g || c(e); return !!(b ^ g) } }; CKEDITOR.dom.walker.whitespaces = function (a) {
                                        return function (b) {
                                            var c; b && b.type == CKEDITOR.NODE_TEXT && (c = !CKEDITOR.tools.trim(b.getText()) || CKEDITOR.env.webkit && b.getText() == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE);
                                            return !!(a ^ c)
                                        }
                                    }; CKEDITOR.dom.walker.invisible = function (a) { var b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.env.webkit ? 1 : 0; return function (e) { b(e) ? e = 1 : (e.type == CKEDITOR.NODE_TEXT && (e = e.getParent()), e = e.$.offsetWidth <= c); return !!(a ^ e) } }; CKEDITOR.dom.walker.nodeType = function (a, b) { return function (c) { return !!(b ^ c.type == a) } }; CKEDITOR.dom.walker.bogus = function (a) {
                                        function b(a) { return !l(a) && !k(a) } return function (c) {
                                            var e = CKEDITOR.env.needsBrFiller ? c.is && c.is("br") : c.getText && d.test(c.getText()); e && (e = c.getParent(),
                                                c = c.getNext(b), e = e.isBlockBoundary() && (!c || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary())); return !!(a ^ e)
                                        }
                                    }; CKEDITOR.dom.walker.temp = function (a) { return function (b) { b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent()); b = b && b.hasAttribute("data-cke-temp"); return !!(a ^ b) } }; var d = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, l = CKEDITOR.dom.walker.whitespaces(), k = CKEDITOR.dom.walker.bookmark(), m = CKEDITOR.dom.walker.temp(), g = function (a) { return k(a) || l(a) || a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$inline) && !a.is(CKEDITOR.dtd.$empty) };
                            CKEDITOR.dom.walker.ignored = function (a) { return function (b) { b = l(b) || k(b) || m(b); return !!(a ^ b) } }; var e = CKEDITOR.dom.walker.ignored(); CKEDITOR.dom.walker.empty = function (a) { return function (b) { for (var c = 0, g = b.getChildCount(); c < g; ++c)if (!e(b.getChild(c))) return !!a; return !a } }; var c = CKEDITOR.dom.walker.empty(), n = CKEDITOR.dom.walker.validEmptyBlockContainers = CKEDITOR.tools.extend(function (a) { var b = {}, c; for (c in a) CKEDITOR.dtd[c]["#"] && (b[c] = 1); return b }(CKEDITOR.dtd.$block), { caption: 1, td: 1, th: 1 }); CKEDITOR.dom.walker.editable =
                                function (a) { return function (b) { b = e(b) ? !1 : b.type == CKEDITOR.NODE_TEXT || b.type == CKEDITOR.NODE_ELEMENT && (b.is(CKEDITOR.dtd.$inline) || b.is("hr") || "false" == b.getAttribute("contenteditable") || !CKEDITOR.env.needsBrFiller && b.is(n) && c(b)) ? !0 : !1; return !!(a ^ b) } }; CKEDITOR.dom.element.prototype.getBogus = function () { var a = this; do a = a.getPreviousSourceNode(); while (g(a)); return a && (CKEDITOR.env.needsBrFiller ? a.is && a.is("br") : a.getText && d.test(a.getText())) ? a : !1 }
                        })(); CKEDITOR.dom.range = function (a) {
                            this.endOffset = this.endContainer =
                                this.startOffset = this.startContainer = null; this.collapsed = !0; var h = a instanceof CKEDITOR.dom.document; this.document = h ? a : a.getDocument(); this.root = h ? a.getBody() : a
                        }; (function () {
                            function a(a) { a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) && a.startOffset == a.endOffset } function h(a, b, e, g, d) {
                                function k(a, b, c, e) { var g = c ? a.getPrevious() : a.getNext(); if (e && h) return g; t || e ? b.append(a.clone(!0, d), c) : (a.remove(), m && b.append(a, c)); return g } function f() {
                                    var a, b, c, e = Math.min(I.length,
                                        F.length); for (a = 0; a < e; a++)if (b = I[a], c = F[a], !b.equals(c)) return a; return a - 1
                                } function l() {
                                    var b = P - 1, e = H && L && !y.equals(z); b < M - 1 || b < O - 1 || e ? (e ? a.moveToPosition(z, CKEDITOR.POSITION_BEFORE_START) : O == b + 1 && G ? a.moveToPosition(F[b], CKEDITOR.POSITION_BEFORE_END) : a.moveToPosition(F[b + 1], CKEDITOR.POSITION_BEFORE_START), g && (b = I[b + 1]) && b.type == CKEDITOR.NODE_ELEMENT && (e = CKEDITOR.dom.element.createFromHtml('\x3cspan data-cke-bookmark\x3d"1" style\x3d"display:none"\x3e\x26nbsp;\x3c/span\x3e', a.document), e.insertAfter(b),
                                        b.mergeSiblings(!1), a.moveToBookmark({ startNode: e }))) : a.collapse(!0)
                                } a.optimizeBookmark(); var h = 0 === b, m = 1 == b, t = 2 == b; b = t || m; var y = a.startContainer, z = a.endContainer, B = a.startOffset, C = a.endOffset, E, G, H, L, K, S; if (t && z.type == CKEDITOR.NODE_TEXT && (y.equals(z) || y.type === CKEDITOR.NODE_ELEMENT && y.getFirst().equals(z))) e.append(a.document.createText(z.substring(B, C))); else {
                                    z.type == CKEDITOR.NODE_TEXT ? t ? S = !0 : z = z.split(C) : 0 < z.getChildCount() ? C >= z.getChildCount() ? (z = z.getChild(C - 1), G = !0) : z = z.getChild(C) : L = G = !0; y.type ==
                                        CKEDITOR.NODE_TEXT ? t ? K = !0 : y.split(B) : 0 < y.getChildCount() ? 0 === B ? (y = y.getChild(B), E = !0) : y = y.getChild(B - 1) : H = E = !0; for (var I = y.getParents(), F = z.getParents(), P = f(), M = I.length - 1, O = F.length - 1, N = e, X, T, Y, da = -1, U = P; U <= M; U++) { T = I[U]; Y = T.getNext(); for (U != M || T.equals(F[U]) && M < O ? b && (X = N.append(T.clone(0, d))) : E ? k(T, N, !1, H) : K && N.append(a.document.createText(T.substring(B))); Y;) { if (Y.equals(F[U])) { da = U; break } Y = k(Y, N) } N = X } N = e; for (U = P; U <= O; U++)if (e = F[U], Y = e.getPrevious(), e.equals(I[U])) b && (N = N.getChild(0)); else {
                                            U !=
                                            O || e.equals(I[U]) && O < M ? b && (X = N.append(e.clone(0, d))) : G ? k(e, N, !1, L) : S && N.append(a.document.createText(e.substring(0, C))); if (U > da) for (; Y;)Y = k(Y, N, !0); N = X
                                        } t || l()
                                }
                            } function f() { var a = !1, b = CKEDITOR.dom.walker.whitespaces(), e = CKEDITOR.dom.walker.bookmark(!0), g = CKEDITOR.dom.walker.bogus(); return function (d) { return e(d) || b(d) ? !0 : g(d) && !a ? a = !0 : d.type == CKEDITOR.NODE_TEXT && (d.hasAscendant("pre") || CKEDITOR.tools.trim(d.getText()).length) || d.type == CKEDITOR.NODE_ELEMENT && !d.is(l) ? !1 : !0 } } function b(a) {
                                var b = CKEDITOR.dom.walker.whitespaces(),
                                e = CKEDITOR.dom.walker.bookmark(1); return function (g) { return e(g) || b(g) ? !0 : !a && k(g) || g.type == CKEDITOR.NODE_ELEMENT && g.is(CKEDITOR.dtd.$removeEmpty) }
                            } function d(a) { return function () { var b; return this[a ? "getPreviousNode" : "getNextNode"](function (a) { !b && e(a) && (b = a); return g(a) && !(k(a) && a.equals(b)) }) } } var l = { abbr: 1, acronym: 1, b: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1, q: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, tt: 1, u: 1, "var": 1 }, k = CKEDITOR.dom.walker.bogus(),
                                m = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, g = CKEDITOR.dom.walker.editable(), e = CKEDITOR.dom.walker.ignored(!0); CKEDITOR.dom.range.prototype = {
                                    clone: function () { var a = new CKEDITOR.dom.range(this.root); a._setStartContainer(this.startContainer); a.startOffset = this.startOffset; a._setEndContainer(this.endContainer); a.endOffset = this.endOffset; a.collapsed = this.collapsed; return a }, collapse: function (a) {
                                        a ? (this._setEndContainer(this.startContainer), this.endOffset = this.startOffset) : (this._setStartContainer(this.endContainer),
                                            this.startOffset = this.endOffset); this.collapsed = !0
                                    }, cloneContents: function (a) { var b = new CKEDITOR.dom.documentFragment(this.document); this.collapsed || h(this, 2, b, !1, "undefined" == typeof a ? !0 : a); return b }, deleteContents: function (a) { this.collapsed || h(this, 0, null, a) }, extractContents: function (a, b) { var e = new CKEDITOR.dom.documentFragment(this.document); this.collapsed || h(this, 1, e, a, "undefined" == typeof b ? !0 : b); return e }, equals: function (a) {
                                        return this.startOffset === a.startOffset && this.endOffset === a.endOffset &&
                                            this.startContainer.equals(a.startContainer) && this.endContainer.equals(a.endContainer)
                                    }, createBookmark: function (a) {
                                        function b(a) { return a.getAscendant(function (a) { var b; if (b = a.data && a.data("cke-temp")) b = -1 === CKEDITOR.tools.array.indexOf(["cke_copybin", "cke_pastebin"], a.getAttribute("id")); return b }, !0) } var e = this.startContainer, g = this.endContainer, d = this.collapsed, k, f, l, h; k = this.document.createElement("span"); k.data("cke-bookmark", 1); k.setStyle("display", "none"); k.setHtml("\x26nbsp;"); a && (l = "cke_bm_" +
                                            CKEDITOR.tools.getNextNumber(), k.setAttribute("id", l + (d ? "C" : "S"))); d || (f = k.clone(), f.setHtml("\x26nbsp;"), a && f.setAttribute("id", l + "E"), h = this.clone(), b(g) && (g = b(g), h.moveToPosition(g, CKEDITOR.POSITION_AFTER_END)), h.collapse(), h.insertNode(f)); h = this.clone(); b(e) && (g = b(e), h.moveToPosition(g, CKEDITOR.POSITION_BEFORE_START)); h.collapse(!0); h.insertNode(k); f ? (this.setStartAfter(k), this.setEndBefore(f)) : this.moveToPosition(k, CKEDITOR.POSITION_AFTER_END); return {
                                                startNode: a ? l + (d ? "C" : "S") : k, endNode: a ? l +
                                                    "E" : f, serializable: a, collapsed: d
                                            }
                                    }, createBookmark2: function () {
                                        function a(b) {
                                            var c = b.container, g = b.offset, d; d = c; var k = g; d = d.type != CKEDITOR.NODE_ELEMENT || 0 === k || k == d.getChildCount() ? 0 : d.getChild(k - 1).type == CKEDITOR.NODE_TEXT && d.getChild(k).type == CKEDITOR.NODE_TEXT; d && (c = c.getChild(g - 1), g = c.getLength()); if (c.type == CKEDITOR.NODE_ELEMENT && 0 < g) { a: { for (d = c; g--;)if (k = d.getChild(g).getIndex(!0), 0 <= k) { g = k; break a } g = -1 } g += 1 } if (c.type == CKEDITOR.NODE_TEXT) {
                                                d = c; for (k = 0; (d = d.getPrevious()) && d.type == CKEDITOR.NODE_TEXT;)k +=
                                                    d.getText().replace(CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE, "").length; d = k; c.isEmpty() ? (k = c.getPrevious(e), d ? (g = d, c = k ? k.getNext() : c.getParent().getFirst()) : (c = c.getParent(), g = k ? k.getIndex(!0) + 1 : 0)) : g += d
                                            } b.container = c; b.offset = g
                                        } function b(a, c) { var e = c.getCustomData("cke-fillingChar"); if (e) { var g = a.container; e.equals(g) && (a.offset -= CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE.length, 0 >= a.offset && (a.offset = g.getIndex(), a.container = g.getParent())) } } var e = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT,
                                            !0); return function (e) { var g = this.collapsed, d = { container: this.startContainer, offset: this.startOffset }, k = { container: this.endContainer, offset: this.endOffset }; e && (a(d), b(d, this.root), g || (a(k), b(k, this.root))); return { start: d.container.getAddress(e), end: g ? null : k.container.getAddress(e), startOffset: d.offset, endOffset: k.offset, normalized: e, collapsed: g, is2: !0 } }
                                    }(), moveToBookmark: function (a) {
                                        if (a.is2) {
                                            var b = this.document.getByAddress(a.start, a.normalized), e = a.startOffset, g = a.end && this.document.getByAddress(a.end,
                                                a.normalized); a = a.endOffset; this.setStart(b, e); g ? this.setEnd(g, a) : this.collapse(!0)
                                        } else b = (e = a.serializable) ? this.document.getById(a.startNode) : a.startNode, a = e ? this.document.getById(a.endNode) : a.endNode, this.setStartBefore(b), b.remove(), a ? (this.setEndBefore(a), a.remove()) : this.collapse(!0)
                                    }, getBoundaryNodes: function () {
                                        var a = this.startContainer, b = this.endContainer, e = this.startOffset, g = this.endOffset, d; if (a.type == CKEDITOR.NODE_ELEMENT) if (d = a.getChildCount(), d > e) a = a.getChild(e); else if (1 > d) a = a.getPreviousSourceNode();
                                        else { for (a = a.$; a.lastChild;)a = a.lastChild; a = new CKEDITOR.dom.node(a); a = a.getNextSourceNode() || a } if (b.type == CKEDITOR.NODE_ELEMENT) if (d = b.getChildCount(), d > g) b = b.getChild(g).getPreviousSourceNode(!0); else if (1 > d) b = b.getPreviousSourceNode(); else { for (b = b.$; b.lastChild;)b = b.lastChild; b = new CKEDITOR.dom.node(b) } a.getPosition(b) & CKEDITOR.POSITION_FOLLOWING && (a = b); return { startNode: a, endNode: b }
                                    }, getCommonAncestor: function (a, b) {
                                        var e = this.startContainer, g = this.endContainer, e = e.equals(g) ? a && e.type == CKEDITOR.NODE_ELEMENT &&
                                            this.startOffset == this.endOffset - 1 ? e.getChild(this.startOffset) : e : e.getCommonAncestor(g); return b && !e.is ? e.getParent() : e
                                    }, optimize: function () { var a = this.startContainer, b = this.startOffset; a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setStartAfter(a) : this.setStartBefore(a)); a = this.endContainer; b = this.endOffset; a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) : this.setEndBefore(a)) }, optimizeBookmark: function () {
                                        var a = this.startContainer, b = this.endContainer; a.is && a.is("span") &&
                                            a.data("cke-bookmark") && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START); b && b.is && b.is("span") && b.data("cke-bookmark") && this.setEndAt(b, CKEDITOR.POSITION_AFTER_END)
                                    }, trim: function (a, b) {
                                        var e = this.startContainer, g = this.startOffset, d = this.collapsed; if ((!a || d) && e && e.type == CKEDITOR.NODE_TEXT) {
                                            if (g) if (g >= e.getLength()) g = e.getIndex() + 1, e = e.getParent(); else {
                                                var k = e.split(g), g = e.getIndex() + 1, e = e.getParent(); this.startContainer.equals(this.endContainer) ? this.setEnd(k, this.endOffset - this.startOffset) : e.equals(this.endContainer) &&
                                                    (this.endOffset += 1)
                                            } else g = e.getIndex(), e = e.getParent(); this.setStart(e, g); if (d) { this.collapse(!0); return }
                                        } e = this.endContainer; g = this.endOffset; b || d || !e || e.type != CKEDITOR.NODE_TEXT || (g ? (g >= e.getLength() || e.split(g), g = e.getIndex() + 1) : g = e.getIndex(), e = e.getParent(), this.setEnd(e, g))
                                    }, enlarge: function (a, b) {
                                        function e(a) { return a && a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable") ? null : a } var g = new RegExp(/[^\s\ufeff]/); switch (a) {
                                            case CKEDITOR.ENLARGE_INLINE: var d = 1; case CKEDITOR.ENLARGE_ELEMENT: var k =
                                                function (a, b) { var c = new CKEDITOR.dom.range(l); c.setStart(a, b); c.setEndAt(l, CKEDITOR.POSITION_BEFORE_END); var c = new CKEDITOR.dom.walker(c), e; for (c.guard = function (a) { return !(a.type == CKEDITOR.NODE_ELEMENT && a.isBlockBoundary()) }; e = c.next();) { if (e.type != CKEDITOR.NODE_TEXT) return !1; E = e != a ? e.getText() : e.substring(b); if (g.test(E)) return !1 } return !0 }; if (this.collapsed) break; var f = this.getCommonAncestor(), l = this.root, h, m, t, y, z, B = !1, C, E; C = this.startContainer; var G = this.startOffset; C.type == CKEDITOR.NODE_TEXT ?
                                                    (G && (C = !CKEDITOR.tools.trim(C.substring(0, G)).length && C, B = !!C), C && ((y = C.getPrevious()) || (t = C.getParent()))) : (G && (y = C.getChild(G - 1) || C.getLast()), y || (t = C)); for (t = e(t); t || y;) {
                                                        if (t && !y) { !z && t.equals(f) && (z = !0); if (d ? t.isBlockBoundary() : !l.contains(t)) break; B && "inline" == t.getComputedStyle("display") || (B = !1, z ? h = t : this.setStartBefore(t)); y = t.getPrevious() } for (; y;)if (C = !1, y.type == CKEDITOR.NODE_COMMENT) y = y.getPrevious(); else {
                                                            if (y.type == CKEDITOR.NODE_TEXT) E = y.getText(), g.test(E) && (y = null), C = /[\s\ufeff]$/.test(E);
                                                            else if ((y.$.offsetWidth > (CKEDITOR.env.webkit ? 1 : 0) || b && y.is("br")) && !y.data("cke-bookmark")) if (B && CKEDITOR.dtd.$removeEmpty[y.getName()]) { E = y.getText(); if (g.test(E)) y = null; else for (var G = y.$.getElementsByTagName("*"), H = 0, L; L = G[H++];)if (!CKEDITOR.dtd.$removeEmpty[L.nodeName.toLowerCase()]) { y = null; break } y && (C = !!E.length) } else y = null; C && (B ? z ? h = t : t && this.setStartBefore(t) : B = !0); if (y) { C = y.getPrevious(); if (!t && !C) { t = y; y = null; break } y = C } else t = null
                                                        } t && (t = e(t.getParent()))
                                                    } C = this.endContainer; G = this.endOffset;
                                                t = y = null; z = B = !1; C.type == CKEDITOR.NODE_TEXT ? CKEDITOR.tools.trim(C.substring(G)).length ? B = !0 : (B = !C.getLength(), G == C.getLength() ? (y = C.getNext()) || (t = C.getParent()) : k(C, G) && (t = C.getParent())) : (y = C.getChild(G)) || (t = C); for (; t || y;) {
                                                    if (t && !y) { !z && t.equals(f) && (z = !0); if (d ? t.isBlockBoundary() : !l.contains(t)) break; B && "inline" == t.getComputedStyle("display") || (B = !1, z ? m = t : t && this.setEndAfter(t)); y = t.getNext() } for (; y;) {
                                                        C = !1; if (y.type == CKEDITOR.NODE_TEXT) E = y.getText(), k(y, 0) || (y = null), C = /^[\s\ufeff]/.test(E); else if (y.type ==
                                                            CKEDITOR.NODE_ELEMENT) { if ((0 < y.$.offsetWidth || b && y.is("br")) && !y.data("cke-bookmark")) if (B && CKEDITOR.dtd.$removeEmpty[y.getName()]) { E = y.getText(); if (g.test(E)) y = null; else for (G = y.$.getElementsByTagName("*"), H = 0; L = G[H++];)if (!CKEDITOR.dtd.$removeEmpty[L.nodeName.toLowerCase()]) { y = null; break } y && (C = !!E.length) } else y = null } else C = 1; C && B && (z ? m = t : this.setEndAfter(t)); if (y) { C = y.getNext(); if (!t && !C) { t = y; y = null; break } y = C } else t = null
                                                    } t && (t = e(t.getParent()))
                                                } h && m && (f = h.contains(m) ? m : h, this.setStartBefore(f),
                                                    this.setEndAfter(f)); break; case CKEDITOR.ENLARGE_BLOCK_CONTENTS: case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS: t = new CKEDITOR.dom.range(this.root); l = this.root; t.setStartAt(l, CKEDITOR.POSITION_AFTER_START); t.setEnd(this.startContainer, this.startOffset); t = new CKEDITOR.dom.walker(t); var K, S, I = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? { br: 1 } : null), F = null, P = function (a) {
                                                        if (a.type == CKEDITOR.NODE_ELEMENT && "false" == a.getAttribute("contenteditable")) if (F) { if (F.equals(a)) { F = null; return } } else F =
                                                            a; else if (F) return; var b = I(a); b || (K = a); return b
                                                    }, d = function (a) { var b = P(a); !b && a.is && a.is("br") && (S = a); return b }; t.guard = P; t = t.lastBackward(); K = K || l; this.setStartAt(K, !K.is("br") && (!t && this.checkStartOfBlock() || t && K.contains(t)) ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END); if (a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) {
                                                        t = this.clone(); t = new CKEDITOR.dom.walker(t); var M = CKEDITOR.dom.walker.whitespaces(), O = CKEDITOR.dom.walker.bookmark(); t.evaluator = function (a) { return !M(a) && !O(a) }; if ((t = t.previous()) &&
                                                            t.type == CKEDITOR.NODE_ELEMENT && t.is("br")) break
                                                    } t = this.clone(); t.collapse(); t.setEndAt(l, CKEDITOR.POSITION_BEFORE_END); t = new CKEDITOR.dom.walker(t); t.guard = a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? d : P; K = F = S = null; t = t.lastForward(); K = K || l; this.setEndAt(K, !t && this.checkEndOfBlock() || t && K.contains(t) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START); S && this.setEndAfter(S)
                                        }
                                    }, shrink: function (a, b, e) {
                                        var g = "boolean" === typeof e ? e : e && "boolean" === typeof e.shrinkOnBlockBoundary ? e.shrinkOnBlockBoundary :
                                            !0, d = e && e.skipBogus; if (!this.collapsed) {
                                                a = a || CKEDITOR.SHRINK_TEXT; var k = this.clone(), f = this.startContainer, l = this.endContainer, h = this.startOffset, m = this.endOffset, t = e = 1; f && f.type == CKEDITOR.NODE_TEXT && (h ? h >= f.getLength() ? k.setStartAfter(f) : (k.setStartBefore(f), e = 0) : k.setStartBefore(f)); l && l.type == CKEDITOR.NODE_TEXT && (m ? m >= l.getLength() ? k.setEndAfter(l) : (k.setEndAfter(l), t = 0) : k.setEndBefore(l)); var k = new CKEDITOR.dom.walker(k), y = CKEDITOR.dom.walker.bookmark(), z = CKEDITOR.dom.walker.bogus(); k.evaluator =
                                                    function (b) { return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT) }; var B; k.guard = function (b, e) { if (d && z(b) || y(b)) return !0; if (a == CKEDITOR.SHRINK_ELEMENT && b.type == CKEDITOR.NODE_TEXT || e && b.equals(B) || !1 === g && b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary() || b.type == CKEDITOR.NODE_ELEMENT && b.hasAttribute("contenteditable")) return !1; e || b.type != CKEDITOR.NODE_ELEMENT || (B = b); return !0 }; e && (f = k[a == CKEDITOR.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(f, b ? CKEDITOR.POSITION_AFTER_START :
                                                        CKEDITOR.POSITION_BEFORE_START); t && (k.reset(), (k = k[a == CKEDITOR.SHRINK_ELEMENT ? "lastBackward" : "previous"]()) && this.setEndAt(k, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END)); return !(!e && !t)
                                            }
                                    }, insertNode: function (a) { this.optimizeBookmark(); this.trim(!1, !0); var b = this.startContainer, e = b.getChild(this.startOffset); e ? a.insertBefore(e) : b.append(a); a.getParent() && a.getParent().equals(this.endContainer) && this.endOffset++; this.setStartBefore(a) }, moveToPosition: function (a, b) {
                                        this.setStartAt(a,
                                            b); this.collapse(!0)
                                    }, moveToRange: function (a) { this.setStart(a.startContainer, a.startOffset); this.setEnd(a.endContainer, a.endOffset) }, selectNodeContents: function (a) { this.setStart(a, 0); this.setEnd(a, a.type == CKEDITOR.NODE_TEXT ? a.getLength() : a.getChildCount()) }, setStart: function (b, e) { b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (e = b.getIndex(), b = b.getParent()); this._setStartContainer(b); this.startOffset = e; this.endContainer || (this._setEndContainer(b), this.endOffset = e); a(this) }, setEnd: function (b,
                                        e) { b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (e = b.getIndex() + 1, b = b.getParent()); this._setEndContainer(b); this.endOffset = e; this.startContainer || (this._setStartContainer(b), this.startOffset = e); a(this) }, setStartAfter: function (a) { this.setStart(a.getParent(), a.getIndex() + 1) }, setStartBefore: function (a) { this.setStart(a.getParent(), a.getIndex()) }, setEndAfter: function (a) { this.setEnd(a.getParent(), a.getIndex() + 1) }, setEndBefore: function (a) { this.setEnd(a.getParent(), a.getIndex()) }, setStartAt: function (b,
                                            e) { switch (e) { case CKEDITOR.POSITION_AFTER_START: this.setStart(b, 0); break; case CKEDITOR.POSITION_BEFORE_END: b.type == CKEDITOR.NODE_TEXT ? this.setStart(b, b.getLength()) : this.setStart(b, b.getChildCount()); break; case CKEDITOR.POSITION_BEFORE_START: this.setStartBefore(b); break; case CKEDITOR.POSITION_AFTER_END: this.setStartAfter(b) }a(this) }, setEndAt: function (b, e) {
                                                switch (e) {
                                                    case CKEDITOR.POSITION_AFTER_START: this.setEnd(b, 0); break; case CKEDITOR.POSITION_BEFORE_END: b.type == CKEDITOR.NODE_TEXT ? this.setEnd(b,
                                                        b.getLength()) : this.setEnd(b, b.getChildCount()); break; case CKEDITOR.POSITION_BEFORE_START: this.setEndBefore(b); break; case CKEDITOR.POSITION_AFTER_END: this.setEndAfter(b)
                                                }a(this)
                                            }, fixBlock: function (a, b) { var e = this.createBookmark(), g = this.document.createElement(b); this.collapse(a); this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS); this.extractContents().appendTo(g); g.trim(); this.insertNode(g); var d = g.getBogus(); d && d.remove(); g.appendBogus(); this.moveToBookmark(e); return g }, splitBlock: function (a, b) {
                                                var e =
                                                    new CKEDITOR.dom.elementPath(this.startContainer, this.root), g = new CKEDITOR.dom.elementPath(this.endContainer, this.root), d = e.block, k = g.block, f = null; if (!e.blockLimit.equals(g.blockLimit)) return null; "br" != a && (d || (d = this.fixBlock(!0, a), k = (new CKEDITOR.dom.elementPath(this.endContainer, this.root)).block), k || (k = this.fixBlock(!1, a))); e = d && this.checkStartOfBlock(); g = k && this.checkEndOfBlock(); this.deleteContents(); d && d.equals(k) && (g ? (f = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(k,
                                                        CKEDITOR.POSITION_AFTER_END), k = null) : e ? (f = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(d, CKEDITOR.POSITION_BEFORE_START), d = null) : (k = this.splitElement(d, b || !1), d.is("ul", "ol") || d.appendBogus())); return { previousBlock: d, nextBlock: k, wasStartOfBlock: e, wasEndOfBlock: g, elementPath: f }
                                            }, splitElement: function (a, b) {
                                                if (!this.collapsed) return null; this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END); var e = this.extractContents(!1, b || !1), g = a.clone(!1, b || !1); e.appendTo(g); g.insertAfter(a);
                                                this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END); return g
                                            }, removeEmptyBlocksAtEnd: function () {
                                                function a(c) { return function (a) { return b(a) || e(a) || a.type == CKEDITOR.NODE_ELEMENT && a.isEmptyInlineRemoveable() || c.is("table") && a.is("caption") ? !1 : !0 } } var b = CKEDITOR.dom.walker.whitespaces(), e = CKEDITOR.dom.walker.bookmark(!1); return function (b) {
                                                    for (var e = this.createBookmark(), g = this[b ? "endPath" : "startPath"](), d = g.block || g.blockLimit, k; d && !d.equals(g.root) && !d.getFirst(a(d));)k = d.getParent(), this[b ? "setEndAt" :
                                                        "setStartAt"](d, CKEDITOR.POSITION_AFTER_END), d.remove(1), d = k; this.moveToBookmark(e)
                                                }
                                            }(), startPath: function () { return new CKEDITOR.dom.elementPath(this.startContainer, this.root) }, endPath: function () { return new CKEDITOR.dom.elementPath(this.endContainer, this.root) }, checkBoundaryOfElement: function (a, e) {
                                                var g = e == CKEDITOR.START, d = this.clone(); d.collapse(g); d[g ? "setStartAt" : "setEndAt"](a, g ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END); d = new CKEDITOR.dom.walker(d); d.evaluator = b(g); return d[g ?
                                                    "checkBackward" : "checkForward"]()
                                            }, checkStartOfBlock: function (a) { var b = this.startContainer, e = this.startOffset; CKEDITOR.env.ie && e && b.type == CKEDITOR.NODE_TEXT && (b = CKEDITOR.tools.ltrim(b.substring(0, e)), m.test(b) && this.trim(0, 1)); a || this.trim(); a = new CKEDITOR.dom.elementPath(this.startContainer, this.root); b = this.clone(); b.collapse(!0); b.setStartAt(a.block || a.blockLimit, CKEDITOR.POSITION_AFTER_START); a = new CKEDITOR.dom.walker(b); a.evaluator = f(); return a.checkBackward() }, checkEndOfBlock: function (a) {
                                                var b =
                                                    this.endContainer, e = this.endOffset; CKEDITOR.env.ie && b.type == CKEDITOR.NODE_TEXT && (b = CKEDITOR.tools.rtrim(b.substring(e)), m.test(b) && this.trim(1, 0)); a || this.trim(); a = new CKEDITOR.dom.elementPath(this.endContainer, this.root); b = this.clone(); b.collapse(!1); b.setEndAt(a.block || a.blockLimit, CKEDITOR.POSITION_BEFORE_END); a = new CKEDITOR.dom.walker(b); a.evaluator = f(); return a.checkForward()
                                            }, getPreviousNode: function (a, b, e) {
                                                var g = this.clone(); g.collapse(1); g.setStartAt(e || this.root, CKEDITOR.POSITION_AFTER_START);
                                                e = new CKEDITOR.dom.walker(g); e.evaluator = a; e.guard = b; return e.previous()
                                            }, getNextNode: function (a, b, e) { var g = this.clone(); g.collapse(); g.setEndAt(e || this.root, CKEDITOR.POSITION_BEFORE_END); e = new CKEDITOR.dom.walker(g); e.evaluator = a; e.guard = b; return e.next() }, checkReadOnly: function () {
                                                function a(b, c) {
                                                    for (; b;) {
                                                        if (b.type == CKEDITOR.NODE_ELEMENT) { if ("false" == b.getAttribute("contentEditable") && !b.data("cke-editable")) return 0; if (b.is("html") || "true" == b.getAttribute("contentEditable") && (b.contains(c) || b.equals(c))) break } b =
                                                            b.getParent()
                                                    } return 1
                                                } return function () { var b = this.startContainer, e = this.endContainer; return !(a(b, e) && a(e, b)) }
                                            }(), moveToElementEditablePosition: function (a, b) {
                                                if (a.type == CKEDITOR.NODE_ELEMENT && !a.isEditable(!1)) return this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START), !0; for (var g = 0; a;) {
                                                    if (a.type == CKEDITOR.NODE_TEXT) {
                                                        b && this.endContainer && this.checkEndOfBlock() && m.test(a.getText()) ? this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END :
                                                            CKEDITOR.POSITION_BEFORE_START); g = 1; break
                                                    } if (a.type == CKEDITOR.NODE_ELEMENT) if (a.isEditable()) this.moveToPosition(a, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START), g = 1; else if (b && a.is("br") && this.endContainer && this.checkEndOfBlock()) this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START); else if ("false" == a.getAttribute("contenteditable") && a.is(CKEDITOR.dtd.$block)) return this.setStartBefore(a), this.setEndAfter(a), !0; var d = a, k = g, f = void 0; d.type == CKEDITOR.NODE_ELEMENT && d.isEditable(!1) &&
                                                        (f = d[b ? "getLast" : "getFirst"](e)); k || f || (f = d[b ? "getPrevious" : "getNext"](e)); a = f
                                                } return !!g
                                            }, moveToClosestEditablePosition: function (a, b) {
                                                var e, g = 0, d, k, f = [CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START]; a ? (e = new CKEDITOR.dom.range(this.root), e.moveToPosition(a, f[b ? 0 : 1])) : e = this.clone(); if (a && !a.is(CKEDITOR.dtd.$block)) g = 1; else if (d = e[b ? "getNextEditableNode" : "getPreviousEditableNode"]()) g = 1, (k = d.type == CKEDITOR.NODE_ELEMENT) && d.is(CKEDITOR.dtd.$block) && "false" == d.getAttribute("contenteditable") ?
                                                    (e.setStartAt(d, CKEDITOR.POSITION_BEFORE_START), e.setEndAt(d, CKEDITOR.POSITION_AFTER_END)) : !CKEDITOR.env.needsBrFiller && k && d.is(CKEDITOR.dom.walker.validEmptyBlockContainers) ? (e.setEnd(d, 0), e.collapse()) : e.moveToPosition(d, f[b ? 1 : 0]); g && this.moveToRange(e); return !!g
                                            }, moveToElementEditStart: function (a) { return this.moveToElementEditablePosition(a) }, moveToElementEditEnd: function (a) { return this.moveToElementEditablePosition(a, !0) }, getEnclosedNode: function () {
                                                var a = this.clone(); a.optimize(); if (a.startContainer.type !=
                                                    CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT) return null; var a = new CKEDITOR.dom.walker(a), b = CKEDITOR.dom.walker.bookmark(!1, !0), e = CKEDITOR.dom.walker.whitespaces(!0); a.evaluator = function (a) { return e(a) && b(a) }; var g = a.next(); a.reset(); return g && g.equals(a.previous()) ? g : null
                                            }, getTouchedStartNode: function () { var a = this.startContainer; return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.startOffset) || a }, getTouchedEndNode: function () {
                                                var a = this.endContainer; return this.collapsed ||
                                                    a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.endOffset - 1) || a
                                            }, getNextEditableNode: d(), getPreviousEditableNode: d(1), _getTableElement: function (a) { a = a || { td: 1, th: 1, tr: 1, tbody: 1, thead: 1, tfoot: 1, table: 1 }; var b = this.getTouchedStartNode(), e = this.getTouchedEndNode(), g = b.getAscendant("table", !0), e = e.getAscendant("table", !0); return g && !this.root.contains(g) ? null : this.getEnclosedNode() ? this.getEnclosedNode().getAscendant(a, !0) : g && e && (g.equals(e) || g.contains(e) || e.contains(g)) ? b.getAscendant(a, !0) : null }, scrollIntoView: function () {
                                                var a =
                                                    new CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", this.document), b, e, g, d = this.clone(); d.optimize(); (g = d.startContainer.type == CKEDITOR.NODE_TEXT) ? (e = d.startContainer.getText(), b = d.startContainer.split(d.startOffset), a.insertAfter(d.startContainer)) : d.insertNode(a); a.scrollIntoView(); g && (d.startContainer.setText(e), b.remove()); a.remove()
                                            }, getClientRects: function () {
                                                function a(b, c) {
                                                    var e = CKEDITOR.tools.array.map(b, function (a) { return a }), g = new CKEDITOR.dom.range(c.root), d, k,
                                                    f; c.startContainer instanceof CKEDITOR.dom.element && (k = 0 === c.startOffset && c.startContainer.hasAttribute("data-widget")); c.endContainer instanceof CKEDITOR.dom.element && (f = (f = c.endOffset === (c.endContainer.getChildCount ? c.endContainer.getChildCount() : c.endContainer.length)) && c.endContainer.hasAttribute("data-widget")); k && g.setStart(c.startContainer.getParent(), c.startContainer.getIndex()); f && g.setEnd(c.endContainer.getParent(), c.endContainer.getIndex() + 1); if (k || f) c = g; g = c.cloneContents().find("[data-cke-widget-id]").toArray();
                                                    if (g = CKEDITOR.tools.array.map(g, function (a) { var b = c.root.editor; a = a.getAttribute("data-cke-widget-id"); return b.widgets.instances[a].element })) return g = CKEDITOR.tools.array.map(g, function (a) { var b; b = a.getParent().hasClass("cke_widget_wrapper") ? a.getParent() : a; d = this.root.getDocument().$.createRange(); d.setStart(b.getParent().$, b.getIndex()); d.setEnd(b.getParent().$, b.getIndex() + 1); b = d.getClientRects(); b.widgetRect = a.getClientRect(); return b }, c), CKEDITOR.tools.array.forEach(g, function (a) {
                                                        function b(g) {
                                                            CKEDITOR.tools.array.forEach(e,
                                                                function (b, d) { var k = CKEDITOR.tools.objectCompare(a[g], b); k || (k = CKEDITOR.tools.objectCompare(a.widgetRect, b)); k && (Array.prototype.splice.call(e, d, a.length - g, a.widgetRect), c = !0) }); c || (g < e.length - 1 ? b(g + 1) : e.push(a.widgetRect))
                                                        } var c; b(0)
                                                    }), e
                                                } function b(a, c, e) {
                                                    var d; c.collapsed ? e.startContainer instanceof CKEDITOR.dom.element ? (a = e.checkStartOfBlock(), d = new CKEDITOR.dom.text("​"), a ? e.startContainer.append(d, !0) : 0 === e.startOffset ? d.insertBefore(e.startContainer.getFirst()) : (e = e.startContainer.getChildren().getItem(e.startOffset -
                                                        1), d.insertAfter(e)), c.setStart(d.$, 0), c.setEnd(d.$, 0), a = c.getClientRects(), d.remove()) : e.startContainer instanceof CKEDITOR.dom.text && ("" === e.startContainer.getText() ? (e.startContainer.setText("​"), a = c.getClientRects(), e.startContainer.setText("")) : a = [g(e.createBookmark())]) : a = [g(e.createBookmark())]; return a
                                                } function e(a, b, c) {
                                                    a = CKEDITOR.tools.extend({}, a); b && (a = CKEDITOR.tools.getAbsoluteRectPosition(c.document.getWindow(), a)); !a.width && (a.width = a.right - a.left); !a.height && (a.height = a.bottom - a.top);
                                                    return a
                                                } function g(a) { var b = a.startNode; a = a.endNode; var c; b.setText("​"); b.removeStyle("display"); a ? (a.setText("​"), a.removeStyle("display"), c = [b.getClientRect(), a.getClientRect()], a.remove()) : c = [b.getClientRect(), b.getClientRect()]; b.remove(); return { right: Math.max(c[0].right, c[1].right), bottom: Math.max(c[0].bottom, c[1].bottom), left: Math.min(c[0].left, c[1].left), top: Math.min(c[0].top, c[1].top), width: Math.abs(c[0].left - c[1].left), height: Math.max(c[0].bottom, c[1].bottom) - Math.min(c[0].top, c[1].top) } }
                                                return void 0 !== this.document.getSelection ? function (g) { var d = this.root.getDocument().$.createRange(), k; d.setStart(this.startContainer.$, this.startOffset); d.setEnd(this.endContainer.$, this.endOffset); k = d.getClientRects(); k = a(k, this); k.length || (k = b(k, d, this)); return CKEDITOR.tools.array.map(k, function (a) { return e(a, g, this) }, this) } : function (a) { return [e(g(this.createBookmark()), a, this)] }
                                            }(), _setStartContainer: function (a) { this.startContainer = a }, _setEndContainer: function (a) { this.endContainer = a }, _find: function (a,
                                                b) { var e = this.getCommonAncestor(), g = this.getBoundaryNodes(), d = [], k, f, l, h; if (e && e.find) for (f = e.find(a), k = 0; k < f.count(); k++)if (e = f.getItem(k), b || !e.isReadOnly()) l = e.getPosition(g.startNode) & CKEDITOR.POSITION_FOLLOWING || g.startNode.equals(e), h = e.getPosition(g.endNode) & CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IS_CONTAINED || g.endNode.equals(e), l && h && d.push(e); return d }
                                }; CKEDITOR.dom.range.mergeRanges = function (a) {
                                    return CKEDITOR.tools.array.reduce(a, function (a, b) {
                                        var c = a[a.length - 1], e = !1; b = b.clone();
                                        b.enlarge(CKEDITOR.ENLARGE_ELEMENT); if (c) { var g = new CKEDITOR.dom.range(b.root), e = new CKEDITOR.dom.walker(g), d = CKEDITOR.dom.walker.whitespaces(); g.setStart(c.endContainer, c.endOffset); g.setEnd(b.startContainer, b.startOffset); for (g = e.next(); d(g) || b.endContainer.equals(g);)g = e.next(); e = !g } e ? c.setEnd(b.endContainer, b.endOffset) : a.push(b); return a
                                    }, [])
                                }
                        })(); CKEDITOR.POSITION_AFTER_START = 1; CKEDITOR.POSITION_BEFORE_END = 2; CKEDITOR.POSITION_BEFORE_START = 3; CKEDITOR.POSITION_AFTER_END = 4; CKEDITOR.ENLARGE_ELEMENT =
                            1; CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2; CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3; CKEDITOR.ENLARGE_INLINE = 4; CKEDITOR.START = 1; CKEDITOR.END = 2; CKEDITOR.SHRINK_ELEMENT = 1; CKEDITOR.SHRINK_TEXT = 2; "use strict"; (function () {
                                function a(a) { 1 > arguments.length || (this.range = a, this.forceBrBreak = 0, this.enlargeBr = 1, this.enforceRealBlocks = 0, this._ || (this._ = {})) } function h(a) { var b = []; a.forEach(function (a) { if ("true" == a.getAttribute("contenteditable")) return b.push(a), !1 }, CKEDITOR.NODE_ELEMENT, !0); return b } function f(a, b, g, d) {
                                    a: {
                                        null ==
                                        d && (d = h(g)); for (var k; k = d.shift();)if (k.getDtd().p) { d = { element: k, remaining: d }; break a } d = null
                                    } if (!d) return 0; if ((k = CKEDITOR.filter.instances[d.element.data("cke-filter")]) && !k.check(b)) return f(a, b, g, d.remaining); b = new CKEDITOR.dom.range(d.element); b.selectNodeContents(d.element); b = b.createIterator(); b.enlargeBr = a.enlargeBr; b.enforceRealBlocks = a.enforceRealBlocks; b.activeFilter = b.filter = k; a._.nestedEditable = { element: d.element, container: g, remaining: d.remaining, iterator: b }; return 1
                                } function b(a, b, g) {
                                    if (!b) return !1;
                                    a = a.clone(); a.collapse(!g); return a.checkBoundaryOfElement(b, g ? CKEDITOR.START : CKEDITOR.END)
                                } var d = /^[\r\n\t ]+$/, l = CKEDITOR.dom.walker.bookmark(!1, !0), k = CKEDITOR.dom.walker.whitespaces(!0), m = function (a) { return l(a) && k(a) }, g = { dd: 1, dt: 1, li: 1 }; a.prototype = {
                                    getNextParagraph: function (a) {
                                        var c, k, h, w, p; a = a || "p"; if (this._.nestedEditable) {
                                            if (c = this._.nestedEditable.iterator.getNextParagraph(a)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, c; this.activeFilter = this.filter; if (f(this, a,
                                                this._.nestedEditable.container, this._.nestedEditable.remaining)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, this._.nestedEditable.iterator.getNextParagraph(a); this._.nestedEditable = null
                                        } if (!this.range.root.getDtd()[a]) return null; if (!this._.started) {
                                            var q = this.range.clone(); k = q.startPath(); var r = q.endPath(), A = !q.collapsed && b(q, k.block), v = !q.collapsed && b(q, r.block, 1); q.shrink(CKEDITOR.SHRINK_ELEMENT, !0); A && q.setStartAt(k.block, CKEDITOR.POSITION_BEFORE_END); v && q.setEndAt(r.block,
                                                CKEDITOR.POSITION_AFTER_START); k = q.endContainer.hasAscendant("pre", !0) || q.startContainer.hasAscendant("pre", !0); q.enlarge(this.forceBrBreak && !k || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS); q.collapsed || (k = new CKEDITOR.dom.walker(q.clone()), r = CKEDITOR.dom.walker.bookmark(!0, !0), k.evaluator = r, this._.nextNode = k.next(), k = new CKEDITOR.dom.walker(q.clone()), k.evaluator = r, k = k.previous(), this._.lastNode = k.getNextSourceNode(!0, null, q.root), this._.lastNode && this._.lastNode.type ==
                                                    CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary() && (r = this.range.clone(), r.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END), r.checkEndOfBlock() && (r = new CKEDITOR.dom.elementPath(r.endContainer, r.root), this._.lastNode = (r.block || r.blockLimit).getNextSourceNode(!0))), this._.lastNode && q.root.contains(this._.lastNode) || (this._.lastNode = this._.docEndMarker = q.document.createText(""), this._.lastNode.insertAfter(k)), q = null); this._.started =
                                                        1; k = q
                                        } r = this._.nextNode; q = this._.lastNode; for (this._.nextNode = null; r;) {
                                            var A = 0, v = r.hasAscendant("pre"), D = r.type != CKEDITOR.NODE_ELEMENT, t = 0; if (D) r.type == CKEDITOR.NODE_TEXT && d.test(r.getText()) && (D = 0); else {
                                                var y = r.getName(); if (CKEDITOR.dtd.$block[y] && "false" == r.getAttribute("contenteditable")) { c = r; f(this, a, c); break } else if (r.isBlockBoundary(this.forceBrBreak && !v && { br: 1 })) {
                                                    if ("br" == y) D = 1; else if (!k && !r.getChildCount() && "hr" != y) { c = r; h = r.equals(q); break } k && (k.setEndAt(r, CKEDITOR.POSITION_BEFORE_START),
                                                        "br" != y && (this._.nextNode = r)); A = 1
                                                } else { if (r.getFirst()) { k || (k = this.range.clone(), k.setStartAt(r, CKEDITOR.POSITION_BEFORE_START)); r = r.getFirst(); continue } D = 1 }
                                            } D && !k && (k = this.range.clone(), k.setStartAt(r, CKEDITOR.POSITION_BEFORE_START)); h = (!A || D) && r.equals(q); if (k && !A) for (; !r.getNext(m) && !h;) { y = r.getParent(); if (y.isBlockBoundary(this.forceBrBreak && !v && { br: 1 })) { A = 1; D = 0; h || y.equals(q); k.setEndAt(y, CKEDITOR.POSITION_BEFORE_END); break } r = y; D = 1; h = r.equals(q); t = 1 } D && k.setEndAt(r, CKEDITOR.POSITION_AFTER_END);
                                            r = this._getNextSourceNode(r, t, q); if ((h = !r) || A && k) break
                                        } if (!c) {
                                            if (!k) return this._.docEndMarker && this._.docEndMarker.remove(), this._.nextNode = null; c = new CKEDITOR.dom.elementPath(k.startContainer, k.root); r = c.blockLimit; A = { div: 1, th: 1, td: 1 }; c = c.block; !c && r && !this.enforceRealBlocks && A[r.getName()] && k.checkStartOfBlock() && k.checkEndOfBlock() && !r.equals(k.root) ? c = r : !c || this.enforceRealBlocks && c.is(g) ? (c = this.range.document.createElement(a), k.extractContents().appendTo(c), c.trim(), k.insertNode(c), w = p = !0) :
                                                "li" != c.getName() ? k.checkStartOfBlock() && k.checkEndOfBlock() || (c = c.clone(!1), k.extractContents().appendTo(c), c.trim(), p = k.splitBlock(), w = !p.wasStartOfBlock, p = !p.wasEndOfBlock, k.insertNode(c)) : h || (this._.nextNode = c.equals(q) ? null : this._getNextSourceNode(k.getBoundaryNodes().endNode, 1, q))
                                        } w && (w = c.getPrevious()) && w.type == CKEDITOR.NODE_ELEMENT && ("br" == w.getName() ? w.remove() : w.getLast() && "br" == w.getLast().$.nodeName.toLowerCase() && w.getLast().remove()); p && (w = c.getLast()) && w.type == CKEDITOR.NODE_ELEMENT &&
                                            "br" == w.getName() && (!CKEDITOR.env.needsBrFiller || w.getPrevious(l) || w.getNext(l)) && w.remove(); this._.nextNode || (this._.nextNode = h || c.equals(q) || !q ? null : this._getNextSourceNode(c, 1, q)); return c
                                    }, _getNextSourceNode: function (a, b, g) { function d(a) { return !(a.equals(g) || a.equals(k)) } var k = this.range.root; for (a = a.getNextSourceNode(b, null, d); !l(a);)a = a.getNextSourceNode(b, null, d); return a }
                                }; CKEDITOR.dom.range.prototype.createIterator = function () { return new a(this) }
                            })(); CKEDITOR.command = function (a, h) {
                                this.uiItems =
                                []; this.exec = function (b) { if (this.state == CKEDITOR.TRISTATE_DISABLED || !this.checkAllowed()) return !1; this.editorFocus && a.focus(); return !1 === this.fire("exec") ? !0 : !1 !== h.exec.call(this, a, b) }; this.refresh = function (a, d) {
                                    if (!this.readOnly && a.readOnly) return !0; if (this.context && !d.isContextFor(this.context) || !this.checkAllowed(!0)) return this.disable(), !0; this.startDisabled || this.enable(); this.modes && !this.modes[a.mode] && this.disable(); return !1 === this.fire("refresh", { editor: a, path: d }) ? !0 : h.refresh && !1 !== h.refresh.apply(this,
                                        arguments)
                                }; var f; this.checkAllowed = function (b) { return b || "boolean" != typeof f ? f = a.activeFilter.checkFeature(this) : f }; CKEDITOR.tools.extend(this, h, { modes: { wysiwyg: 1 }, editorFocus: 1, contextSensitive: !!h.context, state: CKEDITOR.TRISTATE_DISABLED }); CKEDITOR.event.call(this)
                            }; CKEDITOR.command.prototype = {
                                enable: function () { this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(this.preserveState && "undefined" != typeof this.previousState ? this.previousState : CKEDITOR.TRISTATE_OFF) }, disable: function () { this.setState(CKEDITOR.TRISTATE_DISABLED) },
                                setState: function (a) { if (this.state == a || a != CKEDITOR.TRISTATE_DISABLED && !this.checkAllowed()) return !1; this.previousState = this.state; this.state = a; this.fire("state"); return !0 }, toggleState: function () { this.state == CKEDITOR.TRISTATE_OFF ? this.setState(CKEDITOR.TRISTATE_ON) : this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF) }
                            }; CKEDITOR.event.implementOn(CKEDITOR.command.prototype); CKEDITOR.ENTER_P = 1; CKEDITOR.ENTER_BR = 2; CKEDITOR.ENTER_DIV = 3; CKEDITOR.config = {
                                customConfig: "config.js", autoUpdateElement: !0,
                                language: "", defaultLanguage: "en", contentsLangDirection: "", enterMode: CKEDITOR.ENTER_P, forceEnterMode: !1, shiftEnterMode: CKEDITOR.ENTER_BR, docType: "\x3c!DOCTYPE html\x3e", bodyId: "", bodyClass: "", fullPage: !1, height: 200, contentsCss: CKEDITOR.getUrl("contents.css"), extraPlugins: "", removePlugins: "", protectedSource: [], tabIndex: 0, useComputedState: !0, width: "", baseFloatZIndex: 1E4, blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85]
                            }; (function () {
                                function a(a, b, c, e, g) {
                                    var d, f; a = []; for (d in b) {
                                        f =
                                        b[d]; f = "boolean" == typeof f ? {} : "function" == typeof f ? { match: f } : H(f); "$" != d.charAt(0) && (f.elements = d); c && (f.featureName = c.toLowerCase()); var l = f; l.elements = k(l.elements, /\s+/) || null; l.propertiesOnly = l.propertiesOnly || !0 === l.elements; var h = /\s*,\s*/, m = void 0; for (m in S) { l[m] = k(l[m], h) || null; var n = l, r = I[m], u = k(l[I[m]], h), O = l[m], v = [], J = !0, M = void 0; u ? J = !1 : u = {}; for (M in O) "!" == M.charAt(0) && (M = M.slice(1), v.push(M), u[M] = !0, J = !1); for (; M = v.pop();)O[M] = O["!" + M], delete O["!" + M]; n[r] = (J ? !1 : u) || null } l.match = l.match ||
                                            null; e.push(f); a.push(f)
                                    } b = g.elements; g = g.generic; var C; c = 0; for (e = a.length; c < e; ++c) {
                                        d = H(a[c]); f = !0 === d.classes || !0 === d.styles || !0 === d.attributes; l = d; m = r = h = void 0; for (h in S) l[h] = A(l[h]); n = !0; for (m in I) { h = I[m]; r = l[h]; u = []; O = void 0; for (O in r) -1 < O.indexOf("*") ? u.push(new RegExp("^" + O.replace(/\*/g, ".*") + "$")) : u.push(O); r = u; r.length && (l[h] = r, n = !1) } l.nothingRequired = n; l.noProperties = !(l.attributes || l.classes || l.styles); if (!0 === d.elements || null === d.elements) g[f ? "unshift" : "push"](d); else for (C in l = d.elements,
                                            delete d.elements, l) if (b[C]) b[C][f ? "unshift" : "push"](d); else b[C] = [d]
                                    }
                                } function h(a, b, c, e) { if (!a.match || a.match(b)) if (e || m(a, b)) if (a.propertiesOnly || (c.valid = !0), c.allAttributes || (c.allAttributes = f(a.attributes, b.attributes, c.validAttributes)), c.allStyles || (c.allStyles = f(a.styles, b.styles, c.validStyles)), !c.allClasses) { a = a.classes; b = b.classes; e = c.validClasses; if (a) if (!0 === a) a = !0; else { for (var g = 0, d = b.length, k; g < d; ++g)k = b[g], e[k] || (e[k] = a(k)); a = !1 } else a = !1; c.allClasses = a } } function f(a, b, c) {
                                    if (!a) return !1;
                                    if (!0 === a) return !0; for (var e in b) c[e] || (c[e] = a(e)); return !1
                                } function b(a, b, c) { if (!a.match || a.match(b)) { if (a.noProperties) return !1; c.hadInvalidAttribute = d(a.attributes, b.attributes) || c.hadInvalidAttribute; c.hadInvalidStyle = d(a.styles, b.styles) || c.hadInvalidStyle; a = a.classes; b = b.classes; if (a) { for (var e = !1, g = !0 === a, k = b.length; k--;)if (g || a(b[k])) b.splice(k, 1), e = !0; a = e } else a = !1; c.hadInvalidClass = a || c.hadInvalidClass } } function d(a, b) {
                                    if (!a) return !1; var c = !1, e = !0 === a, g; for (g in b) if (e || a(g)) delete b[g],
                                        c = !0; return c
                                } function l(a, b, c) { if (a.disabled || a.customConfig && !c || !b) return !1; a._.cachedChecks = {}; return !0 } function k(a, b) { if (!a) return !1; if (!0 === a) return a; if ("string" == typeof a) return a = L(a), "*" == a ? !0 : CKEDITOR.tools.convertArrayToObject(a.split(b)); if (CKEDITOR.tools.isArray(a)) return a.length ? CKEDITOR.tools.convertArrayToObject(a) : !1; var c = {}, e = 0, g; for (g in a) c[g] = a[g], e++; return e ? c : !1 } function m(a, b) {
                                    if (a.nothingRequired) return !0; var c, e, d, k; if (d = a.requiredClasses) for (k = b.classes, c = 0; c < d.length; ++c)if (e =
                                        d[c], "string" == typeof e) { if (-1 == CKEDITOR.tools.indexOf(k, e)) return !1 } else if (!CKEDITOR.tools.checkIfAnyArrayItemMatches(k, e)) return !1; return g(b.styles, a.requiredStyles) && g(b.attributes, a.requiredAttributes)
                                } function g(a, b) { if (!b) return !0; for (var c = 0, e; c < b.length; ++c)if (e = b[c], "string" == typeof e) { if (!(e in a)) return !1 } else if (!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(a, e)) return !1; return !0 } function e(a) {
                                    if (!a) return {}; a = a.split(/\s*,\s*/).sort(); for (var b = {}; a.length;)b[a.shift()] = "cke-test";
                                    return b
                                } function c(a) { var b, c, e, g, d = {}, k = 1; for (a = L(a); b = a.match(F);)(c = b[2]) ? (e = n(c, "styles"), g = n(c, "attrs"), c = n(c, "classes")) : e = g = c = null, d["$" + k++] = { elements: b[1], classes: c, styles: e, attributes: g }, a = a.slice(b[0].length); return d } function n(a, b) { var c = a.match(P[b]); return c ? L(c[1]) : null } function u(a) { var b = a.styleBackup = a.attributes.style, c = a.classBackup = a.attributes["class"]; a.styles || (a.styles = CKEDITOR.tools.parseCssText(b || "", 1)); a.classes || (a.classes = c ? c.split(/\s+/) : []) } function w(a, c, e, g) {
                                    var d =
                                        0, k; g.toHtml && (c.name = c.name.replace(M, "$1")); if (g.doCallbacks && a.elementCallbacks) { a: { k = a.elementCallbacks; for (var f = 0, l = k.length, m; f < l; ++f)if (m = k[f](c)) { k = m; break a } k = void 0 } if (k) return k } if (g.doTransform && (k = a._.transformations[c.name])) { u(c); for (f = 0; f < k.length; ++f)y(a, c, k[f]); q(c) } if (g.doFilter) {
                                            a: {
                                                f = c.name; l = a._; a = l.allowedRules.elements[f]; k = l.allowedRules.generic; f = l.disallowedRules.elements[f]; l = l.disallowedRules.generic; m = g.skipRequired; var n = {
                                                    valid: !1, validAttributes: {}, validClasses: {},
                                                    validStyles: {}, allAttributes: !1, allClasses: !1, allStyles: !1, hadInvalidAttribute: !1, hadInvalidClass: !1, hadInvalidStyle: !1
                                                }, v, C; if (a || k) { u(c); if (f) for (v = 0, C = f.length; v < C; ++v)if (!1 === b(f[v], c, n)) { a = null; break a } if (l) for (v = 0, C = l.length; v < C; ++v)b(l[v], c, n); if (a) for (v = 0, C = a.length; v < C; ++v)h(a[v], c, n, m); if (k) for (v = 0, C = k.length; v < C; ++v)h(k[v], c, n, m); a = n } else a = null
                                            } if (!a || !a.valid) return e.push(c), 1; C = a.validAttributes; var A = a.validStyles; k = a.validClasses; var f = c.attributes, L = c.styles, l = c.classes; m = c.classBackup;
                                            var H = c.styleBackup, J, G, w = [], n = [], t = /^data-cke-/; v = !1; delete f.style; delete f["class"]; delete c.classBackup; delete c.styleBackup; if (!a.allAttributes) for (J in f) C[J] || (t.test(J) ? J == (G = J.replace(/^data-cke-saved-/, "")) || C[G] || (delete f[J], v = !0) : (delete f[J], v = !0)); if (!a.allStyles || a.hadInvalidStyle) { for (J in L) a.allStyles || A[J] ? w.push(J + ":" + L[J]) : v = !0; w.length && (f.style = w.sort().join("; ")) } else H && (f.style = H); if (!a.allClasses || a.hadInvalidClass) {
                                                for (J = 0; J < l.length; ++J)(a.allClasses || k[l[J]]) && n.push(l[J]);
                                                n.length && (f["class"] = n.sort().join(" ")); m && n.length < m.split(/\s+/).length && (v = !0)
                                            } else m && (f["class"] = m); v && (d = 1); if (!g.skipFinalValidation && !r(c)) return e.push(c), 1
                                        } g.toHtml && (c.name = c.name.replace(O, "cke:$1")); return d
                                } function p(a) { var b = [], c; for (c in a) -1 < c.indexOf("*") && b.push(c.replace(/\*/g, ".*")); return b.length ? new RegExp("^(?:" + b.join("|") + ")$") : null } function q(a) {
                                    var b = a.attributes, c; delete b.style; delete b["class"]; if (c = CKEDITOR.tools.writeCssText(a.styles, !0)) b.style = c; a.classes.length &&
                                        (b["class"] = a.classes.sort().join(" "))
                                } function r(a) { switch (a.name) { case "a": if (!(a.children.length || a.attributes.name || a.attributes.id)) return !1; break; case "img": if (!a.attributes.src) return !1 }return !0 } function A(a) { if (!a) return !1; if (!0 === a) return !0; var b = p(a); return function (c) { return c in a || b && c.match(b) } } function v() { return new CKEDITOR.htmlParser.element("br") } function D(a) { return a.type == CKEDITOR.NODE_ELEMENT && ("br" == a.name || G.$block[a.name]) } function t(a, b, c) {
                                    var e = a.name; if (G.$empty[e] ||
                                        !a.children.length) "hr" == e && "br" == b ? a.replaceWith(v()) : (a.parent && c.push({ check: "it", el: a.parent }), a.remove()); else if (G.$block[e] || "tr" == e) if ("br" == b) a.previous && !D(a.previous) && (b = v(), b.insertBefore(a)), a.next && !D(a.next) && (b = v(), b.insertAfter(a)), a.replaceWithChildren(); else {
                                            var e = a.children, g; b: { g = G[b]; for (var d = 0, k = e.length, f; d < k; ++d)if (f = e[d], f.type == CKEDITOR.NODE_ELEMENT && !g[f.name]) { g = !1; break b } g = !0 } if (g) a.name = b, a.attributes = {}, c.push({ check: "parent-down", el: a }); else {
                                                g = a.parent; for (var d =
                                                    g.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || "body" == g.name, l, h, k = e.length; 0 < k;)f = e[--k], d && (f.type == CKEDITOR.NODE_TEXT || f.type == CKEDITOR.NODE_ELEMENT && G.$inline[f.name]) ? (l || (l = new CKEDITOR.htmlParser.element(b), l.insertAfter(a), c.push({ check: "parent-down", el: l })), l.add(f, 0)) : (l = null, h = G[g.name] || G.span, f.insertAfter(a), g.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || f.type != CKEDITOR.NODE_ELEMENT || h[f.name] || c.push({ check: "el-up", el: f })); a.remove()
                                            }
                                        } else e in { style: 1, script: 1 } ? a.remove() : (a.parent && c.push({
                                            check: "it",
                                            el: a.parent
                                        }), a.replaceWithChildren())
                                } function y(a, b, c) { var e, g; for (e = 0; e < c.length; ++e)if (g = c[e], !(g.check && !a.check(g.check, !1) || g.left && !g.left(b))) { g.right(b, N); break } } function z(a, b) { var c = b.getDefinition(), e = c.attributes, g = c.styles, d, k, f, l; if (a.name != c.element) return !1; for (d in e) if ("class" == d) for (c = e[d].split(/\s+/), f = a.classes.join("|"); l = c.pop();) { if (-1 == f.indexOf(l)) return !1 } else if (a.attributes[d] != e[d]) return !1; for (k in g) if (a.styles[k] != g[k]) return !1; return !0 } function B(a, b) {
                                    var c, e;
                                    "string" == typeof a ? c = a : a instanceof CKEDITOR.style ? e = a : (c = a[0], e = a[1]); return [{ element: c, left: e, right: function (a, c) { c.transform(a, b) } }]
                                } function C(a) { return function (b) { return z(b, a) } } function E(a) { return function (b, c) { c[a](b) } } var G = CKEDITOR.dtd, H = CKEDITOR.tools.copy, L = CKEDITOR.tools.trim, K = ["", "p", "br", "div"]; CKEDITOR.FILTER_SKIP_TREE = 2; CKEDITOR.filter = function (a, b) {
                                    this.allowedContent = []; this.disallowedContent = []; this.elementCallbacks = null; this.disabled = !1; this.editor = null; this.id = CKEDITOR.tools.getNextNumber();
                                    this._ = { allowedRules: { elements: {}, generic: [] }, disallowedRules: { elements: {}, generic: [] }, transformations: {}, cachedTests: {}, cachedChecks: {} }; CKEDITOR.filter.instances[this.id] = this; var c = this.editor = a instanceof CKEDITOR.editor ? a : null; if (c && !b) { this.customConfig = !0; var e = c.config.allowedContent; !0 === e ? this.disabled = !0 : (e || (this.customConfig = !1), this.allow(e, "config", 1), this.allow(c.config.extraAllowedContent, "extra", 1), this.allow(K[c.enterMode] + " " + K[c.shiftEnterMode], "default", 1), this.disallow(c.config.disallowedContent)) } else this.customConfig =
                                        !1, this.allow(b || a, "default", 1)
                                }; CKEDITOR.filter.instances = {}; CKEDITOR.filter.prototype = {
                                    allow: function (b, e, g) {
                                        if (!l(this, b, g)) return !1; var d, k; if ("string" == typeof b) b = c(b); else if (b instanceof CKEDITOR.style) {
                                            if (b.toAllowedContentRules) return this.allow(b.toAllowedContentRules(this.editor), e, g); d = b.getDefinition(); b = {}; g = d.attributes; b[d.element] = d = { styles: d.styles, requiredStyles: d.styles && CKEDITOR.tools.object.keys(d.styles) }; g && (g = H(g), d.classes = g["class"] ? g["class"].split(/\s+/) : null, d.requiredClasses =
                                                d.classes, delete g["class"], d.attributes = g, d.requiredAttributes = g && CKEDITOR.tools.object.keys(g))
                                        } else if (CKEDITOR.tools.isArray(b)) { for (d = 0; d < b.length; ++d)k = this.allow(b[d], e, g); return k } a(this, b, e, this.allowedContent, this._.allowedRules); return !0
                                    }, applyTo: function (a, b, c, e) {
                                        if (this.disabled) return !1; var g = this, d = [], k = this.editor && this.editor.config.protectedSource, f, l = !1, h = { doFilter: !c, doTransform: !0, doCallbacks: !0, toHtml: b }; a.forEach(function (a) {
                                            if (a.type == CKEDITOR.NODE_ELEMENT) {
                                                if ("off" == a.attributes["data-cke-filter"]) return !1;
                                                if (!b || "span" != a.name || !~CKEDITOR.tools.object.keys(a.attributes).join("|").indexOf("data-cke-")) if (f = w(g, a, d, h), f & 1) l = !0; else if (f & 2) return !1
                                            } else if (a.type == CKEDITOR.NODE_COMMENT && a.value.match(/^\{cke_protected\}(?!\{C\})/)) {
                                                var c; a: {
                                                    var e = decodeURIComponent(a.value.replace(/^\{cke_protected\}/, "")); c = []; var m, n, r; if (k) for (n = 0; n < k.length; ++n)if ((r = e.match(k[n])) && r[0].length == e.length) { c = !0; break a } e = CKEDITOR.htmlParser.fragment.fromHtml(e); 1 == e.children.length && (m = e.children[0]).type == CKEDITOR.NODE_ELEMENT &&
                                                        w(g, m, c, h); c = !c.length
                                                } c || d.push(a)
                                            }
                                        }, null, !0); d.length && (l = !0); var m; a = []; e = K[e || (this.editor ? this.editor.enterMode : CKEDITOR.ENTER_P)]; for (var n; c = d.pop();)c.type == CKEDITOR.NODE_ELEMENT ? t(c, e, a) : c.remove(); for (; m = a.pop();)if (c = m.el, c.parent) switch (n = G[c.parent.name] || G.span, m.check) {
                                            case "it": G.$removeEmpty[c.name] && !c.children.length ? t(c, e, a) : r(c) || t(c, e, a); break; case "el-up": c.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || n[c.name] || t(c, e, a); break; case "parent-down": c.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT ||
                                                n[c.name] || t(c.parent, e, a)
                                        }return l
                                    }, checkFeature: function (a) { if (this.disabled || !a) return !0; a.toFeature && (a = a.toFeature(this.editor)); return !a.requiredContent || this.check(a.requiredContent) }, disable: function () { this.disabled = !0 }, disallow: function (b) { if (!l(this, b, !0)) return !1; "string" == typeof b && (b = c(b)); a(this, b, null, this.disallowedContent, this._.disallowedRules); return !0 }, addContentForms: function (a) {
                                        if (!this.disabled && a) {
                                            var b, c, e = [], g; for (b = 0; b < a.length && !g; ++b)c = a[b], ("string" == typeof c || c instanceof
                                                CKEDITOR.style) && this.check(c) && (g = c); if (g) { for (b = 0; b < a.length; ++b)e.push(B(a[b], g)); this.addTransformations(e) }
                                        }
                                    }, addElementCallback: function (a) { this.elementCallbacks || (this.elementCallbacks = []); this.elementCallbacks.push(a) }, addFeature: function (a) {
                                        if (this.disabled || !a) return !0; a.toFeature && (a = a.toFeature(this.editor)); this.allow(a.allowedContent, a.name); this.addTransformations(a.contentTransformations); this.addContentForms(a.contentForms); return a.requiredContent && (this.customConfig || this.disallowedContent.length) ?
                                            this.check(a.requiredContent) : !0
                                    }, addTransformations: function (a) {
                                        var b, c; if (!this.disabled && a) {
                                            var e = this._.transformations, g; for (g = 0; g < a.length; ++g) {
                                                b = a[g]; var d = void 0, k = void 0, f = void 0, l = void 0, h = void 0, m = void 0; c = []; for (k = 0; k < b.length; ++k)f = b[k], "string" == typeof f ? (f = f.split(/\s*:\s*/), l = f[0], h = null, m = f[1]) : (l = f.check, h = f.left, m = f.right), d || (d = f, d = d.element ? d.element : l ? l.match(/^([a-z0-9]+)/i)[0] : d.left.getDefinition().element), h instanceof CKEDITOR.style && (h = C(h)), c.push({
                                                    check: l == d ? null : l, left: h,
                                                    right: "string" == typeof m ? E(m) : m
                                                }); b = d; e[b] || (e[b] = []); e[b].push(c)
                                            }
                                        }
                                    }, check: function (a, b, g) {
                                        if (this.disabled) return !0; if (CKEDITOR.tools.isArray(a)) { for (var d = a.length; d--;)if (this.check(a[d], b, g)) return !0; return !1 } var k, f; if ("string" == typeof a) {
                                            f = a + "\x3c" + (!1 === b ? "0" : "1") + (g ? "1" : "0") + "\x3e"; if (f in this._.cachedChecks) return this._.cachedChecks[f]; k = c(a).$1; var l = k.styles, d = k.classes; k.name = k.elements; k.classes = d = d ? d.split(/\s*,\s*/) : []; k.styles = e(l); k.attributes = e(k.attributes); k.children = []; d.length &&
                                                (k.attributes["class"] = d.join(" ")); l && (k.attributes.style = CKEDITOR.tools.writeCssText(k.styles))
                                        } else k = a.getDefinition(), l = k.styles, d = k.attributes || {}, l && !CKEDITOR.tools.isEmpty(l) ? (l = H(l), d.style = CKEDITOR.tools.writeCssText(l, !0)) : l = {}, k = { name: k.element, attributes: d, classes: d["class"] ? d["class"].split(/\s+/) : [], styles: l, children: [] }; var l = CKEDITOR.tools.clone(k), h = [], m; if (!1 !== b && (m = this._.transformations[k.name])) { for (d = 0; d < m.length; ++d)y(this, k, m[d]); q(k) } w(this, l, h, {
                                            doFilter: !0, doTransform: !1 !==
                                                b, skipRequired: !g, skipFinalValidation: !g
                                        }); 0 < h.length ? g = !1 : ((b = k.attributes["class"]) && (k.attributes["class"] = k.attributes["class"].split(" ").sort().join(" ")), g = CKEDITOR.tools.objectCompare(k.attributes, l.attributes, !0), b && (k.attributes["class"] = b)); "string" == typeof a && (this._.cachedChecks[f] = g); return g
                                    }, getAllowedEnterMode: function () {
                                        var a = ["p", "div", "br"], b = { p: CKEDITOR.ENTER_P, div: CKEDITOR.ENTER_DIV, br: CKEDITOR.ENTER_BR }; return function (c, e) {
                                            var g = a.slice(), d; if (this.check(K[c])) return c; for (e ||
                                                (g = g.reverse()); d = g.pop();)if (this.check(d)) return b[d]; return CKEDITOR.ENTER_BR
                                        }
                                    }(), clone: function () { var a = new CKEDITOR.filter, b = CKEDITOR.tools.clone; a.allowedContent = b(this.allowedContent); a._.allowedRules = b(this._.allowedRules); a.disallowedContent = b(this.disallowedContent); a._.disallowedRules = b(this._.disallowedRules); a._.transformations = b(this._.transformations); a.disabled = this.disabled; a.editor = this.editor; return a }, destroy: function () {
                                        delete CKEDITOR.filter.instances[this.id]; delete this._; delete this.allowedContent;
                                        delete this.disallowedContent
                                    }
                                }; var S = { styles: 1, attributes: 1, classes: 1 }, I = { styles: "requiredStyles", attributes: "requiredAttributes", classes: "requiredClasses" }, F = /^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i, P = { styles: /{([^}]+)}/, attrs: /\[([^\]]+)\]/, classes: /\(([^\)]+)\)/ }, M = /^cke:(object|embed|param)$/, O = /^(object|embed|param)$/, N; N = CKEDITOR.filter.transformationsTools = {
                                    sizeToStyle: function (a) {
                                        this.lengthToStyle(a, "width"); this.lengthToStyle(a,
                                            "height")
                                    }, sizeToAttribute: function (a) { this.lengthToAttribute(a, "width"); this.lengthToAttribute(a, "height") }, lengthToStyle: function (a, b, c) { c = c || b; if (!(c in a.styles)) { var e = a.attributes[b]; e && (/^\d+$/.test(e) && (e += "px"), a.styles[c] = e) } delete a.attributes[b] }, lengthToAttribute: function (a, b, c) { c = c || b; if (!(c in a.attributes)) { var e = a.styles[b], g = e && e.match(/^(\d+)(?:\.\d*)?px$/); g ? a.attributes[c] = g[1] : "cke-test" == e && (a.attributes[c] = "cke-test") } delete a.styles[b] }, alignmentToStyle: function (a) {
                                        if (!("float" in
                                            a.styles)) { var b = a.attributes.align; if ("left" == b || "right" == b) a.styles["float"] = b } delete a.attributes.align
                                    }, alignmentToAttribute: function (a) { if (!("align" in a.attributes)) { var b = a.styles["float"]; if ("left" == b || "right" == b) a.attributes.align = b } delete a.styles["float"] }, splitBorderShorthand: function (a) {
                                        if (a.styles.border) {
                                            var b = CKEDITOR.tools.style.parse.border(a.styles.border); b.color && (a.styles["border-color"] = b.color); b.style && (a.styles["border-style"] = b.style); b.width && (a.styles["border-width"] = b.width);
                                            delete a.styles.border
                                        }
                                    }, listTypeToStyle: function (a) { if (a.attributes.type) switch (a.attributes.type) { case "a": a.styles["list-style-type"] = "lower-alpha"; break; case "A": a.styles["list-style-type"] = "upper-alpha"; break; case "i": a.styles["list-style-type"] = "lower-roman"; break; case "I": a.styles["list-style-type"] = "upper-roman"; break; case "1": a.styles["list-style-type"] = "decimal"; break; default: a.styles["list-style-type"] = a.attributes.type } }, splitMarginShorthand: function (a) {
                                        function b(e) {
                                            a.styles["margin-top"] =
                                            c[e[0]]; a.styles["margin-right"] = c[e[1]]; a.styles["margin-bottom"] = c[e[2]]; a.styles["margin-left"] = c[e[3]]
                                        } if (a.styles.margin) { var c = a.styles.margin.match(/(auto|0|(?:\-?[\.\d]+(?:\w+|%)))/g) || ["0px"]; switch (c.length) { case 1: b([0, 0, 0, 0]); break; case 2: b([0, 1, 0, 1]); break; case 3: b([0, 1, 2, 1]); break; case 4: b([0, 1, 2, 3]) }delete a.styles.margin }
                                    }, matchesStyle: z, transform: function (a, b) {
                                        if ("string" == typeof b) a.name = b; else {
                                            var c = b.getDefinition(), e = c.styles, g = c.attributes, d, k, f, l; a.name = c.element; for (d in g) if ("class" ==
                                                d) for (c = a.classes.join("|"), f = g[d].split(/\s+/); l = f.pop();)-1 == c.indexOf(l) && a.classes.push(l); else a.attributes[d] = g[d]; for (k in e) a.styles[k] = e[k]
                                        }
                                    }
                                }
                            })(); (function () {
                                CKEDITOR.focusManager = function (a) { if (a.focusManager) return a.focusManager; this.hasFocus = !1; this.currentActive = null; this._ = { editor: a }; return this }; CKEDITOR.focusManager._ = { blurDelay: 200 }; CKEDITOR.focusManager.prototype = {
                                    focus: function (a) {
                                        this._.timer && clearTimeout(this._.timer); a && (this.currentActive = a); this.hasFocus || this._.locked ||
                                            ((a = CKEDITOR.currentInstance) && a.focusManager.blur(1), this.hasFocus = !0, (a = this._.editor.container) && a.addClass("cke_focus"), this._.editor.fire("focus"))
                                    }, lock: function () { this._.locked = 1 }, unlock: function () { delete this._.locked }, blur: function (a) {
                                        function h() { if (this.hasFocus) { this.hasFocus = !1; var a = this._.editor.container; a && a.removeClass("cke_focus"); this._.editor.fire("blur") } } if (!this._.locked) {
                                            this._.timer && clearTimeout(this._.timer); var f = CKEDITOR.focusManager._.blurDelay; a || !f ? h.call(this) : this._.timer =
                                                CKEDITOR.tools.setTimeout(function () { delete this._.timer; h.call(this) }, f, this)
                                        }
                                    }, add: function (a, h) {
                                        var f = a.getCustomData("focusmanager"); if (!f || f != this) {
                                            f && f.remove(a); var f = "focus", b = "blur"; h && (CKEDITOR.env.ie ? (f = "focusin", b = "focusout") : CKEDITOR.event.useCapture = 1); var d = { blur: function () { a.equals(this.currentActive) && this.blur() }, focus: function () { this.focus(a) } }; a.on(f, d.focus, this); a.on(b, d.blur, this); h && (CKEDITOR.event.useCapture = 0); a.setCustomData("focusmanager", this); a.setCustomData("focusmanager_handlers",
                                                d)
                                        }
                                    }, remove: function (a) { a.removeCustomData("focusmanager"); var h = a.removeCustomData("focusmanager_handlers"); a.removeListener("blur", h.blur); a.removeListener("focus", h.focus) }
                                }
                            })(); CKEDITOR.keystrokeHandler = function (a) { if (a.keystrokeHandler) return a.keystrokeHandler; this.keystrokes = {}; this.blockedKeystrokes = {}; this._ = { editor: a }; return this }; (function () {
                                var a, h = function (b) {
                                    b = b.data; var d = b.getKeystroke(), f = this.keystrokes[d], k = this._.editor; a = !1 === k.fire("key", { keyCode: d, domEvent: b }); a || (f && (a = !1 !==
                                        k.execCommand(f, { from: "keystrokeHandler" })), a || (a = !!this.blockedKeystrokes[d])); a && b.preventDefault(!0); return !a
                                }, f = function (b) { a && (a = !1, b.data.preventDefault(!0)) }; CKEDITOR.keystrokeHandler.prototype = { attach: function (a) { a.on("keydown", h, this); if (CKEDITOR.env.gecko && CKEDITOR.env.mac) a.on("keypress", f, this) } }
                            })(); (function () {
                                CKEDITOR.lang = {
                                    languages: {
                                        af: 1, ar: 1, az: 1, bg: 1, bn: 1, bs: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, "de-ch": 1, el: 1, "en-au": 1, "en-ca": 1, "en-gb": 1, en: 1, eo: 1, es: 1, "es-mx": 1, et: 1, eu: 1, fa: 1, fi: 1, fo: 1,
                                        "fr-ca": 1, fr: 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, id: 1, is: 1, it: 1, ja: 1, ka: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, mk: 1, mn: 1, ms: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, "pt-br": 1, pt: 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, "sr-latn": 1, sr: 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, "zh-cn": 1, zh: 1
                                    }, rtl: { ar: 1, fa: 1, he: 1, ku: 1, ug: 1 }, load: function (a, h, f) { a && CKEDITOR.lang.languages[a] || (a = this.detect(h, a)); var b = this; h = function () { b[a].dir = b.rtl[a] ? "rtl" : "ltr"; f(a, b[a]) }; this[a] ? h() : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + a + ".js"), h, this) }, detect: function (a,
                                        h) { var f = this.languages; h = h || navigator.userLanguage || navigator.language || a; var b = h.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/), d = b[1], b = b[2]; f[d + "-" + b] ? d = d + "-" + b : f[d] || (d = null); CKEDITOR.lang.detect = d ? function () { return d } : function (a) { return a }; return d || a }
                                }
                            })(); CKEDITOR.scriptLoader = function () {
                                var a = {}, h = {}; return {
                                    load: function (f, b, d, l) {
                                        var k = "string" == typeof f; k && (f = [f]); d || (d = CKEDITOR); var m = f.length, g = m, e = [], c = [], n = function (a) { b && (k ? b.call(d, a) : b.call(d, e, c)) }; if (0 === g) n(!0); else {
                                            var u = function (a,
                                                b) { (b ? e : c).push(a); 0 >= --g && (l && CKEDITOR.document.getDocumentElement().removeStyle("cursor"), n(b)) }, w = function (b, c) { a[b] = 1; var e = h[b]; delete h[b]; for (var g = 0; g < e.length; g++)e[g](b, c) }, p = function (c) {
                                                    if (a[c]) u(c, !0); else {
                                                        var e = h[c] || (h[c] = []); e.push(u); if (!(1 < e.length)) {
                                                            var g = new CKEDITOR.dom.element("script"); g.setAttributes({ type: "text/javascript", src: c }); b && (CKEDITOR.env.ie && (8 >= CKEDITOR.env.version || CKEDITOR.env.ie9Compat) ? g.$.onreadystatechange = function () {
                                                                if ("loaded" == g.$.readyState || "complete" ==
                                                                    g.$.readyState) g.$.onreadystatechange = null, w(c, !0)
                                                            } : (g.$.onload = function () { setTimeout(function () { g.$.onload = null; g.$.onerror = null; w(c, !0) }, 0) }, g.$.onerror = function () { g.$.onload = null; g.$.onerror = null; w(c, !1) })); g.appendTo(CKEDITOR.document.getHead())
                                                        }
                                                    }
                                                }; l && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait"); for (var q = 0; q < m; q++)p(f[q])
                                        }
                                    }, queue: function () {
                                        function a() { var d; (d = b[0]) && this.load(d.scriptUrl, d.callback, CKEDITOR, 0) } var b = []; return function (d, l) {
                                            var k = this; b.push({
                                                scriptUrl: d,
                                                callback: function () { l && l.apply(this, arguments); b.shift(); a.call(k) }
                                            }); 1 == b.length && a.call(this)
                                        }
                                    }()
                                }
                            }(); CKEDITOR.resourceManager = function (a, h) { this.basePath = a; this.fileName = h; this.registered = {}; this.loaded = {}; this.externals = {}; this._ = { waitingList: {} } }; CKEDITOR.resourceManager.prototype = {
                                add: function (a, h) {
                                    if (this.registered[a]) throw Error('[CKEDITOR.resourceManager.add] The resource name "' + a + '" is already registered.'); var f = this.registered[a] = h || {}; f.name = a; f.path = this.getPath(a); CKEDITOR.fire(a +
                                        CKEDITOR.tools.capitalize(this.fileName) + "Ready", f); return this.get(a)
                                }, get: function (a) { return this.registered[a] || null }, getPath: function (a) { var h = this.externals[a]; return CKEDITOR.getUrl(h && h.dir || this.basePath + a + "/") }, getFilePath: function (a) { var h = this.externals[a]; return CKEDITOR.getUrl(this.getPath(a) + (h ? h.file : this.fileName + ".js")) }, addExternal: function (a, h, f) {
                                    f || (h = h.replace(/[^\/]+$/, function (a) { f = a; return "" })); f = f || this.fileName + ".js"; a = a.split(","); for (var b = 0; b < a.length; b++)this.externals[a[b]] =
                                        { dir: h, file: f }
                                }, load: function (a, h, f) {
                                    CKEDITOR.tools.isArray(a) || (a = a ? [a] : []); for (var b = this.loaded, d = this.registered, l = [], k = {}, m = {}, g = 0; g < a.length; g++) { var e = a[g]; if (e) if (b[e] || d[e]) m[e] = this.get(e); else { var c = this.getFilePath(e); l.push(c); c in k || (k[c] = []); k[c].push(e) } } CKEDITOR.scriptLoader.load(l, function (a, c) {
                                        if (c.length) throw Error('[CKEDITOR.resourceManager.load] Resource name "' + k[c[0]].join(",") + '" was not found at "' + c[0] + '".'); for (var e = 0; e < a.length; e++)for (var g = k[a[e]], d = 0; d < g.length; d++) {
                                            var l =
                                                g[d]; m[l] = this.get(l); b[l] = 1
                                        } h.call(f, m)
                                    }, this)
                                }
                            }; CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin"); CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function (a) {
                                var h = {}; return function (f, b, d) {
                                    var l = {}, k = function (f) {
                                        a.call(this, f, function (a) {
                                            CKEDITOR.tools.extend(l, a); var e = [], c; for (c in a) {
                                                var f = a[c], m = f && f.requires; if (!h[c]) {
                                                    if (f.icons) for (var w = f.icons.split(","), p = w.length; p--;)CKEDITOR.skin.addIcon(w[p], f.path + "icons/" + (CKEDITOR.env.hidpi && f.hidpi ? "hidpi/" :
                                                        "") + w[p] + ".png"); f.isSupportedEnvironment = f.isSupportedEnvironment || function () { return !0 }; h[c] = 1
                                                } if (m) for (m.split && (m = m.split(",")), f = 0; f < m.length; f++)l[m[f]] || e.push(m[f])
                                            } if (e.length) k.call(this, e); else { for (c in l) f = l[c], f.onLoad && !f.onLoad._called && (!1 === f.onLoad() && delete l[c], f.onLoad._called = 1); b && b.call(d || window, l) }
                                        }, this)
                                    }; k.call(this, f)
                                }
                            }); CKEDITOR.plugins.setLang = function (a, h, f) {
                                var b = this.get(a); a = b.langEntries || (b.langEntries = {}); b = b.lang || (b.lang = []); b.split && (b = b.split(",")); -1 == CKEDITOR.tools.indexOf(b,
                                    h) && b.push(h); a[h] = f
                            }; CKEDITOR.ui = function (a) { if (a.ui) return a.ui; this.items = {}; this.instances = {}; this.editor = a; this._ = { handlers: {} }; return this }; CKEDITOR.ui.prototype = {
                                add: function (a, h, f) { f.name = a.toLowerCase(); var b = this.items[a] = { type: h, command: f.command || null, args: Array.prototype.slice.call(arguments, 2) }; CKEDITOR.tools.extend(b, f) }, get: function (a) { return this.instances[a] }, create: function (a) {
                                    var h = this.items[a], f = h && this._.handlers[h.type], b = h && h.command && this.editor.getCommand(h.command), f = f &&
                                        f.create.apply(this, h.args); this.instances[a] = f; b && b.uiItems.push(f); f && !f.type && (f.type = h.type); return f
                                }, addHandler: function (a, h) { this._.handlers[a] = h }, space: function (a) { return CKEDITOR.document.getById(this.spaceId(a)) }, spaceId: function (a) { return this.editor.id + "_" + a }
                            }; CKEDITOR.event.implementOn(CKEDITOR.ui); (function () {
                                function a(a, c, e) {
                                    CKEDITOR.event.call(this); a = a && CKEDITOR.tools.clone(a); if (void 0 !== c) {
                                        if (!(c instanceof CKEDITOR.dom.element)) throw Error("Expect element of type CKEDITOR.dom.element.");
                                        if (!e) throw Error("One of the element modes must be specified."); if (CKEDITOR.env.ie && CKEDITOR.env.quirks && e == CKEDITOR.ELEMENT_MODE_INLINE) throw Error("Inline element mode is not supported on IE quirks."); if (!f(c, e)) throw Error('The specified element mode is not supported on element: "' + c.getName() + '".'); this.element = c; this.elementMode = e; this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO && (c.getId() || c.getNameAtt())
                                    } else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE; this._ = {}; this.commands = {};
                                    this.templates = {}; this.name = this.name || h(); this.id = CKEDITOR.tools.getNextId(); this.status = "unloaded"; this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config); this.ui = new CKEDITOR.ui(this); this.focusManager = new CKEDITOR.focusManager(this); this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this); this.on("readOnly", b); this.on("selectionChange", function (a) { l(this, a.data.path) }); this.on("activeFilterChange", function () { l(this, this.elementPath(), !0) }); this.on("mode", b); CKEDITOR.dom.selection.setupEditorOptimization(this);
                                    this.on("instanceReady", function () { if (this.config.startupFocus) { if ("end" === this.config.startupFocus) { var a = this.createRange(); a.selectNodeContents(this.editable()); a.shrink(CKEDITOR.SHRINK_ELEMENT, !0); a.collapse(); this.getSelection().selectRanges([a]) } this.focus() } }); CKEDITOR.fire("instanceCreated", null, this); CKEDITOR.add(this); CKEDITOR.tools.setTimeout(function () { this.isDestroyed() || this.isDetached() || m(this, a) }, 0, this)
                                } function h() { do var a = "editor" + ++p; while (CKEDITOR.instances[a]); return a } function f(a,
                                    b) { return b == CKEDITOR.ELEMENT_MODE_INLINE ? a.is(CKEDITOR.dtd.$editable) || a.is("textarea") : b == CKEDITOR.ELEMENT_MODE_REPLACE ? !a.is(CKEDITOR.dtd.$nonBodyContent) : 1 } function b() { var a = this.commands, b; for (b in a) d(this, a[b]) } function d(a, b) { b[b.startDisabled ? "disable" : a.readOnly && !b.readOnly ? "disable" : b.modes[a.mode] ? "enable" : "disable"]() } function l(a, b, c) { if (b) { var e, g, d = a.commands; for (g in d) e = d[g], (c || e.contextSensitive) && e.refresh(a, b) } } function k(a) {
                                        var b = a.config.customConfig; if (!b) return !1; var b =
                                            CKEDITOR.getUrl(b), c = q[b] || (q[b] = {}); c.fn ? (c.fn.call(a, a.config), CKEDITOR.getUrl(a.config.customConfig) != b && k(a) || a.fireOnce("customConfigLoaded")) : CKEDITOR.scriptLoader.queue(b, function () { c.fn = c.fn || CKEDITOR.editorConfig || function () { }; k(a) }); return !0
                                    } function m(a, b) {
                                        a.on("customConfigLoaded", function () {
                                            if (b) { if (b.on) for (var c in b.on) a.on(c, b.on[c]); CKEDITOR.tools.extend(a.config, b, !0); delete a.config.on } c = a.config; a.readOnly = c.readOnly ? !0 : a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.is("textarea") ?
                                                a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : a.element.isReadOnly() : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : !1; a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? !(a.element.is("textarea") || CKEDITOR.dtd[a.element.getName()].p) : !1; a.tabIndex = c.tabIndex || a.element && a.element.getAttribute("tabindex") || 0; a.activeEnterMode = a.enterMode = a.blockless ? CKEDITOR.ENTER_BR : c.enterMode; a.activeShiftEnterMode =
                                                    a.shiftEnterMode = a.blockless ? CKEDITOR.ENTER_BR : c.shiftEnterMode; c.skin && (CKEDITOR.skinName = c.skin); a.fireOnce("configLoaded"); a.dataProcessor = new CKEDITOR.htmlDataProcessor(a); a.filter = a.activeFilter = new CKEDITOR.filter(a); g(a)
                                        }); b && null != b.customConfig && (a.config.customConfig = b.customConfig); k(a) || a.fireOnce("customConfigLoaded")
                                    } function g(a) { CKEDITOR.skin.loadPart("editor", function () { e(a) }) } function e(a) {
                                        CKEDITOR.lang.load(a.config.language, a.config.defaultLanguage, function (b, e) {
                                            var g = a.config.title;
                                            a.langCode = b; a.lang = CKEDITOR.tools.prototypedCopy(e); a.title = "string" == typeof g || !1 === g ? g : [a.lang.editor, a.name].join(", "); a.config.contentsLangDirection || (a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) : a.lang.dir); a.fire("langLoaded"); c(a)
                                        })
                                    } function c(a) { a.getStylesSet(function (b) { a.once("loaded", function () { a.fire("stylesSet", { styles: b }) }, null, null, 1); n(a) }) } function n(a) {
                                        function b(a) {
                                            if (!a) return ""; CKEDITOR.tools.isArray(a) && (a = a.join(","));
                                            return a.replace(/\s/g, "")
                                        } var c = a.config, e = b(c.plugins), g = b(c.extraPlugins), d = b(c.removePlugins); if (g) var k = new RegExp("(?:^|,)(?:" + g.replace(/,/g, "|") + ")(?\x3d,|$)", "g"), e = e.replace(k, ""), e = e + ("," + g); if (d) var f = new RegExp("(?:^|,)(?:" + d.replace(/,/g, "|") + ")(?\x3d,|$)", "g"), e = e.replace(f, ""); CKEDITOR.env.air && (e += ",adobeair"); CKEDITOR.plugins.load(e.split(","), function (b) {
                                            var e = [], g = [], d = []; a.plugins = CKEDITOR.tools.extend({}, a.plugins, b); for (var k in b) {
                                                var l = b[k], h = l.lang, m = null, n = l.requires, u;
                                                CKEDITOR.tools.isArray(n) && (n = n.join(",")); if (n && (u = n.match(f))) for (; n = u.pop();)CKEDITOR.error("editor-plugin-required", { plugin: n.replace(",", ""), requiredBy: k }); h && !a.lang[k] && (h.split && (h = h.split(",")), 0 <= CKEDITOR.tools.indexOf(h, a.langCode) ? m = a.langCode : (m = a.langCode.replace(/-.*/, ""), m = m != a.langCode && 0 <= CKEDITOR.tools.indexOf(h, m) ? m : 0 <= CKEDITOR.tools.indexOf(h, "en") ? "en" : h[0]), l.langEntries && l.langEntries[m] ? (a.lang[k] = l.langEntries[m], m = null) : d.push(CKEDITOR.getUrl(l.path + "lang/" + m + ".js"))); g.push(m);
                                                e.push(l)
                                            } CKEDITOR.scriptLoader.load(d, function () {
                                                if (!a.isDestroyed() && !a.isDetached()) {
                                                    for (var b = ["beforeInit", "init", "afterInit"], d = 0; d < b.length; d++)for (var k = 0; k < e.length; k++) { var f = e[k]; 0 === d && g[k] && f.lang && f.langEntries && (a.lang[f.name] = f.langEntries[g[k]]); if (f[b[d]]) f[b[d]](a) } a.fireOnce("pluginsLoaded"); c.keystrokes && a.setKeystroke(a.config.keystrokes); for (k = 0; k < a.config.blockedKeystrokes.length; k++)a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[k]] = 1; a.status = "loaded"; a.fireOnce("loaded");
                                                    CKEDITOR.fire("instanceLoaded", null, a)
                                                }
                                            })
                                        })
                                    } function u() { var a = this.element; if (a && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) { var b = this.getData(); this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b)); a.is("textarea") ? a.setValue(b) : a.setHtml(b); return !0 } return !1 } function w(a, b) {
                                        function c(a) {
                                            var b = a.startContainer, e = a.endContainer, g = b.is && b.is("tr"), d = b.is && b.is("td"); a = d && b.equals(e) && a.endOffset === b.getChildCount(); b = d && 1 === b.getChildCount() && "img" === b.getChildren().getItem(0).getName();
                                            return g || a && !b ? !0 : !1
                                        } function e(a) { var b = a.startContainer; return b.is("tr") ? a.cloneContents() : b.clone(!0) } for (var g = new CKEDITOR.dom.documentFragment, d, k, f, l = 0; l < a.length; l++) { var h = a[l], m = h.startContainer.getAscendant("tr", !0); c(h) ? (d || (d = m.getAscendant("table").clone(), d.append(m.getAscendant({ thead: 1, tbody: 1, tfoot: 1 }).clone()), g.append(d), d = d.findOne("thead, tbody, tfoot")), k && k.equals(m) || (k = m, f = m.clone(), d.append(f)), f.append(e(h))) : g.append(h.cloneContents()) } return d ? g : b.getHtmlFromRange(a[0])
                                    }
                                a.prototype = CKEDITOR.editor.prototype; CKEDITOR.editor = a; var p = 0, q = {}; CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                                    plugins: { detectConflict: function (a, b) { for (var c = 0; c < b.length; c++) { var e = b[c]; if (this[e]) return CKEDITOR.warn("editor-plugin-conflict", { plugin: a, replacedWith: e }), !0 } return !1 } }, addCommand: function (a, b) { b.name = a.toLowerCase(); var c = b instanceof CKEDITOR.command ? b : new CKEDITOR.command(this, b); this.mode && d(this, c); return this.commands[a] = c }, _attachToForm: function () {
                                        function a(b) {
                                            c.updateElement();
                                            c._.required && !e.getValue() && !1 === c.fire("required") && b.data.preventDefault()
                                        } function b(a) { return !!(a && a.call && a.apply) } var c = this, e = c.element, g = new CKEDITOR.dom.element(e.$.form); e.is("textarea") && g && (g.on("submit", a), b(g.$.submit) && (g.$.submit = CKEDITOR.tools.override(g.$.submit, function (b) { return function () { a(); b.apply ? b.apply(this) : b() } })), c.on("destroy", function () { g.removeListener("submit", a) }))
                                    }, destroy: function (a) {
                                        var b = CKEDITOR.filter.instances, c = this; this.fire("beforeDestroy"); !a && u.call(this);
                                        this.editable(null); this.filter && delete this.filter; CKEDITOR.tools.array.forEach(CKEDITOR.tools.object.keys(b), function (a) { a = b[a]; c === a.editor && a.destroy() }); delete this.activeFilter; this.status = "destroyed"; this.fire("destroy"); this.removeAllListeners(); CKEDITOR.remove(this); CKEDITOR.fire("instanceDestroyed", null, this)
                                    }, elementPath: function (a) { if (!a) { a = this.getSelection(); if (!a) return null; a = a.getStartElement() } return a ? new CKEDITOR.dom.elementPath(a, this.editable()) : null }, createRange: function () {
                                        var a =
                                            this.editable(); return a ? new CKEDITOR.dom.range(a) : null
                                    }, execCommand: function (a, b) { var c = this.getCommand(a), e = { name: a, commandData: b || {}, command: c }; return c && c.state != CKEDITOR.TRISTATE_DISABLED && !1 !== this.fire("beforeCommandExec", e) && (e.returnValue = c.exec(e.commandData), !c.async && !1 !== this.fire("afterCommandExec", e)) ? e.returnValue : !1 }, getCommand: function (a) { return this.commands[a] }, getData: function (a) {
                                        !a && this.fire("beforeGetData"); var b = this._.data; "string" != typeof b && (b = (b = this.element) && this.elementMode ==
                                            CKEDITOR.ELEMENT_MODE_REPLACE ? b.is("textarea") ? b.getValue() : b.getHtml() : ""); b = { dataValue: b }; !a && this.fire("getData", b); return b.dataValue
                                    }, getSnapshot: function () { var a = this.fire("getSnapshot"); "string" != typeof a && (a = (a = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.is("textarea") ? a.getValue() : a.getHtml() : ""); return a }, loadSnapshot: function (a) { this.fire("loadSnapshot", a) }, setData: function (a, b, c) {
                                        var e = !0, g = b; b && "object" == typeof b && (c = b.internal, g = b.callback, e = !b.noSnapshot); !c && e &&
                                            this.fire("saveSnapshot"); if (g || !c) this.once("dataReady", function (a) { !c && e && this.fire("saveSnapshot"); g && g.call(a.editor) }); a = { dataValue: a }; !c && this.fire("setData", a); this._.data = a.dataValue; !c && this.fire("afterSetData", a)
                                    }, setReadOnly: function (a) { a = null == a || a; this.readOnly != a && (this.readOnly = a, this.keystrokeHandler.blockedKeystrokes[8] = +a, this.editable().setReadOnly(a), this.fire("readOnly")) }, insertHtml: function (a, b, c) { this.fire("insertHtml", { dataValue: a, mode: b, range: c }) }, insertText: function (a) {
                                        this.fire("insertText",
                                            a)
                                    }, insertElement: function (a) { this.fire("insertElement", a) }, getSelectedHtml: function (a) { var b = this.editable(), c = this.getSelection(), c = c && c.getRanges(); if (!b || !c || 0 === c.length) return null; b = w(c, b); return a ? b.getHtml() : b }, extractSelectedHtml: function (a, b) {
                                        var c = this.editable(), e = this.getSelection().getRanges(), g = new CKEDITOR.dom.documentFragment, d; if (!c || 0 === e.length) return null; for (d = 0; d < e.length; d++)g.append(c.extractHtmlFromRange(e[d], b)); b || this.getSelection().selectRanges([e[0]]); return a ? g.getHtml() :
                                            g
                                    }, focus: function () { this.fire("beforeFocus") }, checkDirty: function () { return "ready" == this.status && this._.previousValue !== this.getSnapshot() }, resetDirty: function () { this._.previousValue = this.getSnapshot() }, updateElement: function () { return u.call(this) }, setKeystroke: function () { for (var a = this.keystrokeHandler.keystrokes, b = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [[].slice.call(arguments, 0)], c, e, g = b.length; g--;)c = b[g], e = 0, CKEDITOR.tools.isArray(c) && (e = c[1], c = c[0]), e ? a[c] = e : delete a[c] }, getCommandKeystroke: function (a,
                                        b) { var c = "string" === typeof a ? this.getCommand(a) : a, e = []; if (c) { var g = CKEDITOR.tools.object.findKey(this.commands, c), d = this.keystrokeHandler.keystrokes; if (c.fakeKeystroke) e.push(c.fakeKeystroke); else for (var k in d) d[k] === g && e.push(k) } return b ? e : e[0] || null }, addFeature: function (a) { return this.filter.addFeature(a) }, setActiveFilter: function (a) {
                                            a || (a = this.filter); this.activeFilter !== a && (this.activeFilter = a, this.fire("activeFilterChange"), a === this.filter ? this.setActiveEnterMode(null, null) : this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode),
                                                a.getAllowedEnterMode(this.shiftEnterMode, !0)))
                                        }, setActiveEnterMode: function (a, b) { a = a ? this.blockless ? CKEDITOR.ENTER_BR : a : this.enterMode; b = b ? this.blockless ? CKEDITOR.ENTER_BR : b : this.shiftEnterMode; if (this.activeEnterMode != a || this.activeShiftEnterMode != b) this.activeEnterMode = a, this.activeShiftEnterMode = b, this.fire("activeEnterModeChange") }, showNotification: function (a) { alert(a) }, isDetached: function () { return !!this.container && this.container.isDetached() }, isDestroyed: function () { return "destroyed" === this.status }
                                });
                                CKEDITOR.editor._getEditorElement = function (a) { if (!CKEDITOR.env.isCompatible) return null; var b = CKEDITOR.dom.element.get(a); return b ? b.getEditor() ? (CKEDITOR.error("editor-element-conflict", { editorName: b.getEditor().name }), null) : b : (CKEDITOR.error("editor-incorrect-element", { element: a }), null) }; CKEDITOR.editor.initializeDelayedEditorCreation = function (a, b, c) {
                                    if (b.delayIfDetached_callback) CKEDITOR.warn("editor-delayed-creation", { method: "callback" }), b.delayIfDetached_callback(function () {
                                        CKEDITOR[c](a, b);
                                        CKEDITOR.warn("editor-delayed-creation-success", { method: "callback" })
                                    }); else { var e = void 0 === b.delayIfDetached_interval ? CKEDITOR.config.delayIfDetached_interval : b.delayIfDetached_interval, g; CKEDITOR.warn("editor-delayed-creation", { method: "interval - " + e + " ms" }); g = setInterval(function () { a.isDetached() || (clearInterval(g), CKEDITOR[c](a, b), CKEDITOR.warn("editor-delayed-creation-success", { method: "interval - " + e + " ms" })) }, e) }
                                }; CKEDITOR.editor.shouldDelayEditorCreation = function (a, b) {
                                    CKEDITOR.editor.mergeDelayedCreationConfigs(b);
                                    return b && b.delayIfDetached && a.isDetached()
                                }; CKEDITOR.editor.mergeDelayedCreationConfigs = function (a) { a && (a.delayIfDetached = "boolean" === typeof a.delayIfDetached ? a.delayIfDetached : CKEDITOR.config.delayIfDetached, a.delayIfDetached_interval = isNaN(a.delayIfDetached_interval) ? CKEDITOR.config.delayIfDetached_interval : a.delayIfDetached_interval, a.delayIfDetached_callback = a.delayIfDetached_callback || CKEDITOR.config.delayIfDetached_callback) }
                            })(); CKEDITOR.ELEMENT_MODE_NONE = 0; CKEDITOR.ELEMENT_MODE_REPLACE = 1;
        CKEDITOR.ELEMENT_MODE_APPENDTO = 2; CKEDITOR.ELEMENT_MODE_INLINE = 3; CKEDITOR.config.delayIfDetached = !1; CKEDITOR.config.delayIfDetached_callback = void 0; CKEDITOR.config.delayIfDetached_interval = 50; CKEDITOR.htmlParser = function () { this._ = { htmlPartsRegex: /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--!?>)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g } }; (function () {
            var a = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g, h = {
                checked: 1,
                compact: 1, declare: 1, defer: 1, disabled: 1, ismap: 1, multiple: 1, nohref: 1, noresize: 1, noshade: 1, nowrap: 1, readonly: 1, selected: 1
            }; CKEDITOR.htmlParser.prototype = {
                onTagOpen: function () { }, onTagClose: function () { }, onText: function () { }, onCDATA: function () { }, onComment: function () { }, parse: function (f) {
                    for (var b, d, l = 0, k; b = this._.htmlPartsRegex.exec(f);) {
                        d = b.index; if (d > l) if (l = f.substring(l, d), k) k.push(l); else this.onText(l); l = this._.htmlPartsRegex.lastIndex; if (d = b[1]) if (d = d.toLowerCase(), k && CKEDITOR.dtd.$cdata[d] && (this.onCDATA(k.join("")),
                            k = null), !k) { this.onTagClose(d); continue } if (k) k.push(b[0]); else if (d = b[3]) { if (d = d.toLowerCase(), !/="/.test(d)) { var m = {}, g, e = b[4]; b = !!b[5]; if (e) for (; g = a.exec(e);) { var c = g[1].toLowerCase(); g = g[2] || g[3] || g[4] || ""; m[c] = !g && h[c] ? c : CKEDITOR.tools.htmlDecodeAttr(g) } this.onTagOpen(d, m, b); !k && CKEDITOR.dtd.$cdata[d] && (k = []) } } else if (d = b[2]) this.onComment(d)
                    } if (f.length > l) this.onText(f.substring(l, f.length))
                }
            }
        })(); CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
            $: function () { this._ = { output: [] } }, proto: {
                openTag: function (a) {
                    this._.output.push("\x3c",
                        a)
                }, openTagClose: function (a, h) { h ? this._.output.push(" /\x3e") : this._.output.push("\x3e") }, attribute: function (a, h) { "string" == typeof h && (h = CKEDITOR.tools.htmlEncodeAttr(h)); this._.output.push(" ", a, '\x3d"', h, '"') }, closeTag: function (a) { this._.output.push("\x3c/", a, "\x3e") }, text: function (a) { this._.output.push(a) }, comment: function (a) { this._.output.push("\x3c!--", a, "--\x3e") }, write: function (a) { this._.output.push(a) }, reset: function () { this._.output = []; this._.indent = !1 }, getHtml: function (a) {
                    var h = this._.output.join("");
                    a && this.reset(); return h
                }
            }
        }); "use strict"; (function () {
            CKEDITOR.htmlParser.node = function () { }; CKEDITOR.htmlParser.node.prototype = {
                remove: function () { var a = this.parent.children, h = CKEDITOR.tools.indexOf(a, this), f = this.previous, b = this.next; f && (f.next = b); b && (b.previous = f); a.splice(h, 1); this.parent = null }, replaceWith: function (a) { var h = this.parent.children, f = CKEDITOR.tools.indexOf(h, this), b = a.previous = this.previous, d = a.next = this.next; b && (b.next = a); d && (d.previous = a); h[f] = a; a.parent = this.parent; this.parent = null },
                insertAfter: function (a) { var h = a.parent.children, f = CKEDITOR.tools.indexOf(h, a), b = a.next; h.splice(f + 1, 0, this); this.next = a.next; this.previous = a; a.next = this; b && (b.previous = this); this.parent = a.parent }, insertBefore: function (a) { var h = a.parent.children, f = CKEDITOR.tools.indexOf(h, a); h.splice(f, 0, this); this.next = a; (this.previous = a.previous) && (a.previous.next = this); a.previous = this; this.parent = a.parent }, getAscendant: function (a) {
                    var h = "function" == typeof a ? a : "string" == typeof a ? function (b) { return b.name == a } : function (b) {
                        return b.name in
                            a
                    }, f = this.parent; for (; f && f.type == CKEDITOR.NODE_ELEMENT;) { if (h(f)) return f; f = f.parent } return null
                }, wrapWith: function (a) { this.replaceWith(a); a.add(this); return a }, getIndex: function () { return CKEDITOR.tools.indexOf(this.parent.children, this) }, getFilterContext: function (a) { return a || {} }
            }
        })(); "use strict"; CKEDITOR.htmlParser.comment = function (a) { this.value = a; this._ = { isBlockLike: !1 } }; CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
            type: CKEDITOR.NODE_COMMENT, filter: function (a,
                h) { var f = this.value; if (!(f = a.onComment(h, f, this))) return this.remove(), !1; if ("string" != typeof f) return this.replaceWith(f), !1; this.value = f; return !0 }, writeHtml: function (a, h) { h && this.filter(h); a.comment(this.value) }
        }); "use strict"; (function () {
            CKEDITOR.htmlParser.text = function (a) { this.value = a; this._ = { isBlockLike: !1 } }; CKEDITOR.htmlParser.text.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
                type: CKEDITOR.NODE_TEXT, filter: function (a, h) {
                    if (!(this.value = a.onText(h, this.value, this))) return this.remove(),
                        !1
                }, writeHtml: function (a, h) { h && this.filter(h); a.text(this.value) }
            })
        })(); "use strict"; (function () { CKEDITOR.htmlParser.cdata = function (a) { this.value = a }; CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, { type: CKEDITOR.NODE_TEXT, filter: function (a) { var h = this.getAscendant("style"); if (h && h.getAscendant({ math: 1, svg: 1 })) { var h = CKEDITOR.htmlParser.fragment.fromHtml(this.value), f = new CKEDITOR.htmlParser.basicWriter; a.applyTo(h); h.writeHtml(f); this.value = f.getHtml() } }, writeHtml: function (a) { a.write(this.value) } }) })();
        "use strict"; CKEDITOR.htmlParser.fragment = function () { this.children = []; this.parent = null; this._ = { isBlockLike: !0, hasInlineStarted: !1 } }; (function () {
            function a(a) { return a.attributes["data-cke-survive"] ? !1 : "a" == a.name && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name] } var h = CKEDITOR.tools.extend({ table: 1, ul: 1, ol: 1, dl: 1 }, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl), f = { ol: 1, ul: 1 }, b = CKEDITOR.tools.extend({}, { html: 1 }, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, {
                style: 1,
                script: 1
            }), d = { ul: "li", ol: "li", dl: "dd", table: "tbody", tbody: "tr", thead: "tr", tfoot: "tr", tr: "td" }; CKEDITOR.htmlParser.fragment.fromHtml = function (l, k, m) {
                function g(a) { var b; if (0 < r.length) for (var c = 0; c < r.length; c++) { var g = r[c], d = g.name, k = CKEDITOR.dtd[d], f = v.name && CKEDITOR.dtd[v.name]; f && !f[d] || a && k && !k[a] && CKEDITOR.dtd[a] ? d == v.name && (n(v, v.parent, 1), c--) : (b || (e(), b = 1), g = g.clone(), g.parent = v, v = g, r.splice(c, 1), c--) } } function e() { for (; A.length;)n(A.shift(), v) } function c(a) {
                    if (a._.isBlockLike && "pre" != a.name &&
                        "textarea" != a.name) { var b = a.children.length, c = a.children[b - 1], e; c && c.type == CKEDITOR.NODE_TEXT && ((e = CKEDITOR.tools.rtrim(c.value)) ? c.value = e : a.children.length = b - 1) }
                } function n(b, e, g) { e = e || v || q; var d = v; void 0 === b.previous && (u(e, b) && (v = e, p.onTagOpen(m, {}), b.returnPoint = e = v), c(b), a(b) && !b.children.length || e.add(b), "pre" == b.name && (t = !1), "textarea" == b.name && (D = !1)); b.returnPoint ? (v = b.returnPoint, delete b.returnPoint) : v = g ? e : d } function u(a, b) {
                    if ((a == q || "body" == a.name) && m && (!a.name || CKEDITOR.dtd[a.name][m])) {
                        var c,
                        e; return (c = b.attributes && (e = b.attributes["data-cke-real-element-type"]) ? e : b.name) && c in CKEDITOR.dtd.$inline && !(c in CKEDITOR.dtd.head) && !b.isOrphan || b.type == CKEDITOR.NODE_TEXT
                    }
                } function w(a, b) { return a in CKEDITOR.dtd.$listItem || a in CKEDITOR.dtd.$tableContent ? a == b || "dt" == a && "dd" == b || "dd" == a && "dt" == b : !1 } var p = new CKEDITOR.htmlParser, q = k instanceof CKEDITOR.htmlParser.element ? k : "string" == typeof k ? new CKEDITOR.htmlParser.element(k) : new CKEDITOR.htmlParser.fragment, r = [], A = [], v = q, D = "textarea" == q.name,
                    t = "pre" == q.name; p.onTagOpen = function (c, d, k, l) {
                        d = new CKEDITOR.htmlParser.element(c, d); d.isUnknown && k && (d.isEmpty = !0); d.isOptionalClose = l; if (a(d)) r.push(d); else {
                            if ("pre" == c) t = !0; else { if ("br" == c && t) { v.add(new CKEDITOR.htmlParser.text("\n")); return } "textarea" == c && (D = !0) } if ("br" == c) A.push(d); else {
                                for (; !(l = (k = v.name) ? CKEDITOR.dtd[k] || (v._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : b, d.isUnknown || v.isUnknown || l[c]);)if (v.isOptionalClose) p.onTagClose(k); else if (c in f && k in f) k = v.children, (k = k[k.length -
                                    1]) && "li" == k.name || n(k = new CKEDITOR.htmlParser.element("li"), v), !d.returnPoint && (d.returnPoint = v), v = k; else if (c in CKEDITOR.dtd.$listItem && !w(c, k)) p.onTagOpen("li" == c ? "ul" : "dl", {}, 0, 1); else if (k in h && !w(c, k)) !d.returnPoint && (d.returnPoint = v), v = v.parent; else if (k in CKEDITOR.dtd.$inline && r.unshift(v), v.parent) n(v, v.parent, 1); else { d.isOrphan = 1; break } g(c); e(); d.parent = v; d.isEmpty ? n(d) : v = d
                            }
                        }
                    }; p.onTagClose = function (a) {
                        for (var b = r.length - 1; 0 <= b; b--)if (a == r[b].name) { r.splice(b, 1); return } for (var c = [], g =
                            [], d = v; d != q && d.name != a;)d._.isBlockLike || g.unshift(d), c.push(d), d = d.returnPoint || d.parent; if (d != q) { for (b = 0; b < c.length; b++) { var k = c[b]; n(k, k.parent) } v = d; d._.isBlockLike && e(); n(d, d.parent); d == v && (v = v.parent); r = r.concat(g) } "body" == a && (m = !1)
                    }; p.onText = function (a) {
                        if (!(v._.hasInlineStarted && !A.length || t || D) && (a = CKEDITOR.tools.ltrim(a), 0 === a.length)) return; var c = v.name, k = c ? CKEDITOR.dtd[c] || (v._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : b; if (!D && !k["#"] && c in h) p.onTagOpen(d[c] || ""), p.onText(a); else {
                            e();
                            g(); t || D || (a = a.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " ")); a = new CKEDITOR.htmlParser.text(a); if (u(v, a)) this.onTagOpen(m, {}, 0, 1); v.add(a)
                        }
                    }; p.onCDATA = function (a) { v.add(new CKEDITOR.htmlParser.cdata(a)) }; p.onComment = function (a) { e(); g(); v.add(new CKEDITOR.htmlParser.comment(a)) }; p.parse(l); for (e(); v != q;)n(v, v.parent, 1); c(q); return q
            }; CKEDITOR.htmlParser.fragment.prototype = {
                type: CKEDITOR.NODE_DOCUMENT_FRAGMENT, add: function (a, b) {
                    isNaN(b) && (b = this.children.length); var d = 0 < b ? this.children[b - 1] : null; if (d) {
                        if (a._.isBlockLike &&
                            d.type == CKEDITOR.NODE_TEXT && (d.value = CKEDITOR.tools.rtrim(d.value), 0 === d.value.length)) { this.children.pop(); this.add(a); return } d.next = a
                    } a.previous = d; a.parent = this; this.children.splice(b, 0, a); this._.hasInlineStarted || (this._.hasInlineStarted = a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike)
                }, filter: function (a, b) { b = this.getFilterContext(b); a.onRoot(b, this); this.filterChildren(a, !1, b) }, filterChildren: function (a, b, d) {
                    if (this.childrenFilteredBy != a.id) {
                        d = this.getFilterContext(d);
                        if (b && !this.parent) a.onRoot(d, this); this.childrenFilteredBy = a.id; for (b = 0; b < this.children.length; b++)!1 === this.children[b].filter(a, d) && b--
                    }
                }, writeHtml: function (a, b) { b && this.filter(b); this.writeChildrenHtml(a) }, writeChildrenHtml: function (a, b, d) { var g = this.getFilterContext(); if (d && !this.parent && b) b.onRoot(g, this); b && this.filterChildren(b, !1, g); b = 0; d = this.children; for (g = d.length; b < g; b++)d[b].writeHtml(a) }, forEach: function (a, b, d) {
                    if (!(d || b && this.type != b)) var g = a(this); if (!1 !== g) {
                        d = this.children; for (var e =
                            0; e < d.length; e++)g = d[e], g.type == CKEDITOR.NODE_ELEMENT ? g.forEach(a, b) : b && g.type != b || a(g)
                    }
                }, getFilterContext: function (a) { return a || {} }
            }
        })(); "use strict"; (function () {
            function a() { this.rules = [] } function h(f, b, d, l) { var k, h; for (k in b) (h = f[k]) || (h = f[k] = new a), h.add(b[k], d, l) } CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
                $: function (f) {
                    this.id = CKEDITOR.tools.getNextNumber(); this.elementNameRules = new a; this.attributeNameRules = new a; this.elementsRules = {}; this.attributesRules = {}; this.textRules = new a;
                    this.commentRules = new a; this.rootRules = new a; f && this.addRules(f, 10)
                }, proto: {
                    addRules: function (a, b) {
                        var d; "number" == typeof b ? d = b : b && "priority" in b && (d = b.priority); "number" != typeof d && (d = 10); "object" != typeof b && (b = {}); a.elementNames && this.elementNameRules.addMany(a.elementNames, d, b); a.attributeNames && this.attributeNameRules.addMany(a.attributeNames, d, b); a.elements && h(this.elementsRules, a.elements, d, b); a.attributes && h(this.attributesRules, a.attributes, d, b); a.text && this.textRules.add(a.text, d, b); a.comment &&
                            this.commentRules.add(a.comment, d, b); a.root && this.rootRules.add(a.root, d, b)
                    }, applyTo: function (a) { a.filter(this) }, onElementName: function (a, b) { return this.elementNameRules.execOnName(a, b) }, onAttributeName: function (a, b) { return this.attributeNameRules.execOnName(a, b) }, onText: function (a, b, d) { return this.textRules.exec(a, b, d) }, onComment: function (a, b, d) { return this.commentRules.exec(a, b, d) }, onRoot: function (a, b) { return this.rootRules.exec(a, b) }, onElement: function (a, b) {
                        for (var d = [this.elementsRules["^"], this.elementsRules[b.name],
                        this.elementsRules.$], l, k = 0; 3 > k; k++)if (l = d[k]) { l = l.exec(a, b, this); if (!1 === l) return null; if (l && l != b) return this.onNode(a, l); if (b.parent && !b.name) break } return b
                    }, onNode: function (a, b) { var d = b.type; return d == CKEDITOR.NODE_ELEMENT ? this.onElement(a, b) : d == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(a, b.value, b)) : d == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(a, b.value, b)) : null }, onAttribute: function (a, b, d, l) { return (d = this.attributesRules[d]) ? d.exec(a, l, b, this) : l }
                }
            });
            CKEDITOR.htmlParser.filterRulesGroup = a; a.prototype = {
                add: function (a, b, d) { this.rules.splice(this.findIndex(b), 0, { value: a, priority: b, options: d }) }, addMany: function (a, b, d) { for (var l = [this.findIndex(b), 0], k = 0, h = a.length; k < h; k++)l.push({ value: a[k], priority: b, options: d }); this.rules.splice.apply(this.rules, l) }, findIndex: function (a) { for (var b = this.rules, d = b.length - 1; 0 <= d && a < b[d].priority;)d--; return d + 1 }, exec: function (a, b) {
                    var d = b instanceof CKEDITOR.htmlParser.node || b instanceof CKEDITOR.htmlParser.fragment,
                    l = Array.prototype.slice.call(arguments, 1), k = this.rules, h = k.length, g, e, c, n; for (n = 0; n < h; n++)if (d && (g = b.type, e = b.name), c = k[n], !(a.nonEditable && !c.options.applyToAll || a.nestedEditable && c.options.excludeNestedEditable)) { c = c.value.apply(null, l); if (!1 === c || d && c && (c.name != e || c.type != g)) return c; null != c && (l[0] = b = c) } return b
                }, execOnName: function (a, b) {
                    for (var d = 0, l = this.rules, k = l.length, h; b && d < k; d++)h = l[d], a.nonEditable && !h.options.applyToAll || a.nestedEditable && h.options.excludeNestedEditable || (b = b.replace(h.value[0],
                        h.value[1])); return b
                }
            }
        })(); (function () {
            function a(a, c) {
                function e(a) { return a || CKEDITOR.env.needsNbspFiller ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", { "data-cke-bogus": 1 }) } function g(a, c) {
                    return function (g) {
                        if (g.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                            var d = [], k = f(g), m, u; if (k) for (h(k, 1) && d.push(k); k;)l(k) && (m = b(k)) && h(m) && ((u = b(m)) && !l(u) ? d.push(m) : (e(n).insertAfter(m), m.remove())), k = k.previous; for (k = 0; k < d.length; k++)d[k].remove(); if (d = !a || !1 !== ("function" == typeof c ? c(g) :
                                c)) n || CKEDITOR.env.needsBrFiller || g.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT ? n || CKEDITOR.env.needsBrFiller || !(7 < document.documentMode || g.name in CKEDITOR.dtd.tr || g.name in CKEDITOR.dtd.$listItem) ? (d = f(g), d = !d || "form" == g.name && "input" == d.name) : d = !1 : d = !1; d && g.add(e(a))
                        }
                    }
                } function h(a, b) {
                    if ((!n || CKEDITOR.env.needsBrFiller) && a.type == CKEDITOR.NODE_ELEMENT && "br" == a.name && !a.attributes["data-cke-eol"]) return !0; var c; return a.type == CKEDITOR.NODE_TEXT && (c = a.value.match(A)) && (c.index && ((new CKEDITOR.htmlParser.text(a.value.substring(0,
                        c.index))).insertBefore(a), a.value = c[0]), !CKEDITOR.env.needsBrFiller && n && (!b || a.parent.name in u) || !n && ((c = a.previous) && "br" == c.name || !c || l(c))) ? !0 : !1
                } var m = { elements: {} }, n = "html" == c, u = CKEDITOR.tools.extend({}, y), M; for (M in u) "#" in D[M] || delete u[M]; for (M in u) m.elements[M] = g(n, a.config.fillEmptyBlocks); m.root = g(n, !1); m.elements.br = function (a) {
                    return function (c) {
                        if (c.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                            var g = c.attributes; if ("data-cke-bogus" in g || "data-cke-eol" in g) delete g["data-cke-bogus"];
                            else { for (g = c.next; g && d(g);)g = g.next; var f = b(c); !g && l(c.parent) ? k(c.parent, e(a)) : l(g) && f && !l(f) && e(a).insertBefore(g) }
                        }
                    }
                }(n); return m
            } function h(a, b) { return a != CKEDITOR.ENTER_BR && !1 !== b ? a == CKEDITOR.ENTER_DIV ? "div" : "p" : !1 } function f(a) { for (a = a.children[a.children.length - 1]; a && d(a);)a = a.previous; return a } function b(a) { for (a = a.previous; a && d(a);)a = a.previous; return a } function d(a) { return a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(a.value) || a.type == CKEDITOR.NODE_ELEMENT && a.attributes["data-cke-bookmark"] }
            function l(a) { return a && (a.type == CKEDITOR.NODE_ELEMENT && a.name in y || a.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) } function k(a, b) { var c = a.children[a.children.length - 1]; a.children.push(b); b.parent = a; c && (c.next = b, b.previous = c) } function m(a) { a = a.attributes; "false" != a.contenteditable && (a["data-cke-editable"] = a.contenteditable ? "true" : 1); a.contenteditable = "false" } function g(a) { a = a.attributes; switch (a["data-cke-editable"]) { case "true": a.contenteditable = "true"; break; case "1": delete a.contenteditable } } function e(a) {
                return a.replace(G,
                    function (a, b, c) { return "\x3c" + b + c.replace(H, function (a, b) { return L.test(b) && -1 == c.indexOf("data-cke-saved-" + b) ? " data-cke-saved-" + a + " data-cke-" + CKEDITOR.rnd + "-" + a : a }) + "\x3e" })
            } function c(a, b) { return a.replace(b, function (a, b, c) { 0 === a.indexOf("\x3ctextarea") && (a = b + w(c).replace(/</g, "\x26lt;").replace(/>/g, "\x26gt;") + "\x3c/textarea\x3e"); return "\x3ccke:encoded\x3e" + encodeURIComponent(a) + "\x3c/cke:encoded\x3e" }) } function n(a) { return a.replace(I, function (a, b) { return decodeURIComponent(b) }) } function u(a) {
                return a.replace(/\x3c!--(?!{cke_protected})[\s\S]+?--\x3e/g,
                    function (a) { return "\x3c!--" + v + "{C}" + encodeURIComponent(a).replace(/--/g, "%2D%2D") + "--\x3e" })
            } function w(a) { return a.replace(/\x3c!--\{cke_protected\}\{C\}([\s\S]+?)--\x3e/g, function (a, b) { return decodeURIComponent(b) }) } function p(a, b) { var c = b._.dataStore; return a.replace(/\x3c!--\{cke_protected\}([\s\S]+?)--\x3e/g, function (a, b) { return decodeURIComponent(b) }).replace(/\{cke_protected_(\d+)\}/g, function (a, b) { return c && c[b] || "" }) } function q(a, b) {
                var c = [], e = b.config.protectedSource, g = b._.dataStore || (b._.dataStore =
                    { id: 1 }), d = /<\!--\{cke_temp(comment)?\}(\d*?)--\x3e/g, e = [/<script[\s\S]*?(<\/script>|$)/gi, /<noscript[\s\S]*?<\/noscript>/gi, /<meta[\s\S]*?\/?>/gi].concat(e); a = a.replace(/\x3c!--[\s\S]*?--\x3e/g, function (a) { return "\x3c!--{cke_tempcomment}" + (c.push(a) - 1) + "--\x3e" }); for (var k = 0; k < e.length; k++)a = a.replace(e[k], function (a) { a = a.replace(d, function (a, b, e) { return c[e] }); return /cke_temp(comment)?/.test(a) ? a : "\x3c!--{cke_temp}" + (c.push(a) - 1) + "--\x3e" }); a = a.replace(d, function (a, b, e) {
                        return "\x3c!--" + v + (b ? "{C}" :
                            "") + encodeURIComponent(c[e]).replace(/--/g, "%2D%2D") + "--\x3e"
                    }); a = a.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g, function (a) { return a.replace(/\x3c!--\{cke_protected\}([^>]*)--\x3e/g, function (a, b) { g[g.id] = decodeURIComponent(b); return "{cke_protected_" + g.id++ + "}" }) }); return a = a.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g, function (a, c, e, g) { return "\x3c" + c + e + "\x3e" + p(w(g), b) + "\x3c/" + c + "\x3e" })
            } var r; CKEDITOR.htmlDataProcessor = function (b) {
                var g,
                d, k = this; this.editor = b; this.dataFilter = g = new CKEDITOR.htmlParser.filter; this.htmlFilter = d = new CKEDITOR.htmlParser.filter; this.writer = new CKEDITOR.htmlParser.basicWriter; g.addRules(z); g.addRules(B, { applyToAll: !0 }); g.addRules(a(b, "data"), { applyToAll: !0 }); d.addRules(C); d.addRules(E, { applyToAll: !0 }); d.addRules(a(b, "html"), { applyToAll: !0 }); b.on("toHtml", function (a) {
                    a = a.data; var g = a.dataValue, d, g = r(g), g = q(g, b), g = c(g, S), g = e(g), g = c(g, K), g = g.replace(F, "$1cke:$2"), g = g.replace(M, "\x3ccke:$1$2\x3e\x3c/cke:$1\x3e"),
                        g = g.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"), g = g.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi, "$1data-cke-" + CKEDITOR.rnd + "-$2"); d = a.context || b.editable().getName(); var k; CKEDITOR.env.ie && 9 > CKEDITOR.env.version && "pre" == d && (d = "div", g = "\x3cpre\x3e" + g + "\x3c/pre\x3e", k = 1); d = b.document.createElement(d); d.setHtml("a" + g); g = d.getHtml().substr(1); g = g.replace(new RegExp("data-cke-" + CKEDITOR.rnd + "-", "ig"), ""); k && (g = g.replace(/^<pre>|<\/pre>$/gi, "")); g = g.replace(P, "$1$2"); g = n(g); g = w(g); d = !1 === a.fixForBody ? !1 :
                            h(a.enterMode, b.config.autoParagraph); g = CKEDITOR.htmlParser.fragment.fromHtml(g, a.context, d); d && (k = g, !k.children.length && CKEDITOR.dtd[k.name][d] && (d = new CKEDITOR.htmlParser.element(d), k.add(d))); a.dataValue = g
                }, null, null, 5); b.on("toHtml", function (a) { a.data.filter.applyTo(a.data.dataValue, !0, a.data.dontFilter, a.data.enterMode) && b.fire("dataFiltered") }, null, null, 6); b.on("toHtml", function (a) { a.data.dataValue.filterChildren(k.dataFilter, !0) }, null, null, 10); b.on("toHtml", function (a) {
                    a = a.data; var b = a.dataValue,
                        c = new CKEDITOR.htmlParser.basicWriter; b.writeChildrenHtml(c); b = c.getHtml(!0); a.dataValue = u(b)
                }, null, null, 15); b.on("toDataFormat", function (a) { var c = a.data.dataValue; a.data.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/^<br *\/?>/i, "")); a.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(c, a.data.context, h(a.data.enterMode, b.config.autoParagraph)) }, null, null, 5); b.on("toDataFormat", function (a) { a.data.dataValue.filterChildren(k.htmlFilter, !0) }, null, null, 10); b.on("toDataFormat", function (a) {
                    a.data.filter.applyTo(a.data.dataValue,
                        !1, !0)
                }, null, null, 11); b.on("toDataFormat", function (a) { var c = a.data.dataValue, e = k.writer; e.reset(); c.writeChildrenHtml(e); c = e.getHtml(!0); c = w(c); c = p(c, b); a.data.dataValue = c }, null, null, 15)
            }; CKEDITOR.htmlDataProcessor.prototype = {
                toHtml: function (a, b, c, e) {
                    var g = this.editor, d, k, f, l; b && "object" == typeof b ? (d = b.context, c = b.fixForBody, e = b.dontFilter, k = b.filter, f = b.enterMode, l = b.protectedWhitespaces) : d = b; d || null === d || (d = g.editable().getName()); return g.fire("toHtml", {
                        dataValue: a, context: d, fixForBody: c, dontFilter: e,
                        filter: k || g.filter, enterMode: f || g.enterMode, protectedWhitespaces: l
                    }).dataValue
                }, toDataFormat: function (a, b) { var c, e, g; b && (c = b.context, e = b.filter, g = b.enterMode); c || null === c || (c = this.editor.editable().getName()); return this.editor.fire("toDataFormat", { dataValue: a, filter: e || this.editor.filter, context: c, enterMode: g || this.editor.enterMode }).dataValue }, protectSource: function (a) { return q(a, this.editor) }, unprotectSource: function (a) { return p(a, this.editor) }, unprotectRealComments: function (a) { return w(a) }
            }; var A =
                /(?:&nbsp;|\xa0)$/, v = "{cke_protected}", D = CKEDITOR.dtd, t = "caption colgroup col thead tfoot tbody".split(" "), y = CKEDITOR.tools.extend({}, D.$blockLimit, D.$block), z = { elements: { input: m, textarea: m } }, B = {
                    attributeNames: [[/^on/, "data-cke-pa-on"], [/^srcdoc/, "data-cke-pa-srcdoc"], [/^data-cke-expando$/, ""]], elements: {
                        iframe: function (a) {
                            if (a.attributes && a.attributes.src) {
                                var b = a.attributes.src.toLowerCase().replace(/[^a-z]/gi, ""); if (0 === b.indexOf("javascript") || 0 === b.indexOf("data")) a.attributes["data-cke-pa-src"] =
                                    a.attributes.src, delete a.attributes.src
                            }
                        }
                    }
                }, C = { elements: { embed: function (a) { var b = a.parent; if (b && "object" == b.name) { var c = b.attributes.width, b = b.attributes.height; c && (a.attributes.width = c); b && (a.attributes.height = b) } }, a: function (a) { var b = a.attributes; if (!(a.children.length || b.name || b.id || a.attributes["data-cke-saved-name"])) return !1 } } }, E = {
                    elementNames: [[/^cke:/, ""], [/^\?xml:namespace$/, ""]], attributeNames: [[/^data-cke-(saved|pa)-/, ""], [/^data-cke-.*/, ""], ["hidefocus", ""]], elements: {
                        $: function (a) {
                            var b =
                                a.attributes; if (b) { if (b["data-cke-temp"]) return !1; for (var c = ["name", "href", "src"], e, g = 0; g < c.length; g++)e = "data-cke-saved-" + c[g], e in b && delete b[c[g]] } return a
                        }, table: function (a) { a.children.slice(0).sort(function (a, b) { var c, e; a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type && (c = CKEDITOR.tools.indexOf(t, a.name), e = CKEDITOR.tools.indexOf(t, b.name)); -1 < c && -1 < e && c != e || (c = a.parent ? a.getIndex() : -1, e = b.parent ? b.getIndex() : -1); return c > e ? 1 : -1 }) }, param: function (a) { a.children = []; a.isEmpty = !0; return a }, span: function (a) {
                            "Apple-style-span" ==
                            a.attributes["class"] && delete a.name
                        }, html: function (a) { delete a.attributes.contenteditable; delete a.attributes["class"] }, body: function (a) { delete a.attributes.spellcheck; delete a.attributes.contenteditable }, style: function (a) { var b = a.children[0]; b && b.value && (b.value = CKEDITOR.tools.trim(b.value)); a.attributes.type || (a.attributes.type = "text/css") }, title: function (a) { var b = a.children[0]; !b && k(a, b = new CKEDITOR.htmlParser.text); b.value = a.attributes["data-cke-title"] || "" }, input: g, textarea: g
                    }, attributes: {
                        "class": function (a) {
                            return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g,
                                "")) || !1
                        }
                    }
                }; CKEDITOR.env.ie && (E.attributes.style = function (a) { return a.replace(/(^|;)([^\:]+)/g, function (a) { return a.toLowerCase() }) }); var G = /<(a|area|img|input|source)\b([^>]*)>/gi, H = /([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi, L = /^(href|src|name)$/i, K = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi, S = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi, I = /<cke:encoded>([^<]*)<\/cke:encoded>/gi, F = /(<\/?)((?:object|embed|param|html|body|head|title)([\s][^>]*)?>)/gi,
                    P = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi, M = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi; r = function () {
                        function a(b, c) { for (var e = 0; e < b.length; e++) { var g = b[e]; g.lastIndex = 0; if (g.test(c)) return !0 } return !1 } function b(a) { return CKEDITOR.tools.array.reduce(a.split(""), function (a, b) { var e = b.toLowerCase(), g = b.toUpperCase(), d = c(e); e !== g && (d += "|" + c(g)); return a + ("(" + d + ")") }, "") } function c(a) {
                            var b; b = a.charCodeAt(0); var e = b.toString(16); b = {
                                htmlCode: "\x26#" + b + ";?", hex: "\x26#x0*" + e + ";?", entity: {
                                    "\x3c": "\x26lt;",
                                    "\x3e": "\x26gt;", ":": "\x26colon;"
                                }[a]
                            }; for (var g in b) b[g] && (a += "|" + b[g]); return a
                        } var e = [new RegExp("(" + b("\x3ccke:encoded\x3e") + "(.*?)" + b("\x3c/cke:encoded\x3e") + ")|(" + b("\x3c") + b("/") + "?" + b("cke:encoded\x3e") + ")", "gi"), new RegExp("((" + b("{cke_protected") + ")(_[0-9]*)?" + b("}") + ")", "gi"), /<!(?:\s*-\s*){2,3}!?\s*>/g]; return function (b) { for (; a(e, b);)for (var c = e, g = 0; g < c.length; g++)b = b.replace(c[g], ""); return b }
                    }()
        })(); "use strict"; CKEDITOR.htmlParser.element = function (a, h) {
            this.name = a; this.attributes =
                h || {}; this.children = []; var f = a || "", b = f.match(/^cke:(.*)/); b && (f = b[1]); f = !!(CKEDITOR.dtd.$nonBodyContent[f] || CKEDITOR.dtd.$block[f] || CKEDITOR.dtd.$listItem[f] || CKEDITOR.dtd.$tableContent[f] || CKEDITOR.dtd.$nonEditable[f] || "br" == f); this.isEmpty = !!CKEDITOR.dtd.$empty[a]; this.isUnknown = !CKEDITOR.dtd[a]; this._ = { isBlockLike: f, hasInlineStarted: this.isEmpty || !f }
        }; CKEDITOR.htmlParser.cssStyle = function (a) {
            var h = {}; ((a instanceof CKEDITOR.htmlParser.element ? a.attributes.style : a) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g,
                function (a, b, d) { "font-family" == b && (d = d.replace(/["']/g, "")); h[b.toLowerCase()] = d }); return { rules: h, populate: function (a) { var b = this.toString(); b && (a instanceof CKEDITOR.dom.element ? a.setAttribute("style", b) : a instanceof CKEDITOR.htmlParser.element ? a.attributes.style = b : a.style = b) }, toString: function () { var a = [], b; for (b in h) h[b] && a.push(b, ":", h[b], ";"); return a.join("") } }
        }; (function () {
            function a(a) { return function (d) { return d.type == CKEDITOR.NODE_ELEMENT && ("string" == typeof a ? d.name == a : d.name in a) } } var h =
                function (a, d) { a = a[0]; d = d[0]; return a < d ? -1 : a > d ? 1 : 0 }, f = CKEDITOR.htmlParser.fragment.prototype; CKEDITOR.htmlParser.element.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
                    type: CKEDITOR.NODE_ELEMENT, add: f.add, clone: function () { return new CKEDITOR.htmlParser.element(this.name, this.attributes) }, filter: function (a, d) {
                        var f = this, k, h; d = f.getFilterContext(d); if (!f.parent) a.onRoot(d, f); for (; ;) {
                            k = f.name; if (!(h = a.onElementName(d, k))) return this.remove(), !1; f.name = h; if (!(f = a.onElement(d, f))) return this.remove(),
                                !1; if (f !== this) return this.replaceWith(f), !1; if (f.name == k) break; if (f.type != CKEDITOR.NODE_ELEMENT) return this.replaceWith(f), !1; if (!f.name) return this.replaceWithChildren(), !1
                        } k = f.attributes; var g, e; for (g in k) { for (h = k[g]; ;)if (e = a.onAttributeName(d, g)) if (e != g) delete k[g], g = e; else break; else { delete k[g]; break } e && (!1 === (h = a.onAttribute(d, f, e, h)) ? delete k[e] : k[e] = h) } f.isEmpty || this.filterChildren(a, !1, d); return !0
                    }, filterChildren: f.filterChildren, writeHtml: function (a, d) {
                        d && this.filter(d); var f = this.name,
                            k = [], m = this.attributes, g, e; a.openTag(f, m); for (g in m) k.push([g, m[g]]); a.sortAttributes && k.sort(h); g = 0; for (e = k.length; g < e; g++)m = k[g], a.attribute(m[0], m[1]); a.openTagClose(f, this.isEmpty); this.writeChildrenHtml(a); this.isEmpty || a.closeTag(f)
                    }, writeChildrenHtml: f.writeChildrenHtml, replaceWithChildren: function () { for (var a = this.children, d = a.length; d;)a[--d].insertAfter(this); this.remove() }, forEach: f.forEach, getFirst: function (b) {
                        if (!b) return this.children.length ? this.children[0] : null; "function" != typeof b &&
                            (b = a(b)); for (var d = 0, f = this.children.length; d < f; ++d)if (b(this.children[d])) return this.children[d]; return null
                    }, getHtml: function () { var a = new CKEDITOR.htmlParser.basicWriter; this.writeChildrenHtml(a); return a.getHtml() }, setHtml: function (a) { a = this.children = CKEDITOR.htmlParser.fragment.fromHtml(a).children; for (var d = 0, f = a.length; d < f; ++d)a[d].parent = this }, getOuterHtml: function () { var a = new CKEDITOR.htmlParser.basicWriter; this.writeHtml(a); return a.getHtml() }, split: function (a) {
                        for (var d = this.children.splice(a,
                            this.children.length - a), f = this.clone(), k = 0; k < d.length; ++k)d[k].parent = f; f.children = d; d[0] && (d[0].previous = null); 0 < a && (this.children[a - 1].next = null); this.parent.add(f, this.getIndex() + 1); return f
                    }, find: function (a, d) { void 0 === d && (d = !1); var f = [], k; for (k = 0; k < this.children.length; k++) { var h = this.children[k]; "function" == typeof a && a(h) ? f.push(h) : "string" == typeof a && h.name === a && f.push(h); d && h.find && (f = f.concat(h.find(a, d))) } return f }, findOne: function (a, d) {
                        var f = null, k = CKEDITOR.tools.array.find(this.children,
                            function (k) { var g = "function" === typeof a ? a(k) : k.name === a; if (g || !d) return g; k.children && k.findOne && (f = k.findOne(a, !0)); return !!f }); return f || k || null
                    }, addClass: function (a) { if (!this.hasClass(a)) { var d = this.attributes["class"] || ""; this.attributes["class"] = d + (d ? " " : "") + a } }, removeClass: function (a) { var d = this.attributes["class"]; d && ((d = CKEDITOR.tools.trim(d.replace(new RegExp("(?:\\s+|^)" + a + "(?:\\s+|$)"), " "))) ? this.attributes["class"] = d : delete this.attributes["class"]) }, hasClass: function (a) {
                        var d = this.attributes["class"];
                        return d ? (new RegExp("(?:^|\\s)" + a + "(?\x3d\\s|$)")).test(d) : !1
                    }, getFilterContext: function (a) { var d = []; a || (a = { nonEditable: !1, nestedEditable: !1 }); a.nonEditable || "false" != this.attributes.contenteditable ? a.nonEditable && !a.nestedEditable && "true" == this.attributes.contenteditable && d.push("nestedEditable", !0) : d.push("nonEditable", !0); if (d.length) { a = CKEDITOR.tools.copy(a); for (var f = 0; f < d.length; f += 2)a[d[f]] = d[f + 1] } return a }
                }, !0)
        })(); (function () {
            var a = /{([^}]+)}/g; CKEDITOR.template = function (a) {
                this.source =
                "function" === typeof a ? a : String(a)
            }; CKEDITOR.template.prototype.output = function (h, f) { var b = ("function" === typeof this.source ? this.source(h) : this.source).replace(a, function (a, b) { return void 0 !== h[b] ? h[b] : a }); return f ? f.push(b) : b }
        })(); delete CKEDITOR.loadFullCore; CKEDITOR.instances = {}; CKEDITOR.document = new CKEDITOR.dom.document(document); CKEDITOR.add = function (a) {
            function h() { CKEDITOR.currentInstance == a && (CKEDITOR.currentInstance = null, CKEDITOR.fire("currentInstance")) } CKEDITOR.instances[a.name] = a; a.on("focus",
                function () { CKEDITOR.currentInstance != a && (CKEDITOR.currentInstance = a, CKEDITOR.fire("currentInstance")) }); a.on("blur", h); a.on("destroy", h); CKEDITOR.fire("instance", null, a)
        }; CKEDITOR.remove = function (a) { delete CKEDITOR.instances[a.name] }; (function () { var a = {}; CKEDITOR.addTemplate = function (h, f) { var b = a[h]; if (b) return b; b = { name: h, source: f }; CKEDITOR.fire("template", b); return a[h] = new CKEDITOR.template(b.source) }; CKEDITOR.getTemplate = function (h) { return a[h] } })(); (function () {
            var a = []; CKEDITOR.addCss = function (h) { a.push(h) };
            CKEDITOR.getCss = function () { return a.join("\n") }
        })(); CKEDITOR.on("instanceDestroyed", function () { CKEDITOR.tools.isEmpty(this.instances) && CKEDITOR.fire("reset") }); CKEDITOR.TRISTATE_ON = 1; CKEDITOR.TRISTATE_OFF = 2; CKEDITOR.TRISTATE_DISABLED = 0; (function () {
            CKEDITOR.inline = function (a, h) {
                a = CKEDITOR.editor._getEditorElement(a); if (!a) return null; if (CKEDITOR.editor.shouldDelayEditorCreation(a, h)) return CKEDITOR.editor.initializeDelayedEditorCreation(a, h, "inline"), null; var f = a.is("textarea") ? a : null, b = f ? f.getValue() :
                    a.getHtml(), d = new CKEDITOR.editor(h, a, CKEDITOR.ELEMENT_MODE_INLINE); f ? (d.setData(b, null, !0), a = CKEDITOR.dom.element.createFromHtml('\x3cdiv contenteditable\x3d"' + !!d.readOnly + '" class\x3d"cke_textarea_inline"\x3e' + f.getValue() + "\x3c/div\x3e", CKEDITOR.document), a.insertAfter(f), f.hide(), f.$.form && d._attachToForm()) : (h && "undefined" !== typeof h.readOnly && !h.readOnly && a.setAttribute("contenteditable", "true"), d.setData(b, null, !0)); d.on("loaded", function () {
                        d.fire("uiReady"); d.editable(a); d.container = a; d.ui.contentsElement =
                            a; d.setData(d.getData(1)); d.resetDirty(); d.fire("contentDom"); d.mode = "wysiwyg"; d.fire("mode"); d.status = "ready"; d.fireOnce("instanceReady"); CKEDITOR.fire("instanceReady", null, d)
                    }, null, null, 1E4); d.on("destroy", function () { var a = d.container; f && a && (a.clearCustomData(), a.remove()); f && f.show(); d.element.clearCustomData(); delete d.element }); return d
            }; CKEDITOR.inlineAll = function () {
                var a, h, f; for (f in CKEDITOR.dtd.$editable) for (var b = CKEDITOR.document.getElementsByTag(f), d = 0, l = b.count(); d < l; d++)a = b.getItem(d),
                    "true" != a.getAttribute("contenteditable") || a.getEditor() || (h = { element: a, config: {} }, !1 !== CKEDITOR.fire("inline", h) && CKEDITOR.inline(a, h.config))
            }; CKEDITOR.domReady(function () { !CKEDITOR.disableAutoInline && CKEDITOR.inlineAll() })
        })(); CKEDITOR.replaceClass = "ckeditor"; (function () {
            function a(a, d, l, k) {
                a = CKEDITOR.editor._getEditorElement(a); if (!a) return null; if (CKEDITOR.editor.shouldDelayEditorCreation(a, d)) return CKEDITOR.editor.initializeDelayedEditorCreation(a, d, "replace"), null; var m = new CKEDITOR.editor(d,
                    a, k); k == CKEDITOR.ELEMENT_MODE_REPLACE && (a.setStyle("visibility", "hidden"), m._.required = a.hasAttribute("required"), a.removeAttribute("required")); l && m.setData(l, null, !0); m.on("loaded", function () { m.isDestroyed() || m.isDetached() || (f(m), k == CKEDITOR.ELEMENT_MODE_REPLACE && m.config.autoUpdateElement && a.$.form && m._attachToForm(), m.setMode(m.config.startupMode, function () { m.resetDirty(); m.status = "ready"; m.fireOnce("instanceReady"); CKEDITOR.fire("instanceReady", null, m) })) }); m.on("destroy", h); return m
            } function h() {
                var a =
                    this.container, d = this.element; a && (a.clearCustomData(), a.remove()); d && (d.clearCustomData(), this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (d.show(), this._.required && d.setAttribute("required", "required")), delete this.element)
            } function f(a) {
                var d = a.name, f = a.element, k = a.elementMode, h = a.fire("uiSpace", { space: "top", html: "" }).html, g = a.fire("uiSpace", { space: "bottom", html: "" }).html, e = new CKEDITOR.template('\x3c{outerEl} id\x3d"cke_{name}" class\x3d"{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' +
                    CKEDITOR.env.cssClass + '"  dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"application"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : "") + "\x3e" + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : "") + '\x3c{outerEl} class\x3d"cke_inner cke_reset" role\x3d"presentation"\x3e{topHtml}\x3c{outerEl} id\x3d"{contentId}" class\x3d"cke_contents cke_reset" role\x3d"presentation"\x3e\x3c/{outerEl}\x3e{bottomHtml}\x3c/{outerEl}\x3e\x3c/{outerEl}\x3e'),
                d = CKEDITOR.dom.element.createFromHtml(e.output({ id: a.id, name: d, langDir: a.lang.dir, langCode: a.langCode, voiceLabel: a.title, topHtml: h ? '\x3cspan id\x3d"' + a.ui.spaceId("top") + '" class\x3d"cke_top cke_reset_all" role\x3d"presentation" style\x3d"height:auto"\x3e' + h + "\x3c/span\x3e" : "", contentId: a.ui.spaceId("contents"), bottomHtml: g ? '\x3cspan id\x3d"' + a.ui.spaceId("bottom") + '" class\x3d"cke_bottom cke_reset_all" role\x3d"presentation"\x3e' + g + "\x3c/span\x3e" : "", outerEl: CKEDITOR.env.ie ? "span" : "div" })); k == CKEDITOR.ELEMENT_MODE_REPLACE ?
                    (f.hide(), d.insertAfter(f)) : f.append(d); a.container = d; a.ui.contentsElement = a.ui.space("contents"); h && a.ui.space("top").unselectable(); g && a.ui.space("bottom").unselectable(); f = a.config.width; k = a.config.height; f && d.setStyle("width", CKEDITOR.tools.cssLength(f)); k && a.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(k)); d.disableContextMenu(); CKEDITOR.env.webkit && d.on("focus", function () { a.focus() }); a.fireOnce("uiReady")
            } CKEDITOR.replace = function (b, d) { return a(b, d, null, CKEDITOR.ELEMENT_MODE_REPLACE) };
            CKEDITOR.appendTo = function (b, d, f) { return a(b, d, f, CKEDITOR.ELEMENT_MODE_APPENDTO) }; CKEDITOR.replaceAll = function () { for (var a = document.getElementsByTagName("textarea"), d = 0; d < a.length; d++) { var f = null, k = a[d]; if (k.name || k.id) { if ("string" == typeof arguments[0]) { if (!(new RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)")).test(k.className)) continue } else if ("function" == typeof arguments[0] && (f = {}, !1 === arguments[0](k, f))) continue; this.replace(k, f) } } }; CKEDITOR.editor.prototype.addMode = function (a, d) {
                (this._.modes || (this._.modes =
                    {}))[a] = d
            }; CKEDITOR.editor.prototype.setMode = function (a, d) {
                var f = this, k = this._.modes; if (a != f.mode && k && k[a]) {
                    f.fire("beforeSetMode", a); if (f.mode) { var h = f.checkDirty(), k = f._.previousModeData, g, e = 0; f.fire("beforeModeUnload"); f.editable(0); f._.previousMode = f.mode; f._.previousModeData = g = f.getData(1); "source" == f.mode && k == g && (f.fire("lockSnapshot", { forceUpdate: !0 }), e = 1); f.ui.space("contents").setHtml(""); f.mode = "" } else f._.previousModeData = f.getData(1); this._.modes[a](function () {
                        f.mode = a; void 0 !== h && !h &&
                            f.resetDirty(); e ? f.fire("unlockSnapshot") : "wysiwyg" == a && f.fire("saveSnapshot"); setTimeout(function () { f.isDestroyed() || f.isDetached() || (f.fire("mode"), d && d.call(f)) }, 0)
                    })
                }
            }; CKEDITOR.editor.prototype.resize = function (a, d, f, k) {
                var h = this.container, g = this.ui.space("contents"), e = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement; k = k ? this.container.getFirst(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner") }) : h; if (a || 0 === a) a = CKEDITOR.tools.convertToPx(CKEDITOR.tools.cssLength(a));
                k.setSize("width", a, !0); e && (e.style.width = "1%"); d = CKEDITOR.tools.convertToPx(CKEDITOR.tools.cssLength(d)); var c = (k.$.offsetHeight || 0) - (g.$.clientHeight || 0), h = Math.max(d - (f ? 0 : c), 0); d = f ? d + c : d; g.setStyle("height", CKEDITOR.tools.cssLength(h)); e && (e.style.width = "100%"); this.fire("resize", { outerHeight: d, contentsHeight: h, outerWidth: a || k.getSize("width") })
            }; CKEDITOR.editor.prototype.getResizable = function (a) { return a ? this.ui.space("contents") : this.container }; CKEDITOR.domReady(function () {
                CKEDITOR.replaceClass &&
                CKEDITOR.replaceAll(CKEDITOR.replaceClass)
            })
        })(); CKEDITOR.config.startupMode = "wysiwyg"; (function () {
            function a(a) {
                var c = a.editor, e = a.data.path, d = e.blockLimit, k = a.data.selection, f = k.getRanges()[0], l; if (CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller) if (k = h(k, e)) k.appendBogus(), l = CKEDITOR.env.ie && !CKEDITOR.env.edge || CKEDITOR.env.edge && c._.previousActive; g(c, e.block, d) && f.collapsed && !f.getCommonAncestor().isReadOnly() && (e = f.clone(), e.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), d = new CKEDITOR.dom.walker(e),
                    d.guard = function (a) { return !b(a) || a.type == CKEDITOR.NODE_COMMENT || a.isReadOnly() }, !d.checkForward() || e.checkStartOfBlock() && e.checkEndOfBlock()) && (c = f.fixBlock(!0, c.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p"), CKEDITOR.env.needsBrFiller || (c = c.getFirst(b)) && c.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(c.getText()).match(/^(?:&nbsp;|\xa0)$/) && c.remove(), l = 1, a.cancel()); l && f.select()
            } function h(a, c) {
                if (a.isFake) return 0; var e = c.block || c.blockLimit, g = e && e.getLast(b); if (!(!e || !e.isBlockBoundary() ||
                    g && g.type == CKEDITOR.NODE_ELEMENT && g.isBlockBoundary() || e.is("pre") || e.getBogus())) return e
            } function f(a) { var b = a.data.getTarget(); b.is("input") && (b = b.getAttribute("type"), "submit" != b && "reset" != b || a.data.preventDefault()) } function b(a) { return w(a) && p(a) } function d(a, b) { return function (c) { var e = c.data.$.toElement || c.data.$.fromElement || c.data.$.relatedTarget; (e = e && e.nodeType == CKEDITOR.NODE_ELEMENT ? new CKEDITOR.dom.element(e) : null) && (b.equals(e) || b.contains(e)) || a.call(this, c) } } function l(a) {
                return !!a.getRanges()[0].startPath().contains({
                    table: 1,
                    ul: 1, ol: 1, dl: 1
                })
            } function k(a) { function c(a) { var g = { table: 1, ul: 1, ol: 1, dl: 1 }; return function (c, d) { d && c.type == CKEDITOR.NODE_ELEMENT && c.is(g) && (e = c); if (!(d || !b(c) || a && r(c))) return !1 } } var e, g = a.getRanges()[0], d = a.root; return l(a) && (a = g.clone(), a.collapse(1), a.setStartAt(d, CKEDITOR.POSITION_AFTER_START), d = new CKEDITOR.dom.walker(a), d.guard = c(), d.checkBackward(), e) ? (a = g.clone(), a.collapse(), a.setEndAt(e, CKEDITOR.POSITION_AFTER_END), d = new CKEDITOR.dom.walker(a), d.guard = c(!0), e = !1, d.checkForward(), e) : null }
            function m(a) { return a.block.getParent().getChildCount() } function g(a, b, c) { return !1 !== a.config.autoParagraph && a.activeEnterMode != CKEDITOR.ENTER_BR && (a.editable().equals(c) && !b || b && "true" == b.getAttribute("contenteditable")) } function e(a) { return a.activeEnterMode != CKEDITOR.ENTER_BR && !1 !== a.config.autoParagraph ? a.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : !1 } function c(a) { a && a.isEmptyInlineRemoveable() && a.remove() } function n(a) {
                var b = a.editor; b.getSelection().scrollIntoView(); setTimeout(function () { b.fire("saveSnapshot") },
                    0)
            } function u(a, b, c) { var e = a.getCommonAncestor(b); for (b = a = c ? b : a; (a = a.getParent()) && !e.equals(a) && 1 == a.getChildCount();)b = a; b.remove() } var w, p, q, r, A, v, D, t, y, z, B = { ul: 1, ol: 1, dl: 1 }; CKEDITOR.editable = CKEDITOR.tools.createClass({
                base: CKEDITOR.dom.element, $: function (a, b) { this.base(b.$ || b); this.editor = a; this.status = "unloaded"; this.hasFocus = !1; this.setup() }, proto: {
                    focus: function () {
                        var a; if (CKEDITOR.env.webkit && !this.hasFocus && (a = this.editor._.previousActive || this.getDocument().getActive(), this.contains(a))) {
                            a.focus();
                            return
                        } CKEDITOR.env.edge && 14 < CKEDITOR.env.version && !this.hasFocus && this.getDocument().equals(CKEDITOR.document) && (this.editor._.previousScrollTop = this.$.scrollTop); try { if (!CKEDITOR.env.ie || CKEDITOR.env.edge && 14 < CKEDITOR.env.version || !this.getDocument().equals(CKEDITOR.document)) if (CKEDITOR.env.chrome) { var b = this.$.scrollTop; this.$.focus(); this.$.scrollTop = b } else this.$.focus(); else this.$.setActive() } catch (c) { if (!CKEDITOR.env.ie) throw c; } CKEDITOR.env.safari && !this.isInline() && (a = CKEDITOR.document.getActive(),
                            a.equals(this.getWindow().getFrame()) || this.getWindow().focus())
                    }, on: function (a, b) { var c = Array.prototype.slice.call(arguments, 0); CKEDITOR.env.ie && /^focus|blur$/.exec(a) && (a = "focus" == a ? "focusin" : "focusout", b = d(b, this), c[0] = a, c[1] = b); return CKEDITOR.dom.element.prototype.on.apply(this, c) }, attachListener: function (a) { !this._.listeners && (this._.listeners = []); var b = Array.prototype.slice.call(arguments, 1), b = a.on.apply(a, b); this._.listeners.push(b); return b }, clearListeners: function () {
                        var a = this._.listeners;
                        try { for (; a.length;)a.pop().removeListener() } catch (b) { }
                    }, restoreAttrs: function () { var a = this._.attrChanges, b, c; for (c in a) a.hasOwnProperty(c) && (b = a[c], null !== b ? this.setAttribute(c, b) : this.removeAttribute(c)) }, attachClass: function (a) { var b = this.getCustomData("classes"); this.hasClass(a) || (!b && (b = []), b.push(a), this.setCustomData("classes", b), this.addClass(a)) }, changeAttr: function (a, b) {
                        var c = this.getAttribute(a); b !== c && (!this._.attrChanges && (this._.attrChanges = {}), a in this._.attrChanges || (this._.attrChanges[a] =
                            c), this.setAttribute(a, b))
                    }, insertText: function (a) { this.editor.focus(); this.insertHtml(this.transformPlainTextToHtml(a), "text") }, transformPlainTextToHtml: function (a) { var b = this.editor.getSelection().getStartElement().hasAscendant("pre", !0) ? CKEDITOR.ENTER_BR : this.editor.activeEnterMode; return CKEDITOR.tools.transformPlainTextToHtml(a, b) }, insertHtml: function (a, b, c) {
                        var e = this.editor; e.focus(); e.fire("saveSnapshot"); c || (c = e.getSelection().getRanges()[0]); v(this, b || "html", a, c); c.select(); n(this); this.editor.fire("afterInsertHtml",
                            {})
                    }, insertHtmlIntoRange: function (a, b, c) { v(this, c || "html", a, b); this.editor.fire("afterInsertHtml", { intoRange: b }) }, insertElement: function (a, c) {
                        var e = this.editor; e.focus(); e.fire("saveSnapshot"); var g = e.activeEnterMode, e = e.getSelection(), d = a.getName(), d = CKEDITOR.dtd.$block[d]; c || (c = e.getRanges()[0]); this.insertElementIntoRange(a, c) && (c.moveToPosition(a, CKEDITOR.POSITION_AFTER_END), d && ((d = a.getNext(function (a) { return b(a) && !r(a) })) && d.type == CKEDITOR.NODE_ELEMENT && d.is(CKEDITOR.dtd.$block) ? d.getDtd()["#"] ?
                            c.moveToElementEditStart(d) : c.moveToElementEditEnd(a) : d || g == CKEDITOR.ENTER_BR || (d = c.fixBlock(!0, g == CKEDITOR.ENTER_DIV ? "div" : "p"), c.moveToElementEditStart(d)))); e.selectRanges([c]); n(this)
                    }, insertElementIntoSelection: function (a) { this.insertElement(a) }, insertElementIntoRange: function (a, b) {
                        var e = this.editor, g = e.config.enterMode, d = a.getName(), k = CKEDITOR.dtd.$block[d]; if (b.checkReadOnly()) return !1; b.deleteContents(1); b.startContainer.type == CKEDITOR.NODE_ELEMENT && (b.startContainer.is({
                            tr: 1, table: 1, tbody: 1,
                            thead: 1, tfoot: 1
                        }) ? D(b) : b.startContainer.is(CKEDITOR.dtd.$list) && t(b)); var f, h; if (k) for (; (f = b.getCommonAncestor(0, 1)) && (h = CKEDITOR.dtd[f.getName()]) && (!h || !h[d]);)if (f.getName() in CKEDITOR.dtd.span) { var k = b.splitElement(f), l = b.createBookmark(); c(f); c(k); b.moveToBookmark(l) } else b.checkStartOfBlock() && b.checkEndOfBlock() ? (b.setStartBefore(f), b.collapse(!0), f.remove()) : b.splitBlock(g == CKEDITOR.ENTER_DIV ? "div" : "p", e.editable()); b.insertNode(a); return !0
                    }, setData: function (a, b) {
                        b || (a = this.editor.dataProcessor.toHtml(a));
                        this.setHtml(a); this.fixInitialSelection(); "unloaded" == this.status && (this.status = "ready"); this.editor.fire("dataReady")
                    }, getData: function (a) { var b = this.getHtml(); a || (b = this.editor.dataProcessor.toDataFormat(b)); return b }, setReadOnly: function (a) { this.setAttribute("contenteditable", !a) }, detach: function () {
                        this.status = "detached"; this.editor.setData(this.editor.getData(), { internal: !0 }); this.clearListeners(); try { this._.cleanCustomData() } catch (a) { if (!CKEDITOR.env.ie || -2146828218 !== a.number) throw a; } this.editor.fire("contentDomUnload");
                        delete this.editor.document; delete this.editor.window; delete this.editor
                    }, isInline: function () { return this.getDocument().equals(CKEDITOR.document) }, fixInitialSelection: function () {
                        function a() {
                            var b = c.getDocument().$, e = b.getSelection(), g; a: if (e.anchorNode && e.anchorNode == c.$) g = !0; else { if (CKEDITOR.env.webkit && (g = c.getDocument().getActive()) && g.equals(c) && !e.anchorNode) { g = !0; break a } g = void 0 } g && (g = new CKEDITOR.dom.range(c), g.moveToElementEditStart(c), b = b.createRange(), b.setStart(g.startContainer.$, g.startOffset),
                                b.collapse(!0), e.removeAllRanges(), e.addRange(b))
                        } function b() { var a = c.getDocument().$, e = a.selection, g = c.getDocument().getActive(); "None" == e.type && g.equals(c) && (e = new CKEDITOR.dom.range(c), a = a.body.createTextRange(), e.moveToElementEditStart(c), e = e.startContainer, e.type != CKEDITOR.NODE_ELEMENT && (e = e.getParent()), a.moveToElementText(e.$), a.collapse(!0), a.select()) } var c = this; if (CKEDITOR.env.ie && (9 > CKEDITOR.env.version || CKEDITOR.env.quirks)) this.hasFocus && (this.focus(), b()); else if (this.hasFocus) this.focus(),
                            a(); else this.once("focus", function () { a() }, null, null, -999)
                    }, getHtmlFromRange: function (a) { if (a.collapsed) return new CKEDITOR.dom.documentFragment(a.document); a = { doc: this.getDocument(), range: a.clone() }; y.eol.detect(a, this); y.bogus.exclude(a); y.cell.shrink(a); a.fragment = a.range.cloneContents(); y.tree.rebuild(a, this); y.eol.fix(a, this); return new CKEDITOR.dom.documentFragment(a.fragment.$) }, extractHtmlFromRange: function (a, b) {
                        var c = z, e = { range: a, doc: a.document }, g = this.getHtmlFromRange(a); if (a.collapsed) return a.optimize(),
                            g; a.enlarge(CKEDITOR.ENLARGE_INLINE, 1); c.table.detectPurge(e); e.bookmark = a.createBookmark(); delete e.range; var d = this.editor.createRange(); d.moveToPosition(e.bookmark.startNode, CKEDITOR.POSITION_BEFORE_START); e.targetBookmark = d.createBookmark(); c.list.detectMerge(e, this); c.table.detectRanges(e, this); c.block.detectMerge(e, this); e.tableContentsRanges ? (c.table.deleteRanges(e), a.moveToBookmark(e.bookmark), e.range = a) : (a.moveToBookmark(e.bookmark), e.range = a, a.extractContents(c.detectExtractMerge(e))); a.moveToBookmark(e.targetBookmark);
                        a.optimize(); c.fixUneditableRangePosition(a); c.list.merge(e, this); c.table.purge(e, this); c.block.merge(e, this); if (b) { c = a.startPath(); if (e = a.checkStartOfBlock() && a.checkEndOfBlock() && c.block && !a.root.equals(c.block)) { a: { var e = c.block.getElementsByTag("span"), d = 0, k; if (e) for (; k = e.getItem(d++);)if (!p(k)) { e = !0; break a } e = !1 } e = !e } e && (a.moveToPosition(c.block, CKEDITOR.POSITION_BEFORE_START), c.block.remove()) } else c.autoParagraph(this.editor, a), q(a.startContainer) && a.startContainer.appendBogus(); a.startContainer.mergeSiblings();
                        return g
                    }, setup: function () {
                        var a = this.editor; this.attachListener(a, "beforeGetData", function () { var b = this.getData(); this.is("textarea") || !1 !== a.config.ignoreEmptyParagraph && (b = b.replace(A, function (a, b) { return b })); a.setData(b, null, 1) }, this); this.attachListener(a, "getSnapshot", function (a) { a.data = this.getData(1) }, this); this.attachListener(a, "afterSetData", function () { this.setData(a.getData(1)) }, this); this.attachListener(a, "loadSnapshot", function (a) { this.setData(a.data, 1) }, this); this.attachListener(a,
                            "beforeFocus", function () { var b = a.getSelection(); (b = b && b.getNative()) && "Control" == b.type || this.focus() }, this); this.attachListener(a, "insertHtml", function (a) { this.insertHtml(a.data.dataValue, a.data.mode, a.data.range) }, this); this.attachListener(a, "insertElement", function (a) { this.insertElement(a.data) }, this); this.attachListener(a, "insertText", function (a) { this.insertText(a.data) }, this); this.setReadOnly(a.readOnly); this.attachClass("cke_editable"); a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? this.attachClass("cke_editable_inline") :
                                a.elementMode != CKEDITOR.ELEMENT_MODE_REPLACE && a.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || this.attachClass("cke_editable_themed"); this.attachClass("cke_contents_" + a.config.contentsLangDirection); a.keystrokeHandler.blockedKeystrokes[8] = +a.readOnly; a.keystrokeHandler.attach(this); this.on("blur", function () { this.hasFocus = !1 }, null, null, -1); this.on("focus", function () { this.hasFocus = !0 }, null, null, -1); if (CKEDITOR.env.webkit) this.on("scroll", function () { a._.previousScrollTop = a.editable().$.scrollTop }, null,
                                    null, -1); if (CKEDITOR.env.edge && 14 < CKEDITOR.env.version) { var c = function () { var b = a.editable(); null != a._.previousScrollTop && b.getDocument().equals(CKEDITOR.document) && (b.$.scrollTop = a._.previousScrollTop, a._.previousScrollTop = null, this.removeListener("scroll", c)) }; this.on("scroll", c) } a.focusManager.add(this); this.equals(CKEDITOR.document.getActive()) && (this.hasFocus = !0, a.once("contentDom", function () { a.focusManager.focus(this) }, this)); this.isInline() && this.changeAttr("tabindex", a.tabIndex); if (!this.is("textarea")) {
                                        a.document =
                                        this.getDocument(); a.window = this.getWindow(); var e = a.document; this.changeAttr("spellcheck", !a.config.disableNativeSpellChecker); var g = a.config.contentsLangDirection; this.getDirection(1) != g && this.changeAttr("dir", g); var d = CKEDITOR.getCss(); if (d) {
                                            var g = e.getHead(), h = g.getCustomData("stylesheet"); h ? d != h.getText() && (CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? h.$.styleSheet.cssText = d : h.setText(d)) : (d = e.appendStyleText(d), d = new CKEDITOR.dom.element(d.ownerNode || d.owningElement), g.setCustomData("stylesheet",
                                                d), d.data("cke-temp", 1))
                                        } g = e.getCustomData("stylesheet_ref") || 0; e.setCustomData("stylesheet_ref", g + 1); this.setCustomData("cke_includeReadonly", !a.config.disableReadonlyStyling); this.attachListener(this, "click", function (a) { a = a.data; var b = (new CKEDITOR.dom.elementPath(a.getTarget(), this)).contains("a"); b && 2 != a.$.button && b.isReadOnly() && a.preventDefault() }); var n = { 8: 1, 46: 1 }; this.attachListener(a, "key", function (b) {
                                            if (a.readOnly) return !0; var c = b.data.domEvent.getKey(), e, g = a.getSelection(); if (0 !== g.getRanges().length) {
                                                if (c in
                                                    n) {
                                                        var d; b = g.getRanges()[0]; var f = b.startPath(), h, u, v, c = 8 == c, r = !1; if (CKEDITOR.env.ie && 11 > CKEDITOR.env.version && g.getSelectedElement()) d = g.getSelectedElement(); else if (l(g)) {
                                                            var L = new CKEDITOR.dom.walker(b), t = b.collapsed ? b.startContainer : L.next(), r = !1, q; if (b.checkStartOfBlock()) { q = b.startPath().block || b.startPath().blockLimit; var p = q.getName(); q = -1 !== CKEDITOR.tools.array.indexOf(["dd", "dt", "li"], p) && null === q.getPrevious() } else q = !1; if (q) {
                                                                for (; t && !r;)r = t.$.nodeName.toLowerCase(), r = !!B[r], t = L.next();
                                                                L = m(b.startPath()); t = m(b.endPath()); r = r || L !== t
                                                            } else r = void 0; r || (d = k(g))
                                                        } d || r ? (a.fire("saveSnapshot"), r ? ((e = b.startContainer.getAscendant(B, !0)) ? (b.setStart(e, 0), b.enlarge(CKEDITOR.ENLARGE_ELEMENT), d = b) : d = null, d.deleteContents()) : (b.moveToPosition(d, CKEDITOR.POSITION_BEFORE_START), d.remove()), b.select(), a.fire("saveSnapshot"), e = 1) : b.collapsed && ((h = f.block) && (v = h[c ? "getPrevious" : "getNext"](w)) && v.type == CKEDITOR.NODE_ELEMENT && v.is("table") && b[c ? "checkStartOfBlock" : "checkEndOfBlock"]() ? (a.fire("saveSnapshot"),
                                                            b[c ? "checkEndOfBlock" : "checkStartOfBlock"]() && h.remove(), b["moveToElementEdit" + (c ? "End" : "Start")](v), b.select(), a.fire("saveSnapshot"), e = 1) : f.blockLimit && f.blockLimit.is("td") && (u = f.blockLimit.getAscendant("table")) && b.checkBoundaryOfElement(u, c ? CKEDITOR.START : CKEDITOR.END) && (v = u[c ? "getPrevious" : "getNext"](w)) ? (a.fire("saveSnapshot"), b["moveToElementEdit" + (c ? "End" : "Start")](v), b.checkStartOfBlock() && b.checkEndOfBlock() ? v.remove() : b.select(), a.fire("saveSnapshot"), e = 1) : (u = f.contains(["td", "th", "caption"])) &&
                                                                b.checkBoundaryOfElement(u, c ? CKEDITOR.START : CKEDITOR.END) && (e = 1))
                                                } return !e
                                            }
                                        }); a.blockless && CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller && this.attachListener(this, "keyup", function (c) { c.data.getKeystroke() in n && !this.getFirst(b) && (this.appendBogus(), c = a.createRange(), c.moveToPosition(this, CKEDITOR.POSITION_AFTER_START), c.select()) }); this.attachListener(this, "dblclick", function (b) { if (a.readOnly) return !1; b = { element: b.data.getTarget() }; a.fire("doubleclick", b) }); CKEDITOR.env.ie && this.attachListener(this,
                                            "click", f); CKEDITOR.env.ie && !CKEDITOR.env.edge || this.attachListener(this, "mousedown", function (b) { var c = b.data.getTarget(); c.is("img", "hr", "input", "textarea", "select") && !c.isReadOnly() && (a.getSelection().selectElement(c), c.is("input", "textarea", "select") && b.data.preventDefault()) }); CKEDITOR.env.edge && this.attachListener(this, "mouseup", function (b) { (b = b.data.getTarget()) && b.is("img") && !b.isReadOnly() && a.getSelection().selectElement(b) }); CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function (b) {
                                                if (2 ==
                                                    b.data.$.button && (b = b.data.getTarget(), !b.getAscendant("table") && !b.getOuterHtml().replace(A, ""))) { var c = a.createRange(); c.moveToElementEditStart(b); c.select(!0) }
                                            }); CKEDITOR.env.webkit && (this.attachListener(this, "click", function (a) { a.data.getTarget().is("input", "select") && a.data.preventDefault() }), this.attachListener(this, "mouseup", function (a) { a.data.getTarget().is("input", "textarea") && a.data.preventDefault() })); CKEDITOR.env.webkit && this.attachListener(a, "key", function (b) {
                                                if (a.readOnly) return !0; var c =
                                                    b.data.domEvent.getKey(); if (c in n && (b = a.getSelection(), 0 !== b.getRanges().length)) {
                                                        var c = 8 == c, e = b.getRanges()[0]; b = e.startPath(); if (e.collapsed) a: {
                                                            var g = b.block; if (g && e[c ? "checkStartOfBlock" : "checkEndOfBlock"](!0) && e.moveToClosestEditablePosition(g, !c) && e.collapsed) {
                                                                if (e.startContainer.type == CKEDITOR.NODE_ELEMENT) { var d = e.startContainer.getChild(e.startOffset - (c ? 1 : 0)); if (d && d.type == CKEDITOR.NODE_ELEMENT && d.is("hr")) { a.fire("saveSnapshot"); d.remove(); b = !0; break a } } e = e.startPath().block; if (!e || e && e.contains(g)) b =
                                                                    void 0; else { a.fire("saveSnapshot"); var k; (k = (c ? e : g).getBogus()) && k.remove(); k = a.getSelection(); d = k.createBookmarks(); (c ? g : e).moveChildren(c ? e : g, !1); b.lastElement.mergeSiblings(); u(g, e, !c); k.selectBookmarks(d); b = !0 }
                                                            } else b = !1
                                                        } else c = e, k = b.block, e = c.endPath().block, k && e && !k.equals(e) ? (a.fire("saveSnapshot"), (g = k.getBogus()) && g.remove(), c.enlarge(CKEDITOR.ENLARGE_INLINE), c.deleteContents(), e.getParent() && (e.moveChildren(k, !1), b.lastElement.mergeSiblings(), u(k, e, !0)), c = a.getSelection().getRanges()[0],
                                                            c.collapse(1), c.optimize(), "" === c.startContainer.getHtml() && c.startContainer.appendBogus(), c.select(), b = !0) : b = !1; if (!b) return; a.getSelection().scrollIntoView(); a.fire("saveSnapshot"); return !1
                                                    }
                                            }, this, null, 100)
                                    }
                    }, getUniqueId: function () { var a; try { this._.expandoNumber = a = CKEDITOR.dom.domObject.prototype.getUniqueId.call(this) } catch (b) { a = this._ && this._.expandoNumber } return a }
                }, _: {
                    cleanCustomData: function () {
                        this.removeClass("cke_editable"); this.restoreAttrs(); for (var a = this.removeCustomData("classes"); a &&
                            a.length;)this.removeClass(a.pop()); if (!this.is("textarea")) { var a = this.getDocument(), b = a.getHead(); if (b.getCustomData("stylesheet")) { var c = a.getCustomData("stylesheet_ref"); --c ? a.setCustomData("stylesheet_ref", c) : (a.removeCustomData("stylesheet_ref"), b.removeCustomData("stylesheet").remove()) } }
                    }
                }
            }); CKEDITOR.editor.prototype.editable = function (a) {
                var b = this._.editable; if (b && a) return 0; if (!arguments.length) return b; a ? b = a instanceof CKEDITOR.editable ? a : new CKEDITOR.editable(this, a) : (b && b.detach(), b =
                    null); return this._.editable = b
            }; CKEDITOR.on("instanceLoaded", function (b) {
                var c = b.editor; c.on("insertElement", function (a) { a = a.data; a.type == CKEDITOR.NODE_ELEMENT && (a.is("input") || a.is("textarea")) && ("false" != a.getAttribute("contentEditable") && a.data("cke-editable", a.hasAttribute("contenteditable") ? "true" : "1"), a.setAttribute("contentEditable", !1)) }); c.on("selectionChange", function (b) {
                    if (!c.readOnly) {
                        var e = c.getSelection(); e && !e.isLocked && (e = c.checkDirty(), c.fire("lockSnapshot"), a(b), c.fire("unlockSnapshot"),
                            !e && c.resetDirty())
                    }
                })
            }); CKEDITOR.on("instanceCreated", function (a) {
                var b = a.editor; b.on("mode", function () {
                    var a = b.editable(); if (a && a.isInline()) {
                        var c = b.title; a.changeAttr("role", "textbox"); a.changeAttr("aria-multiline", "true"); a.changeAttr("aria-label", c); c && a.changeAttr("title", c); var e = b.fire("ariaEditorHelpLabel", {}).label; if (e && (c = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents"))) {
                            var g = CKEDITOR.tools.getNextId(), e = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' +
                                g + '" class\x3d"cke_voice_label"\x3e' + e + "\x3c/span\x3e"); c.append(e); a.changeAttr("aria-describedby", g)
                        }
                    }
                })
            }); CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}"); w = CKEDITOR.dom.walker.whitespaces(!0); p = CKEDITOR.dom.walker.bookmark(!1, !0); q = CKEDITOR.dom.walker.empty(); r = CKEDITOR.dom.walker.bogus(); A = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi; v =
                function () {
                    function a(b) { return b.type == CKEDITOR.NODE_ELEMENT } function d(b, c) {
                        var e, g, k, f, h = [], l = c.range.startContainer; e = c.range.startPath(); for (var l = n[l.getName()], m = 0, u = b.getChildren(), M = u.count(), v = -1, r = -1, w = 0, t = e.contains(n.$list); m < M; ++m)e = u.getItem(m), a(e) ? (k = e.getName(), t && k in CKEDITOR.dtd.$list ? h = h.concat(d(e, c)) : (f = !!l[k], "br" != k || !e.data("cke-eol") || m && m != M - 1 || (w = (g = m ? h[m - 1].node : u.getItem(m + 1)) && (!a(g) || !g.is("br")), g = g && a(g) && n.$block[g.getName()]), -1 != v || f || (v = m), f || (r = m), h.push({
                            isElement: 1,
                            isLineBreak: w, isBlock: e.isBlockBoundary(), hasBlockSibling: g, node: e, name: k, allowed: f
                        }), g = w = 0)) : h.push({ isElement: 0, node: e, allowed: 1 }); -1 < v && (h[v].firstNotAllowed = 1); -1 < r && (h[r].lastNotAllowed = 1); return h
                    } function k(b, c) { var e = [], g = b.getChildren(), d = g.count(), f, h = 0, l = n[c], m = !b.is(n.$inline) || b.is("br"); for (m && e.push(" "); h < d; h++)f = g.getItem(h), a(f) && !f.is(l) ? e = e.concat(k(f, c)) : e.push(f); m && e.push(" "); return e } function f(b) { return a(b.startContainer) && b.startContainer.getChild(b.startOffset - 1) } function h(b) {
                        return b &&
                            a(b) && (b.is(n.$removeEmpty) || b.is("a") && !b.isBlockBoundary())
                    } function l(b, c, e, g) { var d = b.clone(), k, f; d.setEndAt(c, CKEDITOR.POSITION_BEFORE_END); (k = (new CKEDITOR.dom.walker(d)).next()) && a(k) && u[k.getName()] && (f = k.getPrevious()) && a(f) && !f.getParent().equals(b.startContainer) && e.contains(f) && g.contains(k) && k.isIdentical(f) && (k.moveChildren(f), k.remove(), l(b, c, e, g)) } function m(b, c) {
                        function e(b, c) { if (c.isBlock && c.isElement && !c.node.is("br") && a(b) && b.is("br")) return b.remove(), 1 } var g = c.endContainer.getChild(c.endOffset),
                            d = c.endContainer.getChild(c.endOffset - 1); g && e(g, b[b.length - 1]); d && e(d, b[0]) && (c.setEnd(c.endContainer, c.endOffset - 1), c.collapse())
                    } var n = CKEDITOR.dtd, u = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, ul: 1, ol: 1, li: 1, pre: 1, dl: 1, blockquote: 1 }, v = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }, M = CKEDITOR.tools.extend({}, n.$inline); delete M.br; return function (u, r, w, t) {
                        var q = u.editor, p = !1, z; "unfiltered_html" == r && (r = "html", p = !0); if (!t.checkReadOnly()) {
                            var D = (new CKEDITOR.dom.elementPath(t.startContainer, t.root)).blockLimit ||
                                t.root; r = { type: r, dontFilter: p, editable: u, editor: q, range: t, blockLimit: D, mergeCandidates: [], zombies: [] }; var p = r.range, D = r.mergeCandidates, y = "html" === r.type, F, B, x, Z, aa; "text" == r.type && p.shrink(CKEDITOR.SHRINK_ELEMENT, !0, !1) && (B = CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", p.document), p.insertNode(B), p.setStartAfter(B)); x = new CKEDITOR.dom.elementPath(p.startContainer); r.endPath = Z = new CKEDITOR.dom.elementPath(p.endContainer); if (!p.collapsed) {
                                    F = Z.block || Z.blockLimit; var ca = p.getCommonAncestor();
                                    F && !F.equals(ca) && !F.contains(ca) && p.checkEndOfBlock() && r.zombies.push(F); p.deleteContents()
                                } for (; (aa = f(p)) && a(aa) && aa.isBlockBoundary() && x.contains(aa);)p.moveToPosition(aa, CKEDITOR.POSITION_BEFORE_END); l(p, r.blockLimit, x, Z); B && (p.setEndBefore(B), p.collapse(), B.remove()); B = p.startPath(); if (F = B.contains(h, !1, 1)) z = p.splitElement(F), r.inlineStylesRoot = F, r.inlineStylesPeak = B.lastElement; B = p.createBookmark(); y && (c(F), c(z)); (F = B.startNode.getPrevious(b)) && a(F) && h(F) && D.push(F); (F = B.startNode.getNext(b)) &&
                                    a(F) && h(F) && D.push(F); for (F = B.startNode; (F = F.getParent()) && h(F);)D.push(F); p.moveToBookmark(B); z = u.getHtml(); z = "" === z || z.match(A); q.enterMode === CKEDITOR.ENTER_DIV && z && ((q = u.getFirst()) && q.remove(), t.setStartAt(u, CKEDITOR.POSITION_AFTER_START), t.collapse(!0)); if (u = w) {
                                        u = r.range; if ("text" == r.type && r.inlineStylesRoot) { t = r.inlineStylesPeak; q = t.getDocument().createText("{cke-peak}"); for (z = r.inlineStylesRoot.getParent(); !t.equals(z);)q = q.appendTo(t.clone()), t = t.getParent(); w = q.getOuterHtml().split("{cke-peak}").join(w) } t =
                                            r.blockLimit.getName(); if (/^\s+|\s+$/.test(w) && "span" in CKEDITOR.dtd[t]) { var V = '\x3cspan data-cke-marker\x3d"1"\x3e\x26nbsp;\x3c/span\x3e'; w = V + w + V } w = r.editor.dataProcessor.toHtml(w, { context: null, fixForBody: !1, protectedWhitespaces: !!V, dontFilter: r.dontFilter, filter: r.editor.activeFilter, enterMode: r.editor.activeEnterMode }); t = u.document.createElement("body"); t.setHtml(w); V && (t.getFirst().remove(), t.getLast().remove()); if ((V = u.startPath().block) && (1 != V.getChildCount() || !V.getBogus())) a: {
                                                var Q; if (1 ==
                                                    t.getChildCount() && a(Q = t.getFirst()) && Q.is(v) && !Q.hasAttribute("contenteditable")) { V = Q.getElementsByTag("*"); u = 0; for (z = V.count(); u < z; u++)if (q = V.getItem(u), !q.is(M)) break a; Q.moveChildren(Q.getParent(1)); Q.remove() }
                                            } r.dataWrapper = t; u = w
                                    } if (u) {
                                        Q = r.range; u = Q.document; t = r.blockLimit; z = 0; var J, V = [], ea, R; w = B = 0; var ba, q = Q.startContainer; aa = r.endPath.elements[0]; var W, p = aa.getPosition(q), D = !!aa.getCommonAncestor(q) && p != CKEDITOR.POSITION_IDENTICAL && !(p & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED),
                                            q = d(r.dataWrapper, r); for (r.editor.enterMode !== CKEDITOR.ENTER_BR && m(q, Q); z < q.length; z++) {
                                                p = q[z]; if (y = p.isLineBreak) y = Q, F = t, Z = x = void 0, p.hasBlockSibling ? y = 1 : (x = y.startContainer.getAscendant(n.$block, 1)) && x.is({ div: 1, p: 1 }) ? (Z = x.getPosition(F), Z == CKEDITOR.POSITION_IDENTICAL || Z == CKEDITOR.POSITION_CONTAINS ? y = 0 : (F = y.splitElement(x), y.moveToPosition(F, CKEDITOR.POSITION_AFTER_START), y = 1)) : y = 0; if (y) w = 0 < z; else {
                                                    y = Q.startPath(); !p.isBlock && g(r.editor, y.block, y.blockLimit) && (R = e(r.editor)) && (R = u.createElement(R),
                                                        R.appendBogus(), Q.insertNode(R), CKEDITOR.env.needsBrFiller && (J = R.getBogus()) && J.remove(), Q.moveToPosition(R, CKEDITOR.POSITION_BEFORE_END)); if ((y = Q.startPath().block) && !y.equals(ea)) { if (J = y.getBogus()) J.remove(), V.push(y); ea = y } p.firstNotAllowed && (B = 1); if (B && p.isElement) {
                                                            y = Q.startContainer; for (F = null; y && !n[y.getName()][p.name];) { if (y.equals(t)) { y = null; break } F = y; y = y.getParent() } if (y) F && (ba = Q.splitElement(F), r.zombies.push(ba), r.zombies.push(F)); else {
                                                                F = t.getName(); W = !z; y = z == q.length - 1; F = k(p.node, F); x =
                                                                    []; Z = F.length; for (var ca = 0, la = void 0, ma = 0, na = -1; ca < Z; ca++)la = F[ca], " " == la ? (ma || W && !ca || (x.push(new CKEDITOR.dom.text(" ")), na = x.length), ma = 1) : (x.push(la), ma = 0); y && na == x.length && x.pop(); W = x
                                                            }
                                                        } if (W) { for (; y = W.pop();)Q.insertNode(y); W = 0 } else Q.insertNode(p.node); p.lastNotAllowed && z < q.length - 1 && ((ba = D ? aa : ba) && Q.setEndAt(ba, CKEDITOR.POSITION_AFTER_START), B = 0); Q.collapse()
                                                }
                                            } 1 != q.length ? J = !1 : (J = q[0], J = J.isElement && "false" == J.node.getAttribute("contenteditable")); J && (w = !0, y = q[0].node, Q.setStartAt(y, CKEDITOR.POSITION_BEFORE_START),
                                                Q.setEndAt(y, CKEDITOR.POSITION_AFTER_END)); r.dontMoveCaret = w; r.bogusNeededBlocks = V
                                    } J = r.range; var ga; W = r.bogusNeededBlocks; for (ea = J.createBookmark(); R = r.zombies.pop();)R.getParent() && (ba = J.clone(), ba.moveToElementEditStart(R), ba.removeEmptyBlocksAtEnd()); if (W) for (; R = W.pop();)CKEDITOR.env.needsBrFiller ? R.appendBogus() : R.append(J.document.createText(" ")); for (; R = r.mergeCandidates.pop();)R.mergeSiblings(); CKEDITOR.env.webkit && J.startPath() && (R = J.startPath(), R.block ? R.block.$.normalize() : R.blockLimit &&
                                        R.blockLimit.$.normalize()); J.moveToBookmark(ea); if (!r.dontMoveCaret) { for (R = f(J); R && a(R) && !R.is(n.$empty);) { if (R.isBlockBoundary()) J.moveToPosition(R, CKEDITOR.POSITION_BEFORE_END); else { if (h(R) && R.getHtml().match(/(\s|&nbsp;)$/g)) { ga = null; break } ga = J.clone(); ga.moveToPosition(R, CKEDITOR.POSITION_BEFORE_END) } R = R.getLast(b) } ga && J.moveToRange(ga) }
                        }
                    }
                }(); D = function () {
                    function a(b) {
                        b = new CKEDITOR.dom.walker(b); b.guard = function (a, b) { if (b) return !1; if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$tableContent) };
                        b.evaluator = function (a) { return a.type == CKEDITOR.NODE_ELEMENT }; return b
                    } function b(a, c, e) { c = a.getDocument().createElement(c); a.append(c, e); return c } function c(a) { var b = a.count(), e; for (b; 0 < b--;)e = a.getItem(b), CKEDITOR.tools.trim(e.getHtml()) || (e.appendBogus(), CKEDITOR.env.ie && 9 > CKEDITOR.env.version && e.getChildCount() && e.getFirst().remove()) } return function (e) {
                        var g = e.startContainer, d = g.getAscendant("table", 1), k = !1; c(d.getElementsByTag("td")); c(d.getElementsByTag("th")); d = e.clone(); d.setStart(g, 0); d =
                            a(d).lastBackward(); d || (d = e.clone(), d.setEndAt(g, CKEDITOR.POSITION_BEFORE_END), d = a(d).lastForward(), k = !0); d || (d = g); d.is("table") ? (e.setStartAt(d, CKEDITOR.POSITION_BEFORE_START), e.collapse(!0), d.remove()) : (d.is({ tbody: 1, thead: 1, tfoot: 1 }) && (d = b(d, "tr", k)), d.is("tr") && (d = b(d, d.getParent().is("thead") ? "th" : "td", k)), (g = d.getBogus()) && g.remove(), e.moveToPosition(d, k ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END))
                    }
                }(); t = function () {
                    function a(b) {
                        b = new CKEDITOR.dom.walker(b); b.guard = function (a,
                            b) { if (b) return !1; if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$list) || a.is(CKEDITOR.dtd.$listItem) }; b.evaluator = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$listItem) }; return b
                    } return function (b) {
                        var c = b.startContainer, e = !1, g; g = b.clone(); g.setStart(c, 0); g = a(g).lastBackward(); g || (g = b.clone(), g.setEndAt(c, CKEDITOR.POSITION_BEFORE_END), g = a(g).lastForward(), e = !0); g || (g = c); g.is(CKEDITOR.dtd.$list) ? (b.setStartAt(g, CKEDITOR.POSITION_BEFORE_START), b.collapse(!0), g.remove()) :
                            ((c = g.getBogus()) && c.remove(), b.moveToPosition(g, e ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END), b.select())
                    }
                }(); y = {
                    eol: {
                        detect: function (a, b) {
                            var c = a.range, e = c.clone(), g = c.clone(), d = new CKEDITOR.dom.elementPath(c.startContainer, b), k = new CKEDITOR.dom.elementPath(c.endContainer, b); e.collapse(1); g.collapse(); d.block && e.checkBoundaryOfElement(d.block, CKEDITOR.END) && (c.setStartAfter(d.block), a.prependEolBr = 1); k.block && g.checkBoundaryOfElement(k.block, CKEDITOR.START) && (c.setEndBefore(k.block),
                                a.appendEolBr = 1)
                        }, fix: function (a, b) { var c = b.getDocument(), e; a.appendEolBr && (e = this.createEolBr(c), a.fragment.append(e)); !a.prependEolBr || e && !e.getPrevious() || a.fragment.append(this.createEolBr(c), 1) }, createEolBr: function (a) { return a.createElement("br", { attributes: { "data-cke-eol": 1 } }) }
                    }, bogus: { exclude: function (a) { var b = a.range.getBoundaryNodes(), c = b.startNode, b = b.endNode; !b || !r(b) || c && c.equals(b) || a.range.setEndBefore(b) } }, tree: {
                        rebuild: function (a, b) {
                            var c = a.range, e = c.getCommonAncestor(), g = new CKEDITOR.dom.elementPath(e,
                                b), d = new CKEDITOR.dom.elementPath(c.startContainer, b), c = new CKEDITOR.dom.elementPath(c.endContainer, b), k; e.type == CKEDITOR.NODE_TEXT && (e = e.getParent()); if (g.blockLimit.is({ tr: 1, table: 1 })) { var f = g.contains("table").getParent(); k = function (a) { return !a.equals(f) } } else if (g.block && g.block.is(CKEDITOR.dtd.$listItem) && (d = d.contains(CKEDITOR.dtd.$list), c = c.contains(CKEDITOR.dtd.$list), !d.equals(c))) { var h = g.contains(CKEDITOR.dtd.$list).getParent(); k = function (a) { return !a.equals(h) } } k || (k = function (a) {
                                    return !a.equals(g.block) &&
                                        !a.equals(g.blockLimit)
                                }); this.rebuildFragment(a, b, e, k)
                        }, rebuildFragment: function (a, b, c, e) { for (var g; c && !c.equals(b) && e(c);)g = c.clone(0, 1), a.fragment.appendTo(g), a.fragment = g, c = c.getParent() }
                    }, cell: { shrink: function (a) { a = a.range; var b = a.startContainer, c = a.endContainer, e = a.startOffset, g = a.endOffset; b.type == CKEDITOR.NODE_ELEMENT && b.equals(c) && b.is("tr") && ++e == g && a.shrink(CKEDITOR.SHRINK_TEXT) } }
                }; z = function () {
                    function a(b, c) { var e = b.getParent(); if (e.is(CKEDITOR.dtd.$inline)) b[c ? "insertBefore" : "insertAfter"](e) }
                    function b(c, e, g) { a(e); a(g, 1); for (var d; d = g.getNext();)d.insertAfter(e), e = d; q(c) && c.remove() } function c(a, b) { var e = new CKEDITOR.dom.range(a); e.setStartAfter(b.startNode); e.setEndBefore(b.endNode); return e } return {
                        list: {
                            detectMerge: function (a, b) {
                                var e = c(b, a.bookmark), g = e.startPath(), d = e.endPath(), k = g.contains(CKEDITOR.dtd.$list), f = d.contains(CKEDITOR.dtd.$list); a.mergeList = k && f && k.getParent().equals(f.getParent()) && !k.equals(f); a.mergeListItems = g.block && d.block && g.block.is(CKEDITOR.dtd.$listItem) &&
                                    d.block.is(CKEDITOR.dtd.$listItem); if (a.mergeList || a.mergeListItems) e = e.clone(), e.setStartBefore(a.bookmark.startNode), e.setEndAfter(a.bookmark.endNode), a.mergeListBookmark = e.createBookmark()
                            }, merge: function (a, c) {
                                if (a.mergeListBookmark) {
                                    var e = a.mergeListBookmark.startNode, g = a.mergeListBookmark.endNode, d = new CKEDITOR.dom.elementPath(e, c), k = new CKEDITOR.dom.elementPath(g, c); if (a.mergeList) { var f = d.contains(CKEDITOR.dtd.$list), h = k.contains(CKEDITOR.dtd.$list); f.equals(h) || (h.moveChildren(f), h.remove()) } a.mergeListItems &&
                                        (d = d.contains(CKEDITOR.dtd.$listItem), k = k.contains(CKEDITOR.dtd.$listItem), d.equals(k) || b(k, e, g)); e.remove(); g.remove()
                                }
                            }
                        }, block: {
                            detectMerge: function (a, b) { if (!a.tableContentsRanges && !a.mergeListBookmark) { var c = new CKEDITOR.dom.range(b); c.setStartBefore(a.bookmark.startNode); c.setEndAfter(a.bookmark.endNode); a.mergeBlockBookmark = c.createBookmark() } }, merge: function (a, c) {
                                if (a.mergeBlockBookmark && !a.purgeTableBookmark) {
                                    var e = a.mergeBlockBookmark.startNode, g = a.mergeBlockBookmark.endNode, d = new CKEDITOR.dom.elementPath(e,
                                        c), k = new CKEDITOR.dom.elementPath(g, c), d = d.block, k = k.block; d && k && !d.equals(k) && b(k, e, g); e.remove(); g.remove()
                                }
                            }
                        }, table: function () {
                            function a(c) {
                                var g = [], d, k = new CKEDITOR.dom.walker(c), f = c.startPath().contains(e), h = c.endPath().contains(e), l = {}; k.guard = function (a, k) {
                                    if (a.type == CKEDITOR.NODE_ELEMENT) { var m = "visited_" + (k ? "out" : "in"); if (a.getCustomData(m)) return; CKEDITOR.dom.element.setMarker(l, a, m, 1) } if (k && f && a.equals(f)) d = c.clone(), d.setEndAt(f, CKEDITOR.POSITION_BEFORE_END), g.push(d); else if (!k && h &&
                                        a.equals(h)) d = c.clone(), d.setStartAt(h, CKEDITOR.POSITION_AFTER_START), g.push(d); else { if (m = !k) m = a.type == CKEDITOR.NODE_ELEMENT && a.is(e) && (!f || b(a, f)) && (!h || b(a, h)); if (!m && (m = k)) if (a.is(e)) var m = f && f.getAscendant("table", !0), n = h && h.getAscendant("table", !0), u = a.getAscendant("table", !0), m = m && m.contains(u) || n && n.contains(u); else m = void 0; m && (d = c.clone(), d.selectNodeContents(a), g.push(d)) }
                                }; k.lastForward(); CKEDITOR.dom.element.clearAllMarkers(l); return g
                            } function b(a, c) {
                                var e = CKEDITOR.POSITION_CONTAINS +
                                    CKEDITOR.POSITION_IS_CONTAINED, g = a.getPosition(c); return g === CKEDITOR.POSITION_IDENTICAL ? !1 : 0 === (g & e)
                            } var e = { td: 1, th: 1, caption: 1 }; return {
                                detectPurge: function (a) {
                                    var b = a.range, c = b.clone(); c.enlarge(CKEDITOR.ENLARGE_ELEMENT); var c = new CKEDITOR.dom.walker(c), g = 0; c.evaluator = function (a) { a.type == CKEDITOR.NODE_ELEMENT && a.is(e) && ++g }; c.checkForward(); if (1 < g) {
                                        var c = b.startPath().contains("table"), d = b.endPath().contains("table"); c && d && b.checkBoundaryOfElement(c, CKEDITOR.START) && b.checkBoundaryOfElement(d,
                                            CKEDITOR.END) && (b = a.range.clone(), b.setStartBefore(c), b.setEndAfter(d), a.purgeTableBookmark = b.createBookmark())
                                    }
                                }, detectRanges: function (g, d) {
                                    var k = c(d, g.bookmark), f = k.clone(), h, l, m = k.getCommonAncestor(); m.is(CKEDITOR.dtd.$tableContent) && !m.is(e) && (m = m.getAscendant("table", !0)); l = m; m = new CKEDITOR.dom.elementPath(k.startContainer, l); l = new CKEDITOR.dom.elementPath(k.endContainer, l); m = m.contains("table"); l = l.contains("table"); if (m || l) m && l && b(m, l) ? (g.tableSurroundingRange = f, f.setStartAt(m, CKEDITOR.POSITION_AFTER_END),
                                        f.setEndAt(l, CKEDITOR.POSITION_BEFORE_START), f = k.clone(), f.setEndAt(m, CKEDITOR.POSITION_AFTER_END), h = k.clone(), h.setStartAt(l, CKEDITOR.POSITION_BEFORE_START), h = a(f).concat(a(h))) : m ? l || (g.tableSurroundingRange = f, f.setStartAt(m, CKEDITOR.POSITION_AFTER_END), k.setEndAt(m, CKEDITOR.POSITION_AFTER_END)) : (g.tableSurroundingRange = f, f.setEndAt(l, CKEDITOR.POSITION_BEFORE_START), k.setStartAt(l, CKEDITOR.POSITION_AFTER_START)), g.tableContentsRanges = h ? h : a(k)
                                }, deleteRanges: function (a) {
                                    for (var b; b = a.tableContentsRanges.pop();)b.extractContents(),
                                        q(b.startContainer) && b.startContainer.appendBogus(); a.tableSurroundingRange && a.tableSurroundingRange.extractContents()
                                }, purge: function (a) { if (a.purgeTableBookmark) { var b = a.doc, c = a.range.clone(), b = b.createElement("p"); b.insertBefore(a.purgeTableBookmark.startNode); c.moveToBookmark(a.purgeTableBookmark); c.deleteContents(); a.range.moveToPosition(b, CKEDITOR.POSITION_AFTER_START) } }
                            }
                        }(), detectExtractMerge: function (a) { return !(a.range.startPath().contains(CKEDITOR.dtd.$listItem) && a.range.endPath().contains(CKEDITOR.dtd.$listItem)) },
                        fixUneditableRangePosition: function (a) { a.startContainer.getDtd()["#"] || a.moveToClosestEditablePosition(null, !0) }, autoParagraph: function (a, b) { var c = b.startPath(), d; g(a, c.block, c.blockLimit) && (d = e(a)) && (d = b.document.createElement(d), d.appendBogus(), b.insertNode(d), b.moveToPosition(d, CKEDITOR.POSITION_AFTER_START)) }
                    }
                }()
        })(); (function () {
            function a(a) { return CKEDITOR.plugins.widget && CKEDITOR.plugins.widget.isDomWidget(a) } function h(b, c) {
                if (0 === b.length || a(b[0].getEnclosedNode())) return !1; var e, g; if ((e =
                    !c && 1 === b.length) && !(e = b[0].collapsed)) { var d = b[0]; e = d.startContainer.getAscendant({ td: 1, th: 1 }, !0); var k = d.endContainer.getAscendant({ td: 1, th: 1 }, !0); g = CKEDITOR.tools.trim; e && e.equals(k) && !e.findOne("td, th, tr, tbody, table") ? (d = d.cloneContents(), e = d.getFirst() ? g(d.getFirst().getText()) !== g(e.getText()) : !0) : e = !1 } if (e) return !1; for (g = 0; g < b.length; g++)if (e = b[g]._getTableElement(), !e) return !1; return !0
            } function f(a) {
                function b(a) {
                    a = a.find("td, th"); var c = [], e; for (e = 0; e < a.count(); e++)c.push(a.getItem(e));
                    return c
                } var c = [], e, g; for (g = 0; g < a.length; g++)e = a[g]._getTableElement(), e.is && e.is({ td: 1, th: 1 }) ? c.push(e) : c = c.concat(b(e)); return c
            } function b(a) { a = f(a); var b = "", c = [], e, g; for (g = 0; g < a.length; g++)e && !e.equals(a[g].getAscendant("tr")) ? (b += c.join("\t") + "\n", e = a[g].getAscendant("tr"), c = []) : 0 === g && (e = a[g].getAscendant("tr")), c.push(a[g].getText()); return b += c.join("\t") } function d(a) {
                var c = this.root.editor, e = c.getSelection(1); this.reset(); t = !0; e.root.once("selectionchange", function (a) { a.cancel() }, null, null,
                    0); e.selectRanges([a[0]]); e = this._.cache; e.ranges = new CKEDITOR.dom.rangeList(a); e.type = CKEDITOR.SELECTION_TEXT; e.selectedElement = a[0]._getTableElement(); e.selectedText = b(a); e.nativeSel = null; this.isFake = 1; this.rev = A++; c._.fakeSelection = this; t = !1; this.root.fire("selectionchange")
            } function l() {
                var b = this._.fakeSelection, c; if (b) {
                    c = this.getSelection(1); var e; if (!(e = !c) && (e = !c.isHidden())) {
                        e = b; var g = c.getRanges(), d = e.getRanges(), k = g.length && g[0]._getTableElement() && g[0]._getTableElement().getAscendant("table",
                            !0), f = d.length && d[0]._getTableElement() && d[0]._getTableElement().getAscendant("table", !0), l = 1 === g.length && g[0]._getTableElement() && g[0]._getTableElement().is("table"), m = 1 === d.length && d[0]._getTableElement() && d[0]._getTableElement().is("table"); if (a(e.getSelectedElement())) e = !1; else { var n = 1 === g.length && g[0].collapsed, d = h(g, !!CKEDITOR.env.webkit) && h(d); k = k && f ? k.equals(f) || f.contains(k) : !1; k && (n || d) ? (l && !m && e.selectRanges(g), e = !0) : e = !1 } e = !e
                    } e && (b.reset(), b = 0)
                } if (!b && (b = c || this.getSelection(1), !b || b.getType() ==
                    CKEDITOR.SELECTION_NONE)) return; this.fire("selectionCheck", b); c = this.elementPath(); c.compare(this._.selectionPreviousPath) || (e = this._.selectionPreviousPath && this._.selectionPreviousPath.blockLimit.equals(c.blockLimit), !CKEDITOR.env.webkit && !CKEDITOR.env.gecko || e || (this._.previousActive = this.document.getActive()), this._.selectionPreviousPath = c, this.fire("selectionChange", { selection: b, path: c }))
            } function k() { z = !0; y || (m.call(this), y = CKEDITOR.tools.setTimeout(m, 200, this)) } function m() {
                y = null; z && (CKEDITOR.tools.setTimeout(l,
                    0, this), z = !1)
            } function g(a) { return B(a) || a.type == CKEDITOR.NODE_ELEMENT && !a.is(CKEDITOR.dtd.$empty) ? !0 : !1 } function e(a) { function b(c, e) { return c && c.type != CKEDITOR.NODE_TEXT ? a.clone()["moveToElementEdit" + (e ? "End" : "Start")](c) : !1 } if (!(a.root instanceof CKEDITOR.editable)) return !1; var c = a.startContainer, e = a.getPreviousNode(g, null, c), d = a.getNextNode(g, null, c); return b(e) || b(d, 1) || !(e || d || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary() && c.getBogus()) ? !0 : !1 } function c(a) {
                n(a, !1); var b = a.getDocument().createText(v);
                a.setCustomData("cke-fillingChar", b); return b
            } function n(a, b) {
                var c = a && a.removeCustomData("cke-fillingChar"); if (c) {
                    if (!1 !== b) { var e = a.getDocument().getSelection().getNative(), g = e && "None" != e.type && e.getRangeAt(0), d = v.length; if (c.getLength() > d && g && g.intersectsNode(c.$)) { var k = [{ node: e.anchorNode, offset: e.anchorOffset }, { node: e.focusNode, offset: e.focusOffset }]; e.anchorNode == c.$ && e.anchorOffset > d && (k[0].offset -= d); e.focusNode == c.$ && e.focusOffset > d && (k[1].offset -= d) } } c.setText(u(c.getText(), 1)); k && (c = a.getDocument().$,
                        e = c.getSelection(), c = c.createRange(), c.setStart(k[0].node, k[0].offset), c.collapse(!0), e.removeAllRanges(), e.addRange(c), e.extend(k[1].node, k[1].offset))
                }
            } function u(a, b) { return b ? a.replace(D, function (a, b) { return b ? " " : "" }) : a.replace(v, "") } function w(a, b) {
                var c = b && CKEDITOR.tools.htmlEncode(b) || "\x26nbsp;", c = CKEDITOR.dom.element.createFromHtml('\x3cdiv data-cke-hidden-sel\x3d"1" data-cke-temp\x3d"1" style\x3d"' + (CKEDITOR.env.ie && 14 > CKEDITOR.env.version ? "display:none" : "position:fixed;top:0;left:-1000px;width:0;height:0;overflow:hidden;") +
                    '"\x3e' + c + "\x3c/div\x3e", a.document); a.fire("lockSnapshot"); a.editable().append(c); var e = a.getSelection(1), g = a.createRange(), d = e.root.on("selectionchange", function (a) { a.cancel() }, null, null, 0); g.setStartAt(c, CKEDITOR.POSITION_AFTER_START); g.setEndAt(c, CKEDITOR.POSITION_BEFORE_END); e.selectRanges([g]); d.removeListener(); a.fire("unlockSnapshot"); a._.hiddenSelectionContainer = c
            } function p(a) {
                var b = { 37: 1, 39: 1, 8: 1, 46: 1 }; return function (c) {
                    var e = c.data.getKeystroke(); if (b[e]) {
                        var g = a.getSelection(), d = g.getRanges()[0];
                        g.isCollapsed() && (d = d[38 > e ? "getPreviousEditableNode" : "getNextEditableNode"]()) && d.type == CKEDITOR.NODE_ELEMENT && "false" == d.getAttribute("contenteditable") && (g = g.getStartElement(), !g.isBlockBoundary() || "" !== (void 0 === g.$.textContent ? g.$.innerText : g.$.textContent) || 8 !== e && 46 !== e || (g.remove(), a.fire("saveSnapshot")), a.getSelection().fake(d), c.data.preventDefault(), c.cancel())
                    }
                }
            } function q(a) {
                for (var b = 0; b < a.length; b++) {
                    var c = a[b]; c.getCommonAncestor().isReadOnly() && a.splice(b, 1); if (!c.collapsed) {
                        if (c.startContainer.isReadOnly()) for (var e =
                            c.startContainer, g; e && !((g = e.type == CKEDITOR.NODE_ELEMENT) && e.is("body") || !e.isReadOnly());)g && "false" == e.getAttribute("contentEditable") && c.setStartAfter(e), e = e.getParent(); e = c.startContainer; g = c.endContainer; var d = c.startOffset, k = c.endOffset, f = c.clone(); e && e.type == CKEDITOR.NODE_TEXT && (d >= e.getLength() ? f.setStartAfter(e) : f.setStartBefore(e)); g && g.type == CKEDITOR.NODE_TEXT && (k ? f.setEndAfter(g) : f.setEndBefore(g)); e = new CKEDITOR.dom.walker(f); e.evaluator = function (e) {
                                if (e.type == CKEDITOR.NODE_ELEMENT &&
                                    e.isReadOnly()) { var g = c.clone(); c.setEndBefore(e); c.collapsed && a.splice(b--, 1); e.getPosition(f.endContainer) & CKEDITOR.POSITION_CONTAINS || (g.setStartAfter(e), g.collapsed || a.splice(b + 1, 0, g)); return !0 } return !1
                            }; e.next()
                    }
                } return a
            } var r = "function" != typeof window.getSelection, A = 1, v = CKEDITOR.tools.repeat("​", 7), D = new RegExp(v + "( )?", "g"), t, y, z, B = CKEDITOR.dom.walker.invisible(1), C = function () {
                function a(b) {
                    return function (a) {
                        var c = a.editor.createRange(); c.moveToClosestEditablePosition(a.selected, b) && a.editor.getSelection().selectRanges([c]);
                        return !1
                    }
                } function b(a) { return function (b) { var c = b.editor, e = c.createRange(), g; if (!c.readOnly) return (g = e.moveToClosestEditablePosition(b.selected, a)) || (g = e.moveToClosestEditablePosition(b.selected, !a)), g && c.getSelection().selectRanges([e]), c.fire("saveSnapshot"), b.selected.remove(), g || (e.moveToElementEditablePosition(c.editable()), c.getSelection().selectRanges([e])), c.fire("saveSnapshot"), !1 } } var c = a(), e = a(1); return { 37: c, 38: c, 39: e, 40: e, 8: b(), 46: b(1) }
            }(); CKEDITOR.on("instanceCreated", function (a) {
                function b() {
                    var a =
                        c.getSelection(); a && a.removeAllRanges()
                } var c = a.editor; c.on("contentDom", function () {
                    function a() { t = new CKEDITOR.dom.selection(c.getSelection()); t.lock() } function b() { f.removeListener("mouseup", b); u.removeListener("mouseup", b); var a = CKEDITOR.document.$.selection, c = a.createRange(); "None" != a.type && c.parentElement() && c.parentElement().ownerDocument == d.$ && c.select() } function e(a) {
                        var b, c; b = (b = this.document.getActive()) ? "input" === b.getName() || "textarea" === b.getName() : !1; b || (b = this.getSelection(1), (c = g(b)) &&
                            !c.equals(h) && (b.selectElement(c), a.data.preventDefault()))
                    } function g(a) { a = a.getRanges()[0]; return a ? (a = a.startContainer.getAscendant(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable") }, !0)) && "false" === a.getAttribute("contenteditable") ? a : null : null } var d = c.document, f = CKEDITOR.document, h = c.editable(), m = d.getBody(), u = d.getDocumentElement(), v = h.isInline(), w, t; CKEDITOR.env.gecko && h.attachListener(h, "focus", function (a) {
                        a.removeListener(); 0 !== w && (a = c.getSelection().getNative()) &&
                            a.isCollapsed && a.anchorNode == h.$ && (a = c.createRange(), a.moveToElementEditStart(h), a.select())
                    }, null, null, -2); h.attachListener(h, CKEDITOR.env.webkit || CKEDITOR.env.gecko ? "focusin" : "focus", function () { if (w && (CKEDITOR.env.webkit || CKEDITOR.env.gecko)) { w = c._.previousActive && c._.previousActive.equals(d.getActive()); var a = null != c._.previousScrollTop && c._.previousScrollTop != h.$.scrollTop; CKEDITOR.env.webkit && w && a && (h.$.scrollTop = c._.previousScrollTop) } c.unlockSelection(w); w = 0 }, null, null, -1); h.attachListener(h,
                        "mousedown", function () { w = 0 }); if (CKEDITOR.env.ie || CKEDITOR.env.gecko || v) r ? h.attachListener(h, "beforedeactivate", a, null, null, -1) : h.attachListener(c, "selectionCheck", a, null, null, -1), h.attachListener(h, CKEDITOR.env.webkit || CKEDITOR.env.gecko ? "focusout" : "blur", function () { var a = t && (t.isFake || 2 > t.getRanges().length); CKEDITOR.env.gecko && !v && a || (c.lockSelection(t), w = 1) }, null, null, -1), h.attachListener(h, "mousedown", function () { w = 0 }); if (CKEDITOR.env.ie && !v) {
                            var q; h.attachListener(h, "mousedown", function (a) {
                                2 ==
                                a.data.$.button && ((a = c.document.getSelection()) && a.getType() != CKEDITOR.SELECTION_NONE || (q = c.window.getScrollPosition()))
                            }); h.attachListener(h, "mouseup", function (a) { 2 == a.data.$.button && q && (c.document.$.documentElement.scrollLeft = q.x, c.document.$.documentElement.scrollTop = q.y); q = null }); if ("BackCompat" != d.$.compatMode) {
                                if (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) {
                                    var z, A; u.on("mousedown", function (a) {
                                        function b(a) {
                                            a = a.data.$; if (z) {
                                                var c = m.$.createTextRange(); try { c.moveToPoint(a.clientX, a.clientY) } catch (e) { } z.setEndPoint(0 >
                                                    A.compareEndPoints("StartToStart", c) ? "EndToEnd" : "StartToStart", c); z.select()
                                            }
                                        } function c() { u.removeListener("mousemove", b); f.removeListener("mouseup", c); u.removeListener("mouseup", c); z.select() } a = a.data; if (a.getTarget().is("html") && a.$.y < u.$.clientHeight && a.$.x < u.$.clientWidth) { z = m.$.createTextRange(); try { z.moveToPoint(a.$.clientX, a.$.clientY) } catch (e) { } A = z.duplicate(); u.on("mousemove", b); f.on("mouseup", c); u.on("mouseup", c) }
                                    })
                                } if (7 < CKEDITOR.env.version && 11 > CKEDITOR.env.version) u.on("mousedown", function (a) {
                                    a.data.getTarget().is("html") &&
                                    (f.on("mouseup", b), u.on("mouseup", b))
                                })
                            }
                        } h.attachListener(h, "selectionchange", l, c); h.attachListener(h, "keyup", k, c); h.attachListener(h, "touchstart", k, c); h.attachListener(h, "touchend", k, c); CKEDITOR.env.ie && h.attachListener(h, "keydown", e, c); h.attachListener(h, CKEDITOR.env.webkit || CKEDITOR.env.gecko ? "focusin" : "focus", function () { c.forceNextSelectionCheck(); c.selectionChange(1) }); if (v && (CKEDITOR.env.webkit || CKEDITOR.env.gecko)) {
                            var y; h.attachListener(h, "mousedown", function () { y = 1 }); h.attachListener(d.getDocumentElement(),
                                "mouseup", function () { y && k.call(c); y = 0 })
                        } else h.attachListener(CKEDITOR.env.ie ? h : d.getDocumentElement(), "mouseup", k, c); CKEDITOR.env.webkit && h.attachListener(d, "keydown", function (a) { switch (a.data.getKey()) { case 13: case 33: case 34: case 35: case 36: case 37: case 39: case 8: case 45: case 46: h.hasFocus && n(h) } }, null, null, -1); h.attachListener(h, "keydown", p(c), null, null, -1)
                }); c.on("setData", function () { c.unlockSelection(); CKEDITOR.env.webkit && b() }); c.on("contentDomUnload", function () { c.unlockSelection() }); if (CKEDITOR.env.ie9Compat) c.on("beforeDestroy",
                    b, null, null, 9); c.on("dataReady", function () { delete c._.fakeSelection; delete c._.hiddenSelectionContainer; c.selectionChange(1) }); c.on("loadSnapshot", function () { var a = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT), b = c.editable().getLast(a); b && b.hasAttribute("data-cke-hidden-sel") && (b.remove(), CKEDITOR.env.gecko && (a = c.editable().getFirst(a)) && a.is("br") && a.getAttribute("_moz_editor_bogus_node") && a.remove()) }, null, null, 100); c.on("key", function (a) {
                        if ("wysiwyg" == c.mode) {
                            var b = c.getSelection(); if (b.isFake) {
                                var e =
                                    C[a.data.keyCode]; if (e) return e({ editor: c, selected: b.getSelectedElement(), selection: b, keyEvent: a })
                            }
                        }
                    })
            }); if (CKEDITOR.env.webkit) CKEDITOR.on("instanceReady", function (a) {
                var b = a.editor; b.on("selectionChange", function () { var a = b.editable(), c = a.getCustomData("cke-fillingChar"); c && (c.getCustomData("ready") ? (n(a), a.editor.fire("selectionCheck")) : c.setCustomData("ready", 1)) }, null, null, -1); b.on("beforeSetMode", function () { n(b.editable()) }, null, null, -1); b.on("getSnapshot", function (a) { a.data && (a.data = u(a.data)) },
                    b, null, 20); b.on("toDataFormat", function (a) { a.data.dataValue = u(a.data.dataValue) }, null, null, 0)
            }); CKEDITOR.editor.prototype.selectionChange = function (a) { (a ? l : k).call(this) }; CKEDITOR.editor.prototype.getSelection = function (a) { return !this._.savedSelection && !this._.fakeSelection || a ? (a = this.editable()) && "wysiwyg" == this.mode && "recreating" !== this.status ? new CKEDITOR.dom.selection(a) : null : this._.savedSelection || this._.fakeSelection }; CKEDITOR.editor.prototype.getSelectedRanges = function (a) {
                var b = this.getSelection();
                return b && b.getRanges(a) || []
            }; CKEDITOR.editor.prototype.lockSelection = function (a) { a = a || this.getSelection(1); return a.getType() != CKEDITOR.SELECTION_NONE ? (!a.isLocked && a.lock(), this._.savedSelection = a, !0) : !1 }; CKEDITOR.editor.prototype.unlockSelection = function (a) { var b = this._.savedSelection; return b ? (b.unlock(a), delete this._.savedSelection, !0) : !1 }; CKEDITOR.editor.prototype.forceNextSelectionCheck = function () { delete this._.selectionPreviousPath }; CKEDITOR.dom.document.prototype.getSelection = function () { return new CKEDITOR.dom.selection(this) };
            CKEDITOR.dom.range.prototype.select = function () { var a = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root); a.selectRanges([this]); return a }; CKEDITOR.SELECTION_NONE = 1; CKEDITOR.SELECTION_TEXT = 2; CKEDITOR.SELECTION_ELEMENT = 3; CKEDITOR.dom.selection = function (a) {
                if (a instanceof CKEDITOR.dom.selection) { var b = a; a = a.root } var c = a instanceof CKEDITOR.dom.element; this.rev = b ? b.rev : A++; this.document = a instanceof CKEDITOR.dom.document ? a : a.getDocument(); this.root =
                    c ? a : this.document.getBody(); this.isLocked = 0; this._ = { cache: {} }; if (b) return CKEDITOR.tools.extend(this._.cache, b._.cache), this.isFake = b.isFake, this.isLocked = b.isLocked, this; a = this.getNative(); var e, g; if (a) if (a.getRangeAt) e = (g = a.rangeCount && a.getRangeAt(0)) && new CKEDITOR.dom.node(g.commonAncestorContainer); else { try { g = a.createRange() } catch (d) { } e = g && CKEDITOR.dom.element.get(g.item && g.item(0) || g.parentElement()) } if (!e || e.type != CKEDITOR.NODE_ELEMENT && e.type != CKEDITOR.NODE_TEXT || !this.root.equals(e) && !this.root.contains(e)) this._.cache.type =
                        CKEDITOR.SELECTION_NONE, this._.cache.startElement = null, this._.cache.selectedElement = null, this._.cache.selectedText = "", this._.cache.ranges = new CKEDITOR.dom.rangeList; return this
            }; var E = { img: 1, hr: 1, li: 1, table: 1, tr: 1, td: 1, th: 1, embed: 1, object: 1, ol: 1, ul: 1, a: 1, input: 1, form: 1, select: 1, textarea: 1, button: 1, fieldset: 1, thead: 1, tfoot: 1 }; CKEDITOR.tools.extend(CKEDITOR.dom.selection, { _removeFillingCharSequenceString: u, _createFillingCharSequenceNode: c, FILLING_CHAR_SEQUENCE: v }); CKEDITOR.dom.selection.prototype = {
                getNative: function () {
                    return void 0 !==
                        this._.cache.nativeSel ? this._.cache.nativeSel : this._.cache.nativeSel = r ? this.document.$.selection : this.document.getWindow().$.getSelection()
                }, getType: r ? function () { var a = this._.cache; if (a.type) return a.type; var b = CKEDITOR.SELECTION_NONE; try { var c = this.getNative(), e = c.type; "Text" == e && (b = CKEDITOR.SELECTION_TEXT); "Control" == e && (b = CKEDITOR.SELECTION_ELEMENT); c.createRange().parentElement() && (b = CKEDITOR.SELECTION_TEXT) } catch (g) { } return a.type = b } : function () {
                    var a = this._.cache; if (a.type) return a.type; var b =
                        CKEDITOR.SELECTION_TEXT, c = this.getNative(); if (!c || !c.rangeCount) b = CKEDITOR.SELECTION_NONE; else if (1 == c.rangeCount) { var c = c.getRangeAt(0), e = c.startContainer; e == c.endContainer && 1 == e.nodeType && 1 == c.endOffset - c.startOffset && E[e.childNodes[c.startOffset].nodeName.toLowerCase()] && (b = CKEDITOR.SELECTION_ELEMENT) } return a.type = b
                }, getRanges: function () {
                    var a = r ? function () {
                        function a(b) { return (new CKEDITOR.dom.node(b)).getIndex() } var b = function (b, c) {
                            b = b.duplicate(); b.collapse(c); var e = b.parentElement(); if (!e.hasChildNodes()) return {
                                container: e,
                                offset: 0
                            }; for (var g = e.children, d, k, f = b.duplicate(), h = 0, l = g.length - 1, m = -1, n, u; h <= l;)if (m = Math.floor((h + l) / 2), d = g[m], f.moveToElementText(d), n = f.compareEndPoints("StartToStart", b), 0 < n) l = m - 1; else if (0 > n) h = m + 1; else return { container: e, offset: a(d) }; if (-1 == m || m == g.length - 1 && 0 > n) {
                                f.moveToElementText(e); f.setEndPoint("StartToStart", b); f = f.text.replace(/(\r\n|\r)/g, "\n").length; g = e.childNodes; if (!f) return d = g[g.length - 1], d.nodeType != CKEDITOR.NODE_TEXT ? { container: e, offset: g.length } : { container: d, offset: d.nodeValue.length };
                                for (e = g.length; 0 < f && 0 < e;)k = g[--e], k.nodeType == CKEDITOR.NODE_TEXT && (u = k, f -= k.nodeValue.length); return { container: u, offset: -f }
                            } f.collapse(0 < n ? !0 : !1); f.setEndPoint(0 < n ? "StartToStart" : "EndToStart", b); f = f.text.replace(/(\r\n|\r)/g, "\n").length; if (!f) return { container: e, offset: a(d) + (0 < n ? 0 : 1) }; for (; 0 < f;)try { k = d[0 < n ? "previousSibling" : "nextSibling"], k.nodeType == CKEDITOR.NODE_TEXT && (f -= k.nodeValue.length, u = k), d = k } catch (v) { return { container: e, offset: a(d) } } return { container: u, offset: 0 < n ? -f : u.nodeValue.length + f }
                        };
                        return function () {
                            var a = this.getNative(), c = a && a.createRange(), e = this.getType(); if (!a) return []; if (e == CKEDITOR.SELECTION_TEXT) return a = new CKEDITOR.dom.range(this.root), e = b(c, !0), a.setStart(new CKEDITOR.dom.node(e.container), e.offset), e = b(c), a.setEnd(new CKEDITOR.dom.node(e.container), e.offset), a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() && a.collapse(), [a]; if (e == CKEDITOR.SELECTION_ELEMENT) {
                                for (var e = [], g = 0; g < c.length; g++) {
                                    for (var d =
                                        c.item(g), k = d.parentNode, f = 0, a = new CKEDITOR.dom.range(this.root); f < k.childNodes.length && k.childNodes[f] != d; f++); a.setStart(new CKEDITOR.dom.node(k), f); a.setEnd(new CKEDITOR.dom.node(k), f + 1); e.push(a)
                                } return e
                            } return []
                        }
                    }() : function () { var a = [], b, c = this.getNative(); if (!c) return a; for (var e = 0; e < c.rangeCount; e++) { var g = c.getRangeAt(e); b = new CKEDITOR.dom.range(this.root); b.setStart(new CKEDITOR.dom.node(g.startContainer), g.startOffset); b.setEnd(new CKEDITOR.dom.node(g.endContainer), g.endOffset); a.push(b) } return a };
                    return function (b) { var c = this._.cache, e = c.ranges; e || (c.ranges = e = new CKEDITOR.dom.rangeList(a.call(this))); return b ? q(new CKEDITOR.dom.rangeList(e.slice())) : e }
                }(), getStartElement: function () {
                    var a = this._.cache; if (void 0 !== a.startElement) return a.startElement; var b; switch (this.getType()) {
                        case CKEDITOR.SELECTION_ELEMENT: return this.getSelectedElement(); case CKEDITOR.SELECTION_TEXT: var c = this.getRanges()[0]; if (c) {
                            if (c.collapsed) b = c.startContainer, b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent()); else {
                                for (c.optimize(); b =
                                    c.startContainer, c.startOffset == (b.getChildCount ? b.getChildCount() : b.getLength()) && !b.isBlockBoundary();)c.setStartAfter(b); b = c.startContainer; if (b.type != CKEDITOR.NODE_ELEMENT) return b.getParent(); if ((b = b.getChild(c.startOffset)) && b.type == CKEDITOR.NODE_ELEMENT) for (c = b.getFirst(); c && c.type == CKEDITOR.NODE_ELEMENT;)b = c, c = c.getFirst(); else b = c.startContainer
                            } b = b.$
                        }
                    }return a.startElement = b ? new CKEDITOR.dom.element(b) : null
                }, getSelectedElement: function () {
                    var a = this._.cache; if (void 0 !== a.selectedElement) return a.selectedElement;
                    var b = this, c = CKEDITOR.tools.tryThese(function () { return b.getNative().createRange().item(0) }, function () { for (var a = b.getRanges()[0].clone(), c, e, g = 2; g && !((c = a.getEnclosedNode()) && c.type == CKEDITOR.NODE_ELEMENT && E[c.getName()] && (e = c)); g--)a.shrink(CKEDITOR.SHRINK_ELEMENT); return e && e.$ }); return a.selectedElement = c ? new CKEDITOR.dom.element(c) : null
                }, getSelectedText: function () {
                    var a = this._.cache; if (void 0 !== a.selectedText) return a.selectedText; var b = this.getNative(), b = r ? "Control" == b.type ? "" : b.createRange().text :
                        b.toString(); return a.selectedText = b
                }, lock: function () { this.getRanges(); this.getStartElement(); this.getSelectedElement(); this.getSelectedText(); this._.cache.nativeSel = null; this.isLocked = 1 }, unlock: function (a) {
                    if (this.isLocked) {
                        if (a) var b = this.getSelectedElement(), c = this.getRanges(), e = this.isFake; this.isLocked = 0; this.reset(); a && (a = b || c[0] && c[0].getCommonAncestor()) && a.getAscendant("body", 1) && ((a = this.root.editor) && a.plugins.tableselection && a.plugins.tableselection.isSupportedEnvironment(a) && h(c) ? d.call(this,
                            c) : e ? this.fake(b) : b && 2 > c.length ? this.selectElement(b) : this.selectRanges(c))
                    }
                }, reset: function () { this._.cache = {}; this.isFake = 0; var a = this.root.editor; if (a && a._.fakeSelection) if (this.rev == a._.fakeSelection.rev) { delete a._.fakeSelection; var b = a._.hiddenSelectionContainer; if (b) { var c = a.checkDirty(); a.fire("lockSnapshot"); b.remove(); a.fire("unlockSnapshot"); !c && a.resetDirty() } delete a._.hiddenSelectionContainer } else CKEDITOR.warn("selection-fake-reset"); this.rev = A++ }, selectElement: function (a) {
                    var b = new CKEDITOR.dom.range(this.root);
                    b.setStartBefore(a); b.setEndAfter(a); this.selectRanges([b])
                }, selectRanges: function (a) {
                    var b = this.root.editor, g = b && b._.hiddenSelectionContainer; this.reset(); if (g) for (var g = this.root, k, f = 0; f < a.length; ++f)k = a[f], k.endContainer.equals(g) && (k.endOffset = Math.min(k.endOffset, g.getChildCount())); if (a.length) if (this.isLocked) { var l = CKEDITOR.document.getActive(); this.unlock(); this.selectRanges(a); this.lock(); l && !l.equals(this.root) && l.focus() } else {
                        var m; a: {
                            var u, v; if (1 == a.length && !(v = a[0]).collapsed && (m = v.getEnclosedNode()) &&
                                m.type == CKEDITOR.NODE_ELEMENT && (v = v.clone(), v.shrink(CKEDITOR.SHRINK_ELEMENT, !0), (u = v.getEnclosedNode()) && u.type == CKEDITOR.NODE_ELEMENT && (m = u), "false" == m.getAttribute("contenteditable"))) break a; m = void 0
                        } if (m) this.fake(m); else if (b && b.plugins.tableselection && b.plugins.tableselection.isSupportedEnvironment(b) && h(a) && !t && !a[0]._getTableElement({ table: 1 }).hasAttribute("data-cke-tableselection-ignored")) d.call(this, a); else {
                            if (r) {
                                u = CKEDITOR.dom.walker.whitespaces(!0); m = /\ufeff|\u00a0/; v = {
                                    table: 1, tbody: 1,
                                    tr: 1
                                }; 1 < a.length && (b = a[a.length - 1], a[0].setEnd(b.endContainer, b.endOffset)); b = a[0]; a = b.collapsed; var w, q, p; if ((g = b.getEnclosedNode()) && g.type == CKEDITOR.NODE_ELEMENT && g.getName() in E && (!g.is("a") || !g.getText())) try { p = g.$.createControlRange(); p.addElement(g.$); p.select(); return } catch (z) { } if (b.startContainer.type == CKEDITOR.NODE_ELEMENT && b.startContainer.getName() in v || b.endContainer.type == CKEDITOR.NODE_ELEMENT && b.endContainer.getName() in v) b.shrink(CKEDITOR.NODE_ELEMENT, !0), a = b.collapsed; p = b.createBookmark();
                                v = p.startNode; a || (l = p.endNode); p = b.document.$.body.createTextRange(); p.moveToElementText(v.$); p.moveStart("character", 1); l ? (m = b.document.$.body.createTextRange(), m.moveToElementText(l.$), p.setEndPoint("EndToEnd", m), p.moveEnd("character", -1)) : (w = v.getNext(u), q = v.hasAscendant("pre"), w = !(w && w.getText && w.getText().match(m)) && (q || !v.hasPrevious() || v.getPrevious().is && v.getPrevious().is("br")), q = b.document.createElement("span"), q.setHtml("\x26#65279;"), q.insertBefore(v), w && b.document.createText("﻿").insertBefore(v));
                                b.setStartBefore(v); v.remove(); a ? (w ? (p.moveStart("character", -1), p.select(), b.document.$.selection.clear()) : p.select(), b.moveToPosition(q, CKEDITOR.POSITION_BEFORE_START), q.remove()) : (b.setEndBefore(l), l.remove(), p.select())
                            } else {
                                l = this.getNative(); if (!l) return; this.removeAllRanges(); for (p = 0; p < a.length; p++) {
                                    if (p < a.length - 1 && (w = a[p], q = a[p + 1], m = w.clone(), m.setStart(w.endContainer, w.endOffset), m.setEnd(q.startContainer, q.startOffset), !m.collapsed && (m.shrink(CKEDITOR.NODE_ELEMENT, !0), b = m.getCommonAncestor(),
                                        m = m.getEnclosedNode(), b.isReadOnly() || m && m.isReadOnly()))) { q.setStart(w.startContainer, w.startOffset); a.splice(p--, 1); continue } b = a[p]; q = this.document.$.createRange(); b.collapsed && CKEDITOR.env.webkit && e(b) && (m = c(this.root), b.insertNode(m), (w = m.getNext()) && !m.getPrevious() && w.type == CKEDITOR.NODE_ELEMENT && "br" == w.getName() ? (n(this.root), b.moveToPosition(w, CKEDITOR.POSITION_BEFORE_START)) : b.moveToPosition(m, CKEDITOR.POSITION_AFTER_END)); q.setStart(b.startContainer.$, b.startOffset); try {
                                            q.setEnd(b.endContainer.$,
                                                b.endOffset)
                                        } catch (A) { if (0 <= A.toString().indexOf("NS_ERROR_ILLEGAL_VALUE")) b.collapse(1), q.setEnd(b.endContainer.$, b.endOffset); else throw A; } l.addRange(q)
                                }
                            } this.reset(); this.root.fire("selectionchange")
                        }
                    }
                }, fake: function (a, b) {
                    var c = this.root.editor; void 0 === b && a.hasAttribute("aria-label") && (b = a.getAttribute("aria-label")); this.reset(); w(c, b); var e = this._.cache, g = new CKEDITOR.dom.range(this.root); g.setStartBefore(a); g.setEndAfter(a); e.ranges = new CKEDITOR.dom.rangeList(g); e.selectedElement = e.startElement =
                        a; e.type = CKEDITOR.SELECTION_ELEMENT; e.selectedText = e.nativeSel = null; this.isFake = 1; this.rev = A++; c._.fakeSelection = this; this.root.fire("selectionchange")
                }, isHidden: function () { var a = this.getCommonAncestor(); a && a.type == CKEDITOR.NODE_TEXT && (a = a.getParent()); return !(!a || !a.data("cke-hidden-sel")) }, isInTable: function (a) { return h(this.getRanges(), a) }, isCollapsed: function () { var a = this.getRanges(); return 1 === a.length && a[0].collapsed }, createBookmarks: function (a) {
                    a = this.getRanges().createBookmarks(a); this.isFake &&
                        (a.isFake = 1); return a
                }, createBookmarks2: function (a) { a = this.getRanges().createBookmarks2(a); this.isFake && (a.isFake = 1); return a }, selectBookmarks: function (a) { for (var b = [], c, e = 0; e < a.length; e++) { var g = new CKEDITOR.dom.range(this.root); g.moveToBookmark(a[e]); b.push(g) } a.isFake && (c = h(b) ? b[0]._getTableElement() : b[0].getEnclosedNode(), c && c.type == CKEDITOR.NODE_ELEMENT || (CKEDITOR.warn("selection-not-fake"), a.isFake = 0)); a.isFake && !h(b) ? this.fake(c) : this.selectRanges(b); return this }, getCommonAncestor: function () {
                    var a =
                        this.getRanges(); return a.length ? a[0].startContainer.getCommonAncestor(a[a.length - 1].endContainer) : null
                }, scrollIntoView: function () { this.getType() != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView() }, removeAllRanges: function () { if (this.getType() != CKEDITOR.SELECTION_NONE) { var a = this.getNative(); try { a && a[r ? "empty" : "removeAllRanges"]() } catch (b) { } this.reset() } }
            }
        })(); "use strict"; CKEDITOR.STYLE_BLOCK = 1; CKEDITOR.STYLE_INLINE = 2; CKEDITOR.STYLE_OBJECT = 3; (function () {
            function a(a, b) {
                for (var c, e; (a =
                    a.getParent()) && !a.equals(b);)if (a.getAttribute("data-nostyle")) c = a; else if (!e) { var g = a.getAttribute("contentEditable"); "false" == g ? c = a : "true" == g && (e = 1) } return c
            } function h(a, b, c, e) { return (a.getPosition(b) | e) == e && (!c.childRule || c.childRule(a)) } function f(b) {
                var c = b.document; if (b.collapsed) c = A(this, c), b.insertNode(c), b.moveToPosition(c, CKEDITOR.POSITION_BEFORE_END); else {
                    var e = this.element, g = this._.definition, k, l = g.ignoreReadonly, m = l || g.includeReadonly; null == m && (m = b.root.getCustomData("cke_includeReadonly"));
                    var n = CKEDITOR.dtd[e]; n || (k = !0, n = CKEDITOR.dtd.span); b.enlarge(CKEDITOR.ENLARGE_INLINE, 1); b.trim(); var u = b.createBookmark(), v = u.startNode, r = u.endNode, w = v, q; if (!l) { var t = b.getCommonAncestor(), l = a(v, t), t = a(r, t); l && (w = l.getNextSourceNode(!0)); t && (r = t) } for (w.getPosition(r) == CKEDITOR.POSITION_FOLLOWING && (w = 0); w;) {
                        l = !1; if (w.equals(r)) w = null, l = !0; else {
                            var z = w.type == CKEDITOR.NODE_ELEMENT ? w.getName() : null, t = z && "false" == w.getAttribute("contentEditable"), y = z && -1 !== CKEDITOR.tools.array.indexOf(CKEDITOR.style.unstylableElements,
                                z), y = z && (w.getAttribute("data-nostyle") || y); if (z && w.data("cke-bookmark") || w.type === CKEDITOR.NODE_COMMENT) { w = w.getNextSourceNode(!0); continue } if (t && m && CKEDITOR.dtd.$block[z]) for (var D = w, B = d(D), C = void 0, E = B.length, J = 0, D = E && new CKEDITOR.dom.range(D.getDocument()); J < E; ++J) { var C = B[J], ea = CKEDITOR.filter.instances[C.data("cke-filter")]; if (ea ? ea.check(this) : 1) D.selectNodeContents(C), f.call(this, D) } B = z ? !n[z] || y ? 0 : t && !m ? 0 : h(w, r, g, x) : 1; if (B) if (C = w.getParent(), B = g, E = e, J = k, !C || !(C.getDtd() || CKEDITOR.dtd.span)[E] &&
                                    !J || B.parentRule && !B.parentRule(C)) l = !0; else { if (q || z && CKEDITOR.dtd.$removeEmpty[z] && (w.getPosition(r) | x) != x || (q = b.clone(), q.setStartBefore(w)), z = w.type, z == CKEDITOR.NODE_TEXT || t || z == CKEDITOR.NODE_ELEMENT && !w.getChildCount()) { for (var z = w, R; (l = !z.getNext(L)) && (R = z.getParent(), n[R.getName()]) && h(R, v, g, I);)z = R; q.setEndAfter(z) } } else l = !0; w = w.getNextSourceNode(y || t)
                        } if (l && q && !q.collapsed) {
                            for (var l = A(this, c), t = l.hasAttributes(), y = q.getCommonAncestor(), z = {}, B = {}, C = {}, E = {}, ba, W, H; l && y;) {
                                if (y.getName() == e) {
                                    for (ba in g.attributes) !E[ba] &&
                                        (H = y.getAttribute(W)) && (l.getAttribute(ba) == H ? B[ba] = 1 : E[ba] = 1); for (W in g.styles) !C[W] && (H = y.getStyle(W)) && (l.getStyle(W) == H ? z[W] = 1 : C[W] = 1)
                                } y = y.getParent()
                            } for (ba in B) l.removeAttribute(ba); for (W in z) l.removeStyle(W); t && !l.hasAttributes() && (l = null); l ? (q.extractContents().appendTo(l), q.insertNode(l), p.call(this, l), l.mergeSiblings(), CKEDITOR.env.ie || l.$.normalize()) : (l = new CKEDITOR.dom.element("span"), q.extractContents().appendTo(l), q.insertNode(l), p.call(this, l), l.remove(!0)); q = null
                        }
                    } b.moveToBookmark(u);
                    b.shrink(CKEDITOR.SHRINK_TEXT); b.shrink(CKEDITOR.NODE_ELEMENT, !0)
                }
            } function b(a) {
                function b() { for (var a = new CKEDITOR.dom.elementPath(e.getParent()), c = new CKEDITOR.dom.elementPath(m.getParent()), g = null, d = null, k = 0; k < a.elements.length; k++) { var f = a.elements[k]; if (f == a.block || f == a.blockLimit) break; n.checkElementRemovable(f, !0) && (g = f) } for (k = 0; k < c.elements.length; k++) { f = c.elements[k]; if (f == c.block || f == c.blockLimit) break; n.checkElementRemovable(f, !0) && (d = f) } d && m.breakParent(d); g && e.breakParent(g) } a.enlarge(CKEDITOR.ENLARGE_INLINE,
                    1); var c = a.createBookmark(), e = c.startNode, g = this._.definition.alwaysRemoveElement; if (a.collapsed) {
                        for (var d = new CKEDITOR.dom.elementPath(e.getParent(), a.root), k, f = 0, h; f < d.elements.length && (h = d.elements[f]) && h != d.block && h != d.blockLimit; f++)if (this.checkElementRemovable(h)) { var l; !g && a.collapsed && (a.checkBoundaryOfElement(h, CKEDITOR.END) || (l = a.checkBoundaryOfElement(h, CKEDITOR.START))) ? (k = h, k.match = l ? "start" : "end") : (h.mergeSiblings(), h.is(this.element) ? w.call(this, h) : q(h, t(this)[h.getName()])) } if (k) {
                            g =
                            e; for (f = 0; ; f++) { h = d.elements[f]; if (h.equals(k)) break; else if (h.match) continue; else h = h.clone(); h.append(g); g = h } g["start" == k.match ? "insertBefore" : "insertAfter"](k)
                        }
                    } else { var m = c.endNode, n = this; b(); for (d = e; !d.equals(m);)k = d.getNextSourceNode(), d.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(d) && (d.getName() == this.element ? w.call(this, d) : q(d, t(this)[d.getName()]), k.type == CKEDITOR.NODE_ELEMENT && k.contains(e) && (b(), k = e.getNext())), d = k } a.moveToBookmark(c); a.shrink(CKEDITOR.NODE_ELEMENT, !0)
            } function d(a) {
                var b =
                    []; a.forEach(function (a) { if ("true" == a.getAttribute("contenteditable")) return b.push(a), !1 }, CKEDITOR.NODE_ELEMENT, !0); return b
            } function l(a) { var b = a.getEnclosedNode() || a.getCommonAncestor(!1, !0); (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) && !a.isReadOnly() && v(a, this) } function k(a) {
                var b = a.getCommonAncestor(!0, !0); if (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) {
                    var b = this._.definition, c = b.attributes; if (c) for (var e in c) a.removeAttribute(e, c[e]); if (b.styles) for (var g in b.styles) b.styles.hasOwnProperty(g) &&
                        a.removeStyle(g)
                }
            } function m(a) { var b = a.createBookmark(!0), c = a.createIterator(); c.enforceRealBlocks = !0; this._.enterMode && (c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR); for (var g, d = a.document, k; g = c.getNextParagraph();)!g.isReadOnly() && (c.activeFilter ? c.activeFilter.check(this) : 1) && (k = A(this, d, g), e(g, k)); a.moveToBookmark(b) } function g(a) {
                var b = a.createBookmark(1), c = a.createIterator(); c.enforceRealBlocks = !0; c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR; for (var g, d; g = c.getNextParagraph();)this.checkElementRemovable(g) &&
                    (g.is("pre") ? ((d = this._.enterMode == CKEDITOR.ENTER_BR ? null : a.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div")) && g.copyAttributes(d), e(g, d)) : w.call(this, g)); a.moveToBookmark(b)
            } function e(a, b) {
                var e = !b; e && (b = a.getDocument().createElement("div"), a.copyAttributes(b)); var g = b && b.is("pre"), d = a.is("pre"), k = !g && d; if (g && !d) {
                    d = b; (k = a.getBogus()) && k.remove(); k = a.getHtml(); k = n(k, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, ""); k = k.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1"); k = k.replace(/([ \t\n\r]+|&nbsp;)/g,
                        " "); k = k.replace(/<br\b[^>]*>/gi, "\n"); if (CKEDITOR.env.ie) { var f = a.getDocument().createElement("div"); f.append(d); d.$.outerHTML = "\x3cpre\x3e" + k + "\x3c/pre\x3e"; d.copyAttributes(f.getFirst()); d = f.getFirst().remove() } else d.setHtml(k); b = d
                } else k ? b = u(e ? [a.getHtml()] : c(a), b) : a.moveChildren(b); b.replace(a); if (g) {
                    var e = b, h; (h = e.getPrevious(K)) && h.type == CKEDITOR.NODE_ELEMENT && h.is("pre") && (g = n(h.getHtml(), /\n$/, "") + "\n\n" + n(e.getHtml(), /^\n/, ""), CKEDITOR.env.ie ? e.$.outerHTML = "\x3cpre\x3e" + g + "\x3c/pre\x3e" :
                        e.setHtml(g), h.remove())
                } else e && r(b)
            } function c(a) { var b = []; n(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function (a, b, c) { return b + "\x3c/pre\x3e" + c + "\x3cpre\x3e" }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function (a, c) { b.push(c) }); return b } function n(a, b, c) { var e = "", g = ""; a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function (a, b, c) { b && (e = b); c && (g = c); return "" }); return e + a.replace(b, c) + g } function u(a, b) {
                var c;
                1 < a.length && (c = new CKEDITOR.dom.documentFragment(b.getDocument())); for (var e = 0; e < a.length; e++) {
                    var g = a[e], g = g.replace(/(\r\n|\r)/g, "\n"), g = n(g, /^[ \t]*\n/, ""), g = n(g, /\n$/, ""), g = n(g, /^[ \t]+|[ \t]+$/g, function (a, b) { return 1 == a.length ? "\x26nbsp;" : b ? " " + CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) : CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " " }), g = g.replace(/\n/g, "\x3cbr\x3e"), g = g.replace(/[ \t]{2,}/g, function (a) { return CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " " }); if (c) {
                        var d = b.clone(); d.setHtml(g);
                        c.append(d)
                    } else b.setHtml(g)
                } return c || b
            } function w(a, b) {
                var c = this._.definition, e = c.attributes, c = c.styles, g = t(this)[a.getName()], d = CKEDITOR.tools.isEmpty(e) && CKEDITOR.tools.isEmpty(c), k; for (k in e) if ("class" != k && !this._.definition.fullMatch || a.getAttribute(k) == y(k, e[k])) b && "data-" == k.slice(0, 5) || (d = a.hasAttribute(k), a.removeAttribute(k)); for (var f in c) this._.definition.fullMatch && a.getStyle(f) != y(f, c[f], !0) || (d = d || !!a.getStyle(f), a.removeStyle(f)); q(a, g, C[a.getName()]); d && (this._.definition.alwaysRemoveElement ?
                    r(a, 1) : !CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? r(a) : a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"))
            } function p(a) { for (var b = t(this), c = a.getElementsByTag(this.element), e, g = c.count(); 0 <= --g;)e = c.getItem(g), e.isReadOnly() || w.call(this, e, !0); for (var d in b) if (d != this.element) for (c = a.getElementsByTag(d), g = c.count() - 1; 0 <= g; g--)e = c.getItem(g), e.isReadOnly() || q(e, b[d]) } function q(a, b, c) {
                if (b = b && b.attributes) for (var e = 0; e < b.length; e++) {
                    var g = b[e][0],
                    d; if (d = a.getAttribute(g)) { var k = b[e][1]; (null === k || k.test && k.test(d) || "string" == typeof k && d == k) && a.removeAttribute(g) }
                } c || r(a)
            } function r(a, b) {
                if (!a.hasAttributes() || b) if (CKEDITOR.dtd.$block[a.getName()]) { var c = a.getPrevious(K), e = a.getNext(K); !c || c.type != CKEDITOR.NODE_TEXT && c.isBlockBoundary({ br: 1 }) || a.append("br", 1); !e || e.type != CKEDITOR.NODE_TEXT && e.isBlockBoundary({ br: 1 }) || a.append("br"); a.remove(!0) } else c = a.getFirst(), e = a.getLast(), a.remove(!0), c && (c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings(),
                    e && !c.equals(e) && e.type == CKEDITOR.NODE_ELEMENT && e.mergeSiblings())
            } function A(a, b, c) { var e; e = a.element; "*" == e && (e = "span"); e = new CKEDITOR.dom.element(e, b); c && c.copyAttributes(e); e = v(e, a); b.getCustomData("doc_processing_style") && e.hasAttribute("id") ? e.removeAttribute("id") : b.setCustomData("doc_processing_style", 1); return e } function v(a, b) {
                var c = b._.definition, e = c.attributes, c = CKEDITOR.style.getStyleText(c); if (e) for (var g in e) a.setAttribute(g, e[g]); c && a.setAttribute("style", c); a.getDocument().removeCustomData("doc_processing_style");
                return a
            } function D(a, b) { for (var c in a) a[c] = a[c].replace(H, function (a, c) { return b[c] }) } function t(a) { if (a._.overrides) return a._.overrides; var b = a._.overrides = {}, c = a._.definition.overrides; if (c) { CKEDITOR.tools.isArray(c) || (c = [c]); for (var e = 0; e < c.length; e++) { var g = c[e], d, k; "string" == typeof g ? d = g.toLowerCase() : (d = g.element ? g.element.toLowerCase() : a.element, k = g.attributes); g = b[d] || (b[d] = {}); if (k) { var g = g.attributes = g.attributes || [], f; for (f in k) g.push([f.toLowerCase(), k[f]]) } } } return b } function y(a,
                b, c) { var e = new CKEDITOR.dom.element("span"); e[c ? "setStyle" : "setAttribute"](a, b); return e[c ? "getStyle" : "getAttribute"](a) } function z(a, b) { function c(a, b) { return "font-family" == b.toLowerCase() ? a.replace(/["']/g, "") : a } "string" == typeof a && (a = CKEDITOR.tools.parseCssText(a)); "string" == typeof b && (b = CKEDITOR.tools.parseCssText(b, !0)); for (var e in a) if (!(e in b) || c(b[e], e) != c(a[e], e) && "inherit" != a[e] && "inherit" != b[e]) return !1; return !0 } function B(a, b, c) {
                    var e = a.getRanges(); b = b ? this.removeFromRange : this.applyToRange;
                    for (var g, d = e.createIterator(); g = d.getNextRange();)b.call(this, g, c); a.selectRanges(e)
                } var C = { address: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, p: 1, pre: 1, section: 1, header: 1, footer: 1, nav: 1, article: 1, aside: 1, figure: 1, dialog: 1, hgroup: 1, time: 1, meter: 1, menu: 1, command: 1, keygen: 1, output: 1, progress: 1, details: 1, datagrid: 1, datalist: 1 }, E = { a: 1, blockquote: 1, embed: 1, hr: 1, img: 1, li: 1, object: 1, ol: 1, table: 1, td: 1, tr: 1, th: 1, ul: 1, dl: 1, dt: 1, dd: 1, form: 1, audio: 1, video: 1 }, G = /\s*(?:;\s*|$)/, H = /#\((.+?)\)/g, L = CKEDITOR.dom.walker.bookmark(0,
                    1), K = CKEDITOR.dom.walker.whitespaces(1); CKEDITOR.style = function (a, b) {
                        if ("string" == typeof a.type) return new CKEDITOR.style.customHandlers[a.type](a); var c = a.attributes; c && c.style && (a.styles = CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(c.style)), delete c.style); b && (a = CKEDITOR.tools.clone(a), D(a.attributes, b), D(a.styles, b)); c = this.element = a.element ? "string" == typeof a.element ? a.element.toLowerCase() : a.element : "*"; this.type = a.type || (C[c] ? CKEDITOR.STYLE_BLOCK : E[c] ? CKEDITOR.STYLE_OBJECT :
                            CKEDITOR.STYLE_INLINE); "object" == typeof this.element && (this.type = CKEDITOR.STYLE_OBJECT); this._ = { definition: a }
                    }; CKEDITOR.style.prototype = {
                        apply: function (a) { if (a instanceof CKEDITOR.dom.document) return B.call(this, a.getSelection()); if (this.checkApplicable(a.elementPath(), a)) { var b = this._.enterMode; b || (this._.enterMode = a.activeEnterMode); B.call(this, a.getSelection(), 0, a); this._.enterMode = b } }, remove: function (a) {
                            if (a instanceof CKEDITOR.dom.document) return B.call(this, a.getSelection(), 1); if (this.checkApplicable(a.elementPath(),
                                a)) { var b = this._.enterMode; b || (this._.enterMode = a.activeEnterMode); B.call(this, a.getSelection(), 1, a); this._.enterMode = b }
                        }, applyToRange: function (a) { this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? f : this.type == CKEDITOR.STYLE_BLOCK ? m : this.type == CKEDITOR.STYLE_OBJECT ? l : null; return this.applyToRange(a) }, removeFromRange: function (a) { this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? b : this.type == CKEDITOR.STYLE_BLOCK ? g : this.type == CKEDITOR.STYLE_OBJECT ? k : null; return this.removeFromRange(a) }, applyToObject: function (a) {
                            v(a,
                                this)
                        }, checkActive: function (a, b) { switch (this.type) { case CKEDITOR.STYLE_BLOCK: return this.checkElementRemovable(a.block || a.blockLimit, !0, b); case CKEDITOR.STYLE_OBJECT: case CKEDITOR.STYLE_INLINE: for (var c = a.elements, e = 0, g; e < c.length; e++)if (g = c[e], this.type != CKEDITOR.STYLE_INLINE || g != a.block && g != a.blockLimit) { if (this.type == CKEDITOR.STYLE_OBJECT) { var d = g.getName(); if (!("string" == typeof this.element ? d == this.element : d in this.element)) continue } if (this.checkElementRemovable(g, !0, b)) return !0 } }return !1 }, checkApplicable: function (a,
                            b, c) { b && b instanceof CKEDITOR.filter && (c = b); if (c && !c.check(this)) return !1; switch (this.type) { case CKEDITOR.STYLE_OBJECT: return !!a.contains(this.element); case CKEDITOR.STYLE_BLOCK: return !!a.blockLimit.getDtd()[this.element] }return !0 }, checkElementMatch: function (a, b) {
                                var c = this._.definition; if (!a || !c.ignoreReadonly && a.isReadOnly()) return !1; var e = a.getName(); if ("string" == typeof this.element ? e == this.element : e in this.element) {
                                    if (!b && !a.hasAttributes()) return !0; if (e = c._AC) c = e; else {
                                        var e = {}, g = 0, d = c.attributes;
                                        if (d) for (var k in d) g++, e[k] = d[k]; if (k = CKEDITOR.style.getStyleText(c)) e.style || g++, e.style = k; e._length = g; c = c._AC = e
                                    } if (c._length) { for (var f in c) if ("_length" != f) if (e = a.getAttribute(f) || "", "style" == f ? z(c[f], e) : c[f] == e) { if (!b) return !0 } else if (b) return !1; if (b) return !0 } else return !0
                                } return !1
                            }, checkElementRemovable: function (a, b, c) {
                                if (this.checkElementMatch(a, b, c)) return !0; if (b = t(this)[a.getName()]) {
                                    var e; if (!(b = b.attributes)) return !0; for (c = 0; c < b.length; c++)if (e = b[c][0], e = a.getAttribute(e)) {
                                        var g = b[c][1];
                                        if (null === g) return !0; if ("string" == typeof g) { if (e == g) return !0 } else if (g.test(e)) return !0
                                    }
                                } return !1
                            }, buildPreview: function (a) { var b = this._.definition, c = [], e = b.element; "bdo" == e && (e = "span"); var c = ["\x3c", e], g = b.attributes; if (g) for (var d in g) c.push(" ", d, '\x3d"', g[d], '"'); (g = CKEDITOR.style.getStyleText(b)) && c.push(' style\x3d"', g, '"'); c.push("\x3e", a || b.name, "\x3c/", e, "\x3e"); return c.join("") }, getDefinition: function () { return this._.definition }
                    }; CKEDITOR.style.getStyleText = function (a) {
                        var b = a._ST; if (b) return b;
                        var b = a.styles, c = a.attributes && a.attributes.style || "", e = ""; c.length && (c = c.replace(G, ";")); for (var g in b) { var d = b[g], k = (g + ":" + d).replace(G, ";"); "inherit" == d ? e += k : c += k } c.length && (c = CKEDITOR.tools.normalizeCssText(c, !0)); return a._ST = c + e
                    }; CKEDITOR.style.customHandlers = {}; CKEDITOR.style.unstylableElements = []; CKEDITOR.style.addCustomHandler = function (a) {
                        var b = function (a) { this._ = { definition: a }; this.setup && this.setup(a) }; b.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype),
                            { assignedTo: CKEDITOR.STYLE_OBJECT }, a, !0); return this.customHandlers[a.type] = b
                    }; var x = CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED, I = CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED
        })(); CKEDITOR.styleCommand = function (a, h) { this.requiredContent = this.allowedContent = this.style = a; CKEDITOR.tools.extend(this, h, !0) }; CKEDITOR.styleCommand.prototype.exec = function (a) {
            a.focus(); this.state == CKEDITOR.TRISTATE_OFF ? a.applyStyle(this.style) :
                this.state == CKEDITOR.TRISTATE_ON && a.removeStyle(this.style)
        }; CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet"); CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet); CKEDITOR.loadStylesSet = function (a, h, f) { CKEDITOR.stylesSet.addExternal(a, h, ""); CKEDITOR.stylesSet.load(a, f) }; CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            attachStyleStateChange: function (a, h) {
                var f = this._.styleStateChangeCallbacks; f || (f = this._.styleStateChangeCallbacks = [], this.on("selectionChange",
                    function (a) { for (var d = 0; d < f.length; d++) { var h = f[d], k = h.style.checkActive(a.data.path, this) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF; h.fn.call(this, k) } })); f.push({ style: a, fn: h })
            }, applyStyle: function (a) { a.apply(this) }, removeStyle: function (a) { a.remove(this) }, getStylesSet: function (a) {
                if (this._.stylesDefinitions) a(this._.stylesDefinitions); else {
                    var h = this, f = h.config.stylesCombo_stylesSet || h.config.stylesSet; if (!1 === f) a(null); else if (f instanceof Array) h._.stylesDefinitions = f, a(f); else {
                        f || (f = "default");
                        var f = f.split(":"), b = f[0]; CKEDITOR.stylesSet.addExternal(b, f[1] ? f.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), ""); CKEDITOR.stylesSet.load(b, function (d) { h._.stylesDefinitions = d[b]; a(h._.stylesDefinitions) })
                    }
                }
            }
        }); (function () {
            if (window.Promise) CKEDITOR.tools.promise = Promise; else {
                var a = CKEDITOR.getUrl("vendor/promise.js"); if ("function" === typeof window.define && window.define.amd && "function" === typeof window.require) return window.require([a], function (a) { CKEDITOR.tools.promise = a }); CKEDITOR.scriptLoader.load(a,
                    function (h) { if (!h) return CKEDITOR.error("no-vendor-lib", { path: a }); if ("undefined" !== typeof window.ES6Promise) return CKEDITOR.tools.promise = ES6Promise })
            }
        })(); (function () {
            function a(a, d, l) { a.once("selectionCheck", function (a) { if (!h) { var b = a.data.getRanges()[0]; l.equals(b) ? a.cancel() : d.equals(b) && (f = !0) } }, null, null, -1) } var h = !0, f = !1; CKEDITOR.dom.selection.setupEditorOptimization = function (a) {
                a.on("selectionCheck", function (a) { a.data && !f && a.data.optimizeInElementEnds(); f = !1 }); a.on("contentDom", function () {
                    var d =
                        a.editable(); d && (d.attachListener(d, "keydown", function (a) { this._.shiftPressed = a.data.$.shiftKey }, this), d.attachListener(d, "keyup", function (a) { this._.shiftPressed = a.data.$.shiftKey }, this))
                })
            }; CKEDITOR.dom.selection.prototype.optimizeInElementEnds = function () {
                var b = this.getRanges()[0], d = this.root.editor, f; if (this.root.editor._.shiftPressed || this.isFake || b.isCollapsed || b.startContainer.equals(b.endContainer)) f = !1; else if (0 === b.endOffset) f = !0; else {
                    f = b.startContainer.type === CKEDITOR.NODE_TEXT; var k = b.endContainer.type ===
                        CKEDITOR.NODE_TEXT, m = f ? b.startContainer.getLength() : b.startContainer.getChildCount(); f = b.startOffset === m || f ^ k
                } f && (f = b.clone(), b.shrink(CKEDITOR.SHRINK_TEXT, !1, { skipBogus: !CKEDITOR.env.webkit }), h = !1, a(d, b, f), b.select(), h = !0)
            }
        })(); (function () {
            function a(a, b) { if (f(a)) a = Math.round(b * (parseFloat(a) / 100)); else if ("string" === typeof a && a.match(/^\d+$/gm) || "string" === typeof a && a.match(/^\d+(?:deg)?$/gm)) a = parseInt(a, 10); return a } function h(a, b) {
                f(a) ? a = b * (parseFloat(a) / 100) : "string" === typeof a && a.match(/^\d?\.\d+/gm) &&
                    (a = parseFloat(a)); return a
            } function f(a) { return "string" === typeof a && a.match(/^((\d*\.\d+)|(\d+))%{1}$/gm) } function b(a, b, d) { return !isNaN(a) && a >= b && a <= d } function d(a) { a = a.toString(16); return 1 == a.length ? "0" + a : a } CKEDITOR.tools.color = CKEDITOR.tools.createClass({
                $: function (a, b) { this._.initialColorCode = a; this._.defaultValue = b; this._.parseInput(a) }, proto: {
                    getHex: function () {
                        if (!this._.isValidColor) return this._.defaultValue; var a = this._.blendAlphaColor(this._.red, this._.green, this._.blue, this._.alpha); return this._.formatHexString(a[0],
                            a[1], a[2])
                    }, getHexWithAlpha: function () { if (!this._.isValidColor) return this._.defaultValue; var a = Math.round(this._.alpha * CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE); return this._.formatHexString(this._.red, this._.green, this._.blue, a) }, getRgb: function () { if (!this._.isValidColor) return this._.defaultValue; var a = this._.blendAlphaColor(this._.red, this._.green, this._.blue, this._.alpha); return this._.formatRgbString("rgb", a[0], a[1], a[2]) }, getRgba: function () {
                        return this._.isValidColor ? this._.formatRgbString("rgba",
                            this._.red, this._.green, this._.blue, this._.alpha) : this._.defaultValue
                    }, getHsl: function () { var a = 0 === this._.alpha || 1 === this._.alpha; if (!this._.isValidColor) return this._.defaultValue; this._.type === CKEDITOR.tools.color.TYPE_HSL && a ? a = [this._.hue, this._.saturation, this._.lightness] : (a = this._.blendAlphaColor(this._.red, this._.green, this._.blue, this._.alpha), a = this._.rgbToHsl(a[0], a[1], a[2])); return this._.formatHslString("hsl", a[0], a[1], a[2]) }, getHsla: function () {
                        var a; if (!this._.isValidColor) return this._.defaultValue;
                        a = this._.type === CKEDITOR.tools.color.TYPE_HSL ? [this._.hue, this._.saturation, this._.lightness] : this._.rgbToHsl(this._.red, this._.green, this._.blue); return this._.formatHslString("hsla", a[0], a[1], a[2], this._.alpha)
                    }, getInitialValue: function () { return this._.initialColorCode }
                }, _: {
                    initialColorCode: "", isValidColor: !0, type: 0, hue: 0, saturation: 0, lightness: 0, red: 0, green: 0, blue: 0, alpha: 1, blendAlphaColor: function (a, b, d, g) {
                        return CKEDITOR.tools.array.map([a, b, d], function (a) {
                            return Math.round(CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE -
                                g * (CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE - a))
                        })
                    }, formatHexString: function (a, b, f, g) { a = "#" + d(a) + d(b) + d(f); void 0 !== g && (a += d(g)); return a.toUpperCase() }, formatRgbString: function (a, b, d, g, e) { b = [b, d, g]; void 0 !== e && b.push(e); return a + "(" + b.join(",") + ")" }, formatHslString: function (a, b, d, g, e) { return a + "(" + b + "," + d + "%," + g + "%" + (void 0 !== e ? "," + e : "") + ")" }, parseInput: function (a) {
                        if ("string" !== typeof a) this._.isValidColor = !1; else {
                            a = CKEDITOR.tools.trim(a); var b = this._.matchStringToNamedColor(a); b && (a = b); var b =
                                this._.extractColorChannelsFromHex(a), d = this._.extractColorChannelsFromRgba(a); a = this._.extractColorChannelsFromHsla(a); (a = b || d || a) ? (this._.type = a.type, this._.red = a.red, this._.green = a.green, this._.blue = a.blue, this._.alpha = a.alpha, a.type === CKEDITOR.tools.color.TYPE_HSL && (this._.hue = a.hue, this._.saturation = a.saturation, this._.lightness = a.lightness)) : this._.isValidColor = !1
                        }
                    }, matchStringToNamedColor: function (a) { return CKEDITOR.tools.color.namedColors[a.toLowerCase()] || null }, extractColorChannelsFromHex: function (a) {
                        -1 ===
                        a.indexOf("#") && (a = "#" + a); a.match(CKEDITOR.tools.color.hex3CharsRegExp) && (a = this._.hex3ToHex6(a)); a.match(CKEDITOR.tools.color.hex4CharsRegExp) && (a = this._.hex4ToHex8(a)); if (!a.match(CKEDITOR.tools.color.hex6CharsRegExp) && !a.match(CKEDITOR.tools.color.hex8CharsRegExp)) return null; a = a.split(""); var b = 1; a[7] && a[8] && (b = parseInt(a[7] + a[8], 16), b /= CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE, b = Number(b.toFixed(1))); return {
                            type: CKEDITOR.tools.color.TYPE_RGB, red: parseInt(a[1] + a[2], 16), green: parseInt(a[3] + a[4],
                                16), blue: parseInt(a[5] + a[6], 16), alpha: b
                        }
                    }, extractColorChannelsFromRgba: function (b) {
                        var d = this._.extractColorChannelsByPattern(b, CKEDITOR.tools.color.rgbRegExp); if (!d || 3 > d.length || 4 < d.length) return null; var f = 4 === d.length; b = a(d[0], CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE); var g = a(d[1], CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE), e = a(d[2], CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE), c = 1; f && (c = h(d[3], CKEDITOR.tools.color.MAX_ALPHA_CHANNEL_VALUE)); d = {
                            type: CKEDITOR.tools.color.TYPE_RGB, red: b, green: g, blue: e,
                            alpha: c
                        }; return this._.areColorChannelsValid(b, g, e, c) ? d : null
                    }, extractColorChannelsFromHsla: function (b) {
                        var d = this._.extractColorChannelsByPattern(b, CKEDITOR.tools.color.hslRegExp); if (!d || 3 > d.length || 4 < d.length) return null; var f = 4 === d.length, g = a(d[0], CKEDITOR.tools.color.MAX_HUE_CHANNEL_VALUE), e = h(d[1], CKEDITOR.tools.color.MAX_SATURATION_LIGHTNESS_CHANNEL_VALUE), c = h(d[2], CKEDITOR.tools.color.MAX_SATURATION_LIGHTNESS_CHANNEL_VALUE), n = 1; b = this._.hslToRgb(g, e, c); f && (n = h(d[3], CKEDITOR.tools.color.MAX_ALPHA_CHANNEL_VALUE));
                        b.push(n); d = { type: CKEDITOR.tools.color.TYPE_HSL, red: b[0], green: b[1], blue: b[2], alpha: b[3], hue: g, saturation: Math.round(100 * e), lightness: Math.round(100 * c) }; return this._.areColorChannelsValid(b[0], b[1], b[2], b[3]) ? d : null
                    }, hex3ToHex6: function (a) { a = a.split(""); return "#" + a[1] + a[1] + a[2] + a[2] + a[3] + a[3] }, hex4ToHex8: function (a) { return this._.hex3ToHex6(a.substr(0, 4)) + CKEDITOR.tools.repeat(a[4], 2) }, extractColorChannelsByPattern: function (a, b) {
                        var d = a.match(b); if (!d) return null; var g = -1 === d[1].indexOf(",") ? /\s/ :
                            ",", g = d[1].split(g), g = CKEDITOR.tools.array.reduce(g, function (a, b) { var g = CKEDITOR.tools.trim(b); return 0 === g.length ? a : a.concat([g]) }, []); d[2] && (d = CKEDITOR.tools.trim(d[2].replace(/[\/,]/, "")), g.push(d)); return g
                    }, areColorChannelsValid: function (a, d, f, g) { return b(a, 0, CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE) && b(d, 0, CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE) && b(f, 0, CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE) && b(g, 0, CKEDITOR.tools.color.MAX_ALPHA_CHANNEL_VALUE) }, hslToRgb: function (a, b, d) {
                        var g = function (e) {
                            var c =
                                (e + a / 30) % 12; e = b * Math.min(d, 1 - d); c = Math.min(c - 3, 9 - c, 1); c = Math.max(-1, c); return Math.round((d - e * c) * CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE)
                        }; return [g(0), g(8), g(4)]
                    }, rgbToHsl: function (a, b, d) {
                        a /= CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE; b /= CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE; var g = d / CKEDITOR.tools.color.MAX_RGB_CHANNEL_VALUE, e = Math.max(a, b, g), c = Math.min(a, b, g); d = e - c; var f = 0; switch (e) { case a: f = (b - g) / d % 6; break; case b: f = (g - a) / d + 2; break; case g: f = (a - b) / d + 4 }a = 0 === d ? 0 : 60 * f; b = (e + c) / 2; e = 0; 1 !== b && 0 !==
                            b && (e = d / (1 - Math.abs(2 * b - 1))); a = Math.round(a); e = Math.round(100 * e); b = Math.round(100 * b); return [a, e, b]
                    }
                }, statics: {
                    TYPE_RGB: 1, TYPE_HSL: 2, MAX_RGB_CHANNEL_VALUE: 255, MAX_ALPHA_CHANNEL_VALUE: 1, MAX_HUE_CHANNEL_VALUE: 360, MAX_SATURATION_LIGHTNESS_CHANNEL_VALUE: 1, hex3CharsRegExp: /#([0-9a-f]{3}$)/gim, hex4CharsRegExp: /#([0-9a-f]{4}$)/gim, hex6CharsRegExp: /#([0-9a-f]{6}$)/gim, hex8CharsRegExp: /#([0-9a-f]{8}$)/gim, rgbRegExp: /rgba?\(([.,\d\s%]*)(\s*\/\s*[\d.%]+)?\s*\)/i, hslRegExp: /hsla?\((\s*(?:[.\d]+(?:deg)?)(?:\s*,?\s*[.\d]+%){2})((?:(?:\s*\/\s*)|(?:\s*,\s*))[\d.]+%?)?\s*\)/i,
                    namedColors: {
                        aliceblue: "#F0F8FF", antiquewhite: "#FAEBD7", aqua: "#00FFFF", aquamarine: "#7FFFD4", azure: "#F0FFFF", beige: "#F5F5DC", bisque: "#FFE4C4", black: "#000000", blanchedalmond: "#FFEBCD", blue: "#0000FF", blueviolet: "#8A2BE2", brown: "#A52A2A", burlywood: "#DEB887", cadetblue: "#5F9EA0", chartreuse: "#7FFF00", chocolate: "#D2691E", coral: "#FF7F50", cornflowerblue: "#6495ED", cornsilk: "#FFF8DC", crimson: "#DC143C", cyan: "#00FFFF", darkblue: "#00008B", darkcyan: "#008B8B", darkgoldenrod: "#B8860B", darkgray: "#A9A9A9", darkgreen: "#006400",
                        darkgrey: "#A9A9A9", darkkhaki: "#BDB76B", darkmagenta: "#8B008B", darkolivegreen: "#556B2F", darkorange: "#FF8C00", darkorchid: "#9932CC", darkred: "#8B0000", darksalmon: "#E9967A", darkseagreen: "#8FBC8F", darkslateblue: "#483D8B", darkslategray: "#2F4F4F", darkslategrey: "#2F4F4F", darkturquoise: "#00CED1", darkviolet: "#9400D3", deeppink: "#FF1493", deepskyblue: "#00BFFF", dimgray: "#696969", dimgrey: "#696969", dodgerblue: "#1E90FF", firebrick: "#B22222", floralwhite: "#FFFAF0", forestgreen: "#228B22", fuchsia: "#FF00FF", gainsboro: "#DCDCDC",
                        ghostwhite: "#F8F8FF", gold: "#FFD700", goldenrod: "#DAA520", gray: "#808080", green: "#008000", greenyellow: "#ADFF2F", grey: "#808080", honeydew: "#F0FFF0", hotpink: "#FF69B4", indianred: "#CD5C5C", indigo: "#4B0082", ivory: "#FFFFF0", khaki: "#F0E68C", lavender: "#E6E6FA", lavenderblush: "#FFF0F5", lawngreen: "#7CFC00", lemonchiffon: "#FFFACD", lightblue: "#ADD8E6", lightcoral: "#F08080", lightcyan: "#E0FFFF", lightgoldenrodyellow: "#FAFAD2", lightgray: "#D3D3D3", lightgreen: "#90EE90", lightgrey: "#D3D3D3", lightpink: "#FFB6C1", lightsalmon: "#FFA07A",
                        lightseagreen: "#20B2AA", lightskyblue: "#87CEFA", lightslategray: "#778899", lightslategrey: "#778899", lightsteelblue: "#B0C4DE", lightyellow: "#FFFFE0", lime: "#00FF00", limegreen: "#32CD32", linen: "#FAF0E6", magenta: "#FF00FF", maroon: "#800000", mediumaquamarine: "#66CDAA", mediumblue: "#0000CD", mediumorchid: "#BA55D3", mediumpurple: "#9370DB", mediumseagreen: "#3CB371", mediumslateblue: "#7B68EE", mediumspringgreen: "#00FA9A", mediumturquoise: "#48D1CC", mediumvioletred: "#C71585", midnightblue: "#191970", mintcream: "#F5FFFA", mistyrose: "#FFE4E1",
                        moccasin: "#FFE4B5", navajowhite: "#FFDEAD", navy: "#000080", oldlace: "#FDF5E6", olive: "#808000", olivedrab: "#6B8E23", orange: "#FFA500", orangered: "#FF4500", orchid: "#DA70D6", palegoldenrod: "#EEE8AA", palegreen: "#98FB98", paleturquoise: "#AFEEEE", palevioletred: "#DB7093", papayawhip: "#FFEFD5", peachpuff: "#FFDAB9", peru: "#CD853F", pink: "#FFC0CB", plum: "#DDA0DD", powderblue: "#B0E0E6", purple: "#800080", rebeccapurple: "#663399", red: "#FF0000", rosybrown: "#BC8F8F", royalblue: "#4169E1", saddlebrown: "#8B4513", salmon: "#FA8072", sandybrown: "#F4A460",
                        seagreen: "#2E8B57", seashell: "#FFF5EE", sienna: "#A0522D", silver: "#C0C0C0", skyblue: "#87CEEB", slateblue: "#6A5ACD", slategray: "#708090", slategrey: "#708090", snow: "#FFFAFA", springgreen: "#00FF7F", steelblue: "#4682B4", tan: "#D2B48C", teal: "#008080", thistle: "#D8BFD8", tomato: "#FF6347", turquoise: "#40E0D0", violet: "#EE82EE", windowtext: "windowtext", wheat: "#F5DEB3", white: "#FFFFFF", whitesmoke: "#F5F5F5", yellow: "#FFFF00", yellowgreen: "#9ACD32"
                    }
                }
            }); CKEDITOR.tools.style.parse._colors = CKEDITOR.tools.color.namedColors
        })(); CKEDITOR.dom.comment =
            function (a, h) { "string" == typeof a && (a = (h ? h.$ : document).createComment(a)); CKEDITOR.dom.domObject.call(this, a) }; CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node; CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, { type: CKEDITOR.NODE_COMMENT, getOuterHtml: function () { return "\x3c!--" + this.$.nodeValue + "--\x3e" } }); "use strict"; (function () {
                var a = {}, h = {}, f; for (f in CKEDITOR.dtd.$blockLimit) f in CKEDITOR.dtd.$list || (a[f] = 1); for (f in CKEDITOR.dtd.$block) f in CKEDITOR.dtd.$blockLimit || f in CKEDITOR.dtd.$empty ||
                    (h[f] = 1); CKEDITOR.dom.elementPath = function (b, d) {
                        var f = null, k = null, m = [], g = b, e; d = d || b.getDocument().getBody(); g || (g = d); do if (g.type == CKEDITOR.NODE_ELEMENT) {
                            m.push(g); if (!this.lastElement && (this.lastElement = g, g.is(CKEDITOR.dtd.$object) || "false" == g.getAttribute("contenteditable"))) continue; if (g.equals(d)) break; if (!k && (e = g.getName(), "true" == g.getAttribute("contenteditable") ? k = g : !f && h[e] && (f = g), a[e])) {
                                if (e = !f && "div" == e) {
                                    a: {
                                        e = g.getChildren(); for (var c = 0, n = e.count(); c < n; c++) {
                                            var u = e.getItem(c); if (u.type ==
                                                CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[u.getName()]) { e = !0; break a }
                                        } e = !1
                                    } e = !e
                                } e ? f = g : k = g
                            }
                        } while (g = g.getParent()); k || (k = d); this.block = f; this.blockLimit = k; this.root = d; this.elements = m
                    }
            })(); CKEDITOR.dom.elementPath.prototype = {
                compare: function (a) { var h = this.elements; a = a && a.elements; if (!a || h.length != a.length) return !1; for (var f = 0; f < h.length; f++)if (!h[f].equals(a[f])) return !1; return !0 }, contains: function (a, h, f) {
                    var b = 0, d; "string" == typeof a && (d = function (b) { return b.getName() == a }); a instanceof CKEDITOR.dom.element ?
                        d = function (b) { return b.equals(a) } : CKEDITOR.tools.isArray(a) ? d = function (b) { return -1 < CKEDITOR.tools.indexOf(a, b.getName()) } : "function" == typeof a ? d = a : "object" == typeof a && (d = function (b) { return b.getName() in a }); var l = this.elements, k = l.length; h && (f ? b += 1 : --k); f && (l = Array.prototype.slice.call(l, 0), l.reverse()); for (; b < k; b++)if (d(l[b])) return l[b]; return null
                }, isContextFor: function (a) {
                    var h; return a in CKEDITOR.dtd.$block ? (h = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block ||
                        this.blockLimit, !!h.getDtd()[a]) : !0
                }, direction: function () { return (this.block || this.blockLimit || this.root).getDirection(1) }
            }; CKEDITOR.dom.text = function (a, h) { "string" == typeof a && (a = (h ? h.$ : document).createTextNode(a)); this.$ = a }; CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node; CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
                type: CKEDITOR.NODE_TEXT, getLength: function () { return this.$.nodeValue.length }, getText: function () { return this.$.nodeValue }, setText: function (a) { this.$.nodeValue = a }, isEmpty: function (a) {
                    var h =
                        this.getText(); a && (h = CKEDITOR.tools.trim(h)); return !h || h === CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE
                }, split: function (a) { var h = this.$.parentNode, f = h.childNodes.length, b = this.getLength(), d = this.getDocument(), l = new CKEDITOR.dom.text(this.$.splitText(a), d); h.childNodes.length == f && (a >= b ? (l = d.createText(""), l.insertAfter(this)) : (a = d.createText(""), a.insertAfter(l), a.remove())); return l }, substring: function (a, h) { return "number" != typeof h ? this.$.nodeValue.substr(a) : this.$.nodeValue.substring(a, h) }
            }); (function () {
                function a(a,
                    b, d) { var h = a.serializable, k = b[d ? "endContainer" : "startContainer"], m = d ? "endOffset" : "startOffset", g = h ? b.document.getById(a.startNode) : a.startNode; a = h ? b.document.getById(a.endNode) : a.endNode; k.equals(g.getPrevious()) ? (b.startOffset = b.startOffset - k.getLength() - a.getPrevious().getLength(), k = a.getNext()) : k.equals(a.getPrevious()) && (b.startOffset -= k.getLength(), k = a.getNext()); k.equals(g.getParent()) && b[m]++; k.equals(a.getParent()) && b[m]++; b[d ? "endContainer" : "startContainer"] = k; return b } CKEDITOR.dom.rangeList =
                        function (a) { if (a instanceof CKEDITOR.dom.rangeList) return a; a ? a instanceof CKEDITOR.dom.range && (a = [a]) : a = []; return CKEDITOR.tools.extend(a, h) }; var h = {
                            createIterator: function () {
                                var a = this, b = CKEDITOR.dom.walker.bookmark(), d = [], h; return {
                                    getNextRange: function (k) {
                                        h = void 0 === h ? 0 : h + 1; var m = a[h]; if (m && 1 < a.length) {
                                            if (!h) for (var g = a.length - 1; 0 <= g; g--)d.unshift(a[g].createBookmark(!0)); if (k) for (var e = 0; a[h + e + 1];) {
                                                var c = m.document; k = 0; g = c.getById(d[e].endNode); for (c = c.getById(d[e + 1].startNode); ;) {
                                                    g = g.getNextSourceNode(!1);
                                                    if (c.equals(g)) k = 1; else if (b(g) || g.type == CKEDITOR.NODE_ELEMENT && g.isBlockBoundary()) continue; break
                                                } if (!k) break; e++
                                            } for (m.moveToBookmark(d.shift()); e--;)g = a[++h], g.moveToBookmark(d.shift()), m.setEnd(g.endContainer, g.endOffset)
                                        } return m
                                    }
                                }
                            }, createBookmarks: function (f) { for (var b = [], d, h = 0; h < this.length; h++) { b.push(d = this[h].createBookmark(f, !0)); for (var k = h + 1; k < this.length; k++)this[k] = a(d, this[k]), this[k] = a(d, this[k], !0) } return b }, createBookmarks2: function (a) {
                                for (var b = [], d = 0; d < this.length; d++)b.push(this[d].createBookmark2(a));
                                return b
                            }, moveToBookmarks: function (a) { for (var b = 0; b < this.length; b++)this[b].moveToBookmark(a[b]) }
                        }
            })(); (function () {
                function a() { return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] || "skins/" + CKEDITOR.skinName.split(",")[0] + "/") } function h(b) {
                    var c = CKEDITOR.skin["ua_" + b], g = CKEDITOR.env; if (c) for (var c = c.split(",").sort(function (a, b) { return a > b ? -1 : 1 }), d = 0, k; d < c.length; d++)if (k = c[d], g.ie && (k.replace(/^ie/, "") == g.version || g.quirks && "iequirks" == k) && (k = "ie"), g[k]) { b += "_" + c[d]; break } return CKEDITOR.getUrl(a() +
                        b + ".css")
                } function f(a, b) { l[a] || (CKEDITOR.document.appendStyleSheet(h(a)), l[a] = 1); b && b() } function b(a) { var b = a.getById(k); b || (b = a.getHead().append("style"), b.setAttribute("id", k), b.setAttribute("type", "text/css")); return b } function d(a, b, g) {
                    var d, k, f; if (CKEDITOR.env.webkit) for (b = b.split("}").slice(0, -1), k = 0; k < b.length; k++)b[k] = b[k].split("{"); for (var h = 0; h < a.length; h++)if (CKEDITOR.env.webkit) for (k = 0; k < b.length; k++) {
                        f = b[k][1]; for (d = 0; d < g.length; d++)f = f.replace(g[d][0], g[d][1]); a[h].$.sheet.addRule(b[k][0],
                            f)
                    } else { f = b; for (d = 0; d < g.length; d++)f = f.replace(g[d][0], g[d][1]); CKEDITOR.env.ie && 11 > CKEDITOR.env.version ? a[h].$.styleSheet.cssText += f : a[h].$.innerHTML += f }
                } var l = {}; CKEDITOR.skin = {
                    path: a, loadPart: function (b, c) { CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(a() + "skin.js"), function () { f(b, c) }) : f(b, c) }, getPath: function (a) { return CKEDITOR.getUrl(h(a)) }, icons: {}, addIcon: function (a, b, g, d) {
                        a = a.toLowerCase(); this.icons[a] || (this.icons[a] = {
                            path: b, offset: g || 0, bgsize: d ||
                                "16px"
                        })
                    }, getIconStyle: function (a, b, g, d, k) { var f; a && (a = a.toLowerCase(), b && (f = this.icons[a + "-rtl"]), f || (f = this.icons[a])); a = g || f && f.path || ""; d = d || f && f.offset; k = k || f && f.bgsize || "16px"; a && (a = a.replace(/'/g, "\\'")); return a && "background-image:url('" + CKEDITOR.getUrl(a) + "');background-position:0 " + d + "px;background-size:" + k + ";" }
                }; CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                    getUiColor: function () { return this.uiColor }, setUiColor: function (a) {
                        var c = b(CKEDITOR.document); return (this.setUiColor = function (a) {
                            this.uiColor =
                            a; var b = CKEDITOR.skin.chameleon, e = "", k = ""; "function" == typeof b && (e = b(this, "editor"), k = b(this, "panel")); a = [[g, a]]; d([c], e, a); d(m, k, a)
                        }).call(this, a)
                    }
                }); var k = "cke_ui_color", m = [], g = /\$color/g; CKEDITOR.on("instanceLoaded", function (a) {
                    if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) {
                        var c = a.editor; a = function (a) {
                            a = (a.data[0] || a.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument(); if (!a.getById("cke_ui_color")) {
                                var e = b(a); m.push(e); c.on("destroy", function () {
                                    m = CKEDITOR.tools.array.filter(m, function (a) {
                                        return e !==
                                            a
                                    })
                                }); (a = c.getUiColor()) && d([e], CKEDITOR.skin.chameleon(c, "panel"), [[g, a]])
                            }
                        }; c.on("panelShow", a); c.on("menuShow", a); c.config.uiColor && c.setUiColor(c.config.uiColor)
                    }
                })
            })(); (function () {
                var a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"\x3e\x3c/div\x3e', CKEDITOR.document); a.appendTo(CKEDITOR.document.getHead()); try {
                    var h = a.getComputedStyle("border-top-color"), f = a.getComputedStyle("border-right-color");
                    CKEDITOR.env.hc = !(!h || h != f)
                } catch (b) { CKEDITOR.env.hc = !1 } a.remove(); CKEDITOR.env.hc && (CKEDITOR.env.cssClass += " cke_hc"); CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}"); CKEDITOR.status = "loaded"; CKEDITOR.fireOnce("loaded"); if (a = CKEDITOR._.pending) for (delete CKEDITOR._.pending, h = 0; h < a.length; h++)CKEDITOR.editor.prototype.constructor.apply(a[h][0], a[h][1]), CKEDITOR.add(a[h][0])
            })(); CKEDITOR.skin.name = "moono-lisa"; CKEDITOR.skin.ua_editor = "ie,iequirks,ie8,gecko"; CKEDITOR.skin.ua_dialog = "ie,iequirks,ie8";
        CKEDITOR.skin.chameleon = function () {
            var a = function () { return function (a, b) { for (var d = a.match(/[^#]./g), h = 0; 3 > h; h++) { var k = h, m; m = parseInt(d[h], 16); m = ("0" + (0 > b ? 0 | m * (1 + b) : 0 | m + (255 - m) * b).toString(16)).slice(-2); d[k] = m } return "#" + d.join("") } }(), h = {
                editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_bottom [background-color:{defaultBackground};border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [background-color:{defaultBackground};outline-color:{defaultBorder};] {id} .cke_dialog_tab [background-color:{dialogTab};border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [background-color:{lightBackground};] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} a.cke_button_off:hover,{id} a.cke_button_off:focus,{id} a.cke_button_off:active [background-color:{darkBackground};border-color:{toolbarElementsBorder};] {id} .cke_button_on [background-color:{ckeButtonOn};border-color:{toolbarElementsBorder};] {id} .cke_toolbar_separator,{id} .cke_toolgroup a.cke_button:last-child:after,{id} .cke_toolgroup a.cke_button.cke_button_disabled:hover:last-child:after [background-color: {toolbarElementsBorder};border-color: {toolbarElementsBorder};] {id} a.cke_combo_button:hover,{id} a.cke_combo_button:focus,{id} .cke_combo_on a.cke_combo_button [border-color:{toolbarElementsBorder};background-color:{darkBackground};] {id} .cke_combo:after [border-color:{toolbarElementsBorder};] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover,{id} a.cke_path_item:focus,{id} a.cke_path_item:active [background-color:{darkBackground};] {id}.cke_panel [border-color:{defaultBorder};] "),
                panel: new CKEDITOR.template(".cke_panel_grouptitle [background-color:{lightBackground};border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover,.cke_menubutton:focus,.cke_menubutton:active [background-color:{menubuttonHover};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menubutton_disabled:hover .cke_menubutton_icon,.cke_menubutton_disabled:focus .cke_menubutton_icon,.cke_menubutton_disabled:active .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")
            };
            return function (f, b) { var d = a(f.uiColor, .4), d = { id: "." + f.id, defaultBorder: a(d, -.2), toolbarElementsBorder: a(d, -.25), defaultBackground: d, lightBackground: a(d, .8), darkBackground: a(d, -.15), ckeButtonOn: a(d, .4), ckeResizer: a(d, -.4), ckeColorauto: a(d, .8), dialogBody: a(d, .7), dialogTab: a(d, .65), dialogTabSelected: "#FFF", dialogTabSelectedBorder: "#FFF", elementsPathColor: a(d, -.6), menubuttonHover: a(d, .1), menubuttonIcon: a(d, .5), menubuttonIconHover: a(d, .3) }; return h[b].output(d).replace(/\[/g, "{").replace(/\]/g, "}") }
        }();
        CKEDITOR.plugins.add("dialogui", {
            onLoad: function () {
                var a = function (a) { this._ || (this._ = {}); this._["default"] = this._.initValue = a["default"] || ""; this._.required = a.required || !1; for (var b = [this._], c = 1; c < arguments.length; c++)b.push(arguments[c]); b.push(!0); CKEDITOR.tools.extend.apply(CKEDITOR.tools, b); return this._ }, h = { build: function (a, b, c) { return new CKEDITOR.ui.dialog.textInput(a, b, c) } }, f = { build: function (a, b, c) { return new CKEDITOR.ui.dialog[b.type](a, b, c) } }, b = {
                    isChanged: function () {
                        return this.getValue() !=
                            this.getInitValue()
                    }, reset: function (a) { this.setValue(this.getInitValue(), a) }, setInitValue: function () { this._.initValue = this.getValue() }, resetInitValue: function () { this._.initValue = this._["default"] }, getInitValue: function () { return this._.initValue }
                }, d = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                    onChange: function (a, b) {
                        this._.domOnChangeRegistered || (a.on("load", function () {
                            this.getInputElement().on("change", function () { a.parts.dialog.isVisible() && this.fire("change", { value: this.getValue() }) },
                                this)
                        }, this), this._.domOnChangeRegistered = !0); this.on("change", b)
                    }
                }, !0), l = /^on([A-Z]\w+)/, k = function (a) { for (var b in a) (l.test(b) || "title" == b || "type" == b) && delete a[b]; return a }, m = function (a) { a = a.data.getKeystroke(); a == CKEDITOR.SHIFT + CKEDITOR.ALT + 36 ? this.setDirectionMarker("ltr") : a == CKEDITOR.SHIFT + CKEDITOR.ALT + 35 && this.setDirectionMarker("rtl") }; CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
                    labeledElement: function (b, e, c, d) {
                        if (!(4 > arguments.length)) {
                            var k = a.call(this, e); k.labelId = CKEDITOR.tools.getNextId() +
                                "_label"; this._.children = []; var f = { role: e.role || "presentation" }; e.includeLabel && (f["aria-labelledby"] = k.labelId); CKEDITOR.ui.dialog.uiElement.call(this, b, e, c, "div", null, f, function () {
                                    var a = [], c = e.required ? " cke_required" : ""; "horizontal" != e.labelLayout ? a.push('\x3clabel class\x3d"cke_dialog_ui_labeled_label' + c + '" ', ' id\x3d"' + k.labelId + '"', k.inputId ? ' for\x3d"' + k.inputId + '"' : "", (e.labelStyle ? ' style\x3d"' + e.labelStyle + '"' : "") + "\x3e", e.required ? e.label + '\x3cspan class\x3d"cke_dialog_ui_labeled_required" aria-hidden\x3d"true"\x3e*\x3c/span\x3e' :
                                        e.label, "\x3c/label\x3e", '\x3cdiv class\x3d"cke_dialog_ui_labeled_content"', e.controlStyle ? ' style\x3d"' + e.controlStyle + '"' : "", ' role\x3d"presentation"\x3e', d.call(this, b, e), "\x3c/div\x3e") : (c = {
                                            type: "hbox", widths: e.widths, padding: 0, children: [{ type: "html", html: '\x3clabel class\x3d"cke_dialog_ui_labeled_label' + c + '" id\x3d"' + k.labelId + '" for\x3d"' + k.inputId + '"' + (e.labelStyle ? ' style\x3d"' + e.labelStyle + '"' : "") + "\x3e" + CKEDITOR.tools.htmlEncode(e.label) + "\x3c/label\x3e" }, {
                                                type: "html", html: '\x3cspan class\x3d"cke_dialog_ui_labeled_content"' +
                                                    (e.controlStyle ? ' style\x3d"' + e.controlStyle + '"' : "") + "\x3e" + d.call(this, b, e) + "\x3c/span\x3e"
                                            }]
                                        }, CKEDITOR.dialog._.uiElementBuilders.hbox.build(b, c, a)); return a.join("")
                                })
                        }
                    }, textInput: function (b, e, c) {
                        if (!(3 > arguments.length)) {
                            a.call(this, e); var d = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput", k = { "class": "cke_dialog_ui_input_" + e.type, id: d, type: e.type }; e.validate && (this.validate = e.validate); e.maxLength && (k.maxlength = e.maxLength); e.size && (k.size = e.size); e.inputStyle && (k.style = e.inputStyle); var f =
                                this, h = !1; b.on("load", function () { f.getInputElement().on("keydown", function (a) { 13 == a.data.getKeystroke() && (h = !0) }); f.getInputElement().on("keyup", function (a) { 13 == a.data.getKeystroke() && h && (b.getButton("ok") && setTimeout(function () { b.getButton("ok").click() }, 0), h = !1); f.bidi && m.call(f, a) }, null, null, 1E3) }); CKEDITOR.ui.dialog.labeledElement.call(this, b, e, c, function () {
                                    var a = ['\x3cdiv class\x3d"cke_dialog_ui_input_', e.type, '" role\x3d"presentation"']; e.width && a.push('style\x3d"width:' + e.width + '" '); a.push("\x3e\x3cinput ");
                                    k["aria-labelledby"] = this._.labelId; this._.required && (k["aria-required"] = this._.required); for (var b in k) a.push(b + '\x3d"' + k[b] + '" '); a.push(" /\x3e\x3c/div\x3e"); return a.join("")
                                })
                        }
                    }, textarea: function (b, e, c) {
                        if (!(3 > arguments.length)) {
                            a.call(this, e); var d = this, k = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea", f = {}; e.validate && (this.validate = e.validate); f.rows = e.rows || 5; f.cols = e.cols || 20; f["class"] = "cke_dialog_ui_input_textarea " + (e["class"] || ""); "undefined" != typeof e.inputStyle && (f.style = e.inputStyle);
                            e.dir && (f.dir = e.dir); if (d.bidi) b.on("load", function () { d.getInputElement().on("keyup", m) }, d); CKEDITOR.ui.dialog.labeledElement.call(this, b, e, c, function () {
                                f["aria-labelledby"] = this._.labelId; this._.required && (f["aria-required"] = this._.required); var a = ['\x3cdiv class\x3d"cke_dialog_ui_input_textarea" role\x3d"presentation"\x3e\x3ctextarea id\x3d"', k, '" '], b; for (b in f) a.push(b + '\x3d"' + CKEDITOR.tools.htmlEncode(f[b]) + '" '); a.push("\x3e", CKEDITOR.tools.htmlEncode(d._["default"]), "\x3c/textarea\x3e\x3c/div\x3e");
                                return a.join("")
                            })
                        }
                    }, checkbox: function (b, e, c) {
                        if (!(3 > arguments.length)) {
                            var d = a.call(this, e, { "default": !!e["default"] }); e.validate && (this.validate = e.validate); CKEDITOR.ui.dialog.uiElement.call(this, b, e, c, "span", null, null, function () {
                                var a = CKEDITOR.tools.extend({}, e, { id: e.id ? e.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox" }, !0), c = [], f = CKEDITOR.tools.getNextId() + "_label", h = { "class": "cke_dialog_ui_checkbox_input", type: "checkbox", "aria-labelledby": f }; k(a); e["default"] && (h.checked = "checked"); "undefined" !=
                                    typeof a.inputStyle && (a.style = a.inputStyle); d.checkbox = new CKEDITOR.ui.dialog.uiElement(b, a, c, "input", null, h); c.push(' \x3clabel id\x3d"', f, '" for\x3d"', h.id, '"' + (e.labelStyle ? ' style\x3d"' + e.labelStyle + '"' : "") + "\x3e", CKEDITOR.tools.htmlEncode(e.label), "\x3c/label\x3e"); return c.join("")
                            })
                        }
                    }, radio: function (b, e, c) {
                        if (!(3 > arguments.length)) {
                            a.call(this, e); this._["default"] || (this._["default"] = this._.initValue = e.items[0][1]); e.validate && (this.validate = e.validate); var d = [], f = this; e.role = "radiogroup";
                            e.includeLabel = !0; CKEDITOR.ui.dialog.labeledElement.call(this, b, e, c, function () {
                                for (var a = [], c = [], h = (e.id ? e.id : CKEDITOR.tools.getNextId()) + "_radio", m = 0; m < e.items.length; m++) {
                                    var l = e.items[m], v = void 0 !== l[2] ? l[2] : l[0], D = void 0 !== l[1] ? l[1] : l[0], t = CKEDITOR.tools.getNextId() + "_radio_input", y = t + "_label", t = CKEDITOR.tools.extend({}, e, { id: t, title: null, type: null }, !0), v = CKEDITOR.tools.extend({}, t, { title: v }, !0), z = { type: "radio", "class": "cke_dialog_ui_radio_input", name: h, value: D, "aria-labelledby": y }, B = []; f._["default"] ==
                                        D && (z.checked = "checked"); k(t); k(v); "undefined" != typeof t.inputStyle && (t.style = t.inputStyle); t.keyboardFocusable = !0; d.push(new CKEDITOR.ui.dialog.uiElement(b, t, B, "input", null, z)); B.push(" "); new CKEDITOR.ui.dialog.uiElement(b, v, B, "label", null, { id: y, "for": z.id }, l[0]); a.push(B.join(""))
                                } new CKEDITOR.ui.dialog.hbox(b, d, a, c); return c.join("")
                            }); this._.children = d
                        }
                    }, button: function (b, e, c) {
                        if (arguments.length) {
                            "function" == typeof e && (e = e(b.getParentEditor())); a.call(this, e, { disabled: e.disabled || !1 }); CKEDITOR.event.implementOn(this);
                            var d = this; b.on("load", function () { var a = this.getElement(); (function () { a.on("click", function (a) { d.click(); a.data.preventDefault() }); a.on("keydown", function (a) { a.data.getKeystroke() in { 32: 1 } && (d.click(), a.data.preventDefault()) }) })(); a.unselectable() }, this); var k = CKEDITOR.tools.extend({}, e); delete k.style; var f = CKEDITOR.tools.getNextId() + "_label"; CKEDITOR.ui.dialog.uiElement.call(this, b, k, c, "a", null, {
                                style: e.style, href: "javascript:void(0)", title: e.label, hidefocus: "true", "class": e["class"], role: "button",
                                "aria-labelledby": f
                            }, '\x3cspan id\x3d"' + f + '" class\x3d"cke_dialog_ui_button"\x3e' + CKEDITOR.tools.htmlEncode(e.label) + "\x3c/span\x3e")
                        }
                    }, select: function (b, e, c) {
                        if (!(3 > arguments.length)) {
                            var d = a.call(this, e); e.validate && (this.validate = e.validate); d.inputId = CKEDITOR.tools.getNextId() + "_select"; CKEDITOR.ui.dialog.labeledElement.call(this, b, e, c, function () {
                                var a = CKEDITOR.tools.extend({}, e, { id: e.id ? e.id + "_select" : CKEDITOR.tools.getNextId() + "_select" }, !0), c = [], f = [], h = {
                                    id: d.inputId, "class": "cke_dialog_ui_input_select",
                                    "aria-labelledby": this._.labelId
                                }; c.push('\x3cdiv class\x3d"cke_dialog_ui_input_', e.type, '" role\x3d"presentation"'); e.width && c.push('style\x3d"width:' + e.width + '" '); c.push("\x3e"); void 0 !== e.size && (h.size = e.size); void 0 !== e.multiple && (h.multiple = e.multiple); k(a); for (var m = 0, l; m < e.items.length && (l = e.items[m]); m++)f.push('\x3coption value\x3d"', CKEDITOR.tools.htmlEncode(void 0 !== l[1] ? l[1] : l[0]).replace(/"/g, "\x26quot;"), '" /\x3e ', CKEDITOR.tools.htmlEncode(l[0])); "undefined" != typeof a.inputStyle &&
                                    (a.style = a.inputStyle); d.select = new CKEDITOR.ui.dialog.uiElement(b, a, c, "select", null, h, f.join("")); c.push("\x3c/div\x3e"); return c.join("")
                            })
                        }
                    }, file: function (b, e, c) {
                        if (!(3 > arguments.length)) {
                            void 0 === e["default"] && (e["default"] = ""); var d = CKEDITOR.tools.extend(a.call(this, e), { definition: e, buttons: [] }); e.validate && (this.validate = e.validate); b.on("load", function () { CKEDITOR.document.getById(d.frameId).getParent().addClass("cke_dialog_ui_input_file") }); CKEDITOR.ui.dialog.labeledElement.call(this, b, e, c,
                                function () { d.frameId = CKEDITOR.tools.getNextId() + "_fileInput"; var a = ['\x3ciframe frameborder\x3d"0" allowtransparency\x3d"0" class\x3d"cke_dialog_ui_input_file" role\x3d"presentation" id\x3d"', d.frameId, '" title\x3d"', e.label, '" src\x3d"javascript:void(']; a.push(CKEDITOR.env.ie ? "(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "})()" : "0"); a.push(')"\x3e\x3c/iframe\x3e'); return a.join("") })
                        }
                    }, fileButton: function (b, e, c) {
                        var d = this; if (!(3 > arguments.length)) {
                            a.call(this,
                                e); e.validate && (this.validate = e.validate); var k = CKEDITOR.tools.extend({}, e), f = k.onClick; k.className = (k.className ? k.className + " " : "") + "cke_dialog_ui_button"; k.onClick = function (a) { var c = e["for"]; a = f ? f.call(this, a) : !1; !1 !== a && ("xhr" !== a && b.getContentElement(c[0], c[1]).submit(), this.disable()) }; b.on("load", function () { b.getContentElement(e["for"][0], e["for"][1])._.buttons.push(d) }); CKEDITOR.ui.dialog.button.call(this, b, k, c)
                        }
                    }, html: function () {
                        var a = /^\s*<[\w:]+\s+([^>]*)?>/, b = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/,
                        c = /\/$/; return function (d, k, f) {
                            if (!(3 > arguments.length)) {
                                var h = [], m = k.html; "\x3c" != m.charAt(0) && (m = "\x3cspan\x3e" + m + "\x3c/span\x3e"); var l = k.focus; if (l) { var A = this.focus; this.focus = function () { ("function" == typeof l ? l : A).call(this); this.fire("focus") }; k.isFocusable && (this.isFocusable = this.isFocusable); this.keyboardFocusable = !0 } CKEDITOR.ui.dialog.uiElement.call(this, d, k, h, "span", null, null, ""); h = h.join("").match(a); m = m.match(b) || ["", "", ""]; c.test(m[1]) && (m[1] = m[1].slice(0, -1), m[2] = "/" + m[2]); f.push([m[1],
                                    " ", h[1] || "", m[2]].join(""))
                            }
                        }
                    }(), fieldset: function (a, b, c, d, k) { var f = k.label; this._ = { children: b }; CKEDITOR.ui.dialog.uiElement.call(this, a, k, d, "fieldset", null, null, function () { var a = []; f && a.push("\x3clegend" + (k.labelStyle ? ' style\x3d"' + k.labelStyle + '"' : "") + "\x3e" + f + "\x3c/legend\x3e"); for (var b = 0; b < c.length; b++)a.push(c[b]); return a.join("") }) }
                }, !0); CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement; CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,
                    { setLabel: function (a) { var b = CKEDITOR.document.getById(this._.labelId); 1 > b.getChildCount() ? (new CKEDITOR.dom.text(a, CKEDITOR.document)).appendTo(b) : b.getChild(0).$.nodeValue = a; return this }, getLabel: function () { var a = CKEDITOR.document.getById(this._.labelId); return !a || 1 > a.getChildCount() ? "" : a.getChild(0).getText() }, eventProcessors: d }, !0); CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                        click: function () { return this._.disabled ? !1 : this.fire("click", { dialog: this._.dialog }) },
                        enable: function () { this._.disabled = !1; var a = this.getElement(); a && a.removeClass("cke_disabled") }, disable: function () { this._.disabled = !0; this.getElement().addClass("cke_disabled") }, isVisible: function () { return this.getElement().getFirst().isVisible() }, isEnabled: function () { return !this._.disabled }, eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, { onClick: function (a, b) { this.on("click", function () { b.apply(this, arguments) }) } }, !0), accessKeyUp: function () { this.click() },
                        accessKeyDown: function () { this.focus() }, keyboardFocusable: !0
                    }, !0); CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                        getInputElement: function () { return CKEDITOR.document.getById(this._.inputId) }, focus: function () { var a = this.selectParentTab(); setTimeout(function () { var b = a.getInputElement(); b && b.$.focus() }, 0) }, select: function () { var a = this.selectParentTab(); setTimeout(function () { var b = a.getInputElement(); b && (b.$.focus(), b.$.select()) }, 0) }, accessKeyUp: function () { this.select() },
                        setValue: function (a) { if (this.bidi) { var b = a && a.charAt(0); (b = "‪" == b ? "ltr" : "‫" == b ? "rtl" : null) && (a = a.slice(1)); this.setDirectionMarker(b) } a || (a = ""); return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments) }, getValue: function () { var a = CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this); if (this.bidi && a) { var b = this.getDirectionMarker(); b && (a = ("ltr" == b ? "‪" : "‫") + a) } return a }, setDirectionMarker: function (a) {
                            var b = this.getInputElement(); a ? b.setAttributes({ dir: a, "data-cke-dir-marker": a }) :
                                this.getDirectionMarker() && b.removeAttributes(["dir", "data-cke-dir-marker"])
                        }, getDirectionMarker: function () { return this.getInputElement().data("cke-dir-marker") }, keyboardFocusable: !0
                    }, b, !0); CKEDITOR.ui.dialog.textarea.prototype = new CKEDITOR.ui.dialog.textInput; CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                        getInputElement: function () { return this._.select.getElement() }, add: function (a, b, c) {
                            var d = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document),
                            k = this.getInputElement().$; d.$.text = a; d.$.value = void 0 === b || null === b ? a : b; void 0 === c || null === c ? CKEDITOR.env.ie ? k.add(d.$) : k.add(d.$, null) : k.add(d.$, c); return this
                        }, remove: function (a) { this.getInputElement().$.remove(a); return this }, clear: function () { for (var a = this.getInputElement().$; 0 < a.length;)a.remove(0); return this }, keyboardFocusable: !0
                    }, b, !0); CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                        getInputElement: function () { return this._.checkbox.getElement() },
                        setValue: function (a, b) { this.getInputElement().$.checked = a; !b && this.fire("change", { value: a }) }, getValue: function () { return this.getInputElement().$.checked }, accessKeyUp: function () { this.setValue(!this.getValue()) }, eventProcessors: {
                            onChange: function (a, b) {
                                if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return d.onChange.apply(this, arguments); a.on("load", function () {
                                    var a = this._.checkbox.getElement(); a.on("propertychange", function (b) { b = b.data.$; "checked" == b.propertyName && this.fire("change", { value: a.$.checked }) },
                                        this)
                                }, this); this.on("change", b); return null
                            }
                        }, keyboardFocusable: !0
                    }, b, !0); CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                        setValue: function (a, b) { for (var c = this._.children, d, k = 0; k < c.length && (d = c[k]); k++)d.getElement().$.checked = d.getValue() == a; !b && this.fire("change", { value: a }) }, getValue: function () { for (var a = this._.children, b = 0; b < a.length; b++)if (a[b].getElement().$.checked) return a[b].getValue(); return null }, accessKeyUp: function () {
                            var a = this._.children, b;
                            for (b = 0; b < a.length; b++)if (a[b].getElement().$.checked) { a[b].getElement().focus(); return } a[0].getElement().focus()
                        }, eventProcessors: { onChange: function (a, b) { if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return d.onChange.apply(this, arguments); a.on("load", function () { for (var a = this._.children, b = this, e = 0; e < a.length; e++)a[e].getElement().on("propertychange", function (a) { a = a.data.$; "checked" == a.propertyName && this.$.checked && b.fire("change", { value: this.getAttribute("value") }) }) }, this); this.on("change", b); return null } }
                    },
                        b, !0); CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, b, {
                            getInputElement: function () { var a = CKEDITOR.document.getById(this._.frameId).getFrameDocument(); return 0 < a.$.forms.length ? new CKEDITOR.dom.element(a.$.forms[0].elements[0]) : this.getElement() }, submit: function () { this.getInputElement().getParent().$.submit(); return this }, getAction: function () { return this.getInputElement().getParent().$.action }, registerEvents: function (a) {
                                var b = /^on([A-Z]\w+)/, c, d = function (a,
                                    b, c, e) { a.on("formLoaded", function () { a.getInputElement().on(c, e, a) }) }, k; for (k in a) if (c = k.match(b)) this.eventProcessors[k] ? this.eventProcessors[k].call(this, this._.dialog, a[k]) : d(this, this._.dialog, c[1].toLowerCase(), a[k]); return this
                            }, reset: function () {
                                function a() {
                                    c.$.open(); var g = ""; d.size && (g = d.size - (CKEDITOR.env.ie ? 7 : 0)); var v = b.frameId + "_input"; c.$.write(['\x3chtml dir\x3d"' + m + '" lang\x3d"' + l + '"\x3e\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e\x3cbody style\x3d"margin: 0; overflow: hidden; background: transparent;"\x3e',
                                    '\x3cform enctype\x3d"multipart/form-data" method\x3d"POST" dir\x3d"' + m + '" lang\x3d"' + l + '" action\x3d"', CKEDITOR.tools.htmlEncode(d.action), '"\x3e\x3clabel id\x3d"', b.labelId, '" for\x3d"', v, '" style\x3d"display:none"\x3e', CKEDITOR.tools.htmlEncode(d.label), '\x3c/label\x3e\x3cinput style\x3d"width:100%" id\x3d"', v, '" aria-labelledby\x3d"', b.labelId, '" type\x3d"file" name\x3d"', CKEDITOR.tools.htmlEncode(d.id || "cke_upload"), '" size\x3d"', CKEDITOR.tools.htmlEncode(0 < g ? g : ""), '" /\x3e\x3c/form\x3e\x3c/body\x3e\x3c/html\x3e\x3cscript\x3e',
                                    CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "", "window.parent.CKEDITOR.tools.callFunction(" + f + ");", "window.onbeforeunload \x3d function() {window.parent.CKEDITOR.tools.callFunction(" + h + ")}", "\x3c/script\x3e"].join("")); c.$.close(); for (g = 0; g < k.length; g++)k[g].enable()
                                } var b = this._, c = CKEDITOR.document.getById(b.frameId).getFrameDocument(), d = b.definition, k = b.buttons, f = this.formLoadedNumber, h = this.formUnloadNumber, m = b.dialog._.editor.lang.dir, l = b.dialog._.editor.langCode; f || (f = this.formLoadedNumber =
                                    CKEDITOR.tools.addFunction(function () { this.fire("formLoaded") }, this), h = this.formUnloadNumber = CKEDITOR.tools.addFunction(function () { this.getInputElement().clearCustomData() }, this), this.getDialog()._.editor.on("destroy", function () { CKEDITOR.tools.removeFunction(f); CKEDITOR.tools.removeFunction(h) })); CKEDITOR.env.gecko ? setTimeout(a, 500) : a()
                            }, getValue: function () { return this.getInputElement().$.value || "" }, setInitValue: function () { this._.initValue = "" }, eventProcessors: {
                                onChange: function (a, b) {
                                    this._.domOnChangeRegistered ||
                                    (this.on("formLoaded", function () { this.getInputElement().on("change", function () { this.fire("change", { value: this.getValue() }) }, this) }, this), this._.domOnChangeRegistered = !0); this.on("change", b)
                                }
                            }, keyboardFocusable: !0
                        }, !0); CKEDITOR.ui.dialog.fileButton.prototype = new CKEDITOR.ui.dialog.button; CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype); CKEDITOR.dialog.addUIElement("text", h); CKEDITOR.dialog.addUIElement("password", h); CKEDITOR.dialog.addUIElement("tel", h);
                CKEDITOR.dialog.addUIElement("textarea", f); CKEDITOR.dialog.addUIElement("checkbox", f); CKEDITOR.dialog.addUIElement("radio", f); CKEDITOR.dialog.addUIElement("button", f); CKEDITOR.dialog.addUIElement("select", f); CKEDITOR.dialog.addUIElement("file", f); CKEDITOR.dialog.addUIElement("fileButton", f); CKEDITOR.dialog.addUIElement("html", f); CKEDITOR.dialog.addUIElement("fieldset", {
                    build: function (a, b, c) {
                        for (var d = b.children, k, f = [], h = [], m = 0; m < d.length && (k = d[m]); m++) {
                            var l = []; f.push(l); h.push(CKEDITOR.dialog._.uiElementBuilders[k.type].build(a,
                                k, l))
                        } return new CKEDITOR.ui.dialog[b.type](a, h, f, c, b)
                    }
                })
            }
        }); CKEDITOR.DIALOG_RESIZE_NONE = 0; CKEDITOR.DIALOG_RESIZE_WIDTH = 1; CKEDITOR.DIALOG_RESIZE_HEIGHT = 2; CKEDITOR.DIALOG_RESIZE_BOTH = 3; CKEDITOR.DIALOG_STATE_IDLE = 1; CKEDITOR.DIALOG_STATE_BUSY = 2; (function () {
            function a(a) { a._.tabBarMode = !0; a._.tabs[a._.currentTabId][0].focus(); a._.currentFocusIndex = -1 } function h() {
                for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, c = b - 1; c > b - a; c--)if (this._.tabs[this._.tabIdList[c %
                    a]][0].$.offsetHeight) return this._.tabIdList[c % a]; return null
            } function f() { for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), c = b + 1; c < b + a; c++)if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a]; return null } function b(a, b) {
                for (var c = a.$.getElementsByTagName("input"), e = 0, d = c.length; e < d; e++) {
                    var g = new CKEDITOR.dom.element(c[e]); "text" == g.getAttribute("type").toLowerCase() && (b ? (g.setAttribute("value", g.getCustomData("fake_value") ||
                        ""), g.removeCustomData("fake_value")) : (g.setCustomData("fake_value", g.getAttribute("value")), g.setAttribute("value", "")))
                }
            } function d(a, b) { var c = this.getInputElement(); c && (a ? c.removeAttribute("aria-invalid") : c.setAttribute("aria-invalid", !0)); a || (this.select ? this.select() : this.focus()); b && alert(b); this.fire("validated", { valid: a, msg: b }) } function l() { var a = this.getInputElement(); a && a.removeAttribute("aria-invalid") } function k(a) {
                var b = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog",
                    L).output({ id: CKEDITOR.tools.getNextNumber(), editorId: a.id, langDir: a.lang.dir, langCode: a.langCode, editorDialogClass: "cke_editor_" + a.name.replace(/\./g, "\\.") + "_dialog", closeTitle: a.lang.common.close, hidpi: CKEDITOR.env.hidpi ? "cke_hidpi" : "" })), c = b.getChild([0, 0, 0, 0, 0]), e = c.getChild(0), d = c.getChild(1); a.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(c); !CKEDITOR.env.ie || CKEDITOR.env.quirks || CKEDITOR.env.edge || (a = "javascript:void(function(){" + encodeURIComponent("document.open();(" +
                        CKEDITOR.tools.fixDomain + ")();document.close();") + "}())", CKEDITOR.dom.element.createFromHtml('\x3ciframe frameBorder\x3d"0" class\x3d"cke_iframe_shim" src\x3d"' + a + '" tabIndex\x3d"-1"\x3e\x3c/iframe\x3e').appendTo(c.getParent())); e.unselectable(); d.unselectable(); return { element: b, parts: { dialog: b.getChild(0), title: e, close: d, tabs: c.getChild(2), contents: c.getChild([3, 0, 0, 0]), footer: c.getChild([3, 0, 1, 0]) } }
            } function m(a, b, c) {
                this.element = b; this.focusIndex = c; this.tabIndex = 0; this.isFocusable = function () {
                    return !b.getAttribute("disabled") &&
                        b.isVisible()
                }; this.focus = function () { a._.currentFocusIndex = this.focusIndex; this.element.focus() }; b.on("keydown", function (a) { a.data.getKeystroke() in { 32: 1, 13: 1 } && this.fire("click") }); b.on("focus", function () { this.fire("mouseover") }); b.on("blur", function () { this.fire("mouseout") })
            } function g(a) { function b() { a.layout() } var c = CKEDITOR.document.getWindow(); c.on("resize", b); a.on("hide", function () { c.removeListener("resize", b) }) } function e(a, b) {
                this.dialog = a; for (var e = b.contents, d = 0, g; g = e[d]; d++)e[d] = g && new c(a,
                    g); CKEDITOR.tools.extend(this, b)
            } function c(a, b) { this._ = { dialog: a }; CKEDITOR.tools.extend(this, b) } function n(a) {
                function b(c) { var h = a.getSize(), m = a.parts.dialog.getParent().getClientSize(), l = c.data.$.screenX, n = c.data.$.screenY, u = l - e.x, v = n - e.y; e = { x: l, y: n }; d.x += u; d.y += v; l = d.x + f[3] < k ? -f[3] : d.x - f[1] > m.width - h.width - k ? m.width - h.width + ("rtl" == g.lang.dir ? 0 : f[1]) : d.x; h = d.y + f[0] < k ? -f[0] : d.y - f[2] > m.height - h.height - k ? m.height - h.height + f[2] : d.y; l = Math.floor(l); h = Math.floor(h); a.move(l, h, 1); c.data.preventDefault() }
                function c() { CKEDITOR.document.removeListener("mousemove", b); CKEDITOR.document.removeListener("mouseup", c); if (CKEDITOR.env.ie6Compat) { var a = E.getChild(0).getFrameDocument(); a.removeListener("mousemove", b); a.removeListener("mouseup", c) } } var e = null, d = null, g = a.getParentEditor(), k = g.config.dialog_magnetDistance, f = CKEDITOR.skin.margins || [0, 0, 0, 0]; "undefined" == typeof k && (k = 20); a.parts.title.on("mousedown", function (g) {
                    if (!a._.moved) {
                        var k = a._.element; k.getFirst().setStyle("position", "absolute"); k.removeStyle("display");
                        a._.moved = !0; a.layout()
                    } e = { x: g.data.$.screenX, y: g.data.$.screenY }; CKEDITOR.document.on("mousemove", b); CKEDITOR.document.on("mouseup", c); d = a.getPosition(); CKEDITOR.env.ie6Compat && (k = E.getChild(0).getFrameDocument(), k.on("mousemove", b), k.on("mouseup", c)); g.data.preventDefault()
                }, a)
            } function u(a) {
                function b(c) {
                    var n = "rtl" == g.lang.dir, u = l.width, v = l.height, r = u + (c.data.$.screenX - m.x) * (n ? -1 : 1) * (a._.moved ? 1 : 2), J = v + (c.data.$.screenY - m.y) * (a._.moved ? 1 : 2), t = a._.element.getFirst(), t = n && parseInt(t.getComputedStyle("right"),
                        10), z = a.getPosition(); z.x = z.x || 0; z.y = z.y || 0; z.y + J > h.height && (J = h.height - z.y); (n ? t : z.x) + r > h.width && (r = h.width - (n ? t : z.x)); J = Math.floor(J); r = Math.floor(r); if (d == CKEDITOR.DIALOG_RESIZE_WIDTH || d == CKEDITOR.DIALOG_RESIZE_BOTH) u = Math.max(e.minWidth || 0, r - k); if (d == CKEDITOR.DIALOG_RESIZE_HEIGHT || d == CKEDITOR.DIALOG_RESIZE_BOTH) v = Math.max(e.minHeight || 0, J - f); a.resize(u, v); a._.moved && w(a, a._.position.x, a._.position.y); a._.moved || a.layout(); c.data.preventDefault()
                } function c() {
                    CKEDITOR.document.removeListener("mouseup",
                        c); CKEDITOR.document.removeListener("mousemove", b); n && (n.remove(), n = null); if (CKEDITOR.env.ie6Compat) { var a = E.getChild(0).getFrameDocument(); a.removeListener("mouseup", c); a.removeListener("mousemove", b) }
                } var e = a.definition, d = e.resizable; if (d != CKEDITOR.DIALOG_RESIZE_NONE) {
                    var g = a.getParentEditor(), k, f, h, m, l, n, u = CKEDITOR.tools.addFunction(function (e) {
                        function d(a) { return a.isVisible() } l = a.getSize(); var g = a.parts.contents, u = g.$.getElementsByTagName("iframe").length, v = !(CKEDITOR.env.gecko || CKEDITOR.env.ie &&
                            CKEDITOR.env.quirks); u && (n = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_dialog_resize_cover" style\x3d"height: 100%; position: absolute; width: 100%; left:0; top:0;"\x3e\x3c/div\x3e'), g.append(n)); f = l.height - a.parts.contents.getFirst(d).getSize("height", v); k = l.width - a.parts.contents.getFirst(d).getSize("width", 1); m = { x: e.screenX, y: e.screenY }; h = CKEDITOR.document.getWindow().getViewPaneSize(); CKEDITOR.document.on("mousemove", b); CKEDITOR.document.on("mouseup", c); CKEDITOR.env.ie6Compat &&
                                (g = E.getChild(0).getFrameDocument(), g.on("mousemove", b), g.on("mouseup", c)); e.preventDefault && e.preventDefault()
                    }); a.on("load", function () {
                        var b = ""; d == CKEDITOR.DIALOG_RESIZE_WIDTH ? b = " cke_resizer_horizontal" : d == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = " cke_resizer_vertical"); b = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_resizer' + b + " cke_resizer_" + g.lang.dir + '" title\x3d"' + CKEDITOR.tools.htmlEncode(g.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + u + ', event )"\x3e' + ("ltr" ==
                            g.lang.dir ? "◢" : "◣") + "\x3c/div\x3e"); a.parts.footer.append(b, 1)
                    }); g.on("destroy", function () { CKEDITOR.tools.removeFunction(u) })
                }
            } function w(a, b, c) { var e = a.parts.dialog.getParent().getClientSize(), d = a.getSize(), g = a._.viewportRatio, k = Math.max(e.width - d.width, 0), e = Math.max(e.height - d.height, 0); g.width = k ? b / k : g.width; g.height = e ? c / e : g.height; a._.viewportRatio = g } function p(a) { a.data.preventDefault(1) } function q(a) {
                var b = a.config, c = CKEDITOR.skinName || a.config.skin, e = b.dialog_backgroundCoverColor || ("moono-lisa" ==
                    c ? "black" : "white"), c = b.dialog_backgroundCoverOpacity, d = b.baseFloatZIndex, b = CKEDITOR.tools.genKey(e, c, d), g = F[b]; CKEDITOR.document.getBody().addClass("cke_dialog_open"); g ? g.show() : (d = ['\x3cdiv tabIndex\x3d"-1" style\x3d"position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", d, "; top: 0px; left: 0px; ", "; width: 100%; height: 100%;", CKEDITOR.env.ie6Compat ? "" : "background-color: " + e, '" class\x3d"cke_dialog_background_cover"\x3e'], CKEDITOR.env.ie6Compat && (e = "\x3chtml\x3e\x3cbody style\x3d\\'background-color:" +
                        e + ";\\'\x3e\x3c/body\x3e\x3c/html\x3e", d.push('\x3ciframe hidefocus\x3d"true" frameborder\x3d"0" id\x3d"cke_dialog_background_iframe" src\x3d"javascript:'), d.push("void((function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.write( '" + e + "' );document.close();") + "})())"), d.push('" style\x3d"position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity\x3d0)"\x3e\x3c/iframe\x3e')), d.push("\x3c/div\x3e"), g = CKEDITOR.dom.element.createFromHtml(d.join("")),
                        g.setOpacity(void 0 !== c ? c : .5), g.on("keydown", p), g.on("keypress", p), g.on("keyup", p), g.appendTo(CKEDITOR.document.getBody()), F[b] = g); a.focusManager.add(g); E = g; CKEDITOR.env.mac && CKEDITOR.env.webkit || g.focus()
            } function r(a) { CKEDITOR.document.getBody().removeClass("cke_dialog_open"); E && (a.focusManager.remove(E), E.hide()) } function A(a) {
                var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey, e = a.data.$.shiftKey, d = String.fromCharCode(a.data.$.keyCode); (b = P[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (e ? "SHIFT+" : "") +
                    d]) && b.length && (b = b[b.length - 1], b.keydown && b.keydown.call(b.uiElement, b.dialog, b.key), a.data.preventDefault())
            } function v(a) { var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey, e = a.data.$.shiftKey, d = String.fromCharCode(a.data.$.keyCode); (b = P[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (e ? "SHIFT+" : "") + d]) && b.length && (b = b[b.length - 1], b.keyup && (b.keyup.call(b.uiElement, b.dialog, b.key), a.data.preventDefault())) } function D(a, b, c, e, d) {
                (P[c] || (P[c] = [])).push({
                    uiElement: a, dialog: b, key: c, keyup: d || a.accessKeyUp, keydown: e ||
                        a.accessKeyDown
                })
            } function t(a) { for (var b in P) { for (var c = P[b], e = c.length - 1; 0 <= e; e--)c[e].dialog != a && c[e].uiElement != a || c.splice(e, 1); 0 === c.length && delete P[b] } } function y(a, b) { a._.accessKeyMap[b] && a.selectPage(a._.accessKeyMap[b]) } function z() { } var B = CKEDITOR.tools.cssLength, C, E, G = !1, H = !CKEDITOR.env.ie || CKEDITOR.env.edge, L = '\x3cdiv class\x3d"cke_reset_all cke_dialog_container {editorId} {editorDialogClass} {hidpi}" dir\x3d"{langDir}" style\x3d"' + (H ? "display:flex" : "") + '" lang\x3d"{langCode}" role\x3d"dialog" aria-labelledby\x3d"cke_dialog_title_{id}"\x3e\x3ctable class\x3d"cke_dialog ' +
                CKEDITOR.env.cssClass + ' cke_{langDir}" style\x3d"' + (H ? "margin:auto" : "position:absolute") + '" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd role\x3d"presentation"\x3e\x3cdiv class\x3d"cke_dialog_body" role\x3d"presentation"\x3e\x3cdiv id\x3d"cke_dialog_title_{id}" class\x3d"cke_dialog_title" role\x3d"presentation"\x3e\x3c/div\x3e\x3ca id\x3d"cke_dialog_close_button_{id}" class\x3d"cke_dialog_close_button" href\x3d"javascript:void(0)" title\x3d"{closeTitle}" role\x3d"button"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e\x3cdiv id\x3d"cke_dialog_tabs_{id}" class\x3d"cke_dialog_tabs" role\x3d"tablist"\x3e\x3c/div\x3e\x3ctable class\x3d"cke_dialog_contents" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_contents_{id}" class\x3d"cke_dialog_contents_body" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_footer_{id}" class\x3d"cke_dialog_footer" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e';
            CKEDITOR.dialog = function (b, c) {
                function g() { var a = B._.focusList; a.sort(function (a, b) { return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex : a.focusIndex - b.focusIndex }); for (var b = a.length, c = 0; c < b; c++)a[c].focusIndex = c } function m(a) {
                    var b = B._.focusList; a = a || 0; if (!(1 > b.length)) {
                        var c = B._.currentFocusIndex; B._.tabBarMode && 0 > a && (c = 0); try { b[c].getInputElement().$.blur() } catch (e) { } var d = c, g = 1 < B._.pageCount; do {
                            d += a; if (g && !B._.tabBarMode && (d == b.length || -1 == d)) {
                                B._.tabBarMode = !0; B._.tabs[B._.currentTabId][0].focus();
                                B._.currentFocusIndex = -1; return
                            } d = (d + b.length) % b.length; if (d == c) break
                        } while (a && !b[d].isFocusable()); b[d].focus(); "text" == b[d].type && b[d].select()
                    }
                } function v(c) {
                    if (B == CKEDITOR.dialog._.currentTop) {
                        var e = c.data.getKeystroke(), d = "rtl" == b.lang.dir, g = [37, 38, 39, 40]; p = A = 0; if (9 == e || e == CKEDITOR.SHIFT + 9) m(e == CKEDITOR.SHIFT + 9 ? -1 : 1), p = 1; else if (e == CKEDITOR.ALT + 121 && !B._.tabBarMode && 1 < B.getPageCount()) a(B), p = 1; else if (-1 != CKEDITOR.tools.indexOf(g, e) && B._.tabBarMode) e = -1 != CKEDITOR.tools.indexOf([d ? 39 : 37, 38], e) ?
                            h.call(B) : f.call(B), B.selectPage(e), B._.tabs[e][0].focus(), p = 1; else if (13 != e && 32 != e || !B._.tabBarMode) if (13 == e) e = c.data.getTarget(), e.is("a", "button", "select", "textarea") || e.is("input") && "button" == e.$.type || ((e = this.getButton("ok")) && CKEDITOR.tools.setTimeout(e.click, 0, e), p = 1), A = 1; else if (27 == e) (e = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(e.click, 0, e) : !1 !== this.fire("cancel", { hide: !0 }).hide && this.hide(), A = 1; else return; else this.selectPage(this._.currentTabId), this._.tabBarMode = !1, this._.currentFocusIndex =
                                -1, m(1), p = 1; r(c)
                    }
                } function r(a) { p ? a.data.preventDefault(1) : A && a.data.stopPropagation() } var t = CKEDITOR.dialog._.dialogDefinitions[c], w = CKEDITOR.tools.clone(C), z = b.config.dialog_buttonsOrder || "OS", q = b.lang.dir, y = {}, p, A; ("OS" == z && CKEDITOR.env.mac || "rtl" == z && "ltr" == q || "ltr" == z && "rtl" == q) && w.buttons.reverse(); t = CKEDITOR.tools.extend(t(b), w); t = CKEDITOR.tools.clone(t); t = new e(this, t); w = k(b); this._ = {
                    editor: b, element: w.element, name: c, model: null, contentSize: { width: 0, height: 0 }, size: { width: 0, height: 0 }, contents: {},
                    buttons: {}, accessKeyMap: {}, viewportRatio: { width: .5, height: .5 }, tabs: {}, tabIdList: [], currentTabId: null, currentTabIndex: null, pageCount: 0, lastTab: null, tabBarMode: !1, focusList: [], currentFocusIndex: 0, hasFocus: !1
                }; this.parts = w.parts; CKEDITOR.tools.setTimeout(function () { b.fire("ariaWidget", this.parts.contents) }, 0, this); w = { top: 0, visibility: "hidden" }; CKEDITOR.env.ie6Compat && (w.position = "absolute"); w["rtl" == q ? "right" : "left"] = 0; this.parts.dialog.setStyles(w); CKEDITOR.event.call(this); this.definition = t = CKEDITOR.fire("dialogDefinition",
                    { name: c, definition: t, dialog: this }, b).definition; if (!("removeDialogTabs" in b._) && b.config.removeDialogTabs) { w = b.config.removeDialogTabs.split(";"); for (q = 0; q < w.length; q++)if (z = w[q].split(":"), 2 == z.length) { var D = z[0]; y[D] || (y[D] = []); y[D].push(z[1]) } b._.removeDialogTabs = y } if (b._.removeDialogTabs && (y = b._.removeDialogTabs[c])) for (q = 0; q < y.length; q++)t.removeContents(y[q]); if (t.onLoad) this.on("load", t.onLoad); if (t.onShow) this.on("show", t.onShow); if (t.onHide) this.on("hide", t.onHide); if (t.onOk) this.on("ok",
                        function (a) { b.fire("saveSnapshot"); setTimeout(function () { b.fire("saveSnapshot") }, 0); !1 === t.onOk.call(this, a) && (a.data.hide = !1) }); this.state = CKEDITOR.DIALOG_STATE_IDLE; if (t.onCancel) this.on("cancel", function (a) { !1 === t.onCancel.call(this, a) && (a.data.hide = !1) }); var B = this, E = function (a) { var b = B._.contents, c = !1, e; for (e in b) for (var d in b[e]) if (c = a.call(this, b[e][d])) return }; this.on("ok", function (a) {
                            E(function (b) {
                                if (b.validate) {
                                    var c = b.validate(this), e = "string" == typeof c || !1 === c; e && (a.data.hide = !1, a.stop());
                                    d.call(b, !e, "string" == typeof c ? c : void 0); return e
                                }
                            })
                        }, this, null, 0); this.on("cancel", function (a) { E(function (c) { if (c.isChanged()) return b.config.dialog_noConfirmCancel || confirm(b.lang.common.confirmCancel) || (a.data.hide = !1), !0 }) }, this, null, 0); this.parts.close.on("click", function (a) { !1 !== this.fire("cancel", { hide: !0 }).hide && this.hide(); a.data.preventDefault() }, this); this.changeFocus = m; var H = this._.element; b.focusManager.add(H, 1); this.on("show", function () {
                            H.on("keydown", v, this); if (CKEDITOR.env.gecko) H.on("keypress",
                                r, this)
                        }); this.on("hide", function () { H.removeListener("keydown", v); CKEDITOR.env.gecko && H.removeListener("keypress", r); E(function (a) { l.apply(a) }) }); this.on("iframeAdded", function (a) { (new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown", v, this, null, 0) }); this.on("show", function () {
                            g(); var a = 1 < B._.pageCount; b.config.dialog_startupFocusTab && a ? (B._.tabBarMode = !0, B._.tabs[B._.currentTabId][0].focus(), B._.currentFocusIndex = -1) : this._.hasFocus || (this._.currentFocusIndex = a ? -1 : this._.focusList.length -
                                1, t.onFocus ? (a = t.onFocus.call(this)) && a.focus() : m(1))
                        }, this, null, 4294967295); if (CKEDITOR.env.ie6Compat) this.on("load", function () { var a = this.getElement(), b = a.getFirst(); b.remove(); b.appendTo(a) }, this); n(this); u(this); (new CKEDITOR.dom.text(t.title, CKEDITOR.document)).appendTo(this.parts.title); for (q = 0; q < t.contents.length; q++)(y = t.contents[q]) && this.addPage(y); this.parts.tabs.on("click", function (b) {
                            var c = b.data.getTarget(); c.hasClass("cke_dialog_tab") && (c = c.$.id, this.selectPage(c.substring(4, c.lastIndexOf("_"))),
                                a(this), b.data.preventDefault())
                        }, this); q = []; y = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, { type: "hbox", className: "cke_dialog_footer_buttons", widths: [], children: t.buttons }, q).getChild(); this.parts.footer.setHtml(q.join("")); for (q = 0; q < y.length; q++)this._.buttons[y[q].id] = y[q]
            }; CKEDITOR.dialog.prototype = {
                destroy: function () { this.hide(); this._.element.remove() }, resize: function (a, b) {
                    if (!this._.contentSize || this._.contentSize.width != a || this._.contentSize.height != b) {
                        CKEDITOR.dialog.fire("resize",
                            { dialog: this, width: a, height: b }, this._.editor); this.fire("resize", { width: a, height: b }, this._.editor); this.parts.contents.setStyles({ width: a + "px", height: b + "px" }); if ("rtl" == this._.editor.lang.dir && this._.position) { var c = this.parts.dialog.getParent().getClientSize().width; this._.position.x = c - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10) } this._.contentSize = { width: a, height: b }
                    }
                }, getSize: function () {
                    var a = this._.element.getFirst(); return {
                        width: a.$.offsetWidth || 0, height: a.$.offsetHeight ||
                            0
                    }
                }, move: function (a, b, c) {
                    var e = this._.element.getFirst(), d = "rtl" == this._.editor.lang.dir; CKEDITOR.env.ie && e.setStyle("zoom", "100%"); var g = this.parts.dialog.getParent().getClientSize(), k = this.getSize(), f = this._.viewportRatio, h = Math.max(g.width - k.width, 0), g = Math.max(g.height - k.height, 0); this._.position && this._.position.x == a && this._.position.y == b ? (a = Math.floor(h * f.width), b = Math.floor(g * f.height)) : w(this, a, b); this._.position = { x: a, y: b }; d && (a = h - a); b = { top: (0 < b ? b : 0) + "px" }; b[d ? "right" : "left"] = (0 < a ? a : 0) + "px";
                    e.setStyles(b); c && (this._.moved = 1)
                }, getPosition: function () { return CKEDITOR.tools.extend({}, this._.position) }, show: function () {
                    var a = this._.element, b = this.definition, c = CKEDITOR.document.getBody(), e = this._.editor.config.baseFloatZIndex; a.getParent() && a.getParent().equals(c) ? a.setStyle("display", H ? "flex" : "block") : a.appendTo(c); this.resize(this._.contentSize && this._.contentSize.width || b.width || b.minWidth, this._.contentSize && this._.contentSize.height || b.height || b.minHeight); this.reset(); null === this._.currentTabId &&
                        this.selectPage(this.definition.contents[0].id); null === CKEDITOR.dialog._.currentZIndex && (CKEDITOR.dialog._.currentZIndex = e); this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex += 10); this.getElement().setStyle("z-index", CKEDITOR.dialog._.currentZIndex); null === CKEDITOR.dialog._.currentTop ? (CKEDITOR.dialog._.currentTop = this, this._.parentDialog = null, q(this._.editor)) : CKEDITOR.dialog._.currentTop !== this && (this._.parentDialog = CKEDITOR.dialog._.currentTop, c = this._.parentDialog.getElement().getFirst(),
                            c.$.style.zIndex -= Math.floor(e / 2), this._.parentDialog.getElement().setStyle("z-index", c.$.style.zIndex), CKEDITOR.dialog._.currentTop = this); a.on("keydown", A); a.on("keyup", v); this._.hasFocus = !1; for (var d in b.contents) if (b.contents[d]) {
                                var a = b.contents[d], e = this._.tabs[a.id], c = a.requiredContent, k = 0; if (e) {
                                    for (var f in this._.contents[a.id]) {
                                        var h = this._.contents[a.id][f]; "hbox" != h.type && "vbox" != h.type && h.getInputElement() && (h.requiredContent && !this._.editor.activeFilter.check(h.requiredContent) ? h.disable() :
                                            (h.enable(), k++))
                                    } !k || c && !this._.editor.activeFilter.check(c) ? e[0].addClass("cke_dialog_tab_disabled") : e[0].removeClass("cke_dialog_tab_disabled")
                                }
                            } CKEDITOR.tools.setTimeout(function () { this.layout(); g(this); this.parts.dialog.setStyle("visibility", ""); this.fireOnce("load", {}); CKEDITOR.ui.fire("ready", this); this.fire("show", {}); this._.editor.fire("dialogShow", this); this._.parentDialog || this._.editor.focusManager.lock(); this.foreach(function (a) { a.setInitValue && a.setInitValue() }) }, 100, this)
                }, layout: function () {
                    var a =
                        this.parts.dialog; if (this._.moved || !H) { var b = this.getSize(), c = CKEDITOR.document.getWindow().getViewPaneSize(), e; this._.moved && this._.position ? (e = this._.position.x, b = this._.position.y) : (e = (c.width - b.width) / 2, b = (c.height - b.height) / 2); CKEDITOR.env.ie6Compat || (a.setStyle("position", "absolute"), a.removeStyle("margin")); e = Math.floor(e); b = Math.floor(b); this.move(e, b) }
                }, foreach: function (a) { for (var b in this._.contents) for (var c in this._.contents[b]) a.call(this, this._.contents[b][c]); return this }, reset: function () {
                    var a =
                        function (a) { a.reset && a.reset(1) }; return function () { this.foreach(a); return this }
                }(), setupContent: function () { var a = arguments; this.foreach(function (b) { b.setup && b.setup.apply(b, a) }) }, commitContent: function () { var a = arguments; this.foreach(function (b) { CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur(); b.commit && b.commit.apply(b, a) }) }, hide: function () {
                    if (this.parts.dialog.isVisible()) {
                        this.fire("hide", {}); this._.editor.fire("dialogHide", this); this.selectPage(this._.tabIdList[0]);
                        var a = this._.element; a.setStyle("display", "none"); this.parts.dialog.setStyle("visibility", "hidden"); for (t(this); CKEDITOR.dialog._.currentTop != this;)CKEDITOR.dialog._.currentTop.hide(); if (this._.parentDialog) { var b = this._.parentDialog.getElement().getFirst(); this._.parentDialog.getElement().removeStyle("z-index"); b.setStyle("z-index", parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2)) } else r(this._.editor); if (CKEDITOR.dialog._.currentTop = this._.parentDialog) CKEDITOR.dialog._.currentZIndex -=
                            10; else { CKEDITOR.dialog._.currentZIndex = null; a.removeListener("keydown", A); a.removeListener("keyup", v); var c = this._.editor; c.focus(); setTimeout(function () { c.focusManager.unlock(); CKEDITOR.env.iOS && c.window.focus() }, 0) } delete this._.parentDialog; this.foreach(function (a) { a.resetInitValue && a.resetInitValue() }); this.setState(CKEDITOR.DIALOG_STATE_IDLE)
                    }
                }, addPage: function (a) {
                    if (!a.requiredContent || this._.editor.filter.check(a.requiredContent)) {
                        for (var b = [], c = a.label ? ' title\x3d"' + CKEDITOR.tools.htmlEncode(a.label) +
                            '"' : "", e = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, { type: "vbox", className: "cke_dialog_page_contents", children: a.elements, expand: !!a.expand, padding: a.padding, style: a.style || "width: 100%;" }, b), d = this._.contents[a.id] = {}, g = e.getChild(), k = 0; e = g.shift();)e.notAllowed || "hbox" == e.type || "vbox" == e.type || k++, d[e.id] = e, "function" == typeof e.getChild && g.push.apply(g, e.getChild()); k || (a.hidden = !0); b = CKEDITOR.dom.element.createFromHtml(b.join("")); b.setAttribute("role", "tabpanel"); b.setStyle("min-height",
                                "100%"); e = CKEDITOR.env; d = "cke_" + a.id + "_" + CKEDITOR.tools.getNextNumber(); c = CKEDITOR.dom.element.createFromHtml(['\x3ca class\x3d"cke_dialog_tab"', 0 < this._.pageCount ? " cke_last" : "cke_first", c, a.hidden ? ' style\x3d"display:none"' : "", ' id\x3d"', d, '"', e.gecko && !e.hc ? "" : ' href\x3d"javascript:void(0)"', ' tabIndex\x3d"-1" hidefocus\x3d"true" role\x3d"tab"\x3e', a.label, "\x3c/a\x3e"].join("")); b.setAttribute("aria-labelledby", d); this._.tabs[a.id] = [c, b]; this._.tabIdList.push(a.id); !a.hidden && this._.pageCount++;
                        this._.lastTab = c; this.updateStyle(); b.setAttribute("name", a.id); b.appendTo(this.parts.contents); c.unselectable(); this.parts.tabs.append(c); a.accessKey && (D(this, this, "CTRL+" + a.accessKey, z, y), this._.accessKeyMap["CTRL+" + a.accessKey] = a.id)
                    }
                }, selectPage: function (a) {
                    if (this._.currentTabId != a && !this._.tabs[a][0].hasClass("cke_dialog_tab_disabled") && !1 !== this.fire("selectPage", { page: a, currentPage: this._.currentTabId })) {
                        for (var c in this._.tabs) {
                            var e = this._.tabs[c][0], d = this._.tabs[c][1]; c != a && (e.removeClass("cke_dialog_tab_selected"),
                                e.removeAttribute("aria-selected"), d.hide()); d.setAttribute("aria-hidden", c != a)
                        } var g = this._.tabs[a]; g[0].addClass("cke_dialog_tab_selected"); g[0].setAttribute("aria-selected", !0); CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat ? (b(g[1]), g[1].show(), setTimeout(function () { b(g[1], 1) }, 0)) : g[1].show(); this._.currentTabId = a; this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, a)
                    }
                }, updateStyle: function () { this.parts.dialog[(1 === this._.pageCount ? "add" : "remove") + "Class"]("cke_single_page") }, hidePage: function (a) {
                    var b =
                        this._.tabs[a] && this._.tabs[a][0]; b && 1 != this._.pageCount && b.isVisible() && (a == this._.currentTabId && this.selectPage(h.call(this)), b.hide(), this._.pageCount--, this.updateStyle())
                }, showPage: function (a) { if (a = this._.tabs[a] && this._.tabs[a][0]) a.show(), this._.pageCount++, this.updateStyle() }, getElement: function () { return this._.element }, getName: function () { return this._.name }, getContentElement: function (a, b) { var c = this._.contents[a]; return c && c[b] }, getValueOf: function (a, b) { return this.getContentElement(a, b).getValue() },
                setValueOf: function (a, b, c) { return this.getContentElement(a, b).setValue(c) }, getButton: function (a) { return this._.buttons[a] }, click: function (a) { return this._.buttons[a].click() }, disableButton: function (a) { return this._.buttons[a].disable() }, enableButton: function (a) { return this._.buttons[a].enable() }, getPageCount: function () { return this._.pageCount }, getParentEditor: function () { return this._.editor }, getSelectedElement: function () { return this.getParentEditor().getSelection().getSelectedElement() }, addFocusable: function (a,
                    b) { if ("undefined" == typeof b) b = this._.focusList.length, this._.focusList.push(new m(this, a, b)); else { this._.focusList.splice(b, 0, new m(this, a, b)); for (var c = b + 1; c < this._.focusList.length; c++)this._.focusList[c].focusIndex++ } }, setState: function (a) {
                        if (this.state != a) {
                            this.state = a; if (a == CKEDITOR.DIALOG_STATE_BUSY) {
                                if (!this.parts.spinner) {
                                    var b = this.getParentEditor().lang.dir, c = { attributes: { "class": "cke_dialog_spinner" }, styles: { "float": "rtl" == b ? "right" : "left" } }; c.styles["margin-" + ("rtl" == b ? "left" : "right")] =
                                        "8px"; this.parts.spinner = CKEDITOR.document.createElement("div", c); this.parts.spinner.setHtml("\x26#8987;"); this.parts.spinner.appendTo(this.parts.title, 1)
                                } this.parts.spinner.show(); this.getButton("ok") && this.getButton("ok").disable()
                            } else a == CKEDITOR.DIALOG_STATE_IDLE && (this.parts.spinner && this.parts.spinner.hide(), this.getButton("ok") && this.getButton("ok").enable()); this.fire("state", a)
                        }
                    }, getModel: function (a) { return this._.model ? this._.model : this.definition.getModel ? this.definition.getModel(a) : null },
                setModel: function (a) { this._.model = a }, getMode: function (a) { if (this.definition.getMode) return this.definition.getMode(a); a = this.getModel(a); return !a || a instanceof CKEDITOR.dom.element && !a.getParent() ? CKEDITOR.dialog.CREATION_MODE : CKEDITOR.dialog.EDITING_MODE }
            }; CKEDITOR.tools.extend(CKEDITOR.dialog, {
                CREATION_MODE: 0, EDITING_MODE: 1, add: function (a, b) { this._.dialogDefinitions[a] && "function" != typeof b || (this._.dialogDefinitions[a] = b) }, exists: function (a) { return !!this._.dialogDefinitions[a] }, getCurrent: function () { return CKEDITOR.dialog._.currentTop },
                isTabEnabled: function (a, b, c) { a = a.config.removeDialogTabs; return !(a && a.match(new RegExp("(?:^|;)" + b + ":" + c + "(?:$|;)", "i"))) }, okButton: function () { var a = function (a, b) { b = b || {}; return CKEDITOR.tools.extend({ id: "ok", type: "button", label: a.lang.common.ok, "class": "cke_dialog_ui_button_ok", onClick: function (a) { a = a.data.dialog; !1 !== a.fire("ok", { hide: !0 }).hide && a.hide() } }, b, !0) }; a.type = "button"; a.override = function (b) { return CKEDITOR.tools.extend(function (c) { return a(c, b) }, { type: "button" }, !0) }; return a }(), cancelButton: function () {
                    var a =
                        function (a, b) { b = b || {}; return CKEDITOR.tools.extend({ id: "cancel", type: "button", label: a.lang.common.cancel, "class": "cke_dialog_ui_button_cancel", onClick: function (a) { a = a.data.dialog; !1 !== a.fire("cancel", { hide: !0 }).hide && a.hide() } }, b, !0) }; a.type = "button"; a.override = function (b) { return CKEDITOR.tools.extend(function (c) { return a(c, b) }, { type: "button" }, !0) }; return a
                }(), addUIElement: function (a, b) { this._.uiElementBuilders[a] = b }
            }); CKEDITOR.dialog._ = { uiElementBuilders: {}, dialogDefinitions: {}, currentTop: null, currentZIndex: null };
            CKEDITOR.event.implementOn(CKEDITOR.dialog); CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype); C = { resizable: CKEDITOR.DIALOG_RESIZE_BOTH, minWidth: 600, minHeight: 400, buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton] }; var K = function (a, b, c) { for (var e = 0, d; d = a[e]; e++)if (d.id == b || c && d[c] && (d = K(d[c], b, c))) return d; return null }, x = function (a, b, c, e, d) { if (c) { for (var g = 0, k; k = a[g]; g++) { if (k.id == c) return a.splice(g, 0, b), b; if (e && k[e] && (k = x(k[e], b, c, e, !0))) return k } if (d) return null } a.push(b); return b },
                I = function (a, b, c) { for (var e = 0, d; d = a[e]; e++) { if (d.id == b) return a.splice(e, 1); if (c && d[c] && (d = I(d[c], b, c))) return d } return null }; e.prototype = { getContents: function (a) { return K(this.contents, a) }, getButton: function (a) { return K(this.buttons, a) }, addContents: function (a, b) { return x(this.contents, a, b) }, addButton: function (a, b) { return x(this.buttons, a, b) }, removeContents: function (a) { I(this.contents, a) }, removeButton: function (a) { I(this.buttons, a) } }; c.prototype = {
                    get: function (a) { return K(this.elements, a, "children") },
                    add: function (a, b) { return x(this.elements, a, b, "children") }, remove: function (a) { I(this.elements, a, "children") }
                }; var F = {}, P = {}; (function () {
                    CKEDITOR.ui.dialog = {
                        uiElement: function (a, b, c, e, d, g, k) {
                            if (!(4 > arguments.length)) {
                                var f = (e.call ? e(b) : e) || "div", h = ["\x3c", f, " "], m = (d && d.call ? d(b) : d) || {}, l = (g && g.call ? g(b) : g) || {}, n = (k && k.call ? k.call(this, a, b) : k) || "", u = this.domId = l.id || CKEDITOR.tools.getNextId() + "_uiElement"; b.requiredContent && !a.getParentEditor().filter.check(b.requiredContent) && (m.display = "none", this.notAllowed =
                                    !0); l.id = u; var v = {}; b.type && (v["cke_dialog_ui_" + b.type] = 1); b.className && (v[b.className] = 1); b.disabled && (v.cke_disabled = 1); for (var r = l["class"] && l["class"].split ? l["class"].split(" ") : [], u = 0; u < r.length; u++)r[u] && (v[r[u]] = 1); r = []; for (u in v) r.push(u); l["class"] = r.join(" "); b.title && (l.title = b.title); v = (b.style || "").split(";"); b.align && (r = b.align, m["margin-left"] = "left" == r ? 0 : "auto", m["margin-right"] = "right" == r ? 0 : "auto"); for (u in m) v.push(u + ":" + m[u]); b.hidden && v.push("display:none"); for (u = v.length - 1; 0 <=
                                        u; u--)"" === v[u] && v.splice(u, 1); 0 < v.length && (l.style = (l.style ? l.style + "; " : "") + v.join("; ")); for (u in l) h.push(u + '\x3d"' + CKEDITOR.tools.htmlEncode(l[u]) + '" '); h.push("\x3e", n, "\x3c/", f, "\x3e"); c.push(h.join("")); (this._ || (this._ = {})).dialog = a; "boolean" == typeof b.isChanged && (this.isChanged = function () { return b.isChanged }); "function" == typeof b.isChanged && (this.isChanged = b.isChanged); "function" == typeof b.setValue && (this.setValue = CKEDITOR.tools.override(this.setValue, function (a) {
                                            return function (c) {
                                                a.call(this,
                                                    b.setValue.call(this, c))
                                            }
                                        })); "function" == typeof b.getValue && (this.getValue = CKEDITOR.tools.override(this.getValue, function (a) { return function () { return b.getValue.call(this, a.call(this)) } })); CKEDITOR.event.implementOn(this); this.registerEvents(b); this.accessKeyUp && this.accessKeyDown && b.accessKey && D(this, a, "CTRL+" + b.accessKey); var t = this; a.on("load", function () {
                                            var b = t.getInputElement(); if (b) {
                                                var c = t.type in { checkbox: 1, ratio: 1 } && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? "cke_dialog_ui_focused" : ""; b.on("focus",
                                                    function () { a._.tabBarMode = !1; a._.hasFocus = !0; t.fire("focus"); c && this.addClass(c) }); b.on("blur", function () { t.fire("blur"); c && this.removeClass(c) })
                                            }
                                        }); CKEDITOR.tools.extend(this, b); this.keyboardFocusable && (this.tabIndex = b.tabIndex || 0, this.focusIndex = a._.focusList.push(this) - 1, this.on("focus", function () { a._.currentFocusIndex = t.focusIndex }))
                            }
                        }, hbox: function (a, b, c, e, d) {
                            if (!(4 > arguments.length)) {
                                this._ || (this._ = {}); var g = this._.children = b, k = d && d.widths || null, f = d && d.height || null, h, m = { role: "presentation" };
                                d && d.align && (m.align = d.align); CKEDITOR.ui.dialog.uiElement.call(this, a, d || { type: "hbox" }, e, "table", {}, m, function () {
                                    var a = ['\x3ctbody\x3e\x3ctr class\x3d"cke_dialog_ui_hbox"\x3e']; for (h = 0; h < c.length; h++) {
                                        var b = "cke_dialog_ui_hbox_child", e = []; 0 === h && (b = "cke_dialog_ui_hbox_first"); h == c.length - 1 && (b = "cke_dialog_ui_hbox_last"); a.push('\x3ctd class\x3d"', b, '" role\x3d"presentation" '); k ? k[h] && e.push("width:" + B(k[h])) : e.push("width:" + Math.floor(100 / c.length) + "%"); f && e.push("height:" + B(f)); d && void 0 !== d.padding &&
                                            e.push("padding:" + B(d.padding)); CKEDITOR.env.ie && CKEDITOR.env.quirks && g[h].align && e.push("text-align:" + g[h].align); 0 < e.length && a.push('style\x3d"' + e.join("; ") + '" '); a.push("\x3e", c[h], "\x3c/td\x3e")
                                    } a.push("\x3c/tr\x3e\x3c/tbody\x3e"); return a.join("")
                                })
                            }
                        }, vbox: function (a, b, c, e, d) {
                            if (!(3 > arguments.length)) {
                                this._ || (this._ = {}); var g = this._.children = b, k = d && d.width || null, f = d && d.heights || null; CKEDITOR.ui.dialog.uiElement.call(this, a, d || { type: "vbox" }, e, "div", null, { role: "presentation" }, function () {
                                    var b =
                                        ['\x3ctable role\x3d"presentation" cellspacing\x3d"0" border\x3d"0" ']; b.push('style\x3d"'); d && d.expand && b.push("height:100%;"); b.push("width:" + B(k || "100%"), ";"); CKEDITOR.env.webkit && b.push("float:none;"); b.push('"'); b.push('align\x3d"', CKEDITOR.tools.htmlEncode(d && d.align || ("ltr" == a.getParentEditor().lang.dir ? "left" : "right")), '" '); b.push("\x3e\x3ctbody\x3e"); for (var e = 0; e < c.length; e++) {
                                            var h = []; b.push('\x3ctr\x3e\x3ctd role\x3d"presentation" '); k && h.push("width:" + B(k || "100%")); f ? h.push("height:" +
                                                B(f[e])) : d && d.expand && h.push("height:" + Math.floor(100 / c.length) + "%"); d && void 0 !== d.padding && h.push("padding:" + B(d.padding)); CKEDITOR.env.ie && CKEDITOR.env.quirks && g[e].align && h.push("text-align:" + g[e].align); 0 < h.length && b.push('style\x3d"', h.join("; "), '" '); b.push(' class\x3d"cke_dialog_ui_vbox_child"\x3e', c[e], "\x3c/td\x3e\x3c/tr\x3e")
                                        } b.push("\x3c/tbody\x3e\x3c/table\x3e"); return b.join("")
                                })
                            }
                        }
                    }
                })(); CKEDITOR.ui.dialog.uiElement.prototype = {
                    getElement: function () { return CKEDITOR.document.getById(this.domId) },
                    getInputElement: function () { return this.getElement() }, getDialog: function () { return this._.dialog }, setValue: function (a, b) { this.getInputElement().setValue(a); !b && this.fire("change", { value: a }); return this }, getValue: function () { return this.getInputElement().getValue() }, isChanged: function () { return !1 }, selectParentTab: function () {
                        for (var a = this.getInputElement(); (a = a.getParent()) && -1 == a.$.className.search("cke_dialog_page_contents");); if (!a) return this; a = a.getAttribute("name"); this._.dialog._.currentTabId !=
                            a && this._.dialog.selectPage(a); return this
                    }, focus: function () { this.selectParentTab().getInputElement().focus(); return this }, registerEvents: function (a) { var b = /^on([A-Z]\w+)/, c, e = function (a, b, c, e) { b.on("load", function () { a.getInputElement().on(c, e, a) }) }, d; for (d in a) if (c = d.match(b)) this.eventProcessors[d] ? this.eventProcessors[d].call(this, this._.dialog, a[d]) : e(this, this._.dialog, c[1].toLowerCase(), a[d]); return this }, eventProcessors: {
                        onLoad: function (a, b) { a.on("load", b, this) }, onShow: function (a, b) {
                            a.on("show",
                                b, this)
                        }, onHide: function (a, b) { a.on("hide", b, this) }
                    }, accessKeyDown: function () { this.focus() }, accessKeyUp: function () { }, disable: function () { var a = this.getElement(); this.getInputElement().setAttribute("disabled", "true"); a.addClass("cke_disabled") }, enable: function () { var a = this.getElement(); this.getInputElement().removeAttribute("disabled"); a.removeClass("cke_disabled") }, isEnabled: function () { return !this.getElement().hasClass("cke_disabled") }, isVisible: function () { return this.getInputElement().isVisible() },
                    isFocusable: function () { return this.isEnabled() && this.isVisible() ? !0 : !1 }
                }; CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, { getChild: function (a) { if (1 > arguments.length) return this._.children.concat(); a.splice || (a = [a]); return 2 > a.length ? this._.children[a[0]] : this._.children[a[0]] && this._.children[a[0]].getChild ? this._.children[a[0]].getChild(a.slice(1, a.length)) : null } }, !0); CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox; (function () {
                    var a = {
                        build: function (a,
                            b, c) { for (var e = b.children, d, g = [], k = [], f = 0; f < e.length && (d = e[f]); f++) { var h = []; g.push(h); k.push(CKEDITOR.dialog._.uiElementBuilders[d.type].build(a, d, h)) } return new CKEDITOR.ui.dialog[b.type](a, k, g, c, b) }
                    }; CKEDITOR.dialog.addUIElement("hbox", a); CKEDITOR.dialog.addUIElement("vbox", a)
                })(); CKEDITOR.dialogCommand = function (a, b) { this.dialogName = a; CKEDITOR.tools.extend(this, b, !0) }; CKEDITOR.dialogCommand.prototype = {
                    exec: function (a) { var b = this.tabId; a.openDialog(this.dialogName, function (a) { b && a.selectPage(b) }) },
                    canUndo: !1, editorFocus: 1
                }; (function () {
                    var a = /^([a]|[^a])+$/, b = /^\d*$/, c = /^\d*(?:\.\d+)?$/, e = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/, d = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i, g = /^(--|-?([a-zA-Z_]|\\))(\\|[a-zA-Z0-9-_])*\s*?:\s*?[^:;]+$/; CKEDITOR.VALIDATE_OR = 1; CKEDITOR.VALIDATE_AND = 2; CKEDITOR.dialog.validate = {
                        functions: function () {
                            var a = arguments; return function () {
                                var b = this && this.getValue ? this.getValue() : a[0], c, e = CKEDITOR.VALIDATE_AND, d = [], g; for (g = 0; g < a.length; g++)if ("function" == typeof a[g]) d.push(a[g]);
                                else break; g < a.length && "string" == typeof a[g] && (c = a[g], g++); g < a.length && "number" == typeof a[g] && (e = a[g]); var k = e == CKEDITOR.VALIDATE_AND ? !0 : !1; for (g = 0; g < d.length; g++)k = e == CKEDITOR.VALIDATE_AND ? k && d[g](b) : k || d[g](b); return k ? !0 : c
                            }
                        }, regex: function (a, b) { return function (c) { c = this && this.getValue ? this.getValue() : c; return a.test(c) ? !0 : b } }, notEmpty: function (b) { return this.regex(a, b) }, integer: function (a) { return this.regex(b, a) }, number: function (a) { return this.regex(c, a) }, cssLength: function (a) {
                            return this.functions(function (a) { return d.test(CKEDITOR.tools.trim(a)) },
                                a)
                        }, htmlLength: function (a) { return this.functions(function (a) { return e.test(CKEDITOR.tools.trim(a)) }, a) }, inlineStyle: function (a) { return this.functions(function (a) { a = CKEDITOR.tools.trim(a).split(";"); "" === a[a.length - 1] && a.pop(); return CKEDITOR.tools.array.every(a, function (a) { return g.test(CKEDITOR.tools.trim(a)) }) }, a) }, equals: function (a, b) { return this.functions(function (b) { return b == a }, b) }, notEqual: function (a, b) { return this.functions(function (b) { return b != a }, b) }
                    }; CKEDITOR.on("instanceDestroyed", function (a) {
                        if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) {
                            for (var b; b =
                                CKEDITOR.dialog._.currentTop;)b.hide(); for (var c in F) F[c].remove(); F = {}
                        } a = a.editor._.storedDialogs; for (var e in a) a[e].destroy()
                    })
                })(); CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                    openDialog: function (a, b, c) {
                        var e = null, d = CKEDITOR.dialog._.dialogDefinitions[a]; null === CKEDITOR.dialog._.currentTop && q(this); if ("function" == typeof d) d = this._.storedDialogs || (this._.storedDialogs = {}), e = d[a] || (d[a] = new CKEDITOR.dialog(this, a)), e.setModel(c), b && b.call(e, e), e.show(); else {
                            if ("failed" == d) throw r(this), Error('[CKEDITOR.dialog.openDialog] Dialog "' +
                                a + '" failed when loading definition.'); "string" == typeof d && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(d), function () { "function" != typeof CKEDITOR.dialog._.dialogDefinitions[a] && (CKEDITOR.dialog._.dialogDefinitions[a] = "failed"); this.openDialog(a, b, c) }, this, 0, 1)
                        } CKEDITOR.skin.loadPart("dialog"); if (e) e.once("hide", function () { e.setModel(null) }, null, null, 999); return e
                    }
                }); CKEDITOR.plugins.add("dialog", {
                    requires: "dialogui", init: function (a) {
                        G || (CKEDITOR.document.appendStyleSheet(this.path + "styles/dialog.css"),
                            G = !0); a.on("doubleclick", function (b) { b.data.dialog && a.openDialog(b.data.dialog) }, null, null, 999)
                    }
                })
        })(); (function () {
            CKEDITOR.plugins.add("a11yhelp", {
                requires: "dialog", availableLangs: {
                    af: 1, ar: 1, az: 1, bg: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, "de-ch": 1, el: 1, en: 1, "en-au": 1, "en-gb": 1, eo: 1, es: 1, "es-mx": 1, et: 1, eu: 1, fa: 1, fi: 1, fo: 1, fr: 1, "fr-ca": 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, id: 1, it: 1, ja: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, mk: 1, mn: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, pt: 1, "pt-br": 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, sr: 1, "sr-latn": 1, sv: 1, th: 1,
                    tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, zh: 1, "zh-cn": 1
                }, init: function (a) {
                    var h = this; a.addCommand("a11yHelp", { exec: function () { var f = a.langCode, f = h.availableLangs[f] ? f : h.availableLangs[f.replace(/-.*/, "")] ? f.replace(/-.*/, "") : "en"; CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(h.path + "dialogs/lang/" + f + ".js"), function () { a.lang.a11yhelp = h.langEntries[f]; a.openDialog("a11yHelp") }) }, modes: { wysiwyg: 1, source: 1 }, readOnly: 1, canUndo: !1 }); a.setKeystroke(CKEDITOR.ALT + 48, "a11yHelp"); CKEDITOR.dialog.add("a11yHelp", this.path + "dialogs/a11yhelp.js");
                    a.on("ariaEditorHelpLabel", function (f) { f.data.label = a.lang.common.editorHelp })
                }
            })
        })(); CKEDITOR.plugins.add("about", { requires: "dialog", init: function (a) { var h = a.addCommand("about", new CKEDITOR.dialogCommand("about")); h.modes = { wysiwyg: 1, source: 1 }; h.canUndo = !1; h.readOnly = 1; a.ui.addButton && a.ui.addButton("About", { label: a.lang.about.dlgTitle, command: "about", toolbar: "about" }); CKEDITOR.dialog.add("about", this.path + "dialogs/about.js") } }); CKEDITOR.plugins.add("basicstyles", {
            init: function (a) {
                var h = 0, f = function (d,
                    f, g, e) { if (e) { e = new CKEDITOR.style(e); var c = b[g]; c.unshift(e); a.attachStyleStateChange(e, function (b) { !a.readOnly && a.getCommand(g).setState(b) }); a.addCommand(g, new CKEDITOR.styleCommand(e, { contentForms: c })); a.ui.addButton && a.ui.addButton(d, { label: f, command: g, toolbar: "basicstyles," + (h += 10) }) } }, b = {
                        bold: ["strong", "b", ["span", function (a) { a = a.styles["font-weight"]; return "bold" == a || 700 <= +a }]], italic: ["em", "i", ["span", function (a) { return "italic" == a.styles["font-style"] }]], underline: ["u", ["span", function (a) {
                            return "underline" ==
                                a.styles["text-decoration"]
                        }]], strike: ["s", "strike", ["span", function (a) { return "line-through" == a.styles["text-decoration"] }]], subscript: ["sub"], superscript: ["sup"]
                    }, d = a.config, l = a.lang.basicstyles; f("Bold", l.bold, "bold", d.coreStyles_bold); f("Italic", l.italic, "italic", d.coreStyles_italic); f("Underline", l.underline, "underline", d.coreStyles_underline); f("Strike", l.strike, "strike", d.coreStyles_strike); f("Subscript", l.subscript, "subscript", d.coreStyles_subscript); f("Superscript", l.superscript, "superscript",
                        d.coreStyles_superscript); a.setKeystroke([[CKEDITOR.CTRL + 66, "bold"], [CKEDITOR.CTRL + 73, "italic"], [CKEDITOR.CTRL + 85, "underline"]])
            }
        }); CKEDITOR.config.coreStyles_bold = { element: "strong", overrides: "b" }; CKEDITOR.config.coreStyles_italic = { element: "em", overrides: "i" }; CKEDITOR.config.coreStyles_underline = { element: "u" }; CKEDITOR.config.coreStyles_strike = { element: "s", overrides: "strike" }; CKEDITOR.config.coreStyles_subscript = { element: "sub" }; CKEDITOR.config.coreStyles_superscript = { element: "sup" }; (function () {
            function a(a,
                b, e, d) {
                    if (!a.isReadOnly() && !a.equals(e.editable())) {
                        CKEDITOR.dom.element.setMarker(d, a, "bidi_processed", 1); d = a; for (var g = e.editable(); (d = d.getParent()) && !d.equals(g);)if (d.getCustomData("bidi_processed")) { a.removeStyle("direction"); a.removeAttribute("dir"); return } d = e.config.useComputedState; (d ? a.getComputedStyle("direction") : a.getStyle("direction") || a.hasAttribute("dir")) != b && (a.removeStyle("direction"), d ? (a.removeAttribute("dir"), b != a.getComputedStyle("direction") && a.setAttribute("dir", b)) : a.setAttribute("dir",
                            b), e.forceNextSelectionCheck())
                    }
            } function h(a, b, e) { var d = a.getCommonAncestor(!1, !0); a = a.clone(); a.enlarge(e == CKEDITOR.ENTER_BR ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS); if (a.checkBoundaryOfElement(d, CKEDITOR.START) && a.checkBoundaryOfElement(d, CKEDITOR.END)) { for (var g; d && d.type == CKEDITOR.NODE_ELEMENT && (g = d.getParent()) && 1 == g.getChildCount() && !(d.getName() in b);)d = g; return d.type == CKEDITOR.NODE_ELEMENT && d.getName() in b && d } } function f(b) {
                return {
                    context: "p", allowedContent: {
                        "h1 h2 h3 h4 h5 h6 table ul ol blockquote div tr p div li td": {
                            propertiesOnly: !0,
                            attributes: "dir"
                        }
                    }, requiredContent: "p[dir]", refresh: function (a, b) {
                        var c = a.config.useComputedState, e; if (!c) { e = b.lastElement; for (var d = a.editable(); e && !(e.getName() in k || e.equals(d));) { var g = e.getParent(); if (!g) break; e = g } } e = e || b.block || b.blockLimit; e.equals(a.editable()) && (d = a.getSelection().getRanges()[0].getEnclosedNode()) && d.type == CKEDITOR.NODE_ELEMENT && (e = d); e && (c = c ? e.getComputedStyle("direction") : e.getStyle("direction") || e.getAttribute("dir"), a.getCommand("bidirtl").setState("rtl" == c ? CKEDITOR.TRISTATE_ON :
                            CKEDITOR.TRISTATE_OFF), a.getCommand("bidiltr").setState("ltr" == c ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)); c = (b.block || b.blockLimit || a.editable()).getDirection(1); c != (a._.selDir || a.lang.dir) && (a._.selDir = c, a.fire("contentDirChanged", c))
                    }, exec: function (e) {
                        var g = e.getSelection(), k = e.config.enterMode, f = g.getRanges(); if (f && f.length) {
                            for (var m = {}, r = g.createBookmarks(), f = f.createIterator(), A, v = 0; A = f.getNextRange(1);) {
                                var D = A.getEnclosedNode(); D && (!D || D.type == CKEDITOR.NODE_ELEMENT && D.getName() in l) ||
                                    (D = h(A, d, k)); D && a(D, b, e, m); var t = new CKEDITOR.dom.walker(A), y = r[v].startNode, z = r[v++].endNode; t.evaluator = function (a) { var b = k == CKEDITOR.ENTER_P ? "p" : "div", c; if (c = (a ? a.type == CKEDITOR.NODE_ELEMENT : !1) && a.getName() in d) { if (b = a.is(b)) b = (b = a.getParent()) ? b.type == CKEDITOR.NODE_ELEMENT : !1; c = !(b && a.getParent().is("blockquote")) } return !!(c && a.getPosition(y) & CKEDITOR.POSITION_FOLLOWING && (a.getPosition(z) & CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_CONTAINS) == CKEDITOR.POSITION_PRECEDING) }; for (; D = t.next();)a(D,
                                        b, e, m); A = A.createIterator(); for (A.enlargeBr = k != CKEDITOR.ENTER_BR; D = A.getNextParagraph(k == CKEDITOR.ENTER_P ? "p" : "div");)a(D, b, e, m)
                            } CKEDITOR.dom.element.clearAllMarkers(m); e.forceNextSelectionCheck(); g.selectBookmarks(r); e.focus()
                        }
                    }
                }
            } function b(a) {
                var b = a == m.setAttribute, e = a == m.removeAttribute, d = /\bdirection\s*:\s*(.*?)\s*(:?$|;)/; return function (g, k) {
                    if (!this.isReadOnly()) {
                        var f; if (f = g == (b || e ? "dir" : "direction") || "style" == g && (e || d.test(k))) {
                            a: {
                                f = this; for (var h = f.getDocument().getBody().getParent(); f;) {
                                    if (f.equals(h)) {
                                        f =
                                        !1; break a
                                    } f = f.getParent()
                                } f = !0
                            } f = !f
                        } if (f && (f = this.getDirection(1), h = a.apply(this, arguments), f != this.getDirection(1))) return this.getDocument().fire("dirChanged", this), h
                    } return a.apply(this, arguments)
                }
            } var d = { table: 1, ul: 1, ol: 1, blockquote: 1, div: 1 }, l = {}, k = {}; CKEDITOR.tools.extend(l, d, { tr: 1, p: 1, div: 1, li: 1 }); CKEDITOR.tools.extend(k, l, { td: 1 }); CKEDITOR.plugins.add("bidi", {
                init: function (a) {
                    function b(e, d, g, k, f) {
                        a.addCommand(g, new CKEDITOR.command(a, k)); a.ui.addButton && a.ui.addButton(e, {
                            label: d, command: g,
                            toolbar: "bidi," + f
                        })
                    } if (!a.blockless) { var e = a.lang.bidi; b("BidiLtr", e.ltr, "bidiltr", f("ltr"), 10); b("BidiRtl", e.rtl, "bidirtl", f("rtl"), 20); a.on("contentDom", function () { a.document.on("dirChanged", function (b) { a.fire("dirChanged", { node: b.data, dir: b.data.getDirection(1) }) }) }); a.on("contentDirChanged", function (b) { b = (a.lang.dir != b.data ? "add" : "remove") + "Class"; var e = a.ui.space(a.config.toolbarLocation); if (e) e[b]("cke_mixed_dir_content") }) }
                }
            }); for (var m = CKEDITOR.dom.element.prototype, g = ["setStyle", "removeStyle",
                "setAttribute", "removeAttribute"], e = 0; e < g.length; e++)m[g[e]] = CKEDITOR.tools.override(m[g[e]], b)
        })(); (function () {
            var a = {
                exec: function (a) {
                    var f = a.getCommand("blockquote").state, b = a.getSelection(), d = b && b.getRanges()[0]; if (d) {
                        var l = b.createBookmarks(); if (CKEDITOR.env.ie) {
                            var k = l[0].startNode, m = l[0].endNode, g; if (k && "blockquote" == k.getParent().getName()) for (g = k; g = g.getNext();)if (g.type == CKEDITOR.NODE_ELEMENT && g.isBlockBoundary()) { k.move(g, !0); break } if (m && "blockquote" == m.getParent().getName()) for (g = m; g =
                                g.getPrevious();)if (g.type == CKEDITOR.NODE_ELEMENT && g.isBlockBoundary()) { m.move(g); break }
                        } var e = d.createIterator(); e.enlargeBr = a.config.enterMode != CKEDITOR.ENTER_BR; if (f == CKEDITOR.TRISTATE_OFF) {
                            for (k = []; f = e.getNextParagraph();)k.push(f); 1 > k.length && (f = a.document.createElement(a.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), m = l.shift(), d.insertNode(f), f.append(new CKEDITOR.dom.text("﻿", a.document)), d.moveToBookmark(m), d.selectNodeContents(f), d.collapse(!0), m = d.createBookmark(), k.push(f), l.unshift(m));
                            g = k[0].getParent(); d = []; for (m = 0; m < k.length; m++)f = k[m], g = g.getCommonAncestor(f.getParent()); for (f = { table: 1, tbody: 1, tr: 1, ol: 1, ul: 1 }; f[g.getName()];)g = g.getParent(); for (m = null; 0 < k.length;) { for (f = k.shift(); !f.getParent().equals(g);)f = f.getParent(); f.equals(m) || d.push(f); m = f } for (; 0 < d.length;)if (f = d.shift(), "blockquote" == f.getName()) { for (m = new CKEDITOR.dom.documentFragment(a.document); f.getFirst();)m.append(f.getFirst().remove()), k.push(m.getLast()); m.replace(f) } else k.push(f); d = a.document.createElement("blockquote");
                            for (d.insertBefore(k[0]); 0 < k.length;)f = k.shift(), d.append(f)
                        } else if (f == CKEDITOR.TRISTATE_ON) {
                            m = []; for (g = {}; f = e.getNextParagraph();) { for (k = d = null; f.getParent();) { if ("blockquote" == f.getParent().getName()) { d = f.getParent(); k = f; break } f = f.getParent() } d && k && !k.getCustomData("blockquote_moveout") && (m.push(k), CKEDITOR.dom.element.setMarker(g, k, "blockquote_moveout", !0)) } CKEDITOR.dom.element.clearAllMarkers(g); f = []; k = []; for (g = {}; 0 < m.length;)e = m.shift(), d = e.getParent(), e.getPrevious() ? e.getNext() ? (e.breakParent(e.getParent()),
                                k.push(e.getNext())) : e.remove().insertAfter(d) : e.remove().insertBefore(d), d.getCustomData("blockquote_processed") || (k.push(d), CKEDITOR.dom.element.setMarker(g, d, "blockquote_processed", !0)), f.push(e); CKEDITOR.dom.element.clearAllMarkers(g); for (m = k.length - 1; 0 <= m; m--) { d = k[m]; a: { g = d; for (var e = 0, c = g.getChildCount(), n = void 0; e < c && (n = g.getChild(e)); e++)if (n.type == CKEDITOR.NODE_ELEMENT && n.isBlockBoundary()) { g = !1; break a } g = !0 } g && d.remove() } if (a.config.enterMode == CKEDITOR.ENTER_BR) for (d = !0; f.length;)if (e = f.shift(),
                                    "div" == e.getName()) { m = new CKEDITOR.dom.documentFragment(a.document); !d || !e.getPrevious() || e.getPrevious().type == CKEDITOR.NODE_ELEMENT && e.getPrevious().isBlockBoundary() || m.append(a.document.createElement("br")); for (d = e.getNext() && !(e.getNext().type == CKEDITOR.NODE_ELEMENT && e.getNext().isBlockBoundary()); e.getFirst();)e.getFirst().remove().appendTo(m); d && m.append(a.document.createElement("br")); m.replace(e); d = !1 }
                        } b.selectBookmarks(l); a.focus()
                    }
                }, refresh: function (a, f) {
                    this.setState(a.elementPath(f.block ||
                        f.blockLimit).contains("blockquote", 1) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
                }, context: "blockquote", allowedContent: "blockquote", requiredContent: "blockquote"
            }; CKEDITOR.plugins.add("blockquote", { init: function (h) { h.blockless || (h.addCommand("blockquote", a), h.ui.addButton && h.ui.addButton("Blockquote", { label: h.lang.blockquote.toolbar, command: "blockquote", toolbar: "blocks,10" })) } })
        })(); "use strict"; (function () {
            function a(a, b) {
                CKEDITOR.tools.extend(this, b, {
                    editor: a, id: "cke-" + CKEDITOR.tools.getUniqueId(),
                    area: a._.notificationArea
                }); b.type || (this.type = "info"); this.element = this._createElement(); a.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(this.element)
            } function h(a) { var b = this; this.editor = a; this.notifications = []; this.element = this._createElement(); this._uiBuffer = CKEDITOR.tools.eventsBuffer(10, this._layout, this); this._changeBuffer = CKEDITOR.tools.eventsBuffer(500, this._layout, this); a.on("destroy", function () { b._removeListeners(); b.element.remove() }) } CKEDITOR.plugins.add("notification",
                {
                    init: function (a) {
                        function b(a) { var b = new CKEDITOR.dom.element("div"); b.setStyles({ position: "fixed", "margin-left": "-9999px" }); b.setAttributes({ "aria-live": "assertive", "aria-atomic": "true" }); b.setText(a); CKEDITOR.document.getBody().append(b); setTimeout(function () { b.remove() }, 100) } a._.notificationArea = new h(a); a.showNotification = function (b, h, k) { var m, g; "progress" == h ? m = k : g = k; b = new CKEDITOR.plugins.notification(a, { message: b, type: h, progress: m, duration: g }); b.show(); return b }; a.on("key", function (d) {
                            if (27 ==
                                d.data.keyCode) { var h = a._.notificationArea.notifications; h.length && (b(a.lang.notification.closed), h[h.length - 1].hide(), d.cancel()) }
                        })
                    }
                }); a.prototype = {
                    show: function () { !1 !== this.editor.fire("notificationShow", { notification: this }) && (this.area.add(this), this._hideAfterTimeout()) }, update: function (a) {
                        var b = !0; !1 === this.editor.fire("notificationUpdate", { notification: this, options: a }) && (b = !1); var d = this.element, h = d.findOne(".cke_notification_message"), k = d.findOne(".cke_notification_progress"), m = a.type; d.removeAttribute("role");
                        a.progress && "progress" != this.type && (m = "progress"); m && (d.removeClass(this._getClass()), d.removeAttribute("aria-label"), this.type = m, d.addClass(this._getClass()), d.setAttribute("aria-label", this.type), "progress" != this.type || k ? "progress" != this.type && k && k.remove() : (k = this._createProgressElement(), k.insertBefore(h))); void 0 !== a.message && (this.message = a.message, h.setHtml(this.message)); void 0 !== a.progress && (this.progress = a.progress, k && k.setStyle("width", this._getPercentageProgress())); b && a.important && (d.setAttribute("role",
                            "alert"), this.isVisible() || this.area.add(this)); this.duration = a.duration; this._hideAfterTimeout()
                    }, hide: function () { !1 !== this.editor.fire("notificationHide", { notification: this }) && this.area.remove(this) }, isVisible: function () { return 0 <= CKEDITOR.tools.indexOf(this.area.notifications, this) }, _createElement: function () {
                        var a = this, b, d, h = this.editor.lang.common.close; b = new CKEDITOR.dom.element("div"); b.addClass("cke_notification"); b.addClass(this._getClass()); b.setAttributes({ id: this.id, role: "alert", "aria-label": this.type });
                        "progress" == this.type && b.append(this._createProgressElement()); d = new CKEDITOR.dom.element("p"); d.addClass("cke_notification_message"); d.setHtml(this.message); b.append(d); d = CKEDITOR.dom.element.createFromHtml('\x3ca class\x3d"cke_notification_close" href\x3d"javascript:void(0)" title\x3d"' + h + '" role\x3d"button" tabindex\x3d"-1"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e'); b.append(d); d.on("click", function () { a.editor.focus(); a.hide() }); return b
                    }, _getClass: function () {
                        return "progress" ==
                            this.type ? "cke_notification_info" : "cke_notification_" + this.type
                    }, _createProgressElement: function () { var a = new CKEDITOR.dom.element("span"); a.addClass("cke_notification_progress"); a.setStyle("width", this._getPercentageProgress()); return a }, _getPercentageProgress: function () { return Math.round(100 * (this.progress || 0)) + "%" }, _hideAfterTimeout: function () {
                        var a = this, b; this._hideTimeoutId && clearTimeout(this._hideTimeoutId); if ("number" == typeof this.duration) b = this.duration; else if ("info" == this.type || "success" ==
                            this.type) b = "number" == typeof this.editor.config.notification_duration ? this.editor.config.notification_duration : 5E3; b && (a._hideTimeoutId = setTimeout(function () { a.hide() }, b))
                    }
                }; h.prototype = {
                    add: function (a) { this.notifications.push(a); this.element.append(a.element); 1 == this.element.getChildCount() && (CKEDITOR.document.getBody().append(this.element), this._attachListeners()); this._layout() }, remove: function (a) {
                        var b = CKEDITOR.tools.indexOf(this.notifications, a); 0 > b || (this.notifications.splice(b, 1), a.element.remove(),
                            this.element.getChildCount() || (this._removeListeners(), this.element.remove()))
                    }, _createElement: function () { var a = this.editor, b = a.config, d = new CKEDITOR.dom.element("div"); d.addClass("cke_notifications_area"); d.setAttribute("id", "cke_notifications_area_" + a.name); d.setStyle("z-index", b.baseFloatZIndex - 2); return d }, _attachListeners: function () {
                        var a = CKEDITOR.document.getWindow(), b = this.editor; a.on("scroll", this._uiBuffer.input); a.on("resize", this._uiBuffer.input); b.on("change", this._changeBuffer.input);
                        b.on("floatingSpaceLayout", this._layout, this, null, 20); b.on("blur", this._layout, this, null, 20)
                    }, _removeListeners: function () { var a = CKEDITOR.document.getWindow(), b = this.editor; a.removeListener("scroll", this._uiBuffer.input); a.removeListener("resize", this._uiBuffer.input); b.removeListener("change", this._changeBuffer.input); b.removeListener("floatingSpaceLayout", this._layout); b.removeListener("blur", this._layout) }, _layout: function () {
                        function a() { b.setStyle("left", A(v + h.width - n - u)) } var b = this.element, d =
                            this.editor, h = d.ui.contentsElement.getClientRect(), k = d.ui.contentsElement.getDocumentPosition(), m, g, e = b.getClientRect(), c, n = this._notificationWidth, u = this._notificationMargin; c = CKEDITOR.document.getWindow(); var w = c.getScrollPosition(), p = c.getViewPaneSize(), q = CKEDITOR.document.getBody(), r = q.getDocumentPosition(), A = CKEDITOR.tools.cssLength; n && u || (c = this.element.getChild(0), n = this._notificationWidth = c.getClientRect().width, u = this._notificationMargin = parseInt(c.getComputedStyle("margin-left"), 10) + parseInt(c.getComputedStyle("margin-right"),
                                10)); d.toolbar && (m = d.ui.space(d.config.toolbarLocation), g = m.getClientRect()); m && m.isVisible() && g.bottom > h.top && g.bottom < h.bottom - e.height ? b.setStyles({ position: "fixed", top: A(g.bottom) }) : 0 < h.top ? b.setStyles({ position: "absolute", top: A(k.y) }) : k.y + h.height - e.height > w.y ? b.setStyles({ position: "fixed", top: 0 }) : b.setStyles({ position: "absolute", top: A(k.y + h.height - e.height) }); var v = "fixed" == b.getStyle("position") ? h.left : "static" != q.getComputedStyle("position") ? k.x - r.x : k.x; h.width < n + u ? k.x + n + u > w.x + p.width ? a() :
                                    b.setStyle("left", A(v)) : k.x + n + u > w.x + p.width ? b.setStyle("left", A(v)) : k.x + h.width / 2 + n / 2 + u > w.x + p.width ? b.setStyle("left", A(v - k.x + w.x + p.width - n - u)) : 0 > h.left + h.width - n - u ? a() : 0 > h.left + h.width / 2 - n / 2 ? b.setStyle("left", A(v - k.x + w.x)) : b.setStyle("left", A(v + h.width / 2 - n / 2 - u / 2))
                    }
                }; CKEDITOR.plugins.notification = a
        })(); (function () {
            var a = '\x3ca id\x3d"{id}" class\x3d"cke_button cke_button__{name} cke_button_{state} {cls}"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' title\x3d"{title}" tabindex\x3d"-1" hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasArrow}" aria-disabled\x3d"{ariaDisabled}"';
            CKEDITOR.env.gecko && CKEDITOR.env.mac && (a += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (a += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"'); var h = ""; CKEDITOR.env.ie && (h = 'return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26'); var a = a + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" onclick\x3d"' + h + 'CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{style}"') +
                '\x3e\x26nbsp;\x3c/span\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_button_label cke_button__{name}_label" aria-hidden\x3d"false"\x3e{label}\x3c/span\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_button_label" aria-hidden\x3d"false"\x3e{ariaShortcutSpace}{ariaShortcut}\x3c/span\x3e{arrowHtml}\x3c/a\x3e', f = CKEDITOR.addTemplate("buttonArrow", '\x3cspan class\x3d"cke_button_arrow"\x3e' + (CKEDITOR.env.hc ? "\x26#9660;" : "") + "\x3c/span\x3e"), b = CKEDITOR.addTemplate("button", a); CKEDITOR.plugins.add("button",
                    { beforeInit: function (a) { a.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler) } }); CKEDITOR.UI_BUTTON = "button"; CKEDITOR.ui.button = function (a) { CKEDITOR.tools.extend(this, a, { title: a.label, click: a.click || function (b) { b.execCommand(a.command) } }); this._ = {} }; CKEDITOR.ui.button.handler = { create: function (a) { return new CKEDITOR.ui.button(a) } }; CKEDITOR.ui.button.prototype = {
                        render: function (a, h) {
                            function k() {
                                var b = a.mode; b && (b = this.modes[b] ? void 0 !== m[b] ? m[b] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                    b = a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : b, this.setState(b), this.refresh && this.refresh())
                            } var m = null, g = CKEDITOR.env, e = this._.id = CKEDITOR.tools.getNextId(), c = "", n = this.command, u, w, p; this._.editor = a; var q = { id: e, button: this, editor: a, focus: function () { CKEDITOR.document.getById(e).focus() }, execute: function () { this.button.click(a) }, attach: function (a) { this.button.attach(a) } }, r = CKEDITOR.tools.addFunction(function (a) { if (q.onkey) return a = new CKEDITOR.dom.event(a), !1 !== q.onkey(q, a.getKeystroke()) }),
                                A = CKEDITOR.tools.addFunction(function (a) { var b; q.onfocus && (b = !1 !== q.onfocus(q, new CKEDITOR.dom.event(a))); return b }), v = 0; q.clickFn = u = CKEDITOR.tools.addFunction(function () { v && (a.unlockSelection(1), v = 0); q.execute(); g.iOS && a.focus() }); this.modes ? (m = {}, a.on("beforeModeUnload", function () { a.mode && this._.state != CKEDITOR.TRISTATE_DISABLED && (m[a.mode] = this._.state) }, this), a.on("activeFilterChange", k, this), a.on("mode", k, this), !this.readOnly && a.on("readOnly", k, this)) : n && (n = a.getCommand(n)) && (n.on("state", function () { this.setState(n.state) },
                                    this), c += n.state == CKEDITOR.TRISTATE_ON ? "on" : n.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off"); var D; if (this.directional) a.on("contentDirChanged", function (b) { var c = CKEDITOR.document.getById(this._.id), e = c.getFirst(); b = b.data; b != a.lang.dir ? c.addClass("cke_" + b) : c.removeClass("cke_ltr").removeClass("cke_rtl"); e.setAttribute("style", CKEDITOR.skin.getIconStyle(D, "rtl" == b, this.icon, this.iconOffset)) }, this); n ? (w = a.getCommandKeystroke(n)) && (p = CKEDITOR.tools.keystrokeToString(a.lang.common.keyboard, w)) :
                                        c += "off"; w = this.name || this.command; var t = null, y = this.icon; D = w; this.icon && !/\./.test(this.icon) ? (D = this.icon, y = null) : (this.icon && (t = this.icon), CKEDITOR.env.hidpi && this.iconHiDpi && (t = this.iconHiDpi)); t ? (CKEDITOR.skin.addIcon(t, t), y = null) : t = D; c = {
                                            id: e, name: w, iconName: D, label: this.label, cls: (this.hasArrow ? "cke_button_expandable " : "") + (this.className || ""), state: c, ariaDisabled: "disabled" == c ? "true" : "false", title: this.title + (p ? " (" + p.display + ")" : ""), ariaShortcutSpace: p ? "\x26nbsp;" : "", ariaShortcut: p ? a.lang.common.keyboardShortcut +
                                                " " + p.aria : "", titleJs: g.gecko && !g.hc ? "" : (this.title || "").replace("'", ""), hasArrow: "string" === typeof this.hasArrow && this.hasArrow || (this.hasArrow ? "true" : "false"), keydownFn: r, focusFn: A, clickFn: u, style: CKEDITOR.skin.getIconStyle(t, "rtl" == a.lang.dir, y, this.iconOffset), arrowHtml: this.hasArrow ? f.output() : ""
                                        }; b.output(c, h); if (this.onRender) this.onRender(); return q
                        }, setState: function (a) {
                            if (this._.state == a) return !1; this._.state = a; var b = CKEDITOR.document.getById(this._.id); return b ? (b.setState(a, "cke_button"),
                                b.setAttribute("aria-disabled", a == CKEDITOR.TRISTATE_DISABLED), this.hasArrow ? b.setAttribute("aria-expanded", a == CKEDITOR.TRISTATE_ON) : a === CKEDITOR.TRISTATE_ON ? b.setAttribute("aria-pressed", !0) : b.removeAttribute("aria-pressed"), !0) : !1
                        }, getState: function () { return this._.state }, toFeature: function (a) { if (this._.feature) return this._.feature; var b = this; this.allowedContent || this.requiredContent || !this.command || (b = a.getCommand(this.command) || b); return this._.feature = b }
                    }; CKEDITOR.ui.prototype.addButton = function (a,
                        b) { this.add(a, CKEDITOR.UI_BUTTON, b) }
        })(); (function () {
            function a(a) {
                function b() { for (var c = k(), e = CKEDITOR.tools.clone(a.config.toolbarGroups) || h(a), g = 0; g < e.length; g++) { var l = e[g]; if ("/" != l) { "string" == typeof l && (l = e[g] = { name: l }); var q, r = l.groups; if (r) for (var A = 0; A < r.length; A++)q = r[A], (q = c[q]) && f(l, q); (q = c[l.name]) && f(l, q) } } return e } function k() {
                    var b = {}, c, e, g; for (c in a.ui.items) e = a.ui.items[c], g = e.toolbar || "others", g = g.split(","), e = g[0], g = parseInt(g[1] || -1, 10), b[e] || (b[e] = []), b[e].push({ name: c, order: g });
                    for (e in b) b[e] = b[e].sort(function (a, b) { return a.order == b.order ? 0 : 0 > b.order ? -1 : 0 > a.order ? 1 : a.order < b.order ? -1 : 1 }); return b
                } function f(b, c) { if (c.length) { b.items ? b.items.push(a.ui.create("-")) : b.items = []; for (var g; g = c.shift();)g = "string" == typeof g ? g : g.name, e && -1 != CKEDITOR.tools.indexOf(e, g) || (g = a.ui.create(g)) && a.addFeature(g) && b.items.push(g) } } function g(a) {
                    var b = [], c, e, d; for (c = 0; c < a.length; ++c)e = a[c], d = {}, "/" == e ? b.push(e) : CKEDITOR.tools.isArray(e) ? (f(d, CKEDITOR.tools.clone(e)), b.push(d)) : e.items &&
                        (f(d, CKEDITOR.tools.clone(e.items)), d.name = e.name, b.push(d)); return b
                } var e = a.config.removeButtons, e = e && e.split(","), c = a.config.toolbar; "string" == typeof c && (c = a.config["toolbar_" + c]); return a.toolbar = c ? g(c) : b()
            } function h(a) {
                return a._.toolbarGroups || (a._.toolbarGroups = [{ name: "document", groups: ["mode", "document", "doctools"] }, { name: "clipboard", groups: ["clipboard", "undo"] }, { name: "editing", groups: ["find", "selection", "spellchecker"] }, { name: "forms" }, "/", { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
                { name: "paragraph", groups: ["list", "indent", "blocks", "align", "bidi"] }, { name: "links" }, { name: "insert" }, "/", { name: "styles" }, { name: "colors" }, { name: "tools" }, { name: "others" }, { name: "about" }])
            } var f = function () { this.toolbars = []; this.focusCommandExecuted = !1 }; f.prototype.focus = function () { for (var a = 0, b; b = this.toolbars[a++];)for (var k = 0, f; f = b.items[k++];)if (f.focus) { f.focus(); return } }; var b = {
                modes: { wysiwyg: 1, source: 1 }, readOnly: 1, exec: function (a) {
                    a.toolbox && (a.toolbox.focusCommandExecuted = !0, CKEDITOR.env.ie || CKEDITOR.env.air ?
                        setTimeout(function () { a.toolbox.focus() }, 100) : a.toolbox.focus())
                }
            }; CKEDITOR.plugins.add("toolbar", {
                requires: "button", init: function (d) {
                    var h, k = function (a, b) {
                        var e, c = "rtl" == d.lang.dir, f = d.config.toolbarGroupCycling, u = c ? 37 : 39, c = c ? 39 : 37, f = void 0 === f || f; switch (b) {
                            case 9: case CKEDITOR.SHIFT + 9: for (; !e || !e.items.length;)if (e = 9 == b ? (e ? e.next : a.toolbar.next) || d.toolbox.toolbars[0] : (e ? e.previous : a.toolbar.previous) || d.toolbox.toolbars[d.toolbox.toolbars.length - 1], e.items.length) for (a = e.items[h ? e.items.length -
                                1 : 0]; a && !a.focus;)(a = h ? a.previous : a.next) || (e = 0); a && a.focus(); return !1; case u: e = a; do e = e.next, !e && f && (e = a.toolbar.items[0]); while (e && !e.focus); e ? e.focus() : k(a, 9); return !1; case 40: return a.button && a.button.hasArrow ? a.execute() : k(a, 40 == b ? u : c), !1; case c: case 38: e = a; do e = e.previous, !e && f && (e = a.toolbar.items[a.toolbar.items.length - 1]); while (e && !e.focus); e ? e.focus() : (h = 1, k(a, CKEDITOR.SHIFT + 9), h = 0); return !1; case 27: return d.focus(), !1; case 13: case 32: return a.execute(), !1
                        }return !0
                    }; d.on("uiSpace", function (b) {
                        if (b.data.space ==
                            d.config.toolbarLocation) {
                                b.removeListener(); d.toolbox = new f; var g = CKEDITOR.tools.getNextId(), e = ['\x3cspan id\x3d"', g, '" class\x3d"cke_voice_label"\x3e', d.lang.toolbar.toolbars, "\x3c/span\x3e", '\x3cspan id\x3d"' + d.ui.spaceId("toolbox") + '" class\x3d"cke_toolbox" role\x3d"group" aria-labelledby\x3d"', g, '" onmousedown\x3d"return false;"\x3e'], g = !1 !== d.config.toolbarStartupExpanded, c, h; d.config.toolbarCanCollapse && d.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && e.push('\x3cspan class\x3d"cke_toolbox_main"' +
                                    (g ? "\x3e" : ' style\x3d"display:none"\x3e')); for (var l = d.toolbox.toolbars, w = a(d), p = w.length, q = 0; q < p; q++) {
                                        var r, A = 0, v, D = w[q], t = "/" !== D && ("/" === w[q + 1] || q == p - 1), y; if (D) if (c && (e.push("\x3c/span\x3e"), h = c = 0), "/" === D) e.push('\x3cspan class\x3d"cke_toolbar_break"\x3e\x3c/span\x3e'); else {
                                            y = D.items || D; for (var z = 0; z < y.length; z++) {
                                                var B = y[z], C; if (B) {
                                                    var E = function (a) {
                                                        a = a.render(d, e); G = A.items.push(a) - 1; 0 < G && (a.previous = A.items[G - 1], a.previous.next = a); a.toolbar = A; a.onkey = k; a.onfocus = function () {
                                                            d.toolbox.focusCommandExecuted ||
                                                            d.focus()
                                                        }
                                                    }; if (B.type == CKEDITOR.UI_SEPARATOR) h = c && B; else {
                                                        C = !1 !== B.canGroup; if (!A) {
                                                            r = CKEDITOR.tools.getNextId(); A = { id: r, items: [] }; v = D.name && (d.lang.toolbar.toolbarGroups[D.name] || D.name); e.push('\x3cspan id\x3d"', r, '" class\x3d"cke_toolbar' + (t ? ' cke_toolbar_last"' : '"'), v ? ' aria-labelledby\x3d"' + r + '_label"' : "", ' role\x3d"toolbar"\x3e'); v && e.push('\x3cspan id\x3d"', r, '_label" class\x3d"cke_voice_label"\x3e', v, "\x3c/span\x3e"); e.push('\x3cspan class\x3d"cke_toolbar_start"\x3e\x3c/span\x3e'); var G = l.push(A) -
                                                                1; 0 < G && (A.previous = l[G - 1], A.previous.next = A)
                                                        } C ? c || (e.push('\x3cspan class\x3d"cke_toolgroup" role\x3d"presentation"\x3e'), c = 1) : c && (e.push("\x3c/span\x3e"), c = 0); h && (E(h), h = 0); E(B)
                                                    }
                                                }
                                            } c && (e.push("\x3c/span\x3e"), h = c = 0); A && e.push('\x3cspan class\x3d"cke_toolbar_end"\x3e\x3c/span\x3e\x3c/span\x3e')
                                        }
                                    } d.config.toolbarCanCollapse && e.push("\x3c/span\x3e"); if (d.config.toolbarCanCollapse && d.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                                        var H = CKEDITOR.tools.addFunction(function () { d.execCommand("toolbarCollapse") });
                                        d.on("destroy", function () { CKEDITOR.tools.removeFunction(H) }); d.addCommand("toolbarCollapse", {
                                            readOnly: 1, exec: function (a) {
                                                var b = a.ui.space("toolbar_collapser"), c = b.getPrevious(), e = a.ui.space("contents"), d = c.getParent(), g = parseInt(e.$.style.height, 10), k = d.$.offsetHeight, f = b.hasClass("cke_toolbox_collapser_min"); f ? (c.show(), b.removeClass("cke_toolbox_collapser_min"), b.setAttribute("title", a.lang.toolbar.toolbarCollapse)) : (c.hide(), b.addClass("cke_toolbox_collapser_min"), b.setAttribute("title", a.lang.toolbar.toolbarExpand));
                                                b.getFirst().setText(f ? "▲" : "◀"); e.setStyle("height", g - (d.$.offsetHeight - k) + "px"); a.fire("resize", { outerHeight: a.container.$.offsetHeight, contentsHeight: e.$.offsetHeight, outerWidth: a.container.$.offsetWidth })
                                            }, modes: { wysiwyg: 1, source: 1 }
                                        }); d.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse"); e.push('\x3ca title\x3d"' + (g ? d.lang.toolbar.toolbarCollapse : d.lang.toolbar.toolbarExpand) + '" id\x3d"' + d.ui.spaceId("toolbar_collapser") + '" tabIndex\x3d"-1" class\x3d"cke_toolbox_collapser');
                                        g || e.push(" cke_toolbox_collapser_min"); e.push('" onclick\x3d"CKEDITOR.tools.callFunction(' + H + ')"\x3e', '\x3cspan class\x3d"cke_arrow"\x3e\x26#9650;\x3c/span\x3e', "\x3c/a\x3e")
                                    } e.push("\x3c/span\x3e"); b.data.html += e.join("")
                        }
                    }); d.on("destroy", function () { if (this.toolbox) { var a, b = 0, e, c, d; for (a = this.toolbox.toolbars; b < a.length; b++)for (c = a[b].items, e = 0; e < c.length; e++)d = c[e], d.clickFn && CKEDITOR.tools.removeFunction(d.clickFn), d.keyDownFn && CKEDITOR.tools.removeFunction(d.keyDownFn) } }); d.on("uiReady", function () {
                        var a =
                            d.ui.space("toolbox"); a && d.focusManager.add(a, 1)
                    }); d.addCommand("toolbarFocus", b); d.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus"); d.ui.add("-", CKEDITOR.UI_SEPARATOR, {}); d.ui.addHandler(CKEDITOR.UI_SEPARATOR, { create: function () { return { render: function (a, b) { b.push('\x3cspan class\x3d"cke_toolbar_separator" role\x3d"separator"\x3e\x3c/span\x3e'); return {} } } } })
                }
            }); CKEDITOR.ui.prototype.addToolbarGroup = function (a, b, k) {
                var f = h(this.editor), g = 0 === b, e = { name: a }; if (k) {
                    if (k = CKEDITOR.tools.search(f, function (a) {
                        return a.name ==
                            k
                    })) { !k.groups && (k.groups = []); if (b && (b = CKEDITOR.tools.indexOf(k.groups, b), 0 <= b)) { k.groups.splice(b + 1, 0, a); return } g ? k.groups.splice(0, 0, a) : k.groups.push(a); return } b = null
                } b && (b = CKEDITOR.tools.indexOf(f, function (a) { return a.name == b })); g ? f.splice(0, 0, a) : "number" == typeof b ? f.splice(b + 1, 0, e) : f.push(a)
            }
        })(); CKEDITOR.UI_SEPARATOR = "separator"; CKEDITOR.config.toolbarLocation = "top"; "use strict"; (function () {
            function a(a, b, e) {
                b.type || (b.type = "auto"); if (e && !1 === a.fire("beforePaste", b) || !b.dataValue && b.dataTransfer.isEmpty()) return !1;
                b.dataValue || (b.dataValue = ""); if (CKEDITOR.env.gecko && "drop" == b.method && a.toolbox) a.once("afterPaste", function () { a.toolbox.focus() }); return a.fire("paste", b)
            } function h(b) {
                function e() {
                    var a = b.editable(); if (CKEDITOR.plugins.clipboard.isCustomCopyCutSupported) { var d = function (a) { b.getSelection().isCollapsed() || (b.readOnly && "cut" == a.name || C.initPasteDataTransfer(a, b), a.data.preventDefault()) }; a.on("copy", d); a.on("cut", d); a.on("cut", function () { b.readOnly || b.extractSelectedHtml() }, null, null, 999) } a.on(C.mainPasteEvent,
                        function (a) { "beforepaste" == C.mainPasteEvent && E || y(a) }); "beforepaste" == C.mainPasteEvent && (a.on("paste", function (a) { G || (k(), a.data.preventDefault(), y(a), h("paste")) }), a.on("contextmenu", f, null, null, 0), a.on("beforepaste", function (a) { !a.data || a.data.$.ctrlKey || a.data.$.shiftKey || f() }, null, null, 0)); a.on("beforecut", function () { !E && m(b) }); var g; a.attachListener(CKEDITOR.env.ie ? a : b.document.getDocumentElement(), "mouseup", function () { g = setTimeout(z, 0) }); b.on("destroy", function () { clearTimeout(g) }); a.on("keyup",
                            z)
                } function d(a) { return { type: a, canUndo: "cut" == a, startDisabled: !0, fakeKeystroke: "cut" == a ? CKEDITOR.CTRL + 88 : CKEDITOR.CTRL + 67, exec: function () { "cut" == this.type && m(); var a; var e = this.type; if (CKEDITOR.env.ie) a = h(e); else try { a = b.document.$.execCommand(e, !1, null) } catch (d) { a = !1 } a || b.showNotification(b.lang.clipboard[this.type + "Error"]); return a } } } function g() {
                    return {
                        canUndo: !1, async: !0, fakeKeystroke: CKEDITOR.CTRL + 86, exec: function (b, c) {
                            function e(c, k) {
                                k = "undefined" !== typeof k ? k : !0; c ? (c.method = "paste", c.dataTransfer ||
                                    (c.dataTransfer = C.initPasteDataTransfer()), a(b, c, k)) : g && !b._.forcePasteDialog && b.showNotification(h, "info", b.config.clipboard_notificationDuration); b._.forcePasteDialog = !1; b.fire("afterCommandExec", { name: "paste", command: d, returnValue: !!c })
                            } c = "undefined" !== typeof c && null !== c ? c : {}; var d = this, g = "undefined" !== typeof c.notification ? c.notification : !0, k = c.type, f = CKEDITOR.tools.keystrokeToString(b.lang.common.keyboard, b.getCommandKeystroke(this)), h = "string" === typeof g ? g : b.lang.clipboard.pasteNotification.replace(/%1/,
                                '\x3ckbd aria-label\x3d"' + f.aria + '"\x3e' + f.display + "\x3c/kbd\x3e"), f = "string" === typeof c ? c : c.dataValue; k && !0 !== b.config.forcePasteAsPlainText && "allow-word" !== b.config.forcePasteAsPlainText ? b._.nextPasteType = k : delete b._.nextPasteType; "string" === typeof f ? e({ dataValue: f }) : b.getClipboardData(e)
                        }
                    }
                } function k() { G = 1; setTimeout(function () { G = 0 }, 100) } function f() { E = 1; setTimeout(function () { E = 0 }, 10) } function h(a) {
                    var e = b.document, d = e.getBody(), g = !1, k = function () { g = !0 }; d.on(a, k); 7 < CKEDITOR.env.version ? e.$.execCommand(a) :
                        e.$.selection.createRange().execCommand(a); d.removeListener(a, k); return g
                } function m() { if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) { var a = b.getSelection(), e, d, g; a.getType() == CKEDITOR.SELECTION_ELEMENT && (e = a.getSelectedElement()) && (d = a.getRanges()[0], g = b.document.createText(""), g.insertBefore(e), d.setStartBefore(g), d.setEndAfter(e), a.selectRanges([d]), setTimeout(function () { e.getParent() && (g.remove(), a.selectElement(e)) }, 0)) } } function l(a, e) {
                    var d = b.document, g = b.editable(), k = function (a) { a.cancel() }, f;
                    if (!d.getById("cke_pastebin")) {
                        var h = b.getSelection(), m = h.createBookmarks(); CKEDITOR.env.ie && h.root.fire("selectionchange"); var n = new CKEDITOR.dom.element(!CKEDITOR.env.webkit && !g.is("body") || CKEDITOR.env.ie ? "div" : "body", d); n.setAttributes({ id: "cke_pastebin", "data-cke-temp": "1" }); var u = 0, d = d.getWindow(); CKEDITOR.env.webkit ? (g.append(n), n.addClass("cke_editable"), g.is("body") || (u = "static" != g.getComputedStyle("position") ? g : CKEDITOR.dom.element.get(g.$.offsetParent), u = u.getDocumentPosition().y)) : g.getAscendant(CKEDITOR.env.ie ?
                            "body" : "html", 1).append(n); n.setStyles({ position: "absolute", top: d.getScrollPosition().y - u + 10 + "px", width: "1px", height: Math.max(1, d.getViewPaneSize().height - 20) + "px", overflow: "hidden", margin: 0, padding: 0 }); CKEDITOR.env.safari && n.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "text")); (u = n.getParent().isReadOnly()) ? (n.setOpacity(0), n.setAttribute("contenteditable", !0)) : n.setStyle("ltr" == b.config.contentsLangDirection ? "left" : "right", "-10000px"); b.on("selectionChange", k, null, null, 0); if (CKEDITOR.env.webkit ||
                                CKEDITOR.env.gecko) f = g.once("blur", k, null, null, -100); u && n.focus(); u = new CKEDITOR.dom.range(n); u.selectNodeContents(n); var v = u.select(); CKEDITOR.env.ie && (f = g.once("blur", function () { b.lockSelection(v) })); var t = CKEDITOR.document.getWindow().getScrollPosition().y; setTimeout(function () {
                                    CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = t); f && f.removeListener(); CKEDITOR.env.ie && g.focus(); h.selectBookmarks(m); n.remove(); var a; CKEDITOR.env.webkit && (a = n.getFirst()) && a.is && a.hasClass("Apple-style-span") &&
                                        (n = a); b.removeListener("selectionChange", k); e(n.getHtml())
                                }, 0)
                    }
                } function D() { if ("paste" == C.mainPasteEvent) return b.fire("beforePaste", { type: "auto", method: "paste" }), !1; b.focus(); k(); var a = b.focusManager; a.lock(); if (b.editable().fire(C.mainPasteEvent) && !h("paste")) return a.unlock(), !1; a.unlock(); return !0 } function t(a) {
                    if ("wysiwyg" == b.mode) switch (a.data.keyCode) {
                        case CKEDITOR.CTRL + 86: case CKEDITOR.SHIFT + 45: a = b.editable(); k(); "paste" == C.mainPasteEvent && a.fire("beforepaste"); break; case CKEDITOR.CTRL + 88: case CKEDITOR.SHIFT +
                            46: b.fire("saveSnapshot"), setTimeout(function () { b.fire("saveSnapshot") }, 50)
                    }
                } function y(e) { var d = { type: "auto", method: "paste", dataTransfer: C.initPasteDataTransfer(e) }; d.dataTransfer.cacheData(); var g = !1 !== b.fire("beforePaste", d); g && C.canClipboardApiBeTrusted(d.dataTransfer, b) ? (e.data.preventDefault(), setTimeout(function () { a(b, d) }, 0)) : l(e, function (e) { d.dataValue = e.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig, ""); g && a(b, d) }) } function z() {
                    if ("wysiwyg" == b.mode) {
                        var a = B("paste"); b.getCommand("cut").setState(B("cut"));
                        b.getCommand("copy").setState(B("copy")); b.getCommand("paste").setState(a); b.fire("pasteState", a)
                    }
                } function B(a) { var e = b.getSelection(), e = e && e.getRanges()[0]; if ((b.readOnly || e && e.checkReadOnly()) && a in { paste: 1, cut: 1 }) return CKEDITOR.TRISTATE_DISABLED; if ("paste" == a) return CKEDITOR.TRISTATE_OFF; a = b.getSelection(); e = a.getRanges(); return a.getType() == CKEDITOR.SELECTION_NONE || 1 == e.length && e[0].collapsed ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF } var C = CKEDITOR.plugins.clipboard, E = 0, G = 0; (function () {
                    b.on("key",
                        t); b.on("contentDom", e); b.on("selectionChange", z); if (b.contextMenu) { b.contextMenu.addListener(function () { return { cut: B("cut"), copy: B("copy"), paste: B("paste") } }); var a = null; b.on("menuShow", function () { a && (a.removeListener(), a = null); var e = b.contextMenu.findItemByCommandName("paste"); e && e.element && (a = e.element.on("touchend", function () { b._.forcePasteDialog = !0 })) }) } if (b.ui.addButton) b.once("instanceReady", function () {
                            b._.pasteButtons && CKEDITOR.tools.array.forEach(b._.pasteButtons, function (a) {
                                if (a = b.ui.get(a)) if (a =
                                    CKEDITOR.document.getById(a._.id)) a.on("touchend", function () { b._.forcePasteDialog = !0 })
                            })
                        })
                })(); (function () { function a(e, d, g, k, f) { var h = b.lang.clipboard[d]; b.addCommand(d, g); b.ui.addButton && b.ui.addButton(e, { label: h, command: d, toolbar: "clipboard," + k }); b.addMenuItems && b.addMenuItem(d, { label: h, command: d, group: "clipboard", order: f }) } a("Cut", "cut", d("cut"), 10, 1); a("Copy", "copy", d("copy"), 20, 4); a("Paste", "paste", g(), 30, 8); b._.pasteButtons || (b._.pasteButtons = []); b._.pasteButtons.push("Paste") })(); b.getClipboardData =
                    function (a, e) {
                        function d(a) { a.removeListener(); a.cancel(); e(a.data) } function g(a) { a.removeListener(); a.cancel(); e({ type: f, dataValue: a.data.dataValue, dataTransfer: a.data.dataTransfer, method: "paste" }) } var k = !1, f = "auto"; e || (e = a, a = null); b.on("beforePaste", function (a) { a.removeListener(); k = !0; f = a.data.type }, null, null, 1E3); b.on("paste", d, null, null, 0); !1 === D() && (b.removeListener("paste", d), b._.forcePasteDialog && k && b.fire("pasteDialog") ? (b.on("pasteDialogCommit", g), b.on("dialogHide", function (a) {
                            a.removeListener();
                            a.data.removeListener("pasteDialogCommit", g); a.data._.committed || e(null)
                        })) : e(null))
                    }
            } function f(a) { if (CKEDITOR.env.webkit) { if (!a.match(/^[^<]*$/g) && !a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)) return "html" } else if (CKEDITOR.env.ie) { if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi) && !a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)) return "html" } else if (CKEDITOR.env.gecko) { if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi)) return "html" } else return "html"; return "htmlifiedtext" } function b(a, b) {
                function e(a) {
                    return CKEDITOR.tools.repeat("\x3c/p\x3e\x3cp\x3e",
                        ~~(a / 2)) + (1 == a % 2 ? "\x3cbr\x3e" : "")
                } b = b.replace(/(?!\u3000)\s+/g, " ").replace(/> +</g, "\x3e\x3c").replace(/<br ?\/>/gi, "\x3cbr\x3e"); b = b.replace(/<\/?[A-Z]+>/g, function (a) { return a.toLowerCase() }); if (b.match(/^[^<]$/)) return b; CKEDITOR.env.webkit && -1 < b.indexOf("\x3cdiv\x3e") && (b = b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "\x3cbr\x3e").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "\x3cdiv\x3e\x3c/div\x3e"), b.match(/<div>(<br>|)<\/div>/) && (b = "\x3cp\x3e" + b.replace(/(<div>(<br>|)<\/div>)+/g,
                    function (a) { return e(a.split("\x3c/div\x3e\x3cdiv\x3e").length + 1) }) + "\x3c/p\x3e"), b = b.replace(/<\/div><div>/g, "\x3cbr\x3e"), b = b.replace(/<\/?div>/g, "")); CKEDITOR.env.gecko && a.enterMode != CKEDITOR.ENTER_BR && (CKEDITOR.env.gecko && (b = b.replace(/^<br><br>$/, "\x3cbr\x3e")), -1 < b.indexOf("\x3cbr\x3e\x3cbr\x3e") && (b = "\x3cp\x3e" + b.replace(/(<br>){2,}/g, function (a) { return e(a.length / 4) }) + "\x3c/p\x3e")); return k(a, b)
            } function d(a) {
                function b() {
                    var a = {}, c; for (c in CKEDITOR.dtd) "$" != c.charAt(0) && "div" != c && "span" !=
                        c && (a[c] = 1); return a
                } var e = {}; return { get: function (d) { return "plain-text" == d ? e.plainText || (e.plainText = new CKEDITOR.filter(a, "br")) : "semantic-content" == d ? ((d = e.semanticContent) || (d = new CKEDITOR.filter(a, {}), d.allow({ $1: { elements: b(), attributes: !0, styles: !1, classes: !1 } }), d = e.semanticContent = d), d) : d ? new CKEDITOR.filter(a, d) : null } }
            } function l(a, b, e) { b = CKEDITOR.htmlParser.fragment.fromHtml(b); var d = new CKEDITOR.htmlParser.basicWriter; e.applyTo(b, !0, !1, a.activeEnterMode); b.writeHtml(d); return d.getHtml() }
            function k(a, b) { a.enterMode == CKEDITOR.ENTER_BR ? b = b.replace(/(<\/p><p>)+/g, function (a) { return CKEDITOR.tools.repeat("\x3cbr\x3e", a.length / 7 * 2) }).replace(/<\/?p>/g, "") : a.enterMode == CKEDITOR.ENTER_DIV && (b = b.replace(/<(\/)?p>/g, "\x3c$1div\x3e")); return b } function m(a) { a.data.preventDefault(); a.data.$.dataTransfer.dropEffect = "none" } function g(b) {
                var e = CKEDITOR.plugins.clipboard; b.on("contentDom", function () {
                    function d(e, g, k) {
                        g.select(); a(b, { dataTransfer: k, method: "drop" }, 1); k.sourceEditor.fire("saveSnapshot");
                        k.sourceEditor.editable().extractHtmlFromRange(e); k.sourceEditor.getSelection().selectRanges([e]); k.sourceEditor.fire("saveSnapshot")
                    } function g(d, k) { d.select(); a(b, { dataTransfer: k, method: "drop" }, 1); e.resetDragDataTransfer() } function k(a, e, d) { var g = { $: a.data.$, target: a.data.getTarget() }; e && (g.dragRange = e); d && (g.dropRange = d); !1 === b.fire(a.name, g) && a.data.preventDefault() } function f(a) { a.type != CKEDITOR.NODE_ELEMENT && (a = a.getParent()); return a.getChildCount() } var h = b.editable(), m = CKEDITOR.plugins.clipboard.getDropTarget(b),
                        l = b.ui.space("top"), D = b.ui.space("bottom"); e.preventDefaultDropOnElement(l); e.preventDefaultDropOnElement(D); h.attachListener(m, "dragstart", k); h.attachListener(b, "dragstart", e.resetDragDataTransfer, e, null, 1); h.attachListener(b, "dragstart", function (a) { e.initDragDataTransfer(a, b) }, null, null, 2); h.attachListener(b, "dragstart", function () {
                            var a = e.dragRange = b.getSelection().getRanges()[0]; CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (e.dragStartContainerChildCount = a ? f(a.startContainer) : null, e.dragEndContainerChildCount =
                                a ? f(a.endContainer) : null)
                        }, null, null, 100); h.attachListener(m, "dragend", k); h.attachListener(b, "dragend", e.initDragDataTransfer, e, null, 1); h.attachListener(b, "dragend", e.resetDragDataTransfer, e, null, 100); h.attachListener(m, "dragover", function (a) { if (CKEDITOR.env.edge) a.data.preventDefault(); else { var b = a.data.getTarget(); b && b.is && b.is("html") ? a.data.preventDefault() : CKEDITOR.env.ie && CKEDITOR.plugins.clipboard.isFileApiSupported && a.data.$.dataTransfer.types.contains("Files") && a.data.preventDefault() } });
                    h.attachListener(m, "drop", function (a) { if (!a.data.$.defaultPrevented && (a.data.preventDefault(), !b.readOnly)) { var d = a.data.getTarget(); if (!d.isReadOnly() || d.type == CKEDITOR.NODE_ELEMENT && d.is("html")) { var d = e.getRangeAtDropPosition(a, b), g = e.dragRange; d && k(a, g, d) } } }, null, null, 9999); h.attachListener(b, "drop", e.initDragDataTransfer, e, null, 1); h.attachListener(b, "drop", function (a) {
                        if (a = a.data) {
                            var k = a.dropRange, f = a.dragRange, h = a.dataTransfer; h.getTransferType(b) == CKEDITOR.DATA_TRANSFER_INTERNAL ? setTimeout(function () {
                                e.internalDrop(f,
                                    k, h, b)
                            }, 0) : h.getTransferType(b) == CKEDITOR.DATA_TRANSFER_CROSS_EDITORS ? d(f, k, h) : g(k, h)
                        }
                    }, null, null, 9999)
                })
            } var e; CKEDITOR.plugins.add("clipboard", {
                requires: "dialog,notification,toolbar", init: function (a) {
                    function e(b) { b = CKEDITOR.tools.array.map(b, function (a) { return a.split("/")[1].toUpperCase() }).join(", "); return a.lang.clipboard.fileFormatNotSupportedNotification.replace(/\${formats\}/g, b) } function k(a, b) {
                        return CKEDITOR.env.ie && a.data.fileTransferCancel || !(CKEDITOR.env.ie || b && A !== b.id) ? !1 : b.isFileTransfer() &&
                            1 === b.getFilesCount()
                    } var m, p = d(a); a.config.forcePasteAsPlainText ? m = "plain-text" : a.config.pasteFilter ? m = a.config.pasteFilter : !CKEDITOR.env.webkit || "pasteFilter" in a.config || (m = "semantic-content"); a.pasteFilter = p.get(m); h(a); g(a); CKEDITOR.dialog.add("paste", CKEDITOR.getUrl(this.path + "dialogs/paste.js")); if ((CKEDITOR.plugins.clipboard.isCustomDataTypesSupported || CKEDITOR.plugins.clipboard.isFileApiSupported) && a.config.clipboard_handleImages) {
                        var q = ["image/png", "image/jpeg", "image/gif"], r = e(q), A; a.on("paste",
                            function (b) {
                                var e = b.data, d = e.dataTransfer; if (!e.dataValue && k(b, d)) if (d = d.getFile(0), -1 === CKEDITOR.tools.indexOf(q, d.type)) a.showNotification(r, "info", a.config.clipboard_notificationDuration); else {
                                    var g = new FileReader; g.addEventListener("load", function () { b.data.dataValue = '\x3cimg src\x3d"' + g.result + '" /\x3e'; a.fire("paste", b.data) }, !1); g.addEventListener("abort", function () { CKEDITOR.env.ie && (b.data.fileTransferCancel = !0); a.fire("paste", b.data) }, !1); g.addEventListener("error", function () {
                                        CKEDITOR.env.ie &&
                                        (b.data.fileTransferCancel = !0); a.fire("paste", b.data)
                                    }, !1); g.readAsDataURL(d); A = e.dataTransfer.id; b.stop()
                                }
                            }, null, null, 1)
                    } a.on("paste", function (b) { b.data.dataTransfer || (b.data.dataTransfer = new CKEDITOR.plugins.clipboard.dataTransfer); if (!b.data.dataValue) { var e = b.data.dataTransfer, d = e.getData("text/html"); if (d) b.data.dataValue = d, b.data.type = "html"; else if (d = e.getData("text/plain")) b.data.dataValue = a.editable().transformPlainTextToHtml(d), b.data.type = "text" } }, null, null, 1); a.on("paste", function (a) {
                        var b =
                            a.data.dataValue, c = CKEDITOR.dtd.$block; -1 < b.indexOf("Apple-") && (b = b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " "), "html" != a.data.type && (b = b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function (a, b) { return b.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;") })), -1 < b.indexOf('\x3cbr class\x3d"Apple-interchange-newline"\x3e') && (a.data.startsWithEOL = 1, a.data.preSniffing = "html", b = b.replace(/<br class="Apple-interchange-newline">/, "")), b = b.replace(/(<[^>]+) class="Apple-[^"]*"/gi,
                                "$1")); if (b.match(/^<[^<]+cke_(editable|contents)/i)) { var e, d, g = new CKEDITOR.dom.element("div"); for (g.setHtml(b); 1 == g.getChildCount() && (e = g.getFirst()) && e.type == CKEDITOR.NODE_ELEMENT && (e.hasClass("cke_editable") || e.hasClass("cke_contents"));)g = d = e; d && (b = d.getHtml().replace(/<br>$/i, "")) } CKEDITOR.env.ie ? b = b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function (b, e) { return e.toLowerCase() in c ? (a.data.preSniffing = "html", "\x3c" + e) : b }) : CKEDITOR.env.webkit ? b = b.replace(/<\/(\w+)><div><br><\/div>$/, function (b, e) {
                                    return e in
                                        c ? (a.data.endsWithEOL = 1, "\x3c/" + e + "\x3e") : b
                                }) : CKEDITOR.env.gecko && (b = b.replace(/(\s)<br>$/, "$1")); a.data.dataValue = b
                    }, null, null, 3); a.on("paste", function (e) {
                        e = e.data; var d = a._.nextPasteType || e.type, g = e.dataValue, k, h = a.config.clipboard_defaultContentType || "html", m = e.dataTransfer.getTransferType(a) == CKEDITOR.DATA_TRANSFER_EXTERNAL, n = !0 === a.config.forcePasteAsPlainText; k = "html" == d || "html" == e.preSniffing ? "html" : f(g); delete a._.nextPasteType; "htmlifiedtext" == k && (g = b(a.config, g)); if ("text" == d && "html" == k) g =
                            l(a, g, p.get("plain-text")); else if (m && a.pasteFilter && !e.dontFilter || n) g = l(a, g, a.pasteFilter); e.startsWithEOL && (g = '\x3cbr data-cke-eol\x3d"1"\x3e' + g); e.endsWithEOL && (g += '\x3cbr data-cke-eol\x3d"1"\x3e'); "auto" == d && (d = "html" == k || "html" == h ? "html" : "text"); e.type = d; e.dataValue = g; delete e.preSniffing; delete e.startsWithEOL; delete e.endsWithEOL
                    }, null, null, 6); a.on("paste", function (b) { b = b.data; b.dataValue && (a.insertHtml(b.dataValue, b.type, b.range), setTimeout(function () { a.fire("afterPaste") }, 0)) }, null, null,
                        1E3); a.on("pasteDialog", function (b) { setTimeout(function () { a.openDialog("paste", b.data) }, 0) })
                }
            }); CKEDITOR.plugins.clipboard = {
                isCustomCopyCutSupported: CKEDITOR.env.ie && 16 > CKEDITOR.env.version || CKEDITOR.env.iOS && 605 > CKEDITOR.env.version ? !1 : !0, isCustomDataTypesSupported: !CKEDITOR.env.ie || 16 <= CKEDITOR.env.version, isFileApiSupported: !CKEDITOR.env.ie || 9 < CKEDITOR.env.version, mainPasteEvent: CKEDITOR.env.ie && !CKEDITOR.env.edge ? "beforepaste" : "paste", addPasteButton: function (a, b, e) {
                    a.ui.addButton && (a.ui.addButton(b,
                        e), a._.pasteButtons || (a._.pasteButtons = []), a._.pasteButtons.push(b))
                }, canClipboardApiBeTrusted: function (a, b) { return a.getTransferType(b) != CKEDITOR.DATA_TRANSFER_EXTERNAL || CKEDITOR.env.chrome && !a.isEmpty() || CKEDITOR.env.gecko && (a.getData("text/html") || a.getFilesCount()) || CKEDITOR.env.safari && 603 <= CKEDITOR.env.version && !CKEDITOR.env.iOS || CKEDITOR.env.iOS && 605 <= CKEDITOR.env.version || CKEDITOR.env.edge && 16 <= CKEDITOR.env.version ? !0 : !1 }, getDropTarget: function (a) {
                    var b = a.editable(); return CKEDITOR.env.ie &&
                        9 > CKEDITOR.env.version || b.isInline() ? b : a.document
                }, fixSplitNodesAfterDrop: function (a, b, e, d) {
                    function g(a, c, e) { var d = a; d.type == CKEDITOR.NODE_TEXT && (d = a.getParent()); if (d.equals(c) && e != c.getChildCount()) return a = b.startContainer.getChild(b.startOffset - 1), c = b.startContainer.getChild(b.startOffset), a && a.type == CKEDITOR.NODE_TEXT && c && c.type == CKEDITOR.NODE_TEXT && (e = a.getLength(), a.setText(a.getText() + c.getText()), c.remove(), b.setStart(a, e), b.collapse(!0)), !0 } var k = b.startContainer; "number" == typeof d && "number" ==
                        typeof e && k.type == CKEDITOR.NODE_ELEMENT && (g(a.startContainer, k, e) || g(a.endContainer, k, d))
                }, isDropRangeAffectedByDragRange: function (a, b) { var e = b.startContainer, d = b.endOffset; return a.endContainer.equals(e) && a.endOffset <= d || a.startContainer.getParent().equals(e) && a.startContainer.getIndex() < d || a.endContainer.getParent().equals(e) && a.endContainer.getIndex() < d ? !0 : !1 }, internalDrop: function (b, e, d, g) {
                    var k = CKEDITOR.plugins.clipboard, f = g.editable(), h, m; g.fire("saveSnapshot"); g.fire("lockSnapshot", { dontUpdate: 1 });
                    CKEDITOR.env.ie && 10 > CKEDITOR.env.version && this.fixSplitNodesAfterDrop(b, e, k.dragStartContainerChildCount, k.dragEndContainerChildCount); (m = this.isDropRangeAffectedByDragRange(b, e)) || (h = b.createBookmark(!1)); k = e.clone().createBookmark(!1); m && (h = b.createBookmark(!1)); b = h.startNode; e = h.endNode; m = k.startNode; e && b.getPosition(m) & CKEDITOR.POSITION_PRECEDING && e.getPosition(m) & CKEDITOR.POSITION_FOLLOWING && m.insertBefore(b); b = g.createRange(); b.moveToBookmark(h); f.extractHtmlFromRange(b, 1); e = g.createRange();
                    k.startNode.getCommonAncestor(f) || (k = g.getSelection().createBookmarks()[0]); e.moveToBookmark(k); a(g, { dataTransfer: d, method: "drop", range: e }, 1); g.fire("unlockSnapshot")
                }, getRangeAtDropPosition: function (a, b) {
                    var e = a.data.$, d = e.clientX, g = e.clientY, k = b.getSelection(!0).getRanges()[0], f = b.createRange(); if (a.data.testRange) return a.data.testRange; if (document.caretRangeFromPoint && b.document.$.caretRangeFromPoint(d, g)) e = b.document.$.caretRangeFromPoint(d, g), f.setStart(CKEDITOR.dom.node(e.startContainer), e.startOffset),
                        f.collapse(!0); else if (e.rangeParent) f.setStart(CKEDITOR.dom.node(e.rangeParent), e.rangeOffset), f.collapse(!0); else {
                            if (CKEDITOR.env.ie && 8 < CKEDITOR.env.version && k && b.editable().hasFocus) return k; if (document.body.createTextRange) {
                                b.focus(); e = b.document.getBody().$.createTextRange(); try {
                                    for (var h = !1, m = 0; 20 > m && !h; m++) { if (!h) try { e.moveToPoint(d, g - m), h = !0 } catch (l) { } if (!h) try { e.moveToPoint(d, g + m), h = !0 } catch (t) { } } if (h) {
                                        var y = "cke-temp-" + (new Date).getTime(); e.pasteHTML('\x3cspan id\x3d"' + y + '"\x3e​\x3c/span\x3e');
                                        var z = b.document.getById(y); f.moveToPosition(z, CKEDITOR.POSITION_BEFORE_START); z.remove()
                                    } else { var B = b.document.$.elementFromPoint(d, g), C = new CKEDITOR.dom.element(B), E; if (C.equals(b.editable()) || "html" == C.getName()) return k && k.startContainer && !k.startContainer.equals(b.editable()) ? k : null; E = C.getClientRect(); d < E.left ? f.setStartAt(C, CKEDITOR.POSITION_AFTER_START) : f.setStartAt(C, CKEDITOR.POSITION_BEFORE_END); f.collapse(!0) }
                                } catch (G) { return null }
                            } else return null
                        } return f
                }, initDragDataTransfer: function (a,
                    b) { var e = a.data.$ ? a.data.$.dataTransfer : null, d = new this.dataTransfer(e, b); "dragstart" === a.name && d.storeId(); e ? this.dragData && d.id == this.dragData.id ? d = this.dragData : this.dragData = d : this.dragData ? d = this.dragData : this.dragData = d; a.data.dataTransfer = d }, resetDragDataTransfer: function () { this.dragData = null }, initPasteDataTransfer: function (a, b) {
                        if (this.isCustomCopyCutSupported) {
                            if (a && a.data && a.data.$) {
                                var e = a.data.$.clipboardData, d = new this.dataTransfer(e, b); "copy" !== a.name && "cut" !== a.name || d.storeId(); this.copyCutData &&
                                    d.id == this.copyCutData.id ? (d = this.copyCutData, d.$ = e) : this.copyCutData = d; return d
                            } return new this.dataTransfer(null, b)
                        } return new this.dataTransfer(CKEDITOR.env.edge && a && a.data.$ && a.data.$.clipboardData || null, b)
                    }, preventDefaultDropOnElement: function (a) { a && a.on("dragover", m) }
            }; e = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? "cke/id" : "Text"; CKEDITOR.plugins.clipboard.dataTransfer = function (a, b) {
                a && (this.$ = a); this._ = {
                    metaRegExp: /^<meta.*?>/i, fragmentRegExp: /\s*\x3c!--StartFragment--\x3e|\x3c!--EndFragment--\x3e\s*/g,
                    types: [], data: {}, files: [], nativeHtmlCache: "", normalizeType: function (a) { a = a.toLowerCase(); return "text" == a || "text/plain" == a ? "Text" : "url" == a ? "URL" : "files" === a ? "Files" : a }
                }; this._.fallbackDataTransfer = new CKEDITOR.plugins.clipboard.fallbackDataTransfer(this); this.id = this.getData(e); this.id || (this.id = "Text" == e ? "" : "cke-" + CKEDITOR.tools.getUniqueId()); b && (this.sourceEditor = b, this.setData("text/html", b.getSelectedHtml(1)), "Text" == e || this.getData("text/plain") || this.setData("text/plain", b.getSelection().getSelectedText()))
            };
            CKEDITOR.DATA_TRANSFER_INTERNAL = 1; CKEDITOR.DATA_TRANSFER_CROSS_EDITORS = 2; CKEDITOR.DATA_TRANSFER_EXTERNAL = 3; CKEDITOR.plugins.clipboard.dataTransfer.prototype = {
                getData: function (a, b) {
                    a = this._.normalizeType(a); var e = "text/html" == a && b ? this._.nativeHtmlCache : this._.data[a]; if (void 0 === e || null === e || "" === e) { if (this._.fallbackDataTransfer.isRequired()) e = this._.fallbackDataTransfer.getData(a, b); else try { e = this.$.getData(a) || "" } catch (d) { e = "" } "text/html" != a || b || (e = this._stripHtml(e)) } "Text" == a && CKEDITOR.env.gecko &&
                        this.getFilesCount() && "file://" == e.substring(0, 7) && (e = ""); if ("string" === typeof e) var g = e.indexOf("\x3c/html\x3e"), e = -1 !== g ? e.substring(0, g + 7) : e; return e
                }, setData: function (a, b) {
                    a = this._.normalizeType(a); "text/html" == a ? (this._.data[a] = this._stripHtml(b), this._.nativeHtmlCache = b) : this._.data[a] = b; if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported || "URL" == a || "Text" == a) if ("Text" == e && "Text" == a && (this.id = b), this._.fallbackDataTransfer.isRequired()) this._.fallbackDataTransfer.setData(a, b); else try {
                        this.$.setData(a,
                            b)
                    } catch (d) { }
                }, storeId: function () { "Text" !== e && this.setData(e, this.id) }, getTransferType: function (a) { return this.sourceEditor ? this.sourceEditor == a ? CKEDITOR.DATA_TRANSFER_INTERNAL : CKEDITOR.DATA_TRANSFER_CROSS_EDITORS : CKEDITOR.DATA_TRANSFER_EXTERNAL }, cacheData: function () {
                    function a(c) { c = b._.normalizeType(c); var e = b.getData(c); "text/html" == c && (b._.nativeHtmlCache = b.getData(c, !0), e = b._stripHtml(e)); e && (b._.data[c] = e); b._.types.push(c) } if (this.$) {
                        var b = this, e, d, g; if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) {
                            if (this.$.types) for (e =
                                0; e < this.$.types.length; e++)a(this.$.types[e])
                        } else a("Text"), a("URL"); d = this._getImageFromClipboard(); if ((g = this.$ && this.$.files || null) || d) { this._.files = []; if (g && g.length) for (e = 0; e < g.length; e++)this._.files.push(g[e]); 0 === this._.files.length && d && this._.files.push(d) }
                    }
                }, getFilesCount: function () { if (this._.files.length) return this._.files.length; var a = this.$ && this.$.files || null; return a && a.length ? a.length : this._getImageFromClipboard() ? 1 : 0 }, getFile: function (a) {
                    if (this._.files.length) return this._.files[a];
                    var b = this.$ && this.$.files || null; return b && b.length ? b[a] : 0 === a ? this._getImageFromClipboard() : void 0
                }, isFileTransfer: function () { var a = this.getTypes(), a = CKEDITOR.tools.array.filter(a, function (a) { return "application/x-moz-file" !== a }); return 1 === a.length && "files" === a[0].toLowerCase() }, isEmpty: function () {
                    var a = {}, b; if (this.getFilesCount()) return !1; CKEDITOR.tools.array.forEach(CKEDITOR.tools.object.keys(this._.data), function (b) { a[b] = 1 }); if (this.$) if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) {
                        if (this.$.types) for (var d =
                            0; d < this.$.types.length; d++)a[this.$.types[d]] = 1
                    } else a.Text = 1, a.URL = 1; "Text" != e && (a[e] = 0); for (b in a) if (a[b] && "" !== this.getData(b)) return !1; return !0
                }, getTypes: function () { return 0 < this._.types.length ? this._.types : this.$ && this.$.types ? [].slice.call(this.$.types) : [] }, _getImageFromClipboard: function () { var a; try { if (this.$ && this.$.items && this.$.items[0] && (a = this.$.items[0].getAsFile()) && a.type) return a } catch (b) { } }, _stripHtml: function (a) {
                    function b(a) {
                        var e = new CKEDITOR.htmlParser, c, d; e.onTagOpen = function (a) {
                            "body" ===
                            a && (c = e._.htmlPartsRegex.lastIndex)
                        }; e.onTagClose = function (a) { "body" === a && (d = e._.htmlPartsRegex.lastIndex) }; e.parse(a); return "number" !== typeof c || "number" !== typeof d ? a : a.substring(c, d).replace(/<\/body\s*>$/gi, "")
                    } a && a.length && (a = b(a), a = a.replace(this._.metaRegExp, ""), a = a.replace(this._.fragmentRegExp, "")); return a
                }
            }; CKEDITOR.plugins.clipboard.fallbackDataTransfer = function (a) { this._dataTransfer = a; this._customDataFallbackType = "text/html" }; CKEDITOR.plugins.clipboard.fallbackDataTransfer._isCustomMimeTypeSupported =
                null; CKEDITOR.plugins.clipboard.fallbackDataTransfer._customTypes = []; CKEDITOR.plugins.clipboard.fallbackDataTransfer.prototype = {
                    isRequired: function () {
                        var a = CKEDITOR.plugins.clipboard.fallbackDataTransfer, b = this._dataTransfer.$; if (null === a._isCustomMimeTypeSupported) if (b) { a._isCustomMimeTypeSupported = !1; if (CKEDITOR.env.edge && 17 <= CKEDITOR.env.version) return !0; try { b.setData("cke/mimetypetest", "cke test value"), a._isCustomMimeTypeSupported = "cke test value" === b.getData("cke/mimetypetest"), b.clearData("cke/mimetypetest") } catch (e) { } } else return !1;
                        return !a._isCustomMimeTypeSupported
                    }, getData: function (a, b) { var e = this._getData(this._customDataFallbackType, !0); if (b) return e; var e = this._extractDataComment(e), d = null, d = a === this._customDataFallbackType ? e.content : e.data && e.data[a] ? e.data[a] : this._getData(a, !0); return null !== d ? d : "" }, setData: function (a, b) {
                        var e = a === this._customDataFallbackType; e && (b = this._applyDataComment(b, this._getFallbackTypeData())); var d = b, g = this._dataTransfer.$; try { g.setData(a, d), e && (this._dataTransfer._.nativeHtmlCache = d) } catch (k) {
                            if (this._isUnsupportedMimeTypeError(k)) {
                                e =
                                CKEDITOR.plugins.clipboard.fallbackDataTransfer; -1 === CKEDITOR.tools.indexOf(e._customTypes, a) && e._customTypes.push(a); var e = this._getFallbackTypeContent(), f = this._getFallbackTypeData(); f[a] = d; try { d = this._applyDataComment(e, f), g.setData(this._customDataFallbackType, d), this._dataTransfer._.nativeHtmlCache = d } catch (h) { d = "" }
                            }
                        } return d
                    }, _getData: function (a, b) { var e = this._dataTransfer._.data; if (!b && e[a]) return e[a]; try { return this._dataTransfer.$.getData(a) } catch (d) { return null } }, _getFallbackTypeContent: function () {
                        var a =
                            this._dataTransfer._.data[this._customDataFallbackType]; a || (a = this._extractDataComment(this._getData(this._customDataFallbackType, !0)).content); return a
                    }, _getFallbackTypeData: function () { var a = CKEDITOR.plugins.clipboard.fallbackDataTransfer._customTypes, b = this._extractDataComment(this._getData(this._customDataFallbackType, !0)).data || {}, e = this._dataTransfer._.data; CKEDITOR.tools.array.forEach(a, function (a) { void 0 !== e[a] ? b[a] = e[a] : void 0 !== b[a] && (b[a] = b[a]) }, this); return b }, _isUnsupportedMimeTypeError: function (a) {
                        return a.message &&
                            -1 !== a.message.search(/element not found/gi)
                    }, _extractDataComment: function (a) { var b = { data: null, content: a || "" }; if (a && 16 < a.length) { var e; (e = /\x3c!--cke-data:(.*?)--\x3e/g.exec(a)) && e[1] && (b.data = JSON.parse(decodeURIComponent(e[1])), b.content = a.replace(e[0], "")) } return b }, _applyDataComment: function (a, b) { var e = ""; b && CKEDITOR.tools.object.keys(b).length && (e = "\x3c!--cke-data:" + encodeURIComponent(JSON.stringify(b)) + "--\x3e"); return e + (a && a.length ? a : "") }
                }
        })(); CKEDITOR.config.clipboard_notificationDuration =
            1E4; CKEDITOR.config.clipboard_handleImages = !0; CKEDITOR.plugins.add("panelbutton", {
                requires: "button", onLoad: function () {
                    function a(a) { var f = this._; f.state != CKEDITOR.TRISTATE_DISABLED && (this.createPanel(a), f.on ? f.panel.hide() : f.panel.showBlock(this._.id, this.document.getById(this._.id), 4)) } CKEDITOR.ui.panelButton = CKEDITOR.tools.createClass({
                        base: CKEDITOR.ui.button, $: function (h) {
                            var f = h.panel || {}; delete h.panel; this.base(h); this.document = f.parent && f.parent.getDocument() || CKEDITOR.document; f.block = { attributes: f.attributes };
                            f.toolbarRelated = !0; this.hasArrow = "listbox"; this.click = a; this._ = { panelDefinition: f }
                        }, statics: { handler: { create: function (a) { return new CKEDITOR.ui.panelButton(a) } } }, proto: {
                            createPanel: function (a) {
                                var f = this._; if (!f.panel) {
                                    var b = this._.panelDefinition, d = this._.panelDefinition.block, l = b.parent || CKEDITOR.document.getBody(), k = this._.panel = new CKEDITOR.ui.floatPanel(a, l, b), b = k.addBlock(f.id, d), m = this, g = a.getCommand(this.command); k.onShow = function () {
                                        m.className && this.element.addClass(m.className + "_panel");
                                        m.setState(CKEDITOR.TRISTATE_ON); f.on = 1; m.editorFocus && a.focus(); if (m.onOpen) m.onOpen()
                                    }; k.onHide = function (b) { m.className && this.element.getFirst().removeClass(m.className + "_panel"); !m.modes && g ? m.setStateFromCommand(g) : m.setState(m.modes && m.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); f.on = 0; if (!b && m.onClose) m.onClose() }; k.onEscape = function () { k.hide(1); m.document.getById(f.id).focus() }; if (this.onBlock) this.onBlock(k, b); b.onHide = function () {
                                        f.on = 0; !m.modes && m.command ? m.setStateFromCommand(g) :
                                            m.setState(CKEDITOR.TRISTATE_OFF)
                                    }
                                }
                            }, setStateFromCommand: function (a) { this.setState(a.state) }
                        }
                    })
                }, beforeInit: function (a) { a.ui.addHandler(CKEDITOR.UI_PANELBUTTON, CKEDITOR.ui.panelButton.handler) }
            }); CKEDITOR.UI_PANELBUTTON = "panelbutton"; (function () {
                CKEDITOR.plugins.add("panel", { beforeInit: function (a) { a.ui.addHandler(CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler) } }); CKEDITOR.UI_PANEL = "panel"; CKEDITOR.ui.panel = function (a, d) {
                    d && CKEDITOR.tools.extend(this, d); CKEDITOR.tools.extend(this, { className: "", css: [] });
                    this.id = CKEDITOR.tools.getNextId(); this.document = a; this.isFramed = this.forceIFrame || this.css.length; this._ = { blocks: {} }
                }; CKEDITOR.ui.panel.handler = { create: function (a) { return new CKEDITOR.ui.panel(a) } }; var a = CKEDITOR.addTemplate("panel", '\x3cdiv lang\x3d"{langCode}" id\x3d"{id}" dir\x3d{dir} class\x3d"cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style\x3d"z-index:{z-index}" role\x3d"presentation"\x3e{frame}\x3c/div\x3e'), h = CKEDITOR.addTemplate("panel-frame", '\x3ciframe id\x3d"{id}" class\x3d"cke_panel_frame" role\x3d"presentation" frameborder\x3d"0" src\x3d"{src}"\x3e\x3c/iframe\x3e'),
                    f = CKEDITOR.addTemplate("panel-frame-inner", '\x3c!DOCTYPE html\x3e\x3chtml class\x3d"cke_panel_container {env}" dir\x3d"{dir}" lang\x3d"{langCode}"\x3e\x3chead\x3e{css}\x3c/head\x3e\x3cbody class\x3d"cke_{dir}" style\x3d"margin:0;padding:0" onload\x3d"{onload}"\x3e\x3c/body\x3e\x3c/html\x3e'); CKEDITOR.ui.panel.prototype = {
                        render: function (b, d) {
                            var l = { editorId: b.id, id: this.id, langCode: b.langCode, dir: b.lang.dir, cls: this.className, frame: "", env: CKEDITOR.env.cssClass, "z-index": b.config.baseFloatZIndex + 1 };
                            this.getHolderElement = function () {
                                var a = this._.holder; if (!a) {
                                    if (this.isFramed) {
                                        var a = this.document.getById(this.id + "_frame"), b = a.getParent(), a = a.getFrameDocument(); CKEDITOR.env.iOS && b.setStyles({ overflow: "scroll", "-webkit-overflow-scrolling": "touch" }); b = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function () { this.isLoaded = !0; if (this.onLoad) this.onLoad() }, this)); a.write(f.output(CKEDITOR.tools.extend({
                                            css: CKEDITOR.tools.buildStyleHtml(this.css), onload: "window.parent.CKEDITOR.tools.callFunction(" +
                                                b + ");"
                                        }, l))); a.getWindow().$.CKEDITOR = CKEDITOR; a.on("keydown", function (a) { var b = a.data.getKeystroke(), d = this.document.getById(this.id).getAttribute("dir"); if ("input" !== a.data.getTarget().getName() || 37 !== b && 39 !== b) this._.onKeyDown && !1 === this._.onKeyDown(b) ? "input" === a.data.getTarget().getName() && 32 === b || a.data.preventDefault() : (27 == b || b == ("rtl" == d ? 39 : 37)) && this.onEscape && !1 === this.onEscape(b) && a.data.preventDefault() }, this); a = a.getBody(); a.unselectable(); CKEDITOR.env.air && CKEDITOR.tools.callFunction(b)
                                    } else a =
                                        this.document.getById(this.id); this._.holder = a
                                } return a
                            }; if (this.isFramed) { var k = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie && !CKEDITOR.env.edge ? "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())" : ""; l.frame = h.output({ id: this.id + "_frame", src: k }) } k = a.output(l); d && d.push(k); return k
                        }, addBlock: function (a, d) {
                            d = this._.blocks[a] = d instanceof CKEDITOR.ui.panel.block ? d : new CKEDITOR.ui.panel.block(this.getHolderElement(), d);
                            this._.currentBlock || this.showBlock(a); return d
                        }, getBlock: function (a) { return this._.blocks[a] }, showBlock: function (a) { a = this._.blocks[a]; var d = this._.currentBlock, f = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder : this.document.getById(this.id + "_frame"); d && d.hide(); this._.currentBlock = a; CKEDITOR.fire("ariaWidget", f); a._.focusIndex = -1; this._.onKeyDown = a.onKeyDown && CKEDITOR.tools.bind(a.onKeyDown, a); a.show(); return a }, destroy: function () { this.element && this.element.remove() }
                    }; CKEDITOR.ui.panel.block = CKEDITOR.tools.createClass({
                        $: function (a,
                            d) { this.element = a.append(a.getDocument().createElement("div", { attributes: { tabindex: -1, "class": "cke_panel_block" }, styles: { display: "none" } })); d && CKEDITOR.tools.extend(this, d); this.element.setAttributes({ role: this.attributes.role || "presentation", "aria-label": this.attributes["aria-label"], title: this.attributes.title || this.attributes["aria-label"] }); this.keys = {}; this._.focusIndex = -1; this.element.disableContextMenu() }, _: {
                                markItem: function (a) {
                                    -1 != a && (a = this._.getItems().getItem(this._.focusIndex = a), CKEDITOR.env.webkit &&
                                        a.getDocument().getWindow().focus(), a.focus(), this.onMark && this.onMark(a))
                                }, markFirstDisplayed: function (a) { for (var d = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && "none" == a.getStyle("display") }, f = this._.getItems(), k, h, g = f.count() - 1; 0 <= g; g--)if (k = f.getItem(g), k.getAscendant(d) || (h = k, this._.focusIndex = g), "true" == k.getAttribute("aria-selected")) { h = k; this._.focusIndex = g; break } h && (a && a(), CKEDITOR.env.webkit && h.getDocument().getWindow().focus(), h.focus(), this.onMark && this.onMark(h)) }, getItems: function () { return this.element.find("a,input") }
                            },
                        proto: {
                            show: function () { this.element.setStyle("display", "") }, hide: function () { this.onHide && !0 === this.onHide.call(this) || this.element.setStyle("display", "none") }, onKeyDown: function (a, d) {
                                var f = this.keys[a]; switch (f) {
                                    case "next": for (var k = this._.focusIndex, f = this._.getItems(), h; h = f.getItem(++k);)if (h.getAttribute("_cke_focus") && h.$.offsetWidth) { this._.focusIndex = k; h.focus(!0); break } return h || d ? !1 : (this._.focusIndex = -1, this.onKeyDown(a, 1)); case "prev": k = this._.focusIndex; for (f = this._.getItems(); 0 < k && (h =
                                        f.getItem(--k));) { if (h.getAttribute("_cke_focus") && h.$.offsetWidth) { this._.focusIndex = k; h.focus(!0); break } h = null } return h || d ? !1 : (this._.focusIndex = f.count(), this.onKeyDown(a, 1)); case "click": case "mouseup": return k = this._.focusIndex, (h = 0 <= k && this._.getItems().getItem(k)) && h.fireEventHandler(f, { button: CKEDITOR.tools.normalizeMouseButton(CKEDITOR.MOUSE_BUTTON_LEFT, !0) }), !1
                                }return !0
                            }
                        }
                    })
            })(); CKEDITOR.plugins.add("floatpanel", { requires: "panel" }); (function () {
                function a(a, b, d, l, k) {
                    k = CKEDITOR.tools.genKey(b.getUniqueId(),
                        d.getUniqueId(), a.lang.dir, a.uiColor || "", l.css || "", k || ""); var m = h[k]; m || (m = h[k] = new CKEDITOR.ui.panel(b, l), m.element = d.append(CKEDITOR.dom.element.createFromHtml(m.render(a), b)), m.element.setStyles({ display: "none", position: "absolute" })); return m
                } var h = {}; CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass({
                    $: function (f, b, d, h) {
                        function k() { c.hide() } d.forceIFrame = 1; d.toolbarRelated && f.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (b = CKEDITOR.document.getById("cke_" + f.name)); var m = b.getDocument(); h = a(f, m,
                            b, d, h || 0); var g = h.element, e = g.getFirst(), c = this; g.disableContextMenu(); this.element = g; this._ = { editor: f, panel: h, parentElement: b, definition: d, document: m, iframe: e, children: [], dir: f.lang.dir, showBlockParams: null, markFirst: void 0 !== d.markFirst ? d.markFirst : !0 }; f.on("mode", k); f.on("resize", k); m.getWindow().on("resize", function () { this.reposition() }, this)
                    }, proto: {
                        addBlock: function (a, b) { return this._.panel.addBlock(a, b) }, addListBlock: function (a, b) { return this._.panel.addListBlock(a, b) }, getBlock: function (a) { return this._.panel.getBlock(a) },
                        showBlock: function (a, b, d, h, k, m) {
                            var g = this._.panel, e = g.showBlock(a); this._.showBlockParams = [].slice.call(arguments); this.allowBlur(!1); var c = this._.editor.editable(); this._.returnFocus = c.hasFocus ? c : new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement); this._.hideTimeout = 0; var n = this.element, c = this._.iframe, c = CKEDITOR.env.ie && !CKEDITOR.env.edge ? c : new CKEDITOR.dom.window(c.$.contentWindow), u = n.getDocument(), w = this._.parentElement.getPositionedAncestor(), p = b.getDocumentPosition(u), u = w ? w.getDocumentPosition(u) :
                                { x: 0, y: 0 }, q = "rtl" == this._.dir, r = p.x + (h || 0) - u.x, A = p.y + (k || 0) - u.y; !q || 1 != d && 4 != d ? q || 2 != d && 3 != d || (r += b.$.offsetWidth - 1) : r += b.$.offsetWidth; if (3 == d || 4 == d) A += b.$.offsetHeight - 1; this._.panel._.offsetParentId = b.getId(); n.setStyles({ top: A + "px", left: 0, display: "" }); n.setOpacity(0); n.getFirst().removeStyle("width"); this._.editor.focusManager.add(c); this._.blurSet || (CKEDITOR.event.useCapture = !0, c.on("blur", function (a) {
                                    function b() { delete this._.returnFocus; this.hide() } this.allowBlur() && a.data.getPhase() == CKEDITOR.EVENT_PHASE_AT_TARGET &&
                                        this.visible && !this._.activeChild && (CKEDITOR.env.iOS ? this._.hideTimeout || (this._.hideTimeout = CKEDITOR.tools.setTimeout(b, 0, this)) : b.call(this))
                                }, this), c.on("focus", function () { this._.focused = !0; this.hideChild(); this.allowBlur(!0) }, this), CKEDITOR.env.iOS && (c.on("touchstart", function () { clearTimeout(this._.hideTimeout) }, this), c.on("touchend", function () { this._.hideTimeout = 0; this.focus() }, this)), CKEDITOR.event.useCapture = !1, this._.blurSet = 1); g.onEscape = CKEDITOR.tools.bind(function (a) {
                                    if (this.onEscape &&
                                        !1 === this.onEscape(a)) return !1
                                }, this); CKEDITOR.tools.setTimeout(function () {
                                    var a = CKEDITOR.tools.bind(function () {
                                        var a = n; a.removeStyle("width"); if (e.autoSize) {
                                            var b = e.element.getDocument(), b = (CKEDITOR.env.webkit || CKEDITOR.env.edge ? e.element : b.getBody()).$.scrollWidth; CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetWidth || 0) - (a.$.clientWidth || 0) + 3); a.setStyle("width", b + 10 + "px"); b = e.element.$.scrollHeight; CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetHeight || 0) - (a.$.clientHeight ||
                                                0) + 3); a.setStyle("height", b + "px"); g._.currentBlock.element.setStyle("display", "none").removeStyle("display")
                                        } else a.removeStyle("height"); q && (r -= n.$.offsetWidth); n.setStyle("left", r + "px"); var b = g.element.getWindow(), a = n.$.getBoundingClientRect(), b = b.getViewPaneSize(), c = a.width || a.right - a.left, d = a.height || a.bottom - a.top, k = q ? a.right : b.width - a.left, f = q ? b.width - a.right : a.left; q ? k < c && (r = f > c ? r + c : b.width > c ? r - a.left : r - a.right + b.width) : k < c && (r = f > c ? r - c : b.width > c ? r - a.right + b.width : r - a.left); c = a.top; b.height -
                                            a.top < d && (A = c > d ? A - d : b.height > d ? A - a.bottom + b.height : A - a.top); CKEDITOR.env.ie && !CKEDITOR.env.edge && ((b = a = n.$.offsetParent && new CKEDITOR.dom.element(n.$.offsetParent)) && "html" == b.getName() && (b = b.getDocument().getBody()), b && "rtl" == b.getComputedStyle("direction") && (r = CKEDITOR.env.ie8Compat ? r - 2 * n.getDocument().getDocumentElement().$.scrollLeft : r - (a.$.scrollWidth - a.$.clientWidth))); var a = n.getFirst(), h; (h = a.getCustomData("activePanel")) && h.onHide && h.onHide.call(this, 1); a.setCustomData("activePanel", this);
                                        n.setStyles({ top: A + "px", left: r + "px" }); n.setOpacity(1); m && m()
                                    }, this); g.isLoaded ? a() : g.onLoad = a; CKEDITOR.tools.setTimeout(function () {
                                        var a = CKEDITOR.env.webkit && CKEDITOR.document.getWindow().getScrollPosition().y; this.focus(); e.element.focus(); CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = a); this.allowBlur(!0); this._.markFirst && (CKEDITOR.env.ie ? CKEDITOR.tools.setTimeout(function () { e.markFirstDisplayed ? e.markFirstDisplayed() : e._.markFirstDisplayed() }, 0) : e.markFirstDisplayed ? e.markFirstDisplayed() :
                                            e._.markFirstDisplayed()); this._.editor.fire("panelShow", this)
                                    }, 0, this)
                                }, CKEDITOR.env.air ? 200 : 0, this); this.visible = 1; this.onShow && this.onShow.call(this)
                        }, reposition: function () { var a = this._.showBlockParams; this.visible && this._.showBlockParams && (this.hide(), this.showBlock.apply(this, a)) }, focus: function () { if (CKEDITOR.env.webkit) { var a = CKEDITOR.document.getActive(); a && !a.equals(this._.iframe) && a.$.blur() } (this._.lastFocused || this._.iframe.getFrameDocument().getWindow()).focus() }, blur: function () {
                            var a =
                                this._.iframe.getFrameDocument().getActive(); a && a.is("a") && (this._.lastFocused = a)
                        }, hide: function (a) {
                            if (this.visible && (!this.onHide || !0 !== this.onHide.call(this))) {
                                this.hideChild(); CKEDITOR.env.gecko && this._.iframe.getFrameDocument().$.activeElement.blur(); this.element.setStyle("display", "none"); this.visible = 0; this.element.getFirst().removeCustomData("activePanel"); if (a = a && this._.returnFocus) CKEDITOR.env.webkit && a.type && a.getWindow().$.focus(), a.focus(); delete this._.lastFocused; this._.showBlockParams =
                                    null; this._.editor.fire("panelHide", this)
                            }
                        }, allowBlur: function (a) { var b = this._.panel; void 0 !== a && (b.allowBlur = a); return b.allowBlur }, showAsChild: function (a, b, d, h, k, m) {
                            if (this._.activeChild != a || a._.panel._.offsetParentId != d.getId()) this.hideChild(), a.onHide = CKEDITOR.tools.bind(function () { CKEDITOR.tools.setTimeout(function () { this._.focused || this.hide() }, 0, this) }, this), this._.activeChild = a, this._.focused = !1, a.showBlock(b, d, h, k, m), this.blur(), (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && setTimeout(function () {
                                a.element.getChild(0).$.style.cssText +=
                                ""
                            }, 100)
                        }, hideChild: function (a) { var b = this._.activeChild; b && (delete b.onHide, delete this._.activeChild, b.hide(), a && this.focus()) }
                    }
                }); CKEDITOR.on("instanceDestroyed", function () { var a = CKEDITOR.tools.isEmpty(CKEDITOR.instances), b; for (b in h) { var d = h[b]; a ? d.destroy() : d.element.hide() } a && (h = {}) })
            })(); (function () {
                var a, h, f; CKEDITOR.plugins.add("colorbutton", {
                    requires: "panelbutton,floatpanel", init: function (b) {
                        function d(c) {
                            function d() {
                                var a = b.config["colorButton_" + r + "Style"]; a.childRule = "back" == r ? function (a) { return k(a) } :
                                    function (a) { return !(a.is("a") || a.getElementsByTag("a").count()) || k(a) }; return a
                            } function n(a, e, c) { var g = {}; a && (g.color = a); e && (g.colorName = e); e = !CKEDITOR.tools.isEmpty(g) && new CKEDITOR.style(d(), g); b.execCommand(D, { newStyle: e }); if (a && c) for (c.addColor(a.substr(1).toUpperCase()), a = G.element.find("[role\x3doption]").toArray(), c = 0; c < a.length; c++)a[c].setAttributes({ "aria-posinset": c + 1, "aria-setsize": a.length }) } var q = c.name, r = c.type, A = c.title, v = c.order, D = c.commandName; c = c.contentTransformations || {}; var t =
                                new CKEDITOR.style(g["colorButton_" + r + "Style"]), y = CKEDITOR.tools.getNextId() + "_colorBox", z = { type: r }, B = new CKEDITOR.style(g["colorButton_" + r + "Style"], { color: "inherit" }), C = function () { return CKEDITOR.tools.addFunction(function (a, e, c) { b.focus(); b.fire("saveSnapshot"); "?" == a ? b.getColorFromDialog(function (a) { a && n(a, e, E) }, null, z) : n(a && "#" + a, e, E); c && (c.setAttribute("cke_colorlast", !0), b.once("selectionChange", function () { c.removeAttribute("cke_colorlast") })) }) }(), E = f.getRowLimit(b) ? new f(b, "back" == r ? "background-color" :
                                    "color", C) : void 0, G; b.addCommand(D, { contextSensitive: !0, exec: function (a, b) { if (!a.readOnly) { var e = b.newStyle; a.removeStyle(B); a.focus(); e && a.applyStyle(e); a.fire("saveSnapshot") } }, refresh: function (a, b) { B.checkApplicable(b, a, a.activeFilter) ? B.checkActive(b, a) ? this.setState(CKEDITOR.TRISTATE_ON) : this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED) } }); b.ui.add(q, CKEDITOR.UI_PANELBUTTON, {
                                        label: A, title: A, command: D, editorFocus: 0, toolbar: "colors," + v, allowedContent: t, requiredContent: t,
                                        contentTransformations: c, panel: { css: CKEDITOR.skin.getPath("editor"), attributes: { role: "listbox", "aria-label": e.panelTitle } }, select: function (b) { var e = g.colorButton_colors.split(","); b = CKEDITOR.tools.array.find(e, b); b = a.normalizeColor(b); m(G, b); G._.markFirstDisplayed() }, onBlock: function (a, e) {
                                            G = e; e.autoSize = !0; e.element.addClass("cke_colorblock"); e.element.setHtml(h(y, C, E ? E.getLength() : 0)); e.element.getDocument().getBody().setStyle("overflow", "hidden"); e.element.getAscendant({ html: 1 }).setStyle("overflow",
                                                "hidden"); CKEDITOR.ui.fire("ready", this); var c = e.keys, d = "rtl" == b.lang.dir; c[d ? 37 : 39] = "next"; c[40] = "next"; c[9] = "next"; c[d ? 39 : 37] = "prev"; c[38] = "prev"; c[CKEDITOR.SHIFT + 9] = "prev"; c[32] = "click"; E && E.setContainer(e.element.findOne(".cke_colorhistory"))
                                        }, onOpen: function () {
                                            var e = b.getSelection(), c = e && e.getStartElement(), d = b.elementPath(c), k = "back" == r ? "background-color" : "color"; if (d) {
                                                c = d.block || d.blockLimit || b.document.getBody(); do d = c && c.getComputedStyle(k) || "transparent"; while ("back" == r && "transparent" ==
                                                    d && c && (c = c.getParent())); d && "transparent" != d || (d = "#ffffff"); g.colorButton_enableAutomatic && G.element.findOne("#" + y).setStyle("background-color", d); if (c = e && e.getRanges()[0]) {
                                                        for (var e = new CKEDITOR.dom.walker(c), f = c.collapsed ? c.startContainer : e.next(), c = ""; f;) { f.type !== CKEDITOR.NODE_ELEMENT && (f = f.getParent()); f = a.normalizeColor(f.getComputedStyle(k)); c = c || f; if (c !== f) { c = ""; break } f = e.next() } "transparent" == c && (c = ""); "fore" == r && (z.automaticTextColor = "#" + a.normalizeColor(d)); z.selectionColor = c ? "#" + c : "";
                                                        m(G, c)
                                                    } return d
                                            }
                                        }
                                    })
                        } function h(c, d, k) {
                            var m = [], l = g.colorButton_colors.split(","), n = b.plugins.colordialog && g.colorButton_enableMore; k = l.length + k + (n ? 1 : 0); var v = 1; g.colorButton_enableAutomatic && (k += 1, v += 1, m.push('\x3ca class\x3d"cke_colorauto" _cke_focus\x3d1 hidefocus\x3dtrue', ' title\x3d"', e.auto, '"', ' draggable\x3d"false"', ' ondragstart\x3d"return false;"', ' onclick\x3d"CKEDITOR.tools.callFunction(', d, ',null);return false;"', " href\x3d\"javascript:void('", e.auto, "')\"", ' role\x3d"option" aria-posinset\x3d"1" aria-setsize\x3d"',
                                k, '"\x3e', '\x3ctable role\x3d"presentation" cellspacing\x3d0 cellpadding\x3d0 width\x3d"100%"\x3e', "\x3ctr\x3e", '\x3ctd colspan\x3d"', b.config.colorButton_colorsPerRow, '" align\x3d"center"\x3e', '\x3cspan class\x3d"cke_colorbox" id\x3d"', c, '"\x3e\x3c/span\x3e', e.auto, "\x3c/td\x3e", "\x3c/tr\x3e", "\x3c/table\x3e", "\x3c/a\x3e")); m.push('\x3ctable role\x3d"presentation" cellspacing\x3d0 cellpadding\x3d0 width\x3d"100%"\x3e\x3ctbody\x3e'); for (c = 0; c < l.length; c++) {
                                    0 === c % b.config.colorButton_colorsPerRow &&
                                    m.push("\x3c/tr\x3e\x3ctr\x3e"); var D = l[c].split("/"), t = D[0], D = new a(b, { color: D[1] || t, label: D[1] ? t : void 0 }, d); D.setPositionIndex(v + c, k); m.push(D.getHtml())
                                } f.getRowLimit(b) && f.renderContainer(m, b); n && m.push("\x3c/tr\x3e", "\x3ctr\x3e", '\x3ctd colspan\x3d"', b.config.colorButton_colorsPerRow, '" align\x3d"center"\x3e', '\x3ca class\x3d"cke_colormore" _cke_focus\x3d1 hidefocus\x3dtrue', ' title\x3d"', e.more, '"', ' draggable\x3d"false"', ' ondragstart\x3d"return false;"', ' onclick\x3d"CKEDITOR.tools.callFunction(',
                                    d, ",'?');return false;\"", " href\x3d\"javascript:void('", e.more, "')\"", ' role\x3d"option" aria-posinset\x3d"', k, '" aria-setsize\x3d"', k, '"\x3e', e.more, "\x3c/a\x3e", "\x3c/td\x3e"); m.push("\x3c/tr\x3e\x3c/tbody\x3e\x3c/table\x3e"); return m.join("")
                        } function k(a) { return "false" == a.getAttribute("contentEditable") || a.getAttribute("data-nostyle") } function m(b, e) {
                            var c = b._.getItems(), d = b.element.findOne("[aria-selected]"), g = b.element.findOne("[cke_colorlast]"); d && d.removeAttribute("aria-selected"); if (g) g.setAttribute("aria-selected",
                                !0); else for (d = 0; d < c.count(); d++)if (g = c.getItem(d), e && e == a.normalizeColor(g.getAttribute("data-value"))) { g.setAttribute("aria-selected", !0); break }
                        } var g = b.config, e = b.lang.colorbutton; if (!CKEDITOR.env.hc) {
                            d({ name: "TextColor", type: "fore", commandName: "textColor", title: e.textColorTitle, order: 10, contentTransformations: [[{ element: "font", check: "span{color}", left: function (a) { return !!a.attributes.color }, right: function (a) { a.name = "span"; a.attributes.color && (a.styles.color = a.attributes.color); delete a.attributes.color } }]] });
                            var c, n = b.config.colorButton_normalizeBackground; if (void 0 === n || n) c = [[{ element: "span", left: function (a) { var b = CKEDITOR.tools; if ("span" != a.name || !a.styles || !a.styles.background) return !1; a = b.style.parse.background(a.styles.background); return a.color && 1 === b.object.keys(a).length }, right: function (a) { var e = (new CKEDITOR.style(b.config.colorButton_backStyle, { color: a.styles.background })).getDefinition(); a.name = e.element; a.styles = e.styles; a.attributes = e.attributes || {}; return a } }]]; d({
                                name: "BGColor", type: "back",
                                commandName: "bgColor", title: e.bgColorTitle, order: 20, contentTransformations: c
                            })
                        }
                    }
                }); a = CKEDITOR.tools.createClass({
                    $: function (b, d, f) { this.$ = new CKEDITOR.dom.element("td"); this.color = CKEDITOR.tools._isValidColorFormat(d.color) ? d.color : ""; this.clickFn = f; this.label = d.label || a.colorNames(b)[this.color] || this.color; this.setHtml() }, statics: {
                        colorNames: function (a) { return a.lang.colorbutton.colors }, normalizeColor: function (a) {
                            var d = /^(rgb|hsl)a\(/g.test(a), f = /^rgba\((\s*0\s*,?){4}\)$/g.test(a); return d && !f ?
                                (a = new CKEDITOR.tools.color(a), CKEDITOR.tools.normalizeHex(a.getHex() || "").replace(/#/g, "")) : CKEDITOR.tools.normalizeHex("#" + CKEDITOR.tools.convertRgbToHex(a || "")).replace(/#/g, "")
                        }
                    }, proto: {
                        getElement: function () { return this.$ }, getHtml: function () { return this.getElement().getOuterHtml() }, setHtml: function () {
                            this.getElement().setHtml('\x3ca class\x3d"cke_colorbox" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"' + this.label + '" draggable\x3d"false" ondragstart\x3d"return false;" onclick\x3d"CKEDITOR.tools.callFunction(' +
                                this.clickFn + ",'" + this.color + "','" + this.label + "', this); return false;\" href\x3d\"javascript:void('" + this.color + '\')" data-value\x3d"' + this.color + '" role\x3d"option"\x3e\x3cspan class\x3d"cke_colorbox" style\x3d"background-color:#' + this.color + '"\x3e\x3c/span\x3e\x3c/a\x3e')
                        }, setPositionIndex: function (a, d) { this.getElement().getChild(0).setAttributes({ "aria-posinset": a, "aria-setsize": d }) }
                    }
                }); h = CKEDITOR.tools.createClass({
                    $: function () {
                        this.$ = new CKEDITOR.dom.element("tr"); this.$.addClass("cke_colorhistory_row");
                        this.boxes = []
                    }, proto: { getElement: function () { return this.$ }, removeLastColor: function () { this.getElement().getLast().remove(); return this.boxes.pop() }, addNewColor: function (a) { this.boxes.unshift(a); this.getElement().append(a.getElement(), !0) }, extractColorBox: function (a) { var d = CKEDITOR.tools.getIndex(this.boxes, function (d) { return d.color === a }); if (0 > d) return null; this.boxes[d].getElement().remove(); return this.boxes.splice(d, 1)[0] } }
                }); f = CKEDITOR.tools.createClass({
                    $: function (a, d, f) {
                        this.editor = a; this.cssProperty =
                            d; this.clickFn = f; this.rows = []; this._.addNewRow(); if (this.editor.config.colorButton_renderContentColors) this.editor.once("instanceReady", function () { this.renderContentColors() }, this)
                    }, statics: {
                        renderContainer: function (a, d) { a.push('\x3c/tbody\x3e\x3ctbody class\x3d"cke_colorhistory" style\x3d"display:none;"\x3e', "\x3ctr\x3e", '\x3ctd colspan\x3d"', d.config.colorButton_colorsPerRow, '" align\x3d"center"\x3e', "\x3cspan\x3e\x3chr\x3e\x3c/span\x3e", "\x3c/td\x3e", "\x3c/tr\x3e", "\x3c/tbody\x3e\x3ctbody\x3e") },
                        getRowLimit: function (a) { return a.config.colorButton_historyRowLimit }, getCapacity: function (a) { return f.getRowLimit(a) * a.config.colorButton_colorsPerRow }, colorList: CKEDITOR.tools.style.parse._colors
                    }, _: {
                        countColors: function () { var a = CKEDITOR.tools.getStyledSpans(this.cssProperty, this.editor.editable()); return CKEDITOR.tools.array.reduce(a, function (a, b) { var k = this._.getHexCode(b, this.cssProperty, f.colorList); a[k] = a[k] || 0; a[k] += 1; return a }, {}, this) }, getHexCode: function (b, d, f) {
                            var k = b.getStyle(d); return k in
                                f ? f[k].substr(1) : a.normalizeColor(b.getComputedStyle(d)).toUpperCase()
                        }, sortByOccurrencesAscending: function (a, d) { var f = [], k; for (k in a) { var h = {}; h[d] = k; h.frequency = a[k]; f.push(h) } f.sort(function (a, b) { return b.frequency - a.frequency }); this._.trimToCapacity(f); return f.reverse() }, trimToCapacity: function (a) { a.splice(f.getCapacity(this.editor)) }, addColors: function (a) { CKEDITOR.tools.array.forEach(a, function (a) { this.addColor(a.colorCode) }, this) }, extractColorBox: function (a) {
                            for (var d = 0; d < this.rows.length; d++) {
                                var f =
                                    this.rows[d].extractColorBox(a); if (f) return f
                            } return null
                        }, moveToBeginning: function (a) { this.rows[0].addNewColor(a) }, createAtBeginning: function (b) { this._.moveToBeginning(new a(this.editor, { color: b }, this.clickFn)) }, addNewRow: function () { this.rows.push(new h); this.container && this.container.append(this.rows[this.rows.length - 1].getElement()) }, alignRows: function () {
                            for (var a = 0; a < f.getRowLimit(this.editor) && !(this.rows[a].boxes.length <= this.editor.config.colorButton_colorsPerRow); a++)this.rows[a + 1] ? this._.moveLastBoxToNextRow(a) :
                                a < f.getRowLimit(this.editor) - 1 ? (this._.addNewRow(), this._.moveLastBoxToNextRow(a)) : this.rows[a].removeLastColor()
                        }, moveLastBoxToNextRow: function (a) { this.rows[a + 1].addNewColor(this.rows[a].removeLastColor()) }, refreshPositions: function () { var a = this._.countPanelElements(), d = this._.calculateFirstPosition(a); CKEDITOR.tools.array.forEach(this.rows, function (f) { CKEDITOR.tools.array.forEach(f.boxes, function (k) { k.setPositionIndex(d, a); d += 1 }) }) }, countPanelElements: function () {
                            var a = this.editor.config.colorButton_colors.split(",").length +
                                this.getLength(); this.editor.plugins.colordialog && this.editor.config.colorButton_enableMore && (a += 1); this.editor.config.colorButton_enableAutomatic && (a += 1); return a
                        }, calculateFirstPosition: function (a) { return this.editor.plugins.colordialog && this.editor.config.colorButton_enableMore ? a - this.getLength() : a - this.getLength() + 1 }, attachRows: function () { CKEDITOR.tools.array.forEach(this.rows, function (a) { this.container.append(a.getElement()) }, this) }
                    }, proto: {
                        setContainer: function (a) {
                            this.container = a; this._.attachRows();
                            this.getLength() && this.show()
                        }, show: function () { this.container && this.container.show() }, renderContentColors: function () { var a = this._.countColors(); CKEDITOR.tools.isEmpty(a) || (a = this._.sortByOccurrencesAscending(a, "colorCode"), this._.addColors(a), this._.refreshPositions()) }, addColor: function (a) { var d = this._.extractColorBox(a); this.container && !this.container.isVisible() && this.show(); d ? this._.moveToBeginning(d) : this._.createAtBeginning(a); this._.alignRows() }, getLength: function () {
                            return CKEDITOR.tools.array.reduce(this.rows,
                                function (a, d) { return a + d.boxes.length }, 0)
                        }
                    }
                })
            })(); CKEDITOR.config.colorButton_enableMore = !0; CKEDITOR.config.colorButton_colors = "1ABC9C,2ECC71,3498DB,9B59B6,4E5F70,F1C40F,16A085,27AE60,2980B9,8E44AD,2C3E50,F39C12,E67E22,E74C3C,ECF0F1,95A5A6,DDD,FFF,D35400,C0392B,BDC3C7,7F8C8D,999,000"; CKEDITOR.config.colorButton_foreStyle = { element: "span", styles: { color: "#(color)" }, overrides: [{ element: "font", attributes: { color: null } }] }; CKEDITOR.config.colorButton_backStyle = { element: "span", styles: { "background-color": "#(color)" } };
        CKEDITOR.config.colorButton_enableAutomatic = !0; CKEDITOR.config.colorButton_colorsPerRow = 6; CKEDITOR.config.colorButton_historyRowLimit = 1; CKEDITOR.config.colorButton_renderContentColors = !0; CKEDITOR.plugins.colordialog = {
            requires: "dialog", init: function (a) {
                var h = new CKEDITOR.dialogCommand("colordialog"); h.editorFocus = !1; a.addCommand("colordialog", h); CKEDITOR.dialog.add("colordialog", this.path + "dialogs/colordialog.js"); a.getColorFromDialog = function (f, b, d) {
                    var h, k, m, g; h = function (a) {
                        m(this); (a = "ok" == a.name ?
                            this.getValueOf("picker", "selectedColor") : null) && !CKEDITOR.tools._isValidColorFormat(a) && (a = null); /^[0-9a-f]{3}([0-9a-f]{3})?$/i.test(a) && (a = "#" + a); f.call(b, a)
                    }; k = function (a) { d && (a.data = d) }; m = function (a) { a.removeListener("ok", h); a.removeListener("cancel", h); a.removeListener("show", k) }; g = function (a) { a.on("ok", h); a.on("cancel", h); a.on("show", k, null, null, 5) }; a.execCommand("colordialog"); if (a._.storedDialogs && a._.storedDialogs.colordialog) g(a._.storedDialogs.colordialog); else CKEDITOR.on("dialogDefinition",
                        function (a) { if ("colordialog" == a.data.name) { var b = a.data.definition; a.removeListener(); b.onLoad = CKEDITOR.tools.override(b.onLoad, function (a) { return function () { g(this); b.onLoad = a; "function" == typeof a && a.call(this) } }) } })
                }
            }
        }; CKEDITOR.plugins.add("colordialog", CKEDITOR.plugins.colordialog); (function () {
            function a(a, b, d, e) { var c = new CKEDITOR.dom.walker(a); if (a = a.startContainer.getAscendant(b, !0) || a.endContainer.getAscendant(b, !0)) if (d(a), e) return; for (; a = c.next();)if (a = a.getAscendant(b, !0)) if (d(a), e) break }
            function h(a, d) { var g = { ul: "ol", ol: "ul" }; return -1 !== b(d, function (b) { return b.element === a || b.element === g[a] }) } function f(a) { this.styles = null; this.sticky = !1; this.editor = a; this.filter = new CKEDITOR.filter(a, a.config.copyFormatting_allowRules); !0 === a.config.copyFormatting_allowRules && (this.filter.disabled = !0); a.config.copyFormatting_disallowRules && this.filter.disallow(a.config.copyFormatting_disallowRules) } var b = CKEDITOR.tools.indexOf, d = CKEDITOR.tools.getMouseButton, l = !1; CKEDITOR.plugins.add("copyformatting",
                {
                    lang: "ar,az,bg,cs,da,de,de-ch,el,en,en-au,eo,es-mx,et,eu,fa,fr,gl,hr,hu,it,ja,ko,ku,lv,nb,nl,oc,pl,pt,pt-br,ro,ru,sk,sq,sr,sr-latn,sv,tr,uk,vi,zh,zh-cn", icons: "copyformatting", hidpi: !0, init: function (a) {
                        var f = CKEDITOR.plugins.copyformatting; f._addScreenReaderContainer(); l || (CKEDITOR.document.appendStyleSheet(this.path + "styles/copyformatting.css"), l = !0); a.addContentsCss && a.addContentsCss(this.path + "styles/copyformatting.css"); a.copyFormatting = new f.state(a); a.addCommand("copyFormatting", f.commands.copyFormatting);
                        a.addCommand("applyFormatting", f.commands.applyFormatting); a.ui.addButton("CopyFormatting", { label: a.lang.copyformatting.label, command: "copyFormatting", toolbar: "cleanup,0" }); a.on("contentDom", function () {
                            var b = a.getCommand("copyFormatting"), e = a.editable(), c = e.isInline() ? e : a.document, f = a.ui.get("CopyFormatting"); e.attachListener(c, "mouseup", function (e) { d(e) === CKEDITOR.MOUSE_BUTTON_LEFT && b.state === CKEDITOR.TRISTATE_ON && a.execCommand("applyFormatting") }); e.attachListener(CKEDITOR.document, "mouseup", function (c) {
                                d(c) !==
                                CKEDITOR.MOUSE_BUTTON_LEFT || b.state !== CKEDITOR.TRISTATE_ON || e.contains(c.data.getTarget()) || a.execCommand("copyFormatting")
                            }); f && (c = CKEDITOR.document.getById(f._.id), e.attachListener(c, "dblclick", function () { a.execCommand("copyFormatting", { sticky: !0 }) }), e.attachListener(c, "mouseup", function (a) { a.data.stopPropagation() }))
                        }); a.config.copyFormatting_keystrokeCopy && a.setKeystroke(a.config.copyFormatting_keystrokeCopy, "copyFormatting"); a.on("key", function (b) {
                            var e = a.getCommand("copyFormatting"); b = b.data.domEvent;
                            b.getKeystroke && 27 === b.getKeystroke() && e.state === CKEDITOR.TRISTATE_ON && a.execCommand("copyFormatting")
                        }); a.copyFormatting.on("extractFormatting", function (b) { var e = b.data.element; if (e.contains(a.editable()) || e.equals(a.editable())) return b.cancel(); e = f._convertElementToStyleDef(e); if (!a.copyFormatting.filter.check(new CKEDITOR.style(e), !0, !0)) return b.cancel(); b.data.styleDef = e }); a.copyFormatting.on("applyFormatting", function (d) {
                            if (!d.data.preventFormatStripping) {
                                var e = d.data.range, c = f._extractStylesFromRange(a,
                                    e), l = f._determineContext(e), u, w; if (a.copyFormatting._isContextAllowed(l)) for (w = 0; w < c.length; w++)l = c[w], u = e.createBookmark(), -1 === b(f.preservedElements, l.element) ? CKEDITOR.env.webkit && !CKEDITOR.env.chrome ? c[w].removeFromRange(d.data.range, d.editor) : c[w].remove(d.editor) : h(l.element, d.data.styles) && f._removeStylesFromElementInRange(e, l.element), e.moveToBookmark(u)
                            }
                        }); a.copyFormatting.on("applyFormatting", function (b) {
                            var e = CKEDITOR.plugins.copyformatting, c = e._determineContext(b.data.range); "list" ===
                                c && a.copyFormatting._isContextAllowed("list") ? e._applyStylesToListContext(b.editor, b.data.range, b.data.styles) : "table" === c && a.copyFormatting._isContextAllowed("table") ? e._applyStylesToTableContext(b.editor, b.data.range, b.data.styles) : a.copyFormatting._isContextAllowed("text") && e._applyStylesToTextContext(b.editor, b.data.range, b.data.styles)
                        }, null, null, 999)
                    }
                }); f.prototype._isContextAllowed = function (a) { var d = this.editor.config.copyFormatting_allowedContexts; return !0 === d || -1 !== b(d, a) }; CKEDITOR.event.implementOn(f.prototype);
            CKEDITOR.plugins.copyformatting = {
                state: f, inlineBoundary: "h1 h2 h3 h4 h5 h6 p div".split(" "), excludedAttributes: ["id", "style", "href", "data-cke-saved-href", "dir"], elementsForInlineTransform: ["li"], excludedElementsFromInlineTransform: ["table", "thead", "tbody", "ul", "ol"], excludedAttributesFromInlineTransform: ["value", "type"], preservedElements: "ul ol li td th tr thead tbody table".split(" "), breakOnElements: ["ul", "ol", "table"], _initialKeystrokePasteCommand: null, commands: {
                    copyFormatting: {
                        exec: function (a,
                            b) {
                                var d = CKEDITOR.plugins.copyformatting, e = a.copyFormatting, c = b ? "keystrokeHandler" == b.from : !1, f = b ? b.sticky || c : !1, h = d._getCursorContainer(a), l = CKEDITOR.document.getDocumentElement(); if (this.state === CKEDITOR.TRISTATE_ON) return e.styles = null, e.sticky = !1, h.removeClass("cke_copyformatting_active"), l.removeClass("cke_copyformatting_disabled"), l.removeClass("cke_copyformatting_tableresize_cursor"), d._putScreenReaderMessage(a, "canceled"), d._detachPasteKeystrokeHandler(a), this.setState(CKEDITOR.TRISTATE_OFF);
                            e.styles = d._extractStylesFromElement(a, a.elementPath().lastElement); this.setState(CKEDITOR.TRISTATE_ON); c || (h.addClass("cke_copyformatting_active"), l.addClass("cke_copyformatting_tableresize_cursor"), a.config.copyFormatting_outerCursor && l.addClass("cke_copyformatting_disabled")); e.sticky = f; d._putScreenReaderMessage(a, "copied"); d._attachPasteKeystrokeHandler(a)
                        }
                    }, applyFormatting: {
                        editorFocus: CKEDITOR.env.ie && !CKEDITOR.env.edge ? !1 : !0, exec: function (a, b) {
                            var d = a.getCommand("copyFormatting"), e = b ? "keystrokeHandler" ==
                                b.from : !1, c = CKEDITOR.plugins.copyformatting, f = a.copyFormatting, h = c._getCursorContainer(a), l = CKEDITOR.document.getDocumentElement(); if (e && !f.styles) return c._putScreenReaderMessage(a, "failed"), c._detachPasteKeystrokeHandler(a), !1; e = c._applyFormat(a, f.styles); f.sticky || (f.styles = null, h.removeClass("cke_copyformatting_active"), l.removeClass("cke_copyformatting_disabled"), l.removeClass("cke_copyformatting_tableresize_cursor"), d.setState(CKEDITOR.TRISTATE_OFF), c._detachPasteKeystrokeHandler(a)); c._putScreenReaderMessage(a,
                                    e ? "applied" : "canceled")
                        }
                    }
                }, _getCursorContainer: function (a) { return a.elementMode === CKEDITOR.ELEMENT_MODE_INLINE ? a.editable() : a.editable().getParent() }, _convertElementToStyleDef: function (a) { var b = CKEDITOR.tools, d = a.getAttributes(CKEDITOR.plugins.copyformatting.excludedAttributes), b = b.parseCssText(a.getAttribute("style"), !0, !0); return { element: a.getName(), type: CKEDITOR.STYLE_INLINE, attributes: d, styles: b } }, _extractStylesFromElement: function (a, d) {
                    var g = {}, e = []; do if (d.type === CKEDITOR.NODE_ELEMENT && !d.hasAttribute("data-cke-bookmark") &&
                        (g.element = d, a.copyFormatting.fire("extractFormatting", g, a) && g.styleDef && e.push(new CKEDITOR.style(g.styleDef)), d.getName && -1 !== b(CKEDITOR.plugins.copyformatting.breakOnElements, d.getName()))) break; while ((d = d.getParent()) && d.type === CKEDITOR.NODE_ELEMENT); return e
                }, _extractStylesFromRange: function (a, b) { for (var d = [], e = new CKEDITOR.dom.walker(b), c; c = e.next();)d = d.concat(CKEDITOR.plugins.copyformatting._extractStylesFromElement(a, c)); return d }, _removeStylesFromElementInRange: function (a, d) {
                    for (var g = -1 !==
                        b(["ol", "ul", "table"], d), e = new CKEDITOR.dom.walker(a), c; c = e.next();)if (c = c.getAscendant(d, !0)) if (c.removeAttributes(c.getAttributes()), g) break
                }, _getSelectedWordOffset: function (a) {
                    function d(a, b) { return a[b ? "getPrevious" : "getNext"](function (a) { return a.type !== CKEDITOR.NODE_COMMENT }) } function g(a) { return a.type == CKEDITOR.NODE_ELEMENT ? (a = a.getHtml().replace(/<span.*?>&nbsp;<\/span>/g, ""), a.replace(/<.*?>/g, "")) : a.getText() } function e(a, c) {
                        var k = a, f = /\s/g, h = "p br ol ul li td th div caption body".split(" "),
                        l = !1, n = !1, u, q; do { for (u = d(k, c); !u && k.getParent();) { k = k.getParent(); if (-1 !== b(h, k.getName())) { n = l = !0; break } u = d(k, c) } if (u && u.getName && -1 !== b(h, u.getName())) { l = !0; break } k = u } while (k && k.getStyle && ("none" == k.getStyle("display") || !k.getText())); for (k || (k = a); k.type !== CKEDITOR.NODE_TEXT;)k = !l || c || n ? k.getChild(0) : k.getChild(k.getChildCount() - 1); for (h = g(k); null != (n = f.exec(h)) && (q = n.index, c);); if ("number" !== typeof q && !l) return e(k, c); if (l) c ? q = 0 : (f = /([\.\b]*$)/, q = (n = f.exec(h)) ? n.index : h.length); else if (c && (q +=
                            1, q > h.length)) return e(k); return { node: k, offset: q }
                    } var c = /\b\w+\b/ig, f, h, l, p, q; l = p = q = a.startContainer; for (f = g(l); null != (h = c.exec(f));)if (h.index + h[0].length >= a.startOffset) return a = h.index, c = h.index + h[0].length, 0 === h.index && (h = e(l, !0), p = h.node, a = h.offset), c >= f.length && (f = e(l), q = f.node, c = f.offset), { startNode: p, startOffset: a, endNode: q, endOffset: c }; return null
                }, _filterStyles: function (a) {
                    var b = CKEDITOR.tools.isEmpty, d = [], e, c; for (c = 0; c < a.length; c++)e = a[c]._.definition, -1 !== CKEDITOR.tools.indexOf(CKEDITOR.plugins.copyformatting.inlineBoundary,
                        e.element) && (e.element = a[c].element = "span"), "span" === e.element && b(e.attributes) && b(e.styles) || d.push(a[c]); return d
                }, _determineContext: function (a) { function b(d) { var e = new CKEDITOR.dom.walker(a), c; if (a.startContainer.getAscendant(d, !0) || a.endContainer.getAscendant(d, !0)) return !0; for (; c = e.next();)if (c.getAscendant(d, !0)) return !0 } return b({ ul: 1, ol: 1 }) ? "list" : b("table") ? "table" : "text" }, _applyStylesToTextContext: function (a, d, g) {
                    var e = CKEDITOR.plugins.copyformatting, c = e.excludedAttributesFromInlineTransform,
                    f, h; CKEDITOR.env.webkit && !CKEDITOR.env.chrome && a.getSelection().selectRanges([d]); for (f = 0; f < g.length; f++)if (d = g[f], -1 === b(e.excludedElementsFromInlineTransform, d.element)) { if (-1 !== b(e.elementsForInlineTransform, d.element)) for (d.element = d._.definition.element = "span", h = 0; h < c.length; h++)d._.definition.attributes[c[h]] && delete d._.definition.attributes[c[h]]; d.apply(a) }
                }, _applyStylesToListContext: function (b, d, g) {
                    var e, c, f; for (f = 0; f < g.length; f++)e = g[f], c = d.createBookmark(), "ol" === e.element || "ul" === e.element ?
                        a(d, { ul: 1, ol: 1 }, function (a) { var b = e; a.getName() !== b.element && a.renameNode(b.element); b.applyToObject(a) }, !0) : "li" === e.element ? a(d, "li", function (a) { e.applyToObject(a) }) : CKEDITOR.plugins.copyformatting._applyStylesToTextContext(b, d, [e]), d.moveToBookmark(c)
                }, _applyStylesToTableContext: function (d, f, g) {
                    function e(a, b) { a.getName() !== b.element && (b = b.getDefinition(), b.element = a.getName(), b = new CKEDITOR.style(b)); b.applyToObject(a) } var c, h, l; for (l = 0; l < g.length; l++)c = g[l], h = f.createBookmark(), -1 !== b(["table",
                        "tr"], c.element) ? a(f, c.element, function (a) { c.applyToObject(a) }) : -1 !== b(["td", "th"], c.element) ? a(f, { td: 1, th: 1 }, function (a) { e(a, c) }) : -1 !== b(["thead", "tbody"], c.element) ? a(f, { thead: 1, tbody: 1 }, function (a) { e(a, c) }) : CKEDITOR.plugins.copyformatting._applyStylesToTextContext(d, f, [c]), f.moveToBookmark(h)
                }, _applyFormat: function (a, b) {
                    var d = a.getSelection().getRanges()[0], e = CKEDITOR.plugins.copyformatting, c, f; if (!d) return !1; if (d.collapsed) {
                        f = a.getSelection().createBookmarks(); if (!(c = e._getSelectedWordOffset(d))) return;
                        d = a.createRange(); d.setStart(c.startNode, c.startOffset); d.setEnd(c.endNode, c.endOffset); d.select()
                    } b = e._filterStyles(b); if (!a.copyFormatting.fire("applyFormatting", { styles: b, range: d, preventFormatStripping: !1 }, a)) return !1; f && a.getSelection().selectBookmarks(f); return !0
                }, _putScreenReaderMessage: function (a, b) { var d = this._getScreenReaderContainer(); d && d.setText(a.lang.copyformatting.notification[b]) }, _addScreenReaderContainer: function () {
                    if (this._getScreenReaderContainer()) return this._getScreenReaderContainer();
                    if (!CKEDITOR.env.ie6Compat && !CKEDITOR.env.ie7Compat) return CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_screen_reader_only cke_copyformatting_notification"\x3e\x3cdiv aria-live\x3d"polite"\x3e\x3c/div\x3e\x3c/div\x3e')).getChild(0)
                }, _getScreenReaderContainer: function () { if (!CKEDITOR.env.ie6Compat && !CKEDITOR.env.ie7Compat) return CKEDITOR.document.getBody().findOne(".cke_copyformatting_notification div[aria-live]") }, _attachPasteKeystrokeHandler: function (a) {
                    var b =
                        a.config.copyFormatting_keystrokePaste; b && (this._initialKeystrokePasteCommand = a.keystrokeHandler.keystrokes[b], a.setKeystroke(b, "applyFormatting"))
                }, _detachPasteKeystrokeHandler: function (a) { var b = a.config.copyFormatting_keystrokePaste; b && a.setKeystroke(b, this._initialKeystrokePasteCommand || !1) }
            }; CKEDITOR.config.copyFormatting_outerCursor = !0; CKEDITOR.config.copyFormatting_allowRules = "b s u i em strong span p div td th ol ul li(*)[*]{*}"; CKEDITOR.config.copyFormatting_disallowRules = "*[data-cke-widget*,data-widget*,data-cke-realelement](cke_widget*)";
            CKEDITOR.config.copyFormatting_allowedContexts = !0; CKEDITOR.config.copyFormatting_keystrokeCopy = CKEDITOR.CTRL + CKEDITOR.SHIFT + 67; CKEDITOR.config.copyFormatting_keystrokePaste = CKEDITOR.CTRL + CKEDITOR.SHIFT + 86
        })(); CKEDITOR.plugins.add("menu", {
            requires: "floatpanel", beforeInit: function (a) {
                for (var h = a.config.menu_groups.split(","), f = a._.menuGroups = {}, b = a._.menuItems = {}, d = 0; d < h.length; d++)f[h[d]] = d + 1; a.addMenuGroup = function (a, b) { f[a] = b || 100 }; a.addMenuItem = function (a, d) {
                    f[d.group] && (b[a] = new CKEDITOR.menuItem(this,
                        a, d))
                }; a.addMenuItems = function (a) { for (var b in a) this.addMenuItem(b, a[b]) }; a.getMenuItem = function (a) { return b[a] }; a.removeMenuItem = function (a) { delete b[a] }
            }
        }); (function () {
            function a(a) { a.sort(function (a, b) { return a.group < b.group ? -1 : a.group > b.group ? 1 : a.order < b.order ? -1 : a.order > b.order ? 1 : 0 }) } var h = '\x3cspan class\x3d"cke_menuitem"\x3e\x3ca id\x3d"{id}" class\x3d"cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href\x3d"{href}" title\x3d"{title}" tabindex\x3d"-1" _cke_focus\x3d1 hidefocus\x3d"true" role\x3d"{role}" aria-label\x3d"{attrLabel}" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasPopup}" aria-disabled\x3d"{disabled}" {ariaChecked} draggable\x3d"false"',
                f = ""; CKEDITOR.env.gecko && CKEDITOR.env.mac && (h += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (h += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;" ondragstart\x3d"return false;"'); CKEDITOR.env.ie && (f = 'return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26'); var h = h + (' onmouseover\x3d"CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout\x3d"CKEDITOR.tools.callFunction({moveOutFn},{index});" onclick\x3d"' + f + 'CKEDITOR.tools.callFunction({clickFn},{index}); return false;"\x3e') +
                    '\x3cspan class\x3d"cke_menubutton_inner"\x3e\x3cspan class\x3d"cke_menubutton_icon"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{iconStyle}"\x3e\x3c/span\x3e\x3c/span\x3e\x3cspan class\x3d"cke_menubutton_label"\x3e{label}\x3c/span\x3e{shortcutHtml}{arrowHtml}\x3c/span\x3e\x3c/a\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_voice_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e\x3c/span\x3e', b = CKEDITOR.addTemplate("menuItem", h), d = CKEDITOR.addTemplate("menuArrow",
                        '\x3cspan class\x3d"cke_menuarrow"\x3e\x3cspan\x3e{label}\x3c/span\x3e\x3c/span\x3e'), l = CKEDITOR.addTemplate("menuShortcut", '\x3cspan class\x3d"cke_menubutton_label cke_menubutton_shortcut"\x3e{shortcut}\x3c/span\x3e'); CKEDITOR.menu = CKEDITOR.tools.createClass({
                            $: function (a, b) {
                                b = this._.definition = b || {}; this.id = CKEDITOR.tools.getNextId(); this.editor = a; this.items = []; this._.listeners = []; this._.level = b.level || 1; var d = CKEDITOR.tools.extend({}, b.panel, {
                                    css: [CKEDITOR.skin.getPath("editor")], level: this._.level -
                                        1, block: {}
                                }), e = d.block.attributes = d.attributes || {}; !e.role && (e.role = "menu"); this._.panelDefinition = d
                            }, _: {
                                onShow: function () { var a = this.editor.getSelection(), b = a && a.getStartElement(), d = this.editor.elementPath(), e = this._.listeners; this.removeAll(); for (var c = 0; c < e.length; c++) { var f = e[c](b, a, d); if (f) for (var h in f) { var l = this.editor.getMenuItem(h); !l || l.command && !this.editor.getCommand(l.command).state || (l.state = f[h], this.add(l)) } } }, onClick: function (a) {
                                    this.hide(); if (a.onClick) a.onClick(); else a.command &&
                                        this.editor.execCommand(a.command)
                                }, onEscape: function (a) { var b = this.parent; b ? b._.panel.hideChild(1) : 27 == a && this.hide(1); return !1 }, onHide: function () { this.onHide && this.onHide() }, showSubMenu: function (a) {
                                    var b = this._.subMenu, d = this.items[a]; if (d = d.getItems && d.getItems()) {
                                        b ? b.removeAll() : (b = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, { level: this._.level + 1 }, !0)), b.parent = this, b._.onClick = CKEDITOR.tools.bind(this._.onClick, this)); for (var e in d) {
                                            var c = this.editor.getMenuItem(e);
                                            c && (c.state = d[e], b.add(c))
                                        } var f = this._.panel.getBlock(this.id).element.getDocument().getById(this.id + String(a)); setTimeout(function () { b.show(f, 2) }, 0)
                                    } else this._.panel.hideChild(1)
                                }
                            }, proto: {
                                add: function (a) { a.order || (a.order = this.items.length); this.items.push(a) }, removeAll: function () { this.items = [] }, show: function (b, d, g, e) {
                                    if (!this.parent && (this._.onShow(), !this.items.length)) return; d = d || ("rtl" == this.editor.lang.dir ? 2 : 1); var c = this.items, f = this.editor, h = this._.panel, l = this._.element; if (!h) {
                                        h = this._.panel =
                                        new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level); h.onEscape = CKEDITOR.tools.bind(function (a) { if (!1 === this._.onEscape(a)) return !1 }, this); h.onShow = function () { h._.panel.getHolderElement().getParent().addClass("cke").addClass("cke_reset_all") }; h.onHide = CKEDITOR.tools.bind(function () { this._.onHide && this._.onHide() }, this); l = h.addBlock(this.id, this._.panelDefinition.block); l.autoSize = !0; var p = l.keys; p[40] = "next"; p[9] = "next"; p[38] = "prev"; p[CKEDITOR.SHIFT +
                                            9] = "prev"; p["rtl" == f.lang.dir ? 37 : 39] = CKEDITOR.env.ie ? "mouseup" : "click"; p[32] = CKEDITOR.env.ie ? "mouseup" : "click"; CKEDITOR.env.ie && (p[13] = "mouseup"); l = this._.element = l.element; p = l.getDocument(); p.getBody().setStyle("overflow", "hidden"); p.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden"); this._.itemOverFn = CKEDITOR.tools.addFunction(function (a) { clearTimeout(this._.showSubTimeout); this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, f.config.menu_subMenuDelay || 400, this, [a]) },
                                                this); this._.itemOutFn = CKEDITOR.tools.addFunction(function () { clearTimeout(this._.showSubTimeout) }, this); this._.itemClickFn = CKEDITOR.tools.addFunction(function (a) { var b = this.items[a]; if (b.state == CKEDITOR.TRISTATE_DISABLED) this.hide(1); else if (b.getItems) this._.showSubMenu(a); else this._.onClick(b) }, this)
                                    } a(c); for (var p = f.elementPath(), p = ['\x3cdiv class\x3d"cke_menu' + (p && p.direction() != f.lang.dir ? " cke_mixed_dir_content" : "") + '" role\x3d"presentation"\x3e'], q = c.length, r = q && c[0].group, A = 0; A < q; A++) {
                                        var v =
                                            c[A]; r != v.group && (p.push('\x3cdiv class\x3d"cke_menuseparator" role\x3d"separator"\x3e\x3c/div\x3e'), r = v.group); v.render(this, A, p)
                                    } p.push("\x3c/div\x3e"); l.setHtml(p.join("")); CKEDITOR.ui.fire("ready", this); this.parent ? this.parent._.panel.showAsChild(h, this.id, b, d, g, e) : h.showBlock(this.id, b, d, g, e); f.fire("menuShow", [h])
                                }, addListener: function (a) { this._.listeners.push(a) }, hide: function (a) { this._.onHide && this._.onHide(); this._.panel && this._.panel.hide(a) }, findItemByCommandName: function (a) {
                                    var b = CKEDITOR.tools.array.filter(this.items,
                                        function (b) { return a === b.command }); return b.length ? (b = b[0], { item: b, element: this._.element.findOne("." + b.className) }) : null
                                }
                            }
                        }); CKEDITOR.menuItem = CKEDITOR.tools.createClass({
                            $: function (a, b, d) { CKEDITOR.tools.extend(this, d, { order: 0, className: "cke_menubutton__" + b }); this.group = a._.menuGroups[this.group]; this.editor = a; this.name = b }, proto: {
                                render: function (a, f, g) {
                                    var e = a.id + String(f), c = "undefined" == typeof this.state ? CKEDITOR.TRISTATE_OFF : this.state, h = "", u = this.editor, w, p, q = c == CKEDITOR.TRISTATE_ON ? "on" : c == CKEDITOR.TRISTATE_DISABLED ?
                                        "disabled" : "off"; this.role in { menuitemcheckbox: 1, menuitemradio: 1 } && (h = ' aria-checked\x3d"' + (c == CKEDITOR.TRISTATE_ON ? "true" : "false") + '"'); var r = this.getItems, A = "\x26#" + ("rtl" == this.editor.lang.dir ? "9668" : "9658") + ";", v = this.name; this.icon && !/\./.test(this.icon) && (v = this.icon); this.command && (w = u.getCommand(this.command), (w = u.getCommandKeystroke(w)) && (p = CKEDITOR.tools.keystrokeToString(u.lang.common.keyboard, w))); w = CKEDITOR.tools.htmlEncodeAttr(this.label); a = {
                                            id: e, name: this.name, iconName: v, label: this.label,
                                            attrLabel: w, cls: this.className || "", state: q, hasPopup: r ? "true" : "false", disabled: c == CKEDITOR.TRISTATE_DISABLED, title: w + (p ? " (" + p.display + ")" : ""), ariaShortcut: p ? u.lang.common.keyboardShortcut + " " + p.aria : "", href: "javascript:void('" + (w || "").replace("'") + "')", hoverFn: a._.itemOverFn, moveOutFn: a._.itemOutFn, clickFn: a._.itemClickFn, index: f, iconStyle: CKEDITOR.skin.getIconStyle(v, "rtl" == this.editor.lang.dir, v == this.icon ? null : this.icon, this.iconOffset), shortcutHtml: p ? l.output({ shortcut: p.display }) : "", arrowHtml: r ?
                                                d.output({ label: A }) : "", role: this.role ? this.role : "menuitem", ariaChecked: h
                                        }; b.output(a, g)
                                }
                            }
                        })
        })(); CKEDITOR.config.menu_groups = "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div"; CKEDITOR.plugins.add("contextmenu", {
            requires: "menu", onLoad: function () {
                CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass({
                    base: CKEDITOR.menu, $: function (a) {
                        this.base.call(this, a, {
                            panel: {
                                css: a.config.contextmenu_contentsCss,
                                className: "cke_menu_panel", attributes: { "aria-label": a.lang.contextmenu.options }
                            }
                        })
                    }, proto: {
                        addTarget: function (a, h) {
                            function f() { d = !1 } var b, d; a.on("contextmenu", function (a) {
                                a = a.data; var f = CKEDITOR.env.webkit ? b : CKEDITOR.env.mac ? a.$.metaKey : a.$.ctrlKey; if (!h || !f) if (a.preventDefault(), !d) {
                                    if (CKEDITOR.env.mac && CKEDITOR.env.webkit) {
                                        var f = this.editor, g = (new CKEDITOR.dom.elementPath(a.getTarget(), f.editable())).contains(function (a) { return a.hasAttribute("contenteditable") }, !0); g && "false" == g.getAttribute("contenteditable") &&
                                            f.getSelection().fake(g)
                                    } var g = a.getTarget().getDocument(), e = a.getTarget().getDocument().getDocumentElement(), f = !g.equals(CKEDITOR.document), g = g.getWindow().getScrollPosition(), c = f ? a.$.clientX : a.$.pageX || g.x + a.$.clientX, l = f ? a.$.clientY : a.$.pageY || g.y + a.$.clientY; CKEDITOR.tools.setTimeout(function () { this.open(e, null, c, l) }, CKEDITOR.env.ie ? 200 : 0, this)
                                }
                            }, this); if (CKEDITOR.env.webkit) {
                                var l = function () { b = 0 }; a.on("keydown", function (a) { b = CKEDITOR.env.mac ? a.data.$.metaKey : a.data.$.ctrlKey }); a.on("keyup", l);
                                a.on("contextmenu", l)
                            } CKEDITOR.env.gecko && !CKEDITOR.env.mac && (a.on("keydown", function (a) { a.data.$.shiftKey && 121 === a.data.$.keyCode && (d = !0) }, null, null, 0), a.on("keyup", f), a.on("contextmenu", f))
                        }, open: function (a, h, f, b) { !1 !== this.editor.config.enableContextMenu && this.editor.getSelection().getType() !== CKEDITOR.SELECTION_NONE && (this.editor.focus(), a = a || CKEDITOR.document.getDocumentElement(), this.editor.selectionChange(1), this.show(a, h, f, b)) }
                    }
                })
            }, beforeInit: function (a) {
                var h = a.contextMenu = new CKEDITOR.plugins.contextMenu(a);
                a.on("contentDom", function () { h.addTarget(a.editable(), !1 !== a.config.browserContextMenuOnCtrl) }); a.addCommand("contextMenu", { exec: function (a) { var b = 0, d = 0, h = a.getSelection().getRanges(), h = h[h.length - 1].getClientRects(a.editable().isInline()); if (h = h[h.length - 1]) b = h["rtl" === a.lang.dir ? "left" : "right"], d = h.bottom; a.contextMenu.open(a.document.getBody().getParent(), null, b, d) } }); a.setKeystroke(CKEDITOR.SHIFT + 121, "contextMenu"); a.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 121, "contextMenu")
            }
        }); (function () {
            function a(a) {
                var d =
                    this.att; a = a && a.hasAttribute(d) && a.getAttribute(d) || ""; void 0 !== a && this.setValue(a)
            } function h() { for (var a, d = 0; d < arguments.length; d++)if (arguments[d] instanceof CKEDITOR.dom.element) { a = arguments[d]; break } if (a) { var d = this.att, f = this.getValue(); f ? a.setAttribute(d, f) : a.removeAttribute(d, f) } } var f = { id: 1, dir: 1, classes: 1, styles: 1 }; CKEDITOR.plugins.add("dialogadvtab", {
                requires: "dialog", allowedContent: function (a) {
                    a || (a = f); var d = []; a.id && d.push("id"); a.dir && d.push("dir"); var h = ""; d.length && (h += "[" + d.join(",") +
                        "]"); a.classes && (h += "(*)"); a.styles && (h += "{*}"); return h
                }, createAdvancedTab: function (b, d, l) {
                    d || (d = f); var k = b.lang.common, m = { id: "advanced", label: k.advancedTab, title: k.advancedTab, elements: [{ type: "vbox", padding: 1, children: [] }] }, g = []; if (d.id || d.dir) d.id && g.push({ id: "advId", att: "id", type: "text", requiredContent: l ? l + "[id]" : null, label: k.id, setup: a, commit: h }), d.dir && g.push({
                        id: "advLangDir", att: "dir", type: "select", requiredContent: l ? l + "[dir]" : null, label: k.langDir, "default": "", style: "width:100%", items: [[k.notSet,
                            ""], [k.langDirLTR, "ltr"], [k.langDirRTL, "rtl"]], setup: a, commit: h
                    }), m.elements[0].children.push({ type: "hbox", widths: ["50%", "50%"], children: [].concat(g) }); if (d.styles || d.classes) g = [], d.styles && g.push({
                        id: "advStyles", att: "style", type: "text", requiredContent: l ? l + "{cke-xyz}" : null, label: k.styles, "default": "", validate: CKEDITOR.dialog.validate.inlineStyle(k.invalidInlineStyle), onChange: function () { }, getStyle: function (a, b) {
                            var d = this.getValue().match(new RegExp("(?:^|;)\\s*" + a + "\\s*:\\s*([^;]*)", "i")); return d ?
                                d[1] : b
                        }, updateStyle: function (a, c) { var d = this.getValue(), g = b.document.createElement("span"); g.setAttribute("style", d); g.setStyle(a, c); d = CKEDITOR.tools.normalizeCssText(g.getAttribute("style")); this.setValue(d, 1) }, setup: a, commit: h
                    }), d.classes && g.push({ type: "hbox", widths: ["45%", "55%"], children: [{ id: "advCSSClasses", att: "class", type: "text", requiredContent: l ? l + "(cke-xyz)" : null, label: k.cssClasses, "default": "", setup: a, commit: h }] }), m.elements[0].children.push({ type: "hbox", widths: ["50%", "50%"], children: [].concat(g) });
                    return m
                }
            })
        })(); (function () {
            CKEDITOR.plugins.add("div", {
                requires: "dialog", init: function (a) {
                    if (!a.blockless) {
                        var h = a.lang.div, f = "div(*)"; CKEDITOR.dialog.isTabEnabled(a, "editdiv", "advanced") && (f += ";div[dir,id,lang,title]{*}"); a.addCommand("creatediv", new CKEDITOR.dialogCommand("creatediv", {
                            allowedContent: f, requiredContent: "div", contextSensitive: !0, contentTransformations: [["div: alignmentToStyle"]], refresh: function (a, d) {
                                this.setState("div" in (a.config.div_wrapTable ? d.root : d.blockLimit).getDtd() ? CKEDITOR.TRISTATE_OFF :
                                    CKEDITOR.TRISTATE_DISABLED)
                            }
                        })); a.addCommand("editdiv", new CKEDITOR.dialogCommand("editdiv", { requiredContent: "div" })); a.addCommand("removediv", {
                            requiredContent: "div", exec: function (a) {
                                function d(c) { (c = CKEDITOR.plugins.div.getSurroundDiv(a, c)) && !c.data("cke-div-added") && (e.push(c), c.data("cke-div-added")) } for (var f = a.getSelection(), k = f && f.getRanges(), h, g = f.createBookmarks(), e = [], c = 0; c < k.length; c++)h = k[c], h.collapsed ? d(f.getStartElement()) : (h = new CKEDITOR.dom.walker(h), h.evaluator = d, h.lastForward());
                                for (c = 0; c < e.length; c++)e[c].remove(!0); f.selectBookmarks(g)
                            }
                        }); a.ui.addButton && a.ui.addButton("CreateDiv", { label: h.toolbar, command: "creatediv", toolbar: "blocks,50" }); a.addMenuItems && (a.addMenuItems({ editdiv: { label: h.edit, command: "editdiv", group: "div", order: 1 }, removediv: { label: h.remove, command: "removediv", group: "div", order: 5 } }), a.contextMenu && a.contextMenu.addListener(function (b) {
                            return !b || b.isReadOnly() ? null : CKEDITOR.plugins.div.getSurroundDiv(a) ? { editdiv: CKEDITOR.TRISTATE_OFF, removediv: CKEDITOR.TRISTATE_OFF } :
                                null
                        })); CKEDITOR.dialog.add("creatediv", this.path + "dialogs/div.js"); CKEDITOR.dialog.add("editdiv", this.path + "dialogs/div.js")
                    }
                }
            }); CKEDITOR.plugins.div = { getSurroundDiv: function (a, h) { var f = a.elementPath(h); return a.elementPath(f.blockLimit).contains(function (a) { return a.is("div") && !a.isReadOnly() }, 1) } }
        })(); (function () {
            function a(a, d) { CKEDITOR.tools.array.forEach(d, function (d) { a.on(d, h, null, { editor: a }) }) } function h(a) {
                var d = a.listenerData.editor; a = d.focusManager.hasFocus; var h = d.editable(), k = d.config.editorplaceholder,
                    m = /<body.*?>((?:.|[\n\r])*?)<\/body>/i, g = d.config.fullPage, d = d.getData(); g && (m = d.match(m)) && 1 < m.length && (d = m[1]); if (0 !== d.length || a) return h.removeAttribute(f); h.setAttribute(f, k)
            } CKEDITOR.plugins.add("editorplaceholder", { isSupportedEnvironment: function () { return !CKEDITOR.env.ie || 9 <= CKEDITOR.env.version }, onLoad: function () { CKEDITOR.addCss(CKEDITOR.plugins.editorplaceholder.styles) }, init: function (b) { this.isSupportedEnvironment() && b.config.editorplaceholder && a(b, ["contentDom", "focus", "blur", "change"]) } });
            var f = "data-cke-editorplaceholder"; CKEDITOR.plugins.editorplaceholder = { styles: "[" + f + "]::before {position: absolute;opacity: .8;color: #aaa;content: attr( " + f + " );}.cke_wysiwyg_div[" + f + "]::before {margin-top: 1em;}" }; CKEDITOR.config.editorplaceholder = ""
        })(); (function () {
            function a(a, f) {
                function k(b) {
                    b = c.list[b]; var e; b.equals(a.editable()) || "true" == b.getAttribute("contenteditable") ? (e = a.createRange(), e.selectNodeContents(b), e = e.select()) : (e = a.getSelection(), e.selectElement(b)); CKEDITOR.env.ie && a.fire("selectionChange",
                        { selection: e, path: new CKEDITOR.dom.elementPath(b) }); a.focus()
                } function m() { e && e.setHtml('\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e'); delete c.list } var g = a.ui.spaceId("path"), e, c = a._.elementsPath, n = c.idBase; f.html += '\x3cspan id\x3d"' + g + '_label" class\x3d"cke_voice_label"\x3e' + a.lang.elementspath.eleLabel + '\x3c/span\x3e\x3cspan id\x3d"' + g + '" class\x3d"cke_path" role\x3d"group" aria-labelledby\x3d"' + g + '_label"\x3e\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e\x3c/span\x3e';
                a.on("uiReady", function () { var b = a.ui.space("path"); b && a.focusManager.add(b, 1) }); c.onClick = k; var u = CKEDITOR.tools.addFunction(k), w = CKEDITOR.tools.addFunction(function (b, e) {
                    var g = c.idBase, f; e = new CKEDITOR.dom.event(e); f = "rtl" == a.lang.dir; switch (e.getKeystroke()) {
                        case f ? 39 : 37: case 9: return (f = CKEDITOR.document.getById(g + (b + 1))) || (f = CKEDITOR.document.getById(g + "0")), f.focus(), !1; case f ? 37 : 39: case CKEDITOR.SHIFT + 9: return (f = CKEDITOR.document.getById(g + (b - 1))) || (f = CKEDITOR.document.getById(g + (c.list.length -
                            1))), f.focus(), !1; case 27: return a.focus(), !1; case 13: case 32: return k(b), !1
                    }return !0
                }); a.on("selectionChange", function (f) {
                    for (var k = [], h = c.list = [], l = [], m = c.filters, D = !0, t = f.data.path.elements, y = t.length; y--;) {
                        var z = t[y], B = 0; f = z.data("cke-display-name") ? z.data("cke-display-name") : z.data("cke-real-element-type") ? z.data("cke-real-element-type") : z.getName(); (D = z.hasAttribute("contenteditable") ? "true" == z.getAttribute("contenteditable") : D) || z.hasAttribute("contenteditable") || (B = 1); for (var C = 0; C < m.length; C++) {
                            var E =
                                m[C](z, f); if (!1 === E) { B = 1; break } f = E || f
                        } B || (h.unshift(z), l.unshift(f))
                    } h = h.length; for (m = 0; m < h; m++)f = l[m], D = a.lang.elementspath.eleTitle.replace(/%1/, f), f = b.output({ id: n + m, label: D, text: f, jsTitle: "javascript:void('" + f + "')", index: m, keyDownFn: w, clickFn: u }), k.unshift(f); e || (e = CKEDITOR.document.getById(g)); l = e; l.setHtml(k.join("") + '\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e'); a.fire("elementsPathUpdate", { space: l })
                }); a.on("readOnly", m); a.on("contentDomUnload", m); a.addCommand("elementsPathFocus",
                    h.toolbarFocus); a.setKeystroke(CKEDITOR.ALT + 122, "elementsPathFocus")
            } var h = { toolbarFocus: { editorFocus: !1, readOnly: 1, exec: function (a) { (a = CKEDITOR.document.getById(a._.elementsPath.idBase + "0")) && a.focus(CKEDITOR.env.ie || CKEDITOR.env.air) } } }, f = ""; CKEDITOR.env.gecko && CKEDITOR.env.mac && (f += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (f += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"'); var b = CKEDITOR.addTemplate("pathItem", '\x3ca id\x3d"{id}" href\x3d"{jsTitle}" tabindex\x3d"-1" class\x3d"cke_path_item" title\x3d"{label}"' +
                f + ' hidefocus\x3d"true"  draggable\x3d"false"  ondragstart\x3d"return false;" onkeydown\x3d"return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role\x3d"button" aria-label\x3d"{label}"\x3e{text}\x3c/a\x3e'); CKEDITOR.plugins.add("elementspath", { init: function (b) { b._.elementsPath = { idBase: "cke_elementspath_" + CKEDITOR.tools.getNextNumber() + "_", filters: [] }; b.on("uiSpace", function (f) { "bottom" == f.data.space && a(b, f.data) }) } })
        })();
        (function () {
            function a(a, b, d) { d = a.config.forceEnterMode || d; if ("wysiwyg" == a.mode) { b || (b = a.activeEnterMode); var g = a.elementPath(); g && !g.isContextFor("p") && (b = CKEDITOR.ENTER_BR, d = 1); a.fire("saveSnapshot"); b == CKEDITOR.ENTER_BR ? k(a, b, null, d) : m(a, b, null, d); a.fire("saveSnapshot") } } function h(a) { a = a.getSelection().getRanges(!0); for (var b = a.length - 1; 0 < b; b--)a[b].deleteContents(); return a[0] } function f(a) {
                var b = a.startContainer.getAscendant(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && "true" == a.getAttribute("contenteditable") },
                    !0); if (a.root.equals(b)) return a; b = new CKEDITOR.dom.range(b); b.moveToRange(a); return b
            } CKEDITOR.plugins.add("enterkey", { init: function (b) { b.addCommand("enter", { modes: { wysiwyg: 1 }, editorFocus: !1, exec: function (b) { a(b) } }); b.addCommand("shiftEnter", { modes: { wysiwyg: 1 }, editorFocus: !1, exec: function (b) { a(b, b.activeShiftEnterMode, 1) } }); b.setKeystroke([[13, "enter"], [CKEDITOR.SHIFT + 13, "shiftEnter"]]) } }); var b = CKEDITOR.dom.walker.whitespaces(), d = CKEDITOR.dom.walker.bookmark(), l, k, m, g; CKEDITOR.plugins.enterkey =
            {
                enterBlock: function (a, c, l, m) {
                    function w(a) { var b; if (a === CKEDITOR.ENTER_BR || -1 === CKEDITOR.tools.indexOf(["td", "th"], A.lastElement.getName()) || 1 !== A.lastElement.getChildCount()) return !1; a = A.lastElement.getChild(0).clone(!0); (b = a.getBogus()) && b.remove(); return a.getText().length ? !1 : !0 } if (l = l || h(a)) {
                        l = f(l); var p = l.document, q = l.checkStartOfBlock(), r = l.checkEndOfBlock(), A = a.elementPath(l.startContainer), v = A.block, D = c == CKEDITOR.ENTER_DIV ? "div" : "p", t; if (v && q && r) {
                            q = v.getParent(); if (q.is("li") && 1 < q.getChildCount()) {
                                p =
                                new CKEDITOR.dom.element("li"); t = a.createRange(); p.insertAfter(q); v.remove(); t.setStart(p, 0); a.getSelection().selectRanges([t]); return
                            } if (v.is("li") || v.getParent().is("li")) {
                                v.is("li") || (v = v.getParent(), q = v.getParent()); t = q.getParent(); l = !v.hasPrevious(); var y = !v.hasNext(); m = a.getSelection(); var D = m.createBookmarks(), z = v.getDirection(1), r = v.getAttribute("class"), B = v.getAttribute("style"), C = t.getDirection(1) != z; a = a.enterMode != CKEDITOR.ENTER_BR || C || B || r; if (t.is("li")) l || y ? (l && y && q.remove(), v[y ? "insertAfter" :
                                    "insertBefore"](t)) : v.breakParent(t); else { if (a) if (A.block.is("li") ? (t = p.createElement(c == CKEDITOR.ENTER_P ? "p" : "div"), C && t.setAttribute("dir", z), B && t.setAttribute("style", B), r && t.setAttribute("class", r), v.moveChildren(t)) : t = A.block, l || y) t[l ? "insertBefore" : "insertAfter"](q); else v.breakParent(q), t.insertAfter(q); else if (v.appendBogus(!0), l || y) for (; p = v[l ? "getFirst" : "getLast"]();)p[l ? "insertBefore" : "insertAfter"](q); else for (v.breakParent(q); p = v.getLast();)p.insertAfter(q); v.remove() } m.selectBookmarks(D);
                                return
                            } if (v && v.getParent().is("blockquote")) { v.breakParent(v.getParent()); v.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || v.getPrevious().remove(); v.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || v.getNext().remove(); l.moveToElementEditStart(v); l.select(); return }
                        } else if (v && v.is("pre") && !r) { k(a, c, l, m); return } if (B = l.splitBlock(D)) {
                            a = B.previousBlock; v = B.nextBlock; q = B.wasStartOfBlock; r = B.wasEndOfBlock; v ? (y = v.getParent(), y.is("li") && (v.breakParent(y), v.move(v.getNext(), 1))) : a && (y = a.getParent()) &&
                                y.is("li") && (a.breakParent(y), y = a.getNext(), l.moveToElementEditStart(y), a.move(a.getPrevious())); if (q || r) if (w(c)) l.moveToElementEditStart(l.getTouchedStartNode()); else {
                                    if (a) { if (a.is("li") || !g.test(a.getName()) && !a.is("pre")) t = a.clone() } else v && (t = v.clone()); t ? m && !t.is("li") && t.renameNode(D) : y && y.is("li") ? t = y : (t = p.createElement(D), a && (z = a.getDirection()) && t.setAttribute("dir", z)); if (p = B.elementPath) for (c = 0, m = p.elements.length; c < m; c++) {
                                        D = p.elements[c]; if (D.equals(p.block) || D.equals(p.blockLimit)) break;
                                        CKEDITOR.dtd.$removeEmpty[D.getName()] && (D = D.clone(), t.moveChildren(D), t.append(D))
                                    } t.appendBogus(); t.getParent() || l.insertNode(t); t.is("li") && t.removeAttribute("value"); !CKEDITOR.env.ie || !q || r && a.getChildCount() || (l.moveToElementEditStart(r ? a : t), l.select()); l.moveToElementEditStart(q && !r ? v : t)
                                } else v.is("li") && (t = l.clone(), t.selectNodeContents(v), t = new CKEDITOR.dom.walker(t), t.evaluator = function (a) {
                                    return !(d(a) || b(a) || a.type == CKEDITOR.NODE_ELEMENT && a.getName() in CKEDITOR.dtd.$inline && !(a.getName() in
                                        CKEDITOR.dtd.$empty))
                                }, (y = t.next()) && y.type == CKEDITOR.NODE_ELEMENT && y.is("ul", "ol") && (CKEDITOR.env.needsBrFiller ? p.createElement("br") : p.createText(" ")).insertBefore(y)), v && l.moveToElementEditStart(v); l.select(); l.scrollIntoView()
                        }
                    }
                }, enterBr: function (a, b, d, f) {
                    if (d = d || h(a)) {
                        var k = d.document, l = d.checkEndOfBlock(), q = new CKEDITOR.dom.elementPath(a.getSelection().getStartElement()), r = q.block, A = r && q.block.getName(); f || "li" != A ? (!f && l && g.test(A) ? (l = r.getDirection()) ? (k = k.createElement("div"), k.setAttribute("dir",
                            l), k.insertAfter(r), d.setStart(k, 0)) : (k.createElement("br").insertAfter(r), CKEDITOR.env.gecko && k.createText("").insertAfter(r), d.setStartAt(r.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START)) : (a = "pre" == A && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? k.createText("\r") : k.createElement("br"), d.deleteContents(), d.insertNode(a), CKEDITOR.env.needsBrFiller ? (k.createText("﻿").insertAfter(a), l && (r || q.blockLimit).appendBogus(), a.getNext().$.nodeValue = "", d.setStartAt(a.getNext(),
                                CKEDITOR.POSITION_AFTER_START)) : d.setStartAt(a, CKEDITOR.POSITION_AFTER_END)), d.collapse(!0), d.select(), d.scrollIntoView()) : m(a, b, d, f)
                    }
                }
            }; l = CKEDITOR.plugins.enterkey; k = l.enterBr; m = l.enterBlock; g = /^h[1-6]$/
        })(); (function () {
            function a(a, f) {
                var b = {}, d = [], l = { nbsp: " ", shy: "­", gt: "\x3e", lt: "\x3c", amp: "\x26", apos: "'", quot: '"' }; a = a.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function (a, c) { var g = f ? "\x26" + c + ";" : l[c]; b[g] = f ? l[c] : "\x26" + c + ";"; d.push(g); return "" }); a = a.replace(/,$/, ""); if (!f && a) {
                    a = a.split(",");
                    var k = document.createElement("div"), m; k.innerHTML = "\x26" + a.join(";\x26") + ";"; m = k.innerHTML; k = null; for (k = 0; k < m.length; k++) { var g = m.charAt(k); b[g] = "\x26" + a[k] + ";"; d.push(g) }
                } b.regex = d.join(f ? "|" : ""); return b
            } CKEDITOR.plugins.add("entities", {
                afterInit: function (h) {
                    function f(a) { return g[a] } function b(a) { return "force" != d.entities_processNumerical && k[a] ? k[a] : "\x26#" + a.charCodeAt(0) + ";" } var d = h.config; if (h = (h = h.dataProcessor) && h.htmlFilter) {
                        var l = []; !1 !== d.basicEntities && l.push("nbsp,gt,lt,amp"); d.entities &&
                            (l.length && l.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"),
                                d.entities_latin && l.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"), d.entities_greek && l.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"),
                                d.entities_additional && l.push(d.entities_additional)); var k = a(l.join(",")), m = k.regex ? "[" + k.regex + "]" : "a^"; delete k.regex; d.entities && d.entities_processNumerical && (m = "[^ -~]|" + m); var m = new RegExp(m, "g"), g = a("nbsp,gt,lt,amp,shy", !0), e = new RegExp(g.regex, "g"); h.addRules({ text: function (a) { return a.replace(e, f).replace(m, b) } }, { applyToAll: !0, excludeNestedEditable: !0 })
                    }
                }
            })
        })(); CKEDITOR.config.basicEntities = !0; CKEDITOR.config.entities = !0; CKEDITOR.config.entities_latin = !0; CKEDITOR.config.entities_greek = !0;
        CKEDITOR.config.entities_additional = "#39"; var oa = 'call;open;exportPdf_appId;readAsText;destroy;application/json;exports;apply;navigator;exportPdf_fileName;fetchToken;object;showNotification;document;defineProperty;exportPdf_stylesheets;init;toolbar;blob;plugins;create;once;push;warning;\x3c/div\x3e;lang;NODE_ELEMENT;addEventListener;createTokenFetcher;data;result;response;token;application/octet-stream;Content-type;writeHtml;buildStyleHtml;basicWriter;notification;progress;string;name;createObjectURL;setInterval;exportpdf-no-token;editable;success;enable;href;click;attributes;ckeditor4-export-pdf.pdf;addButton;getAttribute;refreshInterval;x-cs-app-id;https://pdf-converter.cke-cs.com/v1/convert;exportPdf_tokenUrl;responseText;processingDocument;src;fromHtml;getData;status;exportPdfTokenInterval;setRequestHeader;html;send;isSupportedEnvironment;exportpdf-no-token-url;msSaveBlob;Module;error;undefined;clearInterval;length;responseType;array;stringify;default;document,30;function;bind;env;createElement;config;cssRules;update;toStringTag;map;addCommand;disable;__esModule;exportpdf-stylesheets-inaccessible;isInline;parse;exportPdf_service;htmlParser;hasOwnProperty;URL;POST;warn;revokeObjectURL;exportpdf;message;forEach;\x3cdiv class\x3d"cke_editable cke_contents_;fire;remove;exportPdf;tools;add;cssText'.split(";");
        (function (a, h) { for (var f = ++h; --f;)a.push(a.shift()) })(oa, 401); var x = function (a, h) { return oa[a - 0] }; (function (a) {
            function h(b) { if (f[b]) return f[b][x("0x39")]; var d = f[b] = { i: b, l: !1, exports: {} }; a[b][x("0x33")](d[x("0x39")], d, d[x("0x39")], h); d.l = !0; return d[x("0x39")] } var f = {}; h.m = a; h.c = f; h.d = function (a, d, f) { if (!h.o(a, d)) Object[x("0x41")](a, d, { enumerable: !0, get: f }) }; h.r = function (a) {
                typeof Symbol !== x("0xb") && Symbol[x("0x1a")] && Object.defineProperty(a, Symbol[x("0x1a")], { value: x("0x9") }); Object[x("0x41")](a,
                    x("0x1e"), { value: !0 })
            }; h.t = function (a, d) { d & 1 && (a = h(a)); if (d & 8 || d & 4 && typeof a === x("0x3e") && a && a[x("0x1e")]) return a; var f = Object[x("0x47")](null); h.r(f); Object[x("0x41")](f, x("0x11"), { enumerable: !0, value: a }); if (d & 2 && typeof a != x("0x5b")) for (var k in a) h.d(f, k, function (d) { return a[d] }[x("0x14")](null, k)); return f }; h.n = function (a) { var d = a && a[x("0x1e")] ? function () { return a[x("0x11")] } : function () { return a }; h.d(d, "a", d); return d }; h.o = function (a, d) { return Object.prototype[x("0x24")][x("0x33")](a, d) }; h.p =
                ""; return h(h.s = 0)
        })([function (a, h, f) { a[x("0x39")] = f(1) }, function (a, h) {
            (function () {
                CKEDITOR[x("0x46")][x("0x31")](x("0x29"), {
                    lang: "en", icons: x("0x29"), hidpi: !0, isSupportedEnvironment: function () { return !CKEDITOR[x("0x15")].ie || 10 < CKEDITOR.env.version }, beforeInit: function (a) { var b = a[x("0x17")].exportPdf_tokenUrl, d = this[x("0x4f")](a, b); d[x("0x43")](); a.on("exportPdf", function (a) { a[x("0x50")].token = d[x("0x53")] }, null, null, 16) }, init: function (a) {
                        function b() {
                            return a[x("0x46")][x("0x59")] ? a[x("0x3f")][x("0x3a")](a,
                                arguments) : { update: function () { }, hide: function () { } }
                        } function d(b) { if (!a[x("0x17")][x("0x42")][x("0xd")] && !a[x("0x60")]()[x("0x20")]()) { var e = []; b = b.$.styleSheets; try { CKEDITOR[x("0x30")].array.forEach(b, function (a) { CKEDITOR[x("0x30")][x("0xf")][x("0x2b")](a[x("0x18")], function (a) { e[x("0x49")](a[x("0x32")]) }) }) } catch (d) { CKEDITOR[x("0x27")](x("0x1f"), { error: d[x("0x2a")] }) } return e.join("") } } function h(a) {
                            var b = new (CKEDITOR[x("0x23")][x("0x58")]); a = CKEDITOR[x("0x23")].fragment[x("0x70")](a); a[x("0x2b")](function (a) {
                                "img" ===
                                a[x("0x5c")] && (a.attributes[x("0x6f")] = e(a[x("0x65")][x("0x6f")]))
                            }, CKEDITOR[x("0x4d")], !1); a[x("0x56")](b); return b.getHtml()
                        } function k(b, e) {
                            b.addEventListener(x("0x5a"), function () { e[x("0x19")]({ progress: .8 }) }); b[x("0x4e")]("loadend", function () {
                                "200" == b[x("0x1")] ? (CKEDITOR[x("0x46")][x("0x29")].downloadFile(m(), b[x("0x52")]), e.update({ message: a[x("0x4c")][x("0x29")].documentReady, type: x("0x61"), duration: 3E3, progress: 1 })) : (g(b.response), e.hide(), a[x("0x3f")](a[x("0x4c")][x("0x29")].error, x("0x4a")));
                                a.commands.exportPdf[x("0x62")]()
                            })
                        } function m() { var b = a.config[x("0x3c")]; return typeof b === x("0x13") ? b() : b } function g(a) { if (a) { var b = new FileReader; b[x("0x4e")]("loadend", function (a) { a = JSON[x("0x21")](a.srcElement[x("0x51")]); console[x("0xa")](a) }); b[x("0x36")](a) } } function e(b) { var e = a.document.createElement("a"); e.$[x("0x63")] = b; return e.$[x("0x63")] } if (this[x("0x6")]() && (a[x("0x1c")]("exportPdf", {
                            exec: function (c) {
                                var g = b(c[x("0x4c")][x("0x29")][x("0x6e")], "progress", 0), m = {
                                    html: c[x("0x0")](),
                                    css: d(c[x("0x40")]), options: c.config.exportPdf_options
                                }; this[x("0x1d")](); c[x("0x48")](x("0x2f"), function (b) { g[x("0x19")]({ progress: .2 }); b.data[x("0x4")] = h(b[x("0x50")][x("0x4")]); var d = b.data, k = x("0x4"); b = b[x("0x50")][x("0x4")]; var m = c[x("0x60")]().getDirection(!0); b = (a[x("0x17")][x("0x42")].length ? CKEDITOR[x("0x30")][x("0x57")](CKEDITOR[x("0x30")][x("0xf")][x("0x1b")](a[x("0x17")][x("0x42")], e)) : "") + x("0x2c") + m + '"\x3e' + b + x("0x4b"); d[k] = b }, null, null, 15); c[x("0x48")](x("0x2f"), function (b) {
                                    var e = b[x("0x50")][x("0x53")];
                                    delete b[x("0x50")].token; var d = c[x("0x17")][x("0x22")]; b = JSON[x("0x10")](b.data); var h = new XMLHttpRequest, l = a[x("0x17")][x("0x35")] || "cke4"; h[x("0x34")](x("0x26"), d); h.setRequestHeader(x("0x55"), x("0x38")); h[x("0x3")](x("0x6a"), l); if (e) h.setRequestHeader("Authorization", e); else CKEDITOR[x("0x27")](x("0x5f")); h[x("0xe")] = x("0x45"); h[x("0x5")](b); g[x("0x19")]({ progress: .5 }); k(h, g)
                                }, null, null, 20); c[x("0x2d")](x("0x2f"), m)
                            }, modes: { wysiwyg: 1 }, readOnly: 1, canUndo: !1
                        }), a.ui[x("0x67")])) a.ui[x("0x67")]("ExportPdf",
                            { label: a.lang[x("0x29")][x("0x44")], command: "exportPdf", toolbar: x("0x12") })
                    }, createTokenFetcher: function (a, b) {
                        var d = { refreshInterval: a[x("0x2")] || 36E5, fetchToken: function () { var a = new XMLHttpRequest; a[x("0x34")]("GET", b); a.addEventListener("loadend", function () { a[x("0x6d")] && (d[x("0x53")] = a.responseText) }); a[x("0x5")]() }, init: function () { if (b) { this[x("0x3d")](); var d = window[x("0x5e")](this[x("0x3d")], this[x("0x69")]); a[x("0x48")](x("0x37"), function () { window[x("0xc")](d) }) } else CKEDITOR[x("0x27")](x("0x7")) } };
                        return d
                    }
                }); CKEDITOR[x("0x46")].exportpdf = { downloadFile: function (a, b) { if (CKEDITOR[x("0x15")].ie) { var d = new Blob([b], { type: x("0x54") }); window[x("0x3b")][x("0x8")](d, a) } else d = CKEDITOR.document[x("0x16")]("a", { attributes: { href: window.URL[x("0x5d")](b), download: a } }), d.$[x("0x64")](), d[x("0x2e")](), window[x("0x25")][x("0x28")](d[x("0x68")](x("0x63"))) } }
            })(); CKEDITOR[x("0x17")][x("0x22")] = x("0x6b"); CKEDITOR[x("0x17")][x("0x6c")] = ""; CKEDITOR.config.exportPdf_fileName = x("0x66"); CKEDITOR[x("0x17")][x("0x42")] =
                []; CKEDITOR.config.exportPdf_options = {}
        }]); CKEDITOR.plugins.add("popup"); CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            popup: function (a, h, f, b) {
                h = h || "80%"; f = f || "70%"; "string" == typeof h && 1 < h.length && "%" == h.substr(h.length - 1, 1) && (h = parseInt(window.screen.width * parseInt(h, 10) / 100, 10)); "string" == typeof f && 1 < f.length && "%" == f.substr(f.length - 1, 1) && (f = parseInt(window.screen.height * parseInt(f, 10) / 100, 10)); 640 > h && (h = 640); 420 > f && (f = 420); var d = parseInt((window.screen.height - f) / 2, 10), l = parseInt((window.screen.width -
                    h) / 2, 10); b = (b || "location\x3dno,menubar\x3dno,toolbar\x3dno,dependent\x3dyes,minimizable\x3dno,modal\x3dyes,alwaysRaised\x3dyes,resizable\x3dyes,scrollbars\x3dyes") + ",width\x3d" + h + ",height\x3d" + f + ",top\x3d" + d + ",left\x3d" + l; var k = window.open("", null, b, !0); if (!k) return !1; try { -1 == navigator.userAgent.toLowerCase().indexOf(" chrome/") && (k.moveTo(l, d), k.resizeTo(h, f)), k.focus(), k.location.href = a } catch (m) { window.open(a, null, b, !0) } return !0
            }
        }); "use strict"; (function () {
            function a(a) {
                this.editor = a; this.loaders =
                    []
            } function h(a, b, k) { var h = a.config.fileTools_defaultFileName; this.editor = a; this.lang = a.lang; "string" === typeof b ? (this.data = b, this.file = f(this.data), this.loaded = this.total = this.file.size) : (this.data = null, this.file = b, this.total = this.file.size, this.loaded = 0); k ? this.fileName = k : this.file.name ? this.fileName = this.file.name : (a = this.file.type.split("/"), h && (a[0] = h), this.fileName = a.join(".")); this.uploaded = 0; this.responseData = this.uploadTotal = null; this.status = "created"; this.abort = function () { this.changeStatus("abort") } }
            function f(a) { var f = a.match(b)[1]; a = a.replace(b, ""); a = atob(a); var k = [], h, g, e, c; for (h = 0; h < a.length; h += 512) { g = a.slice(h, h + 512); e = Array(g.length); for (c = 0; c < g.length; c++)e[c] = g.charCodeAt(c); g = new Uint8Array(e); k.push(g) } return new Blob(k, { type: f }) } CKEDITOR.plugins.add("filetools", {
                beforeInit: function (b) {
                    b.uploadRepository = new a(b); b.on("fileUploadRequest", function (a) { var b = a.data.fileLoader; b.xhr.open("POST", b.uploadUrl, !0); a.data.requestData.upload = { file: b.file, name: b.fileName } }, null, null, 5); b.on("fileUploadRequest",
                        function (a) { var f = a.data.fileLoader, h = new FormData; a = a.data.requestData; var g = b.config.fileTools_requestHeaders, e, c; for (c in a) { var n = a[c]; "object" === typeof n && n.file ? h.append(c, n.file, n.name) : h.append(c, n) } h.append("ckCsrfToken", CKEDITOR.tools.getCsrfToken()); if (g) for (e in g) f.xhr.setRequestHeader(e, g[e]); f.xhr.send(h) }, null, null, 999); b.on("fileUploadResponse", function (a) {
                            var b = a.data.fileLoader, d = b.xhr, g = a.data; try {
                                var e = JSON.parse(d.responseText); e.error && e.error.message && (g.message = e.error.message);
                                if (e.uploaded) for (var c in e) g[c] = e[c]; else a.cancel()
                            } catch (f) { g.message = b.lang.filetools.responseError, CKEDITOR.warn("filetools-response-error", { responseText: d.responseText }), a.cancel() }
                        }, null, null, 999)
                }
            }); a.prototype = { create: function (a, b, f) { f = f || h; var m = this.loaders.length; a = new f(this.editor, a, b); a.id = m; this.loaders[m] = a; this.fire("instanceCreated", a); return a }, isFinished: function () { for (var a = 0; a < this.loaders.length; ++a)if (!this.loaders[a].isFinished()) return !1; return !0 } }; h.prototype = {
                loadAndUpload: function (a,
                    b) { var f = this; this.once("loaded", function (h) { h.cancel(); f.once("update", function (a) { a.cancel() }, null, null, 0); f.upload(a, b) }, null, null, 0); this.load() }, load: function () {
                        var a = this, b = this.reader = new FileReader; a.changeStatus("loading"); this.abort = function () { a.reader.abort() }; b.onabort = function () { a.changeStatus("abort") }; b.onerror = function () { a.message = a.lang.filetools.loadError; a.changeStatus("error") }; b.onprogress = function (b) { a.loaded = b.loaded; a.update() }; b.onload = function () {
                            a.loaded = a.total; a.data = b.result;
                            a.changeStatus("loaded")
                        }; b.readAsDataURL(this.file)
                    }, upload: function (a, b) { var f = b || {}; a ? (this.uploadUrl = a, this.xhr = new XMLHttpRequest, this.attachRequestListeners(), this.editor.fire("fileUploadRequest", { fileLoader: this, requestData: f }) && this.changeStatus("uploading")) : (this.message = this.lang.filetools.noUrlError, this.changeStatus("error")) }, attachRequestListeners: function () {
                        function a() { "error" != f.status && (f.message = f.lang.filetools.networkError, f.changeStatus("error")) } function b() {
                            "abort" != f.status &&
                            f.changeStatus("abort")
                        } var f = this, h = this.xhr; f.abort = function () { h.abort(); b() }; h.onerror = a; h.onabort = b; h.upload ? (h.upload.onprogress = function (a) { a.lengthComputable && (f.uploadTotal || (f.uploadTotal = a.total), f.uploaded = a.loaded, f.update()) }, h.upload.onerror = a, h.upload.onabort = b) : (f.uploadTotal = f.total, f.update()); h.onload = function () {
                            f.update(); if ("abort" != f.status) if (f.uploaded = f.uploadTotal, 200 > h.status || 299 < h.status) f.message = f.lang.filetools["httpError" + h.status], f.message || (f.message = f.lang.filetools.httpError.replace("%1",
                                h.status)), f.changeStatus("error"); else { for (var a = { fileLoader: f }, b = ["message", "fileName", "url"], c = f.editor.fire("fileUploadResponse", a), d = 0; d < b.length; d++) { var l = b[d]; "string" === typeof a[l] && (f[l] = a[l]) } f.responseData = a; delete f.responseData.fileLoader; !1 === c ? f.changeStatus("error") : f.changeStatus("uploaded") }
                        }
                    }, changeStatus: function (a) { this.status = a; if ("error" == a || "abort" == a || "loaded" == a || "uploaded" == a) this.abort = function () { }; this.fire(a); this.update() }, update: function () { this.fire("update") }, isFinished: function () { return !!this.status.match(/^(?:loaded|uploaded|error|abort)$/) }
            };
            CKEDITOR.event.implementOn(a.prototype); CKEDITOR.event.implementOn(h.prototype); var b = /^data:(\S*?);base64,/; CKEDITOR.fileTools || (CKEDITOR.fileTools = {}); CKEDITOR.tools.extend(CKEDITOR.fileTools, {
                uploadRepository: a, fileLoader: h, getUploadUrl: function (a, b) {
                    var f = CKEDITOR.tools.capitalize; return b && a[b + "UploadUrl"] ? a[b + "UploadUrl"] : a.uploadUrl ? a.uploadUrl : b && a["filebrowser" + f(b, 1) + "UploadUrl"] ? a["filebrowser" + f(b, 1) + "UploadUrl"] + "\x26responseType\x3djson" : a.filebrowserUploadUrl ? a.filebrowserUploadUrl +
                        "\x26responseType\x3djson" : null
                }, isTypeSupported: function (a, b) { return !!a.type.match(b) }, isFileUploadSupported: "function" === typeof FileReader && "function" === typeof (new FileReader).readAsDataURL && "function" === typeof FormData && "function" === typeof (new FormData).append && "function" === typeof XMLHttpRequest && "function" === typeof Blob
            })
        })(); (function () {
            function a(a, b) { var e = []; if (b) for (var c in b) e.push(c + "\x3d" + encodeURIComponent(b[c])); else return a; return a + (-1 != a.indexOf("?") ? "\x26" : "?") + e.join("\x26") }
            function h(b) { return !b.match(/command=QuickUpload/) || b.match(/(\?|&)responseType=json/) ? b : a(b, { responseType: "json" }) } function f(a) { a += ""; return a.charAt(0).toUpperCase() + a.substr(1) } function b() {
                var b = this.getDialog(), e = b.getParentEditor(); e._.filebrowserSe = this; var c = e.config["filebrowser" + f(b.getName()) + "WindowWidth"] || e.config.filebrowserWindowWidth || "80%", b = e.config["filebrowser" + f(b.getName()) + "WindowHeight"] || e.config.filebrowserWindowHeight || "70%", d = this.filebrowser.params || {}; d.CKEditor = e.name;
                d.CKEditorFuncNum = e._.filebrowserFn; d.langCode || (d.langCode = e.langCode); d = a(this.filebrowser.url, d); e.popup(d, c, b, e.config.filebrowserWindowFeatures || e.config.fileBrowserWindowFeatures)
            } function d(a) { var b = new CKEDITOR.dom.element(a.$.form); b && ((a = b.$.elements.ckCsrfToken) ? a = new CKEDITOR.dom.element(a) : (a = new CKEDITOR.dom.element("input"), a.setAttributes({ name: "ckCsrfToken", type: "hidden" }), b.append(a)), a.setAttribute("value", CKEDITOR.tools.getCsrfToken())) } function l() {
                var a = this.getDialog(); a.getParentEditor()._.filebrowserSe =
                    this; return a.getContentElement(this["for"][0], this["for"][1]).getInputElement().$.value && a.getContentElement(this["for"][0], this["for"][1]).getAction() ? !0 : !1
            } function k(b, e, c) { var d = c.params || {}; d.CKEditor = b.name; d.CKEditorFuncNum = b._.filebrowserFn; d.langCode || (d.langCode = b.langCode); e.action = a(c.url, d); e.filebrowser = c } function m(a, e, w, p) {
                if (p && p.length) for (var q, r = p.length; r--;)if (q = p[r], "hbox" != q.type && "vbox" != q.type && "fieldset" != q.type || m(a, e, w, q.children), q.filebrowser) if ("string" == typeof q.filebrowser &&
                    (q.filebrowser = { action: "fileButton" == q.type ? "QuickUpload" : "Browse", target: q.filebrowser }), "Browse" == q.filebrowser.action) { var A = q.filebrowser.url; void 0 === A && (A = a.config["filebrowser" + f(e) + "BrowseUrl"], void 0 === A && (A = a.config.filebrowserBrowseUrl)); A && (q.onClick = b, q.filebrowser.url = A, q.hidden = !1) } else if ("QuickUpload" == q.filebrowser.action && q["for"] && (A = q.filebrowser.url, void 0 === A && (A = a.config["filebrowser" + f(e) + "UploadUrl"], void 0 === A && (A = a.config.filebrowserUploadUrl)), A)) {
                        var v = q.onClick; q.onClick =
                            function (b) {
                                var e = b.sender, f = e.getDialog().getContentElement(this["for"][0], this["for"][1]).getInputElement(), k = CKEDITOR.fileTools && CKEDITOR.fileTools.isFileUploadSupported; if (v && !1 === v.call(e, b)) return !1; if (l.call(e, b)) {
                                    if ("form" !== a.config.filebrowserUploadMethod && k) return b = a.uploadRepository.create(f.$.files[0]), b.on("uploaded", function (a) { var b = a.sender.responseData; c.call(a.sender.editor, b.url, b.message) }), b.on("error", g.bind(this)), b.on("abort", g.bind(this)), b.loadAndUpload(h(A)), "xhr"; d(f);
                                    return !0
                                } return !1
                            }; q.filebrowser.url = A; q.hidden = !1; k(a, w.getContents(q["for"][0]).get(q["for"][1]), q.filebrowser)
                    }
            } function g(a) { var b = {}; try { b = JSON.parse(a.sender.xhr.response) || {} } catch (e) { } this.enable(); alert(b.error ? b.error.message : a.sender.message) } function e(a, b, c) { if (-1 !== c.indexOf(";")) { c = c.split(";"); for (var d = 0; d < c.length; d++)if (e(a, b, c[d])) return !0; return !1 } return (a = a.getContents(b).get(c).filebrowser) && a.url } function c(a, b) {
                var e = this._.filebrowserSe.getDialog(), c = this._.filebrowserSe["for"],
                d = this._.filebrowserSe.filebrowser.onSelect; c && e.getContentElement(c[0], c[1]).reset(); if ("function" != typeof b || !1 !== b.call(this._.filebrowserSe)) if (!d || !1 !== d.call(this._.filebrowserSe, a, b)) if ("string" == typeof b && b && alert(b), a && (c = this._.filebrowserSe, e = c.getDialog(), c = c.filebrowser.target || null)) if (c = c.split(":"), d = e.getContentElement(c[0], c[1])) d.setValue(a), e.selectPage(c[0])
            } CKEDITOR.plugins.add("filebrowser", {
                requires: "popup,filetools", init: function (a) {
                    a._.filebrowserFn = CKEDITOR.tools.addFunction(c,
                        a); a.on("destroy", function () { CKEDITOR.tools.removeFunction(this._.filebrowserFn) })
                }
            }); CKEDITOR.on("dialogDefinition", function (a) { if (a.editor.plugins.filebrowser) for (var b = a.data.definition, c, d = 0; d < b.contents.length; ++d)if (c = b.contents[d]) m(a.editor, a.data.name, b, c.elements), c.hidden && c.filebrowser && (c.hidden = !e(b, c.id, c.filebrowser)) })
        })(); CKEDITOR.plugins.add("find", {
            requires: "dialog", init: function (a) {
                var h = a.addCommand("find", new CKEDITOR.dialogCommand("find")), f = a.addCommand("replace", new CKEDITOR.dialogCommand("find",
                    { tabId: "replace" })); h.canUndo = !1; h.readOnly = 1; f.canUndo = !1; a.ui.addButton && (a.ui.addButton("Find", { label: a.lang.find.find, command: "find", toolbar: "find,10" }), a.ui.addButton("Replace", { label: a.lang.find.replace, command: "replace", toolbar: "find,20" })); CKEDITOR.dialog.add("find", this.path + "dialogs/find.js")
            }
        }); CKEDITOR.config.find_highlight = { element: "span", styles: { "background-color": "#004", color: "#fff" } }; (function () {
            function a(a) {
                var d = a.config, l = a.fire("uiSpace", { space: "top", html: "" }).html, k = function () {
                    function e(a,
                        b, c) { g.setStyle(b, f(c)); g.setStyle("position", a) } function c(a) { var b = m.getDocumentPosition(); switch (a) { case "top": e("absolute", "top", b.y - v - y); break; case "pin": e("fixed", "top", B); break; case "bottom": e("absolute", "top", b.y + (r.height || r.bottom - r.top) + y) }l = a } var l, m, q, r, A, v, D, t = d.floatSpaceDockedOffsetX || 0, y = d.floatSpaceDockedOffsetY || 0, z = d.floatSpacePinnedOffsetX || 0, B = d.floatSpacePinnedOffsetY || 0; return function (e) {
                            if (m = a.editable()) {
                                var n = e && "focus" == e.name; n && g.show(); a.fire("floatingSpaceLayout",
                                    { show: n }); g.removeStyle("left"); g.removeStyle("right"); q = g.getClientRect(); r = m.getClientRect(); A = h.getViewPaneSize(); v = q.height; D = "pageXOffset" in h.$ ? h.$.pageXOffset : CKEDITOR.document.$.documentElement.scrollLeft; l ? (v + y <= r.top ? c("top") : v + y > A.height - r.bottom ? c("pin") : c("bottom"), e = A.width / 2, e = d.floatSpacePreferRight ? "right" : 0 < r.left && r.right < A.width && r.width > q.width ? "rtl" == d.contentsLangDirection ? "right" : "left" : e - r.left > r.right - e ? "left" : "right", q.width > A.width ? (e = "left", n = 0) : (n = "left" == e ? 0 < r.left ?
                                        r.left : 0 : r.right < A.width ? A.width - r.right : 0, n + q.width > A.width && (e = "left" == e ? "right" : "left", n = 0)), g.setStyle(e, f(("pin" == l ? z : t) + n + ("pin" == l ? 0 : "left" == e ? D : -D)))) : (l = "pin", c("pin"), k(e))
                            }
                        }
                }(); if (l) {
                    var m = new CKEDITOR.template('\x3cdiv id\x3d"cke_{name}" class\x3d"cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' + CKEDITOR.env.cssClass + '" dir\x3d"{langDir}" title\x3d"' + (CKEDITOR.env.gecko ? " " : "") + '" lang\x3d"{langCode}" role\x3d"application" style\x3d"{style}"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' :
                        " ") + "\x3e" + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : " ") + '\x3cdiv class\x3d"cke_inner"\x3e\x3cdiv id\x3d"{topId}" class\x3d"cke_top" role\x3d"presentation"\x3e{content}\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e'), g = CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(m.output({ content: l, id: a.id, langDir: a.lang.dir, langCode: a.langCode, name: a.name, style: "display:none;z-index:" + (d.baseFloatZIndex - 1), topId: a.ui.spaceId("top"), voiceLabel: a.title }))),
                    e = CKEDITOR.tools.eventsBuffer(500, k), c = CKEDITOR.tools.eventsBuffer(100, k); g.unselectable(); g.on("mousedown", function (a) { a = a.data; a.getTarget().hasAscendant("a", 1) || a.preventDefault() }); a.on("focus", function (d) { k(d); a.on("change", e.input); h.on("scroll", c.input); h.on("resize", c.input) }); a.on("blur", function () { g.hide(); a.removeListener("change", e.input); h.removeListener("scroll", c.input); h.removeListener("resize", c.input) }); a.on("destroy", function () {
                        h.removeListener("scroll", c.input); h.removeListener("resize",
                            c.input); g.clearCustomData(); g.remove()
                    }); a.focusManager.hasFocus && g.show(); a.focusManager.add(g, 1)
                }
            } var h = CKEDITOR.document.getWindow(), f = CKEDITOR.tools.cssLength; CKEDITOR.plugins.add("floatingspace", { init: function (b) { b.on("loaded", function () { a(this) }, null, null, 20) } })
        })(); CKEDITOR.plugins.add("listblock", {
            requires: "panel", onLoad: function () {
                var a = CKEDITOR.addTemplate("panel-list", '\x3cul role\x3d"presentation" class\x3d"cke_panel_list"\x3e{items}\x3c/ul\x3e'), h = CKEDITOR.addTemplate("panel-list-item",
                    '\x3cli id\x3d"{id}" class\x3d"cke_panel_listItem" role\x3dpresentation\x3e\x3ca id\x3d"{id}_option" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"{title}" draggable\x3d"false" ondragstart\x3d"return false;" href\x3d"javascript:void(\'{val}\')"  onclick\x3d"{onclick}CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role\x3d"option"\x3e{text}\x3c/a\x3e\x3c/li\x3e'), f = CKEDITOR.addTemplate("panel-list-group", '\x3ch1 id\x3d"{id}" draggable\x3d"false" ondragstart\x3d"return false;" class\x3d"cke_panel_grouptitle" role\x3d"presentation" \x3e{label}\x3c/h1\x3e'),
                b = /\'/g; CKEDITOR.ui.panel.prototype.addListBlock = function (a, b) { return this.addBlock(a, new CKEDITOR.ui.listBlock(this.getHolderElement(), b)) }; CKEDITOR.ui.listBlock = CKEDITOR.tools.createClass({
                    base: CKEDITOR.ui.panel.block, $: function (a, b) {
                        b = b || {}; var f = b.attributes || (b.attributes = {}); (this.multiSelect = !!b.multiSelect) && (f["aria-multiselectable"] = !0); !f.role && (f.role = "listbox"); this.base.apply(this, arguments); this.element.setAttribute("role", f.role); f = this.keys; f[40] = "next"; f[9] = "next"; f[38] = "prev"; f[CKEDITOR.SHIFT +
                            9] = "prev"; f[32] = CKEDITOR.env.ie ? "mouseup" : "click"; CKEDITOR.env.ie && (f[13] = "mouseup"); this._.pendingHtml = []; this._.pendingList = []; this._.items = {}; this._.groups = {}
                    }, _: { close: function () { if (this._.started) { var b = a.output({ items: this._.pendingList.join("") }); this._.pendingList = []; this._.pendingHtml.push(b); delete this._.started } }, getClick: function () { this._.click || (this._.click = CKEDITOR.tools.addFunction(function (a) { var b = this.toggle(a); if (this.onClick) this.onClick(a, b) }, this)); return this._.click } }, proto: {
                        add: function (a,
                            f, k) { var m = CKEDITOR.tools.getNextId(); this._.started || (this._.started = 1, this._.size = this._.size || 0); this._.items[a] = m; var g; g = CKEDITOR.tools.htmlEncodeAttr(a).replace(b, "\\'"); a = { id: m, val: g, onclick: CKEDITOR.env.ie ? 'return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26' : "", clickFn: this._.getClick(), title: CKEDITOR.tools.htmlEncodeAttr(k || a), text: f || a }; this._.pendingList.push(h.output(a)) }, startGroup: function (a) {
                                this._.close(); var b = CKEDITOR.tools.getNextId();
                                this._.groups[a] = b; this._.pendingHtml.push(f.output({ id: b, label: a }))
                            }, commit: function () { this._.close(); this.element.appendHtml(this._.pendingHtml.join("")); delete this._.size; this._.pendingHtml = [] }, toggle: function (a) { var b = this.isMarked(a); b ? this.unmark(a) : this.mark(a); return !b }, hideGroup: function (a) { var b = (a = this.element.getDocument().getById(this._.groups[a])) && a.getNext(); a && (a.setStyle("display", "none"), b && "ul" == b.getName() && b.setStyle("display", "none")) }, hideItem: function (a) {
                                this.element.getDocument().getById(this._.items[a]).setStyle("display",
                                    "none")
                            }, showAll: function () { var a = this._.items, b = this._.groups, f = this.element.getDocument(), h; for (h in a) f.getById(a[h]).setStyle("display", ""); for (var g in b) a = f.getById(b[g]), h = a.getNext(), a.setStyle("display", ""), h && "ul" == h.getName() && h.setStyle("display", "") }, mark: function (a) { this.multiSelect || this.unmarkAll(); a = this._.items[a]; var b = this.element.getDocument().getById(a); b.addClass("cke_selected"); this.element.getDocument().getById(a + "_option").setAttribute("aria-selected", !0); this.onMark && this.onMark(b) },
                        markFirstDisplayed: function () { var a = this; this._.markFirstDisplayed(function () { a.multiSelect || a.unmarkAll() }) }, unmark: function (a) { var b = this.element.getDocument(); a = this._.items[a]; var f = b.getById(a); f.removeClass("cke_selected"); b.getById(a + "_option").removeAttribute("aria-selected"); this.onUnmark && this.onUnmark(f) }, unmarkAll: function () {
                            var a = this._.items, b = this.element.getDocument(), f; for (f in a) { var h = a[f]; b.getById(h).removeClass("cke_selected"); b.getById(h + "_option").removeAttribute("aria-selected") } this.onUnmark &&
                                this.onUnmark()
                        }, isMarked: function (a) { return this.element.getDocument().getById(this._.items[a]).hasClass("cke_selected") }, focus: function (a) { this._.focusIndex = -1; var b = this.element.getElementsByTag("a"), f, h = -1; if (a) for (f = this.element.getDocument().getById(this._.items[a]).getFirst(); a = b.getItem(++h);) { if (a.equals(f)) { this._.focusIndex = h; break } } else this.element.focus(); f && setTimeout(function () { f.focus() }, 0) }
                    }
                })
            }
        }); CKEDITOR.plugins.add("richcombo", {
            requires: "floatpanel,listblock,button", beforeInit: function (a) {
                a.ui.addHandler(CKEDITOR.UI_RICHCOMBO,
                    CKEDITOR.ui.richCombo.handler)
            }
        }); (function () {
            var a = '\x3cspan id\x3d"{id}" class\x3d"cke_combo cke_combo__{name} {cls}" role\x3d"presentation"\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_combo_label"\x3e{label}\x3c/span\x3e\x3ca class\x3d"cke_combo_button" title\x3d"{title}" tabindex\x3d"-1"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-haspopup\x3d"listbox"', h = ""; CKEDITOR.env.gecko &&
                CKEDITOR.env.mac && (a += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (a += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"'); CKEDITOR.env.ie && (h = 'return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26'); var a = a + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event,this);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" onclick\x3d"' + h + 'CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan id\x3d"{id}_text" class\x3d"cke_combo_text cke_combo_inlinelabel"\x3e{label}\x3c/span\x3e\x3cspan class\x3d"cke_combo_open"\x3e\x3cspan class\x3d"cke_combo_arrow"\x3e' +
                    (CKEDITOR.env.hc ? "\x26#9660;" : CKEDITOR.env.air ? "\x26nbsp;" : "") + "\x3c/span\x3e\x3c/span\x3e\x3c/a\x3e\x3c/span\x3e"), f = CKEDITOR.addTemplate("combo", a); CKEDITOR.UI_RICHCOMBO = "richcombo"; CKEDITOR.ui.richCombo = CKEDITOR.tools.createClass({
                        $: function (a) {
                            CKEDITOR.tools.extend(this, a, { canGroup: !1, title: a.label, modes: { wysiwyg: 1 }, editorFocus: 1 }); a = this.panel || {}; delete this.panel; this.id = CKEDITOR.tools.getNextNumber(); this.document = a.parent && a.parent.getDocument() || CKEDITOR.document; a.className = "cke_combopanel";
                            a.block = { multiSelect: a.multiSelect, attributes: a.attributes }; a.toolbarRelated = !0; this._ = { panelDefinition: a, items: {}, listeners: [] }
                        }, proto: {
                            renderHtml: function (a) { var d = []; this.render(a, d); return d.join("") }, render: function (a, d) {
                                function h() { if (this.getState() != CKEDITOR.TRISTATE_ON) { var e = this.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED; a.readOnly && !this.readOnly && (e = CKEDITOR.TRISTATE_DISABLED); this.setState(e); this.setValue(""); e != CKEDITOR.TRISTATE_DISABLED && this.refresh && this.refresh() } }
                                var k = CKEDITOR.env, m, g, e = "cke_" + this.id, c = CKEDITOR.tools.addFunction(function (e) { g && (a.unlockSelection(1), g = 0); m.execute(e) }, this), n = this; m = { id: e, combo: this, focus: function () { CKEDITOR.document.getById(e).getChild(1).focus() }, execute: function (e) { var c = n._; if (c.state != CKEDITOR.TRISTATE_DISABLED) if (n.createPanel(a), c.on) c.panel.hide(); else { n.commit(); var d = n.getValue(); d ? c.list.mark(d) : c.list.unmarkAll(); c.panel.showBlock(n.id, new CKEDITOR.dom.element(e), 4) } }, clickFn: c }; this._.listeners.push(a.on("activeFilterChange",
                                    h, this)); this._.listeners.push(a.on("mode", h, this)); this._.listeners.push(a.on("selectionChange", h, this)); !this.readOnly && this._.listeners.push(a.on("readOnly", h, this)); var u = CKEDITOR.tools.addFunction(function (a, b) { a = new CKEDITOR.dom.event(a); var e = a.getKeystroke(); switch (e) { case 13: case 32: case 40: CKEDITOR.tools.callFunction(c, b); break; default: m.onkey(m, e) }a.preventDefault() }), w = CKEDITOR.tools.addFunction(function () { m.onfocus && m.onfocus() }); g = 0; m.keyDownFn = u; k = {
                                        id: e, name: this.name || this.command,
                                        label: this.label, title: this.title, cls: this.className || "", titleJs: k.gecko && !k.hc ? "" : (this.title || "").replace("'", ""), keydownFn: u, focusFn: w, clickFn: c
                                    }; f.output(k, d); if (this.onRender) this.onRender(); return m
                            }, createPanel: function (a) {
                                if (!this._.panel) {
                                    var d = this._.panelDefinition, f = this._.panelDefinition.block, h = d.parent || CKEDITOR.document.getBody(), m = "cke_combopanel__" + this.name, g = new CKEDITOR.ui.floatPanel(a, h, d), d = g.addListBlock(this.id, f), e = this; g.onShow = function () {
                                        this.element.addClass(m); e.setState(CKEDITOR.TRISTATE_ON);
                                        e._.on = 1; e.editorFocus && !a.focusManager.hasFocus && a.focus(); if (e.onOpen) e.onOpen()
                                    }; g.onHide = function (c) { this.element.removeClass(m); e.setState(e.modes && e.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); e._.on = 0; if (!c && e.onClose) e.onClose() }; g.onEscape = function () { g.hide(1) }; d.onClick = function (a, b) { e.onClick && e.onClick.call(e, a, b); g.hide() }; this._.panel = g; this._.list = d; g.getBlock(this.id).onHide = function () { e._.on = 0; e.setState(CKEDITOR.TRISTATE_OFF) }; this.init && this.init()
                                }
                            }, setValue: function (a,
                                d) { this._.value = a; var f = this.document.getById("cke_" + this.id + "_text"); f && (a || d ? f.removeClass("cke_combo_inlinelabel") : (d = this.label, f.addClass("cke_combo_inlinelabel")), f.setText("undefined" != typeof d ? d : a)); var f = "undefined" != typeof d ? d : a, h = this.label, f = f === h ? f : f + ", " + h; (h = this.document.getById("cke_" + this.id + "_label")) && h.setText(f) }, getValue: function () { return this._.value || "" }, unmarkAll: function () { this._.list.unmarkAll() }, mark: function (a) { this._.list.mark(a) }, hideItem: function (a) { this._.list.hideItem(a) },
                            hideGroup: function (a) { this._.list.hideGroup(a) }, showAll: function () { this._.list.showAll() }, add: function (a, d, f) { this._.items[a] = f || a; this._.list.add(a, d, f) }, startGroup: function (a) { this._.list.startGroup(a) }, commit: function () { this._.committed || (this._.list.commit(), this._.committed = 1, CKEDITOR.ui.fire("ready", this)); this._.committed = 1 }, setState: function (a) {
                                if (this._.state != a) {
                                    var d = this.document.getById("cke_" + this.id), f = d.getElementsByTag("a").getItem(0); d.setState(a, "cke_combo"); a == CKEDITOR.TRISTATE_DISABLED ?
                                        d.setAttribute("aria-disabled", !0) : d.removeAttribute("aria-disabled"); f && f.setAttribute("aria-expanded", a == CKEDITOR.TRISTATE_ON); this._.state = a
                                }
                            }, getState: function () { return this._.state }, enable: function () { this._.state == CKEDITOR.TRISTATE_DISABLED && this.setState(this._.lastState) }, disable: function () { this._.state != CKEDITOR.TRISTATE_DISABLED && (this._.lastState = this._.state, this.setState(CKEDITOR.TRISTATE_DISABLED)) }, destroy: function () {
                                CKEDITOR.tools.array.forEach(this._.listeners, function (a) { a.removeListener() });
                                this._.listeners = []
                            }, select: function (a) { if (!CKEDITOR.tools.isEmpty(this._.items)) for (var d in this._.items) if (a({ value: d, text: this._.items[d] })) { this.setValue(d); break } }
                        }, statics: { handler: { create: function (a) { return new CKEDITOR.ui.richCombo(a) } } }
                    }); CKEDITOR.ui.prototype.addRichCombo = function (a, d) { this.add(a, CKEDITOR.UI_RICHCOMBO, d) }
        })(); (function () {
            function a(a, b) {
                var m = a.config, g = b.lang, e = new CKEDITOR.style(b.styleDefinition), c = new d({ entries: b.entries, styleVariable: b.styleVariable, styleDefinition: b.styleDefinition }),
                n; a.addCommand(b.commandName, { exec: function (a, b) { var e = b.newStyle, c = b.oldStyle, d = a.getSelection().getRanges()[0], g = void 0 === e; if (c || e) c && d.collapsed && f({ editor: a, range: d, style: c }), g ? a.removeStyle(c) : (c && !h(c, e) && a.removeStyle(c), a.applyStyle(e)) }, refresh: function (a, b) { e.checkApplicable(b, a, a.activeFilter) || this.setState(CKEDITOR.TRISTATE_DISABLED) } }); n = a.getCommand(b.commandName); a.ui.addRichCombo(b.comboName, {
                    label: g.label, title: g.panelTitle, command: b.commandName, toolbar: "styles," + b.order, defaultValue: "cke-default",
                    allowedContent: e, requiredContent: e, contentTransformations: "span" === b.styleDefinition.element ? [[{
                        element: "font", check: "span", left: function (a) { return !!a.attributes.size || !!a.attributes.align || !!a.attributes.face }, right: function (a) {
                            var b = " x-small small medium large x-large xx-large 48px".split(" "); a.name = "span"; a.attributes.size && (a.styles["font-size"] = b[a.attributes.size], delete a.attributes.size); a.attributes.align && (a.styles["text-align"] = a.attributes.align, delete a.attributes.align); a.attributes.face &&
                                (a.styles["font-family"] = a.attributes.face, delete a.attributes.face)
                        }
                    }]] : null, panel: { css: [CKEDITOR.skin.getPath("editor")].concat(m.contentsCss), multiSelect: !1, attributes: { "aria-label": g.panelTitle } }, init: function () { var b = "(" + a.lang.common.optionDefault + ")"; this.startGroup(g.panelTitle); this.add(this.defaultValue, b, b); c.addToCombo(this) }, onClick: function (e) { var d = this.getValue(); a.focus(); a.fire("saveSnapshot"); a.execCommand(b.commandName, { newStyle: c.getStyle(e), oldStyle: c.getStyle(d) }); a.fire("saveSnapshot") },
                    onRender: function () { a.on("selectionChange", function (e) { var d = this.getValue(); (e = c.getMatchingValue(a, e.data.path)) ? e != d && this.setValue(e) : this.setValue("", b.defaultLabel) }, this); n.on("state", function () { this.setState(n.state) }, this) }, refresh: function () { this.setState(n.state) }
                })
            } function h(a, b) {
                if (!(a instanceof CKEDITOR.style && b instanceof CKEDITOR.style)) return !1; var d = function (a, b) { var d = a.getDefinition().attributes, g = b.getDefinition().attributes; return CKEDITOR.tools.objectCompare(d, g) }(a, b), g =
                    function (a, b) { return CKEDITOR.style.getStyleText(a.getDefinition()) === CKEDITOR.style.getStyleText(b.getDefinition()) }(a, b); return d && g
            } function f(a) {
                var d = a.editor, f = a.range, g = a.style, e, c, h; e = d.elementPath(); if (a = e.contains(function (a) { return g.checkElementRemovable(a) })) {
                    c = f.checkBoundaryOfElement(a, CKEDITOR.START); h = f.checkBoundaryOfElement(a, CKEDITOR.END); if (c && h) { for (c = f.createBookmark(); e = a.getFirst();)e.insertBefore(a); a.remove(); f.moveToBookmark(c) } else c || h ? f.moveToPosition(a, c ? CKEDITOR.POSITION_BEFORE_START :
                        CKEDITOR.POSITION_AFTER_END) : (f.splitElement(a), f.moveToPosition(a, CKEDITOR.POSITION_AFTER_END)), b(f, e.elements.slice(), a); d.getSelection().selectRanges([f])
                }
            } function b(a, d, f) { var g = d.pop(); if (g) { if (f) return b(a, d, g.equals(f) ? null : f); f = g.clone(); a.insertNode(f); a.moveToPosition(f, CKEDITOR.POSITION_AFTER_START); b(a, d) } } var d = CKEDITOR.tools.createClass({
                $: function (a) {
                    var b = a.entries.split(";"); this._.data = {}; this._.names = []; for (var d = 0; d < b.length; d++) {
                        var g = b[d], e, c; g ? (g = g.split("/"), e = g[0], g = g[1],
                            c = {}, c[a.styleVariable] = g || e, this._.data[e] = new CKEDITOR.style(a.styleDefinition, c), this._.data[e]._.definition.name = e, this._.names.push(e)) : (b.splice(d, 1), d--)
                    }
                }, proto: { getStyle: function (a) { return this._.data[a] }, addToCombo: function (a) { for (var b = 0; b < this._.names.length; b++) { var d = this._.names[b]; a.add(d, this.getStyle(d).buildPreview(), d) } }, getMatchingValue: function (a, b) { for (var d = b.elements, g = 0, e; g < d.length; g++)if (e = d[g], e = this._.findMatchingStyleName(a, e)) return e; return null } }, _: {
                    findMatchingStyleName: function (a,
                        b) { return CKEDITOR.tools.array.find(this._.names, function (d) { return this.getStyle(d).checkElementMatch(b, !0, a) }, this) }
                }
            }); CKEDITOR.plugins.add("font", {
                requires: "richcombo", init: function (b) {
                    var d = b.config; a(b, { comboName: "Font", commandName: "font", styleVariable: "family", lang: b.lang.font, entries: d.font_names, defaultLabel: d.font_defaultLabel, styleDefinition: d.font_style, order: 30 }); a(b, {
                        comboName: "FontSize", commandName: "fontSize", styleVariable: "size", lang: b.lang.font.fontSize, entries: d.fontSize_sizes, defaultLabel: d.fontSize_defaultLabel,
                        styleDefinition: d.fontSize_style, order: 40
                    })
                }
            })
        })(); CKEDITOR.config.font_names = "Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif"; CKEDITOR.config.font_defaultLabel = ""; CKEDITOR.config.font_style =
            { element: "span", styles: { "font-family": "#(family)" }, overrides: [{ element: "font", attributes: { face: null } }] }; CKEDITOR.config.fontSize_sizes = "8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px"; CKEDITOR.config.fontSize_defaultLabel = ""; CKEDITOR.config.fontSize_style = { element: "span", styles: { "font-size": "#(size)" }, overrides: [{ element: "font", attributes: { size: null } }] }; CKEDITOR.plugins.add("format", {
                requires: "richcombo", init: function (a) {
                    if (!a.blockless) {
                        for (var h =
                            a.config, f = a.lang.format, b = h.format_tags.split(";"), d = {}, l = 0, k = [], m = 0; m < b.length; m++) { var g = b[m], e = new CKEDITOR.style(h["format_" + g]); if (!a.filter.customConfig || a.filter.check(e)) l++, d[g] = e, d[g]._.enterMode = a.config.enterMode, k.push(e) } 0 !== l && a.ui.addRichCombo("Format", {
                                label: f.label, title: f.panelTitle, toolbar: "styles,20", allowedContent: k, panel: { css: [CKEDITOR.skin.getPath("editor")].concat(h.contentsCss), multiSelect: !1, attributes: { "aria-label": f.panelTitle } }, init: function () {
                                    this.startGroup(f.panelTitle);
                                    for (var a in d) { var b = f["tag_" + a]; this.add(a, d[a].buildPreview(b), b) }
                                }, onClick: function (b) { a.focus(); a.fire("saveSnapshot"); b = d[b]; var e = a.elementPath(); a.fire("stylesRemove", { type: CKEDITOR.STYLE_BLOCK }); b.checkActive(e, a) || a.applyStyle(b); setTimeout(function () { a.fire("saveSnapshot") }, 0) }, onRender: function () {
                                    a.on("selectionChange", function (b) { var e = this.getValue(); b = b.data.path; this.refresh(); for (var g in d) if (d[g].checkActive(b, a)) { g != e && this.setValue(g, a.lang.format["tag_" + g]); return } this.setValue("") },
                                        this)
                                }, onOpen: function () { this.showAll(); for (var b in d) a.activeFilter.check(d[b]) || this.hideItem(b) }, refresh: function () { var b = a.elementPath(); if (b) { if (b.isContextFor("p")) for (var e in d) if (a.activeFilter.check(d[e])) return; this.setState(CKEDITOR.TRISTATE_DISABLED) } }
                            })
                    }
                }
            }); CKEDITOR.config.format_tags = "p;h1;h2;h3;h4;h5;h6;pre;address;div"; CKEDITOR.config.format_p = { element: "p" }; CKEDITOR.config.format_div = { element: "div" }; CKEDITOR.config.format_pre = { element: "pre" }; CKEDITOR.config.format_address = { element: "address" };
        CKEDITOR.config.format_h1 = { element: "h1" }; CKEDITOR.config.format_h2 = { element: "h2" }; CKEDITOR.config.format_h3 = { element: "h3" }; CKEDITOR.config.format_h4 = { element: "h4" }; CKEDITOR.config.format_h5 = { element: "h5" }; CKEDITOR.config.format_h6 = { element: "h6" }; (function () {
            function a(a, b) { var d = l.exec(a), e = l.exec(b); if (d) { if (!d[2] && "px" == e[2]) return e[1]; if ("px" == d[2] && !e[2]) return e[1] + "px" } return b } function h(d) {
                return {
                    elements: {
                        $: function (h) {
                            var g = h.attributes, g = g && g["data-cke-realelement"], e = f(d, decodeURIComponent(g));
                            if ((g = (g = g && new CKEDITOR.htmlParser.fragment.fromHtml(e)) && g.children[0]) && h.attributes["data-cke-resizable"]) { var c = (new b(h)).rules; h = g.attributes; e = c.width; c = c.height; e && (h.width = a(h.width, e)); c && (h.height = a(h.height, c)) } return g
                        }
                    }
                }
            } function f(a, b) {
                var d = [], e = /^cke:/i, c = new CKEDITOR.htmlParser.filter({ elements: { "^": function (a) { e.test(a.name) && (a.name = a.name.replace(e, ""), d.push(a)) }, iframe: function (a) { a.children = [] } } }), f = a.activeFilter, h = new CKEDITOR.htmlParser.basicWriter, l = CKEDITOR.htmlParser.fragment.fromHtml(b);
                c.applyTo(l); f.applyTo(l); CKEDITOR.tools.array.forEach(d, function (a) { a.name = "cke:" + a.name }); l.writeHtml(h); return h.getHtml()
            } var b = CKEDITOR.htmlParser.cssStyle, d = CKEDITOR.tools.cssLength, l = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i; CKEDITOR.plugins.add("fakeobjects", { init: function (a) { a.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}", "fakeobjects") }, afterInit: function (a) { var b = a.dataProcessor; (b = b && b.htmlFilter) && b.addRules(h(a), { applyToAll: !0 }) } }); CKEDITOR.editor.prototype.createFakeElement =
                function (a, f, g, e) {
                    var c = this.lang.fakeobjects, c = c[g] || c.unknown; f = { "class": f, "data-cke-realelement": encodeURIComponent(a.getOuterHtml()), "data-cke-real-node-type": a.type, alt: c, title: c, align: a.getAttribute("align") || "" }; CKEDITOR.env.hc || (f.src = CKEDITOR.tools.transparentImageData); g && (f["data-cke-real-element-type"] = g); e && (f["data-cke-resizable"] = e, g = new b, e = a.getAttribute("width"), a = a.getAttribute("height"), e && (g.rules.width = d(e)), a && (g.rules.height = d(a)), g.populate(f)); return this.document.createElement("img",
                        { attributes: f })
                }; CKEDITOR.editor.prototype.createFakeParserElement = function (a, f, g, e) {
                    var c = this.lang.fakeobjects, c = c[g] || c.unknown, h; h = new CKEDITOR.htmlParser.basicWriter; a.writeHtml(h); h = h.getHtml(); f = { "class": f, "data-cke-realelement": encodeURIComponent(h), "data-cke-real-node-type": a.type, alt: c, title: c, align: a.attributes.align || "" }; CKEDITOR.env.hc || (f.src = CKEDITOR.tools.transparentImageData); g && (f["data-cke-real-element-type"] = g); e && (f["data-cke-resizable"] = e, e = a.attributes, a = new b, g = e.width, e = e.height,
                        void 0 !== g && (a.rules.width = d(g)), void 0 !== e && (a.rules.height = d(e)), a.populate(f)); return new CKEDITOR.htmlParser.element("img", f)
                }; CKEDITOR.editor.prototype.restoreRealElement = function (b) {
                    if (b.data("cke-real-node-type") != CKEDITOR.NODE_ELEMENT) return null; var d = decodeURIComponent(b.data("cke-realelement")), d = f(this, d), d = CKEDITOR.dom.element.createFromHtml(d, this.document); if (b.data("cke-resizable")) {
                        var g = b.getStyle("width"); b = b.getStyle("height"); g && d.setAttribute("width", a(d.getAttribute("width"),
                            g)); b && d.setAttribute("height", a(d.getAttribute("height"), b))
                    } return d
                }
        })(); CKEDITOR.plugins.add("forms", {
            requires: "dialog,fakeobjects", onLoad: function () {
                CKEDITOR.addCss(".cke_editable form{border: 1px dotted #FF0000;padding: 2px;}\n"); CKEDITOR.addCss("img.cke_hidden{background-image: url(" + CKEDITOR.getUrl(this.path + "images/hiddenfield.gif") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 16px !important;height: 16px !important;}"); CKEDITOR.style.unstylableElements.push("select",
                    "option")
            }, init: function (a) {
                var h = a.lang, f = 0, b = { email: 1, password: 1, search: 1, tel: 1, text: 1, url: 1 }, d = { checkbox: "input[type,name,checked,required]", radio: "input[type,name,checked,required]", textfield: "input[type,name,value,size,maxlength,required]", textarea: "textarea[cols,rows,name,required]", select: "select[name,size,multiple,required]; option[value,selected]", button: "input[type,name,value]", form: "form[action,name,id,enctype,target,method]", hiddenfield: "input[type,name,value]", imagebutton: "input[type,alt,src]{width,height,border,border-width,border-style,margin,float}" },
                l = { checkbox: "input", radio: "input", textfield: "input", textarea: "textarea", select: "select", button: "input", form: "form", hiddenfield: "input", imagebutton: "input" }, k = function (b, c, g) { var k = { allowedContent: d[c], requiredContent: l[c] }; "form" == c && (k.context = "form"); a.addCommand(c, new CKEDITOR.dialogCommand(c, k)); a.ui.addButton && a.ui.addButton(b, { label: h.common[b.charAt(0).toLowerCase() + b.slice(1)], command: c, toolbar: "forms," + (f += 10) }); CKEDITOR.dialog.add(c, g) }, m = this.path + "dialogs/"; !a.blockless && k("Form", "form",
                    m + "form.js"); k("Checkbox", "checkbox", m + "checkbox.js"); k("Radio", "radio", m + "radio.js"); k("TextField", "textfield", m + "textfield.js"); k("Textarea", "textarea", m + "textarea.js"); k("Select", "select", m + "select.js"); k("Button", "button", m + "button.js"); var g = a.plugins.image; g && !a.plugins.image2 && k("ImageButton", "imagebutton", CKEDITOR.plugins.getPath("image") + "dialogs/image.js"); k("HiddenField", "hiddenfield", m + "hiddenfield.js"); a.addMenuItems && (k = {
                        checkbox: {
                            label: h.forms.checkboxAndRadio.checkboxTitle, command: "checkbox",
                            group: "checkbox"
                        }, radio: { label: h.forms.checkboxAndRadio.radioTitle, command: "radio", group: "radio" }, textfield: { label: h.forms.textfield.title, command: "textfield", group: "textfield" }, hiddenfield: { label: h.forms.hidden.title, command: "hiddenfield", group: "hiddenfield" }, button: { label: h.forms.button.title, command: "button", group: "button" }, select: { label: h.forms.select.title, command: "select", group: "select" }, textarea: { label: h.forms.textarea.title, command: "textarea", group: "textarea" }
                    }, g && (k.imagebutton = {
                        label: h.image.titleButton,
                        command: "imagebutton", group: "imagebutton"
                    }), !a.blockless && (k.form = { label: h.forms.form.menu, command: "form", group: "form" }), a.addMenuItems(k)); a.contextMenu && (!a.blockless && a.contextMenu.addListener(function (a, b, d) { if ((a = d.contains("form", 1)) && !a.isReadOnly()) return { form: CKEDITOR.TRISTATE_OFF } }), a.contextMenu.addListener(function (a) {
                        if (a && !a.isReadOnly()) {
                            var c = a.getName(); if ("select" == c) return { select: CKEDITOR.TRISTATE_OFF }; if ("textarea" == c) return { textarea: CKEDITOR.TRISTATE_OFF }; if ("input" == c) {
                                var d =
                                    a.getAttribute("type") || "text"; switch (d) { case "button": case "submit": case "reset": return { button: CKEDITOR.TRISTATE_OFF }; case "checkbox": return { checkbox: CKEDITOR.TRISTATE_OFF }; case "radio": return { radio: CKEDITOR.TRISTATE_OFF }; case "image": return g ? { imagebutton: CKEDITOR.TRISTATE_OFF } : null }if (b[d]) return { textfield: CKEDITOR.TRISTATE_OFF }
                            } if ("img" == c && "hiddenfield" == a.data("cke-real-element-type")) return { hiddenfield: CKEDITOR.TRISTATE_OFF }
                        }
                    })); a.on("doubleclick", function (e) {
                        var c = e.data.element; if (!a.blockless &&
                            c.is("form")) e.data.dialog = "form"; else if (c.is("select")) e.data.dialog = "select"; else if (c.is("textarea")) e.data.dialog = "textarea"; else if (c.is("img") && "hiddenfield" == c.data("cke-real-element-type")) e.data.dialog = "hiddenfield"; else if (c.is("input")) {
                                c = c.getAttribute("type") || "text"; switch (c) { case "button": case "submit": case "reset": e.data.dialog = "button"; break; case "checkbox": e.data.dialog = "checkbox"; break; case "radio": e.data.dialog = "radio"; break; case "image": e.data.dialog = "imagebutton" }b[c] && (e.data.dialog =
                                    "textfield")
                            }
                    })
            }, afterInit: function (a) { var h = a.dataProcessor, f = h && h.htmlFilter, h = h && h.dataFilter; CKEDITOR.env.ie && f && f.addRules({ elements: { input: function (a) { a = a.attributes; var d = a.type; d || (a.type = "text"); "checkbox" != d && "radio" != d || "on" != a.value || delete a.value } } }, { applyToAll: !0 }); h && h.addRules({ elements: { input: function (b) { if ("hidden" == b.attributes.type) return a.createFakeParserElement(b, "cke_hidden", "hiddenfield") } } }, { applyToAll: !0 }) }
        }); CKEDITOR.plugins.forms = { _setupRequiredAttribute: function (a) { this.setValue(a.hasAttribute("required")) } };
        (function () { var a = { canUndo: !1, exec: function (a) { var f = a.document.createElement("hr"); a.insertElement(f) }, allowedContent: "hr", requiredContent: "hr" }; CKEDITOR.plugins.add("horizontalrule", { init: function (h) { h.blockless || (h.addCommand("horizontalrule", a), h.ui.addButton && h.ui.addButton("HorizontalRule", { label: h.lang.horizontalrule.toolbar, command: "horizontalrule", toolbar: "insert,40" })) } }) })(); CKEDITOR.plugins.add("htmlwriter", {
            init: function (a) {
                var h = new CKEDITOR.htmlWriter; h.forceSimpleAmpersand = a.config.forceSimpleAmpersand;
                h.indentationChars = "string" === typeof a.config.dataIndentationChars ? a.config.dataIndentationChars : "\t"; a.dataProcessor.writer = h
            }
        }); CKEDITOR.htmlWriter = CKEDITOR.tools.createClass({
            base: CKEDITOR.htmlParser.basicWriter, $: function () {
                this.base(); this.indentationChars = "\t"; this.selfClosingEnd = " /\x3e"; this.lineBreakChars = "\n"; this.sortAttributes = 1; this._.indent = 0; this._.indentation = ""; this._.inPre = 0; this._.rules = {}; var a = CKEDITOR.dtd, h; for (h in CKEDITOR.tools.extend({}, a.$nonBodyContent, a.$block, a.$listItem,
                    a.$tableContent)) this.setRules(h, { indent: !a[h]["#"], breakBeforeOpen: 1, breakBeforeClose: !a[h]["#"], breakAfterClose: 1, needsSpace: h in a.$block && !(h in { li: 1, dt: 1, dd: 1 }) }); this.setRules("br", { breakAfterOpen: 1 }); this.setRules("title", { indent: 0, breakAfterOpen: 0 }); this.setRules("style", { indent: 0, breakBeforeClose: 1 }); this.setRules("pre", { breakAfterOpen: 1, indent: 0 })
            }, proto: {
                openTag: function (a) {
                    var h = this._.rules[a]; this._.afterCloser && h && h.needsSpace && this._.needsSpace && this._.output.push("\n"); this._.indent ?
                        this.indentation() : h && h.breakBeforeOpen && (this.lineBreak(), this.indentation()); this._.output.push("\x3c", a); this._.afterCloser = 0
                }, openTagClose: function (a, h) { var f = this._.rules[a]; h ? (this._.output.push(this.selfClosingEnd), f && f.breakAfterClose && (this._.needsSpace = f.needsSpace)) : (this._.output.push("\x3e"), f && f.indent && (this._.indentation += this.indentationChars)); f && f.breakAfterOpen && this.lineBreak(); "pre" == a && (this._.inPre = 1) }, attribute: function (a, h) {
                    "string" == typeof h && (h = CKEDITOR.tools.htmlEncodeAttr(h),
                        this.forceSimpleAmpersand && (h = h.replace(/&amp;/g, "\x26"))); this._.output.push(" ", a, '\x3d"', h, '"')
                }, closeTag: function (a) { var h = this._.rules[a]; h && h.indent && (this._.indentation = this._.indentation.substr(this.indentationChars.length)); this._.indent ? this.indentation() : h && h.breakBeforeClose && (this.lineBreak(), this.indentation()); this._.output.push("\x3c/", a, "\x3e"); "pre" == a && (this._.inPre = 0); h && h.breakAfterClose && (this.lineBreak(), this._.needsSpace = h.needsSpace); this._.afterCloser = 1 }, text: function (a) {
                    this._.indent &&
                    (this.indentation(), !this._.inPre && (a = CKEDITOR.tools.ltrim(a))); this._.output.push(a)
                }, comment: function (a) { this._.indent && this.indentation(); this._.output.push("\x3c!--", a, "--\x3e") }, lineBreak: function () { !this._.inPre && 0 < this._.output.length && this._.output.push(this.lineBreakChars); this._.indent = 1 }, indentation: function () { !this._.inPre && this._.indentation && this._.output.push(this._.indentation); this._.indent = 0 }, reset: function () {
                    this._.output = []; this._.indent = 0; this._.indentation = ""; this._.afterCloser =
                        0; this._.inPre = 0; this._.needsSpace = 0
                }, setRules: function (a, h) { var f = this._.rules[a]; f ? CKEDITOR.tools.extend(f, h, !0) : this._.rules[a] = h }
            }
        }); (function () {
            CKEDITOR.plugins.add("iframe", {
                requires: "dialog,fakeobjects", onLoad: function () { CKEDITOR.addCss("img.cke_iframe{background-image: url(" + CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}") }, init: function (a) {
                    var h = a.lang.iframe, f = "iframe[align,longdesc,tabindex,frameborder,height,name,scrolling,src,title,width]";
                    a.plugins.dialogadvtab && (f += ";iframe" + a.plugins.dialogadvtab.allowedContent({ id: 1, classes: 1, styles: 1 })); CKEDITOR.dialog.add("iframe", this.path + "dialogs/iframe.js"); a.addCommand("iframe", new CKEDITOR.dialogCommand("iframe", { allowedContent: f, requiredContent: "iframe" })); a.ui.addButton && a.ui.addButton("Iframe", { label: h.toolbar, command: "iframe", toolbar: "insert,80" }); a.on("doubleclick", function (a) { var d = a.data.element; d.is("img") && "iframe" == d.data("cke-real-element-type") && (a.data.dialog = "iframe") }); a.addMenuItems &&
                        a.addMenuItems({ iframe: { label: h.title, command: "iframe", group: "image" } }); a.contextMenu && a.contextMenu.addListener(function (a) { if (a && a.is("img") && "iframe" == a.data("cke-real-element-type")) return { iframe: CKEDITOR.TRISTATE_OFF } })
                }, afterInit: function (a) { var h = a.dataProcessor; (h = h && h.dataFilter) && h.addRules({ elements: { iframe: function (f) { return a.createFakeParserElement(f, "cke_iframe", "iframe", !0) } } }) }
            })
        })(); (function () {
            function a(a, b) {
                b || (b = a.getSelection().getSelectedElement()); if (b && b.is("img") && !b.data("cke-realelement") &&
                    !b.isReadOnly()) return b
            } function h(a) { var b = a.getStyle("float"); if ("inherit" == b || "none" == b) b = 0; b || (b = a.getAttribute("align")); return b } CKEDITOR.plugins.add("image", {
                requires: "dialog", init: function (f) {
                    if (!f.plugins.detectConflict("image", ["easyimage", "image2"])) {
                        CKEDITOR.dialog.add("image", this.path + "dialogs/image.js"); var b = "img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}"; CKEDITOR.dialog.isTabEnabled(f, "image", "advanced") && (b =
                            "img[alt,dir,id,lang,longdesc,!src,title]{*}(*)"); f.addCommand("image", new CKEDITOR.dialogCommand("image", { allowedContent: b, requiredContent: "img[alt,src]", contentTransformations: [["img{width}: sizeToStyle", "img[width]: sizeToAttribute"], ["img{float}: alignmentToStyle", "img[align]: alignmentToAttribute"]] })); f.ui.addButton && f.ui.addButton("Image", { label: f.lang.common.image, command: "image", toolbar: "insert,10" }); f.on("doubleclick", function (a) {
                                var b = a.data.element; !b.is("img") || b.data("cke-realelement") ||
                                    b.isReadOnly() || (a.data.dialog = "image")
                            }); f.addMenuItems && f.addMenuItems({ image: { label: f.lang.image.menu, command: "image", group: "image" } }); f.contextMenu && f.contextMenu.addListener(function (b) { if (a(f, b)) return { image: CKEDITOR.TRISTATE_OFF } })
                    }
                }, afterInit: function (f) {
                    function b(b) {
                        var l = f.getCommand("justify" + b); if (l) {
                            if ("left" == b || "right" == b) l.on("exec", function (k) { var m = a(f), g; m && (g = h(m), g == b ? (m.removeStyle("float"), b == h(m) && m.removeAttribute("align")) : m.setStyle("float", b), k.cancel()) }); l.on("refresh",
                                function (k) { var m = a(f); m && (m = h(m), this.setState(m == b ? CKEDITOR.TRISTATE_ON : "right" == b || "left" == b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED), k.cancel()) })
                        }
                    } f.plugins.image2 || (b("left"), b("right"), b("center"), b("block"))
                }
            })
        })(); CKEDITOR.config.image_removeLinkByEmptyURL = !0; (function () {
            function a(a, d) {
                var l, k; d.on("refresh", function (a) { var b = [h], e; for (e in a.data.states) b.push(a.data.states[e]); this.setState(CKEDITOR.tools.search(b, f) ? f : h) }, d, null, 100); d.on("exec", function (d) {
                    l = a.getSelection();
                    k = l.createBookmarks(1); d.data || (d.data = {}); d.data.done = !1
                }, d, null, 0); d.on("exec", function () { a.forceNextSelectionCheck(); l.selectBookmarks(k) }, d, null, 100)
            } var h = CKEDITOR.TRISTATE_DISABLED, f = CKEDITOR.TRISTATE_OFF; CKEDITOR.plugins.add("indent", {
                init: function (b) {
                    var d = CKEDITOR.plugins.indent.genericDefinition; a(b, b.addCommand("indent", new d(!0))); a(b, b.addCommand("outdent", new d)); b.ui.addButton && (b.ui.addButton("Indent", { label: b.lang.indent.indent, command: "indent", directional: !0, toolbar: "indent,20" }),
                        b.ui.addButton("Outdent", { label: b.lang.indent.outdent, command: "outdent", directional: !0, toolbar: "indent,10" })); b.on("dirChanged", function (a) {
                            var d = b.createRange(), f = a.data.node; d.setStartBefore(f); d.setEndAfter(f); for (var g = new CKEDITOR.dom.walker(d), e; e = g.next();)if (e.type == CKEDITOR.NODE_ELEMENT) if (!e.equals(f) && e.getDirection()) d.setStartAfter(e), g = new CKEDITOR.dom.walker(d); else {
                                var c = b.config.indentClasses; if (c) for (var h = "ltr" == a.data.dir ? ["_rtl", ""] : ["", "_rtl"], u = 0; u < c.length; u++)e.hasClass(c[u] +
                                    h[0]) && (e.removeClass(c[u] + h[0]), e.addClass(c[u] + h[1])); c = e.getStyle("margin-right"); h = e.getStyle("margin-left"); c ? e.setStyle("margin-left", c) : e.removeStyle("margin-left"); h ? e.setStyle("margin-right", h) : e.removeStyle("margin-right")
                            }
                        })
                }
            }); CKEDITOR.plugins.indent = {
                genericDefinition: function (a) { this.isIndent = !!a; this.startDisabled = !this.isIndent }, specificDefinition: function (a, d, f) {
                    this.name = d; this.editor = a; this.jobs = {}; this.enterBr = a.config.enterMode == CKEDITOR.ENTER_BR; this.isIndent = !!f; this.relatedGlobal =
                        f ? "indent" : "outdent"; this.indentKey = f ? 9 : CKEDITOR.SHIFT + 9; this.database = {}
                }, registerCommands: function (a, d) {
                    a.on("pluginsLoaded", function () {
                        for (var a in d) (function (a, b) {
                            var d = a.getCommand(b.relatedGlobal), e; for (e in b.jobs) d.on("exec", function (c) { c.data.done || (a.fire("lockSnapshot"), b.execJob(a, e) && (c.data.done = !0), a.fire("unlockSnapshot"), CKEDITOR.dom.element.clearAllMarkers(b.database)) }, this, null, e), d.on("refresh", function (c) {
                                c.data.states || (c.data.states = {}); c.data.states[b.name + "@" + e] = b.refreshJob(a,
                                    e, c.data.path)
                            }, this, null, e); a.addFeature(b)
                        })(this, d[a])
                    })
                }
            }; CKEDITOR.plugins.indent.genericDefinition.prototype = { context: "p", exec: function () { } }; CKEDITOR.plugins.indent.specificDefinition.prototype = { execJob: function (a, d) { var f = this.jobs[d]; if (f.state != h) return f.exec.call(this, a) }, refreshJob: function (a, d, f) { d = this.jobs[d]; a.activeFilter.checkFeature(this) ? d.state = d.refresh.call(this, a, f) : d.state = h; return d.state }, getContext: function (a) { return a.contains(this.context) } }
        })(); (function () {
            function a(a,
                b, d) {
                    if (!a.getCustomData("indent_processed")) {
                        var e = this.editor, c = this.isIndent; if (b) { e = a.$.className.match(this.classNameRegex); d = 0; e && (e = e[1], d = CKEDITOR.tools.indexOf(b, e) + 1); if (0 > (d += c ? 1 : -1)) return; d = Math.min(d, b.length); d = Math.max(d, 0); a.$.className = CKEDITOR.tools.ltrim(a.$.className.replace(this.classNameRegex, "")); 0 < d && a.addClass(b[d - 1]) } else {
                            b = h(a, d); d = parseInt(a.getStyle(b), 10); var f = e.config.indentOffset || 40; isNaN(d) && (d = 0); d += (c ? 1 : -1) * f; if (0 > d) return; d = Math.max(d, 0); d = Math.ceil(d / f) * f; a.setStyle(b,
                                d ? d + (e.config.indentUnit || "px") : ""); "" === a.getAttribute("style") && a.removeAttribute("style")
                        } CKEDITOR.dom.element.setMarker(this.database, a, "indent_processed", 1)
                    }
            } function h(a, b) { return "ltr" == (b || a.getComputedStyle("direction")) ? "margin-left" : "margin-right" } var f = CKEDITOR.dtd.$listItem, b = CKEDITOR.dtd.$list, d = CKEDITOR.TRISTATE_DISABLED, l = CKEDITOR.TRISTATE_OFF; CKEDITOR.plugins.add("indentblock", {
                requires: "indent", init: function (k) {
                    function m() {
                        g.specificDefinition.apply(this, arguments); this.allowedContent =
                            { "div h1 h2 h3 h4 h5 h6 ol p pre ul": { propertiesOnly: !0, styles: e ? null : "margin-left,margin-right", classes: e || null } }; this.contentTransformations = [["div: splitMarginShorthand"], ["h1: splitMarginShorthand"], ["h2: splitMarginShorthand"], ["h3: splitMarginShorthand"], ["h4: splitMarginShorthand"], ["h5: splitMarginShorthand"], ["h6: splitMarginShorthand"], ["ol: splitMarginShorthand"], ["p: splitMarginShorthand"], ["pre: splitMarginShorthand"], ["ul: splitMarginShorthand"]]; this.enterBr && (this.allowedContent.div =
                                !0); this.requiredContent = (this.enterBr ? "div" : "p") + (e ? "(" + e.join(",") + ")" : "{margin-left}"); this.jobs = {
                                    20: {
                                        refresh: function (a, b) { var g = b.block || b.blockLimit; if (!g.is(f)) var k = g.getAscendant(f), g = k && b.contains(k) || g; g.is(f) && (g = g.getParent()); if (this.enterBr || this.getContext(b)) { if (e) { var k = e, g = g.$.className.match(this.classNameRegex), m = this.isIndent, k = g ? m ? g[1] != k.slice(-1) : !0 : m; return k ? l : d } return this.isIndent ? l : g ? CKEDITOR[0 >= (parseInt(g.getStyle(h(g)), 10) || 0) ? "TRISTATE_DISABLED" : "TRISTATE_OFF"] : d } return d },
                                        exec: function (c) { var d = c.getSelection(), d = d && d.getRanges()[0], g; if (g = c.elementPath().contains(b)) a.call(this, g, e); else for (d = d.createIterator(), c = c.config.enterMode, d.enforceRealBlocks = !0, d.enlargeBr = c != CKEDITOR.ENTER_BR; g = d.getNextParagraph(c == CKEDITOR.ENTER_P ? "p" : "div");)g.isReadOnly() || a.call(this, g, e); return !0 }
                                    }
                                }
                    } var g = CKEDITOR.plugins.indent, e = k.config.indentClasses; g.registerCommands(k, { indentblock: new m(k, "indentblock", !0), outdentblock: new m(k, "outdentblock") }); CKEDITOR.tools.extend(m.prototype,
                        g.specificDefinition.prototype, { context: { div: 1, dl: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, ul: 1, ol: 1, p: 1, pre: 1, table: 1 }, classNameRegex: e ? new RegExp("(?:^|\\s+)(" + e.join("|") + ")(?\x3d$|\\s)") : null })
                }
            })
        })(); (function () {
            function a(a) {
                function b(g) {
                    for (var h = k.startContainer, l = k.endContainer; h && !h.getParent().equals(g);)h = h.getParent(); for (; l && !l.getParent().equals(g);)l = l.getParent(); if (!h || !l) return !1; for (var q = [], t = !1; !t;)h.equals(l) && (t = !0), q.push(h), h = h.getNext(); if (1 > q.length) return !1; h = g.getParents(!0);
                    for (l = 0; l < h.length; l++)if (h[l].getName && d[h[l].getName()]) { g = h[l]; break } for (var h = e.isIndent ? 1 : -1, l = q[0], q = q[q.length - 1], t = CKEDITOR.plugins.list.listToArray(g, c), y = t[q.getCustomData("listarray_index")].indent, l = l.getCustomData("listarray_index"); l <= q.getCustomData("listarray_index"); l++)if (t[l].indent += h, 0 < h) { for (var z = t[l].parent, B = l - 1; 0 <= B; B--)if (t[B].indent === h) { z = t[B].parent; break } t[l].parent = new CKEDITOR.dom.element(z.getName(), z.getDocument()) } for (l = q.getCustomData("listarray_index") + 1; l < t.length &&
                        t[l].indent > y; l++)t[l].indent += h; h = CKEDITOR.plugins.list.arrayToList(t, c, null, a.config.enterMode, g.getDirection()); if (!e.isIndent) { var C; if ((C = g.getParent()) && C.is("li")) for (var q = h.listNode.getChildren(), E = [], p, l = q.count() - 1; 0 <= l; l--)(p = q.getItem(l)) && p.is && p.is("li") && E.push(p) } h && h.listNode.replace(g); if (E && E.length) for (l = 0; l < E.length; l++) { for (p = g = E[l]; (p = p.getNext()) && p.is && p.getName() in d;)CKEDITOR.env.needsNbspFiller && !g.getFirst(f) && g.append(k.document.createText(" ")), g.append(p); g.insertAfter(C) } h &&
                            a.fire("contentDomInvalidated"); return !0
                } for (var e = this, c = this.database, d = this.context, k, l = a.getSelection(), l = (l && l.getRanges()).createIterator(); k = l.getNextRange();) {
                    for (var p = k.getCommonAncestor(); p && (p.type != CKEDITOR.NODE_ELEMENT || !d[p.getName()]);) { if (a.editable().equals(p)) { p = !1; break } p = p.getParent() } p || (p = k.startPath().contains(d)) && k.setEndAt(p, CKEDITOR.POSITION_BEFORE_END); if (!p) {
                        var q = k.getEnclosedNode(); q && q.type == CKEDITOR.NODE_ELEMENT && q.getName() in d && (k.setStartAt(q, CKEDITOR.POSITION_AFTER_START),
                            k.setEndAt(q, CKEDITOR.POSITION_BEFORE_END), p = q)
                    } p && k.startContainer.type == CKEDITOR.NODE_ELEMENT && k.startContainer.getName() in d && (q = new CKEDITOR.dom.walker(k), q.evaluator = h, k.startContainer = q.next()); p && k.endContainer.type == CKEDITOR.NODE_ELEMENT && k.endContainer.getName() in d && (q = new CKEDITOR.dom.walker(k), q.evaluator = h, k.endContainer = q.previous()); if (p) return b(p)
                } return 0
            } function h(a) { return a.type == CKEDITOR.NODE_ELEMENT && a.is("li") } function f(a) { return b(a) && d(a) } var b = CKEDITOR.dom.walker.whitespaces(!0),
                d = CKEDITOR.dom.walker.bookmark(!1, !0), l = CKEDITOR.TRISTATE_DISABLED, k = CKEDITOR.TRISTATE_OFF; CKEDITOR.plugins.add("indentlist", {
                    requires: "indent", init: function (b) {
                        function d(b) {
                            e.specificDefinition.apply(this, arguments); this.requiredContent = ["ul", "ol"]; b.on("key", function (a) { var e = b.elementPath(); if ("wysiwyg" == b.mode && a.data.keyCode == this.indentKey && e) { var d = this.getContext(e); !d || this.isIndent && CKEDITOR.plugins.indentList.firstItemInPath(this.context, e, d) || (b.execCommand(this.relatedGlobal), a.cancel()) } },
                                this); this.jobs[this.isIndent ? 10 : 30] = { refresh: this.isIndent ? function (a, b) { var e = this.getContext(b), c = CKEDITOR.plugins.indentList.firstItemInPath(this.context, b, e); return e && this.isIndent && !c ? k : l } : function (a, b) { return !this.getContext(b) || this.isIndent ? l : k }, exec: CKEDITOR.tools.bind(a, this) }
                        } var e = CKEDITOR.plugins.indent; e.registerCommands(b, { indentlist: new d(b, "indentlist", !0), outdentlist: new d(b, "outdentlist") }); CKEDITOR.tools.extend(d.prototype, e.specificDefinition.prototype, { context: { ol: 1, ul: 1 } })
                    }
                });
            CKEDITOR.plugins.indentList = {}; CKEDITOR.plugins.indentList.firstItemInPath = function (a, b, e) { var c = b.contains(h); e || (e = b.contains(a)); return e && c && c.equals(e.getFirst(h)) }
        })(); (function () {
            function a(a, d) {
                var f; if (d) f = a.getComputedStyle("text-align"); else { for (; !a.hasAttribute || !a.hasAttribute("align") && !a.getStyle("text-align");) { f = a.getParent(); if (!f) break; a = f } f = a.getStyle("text-align") || a.getAttribute("align") || "" } f && (f = f.replace(/(?:-(?:moz|webkit)-)?(?:start|auto)/i, "")); !f && d && (f = "rtl" == a.getComputedStyle("direction") ?
                    "right" : "left"); return f
            } function h(a, d, f) {
                this.editor = a; this.name = d; this.value = f; this.context = "p"; d = a.config.justifyClasses; var h = a.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div"; if (d) { switch (f) { case "left": this.cssClassName = d[0]; break; case "center": this.cssClassName = d[1]; break; case "right": this.cssClassName = d[2]; break; case "justify": this.cssClassName = d[3] }this.cssClassRegex = new RegExp("(?:^|\\s+)(?:" + d.join("|") + ")(?\x3d$|\\s)"); this.requiredContent = h + "(" + this.cssClassName + ")" } else this.requiredContent =
                    h + "{text-align}"; this.allowedContent = { "caption div h1 h2 h3 h4 h5 h6 p pre td th li": { propertiesOnly: !0, styles: this.cssClassName ? null : "text-align", classes: this.cssClassName || null } }; a.config.enterMode == CKEDITOR.ENTER_BR && (this.allowedContent.div = !0)
            } function f(a) {
                var d = a.editor, f = d.createRange(); f.setStartBefore(a.data.node); f.setEndAfter(a.data.node); for (var h = new CKEDITOR.dom.walker(f), m; m = h.next();)if (m.type == CKEDITOR.NODE_ELEMENT) if (!m.equals(a.data.node) && m.getDirection()) f.setStartAfter(m), h =
                    new CKEDITOR.dom.walker(f); else { var g = d.config.justifyClasses; g && (m.hasClass(g[0]) ? (m.removeClass(g[0]), m.addClass(g[2])) : m.hasClass(g[2]) && (m.removeClass(g[2]), m.addClass(g[0]))); g = m.getStyle("text-align"); "left" == g ? m.setStyle("text-align", "right") : "right" == g && m.setStyle("text-align", "left") }
            } h.prototype = {
                exec: function (b) {
                    var d = b.getSelection(), f = b.config.enterMode; if (d) {
                        for (var h = d.createBookmarks(), m = d.getRanges(), g = this.cssClassName, e, c, n = b.config.useComputedState, u = m.length - 1; 0 <= u; u--)for (e =
                            m[u].createIterator(), e.enlargeBr = f != CKEDITOR.ENTER_BR; c = e.getNextParagraph(f == CKEDITOR.ENTER_P ? "p" : "div");)if (!c.isReadOnly()) {
                                var w = c.getName(), p; p = b.activeFilter.check(w + "{text-align}"); if ((w = b.activeFilter.check(w + "(" + g + ")")) || p) {
                                    c.removeAttribute("align"); c.removeStyle("text-align"); var q = g && (c.$.className = CKEDITOR.tools.ltrim(c.$.className.replace(this.cssClassRegex, ""))), r = this.state == CKEDITOR.TRISTATE_OFF && (!n || a(c, !0) != this.value); g && w ? r ? c.addClass(g) : q || c.removeAttribute("class") : r && p &&
                                        c.setStyle("text-align", this.value)
                                }
                            } b.focus(); b.forceNextSelectionCheck(); d.selectBookmarks(h)
                    }
                }, refresh: function (b, d) { var f = d.block || d.blockLimit, h = f.getName(), m = f.equals(b.editable()), h = this.cssClassName ? b.activeFilter.check(h + "(" + this.cssClassName + ")") : b.activeFilter.check(h + "{text-align}"); m && !CKEDITOR.dtd.$list[d.lastElement.getName()] ? this.setState(CKEDITOR.TRISTATE_OFF) : !m && h ? this.setState(a(f, this.editor.config.useComputedState) == this.value ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED) }
            };
            CKEDITOR.plugins.add("justify", {
                init: function (a) {
                    if (!a.blockless) {
                        var d = new h(a, "justifyleft", "left"), l = new h(a, "justifycenter", "center"), k = new h(a, "justifyright", "right"), m = new h(a, "justifyblock", "justify"); a.addCommand("justifyleft", d); a.addCommand("justifycenter", l); a.addCommand("justifyright", k); a.addCommand("justifyblock", m); a.ui.addButton && (a.ui.addButton("JustifyLeft", { label: a.lang.common.alignLeft, command: "justifyleft", toolbar: "align,10" }), a.ui.addButton("JustifyCenter", {
                            label: a.lang.common.center,
                            command: "justifycenter", toolbar: "align,20"
                        }), a.ui.addButton("JustifyRight", { label: a.lang.common.alignRight, command: "justifyright", toolbar: "align,30" }), a.ui.addButton("JustifyBlock", { label: a.lang.common.justify, command: "justifyblock", toolbar: "align,40" })); a.on("dirChanged", f)
                    }
                }
            })
        })(); CKEDITOR.plugins.add("menubutton", {
            requires: "button,menu", onLoad: function () {
                var a = function (a) {
                    var f = this._, b = f.menu; f.state !== CKEDITOR.TRISTATE_DISABLED && (f.on && b ? b.hide() : (f.previousState = f.state, b || (b = f.menu = new CKEDITOR.menu(a,
                        { panel: { className: "cke_menu_panel", attributes: { "aria-label": a.lang.common.options } } }), b.onHide = CKEDITOR.tools.bind(function () { var b = this.command ? a.getCommand(this.command).modes : this.modes; this.setState(!b || b[a.mode] ? f.previousState : CKEDITOR.TRISTATE_DISABLED); f.on = 0 }, this), this.onMenu && b.addListener(this.onMenu)), this.setState(CKEDITOR.TRISTATE_ON), f.on = 1, setTimeout(function () { b.show(CKEDITOR.document.getById(f.id), 4) }, 0)))
                }; CKEDITOR.ui.menuButton = CKEDITOR.tools.createClass({
                    base: CKEDITOR.ui.button,
                    $: function (h) { delete h.panel; this.base(h); this.hasArrow = "menu"; this.click = a }, statics: { handler: { create: function (a) { return new CKEDITOR.ui.menuButton(a) } } }
                })
            }, beforeInit: function (a) { a.ui.addHandler(CKEDITOR.UI_MENUBUTTON, CKEDITOR.ui.menuButton.handler) }
        }); CKEDITOR.UI_MENUBUTTON = "menubutton"; "use strict"; (function () {
            CKEDITOR.plugins.add("language", {
                requires: "menubutton", init: function (a) {
                    var h = a.config.language_list || ["ar:Arabic:rtl", "fr:French", "es:Spanish"], f = this, b = a.lang.language, d = {}, l, k, m, g; a.addCommand("language",
                        { allowedContent: "span[!lang,!dir]", requiredContent: "span[lang,dir]", contextSensitive: !0, exec: function (a, b) { var g = d["language_" + b]; if (g) a[g.style.checkActive(a.elementPath(), a) ? "removeStyle" : "applyStyle"](g.style) }, refresh: function (a) { this.setState(f.getCurrentLangElement(a) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) } }); for (g = 0; g < h.length; g++)l = h[g].split(":"), k = l[0], m = "language_" + k, d[m] = {
                            label: l[1], langId: k, group: "language", order: g, ltr: "rtl" != ("" + l[2]).toLowerCase(), onClick: function () {
                                a.execCommand("language",
                                    this.langId)
                            }, role: "menuitemcheckbox"
                        }, d[m].style = new CKEDITOR.style({ element: "span", attributes: { lang: k, dir: d[m].ltr ? "ltr" : "rtl" } }); d.language_remove = { label: b.remove, group: "language_remove", state: CKEDITOR.TRISTATE_DISABLED, order: d.length, onClick: function () { var b = f.getCurrentLangElement(a); b && a.execCommand("language", b.getAttribute("lang")) } }; a.addMenuGroup("language", 1); a.addMenuGroup("language_remove"); a.addMenuItems(d); a.ui.add("Language", CKEDITOR.UI_MENUBUTTON, {
                            label: b.button, allowedContent: "span[!lang,!dir]",
                            requiredContent: "span[lang,dir]", toolbar: "bidi,30", command: "language", onMenu: function () { var b = {}, c = f.getCurrentLangElement(a), g; for (g in d) b[g] = CKEDITOR.TRISTATE_OFF; b.language_remove = c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED; c && (b["language_" + c.getAttribute("lang")] = CKEDITOR.TRISTATE_ON); return b }
                        }); a.addRemoveFormatFilter && a.addRemoveFormatFilter(function (a) { return !(a.is("span") && a.getAttribute("dir") && a.getAttribute("lang")) })
                }, getCurrentLangElement: function (a) {
                    var h = a.elementPath(); a =
                        h && h.elements; var f; if (h) for (var b = 0; b < a.length; b++)h = a[b], !f && "span" == h.getName() && h.hasAttribute("dir") && h.hasAttribute("lang") && (f = h); return f
                }
            })
        })(); "use strict"; (function () {
            function a(a) { return a.replace(/'/g, "\\$\x26") } function h(a) { for (var b = a.length, e = [], c, d = 0; d < b; d++)c = a.charCodeAt(d), e.push(c); return "String.fromCharCode(" + e.join(",") + ")" } function f(b, e) {
                for (var c = b.plugins.link, d = c.compiledProtectionFunction.params, c = [c.compiledProtectionFunction.name, "("], g, f, h = 0; h < d.length; h++)g = d[h].toLowerCase(),
                    f = e[g], 0 < h && c.push(","), c.push("'", f ? a(encodeURIComponent(e[g])) : "", "'"); c.push(")"); return c.join("")
            } function b(a) { a = a.config.emailProtection || ""; var b; a && "encode" != a && (b = {}, a.replace(/^([^(]+)\(([^)]+)\)$/, function (a, e, c) { b.name = e; b.params = []; c.replace(/[^,\s]+/g, function (a) { b.params.push(a) }) })); return b } CKEDITOR.plugins.add("link", {
                requires: "dialog,fakeobjects", onLoad: function () {
                    function a(b) { return e.replace(/%1/g, "rtl" == b ? "right" : "left").replace(/%2/g, "cke_contents_" + b) } var b = "background:url(" +
                        CKEDITOR.getUrl(this.path + "images" + (CKEDITOR.env.hidpi ? "/hidpi" : "") + "/anchor.png") + ") no-repeat %1 center;border:1px dotted #00f;background-size:16px;", e = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{" + b + "padding-%1:18px;cursor:auto;}.%2 img.cke_anchor{" + b + "width:16px;min-height:15px;height:1.15em;vertical-align:text-bottom;}"; CKEDITOR.addCss(a("ltr") + a("rtl"))
                }, init: function (a) {
                    var e = "a[!href]"; CKEDITOR.dialog.isTabEnabled(a, "link", "advanced") &&
                        (e = e.replace("]", ",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type,download]{*}(*)")); CKEDITOR.dialog.isTabEnabled(a, "link", "target") && (e = e.replace("]", ",target,onclick]")); a.addCommand("link", new CKEDITOR.dialogCommand("link", { allowedContent: e, requiredContent: "a[href]" })); a.addCommand("anchor", new CKEDITOR.dialogCommand("anchor", { allowedContent: "a[!name,id]", requiredContent: "a[name]" })); a.addCommand("unlink", new CKEDITOR.unlinkCommand); a.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand);
                    a.setKeystroke(CKEDITOR.CTRL + 76, "link"); a.setKeystroke(CKEDITOR.CTRL + 75, "link"); a.ui.addButton && (a.ui.addButton("Link", { label: a.lang.link.toolbar, command: "link", toolbar: "links,10" }), a.ui.addButton("Unlink", { label: a.lang.link.unlink, command: "unlink", toolbar: "links,20" }), a.ui.addButton("Anchor", { label: a.lang.link.anchor.toolbar, command: "anchor", toolbar: "links,30" })); CKEDITOR.dialog.add("link", this.path + "dialogs/link.js"); CKEDITOR.dialog.add("anchor", this.path + "dialogs/anchor.js"); a.on("doubleclick",
                        function (b) { var e = b.data.element.getAscendant({ a: 1, img: 1 }, !0); e && !e.isReadOnly() && (e.is("a") ? (b.data.dialog = !e.getAttribute("name") || e.getAttribute("href") && e.getChildCount() ? "link" : "anchor", b.data.link = e) : CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, e) && (b.data.dialog = "anchor")) }, null, null, 0); a.on("doubleclick", function (b) { b.data.dialog in { link: 1, anchor: 1 } && b.data.link && a.getSelection().selectElement(b.data.link) }, null, null, 20); a.addMenuItems && a.addMenuItems({
                            anchor: {
                                label: a.lang.link.anchor.menu,
                                command: "anchor", group: "anchor", order: 1
                            }, removeAnchor: { label: a.lang.link.anchor.remove, command: "removeAnchor", group: "anchor", order: 5 }, link: { label: a.lang.link.menu, command: "link", group: "link", order: 1 }, unlink: { label: a.lang.link.unlink, command: "unlink", group: "link", order: 5 }
                        }); a.contextMenu && a.contextMenu.addListener(function (b) {
                            if (!b || b.isReadOnly()) return null; b = CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, b); if (!b && !(b = CKEDITOR.plugins.link.getSelectedLink(a))) return null; var e = {}; b.getAttribute("href") &&
                                b.getChildCount() && (e = { link: CKEDITOR.TRISTATE_OFF, unlink: CKEDITOR.TRISTATE_OFF }); b && b.hasAttribute("name") && (e.anchor = e.removeAnchor = CKEDITOR.TRISTATE_OFF); return e
                        }); this.compiledProtectionFunction = b(a)
                }, afterInit: function (a) {
                    a.dataProcessor.dataFilter.addRules({ elements: { a: function (b) { return b.attributes.name ? b.children.length ? null : a.createFakeParserElement(b, "cke_anchor", "anchor") : null } } }); var b = a._.elementsPath && a._.elementsPath.filters; b && b.push(function (b, e) {
                        if ("a" == e && (CKEDITOR.plugins.link.tryRestoreFakeAnchor(a,
                            b) || b.getAttribute("name") && (!b.getAttribute("href") || !b.getChildCount()))) return "anchor"
                    })
                }
            }); var d = /^javascript:/, l = /^(?:mailto)(?:(?!\?(subject|body)=).)+/i, k = /subject=([^;?:@&=$,\/]*)/i, m = /body=([^;?:@&=$,\/]*)/i, g = /^#(.*)$/, e = /^((?:http|https|ftp|news):\/\/)?(.*)$/, c = /^(_(?:self|top|parent|blank))$/, n = /^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/, u = /^javascript:([^(]+)\(([^)]+)\)$/, w = /\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/,
                p = /(?:^|,)([^=]+)=(\d+|yes|no)/gi, q = /^tel:(.*)$/, r = { id: "advId", dir: "advLangDir", accessKey: "advAccessKey", name: "advName", lang: "advLangCode", tabindex: "advTabIndex", title: "advTitle", type: "advContentType", "class": "advCSSClasses", charset: "advCharset", style: "advStyles", rel: "advRel" }; CKEDITOR.plugins.link = {
                    getSelectedLink: function (a, b) {
                        var e = a.getSelection(), c = e.getSelectedElement(), d = e.getRanges(), g = [], f; if (!b && c && c.is("a")) return c; for (c = 0; c < d.length; c++)if (f = e.getRanges()[c], f.shrink(CKEDITOR.SHRINK_ELEMENT,
                            !0, { skipBogus: !0 }), (f = a.elementPath(f.getCommonAncestor()).contains("a", 1)) && b) g.push(f); else if (f) return f; return b ? g : null
                    }, getEditorAnchors: function (a) {
                        for (var b = a.editable(), e = b.isInline() && !a.plugins.divarea ? a.document : b, b = e.getElementsByTag("a"), e = e.getElementsByTag("img"), c = [], d = 0, g; g = b.getItem(d++);)(g.data("cke-saved-name") || g.hasAttribute("name")) && c.push({ name: g.data("cke-saved-name") || g.getAttribute("name"), id: g.getAttribute("id") }); for (d = 0; g = e.getItem(d++);)(g = this.tryRestoreFakeAnchor(a,
                            g)) && c.push({ name: g.getAttribute("name"), id: g.getAttribute("id") }); return c
                    }, fakeAnchor: !0, tryRestoreFakeAnchor: function (a, b) { if (b && b.data("cke-real-element-type") && "anchor" == b.data("cke-real-element-type")) { var e = a.restoreRealElement(b); if (e.data("cke-saved-name")) return e } }, parseLinkAttributes: function (a, b) {
                        var f = b && (b.data("cke-saved-href") || b.getAttribute("href")) || "", h = a.plugins.link.compiledProtectionFunction, y = a.config.emailProtection, z = {}, B; f.match(d) && ("encode" == y ? f = f.replace(n, function (a,
                            b, e) { e = e || ""; return "mailto:" + String.fromCharCode.apply(String, b.split(",")) + e.replace(/\\'/g, "'") }) : y && f.replace(u, function (a, b, e) { if (b == h.name) { z.type = "email"; a = z.email = {}; b = /(^')|('$)/g; e = e.match(/[^,\s]+/g); for (var c = e.length, d, g, f = 0; f < c; f++)d = decodeURIComponent, g = e[f].replace(b, "").replace(/\\'/g, "'"), g = d(g), d = h.params[f].toLowerCase(), a[d] = g; a.address = [a.name, a.domain].join("@") } })); if (!z.type) if (y = f.match(g)) z.type = "anchor", z.anchor = {}, z.anchor.name = z.anchor.id = y[1]; else if (y = f.match(q)) z.type =
                                "tel", z.tel = y[1]; else if (y = f.match(l)) { B = f.match(k); var f = f.match(m), C = z.email = {}; z.type = "email"; C.address = y[0].replace("mailto:", ""); B && (C.subject = decodeURIComponent(B[1])); f && (C.body = decodeURIComponent(f[1])) } else f && (B = f.match(e)) && (z.type = "url", z.url = {}, z.url.protocol = B[1], z.url.url = B[2]); if (b) {
                                    if (f = b.getAttribute("target")) z.target = { type: f.match(c) ? f : "frame", name: f }; else if (f = (f = b.data("cke-pa-onclick") || b.getAttribute("onclick")) && f.match(w)) for (z.target = { type: "popup", name: f[1] }; y = p.exec(f[2]);)"yes" !=
                                        y[2] && "1" != y[2] || y[1] in { height: 1, width: 1, top: 1, left: 1 } ? isFinite(y[2]) && (z.target[y[1]] = y[2]) : z.target[y[1]] = !0; null !== b.getAttribute("download") && (z.download = !0); var f = {}, E; for (E in r) (y = b.getAttribute(E)) && (f[r[E]] = y); if (E = b.data("cke-saved-name") || f.advName) f.advName = E; CKEDITOR.tools.isEmpty(f) || (z.advanced = f)
                                } return z
                    }, getLinkAttributes: function (b, e) {
                        var c = b.config.emailProtection || "", d = {}; switch (e.type) {
                            case "url": var c = e.url && void 0 !== e.url.protocol ? e.url.protocol : "http://", g = e.url && CKEDITOR.tools.trim(e.url.url) ||
                                ""; d["data-cke-saved-href"] = 0 === g.indexOf("/") ? g : c + g; break; case "anchor": c = e.anchor && e.anchor.id; d["data-cke-saved-href"] = "#" + (e.anchor && e.anchor.name || c || ""); break; case "email": var k = e.email, g = k.address; switch (c) {
                                    case "": case "encode": var l = encodeURIComponent(k.subject || ""), m = encodeURIComponent(k.body || ""), k = []; l && k.push("subject\x3d" + l); m && k.push("body\x3d" + m); k = k.length ? "?" + k.join("\x26") : ""; "encode" == c ? (c = ["javascript:void(location.href\x3d'mailto:'+", h(g)], k && c.push("+'", a(k), "'"), c.push(")")) :
                                        c = ["mailto:", g, k]; break; default: c = g.split("@", 2), k.name = c[0], k.domain = c[1], c = ["javascript:", f(b, k)]
                                }d["data-cke-saved-href"] = c.join(""); break; case "tel": d["data-cke-saved-href"] = "tel:" + e.tel
                        }if (e.target) if ("popup" == e.target.type) {
                            for (var c = ["window.open(this.href, '", e.target.name || "", "', '"], n = "resizable status location toolbar menubar fullscreen scrollbars dependent".split(" "), g = n.length, l = function (a) { e.target[a] && n.push(a + "\x3d" + e.target[a]) }, k = 0; k < g; k++)n[k] += e.target[n[k]] ? "\x3dyes" : "\x3dno";
                            l("width"); l("left"); l("height"); l("top"); c.push(n.join(","), "'); return false;"); d["data-cke-pa-onclick"] = c.join("")
                        } else "notSet" != e.target.type && e.target.name && (d.target = e.target.name); e.download && (d.download = ""); if (e.advanced) { for (var q in r) (c = e.advanced[r[q]]) && (d[q] = c); d.name && (d["data-cke-saved-name"] = d.name) } d["data-cke-saved-href"] && (d.href = d["data-cke-saved-href"]); q = { target: 1, onclick: 1, "data-cke-pa-onclick": 1, "data-cke-saved-name": 1, download: 1 }; e.advanced && CKEDITOR.tools.extend(q, r); for (var u in d) delete q[u];
                        return { set: d, removed: CKEDITOR.tools.object.keys(q) }
                    }, showDisplayTextForElement: function (a, b) { var e = { img: 1, table: 1, tbody: 1, thead: 1, tfoot: 1, input: 1, select: 1, textarea: 1 }, c = b.getSelection(); return b.widgets && b.widgets.focused || c && 1 < c.getRanges().length ? !1 : !a || !a.getName || !a.is(e) }
                }; CKEDITOR.unlinkCommand = function () { }; CKEDITOR.unlinkCommand.prototype = {
                    exec: function (a) {
                        if (CKEDITOR.env.ie) {
                            var b = a.getSelection().getRanges()[0], e = b.getPreviousEditableNode() && b.getPreviousEditableNode().getAscendant("a", !0) ||
                                b.getNextEditableNode() && b.getNextEditableNode().getAscendant("a", !0), c; b.collapsed && e && (c = b.createBookmark(), b.selectNodeContents(e), b.select())
                        } e = new CKEDITOR.style({ element: "a", type: CKEDITOR.STYLE_INLINE, alwaysRemoveElement: 1 }); a.removeStyle(e); c && (b.moveToBookmark(c), b.select())
                    }, refresh: function (a, b) { var e = b.lastElement && b.lastElement.getAscendant("a", !0); e && "a" == e.getName() && e.getAttribute("href") && e.getChildCount() ? this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED) },
                    contextSensitive: 1, startDisabled: 1, requiredContent: "a[href]", editorFocus: 1
                }; CKEDITOR.removeAnchorCommand = function () { }; CKEDITOR.removeAnchorCommand.prototype = {
                    exec: function (a) {
                        var b = a.getSelection(), e = b.createBookmarks(), c; if (b && (c = b.getSelectedElement()) && (c.getChildCount() ? c.is("a") : CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, c))) c.remove(1); else if (c = CKEDITOR.plugins.link.getSelectedLink(a)) c.hasAttribute("href") ? (c.removeAttributes({ name: 1, "data-cke-saved-name": 1 }), c.removeClass("cke_anchor")) :
                            c.remove(1); b.selectBookmarks(e)
                    }, requiredContent: "a[name]"
                }; CKEDITOR.tools.extend(CKEDITOR.config, { linkShowAdvancedTab: !0, linkShowTargetTab: !0, linkDefaultProtocol: "http://" })
        })(); (function () {
            function a(a, b, e, c) {
                for (var d = CKEDITOR.plugins.list.listToArray(b.root, e), g = [], f = 0; f < b.contents.length; f++) { var h = b.contents[f]; (h = h.getAscendant("li", !0)) && !h.getCustomData("list_item_processed") && (g.push(h), CKEDITOR.dom.element.setMarker(e, h, "list_item_processed", !0)) } for (var h = b.root.getDocument(), k, l, f = 0; f <
                    g.length; f++) { var m = g[f].getCustomData("listarray_index"); k = d[m].parent; k.is(this.type) || (l = h.createElement(this.type), k.copyAttributes(l, { start: 1, type: 1 }), l.removeStyle("list-style-type"), d[m].parent = l) } e = CKEDITOR.plugins.list.arrayToList(d, e, null, a.config.enterMode); for (var n, d = e.listNode.getChildCount(), f = 0; f < d && (n = e.listNode.getChild(f)); f++)n.getName() == this.type && c.push(n); e.listNode.replace(b.root); a.fire("contentDomInvalidated")
            } function h(a, b, e) {
                var c = b.contents, d = b.root.getDocument(), g =
                    []; if (1 == c.length && c[0].equals(b.root)) { var f = d.createElement("div"); c[0].moveChildren && c[0].moveChildren(f); c[0].append(f); c[0] = f } b = b.contents[0].getParent(); for (f = 0; f < c.length; f++)b = b.getCommonAncestor(c[f].getParent()); a = a.config.useComputedState; for (var h, k, f = 0; f < c.length; f++)for (var l = c[f], m; m = l.getParent();) { if (m.equals(b)) { g.push(l); !k && l.getDirection() && (k = 1); l = l.getDirection(a); null !== h && (h = h && h != l ? null : l); break } l = m } if (!(1 > g.length)) {
                        c = g[g.length - 1].getNext(); f = d.createElement(this.type);
                        for (e.push(f); g.length;)e = g.shift(), a = d.createElement("li"), l = e, l.is("pre") || p.test(l.getName()) || "false" == l.getAttribute("contenteditable") ? e.appendTo(a) : (e.copyAttributes(a), h && e.getDirection() && (a.removeStyle("direction"), a.removeAttribute("dir")), e.moveChildren(a), e.remove()), a.appendTo(f); h && k && f.setAttribute("dir", h); c ? f.insertBefore(c) : f.appendTo(b)
                    }
            } function f(a, b, e) {
                function c(e) {
                    if (!(!(l = k[e ? "getFirst" : "getLast"]()) || l.is && l.isBlockBoundary() || !(m = b.root[e ? "getPrevious" : "getNext"](CKEDITOR.dom.walker.invisible(!0))) ||
                        m.is && m.isBlockBoundary({ br: 1 }))) a.document.createElement("br")[e ? "insertBefore" : "insertAfter"](l)
                } for (var d = CKEDITOR.plugins.list.listToArray(b.root, e), g = [], f = 0; f < b.contents.length; f++) { var h = b.contents[f]; (h = h.getAscendant("li", !0)) && !h.getCustomData("list_item_processed") && (g.push(h), CKEDITOR.dom.element.setMarker(e, h, "list_item_processed", !0)) } h = null; for (f = 0; f < g.length; f++)h = g[f].getCustomData("listarray_index"), d[h].indent = -1; for (f = h + 1; f < d.length; f++)if (d[f].indent > d[f - 1].indent + 1) {
                    g = d[f - 1].indent +
                    1 - d[f].indent; for (h = d[f].indent; d[f] && d[f].indent >= h;)d[f].indent += g, f++; f--
                } var k = CKEDITOR.plugins.list.arrayToList(d, e, null, a.config.enterMode, b.root.getAttribute("dir")).listNode, l, m; c(!0); c(); k.replace(b.root); a.fire("contentDomInvalidated")
            } function b(a, b) { this.name = a; this.context = this.type = b; this.allowedContent = b + " li"; this.requiredContent = b } function d(a, b, e, c) {
                for (var d, g; d = a[c ? "getLast" : "getFirst"](q);)(g = d.getDirection(1)) !== b.getDirection(1) && d.setAttribute("dir", g), d.remove(), e ? d[c ? "insertBefore" :
                    "insertAfter"](e) : b.append(d, c), e = d
            } function l(a) { function b(e) { var c = a[e ? "getPrevious" : "getNext"](u); c && c.type == CKEDITOR.NODE_ELEMENT && c.is(a.getName()) && (d(a, c, null, !e), a.remove(), a = c) } b(); b(1) } function k(a) { return a.type == CKEDITOR.NODE_ELEMENT && (a.getName() in CKEDITOR.dtd.$block || a.getName() in CKEDITOR.dtd.$listItem) && CKEDITOR.dtd[a.getName()]["#"] } function m(a, b, e) {
                a.fire("saveSnapshot"); e.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS); var c = e.extractContents(); b.trim(!1, !0); var f = b.createBookmark(),
                    h = new CKEDITOR.dom.elementPath(b.startContainer), k = h.block, h = h.lastElement.getAscendant("li", 1) || k, m = new CKEDITOR.dom.elementPath(e.startContainer), n = m.contains(CKEDITOR.dtd.$listItem), m = m.contains(CKEDITOR.dtd.$list); k ? (k = k.getBogus()) && k.remove() : m && (k = m.getPrevious(u)) && w(k) && k.remove(); (k = c.getLast()) && k.type == CKEDITOR.NODE_ELEMENT && k.is("br") && k.remove(); (k = b.startContainer.getChild(b.startOffset)) ? c.insertBefore(k) : b.startContainer.append(c); n && (c = g(n)) && (h.contains(n) ? (d(c, n.getParent(), n),
                        c.remove()) : h.append(c)); for (; e.checkStartOfBlock() && e.checkEndOfBlock();) { m = e.startPath(); c = m.block; if (!c) break; c.is("li") && (h = c.getParent(), c.equals(h.getLast(u)) && c.equals(h.getFirst(u)) && (c = h)); e.moveToPosition(c, CKEDITOR.POSITION_BEFORE_START); c.remove() } e = e.clone(); c = a.editable(); e.setEndAt(c, CKEDITOR.POSITION_BEFORE_END); e = new CKEDITOR.dom.walker(e); e.evaluator = function (a) { return u(a) && !w(a) }; (e = e.next()) && e.type == CKEDITOR.NODE_ELEMENT && e.getName() in CKEDITOR.dtd.$list && l(e); b.moveToBookmark(f);
                b.select(); a.fire("saveSnapshot")
            } function g(a) { return (a = a.getLast(u)) && a.type == CKEDITOR.NODE_ELEMENT && a.getName() in e ? a : null } var e = { ol: 1, ul: 1 }, c = CKEDITOR.dom.walker.whitespaces(), n = CKEDITOR.dom.walker.bookmark(), u = function (a) { return !(c(a) || n(a)) }, w = CKEDITOR.dom.walker.bogus(); CKEDITOR.plugins.list = {
                listToArray: function (a, b, c, d, g) {
                    if (!e[a.getName()]) return []; d || (d = 0); c || (c = []); for (var f = 0, h = a.getChildCount(); f < h; f++) {
                        var k = a.getChild(f); k.type == CKEDITOR.NODE_ELEMENT && k.getName() in CKEDITOR.dtd.$list &&
                            CKEDITOR.plugins.list.listToArray(k, b, c, d + 1); if ("li" == k.$.nodeName.toLowerCase()) {
                                var l = { parent: a, indent: d, element: k, contents: [] }; g ? l.grandparent = g : (l.grandparent = a.getParent(), l.grandparent && "li" == l.grandparent.$.nodeName.toLowerCase() && (l.grandparent = l.grandparent.getParent())); b && CKEDITOR.dom.element.setMarker(b, k, "listarray_index", c.length); c.push(l); for (var m = 0, n = k.getChildCount(), q; m < n; m++)q = k.getChild(m), q.type == CKEDITOR.NODE_ELEMENT && e[q.getName()] ? CKEDITOR.plugins.list.listToArray(q, b, c,
                                    d + 1, l.grandparent) : l.contents.push(q)
                            }
                    } return c
                }, arrayToList: function (a, b, c, d, g) {
                    c || (c = 0); if (!a || a.length < c + 1) return null; for (var f, h = a[c].parent.getDocument(), k = new CKEDITOR.dom.documentFragment(h), l = null, m = c, q = Math.max(a[c].indent, 0), p = null, w, x, S = d == CKEDITOR.ENTER_P ? "p" : "div"; ;) {
                        var I = a[m]; f = I.grandparent; w = I.element.getDirection(1); if (I.indent == q) {
                            l && a[m].parent.getName() == l.getName() || (l = a[m].parent.clone(!1, 1), g && l.setAttribute("dir", g), k.append(l)); p = l.append(I.element.clone(0, 1)); w != l.getDirection(1) &&
                                p.setAttribute("dir", w); for (f = 0; f < I.contents.length; f++)p.append(I.contents[f].clone(1, 1)); m++
                        } else if (I.indent == Math.max(q, 0) + 1) I = a[m - 1].element.getDirection(1), m = CKEDITOR.plugins.list.arrayToList(a, null, m, d, I != w ? w : null), !p.getChildCount() && CKEDITOR.env.needsNbspFiller && 7 >= h.$.documentMode && p.append(h.createText(" ")), p.append(m.listNode), m = m.nextIndex; else if (-1 == I.indent && !c && f) {
                            e[f.getName()] ? (p = I.element.clone(!1, !0), w != f.getDirection(1) && p.setAttribute("dir", w)) : p = new CKEDITOR.dom.documentFragment(h);
                            var l = f.getDirection(1) != w, F = I.element, P = F.getAttribute("class"), M = F.getAttribute("style"), O = p.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (d != CKEDITOR.ENTER_BR || l || M || P), N, X = I.contents.length, T; for (f = 0; f < X; f++)if (N = I.contents[f], n(N) && 1 < X) O ? T = N.clone(1, 1) : p.append(N.clone(1, 1)); else if (N.type == CKEDITOR.NODE_ELEMENT && N.isBlockBoundary()) {
                                l && !N.getDirection() && N.setAttribute("dir", w); x = N; var Y = F.getAttribute("style"); Y && x.setAttribute("style", Y.replace(/([^;])$/, "$1;") + (x.getAttribute("style") || "")); P &&
                                    N.addClass(P); x = null; T && (p.append(T), T = null); p.append(N.clone(1, 1))
                            } else O ? (x || (x = h.createElement(S), p.append(x), l && x.setAttribute("dir", w)), M && x.setAttribute("style", M), P && x.setAttribute("class", P), T && (x.append(T), T = null), x.append(N.clone(1, 1))) : p.append(N.clone(1, 1)); T && ((x || p).append(T), T = null); p.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && m != a.length - 1 && (CKEDITOR.env.needsBrFiller && (w = p.getLast()) && w.type == CKEDITOR.NODE_ELEMENT && w.is("br") && w.remove(), (w = p.getLast(u)) && w.type == CKEDITOR.NODE_ELEMENT &&
                                w.is(CKEDITOR.dtd.$block) || p.append(h.createElement("br"))); w = p.$.nodeName.toLowerCase(); "div" != w && "p" != w || p.appendBogus(); k.append(p); l = null; m++
                        } else return null; x = null; if (a.length <= m || Math.max(a[m].indent, 0) < q) break
                    } if (b) for (a = k.getFirst(); a;) { if (a.type == CKEDITOR.NODE_ELEMENT && (CKEDITOR.dom.element.clearMarkers(b, a), a.getName() in CKEDITOR.dtd.$listItem && (c = a, h = g = d = void 0, d = c.getDirection()))) { for (g = c.getParent(); g && !(h = g.getDirection());)g = g.getParent(); d == h && c.removeAttribute("dir") } a = a.getNextSourceNode() } return {
                        listNode: k,
                        nextIndex: m
                    }
                }
            }; var p = /^h[1-6]$/, q = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT); b.prototype = {
                exec: function (b) {
                    function c(a) { return e[a.root.getName()] && !d(a.root, [CKEDITOR.NODE_COMMENT]) } function d(a, b) { return CKEDITOR.tools.array.filter(a.getChildren().toArray(), function (a) { return -1 === CKEDITOR.tools.array.indexOf(b, a.type) }).length } function g(a) { var b = !0; if (0 === a.getChildCount()) return !1; a.forEach(function (a) { if (a.type !== CKEDITOR.NODE_COMMENT) return b = !1 }, null, !0); return b } this.refresh(b, b.elementPath());
                    var k = b.config, m = b.getSelection(), n = m && m.getRanges(); if (this.state == CKEDITOR.TRISTATE_OFF) { var q = b.editable(); if (q.getFirst(u)) { var p = 1 == n.length && n[0]; (k = p && p.getEnclosedNode()) && k.is && this.type == k.getName() && this.setState(CKEDITOR.TRISTATE_ON) } else k.enterMode == CKEDITOR.ENTER_BR ? q.appendBogus() : n[0].fixBlock(1, k.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), m.selectRanges(n) } for (var k = m.createBookmarks(!0), q = [], w = {}, n = n.createIterator(), x = 0; (p = n.getNextRange()) && ++x;) {
                        var H = p.getBoundaryNodes(), L = H.startNode,
                        K = H.endNode; L.type == CKEDITOR.NODE_ELEMENT && "td" == L.getName() && p.setStartAt(H.startNode, CKEDITOR.POSITION_AFTER_START); K.type == CKEDITOR.NODE_ELEMENT && "td" == K.getName() && p.setEndAt(H.endNode, CKEDITOR.POSITION_BEFORE_END); p = p.createIterator(); for (p.forceBrBreak = this.state == CKEDITOR.TRISTATE_OFF; H = p.getNextParagraph();)if (!H.getCustomData("list_block") && !g(H)) {
                            CKEDITOR.dom.element.setMarker(w, H, "list_block", 1); for (var S = b.elementPath(H), L = S.elements, K = 0, S = S.blockLimit, I, F = L.length - 1; 0 <= F && (I = L[F]); F--)if (e[I.getName()] &&
                                S.contains(I)) { S.removeCustomData("list_group_object_" + x); (L = I.getCustomData("list_group_object")) ? L.contents.push(H) : (L = { root: I, contents: [H] }, q.push(L), CKEDITOR.dom.element.setMarker(w, I, "list_group_object", L)); K = 1; break } K || (K = S, K.getCustomData("list_group_object_" + x) ? K.getCustomData("list_group_object_" + x).contents.push(H) : (L = { root: K, contents: [H] }, CKEDITOR.dom.element.setMarker(w, K, "list_group_object_" + x, L), q.push(L)))
                        }
                    } for (I = []; 0 < q.length;)L = q.shift(), this.state == CKEDITOR.TRISTATE_OFF ? c(L) || (e[L.root.getName()] ?
                        a.call(this, b, L, w, I) : h.call(this, b, L, I)) : this.state == CKEDITOR.TRISTATE_ON && e[L.root.getName()] && !c(L) && f.call(this, b, L, w); for (F = 0; F < I.length; F++)l(I[F]); CKEDITOR.dom.element.clearAllMarkers(w); m.selectBookmarks(k); b.focus()
                }, refresh: function (a, b) { var c = b.contains(e, 1), d = b.blockLimit || b.root; c && d.contains(c) ? this.setState(c.is(this.type) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_OFF) }
            }; CKEDITOR.plugins.add("list", {
                requires: "indentlist", init: function (a) {
                    a.blockless ||
                    (a.addCommand("numberedlist", new b("numberedlist", "ol")), a.addCommand("bulletedlist", new b("bulletedlist", "ul")), a.ui.addButton && (a.ui.addButton("NumberedList", { label: a.lang.list.numberedlist, command: "numberedlist", directional: !0, toolbar: "list,10" }), a.ui.addButton("BulletedList", { label: a.lang.list.bulletedlist, command: "bulletedlist", directional: !0, toolbar: "list,20" })), a.on("key", function (b) {
                        var c = b.data.domEvent.getKey(), d; if ("wysiwyg" == a.mode && c in { 8: 1, 46: 1 }) {
                            var f = a.getSelection().getRanges()[0],
                            h = f && f.startPath(); if (f && f.collapsed) {
                                var l = 8 == c, n = a.editable(), q = new CKEDITOR.dom.walker(f.clone()); q.evaluator = function (a) { return u(a) && !w(a) }; q.guard = function (a, b) { return !(b && a.type == CKEDITOR.NODE_ELEMENT && a.is("table")) }; c = f.clone(); if (l) {
                                    var p; (p = h.contains(e)) && f.checkBoundaryOfElement(p, CKEDITOR.START) && (p = p.getParent()) && p.is("li") && (p = g(p)) ? (d = p, p = p.getPrevious(u), c.moveToPosition(p && w(p) ? p : d, CKEDITOR.POSITION_BEFORE_START)) : (q.range.setStartAt(n, CKEDITOR.POSITION_AFTER_START), q.range.setEnd(f.startContainer,
                                        f.startOffset), (p = q.previous()) && p.type == CKEDITOR.NODE_ELEMENT && (p.getName() in e || p.is("li")) && (p.is("li") || (q.range.selectNodeContents(p), q.reset(), q.evaluator = k, p = q.previous()), d = p, c.moveToElementEditEnd(d), c.moveToPosition(c.endPath().block, CKEDITOR.POSITION_BEFORE_END))); if (d) m(a, c, f), b.cancel(); else {
                                            var x = h.contains(e); x && f.checkBoundaryOfElement(x, CKEDITOR.START) && (d = x.getFirst(u), f.checkBoundaryOfElement(d, CKEDITOR.START) && (p = x.getPrevious(u), g(d) ? p && (f.moveToElementEditEnd(p), f.select()) :
                                                a.execCommand("outdent"), b.cancel()))
                                        }
                                } else if (d = h.contains("li")) {
                                    if (q.range.setEndAt(n, CKEDITOR.POSITION_BEFORE_END), l = (n = d.getLast(u)) && k(n) ? n : d, h = 0, (p = q.next()) && p.type == CKEDITOR.NODE_ELEMENT && p.getName() in e && p.equals(n) ? (h = 1, p = q.next()) : f.checkBoundaryOfElement(l, CKEDITOR.END) && (h = 2), h && p) {
                                        f = f.clone(); f.moveToElementEditStart(p); if (1 == h && (c.optimize(), !c.startContainer.equals(d))) { for (d = c.startContainer; d.is(CKEDITOR.dtd.$inline);)x = d, d = d.getParent(); x && c.moveToPosition(x, CKEDITOR.POSITION_AFTER_END) } 2 ==
                                            h && (c.moveToPosition(c.endPath().block, CKEDITOR.POSITION_BEFORE_END), f.endPath().block && f.moveToPosition(f.endPath().block, CKEDITOR.POSITION_AFTER_START)); m(a, c, f); b.cancel()
                                    }
                                } else q.range.setEndAt(n, CKEDITOR.POSITION_BEFORE_END), (p = q.next()) && p.type == CKEDITOR.NODE_ELEMENT && p.is(e) && (p = p.getFirst(u), h.block && f.checkStartOfBlock() && f.checkEndOfBlock() ? (h.block.remove(), f.moveToElementEditStart(p), f.select()) : g(p) ? (f.moveToElementEditStart(p), f.select()) : (f = f.clone(), f.moveToElementEditStart(p), m(a,
                                    c, f)), b.cancel()); setTimeout(function () { a.selectionChange(1) })
                            }
                        }
                    }))
                }
            })
        })(); (function () {
            CKEDITOR.plugins.liststyle = {
                requires: "dialog,contextmenu", init: function (a) {
                    if (!a.blockless) {
                        var h; h = new CKEDITOR.dialogCommand("numberedListStyle", { requiredContent: "ol", allowedContent: "ol{list-style-type}[start]; li{list-style-type}[value]", contentTransformations: [["ol: listTypeToStyle"]] }); h = a.addCommand("numberedListStyle", h); a.addFeature(h); CKEDITOR.dialog.add("numberedListStyle", this.path + "dialogs/liststyle.js");
                        h = new CKEDITOR.dialogCommand("bulletedListStyle", { requiredContent: "ul", allowedContent: "ul{list-style-type}", contentTransformations: [["ul: listTypeToStyle"]] }); h = a.addCommand("bulletedListStyle", h); a.addFeature(h); CKEDITOR.dialog.add("bulletedListStyle", this.path + "dialogs/liststyle.js"); a.addMenuGroup("list", 108); a.addMenuItems({ numberedlist: { label: a.lang.liststyle.numberedTitle, group: "list", command: "numberedListStyle" }, bulletedlist: { label: a.lang.liststyle.bulletedTitle, group: "list", command: "bulletedListStyle" } });
                        a.contextMenu.addListener(function (a) { if (!a || a.isReadOnly()) return null; for (; a;) { var b = a.getName(); if ("ol" == b) return { numberedlist: CKEDITOR.TRISTATE_OFF }; if ("ul" == b) return { bulletedlist: CKEDITOR.TRISTATE_OFF }; a = a.getParent() } return null })
                    }
                }
            }; CKEDITOR.plugins.add("liststyle", CKEDITOR.plugins.liststyle)
        })(); "use strict"; (function () {
            function a(a, b, e) { return n(b) && n(e) && e.equals(b.getNext(function (a) { return !(aa(a) || ca(a) || u(a)) })) } function h(a) { this.upper = a[0]; this.lower = a[1]; this.set.apply(this, a.slice(2)) }
            function f(a) { var b = a.element; if (b && n(b) && (b = b.getAscendant(a.triggers, !0)) && a.editable.contains(b)) { var e = k(b); if ("true" == e.getAttribute("contenteditable")) return b; if (e.is(a.triggers)) return e } return null } function b(a, b, e) { t(a, b); t(a, e); a = b.size.bottom; e = e.size.top; return a && e ? 0 | (a + e) / 2 : a || e } function d(a, b, e) { return b = b[e ? "getPrevious" : "getNext"](function (b) { return b && b.type == CKEDITOR.NODE_TEXT && !aa(b) || n(b) && !u(b) && !c(a, b) }) } function l(a, b, e) { return a > b && a < e } function k(a, b) {
                if (a.data("cke-editable")) return null;
                for (b || (a = a.getParent()); a && !a.data("cke-editable");) { if (a.hasAttribute("contenteditable")) return a; a = a.getParent() } return null
            } function m(a) {
                var b = a.doc, e = G('\x3cspan contenteditable\x3d"false" data-cke-magic-line\x3d"1" style\x3d"' + fa + "position:absolute;border-top:1px dashed " + a.boxColor + '"\x3e\x3c/span\x3e', b), c = CKEDITOR.getUrl(this.path + "images/" + (H.hidpi ? "hidpi/" : "") + "icon" + (a.rtl ? "-rtl" : "") + ".png"); C(e, {
                    attach: function () { this.wrap.getParent() || this.wrap.appendTo(a.editable, !0); return this },
                    lineChildren: [C(G('\x3cspan title\x3d"' + a.editor.lang.magicline.title + '" contenteditable\x3d"false"\x3e\x26#8629;\x3c/span\x3e', b), { base: fa + "height:17px;width:17px;" + (a.rtl ? "left" : "right") + ":17px;background:url(" + c + ") center no-repeat " + a.boxColor + ";cursor:pointer;" + (H.hc ? "font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;" : "") + (H.hidpi ? "background-size: 9px 10px;" : ""), looks: ["top:-8px; border-radius: 2px;", "top:-17px; border-radius: 2px 2px 0px 0px;", "top:-1px; border-radius: 0px 0px 2px 2px;"] }),
                    C(G(ka, b), { base: ja + "left:0px;border-left-color:" + a.boxColor + ";", looks: ["border-width:8px 0 8px 8px;top:-8px", "border-width:8px 0 0 8px;top:-8px", "border-width:0 0 8px 8px;top:0px"] }), C(G(ka, b), { base: ja + "right:0px;border-right-color:" + a.boxColor + ";", looks: ["border-width:8px 8px 8px 0;top:-8px", "border-width:8px 8px 0 0;top:-8px", "border-width:0 8px 8px 0;top:0px"] })], detach: function () { this.wrap.getParent() && this.wrap.remove(); return this }, mouseNear: function () {
                        t(a, this); var b = a.holdDistance, e = this.size;
                        return e && l(a.mouse.y, e.top - b, e.bottom + b) && l(a.mouse.x, e.left - b, e.right + b) ? !0 : !1
                    }, place: function () {
                        var b = a.view, e = a.editable, c = a.trigger, d = c.upper, g = c.lower, f = d || g, h = f.getParent(), k = {}; this.trigger = c; d && t(a, d, !0); g && t(a, g, !0); t(a, h, !0); a.inInlineMode && y(a, !0); h.equals(e) ? (k.left = b.scroll.x, k.right = -b.scroll.x, k.width = "") : (k.left = f.size.left - f.size.margin.left + b.scroll.x - (a.inInlineMode ? b.editable.left + b.editable.border.left : 0), k.width = f.size.outerWidth + f.size.margin.left + f.size.margin.right + b.scroll.x,
                            k.right = ""); d && g ? k.top = d.size.margin.bottom === g.size.margin.top ? 0 | d.size.bottom + d.size.margin.bottom / 2 : d.size.margin.bottom < g.size.margin.top ? d.size.bottom + d.size.margin.bottom : d.size.bottom + d.size.margin.bottom - g.size.margin.top : d ? g || (k.top = d.size.bottom + d.size.margin.bottom) : k.top = g.size.top - g.size.margin.top; c.is(O) || l(k.top, b.scroll.y - 15, b.scroll.y + 5) ? (k.top = a.inInlineMode ? 0 : b.scroll.y, this.look(O)) : c.is(N) || l(k.top, b.pane.bottom - 5, b.pane.bottom + 15) ? (k.top = a.inInlineMode ? b.editable.height + b.editable.padding.top +
                                b.editable.padding.bottom : b.pane.bottom - 1, this.look(N)) : (a.inInlineMode && (k.top -= b.editable.top + b.editable.border.top), this.look(X)); a.inInlineMode && (k.top--, k.top += b.editable.scroll.top, k.left += b.editable.scroll.left); for (var m in k) k[m] = CKEDITOR.tools.cssLength(k[m]); this.setStyles(k)
                    }, look: function (a) { if (this.oldLook != a) { for (var b = this.lineChildren.length, e; b--;)(e = this.lineChildren[b]).setAttribute("style", e.base + e.looks[0 | a / 2]); this.oldLook = a } }, wrap: new E("span", a.doc)
                }); for (b = e.lineChildren.length; b--;)e.lineChildren[b].appendTo(e);
                e.look(X); e.appendTo(e.wrap); e.unselectable(); e.lineChildren[0].on("mouseup", function (b) { e.detach(); g(a, function (b) { var e = a.line.trigger; b[e.is(I) ? "insertBefore" : "insertAfter"](e.is(I) ? e.lower : e.upper) }, !0); a.editor.focus(); H.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView(); b.data.preventDefault(!0) }); e.on("mousedown", function (a) { a.data.preventDefault(!0) }); a.line = e
            } function g(a, b, e) {
                var c = new CKEDITOR.dom.range(a.doc), d = a.editor, g; H.ie && a.enterMode == CKEDITOR.ENTER_BR ? g = a.doc.createText(T) :
                    (g = (g = k(a.element, !0)) && g.data("cke-enter-mode") || a.enterMode, g = new E(S[g], a.doc), g.is("br") || a.doc.createText(T).appendTo(g)); e && d.fire("saveSnapshot"); b(g); c.moveToPosition(g, CKEDITOR.POSITION_AFTER_START); d.getSelection().selectRanges([c]); a.hotNode = g; e && d.fire("saveSnapshot")
            } function e(a, b) {
                return {
                    canUndo: !0, modes: { wysiwyg: 1 }, exec: function () {
                        function e(c) {
                            var d = H.ie && 9 > H.version ? " " : T, f = a.hotNode && a.hotNode.getText() == d && a.element.equals(a.hotNode) && a.lastCmdDirection === !!b; g(a, function (e) {
                                f &&
                                a.hotNode && a.hotNode.remove(); e[b ? "insertAfter" : "insertBefore"](c); e.setAttributes({ "data-cke-magicline-hot": 1, "data-cke-magicline-dir": !!b }); a.lastCmdDirection = !!b
                            }); H.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView(); a.line.detach()
                        } return function (c) {
                            c = c.getSelection().getStartElement(); var g; c = c.getAscendant(ha, 1); if (!q(a, c) && c && !c.equals(a.editable) && !c.contains(a.editable)) {
                                (g = k(c)) && "false" == g.getAttribute("contenteditable") && (c = g); a.element = c; g = d(a, c, !b); var h; n(g) && g.is(a.triggers) &&
                                    g.is(U) && (!d(a, g, !b) || (h = d(a, g, !b)) && n(h) && h.is(a.triggers)) ? e(g) : (h = f(a, c), n(h) && (d(a, h, !b) ? (c = d(a, h, !b)) && n(c) && c.is(a.triggers) && e(h) : e(h)))
                            }
                        }
                    }()
                }
            } function c(a, b) { if (!b || b.type != CKEDITOR.NODE_ELEMENT || !b.$) return !1; var e = a.line; return e.wrap.equals(b) || e.wrap.contains(b) } function n(a) { return a && a.type == CKEDITOR.NODE_ELEMENT && a.$ } function u(a) { if (!n(a)) return !1; var b; (b = w(a)) || (n(a) ? (b = { left: 1, right: 1, center: 1 }, b = !(!b[a.getComputedStyle("float")] && !b[a.getAttribute("align")])) : b = !1); return b } function w(a) {
                return !!{
                    absolute: 1,
                    fixed: 1
                }[a.getComputedStyle("position")]
            } function p(a, b) { return n(b) ? b.is(a.triggers) : null } function q(a, b) { if (!b) return !1; for (var e = b.getParents(1), c = e.length; c--;)for (var d = a.tabuList.length; d--;)if (e[c].hasAttribute(a.tabuList[d])) return !0; return !1 } function r(a, b, e) { b = b[e ? "getLast" : "getFirst"](function (b) { return a.isRelevant(b) && !b.is(da) }); if (!b) return !1; t(a, b); return e ? b.size.top > a.mouse.y : b.size.bottom < a.mouse.y } function A(a) {
                var b = a.editable, e = a.mouse, d = a.view, g = a.triggerOffset; y(a); var f = e.y >
                    (a.inInlineMode ? d.editable.top + d.editable.height / 2 : Math.min(d.editable.height, d.pane.height) / 2), b = b[f ? "getLast" : "getFirst"](function (a) { return !(aa(a) || ca(a)) }); if (!b) return null; c(a, b) && (b = a.line.wrap[f ? "getPrevious" : "getNext"](function (a) { return !(aa(a) || ca(a)) })); if (!n(b) || u(b) || !p(a, b)) return null; t(a, b); return !f && 0 <= b.size.top && l(e.y, 0, b.size.top + g) ? (a = a.inInlineMode || 0 === d.scroll.y ? O : X, new h([null, b, I, M, a])) : f && b.size.bottom <= d.pane.height && l(e.y, b.size.bottom - g, d.pane.height) ? (a = a.inInlineMode ||
                        l(b.size.bottom, d.pane.height - g, d.pane.height) ? N : X, new h([b, null, F, M, a])) : null
            } function v(a) {
                var b = a.mouse, e = a.view, c = a.triggerOffset, g = f(a); if (!g) return null; t(a, g); var c = Math.min(c, 0 | g.size.outerHeight / 2), k = [], m, q; if (l(b.y, g.size.top - 1, g.size.top + c)) q = !1; else if (l(b.y, g.size.bottom - c, g.size.bottom + 1)) q = !0; else return null; if (u(g) || r(a, g, q) || g.getParent().is(Y)) return null; var z = d(a, g, !q); if (z) {
                    if (z && z.type == CKEDITOR.NODE_TEXT) return null; if (n(z)) {
                        if (u(z) || !p(a, z) || z.getParent().is(Y)) return null;
                        k = [z, g][q ? "reverse" : "concat"]().concat([P, M])
                    }
                } else g.equals(a.editable[q ? "getLast" : "getFirst"](a.isRelevant)) ? (y(a), q && l(b.y, g.size.bottom - c, e.pane.height) && l(g.size.bottom, e.pane.height - c, e.pane.height) ? m = N : l(b.y, 0, g.size.top + c) && (m = O)) : m = X, k = [null, g][q ? "reverse" : "concat"]().concat([q ? F : I, M, m, g.equals(a.editable[q ? "getLast" : "getFirst"](a.isRelevant)) ? q ? N : O : X]); return 0 in k ? new h(k) : null
            } function x(a, b, e, c) {
                for (var d = b.getDocumentPosition(), g = {}, f = {}, h = {}, k = {}, l = Q.length; l--;)g[Q[l]] = parseInt(b.getComputedStyle.call(b,
                    "border-" + Q[l] + "-width"), 10) || 0, h[Q[l]] = parseInt(b.getComputedStyle.call(b, "padding-" + Q[l]), 10) || 0, f[Q[l]] = parseInt(b.getComputedStyle.call(b, "margin-" + Q[l]), 10) || 0; e && !c || z(a, c); k.top = d.y - (e ? 0 : a.view.scroll.y); k.left = d.x - (e ? 0 : a.view.scroll.x); k.outerWidth = b.$.offsetWidth; k.outerHeight = b.$.offsetHeight; k.height = k.outerHeight - (h.top + h.bottom + g.top + g.bottom); k.width = k.outerWidth - (h.left + h.right + g.left + g.right); k.bottom = k.top + k.outerHeight; k.right = k.left + k.outerWidth; a.inInlineMode && (k.scroll = {
                        top: b.$.scrollTop,
                        left: b.$.scrollLeft
                    }); return C({ border: g, padding: h, margin: f, ignoreScroll: e }, k, !0)
            } function t(a, b, e) { if (!n(b)) return b.size = null; if (!b.size) b.size = {}; else if (b.size.ignoreScroll == e && b.size.date > new Date - ia) return null; return C(b.size, x(a, b, e), { date: +new Date }, !0) } function y(a, b) { a.view.editable = x(a, a.editable, b, !0) } function z(a, b) {
                a.view || (a.view = {}); var e = a.view; if (!(!b && e && e.date > new Date - ia)) {
                    var c = a.win, e = c.getScrollPosition(), c = c.getViewPaneSize(); C(a.view, {
                        scroll: {
                            x: e.x, y: e.y, width: a.doc.$.documentElement.scrollWidth -
                                c.width, height: a.doc.$.documentElement.scrollHeight - c.height
                        }, pane: { width: c.width, height: c.height, bottom: c.height + e.y }, date: +new Date
                    }, !0)
                }
            } function B(a, b, e, c) { for (var d = c, g = c, f = 0, k = !1, l = !1, m = a.view.pane.height, n = a.mouse; n.y + f < m && 0 < n.y - f;) { k || (k = b(d, c)); l || (l = b(g, c)); !k && 0 < n.y - f && (d = e(a, { x: n.x, y: n.y - f })); !l && n.y + f < m && (g = e(a, { x: n.x, y: n.y + f })); if (k && l) break; f += 2 } return new h([d, g, null, null]) } CKEDITOR.plugins.add("magicline", {
                init: function (a) {
                    var b = a.config, k = b.magicline_triggerOffset || 30, l = {
                        editor: a,
                        enterMode: b.enterMode, triggerOffset: k, holdDistance: 0 | k * (b.magicline_holdDistance || .5), boxColor: b.magicline_color || "#ff0000", rtl: "rtl" == b.contentsLangDirection, tabuList: ["data-cke-hidden-sel"].concat(b.magicline_tabuList || []), triggers: b.magicline_everywhere ? ha : { table: 1, hr: 1, div: 1, ul: 1, ol: 1, dl: 1, form: 1, blockquote: 1 }
                    }, r, p, t; l.isRelevant = function (a) { return n(a) && !c(l, a) && !u(a) }; a.on("contentDom", function () {
                        var k = a.editable(), n = a.document, u = a.window; C(l, {
                            editable: k, inInlineMode: k.isInline(), doc: n, win: u,
                            hotNode: null
                        }, !0); l.boundary = l.inInlineMode ? l.editable : l.doc.getDocumentElement(); k.is(K.$inline) || (l.inInlineMode && !w(k) && k.setStyles({ position: "relative", top: null, left: null }), m.call(this, l), z(l), k.attachListener(a, "beforeUndoImage", function () { l.line.detach() }), k.attachListener(a, "beforeGetData", function () { l.line.wrap.getParent() && (l.line.detach(), a.once("getData", function () { l.line.attach() }, null, null, 1E3)) }, null, null, 0), k.attachListener(l.inInlineMode ? n : n.getWindow().getFrame(), "mouseout", function (b) {
                            if ("wysiwyg" ==
                                a.mode) if (l.inInlineMode) { var e = b.data.$.clientX; b = b.data.$.clientY; z(l); y(l, !0); var c = l.view.editable, d = l.view.scroll; e > c.left - d.x && e < c.right - d.x && b > c.top - d.y && b < c.bottom - d.y || (clearTimeout(t), t = null, l.line.detach()) } else clearTimeout(t), t = null, l.line.detach()
                        }), k.attachListener(k, "keyup", function () { l.hiddenMode = 0 }), k.attachListener(k, "keydown", function (b) { if ("wysiwyg" == a.mode) switch (b.data.getKeystroke()) { case 2228240: case 16: l.hiddenMode = 1, l.line.detach() } }), k.attachListener(l.inInlineMode ? k : n,
                            "mousemove", function (b) { p = !0; if ("wysiwyg" == a.mode && !a.readOnly && !t) { var e = { x: b.data.$.clientX, y: b.data.$.clientY }; t = setTimeout(function () { l.mouse = e; t = l.trigger = null; z(l); p && !l.hiddenMode && a.focusManager.hasFocus && !l.line.mouseNear() && (l.element = Z(l, !0)) && ((l.trigger = A(l) || v(l) || V(l)) && !q(l, l.trigger.upper || l.trigger.lower) ? l.line.attach().place() : (l.trigger = null, l.line.detach()), p = !1) }, 30) } }), k.attachListener(u, "scroll", function () {
                                "wysiwyg" == a.mode && (l.line.detach(), H.webkit && (l.hiddenMode = 1, clearTimeout(r),
                                    r = setTimeout(function () { l.mouseDown || (l.hiddenMode = 0) }, 50)))
                            }), k.attachListener(L ? n : u, "mousedown", function () { "wysiwyg" == a.mode && (l.line.detach(), l.hiddenMode = 1, l.mouseDown = 1) }), k.attachListener(L ? n : u, "mouseup", function () { l.hiddenMode = 0; l.mouseDown = 0 }), a.addCommand("accessPreviousSpace", e(l)), a.addCommand("accessNextSpace", e(l, !0)), a.setKeystroke([[b.magicline_keystrokePrevious, "accessPreviousSpace"], [b.magicline_keystrokeNext, "accessNextSpace"]]), a.on("loadSnapshot", function () {
                                var b, e, c, d; for (d in {
                                    p: 1,
                                    br: 1, div: 1
                                }) for (b = a.document.getElementsByTag(d), c = b.count(); c--;)if ((e = b.getItem(c)).data("cke-magicline-hot")) { l.hotNode = e; l.lastCmdDirection = "true" === e.data("cke-magicline-dir") ? !0 : !1; return }
                            }), a._.magiclineBackdoor = { accessFocusSpace: g, boxTrigger: h, isLine: c, getAscendantTrigger: f, getNonEmptyNeighbour: d, getSize: x, that: l, triggerEdge: v, triggerEditable: A, triggerExpand: V })
                    }, this)
                }
            }); var C = CKEDITOR.tools.extend, E = CKEDITOR.dom.element, G = E.createFromHtml, H = CKEDITOR.env, L = CKEDITOR.env.ie && 9 > CKEDITOR.env.version,
                K = CKEDITOR.dtd, S = {}, I = 128, F = 64, P = 32, M = 16, O = 4, N = 2, X = 1, T = " ", Y = K.$listItem, da = K.$tableContent, U = C({}, K.$nonEditable, K.$empty), ha = K.$block, ia = 100, fa = "width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;", ja = fa + "border-color:transparent;display:block;border-style:solid;", ka = "\x3cspan\x3e" + T + "\x3c/span\x3e"; S[CKEDITOR.ENTER_BR] = "br"; S[CKEDITOR.ENTER_P] = "p"; S[CKEDITOR.ENTER_DIV] = "div"; h.prototype = {
                    set: function (a, b, e) {
                        this.properties =
                        a + b + (e || X); return this
                    }, is: function (a) { return (this.properties & a) == a }
                }; var Z = function () { function a(b, e) { var c = b.$.elementFromPoint(e.x, e.y); return c && c.nodeType ? new CKEDITOR.dom.element(c) : null } return function (b, e, d) { if (!b.mouse) return null; var g = b.doc, f = b.line.wrap; d = d || b.mouse; var h = a(g, d); e && c(b, h) && (f.hide(), h = a(g, d), f.show()); return !h || h.type != CKEDITOR.NODE_ELEMENT || !h.$ || H.ie && 9 > H.version && !b.boundary.equals(h) && !b.boundary.contains(h) ? null : h } }(), aa = CKEDITOR.dom.walker.whitespaces(), ca = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT),
                    V = function () {
                        function e(c) {
                            var g = c.element, f, h, k; if (!n(g) || g.contains(c.editable) || g.isReadOnly()) return null; k = B(c, function (a, b) { return !b.equals(a) }, function (a, b) { return Z(a, !0, b) }, g); f = k.upper; h = k.lower; if (a(c, f, h)) return k.set(P, 8); if (f && g.contains(f)) for (; !f.getParent().equals(g);)f = f.getParent(); else f = g.getFirst(function (a) { return d(c, a) }); if (h && g.contains(h)) for (; !h.getParent().equals(g);)h = h.getParent(); else h = g.getLast(function (a) { return d(c, a) }); if (!f || !h) return null; t(c, f); t(c, h); if (!l(c.mouse.y,
                                f.size.top, h.size.bottom)) return null; for (var g = Number.MAX_VALUE, m, J, q, r; h && !h.equals(f) && (J = f.getNext(c.isRelevant));)m = Math.abs(b(c, f, J) - c.mouse.y), m < g && (g = m, q = f, r = J), f = J, t(c, f); if (!q || !r || !l(c.mouse.y, q.size.top, r.size.bottom)) return null; k.upper = q; k.lower = r; return k.set(P, 8)
                        } function d(a, b) { return !(b && b.type == CKEDITOR.NODE_TEXT || ca(b) || u(b) || c(a, b) || b.type == CKEDITOR.NODE_ELEMENT && b.$ && b.is("br")) } return function (b) {
                            var c = e(b), d; if (d = c) {
                                d = c.upper; var g = c.lower; d = !d || !g || u(g) || u(d) || g.equals(d) ||
                                    d.equals(g) || g.contains(d) || d.contains(g) ? !1 : p(b, d) && p(b, g) && a(b, d, g) ? !0 : !1
                            } return d ? c : null
                        }
                    }(), Q = ["top", "left", "right", "bottom"]
        })(); CKEDITOR.config.magicline_keystrokePrevious = CKEDITOR.CTRL + CKEDITOR.SHIFT + 51; CKEDITOR.config.magicline_keystrokeNext = CKEDITOR.CTRL + CKEDITOR.SHIFT + 52; (function () {
            function a(a) {
                if (!a || a.type != CKEDITOR.NODE_ELEMENT || "form" != a.getName()) return []; for (var b = [], d = ["style", "className"], g = 0; g < d.length; g++) {
                    var e = a.$.elements.namedItem(d[g]); e && (e = new CKEDITOR.dom.element(e),
                        b.push([e, e.nextSibling]), e.remove())
                } return b
            } function h(a, b) { if (a && a.type == CKEDITOR.NODE_ELEMENT && "form" == a.getName() && 0 < b.length) for (var d = b.length - 1; 0 <= d; d--) { var g = b[d][0], e = b[d][1]; e ? g.insertBefore(e) : g.appendTo(a) } } function f(b, d) { var f = a(b), g = {}, e = b.$; d || (g["class"] = e.className || "", e.className = ""); g.inline = e.style.cssText || ""; d || (e.style.cssText = "position: static; overflow: visible"); h(f); return g } function b(b, d) {
                var f = a(b), g = b.$; "class" in d && (g.className = d["class"]); "inline" in d && (g.style.cssText =
                    d.inline); h(f)
            } function d(a) { if (!a.editable().isInline()) { var b = CKEDITOR.instances, d; for (d in b) { var g = b[d]; "wysiwyg" != g.mode || g.readOnly || (g = g.document.getBody(), g.setAttribute("contentEditable", !1), g.setAttribute("contentEditable", !0)) } a.editable().hasFocus && (a.toolbox.focus(), a.focus()) } } CKEDITOR.plugins.add("maximize", {
                init: function (a) {
                    function h() { var b = e.getViewPaneSize(); a.resize(b.width, b.height, null, !0) } if (a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                        var m = a.lang, g = CKEDITOR.document, e = g.getWindow(),
                        c, n, u, w = CKEDITOR.TRISTATE_OFF; a.addCommand("maximize", {
                            modes: { wysiwyg: !CKEDITOR.env.iOS, source: !CKEDITOR.env.iOS }, readOnly: 1, editorFocus: !1, exec: function () {
                                var p = a.container.getFirst(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner") }), q = a.ui.space("contents"); if ("wysiwyg" == a.mode) { var r = a.getSelection(); c = r && r.getRanges(); n = e.getScrollPosition() } else { var A = a.editable().$; c = !CKEDITOR.env.ie && [A.selectionStart, A.selectionEnd]; n = [A.scrollLeft, A.scrollTop] } if (this.state == CKEDITOR.TRISTATE_OFF) {
                                    e.on("resize",
                                        h); u = e.getScrollPosition(); for (r = a.container; r = r.getParent();)r.setCustomData("maximize_saved_styles", f(r)), r.setStyle("z-index", a.config.baseFloatZIndex - 5); q.setCustomData("maximize_saved_styles", f(q, !0)); p.setCustomData("maximize_saved_styles", f(p, !0)); q = { overflow: CKEDITOR.env.webkit ? "" : "hidden", width: 0, height: 0 }; g.getDocumentElement().setStyles(q); !CKEDITOR.env.gecko && g.getDocumentElement().setStyle("position", "fixed"); CKEDITOR.env.gecko && CKEDITOR.env.quirks || g.getBody().setStyles(q); CKEDITOR.env.ie ?
                                            setTimeout(function () { e.$.scrollTo(0, 0) }, 0) : e.$.scrollTo(0, 0); p.setStyle("position", CKEDITOR.env.gecko && CKEDITOR.env.quirks ? "fixed" : "absolute"); p.$.offsetLeft; p.setStyles({ "z-index": a.config.baseFloatZIndex - 5, left: "0px", top: "0px" }); p.addClass("cke_maximized"); h(); q = p.getDocumentPosition(); p.setStyles({ left: -1 * q.x + "px", top: -1 * q.y + "px" }); CKEDITOR.env.gecko && d(a)
                                } else if (this.state == CKEDITOR.TRISTATE_ON) {
                                    e.removeListener("resize", h); for (var r = [q, p], v = 0; v < r.length; v++)b(r[v], r[v].getCustomData("maximize_saved_styles")),
                                        r[v].removeCustomData("maximize_saved_styles"); for (r = a.container; r = r.getParent();)b(r, r.getCustomData("maximize_saved_styles")), r.removeCustomData("maximize_saved_styles"); CKEDITOR.env.ie ? setTimeout(function () { e.$.scrollTo(u.x, u.y) }, 0) : e.$.scrollTo(u.x, u.y); p.removeClass("cke_maximized"); CKEDITOR.env.webkit && (p.setStyle("display", "inline"), setTimeout(function () { p.setStyle("display", "block") }, 0)); a.fire("resize", { outerHeight: a.container.$.offsetHeight, contentsHeight: q.$.offsetHeight, outerWidth: a.container.$.offsetWidth })
                                } this.toggleState();
                                if (r = this.uiItems[0]) q = this.state == CKEDITOR.TRISTATE_OFF ? m.maximize.maximize : m.maximize.minimize, r = CKEDITOR.document.getById(r._.id), r.getChild(1).setHtml(q), r.setAttribute("title", q), r.setAttribute("href", 'javascript:void("' + q + '");'); "wysiwyg" == a.mode ? c ? (CKEDITOR.env.gecko && d(a), a.getSelection().selectRanges(c), (A = a.getSelection().getStartElement()) && A.scrollIntoView(!0)) : e.$.scrollTo(n.x, n.y) : (c && (A.selectionStart = c[0], A.selectionEnd = c[1]), A.scrollLeft = n[0], A.scrollTop = n[1]); c = n = null; w = this.state;
                                a.fire("maximize", this.state)
                            }, canUndo: !1
                        }); a.ui.addButton && a.ui.addButton("Maximize", { label: m.maximize.maximize, command: "maximize", toolbar: "tools,10" }); a.on("mode", function () { var b = a.getCommand("maximize"); b.setState(b.state == CKEDITOR.TRISTATE_DISABLED ? CKEDITOR.TRISTATE_DISABLED : w) }, null, null, 100); if (a.config.maximize_historyIntegration) e.on(a.config.maximize_historyIntegration === CKEDITOR.HISTORY_NATIVE ? "popstate" : "hashchange", function () {
                            var b = a.getCommand("maximize"); b.state === CKEDITOR.TRISTATE_ON &&
                                b.exec()
                        })
                    }
                }
            }); CKEDITOR.config.maximize_historyIntegration = CKEDITOR.HISTORY_NATIVE
        })(); CKEDITOR.plugins.add("newpage", { init: function (a) { a.addCommand("newpage", { modes: { wysiwyg: 1, source: 1 }, exec: function (a) { var f = this; a.setData(a.config.newpage_html || "", function () { a.focus(); setTimeout(function () { a.fire("afterCommandExec", { name: "newpage", command: f }); a.selectionChange() }, 200) }) }, async: !0 }); a.ui.addButton && a.ui.addButton("NewPage", { label: a.lang.newpage.toolbar, command: "newpage", toolbar: "document,20" }) } });
        "use strict"; (function () {
            function a(a) { return { "aria-label": a, "class": "cke_pagebreak", contenteditable: "false", "data-cke-display-name": "pagebreak", "data-cke-pagebreak": 1, style: "page-break-after: always", title: a } } CKEDITOR.plugins.add("pagebreak", {
                requires: "fakeobjects", onLoad: function () {
                    var a = ("background:url(" + CKEDITOR.getUrl(this.path + "images/pagebreak.gif") + ") no-repeat center center;clear:both;width:100%;border-top:#999 1px dotted;border-bottom:#999 1px dotted;padding:0;height:7px;cursor:default;").replace(/;/g,
                        " !important;"); CKEDITOR.addCss("div.cke_pagebreak{" + a + "}")
                }, init: function (a) { a.blockless || (a.addCommand("pagebreak", CKEDITOR.plugins.pagebreakCmd), a.ui.addButton && a.ui.addButton("PageBreak", { label: a.lang.pagebreak.toolbar, command: "pagebreak", toolbar: "insert,70" }), CKEDITOR.env.webkit && a.on("contentDom", function () { a.document.on("click", function (f) { f = f.data.getTarget(); f.is("div") && f.hasClass("cke_pagebreak") && a.getSelection().selectElement(f) }) })) }, afterInit: function (h) {
                    function f(b) {
                        CKEDITOR.tools.extend(b.attributes,
                            a(h.lang.pagebreak.alt), !0); b.children.length = 0
                    } var b = h.dataProcessor, d = b && b.dataFilter, b = b && b.htmlFilter, l = /page-break-after\s*:\s*always/i, k = /display\s*:\s*none/i; b && b.addRules({ attributes: { "class": function (a, b) { var e = a.replace("cke_pagebreak", ""); if (e != a) { var c = CKEDITOR.htmlParser.fragment.fromHtml('\x3cspan style\x3d"display: none;"\x3e\x26nbsp;\x3c/span\x3e').children[0]; b.children.length = 0; b.add(c); c = b.attributes; delete c["aria-label"]; delete c.contenteditable; delete c.title } return e } } }, {
                        applyToAll: !0,
                        priority: 5
                    }); d && d.addRules({ elements: { div: function (a) { if (a.attributes["data-cke-pagebreak"]) f(a); else if (l.test(a.attributes.style)) { var b = a.children[0]; b && "span" == b.name && k.test(b.attributes.style) && f(a) } } } })
                }
            }); CKEDITOR.plugins.pagebreakCmd = {
                exec: function (a) { a.insertElement(CKEDITOR.plugins.pagebreak.createElement(a)) }, context: "div", allowedContent: { div: { styles: "!page-break-after" }, span: { match: function (a) { return (a = a.parent) && "div" == a.name && a.styles && a.styles["page-break-after"] }, styles: "display" } },
                requiredContent: "div{page-break-after}"
            }; CKEDITOR.plugins.pagebreak = { createElement: function (h) { return h.document.createElement("div", { attributes: a(h.lang.pagebreak.alt) }) } }
        })(); (function () {
            CKEDITOR.plugins.add("xml", {}); CKEDITOR.xml = function (a) {
                var h = null; if ("object" == typeof a) h = a; else if (a = (a || "").replace(/&nbsp;/g, " "), "ActiveXObject" in window) {
                    try { h = new ActiveXObject("MSXML2.DOMDocument") } catch (f) { try { h = new ActiveXObject("Microsoft.XmlDom") } catch (b) { } } h && (h.async = !1, h.resolveExternals = !1, h.validateOnParse =
                        !1, h.loadXML(a))
                } else window.DOMParser && (h = (new DOMParser).parseFromString(a, "text/xml")); this.baseXml = h
            }; CKEDITOR.xml.prototype = {
                selectSingleNode: function (a, h) { var f = this.baseXml; if (h || (h = f)) { if ("selectSingleNode" in h) return h.selectSingleNode(a); if (f.evaluate) return (f = f.evaluate(a, h, null, 9, null)) && f.singleNodeValue || null } return null }, selectNodes: function (a, h) {
                    var f = this.baseXml, b = []; if (h || (h = f)) {
                        if ("selectNodes" in h) return h.selectNodes(a); if (f.evaluate && (f = f.evaluate(a, h, null, 5, null))) for (var d; d =
                            f.iterateNext();)b.push(d)
                    } return b
                }, getInnerXml: function (a, h) { var f = this.selectSingleNode(a, h), b = []; if (f) for (f = f.firstChild; f;)f.xml ? b.push(f.xml) : window.XMLSerializer && b.push((new XMLSerializer).serializeToString(f)), f = f.nextSibling; return b.length ? b.join("") : null }
            }
        })(); (function () {
            CKEDITOR.plugins.add("ajax", { requires: "xml" }); CKEDITOR.ajax = function () {
                function a() { if (!CKEDITOR.env.ie || "file:" != location.protocol) try { return new XMLHttpRequest } catch (a) { } try { return new ActiveXObject("Msxml2.XMLHTTP") } catch (b) { } try { return new ActiveXObject("Microsoft.XMLHTTP") } catch (f) { } return null }
                function h(a, b) { if (4 != a.readyState || !(200 <= a.status && 300 > a.status || 304 == a.status || 0 === a.status || 1223 == a.status)) return null; switch (b) { case "text": return a.responseText; case "xml": var f = a.responseXML; return new CKEDITOR.xml(f && f.firstChild ? f : a.responseText); case "arraybuffer": return a.response; default: return null } } function f(b, f, k) {
                    var m = !!f, g = a(); if (!g) return null; m && "text" !== k && "xml" !== k && (g.responseType = k); g.open("GET", b, m); m && (g.onreadystatechange = function () { 4 == g.readyState && (f(h(g, k)), g = null) });
                    g.send(null); return m ? "" : h(g, k)
                } function b(b, f, k, m, g) { var e = a(); if (!e) return null; e.open("POST", b, !0); e.onreadystatechange = function () { 4 == e.readyState && (m && m(h(e, g)), e = null) }; e.setRequestHeader("Content-type", k || "application/x-www-form-urlencoded; charset\x3dUTF-8"); e.send(f) } return {
                    load: function (a, b, h) { return f(a, b, h || "text") }, post: function (a, f, h, m) { return b(a, f, h, m, "text") }, loadXml: function (a, b) { return f(a, b, "xml") }, loadText: function (a, b) { return f(a, b, "text") }, loadBinary: function (a, b) {
                        return f(a,
                            b, "arraybuffer")
                    }
                }
            }()
        })(); (function () {
            function a(a, b) { return CKEDITOR.tools.array.filter(a, function (a) { return a.canHandle(b) }).sort(function (a, b) { return a.priority === b.priority ? 0 : a.priority - b.priority }) } function h(a, b) { var d = a.shift(); d && d.handle(b, function () { h(a, b) }) } function f(a) {
                var b = CKEDITOR.tools.array.reduce(a, function (a, b) { return CKEDITOR.tools.array.isArray(b.filters) ? a.concat(b.filters) : a }, []); return CKEDITOR.tools.array.filter(b, function (a, e) {
                    return CKEDITOR.tools.array.indexOf(b, a) ===
                        e
                })
            } function b(a, b) { var g = 0, e, c; if (!CKEDITOR.tools.array.isArray(a) || 0 === a.length) return !0; e = CKEDITOR.tools.array.filter(a, function (a) { return -1 === CKEDITOR.tools.array.indexOf(d, a) }); if (0 < e.length) for (c = 0; c < e.length; c++)(function (a) { CKEDITOR.scriptLoader.queue(a, function (c) { c && d.push(a); ++g === e.length && b() }) })(e[c]); return 0 === e.length } var d = [], l = CKEDITOR.tools.createClass({
                $: function () { this.handlers = [] }, proto: {
                    register: function (a) { "number" !== typeof a.priority && (a.priority = 10); this.handlers.push(a) },
                    addPasteListener: function (d) { d.on("paste", function (l) { var g = a(this.handlers, l), e; if (0 !== g.length) { e = f(g); e = b(e, function () { return d.fire("paste", l.data) }); if (!e) return l.cancel(); h(g, l) } }, this, null, 3) }
                }
            }); CKEDITOR.plugins.add("pastetools", { requires: ["clipboard", "ajax"], beforeInit: function (a) { a.pasteTools = new l; a.pasteTools.addPasteListener(a) } }); CKEDITOR.plugins.pastetools = {
                filters: {}, loadFilters: b, createFilter: function (a) {
                    var b = CKEDITOR.tools.array.isArray(a.rules) ? a.rules : [a.rules], d = a.additionalTransforms;
                    return function (a, c) { var f = new CKEDITOR.htmlParser.basicWriter, h = new CKEDITOR.htmlParser.filter, k; d && (a = d(a, c)); CKEDITOR.tools.array.forEach(b, function (b) { h.addRules(b(a, c, h)) }); k = CKEDITOR.htmlParser.fragment.fromHtml(a); h.applyTo(k); k.writeHtml(f); return f.getHtml() }
                }, getClipboardData: function (a, b) { var d; return CKEDITOR.plugins.clipboard.isCustomDataTypesSupported || "text/html" === b ? (d = a.dataTransfer.getData(b, !0)) || "text/html" !== b ? d : a.dataValue : null }, getConfigValue: function (a, b) {
                    if (a && a.config) {
                        var d =
                            CKEDITOR.tools, e = a.config, c = d.object.keys(e), f = ["pasteTools_" + b, "pasteFromWord_" + b, "pasteFromWord" + d.capitalize(b, !0)], f = d.array.find(f, function (a) { return -1 !== d.array.indexOf(c, a) }); return e[f]
                    }
                }, getContentGeneratorName: function (a) { if ((a = /<meta\s+name=["']?generator["']?\s+content=["']?(\w+)/gi.exec(a)) && a.length) return a = a[1].toLowerCase(), 0 === a.indexOf("microsoft") ? "microsoft" : 0 === a.indexOf("libreoffice") ? "libreoffice" : "unknown" }
            }; CKEDITOR.pasteFilters = CKEDITOR.plugins.pastetools.filters
        })(); (function () {
            CKEDITOR.plugins.add("pastefromgdocs",
                {
                    requires: "pastetools", init: function (a) {
                        var h = CKEDITOR.plugins.getPath("pastetools"), f = this.path; a.pasteTools.register({
                            filters: [CKEDITOR.getUrl(h + "filter/common.js"), CKEDITOR.getUrl(f + "filter/default.js")], canHandle: function (a) { return /id=(\"|\')?docs\-internal\-guid\-/.test(a.data.dataValue) }, handle: function (b, d) {
                                var f = b.data, h = CKEDITOR.plugins.pastetools.getClipboardData(f, "text/html"); f.dontFilter = !0; f.dataValue = CKEDITOR.pasteFilters.gdocs(h, a); !0 === a.config.forcePasteAsPlainText && (f.type = "text");
                                d()
                            }
                        })
                    }
                })
        })(); (function () {
            CKEDITOR.plugins.add("pastefromlibreoffice", {
                requires: "pastetools", isSupportedEnvironment: function () { var a = CKEDITOR.env.ie && 11 >= CKEDITOR.env.version; return !(CKEDITOR.env.webkit && !CKEDITOR.env.chrome) && !a }, init: function (a) {
                    if (this.isSupportedEnvironment()) {
                        var h = CKEDITOR.plugins.getPath("pastetools"), f = this.path; a.pasteTools.register({
                            priority: 100, filters: [CKEDITOR.getUrl(h + "filter/common.js"), CKEDITOR.getUrl(h + "filter/image.js"), CKEDITOR.getUrl(f + "filter/default.js")], canHandle: function (a) {
                                a =
                                a.data; return (a = a.dataTransfer.getData("text/html", !0) || a.dataValue) ? "libreoffice" === CKEDITOR.plugins.pastetools.getContentGeneratorName(a) : !1
                            }, handle: function (b, d) { var f = b.data, h = f.dataValue || CKEDITOR.plugins.pastetools.getClipboardData(f, "text/html"); f.dontFilter = !0; h = CKEDITOR.pasteFilters.image(h, a, CKEDITOR.plugins.pastetools.getClipboardData(f, "text/rtf")); f.dataValue = CKEDITOR.pasteFilters.libreoffice(h, a); !0 === a.config.forcePasteAsPlainText && (f.type = "text"); d() }
                        })
                    }
                }
            })
        })(); (function () {
            CKEDITOR.plugins.add("pastefromword",
                {
                    requires: "pastetools", init: function (a) {
                        var h = 0, f = CKEDITOR.plugins.getPath("pastetools"), b = this.path, d = void 0 === a.config.pasteFromWord_inlineImages ? !0 : a.config.pasteFromWord_inlineImages, f = [CKEDITOR.getUrl(f + "filter/common.js"), CKEDITOR.getUrl(f + "filter/image.js"), CKEDITOR.getUrl(b + "filter/default.js")]; a.addCommand("pastefromword", { canUndo: !1, async: !0, exec: function (a, b) { h = 1; a.execCommand("paste", { type: "html", notification: b && "undefined" !== typeof b.notification ? b.notification : !0 }) } }); CKEDITOR.plugins.clipboard.addPasteButton(a,
                            "PasteFromWord", { label: a.lang.pastefromword.toolbar, command: "pastefromword", toolbar: "clipboard,50" }); a.pasteTools.register({
                                filters: a.config.pasteFromWordCleanupFile ? [a.config.pasteFromWordCleanupFile] : f, canHandle: function (a) { a = CKEDITOR.plugins.pastetools.getClipboardData(a.data, "text/html"); var b = CKEDITOR.plugins.pastetools.getContentGeneratorName(a), d = /(class="?Mso|style=["'][^"]*?\bmso\-|w:WordDocument|<o:\w+>|<\/font>)/, b = b ? "microsoft" === b : d.test(a); return a && (h || b) }, handle: function (b, f) {
                                    var m =
                                        b.data, g = CKEDITOR.plugins.pastetools.getClipboardData(m, "text/html"), e = CKEDITOR.plugins.pastetools.getClipboardData(m, "text/rtf"), g = { dataValue: g, dataTransfer: { "text/rtf": e } }; if (!1 !== a.fire("pasteFromWord", g) || h) {
                                            m.dontFilter = !0; if (h || !a.config.pasteFromWordPromptCleanup || confirm(a.lang.pastefromword.confirmCleanup)) g.dataValue = CKEDITOR.cleanWord(g.dataValue, a), CKEDITOR.plugins.clipboard.isCustomDataTypesSupported && d && CKEDITOR.pasteFilters.image && (g.dataValue = CKEDITOR.pasteFilters.image(g.dataValue,
                                                a, e)), a.fire("afterPasteFromWord", g), m.dataValue = g.dataValue, !0 === a.config.forcePasteAsPlainText ? m.type = "text" : CKEDITOR.plugins.clipboard.isCustomCopyCutSupported || "allow-word" !== a.config.forcePasteAsPlainText || (m.type = "html"); h = 0; f()
                                        }
                                }
                            })
                    }
                })
        })(); (function () {
            var a = {
                canUndo: !1, async: !0, exec: function (a, f) {
                    var b = a.lang, d = CKEDITOR.tools.keystrokeToString(b.common.keyboard, a.getCommandKeystroke(CKEDITOR.env.ie ? a.commands.paste : this)), l = f && "undefined" !== typeof f.notification ? f.notification : !f || !f.from ||
                        "keystrokeHandler" === f.from && CKEDITOR.env.ie, b = l && "string" === typeof l ? l : b.pastetext.pasteNotification.replace(/%1/, '\x3ckbd aria-label\x3d"' + d.aria + '"\x3e' + d.display + "\x3c/kbd\x3e"); a.execCommand("paste", { type: "text", notification: l ? b : !1 })
                }
            }; CKEDITOR.plugins.add("pastetext", {
                requires: "clipboard", init: function (h) {
                    var f = CKEDITOR.env.safari ? CKEDITOR.CTRL + CKEDITOR.ALT + CKEDITOR.SHIFT + 86 : CKEDITOR.CTRL + CKEDITOR.SHIFT + 86; h.addCommand("pastetext", a); h.setKeystroke(f, "pastetext"); CKEDITOR.plugins.clipboard.addPasteButton(h,
                        "PasteText", { label: h.lang.pastetext.button, command: "pastetext", toolbar: "clipboard,40" }); if (h.config.forcePasteAsPlainText) h.on("beforePaste", function (a) { "html" != a.data.type && (a.data.type = "text") }); h.on("pasteState", function (a) { h.getCommand("pastetext").setState(a.data) })
                }
            })
        })(); (function () {
            function a(a, d) {
                var f = CKEDITOR.plugins.getPath("preview"), h = a.config, m = a.title, g = function () {
                    var a = location.origin, b = location.pathname; if (!h.baseHref && !CKEDITOR.env.gecko) return ""; if (h.baseHref) return '\x3cbase href\x3d"{HREF}"\x3e'.replace("{HREF}",
                        h.baseHref); b = b.split("/"); b.pop(); b = b.join("/"); return '\x3cbase href\x3d"{HREF}"\x3e'.replace("{HREF}", a + b + "/")
                }(); return h.fullPage ? a.getData().replace(/<head>/, "$\x26" + g).replace(/[^>]*(?=<\/title>)/, "$\x26 \x26mdash; " + m) : h.docType + '\x3chtml dir\x3d"' + h.contentsLangDirection + '"\x3e\x3chead\x3e' + g + "\x3ctitle\x3e" + m + "\x3c/title\x3e" + CKEDITOR.tools.buildStyleHtml(h.contentsCss) + '\x3clink rel\x3d"stylesheet" media\x3d"screen" href\x3d"' + f + 'styles/screen.css"\x3e\x3c/head\x3e' + function () {
                    var e = "\x3cbody\x3e",
                    c = a.document && a.document.getBody(); if (!c) return e; c.getAttribute("id") && (e = e.replace("\x3e", ' id\x3d"' + c.getAttribute("id") + '"\x3e')); c.getAttribute("class") && (e = e.replace("\x3e", ' class\x3d"' + c.getAttribute("class") + '"\x3e')); return e
                }() + a.getData() + (d ? "\x3cscript\x3e" + (CKEDITOR.env.ie ? "window.onload" : "document.onreadystatechange") + " \x3d function() { previewCallback(); } \x3c/script\x3e" : "") + "\x3c/body\x3e\x3c/html\x3e"
            } function h() {
                var a = window.screen; return {
                    width: Math.round(.8 * a.width), height: Math.round(.7 *
                        a.height), left: Math.round(.1 * a.width)
                }
            } function f() { var a = CKEDITOR.plugins.getPath("preview"); return CKEDITOR.env.gecko ? CKEDITOR.getUrl(a + "preview.html") : "" } CKEDITOR.plugins.add("preview", { init: function (a) { a.addCommand("preview", { modes: { wysiwyg: 1 }, canUndo: !1, readOnly: 1, exec: function () { CKEDITOR.plugins.preview.createPreview(a) } }); a.ui.addButton && a.ui.addButton("Preview", { label: a.lang.preview.preview, command: "preview", toolbar: "document,40" }) } }); CKEDITOR.plugins.preview = {
                createPreview: function (b, d) {
                    var l =
                        { dataValue: a(b, d) }, k = h(), m; m = CKEDITOR.env.ie || CKEDITOR.env.gecko ? "javascript:void( (function(){document.open();" + ("(" + CKEDITOR.tools.fixDomain + ")();").replace(/\/\/.*?\n/g, "").replace(/parent\./g, "window.opener.") + "document.write( window.opener._cke_htmlToLoad );document.close();window.opener._cke_htmlToLoad \x3d null;})() )" : null; var g = f(), e, c; if (!1 === b.fire("contentPreview", l)) return !1; if (m || g) window._cke_htmlToLoad = l.dataValue; e = window.open(g, null, ["toolbar\x3dyes,location\x3dno,status\x3dyes,menubar\x3dyes,scrollbars\x3dyes,resizable\x3dyes",
                            "width\x3d" + k.width, "height\x3d" + k.height, "left\x3d" + k.left].join()); c = new CKEDITOR.dom.window(e); m && e && (e.location = m); window._cke_htmlToLoad || (k = e.document, k.open(), k.write(l.dataValue), k.close()); d && (e.previewCallback = function () { "complete" === e.document.readyState && d(c) }, e.previewCallback()); return c
                }
            }
        })(); (function () {
            CKEDITOR.plugins.add("print", {
                requires: "preview", init: function (a) {
                    a.addCommand("print", CKEDITOR.plugins.print); a.ui.addButton && a.ui.addButton("Print", {
                        label: a.lang.print.toolbar, command: "print",
                        toolbar: "document,50"
                    })
                }
            }); CKEDITOR.plugins.print = { exec: function (a) { CKEDITOR.plugins.preview.createPreview(a, function (a) { a = a.$; CKEDITOR.env.gecko ? a.print() : a.document.execCommand("Print"); a.close() }) }, canUndo: !1, readOnly: 1, modes: { wysiwyg: 1 } }
        })(); CKEDITOR.plugins.add("removeformat", { init: function (a) { a.addCommand("removeFormat", CKEDITOR.plugins.removeformat.commands.removeformat); a.ui.addButton && a.ui.addButton("RemoveFormat", { label: a.lang.removeformat.toolbar, command: "removeFormat", toolbar: "cleanup,10" }) } });
        CKEDITOR.plugins.removeformat = {
            commands: {
                removeformat: {
                    exec: function (a) {
                        for (var h = a._.removeFormatRegex || (a._.removeFormatRegex = new RegExp("^(?:" + a.config.removeFormatTags.replace(/,/g, "|") + ")$", "i")), f = a._.removeAttributes || (a._.removeAttributes = a.config.removeFormatAttributes.split(",")), b = CKEDITOR.plugins.removeformat.filter, d = a.getSelection().getRanges(), l = d.createIterator(), k = function (a) { return a.type == CKEDITOR.NODE_ELEMENT }, m; m = l.getNextRange();) {
                            m.enlarge(CKEDITOR.ENLARGE_INLINE); var g = m.createBookmark(),
                                e = g.startNode, c = g.endNode, n = function (e) { for (var c = a.elementPath(e), d = c.elements, g = 1, f; (f = d[g]) && !f.equals(c.block) && !f.equals(c.blockLimit); g++)h.test(f.getName()) && b(a, f) && e.breakParent(f) }; n(e); if (c) for (n(c), e = e.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT); e && !e.equals(c);)if (e.isReadOnly()) { if (e.getPosition(c) & CKEDITOR.POSITION_CONTAINS) break; e = e.getNext(k) } else n = e.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT), "img" == e.getName() && e.data("cke-realelement") || !b(a, e) || (h.test(e.getName()) ? e.remove(1) :
                                    (e.removeAttributes(f), a.fire("removeFormatCleanup", e))), e = n; m.moveToBookmark(g)
                        } a.forceNextSelectionCheck(); a.getSelection().selectRanges(d)
                    }
                }
            }, filter: function (a, h) { for (var f = a._.removeFormatFilters || [], b = 0; b < f.length; b++)if (!1 === f[b](h)) return !1; return !0 }
        }; CKEDITOR.editor.prototype.addRemoveFormatFilter = function (a) { this._.removeFormatFilters || (this._.removeFormatFilters = []); this._.removeFormatFilters.push(a) }; CKEDITOR.config.removeFormatTags = "b,big,cite,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var";
        CKEDITOR.config.removeFormatAttributes = "class,style,lang,width,height,align,hspace,valign"; CKEDITOR.plugins.add("resize", {
            init: function (a) {
                function h(d) { var f = g.width, h = g.height, k = f + (d.data.$.screenX - m.x) * ("rtl" == l ? -1 : 1); d = h + (d.data.$.screenY - m.y); e && (f = Math.max(b.resize_minWidth, Math.min(k, b.resize_maxWidth))); c && (h = Math.max(b.resize_minHeight, Math.min(d, b.resize_maxHeight))); a.resize(e ? f : null, h) } function f() {
                    CKEDITOR.document.removeListener("mousemove", h); CKEDITOR.document.removeListener("mouseup",
                        f); a.document && (a.document.removeListener("mousemove", h), a.document.removeListener("mouseup", f))
                } var b = a.config, d = a.ui.spaceId("resizer"), l = a.element ? a.element.getDirection(1) : "ltr"; !b.resize_dir && (b.resize_dir = "vertical"); void 0 === b.resize_maxWidth && (b.resize_maxWidth = 3E3); void 0 === b.resize_maxHeight && (b.resize_maxHeight = 3E3); void 0 === b.resize_minWidth && (b.resize_minWidth = 750); void 0 === b.resize_minHeight && (b.resize_minHeight = 250); if (!1 !== b.resize_enabled) {
                    var k = null, m, g, e = ("both" == b.resize_dir ||
                        "horizontal" == b.resize_dir) && b.resize_minWidth != b.resize_maxWidth, c = ("both" == b.resize_dir || "vertical" == b.resize_dir) && b.resize_minHeight != b.resize_maxHeight, n = CKEDITOR.tools.addFunction(function (e) {
                            k || (k = a.getResizable()); g = { width: k.$.offsetWidth || 0, height: k.$.offsetHeight || 0 }; m = { x: e.screenX, y: e.screenY }; b.resize_minWidth > g.width && (b.resize_minWidth = g.width); b.resize_minHeight > g.height && (b.resize_minHeight = g.height); CKEDITOR.document.on("mousemove", h); CKEDITOR.document.on("mouseup", f); a.document &&
                                (a.document.on("mousemove", h), a.document.on("mouseup", f)); e.preventDefault && e.preventDefault()
                        }); a.on("destroy", function () { CKEDITOR.tools.removeFunction(n) }); a.on("uiSpace", function (b) {
                            if ("bottom" == b.data.space) {
                                var g = ""; e && !c && (g = " cke_resizer_horizontal"); !e && c && (g = " cke_resizer_vertical"); var f = '\x3cspan id\x3d"' + d + '" class\x3d"cke_resizer' + g + " cke_resizer_" + l + '" title\x3d"' + CKEDITOR.tools.htmlEncode(a.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + n + ', event)"\x3e' + ("ltr" ==
                                    l ? "◢" : "◣") + "\x3c/span\x3e"; "ltr" == l && "ltr" == g ? b.data.html += f : b.data.html = f + b.data.html
                            }
                        }, a, null, 100); a.on("maximize", function (b) { a.ui.space("resizer")[b.data == CKEDITOR.TRISTATE_ON ? "hide" : "show"]() })
                }
            }
        }); (function () {
            var a = { readOnly: 1, modes: { wysiwyg: 1, source: 1 }, exec: function (a) { if (a.fire("save") && (a = a.element.$.form)) try { a.submit() } catch (f) { a.submit.click && a.submit.click() } } }; CKEDITOR.plugins.add("save", {
                init: function (h) {
                    h.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (h.addCommand("save", a).startDisabled =
                        !h.element.$.form, h.ui.addButton && h.ui.addButton("Save", { label: h.lang.save.toolbar, command: "save", toolbar: "document,10" }))
                }
            })
        })(); "use strict"; CKEDITOR.plugins.add("scayt", {
            requires: "menubutton,dialog", tabToOpen: null, dialogName: "scaytDialog", onLoad: function (a) {
                "moono-lisa" == (CKEDITOR.skinName || a.config.skin) && CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(this.path + "skins/" + CKEDITOR.skin.name + "/scayt.css")); CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(this.path + "dialogs/dialog.css")); var h =
                    !1; CKEDITOR.on("instanceLoaded", function (a) { if (!h && CKEDITOR.plugins.autocomplete) { h = !0; var b = CKEDITOR.plugins.autocomplete.prototype.getModel; CKEDITOR.plugins.autocomplete.prototype.getModel = function (a) { var f = this.editor; a = b.bind(this)(a); a.on("change-isActive", function (a) { a.data ? f.fire("autocompletePanelShow") : f.fire("autocompletePanelHide") }); return a } } })
            }, init: function (a) {
                var h = this, f = CKEDITOR.plugins.scayt; this.bindEvents(a); this.parseConfig(a); this.addRule(a); CKEDITOR.dialog.add(this.dialogName,
                    CKEDITOR.getUrl(this.path + "dialogs/options.js")); this.addMenuItems(a); var b = a.lang.scayt, d = CKEDITOR.env; a.ui.add("Scayt", CKEDITOR.UI_MENUBUTTON, {
                        label: b.text_title, title: a.plugins.wsc ? a.lang.wsc.title : b.text_title, modes: { wysiwyg: !(d.ie && (8 > d.version || d.quirks)) }, toolbar: "spellchecker,20", refresh: function () { var b = a.ui.instances.Scayt.getState(); a.scayt && (b = f.state.scayt[a.name] ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF); a.fire("scaytButtonState", b) }, onRender: function () {
                            var b = this; a.on("scaytButtonState",
                                function (a) { void 0 !== typeof a.data && b.setState(a.data) })
                        }, onMenu: function () {
                            var b = a.scayt; a.getMenuItem("scaytToggle").label = a.lang.scayt[b && f.state.scayt[a.name] ? "btn_disable" : "btn_enable"]; var d = {
                                scaytToggle: CKEDITOR.TRISTATE_OFF, scaytOptions: b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytLangs: b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytDict: b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytAbout: b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, WSC: a.plugins.wsc ? CKEDITOR.TRISTATE_OFF :
                                    CKEDITOR.TRISTATE_DISABLED
                            }; a.config.scayt_uiTabs[0] || delete d.scaytOptions; a.config.scayt_uiTabs[1] || delete d.scaytLangs; a.config.scayt_uiTabs[2] || delete d.scaytDict; b && !CKEDITOR.plugins.scayt.isNewUdSupported(b) && (delete d.scaytDict, a.config.scayt_uiTabs[2] = 0, CKEDITOR.plugins.scayt.alarmCompatibilityMessage()); return d
                        }
                    }); a.contextMenu && a.addMenuItems && (a.contextMenu.addListener(function (b, d) {
                        var f = a.scayt, g, e; f && (e = f.getSelectionNode()) && (g = h.menuGenerator(a, e), f.showBanner("." + a.contextMenu._.definition.panel.className.split(" ").join(" .")));
                        return g
                    }), a.contextMenu._.onHide = CKEDITOR.tools.override(a.contextMenu._.onHide, function (b) { return function () { var d = a.scayt; d && d.hideBanner(); return b.apply(this) } }))
            }, addMenuItems: function (a) {
                var h = this, f = CKEDITOR.plugins.scayt; a.addMenuGroup("scaytButton"); for (var b = a.config.scayt_contextMenuItemsOrder.split("|"), d = 0; d < b.length; d++)b[d] = "scayt_" + b[d]; if ((b = ["grayt_description", "grayt_suggest", "grayt_control"].concat(b)) && b.length) for (d = 0; d < b.length; d++)a.addMenuGroup(b[d], d - 10); a.addCommand("scaytToggle",
                    { exec: function (a) { var b = a.scayt; f.state.scayt[a.name] = !f.state.scayt[a.name]; !0 === f.state.scayt[a.name] ? b || f.createScayt(a) : b && f.destroy(a) } }); a.addCommand("scaytAbout", { exec: function (a) { a.scayt.tabToOpen = "about"; f.openDialog(h.dialogName, a) } }); a.addCommand("scaytOptions", { exec: function (a) { a.scayt.tabToOpen = "options"; f.openDialog(h.dialogName, a) } }); a.addCommand("scaytLangs", { exec: function (a) { a.scayt.tabToOpen = "langs"; f.openDialog(h.dialogName, a) } }); a.addCommand("scaytDict", {
                        exec: function (a) {
                            a.scayt.tabToOpen =
                            "dictionaries"; f.openDialog(h.dialogName, a)
                        }
                    }); b = { scaytToggle: { label: a.lang.scayt.btn_enable, group: "scaytButton", command: "scaytToggle" }, scaytAbout: { label: a.lang.scayt.btn_about, group: "scaytButton", command: "scaytAbout" }, scaytOptions: { label: a.lang.scayt.btn_options, group: "scaytButton", command: "scaytOptions" }, scaytLangs: { label: a.lang.scayt.btn_langs, group: "scaytButton", command: "scaytLangs" }, scaytDict: { label: a.lang.scayt.btn_dictionaries, group: "scaytButton", command: "scaytDict" } }; a.plugins.wsc && (b.WSC =
                        { label: a.lang.wsc.toolbar, group: "scaytButton", onClick: function () { var b = CKEDITOR.plugins.scayt, d = a.scayt, f = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.container.getText() : a.document.getBody().getText(); (f = f.replace(/\s/g, "")) ? (d && b.state.scayt[a.name] && d.setMarkupPaused && d.setMarkupPaused(!0), a.lockSelection(), a.execCommand("checkspell")) : alert("Nothing to check!") } }); a.addMenuItems(b)
            }, bindEvents: function (a) {
                var h = CKEDITOR.plugins.scayt, f = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE, b = function () { h.destroy(a) },
                d = function () { !h.state.scayt[a.name] || a.readOnly || a.scayt || h.createScayt(a) }, l = function () {
                    var b = a.editable(); b.attachListener(b, "focus", function (b) {
                        CKEDITOR.plugins.scayt && !a.scayt && setTimeout(d, 0); b = CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[a.name] && a.scayt; var e, c; if ((f || b) && a._.savedSelection) {
                            b = a._.savedSelection.getSelectedElement(); b = !b && a._.savedSelection.getRanges(); for (var h = 0; h < b.length; h++)c = b[h], "string" === typeof c.startContainer.$.nodeValue && (e = c.startContainer.getText().length,
                                (e < c.startOffset || e < c.endOffset) && a.unlockSelection(!1))
                        }
                    }, this, null, -10)
                }, k = function () { f ? a.config.scayt_inlineModeImmediateMarkup ? d() : (a.on("blur", function () { setTimeout(b, 0) }), a.on("focus", d), a.focusManager.hasFocus && d()) : d(); l(); var h = a.editable(); h.attachListener(h, "mousedown", function (b) { b = b.data.getTarget(); var e = a.widgets && a.widgets.getByElement(b); e && (e.wrapper = b.getAscendant(function (a) { return a.hasAttribute("data-cke-widget-wrapper") }, !0)) }, this, null, -10) }; a.on("contentDom", k); a.on("beforeCommandExec",
                    function (b) {
                        var d = a.scayt, e = !1, c = !1, f = !0; b.data.name in h.options.disablingCommandExec && "wysiwyg" == a.mode ? d && (h.destroy(a), a.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED)) : "bold" !== b.data.name && "italic" !== b.data.name && "underline" !== b.data.name && "strike" !== b.data.name && "subscript" !== b.data.name && "superscript" !== b.data.name && "enter" !== b.data.name && "cut" !== b.data.name && "language" !== b.data.name || !d || ("cut" === b.data.name && (f = !1, c = !0), "language" === b.data.name && (c = e = !0), a.fire("reloadMarkupScayt",
                            { removeOptions: { removeInside: f, forceBookmark: c, language: e }, timeout: 0 }))
                    }); a.on("beforeSetMode", function (b) { if ("source" == b.data) { if (b = a.scayt) h.destroy(a), a.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED); a.document && a.document.getBody().removeAttribute("_jquid") } }); a.on("afterCommandExec", function (b) { "wysiwyg" != a.mode || "undo" != b.data.name && "redo" != b.data.name || setTimeout(function () { h.reloadMarkup(a.scayt) }, 250) }); a.on("readOnly", function (b) {
                        var d; b && (d = a.scayt, !0 === b.editor.readOnly ? d && d.fire("removeMarkupInDocument",
                            {}) : d ? h.reloadMarkup(d) : "wysiwyg" == b.editor.mode && !0 === h.state.scayt[b.editor.name] && (h.createScayt(a), b.editor.fire("scaytButtonState", CKEDITOR.TRISTATE_ON)))
                    }); a.on("beforeDestroy", b); a.on("setData", function () { b(); (a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE || a.plugins.divarea) && k() }, this, null, 50); a.on("reloadMarkupScayt", function (b) {
                        var d = b.data && b.data.removeOptions, e = b.data && b.data.timeout, c = b.data && b.data.language, f = a.scayt; f && setTimeout(function () {
                            c && (d.selectionNode = a.plugins.language.getCurrentLangElement(a),
                                d.selectionNode = d.selectionNode && d.selectionNode.$ || null); f.removeMarkupInSelectionNode(d); h.reloadMarkup(f)
                        }, e || 0)
                    }); a.on("insertElement", function () { a.fire("reloadMarkupScayt", { removeOptions: { forceBookmark: !0 } }) }, this, null, 50); a.on("insertHtml", function () { a.scayt && a.scayt.setFocused && a.scayt.setFocused(!0); a.fire("reloadMarkupScayt") }, this, null, 50); a.on("insertText", function () { a.scayt && a.scayt.setFocused && a.scayt.setFocused(!0); a.fire("reloadMarkupScayt") }, this, null, 50); a.on("scaytDialogShown", function (b) { b.data.selectPage(a.scayt.tabToOpen) });
                a.on("autocompletePanelShow", function (b) { (b = a.scayt) && b.setMarkupPaused && b.setMarkupPaused(!0) }); a.on("autocompletePanelHide", function (b) { (b = a.scayt) && b.setMarkupPaused && b.setMarkupPaused(!1) })
            }, parseConfig: function (a) {
                var h = CKEDITOR.plugins.scayt; h.replaceOldOptionsNames(a.config); "boolean" !== typeof a.config.scayt_autoStartup && (a.config.scayt_autoStartup = !1); h.state.scayt[a.name] = a.config.scayt_autoStartup; "boolean" !== typeof a.config.grayt_autoStartup && (a.config.grayt_autoStartup = !1); "boolean" !==
                    typeof a.config.scayt_inlineModeImmediateMarkup && (a.config.scayt_inlineModeImmediateMarkup = !1); h.state.grayt[a.name] = a.config.grayt_autoStartup; a.config.scayt_contextCommands || (a.config.scayt_contextCommands = "ignoreall|add"); a.config.scayt_contextMenuItemsOrder || (a.config.scayt_contextMenuItemsOrder = "suggest|moresuggest|control"); a.config.scayt_sLang || (a.config.scayt_sLang = "en_US"); if (void 0 === a.config.scayt_maxSuggestions || "number" != typeof a.config.scayt_maxSuggestions || 0 > a.config.scayt_maxSuggestions) a.config.scayt_maxSuggestions =
                        3; if (void 0 === a.config.scayt_minWordLength || "number" != typeof a.config.scayt_minWordLength || 1 > a.config.scayt_minWordLength) a.config.scayt_minWordLength = 3; if (void 0 === a.config.scayt_customDictionaryIds || "string" !== typeof a.config.scayt_customDictionaryIds) a.config.scayt_customDictionaryIds = ""; if (void 0 === a.config.scayt_userDictionaryName || "string" !== typeof a.config.scayt_userDictionaryName) a.config.scayt_userDictionaryName = null; if ("string" === typeof a.config.scayt_uiTabs && 3 === a.config.scayt_uiTabs.split(",").length) {
                            var f =
                                [], b = []; a.config.scayt_uiTabs = a.config.scayt_uiTabs.split(","); CKEDITOR.tools.search(a.config.scayt_uiTabs, function (a) { 1 === Number(a) || 0 === Number(a) ? (b.push(!0), f.push(Number(a))) : b.push(!1) }); null === CKEDITOR.tools.search(b, !1) ? a.config.scayt_uiTabs = f : a.config.scayt_uiTabs = [1, 1, 1]
                        } else a.config.scayt_uiTabs = [1, 1, 1]; "string" != typeof a.config.scayt_serviceProtocol && (a.config.scayt_serviceProtocol = null); "string" != typeof a.config.scayt_serviceHost && (a.config.scayt_serviceHost = null); "string" != typeof a.config.scayt_servicePort &&
                            (a.config.scayt_servicePort = null); "string" != typeof a.config.scayt_servicePath && (a.config.scayt_servicePath = null); a.config.scayt_moreSuggestions || (a.config.scayt_moreSuggestions = "on"); "string" !== typeof a.config.scayt_customerId && (a.config.scayt_customerId = "1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2"); "string" !== typeof a.config.scayt_customPunctuation && (a.config.scayt_customPunctuation = "-"); "string" !== typeof a.config.scayt_srcUrl && (a.config.scayt_srcUrl = "https://svc.webspellchecker.net/spellcheck31/wscbundle/wscbundle.js");
                "boolean" !== typeof CKEDITOR.config.scayt_handleCheckDirty && (CKEDITOR.config.scayt_handleCheckDirty = !0); "boolean" !== typeof CKEDITOR.config.scayt_handleUndoRedo && (CKEDITOR.config.scayt_handleUndoRedo = !0); CKEDITOR.config.scayt_handleUndoRedo = CKEDITOR.plugins.undo ? CKEDITOR.config.scayt_handleUndoRedo : !1; a.config.scayt_ignoreAllCapsWords && "boolean" !== typeof a.config.scayt_ignoreAllCapsWords && (a.config.scayt_ignoreAllCapsWords = !1); a.config.scayt_ignoreDomainNames && "boolean" !== typeof a.config.scayt_ignoreDomainNames &&
                    (a.config.scayt_ignoreDomainNames = !1); a.config.scayt_ignoreWordsWithMixedCases && "boolean" !== typeof a.config.scayt_ignoreWordsWithMixedCases && (a.config.scayt_ignoreWordsWithMixedCases = !1); a.config.scayt_ignoreWordsWithNumbers && "boolean" !== typeof a.config.scayt_ignoreWordsWithNumbers && (a.config.scayt_ignoreWordsWithNumbers = !1); if (a.config.scayt_disableOptionsStorage) {
                        var h = CKEDITOR.tools.isArray(a.config.scayt_disableOptionsStorage) ? a.config.scayt_disableOptionsStorage : "string" === typeof a.config.scayt_disableOptionsStorage ?
                            [a.config.scayt_disableOptionsStorage] : void 0, d = "all options lang ignore-all-caps-words ignore-domain-names ignore-words-with-mixed-cases ignore-words-with-numbers".split(" "), l = ["lang", "ignore-all-caps-words", "ignore-domain-names", "ignore-words-with-mixed-cases", "ignore-words-with-numbers"], k = CKEDITOR.tools.search, m = CKEDITOR.tools.indexOf; a.config.scayt_disableOptionsStorage = function (a) {
                                for (var b = [], c = 0; c < a.length; c++) {
                                    var f = a[c], h = !!k(a, "options"); if (!k(d, f) || h && k(l, function (a) { if ("lang" === a) return !1 })) return;
                                    k(l, f) && l.splice(m(l, f), 1); if ("all" === f || h && k(a, "lang")) return []; "options" === f && (l = ["lang"])
                                } return b = b.concat(l)
                            }(h)
                    }
            }, addRule: function (a) {
                var h = CKEDITOR.plugins.scayt, f = a.dataProcessor, b = f && f.htmlFilter, d = a._.elementsPath && a._.elementsPath.filters, f = f && f.dataFilter, l = a.addRemoveFormatFilter, k = function (b) { if (a.scayt && (b.hasAttribute(h.options.data_attribute_name) || b.hasAttribute(h.options.problem_grammar_data_attribute))) return !1 }, m = function (b) {
                    var e = !0; a.scayt && (b.hasAttribute(h.options.data_attribute_name) ||
                        b.hasAttribute(h.options.problem_grammar_data_attribute)) && (e = !1); return e
                }; d && d.push(k); f && f.addRules({ elements: { span: function (a) { var b = a.hasClass(h.options.misspelled_word_class) && a.attributes[h.options.data_attribute_name], c = a.hasClass(h.options.problem_grammar_class) && a.attributes[h.options.problem_grammar_data_attribute]; h && (b || c) && delete a.name; return a } } }); b && b.addRules({
                    elements: {
                        span: function (a) {
                            var b = a.hasClass(h.options.misspelled_word_class) && a.attributes[h.options.data_attribute_name],
                            c = a.hasClass(h.options.problem_grammar_class) && a.attributes[h.options.problem_grammar_data_attribute]; h && (b || c) && delete a.name; return a
                        }
                    }
                }); l && l.call(a, m)
            }, scaytMenuDefinition: function (a) {
                var h = this, f = CKEDITOR.plugins.scayt; a = a.scayt; return {
                    scayt: {
                        scayt_ignore: { label: a.getLocal("btn_ignore"), group: "scayt_control", order: 1, exec: function (a) { a.scayt.ignoreWord() } }, scayt_ignoreall: { label: a.getLocal("btn_ignoreAll"), group: "scayt_control", order: 2, exec: function (a) { a.scayt.ignoreAllWords() } }, scayt_add: {
                            label: a.getLocal("btn_addWord"),
                            group: "scayt_control", order: 3, exec: function (a) { var d = a.scayt; setTimeout(function () { d.addWordToUserDictionary() }, 10) }
                        }, scayt_option: { label: a.getLocal("btn_options"), group: "scayt_control", order: 4, exec: function (a) { a.scayt.tabToOpen = "options"; f.openDialog(h.dialogName, a) }, verification: function (a) { return 1 == a.config.scayt_uiTabs[0] ? !0 : !1 } }, scayt_language: {
                            label: a.getLocal("btn_langs"), group: "scayt_control", order: 5, exec: function (a) { a.scayt.tabToOpen = "langs"; f.openDialog(h.dialogName, a) }, verification: function (a) {
                                return 1 ==
                                    a.config.scayt_uiTabs[1] ? !0 : !1
                            }
                        }, scayt_dictionary: { label: a.getLocal("btn_dictionaries"), group: "scayt_control", order: 6, exec: function (a) { a.scayt.tabToOpen = "dictionaries"; f.openDialog(h.dialogName, a) }, verification: function (a) { return 1 == a.config.scayt_uiTabs[2] ? !0 : !1 } }, scayt_about: { label: a.getLocal("btn_about"), group: "scayt_control", order: 7, exec: function (a) { a.scayt.tabToOpen = "about"; f.openDialog(h.dialogName, a) } }
                    }, grayt: {
                        grayt_problemdescription: {
                            label: "Grammar problem description", group: "grayt_description",
                            order: 1, state: CKEDITOR.TRISTATE_DISABLED, exec: function (a) { }
                        }, grayt_ignore: { label: a.getLocal("btn_ignore"), group: "grayt_control", order: 2, exec: function (a) { a.scayt.ignorePhrase() } }, grayt_ignoreall: { label: a.getLocal("btn_ignoreAll"), group: "grayt_control", order: 3, exec: function (a) { a.scayt.ignoreAllPhrases() } }
                    }
                }
            }, buildSuggestionMenuItems: function (a, h, f) {
                var b = {}, d = {}, l = f ? "word" : "phrase", k = f ? "startGrammarCheck" : "startSpellCheck", m = a.scayt; if (0 < h.length && "no_any_suggestions" !== h[0]) if (f) for (f = 0; f < h.length; f++) {
                    var g =
                        "scayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[f].replace(" ", "_"); a.addCommand(g, this.createCommand(CKEDITOR.plugins.scayt.suggestions[f], l, k)); f < a.config.scayt_maxSuggestions ? (a.addMenuItem(g, { label: h[f], command: g, group: "scayt_suggest", order: f + 1 }), b[g] = CKEDITOR.TRISTATE_OFF) : (a.addMenuItem(g, { label: h[f], command: g, group: "scayt_moresuggest", order: f + 1 }), d[g] = CKEDITOR.TRISTATE_OFF, "on" === a.config.scayt_moreSuggestions && (a.addMenuItem("scayt_moresuggest", {
                            label: m.getLocal("btn_moreSuggestions"),
                            group: "scayt_moresuggest", order: 10, getItems: function () { return d }
                        }), b.scayt_moresuggest = CKEDITOR.TRISTATE_OFF))
                } else for (f = 0; f < h.length; f++)g = "grayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[f].replace(" ", "_"), a.addCommand(g, this.createCommand(CKEDITOR.plugins.scayt.suggestions[f], l, k)), a.addMenuItem(g, { label: h[f], command: g, group: "grayt_suggest", order: f + 1 }), b[g] = CKEDITOR.TRISTATE_OFF; else b.no_scayt_suggest = CKEDITOR.TRISTATE_DISABLED, a.addCommand("no_scayt_suggest", { exec: function () { } }), a.addMenuItem("no_scayt_suggest",
                    { label: m.getLocal("btn_noSuggestions") || "no_scayt_suggest", command: "no_scayt_suggest", group: "scayt_suggest", order: 0 }); return b
            }, menuGenerator: function (a, h) {
                var f = a.scayt, b = this.scaytMenuDefinition(a), d = {}, l = a.config.scayt_contextCommands.split("|"), k = h.getAttribute(f.getLangAttribute()) || f.getLang(), m, g, e, c; g = f.isScaytNode(h); e = f.isGraytNode(h); g ? (b = b.scayt, m = h.getAttribute(f.getScaytNodeAttributeName()), f.fire("getSuggestionsList", { lang: k, word: m }), d = this.buildSuggestionMenuItems(a, CKEDITOR.plugins.scayt.suggestions,
                    g)) : e && (b = b.grayt, d = h.getAttribute(f.getGraytNodeAttributeName()), f.getGraytNodeRuleAttributeName ? (m = h.getAttribute(f.getGraytNodeRuleAttributeName()), f.getProblemDescriptionText(d, m, k)) : f.getProblemDescriptionText(d, k), c = f.getProblemDescriptionText(d, m, k), b.grayt_problemdescription && c && (c = c.replace(/([.!?])\s/g, "$1\x3cbr\x3e"), b.grayt_problemdescription.label = c), f.fire("getGrammarSuggestionsList", { lang: k, phrase: d, rule: m }), d = this.buildSuggestionMenuItems(a, CKEDITOR.plugins.scayt.suggestions, g)); if (g &&
                        "off" == a.config.scayt_contextCommands) return d; for (var n in b) g && -1 == CKEDITOR.tools.indexOf(l, n.replace("scayt_", "")) && "all" != a.config.scayt_contextCommands || e && "grayt_problemdescription" !== n && -1 == CKEDITOR.tools.indexOf(l, n.replace("grayt_", "")) && "all" != a.config.scayt_contextCommands || (d[n] = "undefined" != typeof b[n].state ? b[n].state : CKEDITOR.TRISTATE_OFF, "function" !== typeof b[n].verification || b[n].verification(a) || delete d[n], a.addCommand(n, { exec: b[n].exec }), a.addMenuItem(n, {
                            label: a.lang.scayt[b[n].label] ||
                                b[n].label, command: n, group: b[n].group, order: b[n].order
                        })); return d
            }, createCommand: function (a, h, f) { return { exec: function (b) { b = b.scayt; var d = {}; d[h] = a; b.replaceSelectionNode(d); "startGrammarCheck" === f && b.removeMarkupInSelectionNode({ grammarOnly: !0 }); b.fire(f) } } }
        }); CKEDITOR.plugins.scayt = {
            charsToObserve: [{
                charName: "cke-fillingChar", charCode: function () {
                    var a = CKEDITOR.version, h = [4, 5, 6], f = String.fromCharCode(8203), b = Array(8).join(f), d, l; if (!a) return f; for (var a = a.split("."), k = 0; k < h.length; k++) {
                        d = h[k]; l =
                            Number(a[k]); if (l > d) return b; if (l < d) break
                    } return f
                }()
            }], state: { scayt: {}, grayt: {} }, warningCounter: 0, suggestions: [], options: { disablingCommandExec: { source: !0, newpage: !0, templates: !0 }, data_attribute_name: "data-scayt-word", misspelled_word_class: "scayt-misspell-word", problem_grammar_data_attribute: "data-grayt-phrase", problem_grammar_class: "gramm-problem" }, backCompatibilityMap: {
                scayt_service_protocol: "scayt_serviceProtocol", scayt_service_host: "scayt_serviceHost", scayt_service_port: "scayt_servicePort", scayt_service_path: "scayt_servicePath",
                scayt_customerid: "scayt_customerId"
            }, openDialog: function (a, h) { var f = h.scayt; f.isAllModulesReady && !1 === f.isAllModulesReady() || (h.lockSelection(), h.openDialog(a)) }, alarmCompatibilityMessage: function () {
                5 > this.warningCounter && (console.warn("You are using the latest version of SCAYT plugin for CKEditor with the old application version. In order to have access to the newest features, it is recommended to upgrade the application version to latest one as well. Contact us for more details at support@webspellchecker.net."),
                    this.warningCounter += 1)
            }, isNewUdSupported: function (a) { return a.getUserDictionary ? !0 : !1 }, reloadMarkup: function (a) { var h; a && (h = a.getScaytLangList(), a.reloadMarkup ? a.reloadMarkup() : (this.alarmCompatibilityMessage(), h && h.ltr && h.rtl && a.fire("startSpellCheck, startGrammarCheck"))) }, replaceOldOptionsNames: function (a) { for (var h in a) h in this.backCompatibilityMap && (a[this.backCompatibilityMap[h]] = a[h], delete a[h]) }, createScayt: function (a) {
                var h = this, f = CKEDITOR.plugins.scayt; this.loadScaytLibrary(a, function (a) {
                    function d(a) {
                        return new SCAYT.CKSCAYT(a,
                            function () { }, function () { })
                    } var l; a.window && (l = "BODY" == a.editable().$.nodeName ? a.window.getFrame() : a.editable()); if (l) {
                        l = {
                            lang: a.config.scayt_sLang, container: l.$, customDictionary: a.config.scayt_customDictionaryIds, userDictionaryName: a.config.scayt_userDictionaryName, localization: a.langCode, customer_id: a.config.scayt_customerId, customPunctuation: a.config.scayt_customPunctuation, debug: a.config.scayt_debug, data_attribute_name: h.options.data_attribute_name, misspelled_word_class: h.options.misspelled_word_class,
                            problem_grammar_data_attribute: h.options.problem_grammar_data_attribute, problem_grammar_class: h.options.problem_grammar_class, "options-to-restore": a.config.scayt_disableOptionsStorage, focused: a.editable().hasFocus, ignoreElementsRegex: a.config.scayt_elementsToIgnore, ignoreGraytElementsRegex: a.config.grayt_elementsToIgnore, minWordLength: a.config.scayt_minWordLength, graytAutoStartup: a.config.grayt_autoStartup, charsToObserve: f.charsToObserve
                        }; a.config.scayt_serviceProtocol && (l.service_protocol = a.config.scayt_serviceProtocol);
                        a.config.scayt_serviceHost && (l.service_host = a.config.scayt_serviceHost); a.config.scayt_servicePort && (l.service_port = a.config.scayt_servicePort); a.config.scayt_servicePath && (l.service_path = a.config.scayt_servicePath); "boolean" === typeof a.config.scayt_ignoreAllCapsWords && (l["ignore-all-caps-words"] = a.config.scayt_ignoreAllCapsWords); "boolean" === typeof a.config.scayt_ignoreDomainNames && (l["ignore-domain-names"] = a.config.scayt_ignoreDomainNames); "boolean" === typeof a.config.scayt_ignoreWordsWithMixedCases &&
                            (l["ignore-words-with-mixed-cases"] = a.config.scayt_ignoreWordsWithMixedCases); "boolean" === typeof a.config.scayt_ignoreWordsWithNumbers && (l["ignore-words-with-numbers"] = a.config.scayt_ignoreWordsWithNumbers); var k; try { k = d(l) } catch (m) { h.alarmCompatibilityMessage(), delete l.charsToObserve, k = d(l) } k.subscribe("suggestionListSend", function (a) {
                                for (var b = {}, c = [], d = 0; d < a.suggestionList.length; d++)b["word_" + a.suggestionList[d]] || (b["word_" + a.suggestionList[d]] = a.suggestionList[d], c.push(a.suggestionList[d]));
                                CKEDITOR.plugins.scayt.suggestions = c
                            }); k.subscribe("selectionIsChanged", function (d) { a.getSelection().isLocked && "restoreSelection" !== d.action && a.lockSelection(); "restoreSelection" === d.action && a.selectionChange(!0) }); k.subscribe("graytStateChanged", function (d) { f.state.grayt[a.name] = d.state }); k.addMarkupHandler && k.addMarkupHandler(function (d) { var e = a.editable(), c = e.getCustomData(d.charName); c && (c.$ = d.node, e.setCustomData(d.charName, c)) }); a.scayt = k; a.fire("scaytButtonState", a.readOnly ? CKEDITOR.TRISTATE_DISABLED :
                                CKEDITOR.TRISTATE_ON)
                    } else f.state.scayt[a.name] = !1
                })
            }, destroy: function (a) { a.scayt && a.scayt.destroy(); delete a.scayt; a.fire("scaytButtonState", CKEDITOR.TRISTATE_OFF) }, loadScaytLibrary: function (a, h) { var f, b = function () { CKEDITOR.fireOnce("scaytReady"); a.scayt || "function" === typeof h && h(a) }; "undefined" === typeof window.SCAYT || "function" !== typeof window.SCAYT.CKSCAYT ? (f = a.config.scayt_srcUrl, CKEDITOR.scriptLoader.load(f, function (a) { a && b() })) : window.SCAYT && "function" === typeof window.SCAYT.CKSCAYT && b() }
        };
        CKEDITOR.on("dialogDefinition", function (a) {
            var h = a.data.name; a = a.data.definition.dialog; "scaytDialog" !== h && "checkspell" !== h && (a.on("show", function (a) { a = a.sender && a.sender.getParentEditor(); var b = CKEDITOR.plugins.scayt, d = a.scayt; d && b.state.scayt[a.name] && d.setMarkupPaused && d.setMarkupPaused(!0) }), a.on("hide", function (a) { a = a.sender && a.sender.getParentEditor(); var b = CKEDITOR.plugins.scayt, d = a.scayt; d && b.state.scayt[a.name] && d.setMarkupPaused && d.setMarkupPaused(!1) })); if ("scaytDialog" === h) a.on("cancel",
                function (a) { return !1 }, this, null, -1); if ("checkspell" === h) a.on("cancel", function (a) { a = a.sender && a.sender.getParentEditor(); var b = CKEDITOR.plugins.scayt, d = a.scayt; d && b.state.scayt[a.name] && d.setMarkupPaused && d.setMarkupPaused(!1); a.unlockSelection() }, this, null, -2); if ("link" === h) a.on("ok", function (a) { var b = a.sender && a.sender.getParentEditor(); b && setTimeout(function () { b.fire("reloadMarkupScayt", { removeOptions: { removeInside: !0, forceBookmark: !0 }, timeout: 0 }) }, 0) }); if ("replace" === h) a.on("hide", function (a) {
                    a =
                    a.sender && a.sender.getParentEditor(); var b = CKEDITOR.plugins.scayt, d = a.scayt; a && setTimeout(function () { d && (d.fire("removeMarkupInDocument", {}), b.reloadMarkup(d)) }, 0)
                })
        }); CKEDITOR.on("scaytReady", function () {
            if (!0 === CKEDITOR.config.scayt_handleCheckDirty) {
                var a = CKEDITOR.editor.prototype; a.checkDirty = CKEDITOR.tools.override(a.checkDirty, function (a) {
                    return function () {
                        var b = null, d = this.scayt; if (CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] && this.scayt) {
                            if (b = "ready" == this.status) var h =
                                d.removeMarkupFromString(this.getSnapshot()), d = d.removeMarkupFromString(this._.previousValue), b = b && d !== h
                        } else b = a.call(this); return b
                    }
                }); a.resetDirty = CKEDITOR.tools.override(a.resetDirty, function (a) { return function () { var b = this.scayt; CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] && this.scayt ? this._.previousValue = b.removeMarkupFromString(this.getSnapshot()) : a.call(this) } })
            } if (!0 === CKEDITOR.config.scayt_handleUndoRedo) {
                var a = CKEDITOR.plugins.undo.Image.prototype, h = "function" ==
                    typeof a.equalsContent ? "equalsContent" : "equals"; a[h] = CKEDITOR.tools.override(a[h], function (a) { return function (b) { var d = b.editor.scayt, h = this.contents, k = b.contents, m = null; CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[b.editor.name] && b.editor.scayt && (this.contents = d.removeMarkupFromString(h) || "", b.contents = d.removeMarkupFromString(k) || ""); m = a.apply(this, arguments); this.contents = h; b.contents = k; return m } })
            }
        }); (function () {
            CKEDITOR.plugins.add("selectall", {
                init: function (a) {
                    a.addCommand("selectAll",
                        { modes: { wysiwyg: 1, source: 1 }, exec: function (a) { var f = a.editable(); if (f.is("textarea")) a = f.$, CKEDITOR.env.ie && a.createTextRange ? a.createTextRange().execCommand("SelectAll") : (a.selectionStart = 0, a.selectionEnd = a.value.length), a.focus(); else { if (f.is("body")) a.document.$.execCommand("SelectAll", !1, null); else { var b = a.createRange(); b.selectNodeContents(f); b.select() } a.forceNextSelectionCheck(); a.selectionChange() } }, canUndo: !1 }); a.ui.addButton && a.ui.addButton("SelectAll", {
                            label: a.lang.selectall.toolbar, command: "selectAll",
                            toolbar: "selection,10"
                        })
                }
            })
        })(); (function () {
            var a = { readOnly: 1, preserveState: !0, editorFocus: !1, exec: function (a) { this.toggleState(); this.refresh(a) }, refresh: function (a) { if (a.document) { var f = this.state != CKEDITOR.TRISTATE_ON || a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && !a.focusManager.hasFocus ? "removeClass" : "attachClass"; a.editable()[f]("cke_show_blocks") } } }; CKEDITOR.plugins.add("showblocks", {
                onLoad: function () {
                    var a = "p div pre address blockquote h1 h2 h3 h4 h5 h6".split(" "), f, b, d, l, k = CKEDITOR.getUrl(this.path),
                    m = !(CKEDITOR.env.ie && 9 > CKEDITOR.env.version), g = m ? ":not([contenteditable\x3dfalse]):not(.cke_show_blocks_off)" : "", e, c; for (f = b = d = l = ""; e = a.pop();)c = a.length ? "," : "", f += ".cke_show_blocks " + e + g + c, d += ".cke_show_blocks.cke_contents_ltr " + e + g + c, l += ".cke_show_blocks.cke_contents_rtl " + e + g + c, b += ".cke_show_blocks " + e + g + "{background-image:url(" + CKEDITOR.getUrl(k + "images/block_" + e + ".png") + ")}"; CKEDITOR.addCss((f + "{background-repeat:no-repeat;border:1px dotted gray;padding-top:8px}").concat(b, d + "{background-position:top left;padding-left:8px}",
                        l + "{background-position:top right;padding-right:8px}")); m || CKEDITOR.addCss(".cke_show_blocks [contenteditable\x3dfalse],.cke_show_blocks .cke_show_blocks_off{border:none;padding-top:0;background-image:none}.cke_show_blocks.cke_contents_rtl [contenteditable\x3dfalse],.cke_show_blocks.cke_contents_rtl .cke_show_blocks_off{padding-right:0}.cke_show_blocks.cke_contents_ltr [contenteditable\x3dfalse],.cke_show_blocks.cke_contents_ltr .cke_show_blocks_off{padding-left:0}")
                }, init: function (h) {
                    function f() { b.refresh(h) }
                    if (!h.blockless) { var b = h.addCommand("showblocks", a); b.canUndo = !1; h.config.startupOutlineBlocks && b.setState(CKEDITOR.TRISTATE_ON); h.ui.addButton && h.ui.addButton("ShowBlocks", { label: h.lang.showblocks.toolbar, command: "showblocks", toolbar: "tools,20" }); h.on("mode", function () { b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(h) }); h.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (h.on("focus", f), h.on("blur", f)); h.on("contentDom", function () { b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(h) }) }
                }
            })
        })(); (function () {
            var a =
                { preserveState: !0, editorFocus: !1, readOnly: 1, exec: function (a) { this.toggleState(); this.refresh(a) }, refresh: function (a) { if (a.document) { var f = this.state == CKEDITOR.TRISTATE_ON ? "attachClass" : "removeClass"; a.editable()[f]("cke_show_borders") } } }; CKEDITOR.plugins.add("showborders", {
                    modes: { wysiwyg: 1 }, onLoad: function () {
                        var a; a = (CKEDITOR.env.ie6Compat ? [".%1 table.%2,", ".%1 table.%2 td, .%1 table.%2 th", "{", "border : #d3d3d3 1px dotted", "}"] : ".%1 table.%2,;.%1 table.%2 \x3e tr \x3e td, .%1 table.%2 \x3e tr \x3e th,;.%1 table.%2 \x3e tbody \x3e tr \x3e td, .%1 table.%2 \x3e tbody \x3e tr \x3e th,;.%1 table.%2 \x3e thead \x3e tr \x3e td, .%1 table.%2 \x3e thead \x3e tr \x3e th,;.%1 table.%2 \x3e tfoot \x3e tr \x3e td, .%1 table.%2 \x3e tfoot \x3e tr \x3e th;{;border : #d3d3d3 1px dotted;}".split(";")).join("").replace(/%2/g,
                            "cke_show_border").replace(/%1/g, "cke_show_borders "); CKEDITOR.addCss(a)
                    }, init: function (h) {
                        var f = h.addCommand("showborders", a); f.canUndo = !1; !1 !== h.config.startupShowBorders && f.setState(CKEDITOR.TRISTATE_ON); h.on("mode", function () { f.state != CKEDITOR.TRISTATE_DISABLED && f.refresh(h) }, null, null, 100); h.on("contentDom", function () { f.state != CKEDITOR.TRISTATE_DISABLED && f.refresh(h) }); h.on("removeFormatCleanup", function (a) {
                            a = a.data; h.getCommand("showborders").state == CKEDITOR.TRISTATE_ON && a.is("table") && (!a.hasAttribute("border") ||
                                0 >= parseInt(a.getAttribute("border"), 10)) && a.addClass("cke_show_border")
                        })
                    }, afterInit: function (a) {
                        var f = a.dataProcessor; a = f && f.dataFilter; f = f && f.htmlFilter; a && a.addRules({ elements: { table: function (a) { a = a.attributes; var d = a["class"], f = parseInt(a.border, 10); f && !(0 >= f) || d && -1 != d.indexOf("cke_show_border") || (a["class"] = (d || "") + " cke_show_border") } } }); f && f.addRules({
                            elements: {
                                table: function (a) {
                                    a = a.attributes; var d = a["class"]; d && (a["class"] = d.replace("cke_show_border", "").replace(/\s{2}/, " ").replace(/^\s+|\s+$/,
                                        ""))
                                }
                            }
                        })
                    }
                }); CKEDITOR.on("dialogDefinition", function (a) {
                    var f = a.data.name; if ("table" == f || "tableProperties" == f) if (a = a.data.definition, f = a.getContents("info").get("txtBorder"), f.commit = CKEDITOR.tools.override(f.commit, function (a) { return function (d, f) { a.apply(this, arguments); var h = parseInt(this.getValue(), 10); f[!h || 0 >= h ? "addClass" : "removeClass"]("cke_show_border") } }), a = (a = a.getContents("advanced")) && a.get("advCSSClasses")) a.setup = CKEDITOR.tools.override(a.setup, function (a) {
                        return function () {
                            a.apply(this,
                                arguments); this.setValue(this.getValue().replace(/cke_show_border/, ""))
                        }
                    }), a.commit = CKEDITOR.tools.override(a.commit, function (a) { return function (d, f) { a.apply(this, arguments); parseInt(f.getAttribute("border"), 10) || f.addClass("cke_show_border") } })
                })
        })(); CKEDITOR.plugins.add("smiley", {
            requires: "dialog", init: function (a) {
                a.config.smiley_path = a.config.smiley_path || this.path + "images/"; a.addCommand("smiley", new CKEDITOR.dialogCommand("smiley", { allowedContent: "img[alt,height,!src,title,width]", requiredContent: "img" }));
                a.ui.addButton && a.ui.addButton("Smiley", { label: a.lang.smiley.toolbar, command: "smiley", toolbar: "insert,50" }); CKEDITOR.dialog.add("smiley", this.path + "dialogs/smiley.js")
            }
        }); CKEDITOR.config.smiley_images = "regular_smile.png sad_smile.png wink_smile.png teeth_smile.png confused_smile.png tongue_smile.png embarrassed_smile.png omg_smile.png whatchutalkingabout_smile.png angry_smile.png angel_smile.png shades_smile.png devil_smile.png cry_smile.png lightbulb.png thumbs_down.png thumbs_up.png heart.png broken_heart.png kiss.png envelope.png".split(" ");
        CKEDITOR.config.smiley_descriptions = "smiley;sad;wink;laugh;frown;cheeky;blush;surprise;indecision;angry;angel;cool;devil;crying;enlightened;no;yes;heart;broken heart;kiss;mail".split(";"); (function () {
            CKEDITOR.plugins.add("sourcearea", {
                init: function (h) {
                    function f() { var a = d && this.equals(CKEDITOR.document.getActive()); this.hide(); this.setStyle("height", this.getParent().$.clientHeight + "px"); this.setStyle("width", this.getParent().$.clientWidth + "px"); this.show(); a && this.focus() } if (h.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                        var b =
                            CKEDITOR.plugins.sourcearea; h.addMode("source", function (b) {
                                var d = h.ui.space("contents").getDocument().createElement("textarea"); d.setStyles(CKEDITOR.tools.extend({ width: CKEDITOR.env.ie7Compat ? "99%" : "100%", height: "100%", resize: "none", outline: "none", "text-align": "left" }, CKEDITOR.tools.cssVendorPrefix("tab-size", h.config.sourceAreaTabSize || 4))); d.setAttribute("dir", "ltr"); d.addClass("cke_source").addClass("cke_reset").addClass("cke_enable_context_menu"); h.ui.space("contents").append(d); d = h.editable(new a(h,
                                    d)); d.setData(h.getData(1)); CKEDITOR.env.ie && (d.attachListener(h, "resize", f, d), d.attachListener(CKEDITOR.document.getWindow(), "resize", f, d), CKEDITOR.tools.setTimeout(f, 0, d)); h.fire("ariaWidget", this); b()
                            }); h.addCommand("source", b.commands.source); h.ui.addButton && h.ui.addButton("Source", { label: h.lang.sourcearea.toolbar, command: "source", toolbar: "mode,10" }); h.on("mode", function () { h.getCommand("source").setState("source" == h.mode ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) }); var d = CKEDITOR.env.ie && 9 ==
                                CKEDITOR.env.version
                    }
                }
            }); var a = CKEDITOR.tools.createClass({ base: CKEDITOR.editable, proto: { setData: function (a) { this.setValue(a); this.status = "ready"; this.editor.fire("dataReady") }, getData: function () { return this.getValue() }, insertHtml: function () { }, insertElement: function () { }, insertText: function () { }, setReadOnly: function (a) { this[(a ? "set" : "remove") + "Attribute"]("readOnly", "readonly") }, detach: function () { a.baseProto.detach.call(this); this.clearCustomData(); this.remove() } } })
        })(); CKEDITOR.plugins.sourcearea =
            { commands: { source: { modes: { wysiwyg: 1, source: 1 }, editorFocus: !1, readOnly: 1, exec: function (a) { "wysiwyg" == a.mode && a.fire("saveSnapshot"); a.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED); a.setMode("source" == a.mode ? "wysiwyg" : "source") }, canUndo: !1 } } }; CKEDITOR.plugins.add("specialchar", {
                availableLangs: {
                    af: 1, ar: 1, az: 1, bg: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, "de-ch": 1, el: 1, en: 1, "en-au": 1, "en-ca": 1, "en-gb": 1, eo: 1, es: 1, "es-mx": 1, et: 1, eu: 1, fa: 1, fi: 1, fr: 1, "fr-ca": 1, gl: 1, he: 1, hr: 1, hu: 1, id: 1, it: 1, ja: 1, km: 1, ko: 1, ku: 1,
                    lt: 1, lv: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, pt: 1, "pt-br": 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, sr: 1, "sr-latn": 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, zh: 1, "zh-cn": 1
                }, requires: "dialog", init: function (a) {
                    var h = this; CKEDITOR.dialog.add("specialchar", this.path + "dialogs/specialchar.js"); a.addCommand("specialchar", {
                        exec: function () {
                            var f = a.langCode, f = h.availableLangs[f] ? f : h.availableLangs[f.replace(/-.*/, "")] ? f.replace(/-.*/, "") : "en"; CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(h.path + "dialogs/lang/" + f + ".js"), function () {
                                CKEDITOR.tools.extend(a.lang.specialchar,
                                    h.langEntries[f]); a.openDialog("specialchar")
                            })
                        }, modes: { wysiwyg: 1 }, canUndo: !1
                    }); a.ui.addButton && a.ui.addButton("SpecialChar", { label: a.lang.specialchar.toolbar, command: "specialchar", toolbar: "insert,50" })
                }
            }); CKEDITOR.config.specialChars = "! \x26quot; # $ % \x26amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; \x26lt; \x3d \x26gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ \x26euro; \x26lsquo; \x26rsquo; \x26ldquo; \x26rdquo; \x26ndash; \x26mdash; \x26iexcl; \x26cent; \x26pound; \x26curren; \x26yen; \x26brvbar; \x26sect; \x26uml; \x26copy; \x26ordf; \x26laquo; \x26not; \x26reg; \x26macr; \x26deg; \x26sup2; \x26sup3; \x26acute; \x26micro; \x26para; \x26middot; \x26cedil; \x26sup1; \x26ordm; \x26raquo; \x26frac14; \x26frac12; \x26frac34; \x26iquest; \x26Agrave; \x26Aacute; \x26Acirc; \x26Atilde; \x26Auml; \x26Aring; \x26AElig; \x26Ccedil; \x26Egrave; \x26Eacute; \x26Ecirc; \x26Euml; \x26Igrave; \x26Iacute; \x26Icirc; \x26Iuml; \x26ETH; \x26Ntilde; \x26Ograve; \x26Oacute; \x26Ocirc; \x26Otilde; \x26Ouml; \x26times; \x26Oslash; \x26Ugrave; \x26Uacute; \x26Ucirc; \x26Uuml; \x26Yacute; \x26THORN; \x26szlig; \x26agrave; \x26aacute; \x26acirc; \x26atilde; \x26auml; \x26aring; \x26aelig; \x26ccedil; \x26egrave; \x26eacute; \x26ecirc; \x26euml; \x26igrave; \x26iacute; \x26icirc; \x26iuml; \x26eth; \x26ntilde; \x26ograve; \x26oacute; \x26ocirc; \x26otilde; \x26ouml; \x26divide; \x26oslash; \x26ugrave; \x26uacute; \x26ucirc; \x26uuml; \x26yacute; \x26thorn; \x26yuml; \x26OElig; \x26oelig; \x26#372; \x26#374 \x26#373 \x26#375; \x26sbquo; \x26#8219; \x26bdquo; \x26hellip; \x26trade; \x26#9658; \x26bull; \x26rarr; \x26rArr; \x26hArr; \x26diams; \x26asymp;".split(" ");
        (function () {
            CKEDITOR.plugins.add("stylescombo", {
                requires: "richcombo", init: function (a) {
                    var h = a.config, f = a.lang.stylescombo, b = {}, d = [], l = []; a.on("stylesSet", function (f) {
                        if (f = f.data.styles) {
                            for (var m, g, e, c = 0, n = f.length; c < n; c++)(m = f[c], a.blockless && m.element in CKEDITOR.dtd.$block || "string" == typeof m.type && !CKEDITOR.style.customHandlers[m.type] || (g = m.name, m = new CKEDITOR.style(m), a.filter.customConfig && !a.filter.check(m))) || (m._name = g, m._.enterMode = h.enterMode, m._.type = e = m.assignedTo || m.type, m._.weight =
                                c + 1E3 * (e == CKEDITOR.STYLE_OBJECT ? 1 : e == CKEDITOR.STYLE_BLOCK ? 2 : 3), b[g] = m, d.push(m), l.push(m)); d.sort(function (a, b) { return a._.weight - b._.weight })
                        }
                    }); a.on("stylesRemove", function (d) { d = d.data && d.data.type; var f = void 0 === d, g; for (g in b) { var e = b[g]; (f || e.type === d) && a.removeStyle(e) } }); a.ui.addRichCombo("Styles", {
                        label: f.label, title: f.panelTitle, toolbar: "styles,10", allowedContent: l, panel: { css: [CKEDITOR.skin.getPath("editor")].concat(h.contentsCss), multiSelect: !0, attributes: { "aria-label": f.panelTitle } }, init: function () {
                            var a,
                            b, g, e, c, h; c = 0; for (h = d.length; c < h; c++)a = d[c], b = a._name, e = a._.type, e != g && (this.startGroup(f["panelTitle" + String(e)]), g = e), this.add(b, a.type == CKEDITOR.STYLE_OBJECT ? b : a.buildPreview(), b); this.commit()
                        }, onClick: function (d) { a.focus(); a.fire("saveSnapshot"); d = b[d]; var f = a.elementPath(); if (d.group && d.removeStylesFromSameGroup(a)) a.applyStyle(d); else a[d.checkActive(f, a) ? "removeStyle" : "applyStyle"](d); a.fire("saveSnapshot") }, onRender: function () {
                            a.on("selectionChange", function (d) {
                                var f = this.getValue(); d = d.data.path.elements;
                                for (var g = 0, e = d.length, c; g < e; g++) { c = d[g]; for (var h in b) if (b[h].checkElementRemovable(c, !0, a)) { h != f && this.setValue(h); return } } this.setValue("")
                            }, this)
                        }, onOpen: function () {
                            var d = a.getSelection(), d = d.getSelectedElement() || d.getStartElement() || a.editable(), d = a.elementPath(d), h = [0, 0, 0, 0]; this.showAll(); this.unmarkAll(); for (var g in b) { var e = b[g], c = e._.type; e.checkApplicable(d, a, a.activeFilter) ? h[c]++ : this.hideItem(g); e.checkActive(d, a) && this.mark(g) } h[CKEDITOR.STYLE_BLOCK] || this.hideGroup(f["panelTitle" +
                                String(CKEDITOR.STYLE_BLOCK)]); h[CKEDITOR.STYLE_INLINE] || this.hideGroup(f["panelTitle" + String(CKEDITOR.STYLE_INLINE)]); h[CKEDITOR.STYLE_OBJECT] || this.hideGroup(f["panelTitle" + String(CKEDITOR.STYLE_OBJECT)])
                        }, refresh: function () { var d = a.elementPath(); if (d) { for (var f in b) if (b[f].checkApplicable(d, a, a.activeFilter)) return; this.setState(CKEDITOR.TRISTATE_DISABLED) } }, reset: function () { b = {}; d = [] }
                    })
                }
            })
        })(); (function () {
            function a(a) {
                return {
                    editorFocus: !1, canUndo: !1, modes: { wysiwyg: 1 }, exec: function (b) {
                        if (b.editable().hasFocus) {
                            var f =
                                b.getSelection(), h; if (h = (new CKEDITOR.dom.elementPath(f.getCommonAncestor(), f.root)).contains({ td: 1, th: 1 }, 1)) {
                                    var f = b.createRange(), g = CKEDITOR.tools.tryThese(function () { var b = h.getParent().$.cells[h.$.cellIndex + (a ? -1 : 1)]; b.parentNode.parentNode; return b }, function () { var b = h.getParent(), b = b.getAscendant("table").$.rows[b.$.rowIndex + (a ? -1 : 1)]; return b.cells[a ? b.cells.length - 1 : 0] }); if (g || a) if (g) g = new CKEDITOR.dom.element(g), f.moveToElementEditStart(g), f.checkStartOfBlock() && f.checkEndOfBlock() || f.selectNodeContents(g);
                                    else return !0; else { for (var e = h.getAscendant("table").$, g = h.getParent().$.cells, e = new CKEDITOR.dom.element(e.insertRow(-1), b.document), c = 0, n = g.length; c < n; c++)e.append((new CKEDITOR.dom.element(g[c], b.document)).clone(!1, !1)).appendBogus(); f.moveToElementEditStart(e) } f.select(!0); return !0
                                }
                        } return !1
                    }
                }
            } var h = { editorFocus: !1, modes: { wysiwyg: 1, source: 1 } }, f = { exec: function (a) { a.container.focusNext(!0, a.tabIndex) } }, b = { exec: function (a) { a.container.focusPrevious(!0, a.tabIndex) } }; CKEDITOR.plugins.add("tab", {
                init: function (d) {
                    for (var l =
                        !1 !== d.config.enableTabKeyTools, k = d.config.tabSpaces || 0, m = ""; k--;)m += " "; if (m) d.on("key", function (a) { 9 == a.data.keyCode && (d.insertText(m), a.cancel()) }); if (l) d.on("key", function (a) { (9 == a.data.keyCode && d.execCommand("selectNextCell") || a.data.keyCode == CKEDITOR.SHIFT + 9 && d.execCommand("selectPreviousCell")) && a.cancel() }); d.addCommand("blur", CKEDITOR.tools.extend(f, h)); d.addCommand("blurBack", CKEDITOR.tools.extend(b, h)); d.addCommand("selectNextCell", a()); d.addCommand("selectPreviousCell", a(!0))
                }
            })
        })(); CKEDITOR.dom.element.prototype.focusNext =
            function (a, h) {
                var f = void 0 === h ? this.getTabIndex() : h, b, d, l, k, m, g; if (0 >= f) for (m = this.getNextSourceNode(a, CKEDITOR.NODE_ELEMENT); m;) { if (m.isVisible() && 0 === m.getTabIndex()) { l = m; break } m = m.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT) } else for (m = this.getDocument().getBody().getFirst(); m = m.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
                    if (!b) if (!d && m.equals(this)) { if (d = !0, a) { if (!(m = m.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break; b = 1 } } else d && !this.contains(m) && (b = 1); if (m.isVisible() && !(0 > (g = m.getTabIndex()))) {
                        if (b &&
                            g == f) { l = m; break } g > f && (!l || !k || g < k) ? (l = m, k = g) : l || 0 !== g || (l = m, k = g)
                    }
                } l && l.focus()
            }; CKEDITOR.dom.element.prototype.focusPrevious = function (a, h) {
                for (var f = void 0 === h ? this.getTabIndex() : h, b, d, l, k = 0, m, g = this.getDocument().getBody().getLast(); g = g.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
                    if (!b) if (!d && g.equals(this)) { if (d = !0, a) { if (!(g = g.getPreviousSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break; b = 1 } } else d && !this.contains(g) && (b = 1); if (g.isVisible() && !(0 > (m = g.getTabIndex()))) if (0 >= f) {
                        if (b && 0 === m) { l = g; break } m >
                            k && (l = g, k = m)
                    } else { if (b && m == f) { l = g; break } m < f && (!l || m > k) && (l = g, k = m) }
                } l && l.focus()
            }; CKEDITOR.plugins.add("table", {
                requires: "dialog", init: function (a) {
                    function h(a) { return CKEDITOR.tools.extend(a || {}, { contextSensitive: 1, refresh: function (a, b) { this.setState(b.contains("table", 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } }) } if (!a.blockless) {
                        var f = a.lang.table; a.addCommand("table", new CKEDITOR.dialogCommand("table", {
                            context: "table", allowedContent: "table{width,height,border-collapse}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];td{border*,background-color,vertical-align,width,height}[colspan,rowspan];" +
                                (a.plugins.dialogadvtab ? "table" + a.plugins.dialogadvtab.allowedContent() : ""), requiredContent: "table", contentTransformations: [["table{width}: sizeToStyle", "table[width]: sizeToAttribute"], ["td: splitBorderShorthand"], [{
                                    element: "table", right: function (a) {
                                        if (a.styles) {
                                            var d; if (a.styles.border) d = CKEDITOR.tools.style.parse.border(a.styles.border); else if (CKEDITOR.env.ie && 8 === CKEDITOR.env.version) {
                                                var f = a.styles; f["border-left"] && f["border-left"] === f["border-right"] && f["border-right"] === f["border-top"] &&
                                                    f["border-top"] === f["border-bottom"] && (d = CKEDITOR.tools.style.parse.border(f["border-top"]))
                                            } d && d.style && "solid" === d.style && d.width && 0 !== parseFloat(d.width) && (a.attributes.border = 1); "collapse" == a.styles["border-collapse"] && (a.attributes.cellspacing = 0)
                                        }
                                    }
                                }]]
                        })); a.addCommand("tableProperties", new CKEDITOR.dialogCommand("tableProperties", h())); a.addCommand("tableDelete", h({
                            exec: function (a) {
                                var d = a.elementPath().contains("table", 1); if (d) {
                                    var f = d.getParent(), h = a.editable(); 1 != f.getChildCount() || f.is("td",
                                        "th") || f.equals(h) || (d = f); a = a.createRange(); a.moveToPosition(d, CKEDITOR.POSITION_BEFORE_START); d.remove(); a.select()
                                }
                            }
                        })); a.ui.addButton && a.ui.addButton("Table", { label: f.toolbar, command: "table", toolbar: "insert,30" }); CKEDITOR.dialog.add("table", this.path + "dialogs/table.js"); CKEDITOR.dialog.add("tableProperties", this.path + "dialogs/table.js"); a.addMenuItems && a.addMenuItems({
                            table: { label: f.menu, command: "tableProperties", group: "table", order: 5 }, tabledelete: {
                                label: f.deleteTable, command: "tableDelete", group: "table",
                                order: 1
                            }
                        }); a.on("doubleclick", function (a) { a.data.element.is("table") && (a.data.dialog = "tableProperties") }); a.contextMenu && a.contextMenu.addListener(function () { return { tabledelete: CKEDITOR.TRISTATE_OFF, table: CKEDITOR.TRISTATE_OFF } })
                    }
                }
            }); (function () {
                function a(a, b) {
                    function e(a) { return b ? b.contains(a) && a.getAscendant("table", !0).equals(b) : !0 } function c(a) {
                        var b = /^(?:td|th)$/; 0 < d.length || a.type != CKEDITOR.NODE_ELEMENT || !b.test(a.getName()) || a.getCustomData("selected_cell") || (CKEDITOR.dom.element.setMarker(g,
                            a, "selected_cell", !0), d.push(a))
                    } var d = [], g = {}; if (!a) return d; for (var f = a.getRanges(), h = 0; h < f.length; h++) { var k = f[h]; if (k.collapsed) (k = k.getCommonAncestor().getAscendant({ td: 1, th: 1 }, !0)) && e(k) && d.push(k); else { var k = new CKEDITOR.dom.walker(k), l; for (k.guard = c; l = k.next();)l.type == CKEDITOR.NODE_ELEMENT && l.is(CKEDITOR.dtd.table) || (l = l.getAscendant({ td: 1, th: 1 }, !0)) && !l.getCustomData("selected_cell") && e(l) && (CKEDITOR.dom.element.setMarker(g, l, "selected_cell", !0), d.push(l)) } } CKEDITOR.dom.element.clearAllMarkers(g);
                    return d
                } function h(b, e) {
                    for (var c = p(b) ? b : a(b), d = c[0], g = d.getAscendant("table"), d = d.getDocument(), f = c[0].getParent(), h = f.$.rowIndex, c = c[c.length - 1], k = c.getParent().$.rowIndex + c.$.rowSpan - 1, c = new CKEDITOR.dom.element(g.$.rows[k]), h = e ? h : k, f = e ? f : c, c = CKEDITOR.tools.buildTableMap(g), g = c[h], h = e ? c[h - 1] : c[h + 1], c = c[0].length, d = d.createElement("tr"), k = 0; g[k] && k < c; k++) {
                        var l; 1 < g[k].rowSpan && h && g[k] == h[k] ? (l = g[k], l.rowSpan += 1) : (l = (new CKEDITOR.dom.element(g[k])).clone(), l.removeAttribute("rowSpan"), l.appendBogus(),
                            d.append(l), l = l.$); k += l.colSpan - 1
                    } e ? d.insertBefore(f) : d.insertAfter(f); return d
                } function f(b) {
                    if (b instanceof CKEDITOR.dom.selection) {
                        var e = b.getRanges(), c = a(b), d = c[0].getAscendant("table"), g = CKEDITOR.tools.buildTableMap(d), h = c[0].getParent().$.rowIndex, c = c[c.length - 1], k = c.getParent().$.rowIndex + c.$.rowSpan - 1, c = []; b.reset(); for (b = h; b <= k; b++) {
                            for (var l = g[b], m = new CKEDITOR.dom.element(d.$.rows[b]), n = 0; n < l.length; n++) {
                                var p = new CKEDITOR.dom.element(l[n]), u = p.getParent().$.rowIndex; 1 == p.$.rowSpan ? p.remove() :
                                    (--p.$.rowSpan, u == b && (u = g[b + 1], u[n - 1] ? p.insertAfter(new CKEDITOR.dom.element(u[n - 1])) : (new CKEDITOR.dom.element(d.$.rows[b + 1])).append(p, 1))); n += p.$.colSpan - 1
                            } c.push(m)
                        } g = d.$.rows; e[0].moveToPosition(d, CKEDITOR.POSITION_BEFORE_START); h = new CKEDITOR.dom.element(g[k + 1] || (0 < h ? g[h - 1] : null) || d.$.parentNode); for (b = c.length; 0 <= b; b--)f(c[b]); return d.$.parentNode ? h : (e[0].select(), null)
                    } b instanceof CKEDITOR.dom.element && (d = b.getAscendant("table"), 1 == d.$.rows.length ? d.remove() : b.remove()); return null
                } function b(a) {
                    for (var b =
                        a.getParent().$.cells, e = 0, c = 0; c < b.length; c++) { var d = b[c], e = e + d.colSpan; if (d == a.$) break } return e - 1
                } function d(a, e) { for (var c = e ? Infinity : 0, d = 0; d < a.length; d++) { var g = b(a[d]); if (e ? g < c : g > c) c = g } return c } function l(b, e) {
                    for (var c = p(b) ? b : a(b), g = c[0].getAscendant("table"), f = d(c, 1), c = d(c), h = e ? f : c, k = CKEDITOR.tools.buildTableMap(g), g = [], f = [], c = [], l = k.length, m = 0; m < l; m++) { var n = e ? k[m][h - 1] : k[m][h + 1]; g.push(k[m][h]); f.push(n) } for (m = 0; m < l; m++)g[m] && (1 < g[m].colSpan && f[m] == g[m] ? (k = g[m], k.colSpan += 1) : (h = new CKEDITOR.dom.element(g[m]),
                        k = h.clone(), k.removeAttribute("colSpan"), k.appendBogus(), k[e ? "insertBefore" : "insertAfter"].call(k, h), c.push(k), k = k.$), m += k.rowSpan - 1); return c
                } function k(b) {
                    function e(a) {
                        var b = a.getRanges(), c, d; if (1 !== b.length) return a; b = b[0]; if (b.collapsed || 0 !== b.endOffset) return a; c = b.endContainer; d = c.getName().toLowerCase(); if ("td" !== d && "th" !== d) return a; for ((d = c.getPrevious()) || (d = c.getParent().getPrevious().getLast()); d.type !== CKEDITOR.NODE_TEXT && "br" !== d.getName().toLowerCase();)if (d = d.getLast(), !d) return a;
                        b.setEndAt(d, CKEDITOR.POSITION_BEFORE_END); return b.select()
                    } CKEDITOR.env.webkit && !b.isFake && (b = e(b)); var c = b.getRanges(), d = a(b), g = d[0], f = d[d.length - 1], d = g.getAscendant("table"), h = CKEDITOR.tools.buildTableMap(d), k, l, m = []; b.reset(); var n = 0; for (b = h.length; n < b; n++)for (var p = 0, u = h[n].length; p < u; p++)void 0 === k && h[n][p] == g.$ && (k = p), h[n][p] == f.$ && (l = p); for (n = k; n <= l; n++)for (p = 0; p < h.length; p++)f = h[p], g = new CKEDITOR.dom.element(d.$.rows[p]), f = new CKEDITOR.dom.element(f[n]), f.$ && (1 == f.$.colSpan ? f.remove() : --f.$.colSpan,
                        p += f.$.rowSpan - 1, g.$.cells.length || m.push(g)); k = h[0].length - 1 > l ? new CKEDITOR.dom.element(h[0][l + 1]) : k && -1 !== h[0][k - 1].cellIndex ? new CKEDITOR.dom.element(h[0][k - 1]) : new CKEDITOR.dom.element(d.$.parentNode); m.length == b && (c[0].moveToPosition(d, CKEDITOR.POSITION_AFTER_END), c[0].select(), d.remove()); return k
                } function m(a, b) { var e = a.getStartElement().getAscendant({ td: 1, th: 1 }, !0); if (e) { var c = e.clone(); c.appendBogus(); b ? c.insertBefore(e) : c.insertAfter(e) } } function g(b) {
                    if (b instanceof CKEDITOR.dom.selection) {
                        var c =
                            b.getRanges(), d = a(b), f = d[0] && d[0].getAscendant("table"), h; a: { var k = 0; h = d.length - 1; for (var l = {}, m, n; m = d[k++];)CKEDITOR.dom.element.setMarker(l, m, "delete_cell", !0); for (k = 0; m = d[k++];)if ((n = m.getPrevious()) && !n.getCustomData("delete_cell") || (n = m.getNext()) && !n.getCustomData("delete_cell")) { CKEDITOR.dom.element.clearAllMarkers(l); h = n; break a } CKEDITOR.dom.element.clearAllMarkers(l); k = d[0].getParent(); (k = k.getPrevious()) ? h = k.getLast() : (k = d[h].getParent(), h = (k = k.getNext()) ? k.getChild(0) : null) } b.reset(); for (b =
                                d.length - 1; 0 <= b; b--)g(d[b]); h ? e(h, !0) : f && (c[0].moveToPosition(f, CKEDITOR.POSITION_BEFORE_START), c[0].select(), f.remove())
                    } else b instanceof CKEDITOR.dom.element && (c = b.getParent(), 1 == c.getChildCount() ? c.remove() : b.remove())
                } function e(a, b) { var e = a.getDocument(), c = CKEDITOR.document; CKEDITOR.env.ie && 10 == CKEDITOR.env.version && (c.focus(), e.focus()); e = new CKEDITOR.dom.range(e); e["moveToElementEdit" + (b ? "End" : "Start")](a) || (e.selectNodeContents(a), e.collapse(b ? !1 : !0)); e.select(!0) } function c(a, b, e) {
                    a = a[b];
                    if ("undefined" == typeof e) return a; for (b = 0; a && b < a.length; b++) { if (e.is && a[b] == e.$) return b; if (b == e) return new CKEDITOR.dom.element(a[b]) } return e.is ? -1 : null
                } function n(b, e, d) {
                    var g = a(b), f; if ((e ? 1 != g.length : 2 > g.length) || (f = b.getCommonAncestor()) && f.type == CKEDITOR.NODE_ELEMENT && f.is("table")) return !1; b = g[0]; f = b.getAscendant("table"); var h = CKEDITOR.tools.buildTableMap(f), k = h.length, l = h[0].length, m = b.getParent().$.rowIndex, n = c(h, m, b), p; if (e) {
                        var u; try {
                            var w = parseInt(b.getAttribute("rowspan"), 10) || 1; p = parseInt(b.getAttribute("colspan"),
                                10) || 1; u = h["up" == e ? m - w : "down" == e ? m + w : m]["left" == e ? n - p : "right" == e ? n + p : n]
                        } catch (x) { return !1 } if (!u || b.$ == u) return !1; g["up" == e || "left" == e ? "unshift" : "push"](new CKEDITOR.dom.element(u))
                    } e = b.getDocument(); var K = m, w = u = 0, S = !d && new CKEDITOR.dom.documentFragment(e), I = 0; for (e = 0; e < g.length; e++) {
                        p = g[e]; var F = p.getParent(), P = p.getFirst(), M = p.$.colSpan, O = p.$.rowSpan, F = F.$.rowIndex, N = c(h, F, p), I = I + M * O, w = Math.max(w, N - n + M); u = Math.max(u, F - m + O); d || (M = p, (O = M.getBogus()) && O.remove(), M.trim(), p.getChildren().count() && (F ==
                            K || !P || P.isBlockBoundary && P.isBlockBoundary({ br: 1 }) || (K = S.getLast(CKEDITOR.dom.walker.whitespaces(!0)), !K || K.is && K.is("br") || S.append("br")), p.moveChildren(S)), e ? p.remove() : p.setHtml("")); K = F
                    } if (d) return u * w == I; S.moveChildren(b); b.appendBogus(); w >= l ? b.removeAttribute("rowSpan") : b.$.rowSpan = u; u >= k ? b.removeAttribute("colSpan") : b.$.colSpan = w; d = new CKEDITOR.dom.nodeList(f.$.rows); g = d.count(); for (e = g - 1; 0 <= e; e--)f = d.getItem(e), f.$.cells.length || (f.remove(), g++); return b
                } function u(b, e) {
                    var d = a(b); if (1 <
                        d.length) return !1; if (e) return !0; var d = d[0], g = d.getParent(), f = g.getAscendant("table"), h = CKEDITOR.tools.buildTableMap(f), k = g.$.rowIndex, l = c(h, k, d), m = d.$.rowSpan, n; if (1 < m) { n = Math.ceil(m / 2); for (var m = Math.floor(m / 2), g = k + n, f = new CKEDITOR.dom.element(f.$.rows[g]), h = c(h, g), p, g = d.clone(), k = 0; k < h.length; k++)if (p = h[k], p.parentNode == f.$ && k > l) { g.insertBefore(new CKEDITOR.dom.element(p)); break } else p = null; p || f.append(g) } else for (m = n = 1, f = g.clone(), f.insertAfter(g), f.append(g = d.clone()), p = c(h, k), l = 0; l < p.length; l++)p[l].rowSpan++;
                    g.appendBogus(); d.$.rowSpan = n; g.$.rowSpan = m; 1 == n && d.removeAttribute("rowSpan"); 1 == m && g.removeAttribute("rowSpan"); return g
                } function w(b, e) {
                    var d = a(b); if (1 < d.length) return !1; if (e) return !0; var d = d[0], g = d.getParent(), f = g.getAscendant("table"), f = CKEDITOR.tools.buildTableMap(f), h = c(f, g.$.rowIndex, d), k = d.$.colSpan; if (1 < k) g = Math.ceil(k / 2), k = Math.floor(k / 2); else { for (var k = g = 1, l = [], m = 0; m < f.length; m++) { var n = f[m]; l.push(n[h]); 1 < n[h].rowSpan && (m += n[h].rowSpan - 1) } for (f = 0; f < l.length; f++)l[f].colSpan++ } f = d.clone();
                    f.insertAfter(d); f.appendBogus(); d.$.colSpan = g; f.$.colSpan = k; 1 == g && d.removeAttribute("colSpan"); 1 == k && f.removeAttribute("colSpan"); return f
                } var p = CKEDITOR.tools.isArray; CKEDITOR.plugins.tabletools = {
                    requires: "table,dialog,contextmenu", init: function (b) {
                        function c(a) { return CKEDITOR.tools.extend(a || {}, { contextSensitive: 1, refresh: function (a, b) { this.setState(b.contains({ td: 1, th: 1 }, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } }) } function d(a, e) { var c = b.addCommand(a, e); b.addFeature(c) } var p = b.lang.table,
                            x = CKEDITOR.tools.style.parse, t = "td{width} td{height} td{border-color} td{background-color} td{white-space} td{vertical-align} td{text-align} td[colspan] td[rowspan] th".split(" "); d("cellProperties", new CKEDITOR.dialogCommand("cellProperties", c({
                                allowedContent: "td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]", requiredContent: t, contentTransformations: [[{
                                    element: "td", left: function (a) { return a.styles.background && x.background(a.styles.background).color },
                                    right: function (a) { a.styles["background-color"] = x.background(a.styles.background).color }
                                }, { element: "td", check: "td{vertical-align}", left: function (a) { return a.attributes && a.attributes.valign }, right: function (a) { a.styles["vertical-align"] = a.attributes.valign; delete a.attributes.valign } }], [{
                                    element: "tr", check: "td{height}", left: function (a) { return a.styles && a.styles.height }, right: function (a) {
                                        CKEDITOR.tools.array.forEach(a.children, function (b) { b.name in { td: 1, th: 1 } && (b.attributes["cke-row-height"] = a.styles.height) });
                                        delete a.styles.height
                                    }
                                }], [{ element: "td", check: "td{height}", left: function (a) { return (a = a.attributes) && a["cke-row-height"] }, right: function (a) { a.styles.height = a.attributes["cke-row-height"]; delete a.attributes["cke-row-height"] } }]]
                            }))); CKEDITOR.dialog.add("cellProperties", this.path + "dialogs/tableCell.js"); d("rowDelete", c({ requiredContent: "table", exec: function (a) { a = a.getSelection(); (a = f(a)) && e(a) } })); d("rowInsertBefore", c({ requiredContent: "table", exec: function (b) { b = b.getSelection(); b = a(b); h(b, !0) } }));
                        d("rowInsertAfter", c({ requiredContent: "table", exec: function (b) { b = b.getSelection(); b = a(b); h(b) } })); d("columnDelete", c({ requiredContent: "table", exec: function (a) { a = a.getSelection(); (a = k(a)) && e(a, !0) } })); d("columnInsertBefore", c({ requiredContent: "table", exec: function (b) { b = b.getSelection(); b = a(b); l(b, !0) } })); d("columnInsertAfter", c({ requiredContent: "table", exec: function (b) { b = b.getSelection(); b = a(b); l(b) } })); d("cellDelete", c({ requiredContent: "table", exec: function (a) { a = a.getSelection(); g(a) } })); d("cellMerge",
                            c({ allowedContent: "td[colspan,rowspan]", requiredContent: "td[colspan,rowspan]", exec: function (a, b) { b.cell = n(a.getSelection()); e(b.cell, !0) } })); d("cellMergeRight", c({ allowedContent: "td[colspan]", requiredContent: "td[colspan]", exec: function (a, b) { b.cell = n(a.getSelection(), "right"); e(b.cell, !0) } })); d("cellMergeDown", c({ allowedContent: "td[rowspan]", requiredContent: "td[rowspan]", exec: function (a, b) { b.cell = n(a.getSelection(), "down"); e(b.cell, !0) } })); d("cellVerticalSplit", c({
                                allowedContent: "td[rowspan]", requiredContent: "td[rowspan]",
                                exec: function (a) { e(w(a.getSelection())) }
                            })); d("cellHorizontalSplit", c({ allowedContent: "td[colspan]", requiredContent: "td[colspan]", exec: function (a) { e(u(a.getSelection())) } })); d("cellInsertBefore", c({ requiredContent: "table", exec: function (a) { a = a.getSelection(); m(a, !0) } })); d("cellInsertAfter", c({ requiredContent: "table", exec: function (a) { a = a.getSelection(); m(a) } })); b.addMenuItems && b.addMenuItems({
                                tablecell: {
                                    label: p.cell.menu, group: "tablecell", order: 1, getItems: function () {
                                        var e = b.getSelection(), c = a(e), e =
                                        {
                                            tablecell_insertBefore: CKEDITOR.TRISTATE_OFF, tablecell_insertAfter: CKEDITOR.TRISTATE_OFF, tablecell_delete: CKEDITOR.TRISTATE_OFF, tablecell_merge: n(e, null, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_merge_right: n(e, "right", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_merge_down: n(e, "down", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_split_vertical: w(e, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, tablecell_split_horizontal: u(e, !0) ? CKEDITOR.TRISTATE_OFF :
                                                CKEDITOR.TRISTATE_DISABLED
                                        }; b.filter.check(t) && (e.tablecell_properties = 0 < c.length ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); return e
                                    }
                                }, tablecell_insertBefore: { label: p.cell.insertBefore, group: "tablecell", command: "cellInsertBefore", order: 5 }, tablecell_insertAfter: { label: p.cell.insertAfter, group: "tablecell", command: "cellInsertAfter", order: 10 }, tablecell_delete: { label: p.cell.deleteCell, group: "tablecell", command: "cellDelete", order: 15 }, tablecell_merge: {
                                    label: p.cell.merge, group: "tablecell", command: "cellMerge",
                                    order: 16
                                }, tablecell_merge_right: { label: p.cell.mergeRight, group: "tablecell", command: "cellMergeRight", order: 17 }, tablecell_merge_down: { label: p.cell.mergeDown, group: "tablecell", command: "cellMergeDown", order: 18 }, tablecell_split_horizontal: { label: p.cell.splitHorizontal, group: "tablecell", command: "cellHorizontalSplit", order: 19 }, tablecell_split_vertical: { label: p.cell.splitVertical, group: "tablecell", command: "cellVerticalSplit", order: 20 }, tablecell_properties: {
                                    label: p.cell.title, group: "tablecellproperties", command: "cellProperties",
                                    order: 21
                                }, tablerow: { label: p.row.menu, group: "tablerow", order: 1, getItems: function () { return { tablerow_insertBefore: CKEDITOR.TRISTATE_OFF, tablerow_insertAfter: CKEDITOR.TRISTATE_OFF, tablerow_delete: CKEDITOR.TRISTATE_OFF } } }, tablerow_insertBefore: { label: p.row.insertBefore, group: "tablerow", command: "rowInsertBefore", order: 5 }, tablerow_insertAfter: { label: p.row.insertAfter, group: "tablerow", command: "rowInsertAfter", order: 10 }, tablerow_delete: { label: p.row.deleteRow, group: "tablerow", command: "rowDelete", order: 15 },
                                tablecolumn: { label: p.column.menu, group: "tablecolumn", order: 1, getItems: function () { return { tablecolumn_insertBefore: CKEDITOR.TRISTATE_OFF, tablecolumn_insertAfter: CKEDITOR.TRISTATE_OFF, tablecolumn_delete: CKEDITOR.TRISTATE_OFF } } }, tablecolumn_insertBefore: { label: p.column.insertBefore, group: "tablecolumn", command: "columnInsertBefore", order: 5 }, tablecolumn_insertAfter: { label: p.column.insertAfter, group: "tablecolumn", command: "columnInsertAfter", order: 10 }, tablecolumn_delete: {
                                    label: p.column.deleteColumn, group: "tablecolumn",
                                    command: "columnDelete", order: 15
                                }
                            }); b.contextMenu && b.contextMenu.addListener(function (a, b, e) { return (a = e.contains({ td: 1, th: 1 }, 1)) && !a.isReadOnly() ? { tablecell: CKEDITOR.TRISTATE_OFF, tablerow: CKEDITOR.TRISTATE_OFF, tablecolumn: CKEDITOR.TRISTATE_OFF } : null })
                    }, getCellColIndex: b, insertRow: h, insertColumn: l, getSelectedCells: a
                }; CKEDITOR.plugins.add("tabletools", CKEDITOR.plugins.tabletools)
            })(); CKEDITOR.tools.buildTableMap = function (a, h, f, b, d) {
                a = a.$.rows; f = f || 0; b = "number" === typeof b ? b : a.length - 1; d = "number" === typeof d ?
                    d : -1; var l = -1, k = []; for (h = h || 0; h <= b; h++) { l++; !k[l] && (k[l] = []); for (var m = -1, g = f; g <= (-1 === d ? a[h].cells.length - 1 : d); g++) { var e = a[h].cells[g]; if (!e) break; for (m++; k[l][m];)m++; for (var c = isNaN(e.colSpan) ? 1 : e.colSpan, e = isNaN(e.rowSpan) ? 1 : e.rowSpan, n = 0; n < e && !(h + n > b); n++) { k[l + n] || (k[l + n] = []); for (var u = 0; u < c; u++)k[l + n][m + u] = a[h].cells[g] } m += c - 1; if (-1 !== d && m >= d) break } } return k
            }; (function () {
                function a(a) { return CKEDITOR.plugins.widget && CKEDITOR.plugins.widget.isDomWidget(a) } function h(a, b) {
                    var e = a.getAscendant("table"),
                    c = b.getAscendant("table"), d = CKEDITOR.tools.buildTableMap(e), f = g(a), h = g(b), k = [], l = {}, m, n; e.contains(c) && (b = b.getAscendant({ td: 1, th: 1 }), h = g(b)); f > h && (e = f, f = h, h = e, e = a, a = b, b = e); for (e = 0; e < d[f].length; e++)if (a.$ === d[f][e]) { m = e; break } for (e = 0; e < d[h].length; e++)if (b.$ === d[h][e]) { n = e; break } m > n && (e = m, m = n, n = e); for (e = f; e <= h; e++)for (f = m; f <= n; f++)c = new CKEDITOR.dom.element(d[e][f]), c.$ && !c.getCustomData("selected_cell") && (k.push(c), CKEDITOR.dom.element.setMarker(l, c, "selected_cell", !0)); CKEDITOR.dom.element.clearAllMarkers(l);
                    return k
                } function f(a) { return (a = a.editable().findOne(".cke_table-faked-selection")) && a.getAscendant("table") } function b(a, b) {
                    var e = a.editable().find(".cke_table-faked-selection"), c = a.editable().findOne("[data-cke-table-faked-selection-table]"), d; a.fire("lockSnapshot"); a.editable().removeClass("cke_table-faked-selection-editor"); for (d = 0; d < e.count(); d++)e.getItem(d).removeClass("cke_table-faked-selection"); c && c.data("cke-table-faked-selection-table", !1); a.fire("unlockSnapshot"); b && (q = { active: !1 }, a.getSelection().isInTable() &&
                        a.getSelection().reset())
                } function d(a, b) { var e = [], c, d; for (d = 0; d < b.length; d++)c = a.createRange(), c.setStartBefore(b[d]), c.setEndAfter(b[d]), e.push(c); a.getSelection().selectRanges(e) } function l(a) { var b = a.editable().find(".cke_table-faked-selection"); 1 > b.count() || (b = h(b.getItem(0), b.getItem(b.count() - 1)), d(a, b)) } function k(e, c, g) {
                    var f = x(e.getSelection(!0)); c = c.is("table") ? null : c; var k; (k = q.active && !q.first) && !(k = c) && (k = e.getSelection().getRanges(), k = 1 < f.length || k[0] && !k[0].collapsed ? !0 : !1); if (k) q.first =
                        c || f[0], q.dirty = c ? !1 : 1 !== f.length; else if (q.active && c && q.first.getAscendant("table").equals(c.getAscendant("table"))) { f = h(q.first, c); if (!q.dirty && 1 === f.length && !a(g.data.getTarget())) return b(e, "mouseup" === g.name); q.dirty = !0; q.last = c; d(e, f) }
                } function m(a) {
                    var e = (a = a.editor || a.sender.editor) && a.getSelection(), c = e && e.getRanges() || [], d = c && c[0].getEnclosedNode(), d = d && d.type == CKEDITOR.NODE_ELEMENT && d.is("img"), g; if (e && (b(a), e.isInTable() && e.isFake)) if (d) a.getSelection().reset(); else if (!c[0]._getTableElement({ table: 1 }).hasAttribute("data-cke-tableselection-ignored")) {
                        1 ===
                        c.length && c[0]._getTableElement() && c[0]._getTableElement().is("table") && (g = c[0]._getTableElement()); g = x(e, g); a.fire("lockSnapshot"); for (e = 0; e < g.length; e++)g[e].addClass("cke_table-faked-selection"); 0 < g.length && (a.editable().addClass("cke_table-faked-selection-editor"), g[0].getAscendant("table").data("cke-table-faked-selection-table", "")); a.fire("unlockSnapshot")
                    }
                } function g(a) { return a.getAscendant("tr", !0).$.rowIndex } function e(c) {
                    function d(a, b) {
                        return a && b ? a.equals(b) || a.contains(b) || b.contains(a) ||
                            a.getCommonAncestor(b).is(t) : !1
                    } function g(a) { return !a.getAscendant("table", !0) && a.getDocument().equals(m.document) } function h(a, b, e, c) { if ("mousedown" === a.name && (CKEDITOR.tools.getMouseButton(a) === CKEDITOR.MOUSE_BUTTON_LEFT || !c)) return !0; if (b = a.name === (CKEDITOR.env.gecko ? "mousedown" : "mouseup") && !g(a.data.getTarget())) a = a.data.getTarget().getAscendant({ td: 1, th: 1 }, !0), b = !(a && a.hasClass("cke_table-faked-selection")); return b } if (c.data.getTarget().getName && ("mouseup" === c.name || !a(c.data.getTarget()))) {
                        var m =
                            c.editor || c.listenerData.editor, n = m.getSelection(1), p = f(m), u = c.data.getTarget(), r = u && u.getAscendant({ td: 1, th: 1 }, !0), u = u && u.getAscendant("table", !0), t = { table: 1, thead: 1, tbody: 1, tfoot: 1, tr: 1, td: 1, th: 1 }; u && u.hasAttribute("data-cke-tableselection-ignored") || (h(c, n, p, u) && b(m, !0), !q.active && "mousedown" === c.name && CKEDITOR.tools.getMouseButton(c) === CKEDITOR.MOUSE_BUTTON_LEFT && u && (q = { active: !0 }, CKEDITOR.document.on("mouseup", e, null, { editor: m })), (r || u) && k(m, r || u, c), "mouseup" === c.name && (CKEDITOR.tools.getMouseButton(c) ===
                                CKEDITOR.MOUSE_BUTTON_LEFT && (g(c.data.getTarget()) || d(p, u)) && l(m), q = { active: !1 }, CKEDITOR.document.removeListener("mouseup", e)))
                    }
                } function c(a) { var b = a.data.getTarget().getAscendant("table", !0); q.active = !1; b && b.hasAttribute("data-cke-tableselection-ignored") || (a = a.data.getTarget().getAscendant({ td: 1, th: 1 }, !0), !a || a.hasClass("cke_table-faked-selection")) } function n(a, b) {
                    function e(a) { a.cancel() } var c = a.getSelection(), d = c.createBookmarks(), g = a.document, f = a.createRange(), h = g.getDocumentElement().$, k =
                        CKEDITOR.env.ie && 9 > CKEDITOR.env.version, l = a.blockless || CKEDITOR.env.ie ? "span" : "div", m, n, p, q; g.getById("cke_table_copybin") || (m = g.createElement(l), n = g.createElement(l), n.setAttributes({ id: "cke_table_copybin", "data-cke-temp": "1" }), m.setStyles({ position: "absolute", width: "1px", height: "1px", overflow: "hidden" }), m.setStyle("ltr" == a.config.contentsLangDirection ? "left" : "right", "-5000px"), m.setHtml(a.getSelectedHtml(!0)), a.fire("lockSnapshot"), n.append(m), a.editable().append(n), q = a.on("selectionChange", e, null,
                            null, 0), k && (p = h.scrollTop), f.selectNodeContents(m), f.select(), k && (h.scrollTop = p), setTimeout(function () { n.remove(); c.selectBookmarks(d); q.removeListener(); a.fire("unlockSnapshot"); b && (a.extractSelectedHtml(), a.fire("saveSnapshot")) }, 100))
                } function u(a) { var b = a.editor || a.sender.editor, e = b.getSelection(); e.isInTable() && (e.getRanges()[0]._getTableElement({ table: 1 }).hasAttribute("data-cke-tableselection-ignored") || n(b, "cut" === a.name)) } function w(a) { this._reset(); a && this.setSelectedCells(a) } function p(a,
                    b, e) { a.on("beforeCommandExec", function (e) { -1 !== CKEDITOR.tools.array.indexOf(b, e.data.name) && (e.data.selectedCells = x(a.getSelection())) }); a.on("afterCommandExec", function (c) { -1 !== CKEDITOR.tools.array.indexOf(b, c.data.name) && e(a, c.data) }) } var q = { active: !1 }, r, x, v, D, t; w.prototype = {}; w.prototype._reset = function () { this.cells = { first: null, last: null, all: [] }; this.rows = { first: null, last: null } }; w.prototype.setSelectedCells = function (a) {
                        this._reset(); a = a.slice(0); this._arraySortByDOMOrder(a); this.cells.all = a; this.cells.first =
                            a[0]; this.cells.last = a[a.length - 1]; this.rows.first = a[0].getAscendant("tr"); this.rows.last = this.cells.last.getAscendant("tr")
                    }; w.prototype.getTableMap = function () { var a = v(this.cells.first), b; a: { b = this.cells.last; var e = b.getAscendant("table"), c = g(b), e = CKEDITOR.tools.buildTableMap(e), d; for (d = 0; d < e[c].length; d++)if ((new CKEDITOR.dom.element(e[c][d])).equals(b)) { b = d; break a } b = void 0 } return CKEDITOR.tools.buildTableMap(this._getTable(), g(this.rows.first), a, g(this.rows.last), b) }; w.prototype._getTable = function () { return this.rows.first.getAscendant("table") };
                w.prototype.insertRow = function (a, b, e) { if ("undefined" === typeof a) a = 1; else if (0 >= a) return; for (var c = this.cells.first.$.cellIndex, d = this.cells.last.$.cellIndex, g = e ? [] : this.cells.all, f, h = 0; h < a; h++)f = D(e ? this.cells.all : g, b), f = CKEDITOR.tools.array.filter(f.find("td, th").toArray(), function (a) { return e ? !0 : a.$.cellIndex >= c && a.$.cellIndex <= d }), g = b ? f.concat(g) : g.concat(f); this.setSelectedCells(g) }; w.prototype.insertColumn = function (a) {
                    function b(a) { a = g(a); return a >= d && a <= f } if ("undefined" === typeof a) a = 1; else if (0 >=
                        a) return; for (var e = this.cells, c = e.all, d = g(e.first), f = g(e.last), e = 0; e < a; e++)c = c.concat(CKEDITOR.tools.array.filter(t(c), b)); this.setSelectedCells(c)
                }; w.prototype.emptyCells = function (a) { a = a || this.cells.all; for (var b = 0; b < a.length; b++)a[b].setHtml("") }; w.prototype._arraySortByDOMOrder = function (a) { a.sort(function (a, b) { return a.getPosition(b) & CKEDITOR.POSITION_PRECEDING ? -1 : 1 }) }; var y = {
                    onPaste: function (a) {
                        function b(a) { var e = c.createRange(); e.selectNodeContents(a); e.select() } function e(a) {
                            return Math.max.apply(null,
                                CKEDITOR.tools.array.map(a, function (a) { return a.length }, 0))
                        } var c = a.editor, g = c.getSelection(), f = x(g), k = g.isInTable(!0) && this.isBoundarySelection(g), l = this.findTableInPastedContent(c, a.data.dataValue), m, n; (function (a, b, e, c) {
                            a = a.getRanges(); var d = a.length && a[0]._getTableElement({ table: 1 }); if (!b.length || d && d.hasAttribute("data-cke-tableselection-ignored") || c && !e) return !1; if (b = !c) (b = a[0]) ? (b = b.clone(), b.enlarge(CKEDITOR.ENLARGE_ELEMENT), b = (b = b.getEnclosedNode()) && b.is && b.is(CKEDITOR.dtd.$tableContent)) :
                                b = void 0, b = !b; return b ? !1 : !0
                        })(g, f, l, k) && "drop" !== a.data.method && (f = f[0].getAscendant("table"), m = new w(x(g, f)), c.once("afterPaste", function () { var a; if (n) { a = new CKEDITOR.dom.element(n[0][0]); var b = n[n.length - 1]; a = h(a, new CKEDITOR.dom.element(b[b.length - 1])) } else a = m.cells.all; d(c, a) }), l ? (a.stop(), k ? (m.insertRow(1, 1 === k, !0), g.selectElement(m.rows.first)) : (m.emptyCells(), d(c, m.cells.all)), a = m.getTableMap(), n = CKEDITOR.tools.buildTableMap(l), m.insertRow(n.length - a.length), m.insertColumn(e(n) - e(a)), a = m.getTableMap(),
                            this.pasteTable(m, a, n), c.fire("saveSnapshot"), setTimeout(function () { c.fire("afterPaste") }, 0)) : (b(m.cells.first), c.once("afterPaste", function () { c.fire("lockSnapshot"); m.emptyCells(m.cells.all.slice(1)); d(c, m.cells.all); c.fire("unlockSnapshot") })))
                    }, isBoundarySelection: function (a) { a = a.getRanges()[0]; var b = a.endContainer.getAscendant("tr", !0); if (b && a.collapsed) { if (a.checkBoundaryOfElement(b, CKEDITOR.START)) return 1; if (a.checkBoundaryOfElement(b, CKEDITOR.END)) return 2 } return 0 }, findTableInPastedContent: function (a,
                        b) { var e = a.dataProcessor, c = new CKEDITOR.dom.element("body"); e || (e = new CKEDITOR.htmlDataProcessor(a)); c.setHtml(e.toHtml(b), { fixForBody: !1 }); return 1 < c.getChildCount() ? null : c.findOne("table") }, pasteTable: function (a, b, e) {
                            var c, d = v(a.cells.first), g = a._getTable(), f = {}, h, k, l, m; for (l = 0; l < e.length; l++)for (h = new CKEDITOR.dom.element(g.$.rows[a.rows.first.$.rowIndex + l]), m = 0; m < e[l].length; m++)if (k = new CKEDITOR.dom.element(e[l][m]), c = b[l] && b[l][m] ? new CKEDITOR.dom.element(b[l][m]) : null, k && !k.getCustomData("processed")) {
                                if (c &&
                                    c.getParent()) k.replace(c); else if (0 === m || e[l][m - 1]) (c = 0 !== m ? new CKEDITOR.dom.element(e[l][m - 1]) : null) && h.equals(c.getParent()) ? k.insertAfter(c) : 0 < d ? h.$.cells[d] ? k.insertAfter(new CKEDITOR.dom.element(h.$.cells[d])) : h.append(k) : h.append(k, !0); CKEDITOR.dom.element.setMarker(f, k, "processed", !0)
                            } else k.getCustomData("processed") && c && c.remove(); CKEDITOR.dom.element.clearAllMarkers(f)
                        }
                }; CKEDITOR.plugins.tableselection = {
                    getCellsBetween: h, keyboardIntegration: function (a) {
                        function b(a) {
                            var e = a.getEnclosedNode();
                            e && "function" === typeof e.is && e.is({ td: 1, th: 1 }) ? e.setText("") : a.deleteContents(); CKEDITOR.tools.array.forEach(a._find("td"), function (a) { a.appendBogus() })
                        } var e = a.editable(); e.attachListener(e, "keydown", function (a) {
                            function e(b, c) {
                                if (!c.length) return null; var g = a.createRange(), f = CKEDITOR.dom.range.mergeRanges(c); CKEDITOR.tools.array.forEach(f, function (a) { a.enlarge(CKEDITOR.ENLARGE_ELEMENT) }); var h = f[0].getBoundaryNodes(), k = h.startNode, h = h.endNode; if (k && k.is && k.is(d)) {
                                    for (var l = k.getAscendant("table",
                                        !0), m = k.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT, l), n = !1, p = function (a) { return !k.contains(a) && a.is && a.is("td", "th") }; m && !p(m);)m = m.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT, l); !m && h && h.is && !h.is("table") && h.getNext() && (m = h.getNext().findOne("td, th"), n = !0); if (m) g["moveToElementEdit" + (n ? "Start" : "End")](m); else g.setStartBefore(k.getAscendant("table", !0)), g.collapse(!0); f[0].deleteContents(); return [g]
                                } if (k) return g.moveToElementEditablePosition(k), [g]
                            } var c = { 37: 1, 38: 1, 39: 1, 40: 1, 8: 1, 46: 1, 13: 1 },
                                d = CKEDITOR.tools.extend({ table: 1 }, CKEDITOR.dtd.$tableContent); delete d.td; delete d.th; return function (d) {
                                    var g = d.data.getKey(), f = d.data.getKeystroke(), h, k = 37 === g || 38 == g, l, m, n; if (c[g] && !a.readOnly && (h = a.getSelection()) && h.isInTable() && h.isFake) {
                                        l = h.getRanges(); m = l[0]._getTableElement(); n = l[l.length - 1]._getTableElement(); if (13 !== g || a.plugins.enterkey) d.data.preventDefault(), d.cancel(); if (36 < g && 41 > g) l[0].moveToElementEditablePosition(k ? m : n, !k), h.selectRanges([l[0]]); else if (13 !== g || 13 === f || f === CKEDITOR.SHIFT +
                                            13) { for (d = 0; d < l.length; d++)b(l[d]); (d = e(m, l)) ? l = d : l[0].moveToElementEditablePosition(m); h.selectRanges(l); 13 === g && a.plugins.enterkey ? (a.fire("lockSnapshot"), 13 === f ? a.execCommand("enter") : a.execCommand("shiftEnter"), a.fire("unlockSnapshot"), a.fire("saveSnapshot")) : 13 !== g && a.fire("saveSnapshot") }
                                    }
                                }
                        }(a), null, null, -1); e.attachListener(e, "keypress", function (e) {
                            var c = a.getSelection(), d = e.data.$.charCode || 13 === e.data.getKey(), g; if (!a.readOnly && c && c.isInTable() && c.isFake && d && !(e.data.getKeystroke() & CKEDITOR.CTRL)) {
                                e =
                                c.getRanges(); d = e[0].getEnclosedNode().getAscendant({ td: 1, th: 1 }, !0); for (g = 0; g < e.length; g++)b(e[g]); d && (e[0].moveToElementEditablePosition(d), c.selectRanges([e[0]]))
                            }
                        }, null, null, -1)
                    }
                }; CKEDITOR.plugins.add("tableselection", {
                    requires: "clipboard,tabletools", isSupportedEnvironment: function () { return !(CKEDITOR.env.ie && 11 > CKEDITOR.env.version) }, onLoad: function () {
                        r = CKEDITOR.plugins.tabletools; x = r.getSelectedCells; v = r.getCellColIndex; D = r.insertRow; t = r.insertColumn; CKEDITOR.document.appendStyleSheet(this.path +
                            "styles/tableselection.css")
                    }, init: function (a) {
                        this.isSupportedEnvironment() && (a.addContentsCss && a.addContentsCss(this.path + "styles/tableselection.css"), a.on("contentDom", function () {
                            var b = a.editable(), d = b.isInline() ? b : a.document, g = { editor: a }; b.attachListener(d, "mousedown", e, null, g); b.attachListener(d, "mousemove", e, null, g); b.attachListener(d, "mouseup", e, null, g); b.attachListener(b, "dragstart", c); b.attachListener(a, "selectionCheck", m); CKEDITOR.plugins.tableselection.keyboardIntegration(a); CKEDITOR.plugins.clipboard &&
                                !CKEDITOR.plugins.clipboard.isCustomCopyCutSupported && (b.attachListener(b, "cut", u), b.attachListener(b, "copy", u))
                        }), a.on("paste", y.onPaste, y), p(a, "rowInsertBefore rowInsertAfter columnInsertBefore columnInsertAfter cellInsertBefore cellInsertAfter".split(" "), function (a, b) { d(a, b.selectedCells) }), p(a, ["cellMerge", "cellMergeRight", "cellMergeDown"], function (a, b) { d(a, [b.commandData.cell]) }), p(a, ["cellDelete"], function (a) { b(a, !0) }))
                    }
                })
            })(); (function () {
                CKEDITOR.plugins.add("templates", {
                    requires: "dialog,ajax",
                    init: function (a) { CKEDITOR.dialog.add("templates", CKEDITOR.getUrl(this.path + "dialogs/templates.js")); a.addCommand("templates", new CKEDITOR.dialogCommand("templates")); a.ui.addButton && a.ui.addButton("Templates", { label: a.lang.templates.button, command: "templates", toolbar: "doctools,10" }) }
                }); var a = {}, h = {}; CKEDITOR.addTemplates = function (f, b) { a[f] = b }; CKEDITOR.getTemplates = function (f) { return a[f] }; CKEDITOR.loadTemplates = function (a, b) {
                    for (var d = [], l = 0, k = a.length; l < k; l++)h[a[l]] || (d.push(a[l]), h[a[l]] = 1); d.length ?
                        CKEDITOR.scriptLoader.load(d, b) : setTimeout(b, 0)
                }
            })(); CKEDITOR.config.templates_files = [CKEDITOR.getUrl("plugins/templates/templates/default.js")]; CKEDITOR.config.templates_replaceContent = !0; "use strict"; (function () {
                function a(a, b) { return CKEDITOR.tools.array.reduce(b, function (a, b) { return b(a) }, a) } var h = [CKEDITOR.CTRL + 90, CKEDITOR.CTRL + 89, CKEDITOR.CTRL + CKEDITOR.SHIFT + 90], f = { 8: 1, 46: 1 }; CKEDITOR.plugins.add("undo", {
                    init: function (a) {
                        function e(a) { d.enabled && !1 !== a.data.command.canUndo && d.save() } function c() {
                            d.enabled =
                            a.readOnly ? !1 : "wysiwyg" == a.mode; d.onChange()
                        } var d = a.undoManager = new b(a), f = d.editingHandler = new k(d), l = a.addCommand("undo", { exec: function () { d.undo() && (a.selectionChange(), this.fire("afterUndo")) }, startDisabled: !0, canUndo: !1 }), m = a.addCommand("redo", { exec: function () { d.redo() && (a.selectionChange(), this.fire("afterRedo")) }, startDisabled: !0, canUndo: !1 }); a.setKeystroke([[h[0], "undo"], [h[1], "redo"], [h[2], "redo"]]); d.onChange = function () {
                            l.setState(d.undoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                            m.setState(d.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                        }; a.on("beforeCommandExec", e); a.on("afterCommandExec", e); a.on("saveSnapshot", function (a) { d.save(a.data && a.data.contentOnly) }); a.on("contentDom", f.attachListeners, f); a.on("instanceReady", function () { a.fire("saveSnapshot") }); a.on("beforeModeUnload", function () { "wysiwyg" == a.mode && d.save(!0) }); a.on("mode", c); a.on("readOnly", c); a.ui.addButton && (a.ui.addButton("Undo", { label: a.lang.undo.undo, command: "undo", toolbar: "undo,10" }), a.ui.addButton("Redo",
                            { label: a.lang.undo.redo, command: "redo", toolbar: "undo,20" })); a.resetUndo = function () { d.reset(); a.fire("saveSnapshot") }; a.on("updateSnapshot", function () { d.currentImage && d.update() }); a.on("lockSnapshot", function (a) { a = a.data; d.lock(a && a.dontUpdate, a && a.forceUpdate) }); a.on("unlockSnapshot", d.unlock, d)
                    }
                }); CKEDITOR.plugins.undo = {}; var b = CKEDITOR.plugins.undo.UndoManager = function (a) {
                    this.strokesRecorded = [0, 0]; this.locked = null; this.previousKeyGroup = -1; this.limit = a.config.undoStackSize || 20; this.strokesLimit =
                        25; this._filterRules = []; this.editor = a; this.reset(); CKEDITOR.env.ie && this.addFilterRule(function (a) { return a.replace(/\s+data-cke-expando=".*?"/g, "") })
                }; b.prototype = {
                    type: function (a, e) { var c = b.getKeyGroup(a), d = this.strokesRecorded[c] + 1; e = e || d >= this.strokesLimit; this.typing || (this.hasUndo = this.typing = !0, this.hasRedo = !1, this.onChange()); e ? (d = 0, this.editor.fire("saveSnapshot")) : this.editor.fire("change"); this.strokesRecorded[c] = d; this.previousKeyGroup = c }, keyGroupChanged: function (a) {
                        return b.getKeyGroup(a) !=
                            this.previousKeyGroup
                    }, reset: function () { this.snapshots = []; this.index = -1; this.currentImage = null; this.hasRedo = this.hasUndo = !1; this.locked = null; this.resetType() }, resetType: function () { this.strokesRecorded = [0, 0]; this.typing = !1; this.previousKeyGroup = -1 }, refreshState: function () { this.hasUndo = !!this.getNextImage(!0); this.hasRedo = !!this.getNextImage(!1); this.resetType(); this.onChange() }, save: function (a, b, c) {
                        var f = this.editor; if (this.locked || "ready" != f.status || "wysiwyg" != f.mode) return !1; var h = f.editable(); if (!h ||
                            "ready" != h.status) return !1; h = this.snapshots; b || (b = new d(f)); if (!1 === b.contents) return !1; if (this.currentImage) if (b.equalsContent(this.currentImage)) { if (a || b.equalsSelection(this.currentImage)) return !1 } else !1 !== c && f.fire("change"); h.splice(this.index + 1, h.length - this.index - 1); h.length == this.limit && h.shift(); this.index = h.push(b) - 1; this.currentImage = b; !1 !== c && this.refreshState(); return !0
                    }, restoreImage: function (a) {
                        var b = this.editor, c; a.bookmarks && (b.focus(), c = b.getSelection()); this.locked = { level: 999 }; this.editor.loadSnapshot(a.contents);
                        a.bookmarks ? c.selectBookmarks(a.bookmarks) : CKEDITOR.env.ie && (c = this.editor.document.getBody().$.createTextRange(), c.collapse(!0), c.select()); this.locked = null; this.index = a.index; this.currentImage = this.snapshots[this.index]; this.update(); this.refreshState(); b.fire("change")
                    }, getNextImage: function (a) {
                        var b = this.snapshots, c = this.currentImage, d; if (c) if (a) for (d = this.index - 1; 0 <= d; d--) { if (a = b[d], !c.equalsContent(a)) return a.index = d, a } else for (d = this.index + 1; d < b.length; d++)if (a = b[d], !c.equalsContent(a)) return a.index =
                            d, a; return null
                    }, redoable: function () { return this.enabled && this.hasRedo }, undoable: function () { return this.enabled && this.hasUndo }, undo: function () { if (this.undoable()) { this.save(!0); var a = this.getNextImage(!0); if (a) return this.restoreImage(a), !0 } return !1 }, redo: function () { if (this.redoable() && (this.save(!0), this.redoable())) { var a = this.getNextImage(!1); if (a) return this.restoreImage(a), !0 } return !1 }, update: function (a) {
                        if (!this.locked) {
                            a || (a = new d(this.editor)); for (var b = this.index, c = this.snapshots; 0 < b && this.currentImage.equalsContent(c[b -
                                1]);)--b; c.splice(b, this.index - b + 1, a); this.index = b; this.currentImage = a
                        }
                    }, updateSelection: function (a) { if (!this.snapshots.length) return !1; var b = this.snapshots, c = b[b.length - 1]; return c.equalsContent(a) && !c.equalsSelection(a) ? (this.currentImage = b[b.length - 1] = a, !0) : !1 }, lock: function (a, b) { if (this.locked) this.locked.level++; else if (a) this.locked = { level: 1 }; else { var c = null; if (b) c = !0; else { var f = new d(this.editor, !0); this.currentImage && this.currentImage.equalsContent(f) && (c = f) } this.locked = { update: c, level: 1 } } },
                    unlock: function () { if (this.locked && !--this.locked.level) { var a = this.locked.update; this.locked = null; if (!0 === a) this.update(); else if (a) { var b = new d(this.editor, !0); a.equalsContent(b) || this.update() } } }, addFilterRule: function (a) { this._filterRules.push(a) }
                }; b.navigationKeyCodes = { 37: 1, 38: 1, 39: 1, 40: 1, 36: 1, 35: 1, 33: 1, 34: 1 }; b.keyGroups = { PRINTABLE: 0, FUNCTIONAL: 1 }; b.isNavigationKey = function (a) { return !!b.navigationKeyCodes[a] }; b.getKeyGroup = function (a) { var e = b.keyGroups; return f[a] ? e.FUNCTIONAL : e.PRINTABLE }; b.getOppositeKeyGroup =
                    function (a) { var e = b.keyGroups; return a == e.FUNCTIONAL ? e.PRINTABLE : e.FUNCTIONAL }; b.ieFunctionalKeysBug = function (a) { return CKEDITOR.env.ie && b.getKeyGroup(a) == b.keyGroups.FUNCTIONAL }; var d = CKEDITOR.plugins.undo.Image = function (b, e) { this.editor = b; b.fire("beforeUndoImage"); var c = b.getSnapshot(); c && (this.contents = a(c, b.undoManager._filterRules)); e || (this.bookmarks = (c = c && b.getSelection()) && c.createBookmarks2(!0)); b.fire("afterUndoImage") }, l = /\b(?:href|src|name)="[^"]*?"/gi; d.prototype = {
                        equalsContent: function (a) {
                            var b =
                                this.contents; a = a.contents; CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) && (b = b.replace(l, ""), a = a.replace(l, "")); return b != a ? !1 : !0
                        }, equalsSelection: function (a) { var b = this.bookmarks; a = a.bookmarks; if (b || a) { if (!b || !a || b.length != a.length) return !1; for (var c = 0; c < b.length; c++) { var d = b[c], f = a[c]; if (d.startOffset != f.startOffset || d.endOffset != f.endOffset || !CKEDITOR.tools.arrayCompare(d.start, f.start) || !CKEDITOR.tools.arrayCompare(d.end, f.end)) return !1 } } return !0 }
                    }; var k = CKEDITOR.plugins.undo.NativeEditingHandler =
                        function (a) { this.undoManager = a; this.ignoreInputEvent = !1; this.keyEventsStack = new m; this.lastKeydownImage = null }; k.prototype = {
                            onKeydown: function (a) {
                                var e = a.data.getKey(); if (229 !== e) if (-1 < CKEDITOR.tools.indexOf(h, a.data.getKeystroke())) a.data.preventDefault(); else if (this.keyEventsStack.cleanUp(a), a = this.undoManager, this.keyEventsStack.getLast(e) || this.keyEventsStack.push(e), this.lastKeydownImage = new d(a.editor), b.isNavigationKey(e) || this.undoManager.keyGroupChanged(e)) if (a.strokesRecorded[0] || a.strokesRecorded[1]) a.save(!1,
                                    this.lastKeydownImage, !1), a.resetType()
                            }, onInput: function () { if (this.ignoreInputEvent) this.ignoreInputEvent = !1; else { var a = this.keyEventsStack.getLast(); a || (a = this.keyEventsStack.push(0)); this.keyEventsStack.increment(a.keyCode); this.keyEventsStack.getTotalInputs() >= this.undoManager.strokesLimit && (this.undoManager.type(a.keyCode, !0), this.keyEventsStack.resetInputs()) } }, onKeyup: function (a) {
                                var e = this.undoManager; a = a.data.getKey(); var c = this.keyEventsStack.getTotalInputs(); this.keyEventsStack.remove(a);
                                if (!(b.ieFunctionalKeysBug(a) && this.lastKeydownImage && this.lastKeydownImage.equalsContent(new d(e.editor, !0)))) if (0 < c) e.type(a); else if (b.isNavigationKey(a)) this.onNavigationKey(!0)
                            }, onNavigationKey: function (a) { var b = this.undoManager; !a && b.save(!0, null, !1) || b.updateSelection(new d(b.editor)); b.resetType() }, ignoreInputEventListener: function () { this.ignoreInputEvent = !0 }, activateInputEventListener: function () { this.ignoreInputEvent = !1 }, attachListeners: function () {
                                var a = this.undoManager.editor, e = a.editable(),
                                c = this; e.attachListener(e, "keydown", function (a) { c.onKeydown(a); if (b.ieFunctionalKeysBug(a.data.getKey())) c.onInput() }, null, null, 999); e.attachListener(e, CKEDITOR.env.ie ? "keypress" : "input", c.onInput, c, null, 999); e.attachListener(e, "keyup", c.onKeyup, c, null, 999); e.attachListener(e, "paste", c.ignoreInputEventListener, c, null, 999); e.attachListener(e, "drop", c.ignoreInputEventListener, c, null, 999); a.on("afterPaste", c.activateInputEventListener, c, null, 999); e.attachListener(e.isInline() ? e : a.document.getDocumentElement(),
                                    "click", function () { c.onNavigationKey() }, null, null, 999); e.attachListener(this.undoManager.editor, "blur", function () { c.keyEventsStack.remove(9) }, null, null, 999)
                            }
                        }; var m = CKEDITOR.plugins.undo.KeyEventsStack = function () { this.stack = [] }; m.prototype = {
                            push: function (a) { a = this.stack.push({ keyCode: a, inputs: 0 }); return this.stack[a - 1] }, getLastIndex: function (a) { if ("number" != typeof a) return this.stack.length - 1; for (var b = this.stack.length; b--;)if (this.stack[b].keyCode == a) return b; return -1 }, getLast: function (a) {
                                a = this.getLastIndex(a);
                                return -1 != a ? this.stack[a] : null
                            }, increment: function (a) { this.getLast(a).inputs++ }, remove: function (a) { a = this.getLastIndex(a); -1 != a && this.stack.splice(a, 1) }, resetInputs: function (a) { if ("number" == typeof a) this.getLast(a).inputs = 0; else for (a = this.stack.length; a--;)this.stack[a].inputs = 0 }, getTotalInputs: function () { for (var a = this.stack.length, b = 0; a--;)b += this.stack[a].inputs; return b }, cleanUp: function (a) { a = a.data.$; a.ctrlKey || a.metaKey || this.remove(17); a.shiftKey || this.remove(16); a.altKey || this.remove(18) }
                        }
            })();
        "use strict"; (function () {
            function a(a, b) { CKEDITOR.tools.extend(this, { editor: a, editable: a.editable(), doc: a.document, win: a.window }, b, !0); this.inline = this.editable.isInline(); this.inline || (this.frame = this.win.getFrame()); this.target = this[this.inline ? "editable" : "doc"] } function h(a, b) { CKEDITOR.tools.extend(this, b, { editor: a }, !0) } function f(a, b) {
                var c = a.editable(); CKEDITOR.tools.extend(this, { editor: a, editable: c, inline: c.isInline(), doc: a.document, win: a.window, container: CKEDITOR.document.getBody(), winTop: CKEDITOR.document.getWindow() },
                    b, !0); this.hidden = {}; this.visible = {}; this.inline || (this.frame = this.win.getFrame()); this.queryViewport(); var f = CKEDITOR.tools.bind(this.queryViewport, this), h = CKEDITOR.tools.bind(this.hideVisible, this), k = CKEDITOR.tools.bind(this.removeAll, this); c.attachListener(this.winTop, "resize", f); c.attachListener(this.winTop, "scroll", f); c.attachListener(this.winTop, "resize", h); c.attachListener(this.win, "scroll", h); c.attachListener(this.inline ? c : this.frame, "mouseout", function (a) {
                        var b = a.data.$.clientX; a = a.data.$.clientY;
                        this.queryViewport(); (b <= this.rect.left || b >= this.rect.right || a <= this.rect.top || a >= this.rect.bottom) && this.hideVisible(); (0 >= b || b >= this.winTopPane.width || 0 >= a || a >= this.winTopPane.height) && this.hideVisible()
                    }, this); c.attachListener(a, "resize", f); c.attachListener(a, "mode", k); a.on("destroy", k); this.lineTpl = (new CKEDITOR.template('\x3cdiv data-cke-lineutils-line\x3d"1" class\x3d"cke_reset_all" style\x3d"{lineStyle}"\x3e\x3cspan style\x3d"{tipLeftStyle}"\x3e\x26nbsp;\x3c/span\x3e\x3cspan style\x3d"{tipRightStyle}"\x3e\x26nbsp;\x3c/span\x3e\x3c/div\x3e')).output({
                        lineStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},
                            l, this.lineStyle, !0)), tipLeftStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({}, d, { left: "0px", "border-left-color": "red", "border-width": "6px 0 6px 6px" }, this.tipCss, this.tipLeftStyle, !0)), tipRightStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({}, d, { right: "0px", "border-right-color": "red", "border-width": "6px 6px 6px 0" }, this.tipCss, this.tipRightStyle, !0))
                    })
            } function b(a) {
                var b; if (b = a && a.type == CKEDITOR.NODE_ELEMENT) b = !(k[a.getComputedStyle("float")] || k[a.getAttribute("align")]); return b &&
                    !m[a.getComputedStyle("position")]
            } CKEDITOR.plugins.add("lineutils"); CKEDITOR.LINEUTILS_BEFORE = 1; CKEDITOR.LINEUTILS_AFTER = 2; CKEDITOR.LINEUTILS_INSIDE = 4; a.prototype = {
                start: function (a) {
                    var b = this, c = this.editor, d = this.doc, f, h, k, l, m = CKEDITOR.tools.eventsBuffer(50, function () { c.readOnly || "wysiwyg" != c.mode || (b.relations = {}, (h = d.$.elementFromPoint(k, l)) && h.nodeType && (f = new CKEDITOR.dom.element(h), b.traverseSearch(f), isNaN(k + l) || b.pixelSearch(f, k, l), a && a(b.relations, k, l))) }); this.listener = this.editable.attachListener(this.target,
                        "mousemove", function (a) { k = a.data.$.clientX; l = a.data.$.clientY; m.input() }); this.editable.attachListener(this.inline ? this.editable : this.frame, "mouseout", function () { m.reset() })
                }, stop: function () { this.listener && this.listener.removeListener() }, getRange: function () {
                    var a = {}; a[CKEDITOR.LINEUTILS_BEFORE] = CKEDITOR.POSITION_BEFORE_START; a[CKEDITOR.LINEUTILS_AFTER] = CKEDITOR.POSITION_AFTER_END; a[CKEDITOR.LINEUTILS_INSIDE] = CKEDITOR.POSITION_AFTER_START; return function (b) {
                        var c = this.editor.createRange(); c.moveToPosition(this.relations[b.uid].element,
                            a[b.type]); return c
                    }
                }(), store: function () { function a(b, c, d) { var f = b.getUniqueId(); f in d ? d[f].type |= c : d[f] = { element: b, type: c } } return function (e, c) { var d; c & CKEDITOR.LINEUTILS_AFTER && b(d = e.getNext()) && d.isVisible() && (a(d, CKEDITOR.LINEUTILS_BEFORE, this.relations), c ^= CKEDITOR.LINEUTILS_AFTER); c & CKEDITOR.LINEUTILS_INSIDE && b(d = e.getFirst()) && d.isVisible() && (a(d, CKEDITOR.LINEUTILS_BEFORE, this.relations), c ^= CKEDITOR.LINEUTILS_INSIDE); a(e, c, this.relations) } }(), traverseSearch: function (a) {
                    var e, c, d; do if (d = a.$["data-cke-expando"],
                        !(d && d in this.relations)) { if (a.equals(this.editable)) break; if (b(a)) for (e in this.lookups) (c = this.lookups[e](a)) && this.store(a, c) } while ((!a || a.type != CKEDITOR.NODE_ELEMENT || "true" != a.getAttribute("contenteditable")) && (a = a.getParent()))
                }, pixelSearch: function () {
                    function a(c, d, f, g, h) { for (var k = 0, l; h(f);) { f += g; if (25 == ++k) break; if (l = this.doc.$.elementFromPoint(d, f)) if (l == c) k = 0; else if (e(c, l) && (k = 0, b(l = new CKEDITOR.dom.element(l)))) return l } } var e = CKEDITOR.env.ie || CKEDITOR.env.webkit ? function (a, b) { return a.contains(b) } :
                        function (a, b) { return !!(a.compareDocumentPosition(b) & 16) }; return function (c, e, d) { var f = this.win.getViewPaneSize().height, h = a.call(this, c.$, e, d, -1, function (a) { return 0 < a }); e = a.call(this, c.$, e, d, 1, function (a) { return a < f }); if (h) for (this.traverseSearch(h); !h.getParent().equals(c);)h = h.getParent(); if (e) for (this.traverseSearch(e); !e.getParent().equals(c);)e = e.getParent(); for (; h || e;) { h && (h = h.getNext(b)); if (!h || h.equals(e)) break; this.traverseSearch(h); e && (e = e.getPrevious(b)); if (!e || e.equals(h)) break; this.traverseSearch(e) } }
                }(),
                greedySearch: function () { this.relations = {}; for (var a = this.editable.getElementsByTag("*"), e = 0, c, d, f; c = a.getItem(e++);)if (!c.equals(this.editable) && c.type == CKEDITOR.NODE_ELEMENT && (c.hasAttribute("contenteditable") || !c.isReadOnly()) && b(c) && c.isVisible()) for (f in this.lookups) (d = this.lookups[f](c)) && this.store(c, d); return this.relations }
            }; h.prototype = {
                locate: function () {
                    function a(e, c) {
                        var d = e.element[c === CKEDITOR.LINEUTILS_BEFORE ? "getPrevious" : "getNext"](); return d && b(d) ? (e.siblingRect = d.getClientRect(),
                            c == CKEDITOR.LINEUTILS_BEFORE ? (e.siblingRect.bottom + e.elementRect.top) / 2 : (e.elementRect.bottom + e.siblingRect.top) / 2) : c == CKEDITOR.LINEUTILS_BEFORE ? e.elementRect.top : e.elementRect.bottom
                    } return function (b) {
                        var c; this.locations = {}; for (var d in b) c = b[d], c.elementRect = c.element.getClientRect(), c.type & CKEDITOR.LINEUTILS_BEFORE && this.store(d, CKEDITOR.LINEUTILS_BEFORE, a(c, CKEDITOR.LINEUTILS_BEFORE)), c.type & CKEDITOR.LINEUTILS_AFTER && this.store(d, CKEDITOR.LINEUTILS_AFTER, a(c, CKEDITOR.LINEUTILS_AFTER)), c.type &
                            CKEDITOR.LINEUTILS_INSIDE && this.store(d, CKEDITOR.LINEUTILS_INSIDE, (c.elementRect.top + c.elementRect.bottom) / 2); return this.locations
                    }
                }(), sort: function () { var a, b, c, d; return function (f, h) { a = this.locations; b = []; for (var k in a) for (var l in a[k]) if (c = Math.abs(f - a[k][l]), b.length) { for (d = 0; d < b.length; d++)if (c < b[d].dist) { b.splice(d, 0, { uid: +k, type: l, dist: c }); break } d == b.length && b.push({ uid: +k, type: l, dist: c }) } else b.push({ uid: +k, type: l, dist: c }); return "undefined" != typeof h ? b.slice(0, h) : b } }(), store: function (a,
                    b, c) { this.locations[a] || (this.locations[a] = {}); this.locations[a][b] = c }
            }; var d = { display: "block", width: "0px", height: "0px", "border-color": "transparent", "border-style": "solid", position: "absolute", top: "-6px" }, l = { height: "0px", "border-top": "1px dashed red", position: "absolute", "z-index": 9999 }; f.prototype = {
                removeAll: function () { for (var a in this.hidden) this.hidden[a].remove(), delete this.hidden[a]; for (a in this.visible) this.visible[a].remove(), delete this.visible[a] }, hideLine: function (a) {
                    var b = a.getUniqueId();
                    a.hide(); this.hidden[b] = a; delete this.visible[b]
                }, showLine: function (a) { var b = a.getUniqueId(); a.show(); this.visible[b] = a; delete this.hidden[b] }, hideVisible: function () { for (var a in this.visible) this.hideLine(this.visible[a]) }, placeLine: function (a, b) {
                    var c, d, f; if (c = this.getStyle(a.uid, a.type)) {
                        for (f in this.visible) if (this.visible[f].getCustomData("hash") !== this.hash) { d = this.visible[f]; break } if (!d) for (f in this.hidden) if (this.hidden[f].getCustomData("hash") !== this.hash) {
                            this.showLine(d = this.hidden[f]);
                            break
                        } d || this.showLine(d = this.addLine()); d.setCustomData("hash", this.hash); this.visible[d.getUniqueId()] = d; d.setStyles(c); b && b(d)
                    }
                }, getStyle: function (a, b) {
                    var c = this.relations[a], d = this.locations[a][b], f = {}; f.width = c.siblingRect ? Math.max(c.siblingRect.width, c.elementRect.width) : c.elementRect.width; f.top = this.inline ? d + this.winTopScroll.y - this.rect.relativeY : this.rect.top + this.winTopScroll.y + d; if (f.top - this.winTopScroll.y < this.rect.top || f.top - this.winTopScroll.y > this.rect.bottom) return !1; this.inline ?
                        f.left = c.elementRect.left - this.rect.relativeX : (0 < c.elementRect.left ? f.left = this.rect.left + c.elementRect.left : (f.width += c.elementRect.left, f.left = this.rect.left), 0 < (c = f.left + f.width - (this.rect.left + this.winPane.width)) && (f.width -= c)); f.left += this.winTopScroll.x; for (var h in f) f[h] = CKEDITOR.tools.cssLength(f[h]); return f
                }, addLine: function () { var a = CKEDITOR.dom.element.createFromHtml(this.lineTpl); a.appendTo(this.container); return a }, prepare: function (a, b) { this.relations = a; this.locations = b; this.hash = Math.random() },
                cleanup: function () { var a, b; for (b in this.visible) a = this.visible[b], a.getCustomData("hash") !== this.hash && this.hideLine(a) }, queryViewport: function () { this.winPane = this.win.getViewPaneSize(); this.winTopScroll = this.winTop.getScrollPosition(); this.winTopPane = this.winTop.getViewPaneSize(); this.rect = this.getClientRect(this.inline ? this.editable : this.frame) }, getClientRect: function (a) {
                    a = a.getClientRect(); var b = this.container.getDocumentPosition(), c = this.container.getComputedStyle("position"); a.relativeX = a.relativeY =
                        0; "static" != c && (a.relativeY = b.y, a.relativeX = b.x, a.top -= a.relativeY, a.bottom -= a.relativeY, a.left -= a.relativeX, a.right -= a.relativeX); return a
                }
            }; var k = { left: 1, right: 1, center: 1 }, m = { absolute: 1, fixed: 1 }; CKEDITOR.plugins.lineutils = { finder: a, locator: h, liner: f }
        })(); (function () {
            function a(a) { return a.getName && !a.hasAttribute("data-cke-temp") } CKEDITOR.plugins.add("widgetselection", {
                init: function (a) {
                    if (CKEDITOR.env.webkit) {
                        var f = CKEDITOR.plugins.widgetselection; a.on("contentDom", function (a) {
                            a = a.editor; var d =
                                a.editable(); d.attachListener(d, "keydown", function (a) { a.data.getKeystroke() == CKEDITOR.CTRL + 65 && CKEDITOR.tools.setTimeout(function () { f.addFillers(d) || f.removeFillers(d) }, 0) }, null, null, -1); a.on("selectionCheck", function (a) { f.removeFillers(a.editor.editable()) }); a.on("paste", function (a) { a.data.dataValue = f.cleanPasteData(a.data.dataValue) }); "selectall" in a.plugins && f.addSelectAllIntegration(a)
                        })
                    }
                }
            }); CKEDITOR.plugins.widgetselection = {
                startFiller: null, endFiller: null, fillerAttribute: "data-cke-filler-webkit",
                fillerContent: "\x26nbsp;", fillerTagName: "div", addFillers: function (h) { var f = h.editor; if (!this.isWholeContentSelected(h) && 0 < h.getChildCount()) { var b = h.getFirst(a), d = h.getLast(a); b && b.type == CKEDITOR.NODE_ELEMENT && !b.isEditable() && (this.startFiller = this.createFiller(), h.append(this.startFiller, 1)); d && d.type == CKEDITOR.NODE_ELEMENT && !d.isEditable() && (this.endFiller = this.createFiller(!0), h.append(this.endFiller, 0)); if (this.hasFiller(h)) return f = f.createRange(), f.selectNodeContents(h), f.select(), !0 } return !1 },
                removeFillers: function (a) { if (this.hasFiller(a) && !this.isWholeContentSelected(a)) { var f = a.findOne(this.fillerTagName + "[" + this.fillerAttribute + "\x3dstart]"), b = a.findOne(this.fillerTagName + "[" + this.fillerAttribute + "\x3dend]"); this.startFiller && f && this.startFiller.equals(f) ? this.removeFiller(this.startFiller, a) : this.startFiller = f; this.endFiller && b && this.endFiller.equals(b) ? this.removeFiller(this.endFiller, a) : this.endFiller = b } }, cleanPasteData: function (a) {
                    a && a.length && (a = a.replace(this.createFillerRegex(),
                        "").replace(this.createFillerRegex(!0), "")); return a
                }, isWholeContentSelected: function (a) { var f = a.editor.getSelection().getRanges()[0]; return !f || f && f.collapsed ? !1 : (f = f.clone(), f.enlarge(CKEDITOR.ENLARGE_ELEMENT), !!(f && a && f.startContainer && f.endContainer && 0 === f.startOffset && f.endOffset === a.getChildCount() && f.startContainer.equals(a) && f.endContainer.equals(a))) }, hasFiller: function (a) { return 0 < a.find(this.fillerTagName + "[" + this.fillerAttribute + "]").count() }, createFiller: function (a) {
                    var f = new CKEDITOR.dom.element(this.fillerTagName);
                    f.setHtml(this.fillerContent); f.setAttribute(this.fillerAttribute, a ? "end" : "start"); f.setAttribute("data-cke-temp", 1); f.setStyles({ display: "block", width: 0, height: 0, padding: 0, border: 0, margin: 0, position: "absolute", top: 0, left: "-9999px", opacity: 0, overflow: "hidden" }); return f
                }, removeFiller: function (a, f) {
                    if (a) {
                        var b = f.editor, d = f.editor.getSelection().getRanges()[0].startPath(), l = b.createRange(), k, m; d.contains(a) && (k = a.getHtml(), m = !0); d = "start" == a.getAttribute(this.fillerAttribute); a.remove(); k && 0 < k.length &&
                            k != this.fillerContent ? (f.insertHtmlIntoRange(k, b.getSelection().getRanges()[0]), l.setStartAt(f.getChild(f.getChildCount() - 1), CKEDITOR.POSITION_BEFORE_END), b.getSelection().selectRanges([l])) : m && (d ? l.setStartAt(f.getFirst().getNext(), CKEDITOR.POSITION_AFTER_START) : l.setEndAt(f.getLast().getPrevious(), CKEDITOR.POSITION_BEFORE_END), f.editor.getSelection().selectRanges([l]))
                    }
                }, createFillerRegex: function (a) {
                    var f = this.createFiller(a).getOuterHtml().replace(/style="[^"]*"/gi, 'style\x3d"[^"]*"').replace(/>[^<]*</gi,
                        "\x3e[^\x3c]*\x3c"); return new RegExp((a ? "" : "^") + f + (a ? "$" : ""))
                }, addSelectAllIntegration: function (a) { var f = this; a.editable().attachListener(a, "beforeCommandExec", function (b) { var d = a.editable(); "selectAll" == b.data.name && d && f.addFillers(d) }, null, null, 9999) }
            }
        })(); "use strict"; (function () {
            function a(a) {
                this.editor = a; this.registered = {}; this.instances = {}; this.selected = []; this.widgetHoldingFocusedEditable = this.focused = null; this._ = { nextId: 0, upcasts: [], upcastCallbacks: [], filters: {} }; E(this); C(this); this.on("checkWidgets",
                    k); this.editor.on("contentDomInvalidated", this.checkWidgets, this); B(this); t(this); y(this); D(this); z(this)
            } function h(a, b, c, e, d) {
                var f = a.editor; CKEDITOR.tools.extend(this, e, {
                    editor: f, id: b, inline: "span" == c.getParent().getName(), element: c, data: CKEDITOR.tools.extend({}, "function" == typeof e.defaults ? e.defaults() : e.defaults), dataReady: !1, inited: !1, ready: !1, edit: h.prototype.edit, focusedEditable: null, definition: e, repository: a, draggable: !1 !== e.draggable, _: {
                        downcastFn: e.downcast && "string" == typeof e.downcast ?
                            e.downcasts[e.downcast] : e.downcast
                    }
                }, !0); a.fire("instanceCreated", this); N(this, e); this.init && this.init(); this.inited = !0; (a = this.element.data("cke-widget-data")) && this.setData(JSON.parse(decodeURIComponent(a))); d && this.setData(d); this.data.classes || this.setData("classes", this.getClasses()); this.dataReady = !0; Z(this); this.fire("data", this.data); this.isInited() && f.editable().contains(this.wrapper) && (this.ready = !0, this.fire("ready"))
            } function f(a, b, c) {
                CKEDITOR.dom.element.call(this, b.$); this.editor = a;
                this._ = {}; b = this.filter = c.filter; CKEDITOR.dtd[this.getName()].p ? (this.enterMode = b ? b.getAllowedEnterMode(a.enterMode) : a.enterMode, this.shiftEnterMode = b ? b.getAllowedEnterMode(a.shiftEnterMode, !0) : a.shiftEnterMode) : this.enterMode = this.shiftEnterMode = CKEDITOR.ENTER_BR
            } function b(a, b) {
                a.addCommand(b.name, {
                    exec: function (a, c) {
                        function e() { a.widgets.finalizeCreation(h) } var d = a.widgets.focused; if (d && d.name == b.name) d.edit(); else if (b.insert) b.insert({ editor: a, commandData: c }); else if (b.template) {
                            var d = "function" ==
                                typeof b.defaults ? b.defaults() : b.defaults, d = CKEDITOR.dom.element.createFromHtml(b.template.output(d), a.document), f, g = a.widgets.wrapElement(d, b.name), h = new CKEDITOR.dom.documentFragment(g.getDocument()); h.append(g); (f = a.widgets.initOn(d, b, c && c.startupData)) ? (d = f.once("edit", function (b) {
                                    if (b.data.dialog) f.once("dialog", function (b) {
                                        b = b.data; var c, d; c = b.once("ok", e, null, null, 20); d = b.once("cancel", function (b) { b.data && !1 === b.data.hide || a.widgets.destroy(f, !0) }); b.once("hide", function () {
                                            c.removeListener();
                                            d.removeListener()
                                        })
                                    }); else e()
                                }, null, null, 999), f.edit(), d.removeListener()) : e()
                        }
                    }, allowedContent: b.allowedContent, requiredContent: b.requiredContent, contentForms: b.contentForms, contentTransformations: b.contentTransformations
                })
            } function d(a, b) {
                function c(a, d) { var e = b.upcast.split(","), f, g; for (g = 0; g < e.length; g++)if (f = e[g], f === a.name) return b.upcasts[f].call(this, a, d); return !1 } function e(b, c, d) {
                    var f = CKEDITOR.tools.getIndex(a._.upcasts, function (a) { return a[2] > d }); 0 > f && (f = a._.upcasts.length); a._.upcasts.splice(f,
                        0, [CKEDITOR.tools.bind(b, c), c.name, d])
                } var d = b.upcast, f = b.upcastPriority || 10; d && ("string" == typeof d ? e(c, b, f) : e(d, b, f))
            } function l(a, b) { a.focused = null; if (b.isInited()) { var c = b.editor.checkDirty(); a.fire("widgetBlurred", { widget: b }); b.setFocused(!1); !c && b.editor.resetDirty() } } function k(a) {
                a = a.data; if ("wysiwyg" == this.editor.mode) {
                    var b = this.editor.editable(), c = this.instances, d, e, f, g; if (b) {
                        for (d in c) c[d].isReady() && !b.contains(c[d].wrapper) && this.destroy(c[d], !0); if (a && a.initOnlyNew) c = this.initOnAll();
                        else { var k = b.find(".cke_widget_wrapper"), c = []; d = 0; for (e = k.count(); d < e; d++) { f = k.getItem(d); if (g = !this.getByElement(f, !0)) { a: { g = q; for (var l = f; l = l.getParent();)if (g(l)) { g = !0; break a } g = !1 } g = !g } g && b.contains(f) && (f.addClass("cke_widget_new"), c.push(this.initOn(f.getFirst(h.isDomWidgetElement)))) } } a && a.focusInited && 1 == c.length && c[0].focus()
                    }
                }
            } function m(a) {
                if ("undefined" != typeof a.attributes && a.attributes["data-widget"]) {
                    var b = g(a), c = e(a), d = !1; b && b.value && b.value.match(/^\s/g) && (b.parent.attributes["data-cke-white-space-first"] =
                        1, b.value = b.value.replace(/^\s/g, "\x26nbsp;"), d = !0); c && c.value && c.value.match(/\s$/g) && (c.parent.attributes["data-cke-white-space-last"] = 1, c.value = c.value.replace(/\s$/g, "\x26nbsp;"), d = !0); d && (a.attributes["data-cke-widget-white-space"] = 1)
                }
            } function g(a) { return a.find(function (a) { return 3 === a.type }, !0).shift() } function e(a) { return a.find(function (a) { return 3 === a.type }, !0).pop() } function c(a, b, c) {
                if (!c.allowedContent && !c.disallowedContent) return null; var d = this._.filters[a]; d || (this._.filters[a] = d =
                    {}); a = d[b]; a || (a = c.allowedContent ? new CKEDITOR.filter(c.allowedContent) : this.editor.filter.clone(), d[b] = a, c.disallowedContent && a.disallow(c.disallowedContent)); return a
            } function n(a) {
                var b = [], c = a._.upcasts, d = a._.upcastCallbacks; return {
                    toBeWrapped: b, iterator: function (a) {
                        var e, f, g, k, l; if ("data-cke-widget-wrapper" in a.attributes) return (a = a.getFirst(h.isParserWidgetElement)) && b.push([a]), !1; if ("data-widget" in a.attributes) return b.push([a]), !1; if (l = c.length) {
                            if (a.attributes["data-cke-widget-upcasted"]) return !1;
                            k = 0; for (e = d.length; k < e; ++k)if (!1 === d[k](a)) return; for (k = 0; k < l; ++k)if (e = c[k], g = {}, f = e[0](a, g)) return f instanceof CKEDITOR.htmlParser.element && (a = f), a.attributes["data-cke-widget-data"] = encodeURIComponent(JSON.stringify(g)), a.attributes["data-cke-widget-upcasted"] = 1, b.push([a, e[1]]), !1
                        }
                    }
                }
            } function u(a, b) { return { tabindex: -1, contenteditable: "false", "data-cke-widget-wrapper": 1, "data-cke-filter": "off", "class": "cke_widget_wrapper cke_widget_new cke_widget_" + (a ? "inline" : "block") + (b ? " cke_widget_" + b : "") } }
            function w(a, b, c) { if (a.type == CKEDITOR.NODE_ELEMENT) { var d = CKEDITOR.dtd[a.name]; if (d && !d[c.name]) { var d = a.split(b), e = a.parent; b = d.getIndex(); a.children.length || (--b, a.remove()); d.children.length || d.remove(); return w(e, b, c) } } a.add(c, b) } function p(a, b) { return "boolean" == typeof a.inline ? a.inline : !!CKEDITOR.dtd.$inline[b] } function q(a) { return a.hasAttribute("data-cke-temp") } function r(a, b, c, d) {
                var e = a.editor; e.fire("lockSnapshot"); c ? (d = c.data("cke-widget-editable"), d = b.editables[d], a.widgetHoldingFocusedEditable =
                    b, b.focusedEditable = d, c.addClass("cke_widget_editable_focused"), d.filter && e.setActiveFilter(d.filter), e.setActiveEnterMode(d.enterMode, d.shiftEnterMode)) : (d || b.focusedEditable.removeClass("cke_widget_editable_focused"), b.focusedEditable = null, a.widgetHoldingFocusedEditable = null, e.setActiveFilter(null), e.setActiveEnterMode(null, null)); e.fire("unlockSnapshot")
            } function x(a) { a.contextMenu && a.contextMenu.addListener(function (b) { if (b = a.widgets.getByElement(b, !0)) return b.fire("contextMenu", {}) }) } function v(a,
                b) { return CKEDITOR.tools.trim(b) } function D(a) {
                    var b = a.editor, c = CKEDITOR.plugins.lineutils; b.on("dragstart", function (c) { var d = c.data.target; h.isDomDragHandler(d) && (d = a.getByElement(d), c.data.dataTransfer.setData("cke/widget-id", d.id), b.focus(), d.focus()) }); b.on("drop", function (c) {
                        function d(a, b) { return a && b ? a.wrapper.equals(b.wrapper) || a.wrapper.contains(b.wrapper) : !1 } var e = c.data.dataTransfer, f = e.getData("cke/widget-id"), g = e.getTransferType(b), e = b.createRange(), h = function (a) {
                            a = a.getBoundaryNodes().startNode;
                            a.type !== CKEDITOR.NODE_ELEMENT && (a = a.getParent()); return b.widgets.getByElement(a)
                        }(c.data.dropRange); if ("" !== f && g === CKEDITOR.DATA_TRANSFER_CROSS_EDITORS) c.cancel(); else if (g == CKEDITOR.DATA_TRANSFER_INTERNAL) if ("" === f && 0 < b.widgets.selected.length) c.data.dataTransfer.setData("text/html", O(b)); else if (f = a.instances[f]) d(f, h) ? c.cancel() : (e.setStartBefore(f.wrapper), e.setEndAfter(f.wrapper), c.data.dragRange = e, delete CKEDITOR.plugins.clipboard.dragStartContainerChildCount, delete CKEDITOR.plugins.clipboard.dragEndContainerChildCount,
                            c.data.dataTransfer.setData("text/html", f.getClipboardHtml()), b.widgets.destroy(f, !0))
                    }); b.on("contentDom", function () {
                        var d = b.editable(); CKEDITOR.tools.extend(a, {
                            finder: new c.finder(b, {
                                lookups: {
                                    "default": function (b) {
                                        if (!b.is(CKEDITOR.dtd.$listItem) && b.is(CKEDITOR.dtd.$block) && !h.isDomNestedEditable(b) && !a._.draggedWidget.wrapper.contains(b)) {
                                            var c = h.getNestedEditable(d, b); if (c) {
                                                b = a._.draggedWidget; if (a.getByElement(c) == b) return; c = CKEDITOR.filter.instances[c.data("cke-filter")]; b = b.requiredContent;
                                                if (c && b && !c.check(b)) return
                                            } return CKEDITOR.LINEUTILS_BEFORE | CKEDITOR.LINEUTILS_AFTER
                                        }
                                    }
                                }
                            }), locator: new c.locator(b), liner: new c.liner(b, { lineStyle: { cursor: "move !important", "border-top-color": "#666" }, tipLeftStyle: { "border-left-color": "#666" }, tipRightStyle: { "border-right-color": "#666" } })
                        }, !0)
                    })
                } function t(a) {
                    var b = a.editor; b.on("contentDom", function () {
                        var c = b.editable(), d = c.isInline() ? c : b.document, e, f; c.attachListener(d, "mousedown", function (c) {
                            var d = c.data.getTarget(); e = d instanceof CKEDITOR.dom.element ?
                                a.getByElement(d) : null; f = 0; e && (e.inline && d.type == CKEDITOR.NODE_ELEMENT && d.hasAttribute("data-cke-widget-drag-handler") ? (f = 1, a.focused != e && b.getSelection().removeAllRanges()) : h.getNestedEditable(e.wrapper, d) ? e = null : (c.data.preventDefault(), CKEDITOR.env.ie || e.focus()))
                        }); c.attachListener(d, "mouseup", function () { f && e && e.wrapper && (f = 0, e.focus()) }); CKEDITOR.env.ie && c.attachListener(d, "mouseup", function () { setTimeout(function () { e && e.wrapper && c.contains(e.wrapper) && (e.focus(), e = null) }) })
                    }); b.on("doubleclick",
                        function (b) { var c = a.getByElement(b.data.element); if (c && !h.getNestedEditable(c.wrapper, b.data.element)) return c.fire("doubleclick", { element: b.data.element }) }, null, null, 1)
                } function y(a) {
                    a.editor.on("key", function (b) {
                        var c = a.focused, d = a.widgetHoldingFocusedEditable, e; c ? e = c.fire("key", { keyCode: b.data.keyCode }) : d && (c = b.data.keyCode, b = d.focusedEditable, c == CKEDITOR.CTRL + 65 ? (c = b.getBogus(), d = d.editor.createRange(), d.selectNodeContents(b), c && d.setEndAt(c, CKEDITOR.POSITION_BEFORE_START), d.select(), e = !1) : 8 ==
                            c || 46 == c ? (e = d.editor.getSelection().getRanges(), d = e[0], e = !(1 == e.length && d.collapsed && d.checkBoundaryOfElement(b, CKEDITOR[8 == c ? "START" : "END"]))) : e = void 0); return e
                    }, null, null, 1)
                } function z(a) { function b(d) { 1 > a.selected.length || I(c, "cut" === d.name) } var c = a.editor; c.on("contentDom", function () { var a = c.editable(); a.attachListener(a, "copy", b); a.attachListener(a, "cut", b) }) } function B(a) {
                    function b() {
                        var a = e.getSelection(); if (a && (a = a.getRanges()[0]) && !a.collapsed) {
                            var d = c(a.startContainer), f = c(a.endContainer);
                            !d && f ? (a.setEndBefore(f.wrapper), a.select()) : d && !f && (a.setStartAfter(d.wrapper), a.select())
                        }
                    } function c(a) { return a ? a.type == CKEDITOR.NODE_TEXT ? c(a.getParent()) : e.widgets.getByElement(a) : null } function d() { a.fire("checkSelection") } var e = a.editor; e.on("selectionCheck", d); e.on("contentDom", function () { e.editable().attachListener(e, "key", function () { setTimeout(d, 10) }) }); if (!CKEDITOR.env.ie) a.on("checkSelection", b); a.on("checkSelection", a.checkSelection, a); e.on("selectionChange", function (b) {
                        var c = (b = h.getNestedEditable(e.editable(),
                            b.data.selection.getStartElement())) && a.getByElement(b), d = a.widgetHoldingFocusedEditable; d ? d === c && d.focusedEditable.equals(b) || (r(a, d, null), c && b && r(a, c, b)) : c && b && r(a, c, b)
                    }); e.on("dataReady", function () { G(a).commit() }); e.on("blur", function () { var b; (b = a.focused) && l(a, b); (b = a.widgetHoldingFocusedEditable) && r(a, b, null) })
                } function C(a) {
                    var b = a.editor, c = {}; b.on("toDataFormat", function (b) {
                        var d = CKEDITOR.tools.getNextNumber(), f = []; b.data.downcastingSessionId = d; c[d] = f; b.data.dataValue.forEach(function (b) {
                            var c =
                                b.attributes, d; if ("data-cke-widget-white-space" in c) { d = g(b); var k = e(b); d.parent.attributes["data-cke-white-space-first"] && (d.value = d.value.replace(/^&nbsp;/g, " ")); k.parent.attributes["data-cke-white-space-last"] && (k.value = k.value.replace(/&nbsp;$/g, " ")) } if ("data-cke-widget-id" in c) { if (c = a.instances[c["data-cke-widget-id"]]) d = b.getFirst(h.isParserWidgetElement), f.push({ wrapper: b, element: d, widget: c, editables: {} }), "1" != d.attributes["data-cke-widget-keep-attr"] && delete d.attributes["data-widget"] } else if ("data-cke-widget-editable" in
                                    c) return 0 < f.length && (f[f.length - 1].editables[c["data-cke-widget-editable"]] = b), !1
                        }, CKEDITOR.NODE_ELEMENT, !0)
                    }, null, null, 8); b.on("toDataFormat", function (a) {
                        if (a.data.downcastingSessionId) for (var b = c[a.data.downcastingSessionId], d, e, f, g, h, k; d = b.shift();) {
                            e = d.widget; f = d.element; g = e._.downcastFn && e._.downcastFn.call(e, f); a.data.widgetsCopy && e.getClipboardHtml && (g = CKEDITOR.htmlParser.fragment.fromHtml(e.getClipboardHtml()), g = g.children[0]); for (k in d.editables) h = d.editables[k], delete h.attributes.contenteditable,
                                h.setHtml(e.editables[k].getData()); g || (g = f); d.wrapper.replaceWith(g)
                        }
                    }, null, null, 13); b.on("contentDomUnload", function () { a.destroyAll(!0) })
                } function E(a) {
                    var b = a.editor, c, d; b.on("toHtml", function (b) {
                        var d = n(a), e; for (b.data.dataValue.forEach(d.iterator, CKEDITOR.NODE_ELEMENT, !0); e = d.toBeWrapped.pop();) { var f = e[0], g = f.parent; g.type == CKEDITOR.NODE_ELEMENT && g.attributes["data-cke-widget-wrapper"] && g.replaceWith(f); a.wrapElement(e[0], e[1]) } c = b.data.protectedWhitespaces ? 3 == b.data.dataValue.children.length &&
                            h.isParserWidgetWrapper(b.data.dataValue.children[1]) : 1 == b.data.dataValue.children.length && h.isParserWidgetWrapper(b.data.dataValue.children[0])
                    }, null, null, 8); b.on("dataReady", function () { if (d) for (var c = b.editable().find(".cke_widget_wrapper"), e, f, g = 0, k = c.count(); g < k; ++g)e = c.getItem(g), f = e.getFirst(h.isDomWidgetElement), f.type == CKEDITOR.NODE_ELEMENT && f.data("widget") ? (f.replace(e), a.wrapElement(f)) : e.remove(); d = 0; a.destroyAll(!0); a.initOnAll() }); b.on("loadSnapshot", function (b) {
                        /data-cke-widget/.test(b.data) &&
                        (d = 1); a.destroyAll(!0)
                    }, null, null, 9); b.on("paste", function (a) { a = a.data; a.dataValue = a.dataValue.replace(ca, v); a.range && (a = h.getNestedEditable(b.editable(), a.range.startContainer)) && (a = CKEDITOR.filter.instances[a.data("cke-filter")]) && b.setActiveFilter(a) }); b.on("afterInsertHtml", function (d) { d.data.intoRange ? a.checkWidgets({ initOnlyNew: !0 }) : (b.fire("lockSnapshot"), a.checkWidgets({ initOnlyNew: !0, focusInited: c }), b.fire("unlockSnapshot")) })
                } function G(a) {
                    var b = a.selected, c = [], d = b.slice(0), e = null; return {
                        select: function (a) {
                            0 >
                            CKEDITOR.tools.indexOf(b, a) && c.push(a); a = CKEDITOR.tools.indexOf(d, a); 0 <= a && d.splice(a, 1); return this
                        }, focus: function (a) { e = a; return this }, commit: function () {
                            var f = a.focused !== e, g, h; a.editor.fire("lockSnapshot"); for (f && (g = a.focused) && l(a, g); g = d.pop();)b.splice(CKEDITOR.tools.indexOf(b, g), 1), g.isInited() && (h = g.editor.checkDirty(), g.setSelected(!1), !h && g.editor.resetDirty()); f && e && (h = a.editor.checkDirty(), a.focused = e, a.fire("widgetFocused", { widget: e }), e.setFocused(!0), !h && a.editor.resetDirty()); for (; g =
                                c.pop();)b.push(g), g.setSelected(!0); a.editor.fire("unlockSnapshot")
                        }
                    }
                } function H(a) { a && a.addFilterRule(function (a) { return a.replace(/\s*cke_widget_selected/g, "").replace(/\s*cke_widget_focused/g, "") }) } function L(a, b, c) { var d = 0; b = F(b); var e = a.data.classes || {}, f; if (b) { for (e = CKEDITOR.tools.clone(e); f = b.pop();)c ? e[f] || (d = e[f] = 1) : e[f] && (delete e[f], d = 1); d && a.setData("classes", e) } } function K(a) { a.cancel() } function S(a, b) {
                    var c = function (a) { return a == CKEDITOR.ENTER_BR ? "br" : a == CKEDITOR.ENTER_DIV ? "div" : "p" }(a.editor.config.enterMode),
                    d = new CKEDITOR.dom.element(c); "br" !== c && d.appendBogus(); "after" === b ? d.insertAfter(a.wrapper) : d.insertBefore(a.wrapper); (function (b) { var c = a.editor.createRange(); c.setStart(b, 0); a.editor.getSelection().selectRanges([c]) })(d)
                } function I(a, b) {
                    var c = a.widgets.focused, d, e, f; Q.hasCopyBin(a) || (e = new Q(a, {
                        beforeDestroy: function () { !b && c && c.focus(); f && a.getSelection().selectBookmarks(f); d && CKEDITOR.plugins.widgetselection.addFillers(a.editable()) }, afterDestroy: function () {
                            b && !a.readOnly && (c ? a.widgets.del(c) :
                                a.extractSelectedHtml(), a.fire("saveSnapshot"))
                        }
                    }), c || (d = CKEDITOR.env.webkit && CKEDITOR.plugins.widgetselection.isWholeContentSelected(a.editable()), f = a.getSelection().createBookmarks(!0)), e.handle(O(a)))
                } function F(a) { return (a = (a = a.getDefinition().attributes) && a["class"]) ? a.split(/\s+/) : null } function P() { var a = CKEDITOR.document.getActive(), b = this.editor, c = b.editable(); (c.isInline() ? c : b.document.getWindow().getFrame()).equals(a) && b.focusManager.focus(c) } function M() {
                    CKEDITOR.env.gecko && this.editor.unlockSelection();
                    CKEDITOR.env.webkit || (this.editor.forceNextSelectionCheck(), this.editor.selectionChange(1))
                } function O(a) { var b = a.getSelectedHtml(!0); if (a.widgets.focused) return a.widgets.focused.getClipboardHtml(); a.once("toDataFormat", function (a) { a.data.widgetsCopy = !0 }, null, null, -1); return a.dataProcessor.toDataFormat(b) } function N(a, b) {
                    var c = a.editor.config.widget_keystrokeInsertLineBefore, d = a.editor.config.widget_keystrokeInsertLineAfter; X(a); T(a); Y(a); da(a); ia(a); ja(a); ka(a); if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version) a.wrapper.on("dragstart",
                        function (b) { var c = b.data.getTarget(); h.getNestedEditable(a, c) || a.inline && h.isDomDragHandler(c) || b.data.preventDefault() }); a.wrapper.removeClass("cke_widget_new"); a.element.addClass("cke_widget_element"); a.on("key", function (b) {
                            b = b.data.keyCode; if (b == c) S(a, "before"), a.editor.fire("saveSnapshot"); else if (b == d) S(a, "after"), a.editor.fire("saveSnapshot"); else if (13 == b) a.edit(); else {
                                if (b == CKEDITOR.CTRL + 67 || b == CKEDITOR.CTRL + 88) { I(a.editor, b == CKEDITOR.CTRL + 88); return } if (b in V || CKEDITOR.CTRL & b || CKEDITOR.ALT &
                                    b) return
                            } return !1
                        }, null, null, 999); a.on("doubleclick", function (b) { a.edit() && b.cancel() }); if (b.data) a.on("data", b.data); if (b.edit) a.on("edit", b.edit)
                } function X(a) { (a.wrapper = a.element.getParent()).setAttribute("data-cke-widget-id", a.id) } function T(a, b) { a.partSelectors || (a.partSelectors = a.parts); if (a.parts) { var c = {}, d, e; for (e in a.partSelectors) b || !a.parts[e] || "string" == typeof a.parts[e] ? (d = a.wrapper.findOne(a.partSelectors[e]), c[e] = d) : c[e] = a.parts[e]; a.parts = c } } function Y(a) {
                    var b = a.editables, c, d;
                    a.editables = {}; if (a.editables) for (c in b) d = b[c], a.initEditable(c, "string" == typeof d ? { selector: d } : d)
                } function da(a) {
                    if (!0 === a.mask) U(a); else if (a.mask) {
                        var b = new CKEDITOR.tools.buffers.throttle(250, ha, a), c = CKEDITOR.env.gecko ? 300 : 0, d, e; a.on("focus", function () { b.input(); d = a.editor.on("change", b.input); e = a.on("blur", function () { d.removeListener(); e.removeListener() }) }); a.editor.on("instanceReady", function () { setTimeout(function () { b.input() }, c) }); a.editor.on("mode", function () {
                            setTimeout(function () { b.input() },
                                c)
                        }); if (CKEDITOR.env.gecko) { var f = a.element.find("img"); CKEDITOR.tools.array.forEach(f.toArray(), function (a) { a.on("load", function () { b.input() }) }) } for (var g in a.editables) a.editables[g].on("focus", function () { a.editor.on("change", b.input); e && e.removeListener() }), a.editables[g].on("blur", function () { a.editor.removeListener("change", b.input) }); b.input()
                    }
                } function U(a) {
                    var b = a.wrapper.findOne(".cke_widget_mask"); b || (b = new CKEDITOR.dom.element("img", a.editor.document), b.setAttributes({
                        src: CKEDITOR.tools.transparentImageData,
                        "class": "cke_reset cke_widget_mask"
                    }), a.wrapper.append(b)); a.mask = b
                } function ha() {
                    if (this.wrapper) {
                        this.maskPart = this.maskPart || this.mask; var a = this.parts[this.maskPart], b; if (a && "string" != typeof a) {
                            b = this.wrapper.findOne(".cke_widget_partial_mask"); b || (b = new CKEDITOR.dom.element("img", this.editor.document), b.setAttributes({ src: CKEDITOR.tools.transparentImageData, "class": "cke_reset cke_widget_partial_mask" }), this.wrapper.append(b)); this.mask = b; var c = b.$, d = a.$, e = !(c.offsetTop == d.offsetTop && c.offsetLeft ==
                                d.offsetLeft); if (c.offsetWidth != d.offsetWidth || c.offsetHeight != d.offsetHeight || e) c = a.getParent(), d = CKEDITOR.plugins.widget.isDomWidget(c), b.setStyles({ top: a.$.offsetTop + (d ? 0 : c.$.offsetTop) + "px", left: a.$.offsetLeft + (d ? 0 : c.$.offsetLeft) + "px", width: a.$.offsetWidth + "px", height: a.$.offsetHeight + "px" })
                        }
                    }
                } function ia(a) {
                    if (a.draggable) {
                        var b = a.editor, c = a.wrapper.getLast(h.isDomDragHandlerContainer), d; c ? d = c.findOne("img") : (c = new CKEDITOR.dom.element("span", b.document), c.setAttributes({
                            "class": "cke_reset cke_widget_drag_handler_container",
                            style: "background:rgba(220,220,220,0.5);background-image:url(" + b.plugins.widget.path + "images/handle.png);display:none;"
                        }), d = new CKEDITOR.dom.element("img", b.document), d.setAttributes({ "class": "cke_reset cke_widget_drag_handler", "data-cke-widget-drag-handler": "1", src: CKEDITOR.tools.transparentImageData, width: 15, title: b.lang.widget.move, height: 15, role: "presentation" }), a.inline && d.setAttribute("draggable", "true"), c.append(d), a.wrapper.append(c)); a.wrapper.on("dragover", function (a) { a.data.preventDefault() });
                        a.wrapper.on("mouseenter", a.updateDragHandlerPosition, a); setTimeout(function () { a.on("data", a.updateDragHandlerPosition, a) }, 50); if (!a.inline && (d.on("mousedown", fa, a), CKEDITOR.env.ie && 9 > CKEDITOR.env.version)) d.on("dragstart", function (a) { a.data.preventDefault(!0) }); a.dragHandlerContainer = c
                    }
                } function fa(a) {
                    function b() {
                        var c; for (p.reset(); c = h.pop();)c.removeListener(); var d = k; c = a.sender; var e = this.repository.finder, f = this.repository.liner, g = this.editor, l = this.editor.editable(); CKEDITOR.tools.isEmpty(f.visible) ||
                            (d = e.getRange(d[0]), this.focus(), g.fire("drop", { dropRange: d, target: d.startContainer })); l.removeClass("cke_widget_dragging"); f.hideVisible(); g.fire("dragend", { target: c })
                    } if (CKEDITOR.tools.getMouseButton(a) === CKEDITOR.MOUSE_BUTTON_LEFT) {
                        var c = this.repository.finder, d = this.repository.locator, e = this.repository.liner, f = this.editor, g = f.editable(), h = [], k = [], l, m; this.repository._.draggedWidget = this; var n = c.greedySearch(), p = CKEDITOR.tools.eventsBuffer(50, function () {
                            l = d.locate(n); k = d.sort(m, 1); k.length && (e.prepare(n,
                                l), e.placeLine(k[0]), e.cleanup())
                        }); g.addClass("cke_widget_dragging"); h.push(g.on("mousemove", function (a) { m = a.data.$.clientY; p.input() })); f.fire("dragstart", { target: a.sender }); h.push(f.document.once("mouseup", b, this)); g.isInline() || h.push(CKEDITOR.document.once("mouseup", b, this))
                    }
                } function ja(a) { var b = null; a.on("data", function () { var a = this.data.classes, c; if (b != a) { for (c in b) a && a[c] || this.removeClass(c); for (c in a) this.addClass(c); b = a } }) } function ka(a) {
                    a.on("data", function () {
                        if (a.wrapper) {
                            var b = this.getLabel ?
                                this.getLabel() : this.editor.lang.widget.label.replace(/%1/, this.pathName || this.element.getName()); a.wrapper.setAttribute("role", "region"); a.wrapper.setAttribute("aria-label", b)
                        }
                    }, null, null, 9999)
                } function Z(a) { a.element.data("cke-widget-data", encodeURIComponent(JSON.stringify(a.data))) } function aa() {
                    function a() { } function b(a, c, d) { return d && this.checkElement(a) ? (a = d.widgets.getByElement(a, !0)) && a.checkStyleActive(this) : !1 } function c(a) {
                        function b(a, c, d) {
                            for (var e = a.length, f = 0; f < e;) {
                                if (c.call(d, a[f],
                                    f, a)) return a[f]; f++
                            }
                        } function e(a) { function b(a, c) { var d = CKEDITOR.tools.object.keys(a), e = CKEDITOR.tools.object.keys(c); if (d.length !== e.length) return !1; for (var f in a) if (("object" !== typeof a[f] || "object" !== typeof c[f] || !b(a[f], c[f])) && a[f] !== c[f]) return !1; return !0 } return function (c) { return b(a.getDefinition(), c.getDefinition()) } } var f = a.widget, g; d[f] || (d[f] = {}); for (var h = 0, k = a.group.length; h < k; h++)g = a.group[h], d[f][g] || (d[f][g] = []), g = d[f][g], b(g, e(a)) || g.push(a)
                    } var d = {}; CKEDITOR.style.addCustomHandler({
                        type: "widget",
                        setup: function (a) { this.widget = a.widget; (this.group = "string" == typeof a.group ? [a.group] : a.group) && c(this) }, apply: function (a) { var b; a instanceof CKEDITOR.editor && this.checkApplicable(a.elementPath(), a) && (b = a.widgets.focused, this.group && this.removeStylesFromSameGroup(a), b.applyStyle(this)) }, remove: function (a) { a instanceof CKEDITOR.editor && this.checkApplicable(a.elementPath(), a) && a.widgets.focused.removeStyle(this) }, removeStylesFromSameGroup: function (a) {
                            var b = !1, c, e; if (!(a instanceof CKEDITOR.editor)) return !1;
                            e = a.elementPath(); if (this.checkApplicable(e, a)) for (var f = 0, g = this.group.length; f < g; f++) { c = d[this.widget][this.group[f]]; for (var h = 0; h < c.length; h++)c[h] !== this && c[h].checkActive(e, a) && (a.widgets.focused.removeStyle(c[h]), b = !0) } return b
                        }, checkActive: function (a, b) { return this.checkElementMatch(a.lastElement, 0, b) }, checkApplicable: function (a, b) { return b instanceof CKEDITOR.editor ? this.checkElement(a.lastElement) : !1 }, checkElementMatch: b, checkElementRemovable: b, checkElement: function (a) {
                            return h.isDomWidgetWrapper(a) ?
                                (a = a.getFirst(h.isDomWidgetElement)) && a.data("widget") == this.widget : !1
                        }, buildPreview: function (a) { return a || this._.definition.name }, toAllowedContentRules: function (a) { if (!a) return null; a = a.widgets.registered[this.widget]; var b, c = {}; if (!a) return null; if (a.styleableElements) { b = this.getClassesArray(); if (!b) return null; c[a.styleableElements] = { classes: b, propertiesOnly: !0 }; return c } return a.styleToAllowedContentRules ? a.styleToAllowedContentRules(this) : null }, getClassesArray: function () {
                            var a = this._.definition.attributes &&
                                this._.definition.attributes["class"]; return a ? CKEDITOR.tools.trim(a).split(/\s+/) : null
                        }, applyToRange: a, removeFromRange: a, applyToObject: a
                    })
                } CKEDITOR.plugins.add("widget", {
                    requires: "lineutils,clipboard,widgetselection", onLoad: function () {
                        void 0 !== CKEDITOR.document.$.querySelectorAll && (CKEDITOR.addCss('.cke_widget_wrapper{position:relative;outline:none}.cke_widget_inline{display:inline-block}.cke_widget_wrapper:hover\x3e.cke_widget_element{outline:2px solid #ffd25c;cursor:default}.cke_widget_wrapper:hover .cke_widget_editable{outline:2px solid #ffd25c}.cke_widget_wrapper.cke_widget_focused\x3e.cke_widget_element,.cke_widget_wrapper .cke_widget_editable.cke_widget_editable_focused{outline:2px solid #47a4f5}.cke_widget_editable{cursor:text}.cke_widget_drag_handler_container{position:absolute;width:15px;height:0;display:block;opacity:0.75;transition:height 0s 0.2s;line-height:0}.cke_widget_wrapper:hover\x3e.cke_widget_drag_handler_container{height:15px;transition:none}.cke_widget_drag_handler_container:hover{opacity:1}.cke_editable[contenteditable\x3d"false"] .cke_widget_drag_handler_container{display:none;}img.cke_widget_drag_handler{cursor:move;width:15px;height:15px;display:inline-block}.cke_widget_mask{position:absolute;top:0;left:0;width:100%;height:100%;display:block}.cke_widget_partial_mask{position:absolute;display:block}.cke_editable.cke_widget_dragging, .cke_editable.cke_widget_dragging *{cursor:move !important}'),
                            aa())
                    }, beforeInit: function (b) { void 0 !== CKEDITOR.document.$.querySelectorAll && (b.widgets = new a(b)) }, afterInit: function (a) { if (void 0 !== CKEDITOR.document.$.querySelectorAll) { var b = a.widgets.registered, c, d, e; for (d in b) c = b[d], (e = c.button) && a.ui.addButton && a.ui.addButton(CKEDITOR.tools.capitalize(c.name, !0), { label: e, command: c.name, toolbar: "insert,10" }); x(a); H(a.undoManager) } }
                }); a.prototype = {
                    MIN_SELECTION_CHECK_INTERVAL: 500, add: function (a, c) {
                        var e = this.editor; c = CKEDITOR.tools.prototypedCopy(c); c.name = a;
                        c._ = c._ || {}; e.fire("widgetDefinition", c); c.template && (c.template = new CKEDITOR.template(c.template)); b(e, c); d(this, c); this.registered[a] = c; if (c.dialog && e.plugins.dialog) var f = CKEDITOR.on("dialogDefinition", function (a) { a = a.data.definition; var b = a.dialog; a.getMode || b.getName() !== c.dialog || (a.getMode = function () { var a = b.getModel(e); return a && a instanceof CKEDITOR.plugins.widget && a.ready ? CKEDITOR.dialog.EDITING_MODE : CKEDITOR.dialog.CREATION_MODE }); f.removeListener() }); return c
                    }, addUpcastCallback: function (a) { this._.upcastCallbacks.push(a) },
                    checkSelection: function () { if (this.editor.getSelection()) { var a = this.editor.getSelection(), b = a.getSelectedElement(), c = G(this), d; if (b && (d = this.getByElement(b, !0))) return c.focus(d).select(d).commit(); a = a.getRanges()[0]; if (!a || a.collapsed) return c.commit(); a = new CKEDITOR.dom.walker(a); for (a.evaluator = h.isDomWidgetWrapper; b = a.next();)c.select(this.getByElement(b)); c.commit() } }, checkWidgets: function (a) { this.fire("checkWidgets", CKEDITOR.tools.copy(a || {})) }, del: function (a) {
                        if (this.focused === a) {
                            var b = a.editor,
                            c = b.createRange(), d; (d = c.moveToClosestEditablePosition(a.wrapper, !0)) || (d = c.moveToClosestEditablePosition(a.wrapper, !1)); d && b.getSelection().selectRanges([c])
                        } a.wrapper.remove(); this.destroy(a, !0)
                    }, destroy: function (a, b) { this.widgetHoldingFocusedEditable === a && r(this, a, null, b); a.destroy(b); delete this.instances[a.id]; this.fire("instanceDestroyed", a) }, destroyAll: function (a, b) {
                        var c, d, e = this.instances; if (b && !a) {
                            d = b.find(".cke_widget_wrapper"); for (var e = d.count(), f = 0; f < e; ++f)(c = this.getByElement(d.getItem(f),
                                !0)) && this.destroy(c)
                        } else for (d in e) c = e[d], this.destroy(c, a)
                    }, finalizeCreation: function (a) { (a = a.getFirst()) && h.isDomWidgetWrapper(a) && (this.editor.insertElement(a), a = this.getByElement(a), a.ready = !0, a.fire("ready"), a.focus()) }, getByElement: function () { function a(c) { return c.is(b) && c.data("cke-widget-id") } var b = { div: 1, span: 1 }; return function (b, c) { if (!b) return null; var d = a(b); if (!c && !d) { var e = this.editor.editable(); do b = b.getParent(); while (b && !b.equals(e) && !(d = a(b))) } return this.instances[d] || null } }(),
                    initOn: function (a, b, c) { b ? "string" == typeof b && (b = this.registered[b]) : b = this.registered[a.data("widget")]; if (!b) return null; var d = this.wrapElement(a, b.name); return d ? d.hasClass("cke_widget_new") ? (a = new h(this, this._.nextId++, a, b, c), a.isInited() ? this.instances[a.id] = a : null) : this.getByElement(a) : null }, initOnAll: function (a) { a = (a || this.editor.editable()).find(".cke_widget_new"); for (var b = [], c, d = a.count(); d--;)(c = this.initOn(a.getItem(d).getFirst(h.isDomWidgetElement))) && b.push(c); return b }, onWidget: function (a) {
                        var b =
                            Array.prototype.slice.call(arguments); b.shift(); for (var c in this.instances) { var d = this.instances[c]; d.name == a && d.on.apply(d, b) } this.on("instanceCreated", function (c) { c = c.data; c.name == a && c.on.apply(c, b) })
                    }, parseElementClasses: function (a) { if (!a) return null; a = CKEDITOR.tools.trim(a).split(/\s+/); for (var b, c = {}, d = 0; b = a.pop();)-1 == b.indexOf("cke_") && (c[b] = d = 1); return d ? c : null }, wrapElement: function (a, b) {
                        var c = null, d, e; if (a instanceof CKEDITOR.dom.element) {
                            b = b || a.data("widget"); d = this.registered[b]; if (!d) return null;
                            if ((c = a.getParent()) && c.type == CKEDITOR.NODE_ELEMENT && c.data("cke-widget-wrapper")) return c; a.hasAttribute("data-cke-widget-keep-attr") || a.data("cke-widget-keep-attr", a.data("widget") ? 1 : 0); a.data("widget", b); (e = p(d, a.getName())) && m(a); c = new CKEDITOR.dom.element(e ? "span" : "div", a.getDocument()); c.setAttributes(u(e, b)); c.data("cke-display-name", d.pathName ? d.pathName : a.getName()); a.getParent(!0) && c.replace(a); a.appendTo(c)
                        } else if (a instanceof CKEDITOR.htmlParser.element) {
                            b = b || a.attributes["data-widget"];
                            d = this.registered[b]; if (!d) return null; if ((c = a.parent) && c.type == CKEDITOR.NODE_ELEMENT && c.attributes["data-cke-widget-wrapper"]) return c; "data-cke-widget-keep-attr" in a.attributes || (a.attributes["data-cke-widget-keep-attr"] = a.attributes["data-widget"] ? 1 : 0); b && (a.attributes["data-widget"] = b); (e = p(d, a.name)) && m(a); c = new CKEDITOR.htmlParser.element(e ? "span" : "div", u(e, b)); c.attributes["data-cke-display-name"] = d.pathName ? d.pathName : a.name; d = a.parent; var f; d && (f = a.getIndex(), a.remove()); c.add(a); d && w(d,
                                f, c)
                        } return c
                    }, _tests_createEditableFilter: c
                }; CKEDITOR.event.implementOn(a.prototype); h.prototype = {
                    addClass: function (a) { this.element.addClass(a); this.wrapper.addClass(h.WRAPPER_CLASS_PREFIX + a) }, applyStyle: function (a) { L(this, a, 1) }, checkStyleActive: function (a) { a = F(a); var b; if (!a) return !1; for (; b = a.pop();)if (!this.hasClass(b)) return !1; return !0 }, destroy: function (a) {
                        this.fire("destroy"); if (this.editables) for (var b in this.editables) this.destroyEditable(b, a); a || ("0" == this.element.data("cke-widget-keep-attr") &&
                            this.element.removeAttribute("data-widget"), this.element.removeAttributes(["data-cke-widget-data", "data-cke-widget-keep-attr"]), this.element.removeClass("cke_widget_element"), this.element.replace(this.wrapper)); this.wrapper = null
                    }, destroyEditable: function (a, b) {
                        var c = this.editables[a], d = !0; c.removeListener("focus", M); c.removeListener("blur", P); this.editor.focusManager.remove(c); if (c.filter) {
                            for (var e in this.repository.instances) {
                                var f = this.repository.instances[e]; f.editables && (f = f.editables[a]) && f !==
                                    c && c.filter === f.filter && (d = !1)
                            } d && (c.filter.destroy(), (d = this.repository._.filters[this.name]) && delete d[a])
                        } b || (this.repository.destroyAll(!1, c), c.removeClass("cke_widget_editable"), c.removeClass("cke_widget_editable_focused"), c.removeAttributes(["contenteditable", "data-cke-widget-editable", "data-cke-enter-mode"])); delete this.editables[a]
                    }, edit: function () {
                        var a = { dialog: this.dialog }, b = this; if (!1 === this.fire("edit", a) || !a.dialog) return !1; this.editor.openDialog(a.dialog, function (a) {
                            var c, d; !1 !== b.fire("dialog",
                                a) && (c = a.on("show", function () { a.setupContent(b) }), d = a.on("ok", function () { var c, d = b.on("data", function (a) { c = 1; a.cancel() }, null, null, 0); b.editor.fire("saveSnapshot"); a.commitContent(b); d.removeListener(); c && (b.fire("data", b.data), b.editor.fire("saveSnapshot")) }), a.once("hide", function () { c.removeListener(); d.removeListener() }))
                        }, b); return !0
                    }, getClasses: function () { return this.repository.parseElementClasses(this.element.getAttribute("class")) }, getClipboardHtml: function () {
                        var a = this.editor.createRange();
                        a.setStartBefore(this.wrapper); a.setEndAfter(this.wrapper); return this.editor.editable().getHtmlFromRange(a).getHtml()
                    }, hasClass: function (a) { return this.element.hasClass(a) }, initEditable: function (a, b) {
                        var d = this._findOneNotNested(b.selector); return d && d.is(CKEDITOR.dtd.$editable) ? (d = new f(this.editor, d, { filter: c.call(this.repository, this.name, a, b) }), this.editables[a] = d, d.setAttributes({ contenteditable: "true", "data-cke-widget-editable": a, "data-cke-enter-mode": d.enterMode }), d.filter && d.data("cke-filter",
                            d.filter.id), d.addClass("cke_widget_editable"), d.removeClass("cke_widget_editable_focused"), b.pathName && d.data("cke-display-name", b.pathName), this.editor.focusManager.add(d), d.on("focus", M, this), CKEDITOR.env.ie && d.on("blur", P, this), d._.initialSetData = !0, d.setData(d.getHtml()), !0) : !1
                    }, _findOneNotNested: function (a) { a = this.wrapper.find(a); for (var b, c, d = 0; d < a.count(); d++)if (b = a.getItem(d), c = b.getAscendant(h.isDomWidgetWrapper), this.wrapper.equals(c)) return b; return null }, isInited: function () {
                        return !(!this.wrapper ||
                            !this.inited)
                    }, isReady: function () { return this.isInited() && this.ready }, focus: function () { var a = this.editor.getSelection(); if (a) { var b = this.editor.checkDirty(); a.fake(this.wrapper); !b && this.editor.resetDirty() } this.editor.focus() }, refreshMask: function () { da(this) }, refreshParts: function (a) { T(this, "undefined" !== typeof a ? a : !0) }, removeClass: function (a) { this.element.removeClass(a); this.wrapper.removeClass(h.WRAPPER_CLASS_PREFIX + a) }, removeStyle: function (a) { L(this, a, 0) }, setData: function (a, b) {
                        var c = this.data,
                        d = 0; if ("string" == typeof a) c[a] !== b && (c[a] = b, d = 1); else { var e = a; for (a in e) c[a] !== e[a] && (d = 1, c[a] = e[a]) } d && this.dataReady && (Z(this), this.fire("data", c)); return this
                    }, setFocused: function (a) { this.wrapper[a ? "addClass" : "removeClass"]("cke_widget_focused"); this.fire(a ? "focus" : "blur"); return this }, setSelected: function (a) { this.wrapper[a ? "addClass" : "removeClass"]("cke_widget_selected"); this.fire(a ? "select" : "deselect"); return this }, updateDragHandlerPosition: function () {
                        var a = this.editor, b = this.element.$, c = this._.dragHandlerOffset,
                        b = { x: b.offsetLeft, y: b.offsetTop - 15 }; c && b.x == c.x && b.y == c.y || (c = a.checkDirty(), a.fire("lockSnapshot"), this.dragHandlerContainer.setStyles({ top: b.y + "px", left: b.x + "px" }), this.dragHandlerContainer.removeStyle("display"), a.fire("unlockSnapshot"), !c && a.resetDirty(), this._.dragHandlerOffset = b)
                    }
                }; CKEDITOR.event.implementOn(h.prototype); h.getNestedEditable = function (a, b) { return !b || b.equals(a) ? null : h.isDomNestedEditable(b) ? b : h.getNestedEditable(a, b.getParent()) }; h.isDomDragHandler = function (a) {
                    return a.type ==
                        CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-cke-widget-drag-handler")
                }; h.isDomDragHandlerContainer = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_widget_drag_handler_container") }; h.isDomNestedEditable = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-cke-widget-editable") }; h.isDomWidgetElement = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-widget") }; h.isDomWidgetWrapper = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("data-cke-widget-wrapper") };
            h.isDomWidget = function (a) { return a ? this.isDomWidgetWrapper(a) || this.isDomWidgetElement(a) : !1 }; h.isParserWidgetElement = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && !!a.attributes["data-widget"] }; h.isParserWidgetWrapper = function (a) { return a.type == CKEDITOR.NODE_ELEMENT && !!a.attributes["data-cke-widget-wrapper"] }; h.WRAPPER_CLASS_PREFIX = "cke_widget_wrapper_"; f.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.dom.element.prototype), {
                setData: function (a) {
                    this._.initialSetData ||
                    this.editor.widgets.destroyAll(!1, this); this._.initialSetData = !1; a = this.editor.dataProcessor.unprotectRealComments(a); a = this.editor.dataProcessor.unprotectSource(a); a = this.editor.dataProcessor.toHtml(a, { context: this.getName(), filter: this.filter, enterMode: this.enterMode }); this.setHtml(a); this.editor.widgets.initOnAll(this)
                }, getData: function () { return this.editor.dataProcessor.toDataFormat(this.getHtml(), { context: this.getName(), filter: this.filter, enterMode: this.enterMode }) }
            }); var ca = /^(?:<(?:div|span)(?: data-cke-temp="1")?(?: id="cke_copybin")?(?: data-cke-temp="1")?>)?(?:<(?:div|span)(?: style="[^"]+")?>)?<span [^>]*data-cke-copybin-start="1"[^>]*>.?<\/span>([\s\S]+)<span [^>]*data-cke-copybin-end="1"[^>]*>.?<\/span>(?:<\/(?:div|span)>)?(?:<\/(?:div|span)>)?$/i,
                V = { 37: 1, 38: 1, 39: 1, 40: 1, 8: 1, 46: 1 }; V[CKEDITOR.SHIFT + 121] = 1; var Q = CKEDITOR.tools.createClass({
                    $: function (a, b) { this._.createCopyBin(a, b); this._.createListeners(b) }, _: {
                        createCopyBin: function (a) {
                            var b = a.document, c = CKEDITOR.env.edge && 16 <= CKEDITOR.env.version, d = !a.blockless && !CKEDITOR.env.ie || c ? "div" : "span", c = b.createElement(d), b = b.createElement(d); b.setAttributes({ id: "cke_copybin", "data-cke-temp": "1" }); c.setStyles({ position: "absolute", width: "1px", height: "1px", overflow: "hidden" }); c.setStyle("ltr" == a.config.contentsLangDirection ?
                                "left" : "right", "-5000px"); this.editor = a; this.copyBin = c; this.container = b
                        }, createListeners: function (a) { a && (a.beforeDestroy && (this.beforeDestroy = a.beforeDestroy), a.afterDestroy && (this.afterDestroy = a.afterDestroy)) }
                    }, proto: {
                        handle: function (a) {
                            var b = this.copyBin, c = this.editor, d = this.container, e = CKEDITOR.env.ie && 9 > CKEDITOR.env.version, f = c.document.getDocumentElement().$, g = c.createRange(), h = this, k = CKEDITOR.env.mac && CKEDITOR.env.webkit, l = k ? 100 : 0, m = window.requestAnimationFrame && !k ? requestAnimationFrame : setTimeout,
                            n, p, q; b.setHtml('\x3cspan data-cke-copybin-start\x3d"1"\x3e​\x3c/span\x3e' + a + '\x3cspan data-cke-copybin-end\x3d"1"\x3e​\x3c/span\x3e'); c.fire("lockSnapshot"); d.append(b); c.editable().append(d); n = c.on("selectionChange", K, null, null, 0); p = c.widgets.on("checkSelection", K, null, null, 0); e && (q = f.scrollTop); g.selectNodeContents(b); g.select(); e && (f.scrollTop = q); return new CKEDITOR.tools.promise(function (a) {
                                m(function () {
                                    h.beforeDestroy && h.beforeDestroy(); d.remove(); n.removeListener(); p.removeListener(); c.fire("unlockSnapshot");
                                    h.afterDestroy && h.afterDestroy(); a()
                                }, l)
                            })
                        }
                    }, statics: { hasCopyBin: function (a) { return !!Q.getCopyBin(a) }, getCopyBin: function (a) { return a.document.getById("cke_copybin") } }
                }); CKEDITOR.plugins.widget = h; h.repository = a; h.nestedEditable = f
        })(); CKEDITOR.config.widget_keystrokeInsertLineBefore = CKEDITOR.SHIFT + CKEDITOR.ALT + 13; CKEDITOR.config.widget_keystrokeInsertLineAfter = CKEDITOR.SHIFT + 13; (function () {
            function a(a, b, d) {
                this.editor = a; this.notification = null; this._message = new CKEDITOR.template(b); this._singularMessage =
                    d ? new CKEDITOR.template(d) : null; this._tasks = []; this._doneTasks = this._doneWeights = this._totalWeights = 0
            } function h(a) { this._weight = a || 1; this._doneWeight = 0; this._isCanceled = !1 } CKEDITOR.plugins.add("notificationaggregator", { requires: "notification" }); a.prototype = {
                createTask: function (a) {
                    a = a || {}; var b = !this.notification, d; b && (this.notification = this._createNotification()); d = this._addTask(a); d.on("updated", this._onTaskUpdate, this); d.on("done", this._onTaskDone, this); d.on("canceled", function () { this._removeTask(d) },
                        this); this.update(); b && this.notification.show(); return d
                }, update: function () { this._updateNotification(); this.isFinished() && this.fire("finished") }, getPercentage: function () { return 0 === this.getTaskCount() ? 1 : this._doneWeights / this._totalWeights }, isFinished: function () { return this.getDoneTaskCount() === this.getTaskCount() }, getTaskCount: function () { return this._tasks.length }, getDoneTaskCount: function () { return this._doneTasks }, _updateNotification: function () {
                    this.notification.update({
                        message: this._getNotificationMessage(),
                        progress: this.getPercentage()
                    })
                }, _getNotificationMessage: function () { var a = this.getTaskCount(), b = { current: this.getDoneTaskCount(), max: a, percentage: Math.round(100 * this.getPercentage()) }; return (1 == a && this._singularMessage ? this._singularMessage : this._message).output(b) }, _createNotification: function () { return new CKEDITOR.plugins.notification(this.editor, { type: "progress" }) }, _addTask: function (a) { a = new h(a.weight); this._tasks.push(a); this._totalWeights += a._weight; return a }, _removeTask: function (a) {
                    var b = CKEDITOR.tools.indexOf(this._tasks,
                        a); -1 !== b && (a._doneWeight && (this._doneWeights -= a._doneWeight), this._totalWeights -= a._weight, this._tasks.splice(b, 1), this.update())
                }, _onTaskUpdate: function (a) { this._doneWeights += a.data; this.update() }, _onTaskDone: function () { this._doneTasks += 1; this.update() }
            }; CKEDITOR.event.implementOn(a.prototype); h.prototype = {
                done: function () { this.update(this._weight) }, update: function (a) {
                    if (!this.isDone() && !this.isCanceled()) {
                        a = Math.min(this._weight, a); var b = a - this._doneWeight; this._doneWeight = a; this.fire("updated",
                            b); this.isDone() && this.fire("done")
                    }
                }, cancel: function () { this.isDone() || this.isCanceled() || (this._isCanceled = !0, this.fire("canceled")) }, isDone: function () { return this._weight === this._doneWeight }, isCanceled: function () { return this._isCanceled }
            }; CKEDITOR.event.implementOn(h.prototype); CKEDITOR.plugins.notificationAggregator = a; CKEDITOR.plugins.notificationAggregator.task = h
        })(); "use strict"; (function () {
            CKEDITOR.plugins.add("uploadwidget", {
                requires: "widget,clipboard,filetools,notificationaggregator", init: function (a) { a.filter.allow("*[!data-widget,!data-cke-upload-id]") },
                isSupportedEnvironment: function () { return CKEDITOR.plugins.clipboard.isFileApiSupported }
            }); CKEDITOR.fileTools || (CKEDITOR.fileTools = {}); CKEDITOR.tools.extend(CKEDITOR.fileTools, {
                addUploadWidget: function (a, h, f) {
                    var b = CKEDITOR.fileTools, d = a.uploadRepository, l = f.supportedTypes ? 10 : 20; if (f.fileToElement) a.on("paste", function (f) {
                        f = f.data; var l = a.widgets.registered[h], g = f.dataTransfer, e = g.getFilesCount(), c = l.loadMethod || "loadAndUpload", n, u; if (!f.dataValue && e) for (u = 0; u < e; u++)if (n = g.getFile(u), !l.supportedTypes ||
                            b.isTypeSupported(n, l.supportedTypes)) { var w = l.fileToElement(n); n = d.create(n, void 0, l.loaderType); w && (n[c](l.uploadUrl, l.additionalRequestParameters), CKEDITOR.fileTools.markElement(w, h, n.id), "loadAndUpload" != c && "upload" != c || l.skipNotifications || CKEDITOR.fileTools.bindNotifications(a, n), f.dataValue += w.getOuterHtml()) }
                    }, null, null, l); CKEDITOR.tools.extend(f, {
                        downcast: function () { return new CKEDITOR.htmlParser.text("") }, init: function () {
                            var b = this, f = this.wrapper.findOne("[data-cke-upload-id]").data("cke-upload-id"),
                            g = d.loaders[f], e = CKEDITOR.tools.capitalize, c, h; g.on("update", function (d) {
                                if ("abort" === g.status && "function" === typeof b.onAbort) b.onAbort(g); if (b.wrapper && b.wrapper.getParent()) { a.fire("lockSnapshot"); d = "on" + e(g.status); if ("abort" === g.status || "function" !== typeof b[d] || !1 !== b[d](g)) h = "cke_upload_" + g.status, b.wrapper && h != c && (c && b.wrapper.removeClass(c), b.wrapper.addClass(h), c = h), "error" != g.status && "abort" != g.status || a.widgets.del(b); a.fire("unlockSnapshot") } else CKEDITOR.instances[a.name] && a.editable().find('[data-cke-upload-id\x3d"' +
                                    f + '"]').count() || g.abort(), d.removeListener()
                            }); g.update()
                        }, replaceWith: function (b, d) { if ("" === b.trim()) a.widgets.del(this); else { var f = this == a.widgets.focused, e = a.editable(), c = a.createRange(), h, l; f || (l = a.getSelection().createBookmarks()); c.setStartBefore(this.wrapper); c.setEndAfter(this.wrapper); f && (h = c.createBookmark()); e.insertHtmlIntoRange(b, c, d); a.widgets.checkWidgets({ initOnlyNew: !0 }); a.widgets.destroy(this, !0); f ? (c.moveToBookmark(h), c.select()) : a.getSelection().selectBookmarks(l) } }, _getLoader: function () {
                            var a =
                                this.wrapper.findOne("[data-cke-upload-id]"); return a ? this.editor.uploadRepository.loaders[a.data("cke-upload-id")] : null
                        }
                    }); a.widgets.add(h, f)
                }, markElement: function (a, h, f) { a.setAttributes({ "data-cke-upload-id": f, "data-widget": h }) }, bindNotifications: function (a, h) {
                    function f() {
                        b = a._.uploadWidgetNotificaionAggregator; if (!b || b.isFinished()) b = a._.uploadWidgetNotificaionAggregator = new CKEDITOR.plugins.notificationAggregator(a, a.lang.uploadwidget.uploadMany, a.lang.uploadwidget.uploadOne), b.once("finished",
                            function () { var d = b.getTaskCount(); 0 === d ? b.notification.hide() : b.notification.update({ message: 1 == d ? a.lang.uploadwidget.doneOne : a.lang.uploadwidget.doneMany.replace("%1", d), type: "success", important: 1 }) })
                    } var b, d = null; h.on("update", function () { !d && h.uploadTotal && (f(), d = b.createTask({ weight: h.uploadTotal })); d && "uploading" == h.status && d.update(h.uploaded) }); h.on("uploaded", function () { d && d.done() }); h.on("error", function () { d && d.cancel(); a.showNotification(h.message, "warning") }); h.on("abort", function () {
                        d &&
                        d.cancel(); CKEDITOR.instances[a.name] && a.showNotification(a.lang.uploadwidget.abort, "info")
                    })
                }
            })
        })(); "use strict"; (function () {
            function a(a) { 9 >= a && (a = "0" + a); return String(a) } function h(b) { var d = new Date, d = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()]; f += 1; return "image-" + CKEDITOR.tools.array.map(d, a).join("") + "-" + f + "." + b } var f = 0; CKEDITOR.plugins.add("uploadimage", {
                requires: "uploadwidget", onLoad: function () { CKEDITOR.addCss(".cke_upload_uploading img{opacity: 0.3}") },
                isSupportedEnvironment: function () { return CKEDITOR.plugins.clipboard.isFileApiSupported }, init: function (a) {
                    if (this.isSupportedEnvironment()) {
                        var d = CKEDITOR.fileTools, f = d.getUploadUrl(a.config, "image"); f && (d.addUploadWidget(a, "uploadimage", {
                            supportedTypes: /image\/(jpeg|png|gif|bmp)/, uploadUrl: f, fileToElement: function () { var a = new CKEDITOR.dom.element("img"); a.setAttribute("src", "data:image/gif;base64,R0lGODlhDgAOAIAAAAAAAP///yH5BAAAAAAALAAAAAAOAA4AAAIMhI+py+0Po5y02qsKADs\x3d"); return a }, parts: { img: "img" },
                            onUploading: function (a) { this.parts.img.setAttribute("src", a.data) }, onUploaded: function (a) { var b = this.parts.img.$; this.replaceWith('\x3cimg src\x3d"' + a.url + '" width\x3d"' + (a.responseData.width || b.naturalWidth) + '" height\x3d"' + (a.responseData.height || b.naturalHeight) + '"\x3e') }
                        }), a.on("paste", function (k) {
                            if (k.data.dataValue.match(/<img[\s\S]+data:/i)) {
                                k = k.data; var m = document.implementation.createHTMLDocument(""), m = new CKEDITOR.dom.element(m.body), g, e, c; m.data("cke-editable", 1); m.appendHtml(k.dataValue);
                                g = m.find("img"); for (c = 0; c < g.count(); c++) { e = g.getItem(c); var n = e.getAttribute("src"), u = n && "data:" == n.substring(0, 5), w = null === e.data("cke-realelement"); u && w && !e.data("cke-upload-id") && !e.isReadOnly(1) && (u = (u = n.match(/image\/([a-z]+?);/i)) && u[1] || "jpg", n = a.uploadRepository.create(n, h(u)), n.upload(f), d.markElement(e, "uploadimage", n.id), d.bindNotifications(a, n)) } k.dataValue = m.getHtml()
                            }
                        }))
                    }
                }
            })
        })(); (function () {
            function a(a) {
                function b(a) {
                    var d = !1; c.attachListener(c, "keydown", function () {
                        var b = m.getBody().getElementsByTag(a);
                        if (!d) { for (var c = 0; c < b.count(); c++)b.getItem(c).setCustomData("retain", !0); d = !0 }
                    }, null, null, 1); c.attachListener(c, "keyup", function () { var b = m.getElementsByTag(a); d && (1 == b.count() && !b.getItem(0).getCustomData("retain") && CKEDITOR.tools.isEmpty(b.getItem(0).getAttributes()) && b.getItem(0).remove(1), d = !1) })
                } var f = this.editor; if (f && !f.isDetached()) {
                    var m = a.document, g = m.body, e = m.getElementById("cke_actscrpt"); e && e.parentNode.removeChild(e); (e = m.getElementById("cke_shimscrpt")) && e.parentNode.removeChild(e);
                    (e = m.getElementById("cke_basetagscrpt")) && e.parentNode.removeChild(e); g.contentEditable = !0; CKEDITOR.env.ie && (g.hideFocus = !0, g.disabled = !0, g.removeAttribute("disabled")); delete this._.isLoadingData; this.$ = g; m = new CKEDITOR.dom.document(m); this.setup(); this.fixInitialSelection(); var c = this; CKEDITOR.env.ie && !CKEDITOR.env.edge && m.getDocumentElement().addClass(m.$.compatMode); CKEDITOR.env.ie && !CKEDITOR.env.edge && f.enterMode != CKEDITOR.ENTER_P ? b("p") : CKEDITOR.env.edge && 15 > CKEDITOR.env.version && f.enterMode !=
                        CKEDITOR.ENTER_DIV && b("div"); if (CKEDITOR.env.webkit || CKEDITOR.env.ie && 10 < CKEDITOR.env.version) m.getDocumentElement().on("mousedown", function (a) { a.data.getTarget().is("html") && setTimeout(function () { f.editable().focus() }) }); h(f); try { f.document.$.execCommand("2D-position", !1, !0) } catch (n) { } (CKEDITOR.env.gecko || CKEDITOR.env.ie && "CSS1Compat" == f.document.$.compatMode) && this.attachListener(this, "keydown", function (a) {
                            var b = a.data.getKeystroke(); if (33 == b || 34 == b) if (CKEDITOR.env.ie) setTimeout(function () { f.getSelection().scrollIntoView() },
                                0); else if (f.window.$.innerHeight > this.$.offsetHeight) { var c = f.createRange(); c[33 == b ? "moveToElementEditStart" : "moveToElementEditEnd"](this); c.select(); a.data.preventDefault() }
                        }); CKEDITOR.env.ie && this.attachListener(m, "blur", function () { try { m.$.selection.empty() } catch (a) { } }); CKEDITOR.env.iOS && this.attachListener(m, "touchend", function () { a.focus() }); g = f.document.getElementsByTag("title").getItem(0); g.data("cke-title", g.getText()); CKEDITOR.env.ie && (f.document.$.title = this._.docTitle); CKEDITOR.tools.setTimeout(function () {
                            "unloaded" ==
                            this.status && (this.status = "ready"); f.fire("contentDom"); this._.isPendingFocus && (f.focus(), this._.isPendingFocus = !1); setTimeout(function () { f.fire("dataReady") }, 0)
                        }, 0, this)
                }
            } function h(a) {
                function b() { var e; a.editable().attachListener(a, "selectionChange", function () { var b = a.getSelection().getSelectedElement(); b && (e && (e.detachEvent("onresizestart", f), e = null), b.$.attachEvent("onresizestart", f), e = b.$) }) } function f(a) { a.returnValue = !1 } if (CKEDITOR.env.gecko) try {
                    var h = a.document.$; h.execCommand("enableObjectResizing",
                        !1, !a.config.disableObjectResizing); h.execCommand("enableInlineTableEditing", !1, !a.config.disableNativeTableHandles)
                } catch (g) { } else CKEDITOR.env.ie && 11 > CKEDITOR.env.version && a.config.disableObjectResizing && b()
            } function f() {
                var a = []; if (8 <= CKEDITOR.document.$.documentMode) { a.push("html.CSS1Compat [contenteditable\x3dfalse]{min-height:0 !important}"); var b = [], f; for (f in CKEDITOR.dtd.$removeEmpty) b.push("html.CSS1Compat " + f + "[contenteditable\x3dfalse]"); a.push(b.join(",") + "{display:inline-block}") } else CKEDITOR.env.gecko &&
                    (a.push("html{height:100% !important}"), a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}")); a.push("html{cursor:text;*cursor:auto}"); a.push("img,input,textarea{cursor:default}"); return a.join("\n")
            } var b; CKEDITOR.plugins.add("wysiwygarea", {
                init: function (a) {
                    a.config.fullPage && a.addFeature({ allowedContent: "html head title; style [media,type]; body (*)[id]; meta link [*]", requiredContent: "body" }); a.addMode("wysiwyg", function (f) {
                        function h(c) {
                            c && c.removeListener();
                            if (!a.isDestroyed() && !a.isDetached() && (a.editable(new b(a, n.getFrameDocument().getBody())), a.setData(a.getData(1), f), x)) { if (r) a.on("mode", m, { iframe: n, editor: a, callback: f }); a.on("mode", function () { a.status = "ready" }); g() }
                        } function m(a) { a && a.removeListener(); n.on("load", function () { q && (q = !1, e()) }) } function g() {
                            v = new MutationObserver(function (b) {
                                for (var c = 0; c < b.length; c++) {
                                    var f = b[c]; if ("childList" === f.type && 0 !== f.addedNodes.length) for (var g = 0; g < f.addedNodes.length; g++) {
                                        var h = f.addedNodes[g]; h.contains &&
                                            h.contains(a.container.$) && (r ? q = !0 : e())
                                    }
                                }
                            }); v.observe(a.config.observableParent, { childList: !0, subtree: !0 })
                        } function e() { var c = a.getData(!1), e; a.editable().preserveIframe = !0; a.editable(null); e = new b(a, n.getFrameDocument().getBody()); a.editable(e); a.status = "recreating"; a.setData(c, { callback: f, internal: !1, noSnapshot: !1 }) } var c = "document.open();" + (CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "") + "document.close();", c = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie && !CKEDITOR.env.edge ? "javascript:void(function(){" +
                            encodeURIComponent(c) + "}())" : "", n = CKEDITOR.dom.element.createFromHtml('\x3ciframe src\x3d"' + c + '" frameBorder\x3d"0"\x3e\x3c/iframe\x3e'); n.setStyles({ width: "100%", height: "100%" }); n.addClass("cke_wysiwyg_frame").addClass("cke_reset"); c = a.ui.space("contents"); c.append(n); var u = CKEDITOR.env.ie && !CKEDITOR.env.edge || CKEDITOR.env.gecko; if (u) n.on("load", h); var w = a.title, p = a.fire("ariaEditorHelpLabel", {}).label, q = !1, r = CKEDITOR.env.ie && 11 === CKEDITOR.env.version, x = !!window.MutationObserver, v; w && (CKEDITOR.env.ie &&
                                p && (w += ", " + p), n.setAttribute("title", w)); if (p) { var w = CKEDITOR.tools.getNextId(), D = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + w + '" class\x3d"cke_voice_label"\x3e' + p + "\x3c/span\x3e"); c.append(D, 1); n.setAttribute("aria-describedby", w) } a.on("beforeModeUnload", function (a) { a.removeListener(); D && D.remove(); x && v.disconnect() }); a.on("destroy", function () { v && v.disconnect() }); n.setAttributes({ tabIndex: a.tabIndex, allowTransparency: "true" }); !u && h(); a.fire("ariaWidget", n)
                    })
                }
            }); CKEDITOR.editor.prototype.addContentsCss =
                function (a) { var b = this.config, f = b.contentsCss; CKEDITOR.tools.isArray(f) || (b.contentsCss = f ? [f] : []); b.contentsCss.push(a) }; b = CKEDITOR.tools.createClass({
                    $: function () { this.base.apply(this, arguments); this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function (b) { CKEDITOR.tools.setTimeout(a, 0, this, b) }, this); this._.docTitle = this.getWindow().getFrame().getAttribute("title") }, base: CKEDITOR.editable, proto: {
                        preserveIframe: !1, setData: function (a, b) {
                            var h = this.editor; if (b) this.setHtml(a), this.fixInitialSelection(),
                                h.fire("dataReady"); else {
                                    this._.isLoadingData = !0; h._.dataStore = { id: 1 }; var m = h.config, g = m.fullPage, e = m.docType, c = CKEDITOR.tools.buildStyleHtml(f()).replace(/<style>/, '\x3cstyle data-cke-temp\x3d"1"\x3e'); g || (c += CKEDITOR.tools.buildStyleHtml(h.config.contentsCss)); var n = m.baseHref ? '\x3cbase href\x3d"' + m.baseHref + '" data-cke-temp\x3d"1" /\x3e' : ""; g && (a = a.replace(/<!DOCTYPE[^>]*>/i, function (a) { h.docType = e = a; return "" }).replace(/<\?xml\s[^\?]*\?>/i, function (a) { h.xmlDeclaration = a; return "" })); a = h.dataProcessor.toHtml(a);
                                g ? (/<body[\s|>]/.test(a) || (a = "\x3cbody\x3e" + a), /<html[\s|>]/.test(a) || (a = "\x3chtml\x3e" + a + "\x3c/html\x3e"), /<head[\s|>]/.test(a) ? /<title[\s|>]/.test(a) || (a = a.replace(/<head[^>]*>/, "$\x26\x3ctitle\x3e\x3c/title\x3e")) : a = a.replace(/<html[^>]*>/, "$\x26\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e"), n && (a = a.replace(/<head[^>]*?>/, "$\x26" + n)), a = a.replace(/<\/head\s*>/, c + "$\x26"), a = e + a) : a = m.docType + '\x3chtml dir\x3d"' + m.contentsLangDirection + '" lang\x3d"' + (m.contentsLanguage || h.langCode) + '"\x3e\x3chead\x3e\x3ctitle\x3e' +
                                    this._.docTitle + "\x3c/title\x3e" + n + c + "\x3c/head\x3e\x3cbody" + (m.bodyId ? ' id\x3d"' + m.bodyId + '"' : "") + (m.bodyClass ? ' class\x3d"' + m.bodyClass + '"' : "") + "\x3e" + a + "\x3c/body\x3e\x3c/html\x3e"; CKEDITOR.env.gecko && (a = a.replace(/<body/, '\x3cbody contenteditable\x3d"true" '), 2E4 > CKEDITOR.env.version && (a = a.replace(/<body[^>]*>/, "$\x26\x3c!-- cke-content-start --\x3e"))); m = '\x3cscript id\x3d"cke_actscrpt" type\x3d"text/javascript"' + (CKEDITOR.env.ie ? ' defer\x3d"defer" ' : "") + "\x3evar wasLoaded\x3d0;function onload(){if(!wasLoaded)window.parent.CKEDITOR \x26\x26 window.parent.CKEDITOR.tools.callFunction(" +
                                        this._.frameLoadedHandler + ",window);wasLoaded\x3d1;}" + (CKEDITOR.env.ie ? "onload();" : 'document.addEventListener("DOMContentLoaded", onload, false );') + "\x3c/script\x3e"; CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (m += '\x3cscript id\x3d"cke_shimscrpt"\x3ewindow.parent.CKEDITOR.tools.enableHtml5Elements(document)\x3c/script\x3e'); n && CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (m += '\x3cscript id\x3d"cke_basetagscrpt"\x3evar baseTag \x3d document.querySelector( "base" );baseTag.href \x3d baseTag.href;\x3c/script\x3e');
                                a = a.replace(/(?=\s*<\/(:?head)>)/, m); this.clearCustomData(); this.clearListeners(); h.fire("contentDomUnload"); var u = this.getDocument(); try { u.write(a) } catch (w) { setTimeout(function () { u.write(a) }, 0) }
                            }
                        }, getData: function (a) {
                            if (a) return this.getHtml(); a = this.editor; var b = a.config, f = b.fullPage, h = f && a.docType, g = f && a.xmlDeclaration, e = this.getDocument(), f = f ? e.getDocumentElement().getOuterHtml() : e.getBody().getHtml(); CKEDITOR.env.gecko && b.enterMode != CKEDITOR.ENTER_BR && (f = f.replace(/<br>(?=\s*(:?$|<\/body>))/,
                                "")); f = a.dataProcessor.toDataFormat(f); g && (f = g + "\n" + f); h && (f = h + "\n" + f); return f
                        }, focus: function () { this._.isLoadingData ? this._.isPendingFocus = !0 : b.baseProto.focus.call(this) }, detach: function () {
                            if (!this.preserveIframe) {
                                var a = this.editor, f = a.document, a = a.container.findOne("iframe.cke_wysiwyg_frame"); b.baseProto.detach.call(this); this.clearCustomData(this._.expandoNumber); f.getDocumentElement().clearCustomData(); CKEDITOR.tools.removeFunction(this._.frameLoadedHandler); a && (a.clearCustomData(), (f = a.removeCustomData("onResize")) &&
                                    f.removeListener(), a.isDetached() || a.remove())
                            }
                        }
                    }
                })
        })(); CKEDITOR.config.disableObjectResizing = !1; CKEDITOR.config.disableNativeTableHandles = !0; CKEDITOR.config.disableNativeSpellChecker = !0; CKEDITOR.config.observableParent = CKEDITOR.document.$; CKEDITOR.config.plugins = "dialogui,dialog,a11yhelp,about,basicstyles,bidi,blockquote,notification,button,toolbar,clipboard,panelbutton,panel,floatpanel,colorbutton,colordialog,copyformatting,menu,contextmenu,dialogadvtab,div,editorplaceholder,elementspath,enterkey,entities,exportpdf,popup,filetools,filebrowser,find,floatingspace,listblock,richcombo,font,format,fakeobjects,forms,horizontalrule,htmlwriter,iframe,image,indent,indentblock,indentlist,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,xml,ajax,pastetools,pastefromgdocs,pastefromlibreoffice,pastefromword,pastetext,preview,print,removeformat,resize,save,scayt,selectall,showblocks,showborders,smiley,sourcearea,specialchar,stylescombo,tab,table,tabletools,tableselection,templates,undo,lineutils,widgetselection,widget,notificationaggregator,uploadwidget,uploadimage,wysiwygarea";
        CKEDITOR.config.skin = "moono-lisa"; (function () {
            var a = function (a, f) { var b = CKEDITOR.getUrl("plugins/" + f); a = a.split(","); for (var d = 0; d < a.length; d++)CKEDITOR.skin.icons[a[d]] = { path: b, offset: -a[++d], bgsize: a[++d] } }; CKEDITOR.env.hidpi ? a("about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,bidiltr,168,,bidirtl,192,,blockquote,216,,copy-rtl,240,,copy,264,,cut-rtl,288,,cut,312,,paste-rtl,336,,paste,360,,codesnippet,384,,bgcolor,408,,textcolor,432,,copyformatting,456,,creatediv,480,,docprops-rtl,504,,docprops,528,,easyimagealigncenter,552,,easyimagealignleft,576,,easyimagealignright,600,,easyimagealt,624,,easyimagefull,648,,easyimageside,672,,easyimageupload,696,,embed,720,,embedsemantic,744,,emojipanel,768,,exportpdf,792,,find-rtl,816,,find,840,,replace,864,,button,888,,checkbox,912,,form,936,,hiddenfield,960,,imagebutton,984,,radio,1008,,select-rtl,1032,,select,1056,,textarea-rtl,1080,,textarea,1104,,textfield-rtl,1128,,textfield,1152,,horizontalrule,1176,,iframe,1200,,image,1224,,indent-rtl,1248,,indent,1272,,outdent-rtl,1296,,outdent,1320,,justifyblock,1344,,justifycenter,1368,,justifyleft,1392,,justifyright,1416,,language,1440,,anchor-rtl,1464,,anchor,1488,,link,1512,,unlink,1536,,bulletedlist-rtl,1560,,bulletedlist,1584,,numberedlist-rtl,1608,,numberedlist,1632,,mathjax,1656,,maximize,1680,,newpage-rtl,1704,,newpage,1728,,pagebreak-rtl,1752,,pagebreak,1776,,pastefromword-rtl,1800,,pastefromword,1824,,pastetext-rtl,1848,,pastetext,1872,,placeholder,1896,,preview-rtl,1920,,preview,1944,,print,1968,,removeformat,1992,,save,2016,,scayt,2040,,selectall,2064,,showblocks-rtl,2088,,showblocks,2112,,smiley,2136,,source-rtl,2160,,source,2184,,sourcedialog-rtl,2208,,sourcedialog,2232,,specialchar,2256,,table,2280,,templates-rtl,2304,,templates,2328,,uicolor,2352,,redo-rtl,2376,,redo,2400,,undo-rtl,2424,,undo,2448,,simplebox,4944,auto,spellchecker,2496,",
                "icons_hidpi.png") : a("about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,bidiltr,168,auto,bidirtl,192,auto,blockquote,216,auto,copy-rtl,240,auto,copy,264,auto,cut-rtl,288,auto,cut,312,auto,paste-rtl,336,auto,paste,360,auto,codesnippet,384,auto,bgcolor,408,auto,textcolor,432,auto,copyformatting,456,auto,creatediv,480,auto,docprops-rtl,504,auto,docprops,528,auto,easyimagealigncenter,552,auto,easyimagealignleft,576,auto,easyimagealignright,600,auto,easyimagealt,624,auto,easyimagefull,648,auto,easyimageside,672,auto,easyimageupload,696,auto,embed,720,auto,embedsemantic,744,auto,emojipanel,768,auto,exportpdf,792,auto,find-rtl,816,auto,find,840,auto,replace,864,auto,button,888,auto,checkbox,912,auto,form,936,auto,hiddenfield,960,auto,imagebutton,984,auto,radio,1008,auto,select-rtl,1032,auto,select,1056,auto,textarea-rtl,1080,auto,textarea,1104,auto,textfield-rtl,1128,auto,textfield,1152,auto,horizontalrule,1176,auto,iframe,1200,auto,image,1224,auto,indent-rtl,1248,auto,indent,1272,auto,outdent-rtl,1296,auto,outdent,1320,auto,justifyblock,1344,auto,justifycenter,1368,auto,justifyleft,1392,auto,justifyright,1416,auto,language,1440,auto,anchor-rtl,1464,auto,anchor,1488,auto,link,1512,auto,unlink,1536,auto,bulletedlist-rtl,1560,auto,bulletedlist,1584,auto,numberedlist-rtl,1608,auto,numberedlist,1632,auto,mathjax,1656,auto,maximize,1680,auto,newpage-rtl,1704,auto,newpage,1728,auto,pagebreak-rtl,1752,auto,pagebreak,1776,auto,pastefromword-rtl,1800,auto,pastefromword,1824,auto,pastetext-rtl,1848,auto,pastetext,1872,auto,placeholder,1896,auto,preview-rtl,1920,auto,preview,1944,auto,print,1968,auto,removeformat,1992,auto,save,2016,auto,scayt,2040,auto,selectall,2064,auto,showblocks-rtl,2088,auto,showblocks,2112,auto,smiley,2136,auto,source-rtl,2160,auto,source,2184,auto,sourcedialog-rtl,2208,auto,sourcedialog,2232,auto,specialchar,2256,auto,table,2280,auto,templates-rtl,2304,auto,templates,2328,auto,uicolor,2352,auto,redo-rtl,2376,auto,redo,2400,auto,undo-rtl,2424,auto,undo,2448,auto,simplebox,2472,auto,spellchecker,2496,auto",
                    "icons.png")
        })()
    }
})();