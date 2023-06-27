<template>
  <router-link class="main-div" :to="'/news/' + id">
    <div class="text-div">
      <p class="description">{{ formatDescription(description) }}</p>

      <div class="article-details">
        <span>{{ author }}</span> {{ timeAgo }}
      </div>
    </div>
    <div class="image-div">
      <img :src="imgSrc" :alt="imgAlt" />
    </div>
  </router-link>
</template>

<script>
export default {
  name: "NewsCard",
  props: ["id", "imgSrc", "imgAlt", "description", "author", "timeAgo"],
  methods: {
    formatDescription(description) {
      if (description.length <= 70) {
        return description;
      } else {
        return description.slice(0, 70) + "...";
      }
    },
  },
};
</script>
<style scoped>
.main-div {
  justify-content: space-around;
  margin-right: 0;
  padding-right: 0;
  margin: 20px 0;
  max-height: 128px;
  display: flex;
  border-radius: 25px;
  background-color: white;
  color: black;
  font-weight: 500;
}
a {
  text-decoration: none;
}
.text-div {
  flex: 0 0 65%;
  padding: 8px;
}
.article-details span {
  color: #7458ea;
}
.article-details {
  text-align: right;
  font-size: 14px;
}

.image-div {
  margin: 4px 4px 4px 0;
  width: 120px;
  height: 120px;
  border-radius: 25px;
  overflow: hidden;
}

.image-div img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
