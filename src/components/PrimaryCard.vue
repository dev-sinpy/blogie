<template>
  <!--main card -->
  <q-card flat bordered class="q-mb-md">
    <q-img
      style="height: 200px; width: 100%; overflow: hidden;"
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
          <q-btn class="q-mr-sm" dense round flat icon="fas fa-map-pin">
          </q-btn>
          <q-btn @click="share" class="q-mr-sm" dense round flat icon="far fa-share-square"> </q-btn>
        </div>
      </div>

      <div class="text-h5 q-mt-sm q-mb-xs">{{ article.title }}</div>
      <div class="text-caption text-grey">
        {{ article.content | truncate(240, "...") }}
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
  props: ["article"],
  filters: {
    truncate: function (text, length, suffix) {
      return text.substring(0, length) + suffix;
    },
  },
  methods: {
    share() {
      if (navigator.share) {
        navigator.share({
            title: 'blogie.now.sh',
            text: 'Checkout this awesome article!',
            url: this.article.url,
          })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      }
    }
  },
  data() {
    return {};
  },
};
</script>
