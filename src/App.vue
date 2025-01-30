<script setup>
import "@esri/calcite-components/dist/components/calcite-shell";

import LeftSidebar from "@/components/Left Sidebar/LeftSidebar.vue";
import RightSidebar from "@/components/Right Sidebar/RightSidebar.vue";
import NavigationBar from "@/components/NavigationBar.vue";

</script>

<template>
  <calcite-shell>
    <NavigationBar/>
    <LeftSidebar/>
    <RightSidebar/>
  </calcite-shell>

</template>

<style>

</style>
