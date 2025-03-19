<script setup>
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-icon";

import { storeToRefs } from "pinia";

import { useApplicationStore } from "@/stores/application";
const applicationStore = useApplicationStore();
const { theme } = storeToRefs(applicationStore);
const { changeTheme } = applicationStore;

</script>

<template>

  <div slot="header-content" id="main-flow-header-wrapper">
    <calcite-icon scale="l" icon="exclamation-mark-triangle"></calcite-icon>
    <div id="main-flow-header-text-wrapper">
      <p>Construction Projects</p>
      <p>Lower Paxton Township</p>
    </div>
  </div>
  <calcite-action disabled="" slot="header-actions-end" scale="l" icon="map"></calcite-action>
  <calcite-action @click="changeTheme(theme)" slot="header-actions-end" scale="l" :icon="theme == 'dark' ? 'brightness' : 'moon'"></calcite-action>
</template>

<style>

calcite-icon[icon="exclamation-mark-triangle"] {
  --calcite-icon-color: var(--calcite-color-status-warning)
}

calcite-action {
  --calcite-color-focus: var(--calcite-color-status-warning);
}

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
    color: var(--calcite-color-text-1);
    font-size: 1rem;
    font-weight: 500;
  }
}
</style>
