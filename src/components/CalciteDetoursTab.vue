<script setup>
import { storeToRefs } from "pinia";

import "@esri/calcite-components/dist/components/calcite-list";
import "@esri/calcite-components/dist/components/calcite-list-item";
import "@esri/calcite-components/dist/components/calcite-tab";

import { useDetoursStore } from "@/stores/detours";
const detoursStore = useDetoursStore();
const { detours, isDetoursLoading, getDetoursCount } =
  storeToRefs(detoursStore);
const { fetchDetours } = detoursStore;

import { useFlowsStore } from "@/stores/flows";
const { createFlowItem } = useFlowsStore();
</script>

<template>
  <calcite-tab selected>
    <calcite-list scale="m">
      <calcite-list-item
        v-for="detour in detours"
        :key="detour.attributes.OBJECTID"
        :label="`Detour #${detour.attributes.OBJECTID}`"
        :description="detour.attributes.detourType"
        @calciteListItemSelect="createFlowItem(detour)"
      >
      </calcite-list-item>
    </calcite-list>
  </calcite-tab>
</template>
