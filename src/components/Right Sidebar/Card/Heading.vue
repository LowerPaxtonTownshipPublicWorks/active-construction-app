<script setup>

const props = defineProps({
  district: String,
})

</script>

<template>

  <div slot="heading">
    <span>{{props.district}}</span>
  </div>

</template>

<style scoped>

div[slot="heading"] {
  font-size: 0.75rem;
  display: flex;
  justify-content: center;
  background-color: var(--calcite-color-foreground-2);
  padding: 4px;
  margin-bottom: 10px;
}

</style>