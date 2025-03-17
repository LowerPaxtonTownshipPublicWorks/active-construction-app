<script setup>
import { storeToRefs } from "pinia";

import "@esri/calcite-components/dist/components/calcite-chip";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-block";


import { useFlowsStore } from "@/stores/flows";
const flowsStore = useFlowsStore();
const { projectFlows } = storeToRefs(flowsStore);


</script>

<template>

    <div v-for="{ attributes } in projectFlows" class="flowProjectTextWrapper">
        <calcite-panel heading="Project Information"
            :description="'Last Updated: ' + new Date(attributes.EditDate).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })">
            
            <calcite-action icon="share" scale="m" slot="header-actions-end"></calcite-action>

            <calcite-block 
            v-if="attributes.projectUpdates" 
            icon-start="exclamation-mark-triangle"
            heading="Live Updates:" 
            collapsible="">
                <p v-html="attributes.projectUpdates"></p>
            </calcite-block>

            <calcite-block icon-start="information" heading="Project Purpose:" collapsible="">
                <p v-html="attributes.projectDescription"></p>
            </calcite-block>

            <calcite-block icon-start="date-time" heading="Estimated Project Timeframe:"
                :description="attributes.projectStartDate"></calcite-block>
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
.flowProjectTextWrapper {
    height: 65%;
    display: flex;
    flex-direction: column;

    & calcite-block[icon-start="exclamation-mark-triangle"] {
        --calcite-block-text-color: var(--brand-yellow);
    }
}
</style>