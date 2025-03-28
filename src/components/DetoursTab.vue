<script setup>
import { storeToRefs } from "pinia";

import "@esri/calcite-components/dist/components/calcite-list";
import "@esri/calcite-components/dist/components/calcite-list-item";
import "@esri/calcite-components/dist/components/calcite-list-item-group";
import "@esri/calcite-components/dist/components/calcite-tab";
import "@esri/calcite-components/dist/components/calcite-notice";
import "@esri/calcite-components/dist/components/calcite-panel";

import Notice from "./Notice.vue";
import { formatDetourDescription } from "../composables/date.js"

import { useDetoursStore } from "@/stores/detours";
const detoursStore = useDetoursStore();
const {
  detoursActive,
  detoursUpcoming,
  getActiveDetoursCount,
  getUpcomingDetoursCount,
  isDetoursLoading,
} = storeToRefs(detoursStore);

import { useApplicationStore } from "@/stores/application";
const { createFlowItem } = useApplicationStore();

function getDetourLength(shapeLength) {
  const length = shapeLength * 0.000621371; //Meters to Miles Conversion Factor
  return length.toFixed(2) + " Miles Closure";
}

</script>

<template>
  <calcite-tab>
    <calcite-panel :loading="isDetoursLoading">
      <calcite-list scale="m">
        <calcite-list-item-group :heading="`Active Detours (${getActiveDetoursCount})`">
          <Notice v-if="detoursActive.length == 0" msg="You're all clear — no active detours!" />
          <calcite-list-item v-for="detour in detoursActive" :key="detour.attributes.OBJECTID"
            icon-start="road-sign" :label="detour.attributes.detourName" :description="`${formatDetourDescription(detour.type, detour.attributes.startDate, detour.attributes.endDate)} | ${getDetourLength(detour.attributes.Shape__Length)}`" @calciteListItemSelect="createFlowItem(detour)">
          </calcite-list-item>
        </calcite-list-item-group>
      </calcite-list>
      <calcite-list scale="m">
        <calcite-list-item-group :heading="`Upcoming Detours (${getUpcomingDetoursCount})`">
          <Notice v-if="detoursUpcoming.length == 0" msg="You're all clear — no detours planned!" />
          <calcite-list-item v-for="detour in detoursUpcoming" :key="detour.attributes.OBJECTID" icon-start="road-sign"
            unavailable="" :label="detour.attributes.detourName" :description="`${formatDetourDescription(detour.type, detour.attributes.startDate, detour.attributes.endDate)} | ${getDetourLength(detour.attributes.Shape__Length)}`" @calciteListItemSelect="createFlowItem(detour)">
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
  --calcite-scrim-background: var(--calcite-color-background);
}

calcite-notice {
  margin-block: 0.5rem;
  margin-block-end: 0.6rem;
}
</style>
