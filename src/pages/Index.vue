<template>
  <q-page-container>
    <q-page padding>
    
    <!--Primary card-->
    
    <primary-card
    v-for="article in cardsPrimary"
    :key="article.index"
    v-bind:article="article" />
    <q-separator />
    
    <!-- sub-secondary cards -->
    
    <tiny-card
    v-for="article in cardsSubSecondary"
    :key="article.index"
    v-bind:article="article" />
    <q-separator />
    
    <!-- secondary cards -->
    
    <sub-card
    v-for="article in cardsSecondary"
    :key="article.index"
    v-bind:article="article" />
    <q-separator />
    
    <q-separator />
          
        </q-page>
      </q-page-container>
</template>

<script>

export default {
  name: 'PageIndex',
  components: {
    'primary-card': require('components/PrimaryCard.vue').default,
    'tiny-card': require('components/TinyCard.vue').default,
    'sub-card': require('components/SubCard.vue').default,
  },
  data() {
    
    return {
      cardsPrimary: [
      {
        websiteName: 'example',
        title: 'Blog 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
        tags: 'android',
      },
      
      ],
      
      cardsSubSecondary: [
      {
        websiteName: 'example',
        title: 'Blog 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
        tags: 'android',
      },
      
      {
        websiteName: 'example',
        title: 'Blog 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
        tags: 'android',
      },
      
      {
        websiteName: 'example',
        title: 'Blog 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
        tags: 'android',
      },
      
      ],
      
      cardsSecondary: [
      {
        websiteName: 'example',
        title: 'Blog 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
        tags: 'android',
      },
      
      {
        websiteName: 'example',
        title: 'Blog 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
        tags: 'android',
      },
      
      ],
      
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
    
  }
}
</script>
