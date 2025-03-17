<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useProjectsStore } from "@/stores/projects";
const { fetchProjects } = useProjectsStore();

import { useDetoursStore } from "@/stores/detours";
const { fetchDetours } = useDetoursStore();

import { useFlowsStore } from "@/stores/flows";
const flowsStore = useFlowsStore();
const { projectFlows, isHomeFlowSelected } = storeToRefs(flowsStore);
const { createFlowItem, clearFlowItems } = flowsStore;

import CalciteTabNavigation from '@/components/CalciteTabNavigation.vue'
import CalciteFlowItemNavigation from '@/components/CalciteFlowItemNavigation.vue'
import CalciteProjectsTab from '@/components/CalciteProjectsTab.vue'
import CalciteDetoursTab from '@/components/CalciteDetoursTab.vue'
import ProjectMap from "./components/ProjectMap.vue";
import ProjectText from "./components/ProjectText.vue";

import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-tabs";
import "@esri/calcite-components/dist/components/calcite-flow";
import "@esri/calcite-components/dist/components/calcite-flow-item";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-table";
import "@esri/calcite-components/dist/components/calcite-table-row";
import "@esri/calcite-components/dist/components/calcite-table-cell";
import "@esri/calcite-components/dist/components/calcite-notice";

onMounted(async () => {
  try {
    await fetchProjects();
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
      </calcite-flow-item>
      <calcite-flow-item v-for="flow in projectFlows" selected :heading=flow.attributes.projectName
        :description=flow.attributes.projectAbstract @calciteFlowItemBack="clearFlowItems">
        <div class="flowContentWrapper">
          <ProjectMap></ProjectMap>
          <ProjectText></ProjectText>
        </div>
        </calcite-flow-item>
      </calcite-flow>
  </calcite-shell>
</template>

<style>
:root {
  --brand-yellow: #ffc900;
}

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
