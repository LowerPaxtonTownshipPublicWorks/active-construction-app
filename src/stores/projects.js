import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useProjectsStore = defineStore("projects", () => {
  const projectsActive = ref([]);
  const projectsUpcoming = ref([]);
  const isProjectsLoading = ref(true);

  async function fetchProjects() {
    try {
      isProjectsLoading.value = true;
      const query = encodeURIComponent("1=1");
      const outFields = encodeURIComponent("projectDescription, projectName, projectOwner, projectContact, projectContractor, projectStartDate, projectEndDate, projectUpdates, projectAbstract, EditDate")
      const orderByFields = encodeURIComponent("projectStartDate DESC")
      const res = await fetch(
        `https://services7.arcgis.com/whIrgO50Zo8ls2B1/arcgis/rest/services/Construction_Projects_ACTIVE_VIEW/FeatureServer/2/query?where=${query}&outFields=${outFields}&orderByFields=${orderByFields}&f=pjson`
      );
      const data = await res.json();
      return projectsActive.value = await data.features.map((feature) => {
        return {
          'type': 'project-active',
          ...feature
        }
      });
    } catch (error) {
      return console.error("Error: ", error);
    } finally {
      isProjectsLoading.value = false;
    }
  }

  async function fetchUpcomingProjects() {
    try {
      isProjectsLoading.value = true;
      const query = encodeURIComponent("1=1");
      const outFields = encodeURIComponent("projectDescription, projectName, projectOwner, projectContact, projectContractor, projectStartDate, projectEndDate, projectUpdates, projectAbstract, EditDate")
      const orderByFields = encodeURIComponent("projectStartDate DESC")
      const res = await fetch(
        `https://services7.arcgis.com/whIrgO50Zo8ls2B1/arcgis/rest/services/Construction_Projects__PlannedView/FeatureServer/2/query?where=${query}&outFields=${outFields}&orderByFields=${orderByFields}&f=pjson`
      );
      const data = await res.json();
      return projectsUpcoming.value = await data.features.map((feature) => {
        return {
          'type': 'project-upcoming',
          ...feature
        }
      });
    } catch (error) {
      return console.error("Error: ", error);
    } finally {
      isProjectsLoading.value = false;
    }
  }

  const getActiveProjectsCount = computed(() => {
    return projectsActive.value.length;
  });

  const getUpcomingProjectsCount = computed(() => {
    return projectsUpcoming.value.length;
  });

  const getTotalProjectsCount = computed(() => {
    return projectsUpcoming.value.length + projectsActive.value.length;
  });


  return {
    projectsActive,
    projectsUpcoming,
    isProjectsLoading,
    getActiveProjectsCount,
    getUpcomingProjectsCount,
    getTotalProjectsCount,
    fetchUpcomingProjects,
    fetchProjects,
  };
});
