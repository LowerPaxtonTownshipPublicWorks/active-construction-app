<script setup>

import { ref } from "vue";

import "@esri/calcite-components/dist/components/calcite-dialog";
import "@esri/calcite-components/dist/components/calcite-button";

const modal = ref(null)

function closeModal () {
    modal.value.open = false
}

</script>

<template>

<calcite-dialog ref="modal" open outside-close-disabled close-disabled modal slot="dialogs">
    <div id="modalWrapper">
        <img src="../assets/lptLogo.png">
        <h2> to the Construction & Detours App!</h2>
        <h3>Stay informed and navigate with ease.</h3>
        <p>This app provides real-time updates on local construction projects and detours throughout Lower Paxton Township, helping you plan your travels efficiently and avoid delays. Whether you're driving through or simply curious, we've got the latest information to keep you informed. Thank you for using our app!</p>
    </div>
    <calcite-button @click="closeModal" kind="inverse" slot="footer" width="full">
        Explore Projects
    </calcite-button>
</calcite-dialog>

</template>

<style scoped>



#modalWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;

    & img {
        width: 190px;
        margin-bottom: 0.5rem;
    }

    & h2, h3, p {
        margin: 0px;
        text-wrap: balance;
        text-align: center;
    }

    & h2 {
        font-size: clamp(1.46rem, 2.5vw, 2rem);
        font-weight: bolder;
        margin-bottom: 0.5rem;
    }

    & h3 {
        font-size: clamp(1.1rem, 2.5vw, 1.5rem);
        font-style: italic;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    & p {
        font-size: clamp(1rem, 2.5vw, 1.05rem);
    }

}

</style>