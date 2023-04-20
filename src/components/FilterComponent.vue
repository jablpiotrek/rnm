<template>
  <div class="border-2 rounded-md border-emerald-500 p-2 my-2 w-full">
    <form @submit.prevent="updateFilters">
      <div class="flex flex-col sm:flex-row">
        <div class="flex flex-wrap">
          <label class="mr-2" for="name">Name: </label>
          <input
            class="border rounded-md border-stone-900 px-2 outline-none focus:border-emerald-500 grow min-w-0"
            :disabled="disabled"
            v-model="name"
            id="name"
            type="text"
            placeholder="Search for character"
          />
        </div>
        <div class="flex flex-col sm:flex-row sm:justify-start sm:ml-2">
          <div>
            <input
              type="radio"
              :disabled="disabled"
              v-model="status"
              :value="CharacterStatus.all"
              id="all"
              :checked="status === CharacterStatus.all"
            /><label class="ml-1 mr-2" for="all">All</label>
          </div>
          <div>
            <input
              type="radio"
              :disabled="disabled"
              v-model="status"
              :value="CharacterStatus.dead"
              id="dead"
              :checked="status === CharacterStatus.dead"
            /><label class="ml-1 mr-2" for="dead">Dead</label>
          </div>
          <div>
            <input
              type="radio"
              :disabled="disabled"
              v-model="status"
              :value="CharacterStatus.alive"
              id="alive"
              :checked="status === CharacterStatus.alive"
            /><label class="ml-1 mr-2" for="alive">Alive</label>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full mt-2 sm:flex-row">
        <button
          class="btn-action mb-2 sm:mb-0 sm:w-32 sm:grow-0 sm:mr-2"
          @click="updateFilters"
          :disabled="disabled"
        >
          Apply filters
        </button>
        <button
          class="btn-action sm:mb-0 sm:w-32 sm:grow-0"
          type="button"
          @click="clearFilters"
          :disabled="(!name.length && status === '') || disabled"
        >
          Clear filters
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, onMounted } from 'vue'
import type { Filter } from '@/interfaces'
import { CharacterStatus } from '@/enums'

import { useCharactersStore } from '@/stores/characters'
import { storeToRefs } from 'pinia'

const charactersStore = useCharactersStore()
const { filter: initalFilter } = storeToRefs(charactersStore)
const emit = defineEmits<{
  (e: 'updateFilters', filter: Filter): void
}>()

const props = defineProps<{
  disabled: boolean
}>()
const { disabled } = toRefs(props)
const status = ref(CharacterStatus.all)
const name = ref('')

function clearFilters() {
  status.value = CharacterStatus.all
  name.value = ''

  emit('updateFilters', { status: status.value, name: name.value })
}

function updateFilters() {
  emit('updateFilters', { status: status.value, name: name.value })
}

onMounted(() => {
  status.value = initalFilter.value.status
  name.value = initalFilter.value.name
})
</script>
