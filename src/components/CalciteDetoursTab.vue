<script setup>
import { storeToRefs } from "pinia";

import "@esri/calcite-components/dist/components/calcite-list";
import "@esri/calcite-components/dist/components/calcite-list-item";
import "@esri/calcite-components/dist/components/calcite-tab";


import { useDetoursStore } from "@/stores/detours";
const detoursStore = useDetoursStore();
const { detours } = storeToRefs(detoursStore);

import { useFlowsStore } from "@/stores/flows";
const { createFlowItem } = useFlowsStore();

function getDetourLength(shapeLength) {
  const length = shapeLength * 0.000621371 //Meters to Miles Conversion Factor
  return length.toFixed(2) + " miles"
}

</script>

<template>
  <calcite-tab selected>
    <calcite-list scale="m">
      <calcite-list-item
        v-for="detour in detours"
        :key="detour.attributes.OBJECTID"
        :label="detour.attributes.detourName"
        :description="`Active | ${getDetourLength(detour.attributes.Shape__Length)}`"
        @calciteListItemSelect="createFlowItem(detour)"
      >
      </calcite-list-item>
    </calcite-list>
  </calcite-tab>
</template>
