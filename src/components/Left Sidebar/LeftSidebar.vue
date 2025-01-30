<script setup>
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-panel";
import MapControlBar from "@/components/Left Sidebar/MapControlBar.vue";
import Map from "@/components/Left Sidebar/Map.vue";
</script>

<template>
  <calcite-shell-panel slot="panel-start">
    <calcite-panel heading="Map">
    <Map/>
    <MapControlBar slot="footer"/>
    </calcite-panel>
  </calcite-shell-panel>
</template>

<style scoped>
calcite-shell-panel {
  --calcite-shell-panel-min-width: 50vw;
}

</style>