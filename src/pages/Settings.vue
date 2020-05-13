<template>
  <q-page padding>
    <template>
  <div>
    <q-splitter
      v-model="splitterModel"
    >

      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-accent"
        >
          <q-tab name="account" icon="fas fa-user-circle" label="Account" />
          <q-tab name="settings" icon="fas fa-cog" label="Settings" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="account">
            <div class="text-h5 text-weight-medium text-black q-mb-md">Your Account</div>
            <div>
              <div class="text-weight-medium">Registered email</div>
              <q-input class="q-ma-md" outlined v-model="user" readonly />
            </div>
            
            <div v-if="status == 'loaded'" class="q-mt-md">
              <div class="text-weight-medium">Preferences</div>
              
              <q-btn class="q-ma-md" label="Edit Preferences" color="blue" @click="interests = true" />
              
              <q-dialog v-model="interests">
              <q-card class="bg-black">
                <q-card-section class="row items-center q-pb-none">
                  <q-space />
                  <q-btn icon="close" v-close-popup />
                </q-card-section>

                <q-card-section>
                  <div class="q-mb-md text-weight-medium text-center">Select you interests</div>
                  <div v-for="tags in getDefaultTags" :key=tags.tag class="q-ma-sm" style="display: inline;">
                    <span class="q-gutter-md">
                      <q-btn @click="selectTags(tags.tag)" color="blue" :label=tags.tag :outline=!tags.enabled rounded />
                    </span>
                  </div>
                </q-card-section>
                <q-card-section class="row items-center q-ma-lg">
                <q-btn @click="submitInterests" class="full-width" color="blue" label="submit" />
              </q-card-section>
              </q-card>
            </q-dialog>
              
            </div>
            
            <div>
              <div class="q-mt-md text-weight-medium text-negative">Delete account</div>
              <q-btn class="q-ma-md" label="Delete" color="negative" @click="deleteUser = true" />
              
              <q-dialog v-model="deleteUser">
              <q-card class="bg-black">
                <q-card-section class="row items-center q-pb-none">
                  <q-space />
                  <q-btn icon="close" v-close-popup />
                </q-card-section>

                <q-card-section>
                  <div class="q-mb-md text-weight-medium text-negative text-center">Delete your account</div>
                  
                </q-card-section>
                <q-card-section class="row items-center q-ma-lg">
                <q-btn @click="deleteAccount" class="full-width" color="negative" label="delete" />
              </q-card-section>
              </q-card>
            </q-dialog>
              
            </div>
          </q-tab-panel>

          <q-tab-panel name="settings">
            <div class="text-h4 q-mb-md">Settings</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
          </q-tab-panel>

        </q-tab-panels>
      </template>

    </q-splitter>
  </div>
</template>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { AUTH } from '../plugins/firebase'
import axios from 'axios'

export default {
  name: 'Settings',
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    store.dispatch('articles/fetchDefaultTags')
  },
  computed: {
    ...mapGetters('articles', ['getDefaultTags']),
    ...mapGetters('articles', ['user']),
    ...mapGetters('articles', ['status'])
  },
  methods: {
    selectTags(tag) {
      let found = this.selectedTags.find(val => val == tag)
      console.log(found)
      if (!found) {
        this.selectedTags.push(tag);
        this.getDefaultTags.forEach((val => {
          if (val.tag == tag) {
            val.enabled = true
          }
        }))
      } else {
        this.selectedTags.forEach((val, index) => {
          if (val == tag) {
            this.selectedTags.splice(index, 1)
          }
        })
        
        this.getDefaultTags.forEach((val => {
          if (val.tag == tag) {
            val.enabled = false;
          }
        }))
      }
    },
    submitInterests: async function() {
      let tags = this.selectedTags.join();
      let email = this.$store.getters['articles/user'];
      await axios.post(`https://blogie.now.sh/api/updateuser/?email=${email}&tags=${tags}`)
      this.success = 'Updated your preferences'
    },
    
    deleteAccount: async function() {
      let email = this.$store.getters['articles/user'];
      console.log(email)
      await axios.post(`http://blogie.now.sh/api/removeuser/?email=${email}`)
      let user = AUTH.currentUser;

      user.delete().then(function() {
        window.location.href = '/';
      }).catch(function(error) {
        // An error happened.
      });
    }
  },
  data () {
    return {
      tab: 'account',
      splitterModel: 20,
      interests: false,
      deleteUser: false,
      selectedTags: this.$store.getters['articles/getEnabledTags'],
      success: ''
    }
  }
}
</script>
