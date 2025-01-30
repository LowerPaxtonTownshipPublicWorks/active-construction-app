<script setup>
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-panel";
import SchoolCard from "@/components/Right Sidebar/SchoolCard.vue";

</script>

<template>

  <calcite-shell-panel slot="panel-end">
    <calcite-panel heading="Schools">
      <div id="calcite-card-group">
      <SchoolCard v-for="(school, index) in 50" :key="index"/>
      </div>
    </calcite-panel>
  </calcite-shell-panel>

</template>

<style scoped>

calcite-shell-panel {
  --calcite-shell-panel-min-width: 50vw;
}

#calcite-card-group {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

</style>