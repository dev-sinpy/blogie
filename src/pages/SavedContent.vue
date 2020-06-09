<template>
  <q-page-container>
    <q-page padding>
      <!-- popups-->
      <initial-popup />

      <interests-popup />

      <delete-user-popup :deleteUser="deleteUser" />
      <!-- End popups -->

      <div
        class="q-pa-sm text-h6 text-weight-bold"
        v-bind:class="[isDarkMode ? 'text-white' : 'text-black']"
        v-bind:style="{
          border: `1px ${isDarkMode ? 'white' : 'black'} solid`,
          borderRadius: '10px',
        }"
      >
        Saved Content
      </div>

      <div v-if="savedData" class="q-mt-lg">
        <sub-card
          v-for="article in savedData"
          :key="article.index"
          :article="article"
          :tags="getEnabledTags"
        />
      </div>

      <div v-show="savedData" class="q-ma-lg text-weight-medium text-center">
        <div class="text-weight-medium">
          Nothing to see here....
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  // name: 'PageName',
  components: {
    "sub-card": require("components/feed/cards/SubCard.vue").default,
    "interests-popup": require("components/popups/Interests.vue").default,
    "delete-user-popup": require("components/popups/DeleteAccount.vue").default,
  },

  computed: {
    ...mapState("main", ["savedData"]),
    ...mapGetters("main", ["isDarkMode"]),
    ...mapGetters("main", ["getEnabledTags"]),
  },
};
</script>
