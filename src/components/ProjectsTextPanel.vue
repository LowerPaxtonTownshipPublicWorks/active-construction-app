<script setup>
import { storeToRefs } from "pinia";

import "@esri/calcite-components/dist/components/calcite-chip";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-block";


import { useApplicationStore } from "@/stores/application";
const applicationStore = useApplicationStore();
const { projectFlows } = storeToRefs(applicationStore);

function formatDateDay(attributeDate) {
    const date = new Date(attributeDate + "T24:00:00Z")
    return date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatDate(attributeDate) {
    const date = new Date(attributeDate)
    return date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatProjectTimeline(startDate, endDate) {
    if (!startDate) return "TBD";
    if (endDate) return `${formatDateDay(startDate)} - ${formatDateDay(endDate)}`;
    return `${formatDateDay(startDate)} - TBD`;
}

</script>
<template>

    <div v-for="{ attributes } in projectFlows" class="flowProjectTextWrapper">
        <calcite-panel heading="Project Information" :description="'Last Updated: ' + formatDate(attributes.EditDate)">

            <calcite-action @click="shareProject" disabled="" icon="print" scale="m"
                slot="header-actions-end"></calcite-action>

            <calcite-block v-if="attributes.projectUpdates" icon-start="exclamation-mark-triangle"
                heading="Bi-Weekly Update:" collapsible="">
                <p v-html="attributes.projectUpdates"></p>
            </calcite-block>

            <calcite-block icon-start="information" heading="Project Purpose:" collapsible="">
                <p v-html="attributes.projectDescription"></p>
            </calcite-block>

            <calcite-block icon-start="date-time" heading="Estimated Project Timeframe:"
                :description="formatProjectTimeline(attributes.projectStartDate, attributes.projectEndDate)"></calcite-block>
            <calcite-block icon-start="user" heading="Project Owner:"
                :description="attributes.projectOwner"></calcite-block>
            <calcite-block icon-start="users" heading="Project Contractor:"
                :description="attributes.projectContractor"></calcite-block>
            <calcite-block icon-start="address-book" heading="Project Contact:"
                :description="attributes.projectContact"></calcite-block>
        </calcite-panel>
    </div>

</template>

<style scoped>

.calcite-mode-dark calcite-block {
    --calcite-color-focus: var(--calcite-color-status-warning);
}

.calcite-mode-light calcite-block {
    --calcite-color-focus: var(--calcite-color-text-1);
}

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


.flowProjectTextWrapper {
    height: 65%;
}
</style>