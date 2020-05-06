<template>
  <q-page-container class="q-pa-lg">
        <div class="column">
          <div class="self-center logo-text text-h3">
            Blogie
            </div>
          <div class="desktop-hide">
          <q-img src="statics/splash.png" />
          
          <div style="border: 0px white solid; border-radius: 30px; overflow: hidden;">
            <div class="fill"></div>
          <div class="q-pa-md col-8 items-left text-h4 text-bold text-center">
            Discover the best articles from the Internet
          </div>
          
          <div class="q-pa-md text-body2">
            
            Blogie recommends you articles from different websites. Your feed is always optimsed to only show articles which you would actually like. You can choose from multiple tags and blogie will try to find the best from the web based from that data.   
          </div>
          <div class="fill"></div>
          </div>
          <q-btn rounded to="/register" class="q-ma-lg" color="blue" label="Get Started" />
          
          </div>
          
          <!-- For Desktop -->
          <div class="mobile-hide">
          <q-img src="statics/splash.png" />
          
          <div style="border: 0px white solid; border-radius: 30px; overflow: hidden;">
            <div class="fill"></div>
          <div class="q-pa-md col-8 items-left text-h4 text-bold text-center">
            Discover the best articles from the Internet
          </div>
          
          <div class="q-pa-md text-body2">
            
            Blogie recommends you articles from different websites. Your feed is always optimsed to only show articles which you would actually like. You can choose from multiple tags and blogie will try to find the best from the web based from that data.   
          </div>
          <div class="fill"></div>
          </div>
          <q-btn rounded to="/register" class="q-ma-lg" color="blue" label="Get Started" />
          
          </div>
          
          </div>
          
          
          
      <div class="row">
      
      <div class="features">
      <div class="q-mt-lg column items-center">
        <q-icon name="img:statics/speedometer.svg" style="font-size: 100px;"/>
        <div class="q-pa-md col text-h5 text-bold">
          Fast
        </div>
        <div class="q-ma-sm" style="width: 70%; text-align: center;">
          <p>I think its fast but I still haven't tested it that heavily.</p>
        </div>
      </div>
      </div>
      
      <div class="features">
      <div class="column items-center">
        <q-icon name="img:statics/multiple_source.svg" style="font-size: 100px;"/>
        <div class="q-pa-md col text-h5 text-bold">
          Multiple Sources
        </div>
        <div class="q-ma-sm" style="width: 70%; text-align: center;">
          <p>Get articles from over 50+ news sources. Even if your favourite website is not there you can always add them by providing blogie a link of the site.</p>
        </div>
      </div>
      </div>
      
      <div class="features">
      <div class="column items-center">
        <q-icon name="img:statics/technology.svg" style="font-size: 100px;"/>
        <div class="q-pa-md col text-h5 text-bold">
          Personlized
        </div>
        <div style="width: 70%; text-align: center;">
          <p>Your feed is always personalized according to your interests, so you can spend more time reading articles instead of searching them for hours.</p>
        </div>
      </div>
      </div>
      
      <div class="features">
      <div class="column items-center">
        <q-icon name="img:statics/free.svg" style="font-size: 100px;"/>
        <div class="q-pa-md col text-h5 text-bold">
          Free To Use
        </div>
        <div style="width: 70%; text-align: center;">
          <p>Blogie is free to use and always will be. Currently in beta version there are not even ads.</p>
        </div>
      </div>
      </div>
      
      </div>
  </q-page-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { AUTH } from '../plugins/firebase'

export default {
  name: 'PageIndex',
  computed: {
    ...mapGetters('articles', ['isAuthenticated']),
    ...mapGetters('articles', ['user']),
  },
  methods: {
    logout() {
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
          this.$router.push('/')
          }).catch((error) => {
            this.error = error;
          });
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  },
  data() {
    return {
      success: null,
      error: null,
    }
  }
}
</script>

<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');

.logo-text {
  font-family: 'Righteous', cursive;

}

.fill {
  height: 15px;
  background-color: #50B4F4
}

.features {
  border-right: 10px #50B4F4 solid;
  border-left: 10px #50B4F4 solid;
  border-radius: 30px;
  margin-bottom: 30px;
}

  </style>
