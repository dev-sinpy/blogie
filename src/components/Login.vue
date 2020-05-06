<template>
  <q-card>
    <q-banner v-if="errors" v-model="errors" inline-actions class="text-white bg-red">
      {{error}}
      <template v-slot:action>
        <q-btn flat color="white" label="Invalid details" />
      </template>
    </q-banner>
  <q-card-section q-pa-md>

      <div class="q-pa-sm">
        <div class="text-h6 text-primary">Login with email</div>
        <q-form
        @submit="onSubmit"
        class="q-gutter-md q-pt-lg"
      >
        <q-input
          type="email"
          v-model="email"
          label="Email"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Email not registered']"
        />

          <q-input
            type="password"
            v-model="password"
            label="Password"
            lazy-rules
            :rules="[ val => val.length > 6 || 'Incorrect password please try again']"
          />
          <div class="row justify-end">
            <q-btn label="Submit" type="submit" color="primary"/>
          </div>
        </q-form>
        </div>
          
    </q-card-section>
    </q-card>
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
      errors: ''
    }
  },
  
  methods: {
    onSubmit() {
      console.log(this.errors)
      console.log(this.email)
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        this.errors += errorMessage;
      });
    }
  }
}
</script>
