<template>
  <form
    @submit.prevent="searchWeather"
    class="bg-white p-4 rounded-lg shadow-md"
  >
    <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
      <input
        v-model="cityName"
        :required="!loadingLocation"
        placeholder="City"
        class="flex-grow w-full border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-violet-500"
      />
      <input
        v-model="stateName"
        :required="!loadingLocation"
        placeholder="State"
        class="flex-grow w-full border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-violet-500"
      />
    </div>
    <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 mt-4">
      <button
        type="submit"
        class="bg-violet-500 text-white py-2 px-4 rounded hover:bg-violet-600 transition-colors duration-300 w-full sm:w-auto"
      >
        Search
      </button>
      <button
        @click="handleSaveCity(cityName, stateName)"
        class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300 w-full sm:w-auto mt-2 sm:mt-0"
      >
        Save City
      </button>
      <button
        @click="getCurrentLocation"
        type="button"
        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 w-full sm:w-auto mt-2 sm:mt-0"
      >
        Get Current Location
      </button>
    </div>
  </form>
</template>


<script>
import { fetchWeather } from '../api/weather.js'
import { mapActions } from 'vuex'

export default {
  emits: ['update-weather', 'search-submitted'],
  data() {
    return {
      cityName: '',
      stateName: '',
      loadingLocation: false
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
    },
    async getCurrentLocation() {
      this.loadingLocation = true
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          const API_KEY = import.meta.env.VITE_API_KEY
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
          )

          if (response.ok) {
            const data = await response.json()
            const { name, state } = data[0]
            this.cityName = name
            this.stateName = state
            this.searchWeather()
          } else {
            alert('Unable to get current location')
          }
        },
        (error) => {
          console.error(error)
          alert('Unable to get current location')
        }
      )
      this.loadingLocation = false
    }
  }
}
</script>
