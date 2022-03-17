<template>
  <div id="app">
    <Card v-for="user in usersDataset" :key="user.id" :user="user" />
  </div>
</template>

<script>
import axios from "axios";
import Card from "./components/Users/Card.vue";
const API_KEY = "k6unMgPsTj1viPCTeUZgwAC0KTilbQk2ytB-wLcV_dU";
export default {
  name: "App",
  data() {
    return {
      users: [
        "borkography",
        "slavewire",
        "hybridstorytellers",
        "edwardhowellphotography",
        "glaubersampaio",
        "mahdi_chf",
        "nicsandman20",
        "lloydkearney",
        "thephotographermom",
        "jamie452",
      ],
      usersDataset: [],
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUserDataset(user) {
      try {
        const res = await axios.get(
          `https://api.unsplash.com/users/${user}/?client_id=${API_KEY}`
        );
        this.usersDataset.push(res.data);
      } catch (error) {
        console.log(error);
      }
    },
    getUsers() {
      this.users.forEach((element) => {
        this.getUserDataset(element);
      });
    },
  },
  components: { Card },
};
</script>

<style></style>
