<template>
  <el-dialog
    title="Supprimer"
    :visible.sync="showModal"
    width="60%"
    append-to-body
    @close="showModal = false"
  >
    Êtes-vous sûr(e) de vouloir supprimer {{ shop ? shop.name : "ce lieu" }} ?
    <span slot="footer">
      <el-button @click="showModal = false">Annuler</el-button>
      <el-button type="primary" @click="deleteShop()">Supprimer</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data: function() {
    return {
      showModal: false,
      shop: {}
    };
  },

  methods: {
    open(shop) {
      this.shop = shop;
      this.showModal = true;
    },
    deleteShop() {
      this.$store.dispatch("deleteItem", {
        item: this.shop,
        model: "shops"
      });
      this.showModal = false;
    }
  }
};
</script>

<style lang="scss" module></style>
