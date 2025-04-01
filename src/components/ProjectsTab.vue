<script setup>
import { storeToRefs } from "pinia";

import "@esri/calcite-components/dist/components/calcite-list";
import "@esri/calcite-components/dist/components/calcite-list-item";
import "@esri/calcite-components/dist/components/calcite-list-item-group";
import "@esri/calcite-components/dist/components/calcite-tab";
import "@esri/calcite-components/dist/components/calcite-icon";

import Notice from "./Notice.vue";

import { useProjectsStore } from "@/stores/projects";
const projectsStore = useProjectsStore();
const { projectsActive, projectsUpcoming, getActiveProjectsCount, getUpcomingProjectsCount, isProjectsLoading} = storeToRefs(projectsStore);

import { useApplicationStore } from "@/stores/application";
const applicationStore = useApplicationStore();
const { activeBreakpoint } = storeToRefs(applicationStore);
const { createFlowItem } = useApplicationStore();

function setProjectIcon(abstractText) {
  let calciteIcon;
  const waterKeywords = ["SEWER", "STORM", "WATER", "DRAIN", "SANITARY"];
  const pavingKeywords = ["ROAD", "PAVING"];
  const compareText = abstractText.toUpperCase()

  if (waterKeywords.some(keyword => compareText.includes(keyword))) {calciteIcon = 'water-drop'}
  else if (pavingKeywords.some(keyword => compareText.includes(keyword))) {calciteIcon = 'bulldozer'}
  else {calciteIcon = 'wrench'}
  return calciteIcon
}


</script>

<template>
  <calcite-tab selected>
    <calcite-panel :loading="isProjectsLoading">
      <calcite-list :scale="activeBreakpoint == 'l' ? 'l' : 'm'">
        <calcite-list-item-group :heading="`Active Projects (${getActiveProjectsCount})`">
          <Notice v-if="projectsActive.length == 0" msg="You're all clear — no active projects!" />
          <calcite-list-item
          v-for="(project, index) in projectsActive"
          :key="index"
          :icon-start="setProjectIcon(project.attributes.projectAbstract)"
          :label="project.attributes.projectName"
          :description="project.attributes.projectAbstract"
          @calciteListItemSelect="createFlowItem(project)"
          >
        </calcite-list-item> 
      </calcite-list-item-group>
    </calcite-list>
    <calcite-list :scale="activeBreakpoint == 'l' ? 'l' : 'm'">
      <calcite-list-item-group :heading="`Upcoming Projects (${getUpcomingProjectsCount})`">
        <Notice v-if="projectsUpcoming.length == 0" msg="You're all clear — no projects planned!" />
        <calcite-list-item
        v-for="(project, index) in projectsUpcoming"
        :key="index"
        unavailable=""
        :icon-start="setProjectIcon(project.attributes.projectAbstract)"
        :label="project.attributes.projectName"
        :description="project.attributes.projectAbstract"
        @calciteListItemSelect="createFlowItem(project)"
        >
      </calcite-list-item> 
      </calcite-list-item-group>
    </calcite-list>
  </calcite-panel>
  </calcite-tab>
</template>

<style scoped>

calcite-tab {
  padding-inline: 0.125rem;
}

calcite-panel {
  height: 100%;
  --calcite-scrim-background: var(--calcite-color-background)
}


</style>
