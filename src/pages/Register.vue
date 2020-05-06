<template>
  <q-page-container>
  <q-page padding>
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="Registration"
        icon="mail"
        :done="step > 1"
      >
      <q-card>
        <q-banner v-if="error" inline-actions class="text-white bg-negative">
          {{error}}
        </q-banner>
        <q-card-section q-pa-md>
        <div class="q-pa-sm">
          <div class="text-h6 text-primary">Signup with email</div>
          <q-form
          @submit="onSubmit"
          class="q-gutter-md q-pt-lg"
        >
          <q-input
            type="email"
            v-model="email"
            label="Email"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please enter valid email']"
          />

          <q-input
            type="password"
            v-model="password"
            label="Password"
            lazy-rules
            :rules="[ val => val.length > 6 || 'Your password is too short']"
          />
          <div class="row justify-end">
            <q-btn label="Submit" type="submit" color="primary"/>
          </div>
        </q-form>
        </div>
        </q-card-section>
        </q-card>
    
      </q-step>

      <q-step
        :name="2"
        title="Verification"
        icon="verification"
        :done="step > 2"
      >
      <q-banner v-if="error" inline-actions class="text-white bg-negative">
          {{error}}
        </q-banner>
          <q-img src="statics/signed_up.png" :ratio="16/5" />
          <div class="q-pa-md text-h4 text-center text-bold">
            Welcome Aboard!
            </div>
          <q-separator />
          <div class="q-pa-md text-h6 text-center">
            We've sent you a confirmation email.
          </div>
          <q-separator />
          <div class="q-pb-md">
            To help reduce spam we need to verify your email address.
          </div>
          <div>
            Please follow the instructions given in the email and then come back to continue registration process.
          </div>
          <q-btn label="resend email" color="primary" @click="resendEmail" />
      </q-step>

      <q-step
        :name="3"
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
            <q-btn @click="redirect" label="Finish" color="primary"/>
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
      email: null,
      password: null,
      error: null
    }
  },
  
  methods: {
    redirect: function() {
      this.$router.push('/');
    },
    
    resendEmail: function() {
      let user = AUTH.currentUser;
      if (user.emailVerified == false) {
        user.sendEmailVerification().then(function() {
        }).catch(function(error) {
          this.error = 'An error occured while sending email please try again later.';
          console.log('error occured while sending email.');
        });
      } else {
        this.error = 'Email is already verified, please continue with registration process'
      }
    },
    onSubmit: async function () {
      try {
        const user = await AUTH.createUserWithEmailAndPassword(this.email, this.password);
        
        const currentUser = AUTH.currentUser
        currentUser.sendEmailVerification().then(function() {
        }).catch(function(error) {
          this.error = 'Unknown error occured, please try again later';
          console.log('error occured while sending email.');
        });
        this.$store.dispatch('articles/fetchUser', currentUser)
        
        fetch('https://blogie-api.web.app/api/v1/setuser/'+currentUser.email)
        .then((response) => {
          return response.json()
          })
        .then(data => console.log('success'));
        
        this.step = 2;
      } catch (error) {
        this.error = 'A user with this email already exists';
        this.step = 1;
      }
    }
    },
  }
</script>
