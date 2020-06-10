<template>
  <!-- Sidebar for dashboard. -->
  <q-drawer
    v-model="show"
    persistent
    show-if-above
    side="right"
    :breakpoint="1000"
    content-class="accent"
  >
    <q-scroll-area class="fit">
      <q-card
        class="q-ma-sm"
        :style="{ background: isDarkMode ? '#3D3D3D' : '#f8f9fa' }"
      >
        <div class="q-ma-sm text-bold">
          Global News
        </div>
        <q-separator />
        <q-card-section v-if="news" class="q-ma-none q-pa-none">
          <q-list>
            <q-item clickable v-for="item in news" :key="item.index">
              <a
                :href="item.source"
                target="_blank"
                style="text-decoration: none;"
              >
                <q-item-section class="text-caption">
                  {{ item.title }}
                </q-item-section>
              </a>
            </q-item>
          </q-list>
        </q-card-section>

        <div v-else>
          <q-skeleton square height="40em" />
        </div>
      </q-card>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  name: "RightSidebar",
  props: ["show"],
  components: {},

  created() {},

  preFetch({ store, currentRoute, previousRoute, redirect, ssrContext }) {},

  mounted() {
    this.getNews();
  },

  methods: {
    getNews: async function() {
      let response = await this.$api.get("news/");
      this.news = response.data.data.splice(0, 30);
    },
  },

  computed: {
    ...mapGetters("main", ["isDarkMode"]),
  },
  data() {
    return {
      news: null,
    };
  },
};
</script>
