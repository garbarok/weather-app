<template>
  <div v-if="forecastData">
    <HourWeather
      v-for="(item, index) in forecastData.list.slice(1, 8)"
      :key="index"
      :hourWeather="item"
    />
  </div>
  <div v-if="errorMessage">
    <p>{{ errorMessage }}</p>
  </div>
</template>

<script>
import HourWeather from './HourWeather.vue'

export default {
  components: {
    HourWeather
  },
  props: {
    cityName: String,
    forecastData: Object,
    errorMessage: String
  }
}
</script>
