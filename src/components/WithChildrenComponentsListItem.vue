<template>
  <div
    class="my-4 first:mt-0 last:mb-0 rounded-md border drop-shadow-md h-70 overflow-hidden break-inside-avoid-columnmd:flex"
    :class="{
      'bg-fuchsia-500 border-fuchsia-300 text-white': props.c.HIGHLIGHT,
      'bg-gray-50 border-slate-200 text-slate-600': !props.c.HIGHLIGHT
    }"
  >
    <div>
      <img
        :src="props.c.flags.png"
        alt="Flag"
        class="h-36 w-full object-cover md:h-40"
      />
    </div>
    <div class="p-3">
      <h3 class="mb-1 text-lg font-semibold">
        {{ props.c.name }}
      </h3>
      <ul class="font-medium leading-7">
        <li>😎 {{ props.c.population }}</li>
        <li>📍 {{ props.c.capital || 'Unknown' }}</li>
        <li>🌐 {{ `${props.c.region}, ${props.c.subregion || ''}` }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  c: { type: Object, required: true }
})
</script>
