<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script >
  import { mapMutations } from 'vuex'
  import { AUTH } from './plugins/firebase'
export default {
  name: 'App',
  mounted() {
    AUTH.onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.$store.commit('articles/SET_LOGGED_IN', !!user)
      } else {
        this.$store.commit('articles/SET_LOGGED_IN', false)
      }
    });
    
  }
}
</script>
