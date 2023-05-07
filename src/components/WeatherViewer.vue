<template>
  <div
    v-if="currentWeather"
    class="h-46 w-full bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-lg shadow-md grid grid-cols-2 gap-4 items-center"
  >
    <section class="grid grid-flow-col grid-rows-2 items-center">
      <div>
        <h1 class="text-white text-2xl">
          {{ currentWeather.name }}, {{ currentWeather.sys.country }}
        </h1>
        <h2 class="text-white">
          {{
            new Date(currentWeather.dt * 1000).toLocaleString('en-UK', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })
          }}
        </h2>
      </div>
      <img
        class="w-20 h-20 self-start"
        :src="`http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`"
        :alt="`${currentWeather.weather[0].description} icon`"
      />
      <div class="flex flex-col items-center justify-center">
        <p class="text-white text-5xl mb-3">{{ currentWeather.main.temp.toFixed(1) }} °C</p>
        <p class="text-gray-200 text-lg">{{ currentWeather.weather[0].main }}</p>
      </div>
    </section>
    <section class="grid grid-cols-3 grid-rows-2 gap-4">
      <div class="text-center">
        <p class="text-white font-bold">{{ currentWeather.main.temp_max.toFixed(1) }}°C</p>
        <p class="text-gray-200 text-xs">High</p>
      </div>
      <div class="text-center">
        <p class="text-white font-bold">{{ currentWeather.main.temp_min.toFixed(1) }}°C</p>
        <p class="text-gray-200 text-xs">Low</p>
      </div>
      <div class="text-center">
        <p class="text-white font-bold">{{ (currentWeather.wind.speed * 3.4).toFixed(0) }} Km/h</p>
        <p class="text-gray-200 text-xs">Wind</p>
      </div>
      <div class="text-center">
        <p class="text-white font-bold">{{ currentWeather.main.pressure }} hPa</p>
        <p class="text-gray-200 text-xs">Pressure</p>
      </div>
      <div class="text-center">
        <p class="text-white font-bold">{{ currentWeather.main.humidity }}%</p>
        <p class="text-gray-200 text-xs">Humidity</p>
      </div>
      <div class="text-center">
        <p class="text-white font-bold">{{ formatHour(currentWeather.sys.sunrise) }}</p>
        <p class="text-gray-200 text-xs">Sunrise</p>
      </div>
    </section>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  props: ['weather'],
  setup(props) {
    const currentWeather = computed(() => props.weather)
    return { currentWeather }
  },
  methods: {
    formatHour(timestamp) {
      const date = new Date(timestamp * 1000)
      const formatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
      return formatter.format(date)
    }
  }
}
</script>
