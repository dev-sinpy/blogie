<template>
  <q-page-container>
  <q-page padding>

    <q-card style="height: 100vh">
      <q-banner v-if="error" inline-actions class="text-white bg-negative">
        {{error}}
      </q-banner>
      <q-card-section q-pa-md>
      <div class="q-pa-sm">
        <div class="text-h6 text-primary">Signup</div>
        <div style="width: 50%; margin: auto;">
          <div class="q-mb-lg">
          <q-btn @click="register('google')" icon="fab fa-google" label="Continue with Google" />
          </div>
          
          <div class="q-mb-lg">
          <q-btn @click="register('github')" icon="fab fa-github" color="black" label="Continue with Github" />
          </div>
          
        </div>
            
      </div>
      </q-card-section>
      </q-card>
      
  </q-page>
  </q-page-container>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import firebase from 'firebase'
import { AUTH } from '../plugins/firebase'
import axios from 'axios'

export default {
  // name: 'PageName',
  
  computed: {
    ...mapGetters('articles', ['getDefaultTags']),
    ...mapGetters('articles', ['user']),
    ...mapGetters('articles', ['status'])
  },
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    store.dispatch('articles/fetchDefaultTags')
  },
  
  data () {
    return {
      step: 1,
      blocked: true,
      email: null,
      password: null,
      selectedTags: this.$store.getters['articles/getEnabledTags'],
      error: null,
    }
  },
  
  methods: {
    redirect: function() {
      this.$router.push('/');
    },

    register: async function (val) {
      //try {
        let provider;
        if (val == 'google') {
          provider = new firebase.auth.GoogleAuthProvider();
        } else {
          provider = new firebase.auth.GithubAuthProvider();
        }
        
        AUTH.signInWithPopup(provider).then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          
          console.log(user)
          this.$store.dispatch('articles/fetchUser', user)
          fetch('https://blogie.now.sh/api/setuser/?email='+user.email, {method: 'POST'})
          .then((response) => {
            return response
            })
          .then(data => console.log('success'));
          this.$store.dispatch('articles/fetchDefaultTags')
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
    
    selectTags(tag) {
      let found = this.selectedTags.find(val => val == tag)
      console.log(found)
      if (!found) {
        this.selectedTags.push(tag);
        this.getDefaultTags.forEach((val => {
          if (val.tag == tag) {
            val.enabled = true
          }
        }))
      } else {
        this.selectedTags.forEach((val, index) => {
          if (val == tag) {
            this.selectedTags.splice(index, 1)
          }
        })
        
        this.getDefaultTags.forEach((val => {
          if (val.tag == tag) {
            val.enabled = false;
          }
        }))
      }
    },
    
    submitInterests: async function() {
      let tags = this.selectedTags.join();
      let email = this.$store.getters['articles/user'];
      await axios.post(`https://blogie.now.sh/api/setuser/?email=${email}&tags=${tags}`)
      window.location.href = '/dashboard/?tutorial=true'
    },
  }
}
</script>
<style lang="css">
  
  </style>
