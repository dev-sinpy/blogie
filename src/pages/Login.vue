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
            <q-btn @click="oauthGoogle" icon="ion-logo-google" label="Continue with Google" />
            </div>
            
            <div class="q-mb-lg">
            <q-btn @click="oauthGithub" icon="ion-logo-github" color="black" label="Continue with Github" />
            </div>
            
            <div class="q-mb-lg">
            <q-btn @click="oauthTwitter" icon="ion-logo-twitter" color="blue" label="Continue with Twitter" />
            </div>
            
          </div>
        </div>

      <div class="q-pa-sm desktop-hide">
        <div class="q-mb-lg text-h6 text-primary text-center">Login</div>
          <div style="width: 70%; margin: auto;">
            <div class="q-mb-lg">
            <q-btn @click="oauthGoogle" icon="ion-logo-google" label="Continue with Google" />
            </div>
            
            <div class="q-mb-lg">
            <q-btn @click="oauthGithub" icon="ion-logo-github" color="black" label="Continue with Github" />
            </div>
            
            <div class="q-mb-lg">
            <q-btn @click="oauthTwitter" icon="ion-logo-twitter" color="blue" label="Continue with Twitter" />
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
    
    oauthGoogle: async function () {
      //try {
        let provider = new firebase.auth.GoogleAuthProvider();
        AUTH.signInWithPopup(provider).then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log(user)
          this.$store.dispatch('articles/fetchUser', user)
          window.location.href = '/dashboard';
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage)
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          this.error = 'Unknown error occured';
        });
    },
    oauthGithub: async function () {
      //try {
        let provider = new firebase.auth.GithubAuthProvider();
        AUTH.signInWithPopup(provider).then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          this.$store.dispatch('articles/fetchUser', user)
          window.location.href = '/dashboard';
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage)
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          this.error = 'Unknown error occured';
        });
    },
    oauthTwitter: async function () {
      //try {
        let provider = new firebase.auth.TwitterAuthProvider();
        AUTH.signInWithPopup(provider).then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          console.log(user)
          this.$store.dispatch('articles/fetchUser', user)
          window.location.href = '/dashboard';
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage)
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          this.error = 'Unknown error occured';
        });
      },
  }
}
</script>
