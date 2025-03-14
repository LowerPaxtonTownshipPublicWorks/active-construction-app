<script setup>
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-icon";

</script>

<template>

<div slot="header-content" id="main-flow-header-wrapper">
          <calcite-icon scale="l" icon="exclamation-mark-triangle"></calcite-icon>
          <div id="main-flow-header-text-wrapper">
            <p>Active Projects</p>
            <p>Lower Paxton Township</p>
          </div>
        </div>
        <calcite-action slot="header-actions-end" scale="l" icon="map"></calcite-action>

</template>

<style>

:root {
  --brand-yellow: #ffaf00;
}

calcite-icon[icon="exclamation-mark-triangle"] {
  --calcite-icon-color: var(--brand-yellow)
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
    color: white;
    font-size: 1rem;
    font-weight: 500;
  }
}

</style>
