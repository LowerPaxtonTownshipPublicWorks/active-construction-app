<script setup>
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-icon";

import { storeToRefs } from "pinia";

import { useApplicationStore } from "@/stores/application";
const applicationStore = useApplicationStore();
const { theme, activeBreakpoint } = storeToRefs(applicationStore);
const { changeTheme } = applicationStore;


</script>

<template>

  <div slot="header-content" id="main-flow-header-wrapper">
    <calcite-icon scale="l" :icon="theme.icon"></calcite-icon>
    <div id="main-flow-header-text-wrapper">
      <p>Construction Projects</p>
      <p>Lower Paxton Township</p>
    </div>
  </div>
  <!-- <calcite-action disabled="" slot="header-actions-end" scale="l" icon="map"></calcite-action> -->
  <calcite-action
  v-if="activeBreakpoint == 's'" 
  @click="changeTheme(theme.mode)" 
  :icon="theme.mode == 'dark' ? 'brightness' : 'moon'"
  alignment="center"
  slot="header-actions-end" 
  scale="l"
  ></calcite-action>
  <calcite-action
  v-if="activeBreakpoint != 's'" 
  @click="changeTheme(theme.mode)" 
  :icon="theme.mode == 'dark' ? 'brightness' : 'moon'"
  text-enabled="true"
  text="Theme"
  alignment="center"
  slot="header-actions-end" 
  scale="l"
  ></calcite-action>
</template>

<style scoped>

.calcite-mode-dark calcite-icon {
    --calcite-icon-color: var(--calcite-color-status-warning);
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
