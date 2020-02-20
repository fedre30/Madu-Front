<template>
  <el-dialog
    :visible.sync="showModal"
    append-to-body
    width="70%"
    @close="showModal = false"
    class="yep"
  >
    <h2 class="title">{{ isEdit ? "Modifier" : "Ajouter" }} un tips</h2>
    <el-form :model="formData">
      <el-row :gutter="20">
        <el-col :span="8"> </el-col>
        <el-col :span="8">
          <el-form-item class="text" label="Nom du critère">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8"> </el-col>
        <el-col :span="8">
          <el-form-item class="text" label="Description">
            <el-input
              class="el-input"
              type="textarea"
              style="width:600px"
              v-model="formData.desc"
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
          <el-button type="primary">Enregister</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
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

  data: function() {
    return {
      num: 1,
      formData: {
        name: "",
        desc: ""
      },
      showModal: false
    };
  },
  methods: {
    open() {
      this.showModal = true;
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
