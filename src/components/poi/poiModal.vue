<template>
  <el-dialog
    :title="`${isEdit ? 'Modifier' : 'Ajouter'} un commerçant`"
    :visible.sync="showModal"
    append-to-body
    width="70%"
    @close="closeModal"
    class="shop-dialog"
  >
    <el-dialog
      title="Liste des tags"
      :visible.sync="showTagModal"
      width="70%"
      append-to-body
    >
      <el-row :gutter="0" style="margin-bottom: 20px;">
        <el-col :span="8">
          <div>Nom</div>
        </el-col>
        <el-col :span="6">
          Tag principal
        </el-col>
        <el-col :span="6">
          Image
        </el-col>
      </el-row>
      <tag v-for="tag in tags" :key="tag.uid" :tag="tag"></tag>
      <el-button class="create-button" @click="createTag">
        Ajouter un tag
      </el-button>
      <span slot="footer">
        <el-button @click="showTagModal = false">Fermer</el-button>
      </span>
    </el-dialog>
    <el-form :model="formData">
      <el-row :gutter="20" style="margin: 1rem 0">
        <el-col :span="24">
          <el-form-item label="NOM" class="label-style">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 1rem 0">
        <el-col :span="24">
          <el-form-item label="ADRESSE" class="label-style">
            <el-input v-model="formData.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 1rem 0">
        <el-col :span="12">
          <el-form-item label="CODE POSTAL" class="label-style">
            <el-input v-model="formData.zipcode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="VILLE" class="label-style">
            <el-input v-model="formData.city"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        :gutter="20"
        style="margin: 1rem 0"
        class="tag-selector-container"
      >
        <el-col :span="20">
          <el-form-item label="TAGS" class="label-style">
            <el-select
              class="tag-selector"
              v-model="formData.tags_uid"
              placeholder="tags"
              multiple
            >
              <el-option
                v-for="item in tags"
                :key="item.uid"
                :label="item.name"
                :value="item.uid"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button class="tag-list-button" @click="showTagModal = true">
            Voir les tags
          </el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 1rem 0">
        <el-col :span="12" style="display: flex; flex-direction: column;">
          <el-form-item label="TYPE" class="label-style">
            <el-select
              v-model="formData.type_uid"
              placeholder="Selectionner un type"
            >
              <el-option
                v-for="item in typesOfShops"
                :key="item.uid"
                :label="item.name"
                :value="item.uid"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="ACCES AU FAUTEUIL ROULANT" class="label-style">
            <el-radio v-model="formData.accessibility" :label="true" border>
              Oui
            </el-radio>
            <el-radio v-model="formData.accessibility" :label="false" border>
              Non
            </el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 1rem 0">
        <el-col :span="24">
          <el-form-item label="PRIX" class="label-style">
            <div>
              <i
                class="el-icon-coin"
                v-for="(_, index) in 3"
                :key="index"
                style="font-size: 1.5rem"
                @click="onClickIcon"
                :class="
                  index < parseInt(formData.range_price)
                    ? 'activePrice'
                    : 'inactivePrice'
                "
              ></i>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 1rem 0">
        <el-col :span="24">
          <el-form-item label="Site du commercant" class="label-style">
            <el-input v-model="formData.website"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 1rem 0">
        <el-col :span="24">
          <el-form-item label="DESCRIPTION" class="label-style">
            <el-input type="textarea" v-model="formData.description"></el-input>
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
      <el-row>
        <el-button class="action-button" @click="isEdit ? edit() : addShop()"
          >Enregistrer</el-button
        >
        <el-button class="cancel-button" @click="showModal = false">
          Annuler
        </el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import Tag from "../atoms/Tag";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  components: {
    Tag
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },

  data: function() {
    return {
      imageUrl: "",
      shop: {},
      showModal: false,
      showTagModal: false,
      formData: {
        name: "",
        type_uid: "",
        address: "",
        zipcode: "",
        city: "",
        tags_uid: [],
        accessibility: true,
        range_price: 1,
        description: "",
        greenscore: {},
        website: ""
      },
      showGreenscoreEdit: false
    };
  },

  computed: {
    ...mapGetters(["tags", "typesOfShops", "greenscoreCriteriasByUid"])
  },

  methods: {
    ...mapActions(["patchItem", "createItem"]),
    createTag() {
      this.$prompt("Entrez le nom du nouveau tag", "Nouveau tag", {
        confirmButtonText: "Créer",
        cancelButtonText: "Retour"
      }).then(({ value }) => {
        this.createItem({
          item: {
            is_main_tag: false,
            name: value
          },
          model: "tags",
          url: this.$store.state.metaDefinition.listModels.tags.url
        });
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
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file.raw);
    },
    open(shop) {
      this.$set(this, "shop", shop);
      if (shop.uid) {
        this.$set(this, "formData", JSON.parse(JSON.stringify(this.shop)));
        this.$set(this, "imageUrl", this.shop.image);
      } else {
        this.imageUrl = "";
        this.formData = {
          name: "",
          type_uid: "",
          address: "",
          zipcode: "",
          city: "",
          tags_uid: [],
          accessibility: true,
          range_price: 1,
          description: "",
          greenscore: {},
          website: ""
        };
        let typeOfShop = this.typesOfShops.find(
          type => type.name.toLowerCase() === "alimentaire"
        );
        if (typeOfShop) {
          let mainCriterias = typeOfShop.criterias.map(criteriaUid => {
            if (this.$store.state["greenscoreCriterias"]) {
              return this.greenscoreCriteriasByUid(criteriaUid);
            } else {
              return {};
            }
          });
          mainCriterias.forEach(criteria => {
            this.formData.greenscore[criteria.uid] = { value: null };
          });
          this.formData.greenscore.value = null;
        }
      }
      this.showModal = true;
    },
    successCallback() {
      this.$emit("successCallback");
    },
    edit() {
      delete this.formData.image;
      this.patchItem({
        item: this.formData,
        model: "shops"
      }).then(async res => {
        let formData = new FormData();
        if (this.$refs.upload.$data.uploadFiles[0]) {
          formData.append("image", this.$refs.upload.$data.uploadFiles[0].raw);
        }
        return await axios
          .patch(res.url, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(res => {
            this.$store.dispatch("fetchModelByName", "shops");
            return res;
          })
          .catch(error => {
            throw error;
          });
      });
      this.showModal = false;
    },

    onClickIcon() {
      if (this.formData.price < 3) {
        this.formData.price++;
      } else {
        this.formData.price--;
      }
    },
    addShop() {
      delete this.formData.image;
      this.createItem({
        item: this.formData,
        model: "shops",
        url: this.$store.state.metaDefinition.listModels.shops.url
      }).then(async res => {
        let formData = new FormData();
        if (this.$refs.upload.$data.uploadFiles[0]) {
          formData.append("image", this.$refs.upload.$data.uploadFiles[0].raw);
        }
        return await axios
          .patch(res.url, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(res => {
            this.$store.dispatch("fetchModelByName", "shops");
            return res;
          })
          .catch(error => {
            throw error;
          });
      });
      this.showModal = false;
    },
    closeModal() {
      this.showModal = false;
    },
    editGreenscore() {
      this.showGreenscoreEdit = true;
      this.$refs.editGreenscoreModal.open();
    }
  }
};
</script>

<style lang="scss">
.label-style {
  font-weight: bold;
  label {
    text-transform: uppercase;
  }
}

.avatar {
  width: 100%;
}
.greenscore-icon {
  width: 100%;
  display: flex;
}
.greenscore-picto {
  width: 2rem;

  i {
    font-size: 2rem;
  }
}

.greenscore-icon-label {
  margin-left: 0.5rem;
  margin-bottom: 0;
}

.greenscore-value {
  display: flex;
  flex-direction: column;
}
.activePrice {
  color: rgba(192, 197, 210, 1);
}

.inactivePrice {
  color: rgba(192, 197, 210, 0.3);
}
.tag-selector-container {
  display: flex;
  align-items: center;
  .tag-selector {
    width: 100%;
  }
  .tag-list-button {
    margin-top: 15px;
    background-color: #364ec1;
    color: #fafbfc;
    border-color: #364ec1;
    &:hover {
      background-color: #364ec1;
      color: #fafbfc;
      border-color: #364ec1;
    }
  }
}

.shop-dialog {
  .cancel-button {
    border-color: #364ec1 !important;
    color: #364ec1 !important;
    background-color: #fafbfc !important;
    &:hover {
      border-color: #364ec1 !important;
      background-color: #fafbfc !important;
      color: #364ec1 !important;
    }
  }
  .create-button {
    border-color: #364ec1 !important;
    color: #364ec1 !important;
    background-color: #fafbfc !important;
    &:hover {
      border-color: #364ec1 !important;
      background-color: #364ec1 !important;
      color: #fafbfc !important;
    }
  }
  .action-button {
    background-color: #364ec1 !important;
    color: #fafbfc !important;
    border-color: #364ec1 !important;
    &:hover {
      border-color: #364ec1 !important;
      background-color: #364ec1 !important;
      color: #fafbfc !important;
    }
  }
}
</style>
