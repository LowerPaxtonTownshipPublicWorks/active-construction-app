<script setup>
import "@esri/calcite-components/dist/components/calcite-tile";

const props = defineProps({
  heading: String,
  description: String,
})


</script>

<template>
<calcite-tile
  :heading="props.heading"
  :description="props.description"
  icon="education"
>
</calcite-tile>
</template>

<style scoped>


</style>