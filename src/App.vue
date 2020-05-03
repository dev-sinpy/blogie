<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script >
  import {AUTH} from './plugins/firebase'
export default {
  name: 'App',
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    AUTH.onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        // Signed in. Let Vuex know.
        store.dispatch('articles/fetchUser', user)
        store.dispatch('articles/fetchFeed', {limit: 20, page:1})
        store.dispatch('articles/fetchTags', user)
        
      } else {
        // Signed out. Let Vuex know.
        store.commit('articles/RESET_USER')
      }
    })
  },
}
</script>
