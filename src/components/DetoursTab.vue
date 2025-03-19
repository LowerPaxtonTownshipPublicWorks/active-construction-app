<script setup>
import { storeToRefs } from "pinia";

import "@esri/calcite-components/dist/components/calcite-list";
import "@esri/calcite-components/dist/components/calcite-list-item";
import "@esri/calcite-components/dist/components/calcite-list-item-group";
import "@esri/calcite-components/dist/components/calcite-tab";


import { useDetoursStore } from "@/stores/detours";
const detoursStore = useDetoursStore();
const { detoursActive, detoursUpcoming } = storeToRefs(detoursStore);

import { useApplicationStore } from "@/stores/application";
const { createFlowItem } = useApplicationStore();

function getDetourLength(shapeLength) {
  const length = shapeLength * 0.000621371 //Meters to Miles Conversion Factor
  return length.toFixed(2) + " Miles Closure"
}

function formatDate(attributeDate) {
    const date = new Date(attributeDate + "T00:00:00")
    return date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

</script>

<template>
  <calcite-tab selected>
    <calcite-list scale="m">
      <calcite-list-item-group heading="Upcoming Detours:">
        <calcite-list-item
        v-for="detour in detoursUpcoming"
        :key="detour.attributes.OBJECTID"
        unavailable=""
        :label="detour.attributes.detourName"
        :description="`Starting on ${formatDate(detour.attributes.startDate)} | ${getDetourLength(detour.attributes.Shape__Length)}`"
        @calciteListItemSelect="createFlowItem(detour)"
        >
      </calcite-list-item>
    </calcite-list-item-group>
    </calcite-list>
    <calcite-list scale="m">
      <calcite-list-item-group heading="Active Detours:">
        <calcite-list-item
        v-for="detour in detoursActive"
        :key="detour.attributes.OBJECTID"
        :label="detour.attributes.detourName"
        :description="`Ending On ${formatDate(detour.attributes.endDate)} | ${getDetourLength(detour.attributes.Shape__Length)}`"
        @calciteListItemSelect="createFlowItem(detour)"
        >
      </calcite-list-item>
    </calcite-list-item-group>
    </calcite-list>
  </calcite-tab>
</template>