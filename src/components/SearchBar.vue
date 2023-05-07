<template>
  <div>
    <input type="text" v-model="cityName" placeholder="Enter city name" />
    <button
      @click="searchCity"
      class="rounded px-6 py-2 text-white hover:opacity-50 border-none bg-orange-500"
    >
      Search
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityName: ''
    }
  },
  methods: {
    searchCity() {
      this.$emit('search', this.cityName)
    }
  }
}
</script>
