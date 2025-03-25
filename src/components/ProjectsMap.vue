<script setup>
import { computed, ref, } from "vue";
import { storeToRefs } from "pinia";

import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";

import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-fullscreen";
import "@arcgis/map-components/components/arcgis-placement";
import "@esri/calcite-components/dist/components/calcite-loader";
import "@esri/calcite-components/dist/components/calcite-chip";

import "@arcgis/core/geometry/Polygon";
import Polygon from "@arcgis/core/geometry/Polygon";

import { useApplicationStore } from "@/stores/application";
const applicationStore = useApplicationStore();
const { projectFlows, themeMode } = storeToRefs(applicationStore);

const mapView = ref(null);
const isMapLoading = ref(true);

function setupMap () {
  let handle = reactiveUtils.when(() => !mapView.value.view.updating, () => {
    toggleLayerViews()
    zoomToFeature()
    setTimeout(() => isMapLoading.value = false, 400 )
    handle.remove()
  });
}

function toggleLayerViews () {
  const layerViewsCollection = mapView.value.view.layerViews
  const featureType = projectFlows.value[0].type

  const layerVisibilityMapping = {
    'project-active': 'Construction Projects [Planned]',
    'project-upcoming': 'Construction Projects [Active]'
  }

  const layerToHide = layerVisibilityMapping[featureType]

  layerViewsCollection.forEach((layerView) => {
    if (layerView.type == 'group' && layerView.layer.title === layerToHide) {
      layerView.layer.visible = false
    }
  })
}

function zoomToFeature() {
  const polygon = new Polygon({
    rings: projectFlows.value[0].geometry.rings,
    spatialReference: { wkid: 3857 },
  });

  mapView.value.view.goTo({
    target: polygon.extent,
  });
}

const projectStatusText = computed(() => {
  if (projectFlows.value[0].type.includes("active")) return "Active"
  if (projectFlows.value[0].type.includes("upcoming")) return "Planned"
})


</script>

<template>
  <head>
    <link 
    v-if="themeMode == 'light'" 
      rel="stylesheet" 
      href="https://js.arcgis.com/4.32/@arcgis/core/assets/esri/themes/light/main.css" 
    />
    <link
    v-else
      rel="stylesheet" 
      href="https://js.arcgis.com/4.32/@arcgis/core/assets/esri/themes/dark/main.css" 
    />
  </head>
  <calcite-panel :loading="isMapLoading">
    <arcgis-map 
    ref="mapView" 
    item-id="57d6ea3f15164a06b6223986cef38c19"
    @arcgisViewReadyChange="setupMap"
    class="calcite-mode-dark"
     >
      <arcgis-placement position="top-left">
        <calcite-chip :class="themeMode == 'dark' ? 'dark-chip' : 'calcite-mode-light'" scale="m"  icon="information">{{ projectStatusText }}</calcite-chip>
      </arcgis-placement>
      <arcgis-fullscreen  class="fullscreen calcite-mode-dark" position="top-right" />
    </arcgis-map>
  </calcite-panel>
</template>

<style scoped>

.dark-chip {
  --calcite-chip-background-color: rgb(36, 36, 36) !important;
  --calcite-chip-text-color: white !important;
}

.light-chip {
  --calcite-chip-background-color: rgb(36, 36, 36) !important;
  --calcite-chip-text-color: white !important;
}

calcite-panel {
  height: 35%;
  --calcite-scrim-background: var(--calcite-color-background);
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
