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

  describe('Getter: populationAsNumber', () => {
    it('should be -1 when population is ""', () => {
      store.population = ''
      expect(store.populationAsNumber).toBe(-1)
    })
    it('should be N (number) when population is string representing a number', () => {
      store.population = '0'
      expect(store.populationAsNumber).toBe(0)
      store.population = '99'
      expect(store.populationAsNumber).toBe(99)
    })
  })

  describe('Getter: highlightedCount', () => {
    it('should be 0 when population is ""', () => {
      store.population = ''
      expect(store.highlightedCount).toBe(0)
    })
    it('should be 248 when population is "0"', () => {
      store.population = '0'
      expect(store.highlightedCount).toBe(248)
    })
    it('should be 160 when population is "1000000"', () => {
      store.population = '1000000'
      expect(store.highlightedCount).toBe(160)
    })
  })
})
