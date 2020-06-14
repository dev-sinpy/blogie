<template>
  <!-- Sidebar for dashboard. -->
  <q-drawer
    persistent
    show-if-above
    v-model="left"
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
              <span class="text-h6 text-bold">Tags</span>
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
        <q-item
          v-for="tag in tags"
          :key="tag.tag"
          v-ripple
          clickable
          @click="tag.enabled = !tag.enabled"
        >
          <q-item-section side top>
            <q-checkbox keep-color color="accent" v-model="tag.enabled" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">{{ tag.tag }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <div v-else>
        <q-skeleton square height="40em" />
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
  props: ["left"],
  components: {},

  computed: {
    ...mapState("main", ["tags"]),
    ...mapGetters("main", ["isAuthenticated"]),
    ...mapGetters("main", ["status"]),
    ...mapGetters("main", ["isDarkMode"]),
  },

  data() {
    return {
      success: null,
      error: null,
      popup: false,
    };
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
  },
};
</script>
