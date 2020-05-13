<template>
  <q-dialog v-model="register">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn flat dense @click="closePopup" icon="close" v-close-popup />
      </q-card-section>
      <q-banner v-if="error" class="text-white bg-negative">
        {{error}}
      </q-banner>
      <q-card-section>
        <div class="q-mb-lg">
          <q-btn @click="signup('google')" icon="fab fa-google" label="Continue with Google" />
        </div>
          
        <div class="q-mb-lg">
          <q-btn @click="signup('github')" icon="fab fa-github" color="black" label="Continue with Github" />
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
  //name: 'Register',
  computed: {
    ...mapGetters('articles', ['register']),
    ...mapGetters('articles', ['status'])
  },
  
  data () {
    return {
      error: '',
    }
  },
  
  methods: {
    closePopup() {
      this.$store.commit('articles/SET_POPUP', {popup: 'registerPopup', flag: false})
    },
    
    redirect: function() {
      this.$router.push('/');
    },
    
    signup: async function (val) {
      //try {
        let provider;
        if (val == 'google') {
          provider = new firebase.auth.GoogleAuthProvider();
        } else {
          provider = new firebase.auth.GithubAuthProvider();
        }
        try {
          let result = await AUTH.signInWithPopup(provider)
          let user = result.user
            
          let response = await axios.get(`https://blogie.now.sh/api/setuser/?email=${user.email}`, { validateStatus: false })
          if (response.data.status != 'ok') {
            this.error = response.data.message;
            await AUTH.signOut()
          } else {
            this.$store.dispatch('articles/fetchUser', user)
            this.$store.dispatch('articles/fetchDefaultTags')
            window.location.href = '/dashboard/?tutorial=true';
          }
        } catch(err) {
          this.error = err;
          await AUTH.signOut()
        }
    },
  }
}

</script>
