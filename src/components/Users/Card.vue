<template>
  <div class="wrapper">
    <div class="flex items-center ml-2.5 mt-2.5 mb-2.5 gap-x-2.5">
      <div>
        <img
          :src="user.profile_image['medium']"
          alt="userIcon"
          class="block rounded-full w-8 h-8"
        />
      </div>
      <div class="text-xs">
        <p class="font-bold">{{ user.name }}</p>
        <p class="font-extralight text-gray-400">
          @{{ user.social["instagram_username"] }}
        </p>
      </div>
    </div>
    <div>
      <img
        :src="userPhoto[0].urls['small']"
        alt="userPictures"
        class="user-picture"
      />
    </div>
    <div class="flex items-center justify-end gap-x-1.5 mt-3">
      <div class="text-gray-400 text-xs font-bold">{{ photoViews }}</div>
      <div class="mr-2.5">
        <img src="@/assets/icon/eye.png" alt="eye" class="w-5 h-5" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const API_KEY = "k6unMgPsTj1viPCTeUZgwAC0KTilbQk2ytB-wLcV_dU";
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      userPhoto: this.user.photos,
      photoId: this.user.photos[0].id,
      photoViews: 0,
    };
  },
  mounted() {
    this.getPhotoViews(this.photoId);
  },
  methods: {
    async getPhotoViews(id) {
      try {
        const res = await axios.get(
          `https://api.unsplash.com/photos/${id}/statistics/?client_id=${API_KEY}`
        );
        this.photoViews = res.data.views["total"];
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
@media screen and (max-width: 320px) {
  .user-picture {
    width: 320px;
    height: 230px;
  }
}
</style>
