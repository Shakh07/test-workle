<template>
  <div id="app">
    <div class="mb-20">
      <Card v-for="image in imagesDataset" :key="image.id" :image="image" />
    </div>
    <div
      class="bg-black text-white h-16 flex items-center justify-center opacity-90 fixed left-0 right-0 bottom-0"
    >
      <button class="block">1</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Card from "./components/Users/Card.vue";
const API_KEY = "k6unMgPsTj1viPCTeUZgwAC0KTilbQk2ytB-wLcV_dU";
export default {
  name: "App",
  components: { Card },
  data() {
    return {
      imagesDataset: [],
    };
  },
  mounted() {
    this.getUserDataset();
  },
  methods: {
    async getUserDataset() {
      try {
        const res = await axios.get(
          `https://api.unsplash.com/photos?client_id=${API_KEY}`
        );
        this.imagesDataset = res.data;
        console.log(this.imagesDataset);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
