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
          this.$auth
            .signOut()
            .then(() => {
              this.success = "Logged out successfully";
              this.$store.dispatch("main/fetchUser");
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

<style lang="css">
@import url("https://fonts.googleapis.com/css2?family=Righteous&display=swap");

.logo-text {
  font-family: "Righteous", cursive;
}

/*--------------------------------------------------------------
# Buttons
--------------------------------------------------------------*/
.button {
  display: inline-flex;
  font-size: 13px;
  letter-spacing: 0px;
  font-weight: 700;
  line-height: 16px;
  text-transform: uppercase;
  text-decoration: none !important;
  background-color: #ffffff;
  color: #4992f0 !important;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  justify-content: center;
  padding: 16px 32px;
  height: 48px;
  text-align: center;
  white-space: nowrap;
}
.button:active {
  outline: 0;
}
.button::before {
  border-radius: 2px;
}

.button-shadow {
  position: relative;
}
.button-shadow::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: 0 8px 24px rgba(32, 43, 54, 0.12);
  mix-blend-mode: multiply;
  transition: box-shadow 0.15s ease;
}
.button-shadow:hover::before {
  box-shadow: 0 8px 24px rgba(32, 43, 54, 0.25);
}

.button-sm {
  padding: 8px 24px;
  height: 32px;
}
.button-sm.button-shadow::before {
  box-shadow: 0 4px 16px rgba(32, 43, 54, 0.12);
}
.button-sm.button-shadow:hover::before {
  box-shadow: 0 4px 16px rgba(32, 43, 54, 0.25);
}

.button-primary {
  color: #fff !important;
  transition: background 0.15s ease;
}

.button-primary {
  background: #2e83ef;
  background: linear-gradient(65deg, #1274ed 0, #4992f0 100%);
}
.button-primary:hover {
  background: #3386ef;
  background: linear-gradient(65deg, #1777ed 0, #4e95f0 100%);
}

.button-block {
  display: flex;
}

/*--------------------------------------------------------------
# Header
--------------------------------------------------------------*/
.site-header {
  position: relative;
  padding: 24px 0;
}
.site-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 16%;
  width: 84%;
  height: 500px;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ4MCIgaGVpZ2h0PSI2NTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+ICAgIDxwYXRoIGQ9Ik03MzEuMjA3IDY0OS44MDJDOTM1LjQ4NCA2NDIuMTQgMTQ4MCAzMzcuMzI1IDE0ODAgMTgwLjg4OGMwLTE1Ni40MzgtMzA5Ljc0NC0zNi4wNTUtNzIwLTM2LjA1NVMwLTE3NC40ODMgMCAxMzUuMTQ0YzAgMzA5LjYyNyA1MjYuOTMgNTIyLjMyIDczMS4yMDcgNTE0LjY1OHoiIGZpbGw9IiNGNkY4RkEiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==);
  background-size: 1140px 500px;
  background-repeat: no-repeat;
}

.site-header-inner {
  position: relative;
  /* To display all elements above the background color */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-links {
  display: inline-flex;
}
.header-links li {
  display: inline-flex;
}
.header-links a:not(.button) {
  font-size: 13px;
  line-height: 18px;
  letter-spacing: 0px;
  font-weight: 700;
  color: #5b6f82;
  text-transform: uppercase;
  text-decoration: none;
  line-height: 16px;
  padding: 8px 24px;
}
.header-links a:not(.button):hover,
.header-links a:not(.button):active {
  color: #202b36;
}

@media (min-width: 641px) {
  .site-header {
    position: relative;
    padding: 24px 0;
  }
  .site-header::before {
    top: -50%;
    left: 20%;
    width: 80%;
    height: 651px;
    background-size: 1480px 651px;
  }
}

/*--------------------------------------------------------------
# Footer
--------------------------------------------------------------*/
.site-footer {
  position: relative;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0px;
}
.site-footer::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 259px;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSIyMTciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPiAgPGRlZnM+ICAgIDxwYXRoIGQ9Ik0yNjEuNyAyODYuNjgyYzQyMS40NzcgMCAxNDg4Ljk3NyAxNzYuMDc4IDE0ODguOTc3IDM5LjIzNHM0NzguNzU0LTI0OC4wNDMgNTcuMjc4LTI0OC4wNDNjLTE5OC43NDYgMC00NjguNTY2IDMuNTU1LTcxOS45NTctMTEuMjNDODA2LjI3MSA1MC4wNzYgNTQxLjkgMjcuMjI3IDM0NC45NzcgNTIuNDM4LTI3LjY2NSAxMDAuMTQ1LTE1OS43NzYgMjg2LjY4MyAyNjEuNyAyODYuNjgzeiIgaWQ9ImEiLz4gIDwvZGVmcz4gIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yODUgLTQxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgPG1hc2sgaWQ9ImIiIGZpbGw9IiNmZmYiPiAgICAgIDx1c2UgeGxpbms6aHJlZj0iI2EiLz4gICAgPC9tYXNrPiAgICA8dXNlIGZpbGw9IiM4MzhERUEiIHhsaW5rOmhyZWY9IiNhIi8+ICAgIDxwYXRoIGQ9Ik0yNDAuNzI3IDMyNi4zOTVjNDIxLjQ3NiAwIDk3Mi43NDQgMTc5Ljc4NyA5NzIuNzQ0IDQyLjk0M3MxMjkuMjg2LTE3NS43NDgtMjkyLjE5LTE3NS43NDgtMjU2LjMxNC0yMjYuNDk0LTI1Ni4zMTQtODkuNjVjMCAxMzYuODQzLTg0NS43MTcgMjIyLjQ1NS00MjQuMjQgMjIyLjQ1NXoiIGZpbGw9IiNBMEE2RUUiIG1hc2s9InVybCgjYikiIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMCAxIDEzNTUuMTYyIDApIi8+ICAgIDxwYXRoIGQ9Ik00NDUuNyAzODcuNjgyYzQyMS40NzcgMCA5NzIuNzQ1IDE3OS43ODcgOTcyLjc0NSA0Mi45NDNzNTc5Ljk0MS0yNTUuMjQ2IDE1OC40NjUtMjU1LjI0Ni03MDYuOTY5LTE0Ni45OTYtNzA2Ljk2OS0xMC4xNTJjMCAxMzYuODQzLTg0NS43MTcgMjIyLjQ1NS00MjQuMjQgMjIyLjQ1NXoiIGZpbGw9IiM2MjZDRDUiIG1hc2s9InVybCgjYikiLz4gIDwvZz48L3N2Zz4=);
  background-size: 1440px 259px;
  background-repeat: no-repeat;
}
.site-footer a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
}

.site-footer-inner {
  position: relative;
  /* To display all elements above the background color */
  display: flex;
  flex-wrap: wrap;
  padding-top: 40px;
  padding-bottom: 40px;
}

.footer-brand,
.footer-links,
.footer-social-links,
.footer-copyright {
  flex: none;
  width: 100%;
  display: inline-flex;
  justify-content: center;
}

.footer-brand,
.footer-links,
.footer-social-links {
  margin-bottom: 24px;
}

.footer-links li + li,
.footer-social-links li + li {
  margin-left: 16px;
}

.footer-social-links li {
  display: inline-flex;
}
.footer-social-links li a {
  padding: 8px;
}

@media (min-width: 641px) {
  .site-footer::before {
    height: 202px;
  }

  .site-footer-inner {
    justify-content: space-between;
  }

  .footer-brand,
  .footer-links,
  .footer-social-links,
  .footer-copyright {
    flex: 50%;
  }

  .footer-brand,
  .footer-copyright {
    justify-content: flex-start;
  }

  .footer-links,
  .footer-social-links {
    justify-content: flex-end;
  }
}
</style>
