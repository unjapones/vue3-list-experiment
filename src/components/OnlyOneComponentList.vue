<template>
  <div class="v3le-oocl">
    <Grid
      :length="countriesLength"
      :page-size="5"
      :page-provider="countriesProvider"
      :page-provider-debounce-time="750"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:justify-items-center"
    >
      <template v-slot:default="{ item, style }">
        <article
          :key="item.name"
          class="v3le-country sm:m-0 rounded-md border drop-shadow-md h-70 overflow-hidden w-full md:w-60 xl:w-72 text-left truncate"
          :class="{
            'v3le-country-highlighted bg-indigo-500 border-indigo-300 text-white dark:bg-indigo-700 dark:border-indigo-500':
              props.minPopulation > -1 && item.population > props.minPopulation,
            'bg-gray-50 border-slate-300 text-slate-600 dark:border-gray-600 dark:bg-gray-700 dark:text-slate-200':
              props.minPopulation === -1 ||
              item.population <= props.minPopulation
          }"
          :style="style"
        >
          <div>
            <img
              :src="item.flags.png"
              alt="Flag"
              class="h-36 w-full object-cover md:h-40"
            />
          </div>
          <div class="p-3">
            <header class="mb-1 text-lg font-semibold" :title="item.name">
              {{ item.name }}
            </header>
            <ul class="font-medium leading-7">
              <li :title="item.population">🤓 {{ item.population }}</li>
              <li :title="'item.capital' || 'Unknown'">
                📍 {{ item.capital || 'Unknown' }}
              </li>
              <li :title="`${item.region}, ${item.subregion || ''}`">
                🌐 {{ `${item.region}, ${item.subregion || ''}` }}
              </li>
            </ul>
          </div>
        </article>
      </template>
      <template v-slot:placeholder="{ index, style }">
        <article
          class="v3le-country-loading sm:m-0 rounded-md border drop-shadow-md h-70 overflow-hidden w-full md:w-60 xl:w-72 text-left truncate bg-gray-200 border-slate-300 text-slate-300 dark:border-gray-800 dark:bg-gray-800 dark:text-slate-600"
          :style="style"
          :key="index"
        >
          <div>
            <div
              class="h-36 w-full object-cover md:h-40 bg-gray-300 dark:bg-gray-700"
            ></div>
          </div>
          <div class="p-3">
            <header class="mb-1 text-lg font-semibold">Loading</header>
            <ul class="font-medium leading-7">
              <li>...</li>
              <li>...</li>
              <li>...</li>
            </ul>
          </div>
        </article>
      </template>
      <template v-slot:probe>
        <div class="my-8 sm:m-0 h-70 sm:w-60">Probe</div>
      </template>
    </Grid>
  </div>
</template>

<script setup lang="ts">
import Grid from 'vue-virtual-scroll-grid'

interface Props {
  minPopulation: number
  countriesLength: number
  countriesProvider: (p: number, s: number) => Promise<any[]>
}

const props = defineProps<Props>()
</script>
