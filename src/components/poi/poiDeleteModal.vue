<template>
  <el-dialog
    title="Supprimer"
    :visible.sync="showModal"
    width="60%"
    append-to-body
    @close="showModal = false"
  >
    Êtes-vous sûr(e) de vouloir supprimer {{ shop.name }} ?
    <span slot="footer">
      <el-button @click="showModal = false">Annuler</el-button>
      <el-button type="primary" @click="deleteShop()">Supprimer</el-button>
    </span>
  </el-dialog>
</template>

<script>
import axios from "axios";
export default {
  components: {},

  props: {
    shop: {
      type: Object,
      required: true
    }
  },

  data: function() {
    return {
      showModal: false
    };
  },

  computed: {},

  mounted: function() {},

  methods: {
    open() {
      this.showModal = true;
    },
    deleteShop() {
      axios.delete(
        `${window.config.api_root_url}shops/delete/${this.shop._id}`
      );
      this.showModal = false;
      this.$router.go();
    }
  }
};
</script>

<style lang="scss" module></style>
