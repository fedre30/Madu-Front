<template>
  <el-dialog
    title="Supprimer"
    :visible.sync="showModal"
    width="60%"
    append-to-body
    @close="showModal = false"
  >
    Êtes-vous sûr(e) de vouloir supprimer ce défi ?
    <span slot="footer">
      <el-button @click="showModal = false">Annuler</el-button>
      <el-button type="primary" @click="deleteChallenge()">Supprimer</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data: function() {
    return {
      showModal: false,
      challenge: {}
    };
  },

  methods: {
    open(challenge) {
      this.challenge = challenge;
      this.showModal = true;
    },
    deleteChallenge() {
      this.$store.dispatch("deleteItem", {
        item: this.challenge,
        model: "challenges"
      });
      this.showModal = false;
    }
  }
};
</script>

<style lang="scss" module></style>
