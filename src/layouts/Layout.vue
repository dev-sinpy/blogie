<template>
  <q-layout class="is-boxed has-animations">
    <div class="body-wrap boxed-container">
      <header class="site-header">
        <div class="container">
          <div class="site-header-inner">
            <div class="row brand header-brand">
              <h2 class="logo-text m-0">
                Blogie
              </h2>
              <q-space />
              <div class="absolute-right">
                <div class="row justify-around">
                  <q-btn
                    flat
                    v-if="isAuthenticated"
                    @click="toDashboard"
                    color="blue"
                    label="Dashboard"
                  />
                  <q-btn
                    flat
                    v-if="!isAuthenticated"
                    @click="displayPopup('registerPopup')"
                    color="blue"
                    label="signup"
                  />
                  <q-btn
                    flat
                    v-if="!isAuthenticated"
                    @click="displayPopup('loginPopup')"
                    color="blue"
                    label="login"
                  />
                  <q-btn
                    flat
                    v-if="isAuthenticated"
                    @click="logout"
                    color="blue"
                    label="logout"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
    <router-view />
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { AUTH } from "../plugins/firebase";

export default {
  name: "Layout",

  components: {},

  created() {
    //this.$q.dark.set(true)
  },

  methods: {
    toDashboard() {
      window.location.href = "/dashboard";
    },

    displayPopup(popup) {
      this.$store.commit("articles/SET_POPUP", { popup: popup, flag: true });
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
              this.error = "Unknown error occured.";
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
    ...mapGetters("articles", ["isAuthenticated"]),
  },
  data() {
    return {
      success: null,
      error: null,
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
