<template>
  <!-- Sidebar for dashboard. -->
  <q-drawer
    v-model="show"
    persistent
    show-if-above
    side="right"
    :breakpoint="500"
    content-class="accent"
  >
    <q-scroll-area class="fit">
      <q-card
        class="q-ma-sm"
        :style="{ background: isDarkMode ? '#3D3D3D' : '#f8f9fa' }"
      >
        <div class="q-ma-sm text-bold">
          Latest News
        </div>
        <q-separator />
        <q-card-section class="q-ma-none q-pa-none">
          <q-list>
            <q-item clickable>
              <q-item-section class="text-caption">
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                lorem ipsum
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section class="text-caption">
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                lorem ipsum
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section class="text-caption">
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                lorem ipsum
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section class="text-caption">
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                lorem ipsum
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section class="text-caption">
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                lorem ipsum
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <q-card
        class="q-ma-sm"
        :style="{ background: isDarkMode ? '#3D3D3D' : '#f8f9fa' }"
      >
        <div class="q-ma-sm text-bold">
          Popular among others
        </div>
        <q-separator />
        <q-card-section class="q-gutter-sm">
          <q-btn dense rounded size="sm" color="blue" label="android" />
          <q-btn dense rounded size="sm" color="blue" label="android" />
          <q-btn dense rounded size="sm" color="blue" label="android" />
          <q-btn dense rounded size="sm" color="blue" label="android" />
          <q-btn dense rounded size="sm" color="blue" label="android" />
        </q-card-section>
      </q-card>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  name: "RightSidebar",

  components: {},

  created() {},

  preFetch({ store, currentRoute, previousRoute, redirect, ssrContext }) {},

  methods: {},

  computed: {
    ...mapGetters("articles", ["isDarkMode"]),
  },
  data() {
    return {
      show: true,
    };
  },
};
</script>
