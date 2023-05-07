<template>
  <div>
    <h3>{{ formatHour(hourWeather.dt * 1000) }}</h3>
    <p>{{ hourWeather.weather[0].description }}</p>
    <p>{{ hourWeather.main.temp.toFixed(1) }}°C</p>
  </div>
</template>

<script>
export default {
  props: {
    hourWeather: Object
  },
  methods: {
    formatHour(timestamp) {
      const date = new Date(timestamp)
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
