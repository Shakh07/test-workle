<template>
  <div class="wrapper">
    <div class="p-2 xl:flex xl:justify-center">
      <div>
        <img
          :src="userProfileImage"
          alt="userIcon"
          class="block rounded-full h-16 xs:h-28"
        />
      </div>
      <div class="flex-col items-center">
        <div class="text-justify p-2">
          <p class="font-bold text-lg">{{ userInfo.name }}</p>
          <div class="flex items-center gap-x-1">
            <location />
            <p class="text-sm text-gray-400">{{ userInfo.location }}</p>
          </div>
        </div>
        <p class="text-sm text-justify p-3">
          {{ userInfo.bio }}
        </p>
      </div>
    </div>
    <div class="flex p-2 gap-x-3 items-center text-gray-400 text-sm ml-2">
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
    <div
      class="flex flex-wrap justify-center border-t border-gray-400 md:gap-x-8"
    >
      <img
        class="mt-4 user-picture"
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
  mounted() {
    this.getUserDataset(this.userId);
    this.getUserPhotos(this.userId);
  },
  methods: {
    async getUserDataset(id) {
      try {
        const res = await axios.get(
          `https://api.unsplash.com/users/${id}?client_id=${API_KEY}`
        );
        this.userInfo = res.data;
        this.userProfileImage = res.data.profile_image["large"];
        // this.userPhotos = res.data.photos;
      } catch (error) {
        console.log(error);
      }
    },
    async getUserPhotos(id) {
      try {
        const res = await axios.get(
          `https://api.unsplash.com/users/${id}/photos?client_id=${API_KEY}`
        );
        this.userPhotos = res.data;
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
.user-picture {
  object-fit: cover;
}
@media screen and (min-width: 320px) {
  .user-picture {
    width: 320px;
    height: 230px;
  }
}
@media screen and (min-width: 480px) {
  .user-picture {
    width: 440px;
    height: 300px;
  }
}
@media screen and (min-width: 768px) {
  .user-picture {
    width: 350px;
    height: 250px;
  }
}
</style>
