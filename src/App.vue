<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script >
export default {
  name: 'App',
  created()  {
    AOS.init()
  },
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext }) {
  },
}
</script>
