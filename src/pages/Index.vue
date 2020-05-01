<template>
  <q-page-container>
    <q-page padding>
      
    <h5 class="text-h5 text-weight-bold" style="color: #293241;">Recommended For You</h5>
    <!--Primary card-->
    
    <primary-card
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
    <q-separator />
    
    <q-separator />
          
        </q-page>
      </q-page-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageIndex',
  components: {
    'primary-card': require('components/PrimaryCard.vue').default,
    'tiny-card': require('components/TinyCard.vue').default,
    'sub-card': require('components/SubCard.vue').default,
  },
  
  computed: {
    ...mapGetters('articles', ['articles']),
    
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
  
  data() {
    
    return {

    }
    
  }
}
</script>
