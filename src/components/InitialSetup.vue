<template>
  <div v-if="!status.popup_loading">
    <q-dialog v-model="initialSetup">
      <q-card class="bg-black" style="height: 500px; width: 50rem;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-weight-medium text-center">
            Choose your interests
          </div>
          <q-space />
          
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
              @tag="addTag">
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
import Multiselect from 'vue-multiselect'

export default {
  name: "InitialPopup",
  components: { Multiselect },
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
      this.success = "";
      this.$store.commit("articles/SET_POPUP", {
        popup: "initialPopup",
        flag: false,
      });
    },
    
    addTag (newTag) {
      const tag = {
        name: newTag,
      }
      this.options.push(tag)
      this.value.push(tag)
    },
    
    submitInterests: async function () {
      this.loading = true;
      let tags = this.value.map(val => val.name.toLowerCase().trim()).join()
      let email = this.user;
      await this.$api.post(`updateuser/?email=${email}&tags=${tags}`);
      this.$store.dispatch("articles/fetchTags", { reload: true });
      this.loading = false;
      this.success = "Updated your preferences";
      this.closePopup();
      this.$router.replace("/dashboard");
    },
  },
  data() {
    return {
      value: [
      ],
      options: [
        { name: 'android' },
        { name: 'ios' },
        { name: 'windows'},
        { name: 'linux'},
        { name: 'cryptocurrency'},
        { name: 'blockchain'},
        { name: 'cybersecurity'},
        { name: 'hacking'},
        { name: 'programming'},
        { name: 'gaming'},
        { name: 'digital art'},
        { name: 'hacking'},
      ],
      loading: false,
      success: "",
    };
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css" lang="css"></style>
