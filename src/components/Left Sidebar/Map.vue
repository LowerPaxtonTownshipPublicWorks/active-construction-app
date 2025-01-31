<script setup>
import "@arcgis/map-components/dist/components/arcgis-map";

import {useSchoolsStore} from "@/stores/schools";

const schoolsStore = useSchoolsStore();

const getSchools = async ({ target}) => {
  const mapView = await target.extent
  const map = await target.map
  const mapLayers = await map.layers
  const schoolsFeatureLayer = await mapLayers.items[0]

  if(schoolsFeatureLayer) {
  const query = await schoolsFeatureLayer.createQuery()
  query.where = '1=1'
  query.geometry = mapView
  schoolsFeatureLayer.queryFeatures(query).then(results => {
  schoolsStore.clearSchoolsStore()
    for (let feature of results.features) {
      schoolsStore.addSchool(feature.attributes)
    }
  })
  }
}


</script>

<template>
  <arcgis-map
      @arcgisViewChange="getSchools"
      item-id="5010b78f7a8d46b0ab7b4c10b46bdc87"

  ></arcgis-map>
</template>

<style scoped>
arcgis-map {
  width: 100%;
  height: 100%;
}
</style>