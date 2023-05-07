<template>
  <form @submit.prevent="searchWeather" class="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
    <input
      v-model="cityName"
      placeholder="City"
      class="flex-grow border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-violet-500"
      required
    />
    <input
      v-model="stateName"
      placeholder="State"
      class="flex-grow border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-violet-500"
      required
    />
    <button type="submit" class="bg-violet-500 text-white py-2 px-4 rounded hover:bg-violet-600 transition-colors duration-300">Search</button>
    <button
      @click="handleSaveCity(cityName, stateName)"
      class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300"
    >
      Save City
    </button>
  </form>
</template>

<script>
import { fetchWeather } from '../api/weather.js'
import { mapActions } from 'vuex'

export default {
  emits: ['update-weather', 'search-submitted'], // add the search-submitted event
  data() {
    return {
      cityName: '',
      stateName: ''
    }
  },
  methods: {
    ...mapActions(['saveCity']),
    async searchWeather() {
      const weather = await fetchWeather(this.cityName, this.stateName)
      if (weather) {
        this.$emit('update-weather', weather)
        this.$emit('search-submitted', { cityName: this.cityName, stateName: this.stateName })
      } else {
        alert('Weather data not found')
      }
    },
    handleSaveCity(cityName, stateName) {
      const city = {
        name: cityName,
        state: stateName
      }
      this.saveCity(city)
    }
  }
}
</script>
