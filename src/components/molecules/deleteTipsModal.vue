<template>
  <el-dialog
    title="Supprimer"
    :visible.sync="showModal"
    width="60%"
    append-to-body
    @close="showModal = false"
  >
    Êtes-vous sûr(e) de vouloir supprimer {{ reward.name }} ?
    <span slot="footer">
      <el-button @click="showModal = false">Annuler</el-button>
      <el-button type="primary" @click="deletetip()">Supprimer</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data: function() {
    return {
      showModal: false,
      reward: {}
    };
  },

  methods: {
    open(reward) {
      this.reward = reward;
      this.showModal = true;
    },
    deletetip() {
      this.$store.dispatch("deleteItem", {
        item: this.reward,
        model: "rewards"
      });
      this.showModal = false;
    }
  }
};
</script>

<style lang="scss" module></style>
