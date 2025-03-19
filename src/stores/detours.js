import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useDetoursStore = defineStore("detours", () => {
  const detours = ref([]);
  const detoursUpcoming = ref([]);
  const isDetoursLoading = ref(true);

  async function fetchDetours() {
    try {
      isDetoursLoading.value = true;
      const query = encodeURIComponent("startDate <= CURRENT_DATE AND endDate >= CURRENT_DATE AND detourTYPE = 'Work Area'");
      const orderByFields = encodeURIComponent("startDate DESC")
      const res = await fetch(
        `https://services7.arcgis.com/whIrgO50Zo8ls2B1/arcgis/rest/services/Construction_Projects_ACTIVE_VIEW/FeatureServer/0/query?where=${query}&orderByFields=${orderByFields}&outFields=%2A&f=pjson`
      );
      const data = await res.json();
      return (detours.value = await data.features);
    } catch (error) {
      return console.error("Error: ", error);
    } finally {
      isDetoursLoading.value = false;
    }
  }

  async function fetchUpcomingDetours() {
    try {
      isDetoursLoading.value = true;
      const query = encodeURIComponent("startDate > CURRENT_DATE AND detourTYPE = 'Work Area'");
      const orderByFields = encodeURIComponent("startDate DESC")
      const res = await fetch(
        `https://services7.arcgis.com/whIrgO50Zo8ls2B1/arcgis/rest/services/Construction_Projects_ACTIVE_VIEW/FeatureServer/0/query?where=${query}&orderByFields=${orderByFields}&outFields=%2A&f=pjson`
      );
      const data = await res.json();
      return (detoursUpcoming.value = await data.features);
    } catch (error) {
      return console.error("Error: ", error);
    } finally {
      isDetoursLoading.value = false;
    }
  }

  const getDetoursCount = computed(() => {
    return detours.value.length + detoursUpcoming.value.length;
  });

  function clearDetours() {
    detours.value = [];
  }

  return {
    detours,
    detoursUpcoming,
    isDetoursLoading,
    getDetoursCount,
    fetchDetours,
    fetchUpcomingDetours,
    clearDetours,
  };
});
