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

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',

  components: {
  },
}
</script>
