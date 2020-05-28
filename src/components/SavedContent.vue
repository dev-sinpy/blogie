<template>
  <q-item>
    <q-item-section>
      <a :href="article.url" target="_blank" style="text-decoration: none;">
      <q-card>
        <q-card-section>
          <div class="text-caption">{{article.title}}</div>
        </q-card-section>
      </q-card>
      </a>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ['article'],
  data () {
    return {}
  }
}
</script>
