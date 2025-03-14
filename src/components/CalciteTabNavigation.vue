<script setup>
import "@esri/calcite-components/dist/components/calcite-tab-nav";
import "@esri/calcite-components/dist/components/calcite-tab-title";
import { storeToRefs } from "pinia";

import { useProjectsStore } from "@/stores/projects";
const projectsStore = useProjectsStore();
const { getProjectsCount } = storeToRefs(projectsStore)

import { useDetoursStore } from "@/stores/detours";
const detoursStore = useDetoursStore();
const { getDetoursCount } = storeToRefs(detoursStore);

</script>
<template>
 <calcite-tab-nav slot="title-group">
        <calcite-tab-title icon-start="square-hash-filled-area">Projects ({{ getProjectsCount }})</calcite-tab-title>
        <calcite-tab-title icon-start="location-sharing-f">Detours ({{ getDetoursCount }})</calcite-tab-title>
      </calcite-tab-nav>
</template>