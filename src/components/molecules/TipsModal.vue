<template>
  <el-dialog
    :visible.sync="showModal"
    :title="`${isEdit ? 'Modifier' : 'Ajouter'} une récompense`"
    append-to-body
    width="60%"
    @close="showModal = false"
  >
    <el-form :model="rewardData">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item class="text" label="Nom de la récompense">
            <el-input v-model="rewardData.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item class="text" label="Sous titre de la récompense">
            <el-input v-model="rewardData.subtitle"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item class="text" label="Nombre de points demandés">
            <el-input-number
              v-model="rewardData.leaves_amount"
              :min="0"
              controls-position="right"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item class="text" label="Description">
            <el-input
              class="el-input"
              type="textarea"
              v-model="rewardData.description"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="valid">
        <el-row type="flex" class="row-bg" justify="center">
          <el-button @click="showModal = false">Annuler</el-button>
          <el-button @click="isEdit ? edit() : addTip()" type="primary"
            >Enregister</el-button
          >
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  components: {},

  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },

  data: function() {
    return {
      rewardData: {
        name: "",
        subtitle: "",
        description: "",
        leaves_amount: 100
      },
      showModal: false
    };
  },
  methods: {
    ...mapActions(["createItem", "updateItem"]),
    open(reward) {
      if (this.isEdit) {
        this.rewardData = reward;
      } else {
        this.rewardData = {
          name: "",
          subtitle: "",
          description: "",
          points: 100
        };
      }
      this.showModal = true;
    },
    edit() {
      this.updateItem({
        item: this.rewardData,
        model: "rewards"
      });
      this.showModal = false;
    },
    addTip() {
      this.createItem({
        item: this.rewardData,
        model: "rewards",
        url: this.$store.state.metaDefinition.listModels.rewards.url
      });
      this.showModal = false;
    },
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>

<style lang="scss">
.el-dialog__body {
  .title {
    font-style: normal;
    font-weight: bold !important;
    font-size: 30px !important;
    line-height: 36px !important;
    text-align: center;
    letter-spacing: 0.144375px;
    color: #14112d !important;
  }
  .content-note {
    width: 30%;
    display: flex;
  }

  .text {
    font-style: normal;
    font-weight: normal;
    font-size: 14.45px !important;
    line-height: 17px;
    letter-spacing: 1.49286px;
    text-transform: uppercase;
  }
  .icon {
    margin-left: 10px;
    margin-top: 10px;
  }
  .btn {
    color: #0077ff;
    border-color: #0077ff;
  }
}
.el-upload-list--picture .el-upload-list__item {
  overflow: hidden;
  z-index: 0;
  background-color: #fff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  width: 180px;
  height: 180px !important;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-top: 10px;
  padding: 10px 10px 10px 90px;
  height: 92px;
}
.el-upload-list--picture .el-upload-list__item-thumbnail {
  width: 100% !important;
  height: auto !important;
}
.valid {
  margin-top: 40px;
}
</style>
