<template>
  <el-dialog
    :visible.sync="showModal"
    append-to-body
    width="60%"
    @close="showModal = false"
  >
    <h2 class="title">{{ isEdit ? "Modifier" : "Ajouter" }} une récompense</h2>
    <el-form :model="tipData">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item class="text" label="Nom de la récompense">
            <el-input v-model="tipData.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item class="text" label="Nombre de points demandés">
            <el-input-number
              v-model="tipData.points"
              :min="0"
              controls-position="right"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item class="text" label="Lien vidéo Youtube">
            <el-input class="el-input" v-model="tipData.videoLink"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="text" label="Description">
            <el-input
              class="el-input"
              type="textarea"
              v-model="tipData.description"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
        >
          <el-button class="btn" style="" size="small" type="default">
            <i class="el-icon-paperclip" /> Ajouter une photo</el-button
          >
        </el-upload>
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
import axios from "axios";
export default {
  components: {},

  props: {
    tip: {
      type: Object
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  mounted: function() {
    this.isEdit ? (this.tipData = this.tip) : this.tipData;
  },
  updated: function() {
    this.isEdit ? (this.tipData = this.tip) : this.tipData;
  },

  data: function() {
    return {
      num: 1,
      tipData: {
        name: "",
        type: "",
        description: "",
        active: true,
        points: 100,
        videoLink: ""
      },
      showModal: this.visible
    };
  },
  methods: {
    open() {
      this.showModal = true;
    },
    edit() {
      axios.patch(
        `${window.config.api_root_url}rewards/update/${this.tip._id}`,
        this.tipData
      );
      this.showModal = false;
      setTimeout(this.$router.go(), 3000);
    },
    addTip() {
      axios.post(`${window.config.api_root_url}rewards/add`, this.tipData);
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
