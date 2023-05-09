import { createStore } from 'vuex'
import { fetchForecast } from '../api/weather'

const persistedState = JSON.parse(localStorage.getItem('savedCities')) || []

const store = createStore({
  state: {
    savedCities: persistedState
  },
  mutations: {
    addCity(state, city) {
      state.savedCities.push(city)
    },
    removeCity(state, city) {
      state.savedCities = state.savedCities.filter(
        (item) => item.name !== city.name || item.state !== city.state
      )
    }
  },
  actions: {
    async saveCity({ commit, state }, cityData) {
      const cityExists = state.savedCities.some(
        (city) =>
          city.name.toLowerCase() === cityData.name.toLowerCase() &&
          city.state.toLowerCase() === cityData.state.toLowerCase()
      )

      if (!cityExists) {
        const formattedCityData = {
          name: cityData.name.replace(/\b\w/g, (char) => char.toUpperCase()),
          state: cityData.state.replace(/\b\w/g, (char) => char.toUpperCase())
        }
        commit('addCity', formattedCityData)
      }
    },
    async fetchWeatherForecast({ commit }, { city, state }) {
      try {
        const response = await fetchForecast(city, state)
        if (response) {
          return response.list.filter((weather) => {
            return weather.dt_txt.includes('12:00:00')
          })
        }
        return null
      } catch (error) {
        console.error(error)
        return null
      }
    }
  },
  getters: {
    getSavedCities: (state) => state.savedCities
  }
})

store.subscribe((mutation, state) => {
  localStorage.setItem('savedCities', JSON.stringify(state.savedCities))
})

export default store
