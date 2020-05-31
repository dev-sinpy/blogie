<!--
Dashboard layout

Defines header and sidebar of the dashboard.

*Styling*
Uses quasar classes and some inline css.
-->
<template>
  <q-layout view="lHh Lpr lff" class="shadow-2">
    <q-toolbar>
      <q-btn
        flat
        class="desktop-hide"
        @click="drawer = !drawer"
        round
        dense
        icon="linear_scale"
      />

      <div class="absolute-center text-h5 text-bold text-orange logo-text">
        Blogie
      </div>

      <!--navbar -->
        <nav-menu />
      <!-- end navbar -->
      <q-space />
    </q-toolbar>

    <!-- Sidebar for dashboard. -->
    <q-drawer
      v-model="drawer"
      persistent
      show-if-above
      :width="350"
      :breakpoint="500"
      bordered
      content-class="accent"
    >
      <q-scroll-area class="fit">
        
        <!-- primary buttons -->
        <q-list padding class="text-primary">
          <q-item 
            clickable
            v-ripple
            to="/dashboard"
            :active="link === 'inbox'"
            @click="link = 'inbox'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>

            <q-item-section>Dashboard</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/saved"
            :active="link === 'outbox'"
            @click="link = 'outbox'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="bookmarks" />
            </q-item-section>

            <q-item-section>Saved</q-item-section>
          </q-item>

        </q-list>
        
        <!-- tags-section -->
        <q-list 
          v-if="!status.tags_loading"
        >
          <q-item>
            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium">Tags</span>
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
          
          <tags v-for="tag in tags" v-bind:tag="tag" :key="tag.tag" />
        </q-list>
        
        <div v-else>
          <q-skeleton square height="20em" />
        </div>
        <!--end tags-section -->
        
        <!-- account-section -->
        <q-list bordered class="rounded-borders">
          <q-expansion-item
            switch-toggle-side
            expand-separator
            icon="fas fa-user-circle"
            label="Account"
          >
            <q-item>
              <q-item-section>
                <q-btn
                  :outline="true"
                  @click="deleteUser = !deleteUser"
                  class="q-ma-md"
                  label="Delete Account"
                  color="negative"
                />
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
        <!-- end account-section -->

        <q-list bordered class="rounded-borders">
          <q-expansion-item
            switch-toggle-side
            expand-separator 
            default-opened
            icon="fas fa-cog"
            label="Additional"
          > 
          
            <q-item
              v-ripple
              clickable
              v-for="setting in settings"
              :key="setting.label"
              @click="darkMode"
            >
              <q-item-section side top>
                <q-checkbox keep-color color="accent" v-model="dark" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ setting.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <!-- end sidebar -->

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
    'nav-menu': require("components/menu/Menu.vue").default, //tags to display in sidebar
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
  background: #E6F1FC;
}
</style>
