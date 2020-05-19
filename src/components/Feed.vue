<template>
  <div>
    
    <!--Primary card-->
    <div v-if="status == 'loaded'">
      <primary-card class="q-mt-lg" v-bind:article="primaryCard" />
      <q-separator />

      <!-- sub-secondary cards -->
      <tiny-card
        v-for="article in subCard"
        :key="article.index"
        v-bind:article="article"
      />
      <q-separator />

      <!-- secondary cards -->

      <sub-card
        v-for="article in secondaryCard"
        :key="article.index"
        v-bind:article="article"
      />
      
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
        <div class="q-mt-lg">
          <div class="q-gutter-md">
            <q-skeleton type="circle" size="100px" />
            <q-skeleton width="150px" />
            <q-skeleton height="150px" />
            <q-skeleton size="250px" />
            <q-skeleton width="100%" height="100%" />
          </div>
        </div>
      </div>
      
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'Feed',
  components: {
    "primary-card": require("components/PrimaryCard.vue").default,
    "tiny-card": require("components/TinyCard.vue").default,
    "sub-card": require("components/SubCard.vue").default,
  },
  
  computed: {
    //...mapGetters("articles", ["articles"]),
    ...mapGetters("articles", ["status"]),
    ...mapGetters("articles", ["getEnabledTags"]),

    primaryCard() {
      //return this.$store.getters["articles/articles"][0];
      return this.articles[0];
    },

    subCard() {
      //return this.$store.getters["articles/articles"].slice(1, -1);
      return this.articles.slice(1, -1);
    },

    secondaryCard() {
      //return this.$store.getters["articles/articles"].slice(-2);
      return this.articles.slice(-2);
    },
  },
  
  methods: {
    refresh(done) {
      let tags = this.getEnabledTags;
      const limit = tags.length ** 2;
      this.$store.dispatch("articles/fetchFeed", {
        limit: limit,
        page: 1,
        reload: true,
      });
      done();
    },
    loadMore() {
      this.$store.commit("articles/SET_STATUS", "loading");
      this.page++;
      let tags = this.getEnabledTags;
      for (let i = tags.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tags[i], tags[j]] = [tags[j], tags[i]];
      }
      let finalTags = tags.join();
      const limit = tags.length ** 2;
      this.$api
        .get(
          `?q=${finalTags}&limit=${limit}&page=${this.page}`
        )
        .then((response) => {
          this.articles.push(...response.data.content)
          this.$store.commit("articles/SET_STATUS", "loaded");
        });
      //let tags = this.$store.getters["articles/getEnabledTags"];
      //const limit = tags.length ** 2;
      //const page = this.page;
      //this.$store.dispatch("articles/fetchMoreFeed", {
        //limit: limit,
        //page: page,
      //});
    },
  },
  
  data () {
    return {
      articles: null,
      page: 1,
    }
  },
  mounted() {
    //this.$store.subscribe((mutation, state) => {
      //if (mutation.type === "articles/SET_TAGS") {
        this.$store.commit("articles/SET_STATUS", "loading");
        let tags = this.$store.getters['articles/getEnabledTags'];
        for (let i = tags.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [tags[i], tags[j]] = [tags[j], tags[i]];
        }
        let finalTags = tags.join();
        const limit = tags.length ** 2;
        this.$api
          .get(
            `?q=${finalTags}&limit=${limit}&page=${1}`
          )
          .then((response) => {
            //commit("SET_FEED", response.data.content);
            this.articles = response.data.content
            this.$store.commit("articles/SET_STATUS", "loaded");
            //LocalStorage.set("feed", response.data.content);
          });
      //}
    //}
  }
}
</script>
