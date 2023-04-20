import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

import { fetchCharacters } from '@/services/characters.api'

import type { Characters } from '@/types'
import type { CharactersQuery, CharactersResponse } from '@/interfaces'
import type { Filter } from '@/interfaces'
import { CharacterStatus } from '@/enums'

export const useCharactersStore = defineStore('characters', () => {
  const state: {
    list: Characters
    pages: number
    isLoading: boolean
    page: number
    filter: Filter
  } = reactive({
    list: [],
    pages: 0,
    isLoading: false,
    page: 1,
    filter: { name: '', status: CharacterStatus.all }
  })

  const { pages, list, isLoading, page, filter } = toRefs(state)

  function setFilter(newFilter: Filter) {
    state.filter = newFilter
  }

  function setPage(newPage: number) {
    state.page = newPage
  }

  async function loadCharacters(params: CharactersQuery) {
    isLoading.value = true
    const charactersResponse: CharactersResponse = await fetchCharacters(params)
    list.value = charactersResponse.results
    pages.value = charactersResponse.info.pages
    isLoading.value = false
  }

  return { pages, list, isLoading, page, filter, loadCharacters, setPage, setFilter }
})
