<template>
  <!--main card -->
  <q-card
    flat
    bordered
    class="q-mb-md"
    v-show="tags.includes(article.searched_for)"
    :style="{ background: isDarkMode ? '#1D1D1D' : '#FAFAFA' }"
  >
    <q-img
      style="height: 150px; width: 100%; overflow: hidden;"
      :src="article.thumbnail"
    />

    <q-card-section>
      <div class="row">
        <div class="text-overline text-orange">{{ article.website_name }}</div>

        <q-space />

        <div class="actions">
          <q-badge outline class="q-mr-lg text-bold" color="orange">{{
            article.publish_date
          }}</q-badge>

          <q-btn
            class="q-mr-sm"
            @click="saveData"
            dense
            round
            flat
            :icon="isSaved() ? 'fas fa-bookmark' : 'far fa-bookmark'"
          />

          <q-btn
            @click="share"
            class="q-mr-sm"
            dense
            round
            flat
            icon="fas fa-share"
          />
        </div>
      </div>

      <div class="text-h6 q-mt-sm q-mb-xs">{{ article.title }}</div>
      <div class="text-caption text-grey">
        {{ article.content | truncate(150, "...") }}
      </div>

      <div class="row q-mt-sm">
        <q-badge outline color="accent">
          {{ article.searched_for }}
        </q-badge>

        <q-space />
        <q-btn
          type="a"
          target="_blank"
          color="accent"
          size="sm"
          :href="article.url"
          outline
          rounded
        >
          read more
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  // name: 'ComponentName',
  props: ["article", "tags"],
  computed: {
    ...mapState("articles", ["savedData"]),
    ...mapState("articles", ["isDarkMode"]),
  },
  filters: {
    truncate: function(text, length, suffix) {
      return text.substring(0, length) + suffix;
    },
  },
  methods: {
    saveData() {
      if (!this.isSaved()) {
        this.$store.commit("articles/SAVE_DATA", this.article);
        this.$q.localStorage.set("savedData", this.savedData);
      } else {
        let index = this.savedData.findIndex(
          (val) => val.url == this.article.url
        );
        this.savedData.splice(index, 1);
        this.$q.localStorage.set("savedData", this.savedData);
      }
    },

    isSaved() {
      for (let val of this.savedData) {
        if (val.url == this.article.url) {
          return true;
        }
      }
    },

    share() {
      if (navigator.share) {
        navigator
          .share({
            title: "blogie.now.sh",
            text: "Checkout this awesome article!",
            url: this.article.url,
          })
          .then(() => console.log("Successful share"))
          .catch((error) => console.log("Error sharing", error));
      }
    },
  },
  data() {
    return {};
  },
};
</script>
