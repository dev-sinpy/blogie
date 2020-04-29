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
          <q-fab
            label="Menu"
            vertical-actions-align="left"
            color="transparent"
            icon="none"
            direction="down"
            
          >
            <q-fab-action color="primary" icon="mail" label="Signup" />
            <q-fab-action color="primary" icon="login" label="Login" />
            <q-fab-action color="secondary" icon="github" label="Github" />
            <q-fab-action color="orange" icon="logout" label="Logout" />
            
          </q-fab>
        </div>

      </q-toolbar>
    </q-header>


    <q-layout view="lHh Lpr lff" container class="shadow-2" style="margin-top: 50px;  min-height: inherit;">

      <q-toolbar>
        <q-btn flat class="desktop-hide" @click="drawer = !drawer" round dense icon="menu" />
        
        <q-btn-dropdown class="col-10 desktop-hide text-orange text-h6 text-bold" color="transparent" label="Feed" dropdown-icon="none" flat>
          <q-list>
            <q-item 
            clickable 
            v-close-popup 
            v-for="item in mobileNav"
            :key="item.label"
            :to="item.to">
            
              <q-item-section>
                <q-item-label>{{item.label}}</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </q-btn-dropdown>
          
        <q-btn-toggle class="mobile-hide absolute-center"
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
              <q-btn to="/signup" class="absolute-center" color="primary" icon="mail" label="Signup" />
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

      <q-item 
      v-ripple 
      clickable
      v-for="tag in tags"
      :key="tag.tag"
      @click="tag.enabled = !tag.enabled">
        
        <q-item-section side top>
          <q-checkbox 
          v-model="tag.enabled" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{tag.tag}}</q-item-label>
        </q-item-section>
      </q-item>

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
var tags = [
{
  tag: 'android',
  popularity: 1,
  enabled: true
},
{
  tag: 'ios',
  popularity: 1,
  enabled: true
},
{
  tag: 'windows',
  popularity: 1,
  enabled: true
},
{
  tag: 'programming',
  popularity: 1,
  enabled: true
},
{
  tag: 'news',
  popularity: 1,
  enabled: true
},
{
  tag: 'random',
  popularity: 1,
  enabled: false
},
];

function assignTags(tags) {
    let obj = Array();
    let counter = 0;
    for (let i=0; i < tags.length-1; i++) {
        obj.push(Object.assign({
        index: counter,
        label: tags[i],
        check: true
    }));
    counter++
    }
    return obj
}

export default {
  
  name: 'Layout',

  components: {
  },
  data() {
    
    return {
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
        {label: 'Popular', value: 'three'},
        {label: 'Popular', value: 'three'},
      ],
      
      tags: tags,
      
      settings: [
      {
        label: 'Enable Dark Theme',
        enabled: false
      },
      ],

      drawer: false,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
    
  }
}
</script>
