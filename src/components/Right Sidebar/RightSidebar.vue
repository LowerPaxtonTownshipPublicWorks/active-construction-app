<script setup>
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-input-text";

import SchoolCard from "@/components/Right Sidebar/SchoolCard.vue";

import {useSchoolsStore} from "@/stores/schools";
import {computed, ref} from "vue";

const schoolsStore = useSchoolsStore();
const inputText = ref("")

const filterSchools = computed(() => {
  if (inputText !== "") {
    return schoolsStore.schools.filter(school => school.NAME.includes(inputText.value.toUpperCase()));
  }
})


</script>

<template>

  <calcite-shell-panel slot="panel-end">
    <calcite-panel
        :heading="`Schools Panel Results (${schoolsStore.getSchoolsCount} Showing)`"
    >
      <calcite-input-text
          placeholder="Find a school..."
          icon="search"
          v-model="inputText"
      >
      </calcite-input-text>
      <div
          id="calcite-card-group"
      >
      <SchoolCard
          v-for="(feature, index) in filterSchools"
          :key="index"
          :heading="feature.NAME"
          :description="feature.CITY + ', ' + feature.STATE"
      />
      </div>
    </calcite-panel>
  </calcite-shell-panel>

</template>

<style scoped>

calcite-shell-panel {
  --calcite-shell-panel-min-width: 50vw;
}

calcite-input-text {
  padding: 10px;
}

#calcite-card-group {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

</style>