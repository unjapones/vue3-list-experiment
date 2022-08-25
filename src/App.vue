<script setup lang="ts">
import DataController from '@/components/DataController.vue'
import DarkModeToggler from '@/components/DarkModeToggler.vue'
</script>

<template>
  <div class="mx-auto flex flex-col h-screen max-h-screen">
    <DarkModeToggler class="absolute top-4 right-4 lg:top-6 lg:right-6" />
    <header class="font-bold text-4xl lg:text-5xl mx-5 mt-16 mb-10 text-center">
      <span
        class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400"
        >Vue.js 3</span
      >
      list experiment
    </header>

    <DataController class="px-2 sm:mx-auto overflow-hidden w-full" />
  </div>
</template>
