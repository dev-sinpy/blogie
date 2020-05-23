const routes = [
  //{
  //path: '*',
  //name: 'maintenancePage',
  //component: () => import("layouts/Maintenance.vue"),
  //},

  {
    path: "/",
    component: () => import("layouts/Layout.vue"),
    children: [
      { path: "", name: "index", component: () => import("pages/Index.vue") },
    ],
  },

  {
    path: "/dashboard",
    component: () => import("layouts/UserLayout.vue"),
    children: [
      {
        path: "",
        name: "dashboard",
        meta: { authRequired: true },
        component: () => import("pages/Dashboard.vue"),
        props: (route) => ({ query: route.query.tutorial }),
      },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue"),
  });
}

export default routes;
