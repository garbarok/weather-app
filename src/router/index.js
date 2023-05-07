import { createRouter, createWebHistory } from 'vue-router'
import WeatherViewer from '../components/WeatherViewer.vue'
import CityList from '../components/CityList.vue'
import LocationWeather from '../components/LocationWeather.vue'

const routes = [
  {
    path: '/',
    name: 'WeatherViewer',
    component: WeatherViewer
  },
  {
    path: '/cities',
    name: 'CityList',
    component: CityList
  },
  {
    path: '/location-weather/:city/:state/',
    name: 'location-weather',
    component: LocationWeather,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes
})

export default router
