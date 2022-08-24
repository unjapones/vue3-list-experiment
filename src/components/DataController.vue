<template>
  <div>
    <div class="mb-4 max-w-lg text-center sm:mx-auto">
      <div>
        <label for="filter" class="text-gray-500 dark:text-gray-400"
          >Highlight population larger than:</label
        >
        <input
          id="filter"
          v-model="counstriesStore.population"
          type="number"
          min="0"
          placeholder="Population number"
          class="my-2 w-full rounded-md shadow-sm border-gray-300 focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-500"
          name="population"
          autofocus
        />
      </div>
      <div>
        <span
          class="mx-1 md:mx-2 px-2 py-0.5 text-xs rounded-full font-semibold text-slate-600 bg-slate-400/10 dark:text-slate-300 dark:bg-slate-700"
          >Highlighted countries</span
        >
        <span
          class="mx-1 md:mx-2 px-2 py-0.5 text-xs rounded-full font-semibold text-green-600 bg-green-400/10 dark:text-green-300 dark:bg-green-800"
          >{{ counstriesStore.highlightedCount }}</span
        >
      </div>
    </div>
    <OnlyOneComponentList
      :id="'OnlyOneComponentList'"
      :countries="counstriesStore.countries"
      :min-population="counstriesStore.populationAsNumber"
      class="h-full overflow-scroll mx-auto container"
    ></OnlyOneComponentList>
  </div>
</template>

<script setup lang="ts">
import OnlyOneComponentList from '@/components/OnlyOneComponentList.vue'
import { useStore as useCountriesStore } from '@/stores/countries'

const counstriesStore = useCountriesStore()
</script>
