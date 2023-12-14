<template>
  <section class="pt-4">
    <h3 class="text-3xl font-bold py-5 text-center bg-blue-200 rounded-t-lg">
      Saved Locations
    </h3>
    <div v-if="limitedCities.length == 0" class="shadow-md rounded-lg p-4 bg-white text-center">
      You have not saved any location yet.
    </div>
    <div v-if="limitedCities.length != 0" class="shadow-md rounded-lg p-4 bg-white">
      <ul class="divide-y divide-gray-200">
        <li v-for="city in limitedCities" :key="city.name" class="py-2">
          <div @click="onCityClick(city.name, city.state)"
            class="group rounded cursor-pointer hover:bg-gray-100 transition-colors duration-300">
            <div class="flex items-center justify-between">
              <router-link :to="`/location-weather/${city.name}/${city.state}`"
                class="block text-blue-600 hover:text-blue-800 transition-colors duration-300">
                {{ city.name }}, {{ city.state }}
              </router-link>
              <button @click.stop="deleteCity(city)"
                class="touch-device-visible btn btn-warning opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Delete
              </button>
            </div>
          </div>
        </li>
      </ul>
      <button v-if="savedCities.length > 5" @click="toggleShowMore"
        class="btn btn-outline-primary py-1 px-2 rounded transition-colors duration-150 w-full mt-4 hover:bg-blue-500 hover:text-white">
        {{ showMore ? 'Show Less' : 'Show More' }}
      </button>
    </div>
  </section>
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
