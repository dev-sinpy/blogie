<template>
  <q-page-container>
  <q-page padding>
    <q-card>
    <q-banner v-if="error" inline-actions class="text-white bg-negative">
      {{error}}
    </q-banner>
  <q-card-section q-pa-md>

      <div class="q-pa-sm mobile-hide">
        <div class="text-h6 text-primary">Login</div>
          <div style="width: 30%; margin: auto;">
            <div class="q-mb-lg">
            <q-btn @click="login('google')" icon="fab fa-google" label="Continue with Google" />
            </div>
            
            <div class="q-mb-lg">
            <q-btn @click="login('github')" icon="fab fa-github" color="black" label="Continue with Github" />
            </div>
            
          </div>
        </div>

      <div class="q-pa-sm desktop-hide">
        <div class="q-mb-lg text-h6 text-primary text-center">Login</div>
          <div style="width: 70%; margin: auto;">
            <div class="q-mb-lg">
            <q-btn @click="login('google')" icon="fab fa-google" label="Continue with Google" />
            </div>
            
            <div class="q-mb-lg">
            <q-btn @click="login('github')" icon="fab fa-github" color="black" label="Continue with Github" />
            </div>
            
          </div>
        </div>
          
    </q-card-section>
    </q-card>
  </q-page>
  </q-page-container>
</template>

<script>
  import firebase from 'firebase'
  import axios from 'axios'
  import { AUTH } from '../plugins/firebase'
export default {
  // name: 'ComponentName',
  data() {
    return {
      email: null,
      password: null,
      error: null,
    }
  },
  
  methods: {
    
    login: async function (val) {
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
