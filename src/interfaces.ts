import type { CharacterStatus } from '@/enums'
export interface Character {
  id: string
  name: string
  species: string
  image: string
  status: string
}

export interface Filter {
  status: CharacterStatus
  name: string
}

export interface CharactersQuery {
  filter: Filter
  page: number
}

export interface CharactersResponse {
  info: {
    count: number
    pages: number
  }
  results: Character[]
}

export interface CharacterDetailsQuery {
  id: string
}
