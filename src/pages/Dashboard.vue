<template>
  <q-page-container>
    <q-page padding>
      
      <q-pull-to-refresh @refresh="refresh">
      
    <q-banner v-if="success" inline-actions class="text-white bg-positive">
      {{success}}
    </q-banner>
    
    <q-banner v-if="error" inline-actions class="text-white bg-negative">
      {{error}}
    </q-banner>
    
    <div 
    class="q-pa-sm text-h5 text-weight-bold"
    v-bind:class="[ isDarkMode ? text-white : text-black ]"
    v-bind:style="{ border: `1px ${isDarkMode ? 'white' : 'black'} solid`, borderRadius: '10px' }"
    >Recommended For You</div>

    <!-- popups-->
    <interests-popup />
    
    <!--Primary card-->
    <div v-if="status == 'loaded'">
      <primary-card 
      class="q-mt-lg"
      v-bind:article="primaryCard" />
      <q-separator />
      
      <!-- sub-secondary cards -->
      
      <tiny-card
      v-for="article in subCard"
      :key="article.index"
      v-bind:article="article" />
      <q-separator />
      
      <!-- secondary cards -->
      
      <sub-card
      v-for="article in secondaryCard"
      :key="article.index"
      v-bind:article="article" />
      
      <div class="row">
        <q-btn outline class="q-ma-lg col" label="Load More" @click="loadMore" color="accent" />
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
      </q-pull-to-refresh>
        </q-page>
      </q-page-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageIndex',
  
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    //~ if (!store.getters['articles/user']) {
      //~ redirect('/'+ store.getters['articles/user'])
    //~ }
    if (currentRoute.query.tutorial) {
      store.dispatch('articles/fetchDefaultTags')
      store.commit('articles/SET_POPUP', {popup: 'interestsPopup', flag: true})
    }
    store.subscribe((mutation, state) => {
      if (mutation.type === 'articles/SET_TAGS') {
        let tags = store.getters['articles/getEnabledTags']
        const limit = tags.length ** 2
        store.dispatch('articles/fetchFeed', {limit: limit, page: 1, reload: false})
      }
    });
  },
  
  components: {
    'primary-card': require('components/PrimaryCard.vue').default,
    'tiny-card': require('components/TinyCard.vue').default,
    'sub-card': require('components/SubCard.vue').default,
    'interests-popup': require('components/Interests.vue').default,
  },
  props: ['success', 'error'],
  
  computed: {
    ...mapGetters('articles', ['articles']),
    ...mapGetters('articles', ['status']),
    ...mapGetters('articles', ['isDarkMode']),
    
    primaryCard() {
      return this.$store.getters['articles/articles'][0]
    },
    
    subCard() {
      return this.$store.getters['articles/articles'].slice(1, -1)
    },
    
    secondaryCard() {
      return this.$store.getters['articles/articles'].slice(-2, )
    },
  },
  
  methods: {
    refresh (done) {
      let tags = this.$store.getters['articles/getEnabledTags']
      const limit = tags.length ** 2;
      this.$store.dispatch('articles/fetchFeed', {limit: limit, page: 1, reload: true})
      done()
    },
    loadMore () {
      this.page++;
      let tags = this.$store.getters['articles/getEnabledTags']
      const limit = tags.length ** 2;
      const page = this.page;
      this.$store.dispatch('articles/fetchMoreFeed', {limit: limit, page: page})
    }
  },
  
  data() {
    
    return {
      page: 1,
    }
    
  }
}
</script>
