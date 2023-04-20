<template>
  <router-link
    class="mb-2 bg-emerald-500 py-1 px-2 rounded-md text-white hover:bg-white hover:text-emerald-500 border border-white hover:border-emerald-500 transition"
    :to="`/character/${character.id}`"
    >#<span>{{ character.id }}</span>
    <span class="ml-1 font-semibold">{{ character.name }}</span></router-link
  >
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import type { Character } from '@/interfaces'

const props = defineProps<{
  character: Character
}>()

const { character } = toRefs(props)
</script>
