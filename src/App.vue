<script setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useResizeObserver } from '@vueuse/core'

import { useProjectsStore } from "@/stores/projects";
const { fetchProjects, fetchUpcomingProjects } = useProjectsStore();

import { useDetoursStore } from "@/stores/detours";
const { fetchActiveDetours, fetchUpcomingDetours } = useDetoursStore();

import { useApplicationStore } from "@/stores/application";
const applicationStore = useApplicationStore();
const { projectFlows, isHomeFlowSelected, themeMode, activeBreakpoint } = storeToRefs(applicationStore);
const { clearFlowItems, updateBreakpoint } = applicationStore;

import { formatDetourDescription } from "./composables/date.js"

import TabNavigation from '@/components/TabNavigation.vue'
import FlowNavigation from '@/components/FlowNavigation.vue'
import ProjectsTab from '@/components/ProjectsTab.vue'
import DetoursTab from '@/components/DetoursTab.vue'
import Map from "./components/Map.vue";
import ProjectsTextPanel from "./components/ProjectsTextPanel.vue";
import FlowFooter from "./components/FlowFooter.vue";

import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-tabs";
import "@esri/calcite-components/dist/components/calcite-flow";
import "@esri/calcite-components/dist/components/calcite-flow-item";

const wrapper = ref(null)
useResizeObserver(wrapper, () => {
  updateBreakpoint()
})

onMounted(async () => {
  try {
    await Promise.all([
      fetchUpcomingDetours(),
      fetchActiveDetours(),
      fetchUpcomingProjects(),
      fetchProjects()
    ])
  } catch (error) {
    console.error(error);
  }
});


</script>

<template>

  <head>
    <link rel="stylesheet" :href="themeMode === 'light' 
      ? 'https://js.arcgis.com/4.32/@arcgis/core/assets/esri/themes/light/main.css' 
      : 'https://js.arcgis.com/4.32/@arcgis/core/assets/esri/themes/dark/main.css'" />
  </head>
  <div ref="wrapper" id="appWrapper" :class="themeMode == 'dark' ? 'calcite-mode-dark' : 'calcite-mode-light'">
  <calcite-shell>
    <calcite-flow >
      <calcite-flow-item :selected="isHomeFlowSelected">
        <FlowNavigation />
        <calcite-tabs layout="center">
          <TabNavigation />
          <ProjectsTab />
          <DetoursTab />
        </calcite-tabs>
        <FlowFooter />
      </calcite-flow-item>
      <calcite-flow-item v-for="flow in projectFlows" selected
      :heading="flow.attributes.projectName || flow.attributes.detourName || 'Invalid Title'"
      :description="flow.attributes.projectAbstract || `${formatDetourDescription(flow.type, flow.attributes.startDate, flow.attributes.endDate)}` || 'Invalid Description'" @calciteFlowItemBack="clearFlowItems">
      <div class="flowContentWrapper" :class="activeBreakpoint == 's' ? 's' : 'm-l'">
        <Map />
        <ProjectsTextPanel v-if="!flow.type.includes('detour')" />
      </div>
    </calcite-flow-item>
  </calcite-flow>
</calcite-shell>
</div>
</template>

<style scoped>

#appWrapper {
  background-color: var(--calcite-color-foreground-2);
  background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.13' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
}

.flowContentWrapper {
  height: 100%;
}

.s {
  display: flex;
  flex-direction: column;
}

.m-l {
  display: flex;
  flex-direction: row;
}

</style>
