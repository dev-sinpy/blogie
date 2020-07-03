<template>
  <q-dialog v-model="register">
    <q-card style="height: 230px; width: 400px;">
      <q-card-section class="row items-center q-pb-none">
        <div class="q-pl-sm text-h6 text-bold">
          Register
        </div>
        <q-space />
        <q-btn flat dense @click="closePopup" icon="close" v-close-popup />
      </q-card-section>
      <q-banner v-if="error" class="text-white bg-negative">
        {{ error }}
      </q-banner>

      <q-card-section v-if="loading" class="q-pa-lg absolute-center">
        <q-spinner-puff color="deep-orange" size="50px" />
      </q-card-section>

      <q-card-section v-else class="q-pa-lg text-center">
        <div>
          <q-btn
            @click="signup('google')"
            icon="fab fa-google"
            label="Continue with Google"
          />
        </div>

        <div
          id="or"
          :style="{ marginLeft: $q.platform.is.desktop ? '20px' : '0px' }"
        >
          OR
        </div>

        <div>
          <q-btn
            @click="signup('github')"
            icon="fab fa-github"
            color="black"
            label="Continue with Github"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import firebase from "firebase/app";
import { mapGetters } from "vuex";

export default {
  //name: 'Register',
  computed: {
    ...mapGetters("main", ["register"]),
    ...mapGetters("main", ["getUserSettings"]),
    ...mapGetters("main", ["status"]),
  },

  data() {
    return {
      loading: false,
      error: "",
    };
  },

  methods: {
    closePopup() {
      this.loading = false;
      this.error = "";
      this.$store.commit("main/SET_POPUP", {
        popup: "registerPopup",
        flag: false,
      });
    },

    signup: async function(val) {
      this.error = "";
      this.loading = true;

      try {
        let provider;
        if (val == "google") {
          provider = new firebase.auth.GoogleAuthProvider();
        } else {
          provider = new firebase.auth.GithubAuthProvider();
        }
        let result = await this.$auth.signInWithPopup(provider);
        let user = result.user;

        let response = await this.$api.post(`setuser/${user.email}`, {
          validateStatus: false,
        });
        this.$store.dispatch("main/fetchUser", user);
        this.$q.localStorage.set("savedData", []);
        this.$q.localStorage.set("userSettings", this.getUserSettings);
        window.location.href = "/dashboard/?tutorial=true";
      } catch (err) {
        if (err.hasOwnProperty("response")) {
          this.error = err.response.data.detail;
          await this.$auth.signOut();
        } else {
          this.error = "Unknown error occured, please try again.";
          await this.$auth.signOut();
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="css" scoped></style>
