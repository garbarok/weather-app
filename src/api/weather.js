const API_KEY = 'b3559452851d84d313197321ca4adea5'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export async function fetchWeather(city, state) {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city},${state}&appid=${API_KEY}&units=metric`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function fetchForecast(city, state) {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city},${state}&appid=${API_KEY}&units=metric`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}
