<template>
  <q-page-container>
    <q-page padding>
      <q-banner v-if="success" inline-actions class="text-white bg-positive">
      {{success}}
    </q-banner>
    
    <q-banner v-if="error" inline-actions class="text-white bg-negative">
      {{error}}
    </q-banner>
    <q-card class="doc-container">
      <q-card-section class="column items-center q-pa-lg">
        <div class="text-h3">
          Logged in? {{isAuthenticated}}
          </div>
        <div class="text-h3">
          Logged in as {{user}}
          </div>
        <q-btn class="flex-break" v-if="isAuthenticated" to="/dashboard" label="dashboard" color="primary"/>
        
        <q-btn v-if="!isAuthenticated" to="/login" label="login" color="primary"/>
        
        <q-btn v-if="!isAuthenticated" to="/register" label="register" color="primary"/>
        
        <q-btn v-if="isAuthenticated" @click="logout" label="logout" color="primary"/>
        
        </q-card-section>
      </q-card>
      </q-page>
  </q-page-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { AUTH } from '../plugins/firebase'

export default {
  name: 'PageIndex',
  computed: {
    ...mapGetters('articles', ['isAuthenticated']),
    ...mapGetters('articles', ['user']),
  },
  methods: {
    logout() {
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
          this.$router.push('/')
          }).catch((error) => {
            this.error = error;
          });
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  },
  data() {
    return {
      success: null,
      error: null,
    }
  }
}
</script>
