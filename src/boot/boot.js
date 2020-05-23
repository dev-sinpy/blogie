import { AUTH } from "./firebase";

//Main boot file for getting state of the current user
export default ({ app, router, Vue, store, urlPath, redirect }) => {
  //console.log(urlPath);
  //console.log(store.getters["articles/isAuthenticated"]);
  store.dispatch("articles/fetchUser");
  //~ router.beforeEach((to, from, next) => {
  //~ // Check to see if the route has the meta field "authRequired" set to true
  //~ let authRequired = to.matched.some(route => route.meta.authRequired)
  //~ let isAuthenticated = store.getters['articles/user']
  //~ if (authRequired) {
  //~ if (isAuthenticated) {
  //~ // User is already signed in. Continue on.
  //~ next()
  //~ } else {
  //~ // Not signed in. Redirect to login page.
  //~ next({
  //~ name: 'index'
  //~ })
  //~ }
  //~ } else {
  //~ // Doesn't require authentication. Just continue on.
  //~ next()
  //~ }
  //~ })
};
