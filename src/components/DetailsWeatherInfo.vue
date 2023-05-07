<template>
  <div>
    <div v-if="forecastData">
      <h1 class="text-xl font-bold">
        {{ forecastData.city.name }}, {{ forecastData.city.country }}
      </h1>
      <h3>
        {{
          new Date(forecastData.list[0].dt * 1000).toLocaleDateString(undefined, {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
          })
        }}
      </h3>
    </div>
    <div class="grid grid-cols-3 gap-4 items-center">
      <div>
        <div>
          <div>ICON</div>
          <div class="mt-2">{{ forecastData.list[0].weather[0].description }}</div>
        </div>
        <div class="border-l-2 border-gray-300 h-full mx-4"></div>
        <div class="text-4xl">{{ Math.round(forecastData.list[0].main.temp) }}°C</div>
        <section class="grid grid-cols-3 grid-rows-2 gap-4">
          <div>Max: {{ Math.round(forecastData.list[0].main.temp_max) }}°C</div>
          <div>Min: {{ Math.round(forecastData.list[0].main.temp_min) }}°C</div>
          <div>Pressure: {{ forecastData.list[0].main.pressure }} hPa</div>
          <div>Humidity: {{ forecastData.list[0].main.humidity }}%</div>
          <div>Wind Speed: {{ (forecastData.list[0].wind.speed * 3.6).toFixed(1) }} km/h</div>
          <div>Precipitation: {{ forecastData.list[0].pop }}%</div>
        </section>
      </div>
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
