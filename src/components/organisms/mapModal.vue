<template>
  <div class="">
    <Map v-loading="loading" :coordinates="coordinates" :mapData="mapData" />
  </div>
</template>

<script>
export default {
  components: {},

  props: {
    selectedClient: {
      type: Object,
      required: true
    }
  },

  data: function() {
    return {
      coordinates: {
        latitude: 48.864716,
        longitude: 2.349014
      }
    };
  },

  computed: {
    mapData() {
      return [];
    }
  },

  mounted: function() {
    console.debug(this.selectedClient); // eslint-disable-line
  },

  methods: {}
};
</script>

<style lang="scss" module></style>
