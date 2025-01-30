<script setup>
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-navigation";
import "@esri/calcite-components/dist/components/calcite-navigation-logo";
import "@arcgis/map-components/dist/components/arcgis-map";
</script>

<template>
  <calcite-shell>
    <calcite-navigation slot="header">
      <calcite-navigation-logo slot="logo" heading="ArcGIS Vue Dependency Template" description="Ben Beattie" icon="map">

      </calcite-navigation-logo>
    </calcite-navigation>
    <arcgis-map center="-76.3065, 40.0375" zoom="15" basemap="gray"></arcgis-map>
  </calcite-shell>

</template>

<style>

arcgis-map {
  width: 100%;
  height: 100%;
}

</style>
