<template>
  <q-item v-ripple clickable @click="tag.enabled = !tag.enabled">
    <q-item-section side top>
      <q-checkbox keep-color color="accent" v-model="tag.enabled" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ tag.tag }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ["tag"],
  data() {
    return {};
  },
};
</script>
