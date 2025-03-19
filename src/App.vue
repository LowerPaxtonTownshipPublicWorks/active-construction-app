<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useProjectsStore } from "@/stores/projects";
const { fetchProjects } = useProjectsStore();

import { useDetoursStore } from "@/stores/detours";
const { fetchDetours, fetchUpcomingDetours } = useDetoursStore();

import { useFlowsStore } from "@/stores/flows";
const flowsStore = useFlowsStore();
const { projectFlows, isHomeFlowSelected } = storeToRefs(flowsStore);
const { clearFlowItems } = flowsStore;

import CalciteTabNavigation from '@/components/CalciteTabNavigation.vue'
import CalciteFlowItemNavigation from '@/components/CalciteFlowItemNavigation.vue'
import CalciteProjectsTab from '@/components/CalciteProjectsTab.vue'
import CalciteDetoursTab from '@/components/CalciteDetoursTab.vue'
import ProjectMap from "./components/ProjectMap.vue";
import ProjectText from "./components/ProjectText.vue";
import CalciteFlowItemFooter from "./components/CalciteFlowItemFooter.vue";

import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-tabs";
import "@esri/calcite-components/dist/components/calcite-flow";
import "@esri/calcite-components/dist/components/calcite-flow-item";

onMounted(async () => {
  try {
    await fetchProjects();
    await fetchUpcomingDetours()
    await fetchDetours();
  } catch (error) {
    return console.error(error);
  }
});

</script>

<template>
  <calcite-shell class="calcite-mode-dark">
    <calcite-flow>
      <calcite-flow-item :selected="isHomeFlowSelected">
        <CalciteFlowItemNavigation />
        <calcite-tabs layout="center">
          <CalciteTabNavigation />
          <CalciteProjectsTab />
          <CalciteDetoursTab />
        </calcite-tabs>
        <CalciteFlowItemFooter />
      </calcite-flow-item>
      <calcite-flow-item v-for="flow in projectFlows" selected
        :heading="flow.attributes.projectName || flow.attributes.detourName"
        :description="flow.attributes.projectAbstract || 'Detour Flow Subtitle Placeholder'"
        @calciteFlowItemBack="clearFlowItems">
        <div class="flowContentWrapper">
          <ProjectMap></ProjectMap>
          <ProjectText></ProjectText>
        </div>
      </calcite-flow-item>
    </calcite-flow>
  </calcite-shell>
</template>

<style scoped>
calcite-tabs {
  --calcite-color-brand: var(--brand-yellow);
  --calcite-color-focus: var(--brand-yellow);
}

.flowContentWrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
