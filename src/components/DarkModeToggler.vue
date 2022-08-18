<template>
  <button
    type="button"
    @click="() => toggleDark()"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    class="w-7 y-7 text-lg bg-gray-300 rounded-full dark:bg-gray-700"
  >
    {{ isDark ? '🌞' : '🌛' }}
  </button>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
