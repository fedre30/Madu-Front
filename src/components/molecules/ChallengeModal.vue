<template>
  <el-dialog
    :visible.sync="showModal"
    append-to-body
    width="60%"
    @close="showModal = false"
  >
    <h2 class="title">{{ isEdit ? "Modifier" : "Ajouter" }} un défi</h2>
    <el-form :model="challengeData">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item class="text" label="Titre">
            <el-input v-model="challengeData.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item class="text" label="Sous titre">
            <el-input
              type="textarea"
              v-model="challengeData.subtitle"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item class="text" label="Description courte">
            <el-input
              class="el-input"
              type="textarea"
              v-model="challengeData.small_description"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item class="text" label="Description">
            <el-input
              class="el-input"
              type="textarea"
              v-model="challengeData.description"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item class="text" label="Points">
            <el-input-number
              v-model="challengeData.leaves_amount"
              :min="0"
              controls-position="right"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="text" label="Délai (jours)">
            <el-input-number
              v-model="challengeData.day_duration"
              :min="1"
              controls-position="right"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 1rem 0">
        <el-col :span="24">
          <el-form-item label="IMAGE" class="label-style">
            <el-upload
              class="avatar-uploader"
              action=""
              ref="upload"
              :show-file-list="false"
              :on-change="handleAvatarChange"
              :auto-upload="false"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="valid">
        <el-row type="flex" class="row-bg" justify="center">
          <el-button @click="showModal = false">Annuler</el-button>
          <el-button @click="isEdit ? edit() : addChallenge()" type="primary"
            >Enregister</el-button
          >
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
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
      imageUrl: "",
      challengeData: {
        title: "",
        subtitle: "",
        description: "",
        small_description: "",
        leaves_amount: 100,
        day_duration: 7
      },
      showModal: false
    };
  },
  methods: {
    ...mapActions(["createItem", "updateItem"]),
    handleAvatarChange(file) {
      let self = this;
      let reader = new FileReader();
      reader.onload = function() {
        let img = new Image();
        self.showImgError = false;
        img.onload = function() {
          self.imageUrl = URL.createObjectURL(file.raw);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file.raw);
    },
    open(challenge) {
      if (this.isEdit) {
        this.challengeData = challenge;
        this.$set(this, "imageUrl", this.challengeData.image);
      } else {
        this.imageUrl = "";
        this.challengeData = {
          title: "",
          subtitle: "",
          description: "",
          small_description: "",
          leaves_amount: 50,
          day_duration: 7
        };
      }
      this.showModal = true;
    },
    edit() {
      delete this.challengeData.image;
      this.updateItem({
        item: this.challengeData,
        model: "rewards"
      }).then(async res => {
        let formData = new FormData();
        if (this.$refs.upload.$data.uploadFiles[0]) {
          formData.append("image", this.$refs.upload.$data.uploadFiles[0].raw);
          await axios
            .patch(res.url, formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })
            .then(res => {
              this.$store.dispatch("fetchModelByName", "challenges");
              return res;
            })
            .catch(error => {
              throw error;
            });
        }
      });
      this.showModal = false;
    },
    addChallenge() {
      delete this.challengeData.image;
      this.createItem({
        item: this.challengeData,
        model: "rewards",
        url: this.$store.state.metaDefinition.listModels.rewards.url
      }).then(async res => {
        let formData = new FormData();
        if (this.$refs.upload.$data.uploadFiles[0]) {
          formData.append("image", this.$refs.upload.$data.uploadFiles[0].raw);
          await axios
            .patch(res.url, formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })
            .then(res => {
              this.$store.dispatch("fetchModelByName", "challenges");
              return res;
            })
            .catch(error => {
              throw error;
            });
        }
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
.avatar {
  width: 100%;
}
</style>
