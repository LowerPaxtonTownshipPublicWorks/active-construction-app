<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";

import "@arcgis/map-components/dist/components/arcgis-map";
import "@esri/calcite-components/dist/components/calcite-loader";

import "@arcgis/core/geometry/Polygon";
import Polygon from "@arcgis/core/geometry/Polygon";

import { useFlowsStore } from "@/stores/flows";
const flowsStore = useFlowsStore();
const { projectFlows } = storeToRefs(flowsStore);

const mapView = ref(null);
const isMapLoading = ref(true);

function zoomToProject() {
  const polygon = new Polygon({
    rings: projectFlows.value[0].geometry.rings,
    spatialReference: { wkid: 3857 },
  });

  mapView.value.view.goTo({
    target: polygon.extent,
  });
  isMapLoading.value = false;
}
</script>

<template>
  <calcite-panel :loading="isMapLoading">
    <arcgis-map
      ref="mapView"
      item-id="57d6ea3f15164a06b6223986cef38c19"
      @arcgisViewReadyChange="zoomToProject"
    ></arcgis-map>
  </calcite-panel>
</template>

<style >
calcite-panel {
    height: 35%;

  --calcite-loader-progress-color: var(--brand-yellow);
  --calcite-scrim-background: rgba(0, 0, 0, 0.1);

  & arcgis-map {
    height: 100%;
  }
}
</style>
