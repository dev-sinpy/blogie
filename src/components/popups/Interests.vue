<template>
  <div v-if="!status.popup_loading">
    <q-dialog v-model="interests">
      <q-card style="height: 500px; width: 50rem;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-bold" style="font-size: 17px;">
            Your Interests
          </div>
          <q-space />
          <q-btn flat @click="closePopup" icon="close" v-close-popup />
        </q-card-section>
        <q-banner v-if="success" class="text-white bg-positive">
          {{ success }}
        </q-banner>

        <q-card-section
          v-if="loading || status.tags_loading"
          class="q-pa-lg absolute-center"
        >
          <q-spinner-puff color="deep-orange" size="50px" />
        </q-card-section>

        <div v-else-if="!loading">
          <q-card-section>
            <div>
              <multiselect
                autofocus
                v-model="value"
                tag-placeholder="Add this tag"
                placeholder="Search or add custom tags"
                label="name"
                track-by="name"
                :allow-empty="false"
                :preselect-first="true"
                :close-on-select="false"
                :options="options"
                max-height="250"
                :multiple="true"
                :taggable="true"
                @tag="addTag"
              >
              </multiselect>
            </div>
          </q-card-section>

          <q-card-section style="padding-top: 270px;">
            <div>
              <q-btn
                @click="submitInterests"
                class="full-width"
                color="blue"
                label="update"
              />
            </div>
          </q-card-section>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Multiselect from "vue-multiselect";

export default {
  name: "Interests",
  components: { Multiselect },
  computed: {
    ...mapGetters("main", ["getDefaultTags"]),
    ...mapGetters("main", ["user"]),
    ...mapGetters("main", ["getUser"]),
    ...mapGetters("main", ["status"]),
    ...mapGetters("main", ["interests"]),
  },

  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag,
      };
      this.options.push(tag);
      this.value.push(tag);
    },

    closePopup() {
      this.loading = false;
      this.success = "";
      this.$store.commit("main/SET_POPUP", {
        popup: "interestsPopup",
        flag: false,
      });
    },

    submitInterests: async function() {
      this.loading = true;
      let tags = this.value.map((val) => val.name.toLowerCase().trim()).join();
      let email = this.user;
      await this.$api.post(
        `updateuser/?email=${email}&tags=${tags}`,
        {},
        {
          headers: { apikey: this.getUser.apiKey },
        }
      );
      this.$store.dispatch("main/fetchTags", { reload: true });
      this.loading = false;
      this.success = "Updated your preferences";
    },
  },
  data() {
    return {
      value: [],
      options: [
        { name: "android" },
        { name: "ios" },
        { name: "windows" },
        { name: "linux" },
        { name: "cryptocurrency" },
        { name: "blockchain" },
        { name: "cybersecurity" },
        { name: "hacking" },
        { name: "programming" },
        { name: "gaming" },
        { name: "digital art" },
        { name: "hacking" },
      ],
      loading: false,
      success: "",
    };
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css" lang="css"></style>
