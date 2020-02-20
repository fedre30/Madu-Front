<template>
  <div class="poi-details">
    <div class="detail-container">
      <h2 class="details-title">{{ details.name }}</h2>
      <div class="details-info">{{ details.address }}</div>
      <div class="details-info">{{ details.type }}</div>
      <div class="details-info">{{ details.openingHours }}</div>
      <div class="details-info">{{ details.price }}</div>
      <div class="details-info">{{ details.restrictions }}</div>
    </div>
  </div>
</template>

<script>
import places from "../../public/poi-api-test.json";
export default {
  data: function() {
    return {
      details: this.$route.params
    };
  },

  mounted: function() {
    this.details = places.find(place => place.id == this.$route.params.uid);
  }
};
</script>

<style lang="scss">
.detail-container {
  margin: 2rem;
}
.details-info {
  margin: 1rem 0;
}
</style>
