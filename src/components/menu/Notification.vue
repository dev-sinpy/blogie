<template>
  <q-btn
    class="q-mr-sm"
    icon="notifications"
    :color="isDarkMode ? 'white' : 'black'"
    flat
  >
    <q-menu>
      <q-card flat style="height: 300px; width: 250px;">
        <q-card-section class="text-bold text-center">
          No Notifications
        </q-card-section>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Notification",
  components: {},
  computed: {
    ...mapGetters("main", ["isDarkMode"]),
  },
  data() {
    return {};
  },
};
</script>
