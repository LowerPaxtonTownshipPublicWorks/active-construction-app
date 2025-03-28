<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useProjectsStore } from "@/stores/projects";
const { fetchProjects, fetchUpcomingProjects } = useProjectsStore();

import { useDetoursStore } from "@/stores/detours";
const { fetchActiveDetours, fetchUpcomingDetours } = useDetoursStore();

import { useApplicationStore } from "@/stores/application";
const applicationStore = useApplicationStore();
const { projectFlows, isHomeFlowSelected, themeMode } = storeToRefs(applicationStore);
const { clearFlowItems } = applicationStore;

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


onMounted(async () => {
  try {
    await Promise.all([
      fetchUpcomingDetours(),
      fetchActiveDetours(),
      fetchUpcomingProjects(),
      fetchProjects()
    ])
    console.log(activeBreakpoint)
  } catch (error) {
    console.error(error);
  }
});

// import { useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  mobile: 0, // optional
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
})

// Can be 'mobile' or 'tablet' or 'laptop' or 'desktop'
const activeBreakpoint = breakpoints.active()



</script>

<template>

  <head>
    <link rel="stylesheet" :href="themeMode === 'light' 
      ? 'https://js.arcgis.com/4.32/@arcgis/core/assets/esri/themes/light/main.css' 
      : 'https://js.arcgis.com/4.32/@arcgis/core/assets/esri/themes/dark/main.css'" />
  </head>
  <calcite-shell :class="themeMode == 'dark' ? 'calcite-mode-dark' : 'calcite-mode-light'">
    <calcite-flow>
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
        <div class="flowContentWrapper">
          <Map />
          <ProjectsTextPanel v-if="!flow.type.includes('detour')" />
        </div>
      </calcite-flow-item>
    </calcite-flow>
  </calcite-shell>
</template>

<style scoped>

.flowContentWrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

</style>
