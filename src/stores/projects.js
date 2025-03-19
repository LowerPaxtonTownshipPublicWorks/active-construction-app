import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useProjectsStore = defineStore("projects", () => {
  const projects = ref([]);
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
      return (projects.value = await data.features);
    } catch (error) {
      return console.error("Error: ", error);
    } finally {
      isProjectsLoading.value = false;
    }
  }

  const getProjectsCount = computed(() => {
    return projects.value.length;
  });


  return {
    projects,
    isProjectsLoading,
    getProjectsCount,
    fetchProjects,
  };
});
