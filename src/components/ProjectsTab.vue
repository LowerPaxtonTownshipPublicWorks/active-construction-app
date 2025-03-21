<script setup>
import { storeToRefs } from "pinia";

import "@esri/calcite-components/dist/components/calcite-list";
import "@esri/calcite-components/dist/components/calcite-list-item";
import "@esri/calcite-components/dist/components/calcite-list-item-group";
import "@esri/calcite-components/dist/components/calcite-tab";
import "@esri/calcite-components/dist/components/calcite-icon";

import { useProjectsStore } from "@/stores/projects";
const projectsStore = useProjectsStore();
const { projectsActive, isProjectsLoading} =
  storeToRefs(projectsStore);

import { useApplicationStore } from "@/stores/application";
const { createFlowItem } = useApplicationStore();
</script>

<template>
  <calcite-tab selected>
    <calcite-panel :loading="isProjectsLoading">
      <calcite-list scale="m">
        <calcite-list-item-group heading="Active Projects:">
          <calcite-list-item
          v-for="(project, index) in projectsActive"
          :key="index"
          :label="project.attributes.projectName"
          :description="project.attributes.projectAbstract"
          @calciteListItemSelect="createFlowItem(project)"
          >
        </calcite-list-item> 
      </calcite-list-item-group>
    </calcite-list>
    <calcite-list>
      <calcite-list-item-group heading="Upcoming Projects:">
        
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
