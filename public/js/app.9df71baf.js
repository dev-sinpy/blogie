(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  [1],
  {
    0: function (e, t, n) {
      e.exports = n("2f39");
    },
    "2f39": function (e, t, n) {
      "use strict";
      n.r(t);
      var a = n("967e"),
        r = n.n(a),
        o = (n("a481"), n("96cf"), n("fa84")),
        c = n.n(o),
        i =
          (n("573e"),
          n("7d6e"),
          n("e54f"),
          n("44391"),
          n("4605"),
          n("f580"),
          n("5b2b"),
          n("8753"),
          n("2967"),
          n("7e67"),
          n("d770"),
          n("dd82"),
          n("922c"),
          n("d7fb"),
          n("a533"),
          n("c32e"),
          n("a151"),
          n("8bc7"),
          n("e80f"),
          n("5fec"),
          n("e42f"),
          n("57fc"),
          n("d67f"),
          n("880e"),
          n("1c10"),
          n("9482"),
          n("e797"),
          n("4848"),
          n("53d0"),
          n("63b1"),
          n("e9fd"),
          n("195c"),
          n("64e9"),
          n("33c5"),
          n("4f62"),
          n("0dbc"),
          n("7c38"),
          n("0756"),
          n("4953"),
          n("81db"),
          n("2e52"),
          n("2248"),
          n("7797"),
          n("12a1"),
          n("ce96"),
          n("70ca"),
          n("2318"),
          n("24bd"),
          n("8f27"),
          n("3064"),
          n("c9a2"),
          n("8767"),
          n("4a8e"),
          n("b828"),
          n("3c1c"),
          n("21cb"),
          n("c00e"),
          n("e4a8"),
          n("e4d3"),
          n("f4d9"),
          n("fffd"),
          n("f645"),
          n("639e"),
          n("34ee"),
          n("b794"),
          n("af24"),
          n("7c9c"),
          n("7bb2"),
          n("64f7"),
          n("c382"),
          n("053c"),
          n("c48f"),
          n("f5d1"),
          n("3cec"),
          n("c00ee"),
          n("d450"),
          n("ca07"),
          n("14e3"),
          n("9393"),
          n("9227"),
          n("1dba"),
          n("674a"),
          n("de26"),
          n("6721"),
          n("9cb5"),
          n("ed9b"),
          n("fc83"),
          n("98e5"),
          n("605a"),
          n("ba60"),
          n("df07"),
          n("7903"),
          n("e046"),
          n("58af"),
          n("7713"),
          n("0571"),
          n("3e27"),
          n("6837"),
          n("3fc9"),
          n("0693"),
          n("bf41"),
          n("0ca9"),
          n("5b0d"),
          n("2b0e")),
        u = n("1f91"),
        s = n("42d2"),
        f = n("b05d"),
        l = n("436b"),
        d = n("18d6");
      i["a"].use(f["a"], {
        config: {
          brand: {
            primary: "#121212",
            secondary: "#4ecdc4",
            accent: "#50B4F4",
            dark: "#1d1d1d",
            positive: "#21BA45",
            negative: "#C10015",
            info: "#1789fc",
            warning: "#F2C037",
          },
        },
        lang: u["a"],
        iconSet: s["a"],
        plugins: { Dialog: l["a"], LocalStorage: d["a"] },
      });
      var p = function () {
          var e = this,
            t = e.$createElement,
            n = e._self._c || t;
          return n("div", { attrs: { id: "q-app" } }, [n("router-view")], 1);
        },
        g = [],
        h = {
          name: "App",
          preFetch: function (e) {
            e.store, e.currentRoute, e.previousRoute, e.redirect, e.ssrContext;
          },
        },
        b = h,
        m = n("2877"),
        T = Object(m["a"])(b, p, g, !1, null, null, null),
        S = T.exports,
        v = n("2f62"),
        E = (n("6762"), n("2fdb"), n("4db1")),
        _ = n.n(E),
        y = n("bc3a"),
        w = n.n(y),
        A = n("4ee7"),
        x = (n("ff52"), "https://blogie-api.now.sh/api"),
        k = {
          loginPopup: !1,
          registerPopup: !1,
          interestsPopup: !1,
          initialPopup: !1,
          tags: [
            { tag: "android", popularity: 1, enabled: !0 },
            { tag: "ios", popularity: 1, enabled: !0 },
            { tag: "windows", popularity: 1, enabled: !0 },
            { tag: "programming", popularity: 1, enabled: !0 },
            { tag: "news", popularity: 1, enabled: !0 },
            { tag: "random", popularity: 1, enabled: !1 },
          ],
          user: { email: null, verified: null, preferences: null },
          isAuthenticated: !1,
          articles: null,
          status: null,
          loadingButton: !1,
          darkMode: !0,
          defaultTags: null,
        },
        D = {
          SET_USER: function (e, t) {
            (e.isAuthenticated = !0),
              (e.user.email = t.email),
              (e.user.verified = t.emailVerified);
          },
          SET_POPUP: function (e, t) {
            e["".concat(t.popup)] = t.flag;
          },
          SET_TAGS: function (e, t) {
            e.tags = t;
          },
          SET_DEFAULT_TAGS: function (e, t) {
            e.defaultTags = t;
          },
          SET_DARK_MODE: function (e, t) {
            e.darkMode = !e.darkMode;
          },
          SET_FEED: function (e, t) {
            e.articles = t;
          },
          SET_MORE_FEED: function (e, t) {
            var n;
            (n = e.articles).push.apply(n, _()(t));
          },
          SET_STATUS: function (e, t) {
            e.status = t;
          },
          SET_LOADING: function (e, t) {
            e.status = t;
          },
          RESET_USER: function (e) {
            (e.status = "user not found"),
              (e.user.email = null),
              (e.user.verified = null),
              (e.user.preferences = null);
          },
        },
        U = {
          fetchUser: function (e, t) {
            var n = e.commit;
            console.log("getting user"),
              t
                ? (console.log("payload is provided"), n("SET_USER", t))
                : A["a"].onAuthStateChanged(function (e) {
                    e
                      ? n("SET_USER", e)
                      : (n("RESET_USER"),
                        d["a"].remove("tags"),
                        d["a"].remove("feed"));
                  });
          },
          fetchTags: function (e, t) {
            var n = e.commit,
              a = e.getters;
            console.log("fetching tags");
            var r = d["a"].has("tags");
            if (t.reload) {
              console.log("refreshing tags");
              var o = a.user;
              w.a
                .get("".concat(x, "user/?email=").concat(o))
                .then(function (e) {
                  n("SET_TAGS", e.data.data.preferences),
                    d["a"].set("tags", e.data.data.preferences);
                });
            } else if (r) {
              console.log("found tags in local storage");
              var c = d["a"].getItem("tags");
              n("SET_TAGS", c);
            } else {
              console.log("did not find tags in local storage");
              var i = a.user;
              w.a
                .get("".concat(x, "/user/?email=").concat(i))
                .then(function (e) {
                  n("SET_TAGS", e.data.data.preferences),
                    d["a"].set("tags", e.data.data.preferences);
                });
            }
          },
          fetchDefaultTags: function (e, t) {
            var n = e.commit;
            e.getters;
            console.log("fetching default tags"),
              n("SET_STATUS", "loading"),
              w.a.get("".concat(x, "/tags/")).then(function (e) {
                n("SET_DEFAULT_TAGS", e.data.data.tags),
                  n("SET_STATUS", "loaded");
              });
          },
          fetchFeed: function (e, t) {
            var n = e.commit,
              a = e.getters;
            console.log("Getting articles");
            var r = d["a"].has("feed");
            if (t.reload) {
              n("SET_STATUS", "loading");
              for (var o = a.getEnabledTags, c = o.length - 1; c > 0; c--) {
                var i = Math.floor(Math.random() * (c + 1)),
                  u = [o[i], o[c]];
                (o[c] = u[0]), (o[i] = u[1]);
              }
              var s = o.join();
              w.a
                .get(
                  ""
                    .concat(x, "/?q=")
                    .concat(s, "&limit=")
                    .concat(t.limit, "&page=")
                    .concat(t.page)
                )
                .then(function (e) {
                  n("SET_FEED", e.data.content),
                    n("SET_STATUS", "loaded"),
                    d["a"].set("feed", e.data.content);
                });
            } else if (r) {
              console.log("using local storage");
              var f = d["a"].getItem("feed");
              n("SET_FEED", f), n("SET_STATUS", "loaded");
            } else {
              console.log("not using local storage");
              for (var l = a.getEnabledTags, p = l.length - 1; p > 0; p--) {
                var g = Math.floor(Math.random() * (p + 1)),
                  h = [l[g], l[p]];
                (l[p] = h[0]), (l[g] = h[1]);
              }
              var b = l.join();
              w.a
                .get(
                  ""
                    .concat(x, "/?q=")
                    .concat(b, "&limit=")
                    .concat(t.limit, "&page=")
                    .concat(t.page)
                )
                .then(function (e) {
                  n("SET_FEED", e.data.content),
                    n("SET_STATUS", "loaded"),
                    d["a"].set("feed", e.data.content);
                });
            }
          },
          fetchMoreFeed: function (e, t) {
            var n = e.commit,
              a = e.getters;
            console.log("Getting more articles"), n("SET_STATUS", "loading");
            for (var r = a.getEnabledTags, o = r.length - 1; o > 0; o--) {
              var c = Math.floor(Math.random() * (o + 1)),
                i = [r[c], r[o]];
              (r[o] = i[0]), (r[c] = i[1]);
            }
            var u = r.join();
            w.a
              .get(
                ""
                  .concat(x, "/?q=")
                  .concat(u, "&limit=")
                  .concat(t.limit, "&page=")
                  .concat(t.page)
              )
              .then(function (e) {
                n("SET_MORE_FEED", e.data.content), n("SET_STATUS", "loaded");
              });
          },
          setDarkMode: function (e, t) {
            var n = e.commit;
            n("SET_DARK_MODE", t);
          },
        },
        R = {
          enabledTags: function (e) {
            return e.tags.filter(function (e) {
              return e.enabled;
            });
          },
          loadingButton: function (e) {
            return e.loadingButton;
          },
          isDarkMode: function (e) {
            return e.darkMode;
          },
          getEnabledTags: function (e) {
            var t = Array(),
              n = e.tags.filter(function (e) {
                return e.enabled;
              });
            return (
              n.forEach(function (e) {
                t.push(e.tag);
              }),
              t
            );
          },
          getDefaultTags: function (e) {
            return e.defaultTags;
          },
          status: function (e) {
            return e.status;
          },
          Tags: function (e) {
            return e.tags;
          },
          user: function (e) {
            return e.user.email;
          },
          login: function (e) {
            return e.loginPopup;
          },
          register: function (e) {
            return e.registerPopup;
          },
          interests: function (e) {
            return e.interestsPopup;
          },
          initialSetup: function (e) {
            return e.initialPopup;
          },
          isAuthenticated: function (e) {
            return !!e.user.email;
          },
          feed: function (e, t) {
            var n = Array();
            return (
              t.enabledTags.forEach(function (e) {
                n.push(e.tag);
              }),
              e.articles.filter(function (e) {
                return n.includes(e.tags);
              })
            );
          },
          articles: function (e, t) {
            var n = Array();
            return (
              t.enabledTags.forEach(function (e) {
                n.push(e.tag);
              }),
              e.articles.filter(function (e) {
                return n.includes(e.searched_for);
              })
            );
          },
        },
        P = { namespaced: !0, state: k, mutations: D, actions: U, getters: R };
      i["a"].use(v["a"]);
      var F = function () {
          var e = new v["a"].Store({ modules: { articles: P }, strict: !1 });
          return e;
        },
        M = n("8c4f"),
        G = [
          {
            path: "/",
            component: function () {
              return Promise.all([n.e(0), n.e(6)]).then(n.bind(null, "a9c3"));
            },
            children: [
              {
                path: "",
                name: "index",
                component: function () {
                  return Promise.all([n.e(0), n.e(3)]).then(
                    n.bind(null, "8b24")
                  );
                },
              },
            ],
          },
          {
            path: "",
            component: function () {
              return Promise.all([n.e(0), n.e(5)]).then(n.bind(null, "3edf"));
            },
            children: [
              {
                path: "/dashboard",
                name: "dashboard",
                meta: { authRequired: !0 },
                component: function () {
                  return Promise.all([n.e(0), n.e(4)]).then(
                    n.bind(null, "ec95")
                  );
                },
                props: function (e) {
                  return { query: e.query.tutorial };
                },
              },
            ],
          },
        ];
      G.push({
        path: "*",
        component: function () {
          return Promise.all([n.e(0), n.e(7)]).then(n.bind(null, "e51e"));
        },
      });
      var B = G;
      i["a"].use(M["a"]);
      var O = function (e) {
          e.store, e.ssrContext;
          var t = new M["a"]({
            scrollBehavior: function () {
              return { x: 0, y: 0 };
            },
            routes: B,
            mode: "history",
            base: "/",
          });
          return t;
        },
        L = function () {
          return q.apply(this, arguments);
        };
      function q() {
        return (
          (q = c()(
            r.a.mark(function e() {
              var t, n, a;
              return r.a.wrap(function (e) {
                while (1)
                  switch ((e.prev = e.next)) {
                    case 0:
                      if ("function" !== typeof F) {
                        e.next = 6;
                        break;
                      }
                      return (e.next = 3), F({ Vue: i["a"] });
                    case 3:
                      (e.t0 = e.sent), (e.next = 7);
                      break;
                    case 6:
                      e.t0 = F;
                    case 7:
                      if (((t = e.t0), "function" !== typeof O)) {
                        e.next = 14;
                        break;
                      }
                      return (e.next = 11), O({ Vue: i["a"], store: t });
                    case 11:
                      (e.t1 = e.sent), (e.next = 15);
                      break;
                    case 14:
                      e.t1 = O;
                    case 15:
                      return (
                        (n = e.t1),
                        (t.$router = n),
                        (a = {
                          router: n,
                          store: t,
                          render: function (e) {
                            return e(S);
                          },
                        }),
                        (a.el = "#q-app"),
                        e.abrupt("return", { app: a, store: t, router: n })
                      );
                    case 20:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          )),
          q.apply(this, arguments)
        );
      }
      var I = function (e) {
        e.app, e.router, e.Vue;
        var t = e.store;
        t.dispatch("articles/fetchUser");
      };
      i["a"].prototype.$axios = w.a;
      var j = function (e) {
          e.app, e.router, e.Vue, e.store;
        },
        C =
          (n("551c"),
          n("ac6a"),
          n("cadf"),
          n("06db"),
          n("456d"),
          S.options || S),
        V = "function" === typeof C.preFetch;
      function K(e, t) {
        var n = e ? (e.matched ? e : t.resolve(e).route) : t.currentRoute;
        return n
          ? [].concat.apply(
              [],
              n.matched.map(function (e) {
                return Object.keys(e.components).map(function (t) {
                  var n = e.components[t];
                  return { path: e.path, c: n.options || n };
                });
              })
            )
          : [];
      }
      function N(e, t) {
        e.beforeResolve(function (n, a, r) {
          var o = K(n, e),
            c = K(a, e),
            i = !1,
            u = o
              .filter(function (e, t) {
                return (
                  i ||
                  (i = !c[t] || c[t].c !== e.c || e.path.indexOf("/:") > -1)
                );
              })
              .filter(function (e) {
                return e.c && "function" === typeof e.c.preFetch;
              })
              .map(function (e) {
                return e.c;
              });
          if ((!0 === V && ((V = !1), u.unshift(C)), !u.length)) return r();
          var s = !0,
            f = function (e) {
              (s = !1), r(e);
            },
            l = function () {
              !0 === s && r();
            };
          u.filter(function (e) {
            return e && e.preFetch;
          })
            .reduce(function (e, r) {
              return e.then(function () {
                return (
                  !0 === s &&
                  r.preFetch({
                    store: t,
                    currentRoute: n,
                    previousRoute: a,
                    redirect: f,
                  })
                );
              });
            }, Promise.resolve())
            .then(l)
            .catch(function (e) {
              console.error(e), l();
            });
        });
      }
      function $() {
        return z.apply(this, arguments);
      }
      function z() {
        return (
          (z = c()(
            r.a.mark(function e() {
              var t, n, a, o, c, u, s, f, l;
              return r.a.wrap(
                function (e) {
                  while (1)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (e.next = 2), L();
                      case 2:
                        (t = e.sent),
                          (n = t.app),
                          (a = t.store),
                          (o = t.router),
                          (c = !0),
                          (u = function (e) {
                            (c = !1), (window.location.href = e);
                          }),
                          (s = window.location.href.replace(
                            window.location.origin,
                            ""
                          )),
                          (f = [I, j]),
                          (l = 0);
                      case 11:
                        if (!(!0 === c && l < f.length)) {
                          e.next = 29;
                          break;
                        }
                        if ("function" === typeof f[l]) {
                          e.next = 14;
                          break;
                        }
                        return e.abrupt("continue", 26);
                      case 14:
                        return (
                          (e.prev = 14),
                          (e.next = 17),
                          f[l]({
                            app: n,
                            router: o,
                            store: a,
                            Vue: i["a"],
                            ssrContext: null,
                            redirect: u,
                            urlPath: s,
                          })
                        );
                      case 17:
                        e.next = 26;
                        break;
                      case 19:
                        if (
                          ((e.prev = 19),
                          (e.t0 = e["catch"](14)),
                          !e.t0 || !e.t0.url)
                        ) {
                          e.next = 24;
                          break;
                        }
                        return (
                          (window.location.href = e.t0.url), e.abrupt("return")
                        );
                      case 24:
                        return (
                          console.error("[Quasar] boot error:", e.t0),
                          e.abrupt("return")
                        );
                      case 26:
                        l++, (e.next = 11);
                        break;
                      case 29:
                        if (!1 !== c) {
                          e.next = 31;
                          break;
                        }
                        return e.abrupt("return");
                      case 31:
                        N(o, a), new i["a"](n);
                      case 33:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                null,
                [[14, 19]]
              );
            })
          )),
          z.apply(this, arguments)
        );
      }
      $();
    },
    "4ee7": function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return i;
      });
      var a = n("8aa5"),
        r = n.n(a),
        o =
          (n("ea7b"),
          {
            apiKey: "AIzaSyBewo6hymBkNLD0Kn-L2yr6LOfbeYhBjGc",
            authDomain: "blogie-frontend.firebaseapp.com",
            databaseURL: "https://blogie-frontend.firebaseio.com",
            projectId: "blogie-frontend",
            storageBucket: "blogie-frontend.appspot.com",
            messagingSenderId: "378119109380",
            appId: "1:378119109380:web:51967b7e0e9683e743ae51",
            measurementId: "G-V8LDN6G0SC",
          }),
        c = r.a.initializeApp(o),
        i = c.auth();
    },
    "5b0d": function (e, t, n) {},
  },
  [[0, 2, 0]],
]);
