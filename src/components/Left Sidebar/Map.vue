<script setup>
import "@arcgis/map-components/dist/components/arcgis-map";
</script>

<template>
  <arcgis-map center="-76.3065, 40.0375" zoom="15" basemap="gray"></arcgis-map>
</template>

<style scoped>
arcgis-map {
  width: 100%;
  height: 100%;
}
</style>