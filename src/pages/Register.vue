<template>
  <q-page-container>
  <q-page padding>
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated>
      
      <q-step
        :name="1"
        title="Registration"
        icon="mail"
        :done="step > 1">
      <q-card>
        <q-banner v-if="error" inline-actions class="text-white bg-negative">
          {{error}}
        </q-banner>
        <q-card-section q-pa-md>
        <div class="q-pa-sm">
          <div class="text-h6 text-primary">Signup with email</div>
          <div style="width: 50%; margin: auto;">
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
    
      </q-step>

      <q-step
        :name="2"
        title="Preferences"
        icon="settings"
      >
      
      <q-card>
        <q-card-section q-pa-md>
        <div class="q-pa-sm">
          <div class="text-h6 text-primary">Choose Preferences</div>
          <div class="q-pt-sm">Don't worry you can also change these settings later</div>
          <tags 
          class="q-pt-md"
          v-for="tag in tags" 
          :key="tag.tag"
          v-bind:tag="tag" />
          
          <q-form
          @submit="onSubmit"
          class="q-gutter-md q-pt-lg"
        >
          
          <div class="row justify-end">
            <q-btn @click="redirect" label="Finish" color="blue"/>
          </div>
        </q-form>
        </div>
        </q-card-section>
        </q-card>
      
      </q-step>
      
      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 3 ? 'Skip' : 'Continue'" />
        </q-stepper-navigation>
      </template>
    </q-stepper>
      
  </q-page>
  </q-page-container>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase'
import { AUTH } from '../plugins/firebase'
export default {
  // name: 'PageName',
  components: {
    'tags': require('components/Tags.vue').default,
  },
  
  computed: {
    ...mapState('articles', ['tags']),
  },
  data () {
    return {
      step: 1,
      blocked: true,
      email: null,
      password: null,
      error: null
    }
  },
  
  methods: {
    redirect: function() {
      this.$router.push('/');
    },

    oauthGoogle: async function () {
      //try {
        let provider = new firebase.auth.GoogleAuthProvider();
        AUTH.signInWithPopup(provider).then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          
          console.log(user)
          this.$store.dispatch('articles/fetchUser', user)
          fetch('https://blogie.now.sh/api/setuser/?email='+user.email)
          .then((response) => {
            return response.json()
            })
          .then(data => console.log('success'));
          
          this.step = 2;
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          this.error = 'Unknown error occured, please try again later';
          this.step = 1;
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
          // ...
          console.log(user)
          this.$store.dispatch('articles/fetchUser', user)
          fetch('https://blogie.now.sh/api/setuser/?email='+user.email)
          .then((response) => {
            return response.json()
            })
          .then(data => console.log('success'));
          
          this.step = 2;
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage)
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          this.error = 'Unknown error occured, please try again later';
          this.step = 1;
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
          fetch('https://blogie.now.sh/api/setuser/?email='+user.email)
          .then((response) => {
            return response.json()
            })
          .then(data => console.log('success'));
          
          this.step = 2;
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage)
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          this.error = 'Unknown error occured, please try again later';
          this.step = 1;
        });
    },
  }
}
</script>
