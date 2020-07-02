<template>
  <q-dialog v-model="deleteAccount">
    <q-card style="height: 220px; width: 450px;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-bold text-negative" style="font-size: 17px;">
          Delete your account
        </div>
        <q-space />
        <q-btn flat dense @click="close" icon="close" />
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
            @click="deleteUserAccount"
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
  computed: {
    ...mapGetters("main", ["deleteAccount"]),
    ...mapGetters("main", ["status"]),
    ...mapGetters("main", ["user"]),
    ...mapGetters("main", ["getUser"]),
  },
  methods: {
    close() {
      this.$store.commit("main/SET_POPUP", {
        popup: "deleteAccountPopup",
        flag: false,
      });
    },

    deleteUserAccount: async function() {
      this.loading = true;

      try {
        let email = this.user;
        await this.$api.post(
          `deleteuser/${email}`,
          {},
          {
            headers: { apikey: this.getUser.apiKey },
          }
        );
        let user = this.$auth.currentUser;
        await user.delete();
        await user.signOut();
        window.location.href = "/";
      } catch (err) {
        console.log(err);
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
