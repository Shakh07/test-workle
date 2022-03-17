<template>
  <div class="wrapper">
    <div>
      <div class="flex items-center p-1 justify-around">
        <div class="w-1/4">
          <img
            :src="userProfileImage"
            alt="userIcon"
            class="block rounded-full h-20"
          />
        </div>
        <div class="text-justify p-2 w-4/6">
          <p class="font-bold text-lg">{{ userInfo.name }}</p>
          <div class="flex items-center gap-x-1">
            <location />
            <p class="text-sm text-gray-400">{{ userInfo.location }}</p>
          </div>
        </div>
      </div>
      <p class="text-sm text-justify p-3">
        {{ userInfo.bio }}
      </p>
    </div>
    <div
      class="flex p-2 gap-x-3 border-b border-gray-400 items-center text-gray-400 text-sm"
    >
      <div class="flex gap-x-1 items-center">
        <photos />
        <p>{{ userInfo.total_photos }}</p>
      </div>
      <div class="flex gap-x-1">
        <like />
        <p>{{ userInfo.total_likes }}</p>
      </div>
      <div class="flex gap-x-1 items-center">
        <collection />
        <p>{{ userInfo.total_collections }}</p>
      </div>
    </div>
    <div>
      <img
        class="border border-yellow-300"
        v-for="photo in userPhotos"
        :key="photo.id"
        :src="photo.urls['small']"
        alt="userPhoto"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Location from "../components/Users/icons/Location.vue";
import Photos from "../components/Users/icons/Photos.vue";
import Like from "../components/Users/icons/Like.vue";
import Collection from "../components/Users/icons/Collection.vue";
const API_KEY = "k6unMgPsTj1viPCTeUZgwAC0KTilbQk2ytB-wLcV_dU";
export default {
  components: { Location, Photos, Like, Collection },
  data() {
    return {
      userId: this.$route.params.id,
      userInfo: {},
      userProfileImage: "",
      userPhotos: [],
    };
  },
  async mounted() {
    await this.getUserDataset(this.userId);
  },
  methods: {
    async getUserDataset(id) {
      try {
        const res = await axios.get(
          `https://api.unsplash.com/users/${id}?client_id=${API_KEY}`
        );
        this.userInfo = res.data;
        this.userProfileImage = res.data.profile_image["large"];
        this.userPhotos = res.data.photos;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  font-family: "Roboto Condensed", sans-serif;
}
</style>
