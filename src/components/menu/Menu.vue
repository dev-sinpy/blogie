<template>
  <div class="absolute-right">
    <q-btn 
      class="q-ma-sm"
      flat 
      dense 
      label="Menu"
    >
    <q-menu>
      <q-card flat style="height: 400px; width: 350px;">
        <q-card-section class="row flex-center">
          <q-avatar size="50px" class="q-mr-md">
            <img :src="getUser.avatar">
          </q-avatar>
          <span class="text-weight-medium">{{ getUser.name }}</span>
        </q-card-section>
        
        <q-separator />
        
        <q-card-section>
          <q-list>

            <q-item
              clickable
              v-ripple
              to="/saved"
            >
              <q-item-section avatar>
                <q-icon name="bookmarks" />
              </q-item-section>

              <q-item-section>Saved</q-item-section>
              
              <q-item-section top side class="q-ma-sm">
                <q-badge color="orange">
                  {{ savedDataLength }}
                </q-badge>
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="notifications" />
              </q-item-section>

              <q-item-section>Notifications</q-item-section>
              
              <q-item-section top side class="q-ma-sm">
                <q-badge color="orange">
                  0
                </q-badge>
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="account_circle" />
              </q-item-section>

              <q-item-section>Personal</q-item-section>
              
              <q-item-section top side class="q-ma-sm">
                <q-icon name="navigate_next" />
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>

              <q-item-section>Settings</q-item-section>
              
              <q-item-section top side class="q-ma-sm">
                <q-icon name="navigate_next" />
              </q-item-section>
            </q-item>

          </q-list>
        </q-card-section>
        
        <q-card-section class="float-left" style="margin-top: 50px;">
          <q-btn 
            round 
            flat
            :icon="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'" 
            @click="darkMode" 
          />
        </q-card-section>
        
        <q-card-section class="float-right" style="margin-top: 50px;">
          <q-btn 
            round
            color="red"
            icon="power_settings_new" 
            @click="logout" 
          />
      </q-card-section>
      
      </q-card>
    </q-menu>
  </q-btn>
  </div>
</template>

<script>
import { AUTH } from "../../boot/firebase";
import { mapGetters } from "vuex";

export default {
  name: 'Menu',
  computed: {
    ...mapGetters("articles", ["getUser"]),
    ...mapGetters("articles", ["isDarkMode"]),
    savedDataLength() {
      return this.$store.state.articles.savedData.length
      //return 0
    },
  },
  data () {
    return {
      success: '',
    }
  }, 
  
  methods: {
    darkMode() {
      //functionality: Toggles theme of the website
      this.$q.dark.toggle();
      this.$store.dispatch("articles/setDarkMode");
    },
    logout() {
      this.$q
        .dialog({
          title: "Logout",
          message: "Are you sure you want to logout?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          //
        })
        .onOk(() => {
          AUTH.signOut()
            .then(() => {
              this.success = "Logged out successfully";
              this.$store.dispatch("articles/fetchUser");
              window.location.href = "/";
            })
            .catch((error) => {
              this.error = error;
            });
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
  }
}
</script>
