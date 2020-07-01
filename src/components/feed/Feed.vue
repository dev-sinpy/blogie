<template>
  <div>
    <q-pull-to-refresh @refresh="refresh">
      <div v-if="articles">
        <!--Primary card-->
        <primary-card
          class="q-mt-lg"
          :article="primaryCard"
          :tags="getEnabledTags"
        />
        <q-separator />

        <!-- sub-secondary cards -->
        <tiny-card
          v-for="article in subCard"
          :key="article.index"
          :article="article"
          :tags="getEnabledTags"
        />

        <div class="row">
          <q-btn
            class="q-ma-lg text-bold col"
            label="Load More"
            @click="loadMore"
            color="blue"
            :loading="feed_loading"
          />
        </div>
      </div>

      <div v-else>
        <!-- show only if fecthing data -->
        <div class="q-mt-lg">
          <div class="q-gutter-md q-mt-lg">
            <q-skeleton height="150px" />
            <q-skeleton height="150px" />
            <q-skeleton height="150px" />
            <q-skeleton height="150px" />
            <q-skeleton height="150px" />
            <q-skeleton height="150px" />
            <q-skeleton height="150px" />
            <q-skeleton height="150px" />
            <q-skeleton height="150px" />
            <q-skeleton height="150px" />
          </div>
        </div>
      </div>
    </q-pull-to-refresh>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  name: "Feed",
  components: {
    "primary-card": () => import("components/feed/cards/PrimaryCard.vue"),
    "tiny-card": () => import("components/feed/cards/TinyCard.vue"),
  },

  created() {
    this.fetchData();
  },

  computed: {
    ...mapGetters("main", ["getUser"]),
    ...mapGetters("main", ["getEnabledTags"]),
    ...mapState("main", ["tags"]),

    primaryCard() {
      return this.articles[0];
    },

    subCard() {
      return this.articles.slice(1);
    },
  },
  watch: {
    tags: {
      handler(oldVal, newVal) {},
      deep: true,
    },
  },
  methods: {
    fetchData() {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === "main/SET_TAGS" && !mutation.payload.flag) {
          this.$store.commit("main/SET_STATUS", {
            status: "feed_loading",
            flag: true,
          });

          let tags = this.getEnabledTags;
          let finalTags = tags.join(); //join the randomize array
          const limit = 40;
          this.$api
            .get(`?q=${finalTags}&limit=${limit}&page=${1}`, {
              headers: { apikey: this.getUser.apiKey },
            })
            .then((response) => {
              this.articles = response.data.data;
              this.$store.commit("main/SET_STATUS", {
                status: "feed_loading",
                flag: false,
              });
              //LocalStorage.set("feed", response.data.content);
            });
        }
      });
    },

    getData: async function(page) {
      let tags = this.getEnabledTags;
      let finalTags = tags.join(); //join the randomize array
      const limit = 40;
      let response = await this.$api.get(
        `?q=${finalTags}&limit=${limit}&page=${page}`,
        {
          headers: { apikey: this.getUser.apiKey },
        }
      );

      return response.data.data;
    },

    refresh: async function(done) {
      this.$store.commit("main/SET_STATUS", {
        status: "feed_loading",
        flag: true,
      });

      this.articles = await this.getData(1);
      this.$store.commit("main/SET_STATUS", {
        status: "feed_loading",
        flag: false,
      });
      done();
    },
    loadMore: async function() {
      this.feed_loading = true;
      this.page++;
      let data = await this.getData(this.page);
      this.articles.push(...data);
      this.feed_loading = false;
    },
  },

  data() {
    return {
      articles: null,
      feed_loading: false,
      page: 1, //for pagination
    };
  },
};
</script>
