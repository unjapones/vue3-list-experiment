<template>
  <div class="mx-3 md:mx-auto">
    <div class="mb-4 max-w-lg text-center mx-auto">
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
        <select
          v-model="selection"
          class="my-2 w-full rounded-md shadow-sm border-gray-300 focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50 text-sm dark:bg-slate-800 dark:border-gray-600"
        >
          <option v-for="i in options.length" :value="i - 1" :key="i">
            {{ options[i - 1].__name }}
          </option>
        </select>
      </div>
      <div>
        <span
          v-if="count === 0"
          class="mx-1 md:mx-2 px-2 py-0.5 text-xs rounded-full font-semibold text-slate-600 bg-slate-400/10 dark:text-slate-300 dark:bg-slate-700"
          >Update times (ms)</span
        >
        <span
          v-if="count === 0"
          class="mx-1 md:mx-2 px-2 py-0.5 text-xs rounded-full font-semibold text-green-600 bg-green-400/10 dark:text-green-300 dark:bg-green-800"
          >&le; 10</span
        >
        <span
          v-if="count === 0"
          class="mx-1 md:mx-2 px-2 py-0.5 text-xs rounded-full font-semibold text-amber-600 bg-amber-400/10 dark:text-amber-300 dark:bg-amber-800"
          >&le; 30</span
        >
        <span
          v-if="count === 0"
          class="mx-1 md:mx-2 px-2 py-0.5 text-xs rounded-full font-semibold text-red-600 bg-red-400/10 dark:text-red-300 dark:bg-red-800"
          >&gt; 30</span
        >
        <span
          v-for="i in count"
          :key="i"
          class="mx-1 md:mx-2 px-2 py-0.5 text-xs rounded-full font-semibold"
          :class="{
            'text-green-600 bg-green-400/10 dark:text-green-300 dark:bg-green-800':
              Number.parseFloat(measures[i - 1]) <= 10,
            'text-amber-600 bg-amber-400/10 dark:text-amber-300 dark:bg-amber-800':
              Number.parseFloat(measures[i - 1]) > 10,
            'text-red-600 bg-red-400/10 dark:text-red-300 dark:bg-red-800':
              Number.parseFloat(measures[i - 1]) > 30
          }"
          >{{ measures[i - 1] }}</span
        >
      </div>
    </div>
    <component
      :is="options[selection]"
      :id="options[selection].__name"
      :countries="counstriesStore.filteredCountries"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import OnlyOneComponentList from '@/components/OnlyOneComponentList.vue'
import WithChildrenComponentsList from '@/components/WithChildrenComponentsList.vue'
import { useStore as useCountriesStore } from '@/stores/countries'
import { useStore as useMeasuresStore } from '@/stores/measures'

const counstriesStore = useCountriesStore()

// Component options to render and measure
const options = [OnlyOneComponentList, WithChildrenComponentsList]
const selection = ref(0)
const measuresStores = useMeasuresStore()

// The components will add the measures based on their name
const measures = computed(() => {
  return measuresStores.getGroupDurations(
    options[selection.value].__name as string
  )
})
// Limit measures count to 6
const count = computed(() =>
  measures.value.length > 6 ? 6 : measures.value.length
)
</script>
