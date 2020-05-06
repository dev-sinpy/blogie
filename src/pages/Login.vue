<template>
  <q-page-container>
  <q-page padding>
    <q-card>
    <q-banner v-if="error" inline-actions class="text-white bg-negative">
      {{error}}
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
    onSubmit: async function () {
      try {
        const user = await AUTH.signInWithEmailAndPassword(this.email, this.password);
        this.$store.dispatch('articles/fetchUser', user.user)
        window.location.href = '/dashboard'
      } catch(error) {
        // Handle Errors here.
        this.error = 'Incorrect email or password';
        console.log(error)
      }
    }
  }
}
</script>
