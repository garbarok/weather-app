<template>
  <section class="pt-2">
    <h3 v-if="currentWeather" class="text-3xl font-bold py-3 text-center bg-blue-200 rounded-t-lg">
      Today's Forecast
    </h3>
    <div v-if="currentWeather" class="rounded-lg shadow-lg p-6 bg-white">
      <section class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-center text-center">
        <div>
          <h1 class="text-xl md:text-2xl xl:text-3xl font-semibold">
            {{ currentWeather.name }}, {{ currentWeather.sys.country }}
          </h1>
          <h3 class="text-sm md:text-lg">{{ formattedDate }}</h3>
        </div>
        <div
          class="flex flex-col items-center md:flex-row md:items-center md:justify-center space-y-2 md:space-y-0 md:space-x-4">
          <img class="w-20 md:w-24 xl:w-28" :src="`http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`"
            :alt="`${currentWeather.weather[0].description} icon`" />
          <p class="font-semibold text-lg md:text-xl xl:text-2xl">{{ currentWeather.weather[0].main }}</p>
        </div>
        <div>
          <p class="font-semibold text-xl md:text-2xl">{{ currentWeather.main.temp.toFixed(0) }} °C</p>
        </div>
        <div>
          <p class="font-semibold">{{ currentWeather.main.temp_max.toFixed() }}°C</p>
          <p class="text-xs">Highest</p>
        </div>
        <div>
          <p class="font-semibold">{{ currentWeather.main.temp_min.toFixed() }}°C</p>
          <p class="text-xs">Lowest</p>
        </div>
        <div>
          <p class="font-semibold">{{ (currentWeather.wind.speed * 3.4).toFixed(0) }} Km/h</p>
          <p class="text-xs">Wind</p>
        </div>
        <div>
          <p class="font-semibold">{{ currentWeather.main.pressure }} hPa</p>
          <p class="text-xs">Pressure</p>
        </div>
        <div>
          <p class="font-semibold">{{ currentWeather.main.humidity }}%</p>
          <p class="text-xs">Humidity</p>
        </div>
        <div>
          <p class="font-semibold">{{ formatHour(currentWeather.sys.sunrise) }}</p>
          <p class="text-xs">Sunrise</p>
        </div>
      </section>
    </div>
  </section>
</template>


<script>
import { fetchWeather } from '../api/weather.js'
import { ref, watch, watchEffect } from 'vue'

export default {
  props: ['city', 'state'],

  setup(props) {
    const currentWeather = ref(null)

    const fetchWeatherData = async () => {
      const { city, state } = props
      currentWeather.value = await fetchWeather(city, state)
    }

    watchEffect(fetchWeatherData)

    watch(
      () => ({ city: props.city, state: props.state }),
      async (newProps) => {
        const { city, state } = newProps
        currentWeather.value = await fetchWeather(city, state)
      },
      { deep: true }
    )

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
