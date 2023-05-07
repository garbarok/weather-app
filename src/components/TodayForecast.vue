<template>
  <div class="h-46 w-full bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-lg shadow-md grid grid-cols-5 gap-4 items-center">
    <div v-for="weather in weatherForecast" :key="weather.dt" class="bg-blue-600 rounded p-4">
      <h3 class="text-white text-center">{{ formatDate(weather.dt) }}</h3>
      <img
        class="mx-auto my-2"
        :src="`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`"
        :alt="weather.weather[0].description"
      />
      <div class="flex justify-center">
        <p class="text-white">{{ weather.main.temp_max.toFixed(1) }}°C</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  props: {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
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

    onMounted(async () => {
      const weatherData = await store.dispatch('fetchWeatherForecast', {
        city: props.city,
        state: props.state,
      })

      weatherForecast.value = weatherData
    })

    return {
      weatherForecast
    }
  }
}
</script>

<style scoped>
div {
  background-color: #104a9a;
}
</style>
