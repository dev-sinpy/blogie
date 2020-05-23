<template>
  <q-card
    flat
    bordered
    class="q-mb-md"
    v-show="tags.includes(article.searched_for)"
  >
    <q-card-section>
      <div class="row">
        <div class="text-overline text-orange">{{ article.website_name }}</div>

        <q-space />

        <div class="actions">
          <q-badge outline class="q-mr-lg text-bold" color="orange">{{
            article.publish_date
          }}</q-badge>
          <q-btn class="q-mr-sm" dense round flat icon="fas fa-map-pin" />
          <q-btn
            @click="share"
            class="q-mr-sm"
            dense
            round
            flat
            icon="far fa-share-square"
          />
        </div>
      </div>

      <div class="row flex">
        <div class="col-8">
          <div class="text-h5 q-mb-xs">{{ article.title }}</div>
          <div class="text-caption text-grey">
            {{ article.content | truncate(120, "...") }}
          </div>
        </div>

        <div class="col-4">
          <q-img class="rounded-borders" :src="article.thumbnail" />
        </div>
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
export default {
  // name: 'ComponentName',
  props: ["article", "tags"],
  filters: {
    truncate: function (text, length, suffix) {
      return text.substring(0, length) + suffix;
    },
  },
  methods: {
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
    return {
      target: "_blank",
    };
  },
};
</script>
