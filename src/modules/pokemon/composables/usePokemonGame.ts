import { computed, onMounted, ref } from 'vue'
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces'
import { pokemonApi } from '../api/pokemonApi'
import confetti from 'canvas-confetti'

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing)
  const pokemons = ref<Pokemon[]>([])
  const counterWins = ref(0)
  const counterLost = ref(0)

  const pokemonOptions = ref<Pokemon[]>([])

  const isLoading = computed(() => pokemons.value.length === 0)
  const randomPokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length)
    return pokemonOptions.value[randomIndex]
  })

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/ability/?limit=151')

    const pokemonsArray = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/')
      const id = urlParts.at(-2) ?? 0

      return {
        name: pokemon.name,
        id: +id,
      }
    })
    return pokemonsArray.sort(() => Math.random() - 0.5)
  }

  const getNextRound = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing
    pokemonOptions.value = pokemons.value.slice(0, howMany)
    pokemons.value = pokemons.value.slice(howMany)
    onMountedSetup()
  }

  const checkAnswer = (id:number) =>{
    if (gameStatus.value !== GameStatus.Playing) return
    const hasWon = randomPokemon.value.id === id;

    if(hasWon){
      gameStatus.value = GameStatus.Won
      counterWins.value ++
      confetti({
        particleCount: 300,
        spread: 150,
        origin: {y:0.6}
      })
      return;
    }
    gameStatus.value = GameStatus.Lost
    counterLost.value ++
  }

  onMounted(async () => {
    pokemons.value = await getPokemons()
    getNextRound()
    console.log(pokemonOptions.value)
  })

  return {
    gameStatus,
    isLoading,
    randomPokemon,
    counterWins,
    counterLost,
    //Methods
    getNextRound,

    //Variables
    pokemonOptions,
    checkAnswer
  }
}
function onMountedSetup() {
  throw new Error('Function not implemented.')
}

