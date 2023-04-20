import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

import type { Character } from '@/interfaces'
import { fetchCharacterDetails } from '@/services/characters.api'

export const useCharacterDetailsStore = defineStore('characterDetails', () => {
  const state: { details: Character | null; isLoading: boolean } = reactive({
    details: null,
    isLoading: false
  })

  const { details, isLoading } = toRefs(state)

  async function loadCharacterDetails(id: string) {
    isLoading.value = true
    const characterDetailsResponse = await fetchCharacterDetails({ id })
    details.value = characterDetailsResponse
    isLoading.value = false
  }

  return { isLoading, details, loadCharacterDetails }
})
