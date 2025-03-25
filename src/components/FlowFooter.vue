<script setup>

import "@esri/calcite-components/dist/components/calcite-link";

</script>

<template>

    <div slot="footer" id="main-flow-header-text-wrapper">
        <p>Public Works Department</p>
        <calcite-link icon-end="launch" target="_blank" href="https://www.lowerpaxtonatwork.com/">www.lowerpaxtonatwork.com</calcite-link>
    </div>

</template>

<style scoped>
#main-flow-header-text-wrapper {
    display: flex;
    flex-direction: column;

    & p, calcite-link {
        text-align: center;
        margin: 0px;
        line-height: 1.25rem;
    }

    & p:nth-child(1) {
        color: var(--calcite-color-text-1);
        font-size: 1rem;
        font-weight: 500;
    }

    & calcite-link {
        --calcite-link-text-color: var(--calcite-color-text-2);
        --calcite-color-brand-underline: var(--calcite-color-text-2)
    }
}
</style>
