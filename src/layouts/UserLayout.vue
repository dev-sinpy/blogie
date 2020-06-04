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
        <q-btn flat @click="drawer = !drawer" round dense icon="linear_scale" />
        <q-space />
        <div class="text-h5 text-bold text-orange logo-text">
          Blogie
        </div>
        <q-space />

        <!--navbar -->
        <nav-menu />
        <!-- end navbar -->
        <q-space />
      </q-toolbar>
    </q-header>

    <!-- Sidebar for dashboard. -->
    <q-drawer
      v-model="drawer"
      persistent
      show-if-above
      side="left"
      :width="300"
      :breakpoint="500"
      bordered
      content-class="accent"
    >
      <q-scroll-area class="fit">
        <!-- tags-section -->
        <q-list v-if="!status.tags_loading">
          <q-item>
            <q-item-section>
              <q-item-label lines="1">
                <span class="text-bold">Tags</span>
              </q-item-label>
            </q-item-section>
            <q-item-section top side>
              <div class="text-grey-8 q-gutter-xs">
                <q-btn
                  @click="interestsPopup()"
                  size="16px"
                  flat
                  dense
                  round
                  icon="edit"
                />
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
          <tags v-for="tag in tags" v-bind:tag="tag" :key="tag.tag" />
        </q-list>

        <div v-else>
          <q-skeleton square height="20em" />
        </div>
        <!--end tags-section -->

        <q-card class="q-ma-sm" style="height: 300px; background: #3D3D3D;">
          <q-img
            src="https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2016/06/1466072832text_banner.png"
          />
        </q-card>
      </q-scroll-area>
    </q-drawer>
    <!-- end left sidebar -->

    <!-- right sidebar -->
    <right-sidebar />
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
    tags: require("components/Tags.vue").default, //tags to display in sidebar
    "nav-menu": require("components/menu/Menu.vue").default, //tags to display in sidebar
    "right-sidebar": require("components/RightSidebar.vue").default, //tags to display in sidebar
  },

  created() {
    this.$q.dark.set(true); //set default to dark theme
  },

  preFetch({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    //Prefetching interests of the current logged in user
    store.subscribe((mutation, state) => {
      if (mutation.type === "articles/SET_USER") {
        store.dispatch("articles/fetchTags", { reload: false });
      }
    });
  },

  methods: {
    displayPopup(popup) {
      /*
      params: popup
      type: String
      */

      this.$store.commit("articles/SET_POPUP", { popup: popup, flag: true });
    },

    interestsPopup() {
      /*
      Functionality: Displays a popup and fetches all the tags from the server.
      */
      this.$store.commit("articles/SET_STATUS", {
        status: "popup_loading",
        flag: true,
      });
      //this.$store.dispatch("articles/fetchDefaultTags");
      this.$store.commit("articles/SET_POPUP", {
        popup: "interestsPopup",
        flag: true,
      });
      this.$store.commit("articles/SET_STATUS", {
        status: "popup_loading",
        flag: false,
      });
    },

    darkMode() {
      //functionality: Toggles theme of the website
      this.$q.dark.toggle();
      this.$store.dispatch("articles/setDarkMode");
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
              this.$store.dispatch("articles/fetchUser");
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
    ...mapState("articles", ["tags"]),
    ...mapGetters("articles", ["isAuthenticated"]),
    ...mapGetters("articles", ["status"]),
    ...mapGetters("articles", ["isDarkMode"]),
    dark: {
      get() {
        return this.isDarkMode;
      },
      set(val) {
        this.$q.dark.toggle();
        this.$store.dispatch("articles/setDarkMode");
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
