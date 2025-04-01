import { defineStore } from "pinia";
import { ref } from "vue";
import { useBreakpoints } from '@vueuse/core'

export const useApplicationStore = defineStore("application", () => {
  const themeMode = ref('light')
  const themeIcon = ref('exclamation-mark-triangle-f')
  const projectFlows = ref([]);
  const isHomeFlowSelected = ref(true);
  const activeBreakpoint = ref("");

  
  function updateBreakpoint() {
    const breakpoints = useBreakpoints({
      s: 0,
      m: 600,
      l: 1200,
    })
    activeBreakpoint.value = breakpoints.active().value;
  }

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
    activeBreakpoint,
    updateBreakpoint,
    changeTheme,
    createFlowItem,
    clearFlowItems,
  };
});
