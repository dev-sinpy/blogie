import { AUTH } from '../plugins/firebase'

export default ({ app, router, Vue, store }) => {
  // Register the Firebase authentication listener
  //store.dispatch('articles/fetchUser')
  //~ router.beforeEach((to, from, next) => {
    //~ // Check to see if the route has the meta field "authRequired" set to true
    //~ let authRequired = to.matched.some(route => route.meta.authRequired)
    //~ let isAuthenticated = store.getters['articles/user']
    //~ if (authRequired) {
      //~ console.log(isAuthenticated);
      //~ if (isAuthenticated) {
        //~ // User is already signed in. Continue on.
        //~ next()
      //~ } else {
        //~ // Not signed in. Redirect to login page.
        //~ next({
          //~ name: 'register'
        //~ })
      //~ }
    //~ } else {
      //~ // Doesn't require authentication. Just continue on.
      //~ next()
    //~ }
  //~ })
  //store.dispatch('articles/fetchFeed', {limit: 20, page:1})
  store.dispatch('articles/fetchUser')
}
