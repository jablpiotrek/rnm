<template>
  <div class="flex">
    <div>
      Page <span class="font-semibold"> {{ disabled ? '-' : page }} </span> of
      <span class="font-semibold">{{ disabled ? '-' : pages }}</span>
    </div>
    <button class="btn" @click="emit('changePage', false)" :disabled="page === 1 || disabled">
      {{ 'Previous' }}
    </button>
    <button class="btn" @click="emit('changePage', true)" :disabled="page >= pages || disabled">
      {{ 'Next' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps<{
  disabled: boolean
  page: number
  pages: number
}>()

const emit = defineEmits<{
  (e: 'changePage', next: boolean): void
}>()

const { disabled, pages } = toRefs(props)
</script>
