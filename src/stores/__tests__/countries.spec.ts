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

  describe('Getter: getPaginated', async () => {
    it('resolves to an []: starting from page argument, and with N size (length) argument', async () => {
      const res1 = await store.getPaginated(0, 2)
      expect(res1[0].name).toBe('Afghanistan')
      expect(res1[1].name).toBe('Åland Islands')
      expect(res1.length).toBe(2)
      const res2 = await store.getPaginated(1, 2)
      expect(res2[0].name).toBe('Albania')
      expect(res2[1].name).toBe('Algeria')
      expect(res2.length).toBe(2)
      const res3 = await store.getPaginated(0, 4)
      expect(res1[0].name).toBe('Afghanistan')
      expect(res1[1].name).toBe('Åland Islands')
      expect(res3[2].name).toBe('Albania')
      expect(res3[3].name).toBe('Algeria')
      expect(res3.length).toBe(4)
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
