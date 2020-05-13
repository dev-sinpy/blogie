<template>
  <q-dialog v-model="login">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn flat dense @click="closePopup" icon="close" />
      </q-card-section>
      
      <q-card-section>
        <div class="q-mb-lg">
          <q-btn @click="signin('google')" icon="fab fa-google" label="Continue with Google" />
        </div>
          
        <div class="q-mb-lg">
          <q-btn @click="signin('github')" icon="fab fa-github" color="black" label="Continue with Github" />
        </div>
      </q-card-section>
      
    </q-card>
  </q-dialog>
</template>

<script>
  import firebase from 'firebase'
  import axios from 'axios'
  import { AUTH } from '../plugins/firebase'
  import { mapGetters } from 'vuex'
export default {
  // name: 'ComponentName',
  computed: {
    ...mapGetters('articles', ['login'])
  },
  data() {
    return {
      errors: ''
    }
  },
  methods: {
    closePopup() {
      this.$store.commit('articles/SET_POPUP', {popup: 'loginPopup', flag: false})
    },
    signin: async function (val) {
      try {
        let provider = new firebase.auth.GoogleAuthProvider();
        if (val == 'google') {
          provider = new firebase.auth.GoogleAuthProvider();
        } else {
          provider = new firebase.auth.GithubAuthProvider();
        }
        let result = await AUTH.signInWithPopup(provider)

        // The signed-in user info.
        let user = result.user;
        let response = await axios.get(`https://blogie.now.sh/api/user/?email=${user.email}`, { validateStatus: false })
        if (response.data.status != 'ok') {
          this.error = 'Your account is not registered, please sign up first';
          await user.delete()
        } else {
          this.$store.dispatch('articles/fetchUser', user)
          window.location.href = '/dashboard';
        }
      } catch(error) {
        this.error = 'Unknown error occured';
      }
    }
  }
}
</script>
