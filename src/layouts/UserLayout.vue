<!--
Dashboard layout

Defines header and sidebar of the dashboard.

*Styling*
Uses quasar classes and some inline css.
-->
<template>
  <q-layout view="lhh LpR fFf" class="shadow-2">
    <q-header reveal>
      <q-toolbar>
        <q-btn
          flat
          @click="showLeftSidebar = !showLeftSidebar"
          round
          dense
          icon="linear_scale"
        />
        <q-space />
        <div class="text-h5 text-bold text-orange logo-text">
          Blogie
        </div>
        <q-space />

        <!--navbar -->
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
      <router-view :success="success" :error="error" :deleteUser="deleteUser" />
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
    "left-sidebar": require("components/LeftSidebar.vue").default, //tags to display in sidebar
    "right-sidebar": require("components/RightSidebar.vue").default, //tags to display in sidebar
  },

  created() {
    this.$q.dark.set(true); //set default to dark theme
  },

  preFetch({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    //Prefetching interests of the current logged in user
    store.subscribe((mutation, state) => {
      if (mutation.type === "main/SET_USER") {
        store.dispatch("main/fetchTags", { reload: false });
      }
    });
  },

  methods: {
    displayPopup(popup) {
      /*
      params: popup
      type: String
      */

      this.$store.commit("main/SET_POPUP", { popup: popup, flag: true });
    },

    interestsPopup() {
      /*
      Functionality: Displays a popup and fetches all the tags from the server.
      */
      this.$store.commit("main/SET_STATUS", {
        status: "popup_loading",
        flag: true,
      });
      //this.$store.dispatch("main/fetchDefaultTags");
      this.$store.commit("main/SET_POPUP", {
        popup: "interestsPopup",
        flag: true,
      });
      this.$store.commit("main/SET_STATUS", {
        status: "popup_loading",
        flag: false,
      });
    },

    darkMode() {
      //functionality: Toggles theme of the website
      this.$q.dark.toggle();
      this.$store.dispatch("main/setDarkMode");
    },
    logout() {
      this.$q
        .dialog({
          title: "Logout",
          message: "Are you sure you want to logout?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          //
        })
        .onOk(() => {
          AUTH.signOut()
            .then(() => {
              this.success = "Logged out successfully";
              this.$store.dispatch("main/fetchUser");
              window.location.href = "/";
            })
            .catch((error) => {
              this.error = error;
            });
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
  },

  computed: {
    //...mapState("main", ["tags"]),
    ...mapGetters("main", ["isAuthenticated"]),
    ...mapGetters("main", ["status"]),
    ...mapGetters("main", ["isDarkMode"]),
    dark: {
      get() {
        return this.isDarkMode;
      },
      set(val) {
        this.$q.dark.toggle();
        this.$store.dispatch("main/setDarkMode");
      },
    },
  },
  data() {
    return {
      success: null,
      error: null,
      popup: false,
      settings: [{ label: "Enable Dark Theme" }],
      drawer: false,
      deleteUser: false,
      showLeftSidebar: this.$q.platform.is.mobile ? false : true,
      showRightSidebar: this.$q.platform.is.mobile ? false : true,
    };
  },
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
