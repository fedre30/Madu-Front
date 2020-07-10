<template>
  <el-row :gutter="0">
    <el-col :span="8">
      <div>{{ tag.name }}</div>
    </el-col>
    <el-col :span="6">
      <el-checkbox :value="tag.is_main_tag" @click="patchTag"></el-checkbox>
    </el-col>
    <el-col :span="6">
      <el-upload
        class="avatar-uploader"
        action=""
        ref="upload"
        :show-file-list="false"
        :on-change="handleAvatarChange"
        :auto-upload="false"
      >
        <img v-if="imageUrl" :src="imageUrl" class="tag-image" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-col>
    <el-col :span="2">
      <el-button
        type="danger"
        icon="el-icon-delete"
        @click="deleteTag"
      ></el-button>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";
export default {
  props: {
    tag: {
      type: Object,
      required: true
    }
  },

  data: function() {
    return {
      imageUrl: ""
    };
  },
  methods: {
    patchTag() {
      this.$store.dispatch("patchItem", {
        item: {
          url: this.tag.url,
          is_main_tag: !this.tag.is_main_tag
        },
        model: "tags"
      });
    },
    deleteTag() {
      this.$store.dispatch("deleteItem", {
        item: this.tag,
        model: "tags"
      });
    },
    uploadImage() {
      let formData = new FormData();
      formData.append("image", self.$refs.upload.$data.uploadFiles[0].raw);
      axios
        .patch(self.tag.url, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          this.$store.dispatch("fetchModelByName", "tags");
          return res;
        })
        .catch(error => {
          throw error;
        });
    },
    handleAvatarChange(file) {
      let self = this;
      let reader = new FileReader();
      reader.onload = function() {
        let img = new Image();
        self.showImgError = false;
        img.onload = function() {
          self.imageUrl = URL.createObjectURL(file.raw);
          self.uploadImage();
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file.raw);
    }
  }
};
</script>

<style lang="scss">
.tag-image {
  max-height: 35px;
}
</style>
