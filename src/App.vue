<template>
  <div id="app" class="py-8 h-18 bg-[#F5F5F5] h-screen">
    <div class="container mx-auto px-4 max-w-screen-lg">
      <h1 class="text-4xl font-bold text-center p-5">Weather App</h1>
      <SearchForm @update-weather="updateWeather" @search-submitted="onSearchSubmit" class="mb-6" />
      <WeatherViewer v-if="!showRouterView" :weather="weather" class="mb-6" />
      <router-view v-if="showRouterView" class="mb-6"></router-view>
      <today-forecast v-if="city" :city="city" :state="state" class="mb-6"></today-forecast>
      <CityList @city-clicked="onCityClick" />
    </div>
  </div>
</template>

<script>
import WeatherViewer from './components/WeatherViewer.vue'
import SearchForm from './components/SearchForm.vue'
import CityList from './components/CityList.vue'
import TodayForecast from './components/TodayForecast.vue'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { fetchWeather } from './api/weather.js'

export default {
  components: {
    WeatherViewer,
    SearchForm,
    CityList,
    TodayForecast
  },
  setup() {
    const weather = ref(null)
    const router = useRouter()
    const city = ref('')
    const state = ref('')

    onMounted(() => {
      router.push('/')
    })

    const hasWeatherData = computed(() => {
      return city.value !== '' && state.value !== ''
    })

    const updateWeather = (fetchedWeather) => {
      weather.value = fetchedWeather
    }

    const onSearchSubmit = (searchData) => {
      city.value = searchData.cityName
      state.value = searchData.stateName
      router.push('/')
    }

    const onCityClick = async (cityData) => {
      const weather = await fetchWeather(cityData.cityName, cityData.stateName)
      if (weather) {
        updateWeather(weather)
        city.value = cityData.cityName
        state.value = cityData.stateName
      } else {
        alert('Weather data not found')
      }
    }

    const showRouterView = computed(() => {
      return router.currentRoute.value.path !== '/'
    })

    return {
      weather,
      updateWeather,
      onSearchSubmit,
      showRouterView,
      onCityClick,
      city,
      state,
      hasWeatherData
    }
  }
}
</script>

<!-- <style>
html,
body {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  background-color: bg-gradient-to-tl from-sky-500 to-indigo-500;
}
</style> -->
