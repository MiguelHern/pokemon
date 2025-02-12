import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue'
import { mount } from '@vue/test-utils'

describe('<PokemonPicture>', () => {
  test('should render the hidden image when showPokemon props is false', () => {
    const imageSource =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg'

    const wrapper = mount(PokemonPicture, {
      props: { pokemonId: 25, showPokemon: false },
    })

    const image = wrapper.find('img')

    expect(image.exists()).toBeTruthy()

    expect(image.attributes('src')).toBe(imageSource)

    const attributes = image.attributes()

    expect(attributes).toEqual(
      expect.objectContaining({
        class: 'brightness-0 h-48',
        src: imageSource,
      }),
    )
  })

  test('should render the image when showPokemon props is true', () => {
    const imageSource =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg'

    const wrapper = mount(PokemonPicture, {
      props: { pokemonId: 25, showPokemon: true },
    })

    const image = wrapper.find('img')

    expect(image.exists()).toBeTruthy()

    expect(image.attributes('src')).toBe(imageSource)

    const attributes = image.attributes()

    expect(attributes).toEqual(
      expect.objectContaining({
        class: 'fade-in h-48',
        src: imageSource,
      }),
    )
  })
})
