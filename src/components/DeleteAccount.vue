<template>
  <q-dialog v-model="deleteUser">
    <q-card class="bg-black">
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn icon="close" v-close-popup />
      </q-card-section>

      <q-card-section>
        <div class="q-mb-md text-weight-medium text-negative text-center">Delete your account</div>
        
      </q-card-section>
      <q-card-section class="row items-center q-ma-lg">
      <q-btn @click="deleteAccount" class="full-width" color="negative" label="delete" />
    </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  // name: 'ComponentName',
  methods {
    deleteAccount: async function() {
      let email = this.$store.getters['articles/user'];
      console.log(email)
      await axios.post(`http://blogie.now.sh/api/removeuser/?email=${email}`)
      let user = AUTH.currentUser;

      user.delete().then(function() {
        window.location.href = '/';
      }).catch(function(error) {
        // An error happened.
      });
    }
  },
  
  data () {
    return {}
  }
}
</script>
