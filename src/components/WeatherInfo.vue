<template>
  <div>
    <div v-if="forecastData">
      <h2>{{ forecastData.city.name }}, {{ forecastData.city.country }}</h2>
      <ul>
        <li v-for="(item, index) in forecastData.list.slice(0, 24)" :key="index">
          {{
            new Date(item.dt * 1000).toLocaleDateString(undefined, {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })
          }}
          - {{ item.main.temp }}°C - {{ item.main.temp_max }}°C - {{ item.main.temp_min }}°C -
          {{ item.main.pressure }} Pressure - {{ item.main.humidity }} Humidity -
          {{ item.wind.speed }} Wind Speed - {{ item.pop }} Precipitation
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
  props: {
    cityName: String,
    forecastData: Object,
    errorMessage: String
  }
}
</script>
