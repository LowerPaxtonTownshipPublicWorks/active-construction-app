<script setup>
import { storeToRefs } from "pinia";

import "@esri/calcite-components/dist/components/calcite-chip";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-block";


import { useFlowsStore } from "@/stores/flows";
import { onMounted } from "vue";
const flowsStore = useFlowsStore();
const { projectFlows } = storeToRefs(flowsStore);

function formatDate(attributeDate) {
    const date = new Date(attributeDate)
    return date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatProjectTimeline(startDate, endDate) {
    if (!startDate) return "TBD";
    if (endDate) return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    return `${formatDate(startDate)} - TBD`;
}


function shareProject() {
    const { attributes } = projectFlows.value[0]

    const shareData = {
        title: "MDN",
        text: "Learn web development on MDN!",
        url: "https://developer.mozilla.org",
    }

    navigator.share(shareData)
}


</script>
<template>

    <div v-for="{ attributes } in projectFlows" class="flowProjectTextWrapper">
        <calcite-panel heading="Project Information" :description="'Last Updated: ' + formatDate(attributes.EditDate)">

            <calcite-action @click="shareProject" icon="copy" scale="m" slot="header-actions-end"></calcite-action>
            
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
.flowProjectTextWrapper {
    height: 65%;
    display: flex;
    flex-direction: column;

    & calcite-block {
        --calcite-color-focus: var(--brand-yellow);
    }

    & calcite-block[icon-start="exclamation-mark-triangle"] {
        --calcite-block-text-color: var(--brand-yellow);
        --calcite-block-heading-text-color: var(--brand-yellow);
        --calcite-block-heading-text-color-press: var(--brand-yellow);
    }
}
</style>