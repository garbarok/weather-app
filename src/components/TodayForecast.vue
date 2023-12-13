<template>
  <h3 class="text-3xl font-bold p-5 text-center">
    Forecast's Week
  </h3>
  <div class="h-full sm:h-46 w-full p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
    <div v-for="weather in weatherForecast" :key="weather.dt"
      class=" flex flex-col justify-center items-center rounded p-4">
      <h3 class=" text-center">{{ formatDate(weather.dt) }}</h3>
      <img class="mx-auto my-2 w-[70px]" :src="`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`"
        :alt="weather.weather[0].description" />
      <div class="">
        <p>{{ weather.weather[0].description }}</p>
      </div>
      <p class="p-2 text-center text-2xl font-semibold">{{ weather.main.temp_max.toFixed(1) }}°C</p>
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
