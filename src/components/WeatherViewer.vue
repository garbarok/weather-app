<template>
  <h3 v-if="currentWeather" class="text-3xl font-bold p-3 text-center">
    Today's Forecast
  </h3>
  <div v-if="currentWeather" class="hero rounded-lg shadow-md h-auto">
    <section class="w-full p-10 grid grid-cols-1 xl:grid-cols-3 grid-rows-2 justify-items-center items-center">
      <div class="flex justify-center items-center flex-col ">
        <h1 class=" text-4xl">
          {{ currentWeather.name }}, {{ currentWeather.sys.country }}
        </h1>
        <h3 class="">{{ formattedDate }}</h3>
      </div>
      <div class="flex justify-center items-center">
        <img class="w-20" :src="`http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`"
          :alt="`${currentWeather.weather[0].description} icon`" />
        <p class="font-semibold text-3xl">{{ currentWeather.weather[0].main }}</p>
      </div>
      <div class="flex justify-center items-center text-3xl">

        <p class="font-semibold">{{ currentWeather.main.temp.toFixed(1) }} °C</p>
      </div>
      <div class="text-center">
        <p class=" font-semibold">{{ currentWeather.main.temp_max.toFixed(1) }}°C</p>
        <p class=" text-xs font-">Highest</p>
      </div>
      <div class="text-center">
        <p class=" font-semibold">{{ currentWeather.main.temp_min.toFixed(1) }}°C</p>
        <p class=" text-xs">Lowest</p>
      </div>
      <div class="text-center">
        <p class=" font-semibold">{{ (currentWeather.wind.speed * 3.4).toFixed(0) }} Km/h</p>
        <p class=" text-xs">Wind</p>
      </div>
      <div class="text-center">
        <p class=" font-semibold">{{ currentWeather.main.pressure }} hPa</p>
        <p class=" text-xs">Pressure</p>
      </div>
      <div class="text-center">
        <p class=" font-semibold">{{ currentWeather.main.humidity }}%</p>
        <p class=" text-xs">Humidity</p>
      </div>
      <div class="text-center">
        <p class=" font-semibold">{{ formatHour(currentWeather.sys.sunrise) }}</p>
        <p class=" text-xs">Sunrise</p>
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

    const formattedDate = computed(() => {
      if (!currentWeather.value || !currentWeather.value.dt) return '';
      return new Date(currentWeather.value.dt * 1000).toLocaleString('en-UK', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });
    });

    const formatHour = (timestamp) => {
      if (!timestamp) return '';
      const date = new Date(timestamp * 1000);
      const formatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      return formatter.format(date);
    };

    return { currentWeather, formattedDate, formatHour };
  }
}
</script>

