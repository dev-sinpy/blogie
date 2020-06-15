<template>
  <div>
    <q-menu v-model="showSubMenu" no-parent-event>
      <q-card flat style="height: 400px; width: 350px;">
        <q-card-section class="row space-between q-pa-none">
          <q-btn @click="goBack" icon="navigate_before" size="md" dense flat />
          <q-space />
          <div class="q-ma-sm text-h6 text-bold">Settings</div>
          <q-space />
          <q-btn icon="info" size="md" dense flat />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-list>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="edit" />
              </q-item-section>
              <q-item-section class="text-bold">Edit Layout</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="edit" />
              </q-item-section>
              <q-item-section class="text-bold">Customise Theme</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SettingsSubMenu",
  props: ["showSubMenu"],
  components: {},
  computed: {},
  data() {
    return {
      success: "",
    };
  },
  methods: {
    goBack() {
      this.$emit("goBack");
    },
  },
};
</script>
