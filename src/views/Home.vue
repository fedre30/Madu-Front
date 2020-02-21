<template>
  <div
    v-loading="loadingPos || loadingMarkersPOI || loadingMarkersCompanies"
    class="home"
  >
    <el-radio-group
      v-model="showOptions"
      size="small"
      style="margin-bottom: 20px;"
    >
      <el-radio-button label="poi">Point d'intérêt</el-radio-button>
      <el-radio-button label="both"
        >Points d'intérêt et entreprises</el-radio-button
      >
      <el-radio-button label="companies">Entreprises</el-radio-button>
    </el-radio-group>
    <Map
      :coordinates="coordinates"
      :key="keygen"
      :mapData="mapData"
      :mapDataAlt="mapDataAlt"
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
      loadingMarkersPOI: false,
      loadingMarkersCompanies: false,
      coordinates: {
        latitude: 48.864716,
        longitude: 2.349014
      },
      mapData: [],
      mapDataAlt: [],
      showOptions: "poi",
      pois: [],
      companies: []
    };
  },
  watch: {
    showOptions(val) {
      this.mapData = [];
      this.mapDataAlt = [];
      if (val === "poi" || val === "both") {
        this.mapData = this.pois;
      }
      if (val === "companies" || val === "both") {
        this.mapDataAlt = this.companies;
      }
    }
  },
  computed: {
    keygen() {
      return `${this.coordinates.latitude}${this.coordinates.longitude}${this.mapData.length}${this.mapDataAlt.length}`;
    }
  },
  mounted() {
    this.fetchMapData();
  },
  methods: {
    ...mapActions(["fetchData"]),
    fetchMapData() {
      this.loadingPos = true;
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
      this.loadingMarkersPOI = true;
      this.fetchData({ modelName: "shops" }).then(resp => {
        if (resp.data.length === 0) {
          this.loadingMarkersPOI = false;
        }
        resp.data.forEach((poi, index) => {
          openGeocoder()
            .geocode(`${poi.adress}, ${poi.zipcode} ${poi.city}`)
            .end((err, res) => {
              this.pois.push({
                name: poi.name,
                coords: {
                  latitude: res[0].lat,
                  longitude: res[0].lon
                }
              });
              if (index + 1 === resp.data.length) {
                this.loadingMarkersPOI = false;
                this.mapData = this.pois;
              }
            });
        });
      });
      this.loadingMarkersCompanies = true;
      this.fetchData({ modelName: "structures" }).then(resp => {
        if (resp.data.length === 0) {
          this.loadingMarkersCompanies = false;
        }
        resp.data.forEach((structure, index) => {
          openGeocoder()
            .geocode(
              `${structure.address}, ${structure.zipCode} ${structure.city}`
            )
            .end((err, res) => {
              this.companies.push({
                name: structure.name,
                coords: {
                  latitude: res[0].lat,
                  longitude: res[0].lon
                }
              });
              if (index + 1 === resp.data.length) {
                this.loadingMarkersCompanies = false;
              }
            });
        });
      });
    }
  }
};
</script>

<style lang="scss">
.home {
  padding: 2rem;
}
</style>
