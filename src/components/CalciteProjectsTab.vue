<script setup>
import { storeToRefs } from "pinia";

import "@esri/calcite-components/dist/components/calcite-list";
import "@esri/calcite-components/dist/components/calcite-list-item";
import "@esri/calcite-components/dist/components/calcite-tab";
import "@esri/calcite-components/dist/components/calcite-icon";

import { useProjectsStore } from "@/stores/projects";
const projectsStore = useProjectsStore();
const { projects, isProjectsLoading, getProjectsCount } =
  storeToRefs(projectsStore);

import { useFlowsStore } from "@/stores/flows";
const { createFlowItem } = useFlowsStore();
</script>

<template>
  <calcite-tab selected>
    <!-- <div class="sortTextWrapper">
      <calcite-icon icon="sort-descending" scale="s"></calcite-icon>
      <p>Projects are sorted by start date (latest first).</p>
    </div> -->
    <calcite-list scale="m">
      <calcite-list-item
        v-for="(project, index) in projects"
        :key="index"
        :label="project.attributes.projectName"
        :description="project.attributes.projectAbstract"
        @calciteListItemSelect="createFlowItem(project)"
      >
      </calcite-list-item>
    </calcite-list>
  </calcite-tab>
</template>

<style scoped>

.sortTextWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding-block-start: 3px;
  padding-block-end: 11px;

  & p {
    margin: 0px;
    font-size: 0.75rem;
  }
}


</style>
