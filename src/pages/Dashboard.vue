<!--
dashboard page

Defines content displayed in dashboard.

*Styling*
Uses quasar classes and some inline css.
-->

<template>
  <q-page-container>
    <q-page class="q-pa-sm">
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
    //for new user, display a popup for selecting some tags
    if (currentRoute.query.tutorial) {
      store.commit("main/SET_POPUP", { popup: "initialPopup", flag: true });
    }
  },

  components: {
    feed: () => import("components/feed/Feed.vue"),
    "interests-popup": () => import("components/popups/Interests.vue"),
    "initial-popup": () => import("components/popups/InitialSetup.vue"),
    "delete-user-popup": () => import("components/popups/DeleteAccount.vue"),
  },

  computed: {
    ...mapGetters("main", ["isDarkMode"]),
  },

  data() {
    return {};
  },

  methods: {},
};
</script>
