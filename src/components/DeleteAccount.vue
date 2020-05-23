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

      <q-banner v-if="error" class="text-white bg-negative">
        {{ error }}
      </q-banner>

      <q-card-section v-if="loading" class="q-pa-lg absolute-center">
        <q-spinner-puff color="deep-orange" size="50px" />
      </q-card-section>

      <q-card-section v-else>
        <div class="text-caption text-weight-1 text-warning">
          Note: This action is irreversible, your saved data and other
          information will be deleted from our server.
        </div>

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
    ...mapGetters("articles", ["status"]),
    ...mapGetters("articles", ["user"]),
  },
  methods: {
    deleteAccount: async function () {
      this.loading = true;

      try {
        let email = this.user;
        await this.$api.post(`removeuser/?email=${email}`);
        let user = this.$auth.currentUser;

        await user.delete();
        window.location.href = "/";
      } catch (error) {
        //
      } finally {
        this.loading = false;
        window.location.href = "/";
      }
    },
  },

  data() {
    return {
      loading: false,
      error: "",
    };
  },
};
</script>
