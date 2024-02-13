/*!
 * CookieConsent 3.0.0
 * https://github.com/orestbida/cookieconsent/tree/v3
 * Author Orest Bida
 * Released under the MIT License
 */
const e = "opt-in",
  t = "opt-out",
  o = "data-category";
class n {
  constructor() {
    (this.t = {
      mode: e,
      revision: 0,
      autoClearCookies: !0,
      manageScriptTags: !0,
      hideFromBots: !0,
      cookie: {
        name: "cc_cookie",
        expiresAfterDays: 182,
        domain: "",
        path: "/",
        sameSite: "Lax",
      },
    }),
      (this.o = {
        i: {},
        l: "",
        _: {},
        u: {},
        p: {},
        m: [],
        C: !1,
        v: null,
        S: null,
        h: null,
        D: "",
        T: !0,
        N: !1,
        k: !0,
        j: [],
        O: !1,
        A: "",
        I: !1,
        R: [],
        F: [],
        L: [],
        M: [],
        P: !1,
        J: {},
        U: {},
        B: {},
        G: {},
        H: {},
        q: [],
      }),
      (this.K = {}),
      (this.V = {
        W: "cc:onFirstConsent",
        X: "cc:onConsent",
        Y: "cc:onChange",
      });
  }
}
const s = new n(),
  c = (e, t) => e.indexOf(t),
  r = (e, t) => -1 !== c(e, t),
  a = (e) => Array.isArray(e),
  i = (e) => "string" == typeof e,
  l = (e) => !!e && "object" == typeof e && !a(e),
  d = (e) => "function" == typeof e,
  f = (e) => Object.keys(e),
  _ = (e) => Array.from(new Set(e)),
  u = (e) => {
    const t = document.createElement(e);
    return "button" === e && (t.type = e), t;
  },
  p = (e, t, o) => e.setAttribute(t, o),
  m = (e, t, o) => {
    e.removeAttribute(o ? "data-" + t : t);
  },
  g = (e, t, o) => e.getAttribute(o ? "data-" + t : t),
  C = (e) => {
    if ("object" != typeof e) return e;
    if (e instanceof Date) return new Date(e.getTime());
    let t = Array.isArray(e) ? [] : {};
    for (let o in e) {
      let n = e[o];
      t[o] = C(n);
    }
    return t;
  },
  v = () => {
    const e = {},
      { R: t, J: o, U: n } = s.o;
    for (const s of t) e[s] = S(n[s], f(o[s]));
    return e;
  },
  y = () => {
    const e = s.t.cookie.expiresAfterDays;
    return d(e) ? e(s.o.A) : e;
  },
  S = (e, t) => {
    const o = e || [],
      n = t || [];
    return o.filter((e) => !r(n, e)).concat(n.filter((e) => !r(o, e)));
  },
  h = (e) => {
    (s.o.F = _(e)),
      (s.o.A = (() => {
        let e = "custom";
        const { F: t, R: o, L: n } = s.o,
          c = t.length;
        return (
          c === o.length ? (e = "all") : c === n.length && (e = "necessary"), e
        );
      })());
  },
  w = (e, t, o) => {
    const { Y: n, X: c, W: r, Z: a, $: i, ee: l } = s.K,
      f = s.V,
      _ = { cookie: s.o.p };
    e === f.W
      ? d(r) && r(C(_))
      : e === f.X
      ? d(c) && c(C(_))
      : ((_.changedCategories = s.o.j),
        (_.changedServices = s.o.G),
        d(n) && n(C(_))),
      ((e, t) => {
        dispatchEvent(new CustomEvent(e, { detail: t }));
      })(e, C(_));
  },
  D = (e, t) => {
    try {
      return e();
    } catch (e) {
      return !t && console.warn("CookieConsent:", e), !1;
    }
  },
  b = (e) => {
    const { U: t, G: n, R: c, J: a, q: i, p: l, j: f } = s.o;
    for (const e of c) {
      const o = n[e] || t[e] || [];
      for (const n of o) {
        const o = a[e][n];
        if (!o) continue;
        const { onAccept: s, onReject: c } = o;
        !o.te && r(t[e], n) && d(s)
          ? ((o.te = !0), s())
          : o.te && !r(t[e], n) && d(c) && ((o.te = !1), c());
      }
    }
    if (!s.t.manageScriptTags) return;
    const _ = i,
      C = e || l.categories || [],
      v = (e, s) => {
        if (s >= e.length) return;
        const c = i[s];
        if (c.oe) return v(e, s + 1);
        const a = c.ne,
          l = c.se,
          d = c.ce,
          _ = r(C, l),
          y = !!d && r(t[l], d);
        if (
          (!d && !c.re && _) ||
          (!d && c.re && !_ && r(f, l)) ||
          (d && !c.re && y) ||
          (d && c.re && !y && r(n[l] || [], d))
        ) {
          c.oe = !0;
          const t = g(a, "type", !0);
          m(a, "type", !!t), m(a, o);
          let n = g(a, "src", !0);
          n && m(a, "src", !0);
          const r = u("script");
          r.textContent = a.innerHTML;
          for (const { nodeName: e } of a.attributes) p(r, e, a[e] || g(a, e));
          t && (r.type = t), n ? (r.src = n) : (n = a.src);
          const i = !!n && (!t || ["text/javascript", "module"].includes(t));
          if (
            (i &&
              (r.onload = r.onerror =
                () => {
                  v(e, ++s);
                }),
            a.replaceWith(r),
            i)
          )
            return;
        }
        v(e, ++s);
      };
    v(_, 0);
  },
  T = (e) => D(() => localStorage.removeItem(e)),
  N = (e, t) => {
    if (t instanceof RegExp) return e.filter((e) => t.test(e));
    {
      const o = c(e, t);
      return o > -1 ? [e[o]] : [];
    }
  },
  k = (e) => {
    const { hostname: t, protocol: o } = location,
      {
        name: n,
        path: c,
        domain: a,
        sameSite: i,
        useLocalStorage: l,
      } = s.t.cookie,
      d = e
        ? (() => {
            const e = s.o.h,
              t = e ? new Date() - e : 0;
            return 864e5 * y() - t;
          })()
        : 864e5 * y(),
      f = new Date();
    f.setTime(f.getTime() + d), (s.o.p.expirationTime = f.getTime());
    const _ = JSON.stringify(s.o.p);
    let u =
      n +
      "=" +
      encodeURIComponent(_) +
      (0 !== d ? "; expires=" + f.toUTCString() : "") +
      "; Path=" +
      c +
      "; SameSite=" +
      i;
    r(t, ".") && (u += "; Domain=" + a),
      "https:" === o && (u += "; Secure"),
      l
        ? ((e, t) => {
            D(() => localStorage.setItem(e, t));
          })(n, _)
        : (document.cookie = u),
      s.o.p;
  },
  j = (e, t, o) => {
    if (0 === e.length) return;
    const n = o || s.t.cookie.domain,
      c = t || s.t.cookie.path,
      r = "www." === n.slice(0, 4),
      a = r && n.substring(4),
      i = (e, t) => {
        document.cookie =
          e +
          "=; path=" +
          c +
          (t ? "; domain=." + t : "") +
          "; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      };
    for (const t of e) i(t), i(t, n), r && i(t, a);
  },
  x = (e) => {
    const t = e || s.t.cookie.name,
      o = s.t.cookie.useLocalStorage;
    return ((e, t) => {
      let o;
      return (
        (o = D(() => JSON.parse(t ? e : decodeURIComponent(e)), !0) || {}), o
      );
    })(o ? ((n = t), D(() => localStorage.getItem(n)) || "") : E(t, !0), o);
    var n;
  },
  E = (e, t) => {
    const o = document.cookie.match("(^|;)\\s*" + e + "\\s*=\\s*([^;]+)");
    return o ? (t ? o.pop() : e) : "";
  },
  O = (e) => {
    const t = document.cookie.split(/;\s*/),
      o = [];
    for (const n of t) {
      let t = n.split("=")[0];
      e
        ? D(() => {
            e.test(t) && o.push(t);
          })
        : o.push(t);
    }
    return o;
  },
  A = (o, n = []) => {
    ((e, t) => {
      const { R: o, F: n, L: c, ae: l, B: d, J: _ } = s.o;
      let u = [];
      if (e) {
        a(e) ? u.push(...e) : i(e) && (u = "all" === e ? o : [e]);
        for (const e of o) d[e] = r(u, e) ? f(_[e]) : [];
      } else u = n;
      (u = u.filter((e) => !r(o, e) || !r(t, e))), u.push(...c), h(u);
    })(o, n),
      ((e) => {
        const t = s.o,
          { B: o, L: n, U: c, J: a, R: i } = t,
          l = i;
        t.H = C(c);
        for (const e of l) {
          const t = a[e],
            s = f(t),
            i = o[e] && o[e].length > 0,
            l = r(n, e);
          if (0 !== s.length) {
            if (((c[e] = []), l)) c[e].push(...s);
            else if (i) {
              const t = o[e];
              c[e].push(...t);
            } else c[e] = [];
            c[e] = _(c[e]);
          }
        }
      })(),
      (() => {
        const o = s.o;
        o.j = s.t.mode === t && o.T ? S(o.M, o.F) : S(o.F, o.p.categories);
        let n = o.j.length > 0,
          c = !1;
        for (const e of o.R)
          (o.G[e] = S(o.U[e], o.H[e])), o.G[e].length > 0 && (c = !0);
        o.S || (o.S = new Date()),
          o.D ||
            (o.D = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (e) =>
              (
                e ^
                (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (e / 4)))
              ).toString(16)
            )),
          (o.p = {
            categories: C(o.F),
            revision: s.t.revision,
            data: o.v,
            consentTimestamp: o.S.toISOString(),
            consentId: o.D,
            services: C(o.U),
          });
        let a = !1;
        const i = n || c;
        (o.T || i) &&
          (o.T && ((o.T = !1), (a = !0)),
          (o.h = o.h ? new Date() : o.S),
          (o.p.lastConsentTimestamp = o.h.toISOString()),
          k(),
          s.t.autoClearCookies &&
            (a || i) &&
            ((e) => {
              const t = s.o,
                o = O(),
                n = ((e) => {
                  const t = s.o;
                  return (e ? t.R : t.j).filter((e) => {
                    const o = t.I[e];
                    return !!o && !o.readOnly && !!o.autoClear;
                  });
                })(e);
              for (const e in t.G)
                for (const n of t.G[e]) {
                  const s = t.J[e][n].cookies;
                  if (!r(t.U[e], n) && s)
                    for (const e of s) {
                      const t = N(o, e.name);
                      j(t, e.path, e.domain);
                    }
                }
              for (const s of n) {
                const n = t.I[s].autoClear,
                  c = (n && n.cookies) || [],
                  a = r(t.j, s),
                  i = !r(t.F, s),
                  l = a && i;
                if (e ? i : l) {
                  n.reloadPage && l && (t.O = !0);
                  for (const e of c) {
                    const t = N(o, e.name);
                    j(t, e.path, e.domain);
                  }
                }
              }
            })(a),
          b()),
          (a && (w(s.V.W), w(s.V.X), s.t.mode === e)) ||
            (i && w(s.V.Y), o.O && ((o.O = !1), location.reload()));
      })();
  },
  I = (e) => {
    const t = s.o.T ? [] : s.o.F;
    return r(t, e);
  },
  R = (e, t) => {
    const { R: o, J: n } = s.o;
    if (!(e && t && i(t) && r(o, t) && 0 !== f(n[t]).length)) return !1;
    A();
  },
  F = (e, t) => {
    const o = s.o.T ? [] : s.o.U[t];
    return r(o, e);
  },
  L = (e) => "" !== E(e, !0),
  M = (e, t, o) => {
    let n = [];
    const s = (e) => {
      if (i(e)) {
        let t = E(e);
        "" !== t && n.push(t);
      } else n.push(...O(e));
    };
    if (a(e)) for (let t of e) s(t);
    else s(e);
    j(n, t, o);
  },
  P = () => {
    const { A: e, U: t } = s.o,
      { accepted: o, rejected: n } = (() => {
        const { T: e, F: t, R: o } = s.o;
        return { accepted: t, rejected: e ? [] : o.filter((e) => !r(t, e)) };
      })();
    return C({
      acceptType: e,
      acceptedCategories: o,
      rejectedCategories: n,
      acceptedServices: t,
      rejectedServices: v(),
    });
  },
  J = (e, t) => {
    let o = document.querySelector('script[src="' + e + '"]');
    return new Promise((n) => {
      if (o) return n(!0);
      if (((o = u("script")), l(t))) for (const e in t) p(o, e, t[e]);
      var s, c;
      (o.onload = () => n(!0)),
        (o.onerror = () => {
          o.remove(), n(!1);
        }),
        (o.src = e),
        (s = document.head),
        (c = o),
        s.appendChild(c);
    });
  },
  U = (e) => {
    let t,
      o = e.value,
      n = e.mode,
      c = !1;
    const r = s.o;
    if ("update" === n) {
      r.v = t = B("data");
      const e = typeof t == typeof o;
      if (e && "object" == typeof t) {
        !t && (t = {});
        for (let e in o) t[e] !== o[e] && ((t[e] = o[e]), (c = !0));
      } else (!e && t) || t === o || ((t = o), (c = !0));
    } else (t = o), (c = !0);
    return c && ((r.v = t), (r.p.data = t), k(!0)), c;
  },
  B = (e, t) => {
    const o = x(t);
    return e ? o[e] : o;
  },
  G = (e) => {
    const t = s.t,
      o = s.o.i;
    return e ? t[e] || o[e] : { ...t, ...o, cookie: { ...t.cookie } };
  },
  H = () => !s.o.T,
  q = async (e) => {
    const { o: n, t: c, V: d } = s,
      _ = window;
    if (!_._ccRun) {
      if (
        ((_._ccRun = !0),
        ((e) => {
          const { ie: n, t: c, o: a } = s,
            i = c,
            d = a,
            { cookie: _ } = i,
            u = s.K,
            p = e.cookie,
            m = e.categories,
            C = f(m) || [],
            v = navigator,
            y = document;
          (n.le = y),
            (_.domain = location.hostname),
            (d.i = e),
            (d.I = m),
            (d.R = C),
            (u.W = e.onFirstConsent),
            (u.X = e.onConsent),
            (u.Y = e.onChange);
          const {
            mode: S,
            autoClearCookies: h,
            revision: w,
            manageScriptTags: D,
            hideFromBots: b,
          } = e;
          S === t && (i.mode = S),
            "boolean" == typeof h && (i.autoClearCookies = h),
            "boolean" == typeof D && (i.manageScriptTags = D),
            "number" == typeof w && w >= 0 && ((i.revision = w), (d.N = !0)),
            !1 === b && (i.hideFromBots = !1),
            !0 === i.hideFromBots &&
              v &&
              (d.P =
                (v.userAgent &&
                  /bot|crawl|spider|slurp|teoma/i.test(v.userAgent)) ||
                v.webdriver),
            l(p) && (i.cookie = { ..._, ...p }),
            i.autoClearCookies,
            d.N,
            i.manageScriptTags,
            ((e) => {
              const { I: t, J: o, U: n, B: c, L: r } = s.o;
              for (let a of e) {
                const e = t[a],
                  i = e.services || {},
                  d = (l(i) && f(i)) || [];
                (o[a] = {}),
                  (n[a] = []),
                  (c[a] = []),
                  e.readOnly && (r.push(a), (n[a] = d)),
                  (s.ie.de[a] = {});
                for (let e of d) {
                  const t = i[e];
                  (t.te = !1), (o[a][e] = t);
                }
              }
            })(C),
            (() => {
              if (!s.t.manageScriptTags) return;
              const e = s.o,
                t =
                  ((n = document),
                  (c = "script[" + o + "]"),
                  n.querySelectorAll(c));
              var n, c;
              for (const n of t) {
                let t = g(n, o),
                  s = n.dataset.service || "",
                  c = !1;
                if (
                  (t && "!" === t.charAt(0) && ((t = t.slice(1)), (c = !0)),
                  "!" === s.charAt(0) && ((s = s.slice(1)), (c = !0)),
                  r(e.R, t) &&
                    (e.q.push({ ne: n, oe: !1, re: c, se: t, ce: s }), s))
                ) {
                  const o = e.J[t];
                  o[s] || (o[s] = { te: !1 });
                }
              }
            })();
        })(e),
        n.P)
      )
        return;
      if (
        ((() => {
          const e = s.o,
            o = s.t,
            n = x(),
            {
              categories: c,
              services: r,
              consentId: l,
              consentTimestamp: d,
              lastConsentTimestamp: f,
              data: _,
              revision: u,
            } = n,
            p = a(c);
          (e.p = n), (e.D = l);
          const m = !!l && i(l);
          (e.S = d),
            e.S && (e.S = new Date(d)),
            (e.h = f),
            e.h && (e.h = new Date(f)),
            (e.v = void 0 !== _ ? _ : null),
            e.N && m && u !== o.revision && (e.k = !1),
            (e.T = !(m && e.k && e.S && e.h && p)),
            o.cookie.useLocalStorage &&
              !e.T &&
              ((e.T = new Date().getTime() > (n.expirationTime || 0)),
              e.T && T(o.cookie.name)),
            e.T,
            (() => {
              const e = s.o;
              for (const o of e.R) {
                const n = e.I[o];
                if (n.readOnly || (n.enabled && e.i.mode === t)) {
                  e.M.push(o);
                  const t = e.J[o] || {};
                  for (let n in t) e.U[o].push(n);
                }
              }
            })(),
            e.T
              ? o.mode === t && (e.F = [...e.M])
              : ((e.U = { ...e.U, ...r }), h([...e.L, ...c])),
            (e.B = { ...e.U });
        })(),
        H())
      )
        return b(), w(d.X);
      c.mode === t && b(n.M);
    }
  },
  z = (e) => {
    const { name: t, path: o, domain: c, useLocalStorage: r } = s.t.cookie;
    e && (r ? T(t) : M(t, o, c));
    for (const { fe: e, _e: t, ue: o } of s.o.m) e.removeEventListener(t, o);
    const a = new n();
    for (const e in s) s[e] = a[e];
    window._ccRun = !1;
  };
export {
  A as acceptCategory,
  R as acceptService,
  I as acceptedCategory,
  F as acceptedService,
  M as eraseCookies,
  G as getConfig,
  B as getCookie,
  P as getUserPreferences,
  J as loadScript,
  z as reset,
  q as run,
  U as setCookieData,
  H as validConsent,
  L as validCookie,
};

/*!
 * CookieConsent 3.0.0
 * https://github.com/orestbida/cookieconsent/tree/v3
 * Author Orest Bida
 * Released under the MIT License
 */
var e, t;
(e = this),
  (t = function (e) {
    "use strict";
    const t = "opt-in",
      o = "opt-out",
      n = "data-category";
    class s {
      constructor() {
        (this.t = {
          mode: t,
          revision: 0,
          autoClearCookies: !0,
          manageScriptTags: !0,
          hideFromBots: !0,
          cookie: {
            name: "cc_cookie",
            expiresAfterDays: 182,
            domain: "",
            path: "/",
            sameSite: "Lax",
          },
        }),
          (this.o = {
            i: {},
            l: "",
            _: {},
            u: {},
            p: {},
            m: [],
            C: !1,
            v: null,
            S: null,
            h: null,
            D: "",
            T: !0,
            N: !1,
            j: !0,
            k: [],
            O: !1,
            A: "",
            I: !1,
            R: [],
            F: [],
            L: [],
            M: [],
            P: !1,
            J: {},
            U: {},
            B: {},
            G: {},
            H: {},
            q: [],
          }),
          (this.K = {}),
          (this.V = {
            W: "cc:onFirstConsent",
            X: "cc:onConsent",
            Y: "cc:onChange",
          });
      }
    }
    const c = new s(),
      r = (e, t) => e.indexOf(t),
      a = (e, t) => -1 !== r(e, t),
      i = (e) => Array.isArray(e),
      l = (e) => "string" == typeof e,
      f = (e) => !!e && "object" == typeof e && !i(e),
      d = (e) => "function" == typeof e,
      _ = (e) => Object.keys(e),
      u = (e) => Array.from(new Set(e)),
      p = (e) => {
        const t = document.createElement(e);
        return "button" === e && (t.type = e), t;
      },
      m = (e, t, o) => e.setAttribute(t, o),
      g = (e, t, o) => {
        e.removeAttribute(o ? "data-" + t : t);
      },
      C = (e, t, o) => e.getAttribute(o ? "data-" + t : t),
      v = (e) => {
        if ("object" != typeof e) return e;
        if (e instanceof Date) return new Date(e.getTime());
        let t = Array.isArray(e) ? [] : {};
        for (let o in e) {
          let n = e[o];
          t[o] = v(n);
        }
        return t;
      },
      y = () => {
        const e = {},
          { R: t, J: o, U: n } = c.o;
        for (const s of t) e[s] = h(n[s], _(o[s]));
        return e;
      },
      S = () => {
        const e = c.t.cookie.expiresAfterDays;
        return d(e) ? e(c.o.A) : e;
      },
      h = (e, t) => {
        const o = e || [],
          n = t || [];
        return o.filter((e) => !a(n, e)).concat(n.filter((e) => !a(o, e)));
      },
      b = (e) => {
        (c.o.F = u(e)),
          (c.o.A = (() => {
            let e = "custom";
            const { F: t, R: o, L: n } = c.o,
              s = t.length;
            return (
              s === o.length
                ? (e = "all")
                : s === n.length && (e = "necessary"),
              e
            );
          })());
      },
      w = (e, t, o) => {
        const { Y: n, X: s, W: r, Z: a, $: i, ee: l } = c.K,
          f = c.V,
          _ = { cookie: c.o.p };
        e === f.W
          ? d(r) && r(v(_))
          : e === f.X
          ? d(s) && s(v(_))
          : ((_.changedCategories = c.o.k),
            (_.changedServices = c.o.G),
            d(n) && n(v(_))),
          ((e, t) => {
            dispatchEvent(new CustomEvent(e, { detail: t }));
          })(e, v(_));
      },
      D = (e, t) => {
        try {
          return e();
        } catch (e) {
          return !t && console.warn("CookieConsent:", e), !1;
        }
      },
      T = (e) => {
        const { U: t, G: o, R: s, J: r, q: i, p: l, k: f } = c.o;
        for (const e of s) {
          const n = o[e] || t[e] || [];
          for (const o of n) {
            const n = r[e][o];
            if (!n) continue;
            const { onAccept: s, onReject: c } = n;
            !n.te && a(t[e], o) && d(s)
              ? ((n.te = !0), s())
              : n.te && !a(t[e], o) && d(c) && ((n.te = !1), c());
          }
        }
        if (!c.t.manageScriptTags) return;
        const _ = i,
          u = e || l.categories || [],
          v = (e, s) => {
            if (s >= e.length) return;
            const c = i[s];
            if (c.oe) return v(e, s + 1);
            const r = c.ne,
              l = c.se,
              d = c.ce,
              _ = a(u, l),
              y = !!d && a(t[l], d);
            if (
              (!d && !c.re && _) ||
              (!d && c.re && !_ && a(f, l)) ||
              (d && !c.re && y) ||
              (d && c.re && !y && a(o[l] || [], d))
            ) {
              c.oe = !0;
              const t = C(r, "type", !0);
              g(r, "type", !!t), g(r, n);
              let o = C(r, "src", !0);
              o && g(r, "src", !0);
              const a = p("script");
              a.textContent = r.innerHTML;
              for (const { nodeName: e } of r.attributes)
                m(a, e, r[e] || C(r, e));
              t && (a.type = t), o ? (a.src = o) : (o = r.src);
              const i =
                !!o && (!t || ["text/javascript", "module"].includes(t));
              if (
                (i &&
                  (a.onload = a.onerror =
                    () => {
                      v(e, ++s);
                    }),
                r.replaceWith(a),
                i)
              )
                return;
            }
            v(e, ++s);
          };
        v(_, 0);
      },
      N = (e) => D(() => localStorage.removeItem(e)),
      j = (e, t) => {
        if (t instanceof RegExp) return e.filter((e) => t.test(e));
        {
          const o = r(e, t);
          return o > -1 ? [e[o]] : [];
        }
      },
      k = (e) => {
        const { hostname: t, protocol: o } = location,
          {
            name: n,
            path: s,
            domain: r,
            sameSite: i,
            useLocalStorage: l,
          } = c.t.cookie,
          f = e
            ? (() => {
                const e = c.o.h,
                  t = e ? new Date() - e : 0;
                return 864e5 * S() - t;
              })()
            : 864e5 * S(),
          d = new Date();
        d.setTime(d.getTime() + f), (c.o.p.expirationTime = d.getTime());
        const _ = JSON.stringify(c.o.p);
        let u =
          n +
          "=" +
          encodeURIComponent(_) +
          (0 !== f ? "; expires=" + d.toUTCString() : "") +
          "; Path=" +
          s +
          "; SameSite=" +
          i;
        a(t, ".") && (u += "; Domain=" + r),
          "https:" === o && (u += "; Secure"),
          l
            ? ((e, t) => {
                D(() => localStorage.setItem(e, t));
              })(n, _)
            : (document.cookie = u),
          c.o.p;
      },
      x = (e, t, o) => {
        if (0 === e.length) return;
        const n = o || c.t.cookie.domain,
          s = t || c.t.cookie.path,
          r = "www." === n.slice(0, 4),
          a = r && n.substring(4),
          i = (e, t) => {
            document.cookie =
              e +
              "=; path=" +
              s +
              (t ? "; domain=." + t : "") +
              "; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
          };
        for (const t of e) i(t), i(t, n), r && i(t, a);
      },
      E = (e) => {
        const t = e || c.t.cookie.name,
          o = c.t.cookie.useLocalStorage;
        return ((e, t) => {
          let o;
          return (
            (o = D(() => JSON.parse(t ? e : decodeURIComponent(e)), !0) || {}),
            o
          );
        })(o ? ((n = t), D(() => localStorage.getItem(n)) || "") : O(t, !0), o);
        var n;
      },
      O = (e, t) => {
        const o = document.cookie.match("(^|;)\\s*" + e + "\\s*=\\s*([^;]+)");
        return o ? (t ? o.pop() : e) : "";
      },
      A = (e) => {
        const t = document.cookie.split(/;\s*/),
          o = [];
        for (const n of t) {
          let t = n.split("=")[0];
          e
            ? D(() => {
                e.test(t) && o.push(t);
              })
            : o.push(t);
        }
        return o;
      },
      I = (e, n = []) => {
        ((e, t) => {
          const { R: o, F: n, L: s, ae: r, B: f, J: d } = c.o;
          let u = [];
          if (e) {
            i(e) ? u.push(...e) : l(e) && (u = "all" === e ? o : [e]);
            for (const e of o) f[e] = a(u, e) ? _(d[e]) : [];
          } else u = n;
          (u = u.filter((e) => !a(o, e) || !a(t, e))), u.push(...s), b(u);
        })(e, n),
          ((e) => {
            const t = c.o,
              { B: o, L: n, U: s, J: r, R: i } = t,
              l = i;
            t.H = v(s);
            for (const e of l) {
              const t = r[e],
                c = _(t),
                i = o[e] && o[e].length > 0,
                l = a(n, e);
              if (0 !== c.length) {
                if (((s[e] = []), l)) s[e].push(...c);
                else if (i) {
                  const t = o[e];
                  s[e].push(...t);
                } else s[e] = [];
                s[e] = u(s[e]);
              }
            }
          })(),
          (() => {
            const e = c.o;
            e.k = c.t.mode === o && e.T ? h(e.M, e.F) : h(e.F, e.p.categories);
            let n = e.k.length > 0,
              s = !1;
            for (const t of e.R)
              (e.G[t] = h(e.U[t], e.H[t])), e.G[t].length > 0 && (s = !0);
            e.S || (e.S = new Date()),
              e.D ||
                (e.D = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
                  /[018]/g,
                  (e) =>
                    (
                      e ^
                      (crypto.getRandomValues(new Uint8Array(1))[0] &
                        (15 >> (e / 4)))
                    ).toString(16)
                )),
              (e.p = {
                categories: v(e.F),
                revision: c.t.revision,
                data: e.v,
                consentTimestamp: e.S.toISOString(),
                consentId: e.D,
                services: v(e.U),
              });
            let r = !1;
            const i = n || s;
            (e.T || i) &&
              (e.T && ((e.T = !1), (r = !0)),
              (e.h = e.h ? new Date() : e.S),
              (e.p.lastConsentTimestamp = e.h.toISOString()),
              k(),
              c.t.autoClearCookies &&
                (r || i) &&
                ((e) => {
                  const t = c.o,
                    o = A(),
                    n = ((e) => {
                      const t = c.o;
                      return (e ? t.R : t.k).filter((e) => {
                        const o = t.I[e];
                        return !!o && !o.readOnly && !!o.autoClear;
                      });
                    })(e);
                  for (const e in t.G)
                    for (const n of t.G[e]) {
                      const s = t.J[e][n].cookies;
                      if (!a(t.U[e], n) && s)
                        for (const e of s) {
                          const t = j(o, e.name);
                          x(t, e.path, e.domain);
                        }
                    }
                  for (const s of n) {
                    const n = t.I[s].autoClear,
                      c = (n && n.cookies) || [],
                      r = a(t.k, s),
                      i = !a(t.F, s),
                      l = r && i;
                    if (e ? i : l) {
                      n.reloadPage && l && (t.O = !0);
                      for (const e of c) {
                        const t = j(o, e.name);
                        x(t, e.path, e.domain);
                      }
                    }
                  }
                })(r),
              T()),
              (r && (w(c.V.W), w(c.V.X), c.t.mode === t)) ||
                (i && w(c.V.Y), e.O && ((e.O = !1), location.reload()));
          })();
      },
      R = (e, t, o) => {
        let n = [];
        const s = (e) => {
          if (l(e)) {
            let t = O(e);
            "" !== t && n.push(t);
          } else n.push(...A(e));
        };
        if (i(e)) for (let t of e) s(t);
        else s(e);
        x(n, t, o);
      },
      F = (e, t) => {
        const o = E(t);
        return e ? o[e] : o;
      },
      L = () => !c.o.T;
    (e.acceptCategory = I),
      (e.acceptService = (e, t) => {
        const { R: o, J: n } = c.o;
        if (!(e && t && l(t) && a(o, t) && 0 !== _(n[t]).length)) return !1;
        I();
      }),
      (e.acceptedCategory = (e) => {
        const t = c.o.T ? [] : c.o.F;
        return a(t, e);
      }),
      (e.acceptedService = (e, t) => {
        const o = c.o.T ? [] : c.o.U[t];
        return a(o, e);
      }),
      (e.eraseCookies = R),
      (e.getConfig = (e) => {
        const t = c.t,
          o = c.o.i;
        return e ? t[e] || o[e] : { ...t, ...o, cookie: { ...t.cookie } };
      }),
      (e.getCookie = F),
      (e.getUserPreferences = () => {
        const { A: e, U: t } = c.o,
          { accepted: o, rejected: n } = (() => {
            const { T: e, F: t, R: o } = c.o;
            return {
              accepted: t,
              rejected: e ? [] : o.filter((e) => !a(t, e)),
            };
          })();
        return v({
          acceptType: e,
          acceptedCategories: o,
          rejectedCategories: n,
          acceptedServices: t,
          rejectedServices: y(),
        });
      }),
      (e.loadScript = (e, t) => {
        let o = document.querySelector('script[src="' + e + '"]');
        return new Promise((n) => {
          if (o) return n(!0);
          if (((o = p("script")), f(t))) for (const e in t) m(o, e, t[e]);
          var s, c;
          (o.onload = () => n(!0)),
            (o.onerror = () => {
              o.remove(), n(!1);
            }),
            (o.src = e),
            (s = document.head),
            (c = o),
            s.appendChild(c);
        });
      }),
      (e.reset = (e) => {
        const { name: t, path: o, domain: n, useLocalStorage: r } = c.t.cookie;
        e && (r ? N(t) : R(t, o, n));
        for (const { ie: e, le: t, fe: o } of c.o.m)
          e.removeEventListener(t, o);
        const a = new s();
        for (const e in c) c[e] = a[e];
        window._ccRun = !1;
      }),
      (e.run = async (e) => {
        const { o: t, t: s, V: r } = c,
          d = window;
        if (!d._ccRun) {
          if (
            ((d._ccRun = !0),
            ((e) => {
              const { de: t, t: s, o: r } = c,
                i = s,
                l = r,
                { cookie: d } = i,
                u = c.K,
                p = e.cookie,
                m = e.categories,
                g = _(m) || [],
                v = navigator,
                y = document;
              (t._e = y),
                (d.domain = location.hostname),
                (l.i = e),
                (l.I = m),
                (l.R = g),
                (u.W = e.onFirstConsent),
                (u.X = e.onConsent),
                (u.Y = e.onChange);
              const {
                mode: S,
                autoClearCookies: h,
                revision: b,
                manageScriptTags: w,
                hideFromBots: D,
              } = e;
              S === o && (i.mode = S),
                "boolean" == typeof h && (i.autoClearCookies = h),
                "boolean" == typeof w && (i.manageScriptTags = w),
                "number" == typeof b &&
                  b >= 0 &&
                  ((i.revision = b), (l.N = !0)),
                !1 === D && (i.hideFromBots = !1),
                !0 === i.hideFromBots &&
                  v &&
                  (l.P =
                    (v.userAgent &&
                      /bot|crawl|spider|slurp|teoma/i.test(v.userAgent)) ||
                    v.webdriver),
                f(p) && (i.cookie = { ...d, ...p }),
                i.autoClearCookies,
                l.N,
                i.manageScriptTags,
                ((e) => {
                  const { I: t, J: o, U: n, B: s, L: r } = c.o;
                  for (let a of e) {
                    const e = t[a],
                      i = e.services || {},
                      l = (f(i) && _(i)) || [];
                    (o[a] = {}),
                      (n[a] = []),
                      (s[a] = []),
                      e.readOnly && (r.push(a), (n[a] = l)),
                      (c.de.ue[a] = {});
                    for (let e of l) {
                      const t = i[e];
                      (t.te = !1), (o[a][e] = t);
                    }
                  }
                })(g),
                (() => {
                  if (!c.t.manageScriptTags) return;
                  const e = c.o,
                    t =
                      ((o = document),
                      (s = "script[" + n + "]"),
                      o.querySelectorAll(s));
                  var o, s;
                  for (const o of t) {
                    let t = C(o, n),
                      s = o.dataset.service || "",
                      c = !1;
                    if (
                      (t && "!" === t.charAt(0) && ((t = t.slice(1)), (c = !0)),
                      "!" === s.charAt(0) && ((s = s.slice(1)), (c = !0)),
                      a(e.R, t) &&
                        (e.q.push({ ne: o, oe: !1, re: c, se: t, ce: s }), s))
                    ) {
                      const o = e.J[t];
                      o[s] || (o[s] = { te: !1 });
                    }
                  }
                })();
            })(e),
            t.P)
          )
            return;
          if (
            ((() => {
              const e = c.o,
                t = c.t,
                n = E(),
                {
                  categories: s,
                  services: r,
                  consentId: a,
                  consentTimestamp: f,
                  lastConsentTimestamp: d,
                  data: _,
                  revision: u,
                } = n,
                p = i(s);
              (e.p = n), (e.D = a);
              const m = !!a && l(a);
              (e.S = f),
                e.S && (e.S = new Date(f)),
                (e.h = d),
                e.h && (e.h = new Date(d)),
                (e.v = void 0 !== _ ? _ : null),
                e.N && m && u !== t.revision && (e.j = !1),
                (e.T = !(m && e.j && e.S && e.h && p)),
                t.cookie.useLocalStorage &&
                  !e.T &&
                  ((e.T = new Date().getTime() > (n.expirationTime || 0)),
                  e.T && N(t.cookie.name)),
                e.T,
                (() => {
                  const e = c.o;
                  for (const t of e.R) {
                    const n = e.I[t];
                    if (n.readOnly || (n.enabled && e.i.mode === o)) {
                      e.M.push(t);
                      const o = e.J[t] || {};
                      for (let n in o) e.U[t].push(n);
                    }
                  }
                })(),
                e.T
                  ? t.mode === o && (e.F = [...e.M])
                  : ((e.U = { ...e.U, ...r }), b([...e.L, ...s])),
                (e.B = { ...e.U });
            })(),
            L())
          )
            return T(), w(r.X);
          s.mode === o && T(t.M);
        }
      }),
      (e.setCookieData = (e) => {
        let t,
          o = e.value,
          n = e.mode,
          s = !1;
        const r = c.o;
        if ("update" === n) {
          r.v = t = F("data");
          const e = typeof t == typeof o;
          if (e && "object" == typeof t) {
            !t && (t = {});
            for (let e in o) t[e] !== o[e] && ((t[e] = o[e]), (s = !0));
          } else (!e && t) || t === o || ((t = o), (s = !0));
        } else (t = o), (s = !0);
        return s && ((r.v = t), (r.p.data = t), k(!0)), s;
      }),
      (e.validConsent = L),
      (e.validCookie = (e) => "" !== O(e, !0));
  }),
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], t)
    : t(
        ((e =
          "undefined" != typeof globalThis
            ? globalThis
            : e || self).CookieConsent = {})
      );

/*!
 * CookieConsent 3.0.0
 * https://github.com/orestbida/cookieconsent/tree/v3
 * Author Orest Bida
 * Released under the MIT License
 */
const e = "opt-in",
  t = "opt-out",
  o = "data-category";
class n {
  constructor() {
    (this.t = {
      mode: e,
      revision: 0,
      autoClearCookies: !0,
      manageScriptTags: !0,
      hideFromBots: !0,
      cookie: {
        name: "cc_cookie",
        expiresAfterDays: 182,
        domain: "",
        path: "/",
        sameSite: "Lax",
      },
    }),
      (this.o = {
        i: {},
        l: "",
        _: {},
        u: {},
        p: {},
        m: [],
        C: !1,
        v: null,
        S: null,
        h: null,
        D: "",
        T: !0,
        N: !1,
        k: !0,
        j: [],
        O: !1,
        A: "",
        I: !1,
        R: [],
        F: [],
        L: [],
        M: [],
        P: !1,
        J: {},
        U: {},
        B: {},
        G: {},
        H: {},
        q: [],
      }),
      (this.K = {}),
      (this.V = {
        W: "cc:onFirstConsent",
        X: "cc:onConsent",
        Y: "cc:onChange",
      });
  }
}
const s = new n(),
  c = (e, t) => e.indexOf(t),
  r = (e, t) => -1 !== c(e, t),
  a = (e) => Array.isArray(e),
  i = (e) => "string" == typeof e,
  l = (e) => !!e && "object" == typeof e && !a(e),
  d = (e) => "function" == typeof e,
  f = (e) => Object.keys(e),
  _ = (e) => Array.from(new Set(e)),
  u = (e) => {
    const t = document.createElement(e);
    return "button" === e && (t.type = e), t;
  },
  p = (e, t, o) => e.setAttribute(t, o),
  m = (e, t, o) => {
    e.removeAttribute(o ? "data-" + t : t);
  },
  g = (e, t, o) => e.getAttribute(o ? "data-" + t : t),
  C = (e) => {
    if ("object" != typeof e) return e;
    if (e instanceof Date) return new Date(e.getTime());
    let t = Array.isArray(e) ? [] : {};
    for (let o in e) {
      let n = e[o];
      t[o] = C(n);
    }
    return t;
  },
  v = () => {
    const e = {},
      { R: t, J: o, U: n } = s.o;
    for (const s of t) e[s] = S(n[s], f(o[s]));
    return e;
  },
  y = () => {
    const e = s.t.cookie.expiresAfterDays;
    return d(e) ? e(s.o.A) : e;
  },
  S = (e, t) => {
    const o = e || [],
      n = t || [];
    return o.filter((e) => !r(n, e)).concat(n.filter((e) => !r(o, e)));
  },
  h = (e) => {
    (s.o.F = _(e)),
      (s.o.A = (() => {
        let e = "custom";
        const { F: t, R: o, L: n } = s.o,
          c = t.length;
        return (
          c === o.length ? (e = "all") : c === n.length && (e = "necessary"), e
        );
      })());
  },
  w = (e, t, o) => {
    const { Y: n, X: c, W: r, Z: a, $: i, ee: l } = s.K,
      f = s.V,
      _ = { cookie: s.o.p };
    e === f.W
      ? d(r) && r(C(_))
      : e === f.X
      ? d(c) && c(C(_))
      : ((_.changedCategories = s.o.j),
        (_.changedServices = s.o.G),
        d(n) && n(C(_))),
      ((e, t) => {
        dispatchEvent(new CustomEvent(e, { detail: t }));
      })(e, C(_));
  },
  D = (e, t) => {
    try {
      return e();
    } catch (e) {
      return !t && console.warn("CookieConsent:", e), !1;
    }
  },
  b = (e) => {
    const { U: t, G: n, R: c, J: a, q: i, p: l, j: f } = s.o;
    for (const e of c) {
      const o = n[e] || t[e] || [];
      for (const n of o) {
        const o = a[e][n];
        if (!o) continue;
        const { onAccept: s, onReject: c } = o;
        !o.te && r(t[e], n) && d(s)
          ? ((o.te = !0), s())
          : o.te && !r(t[e], n) && d(c) && ((o.te = !1), c());
      }
    }
    if (!s.t.manageScriptTags) return;
    const _ = i,
      C = e || l.categories || [],
      v = (e, s) => {
        if (s >= e.length) return;
        const c = i[s];
        if (c.oe) return v(e, s + 1);
        const a = c.ne,
          l = c.se,
          d = c.ce,
          _ = r(C, l),
          y = !!d && r(t[l], d);
        if (
          (!d && !c.re && _) ||
          (!d && c.re && !_ && r(f, l)) ||
          (d && !c.re && y) ||
          (d && c.re && !y && r(n[l] || [], d))
        ) {
          c.oe = !0;
          const t = g(a, "type", !0);
          m(a, "type", !!t), m(a, o);
          let n = g(a, "src", !0);
          n && m(a, "src", !0);
          const r = u("script");
          r.textContent = a.innerHTML;
          for (const { nodeName: e } of a.attributes) p(r, e, a[e] || g(a, e));
          t && (r.type = t), n ? (r.src = n) : (n = a.src);
          const i = !!n && (!t || ["text/javascript", "module"].includes(t));
          if (
            (i &&
              (r.onload = r.onerror =
                () => {
                  v(e, ++s);
                }),
            a.replaceWith(r),
            i)
          )
            return;
        }
        v(e, ++s);
      };
    v(_, 0);
  },
  T = (e) => D(() => localStorage.removeItem(e)),
  N = (e, t) => {
    if (t instanceof RegExp) return e.filter((e) => t.test(e));
    {
      const o = c(e, t);
      return o > -1 ? [e[o]] : [];
    }
  },
  k = (e) => {
    const { hostname: t, protocol: o } = location,
      {
        name: n,
        path: c,
        domain: a,
        sameSite: i,
        useLocalStorage: l,
      } = s.t.cookie,
      d = e
        ? (() => {
            const e = s.o.h,
              t = e ? new Date() - e : 0;
            return 864e5 * y() - t;
          })()
        : 864e5 * y(),
      f = new Date();
    f.setTime(f.getTime() + d), (s.o.p.expirationTime = f.getTime());
    const _ = JSON.stringify(s.o.p);
    let u =
      n +
      "=" +
      encodeURIComponent(_) +
      (0 !== d ? "; expires=" + f.toUTCString() : "") +
      "; Path=" +
      c +
      "; SameSite=" +
      i;
    r(t, ".") && (u += "; Domain=" + a),
      "https:" === o && (u += "; Secure"),
      l
        ? ((e, t) => {
            D(() => localStorage.setItem(e, t));
          })(n, _)
        : (document.cookie = u),
      s.o.p;
  },
  j = (e, t, o) => {
    if (0 === e.length) return;
    const n = o || s.t.cookie.domain,
      c = t || s.t.cookie.path,
      r = "www." === n.slice(0, 4),
      a = r && n.substring(4),
      i = (e, t) => {
        document.cookie =
          e +
          "=; path=" +
          c +
          (t ? "; domain=." + t : "") +
          "; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      };
    for (const t of e) i(t), i(t, n), r && i(t, a);
  },
  x = (e) => {
    const t = e || s.t.cookie.name,
      o = s.t.cookie.useLocalStorage;
    return ((e, t) => {
      let o;
      return (
        (o = D(() => JSON.parse(t ? e : decodeURIComponent(e)), !0) || {}), o
      );
    })(o ? ((n = t), D(() => localStorage.getItem(n)) || "") : E(t, !0), o);
    var n;
  },
  E = (e, t) => {
    const o = document.cookie.match("(^|;)\\s*" + e + "\\s*=\\s*([^;]+)");
    return o ? (t ? o.pop() : e) : "";
  },
  O = (e) => {
    const t = document.cookie.split(/;\s*/),
      o = [];
    for (const n of t) {
      let t = n.split("=")[0];
      e
        ? D(() => {
            e.test(t) && o.push(t);
          })
        : o.push(t);
    }
    return o;
  },
  A = (o, n = []) => {
    ((e, t) => {
      const { R: o, F: n, L: c, ae: l, B: d, J: _ } = s.o;
      let u = [];
      if (e) {
        a(e) ? u.push(...e) : i(e) && (u = "all" === e ? o : [e]);
        for (const e of o) d[e] = r(u, e) ? f(_[e]) : [];
      } else u = n;
      (u = u.filter((e) => !r(o, e) || !r(t, e))), u.push(...c), h(u);
    })(o, n),
      ((e) => {
        const t = s.o,
          { B: o, L: n, U: c, J: a, R: i } = t,
          l = i;
        t.H = C(c);
        for (const e of l) {
          const t = a[e],
            s = f(t),
            i = o[e] && o[e].length > 0,
            l = r(n, e);
          if (0 !== s.length) {
            if (((c[e] = []), l)) c[e].push(...s);
            else if (i) {
              const t = o[e];
              c[e].push(...t);
            } else c[e] = [];
            c[e] = _(c[e]);
          }
        }
      })(),
      (() => {
        const o = s.o;
        o.j = s.t.mode === t && o.T ? S(o.M, o.F) : S(o.F, o.p.categories);
        let n = o.j.length > 0,
          c = !1;
        for (const e of o.R)
          (o.G[e] = S(o.U[e], o.H[e])), o.G[e].length > 0 && (c = !0);
        o.S || (o.S = new Date()),
          o.D ||
            (o.D = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (e) =>
              (
                e ^
                (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (e / 4)))
              ).toString(16)
            )),
          (o.p = {
            categories: C(o.F),
            revision: s.t.revision,
            data: o.v,
            consentTimestamp: o.S.toISOString(),
            consentId: o.D,
            services: C(o.U),
          });
        let a = !1;
        const i = n || c;
        (o.T || i) &&
          (o.T && ((o.T = !1), (a = !0)),
          (o.h = o.h ? new Date() : o.S),
          (o.p.lastConsentTimestamp = o.h.toISOString()),
          k(),
          s.t.autoClearCookies &&
            (a || i) &&
            ((e) => {
              const t = s.o,
                o = O(),
                n = ((e) => {
                  const t = s.o;
                  return (e ? t.R : t.j).filter((e) => {
                    const o = t.I[e];
                    return !!o && !o.readOnly && !!o.autoClear;
                  });
                })(e);
              for (const e in t.G)
                for (const n of t.G[e]) {
                  const s = t.J[e][n].cookies;
                  if (!r(t.U[e], n) && s)
                    for (const e of s) {
                      const t = N(o, e.name);
                      j(t, e.path, e.domain);
                    }
                }
              for (const s of n) {
                const n = t.I[s].autoClear,
                  c = (n && n.cookies) || [],
                  a = r(t.j, s),
                  i = !r(t.F, s),
                  l = a && i;
                if (e ? i : l) {
                  n.reloadPage && l && (t.O = !0);
                  for (const e of c) {
                    const t = N(o, e.name);
                    j(t, e.path, e.domain);
                  }
                }
              }
            })(a),
          b()),
          (a && (w(s.V.W), w(s.V.X), s.t.mode === e)) ||
            (i && w(s.V.Y), o.O && ((o.O = !1), location.reload()));
      })();
  },
  I = (e) => {
    const t = s.o.T ? [] : s.o.F;
    return r(t, e);
  },
  R = (e, t) => {
    const { R: o, J: n } = s.o;
    if (!(e && t && i(t) && r(o, t) && 0 !== f(n[t]).length)) return !1;
    A();
  },
  F = (e, t) => {
    const o = s.o.T ? [] : s.o.U[t];
    return r(o, e);
  },
  L = (e) => "" !== E(e, !0),
  M = (e, t, o) => {
    let n = [];
    const s = (e) => {
      if (i(e)) {
        let t = E(e);
        "" !== t && n.push(t);
      } else n.push(...O(e));
    };
    if (a(e)) for (let t of e) s(t);
    else s(e);
    j(n, t, o);
  },
  P = () => {
    const { A: e, U: t } = s.o,
      { accepted: o, rejected: n } = (() => {
        const { T: e, F: t, R: o } = s.o;
        return { accepted: t, rejected: e ? [] : o.filter((e) => !r(t, e)) };
      })();
    return C({
      acceptType: e,
      acceptedCategories: o,
      rejectedCategories: n,
      acceptedServices: t,
      rejectedServices: v(),
    });
  },
  J = (e, t) => {
    let o = document.querySelector('script[src="' + e + '"]');
    return new Promise((n) => {
      if (o) return n(!0);
      if (((o = u("script")), l(t))) for (const e in t) p(o, e, t[e]);
      var s, c;
      (o.onload = () => n(!0)),
        (o.onerror = () => {
          o.remove(), n(!1);
        }),
        (o.src = e),
        (s = document.head),
        (c = o),
        s.appendChild(c);
    });
  },
  U = (e) => {
    let t,
      o = e.value,
      n = e.mode,
      c = !1;
    const r = s.o;
    if ("update" === n) {
      r.v = t = B("data");
      const e = typeof t == typeof o;
      if (e && "object" == typeof t) {
        !t && (t = {});
        for (let e in o) t[e] !== o[e] && ((t[e] = o[e]), (c = !0));
      } else (!e && t) || t === o || ((t = o), (c = !0));
    } else (t = o), (c = !0);
    return c && ((r.v = t), (r.p.data = t), k(!0)), c;
  },
  B = (e, t) => {
    const o = x(t);
    return e ? o[e] : o;
  },
  G = (e) => {
    const t = s.t,
      o = s.o.i;
    return e ? t[e] || o[e] : { ...t, ...o, cookie: { ...t.cookie } };
  },
  H = () => !s.o.T,
  q = async (e) => {
    const { o: n, t: c, V: d } = s,
      _ = window;
    if (!_._ccRun) {
      if (
        ((_._ccRun = !0),
        ((e) => {
          const { ie: n, t: c, o: a } = s,
            i = c,
            d = a,
            { cookie: _ } = i,
            u = s.K,
            p = e.cookie,
            m = e.categories,
            C = f(m) || [],
            v = navigator,
            y = document;
          (n.le = y),
            (_.domain = location.hostname),
            (d.i = e),
            (d.I = m),
            (d.R = C),
            (u.W = e.onFirstConsent),
            (u.X = e.onConsent),
            (u.Y = e.onChange);
          const {
            mode: S,
            autoClearCookies: h,
            revision: w,
            manageScriptTags: D,
            hideFromBots: b,
          } = e;
          S === t && (i.mode = S),
            "boolean" == typeof h && (i.autoClearCookies = h),
            "boolean" == typeof D && (i.manageScriptTags = D),
            "number" == typeof w && w >= 0 && ((i.revision = w), (d.N = !0)),
            !1 === b && (i.hideFromBots = !1),
            !0 === i.hideFromBots &&
              v &&
              (d.P =
                (v.userAgent &&
                  /bot|crawl|spider|slurp|teoma/i.test(v.userAgent)) ||
                v.webdriver),
            l(p) && (i.cookie = { ..._, ...p }),
            i.autoClearCookies,
            d.N,
            i.manageScriptTags,
            ((e) => {
              const { I: t, J: o, U: n, B: c, L: r } = s.o;
              for (let a of e) {
                const e = t[a],
                  i = e.services || {},
                  d = (l(i) && f(i)) || [];
                (o[a] = {}),
                  (n[a] = []),
                  (c[a] = []),
                  e.readOnly && (r.push(a), (n[a] = d)),
                  (s.ie.de[a] = {});
                for (let e of d) {
                  const t = i[e];
                  (t.te = !1), (o[a][e] = t);
                }
              }
            })(C),
            (() => {
              if (!s.t.manageScriptTags) return;
              const e = s.o,
                t =
                  ((n = document),
                  (c = "script[" + o + "]"),
                  n.querySelectorAll(c));
              var n, c;
              for (const n of t) {
                let t = g(n, o),
                  s = n.dataset.service || "",
                  c = !1;
                if (
                  (t && "!" === t.charAt(0) && ((t = t.slice(1)), (c = !0)),
                  "!" === s.charAt(0) && ((s = s.slice(1)), (c = !0)),
                  r(e.R, t) &&
                    (e.q.push({ ne: n, oe: !1, re: c, se: t, ce: s }), s))
                ) {
                  const o = e.J[t];
                  o[s] || (o[s] = { te: !1 });
                }
              }
            })();
        })(e),
        n.P)
      )
        return;
      if (
        ((() => {
          const e = s.o,
            o = s.t,
            n = x(),
            {
              categories: c,
              services: r,
              consentId: l,
              consentTimestamp: d,
              lastConsentTimestamp: f,
              data: _,
              revision: u,
            } = n,
            p = a(c);
          (e.p = n), (e.D = l);
          const m = !!l && i(l);
          (e.S = d),
            e.S && (e.S = new Date(d)),
            (e.h = f),
            e.h && (e.h = new Date(f)),
            (e.v = void 0 !== _ ? _ : null),
            e.N && m && u !== o.revision && (e.k = !1),
            (e.T = !(m && e.k && e.S && e.h && p)),
            o.cookie.useLocalStorage &&
              !e.T &&
              ((e.T = new Date().getTime() > (n.expirationTime || 0)),
              e.T && T(o.cookie.name)),
            e.T,
            (() => {
              const e = s.o;
              for (const o of e.R) {
                const n = e.I[o];
                if (n.readOnly || (n.enabled && e.i.mode === t)) {
                  e.M.push(o);
                  const t = e.J[o] || {};
                  for (let n in t) e.U[o].push(n);
                }
              }
            })(),
            e.T
              ? o.mode === t && (e.F = [...e.M])
              : ((e.U = { ...e.U, ...r }), h([...e.L, ...c])),
            (e.B = { ...e.U });
        })(),
        H())
      )
        return b(), w(d.X);
      c.mode === t && b(n.M);
    }
  },
  z = (e) => {
    const { name: t, path: o, domain: c, useLocalStorage: r } = s.t.cookie;
    e && (r ? T(t) : M(t, o, c));
    for (const { fe: e, _e: t, ue: o } of s.o.m) e.removeEventListener(t, o);
    const a = new n();
    for (const e in s) s[e] = a[e];
    window._ccRun = !1;
  };
export {
  A as acceptCategory,
  R as acceptService,
  I as acceptedCategory,
  F as acceptedService,
  M as eraseCookies,
  G as getConfig,
  B as getCookie,
  P as getUserPreferences,
  J as loadScript,
  z as reset,
  q as run,
  U as setCookieData,
  H as validConsent,
  L as validCookie,
};
