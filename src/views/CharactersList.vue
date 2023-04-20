<template>
  <h2 class="text-2xl text-stone-500">List</h2>

  <FilterComponent
    @update-filters="
      ($event) => {
        charactersStore.setFilter($event)
        charactersStore.setPage(1)
        charactersStore.loadCharacters({ page, filter })
      }
    "
    :disabled="isLoading"
  />
  <PaginationComponent
    :page="page"
    :pages="pages"
    :disabled="!pages"
    @change-page="
      ($event) => {
        charactersStore.setPage(page + ($event ? 1 : -1))
        charactersStore.loadCharacters({ page, filter })
      }
    "
  />
  <div class="italic mb-4">
    Showing {{ filter.status || 'all' }} characters
    {{ filter.name.length ? `with name matching "${filter.name}"` : '' }}
  </div>
  <LoadingState v-if="isLoading" />
  <ul class="flex flex-col w-full" v-else-if="list.length">
    <CharacterItem v-for="character in list" :key="character.id" :character="character" />
  </ul>
  <EmptyState v-else />
</template>

<script setup lang="ts">
import { CharacterStatus } from '@/enums'

import PaginationComponent from '@/components/PaginationComponent.vue'
import EmptyState from '@/components/EmptyState.vue'
import LoadingState from '@/components/LoadingState.vue'
import CharacterItem from '@/components/CharacterItem.vue'
import FilterComponent from '@/components/FilterComponent.vue'

import { onMounted } from 'vue'
import { useCharactersStore } from '@/stores/characters'
import { storeToRefs } from 'pinia'

const charactersStore = useCharactersStore()
const { list, pages, isLoading, filter, page } = storeToRefs(charactersStore)

onMounted(async () => {
  if (!list.value.length) {
    await charactersStore.loadCharacters({
      page: 1,
      filter: { name: '', status: CharacterStatus.all }
    })
  }
})
</script>
