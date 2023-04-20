<template>
  <h2 class="text-2xl text-stone-500">Character details</h2>
  <router-link class="btn" to="/">{{ '<<' }} Back</router-link>
  <LoadingState v-if="isLoading" />
  <div v-else-if="details" class="grid grid-cols-8 grid-rows-6 mt-8">
    <div
      class="bg-emerald-500 col-start-1 sm:col-start-2 col-end-9 row-start-2 row-end-5 grid grid-cols-6 rounded-md"
    >
      <div class="col-start-2 col-end-8 sm:col-start-2 sm:col-end-7 text-white py-32">
        <div class="text-xl">
          <span>{{ `#${details.id} ` }}</span>
          <span class="font-semibold">{{ details.name }}</span>
        </div>
        <div>
          <span>Species: </span><span class="font-semibold">{{ details.species }}</span>
        </div>
        <div>
          <span>Status: </span><span class="font-semibold">{{ details.status }}</span>
        </div>
        <div>
          <span>Gender: </span><span class="font-semibold">{{ details.gender }}</span>
        </div>
        <div>
          <span>Origin: </span><span class="font-semibold">{{ details.origin.name }}</span>
        </div>
        <div>
          <span>Location: </span><span class="font-semibold">{{ details.location.name }}</span>
        </div>
        <div>
          <span>Number of episodes: </span
          ><span class="font-semibold">{{ details.episode.length }}</span>
        </div>
      </div>
    </div>
    <img
      class="col-start-3 col-end-7 sm:col-start-1 sm:col-end-3 row-start-1 row-end-3 rounded-full border-2 sm:border-4 bg-white border-emerald-500 p-1"
      :src="details.image"
      :alt="`Avatar of ${details.name}`"
      :v-show="imgReady"
      @load="imgReady = true"
    />
  </div>
  <EmptyState v-else />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import EmptyState from '@/components/EmptyState.vue'
import LoadingState from '@/components/LoadingState.vue'

import { useCharacterDetailsStore } from '@/stores/characterDetails'

const route = useRoute()

const imgReady = ref(false)

const characterDetailsStore = useCharacterDetailsStore()
const { isLoading, details } = storeToRefs(characterDetailsStore)

onMounted(() => {
  const { id } = route.params
  characterDetailsStore.loadCharacterDetails(typeof id === 'string' ? id : id[0])
})
</script>
