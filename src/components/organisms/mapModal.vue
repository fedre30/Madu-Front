<template>
  <div class="">
    <el-dialog
      title="Archivage"
      :visible.sync="showModal"
      width="60%"
      append-to-body
      @close="showModal = false"
    >
      <Map :coordinates="coordinates" :mapDataAlt="mapDataAlt" />
      <span slot="footer">
        <el-button @click="showModal = false">Fermer</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    selectedClient: {
      type: Object,
      required: true
    },
    clientCoords: {
      type: Object,
      required: true
    }
  },

  data: function() {
    return {
      coordinates: {
        latitude: 48.864716,
        longitude: 2.349014
      },
      showModal: false
    };
  },

  computed: {
    mapDataAlt() {
      let mapData = []
      mapData.push(this.selectedClient);
      return mapData;
    }
  },

  methods: {
    open() {
      this.showModal = true;
    }
  }
};
</script>

<style lang="scss" module></style>
