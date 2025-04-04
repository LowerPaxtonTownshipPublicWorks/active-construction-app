<script setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";

import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-fullscreen";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-expand";
import "@arcgis/map-components/components/arcgis-placement";
import "@esri/calcite-components/dist/components/calcite-loader";
import "@esri/calcite-components/dist/components/calcite-chip";

import Polygon from "@arcgis/core/geometry/Polygon";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter.js";
import Query from "@arcgis/core/rest/support/Query.js";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";

import { useApplicationStore } from "@/stores/application";
const applicationStore = useApplicationStore();
const { projectFlows, activeBreakpoint } = storeToRefs(applicationStore);

const arcgisMapComponent = ref(null);
const isMapLoading = ref(true);

const activeFlowItem = projectFlows.value[0]
const featureType = activeFlowItem.type
let detourExtent, projectGeometry;

function setupMap() {
  let handle = reactiveUtils.when(() => !arcgisMapComponent.value.view.updating, () => {
    toggleLayerViews().then(() => zoomToFeatures());
    setTimeout(() => isMapLoading.value = false, 400)
    handle.remove()
  });
}

async function toggleLayerViews() {
  const layerViewsCollection = arcgisMapComponent.value.view.layerViews

  const layerVisibilityMapping = {
    'project-active': 'Construction Projects [Active]',
    'project-upcoming': 'Construction Projects [Planned]',
    'detour-active': 'Detour Routes',
    'detour-upcoming': 'Detour Routes'
  }

  const layerToShow = layerVisibilityMapping[featureType]

  for (const layerView of layerViewsCollection) {
    layerView.visible = false
    if (layerView.layer.title === layerToShow) {
      layerView.visible = true

      if (layerToShow.includes('Project')) {
        const groupLayerView = layerView
        groupLayerView.layerViews.forEach((layerView) => {
          layerView.filter = new FeatureFilter({
          where: `projectName = '${activeFlowItem.attributes.projectName}'`,
        })
        })
      }

      else if (layerToShow.includes('Detour')) {
        layerView.filter = new FeatureFilter({
          where: `detourSharedID = '${activeFlowItem.attributes.detourSharedID}'`,
        })

        const query = new Query({
          where: `detourSharedID = '${activeFlowItem.attributes.detourSharedID}'`
        });

        detourExtent = await layerView.layer.queryExtent(query);
      }
    }
  }
}

function zoomToFeatures() {

  if (featureType.includes('project')) {

    projectGeometry = new Polygon({
      rings: activeFlowItem.geometry.rings,
      spatialReference: { wkid: 3857 },
    });

    zoom(projectGeometry.extent)
  }

  if (featureType.includes('detour')) { zoom(detourExtent.extent) }

}

function zoom(target) { arcgisMapComponent.value.view.goTo({ target }) }

const projectStatusText = computed(() => {
  if (activeFlowItem.type.includes("active")) return "Active"
  if (activeFlowItem.type.includes("upcoming")) return "Planned"
})


</script>

<template>
  <calcite-panel :loading="isMapLoading">
    <arcgis-map ref="arcgisMapComponent" item-id="57d6ea3f15164a06b6223986cef38c19" @arcgisViewReadyChange="setupMap"
      class="calcite-mode-dark">
      <arcgis-placement position="top-left">
        <calcite-chip scale="m" icon="information">{{ projectStatusText }}</calcite-chip>
      </arcgis-placement>
      <arcgis-fullscreen v-if="featureType.includes('project')" position="top-right" />
      <arcgis-expand v-if="featureType.includes('detour') && activeBreakpoint == 's'" label="Map Legend" position="top-right">
        <arcgis-legend />
      </arcgis-expand>
      <arcgis-legend v-if="featureType.includes('detour') && activeBreakpoint != 's'" position="top-right" />
    </arcgis-map>
  </calcite-panel>
</template>

<style scoped>

calcite-panel {
  height: 100%;
  flex-grow: 1;
}

.calcite-mode-dark arcgis-expand arcgis-legend calcite-action calcite-icon {
  --calcite-icon-color: var(--calcite-color-text-3) !important;
    }

</style>