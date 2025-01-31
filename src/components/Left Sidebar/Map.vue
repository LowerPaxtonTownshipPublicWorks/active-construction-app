<script setup>
import "@arcgis/map-components/dist/components/arcgis-map";

import {useSchoolsStore} from "@/stores/schools";

const schoolsStore = useSchoolsStore();

const fetchSchools = async ({target}) => {
  const {extent, map} = target
  const schoolsFeatureLayer = map.layers.items.find((layer) => layer.title === "Public Schools")

  if (!schoolsFeatureLayer) return

  const query = schoolsFeatureLayer.createQuery()
  query.where = '1=1'
  query.geometry = extent

  try {
    const results = await schoolsFeatureLayer.queryFeatures(query)
    schoolsStore.clearSchoolsStore()
    for (let feature of results.features) {
      schoolsStore.addSchool(feature.attributes)
    }
  } catch (error) {
    console.error(error)
  }
}


</script>

<template>
  <arcgis-map
      @arcgisViewChange="fetchSchools"
      item-id="5010b78f7a8d46b0ab7b4c10b46bdc87"

  ></arcgis-map>
</template>

<style scoped>
arcgis-map {
  width: 100%;
  height: 100%;
}
</style>