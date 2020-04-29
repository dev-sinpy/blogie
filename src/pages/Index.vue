<template>
  <q-page-container>
    <q-page padding>
          
    <!--main card -->
    <q-card class="my-card" 
    flat bordered
    v-for="article in cardsPrimary" 
    :key="article.index">
      <q-img style="height: 175px; width: 100%; overflow: hidden;"
        src="https://cdn.quasar.dev/img/parallax2.jpg"
      />

      <q-card-section>
        <div class="flex justify-between">
        <div class="text-overline text-orange-9">{{article.websiteName}}</div>
        <q-icon name="favorite_border" style="font-size: 25px;" />
        </div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{article.title}}</div>
        <div class="text-caption text-grey">
          {{article.content}}
        </div>
        
      <div class="flex justify-between q-mt-sm">
        <q-badge color="accent">
          {{article.tags}}
        </q-badge>
        
      <q-btn color="primary" size="sm" rounded>
          read more
        </q-btn>
        </div>
        
      </q-card-section>
      
    </q-card>
    <q-separator />
    
    <!-- sub-secondary cards -->
    <q-card 
    class="my-card" 
    flat bordered 
    v-for="article in cardsSubSecondary"
    :key="article.index">

      <q-card-section>
        <div class="flex justify-between">
            <div class="text-overline text-orange-9">{{article.websiteName}}</div>
            <q-icon name="favorite_border" style="font-size: 25px;" />
          </div>
        
        <div class="text-h5 q-mt-sm q-mb-xs">{{article.title}}</div>
        <div class="text-caption text-grey">
          {{article.content}}
        </div>
        
        <div class="flex justify-between q-mt-sm">
        <q-badge class="ml-md" color="accent">
          {{article.tags}}
        </q-badge>
        
        <q-btn color="primary" size="sm" rounded>
          read more
        </q-btn>
        </div>
        
      </q-card-section>
      
    </q-card>
    
    <!-- secondary cards -->
    <q-card 
    class="my-card" 
    flat bordered
    v-for="article in cardsSecondary" 
    :key="article.index"
    >
      <q-card-section>
          <div class="flex justify-between">
            <div class="text-overline text-orange-9">{{article.websiteName}}</div>
            <q-icon name="favorite_border" style="font-size: 25px;" />
          </div>
          
          <div class="row flex">
          
          <div class="col-8">
          <div class="text-h5 q-mb-xs">{{article.title}}</div>
          <div class="text-caption text-grey">
            {{article.content}}
          </div>
          </div>
          
          <div class="col-4">
          <q-img
            class="rounded-borders"
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          />
          </div>
          </div>
          
          <div class="flex justify-between q-mt-sm">
            <q-badge color="accent">
              {{article.tags}}
            </q-badge>
            
            <q-btn color="primary" size="sm" rounded>
              read more
            </q-btn>
          </div>
          
      </q-card-section>
      
    </q-card>
    
    <q-separator />
          
        </q-page>
      </q-page-container>
</template>

<script>

export default {
  name: 'PageIndex',
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
