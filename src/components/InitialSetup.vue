<template>
  <div v-if="!status.popup_loading">
    <q-dialog v-model="initialSetup">
      <q-card class="bg-black" style="height: 400px; width: 50rem;">
        <q-card-section class="row items-center q-pb-none">
          <q-space />
<!--
          <q-btn
            v-if="selectedTags.length >= 1"
            @click="closePopup"
            icon="close"
            v-close-popup
          />
-->
        </q-card-section>
        <q-banner v-if="success" class="text-white bg-positive">
          {{ success }}
        </q-banner>
        
        <q-card-section
          v-if="loading || status.tags_enabled"
          class="q-pa-lg absolute-center"
        >
          <q-spinner-puff color="deep-orange" size="50px" />
        </q-card-section>
        
        <q-card-section v-else-if="!loading">
          <div class="q-mb-md text-weight-medium text-center">
            Select you interests
          </div>
          <div
            v-for="tags in getDefaultTags"
            :key="tags.tag"
            class="q-ma-sm"
            style="display: inline;"
          >
            <span class="q-gutter-md">
              <q-btn
                @click="selectTags(tags.tag)"
                color="blue"
                :label="tags.tag"
                :outline="!tags.enabled"
                rounded
              />
            </span>
          </div>
          <div class="q-mt-lg">
            <q-btn
              @click="submitInterests"
              class="full-width"
              color="blue"
              label="Submit"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Interests",
  computed: {
    ...mapGetters("articles", ["getEnabledTags"]),
    ...mapGetters("articles", ["getDefaultTags"]),
    ...mapGetters("articles", ["user"]),
    ...mapGetters("articles", ["status"]),
    ...mapGetters("articles", ["initialSetup"]),
  },
  methods: {
    closePopup() {
      this.loading = false;
      this.selectedTags.length = 0;
      this.success = "";
      this.$store.commit("articles/SET_POPUP", {
        popup: "initialPopup",
        flag: false,
      });
    },

    selectTags(tag) {
      let found = this.selectedTags.find((val) => val == tag);
      if (!found) {
        this.selectedTags.push(tag);
        this.getDefaultTags.forEach((val) => {
          if (val.tag == tag) {
            val.enabled = true;
          }
        });
      } else {
        this.selectedTags.forEach((val, index) => {
          if (val == tag) {
            this.selectedTags.splice(index, 1);
          }
        });

        this.getDefaultTags.forEach((val) => {
          if (val.tag == tag) {
            val.enabled = false;
          }
        });
      }
    },
    submitInterests: async function () {
      this.loading = true;
      let tags = this.selectedTags.join();
      let email = this.user;
      await this.$api.post(
        `updateuser/?email=${email}&tags=${tags}`
      );
      this.$store.dispatch("articles/fetchTags", { reload: true });
      this.loading = false;
      this.success = "Updated your preferences";
      this.closePopup()
      this.$router.replace('/dashboard')
    },
  },
  data() {
    return {
      loading: false,
      selectedTags: [],
      success: "",
    };
  },
};
</script>
