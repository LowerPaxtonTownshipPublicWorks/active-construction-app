<script setup>
import { storeToRefs } from "pinia";

import "@esri/calcite-components/dist/components/calcite-chip";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-block";

import { formatDateUnix, formatProjectTimeline } from "../composables/date.js"

import { useApplicationStore } from "@/stores/application";
const applicationStore = useApplicationStore();
const { projectFlows, activeBreakpoint } = storeToRefs(applicationStore);

</script>
<template>
    <div v-for="{ attributes, type } in projectFlows" class="flowProjectTextWrapper" :class="activeBreakpoint == 's' ? 's' : 'm-l'">
        <calcite-panel scale="m" heading="Project Information" :description="'Last Updated: ' + formatDateUnix(attributes.EditDate)">
            <!-- <calcite-action @click="shareProject" disabled="" icon="print" scale="m" slot="header-actions-end"></calcite-action> -->
            <calcite-block 
            v-if="attributes.projectUpdates && !type.includes('upcoming')"
            icon-start="exclamation-mark-triangle" 
            heading="Bi-Weekly Update:"
            :open="activeBreakpoint != 's' ? true : false" 
            collapsible="">
                <p v-html="attributes.projectUpdates"></p>
            </calcite-block>
            <calcite-block 
            icon-start="information" 
            heading="Project Purpose:" 
            :open="activeBreakpoint != 's' ? true : false" 
            collapsible="">
                <p id="projectDescriptionText">{{ attributes.projectDescription }}</p>
            </calcite-block>
            <calcite-block icon-start="date-time" heading="Estimated Project Timeframe:" :description="formatProjectTimeline(attributes.projectStartDate, attributes.projectEndDate)"></calcite-block>
            <calcite-block icon-start="user" heading="Project Owner:" :description="attributes.projectOwner"></calcite-block>
            <calcite-block icon-start="users" heading="Project Contractor:" :description="attributes.projectContractor"></calcite-block>
            <calcite-block icon-start="address-book" heading="Project Contact:" :description="attributes.projectContact"></calcite-block>
        </calcite-panel>
    </div>
</template>

<style scoped>

.calcite-mode-dark calcite-block[icon-start="exclamation-mark-triangle"] {
    --calcite-block-text-color: var(--calcite-color-status-warning);
    --calcite-block-heading-text-color: var(--calcite-color-status-warning);
    --calcite-block-heading-text-color-press: var(--calcite-color-status-warning);
}

.calcite-mode-light calcite-block[icon-start="exclamation-mark-triangle"] {
    --calcite-block-text-color: var(--calcite-color-text-1);
    --calcite-block-heading-text-color: var(--calcite-color-text-1);
    --calcite-block-heading-text-color-press: var(--calcite-color-text-1);
}

calcite-panel {
    --calcite-panel-space: 5px
}

.flowProjectTextWrapper {
    width: 100%;
    flex-grow: 1;
}

.s {
  height: 65%;
  max-height: 409px;
}

.m-l {
    height: 100%;

   & #projectDescriptionText {
    margin-left: 1.75rem;
    } 
}

p {
    margin: 0px;
}

</style>