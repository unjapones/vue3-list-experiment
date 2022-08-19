<template>
  <div class="v3le-wccl columns-1 md:columns-2 lg:columns-4">
    <WithChildrenComponentsListItem
      v-for="(c, index) in props.countries"
      :key="index"
      :c="c"
    />
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'
import WithChildrenComponentsListItem from '@/components/WithChildrenComponentsListItem.vue'
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
