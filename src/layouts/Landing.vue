<!--
Home page layout
Defines header and footer of the homepage.
*Styling*
Uses additional global css defined in src/css folder.
-->

<template>
  <q-layout class="landing__container">
    <!-- popups-->
    <login-popup />
    <register-popup />
    <!-- end popups-->

    <section class="main__container pt-4 pb-6">
      <div class="container">
        <div class="rows">
          <div
            class="col-12 d-flex flex-rows align-items-center justify-content-between"
          >
            <div class="heading-brand logo__text">Blogie</div>

            <button
              v-if="isAuthenticated"
              @click="toDashboard"
              class="btn btn-dark"
            >
              Dashboard
            </button>
            <button
              v-if="!isAuthenticated"
              class="btn btn-dark"
              @click="displayPopup('loginPopup')"
            >
              Log In
            </button>
          </div>
        </div>
        <div class="rows mt-4">
          <div class="col-md-8 mx-auto text-center">
            <h1 class="intro__title">Discover the best articles from the Internet</h1>
            <p class="intro__text lead mb-5">
              Blogie is a news aggregator website which helps you discover
              content from major tech websites. Blogie is optimized to only show
              articles based on user interests, so that you can spend more time
              reading instead of googling keywords for hours.
            </p>
            <button
              class="btn btn-success svg-icon"
              @click="displayPopup('registerPopup')"
            >
              <em data-feather="github"></em>
              Signup
            </button>
          </div>
        </div>
        <div class="rows mt-5 col-md-9 mx-auto">
          <CodeWindow />
        </div>
      </div>
    </section>
    <!-- additional router pages defined in src/pages folder -->
    <router-view />
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";
import CodeWindow from "../components/landing/CodeWindow";

export default {
  name: "Layout",
  components: {
    "register-popup": () => import("components/popups/Register.vue"),
    "login-popup": () => import("components/popups/Login.vue"),
    CodeWindow
  },
  methods: {
    toDashboard() {
      window.location.href = "/dashboard";
    },
    displayPopup(popup) {
      /*
      params: popup
      type: String
      */
      this.$store.commit("main/SET_POPUP", { popup: popup, flag: true });
    },
  },
  computed: {
    ...mapGetters("main", ["isAuthenticated"]),
  },
  data() {
    return {
      success: null,
      error: null,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../css/variables";

.main__container {
  background: $main-background;
}

.intro__title {
  margin-top: 0;
  margin-bottom: 1rem;
}

.intro__text {
  margin-top: 0;
  margin-bottom: 1rem;
}

a {
  color: #000000;
  text-decoration: none;
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
}
a:hover {
  color: #666666;
  text-decoration: none;
}
a:not([href]):not([tabindex]) {
  color: inherit;
  text-decoration: none;
}
a:not([href]):not([tabindex]):hover,
a:not([href]):not([tabindex]):focus {
  color: inherit;
  text-decoration: none;
}
a:not([href]):not([tabindex]):focus {
  outline: 0;
}
template {
  display: none;
}
h1,
.h1 {
  margin-bottom: 1rem;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.5;
  color: #000000;
}
h1,
.h1 {
  font-size: 2.5rem;
}
.lead {
  font-size: 1.2rem;
  font-weight: 500;
}
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}
@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}
@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
.row {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
.col-12,
.col-md-8,
.col-md-9 {
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}
.col-12 {
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  max-width: 100%;
}
@media (min-width: 768px) {
  .col-md-8 {
    -ms-flex: 0 0 66.66667%;
    flex: 0 0 66.66667%;
    max-width: 66.66667%;
  }
  .col-md-9 {
    -ms-flex: 0 0 75%;
    flex: 0 0 75%;
    max-width: 75%;
  }
}
.btn {
  display: inline-block;
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 2px solid transparent;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.3rem;
  transition: all 0.2s;
}
@media screen and (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
  }
}
.btn:hover,
.btn:focus {
  text-decoration: none;
}
.btn:focus {
  outline: 0;
  box-shadow: none;
}
.btn:disabled {
  opacity: 0.65;
}
.btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}
.btn:not(:disabled):not(.disabled):active {
  background-image: none;
}
.btn-success {
  color: #ffffff;
  background-color: #5cc72a;
  border-color: #5cc72a;
}
.btn-success:hover {
  color: #ffffff;
  background-color: #4da723;
  border-color: #499d21;
}
.btn-success:focus {
  box-shadow: 0 0 0 0.2rem rgba(92, 199, 42, 0.5);
}
.btn-success:disabled {
  color: #ffffff;
  background-color: #5cc72a;
  border-color: #5cc72a;
}
.btn-success:not(:disabled):not(.disabled):active {
  color: #ffffff;
  background-color: #499d21;
  border-color: #44921f;
}
.btn-success:not(:disabled):not(.disabled):active:focus {
  box-shadow: 0 0 0 0.2rem rgba(92, 199, 42, 0.5);
}
.btn-dark {
  color: #ffffff;
  background-color: black;
  border-color: black;
}
.btn-dark:hover {
  color: #ffffff;
  background-color: black;
  border-color: black;
}
.btn-dark:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, 0.5);
}
.btn-dark:disabled {
  color: #ffffff;
  background-color: black;
  border-color: black;
}
.btn-dark:not(:disabled):not(.disabled):active {
  color: #ffffff;
  background-color: black;
  border-color: black;
}
.btn-dark:not(:disabled):not(.disabled):active:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, 0.5);
}
.d-flex {
  display: -ms-flexbox !important;
  display: flex !important;
}
.flex-row {
  -ms-flex-direction: row !important;
  flex-direction: row !important;
}
.justify-content-between {
  -ms-flex-pack: justify !important;
  justify-content: space-between !important;
}
.align-items-center {
  -ms-flex-align: center !important;
  align-items: center !important;
}
.mr-2 {
  margin-right: 0.5rem !important;
}
.mt-4 {
  margin-top: 1.5rem !important;
}
.mt-5 {
  margin-top: 3rem !important;
}
.mb-5 {
  margin-bottom: 3rem !important;
}
.pt-4 {
  padding-top: 1.5rem !important;
}
.pb-6 {
  padding-bottom: 6rem !important;
}
.mx-auto {
  margin-right: auto !important;
}
.mx-auto {
  margin-left: auto !important;
}
.text-center {
  text-align: center !important;
}
@media print {
  *,
  *::before,
  *::after {
    text-shadow: none !important;
    box-shadow: none !important;
  }
  a:not(.btn) {
    text-decoration: underline;
  }
  p {
    orphans: 3;
    widows: 3;
  }
  @page {
    size: a3;
  }
  body {
    min-width: 992px !important;
  }
  .container {
    min-width: 992px !important;
  }
}
/*****************
Custom CSS
*****************/
::selection {
  background-color: #ffff00;
  color: #000000;
}
a:not(.heading-brand) {
  font-weight: 500;
}
.heading-brand {
  font-weight: 800;
  font-size: 2.2rem;
}
.svg-icon {
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-align: center;
  align-items: center;
}
/* Buttons */
.btn {
  box-shadow: 0 4px 6px rgba(255, 255, 0, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}
.btn:active,
.btn:focus,
.btn:focus {
  box-shadow: none !important;
}
</style>
