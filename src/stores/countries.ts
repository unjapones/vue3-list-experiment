import { defineStore, acceptHMRUpdate } from 'pinia'
import data from '../assets/data.json'

interface State {
  population: string
  countries: any[]
}

export const useStore = defineStore('countries', {
  state: (): State => ({
    population: '',
    countries: data
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
    }
  }
})

// HMR (Hot Module Replacement) when working with vite
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
