import { defineStore } from "pinia";
import { ref } from "vue";

export const useApplicationStore = defineStore("application", () => {
  const themeMode = ref('dark')
  const themeIcon = ref('exclamation-mark-triangle')
  const projectFlows = ref([]);
  const isHomeFlowSelected = ref(true);

  function changeTheme(theme) {
    if (theme == 'dark') { 
       this.themeMode = 'light'
       this.themeIcon = 'exclamation-mark-triangle-f'
    }
    if (theme != 'dark') { 
       this.themeMode = 'dark'
       this.themeIcon = 'exclamation-mark-triangle'
    }
    return theme
  }

  function createFlowItem(feature) {
    const flowItem = {
      ...feature,
    };
    isHomeFlowSelected.value = false;
    projectFlows.value.push(flowItem);
  }

  function clearFlowItems() {
    projectFlows.value = [];
    isHomeFlowSelected.value = true;
  }

  return {
    themeMode,
    themeIcon,
    projectFlows,
    isHomeFlowSelected,
    changeTheme,
    createFlowItem,
    clearFlowItems,
  };
});
