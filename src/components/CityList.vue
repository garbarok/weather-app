<template>
  <div class="bg-white shadow-md rounded-lg p-4">
    <ul>
      <li v-for="city in limitedCities" :key="city.name" class="mb-2">
        <div @click="onCityClick(city.name, city.state)" class="hover:bg-blue-100 p-1 rounded">
          <router-link :to="`/location-weather/${city.name}/${city.state}`">
            {{ city.name }}, {{ city.state }}
          </router-link>
        </div>
      </li>
    </ul>
    <button
      v-if="savedCities.length > 5"
      @click="toggleShowMore"
      class="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded transition-colors duration-150"
    >
      {{ showMore ? "Show Less" : "Show More" }}
    </button>
  </div>
</template>



<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  emits: ['city-clicked'],
  setup(_, { emit }) {
    const store = useStore();
    const savedCities = computed(() => store.getters.getSavedCities);

    const onCityClick = (cityName, stateName) => {
      const cityData = {
        cityName,
        stateName,
      };
      emit('city-clicked', cityData);
    };

    const showMore = ref(false);
    const toggleShowMore = () => {
      showMore.value = !showMore.value;
    };

    const limitedCities = computed(() => {
      return showMore.value ? savedCities.value : savedCities.value.slice(0, 5);
    });

    return {
      savedCities,
      onCityClick,
      showMore,
      toggleShowMore,
      limitedCities,
    };
  },
};
</script>

