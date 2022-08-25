import { defineStore, acceptHMRUpdate } from 'pinia'
import data from '../assets/data.json'

interface State {
  population: string
  countries: any[]
  enableConsoleMessages: boolean
}

export const useStore = defineStore('countries', {
  state: (): State => ({
    population: '',
    countries: data,
    enableConsoleMessages: false
  }),
  getters: {
    populationAsNumber(state: State): number {
      const p = Number.parseInt(state.population, 10)
      return Number.isInteger(p) && p > -1 ? p : -1
    },
    highlightedCount(state: State): number {
      const p = this.populationAsNumber
      if (p === -1) {
        return 0
      }
      return state.countries.filter((c) => c.population > p).length
    },
    // To simulate getting results from an API/Backend + stick to Grid component
    // from vue-virtual-scroll-grid
    getPaginated(state: State): (p: number, s: number) => Promise<any[]> {
      return (pageNumber: number, pageSize: number) => {
        const result = state.countries.slice(
          pageNumber * pageSize,
          pageNumber * pageSize + pageSize
        )
        if (state.enableConsoleMessages)
          console.debug('getPaginated-req', {
            pageNumber,
            pageSize
          })
        return new Promise((resolve) => {
          setTimeout(() => {
            if (this.enableConsoleMessages)
              console.debug('getPaginated-RES', {
                pageNumber,
                pageSize
              })
            resolve(result)
          }, 1500)
        })
      }
    }
  }
})

// HMR (Hot Module Replacement) when working with vite
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
