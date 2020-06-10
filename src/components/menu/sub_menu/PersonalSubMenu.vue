<template>
  <div>
    <q-menu v-model="showSubMenu" no-parent-event>
      <q-card flat style="height: 400px; width: 350px;">
        <q-card-section class="row space-between q-pa-none">
          <q-btn @click="goBack" icon="navigate_before" size="md" dense flat />
          <q-space />
          <div class="q-ma-sm text-h6">Personal</div>
          <q-space />
          <q-btn icon="info" size="md" dense flat />
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-list>
            <q-item clickable v-ripple @click="interestsPopup()">
              <q-item-section avatar>
                <q-icon name="edit" />
              </q-item-section>

              <q-item-section>Edit Preferences</q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
              @click="displayPopup('deleteAccountPopup')"
            >
              <q-item-section avatar>
                <q-icon name="delete" />
              </q-item-section>

              <q-item-section>Delete Account</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-menu>
    <delete-account-popup />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PersonalSubMenu",
  props: ["showSubMenu"],
  components: {
    "delete-account-popup": require("components/popups/DeleteAccount.vue")
      .default,
  },
  computed: {
    ...mapGetters("main", ["getUser"]),
  },
  data() {
    return {
      success: "",
    };
  },

  methods: {
    displayPopup(popup) {
      /*
      params: popup
      type: String
      */

      this.$store.commit("main/SET_POPUP", { popup: popup, flag: true });
    },
    interestsPopup() {
      /*
      Functionality: Displays a popup and fetches all the tags from the server.
      */
      this.$store.commit("main/SET_POPUP", {
        popup: "interestsPopup",
        flag: true,
      });
    },
    goBack() {
      this.$emit("goBack");
    },
  },
};
</script>
