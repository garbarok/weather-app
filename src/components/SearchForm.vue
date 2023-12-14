<template>
  <form @submit.prevent="searchWeather" class="rounded-lg shadow-md p-4 bg-white">
    <div class="flex flex-col sm:flex-row sm:items-center gap-4">
      <input v-model="cityName" :required="!loadingLocation" placeholder="City"
        class="flex-grow input input-bordered w-full rounded" />
      <input v-model="stateName" :required="!loadingLocation" placeholder="State"
        class="flex-grow input input-bordered w-full rounded" />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      <button type="submit" class="btn btn-outline btn-primary rounded py-2 px-4 w-full">
        Search
      </button>
      <button @click="handleSaveCity(cityName, stateName)" class="btn btn-outline btn-secondary rounded py-2 px-4 w-full">
        Save City
      </button>
      <button @click="getCurrentLocation" type="button" class="btn btn-outline btn-accent rounded py-2 px-4 w-full">
        Current Location
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
