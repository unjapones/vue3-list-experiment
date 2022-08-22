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
    filteredCountries(state: State): any[] {
      const minPopulation = Number.parseInt(state.population, 10)
      if (Number.isInteger(minPopulation) && minPopulation > -1) {
        // @TODO: measure performance of these 2 blocks of code
        // return state.countries.map((c) => {
        //   const newC = { ...c }
        //   if (newC.population > minPopulation) {
        //     newC.HIGHLIGHT = true
        //   } else {
        //     delete newC.HIGHLIGHT
        //   }
        //   return newC
        // })
        const t = [] as any[]
        for (let i = 0; i < data.length; i++) {
          t.push({
            ...state.countries[i],
            HIGHLIGHT: state.countries[i].population > minPopulation
          })
        }
        return t
      } else {
        return data
      }
    }
  }
})

// HMR (Hot Module Replacement) when working with vite
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
