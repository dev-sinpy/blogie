<template>
  <q-page-container>
  <q-page padding>
    <q-banner v-if="error" inline-actions class="text-white bg-negative">
      {{error}}
    </q-banner>
    <div v-if="!error">
    <div class="q-pa-md text-h4">
      See you again!
      </div>
    <q-img src="statics/logged_out.png" :ratio="16/5" />
    </div>
  </q-page>
  </q-page-container>
</template>

<script>
export default {
  // name: 'PageName',
  mounted() {
    AUTH.signOut().then(function() {
    // Sign-out successful.
    }).catch(function(error) {
      this.error = error;
      console.log(error);
    });
  },
  data() {
    return {
      error: null,
    }
  }
}
</script>
