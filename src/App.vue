<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useProjectsStore } from "@/stores/projects";
const projectsStore = useProjectsStore();
const { projects, isProjectsLoading, getProjectsCount } = storeToRefs(projectsStore);
const { fetchProjects } = projectsStore;

import { useFlowsStore } from "@/stores/flows";
const flowsStore = useFlowsStore();
const { projectFlows, isHomeFlowSelected } = storeToRefs(flowsStore);
const { createFlowItem, clearFlowItems } = flowsStore;

import CalciteTabNavigation from '@/components/CalciteTabNavigation.vue'
import CalciteFlowItemNavigation from '@/components/CalciteFlowItemNavigation.vue'

import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-list";
import "@esri/calcite-components/dist/components/calcite-list-item";
import "@esri/calcite-components/dist/components/calcite-tabs";
import "@esri/calcite-components/dist/components/calcite-tab";

import "@esri/calcite-components/dist/components/calcite-flow";
import "@esri/calcite-components/dist/components/calcite-flow-item";
import "@arcgis/map-components/dist/components/arcgis-map"

onMounted(async () => {
  try {
    await fetchProjects();
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
          <calcite-tab selected>
            <calcite-list scale="m">
              <calcite-list-item v-for="project in projects" :key="project.attributes.OBJECTID"
                :label="project.attributes.projectName" :description="project.attributes.projectAbstract"
                @calciteListItemSelect="createFlowItem(project)">
              </calcite-list-item>
            </calcite-list>
          </calcite-tab>
          <calcite-tab>
            <calcite-list scale="m">
                <calcite-list-item v-for="project in projects" :key="project.attributes.OBJECTID"
                  :label="project.attributes.projectName" :description="project.attributes.projectAbstract"
                  @calciteListItemSelect="createFlowItem(project)">
                </calcite-list-item>
            </calcite-list>
          </calcite-tab>
        </calcite-tabs>
      </calcite-flow-item>
      <calcite-flow-item v-for="flow in projectFlows" selected :heading=flow.attributes.projectName
        :description=flow.attributes.projectAbstract @calciteFlowItemBack="clearFlowItems">
        <arcgis-map item-id="cd8e7d1a32cd42f29a33a5e129b40d36"></arcgis-map>
        <p>Placeholder Project Text</p>
      </calcite-flow-item>
    </calcite-flow>
  </calcite-shell>
</template>

<style>
:root {
  --brand-yellow: #ffaf00;
}

calcite-tabs {
  --calcite-color-brand: var(--brand-yellow);
  --calcite-color-focus: var(--brand-yellow);
}

arcgis-map {
  height: 50%;
  width: 100%;
}
</style>
