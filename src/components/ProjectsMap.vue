<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";

import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-fullscreen";
import "@esri/calcite-components/dist/components/calcite-loader";

import "@arcgis/core/geometry/Polygon";
import Polygon from "@arcgis/core/geometry/Polygon";

import { useApplicationStore } from "@/stores/application";
const applicationStore = useApplicationStore();
const { projectFlows } = storeToRefs(applicationStore);

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
    <arcgis-map ref="mapView" item-id="57d6ea3f15164a06b6223986cef38c19" @arcgisViewReadyChange="zoomToProject">
      <arcgis-fullscreen class="fullscreen" position="top-right" />
    </arcgis-map>
  </calcite-panel>
</template>

<style scoped>

calcite-panel {
  height: 35%;
  --calcite-scrim-background: rgba(0, 0, 0, 0.1);
  & arcgis-map {
    height: 100%;
  }
}

.calcite-mode-dark .fullscreen {
  --calcite-color-focus: var(--calcite-color-status-warning);
}

.calcite-mode-light .fullscreen {
  --calcite-color-focus: var(--calcite-color-text-2);
}

.calcite-mode-dark calcite-panel {
  --calcite-loader-progress-color: var(--calcite-color-status-warning);
  & arcgis-map {
    --calcite-color-brand: var(--calcite-color-status-warning);
  }
}

.calcite-mode-light calcite-panel {
  --calcite-loader-progress-color: var(--calcite-color-text-2);
  & arcgis-map {
    --calcite-color-brand: var(--calcite-color-text-2);
  }
}
</style>
