<!--
Dashboard layout

Defines header and sidebar of the dashboard.

*Styling*
Uses quasar classes and some inline css.
-->
<template>
  <q-layout view="hHh LpR fFf">
    <q-header reveal :style="{ background: isDarkMode ? '' : '#1976D2' }">
      <q-toolbar>
        <q-btn
          flat
          @click="left = !left"
          round
          dense
          icon="linear_scale"
          :color="isDarkMode ? 'white' : 'black'"
        />

        <div class="q-pl-lg text-h4 text-bold logo-text">
          Blogie
        </div>
        <q-input
          dark
          dense
          standout
          v-model="text"
          input-class="text-left"
          class="q-ml-md mobile-hide"
        >
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="text = ''"
            />
          </template>
        </q-input>
        <q-space />

        <!--navbar -->
        <q-btn
          class="q-mr-md"
          icon="home"
          :color="isDarkMode ? 'white' : 'black'"
          to="/dashboard"
          dense
          flat
        />

        <!-- <notifications /> -->
        <notifications class="mobile-hide" />

        <nav-menu />
        <!-- end navbar -->

        <q-btn
          @click="right = !right"
          icon="linear_scale"
          :color="isDarkMode ? 'white' : 'black'"
          flat
          round
          dense
        />
      </q-toolbar>
    </q-header>

    <!-- right sidebar -->
    <left-sidebar :left="left" />
    <!-- end right sidebar -->

    <!-- right sidebar -->
    <right-sidebar :right="right" />
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
    "nav-menu": require("components/menu/Menu.vue").default, //tags to display in sidebar
    notifications: require("components/menu/Notification.vue").default,
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
      text: "",
      success: null,
      error: null,
      left: false,
      right: false,
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
</style>
