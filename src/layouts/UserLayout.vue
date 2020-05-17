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

      <div class="absolute-right">
        <q-fab
          flat
          label="Menu"
          vertical-actions-align="left"
          :color="isDarkMode ? white : black"
          icon="none"
          direction="down"
        >
          <q-fab-action
            to="/"
            color="primary"
            icon="fas fa-home"
            label="Home"
          />
          
          <q-fab-action
            @click="logout"
            color="primary"
            icon="fas fa-sign-out-alt"
            label="Logout"
          />
        </q-fab>
      </div>

      <q-space />
    </q-toolbar>

    <q-drawer
      v-model="drawer"
      persistent
      show-if-above
      :width="275"
      :breakpoint="500"
      bordered
      content-class="accent"
    >
      <q-scroll-area class="fit">
        <q-list
          bordered
          class="rounded-borders q-mt-md"
          v-if="status == 'loaded'"
        >
          <q-expansion-item
            switch-toggle-side
            expand-separator
            default-opened
            icon="fas fa-hashtag"
            label="Tags"
          >

            <tags v-for="tag in Tags" v-bind:tag="tag" :key="tag.tag" />
          </q-expansion-item>
        </q-list>

        <div v-else>
          <q-skeleton square height="20em" />
        </div>

        <q-list bordered class="rounded-borders">
          <q-expansion-item
            switch-toggle-side
            expand-separator
            icon="fas fa-user-circle"
            label="Account"
          >
            <q-item v-ripple clickable>
              <q-item-section>
                <q-btn
                  :outline="true"
                  :loading="status == 'loading'"
                  @click="interestsPopup"
                  class="q-ma-md"
                  label="Edit Preferences"
                  color="blue"
                />
                
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

        <q-list bordered class="rounded-borders">
          <q-expansion-item
            switch-toggle-side
            expand-separator
            icon="fas fa-cog"
            label="Settings"
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
    <keep-alive>
      <router-view :success="success" :error="error" :deleteUser="deleteUser"/>
    </keep-alive>
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";
import { AUTH } from "../plugins/firebase";

export default {
  name: "Layout",

  components: {
    tags: require("components/Tags.vue").default,
  },

  created() {
    this.$q.dark.set(true);
  },

  preFetch({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    store.subscribe((mutation, state) => {
      if (mutation.type === "articles/SET_USER") {
        store.dispatch("articles/fetchTags", { reload: false });
      }
    });
  },

  methods: {
    displayPopup(popup) {
      this.$store.commit("articles/SET_POPUP", { popup: popup, flag: true });
    },

    interestsPopup() {
      this.$store.commit("articles/SET_LOADING", true);
      this.$store.dispatch("articles/fetchDefaultTags");
      this.$store.commit("articles/SET_POPUP", {
        popup: "interestsPopup",
        flag: true,
      });
      this.$store.commit("articles/SET_LOADING", false);
    },

    darkMode() {
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
    ...mapGetters("articles", ["Tags"]),
    ...mapGetters("articles", ["isAuthenticated"]),
    ...mapGetters("articles", ["status"]),
    ...mapGetters("articles", ["loadingButton"]),
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
      deleteUser: false
    };
  },
};
</script>

<style lang="css">
@import url("https://fonts.googleapis.com/css2?family=Righteous&display=swap");

.logo-text {
  font-family: "Righteous", cursive;
}
</style>
