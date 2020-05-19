<template>
  <q-dialog v-model="login">
    <q-card style="height: 230px; width: 400px;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-black">Login</div>
        <q-space />
        <q-btn flat dense @click="closePopup" icon="close" />
      </q-card-section>
      <q-banner v-if="error" class="text-white bg-negative">
        {{ error }}
      </q-banner>

      <q-card-section
        v-if="status == 'loading'"
        class="q-pa-lg absolute-center"
      >
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

        <div id="or">OR</div>

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
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  // name: 'ComponentName',
  computed: {
    ...mapGetters("articles", ["status"]),
    ...mapGetters("articles", ["login"]),
  },
  data() {
    return {
      error: "",
    };
  },
  methods: {
    closePopup() {
      this.$store.commit("articles/SET_POPUP", {
        popup: "loginPopup",
        flag: false,
      });
    },
    signin: async function (val) {
      this.$store.commit("articles/SET_STATUS", "loading");
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
        let response = await this.$api.get(
          `user/?email=${user.email}`,
          { validateStatus: false }
        );
        if (response.data.status != "ok") {
          this.error = "Your account is not registered, please sign up first";
          await user.delete();
        } else {
          this.$store.dispatch("articles/fetchUser", user);
          window.location.href = "/dashboard";
        }
      } catch (error) {
        this.error = "Unknown error occured";
      } finally {
        this.$store.commit("articles/SET_STATUS", "loaded");
      }
    },
  },
};
</script>

<style lang="css">
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
