import { defineStore } from "pinia";
import { ref } from "vue";

export const useFlowsStore = defineStore("flows", () => {
  const projectFlows = ref([]);
  const isHomeFlowSelected = ref(true);

  function createFlowItem(project) {
    const flowItem = {
      ...project,
    };
    isHomeFlowSelected.value = false;
    projectFlows.value.push(flowItem);
  }

  function clearFlowItems() {
    projectFlows.value = [];
    isHomeFlowSelected.value = true;
  }

  return {
    projectFlows,
    isHomeFlowSelected,
    createFlowItem,
    clearFlowItems,
  };
});
