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

const arcgisMapComponent = ref(null);
const activeFlowItem = projectFlows.value[0]
const isMapLoading = ref(true);

function setupMap () {
  let handle = reactiveUtils.when(() => !arcgisMapComponent.value.view.updating, () => {
    toggleLayerViews()
    zoomToFeature()
    setTimeout(() => isMapLoading.value = false, 375 )
    handle.remove()
  });
}

function toggleLayerViews () {
  const layerViewsCollection = arcgisMapComponent.value.view.layerViews
  const featureType = activeFlowItem.type

  const layerVisibilityMapping = {
    'project-active': 'Construction Projects [Active]',
    'project-upcoming': 'Construction Projects [Planned]',
    'detour-active': '',
    'detour-upcoming': ''
  }

  const layerToShow = layerVisibilityMapping[featureType]

  layerViewsCollection.forEach((layerView) => {
    layerView.visible = false
    if (layerView.type == 'group' && layerView.layer.title === layerToShow) {
      layerView.visible = true
    }
  })
}

function zoomToFeature() {
  const polygon = new Polygon({
    rings: activeFlowItem.geometry.rings,
    spatialReference: { wkid: 3857 },
  });

  arcgisMapComponent.value.view.goTo({
    target: polygon.extent,
  });
}

const projectStatusText = computed(() => {
  if (activeFlowItem.type.includes("active")) return "Active"
  if (activeFlowItem.type.includes("upcoming")) return "Planned"
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
    ref="arcgisMapComponent" 
    item-id="57d6ea3f15164a06b6223986cef38c19"
    @arcgisViewReadyChange="setupMap"
    class="calcite-mode-dark"
     >
      <arcgis-placement position="top-left">
        <calcite-chip :class="themeMode == 'dark' ? 'dark-chip' : 'light-chip'" scale="m"  icon="information">{{ projectStatusText }}</calcite-chip>
      </arcgis-placement>
      <arcgis-fullscreen  class="fullscreen calcite-mode-dark" position="top-right" />
    </arcgis-map>
  </calcite-panel>
</template>

<style scoped>

.dark-chip {
  --calcite-chip-background-color: #242424 !important;
  --calcite-chip-text-color: white !important;
}

.light-chip {
  --calcite-chip-background-color: white !important;
  --calcite-chip-text-color: #6a6a6a !important;
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
