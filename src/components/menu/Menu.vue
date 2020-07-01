<template>
  <div>
    <div>
      <q-btn class="q-mr-md" @click="closeMenu" dense flat>
        <q-avatar size="40px">
          <img :src="getUser.avatar" />
        </q-avatar>
      </q-btn>
      <q-menu v-model="opened" no-parent-event>
        <q-card flat style="height: 400px; width: 350px;">
          <q-card-section class="row flex-center">
            <q-avatar size="50px" class="q-mr-md">
              <img :src="getUser.avatar" />
            </q-avatar>
            <span class="text-h6 text-bold">{{ getUser.name }}</span>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-list>
              <q-item clickable v-ripple to="/saved">
                <q-item-section avatar>
                  <q-icon name="bookmarks" />
                </q-item-section>

                <q-item-section class="text-bold">Saved</q-item-section>

                <q-item-section top side class="q-ma-sm">
                  <q-badge color="orange">
                    {{ savedDataLength }}
                  </q-badge>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="notifications" />
                </q-item-section>

                <q-item-section class="text-bold">Notifications</q-item-section>

                <q-item-section top side class="q-ma-sm">
                  <q-badge color="orange">
                    0
                  </q-badge>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple @click="showPersonalSubMenu = true">
                <q-item-section avatar>
                  <q-icon name="account_circle" />
                </q-item-section>

                <q-item-section class="text-bold">Personal</q-item-section>

                <q-item-section top side class="q-ma-sm">
                  <q-icon name="navigate_next" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple @click="showSettingsSubMenu = true">
                <q-item-section avatar>
                  <q-icon name="settings" />
                </q-item-section>

                <q-item-section class="text-bold">Settings</q-item-section>

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
      <personal-sub-menu
        :showSubMenu="showPersonalSubMenu"
        @goBack="closeSubMenu"
      />
      <settings-sub-menu
        :showSubMenu="showSettingsSubMenu"
        @goBack="closeSubMenu"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Menu",
  components: {
    "personal-sub-menu": () =>
      import("components/menu/sub_menu/PersonalSubMenu.vue"),
    "settings-sub-menu": () =>
      import("components/menu/sub_menu/SettingsSubMenu.vue"),
  },
  computed: {
    ...mapGetters("main", ["getUser"]),
    ...mapGetters("main", ["isDarkMode"]),
    savedDataLength() {
      return this.$store.state.main.savedData.length;
      //return 0
    },
  },
  data() {
    return {
      success: "",
      opened: false,
      showPersonalSubMenu: false,
      showSettingsSubMenu: false,
    };
  },

  methods: {
    closeMenu() {
      this.showPersonalSubMenu = false;
      this.showSettingsSubMenu = false;
      this.opened = !this.opened;
    },
    closeSubMenu() {
      this.showPersonalSubMenu = false;
      this.showSettingsSubMenu = false;
      this.opened = !this.opened;
    },
    darkMode() {
      //functionality: Toggles theme of the website
      //this.$q.dark.toggle();
      this.$store.dispatch("main/toggleTheme");
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
          this.$auth
            .signOut()
            .then(() => {
              this.success = "Logged out successfully";
              this.$store.dispatch("main/fetchUser");
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
  },
};
</script>
