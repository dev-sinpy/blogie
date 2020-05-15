<template>
  <q-dialog v-model="register">
    <q-card style="height: 230px; width: 400px;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-black">Register</div>
        <q-space />
        <q-btn flat dense @click="closePopup" icon="close" v-close-popup />
      </q-card-section>
      <q-banner v-if="error" class="text-white bg-negative">
        {{error}}
      </q-banner>
      
      <q-card-section v-if="status == 'loading'" class="q-pa-lg absolute-center">
        <q-spinner-puff color="deep-orange" size="50px" />
      </q-card-section>
      
      <q-card-section v-else class="q-pa-lg text-center">
        <div>
          <q-btn @click="signup('google')" icon="fab fa-google" label="Continue with Google" />
        </div>
          
          <div id="or">OR</div>
          
        <div>
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
    
    signup: async function (val) {
      this.$store.commit('articles/SET_STATUS', 'loading')
      
      try {
        let provider;
        if (val == 'google') {
          provider = new firebase.auth.GoogleAuthProvider();
        } else {
          provider = new firebase.auth.GithubAuthProvider();
        }
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
      } finally {
        this.$store.commit('articles/SET_STATUS', 'loaded')
      }
    },
  }
}

</script>

<style lang="css">
#or {
  position: relative;
  width: 300px;
  height: 40px;
  
  line-height: 50px;
  text-align: center;
}

#or::before,
#or::after {
  position: absolute;
  width: 130px;
  height: 1px;
  
  top: 24px;
  
  background-color: #aaa;
  
  content: '';
}

#or::before {
  left: 0;
}

#or::after {
  right: 0;
}
</style>
