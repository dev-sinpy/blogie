<template>
  <q-page-container>
    <q-page padding>
      <q-pull-to-refresh @refresh="refresh">
        <q-banner v-if="success" inline-actions class="text-white bg-positive">
          {{ success }}
        </q-banner>

        <q-banner v-if="error" inline-actions class="text-white bg-negative">
          {{ error }}
        </q-banner>

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
        
      </q-pull-to-refresh>
    </q-page>
  </q-page-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",

  preFetch({ store, currentRoute, previousRoute, redirect }) {
    //if (!store.getters['articles/user']) {
      //redirect('/')
    //}
    if (currentRoute.query.tutorial) {
      store.dispatch("articles/fetchDefaultTags");
      store.commit("articles/SET_POPUP", { popup: "initialPopup", flag: true });
    }
    //store.subscribe((mutation, state) => {
      //if (mutation.type === "articles/SET_TAGS") {
        //let tags = store.getters["articles/getEnabledTags"];
        //const limit = tags.length ** 2;
        //store.dispatch("articles/fetchFeed", {
          //limit: limit,
          //page: 1,
          //reload: false,
        //});
      //}
    //});
  },

  components: {
    "feed": require("components/Feed.vue").default,
    "interests-popup": require("components/Interests.vue").default,
    "initial-popup": require("components/InitialSetup.vue").default,
    "delete-user-popup": require("components/DeleteAccount.vue").default,
  },
  props: ["success", "error", "deleteUser"],
  
  computed: {
    ...mapGetters("articles", ["status"]),
    ...mapGetters("articles", ["isDarkMode"])
  },
  
  methods: {
    refresh(done) {
      let tags = this.$store.getters["articles/getEnabledTags"];
      const limit = tags.length ** 2;
      this.$store.dispatch("articles/fetchFeed", {
        limit: limit,
        page: 1,
        reload: true,
      });
      done();
    },
  },

  data() {
    return {};
  },
};
</script>
