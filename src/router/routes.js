
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') },
      { path: '/register', name: 'register', component: () => import('pages/Register.vue') },
      { path: '/login', name: 'login', component: () => import('pages/Login.vue') },
    ]
  },
  
  {
    path: '',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      { path: '/dashboard', name: 'dashboard', meta: {authRequired: true}, component: () => import('pages/Dashboard.vue') },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
