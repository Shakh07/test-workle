<template>
  <div class="wrapper">
    <div
      class="flex items-center ml-2.5 mt-2.5 mb-2.5 gap-x-2.5 xs:ml-0 md:ml-2.5"
    >
      <router-link
        :to="{ name: 'user', params: { id: image.user['username'] } }"
      >
        <div>
          <img
            :src="image.user.profile_image['medium']"
            alt="userIcon"
            class="block rounded-full w-8 h-8"
          />
        </div>
        <div class="text-xs">
          <p class="font-bold">{{ image.user["name"] }}</p>
          <p class="font-extralight text-gray-400">
            @{{ image.user.social["instagram_username"] }}
          </p>
        </div>
      </router-link>
    </div>
    <div class="flex justify-center">
      <img :src="image.urls['small']" alt="userPictures" class="user-picture" />
    </div>
    <div class="flex items-center justify-end gap-x-1.5 mt-3 mb-2">
      <div class="text-gray-400 text-xs font-bold">{{ photoViews }}</div>
      <div class="mr-2.5">
        <eye-icon />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EyeIcon from "./icons/EyeIcon.vue";
const API_KEY = "k6unMgPsTj1viPCTeUZgwAC0KTilbQk2ytB-wLcV_dU";
export default {
  components: { EyeIcon },
  props: {
    image: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      photoId: this.image.id,
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
    width: 320px;
    height: 230px;
  }
}
</style>
