<template>
  <div
    class="bg-black text-white h-16 flex items-center justify-center opacity-90 fixed left-0 right-0 bottom-0 gap-x-3"
  >
    <div
      class="flex gap-x-3 text-xs"
      :class="{ 'next-pages': currentPage === firstPage }"
    >
      <button @click="goToFirstpage">{{ firstPage }}</button>
      <p>...</p>
      <button @click="goToPrevPage">
        {{ currentPage - 1 }}
      </button>
    </div>
    <button>{{ currentPage }}</button>
    <div
      class="flex gap-x-3 text-xs"
      :class="{ 'next-pages': currentPage === lastPage }"
    >
      <button @click="goToNextPage">
        {{ currentPage + 1 }}
      </button>
      <p>...</p>
      <p @click="goToLastpage" class="cursor-pointer">{{ lastPage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lastPage: 59,
      firstPage: 1,
      currentPage: 5,
    };
  },
  methods: {
    goToNextPage() {
      if (this.currentPage < this.lastPage - 1) {
        this.currentPage++;
        this.$emit("page", this.currentPage);
      }
    },
    goToPrevPage() {
      if (this.currentPage > this.firstPage + 1) {
        this.currentPage--;
        this.$emit("page", this.currentPage);
      }
    },
    goToFirstpage() {
      this.currentPage = this.firstPage;
      this.$emit("page", this.currentPage);
    },
    goToLastpage() {
      this.currentPage = this.lastPage;
      this.$emit("page", this.currentPage);
    },
  },
};
</script>

<style scoped>
.next-pages {
  visibility: hidden;
}
</style>
