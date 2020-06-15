<template>
  <q-dialog v-model="login">
    <q-card style="height: 230px; width: 400px;">
      <q-card-section class="row items-center q-pb-none">
        <div class="q-pl-sm text-h6 text-bold">Login</div>
        <q-space />
        <q-btn flat dense @click="closePopup" icon="close" />
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
            @click="signin('google')"
            icon="fab fa-google"
            label="Login with Google"
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
            @click="signin('github')"
            icon="fab fa-github"
            color="black"
            label="Login with Github"
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
  // name: 'ComponentName',
  computed: {
    ...mapGetters("main", ["status"]),
    ...mapGetters("main", ["login"]),
    ...mapGetters("main", ["getUserSettings"]),
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
        popup: "loginPopup",
        flag: false,
      });
    },
    signin: async function(val) {
      this.loading = true;
      try {
        let provider;
        if (val == "google") {
          provider = new firebase.auth.GoogleAuthProvider();
        } else {
          provider = new firebase.auth.GithubAuthProvider();
        }
        let result = await this.$auth.signInWithPopup(provider);

        // The signed-in user info.
        let user = result.user;
        let response = await this.$api.get(`user/${user.email}`);
        this.$store.dispatch("main/fetchUser", user);
        let userSettings = this.$q.localStorage.getItem("userSettings");

        if (!userSettings) {
          this.$q.localStorage.set("userSettings", this.getUserSettings);
        }
        window.location.href = "/dashboard";
      } catch (err) {
        console.log(err);
        if (err.hasOwnProperty("response")) {
          this.error = "Your account is not registered, please sign up first";
          await this.$auth.signOut();
        } else {
          this.error = err;
          await this.$auth.signOut();
        }
        // this.error = "Unknown error occured, please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="css" scoped>
#or {
  position: relative;
  width: 300px;
  height: 40px;

  line-height: 50px;
  text-align: center;
}

#or::before,
#or::after {
  position: absolute;
  width: 130px;
  height: 1px;

  top: 24px;
  background-color: #aaa;

  content: "";
}

#or::before {
  left: 0;
}

#or::after {
  right: 0;
}
</style>
