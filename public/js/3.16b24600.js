(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  [3],
  {
    "039a": function (t, e, a) {
      "use strict";
      var s = a("7fbe"),
        r = a.n(s);
      r.a;
    },
    "1feb": function (t, e, a) {
      "use strict";
      a.r(e);
      var s = function () {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a(
            "q-dialog",
            {
              model: {
                value: t.register,
                callback: function (e) {
                  t.register = e;
                },
                expression: "register",
              },
            },
            [
              a(
                "q-card",
                { staticStyle: { height: "230px", width: "400px" } },
                [
                  a(
                    "q-card-section",
                    { staticClass: "row items-center q-pb-none" },
                    [
                      a("div", { staticClass: "text-h6 text-black" }, [
                        t._v("Register"),
                      ]),
                      a("q-space"),
                      a("q-btn", {
                        directives: [
                          { name: "close-popup", rawName: "v-close-popup" },
                        ],
                        attrs: { flat: "", dense: "", icon: "close" },
                        on: { click: t.closePopup },
                      }),
                    ],
                    1
                  ),
                  t.error
                    ? a("q-banner", { staticClass: "text-white bg-negative" }, [
                        t._v("\n      " + t._s(t.error) + "\n    "),
                      ])
                    : t._e(),
                  "loading" == t.status
                    ? a(
                        "q-card-section",
                        { staticClass: "q-pa-lg absolute-center" },
                        [
                          a("q-spinner-puff", {
                            attrs: { color: "deep-orange", size: "50px" },
                          }),
                        ],
                        1
                      )
                    : a(
                        "q-card-section",
                        { staticClass: "q-pa-lg text-center" },
                        [
                          a(
                            "div",
                            [
                              a("q-btn", {
                                attrs: {
                                  icon: "fab fa-google",
                                  label: "Continue with Google",
                                },
                                on: {
                                  click: function (e) {
                                    return t.signup("google");
                                  },
                                },
                              }),
                            ],
                            1
                          ),
                          a("div", { attrs: { id: "or" } }, [t._v("OR")]),
                          a(
                            "div",
                            [
                              a("q-btn", {
                                attrs: {
                                  icon: "fab fa-github",
                                  color: "black",
                                  label: "Continue with Github",
                                },
                                on: {
                                  click: function (e) {
                                    return t.signup("github");
                                  },
                                },
                              }),
                            ],
                            1
                          ),
                        ]
                      ),
                ],
                1
              ),
            ],
            1
          );
        },
        r = [],
        i =
          (a("8e6e"),
          a("8a81"),
          a("ac6a"),
          a("cadf"),
          a("06db"),
          a("456d"),
          a("967e")),
        c = a.n(i),
        n = (a("96cf"), a("fa84")),
        l = a.n(n),
        o = a("c47a"),
        h = a.n(o),
        f = a("8aa5"),
        u = a.n(f),
        d = a("bc3a"),
        g = a.n(d),
        p = a("4ee7"),
        b = a("2f62");
      function v(t, e) {
        var a = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var s = Object.getOwnPropertySymbols(t);
          e &&
            (s = s.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            a.push.apply(a, s);
        }
        return a;
      }
      function m(t) {
        for (var e = 1; e < arguments.length; e++) {
          var a = null != arguments[e] ? arguments[e] : {};
          e % 2
            ? v(Object(a), !0).forEach(function (e) {
                h()(t, e, a[e]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a))
            : v(Object(a)).forEach(function (e) {
                Object.defineProperty(
                  t,
                  e,
                  Object.getOwnPropertyDescriptor(a, e)
                );
              });
        }
        return t;
      }
      var w = {
          computed: m(
            m({}, Object(b["b"])("articles", ["register"])),
            Object(b["b"])("articles", ["status"])
          ),
          data: function () {
            return { error: "" };
          },
          methods: {
            closePopup: function () {
              this.$store.commit("articles/SET_POPUP", {
                popup: "registerPopup",
                flag: !1,
              });
            },
            signup: (function () {
              var t = l()(
                c.a.mark(function t(e) {
                  var a, s, r, i;
                  return c.a.wrap(
                    function (t) {
                      while (1)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              this.$store.commit(
                                "articles/SET_STATUS",
                                "loading"
                              ),
                              (t.prev = 1),
                              (a =
                                "google" == e
                                  ? new u.a.auth.GoogleAuthProvider()
                                  : new u.a.auth.GithubAuthProvider()),
                              (t.next = 5),
                              p["a"].signInWithPopup(a)
                            );
                          case 5:
                            return (
                              (s = t.sent),
                              (r = s.user),
                              (t.next = 9),
                              g.a.get(
                                "https://blogie-api.now.sh/api/setuser/?email=".concat(
                                  r.email
                                ),
                                { validateStatus: !1 }
                              )
                            );
                          case 9:
                            if (((i = t.sent), "ok" == i.data.status)) {
                              t.next = 16;
                              break;
                            }
                            return (
                              (this.error = i.data.message),
                              (t.next = 14),
                              p["a"].signOut()
                            );
                          case 14:
                            t.next = 19;
                            break;
                          case 16:
                            this.$store.dispatch("articles/fetchUser", r),
                              this.$store.dispatch("articles/fetchDefaultTags"),
                              (window.location.href =
                                "/dashboard/?tutorial=true");
                          case 19:
                            t.next = 26;
                            break;
                          case 21:
                            return (
                              (t.prev = 21),
                              (t.t0 = t["catch"](1)),
                              (this.error = t.t0),
                              (t.next = 26),
                              p["a"].signOut()
                            );
                          case 26:
                            return (
                              (t.prev = 26),
                              this.$store.commit(
                                "articles/SET_STATUS",
                                "loaded"
                              ),
                              t.finish(26)
                            );
                          case 29:
                          case "end":
                            return t.stop();
                        }
                    },
                    t,
                    this,
                    [[1, 21, 26, 29]]
                  );
                })
              );
              function e(e) {
                return t.apply(this, arguments);
              }
              return e;
            })(),
          },
        },
        x = w,
        C = (a("f30e"), a("2877")),
        k = a("eebe"),
        y = a.n(k),
        O = a("24e8"),
        z = a("f09f"),
        P = a("a370"),
        j = a("2c91"),
        F = a("9c40"),
        S = a("54e1"),
        _ = a("06d5"),
        q = a("7f67"),
        M = Object(C["a"])(x, s, r, !1, null, null, null);
      e["default"] = M.exports;
      y()(M, "components", {
        QDialog: O["a"],
        QCard: z["a"],
        QCardSection: P["a"],
        QSpace: j["a"],
        QBtn: F["a"],
        QBanner: S["a"],
        QSpinnerPuff: _["a"],
      }),
        y()(M, "directives", { ClosePopup: q["a"] });
    },
    "578a": function (t, e, a) {
      "use strict";
      a.r(e);
      var s = function () {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a(
            "q-dialog",
            {
              model: {
                value: t.login,
                callback: function (e) {
                  t.login = e;
                },
                expression: "login",
              },
            },
            [
              a(
                "q-card",
                { staticStyle: { height: "230px", width: "400px" } },
                [
                  a(
                    "q-card-section",
                    { staticClass: "row items-center q-pb-none" },
                    [
                      a("div", { staticClass: "text-h6 text-black" }, [
                        t._v("Login"),
                      ]),
                      a("q-space"),
                      a("q-btn", {
                        attrs: { flat: "", dense: "", icon: "close" },
                        on: { click: t.closePopup },
                      }),
                    ],
                    1
                  ),
                  t.error
                    ? a("q-banner", { staticClass: "text-white bg-negative" }, [
                        t._v("\n      " + t._s(t.error) + "\n    "),
                      ])
                    : t._e(),
                  "loading" == t.status
                    ? a(
                        "q-card-section",
                        { staticClass: "q-pa-lg absolute-center" },
                        [
                          a("q-spinner-puff", {
                            attrs: { color: "deep-orange", size: "50px" },
                          }),
                        ],
                        1
                      )
                    : a(
                        "q-card-section",
                        { staticClass: "q-pa-lg text-center" },
                        [
                          a(
                            "div",
                            [
                              a("q-btn", {
                                attrs: {
                                  icon: "fab fa-google",
                                  label: "Login with Google",
                                },
                                on: {
                                  click: function (e) {
                                    return t.signin("google");
                                  },
                                },
                              }),
                            ],
                            1
                          ),
                          a("div", { attrs: { id: "or" } }, [t._v("OR")]),
                          a(
                            "div",
                            [
                              a("q-btn", {
                                attrs: {
                                  icon: "fab fa-github",
                                  color: "black",
                                  label: "Login with Github",
                                },
                                on: {
                                  click: function (e) {
                                    return t.signin("github");
                                  },
                                },
                              }),
                            ],
                            1
                          ),
                        ]
                      ),
                ],
                1
              ),
            ],
            1
          );
        },
        r = [],
        i =
          (a("8e6e"),
          a("8a81"),
          a("ac6a"),
          a("cadf"),
          a("06db"),
          a("456d"),
          a("967e")),
        c = a.n(i),
        n = (a("96cf"), a("fa84")),
        l = a.n(n),
        o = a("c47a"),
        h = a.n(o),
        f = a("8aa5"),
        u = a.n(f),
        d = a("bc3a"),
        g = a.n(d),
        p = a("4ee7"),
        b = a("2f62");
      function v(t, e) {
        var a = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var s = Object.getOwnPropertySymbols(t);
          e &&
            (s = s.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            a.push.apply(a, s);
        }
        return a;
      }
      function m(t) {
        for (var e = 1; e < arguments.length; e++) {
          var a = null != arguments[e] ? arguments[e] : {};
          e % 2
            ? v(Object(a), !0).forEach(function (e) {
                h()(t, e, a[e]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a))
            : v(Object(a)).forEach(function (e) {
                Object.defineProperty(
                  t,
                  e,
                  Object.getOwnPropertyDescriptor(a, e)
                );
              });
        }
        return t;
      }
      var w = {
          computed: m(
            m({}, Object(b["b"])("articles", ["status"])),
            Object(b["b"])("articles", ["login"])
          ),
          data: function () {
            return { errors: "" };
          },
          methods: {
            closePopup: function () {
              this.$store.commit("articles/SET_POPUP", {
                popup: "loginPopup",
                flag: !1,
              });
            },
            signin: (function () {
              var t = l()(
                c.a.mark(function t(e) {
                  var a, s, r, i;
                  return c.a.wrap(
                    function (t) {
                      while (1)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              this.$store.commit(
                                "articles/SET_STATUS",
                                "loading"
                              ),
                              (t.prev = 1),
                              (a = new u.a.auth.GoogleAuthProvider()),
                              (a =
                                "google" == e
                                  ? new u.a.auth.GoogleAuthProvider()
                                  : new u.a.auth.GithubAuthProvider()),
                              (t.next = 6),
                              p["a"].signInWithPopup(a)
                            );
                          case 6:
                            return (
                              (s = t.sent),
                              (r = s.user),
                              (t.next = 10),
                              g.a.get(
                                "https://blogie-api.now.sh/api/user/?email=".concat(
                                  r.email
                                ),
                                { validateStatus: !1 }
                              )
                            );
                          case 10:
                            if (((i = t.sent), "ok" == i.data.status)) {
                              t.next = 17;
                              break;
                            }
                            return (
                              (this.error =
                                "Your account is not registered, please sign up first"),
                              (t.next = 15),
                              r.delete()
                            );
                          case 15:
                            t.next = 19;
                            break;
                          case 17:
                            this.$store.dispatch("articles/fetchUser", r),
                              (window.location.href = "/dashboard");
                          case 19:
                            t.next = 24;
                            break;
                          case 21:
                            (t.prev = 21),
                              (t.t0 = t["catch"](1)),
                              (this.error = "Unknown error occured");
                          case 24:
                            return (
                              (t.prev = 24),
                              this.$store.commit(
                                "articles/SET_STATUS",
                                "loaded"
                              ),
                              t.finish(24)
                            );
                          case 27:
                          case "end":
                            return t.stop();
                        }
                    },
                    t,
                    this,
                    [[1, 21, 24, 27]]
                  );
                })
              );
              function e(e) {
                return t.apply(this, arguments);
              }
              return e;
            })(),
          },
        },
        x = w,
        C = (a("039a"), a("2877")),
        k = a("eebe"),
        y = a.n(k),
        O = a("24e8"),
        z = a("f09f"),
        P = a("a370"),
        j = a("2c91"),
        F = a("9c40"),
        S = a("54e1"),
        _ = a("06d5"),
        q = Object(C["a"])(x, s, r, !1, null, null, null);
      e["default"] = q.exports;
      y()(q, "components", {
        QDialog: O["a"],
        QCard: z["a"],
        QCardSection: P["a"],
        QSpace: j["a"],
        QBtn: F["a"],
        QBanner: S["a"],
        QSpinnerPuff: _["a"],
      });
    },
    "7fbe": function (t, e, a) {},
    "8b24": function (t, e, a) {
      "use strict";
      a.r(e);
      var s = function () {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a(
            "q-page-container",
            [
              a("login-popup"),
              a("register-popup"),
              a("main", [
                a("section", { staticClass: "hero text-center" }, [
                  a("div", { staticClass: "container-sm" }, [
                    a("div", { staticClass: "hero-inner" }, [
                      a("h1", { staticClass: "hero-title h2-mobile mt-0" }, [
                        t._v("Discover the best articles from the Internet"),
                      ]),
                      a(
                        "div",
                        {
                          staticClass:
                            "hero-paragraph is-revealing text-body2 text-dark",
                          attrs: { "data-aos": "zoom-in" },
                        },
                        [
                          t._v(
                            "\n          Blogie recommends you articles from different websites. Your feed is always optimsed to only show articles which you would actually like. You can choose from multiple tags and blogie will try to find the best from the web based from that data."
                          ),
                        ]
                      ),
                      a(
                        "div",
                        {
                          staticClass:
                            "hero-form newsletter-form field field-grouped",
                        },
                        [
                          a("div", { staticClass: "control desktop-hide" }, [
                            a(
                              "a",
                              {
                                staticClass:
                                  "button button-primary button-block button-shadow",
                                on: { click: t.toDashboard },
                              },
                              [t._v("Get early access")]
                            ),
                          ]),
                          a(
                            "div",
                            {
                              staticClass: "control mobile-hide",
                              staticStyle: { width: "20%", margin: "0 auto" },
                            },
                            [
                              a(
                                "a",
                                {
                                  staticClass:
                                    "button button-primary button-block button-shadow",
                                  on: { click: t.toDashboard },
                                },
                                [t._v("Get early access")]
                              ),
                            ]
                          ),
                        ]
                      ),
                      a("div", { staticClass: "hero-browser" }, [
                        a(
                          "div",
                          {
                            staticClass: "bubble-3",
                            attrs: { "data-aos": "fade-right" },
                          },
                          [
                            a(
                              "svg",
                              {
                                attrs: {
                                  width: "427",
                                  height: "286",
                                  viewBox: "0 0 427 286",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  "xmlns:xlink": "http://www.w3.org/1999/xlink",
                                },
                              },
                              [
                                a("defs", [
                                  a("path", {
                                    attrs: {
                                      d:
                                        "M213.5 286C331.413 286 427 190.413 427 72.5S304.221 16.45 186.309 16.45C68.396 16.45 0-45.414 0 72.5S95.587 286 213.5 286z",
                                      id: "bubble-3-a",
                                    },
                                  }),
                                ]),
                                a(
                                  "g",
                                  {
                                    attrs: {
                                      fill: "none",
                                      "fill-rule": "evenodd",
                                    },
                                  },
                                  [
                                    a(
                                      "mask",
                                      {
                                        attrs: {
                                          id: "bubble-3-b",
                                          fill: "#fff",
                                        },
                                      },
                                      [
                                        a("use", {
                                          attrs: {
                                            "xlink:href": "#bubble-3-a",
                                          },
                                        }),
                                      ]
                                    ),
                                    a("use", {
                                      attrs: {
                                        fill: "#4E8FF8",
                                        "xlink:href": "#bubble-3-a",
                                      },
                                    }),
                                    a("path", {
                                      attrs: {
                                        d:
                                          "M64.5 129.77c117.913 0 213.5-95.588 213.5-213.5 0-117.914-122.779-56.052-240.691-56.052C-80.604-139.782-149-201.644-149-83.73c0 117.913 95.587 213.5 213.5 213.5z",
                                        fill: "#1274ED",
                                        mask: "url(#bubble-3-b)",
                                      },
                                    }),
                                    a("path", {
                                      attrs: {
                                        d:
                                          "M381.5 501.77c117.913 0 213.5-95.588 213.5-213.5 0-117.914-122.779-56.052-240.691-56.052C236.396 232.218 168 170.356 168 288.27c0 117.913 95.587 213.5 213.5 213.5z",
                                        fill: "#75ABF3",
                                        mask: "url(#bubble-3-b)",
                                      },
                                    }),
                                  ]
                                ),
                              ]
                            ),
                          ]
                        ),
                        a(
                          "div",
                          {
                            staticClass: "bubble-4",
                            attrs: { "data-aos": "fade-down" },
                          },
                          [
                            a(
                              "svg",
                              {
                                attrs: {
                                  width: "230",
                                  height: "235",
                                  viewBox: "0 0 230 235",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  "xmlns:xlink": "http://www.w3.org/1999/xlink",
                                },
                              },
                              [
                                a("defs", [
                                  a("path", {
                                    attrs: {
                                      d:
                                        "M196.605 234.11C256.252 234.11 216 167.646 216 108 216 48.353 167.647 0 108 0S0 48.353 0 108s136.959 126.11 196.605 126.11z",
                                      id: "bubble-4-a",
                                    },
                                  }),
                                ]),
                                a(
                                  "g",
                                  {
                                    attrs: {
                                      fill: "none",
                                      "fill-rule": "evenodd",
                                    },
                                  },
                                  [
                                    a(
                                      "mask",
                                      {
                                        attrs: {
                                          id: "bubble-4-b",
                                          fill: "#fff",
                                        },
                                      },
                                      [
                                        a("use", {
                                          attrs: {
                                            "xlink:href": "#bubble-4-a",
                                          },
                                        }),
                                      ]
                                    ),
                                    a("use", {
                                      attrs: {
                                        fill: "#7CE8DD",
                                        "xlink:href": "#bubble-4-a",
                                      },
                                    }),
                                    a("circle", {
                                      attrs: {
                                        fill: "#3BDDCC",
                                        mask: "url(#bubble-4-b)",
                                        cx: "30",
                                        cy: "108",
                                        r: "108",
                                      },
                                    }),
                                    a("circle", {
                                      attrs: {
                                        fill: "#B1F1EA",
                                        opacity: ".7",
                                        mask: "url(#bubble-4-b)",
                                        cx: "265",
                                        cy: "88",
                                        r: "108",
                                      },
                                    }),
                                  ]
                                ),
                              ]
                            ),
                          ]
                        ),
                        a(
                          "div",
                          { staticClass: "hero-browser-inner" },
                          [
                            a("q-img", {
                              attrs: { src: "statics/showcase.png" },
                            }),
                          ],
                          1
                        ),
                        a(
                          "div",
                          {
                            staticClass: "bubble-1",
                            attrs: { "data-aos": "fade-down" },
                          },
                          [
                            a(
                              "svg",
                              {
                                attrs: {
                                  width: "61",
                                  height: "52",
                                  viewBox: "0 0 61 52",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  "xmlns:xlink": "http://www.w3.org/1999/xlink",
                                },
                              },
                              [
                                a("defs", [
                                  a("path", {
                                    attrs: {
                                      d:
                                        "M32 43.992c17.673 0 28.05 17.673 28.05 0S49.674 0 32 0C14.327 0 0 14.327 0 32c0 17.673 14.327 11.992 32 11.992z",
                                      id: "bubble-1-a",
                                    },
                                  }),
                                ]),
                                a(
                                  "g",
                                  {
                                    attrs: {
                                      fill: "none",
                                      "fill-rule": "evenodd",
                                    },
                                  },
                                  [
                                    a(
                                      "mask",
                                      {
                                        attrs: {
                                          id: "bubble-1-b",
                                          fill: "#fff",
                                        },
                                      },
                                      [
                                        a("use", {
                                          attrs: {
                                            "xlink:href": "#bubble-1-a",
                                          },
                                        }),
                                      ]
                                    ),
                                    a("use", {
                                      attrs: {
                                        fill: "#FF6D8B",
                                        "xlink:href": "#bubble-1-a",
                                      },
                                    }),
                                    a("path", {
                                      attrs: {
                                        d:
                                          "M2 43.992c17.673 0 28.05 17.673 28.05 0S19.674 0 2 0c-17.673 0-32 14.327-32 32 0 17.673 14.327 11.992 32 11.992z",
                                        fill: "#FF4F73",
                                        mask: "url(#bubble-1-b)",
                                      },
                                    }),
                                    a("path", {
                                      attrs: {
                                        d:
                                          "M74 30.992c17.673 0 28.05 17.673 28.05 0S91.674-13 74-13C56.327-13 42 1.327 42 19c0 17.673 14.327 11.992 32 11.992z",
                                        "fill-opacity": ".8",
                                        fill: "#FFA3B5",
                                        mask: "url(#bubble-1-b)",
                                      },
                                    }),
                                  ]
                                ),
                              ]
                            ),
                          ]
                        ),
                        a(
                          "div",
                          {
                            staticClass: "bubble-2",
                            attrs: { "data-aos": "fade-left" },
                          },
                          [
                            a(
                              "svg",
                              {
                                attrs: {
                                  width: "179",
                                  height: "126",
                                  viewBox: "0 0 179 126",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  "xmlns:xlink": "http://www.w3.org/1999/xlink",
                                },
                              },
                              [
                                a("defs", [
                                  a("path", {
                                    attrs: {
                                      d:
                                        "M104.697 125.661c41.034 0 74.298-33.264 74.298-74.298s-43.231-7.425-84.265-7.425S0-28.44 0 12.593c0 41.034 63.663 113.068 104.697 113.068z",
                                      id: "bubble-2-a",
                                    },
                                  }),
                                ]),
                                a(
                                  "g",
                                  {
                                    attrs: {
                                      fill: "none",
                                      "fill-rule": "evenodd",
                                    },
                                  },
                                  [
                                    a(
                                      "mask",
                                      {
                                        attrs: {
                                          id: "bubble-2-b",
                                          fill: "#fff",
                                        },
                                      },
                                      [
                                        a("use", {
                                          attrs: {
                                            "xlink:href": "#bubble-2-a",
                                          },
                                        }),
                                      ]
                                    ),
                                    a("use", {
                                      attrs: {
                                        fill: "#838DEA",
                                        "xlink:href": "#bubble-2-a",
                                      },
                                    }),
                                    a("path", {
                                      attrs: {
                                        d:
                                          "M202.697 211.661c41.034 0 74.298-33.264 74.298-74.298s-43.231-7.425-84.265-7.425S98 57.56 98 98.593c0 41.034 63.663 113.068 104.697 113.068z",
                                        fill: "#626CD5",
                                        mask: "url(#bubble-2-b)",
                                      },
                                    }),
                                    a("path", {
                                      attrs: {
                                        d:
                                          "M43.697 56.661c41.034 0 74.298-33.264 74.298-74.298s-43.231-7.425-84.265-7.425S-61-97.44-61-56.407C-61-15.373 2.663 56.661 43.697 56.661z",
                                        fill: "#B1B6F1",
                                        opacity: ".64",
                                        mask: "url(#bubble-2-b)",
                                      },
                                    }),
                                  ]
                                ),
                              ]
                            ),
                          ]
                        ),
                      ]),
                    ]),
                  ]),
                ]),
                a("section", { staticClass: "features section text-center" }, [
                  a("div", { staticClass: "container" }, [
                    a(
                      "div",
                      {
                        staticClass:
                          "features-inner section-inner has-bottom-divider",
                      },
                      [
                        a("div", { staticClass: "features-wrap" }, [
                          a(
                            "div",
                            {
                              staticClass: "feature",
                              attrs: { "data-aos": "zoom-in" },
                            },
                            [
                              a("div", { staticClass: "feature-inner" }, [
                                a("div", { staticClass: "feature-icon" }, [
                                  a(
                                    "svg",
                                    {
                                      attrs: {
                                        id: "Capa_1",
                                        "enable-background": "new 0 0 512 512",
                                        height: "80",
                                        viewBox: "0 0 512 512",
                                        width: "80",
                                        xmlns: "http://www.w3.org/2000/svg",
                                      },
                                    },
                                    [
                                      a("g", [
                                        a("g", [
                                          a("g", [
                                            a("g", [
                                              a("g", [
                                                a("g", [
                                                  a("g", [
                                                    a("g", [
                                                      a("circle", {
                                                        attrs: {
                                                          cx: "256",
                                                          cy: "256",
                                                          fill: "#ffce00",
                                                          r: "256",
                                                        },
                                                      }),
                                                    ]),
                                                  ]),
                                                ]),
                                              ]),
                                            ]),
                                          ]),
                                        ]),
                                        a("path", {
                                          attrs: {
                                            d:
                                              "m512 256c0-7.332-.309-14.592-.913-21.768l-109.882-109.882-275.518 278.04 108.712 108.712c7.121.594 14.326.898 21.601.898 141.385 0 256-114.615 256-256z",
                                            fill: "#ffa300",
                                          },
                                        }),
                                        a("g", [
                                          a("g", [
                                            a("g", [
                                              a("g", [
                                                a("g", [
                                                  a("g", [
                                                    a("g", [
                                                      a("circle", {
                                                        attrs: {
                                                          cx: "256",
                                                          cy: "256",
                                                          fill: "#707789",
                                                          r: "196",
                                                        },
                                                      }),
                                                    ]),
                                                  ]),
                                                ]),
                                              ]),
                                            ]),
                                          ]),
                                        ]),
                                        a("g", [
                                          a("g", [
                                            a("g", [
                                              a("g", [
                                                a("g", [
                                                  a("g", [
                                                    a("g", [
                                                      a("path", {
                                                        attrs: {
                                                          d:
                                                            "m452 256c0-108.208-87.687-195.933-195.879-195.999v391.997c108.192-.065 195.879-87.79 195.879-195.998z",
                                                          fill: "#555a66",
                                                        },
                                                      }),
                                                    ]),
                                                  ]),
                                                ]),
                                              ]),
                                            ]),
                                          ]),
                                        ]),
                                        a("g", [
                                          a("g", [
                                            a("g", [
                                              a("g", [
                                                a("g", [
                                                  a("g", [
                                                    a("g", [
                                                      a("circle", {
                                                        attrs: {
                                                          cx: "256",
                                                          cy: "256",
                                                          fill: "#fff",
                                                          r: "156.736",
                                                        },
                                                      }),
                                                    ]),
                                                  ]),
                                                ]),
                                              ]),
                                            ]),
                                          ]),
                                        ]),
                                        a("g", [
                                          a("g", [
                                            a("g", [
                                              a("g", [
                                                a("g", [
                                                  a("g", [
                                                    a("g", [
                                                      a("path", {
                                                        attrs: {
                                                          d:
                                                            "m412.736 256c0-86.523-70.108-156.669-156.616-156.735v313.47c86.508-.066 156.616-70.212 156.616-156.735z",
                                                          fill: "#e9edf5",
                                                        },
                                                      }),
                                                    ]),
                                                  ]),
                                                ]),
                                              ]),
                                            ]),
                                          ]),
                                        ]),
                                        a("g", [
                                          a("g", [
                                            a("g", [
                                              a("path", {
                                                attrs: {
                                                  d:
                                                    "m241.5 113.79h29v50.172h-29z",
                                                  fill: "#555a66",
                                                },
                                              }),
                                            ]),
                                          ]),
                                        ]),
                                        a("g", [
                                          a("g", [
                                            a("g", [
                                              a("path", {
                                                attrs: {
                                                  d:
                                                    "m256.121 113.79h14.379v50.172h-14.379z",
                                                  fill: "#333940",
                                                },
                                              }),
                                            ]),
                                          ]),
                                        ]),
                                        a("g", [
                                          a("g", [
                                            a("g", [
                                              a("path", {
                                                attrs: {
                                                  d:
                                                    "m348.038 241.5h50.172v29h-50.172z",
                                                  fill: "#333940",
                                                },
                                              }),
                                            ]),
                                          ]),
                                          a("g", [
                                            a("g", [
                                              a("path", {
                                                attrs: {
                                                  d:
                                                    "m113.79 241.5h50.172v29h-50.172z",
                                                  fill: "#555a66",
                                                },
                                              }),
                                            ]),
                                          ]),
                                        ]),
                                        a("g", [
                                          a("g", [
                                            a("g", [
                                              a("path", {
                                                attrs: {
                                                  d:
                                                    "m313.734 158.681h50.172v29h-50.172z",
                                                  fill: "#333940",
                                                  transform:
                                                    "matrix(.707 -.707 .707 .707 -23.219 290.305)",
                                                },
                                              }),
                                            ]),
                                          ]),
                                          a("g", [
                                            a("g", [
                                              a("path", {
                                                attrs: {
                                                  d:
                                                    "m148.095 324.319h50.172v29h-50.172z",
                                                  fill: "#555a66",
                                                  transform:
                                                    "matrix(.707 -.707 .707 .707 -188.858 221.695)",
                                                },
                                              }),
                                            ]),
                                          ]),
                                        ]),
                                        a("g", [
                                          a("g", [
                                            a("g", [
                                              a("path", {
                                                attrs: {
                                                  d:
                                                    "m324.319 313.733h29v50.172h-29z",
                                                  fill: "#333940",
                                                  transform:
                                                    "matrix(.707 -.707 .707 .707 -140.343 338.818)",
                                                },
                                              }),
                                            ]),
                                          ]),
                                          a("g", [
                                            a("g", [
                                              a("path", {
                                                attrs: {
                                                  d:
                                                    "m158.681 148.095h29v50.172h-29z",
                                                  fill: "#555a66",
                                                  transform:
                                                    "matrix(.707 -.707 .707 .707 -71.734 173.18)",
                                                },
                                              }),
                                            ]),
                                          ]),
                                        ]),
                                        a("g", [
                                          a("g", [
                                            a("path", {
                                              attrs: {
                                                d:
                                                  "m229.412 246.419 126.293-90.883-90.88 126.296z",
                                                fill: "#fe6a16",
                                              },
                                            }),
                                          ]),
                                        ]),
                                        a("g", [
                                          a("g", [
                                            a("g", [
                                              a("g", [
                                                a("g", [
                                                  a("g", [
                                                    a("g", [
                                                      a("circle", {
                                                        attrs: {
                                                          cx: "256",
                                                          cy: "256",
                                                          fill: "#707789",
                                                          r: "32.284",
                                                        },
                                                      }),
                                                    ]),
                                                  ]),
                                                ]),
                                              ]),
                                            ]),
                                          ]),
                                        ]),
                                        a("g", [
                                          a("g", [
                                            a("g", [
                                              a("g", [
                                                a("g", [
                                                  a("g", [
                                                    a("g", [
                                                      a("path", {
                                                        attrs: {
                                                          d:
                                                            "m288.284 256c0-17.79-14.389-32.216-32.164-32.281v64.562c17.775-.065 32.164-14.491 32.164-32.281z",
                                                          fill: "#555a66",
                                                        },
                                                      }),
                                                    ]),
                                                  ]),
                                                ]),
                                              ]),
                                            ]),
                                          ]),
                                        ]),
                                        a("g", [
                                          a("g", [
                                            a("path", {
                                              attrs: {
                                                d:
                                                  "m211.983 344.032h88.033v33.882h-88.033z",
                                                fill: "#00c8c8",
                                              },
                                            }),
                                          ]),
                                        ]),
                                        a("g", [
                                          a("g", [
                                            a("path", {
                                              attrs: {
                                                d:
                                                  "m256.121 344.032h43.896v33.882h-43.896z",
                                                fill: "#00a0aa",
                                              },
                                            }),
                                          ]),
                                        ]),
                                      ]),
                                    ]
                                  ),
                                ]),
                                a("h3", { staticClass: "feature-title" }, [
                                  t._v("Fast"),
                                ]),
                                a("p", { staticClass: "text-sm" }, [
                                  t._v(
                                    "I think its fast but I still haven't tested it that heavily."
                                  ),
                                ]),
                              ]),
                            ]
                          ),
                          a(
                            "div",
                            {
                              staticClass: "feature",
                              attrs: { "data-aos": "zoom-in" },
                            },
                            [
                              a("div", { staticClass: "feature-inner" }, [
                                a("div", { staticClass: "feature-icon" }, [
                                  a(
                                    "svg",
                                    {
                                      attrs: {
                                        width: "80",
                                        height: "80",
                                        xmlns: "http://www.w3.org/2000/svg",
                                      },
                                    },
                                    [
                                      a(
                                        "g",
                                        {
                                          attrs: {
                                            fill: "none",
                                            "fill-rule": "evenodd",
                                          },
                                        },
                                        [
                                          a("path", {
                                            attrs: {
                                              d:
                                                "M48.066 61.627c6.628 0 10.087-16.79 10.087-23.418 0-6.627-5.025-9.209-11.652-9.209C39.874 29 24 42.507 24 49.135c0 6.627 17.439 12.492 24.066 12.492z",
                                              "fill-opacity": ".24",
                                              fill: "#75ABF3",
                                            },
                                          }),
                                          a("path", {
                                            attrs: {
                                              d:
                                                "M34 52V35M40 52V42M46 52V35M52 52V42M28 52V28",
                                              stroke: "#4D8EF7",
                                              "stroke-width": "2",
                                              "stroke-linecap": "square",
                                            },
                                          }),
                                        ]
                                      ),
                                    ]
                                  ),
                                ]),
                                a("h3", { staticClass: "feature-title" }, [
                                  t._v("Multiple Sources"),
                                ]),
                                a("p", { staticClass: "text-sm" }, [
                                  t._v(
                                    "Get articles from over 50+ news sources. Even if your favourite website is not there you can always add them by providing blogie a link of the site."
                                  ),
                                ]),
                              ]),
                            ]
                          ),
                        ]),
                        a("div", { staticClass: "features-wrap" }, [
                          a(
                            "div",
                            {
                              staticClass: "feature",
                              attrs: { "data-aos": "zoom-in" },
                            },
                            [
                              a("div", { staticClass: "feature-inner" }, [
                                a("div", { staticClass: "feature-icon" }, [
                                  a(
                                    "svg",
                                    {
                                      attrs: {
                                        width: "80",
                                        height: "80",
                                        xmlns: "http://www.w3.org/2000/svg",
                                      },
                                    },
                                    [
                                      a(
                                        "g",
                                        {
                                          attrs: {
                                            fill: "none",
                                            "fill-rule": "evenodd",
                                          },
                                        },
                                        [
                                          a("path", {
                                            attrs: {
                                              d:
                                                "M48.066 61.627c6.628 0 10.087-16.79 10.087-23.418 0-6.627-5.025-9.209-11.652-9.209C39.874 29 24 42.507 24 49.135c0 6.627 17.439 12.492 24.066 12.492z",
                                              "fill-opacity": ".32",
                                              fill: "#FF97AC",
                                            },
                                          }),
                                          a("path", {
                                            attrs: {
                                              stroke: "#FF6D8B",
                                              "stroke-width": "2",
                                              "stroke-linecap": "square",
                                              d:
                                                "M49 45h6V25H35v6M43 55h2v-2M25 53v2h2M27 35h-2v2",
                                            },
                                          }),
                                          a("path", {
                                            attrs: {
                                              stroke: "#FF6D8B",
                                              "stroke-width": "2",
                                              "stroke-linecap": "square",
                                              d:
                                                "M43 35h2v2M39 55h-2M33 55h-2M39 35h-2M33 35h-2M45 49v-2M25 49v-2M25 43v-2M45 43v-2",
                                            },
                                          }),
                                        ]
                                      ),
                                    ]
                                  ),
                                ]),
                                a("h3", { staticClass: "feature-title" }, [
                                  t._v("Personlised"),
                                ]),
                                a("p", { staticClass: "text-sm" }, [
                                  t._v(
                                    "Your feed is always personlised according to your interests, so you can spend more time reading articles instead of searching them for hours."
                                  ),
                                ]),
                              ]),
                            ]
                          ),
                          a(
                            "div",
                            {
                              staticClass: "feature",
                              attrs: { "data-aos": "zoom-in" },
                            },
                            [
                              a("div", { staticClass: "feature-inner" }, [
                                a("div", { staticClass: "feature-icon" }, [
                                  a(
                                    "svg",
                                    {
                                      attrs: {
                                        height: "60pt",
                                        viewBox: "0 -27 436.90667 436",
                                        width: "80pt",
                                        xmlns: "http://www.w3.org/2000/svg",
                                      },
                                    },
                                    [
                                      a("path", {
                                        attrs: {
                                          d:
                                            "m427.519531 61.894531c-7.289062-23.71875-29.359375-40.960937-55.464843-40.960937h-307.203126c-26.105468 0-48.175781 17.242187-55.464843 40.960937h-2.558594v20.480469h.171875c1.777344 30.445312 26.960938 54.613281 57.851562 54.613281h307.203126c30.894531 0 56.078124-24.167969 57.851562-54.613281h.171875v-20.480469zm0 0",
                                          fill: "#0e65e5",
                                        },
                                      }),
                                      a("path", {
                                        attrs: {
                                          d:
                                            "m372.054688 143.8125h-307.203126c-33.75 0-61.820312-26.011719-64.558593-59.503906-.191407-.617188-.292969-1.261719-.292969-1.933594v-20.480469c0-2.90625 1.8125-5.386719 4.371094-6.375 9.609375-24.953125 33.367187-41.414062 60.480468-41.414062h307.203126c27.113281 0 50.871093 16.460937 60.480468 41.414062 2.558594.988281 4.371094 3.46875 4.371094 6.375v20.480469c0 .691406-.105469 1.367188-.300781 2-2.773438 33.457031-30.816407 59.4375-64.550781 59.4375zm-358.402344-62.945312c.089844.359374.140625.726562.160156 1.105468 1.574219 27.019532 23.992188 48.1875 51.039062 48.1875h307.203126c27.046874 0 49.464843-21.167968 51.039062-48.1875.019531-.386718.074219-.765625.160156-1.132812v-13.617188c-1.046875-.832031-1.847656-1.980468-2.261718-3.320312-6.640626-21.621094-26.304688-36.140625-48.9375-36.140625h-307.203126c-22.632812 0-42.296874 14.519531-48.9375 36.136719-.414062 1.339843-1.214843 2.488281-2.261718 3.320312zm0 0",
                                          fill: "#0e65e5",
                                        },
                                      }),
                                      a("path", {
                                        attrs: {
                                          d:
                                            "m372.054688 123.332031h-307.203126c-32.046874 0-58.023437-25.976562-58.023437-58.023437 0-32.050782 25.976563-58.027344 58.023437-58.027344h307.203126c32.046874 0 58.023437 25.976562 58.023437 58.027344 0 32.046875-25.976563 58.023437-58.023437 58.023437zm0 0",
                                          fill: "#94c1ff",
                                        },
                                      }),
                                      a("path", {
                                        attrs: {
                                          d:
                                            "m372.054688 130.160156h-307.203126c-35.757812 0-64.851562-29.09375-64.851562-64.851562 0-35.761719 29.09375-64.855469 64.851562-64.855469h307.203126c35.757812 0 64.851562 29.09375 64.851562 64.855469 0 35.757812-29.09375 64.851562-64.851562 64.851562zm-307.203126-116.054687c-28.230468 0-51.199218 22.96875-51.199218 51.203125 0 28.230468 22.96875 51.199218 51.199218 51.199218h307.203126c28.230468 0 51.199218-22.96875 51.199218-51.199218 0-28.234375-22.96875-51.203125-51.199218-51.203125zm0 0",
                                          fill: "#0e65e5",
                                        },
                                      }),
                                      a("path", {
                                        attrs: {
                                          d:
                                            "m122.878906 34.585938h-68.265625c-3.773437 0-6.828125-3.050782-6.828125-6.824219 0-3.773438 3.054688-6.828125 6.828125-6.828125h68.265625c3.773438 0 6.828125 3.054687 6.828125 6.828125 0 3.773437-3.054687 6.824219-6.828125 6.824219zm0 0",
                                          fill: "#fff",
                                        },
                                      }),
                                      a("path", {
                                        attrs: {
                                          d:
                                            "m141.308594 96.539062h-10.214844v-62.984374h35.546875v8.699218h-25.332031v19.6875h23.738281v8.746094h-23.738281zm0 0",
                                          fill: "#0e65e5",
                                        },
                                      }),
                                      a("path", {
                                        attrs: {
                                          d:
                                            "m188.351562 71.378906v25.160156h-10.296874v-62.984374h17.792968c8.132813 0 14.144532 1.519531 18.050782 4.566406 3.90625 3.039062 5.863281 7.640625 5.863281 13.785156 0 7.84375-4.082031 13.425781-12.234375 16.761719l17.792968 27.871093h-11.71875l-15.082031-25.160156zm0-8.53125h7.152344c4.796875 0 8.269532-.886718 10.425782-2.667968 2.15625-1.785157 3.230468-4.425782 3.230468-7.929688 0-3.5625-1.160156-6.113281-3.488281-7.667969-2.324219-1.550781-5.832031-2.324219-10.511719-2.324219h-6.808594zm0 0",
                                          fill: "#0e65e5",
                                        },
                                      }),
                                      a("path", {
                                        attrs: {
                                          d:
                                            "m270.085938 96.539062h-35.632813v-62.984374h35.632813v8.699218h-25.332032v17.148438h23.738282v8.621094h-23.738282v19.773437h25.332032zm0 0",
                                          fill: "#0e65e5",
                                        },
                                      }),
                                      a("path", {
                                        attrs: {
                                          d:
                                            "m319.332031 96.539062h-35.632812v-62.984374h35.632812v8.699218h-25.332031v17.148438h23.738281v8.621094h-23.738281v19.773437h25.332031zm0 0",
                                          fill: "#0e65e5",
                                        },
                                      }),
                                      a("path", {
                                        attrs: {
                                          d:
                                            "m163.601562 164.292969-54.375-6.828125v-64.851563c0-9.425781-7.640624-17.066406-17.066406-17.066406-9.425781 0-17.066406 7.640625-17.066406 17.066406v161.351563c0 12.535156 8.761719 22.976562 20.480469 25.664062v96.292969h88.746093v-96.292969c11.71875-2.6875 20.480469-13.128906 20.480469-25.664062v-48.472656c0-22.753907-18.445312-41.199219-41.199219-41.199219zm0 0",
                                          fill: "#d7e9ff",
                                        },
                                      }),
                                      a("g", { attrs: { fill: "#0e65e5" } }, [
                                        a("path", {
                                          attrs: {
                                            d:
                                              "m184.320312 382.746094h-88.746093c-3.773438 0-6.828125-3.050782-6.828125-6.824219v-91.320313c-12.285156-5.054687-20.480469-16.976562-20.480469-30.640624v-161.347657c0-13.171875 10.71875-23.894531 23.894531-23.894531 13.171875 0 23.894532 10.722656 23.894532 23.894531v58.832031l47.984374 6.019532c26.28125.242187 47.585938 21.695312 47.585938 48.027344v48.46875c0 13.664062-8.191406 25.585937-20.476562 30.640624v91.320313c0 3.773437-3.054688 6.824219-6.828126 6.824219zm-81.921874-13.652344h75.09375v-89.46875c0-3.179688 2.199218-5.9375 5.300781-6.652344 8.9375-2.046875 15.179687-9.863281 15.179687-19.011718v-48.46875c0-18.949219-15.417968-34.371094-34.375-34.371094-.285156 0-.566406-.023438-.851562-.054688l-54.371094-6.824218c-3.414062-.429688-5.976562-3.335938-5.976562-6.777344v-64.851563c0-5.648437-4.589844-10.238281-10.238282-10.238281-5.648437 0-10.238281 4.589844-10.238281 10.238281v161.347657c0 9.144531 6.238281 16.964843 15.179687 19.011718 3.097657.714844 5.296876 3.472656 5.296876 6.652344zm0 0",
                                          },
                                        }),
                                        a("path", {
                                          attrs: {
                                            d:
                                              "m109.226562 198.425781c-3.773437 0-6.828124-3.050781-6.828124-6.824219v-34.136718c0-3.773438 3.054687-6.824219 6.828124-6.824219 3.773438 0 6.828126 3.050781 6.828126 6.824219v34.136718c0 3.773438-3.054688 6.824219-6.828126 6.824219zm0 0",
                                          },
                                        }),
                                        a("path", {
                                          attrs: {
                                            d:
                                              "m136.535156 191.601562c-3.773437 0-6.828125-3.054687-6.828125-6.828124v-20.480469c0-3.773438 3.054688-6.828125 6.828125-6.828125 3.773438 0 6.824219 3.054687 6.824219 6.828125v20.480469c0 3.773437-3.050781 6.828124-6.824219 6.828124zm0 0",
                                          },
                                        }),
                                        a("path", {
                                          attrs: {
                                            d:
                                              "m163.839844 191.601562c-3.773438 0-6.828125-3.054687-6.828125-6.828124v-20.480469c0-3.773438 3.054687-6.828125 6.828125-6.828125 3.773437 0 6.828125 3.054687 6.828125 6.828125v20.480469c0 3.773437-3.054688 6.828124-6.828125 6.828124zm0 0",
                                          },
                                        }),
                                        a("path", {
                                          attrs: {
                                            d:
                                              "m282.71875 180.773438c-1.746094 0-3.492188-.667969-4.824219-2l-19.308593-19.304688c-2.664063-2.667969-2.664063-6.988281 0-9.65625 2.667968-2.664062 6.988281-2.664062 9.652343 0l19.308594 19.308594c2.664063 2.664062 2.664063 6.984375 0 9.652344-1.332031 1.332031-3.078125 2-4.828125 2zm0 0",
                                          },
                                        }),
                                        a("path", {
                                          attrs: {
                                            d:
                                              "m263.414062 180.773438c-1.746093 0-3.492187-.667969-4.828124-2-2.664063-2.667969-2.664063-6.988282 0-9.652344l19.308593-19.308594c2.664063-2.664062 6.984375-2.664062 9.652344 0 2.664063 2.667969 2.664063 6.988281 0 9.65625l-19.308594 19.304688c-1.332031 1.332031-3.078125 2-4.824219 2zm0 0",
                                          },
                                        }),
                                        a("path", {
                                          attrs: {
                                            d:
                                              "m350.984375 249.039062c-1.742187 0-3.492187-.667968-4.824219-2l-19.304687-19.304687c-2.667969-2.667969-2.667969-6.988281 0-9.652344 2.664062-2.667969 6.984375-2.667969 9.652343 0l19.304688 19.304688c2.664062 2.664062 2.664062 6.988281 0 9.652343-1.332031 1.335938-3.078125 2-4.828125 2zm0 0",
                                          },
                                        }),
                                        a("path", {
                                          attrs: {
                                            d:
                                              "m331.679688 249.039062c-1.746094 0-3.492188-.667968-4.824219-2-2.667969-2.664062-2.667969-6.988281 0-9.652343l19.304687-19.304688c2.664063-2.667969 6.988282-2.667969 9.652344 0 2.664062 2.664063 2.664062 6.984375 0 9.652344l-19.304688 19.304687c-1.332031 1.335938-3.082031 2-4.828124 2zm0 0",
                                          },
                                        }),
                                      ]),
                                      a("path", {
                                        attrs: {
                                          d:
                                            "m163.839844 280.347656c-3.773438 0-6.828125-3.054687-6.828125-6.828125v-27.304687c0-3.773438 3.054687-6.828125 6.828125-6.828125 3.773437 0 6.828125 3.054687 6.828125 6.828125v27.304687c0 3.773438-3.054688 6.828125-6.828125 6.828125zm0 0",
                                          fill: "#fff",
                                        },
                                      }),
                                      a("path", {
                                        attrs: {
                                          d:
                                            "m177.492188 266.691406h-27.304688c-3.773438 0-6.828125-3.050781-6.828125-6.824218 0-3.773438 3.054687-6.828126 6.828125-6.828126h27.304688c3.773437 0 6.828124 3.054688 6.828124 6.828126 0 3.773437-3.054687 6.824218-6.828124 6.824218zm0 0",
                                          fill: "#fff",
                                        },
                                      }),
                                    ]
                                  ),
                                ]),
                                a("h3", { staticClass: "feature-title" }, [
                                  t._v("Free To Use"),
                                ]),
                                a("p", { staticClass: "text-sm" }, [
                                  t._v(
                                    "Blogie is free to use and always will be. Currently in beta version there are not even ads."
                                  ),
                                ]),
                              ]),
                            ]
                          ),
                        ]),
                      ]
                    ),
                  ]),
                ]),
              ]),
              a("footer", { staticClass: "site-footer text-light" }, [
                a("div", { staticClass: "container" }, [
                  a("div", { staticClass: "site-footer-inner" }, [
                    a("div", { staticClass: "brand footer-brand" }, [
                      a("h5", [t._v("Blogie")]),
                    ]),
                    a("ul", { staticClass: "footer-social-links list-reset" }, [
                      a("li", [
                        a("a", { attrs: { href: "#" } }, [
                          a("span", { staticClass: "screen-reader-text" }, [
                            t._v("Facebook"),
                          ]),
                          a(
                            "svg",
                            {
                              attrs: {
                                width: "16",
                                height: "16",
                                xmlns: "http://www.w3.org/2000/svg",
                              },
                            },
                            [
                              a("path", {
                                attrs: {
                                  d:
                                    "M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z",
                                  fill: "#FFFFFF",
                                },
                              }),
                            ]
                          ),
                        ]),
                      ]),
                      a("li", [
                        a("a", { attrs: { href: "#" } }, [
                          a("span", { staticClass: "screen-reader-text" }, [
                            t._v("Twitter"),
                          ]),
                          a(
                            "svg",
                            {
                              attrs: {
                                width: "16",
                                height: "16",
                                xmlns: "http://www.w3.org/2000/svg",
                              },
                            },
                            [
                              a("path", {
                                attrs: {
                                  d:
                                    "M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z",
                                  fill: "#FFFFFF",
                                },
                              }),
                            ]
                          ),
                        ]),
                      ]),
                      a("li", [
                        a("a", { attrs: { href: "#" } }, [
                          a("span", { staticClass: "screen-reader-text" }, [
                            t._v("Google"),
                          ]),
                          a(
                            "svg",
                            {
                              attrs: {
                                width: "16",
                                height: "16",
                                xmlns: "http://www.w3.org/2000/svg",
                              },
                            },
                            [
                              a("path", {
                                attrs: {
                                  d:
                                    "M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z",
                                  fill: "#FFFFFF",
                                },
                              }),
                            ]
                          ),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ],
            1
          );
        },
        r = [],
        i =
          (a("8e6e"),
          a("8a81"),
          a("ac6a"),
          a("cadf"),
          a("06db"),
          a("456d"),
          a("c47a")),
        c = a.n(i),
        n = a("2f62"),
        l = a("4ee7"),
        o = a("f5af"),
        h = a.n(o);
      a("e829");
      function f(t, e) {
        var a = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var s = Object.getOwnPropertySymbols(t);
          e &&
            (s = s.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            a.push.apply(a, s);
        }
        return a;
      }
      function u(t) {
        for (var e = 1; e < arguments.length; e++) {
          var a = null != arguments[e] ? arguments[e] : {};
          e % 2
            ? f(Object(a), !0).forEach(function (e) {
                c()(t, e, a[e]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a))
            : f(Object(a)).forEach(function (e) {
                Object.defineProperty(
                  t,
                  e,
                  Object.getOwnPropertyDescriptor(a, e)
                );
              });
        }
        return t;
      }
      var d = {
          name: "PageIndex",
          computed: u(
            u({}, Object(n["b"])("articles", ["isAuthenticated"])),
            Object(n["b"])("articles", ["user"])
          ),
          components: {
            "register-popup": a("1feb").default,
            "login-popup": a("578a").default,
          },
          created: function () {
            h.a.init();
          },
          methods: {
            toDashboard: function () {
              window.location.href = "/dashboard";
            },
            logout: function () {
              var t = this;
              this.$q
                .dialog({
                  title: "Logout",
                  message: "Are you sure you want to logout?",
                  cancel: !0,
                  persistent: !0,
                })
                .onOk(function () {})
                .onOk(function () {
                  l["a"]
                    .signOut()
                    .then(function () {
                      (t.success = "Logged out successfully"),
                        t.$store.dispatch("articles/fetchUser"),
                        t.$router.push("/");
                    })
                    .catch(function (e) {
                      t.error = e;
                    });
                })
                .onCancel(function () {})
                .onDismiss(function () {});
            },
          },
          data: function () {
            return { success: null, error: null };
          },
        },
        g = d,
        p = a("2877"),
        b = a("eebe"),
        v = a.n(b),
        m = a("09e3"),
        w = a("068f"),
        x = Object(p["a"])(g, s, r, !1, null, null, null);
      e["default"] = x.exports;
      v()(x, "components", { QPageContainer: m["a"], QImg: w["a"] });
    },
    "95ec": function (t, e, a) {},
    f30e: function (t, e, a) {
      "use strict";
      var s = a("95ec"),
        r = a.n(s);
      r.a;
    },
  },
]);
