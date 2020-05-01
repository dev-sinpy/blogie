<template>
  <q-layout>

    <q-header reveal bordered class="bg-primary text-white">
      <q-toolbar>

        <q-toolbar-title>
          <q-avatar>
            <img src="https://images.squarespace-cdn.com/content/v1/5d00e59cf3f45f000162fad9/1562184215451-X3J758ZQL2C4LGSXKL6G/ke17ZwdGBToddI8pDm48kCEA1nBJzP4FOBvoBELJrQlZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVFZY8DXNV7-oU5O43wWp7txWipamTyyf6T6SNuHokS9tSb8BodarTVrzIWCp72ioWw/placeholder-logo-2.png?format=750w">
          </q-avatar>
        </q-toolbar-title>
        
        <q-input dark dense standout 
        input-class="text-right" class="q-ml-md mobile-hide">
          <template v-slot:append>
            <q-icon name="search" />
            <q-icon class="cursor-pointer" />
          </template>
        </q-input>
        
        <div>
          <q-fab flat
            label="Menu"
            vertical-actions-align="left"
            color="white"
            icon="none"
            direction="down"
            
          >
            <q-fab-action to="/" color="primary" icon="home" label="Home" />
            <q-fab-action to="/auth" color="primary" icon="mail" label="Signup" />
            <q-fab-action to="/login" color="primary" icon="login" label="Login" />
            <q-fab-action color="secondary" icon="github" label="Github" />
            <q-fab-action color="orange" icon="logout" label="Logout" />
            
          </q-fab>
        </div>

      </q-toolbar>
    </q-header>


    <q-layout view="lHh Lpr lff" container class="shadow-2" style="margin-top: 50px;  min-height: inherit;">

      <q-toolbar>
        <q-btn flat class="desktop-hide" @click="drawer = !drawer" round dense icon="linear_scale" />
        
        <q-btn-dropdown class="col-10 desktop-hide text-orange text-h6 text-bold" color="transparent" label="Feed" dropdown-icon="none" flat>
          <q-list>
            <q-item 
            clickable 
            v-close-popup 
            v-for="item in mobileNav"
            :key="item.label"
            :to="item.to">
            
              <q-item-section>
                <q-item-label style="text-align: center;">{{item.label}}</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </q-btn-dropdown>
          
          <q-space />
          
        <q-btn-toggle class="mobile-hide"
      flat stretch
      toggle-color="yellow"
      :options="desktopNav"
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
              <q-btn class="absolute-center" color="primary" icon="mail" label="Signup" to="/auth" @click="drawer = !drawer" />
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
      v-for="tag in tags"
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
          @click="setting.enabled=!setting.enabled">
            
            <q-item-section side top>
              <q-checkbox v-model="setting.enabled" />
            </q-item-section>
            
            <q-item-section>
              <q-item-label>{{setting.label}}</q-item-label>
              </q-item-section>
            
            </q-item>
          </q-expansion-item>
          </q-list>
          
        </q-scroll-area>
      </q-drawer>
      
          <router-view />
      </q-layout>

  </q-layout>
  
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapState } from 'vuex'

export default {
  
  name: 'Layout',
  
  components: {
    'tags': require('components/Tags.vue').default,
  },
  
  computed: {
    ...mapState('articles', ['tags']),
    ...mapGetters('articles', ['enabledTags'])
  },
  
  data() {
    
    return {
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
        enabled: false
      },
      ],

      drawer: false,
    }
    
  }
}
</script>
