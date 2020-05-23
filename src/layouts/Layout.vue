<!--
Home page layout

Defines header and footer of the homepage.

*Styling*
Uses additional global css defined in src/css folder.
-->

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
    <!-- additional router pages defined in src/pages folder -->
    <router-view />
    
    <!-- footer -->
    <footer class="site-footer text-light">
      <div class="container">
        <div class="site-footer-inner">
          <div class="brand footer-brand">
            <h5>Blogie</h5>
          </div>

          <ul class="footer-social-links list-reset">
            <li>
              <a href="#">
                <span class="screen-reader-text">Facebook</span>
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z"
                    fill="#FFFFFF"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="screen-reader-text">Twitter</span>
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z"
                    fill="#FFFFFF"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="screen-reader-text">Google</span>
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z"
                    fill="#FFFFFF"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
    <!--end footer -->
    
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { AUTH } from "../boot/firebase";

export default {
  name: "Layout",

  components: {},

  methods: {
    toDashboard() {
      window.location.href = "/dashboard";
    },

    displayPopup(popup) {
      /*
      params: popup
      type: String
      */
      
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
          this.$auth.signOut()
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
