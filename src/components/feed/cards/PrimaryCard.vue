<template>
  <!--main card -->
  <q-card
    flat
    bordered
    class="q-mb-md"
    v-show="tags.includes(article.searched_for)"
    :style="{ background: isDarkMode ? '' : '#FAFAFA' }"
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
            @click="share(true)"
            class="q-mr-sm"
            dense
            round
            flat
            icon="fas fa-share"
          />
        </div>
      </div>

      <a
        :href="article.url"
        target="_blank"
        style="text-decoration: none; color: inherit;"
      >
        <div class="text-bold q-mb-xs" style="font-size: 18px;">
          {{ article.title }}
        </div>
        <div class="text-caption">
          {{ article.content | truncate(200, "...") }}
        </div>
      </a>

      <div class="row q-mt-md">
        <q-badge outline color="accent">
          {{ article.searched_for }}
        </q-badge>

        <q-space />
        <q-btn
          class="text-bold"
          type="a"
          target="_blank"
          color="blue"
          size="sm"
          :href="article.url"
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
import { mapGetters } from "vuex";

export default {
  // name: 'ComponentName',
  props: ["article", "tags"],
  computed: {
    ...mapState("main", ["savedData"]),
    ...mapGetters("main", ["isDarkMode"]),
  },
  filters: {
    truncate: function(text, length, suffix) {
      return text.substring(0, length) + suffix;
    },
  },
  methods: {
    saveData() {
      if (!this.isSaved()) {
        this.$store.commit("main/SAVE_DATA", this.article);
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

    share(grid) {
      this.$q
        .bottomSheet({
          grid,
          actions: [
            {
              label: "Email",
              icon: "fas fa-envelope",
              id: "email",
            },
            {
              label: "Twitter",
              icon: "fab fa-twitter",
              color: "blue",
              id: "twitter",
            },
            {
              label: "Reddit",
              color: "red-14",
              icon: "fab fa-reddit",
              id: "reddit",
            },
            {
              label: "Whatsapp",
              color: "green-13",
              icon: "fab fa-whatsapp",
              id: "whatsapp",
            },
            {
              label: "Linkedin",
              icon: "fab fa-linkedin",
              color: "blue-10",
              id: "linkedin",
            },
            {
              label: "Facebook",
              color: "indigo",
              icon: "fab fa-facebook",
              id: "facebook",
            },
          ],
        })
        .onOk((action) => {
          switch (action.id) {
            case "email":
              window.open(
                `mailto:?subject=Checkout%20this%20awesome%20article!&body=${this.article.url}`,
                "_blank"
              );
              break;
            case "twitter":
              window.open(
                `https://twitter.com/intent/tweet?text=Checkout%20this%20awesome%20article!&url=${this.article.url}`,
                "_blank"
              );
              break;
            case "linkedin":
              window.open(
                `http://www.linkedin.com/shareArticle?title=Checkout%20this%20awesome%20article!&url=${this.article.url}`,
                "_blank"
              );
              break;
            case "reddit":
              window.open(
                `https://www.reddit.com/submit?title=Checkout%20this%20awesome%20article!&url=${this.article.url}`,
                "_blank"
              );
              break;
            case "facebook":
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${this.article.url}`,
                "_blank"
              );
              break;
            case "whatsapp":
              window.open(
                `https://api.whatsapp.com/send?text=${this.article.url}`,
                "_blank"
              );
              break;
          }
        })
        .onCancel(() => {
          console.log("Dismissed");
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
  },
  data() {
    return {};
  },
};
</script>
