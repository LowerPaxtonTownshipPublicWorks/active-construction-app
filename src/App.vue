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

import TabNavigation from '@/components/TabNavigation.vue'
import FlowNavigation from '@/components/FlowNavigation.vue'
import ProjectsTab from '@/components/ProjectsTab.vue'
import DetoursTab from '@/components/DetoursTab.vue'
import ProjectsMap from "./components/ProjectsMap.vue";
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
  } catch (error) {
    console.error(error);
  }
});

</script>

<template>
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
        :heading="flow.attributes.projectName || flow.attributes.detourName"
        :description="flow.attributes.projectAbstract || 'Detour Flow Subtitle Placeholder'"
        @calciteFlowItemBack="clearFlowItems">
        <div class="flowContentWrapper">
          <ProjectsMap />
          <ProjectsTextPanel />
        </div>
      </calcite-flow-item>
    </calcite-flow>
  </calcite-shell>
</template>

<style scoped>

.calcite-mode-dark calcite-tabs {
  --calcite-color-brand: var(--calcite-color-status-warning);
  --calcite-color-focus: var(--calcite-color-status-warning);
}

.calcite-mode-light calcite-tabs {
  --calcite-color-brand: var(--calcite-color-text-2);
  --calcite-color-focus: var(--calcite-color-text-2);
}

.flowContentWrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
