import { ref, onMounted, onBeforeMount, onBeforeUpdate, onUpdated } from 'vue'

// Shorthand strings usde in marks and measures
enum markTitles {
  'OBM' = 'onBeforeMount',
  'OM' = 'onMounted',
  'OBU' = 'onBeforeUpdate',
  'OU' = 'onUpdated'
}
enum measureTitles {
  'MT' = 'Mounted: ',
  'UT' = 'Updated: '
}

interface UsePerformanceOptions {
  // Marks & measures are linked to an id to differentiate them
  id: string
  // If true, will check the Mounted measure
  measureMounted?: boolean
  // Fn that will receive: measures[] (sorted by most recent 1st), updates to
  // measures (doesn't count the mounted measure)
  onUpdatedCallback?: (args: {
    measures: PerformanceMeasure[]
    updates: number
  }) => void
}

// Retrieve the entries/measures filtered by the corresponding id
function getMeasuresById(id: string): PerformanceEntry[] {
  return performance
    .getEntriesByType('measure')
    .filter((entry) => entry.name.startsWith(`${id}-`))
    .reverse()
}

function clearMeasuresAndMarks(): void {
  performance.clearMeasures()
  performance.clearMarks()
}

export default function usePerformance({
  id,
  measureMounted,
  onUpdatedCallback
}: UsePerformanceOptions) {
  const updates = ref(0)
  let measures: any[] = []

  if (measureMounted) {
    onBeforeMount(() => {
      performance.mark(`${id}-${markTitles.OBM}`)
    })
    onMounted(() => {
      performance.mark(`${id}-${markTitles.OM}`)
      performance.measure(
        `${id}-${measureTitles.MT}`,
        `${id}-${markTitles.OBM}`,
        `${id}-${markTitles.OM}`
      )
      // Add the measure and execute onUpdatedCallback accordingly
      measures = getMeasuresById(id)
      if (onUpdatedCallback)
        onUpdatedCallback({ measures, updates: updates.value })
    })
  }

  onBeforeUpdate(() => {
    performance.mark(`${id}-${markTitles.OBU}-${updates.value}`)
  })
  onUpdated(() => {
    performance.mark(`${id}-${markTitles.OU}-${updates.value}`)
    performance.measure(
      `${id}-${measureTitles.UT}${updates.value}`,
      `${id}-${markTitles.OBU}-${updates.value}`,
      `${id}-${markTitles.OU}-${updates.value}`
    )
    // Add measures and execute onUpdatedCallback accordingly
    measures = getMeasuresById(id)
    updates.value++
    if (onUpdatedCallback)
      onUpdatedCallback({ measures, updates: updates.value })
  })

  return {
    updates,
    measures,
    clearMeasuresAndMarks
  }
}
