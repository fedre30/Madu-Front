<template>
  <el-dialog
    :visible.sync="showModal"
    append-to-body
    width="70%"
    @close="closeModal"
  >
    <h2>{{ isEdit ? "Modifier" : "Ajouter" }} un commerçant</h2>
    <el-form :model="formData">
      <el-row :gutter="20" style="margin: 1rem 0">
        <el-col :span="24">
          <el-form-item label="NOM" class="label-style">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 1rem 0">
        <el-col :span="12">
          <el-form-item label="ADRESSE" class="label-style">
            <el-input v-model="formData.adress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="CODE POSTAL" class="label-style">
            <el-input v-model="formData.zipcode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="VILLE" class="label-style">
            <el-input v-model="formData.city"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 1rem 0">
        <el-col :span="24">
          <el-form-item
            label="TAGS (séparés par des virgules)"
            class="label-style"
          >
            <el-input v-model="formData.tags"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 1rem 0">
        <el-col :span="6" style="display: flex; flex-direction: column;">
          <el-form-item label="TYPE" class="label-style">
            <el-select
              v-model="formData.type"
              placeholder="Selectionner un type"
            >
              <el-option label="Resturant" value="restaurant"></el-option>
              <el-option label="Boutique" value="shop"></el-option>
              <el-option label="Activité" value="activity"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="ACCES AU FAUTEUIL ROULANT" class="label-style">
            <el-radio v-model="formData.accessibility" label="true" border
              >Oui</el-radio
            >
            <el-radio v-model="formData.accessibility" label="false" border
              >Non</el-radio
            >
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 1rem 0">
        <el-col :span="6">
          <el-form-item label="PRIX" class="label-style">
            <div>
              <i
                class="el-icon-coin"
                v-for="(_, index) in 3"
                :key="index"
                style="font-size: 1.5rem"
                @click="onClickIcon"
                :class="
                  index < formData.price ? 'activePrice' : 'inactivePrice'
                "
              ></i>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 1rem 0">
        <el-col :span="24">
          <el-form-item label="DESCRIPTION" class="label-style">
            <el-input
              type="textarea"
              v-model="formData.description"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin: 2rem 0" v-if="this.shop && this.shop.greenscore">
        <el-button type="success" @click="editGreenscore()"
          >Modifier Greenscore</el-button
        >
      </el-row>
      <el-row>
        <el-button type="primary" @click="isEdit ? edit() : addShop()"
          >Enregistrer</el-button
        >
        <el-button @click="showModal = false">Annuler</el-button>
      </el-row>
    </el-form>
    <poi-greenscore-modal
      :shop="shop"
      :visible="showGreenscoreEdit"
      ref="editGreenscoreModal"
      isEdit
    />
  </el-dialog>
</template>

<script>
import axios from "axios";
import PoiGreenscoreModal from "../poi/poiGreenscoreModal";
export default {
  components: {
    PoiGreenscoreModal
  },

  props: {
    shop: {
      type: Object
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean
    }
  },

  data: function() {
    return {
      formData: {
        name: "",
        type: "",
        adress: "",
        zipcode: "",
        city: "",
        tags: "",
        accessibility: "",
        price: 1,
        description: ""
      },

      showModal: this.visible,
      showGreenscoreEdit: false
    };
  },

  mounted: function() {
    this.isEdit ? (this.formData = this.shop) : this.formData;
  },

  updated: function() {
    // eslint-disable-next-line no-console
    this.isEdit ? (this.formData = this.shop) : this.formData;
  },

  methods: {
    open() {
      this.showModal = true;
      // eslint-disable-next-line no-console
    },
    successCallback() {
      this.$emit("successCallback");
    },
    edit() {
      this.formData.tags = this.formData.tags
        ? this.formData.tags.split(", ")
        : null;
      axios.patch(
        `${window.config.api_root_url}shops/update/${this.shop._id}`,
        this.formData
      );
      // setTimeout(this.$router.go(), 3000);
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
      this.formData.tags = this.formData.tags
        ? this.formData.tags.split(", ")
        : null;
      axios.post(`${window.config.api_root_url}shops/add`, this.formData);
      //setTimeout(this.$router.go(), 5000);
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

<style lang="scss" scoped>
.label-style {
  font-weight: bold;
  label {
    text-transform: uppercase;
  }
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
</style>
