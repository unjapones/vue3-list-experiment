import { beforeEach, describe, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useStore } from '../countries'
import data from '@/assets/data.json'

describe('Store: countries', () => {
  let store: any
  function getHighlighted(countries: any[]): any[] {
    return countries.filter((c) => c.HIGHLIGHT === true)
  }

  beforeEach(() => {
    // create a fresh pinia and make it active so it's automatically picked
    // up by any useStore call without having to pass it to it: useStore(pinia)
    setActivePinia(createPinia())
    store = useStore()
  })

  it('initial state: population is "", countries is loaded with data', () => {
    expect(store.population).toBe('')
    expect(store.countries).toStrictEqual(data)
  })

  describe('Getter: filteredCountries', () => {
    it("population: '', no country highlighted", () => {
      expect(store.population).toBe('')
      expect(getHighlighted(store.filteredCountries).length).toBe(0)
    })

    it("population: '0', 248 countries highlighted (there are 2 with 0)", () => {
      store.population = '0'
      // "Bouvet Island" and "Heard Island and McDonald Islands" have population
      // === 0 in data.json
      expect(getHighlighted(store.filteredCountries).length).toBe(248)
    })

    it("population: '1402112000', 0 countries highlighted (max population of data.json)", () => {
      store.population = '1402112000'
      expect(getHighlighted(store.filteredCountries).length).toBe(0)
    })

    it("population: '1000000', 160 countries highlighted (same as e2e)", () => {
      store.population = '1000000'
      expect(getHighlighted(store.filteredCountries).length).toBe(160)
    })

    it("population: '10000000', 91 countries highlighted (same as e2e)", () => {
      store.population = '10000000'
      expect(getHighlighted(store.filteredCountries).length).toBe(91)
    })
  })
})
