<script setup>
import { storeToRefs } from "pinia";

import "@esri/calcite-components/dist/components/calcite-list";
import "@esri/calcite-components/dist/components/calcite-list-item";
import "@esri/calcite-components/dist/components/calcite-tab";

import { useProjectsStore } from "@/stores/projects";
const projectsStore = useProjectsStore();
const { projects, isProjectsLoading, getProjectsCount } =
  storeToRefs(projectsStore);

import { useFlowsStore } from "@/stores/flows";
const { createFlowItem } = useFlowsStore();
</script>

<template>
  <calcite-tab selected>
    <calcite-list scale="m">
      <calcite-list-item
        v-for="project in projects"
        :key="project.attributes.OBJECTID"
        :label="project.attributes.projectName"
        :description="project.attributes.projectAbstract"
        @calciteListItemSelect="createFlowItem(project)"
      >
      </calcite-list-item>
    </calcite-list>
  </calcite-tab>
</template>
