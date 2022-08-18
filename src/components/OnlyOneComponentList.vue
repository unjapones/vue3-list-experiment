<template>
  <div class="columns-1 md:columns-2 lg:columns-4">
    <div
      v-for="(c, index) in props.countries"
      :key="index"
      class="my-4 first:mt-0 last:mb-0 rounded-md border drop-shadow-md h-70 overflow-hidden break-inside-avoid-columnmd:flex"
      :class="{
        'bg-indigo-500 border-indigo-300 text-white dark:bg-indigo-700 dark:border-indigo-500':
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
        <h3 class="mb-1 text-lg font-semibold">{{ c.name }}</h3>
        <ul class="font-medium leading-7">
          <li>🤓 {{ c.population }}</li>
          <li>📍 {{ c.capital || 'Unknown' }}</li>
          <li>🌐 {{ `${c.region}, ${c.subregion || ''}` }}</li>
        </ul>
      </div>
    </div>
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
