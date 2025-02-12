import { pokemonApi } from '@/modules/pokemon/api/pokemonApi'

describe('pokemonApi', () => {
  test('should be configured as expected', () => {
    const baseUrl = 'https://pokeapi.co/api/v2'
    expect(pokemonApi.defaults.baseURL).toBe(baseUrl)
  })
})
