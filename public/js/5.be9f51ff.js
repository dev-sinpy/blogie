(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  [5],
  {
    3855: function (e, t, a) {
      "use strict";
      a.r(t);
      var r = function () {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t;
          return a(
            "q-item",
            {
              directives: [{ name: "ripple", rawName: "v-ripple" }],
              attrs: { clickable: "" },
              on: {
                click: function (t) {
                  e.tag.enabled = !e.tag.enabled;
                },
              },
            },
            [
              a(
                "q-item-section",
                { attrs: { side: "", top: "" } },
                [
                  a("q-checkbox", {
                    attrs: { "keep-color": "", color: "accent" },
                    model: {
                      value: e.tag.enabled,
                      callback: function (t) {
                        e.$set(e.tag, "enabled", t);
                      },
                      expression: "tag.enabled",
                    },
                  }),
                ],
                1
              ),
              a(
                "q-item-section",
                [a("q-item-label", [e._v(e._s(e.tag.tag))])],
                1
              ),
            ],
            1
          );
        },
        o = [],
        s = {
          props: ["tag"],
          data: function () {
            return {};
          },
        },
        i = s,
        c = a("2877"),
        n = a("eebe"),
        l = a.n(n),
        u = a("66e5"),
        d = a("4074"),
        p = a("8f8e"),
        b = a("0170"),
        f = a("714f"),
        g = Object(c["a"])(i, r, o, !1, null, null, null);
      t["default"] = g.exports;
      l()(g, "components", {
        QItem: u["a"],
        QItemSection: d["a"],
        QCheckbox: p["a"],
        QItemLabel: b["a"],
      }),
        l()(g, "directives", { Ripple: f["a"] });
    },
    "3edf": function (e, t, a) {
      "use strict";
      a.r(t);
      var r = function () {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t;
          return a(
            "q-layout",
            { staticClass: "shadow-2", attrs: { view: "lHh Lpr lff" } },
            [
              a(
                "q-toolbar",
                [
                  a("q-btn", {
                    staticClass: "desktop-hide",
                    attrs: {
                      flat: "",
                      round: "",
                      dense: "",
                      icon: "linear_scale",
                    },
                    on: {
                      click: function (t) {
                        e.drawer = !e.drawer;
                      },
                    },
                  }),
                  a(
                    "div",
                    {
                      staticClass:
                        "absolute-center text-h5 text-bold text-orange logo-text",
                    },
                    [e._v("\n        Blogie\n        ")]
                  ),
                  a(
                    "div",
                    { staticClass: "absolute-right" },
                    [
                      a(
                        "q-fab",
                        {
                          attrs: {
                            flat: "",
                            label: "Menu",
                            "vertical-actions-align": "left",
                            color: e.isDarkMode ? e.white : e.black,
                            icon: "none",
                            direction: "down",
                          },
                        },
                        [
                          a("q-fab-action", {
                            attrs: {
                              to: "/",
                              color: "primary",
                              icon: "fas fa-home",
                              label: "Home",
                            },
                          }),
                          e.isAuthenticated
                            ? e._e()
                            : a("q-fab-action", {
                                attrs: {
                                  to: "/register",
                                  color: "primary",
                                  icon: "mail",
                                  label: "Signup",
                                },
                              }),
                          e.isAuthenticated
                            ? e._e()
                            : a("q-fab-action", {
                                attrs: {
                                  to: "/login",
                                  color: "primary",
                                  icon: "login",
                                  label: "Login",
                                },
                              }),
                          e.isAuthenticated
                            ? a("q-fab-action", {
                                attrs: {
                                  color: "primary",
                                  icon: "logout",
                                  label: "Logout",
                                },
                                on: { click: e.logout },
                              })
                            : e._e(),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  a("q-space"),
                ],
                1
              ),
              a(
                "q-drawer",
                {
                  attrs: {
                    persistent: "",
                    "show-if-above": "",
                    width: 275,
                    breakpoint: 500,
                    bordered: "",
                    "content-class": "accent",
                  },
                  model: {
                    value: e.drawer,
                    callback: function (t) {
                      e.drawer = t;
                    },
                    expression: "drawer",
                  },
                },
                [
                  a(
                    "q-scroll-area",
                    { staticClass: "fit" },
                    [
                      "loaded" == e.status
                        ? a(
                            "q-list",
                            {
                              staticClass: "rounded-borders q-mt-md",
                              attrs: { bordered: "" },
                            },
                            [
                              a(
                                "q-expansion-item",
                                {
                                  attrs: {
                                    "switch-toggle-side": "",
                                    "expand-separator": "",
                                    "default-opened": "",
                                    icon: "tags",
                                    label: "Select Tags",
                                  },
                                },
                                [
                                  a("q-item-label", { attrs: { header: "" } }, [
                                    e._v("Popular"),
                                  ]),
                                  e._l(e.Tags, function (e) {
                                    return a("tags", {
                                      key: e.tag,
                                      attrs: { tag: e },
                                    });
                                  }),
                                ],
                                2
                              ),
                            ],
                            1
                          )
                        : a(
                            "div",
                            [
                              a("q-skeleton", {
                                attrs: { square: "", height: "20em" },
                              }),
                            ],
                            1
                          ),
                      a(
                        "q-list",
                        {
                          staticClass: "rounded-borders",
                          attrs: { bordered: "" },
                        },
                        [
                          a(
                            "q-expansion-item",
                            {
                              attrs: {
                                "switch-toggle-side": "",
                                "expand-separator": "",
                                icon: "fas fa-user-circle",
                                label: "Account",
                              },
                            },
                            [
                              a(
                                "q-item",
                                {
                                  directives: [
                                    { name: "ripple", rawName: "v-ripple" },
                                  ],
                                  attrs: { clickable: "" },
                                },
                                [
                                  a(
                                    "q-item-section",
                                    [
                                      a("q-btn", {
                                        staticClass: "q-ma-md",
                                        attrs: {
                                          loading: e.loadingButton,
                                          label: "Edit Preferences",
                                          color: "blue",
                                        },
                                        on: { click: e.interestsPopup },
                                      }),
                                      a("q-btn", {
                                        staticClass: "q-ma-md",
                                        attrs: {
                                          label: "Delete Account",
                                          color: "negative",
                                        },
                                      }),
                                    ],
                                    1
                                  ),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                      a(
                        "q-list",
                        {
                          staticClass: "rounded-borders",
                          attrs: { bordered: "" },
                        },
                        [
                          a(
                            "q-expansion-item",
                            {
                              attrs: {
                                "switch-toggle-side": "",
                                "expand-separator": "",
                                icon: "fas fa-cog",
                                label: "Settings",
                              },
                            },
                            e._l(e.settings, function (t) {
                              return a(
                                "q-item",
                                {
                                  directives: [
                                    { name: "ripple", rawName: "v-ripple" },
                                  ],
                                  key: t.label,
                                  attrs: { clickable: "" },
                                  on: { click: e.darkMode },
                                },
                                [
                                  a(
                                    "q-item-section",
                                    { attrs: { side: "", top: "" } },
                                    [
                                      a("q-checkbox", {
                                        attrs: {
                                          "keep-color": "",
                                          color: "accent",
                                        },
                                        model: {
                                          value: e.dark,
                                          callback: function (t) {
                                            e.dark = t;
                                          },
                                          expression: "dark",
                                        },
                                      }),
                                    ],
                                    1
                                  ),
                                  a(
                                    "q-item-section",
                                    [a("q-item-label", [e._v(e._s(t.label))])],
                                    1
                                  ),
                                ],
                                1
                              );
                            }),
                            1
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
              a(
                "keep-alive",
                [
                  a("router-view", {
                    attrs: { success: e.success, error: e.error },
                  }),
                ],
                1
              ),
            ],
            1
          );
        },
        o = [],
        s =
          (a("8e6e"),
          a("8a81"),
          a("ac6a"),
          a("cadf"),
          a("06db"),
          a("456d"),
          a("c47a")),
        i = a.n(s),
        c = a("2f62"),
        n = a("4ee7");
      function l(e, t) {
        var a = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            a.push.apply(a, r);
        }
        return a;
      }
      function u(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? l(Object(a), !0).forEach(function (t) {
                i()(e, t, a[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : l(Object(a)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(a, t)
                );
              });
        }
        return e;
      }
      var d = {
          name: "Layout",
          components: { tags: a("3855").default },
          created: function () {
            this.$q.dark.set(!0);
          },
          preFetch: function (e) {
            var t = e.store;
            e.currentRoute, e.previousRoute, e.redirect, e.ssrContext;
            t.subscribe(function (e, a) {
              "articles/SET_USER" === e.type &&
                t.dispatch("articles/fetchTags", { reload: !1 });
            });
          },
          methods: {
            displayPopup: function (e) {
              this.$store.commit("articles/SET_POPUP", { popup: e, flag: !0 });
            },
            interestsPopup: function () {
              this.$store.commit("articles/SET_LOADING", !0),
                this.$store.dispatch("articles/fetchDefaultTags"),
                this.$store.commit("articles/SET_POPUP", {
                  popup: "interestsPopup",
                  flag: !0,
                }),
                this.$store.commit("articles/SET_LOADING", !1);
            },
            darkMode: function () {
              this.$q.dark.toggle(),
                this.$store.dispatch("articles/setDarkMode");
            },
            logout: function () {
              var e = this;
              this.$q
                .dialog({
                  title: "Logout",
                  message: "Are you sure you want to logout?",
                  cancel: !0,
                  persistent: !0,
                })
                .onOk(function () {})
                .onOk(function () {
                  n["a"]
                    .signOut()
                    .then(function () {
                      (e.success = "Logged out successfully"),
                        e.$store.dispatch("articles/fetchUser"),
                        (window.location.href = "/");
                    })
                    .catch(function (t) {
                      e.error = t;
                    });
                })
                .onCancel(function () {})
                .onDismiss(function () {});
            },
          },
          computed: u(
            u(
              u(
                u(
                  u(
                    u({}, Object(c["b"])("articles", ["Tags"])),
                    Object(c["b"])("articles", ["isAuthenticated"])
                  ),
                  Object(c["b"])("articles", ["status"])
                ),
                Object(c["b"])("articles", ["loadingButton"])
              ),
              Object(c["b"])("articles", ["isDarkMode"])
            ),
            {},
            {
              dark: {
                get: function () {
                  return this.isDarkMode;
                },
                set: function (e) {
                  this.$q.dark.toggle(),
                    this.$store.dispatch("articles/setDarkMode");
                },
              },
            }
          ),
          data: function () {
            return {
              success: null,
              error: null,
              popup: !1,
              settings: [{ label: "Enable Dark Theme" }],
              drawer: !1,
            };
          },
        },
        p = d,
        b = (a("ef68"), a("2877")),
        f = a("eebe"),
        g = a.n(f),
        m = a("4d5a"),
        h = a("65c6"),
        k = a("9c40"),
        q = a("c294"),
        v = a("72db"),
        w = a("2c91"),
        O = a("9404"),
        y = a("4983"),
        x = a("1c1c"),
        _ = a("3b73"),
        P = a("0170"),
        Q = a("293e"),
        j = a("66e5"),
        D = a("4074"),
        S = a("8f8e"),
        $ = a("714f"),
        C = Object(b["a"])(p, r, o, !1, null, null, null);
      t["default"] = C.exports;
      g()(C, "components", {
        QLayout: m["a"],
        QToolbar: h["a"],
        QBtn: k["a"],
        QFab: q["a"],
        QFabAction: v["a"],
        QSpace: w["a"],
        QDrawer: O["a"],
        QScrollArea: y["a"],
        QList: x["a"],
        QExpansionItem: _["a"],
        QItemLabel: P["a"],
        QSkeleton: Q["a"],
        QItem: j["a"],
        QItemSection: D["a"],
        QCheckbox: S["a"],
      }),
        g()(C, "directives", { Ripple: $["a"] });
    },
    8222: function (e, t, a) {},
    ef68: function (e, t, a) {
      "use strict";
      var r = a("8222"),
        o = a.n(r);
      o.a;
    },
  },
]);
