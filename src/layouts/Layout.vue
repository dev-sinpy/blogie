<!--
Home page layout

Defines header and footer of the homepage.

*Styling*
Uses additional global css defined in src/css folder.
-->

<template>
  <q-layout>
    <!-- popups-->
    <login-popup />
    <register-popup />
    <!-- end popups-->

    <section class="bg-gradient pt-4 pb-6">
      <div class="container">
        <div class="rows">
          <div
            class="col-12 d-flex flex-rows align-items-center justify-content-between"
          >
            <div class="heading-brand logo-text">Blogie</div>

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
            <h1>Discover the best articles from the Internet</h1>
            <p class="lead mb-5">
              Blogie helps you discover content from various sites. Your feed is
              always optimized to only show articles which you would actually
              enjoy reading so you can spend more time reading instead of
              googling keywords for hours.
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
        <div class="rows mt-5">
          <div class="col-md-9 mx-auto">
            <div class="code-window">
              <div class="dots">
                <div class="red"></div>
                <div class="orange"></div>
                <div class="green"></div>
              </div>
              <q-img src="statics/showcase.jpg" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- additional router pages defined in src/pages folder -->
    <router-view />
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { AUTH } from "../boot/firebase";

export default {
  name: "Layout",

  components: {
    "register-popup": require("components/popups/Register.vue").default,
    "login-popup": require("components/popups/Login.vue").default,
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

<style lang="css" scoped>
.bg-gradient {
  background: linear-gradient(#ffff00, #ffff4d);
}

:root {
  --blue: #0000ff;
  --indigo: #3d5afe;
  --purple: #aa00ff;
  --pink: #f50057;
  --red: #ff1744;
  --orange: #f6c343;
  --yellow: #ffff00;
  --green: #5cc72a;
  --teal: #1de9b6;
  --cyan: #00e5ff;
  --white: #ffffff;
  --gray: #868e96;
  --gray-dark: #343a40;
  --primary: #ffff00;
  --secondary: #0000ff;
  --success: #5cc72a;
  --info: #00e5ff;
  --warning: #f6c343;
  --danger: #ff1744;
  --light: #f8f9fa;
  --dark: black;
  --breakpoint-xs: 0;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --font-family-sans-serif: K2D, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -ms-overflow-style: scrollbar;
  -webkit-tap-highlight-color: transparent;
}

@-ms-viewport {
  width: device-width;
}

section {
  display: block;
}

body {
  margin: 0;
  font-family: K2D, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #343a40;
  text-align: left;
  background-color: #ffffff;
}

h1 {
  margin-top: 0;
  margin-bottom: 1rem;
}

p {
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

/*Forms*/

/*Feature Grid*/

/*Press Icons*/

/*footer*/

/* Icon Boxes */

/*Gradients*/

/*Code Window*/
.code-window {
  border-radius: 0.45rem;
  background-color: #ffffff;
  padding: 1.52rem;
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.1);
}
.code-window .dots {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: start;
  justify-content: flex-start;
}
.code-window .dots div {
  margin-right: 0.5rem;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: #e9ecef;
}
.code-window .dots div.red {
  background-color: #ff1744;
}
.code-window .dots div.orange {
  background-color: #f6c343;
}
.code-window .dots div.green {
  background-color: #5cc72a;
}

/**
 * okaidia theme for JavaScript, CSS and HTML
 * Loosely based on Monokai textmate theme by http://www.monokai.nl/
 * @author ocodia
 */

/* Code blocks */

/* Inline code */
</style>
