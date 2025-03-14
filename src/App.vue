<script setup>
import { ref, onMounted } from "vue";
import { useProjectsStore } from "@/stores/projects";
import { storeToRefs } from "pinia";

const projectsStore = useProjectsStore();
const { projects, isProjectsLoading, getProjectsCount } = storeToRefs(projectsStore);
const { fetchProjects } = projectsStore;

import CalciteTabNavigation from '@/components/CalciteTabNavigation.vue'

import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-list";
import "@esri/calcite-components/dist/components/calcite-list-item";

import "@esri/calcite-components/dist/components/calcite-flow";
import "@esri/calcite-components/dist/components/calcite-flow-item";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-icon";

onMounted(async () => {
  try {
    await fetchProjects();
  } catch (error) {
    return console.error(error);
  }
});

const isHomeFlowSelected = ref(true)
const projectFlows = ref([])

function createFlowItem(project) {
  const flowItem = {
    heading: project.attributes.projectName,
    description: project.attributes.projectAbstract
  }
  isHomeFlowSelected.value = false
  projectFlows.value.push(flowItem)
}

function clearFlowItems() {
  projectFlows.value = []
  isHomeFlowSelected.value = true
}


</script>

<template>
  <calcite-shell class="calcite-mode-dark">
    <calcite-flow>
      <calcite-flow-item :selected="isHomeFlowSelected">
        <div slot="header-content" id="main-flow-header-wrapper">
          <calcite-icon scale="l" icon="exclamation-mark-triangle"></calcite-icon>
          <div id="main-flow-header-text-wrapper">
            <p>Active Projects</p>
            <p>Lower Paxton Township</p>
          </div>
        </div>
        <calcite-action slot="header-actions-end" scale="l" icon="map"></calcite-action>
        <calcite-list scale="m">
          <calcite-list-item v-for="project in projects" :key="project.attributes.OBJECTID"
            :label="project.attributes.projectName" :description="project.attributes.projectAbstract"
            @calciteListItemSelect="createFlowItem(project)">
          </calcite-list-item>
        </calcite-list>
      </calcite-flow-item>
      <calcite-flow-item 
      v-for="flow in projectFlows" 
      selected 
      :heading=flow.heading
      :description=flow.description
      @calciteFlowItemBack="clearFlowItems"
      ></calcite-flow-item>
    </calcite-flow>
  </calcite-shell>
</template>

<style>
#main-flow-header-wrapper {
  display: flex;
  gap: 1.125rem;
  align-items: center;
}

#main-flow-header-text-wrapper {
  display: flex;
  flex-direction: column;

  & p {
    margin: 0px;
    padding: 0px;
    line-height: 1.25rem;
  }

  & p:nth-child(1) {
    color: white;
    font-size: 1rem;
    font-weight: 500;
  }
}
</style>
