<!--
dashboard page

Defines content displayed in dashboard.

*Styling*
Uses quasar classes and some inline css.
-->

<template>
  <q-page-container>
    <q-page padding>
      
      <!-- banners -->
        <q-banner v-show="success" inline-actions class="text-white bg-positive">
          {{ success }}
        </q-banner>

        <q-banner v-show="error" inline-actions class="text-white bg-negative">
          {{ error }}
        </q-banner>
      <!-- end banners -->
        
        <div
          class="q-pa-sm text-h5 text-weight-bold"
          v-bind:class="[isDarkMode ? 'text-white' : 'text-black']"
          v-bind:style="{
            border: `1px ${isDarkMode ? 'white' : 'black'} solid`,
            borderRadius: '10px',
          }"
        >
          Recommended For You
        </div>

        <!-- popups-->
        <initial-popup />

        <interests-popup />

        <delete-user-popup :deleteUser="deleteUser" />        
        <!-- End popups -->
        
        <!-- Feed -->
        <feed />
        <!-- End Feed -->
    </q-page>
  </q-page-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  
  props: ["success", "error", "deleteUser"],

  preFetch({ store, currentRoute, previousRoute, redirect }) {
    //if (!store.getters['articles/user']) {
      //redirect('/')
    //}
    //for new user, display a popup for selecting some tags
    if (currentRoute.query.tutorial) {
      store.dispatch("articles/fetchDefaultTags");
      store.commit("articles/SET_POPUP", { popup: "initialPopup", flag: true });
    }
  },

  components: {
    "feed": require("components/Feed.vue").default,
    "interests-popup": require("components/Interests.vue").default,
    "initial-popup": require("components/InitialSetup.vue").default,
    "delete-user-popup": require("components/DeleteAccount.vue").default,
  },
  
  computed: {
    ...mapGetters("articles", ["status"]), //status of the current state of the app
    ...mapGetters("articles", ["isDarkMode"])
  },
  
  methods: {},

  data() {
    return {};
  },
};
</script>
