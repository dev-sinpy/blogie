<template>
  <!-- Sidebar for dashboard. -->
  <q-drawer
    v-model="show"
    persistent
    show-if-above
    side="left"
    :width="220"
    :breakpoint="500"
    bordered
    content-class="accent"
  >
    <q-scroll-area class="fit">
      <!-- tags-section -->
      <q-list v-if="!status.tags_loading">
        <q-item>
          <q-item-section>
            <q-item-label>
              <span class="text-bold">Tags</span>
            </q-item-label>
          </q-item-section>
          <q-item-section top side>
            <div>
              <q-btn
                @click="interestsPopup()"
                size="16px"
                flat
                dense
                round
                icon="edit"
              />
            </div>
          </q-item-section>
        </q-item>
        <q-separator />
        <tags v-for="tag in tags" v-bind:tag="tag" :key="tag.tag" />
      </q-list>

      <div v-else>
        <q-skeleton square height="20em" />
      </div>
      <!--end tags-section -->
    </q-scroll-area>
  </q-drawer>
  <!-- end left sidebar -->
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  name: "LeftSidebar",
  props: ["show"],
  components: {
    tags: require("components/Tags.vue").default, //tags to display in sidebar
  },
  created() {
    this.$q.dark.set(true); //set default to dark theme
  },

  methods: {
    displayPopup(popup) {
      /*
      params: popup
      type: String
      */

      this.$store.commit("main/SET_POPUP", { popup: popup, flag: true });
    },

    interestsPopup() {
      /*
      Functionality: Displays a popup and fetches all the tags from the server.
      */
      this.$store.commit("main/SET_STATUS", {
        status: "popup_loading",
        flag: true,
      });
      //this.$store.dispatch("main/fetchDefaultTags");
      this.$store.commit("main/SET_POPUP", {
        popup: "interestsPopup",
        flag: true,
      });
      this.$store.commit("main/SET_STATUS", {
        status: "popup_loading",
        flag: false,
      });
    },

    darkMode() {
      //functionality: Toggles theme of the website
      this.$q.dark.toggle();
      this.$store.dispatch("main/setDarkMode");
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

  computed: {
    ...mapState("main", ["tags"]),
    ...mapGetters("main", ["isAuthenticated"]),
    ...mapGetters("main", ["status"]),
    ...mapGetters("main", ["isDarkMode"]),
    dark: {
      get() {
        return this.isDarkMode;
      },
      set(val) {
        this.$q.dark.toggle();
        this.$store.dispatch("main/setDarkMode");
      },
    },
  },
  data() {
    return {
      success: null,
      error: null,
      popup: false,
    };
  },
};
</script>
