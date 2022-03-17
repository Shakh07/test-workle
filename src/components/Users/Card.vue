<template>
  <div>
    <div>
      <div>
        <img :src="user.profile_image['medium']" alt="userIcon" />
      </div>
      <div>
        <h2>{{ user.name }}</h2>
        <p>@{{ user.social["instagram_username"] }}</p>
      </div>
    </div>
    <div>
      <img :src="userPhoto[0].urls['small']" alt="userPictures" />
    </div>
    <div>{{ photoViews }}</div>
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

<style></style>
