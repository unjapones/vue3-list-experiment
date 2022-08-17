import { defineStore, acceptHMRUpdate } from 'pinia'

interface State {
  groups: Map<string, PerformanceMeasure[]>
}

export const useStore = defineStore('measures', {
  state: (): State => ({
    groups: new Map<string, PerformanceMeasure[]>()
  }),
  actions: {
    set(k: string, measures: PerformanceMeasure[]) {
      this.$patch((state) => state.groups.set(k, measures))
    },
    clear(k: string) {
      this.$patch((state) => state.groups.set(k, []))
    }
  },
  getters: {
    getGroup(): (k: string) => PerformanceMeasure[] {
      return (k): PerformanceMeasure[] => {
        return this.groups.has(k)
          ? (this.groups.get(k) as PerformanceMeasure[])
          : []
      }
    },
    getGroupDurations(): (k: string) => string[] {
      return (k) => {
        return this.groups.has(k)
          ? (this.groups.get(k) as PerformanceMeasure[]).map((pm) =>
              pm.duration.toFixed(2)
            )
          : []
      }
    }
  }
})

// HMR (Hot Module Replacement) when working with vite
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
