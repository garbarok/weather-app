<template>
  <div id="app">
    <h1>Weather App</h1>
    <input type="text" v-model="cityName" placeholder="Enter city name" />
    <button @click="fetchWeather">Get Weather</button>
    <div v-if="forecastData">
      <h2>5 day / 3 hour forecast for {{ cityName }}:</h2>
      <ul>
        <li v-for="(item, index) in forecastData.list" :key="index">
          {{ new Date(item.dt * 1000).toLocaleString() }} - {{ item.weather[0].description }} -
          Temperature: {{ item.main.temp }}°C
        </li>
      </ul>
    </div>
    <div v-if="errorMessage">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityName: '',
      forecastData: null,
      errorMessage: null
    }
  },
  methods: {
    async fetchWeather() {
      this.forecastData = null
      this.errorMessage = null
      const apiKey = 'b3559452851d84d313197321ca4adea5'

      try {
        const coordinates = await this.getCoordinates(apiKey, this.cityName)
        if (coordinates) {
          this.forecastData = await this.getForecastData(apiKey, coordinates)
          if (!this.forecastData) {
            this.errorMessage = "Couldn't fetch forecast data."
          }
        } else {
          this.errorMessage = "Couldn't fetch coordinates."
        }
      } catch (error) {
        this.errorMessage = 'Error fetching weather data.'
      }
    },
    async getCoordinates(apiKey, cityName) {
      const locationApiUrl = `https://api.openweathermap.org/data/2.5/weather`
      const response = await fetch(`${locationApiUrl}?q=${cityName}&appid=${apiKey}`)
      if (response.ok) {
        const locationData = await response.json()
        return { lat: locationData.coord.lat, lon: locationData.coord.lon }
      }
      return null
    },
    async getForecastData(apiKey, coordinates) {
      const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast`
      const response = await fetch(
        `${forecastApiUrl}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
      )
      if (response.ok) {
        return await response.json()
      }
      return null
    }
  }
}
</script>
