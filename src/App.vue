<template>
  <div id="app">
    <div class="mb-20">
      <Card v-for="image in imagesDataset" :key="image.id" :image="image" />
    </div>
    <pagination @page="getPage" />
  </div>
</template>

<script>
import axios from "axios";
import Card from "./components/Users/Card.vue";
import Pagination from "./components/Pagination.vue";
const API_KEY = "k6unMgPsTj1viPCTeUZgwAC0KTilbQk2ytB-wLcV_dU";
export default {
  name: "App",
  components: { Card, Pagination },
  data() {
    return {
      imagesDataset: [],
      currentPage: 5,
    };
  },
  mounted() {
    this.getUserDataset(this.currentPage);
  },
  watch: {
    currentPage(newValue) {
      this.getUserDataset(newValue);
    },
  },
  methods: {
    async getUserDataset(page) {
      try {
        const res = await axios.get(
          `https://api.unsplash.com/photos?page=${page}&client_id=${API_KEY}`
        );
        this.imagesDataset = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    getPage(val) {
      this.currentPage = val;
    },
  },
};
</script>

<style></style>
