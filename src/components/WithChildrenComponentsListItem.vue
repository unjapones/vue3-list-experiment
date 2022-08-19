<template>
  <article
    class="v3le-country my-4 first:mt-0 last:mb-0 rounded-md border drop-shadow-md h-70 overflow-hidden break-inside-avoid-columnmd:flex"
    :class="{
      'v3le-country-highlighted bg-fuchsia-500 border-fuchsia-300 text-white dark:bg-fuchsia-700 dark:border-fuchsia-500':
        props.c.HIGHLIGHT,
      'bg-gray-50 border-slate-200 text-slate-600 dark:border-gray-600 dark:bg-gray-700 dark:text-slate-200':
        !props.c.HIGHLIGHT
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
      <header class="mb-1 text-lg font-semibold">
        {{ props.c.name }}
      </header>
      <ul class="font-medium leading-7">
        <li>😎 {{ props.c.population }}</li>
        <li>📍 {{ props.c.capital || 'Unknown' }}</li>
        <li>🌐 {{ `${props.c.region}, ${props.c.subregion || ''}` }}</li>
      </ul>
    </div>
  </article>
</template>

<script setup lang="ts">
const props = defineProps({
  c: { type: Object, required: true }
})
</script>
