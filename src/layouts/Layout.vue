<template>
  <q-layout>

    <q-header reveal class="bg-primary text-white">
      <q-toolbar>

        <q-toolbar-title>
          <q-avatar>
            <img src="https://images.squarespace-cdn.com/content/v1/5d00e59cf3f45f000162fad9/1562184215451-X3J758ZQL2C4LGSXKL6G/ke17ZwdGBToddI8pDm48kCEA1nBJzP4FOBvoBELJrQlZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVFZY8DXNV7-oU5O43wWp7txWipamTyyf6T6SNuHokS9tSb8BodarTVrzIWCp72ioWw/placeholder-logo-2.png?format=750w">
          </q-avatar>
        </q-toolbar-title>
        
        <div class="desktop-hide">
          <q-fab flat 
            label="Menu"
            vertical-actions-align="left"
            color="white"
            icon="none"
            direction="down"
            
          >
            <q-fab-action to="/" color="primary" label="Home" />
            
            <q-fab-action v-if="!isAuthenticated" to="/register" color="primary" label="Signup" />
            
            <q-fab-action v-if="!isAuthenticated" to="/login" color="primary" label="Login" />
            
            <q-fab-action v-if="isAuthenticated" @click="toDashboard" color="primary" label="Dashboard" />
            
            <q-fab-action color="primary" label="Github" />
            
            <q-fab-action v-if="isAuthenticated" @click="logout" color="primary" label="Logout" />
            
          </q-fab>
        </div>
        <div class="mobile-hide row justify-around">
          <q-btn flat v-if="isAuthenticated" to="/dashboard" color="blue" label="Dashboard"/>
          <q-btn flat v-if="!isAuthenticated" to="/register" color="blue" label="signup"/>
          <q-btn flat v-if="!isAuthenticated" to="/login" color="blue" label="login"/>
          <q-btn flat v-if="isAuthenticated" @click="logout" color="blue" label="logout"/>
        </div>

      </q-toolbar>
    </q-header>
    <router-view />
  </q-layout>
  
</template>

<script>
  import { mapGetters } from 'vuex'
  import { AUTH } from '../plugins/firebase'

export default {
  
  name: 'Layout',
  
  components: {
  },
  
  created() {
    this.$q.dark.set(true)
  },
    
  methods: {
    toDashboard() {
      window.location.href = '/dashboard'
    },
    
    logout () {
      
      this.$q.dialog({
        title: 'Logout',
        message: 'Are you sure you want to logout?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        //
      }).onOk(() => {
        AUTH.signOut().then(() => {
          this.success = 'Logged out successfully'
          this.$store.dispatch('articles/fetchUser')
          window.location.href = '/'
          }).catch((error) => {
            this.error = 'Unknown error occured.';
          });
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
  },
  
  computed: {
    ...mapGetters('articles', ['isAuthenticated'])
  },
  data() {
    
    return {
      success: null,
      error: null,
    }
  }
}
</script>
