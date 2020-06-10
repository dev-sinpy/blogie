<!--
Dashboard layout

Defines header and sidebar of the dashboard.

*Styling*
Uses quasar classes and some inline css.
-->
<template>
  <q-layout view="lhh LpR fFf" class="shadow-2">
    <q-header reveal :style="{ background: isDarkMode ? '' : 'white' }">
      <q-toolbar>
        <q-btn
          flat
          @click="showLeftSidebar = !showLeftSidebar"
          round
          dense
          icon="linear_scale"
          :color="isDarkMode ? 'white' : 'black'"
        />

        <q-space />

        <div class="q-pl-lg text-h5 text-bold text-orange logo-text">
          Blogie
        </div>
        <q-space />

        <!--navbar -->
        <q-btn class="q-mr-sm" icon="home" to="/dashboard" flat />

        <notifications />

        <nav-menu />
        <!-- end navbar -->

        <!-- <q-btn
          flat
          @click="showRightSidebar = !showRightSidebar"
          round
          dense
          icon="linear_scale"
        /> -->
      </q-toolbar>
    </q-header>

    <!-- right sidebar -->
    <left-sidebar :show="showLeftSidebar" />
    <!-- end right sidebar -->

    <!-- right sidebar -->
    <right-sidebar :show="showRightSidebar" />
    <!-- end right sidebar -->

    <!-- additional pages -->
    <keep-alive>
      <router-view :success="success" :error="error" />
    </keep-alive>
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";
import { AUTH } from "../boot/firebase";

export default {
  name: "DashboardLayout",

  components: {
    //tags: require("components/Tags.vue").default, //tags to display in sidebar
    "nav-menu": require("components/menu/Menu.vue").default, //tags to display in sidebar
    notifications: require("components/menu/Notification.vue").default, //tags to display in sidebar
    "left-sidebar": require("components/sidebar/LeftSidebar.vue").default, //tags to display in sidebar
    "right-sidebar": require("components/sidebar/RightSidebar.vue").default, //tags to display in sidebar
  },

  computed: {
    //...mapState("main", ["tags"]),
    ...mapGetters("main", ["isAuthenticated"]),
    ...mapGetters("main", ["status"]),
    ...mapGetters("main", ["isDarkMode"]),
  },

  created() {
    let userSettings = this.$q.localStorage.getItem("userSettings");
    console.log(userSettings);
    if (userSettings.darkMode) {
      this.$store.commit("main/SET_DARK_MODE");
    } else {
      this.$store.commit("main/SET_LIGHT_MODE");
    }
  },

  preFetch({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    //Prefetching interests of the current logged in user
    store.subscribe((mutation, state) => {
      if (mutation.type === "main/SET_USER") {
        store.dispatch("main/fetchTags", { reload: false });
      }
    });
  },

  data() {
    return {
      success: null,
      error: null,
      showLeftSidebar: this.$q.platform.is.mobile ? false : true,
      showRightSidebar: this.$q.platform.is.mobile ? false : true,
    };
  },

  methods: {},
};
</script>

<style lang="css">
@import url("https://fonts.googleapis.com/css2?family=Righteous&display=swap");

.logo-text {
  font-family: "Righteous", cursive;
}

.my-menu-link {
  color: black;
  background: #e6f1fc;
}
</style>
