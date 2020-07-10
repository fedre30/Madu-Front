<template>
  <div class="mapView">
    <div id="map" ref="mapElement"></div>
  </div>
</template>

<script>
import L from "leaflet";

export default {
  name: "Map",
  props: {
    coordinates: {
      type: Object,
      required: true
    },
    mapData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    mapDataAlt: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data: function() {
    return {
      loading: false
    };
  },
  mounted() {
    this.loading = true;
    const mymap = L.map(this.$refs["mapElement"]).setView(
      [this.coordinates.latitude, this.coordinates.longitude],
      13
    );
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        accessToken:
          "pk.eyJ1IjoiZmVkcmUzMCIsImEiOiJjazV4dmprMTAxMXJ0M3Bwb3Vmamp3cjl3In0.xZ4xLHxklPwmZ_SMuPQtnw"
      }
    ).addTo(mymap);
    this.mapData.forEach(shop => {
      L.marker([shop.coords.latitude, shop.coords.longitude])
        .addTo(mymap)
        .bindPopup(shop.name)
        .openPopup();
    });

    var companyIcon = L.icon({
      iconUrl: "https://image.flaticon.com/icons/svg/2599/2599741.svg",

      iconSize: [38, 38],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -86]
    });
    this.mapDataAlt.forEach(structure => {
      L.marker([structure.coords.latitude, structure.coords.longitude], {
        icon: companyIcon
      })
        .addTo(mymap)
        .bindPopup(structure.name)
        .openPopup();
    });
    this.loading = false;
  }
};
</script>

<style lang="scss" scoped>
#map {
  height: calc(100vh - 85px - 140px); // window - title - padding
  // height: 600px;
}
</style>
