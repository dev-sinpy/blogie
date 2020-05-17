<template>
  <q-dialog v-model="deleteUser">
    <q-card class="bg-black" style="height: 220px; width: 450px;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-weight-medium text-negative text-center">
          Delete your account
        </div>
        <q-space />
        <q-btn icon="close" v-close-popup />
      </q-card-section>
      
      <q-card-section
        v-if="status == 'loading'"
        class="q-pa-lg absolute-center"
      >
        <q-spinner-puff color="deep-orange" size="50px" />
      </q-card-section>
      
      <q-card-section v-else>
        <div class="text-caption text-weight-1 text-warning">Note: This action is irreversible, your saved data and other information will be deleted from our server.</div>
        
        <div class="row items-center q-ma-lg">
        <q-btn
          @click="deleteAccount"
          class="full-width"
          color="negative"
          label="delete"
        />
      </div>
        
      </q-card-section>
      
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  // name: 'ComponentName',
  props: ["deleteUser"],
  computed: {
    ...mapGetters("articles", ["status"])
  },
  methods: {
    deleteAccount: async function() {
      this.$store.commit("articles/SET_STATUS", "loading");
      let email = this.$store.getters['articles/user'];
      console.log(email)
      await axios.post(`http://blogie-api.now.sh/api/removeuser/?email=${email}`)
      let user = AUTH.currentUser;

      user.delete().then(function() {
        this.$store.commit("articles/SET_STATUS", "loaded");
        window.location.href = '/';
      }).catch(function(error) {
        // An error happened.
      });
    }
  },

  data () {
    return {
      error: ''
    }
  }
}
</script>
