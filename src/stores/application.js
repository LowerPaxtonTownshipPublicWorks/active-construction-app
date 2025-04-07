import { defineStore } from "pinia";
import { ref } from "vue";
import { useBreakpoints } from '@vueuse/core'
import { useStorage } from "@vueuse/core";

export const useApplicationStore = defineStore("application", () => {
  const theme = useStorage('theme', {'mode' : 'dark', 'icon': 'exclamation-mark-triangle'})
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

  function changeTheme(mode) {
    if (mode == 'dark') {
      theme.value.mode = 'light'
      theme.value.icon = 'exclamation-mark-triangle-f'
    }
    if (mode != 'dark') {
      theme.value.mode = 'dark'
      theme.value.icon = 'exclamation-mark-triangle' 
    }
  }

  function createFlowItem(feature) {
    const flowItem = {
      ...feature,
    };
    isHomeFlowSelected.value = false;
    projectFlows.value.push(flowItem);
  }

  function clearFlowItems(e) {
    if (e.target.id == 'appFlow') {
      console.log(e);
      projectFlows.value = [];
      isHomeFlowSelected.value = true;
    } else {
      return
    }
  }

  return {
    theme,
    projectFlows,
    isHomeFlowSelected,
    activeBreakpoint,
    updateBreakpoint,
    changeTheme,
    createFlowItem,
    clearFlowItems,
  };
});
