<template>
  <div class="home">
    <Map
      v-loading="loadingPos || loadingMarkers"
      :coordinates="coordinates"
      :key="keygen"
      :mapData="mapData"
    />
  </div>
</template>

<script>
import Map from "../components/atoms/Map";
import openGeocoder from "node-open-geocoder";
import { mapActions } from "vuex";
export default {
  name: "home",
  components: {
    Map
  },
  data: function() {
    return {
      loadingPos: false,
      loadingMarkers: false,
      coordinates: {
        latitude: 48.864716,
        longitude: 2.349014
      },
      mapData: []
    };
  },
  computed: {
    keygen() {
      return `${this.coordinates.latitude}${this.coordinates.longitude}${this.mapData.length}`;
    }
  },
  mounted() {
    this.loadingPos = true;
    this.loadingMarkers = true;
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.$set(this.coordinates, "latitude", pos.coords.latitude);
        this.$set(this.coordinates, "longitude", pos.coords.longitude);
        this.loadingPos = false;
      },
      error => {
        console.error(error); //eslint-disable-line
        this.loadingPos = false;
      }
    );
    this.fetchData({ modelName: "shops" }).then(resp => {
      resp.data.forEach((poi, index) => {
        openGeocoder()
          .geocode(`${poi.adress}, ${poi.zipcode} ${poi.city}`)
          .end((err, res) => {
            this.mapData.push({
              name: poi.name,
              coords: {
                latitude: res[0].lat,
                longitude: res[0].lon
              }
            });
            if (index + 1 === resp.data.length) {
              this.loadingMarkers = false;
            }
          });
      });
    });
  },
  methods: {
    ...mapActions(["fetchData"])
  }
};
</script>

<style lang="scss">
.home {
  padding: 2rem;
}
</style>
