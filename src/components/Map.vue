<script setup>
import { computed, ref, defineProps } from "vue";
import { storeToRefs } from "pinia";


import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-fullscreen";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-expand";
import "@arcgis/map-components/components/arcgis-placement";
import "@esri/calcite-components/dist/components/calcite-loader";
import "@esri/calcite-components/dist/components/calcite-chip";

import "@arcgis/core/geometry/Polygon";
import Polygon from "@arcgis/core/geometry/Polygon";
import Polyline from "@arcgis/core/geometry/Polyline";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";

import { useApplicationStore } from "@/stores/application";
const applicationStore = useApplicationStore();
const { projectFlows, themeMode } = storeToRefs(applicationStore);

const arcgisMapComponent = ref(null);
const activeFlowItem = projectFlows.value[0]
const featureType = activeFlowItem.type
const isMapLoading = ref(true);

function setupMap () {
  let handle = reactiveUtils.when(() => !arcgisMapComponent.value.view.updating, () => {
    toggleLayerViews()
    zoomToFeature(activeFlowItem)
    setTimeout(() => isMapLoading.value = false, 375 )
    handle.remove()
  });
}

function toggleLayerViews () {
  const layerViewsCollection = arcgisMapComponent.value.view.layerViews

  const layerVisibilityMapping = {
    'project-active': 'Construction Projects [Active]',
    'project-upcoming': 'Construction Projects [Planned]',
    'detour-active': 'Detour Routes',
    'detour-upcoming': 'Detour Routes'
  }

  const layerToShow = layerVisibilityMapping[featureType]

  layerViewsCollection.forEach((layerView) => {
    layerView.visible = false
    if (layerView.layer.title === layerToShow) {
      layerView.visible = true
    }
  })
}

function zoomToFeature(feature) {

  let geometry;

  if (featureType.includes('detour')) {
    geometry = new Polyline({
      paths: feature.geometry.paths,
      spatialReference: {wkid: 3857}
    })
  }

  if (featureType.includes('project')) {
    geometry = new Polygon({
      rings: feature.geometry.rings,
      spatialReference: { wkid: 3857 },
    });
  } 

  arcgisMapComponent.value.view.goTo({
    target: geometry.extent,
  });
}

const projectStatusText = computed(() => {
  if (activeFlowItem.type.includes("active")) return "Active"
  if (activeFlowItem.type.includes("upcoming")) return "Planned"
})


</script>

<template>
  <calcite-panel :loading="isMapLoading">
    <arcgis-map 
    ref="arcgisMapComponent" 
    item-id="57d6ea3f15164a06b6223986cef38c19"
    @arcgisViewReadyChange="setupMap"
    class="calcite-mode-dark"
     >
      <arcgis-placement position="top-left">
        <calcite-chip  scale="m"  icon="information">{{ projectStatusText }}</calcite-chip>
      </arcgis-placement>
      <arcgis-fullscreen v-if="featureType.includes('project')"  position="top-right" />
      <arcgis-expand v-if="featureType.includes('detour')" label="Map Legend" position="top-right">
        <arcgis-legend />
      </arcgis-expand>
    </arcgis-map>
  </calcite-panel>
</template>

<style scoped>

arcgis-map {
    height: 100%;
  }

</style>
