<template>
  <q-layout>

    <q-header reveal bordered class="bg-primary text-white">
      <q-toolbar>

        <q-toolbar-title>
          <q-avatar>
            <img src="https://images.squarespace-cdn.com/content/v1/5d00e59cf3f45f000162fad9/1562184215451-X3J758ZQL2C4LGSXKL6G/ke17ZwdGBToddI8pDm48kCEA1nBJzP4FOBvoBELJrQlZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVFZY8DXNV7-oU5O43wWp7txWipamTyyf6T6SNuHokS9tSb8BodarTVrzIWCp72ioWw/placeholder-logo-2.png?format=750w">
          </q-avatar>
        </q-toolbar-title>
        
        <q-input dark dense standout v-model="text" input-class="text-right" class="q-ml-md mobile-hide">
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>
        
        <div>
          <q-fab
            v-model="fab2"
            label="Menu"
            vertical-actions-align="left"
            color="transparent"
            icon="none"
            direction="down"
            
          >
            <q-fab-action color="primary" @click="onClick" icon="mail" label="Signup" />
            <q-fab-action color="primary" @click="onClick" icon="login" label="Login" />
            <q-fab-action color="secondary" @click="onClick" icon="github" label="Github" />
            <q-fab-action color="orange" @click="onClick" icon="logout" label="Logout" />
            
          </q-fab>
        </div>

      </q-toolbar>
    </q-header>


    <q-layout view="lHh Lpr lff" container class="shadow-2" style="margin-top: 50px;  min-height: inherit;">

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
          <router-view />
      </q-layout>

  </q-layout>
  
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
  
  name: 'Layout',

  components: {
  },
  
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
