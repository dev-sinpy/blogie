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
        icon="fas fa-user-plus"
        :done="step > 1">
      <q-card>
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
            
            <div class="q-mb-lg">
            <q-btn @click="register('twitter')" icon="fab fa-twitter" color="blue" label="Continue with Twitter" />
            </div>
            
          </div>
              
          <q-btn label="Choose Tags" color="blue" @click="icon = true" />
              
          <q-dialog v-model="icon">
            <q-card class="bg-black">
              <q-card-section class="row items-center q-pb-none">
                <q-space />
                <q-btn icon="close" v-close-popup />
              </q-card-section>

              <q-card-section>
                <div class="q-mb-md text-weight-medium text-center">Select you interests</div>
                <div v-for="tag in tags" :key=tag.index class="q-ma-sm" style="display: inline;">
              <span class="q-gutter-md">
                <q-btn color="blue" :outline=true :label=tag rounded />
                </span>
              </div>
              </q-card-section>
              
              <q-card-section class="row items-center q-ma-lg">
                <q-btn class="full-width" color="blue" label="submit"  />
              </q-card-section>
              
            </q-card>
          </q-dialog>
              
              
        </div>
        </q-card-section>
        </q-card>
    
      </q-step>

      <q-step
        :name="2"
        title="Preferences"
        icon="fas fa-cog"
      >
      
      <q-card>
        <q-card-section q-pa-md>
        <div class="q-pa-sm">
          <div class="text-h6 text-primary">Choose Preferences</div>
          <div class="q-pt-sm">Don't worry you can also change these settings later</div>
          
          <div v-if="status == 'loaded'" class="q-mt-md">
            
              <div v-for="tags in getDefaultTags" :key=tags.tag class="q-ma-sm" style="display: inline;">
                
                <span class="q-gutter-md">
                <q-btn @click="selectTags(tags.tag)" color="green" :label=tags.tag :outline=!tags.enabled rounded />
                </span>
              </div>
            </div>
          
          <div class="row justify-end">
            <q-btn @click="redirect" label="Finish" color="blue"/>
          </div>
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
import { mapGetters } from 'vuex'
import firebase from 'firebase'
import { AUTH } from '../plugins/firebase'
export default {
  // name: 'PageName',
  
  computed: {
    ...mapGetters('articles', ['getDefaultTags']),
    ...mapGetters('articles', ['status'])
  },
  data () {
    return {
      step: 1,
      blocked: true,
      email: null,
      password: null,
      selectedTags: [],
      error: null,
      icon: false,
      f: 'dark',
      tags: ['android', 'android', 'android', 'android', 'android', 'android', 'android', 'android', 'android', ]
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
        } else if (val == 'github') {
          provider = new firebase.auth.GithubAuthProvider();
        } else {
          provider = new firebase.auth.TwitterAuthProvider();
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
      
    }
  }
}
</script>
<style lang="css">
  
.tags {
  display: flex;
}
  </style>
