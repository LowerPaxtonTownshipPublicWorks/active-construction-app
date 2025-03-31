<script setup>
import "@esri/calcite-components/dist/components/calcite-tab-nav";
import "@esri/calcite-components/dist/components/calcite-tab-title";
import { storeToRefs } from "pinia";

import { useProjectsStore } from "@/stores/projects";
const projectsStore = useProjectsStore();
const { getTotalProjectsCount } = storeToRefs(projectsStore)

import { useDetoursStore } from "@/stores/detours";
const detoursStore = useDetoursStore();
const { getTotalDetoursCount } = storeToRefs(detoursStore);

</script>
<template>
 <calcite-tab-nav slot="title-group" scale="m">
        <calcite-tab-title >Projects ({{ getTotalProjectsCount }})</calcite-tab-title>
        <calcite-tab-title >Detours ({{ getTotalDetoursCount }})</calcite-tab-title>
      </calcite-tab-nav>
</template>