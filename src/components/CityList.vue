<template>
  <h3 class="text-3xl font-bold p-5 text-center">
    Saved Locations
  </h3>
  <div class=" shadow-md rounded-lg p-4" v-if="limitedCities.length == 0">You have not saved any location yet.
  </div>
  <div class=" shadow-md rounded-lg p-4" v-if="limitedCities.length != 0">
    <ul class="space-y-2">
      <li v-for="city in limitedCities" :key="city.name">
        <div @click="onCityClick(city.name, city.state)" class="group p-1 rounded cursor-pointer">
          <div class="flex items-center justify-between">

            <router-link :to="`/location-weather/${city.name}/${city.state}`" class="block">
              {{ city.name }}, {{ city.state }}
            </router-link>
            <button @click.stop="deleteCity(city)"
              class="touch-device-visible btn btn-warning opacity-0 group-hover:opacity-100">Delete</button>
          </div>
        </div>
      </li>
    </ul>
    <button v-if="savedCities.length > 5" @click="toggleShowMore"
      class="btn btn-outline-primary py-1 px-2 rounded transition-colors duration-150 w-full mt-2">
      {{ showMore ? 'Show Less' : 'Show More' }}
    </button>
  </div>
</template>



<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  emits: ['city-clicked'],
  setup(_, { emit }) {
    const store = useStore()
    const savedCities = computed(() => store.getters.getSavedCities)

    const onCityClick = (cityName, stateName) => {
      const cityData = {
        cityName,
        stateName
      }
      emit('city-clicked', cityData)
    }
    const deleteCity = (city) => {
      store.commit('removeCity', city)
    }
    const showMore = ref(false)
    const toggleShowMore = () => {
      showMore.value = !showMore.value
    }

    const limitedCities = computed(() => {
      return showMore.value ? savedCities.value : savedCities.value.slice(0, 5)
    })

    return {
      savedCities,
      onCityClick,
      showMore,
      toggleShowMore,
      limitedCities,
      deleteCity
    }
  }
}
</script>

<style scoped>
@media (hover: none) {
  .touch-device-visible {
    opacity: 100 !important;
  }
}
</style>
