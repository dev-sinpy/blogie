<template>
  
    <q-card 
    flat bordered 
    class="q-mb-sm">
    
      <q-card-section>
          <div class="row">
            <div class="text-overline text-orange">{{article.website_name}}</div>
            
            <q-space />
            
            <div class="actions">
              <q-badge outline class="q-mr-lg text-bold" color="orange">{{article.publish_date}}</q-badge>
              <q-btn dense round flat icon="favorite_border">
                <q-badge color="red" floating transparent>
                  4
                </q-badge>
              </q-btn>
              <q-btn dense round flat icon="share">
              </q-btn>
            </div>
          </div>
          
          <div class="row flex">
          
          <div class="col-8">
          <div class="text-h5 q-mb-xs">{{article.title}}</div>
          <div class="text-caption text-grey">
            {{article.content | truncate(120, '...')}}
          </div>
          </div>
          
          <div class="col-4">
          <q-img
            class="rounded-borders"
            :src="article.thumbnail"
          />
          </div>
          </div>
          
          <div class="row q-mt-sm">
            <q-badge outline color="accent">
              {{article.searched_for}}
            </q-badge>
            
            <q-space />
            
            <a :href="article.url" :target="target">
            <q-btn outline color="accent" size="sm" rounded>
              read more
            </q-btn>
            </a>
          </div>
          
      </q-card-section>
      
    </q-card>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ['article'],
  filters: {
    truncate: function (text, length, suffix) {
        return text.substring(0, length) + suffix;
    },
  },
  data () {
    return {
      target: "_blank"
    }
  }
}
</script>
