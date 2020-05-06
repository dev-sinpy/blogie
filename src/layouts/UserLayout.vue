<template>


    <q-layout view="lHh Lpr lff" class="shadow-2">

      <q-toolbar>
        <q-btn flat class="desktop-hide" @click="drawer = !drawer" round dense icon="linear_scale" />
        
        <div class="absolute-center text-h5 text-bold text-orange">
          Feed
          </div>
          
          <div class="absolute-right">
          <q-fab flat
            label="Menu"
            vertical-actions-align="left"
            color="white"
            icon="none"
            direction="down"
            
          >
            <q-fab-action to="/" color="primary" icon="home" label="Home" />
            <q-fab-action v-if="!isAuthenticated" to="/register" color="primary" icon="mail" label="Signup" />
            <q-fab-action v-if="!isAuthenticated" to="/login" color="primary" icon="login" label="Login" />
            <q-fab-action color="secondary" icon="github" label="Github" />
            <q-fab-action v-if="isAuthenticated" @click="logout" color="orange" icon="logout" label="Logout" />
            
          </q-fab>
        </div>
          
          <q-space />
         
      </q-toolbar>


      <q-drawer
        v-model="drawer"
        persistent
        show-if-above
        :width="275"
        :breakpoint="500"
        bordered
        content-class="accent"
      >
        <q-scroll-area class="fit">
          
          <q-list v-if="!isAuthenticated" bordered class="rounded-borders">
            <q-expansion-item
              switch-toggle-side
              expand-separator
              default-opened
              icon="perm_identity"
              label="Account"
            >
            <q-item>
              <q-btn class="absolute-center desktop-hide" color="primary" icon="mail" label="Signup" to="/register" @click="drawer = !drawer" />
              
              <q-btn class="absolute-center mobile-hide" color="primary" icon="mail" label="Signup" to="/register" />
              </q-item>
            </q-expansion-item>
            </q-list>
      
      <q-list 
      bordered 
      class="rounded-borders q-mt-md">
        
        <q-expansion-item
        switch-toggle-side
        expand-separator
        default-opened
        icon="tags"
        label="Select Tags">
      <q-item-label header>Popular</q-item-label>
      
      <tags 
      v-for="tag in Tags"
      v-bind:tag="tag"
      :key="tag.tag"/>

      </q-expansion-item>
        
        
      </q-list>

      <q-list bordered class="rounded-borders">
        <q-expansion-item
          switch-toggle-side
          expand-separator
          icon="settings"
          label="Preferences"
        >
          <q-item 
          v-ripple
          clickable
          v-for="setting in settings"
          :key="setting.label"
          @click="darkMode">
            
            <q-item-section side top>
              <q-checkbox keep-color color="accent" v-model="setting.isDarkmode" />
            </q-item-section>
            
            <q-item-section>
              <q-item-label>{{setting.label}}</q-item-label>
              </q-item-section>
            
            </q-item>
          </q-expansion-item>
          </q-list>
          
        </q-scroll-area>
      </q-drawer>
      <keep-alive>
        <router-view :success="success" :error="error" />
      </keep-alive>
  </q-layout>
  
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapState } from 'vuex'
  import { AUTH } from '../plugins/firebase'

export default {
  
  name: 'Layout',
  
  components: {
    'tags': require('components/Tags.vue').default,
  },
  
  created() {
    this.$q.dark.set(true)
  },
  
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    store.subscribe((mutation, state) => {
      if (mutation.type === 'articles/SET_USER') {
        store.dispatch('articles/fetchTags')
      }
    });
  },
  
  methods: {
    darkMode() {
      this.$q.dark.toggle()
    },
    logout () {
      
      this.$q.dialog({
        title: 'Logout',
        message: 'Are you sure you want to logout?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        //
      }).onOk(() => {
        AUTH.signOut().then(() => {
          this.success = 'Logged out successfully'
          this.$store.dispatch('articles/fetchUser')
          window.location.href = '/'
          }).catch((error) => {
            this.error = error;
          });
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
  },
  
  computed: {
    ...mapGetters('articles', ['Tags']),
    ...mapGetters('articles', ['isAuthenticated'])
  },
  data() {
    
    return {
      success: null,
      error: null,
      popup: false,
      mobileNav: [
      {
        label: 'Latest',
        to: '/latest',
      },
      
      {
        label: 'Popular',
        to: '/popular',
      },
      
      {
        label: 'Random',
        to: '/random',
      },
      ],
      
      desktopNav: [
        {label: 'Feed', value: 'one'},
        {label: 'Latest', value: 'two'},
        {label: 'Popular', value: 'three'},
      ],
      
      
      settings: [
      {
        label: 'Enable Dark Theme',
        isDarkmode: true
      },
      ],

      drawer: false,
    }
    
  }
}
</script>
