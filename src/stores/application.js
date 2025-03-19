import { defineStore } from "pinia";
import { ref } from "vue";

export const useApplicationStore = defineStore("application", () => {
  const theme = ref('dark')
  const projectFlows = ref([]);
  const isHomeFlowSelected = ref(true);

  function changeTheme(theme) {
    if (theme == 'dark') { return this.theme = 'light'}
    if (theme != 'dark') { return this.theme = 'dark'}
  }

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
    theme,
    projectFlows,
    isHomeFlowSelected,
    changeTheme,
    createFlowItem,
    clearFlowItems,
  };
});
