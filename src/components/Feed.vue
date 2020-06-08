<template>
  <div>
    <q-pull-to-refresh @refresh="refresh">
      <div v-if="articles">
        <!--Primary card-->
        <primary-card
          class="q-mt-lg"
          v-bind:article="primaryCard"
          :tags="getEnabledTags"
        />
        <q-separator />

        <!-- sub-secondary cards -->
        <tiny-card
          v-for="article in subCard"
          :key="article.index"
          v-bind:article="article"
          :tags="getEnabledTags"
        />
        <q-separator />

        <div class="row">
          <q-btn
            outline
            class="q-ma-lg col"
            label="Load More"
            @click="loadMore"
            color="accent"
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
    "primary-card": require("components/PrimaryCard.vue").default,
    "tiny-card": require("components/TinyCard.vue").default,
  },

  created() {
    this.fetchData();
  },

  computed: {
    ...mapGetters("main", ["status"]),
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
          //randomize an array
          for (let i = tags.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tags[i], tags[j]] = [tags[j], tags[i]];
          }
          let finalTags = tags.join(); //join the randomize array
          const limit = tags.length ** 2;
          this.$api
            .get(`?q=${finalTags}&limit=${limit}&page=${1}`)
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

    refresh(done) {
      this.$store.commit("main/SET_STATUS", {
        status: "feed_loading",
        flag: true,
      });
      let tags = this.getEnabledTags;
      for (let i = tags.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tags[i], tags[j]] = [tags[j], tags[i]];
      }
      let finalTags = tags.join();
      const limit = tags.length ** 2;
      this.$api
        .get(`?q=${finalTags}&limit=${limit}&page=${1}`)
        .then((response) => {
          this.articles = response.data.data;
          this.$store.commit("main/SET_STATUS", {
            status: "feed_loading",
            flag: false,
          });
          done();
          //LocalStorage.set("feed", response.data.content);
        });
    },
    loadMore() {
      this.$store.commit("main/SET_STATUS", {
        status: "feed_loading",
        flag: true,
      });
      this.page++;
      let tags = this.getEnabledTags;
      for (let i = tags.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tags[i], tags[j]] = [tags[j], tags[i]];
      }
      let finalTags = tags.join();
      const limit = tags.length ** 2;
      this.$api
        .get(`?q=${finalTags}&limit=${limit}&page=${this.page}`)
        .then((response) => {
          this.articles.push(...response.data.data);
          this.$store.commit("main/SET_STATUS", {
            status: "feed_loading",
            flag: false,
          });
        });
    },
  },

  data() {
    return {
      articles: null,
      page: 1, //for pagination
    };
  },
};
</script>
