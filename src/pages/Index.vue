<template>
  <div>
    
    <q-layout view="lHh Lpr lff" container class="window-height shadow-2">

        <q-toolbar>
          <q-btn flat class="desktop-hide" @click="drawer = !drawer" round dense icon="menu" />
          
          <q-btn-dropdown class="col-10 desktop-hide text-orange text-h6 text-bold" color="transparent" label="Feed" dropdown-icon="none" flat>
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Latest</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Popular</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Recommendation</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          
          <q-btn-toggle class="mobile-hide absolute-center"
        v-model="model"
        flat stretch
        toggle-color="yellow"
        :options="[
          {label: 'Feed', value: 'one'},
          {label: 'Latest', value: 'two'},
          {label: 'Popular', value: 'three'},
          {label: 'Popular', value: 'three'},
          {label: 'Popular', value: 'three'},
        ]"
      />
        </q-toolbar>


      <q-drawer
        v-model="drawer"
        persistent
        show-if-above
        :width="275"
        :breakpoint="500"
        bordered
        content-class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          
          <q-list bordered class="rounded-borders">
            <q-expansion-item
              switch-toggle-side
              expand-separator
              default-opened
              icon="perm_identity"
              label="Account"
            >
            <q-item>
              <q-btn class="relative-position absolute-center" color="primary" icon="mail" label="Signup" />
              </q-item>
            </q-expansion-item>
            </q-list>
      
      <q-list bordered class="rounded-borders q-mt-md">
      <q-expansion-item
        switch-toggle-side
        expand-separator
        default-opened
        icon="tags"
        label="Select Tags"
      >
      <q-item-label header>Popular</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check1" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Android</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check2" />
        </q-item-section>

        <q-item-section>
          <q-item-label>ios</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check3" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Windows</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check3" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Programming</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="check3" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Random</q-item-label>
        </q-item-section>
      </q-item>
      </q-expansion-item>
    </q-list>

      <q-list bordered class="rounded-borders">
            <q-expansion-item
              switch-toggle-side
              expand-separator
              icon="setting"
              label="Setting"
            >
            <q-item>
              <q-checkbox label="Enable Dark Theme" v-model="check1" />
              </q-item>
            </q-expansion-item>
            </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          
    <!--main card -->
    <q-card class="my-card" flat bordered>
      <q-img style="height: 175px; width: 100%; overflow: hidden;"
        src="https://cdn.quasar.dev/img/parallax2.jpg"
      />

      <q-card-section>
        <div class="text-overline text-orange-9">Overline</div>
        <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
        <div class="text-caption text-grey">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </q-card-section>

      <q-card-actions class="row justify-between">
        <q-badge color="blue">
          Tags
        </q-badge>
        
      <q-btn color="orange" size="sm" rounded>
          read more
        </q-btn>
      </q-card-actions>
    </q-card>
    <q-separator />
    
    <!-- secondary cards -->
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">Website name</div>
          <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
          <div class="text-caption text-grey">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </q-card-section>

        <q-card-section class="col-xs-5 col-sm-4  col-md-6  col-lg-5 flex flex-center">
          <q-img
            class="rounded-borders"
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          />
        </q-card-section>
      </q-card-section>

      <q-card-actions class="row justify-between">
        <q-badge color="blue">
          Tags
        </q-badge>
        
      <q-btn color="orange" size="sm" rounded>
          read more
        </q-btn>
      </q-card-actions>
    </q-card>
    
    <q-separator />
    
    
    <!-- sub-secondary cards -->
    <q-card class="my-card" flat bordered>

      <q-card-section>
        <div class="text-overline text-orange-9">Website Name</div>
        <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
        <div class="text-caption text-grey">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </q-card-section>

      <q-card-actions class="row justify-between">
        <q-badge class="ml-md" color="blue">
          Tags
        </q-badge>
        
      <q-btn color="orange" size="sm" rounded>
          read more
        </q-btn>
      </q-card-actions>
    </q-card>
          
        </q-page>
      </q-page-container>
    </q-layout>
    
    </div>
</template>

<script>
const menuList = [
  {
    icon: 'signup',
    label: 'Signup',
    separator: true
  },
  {
    icon: 'tags',
    label: 'Tags',
    separator: false
  },
  {
    icon: 'news',
    label: 'news',
    separator: false
  },
  {
    icon: 'tech',
    label: 'technology',
    separator: false
  },
  {
    icon: 'programming',
    label: 'Programming',
    separator: false
  },
  {
    icon: 'android',
    label: 'Android',
    separator: false
  },
  {
    icon: 'windows',
    label: 'Windows',
    separator: false
  }
]


export default {
  name: 'PageIndex',
  data() {
    
    return {
      check1: true,
      check2: false,
      check3: false,

      notif1: true,
      notif2: true,
      notif3: false,

      volume: 6,
      brightness: 3,
      mic: 8,
      drawer: false,
      menuList,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
    
  }
}
</script>
