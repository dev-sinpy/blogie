<!--
Index page

Defines content displayed in homepage.

*Styling*
Uses quasar classes and global css defined in src/css folder.
-->

<template>
  <q-page-container>
    <!-- popups-->
    <login-popup />
    <register-popup />
    <!-- end popups-->
  </q-page-container>
</template>

<script>
import { mapGetters } from "vuex";
import { AUTH } from "../boot/firebase";

export default {
  name: "PageIndex",
  computed: {
    ...mapGetters("main", ["isAuthenticated"]),
  },
  components: {
    "register-popup": require("components/popups/Register.vue").default,
    "login-popup": require("components/popups/Login.vue").default,
  },
  methods: {
    toDashboard() {
      window.location.href = "/dashboard";
    },

    displayPopup(popup) {
      this.$store.commit("main/SET_POPUP", { popup: popup, flag: true });
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
              this.$router.push("/");
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
  data() {
    return {
      success: null,
      error: null,
    };
  },
};
</script>

<style lang="css"></style>
