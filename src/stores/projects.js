import {defineStore} from "pinia";
import {ref, computed } from "vue";

export const useProjectsStore = defineStore('projects', () => {

    const projects = ref([])
    const isProjectsLoading = ref(true)

    async function fetchProjects() {
        try {
            isProjectsLoading.value = true
            const res = await fetch('https://services7.arcgis.com/whIrgO50Zo8ls2B1/arcgis/rest/services/Construction_Projects_ACTIVE_VIEW/FeatureServer/2/query?where=1%3D1&outFields=*&f=pjson')
            const data = await res.json()
           return projects.value = await data.features
        }
        catch (error) {
           return console.error("Error: ", error)
        }
        finally {
            isProjectsLoading.value = false
        }
    }

    const getProjectsCount = computed(() => {
        return projects.value.length
    })

    function clearProjects () {
        projects.value = []
    }

    return {
        projects,
        isProjectsLoading,
        getProjectsCount,
        fetchProjects,
        clearProjects
    }
})
