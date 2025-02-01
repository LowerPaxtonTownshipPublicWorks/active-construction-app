<script setup>
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-popover";

import {ref, onMounted} from "vue";

const props = defineProps({
  district: String,
})

const popoverClosed = ref(false)
const referenceElement = ref(HTMLElement)  // This ref will hold the DOM element reference

// Toggle popover visibility
const togglePopover = (e) => {
  console.log(referenceElement.value)
  popoverClosed.value = !popoverClosed.value;
}

</script>

<template>
  <div slot="heading">
    <span>{{ props.district }}</span>
    <calcite-popover
        heading="About this district"
        label="About this data"
        :reference-element="districtInfoAction.value"
        overlay-positioning="absolute"
        closable
        :open="popoverClosed"
    >
      Hello!
    </calcite-popover>

    <calcite-action
        @click="togglePopover"
        appearance="transparent"
        icon="information"
        scale="s"
        ref="referenceElement"
    ></calcite-action>
  </div>
</template>

<style scoped>
div[slot="heading"] {
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--calcite-color-foreground-2);
  padding: 4px;
  margin-bottom: 10px;
}

span {
  margin-left: 2px;
}
</style>
