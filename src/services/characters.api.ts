import type {
  CharactersQuery,
  CharacterDetailsQuery,
  Character,
  CharactersResponse
} from '@/interfaces'

import { apiBaseUrl } from '@/config'
import axios from 'axios'

export async function fetchCharacters(query: CharactersQuery): Promise<CharactersResponse> {
  const response = await axios
    .get(`${apiBaseUrl}/character`, {
      params: {
        name: query.filter.name,
        status: query.filter.status,
        page: query.page
      }
    })
    .catch((error) => {
      console.warn(error.response.data.error)
    })

  return response?.data ?? { info: { count: 0, pages: 0 }, results: [] }
}

export async function fetchCharacterDetails(
  query: CharacterDetailsQuery
): Promise<Character | null> {
  const response = await axios.get(`${apiBaseUrl}/character/${query.id}`).catch((error) => {
    console.warn(error.response.data.error)
  })

  return response?.data ?? null
}
