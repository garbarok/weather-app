<template>
  <h3 class="text-3xl font-bold py-5 text-center bg-blue-200 rounded-t-lg">
    Forecast's Week
  </h3>
  <div
    class="p-6 rounded-lg shadow-md bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    <div v-for="weather in weatherForecast" :key="weather.dt"
      class="flex flex-col justify-center items-center rounded-lg p-3 bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
      <h3 class="text-sm md:text-base font-medium">{{ formatDate(weather.dt) }}</h3>
      <img class="w-16 h-16 my-2" :src="`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`"
        :alt="weather.weather[0].description" />
      <p class="text-xs md:text-sm text-gray-700">{{ weather.weather[0].description }}</p>
      <p class="mt-2 text-lg md:text-xl font-semibold">{{ weather.main.temp_max.toFixed(0) }}°C</p>
    </div>
  </div>
</template>



<script>
import { watch, ref, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  props: {
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    }
  },

  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000)
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    }
  },

  setup(props) {
    const store = useStore()
    const weatherForecast = ref(null)

    const fetchWeatherForecast = async () => {
      const weatherData = await store.dispatch('fetchWeatherForecast', {
        city: props.city,
        state: props.state
      })

      weatherForecast.value = weatherData
    }

    onMounted(async () => {
      await fetchWeatherForecast()
    })

    watch(
      () => [props.city, props.state],
      async () => {
        await fetchWeatherForecast()
      },
      { deep: true }
    )

    return {
      weatherForecast
    }
  }
}
</script>
