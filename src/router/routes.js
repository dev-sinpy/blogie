// Define your routes in this filee

const routes = [
  //{
  //path: '*',
  //name: 'maintenancePage',
  //component: () => import("layouts/Maintenance.vue"),
  //},

  {
    path: "/",
    component: () => import("layouts/Layout.vue"),
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
      {
        path: "/saved",
        name: "saved",
        meta: { authRequired: true },
        component: () => import("pages/SavedContent.vue"),
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
