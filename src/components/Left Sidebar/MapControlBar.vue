<script setup>
import "@esri/calcite-components/dist/components/calcite-slider";
import "@esri/calcite-components/dist/components/calcite-label";

</script>

<template>
  <div id="mapControlBar">
  <calcite-label>
    Commute Distance (Minutes)
  <calcite-slider
      layout="inline"
      value="30"
      fill-placement="start"
      label-handles
      label-ticks
      max-value="60"
      max="60"
      snap
      step="1"
      ticks="15">
  </calcite-slider>
  </calcite-label>
  </div>

</template>

<style scoped>

#mapControlBar {
  display: flex;
  padding: 1.5rem;
  justify-content: center;
}

calcite-slider {
  width: 300px;
}

</style>