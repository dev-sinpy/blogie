<template>
  <div v-if="status == 'loaded'">
  <q-dialog v-model="interests">
    <q-card class="bg-black">
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn @click="closePopup" icon="close" v-close-popup />
      </q-card-section>
      <q-banner v-if="success" class="text-white bg-positive">
        {{success}}
      </q-banner>
      <q-card-section>
        <div class="q-mb-md text-weight-medium text-center">Select you interests</div>
        <div v-for="tags in getDefaultTags" :key=tags.tag class="q-ma-sm" style="display: inline;">
          <span class="q-gutter-md">
            <q-btn @click="selectTags(tags.tag)" color="blue" :label=tags.tag :outline=!tags.enabled rounded />
          </span>
        </div>
      </q-card-section>
      <q-card-section class="row items-center q-ma-lg">
      <q-btn @click="submitInterests" class="full-width" color="blue" label="update" />
    </q-card-section>
    </q-card>
  </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { AUTH } from '../plugins/firebase'
import axios from 'axios'

export default {
  name: 'Interests',
  computed: {
    ...mapGetters('articles', ['getEnabledTags']),
    ...mapGetters('articles', ['getDefaultTags']),
    ...mapGetters('articles', ['user']),
    ...mapGetters('articles', ['status']),
    ...mapGetters('articles', ['interests'])
  },
  methods: {
    closePopup() {
      this.$store.commit('articles/SET_POPUP', {popup: 'interestsPopup', flag: false})
    },
    
    selectTags(tag) {
      let found = this.selectedTags.find(val => val == tag)
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
      let email = this.user;
      await axios.post(`https://blogie.now.sh/api/updateuser/?email=${email}&tags=${tags}`)
      this.success = 'Updated your preferences'
    },
  },
  data () {
    return {
      selectedTags: this.$store.getters['articles/getEnabledTags'],
      success: ''
    }
  }
}
</script>
