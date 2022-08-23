<template>
  <div class="v3le-oocl text-center">
    <article
      v-for="(c, index) in props.countries"
      :key="index"
      class="v3le-country my-8 mx-4 sm:m-4 rounded-md border drop-shadow-md h-70 overflow-hidden sm:w-72 sm:inline-block text-left truncate"
      :class="{
        'v3le-country-highlighted bg-indigo-500 border-indigo-300 text-white dark:bg-indigo-700 dark:border-indigo-500':
          c.HIGHLIGHT,
        'bg-gray-50 border-slate-300 text-slate-600 dark:border-gray-600 dark:bg-gray-700 dark:text-slate-200':
          !c.HIGHLIGHT
      }"
    >
      <div>
        <img
          :src="c.flags.png"
          alt="Flag"
          class="h-36 w-full object-cover md:h-40"
        />
      </div>
      <div class="p-3">
        <header class="mb-1 text-lg font-semibold" :title="c.name">
          {{ c.name }}
        </header>
        <ul class="font-medium leading-7">
          <li :title="c.population">🤓 {{ c.population }}</li>
          <li :title="'c.capital' || 'Unknown'">
            📍 {{ c.capital || 'Unknown' }}
          </li>
          <li :title="`${c.region}, ${c.subregion || ''}`">
            🌐 {{ `${c.region}, ${c.subregion || ''}` }}
          </li>
        </ul>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'
import usePerformance from '@/composables/usePerformance'
import { useStore as useMeasuresStore } from '@/stores/measures'

const props = defineProps({
  id: { type: String, required: true },
  countries: { type: Object, required: true }
})

const measuresStore = useMeasuresStore()

const { clearMeasuresAndMarks } = usePerformance({
  id: props.id,
  measureMounted: false,
  onUpdatedCallback: ({ measures }) => measuresStore.set(props.id, measures)
})
onUnmounted(() => {
  measuresStore.clear(props.id)
  clearMeasuresAndMarks()
})
</script>
