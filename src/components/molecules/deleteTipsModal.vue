<template>
  <el-dialog
    title="Supprimer"
    :visible.sync="showModal"
    width="60%"
    append-to-body
    @close="showModal = false"
  >
    Êtes-vous sûr(e) de vouloir supprimer {{ tip ? tip.name : "ce lieu" }} ?
    <span slot="footer">
      <el-button @click="showModal = false">Annuler</el-button>
      <el-button type="primary" @click="deletetip()">Supprimer</el-button>
    </span>
  </el-dialog>
</template>

<script>
import axios from "axios";
export default {
  components: {},

  props: {
    tip: {
      type: Object,
      default: () => {
        return {};
      }
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
    deletetip() {
      axios.delete(
        `${window.config.api_root_url}rewards/delete/${this.tip._id}`
      );
      this.showModal = false;
    }
  }
};
</script>

<style lang="scss" module></style>
