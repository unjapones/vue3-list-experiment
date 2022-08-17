import { defineStore, acceptHMRUpdate } from 'pinia'

interface State {
  population: string
  countries: any[]
}

export const useStore = defineStore('countries', {
  state: (): State => ({
    population: '',
    countries: []
  }),
  actions: {
    setCountries(newCountries: any[]) {
      this.$patch((state: State) => (state.countries = newCountries))
    },
    setPopulation(newPopulation: '') {
      this.$patch((state: State) => (state.population = newPopulation))
    }
  },
  getters: {
    filteredCountries(state: State): any[] {
      const minPopulation = Number.parseInt(this.population, 10)
      if (Number.isInteger(minPopulation) && minPopulation > -1) {
        // @TODO: measure performance of these 2 blocks of code
        // return this.countries.map((c) => {
        //   const newC = { ...c }
        //   if (newC.population > minPopulation) {
        //     newC.HIGHLIGHT = true
        //   } else {
        //     delete newC.HIGHLIGHT
        //   }
        //   return newC
        // })
        const t = [...this.countries] as any[]
        for (let i = 0; i < t.length; i++) {
          t[i].HIGHLIGHT = t[i].population > minPopulation
        }
        return t
      }
      return state.countries
    }
  }
})

// HMR (Hot Module Replacement) when working with vite
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
