<!--
Dashboard layout

Defines header and sidebar of the dashboard.

*Styling*
Uses quasar classes and some inline css.
-->
<template>
  <q-layout view="lhh LpR fFf">
    <q-header reveal :style="{ background: isDarkMode ? '' : 'white' }">
      <q-toolbar>
        <q-btn
          flat
          @click="left = !left"
          round
          dense
          icon="linear_scale"
          :color="isDarkMode ? 'white' : 'black'"
        />

        <div class="q-pl-lg text-h4 text-bold logo-text text-orange">
          Blogie
        </div>
        <q-badge outline class="q-ma-sm text-bold" color="orange">Beta</q-badge>

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

    <!-- Sidebar for dashboard. -->
    <q-drawer
      v-model="left"
      persistent
      show-if-above
      side="left"
      :width="220"
      :breakpoint="500"
      bordered
      content-class="accent"
    >
      <q-scroll-area class="fit">
        <!-- tags-section -->
        <q-list v-if="!status.tags_loading">
          <q-item>
            <q-item-section>
              <q-item-label>
                <span class="text-h6 text-bold">Tags</span>
              </q-item-label>
            </q-item-section>
            <q-item-section top side>
              <div>
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
          <q-item
            v-for="tag in tags"
            :key="tag.tag"
            v-ripple
            clickable
            @click="tag.enabled = !tag.enabled"
          >
            <q-item-section side top>
              <q-checkbox keep-color color="accent" v-model="tag.enabled" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-bold">{{ tag.tag }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <div v-else>
          <q-skeleton square height="40em" />
        </div>
        <!--end tags-section -->
      </q-scroll-area>
    </q-drawer>
    <!-- end left sidebar -->

    <!-- right sidebar -->
    <q-drawer
      v-model="right"
      persistent
      show-if-above
      side="right"
      :breakpoint="1000"
      content-class="accent"
    >
      <q-scroll-area class="fit">
        <q-card
          class="q-ma-sm"
          :style="{ background: isDarkMode ? '#3D3D3D' : '#f8f9fa' }"
        >
          <div class="q-ma-sm text-h6 text-bold">
            Global News
          </div>
          <q-separator />
          <q-card-section v-if="news" class="q-ma-none q-pa-none">
            <q-list v-for="item in news" :key="item.index">
              <q-item clickable>
                <a
                  :href="item.source"
                  target="_blank"
                  style="text-decoration: none; color: inherit;"
                >
                  <q-item-section class="text-caption text-bold">
                    {{ item.title }}
                  </q-item-section>
                </a>
              </q-item>
              <q-separator inset />
            </q-list>
          </q-card-section>

          <div v-else>
            <q-skeleton square height="40em" />
          </div>
        </q-card>
      </q-scroll-area>
    </q-drawer>
    <!-- end right sidebar -->

    <!-- right sidebar -->
    <!-- <left-sidebar :show="left" /> -->
    <!-- end right sidebar -->

    <!-- right sidebar -->
    <!-- <right-sidebar :show="right" /> -->
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
    // "left-sidebar": require("components/sidebar/LeftSidebar.vue").default, //tags to display in sidebar
    // "right-sidebar": require("components/sidebar/RightSidebar.vue").default, //tags to display in sidebar
  },

  computed: {
    ...mapState("main", ["tags"]),
    ...mapGetters("main", ["isAuthenticated"]),
    ...mapGetters("main", ["status"]),
    ...mapGetters("main", ["isDarkMode"]),
  },

  created() {
    let userSettings = this.$q.localStorage.getItem("userSettings");
    if (userSettings.darkMode) {
      this.$store.commit("main/SET_DARK_MODE");
    } else {
      this.$store.commit("main/SET_LIGHT_MODE");
    }
  },

  mounted() {
    this.getNews();
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
      news: null,
      success: null,
      error: null,
      left: false,
      right: false,
    };
  },

  methods: {
    getNews: async function() {
      let response = await this.$api.get("news/");
      this.news = response.data.data.splice(0, 30);
    },

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
  },
};
</script>

<style lang="css"></style>
