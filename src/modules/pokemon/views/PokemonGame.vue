<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue'
import PokemonPicture from '../components/PokemonPicture.vue'
import { usePokemonGame } from '../composables/usePokemonGame'
import { GameStatus } from '../interfaces'

const {
  isLoading,
  randomPokemon,
  gameStatus,
  counterWins,
  counterLost,
  pokemonOptions: options,

  //Methods
  checkAnswer,
  getNextRound,
} = usePokemonGame()
</script>

<template>
  <section
    v-if="isLoading || randomPokemon.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando Pokemons</h3>
  </section>
  <section v-else class="flex flex-col items-center justify-center h-screen w-screen">
    <h1>¿Quien es este Pokemón?</h1>
    <div class="h-20">
      {{ counterWins }}
      {{ counterLost }}
      <button
        v-show="gameStatus !== GameStatus.Playing"
        class="bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center"
        @click="getNextRound()"
      >
        Siguiente ronda
      </button>
    </div>

    <!--Picture-->
    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />
    <!--Options-->
    <PokemonOptions
      :options="options"
      :block-selection="gameStatus !== GameStatus.Playing"
      @selected-option="checkAnswer"
      :right-answer="randomPokemon.id"
    />
  </section>
</template>
