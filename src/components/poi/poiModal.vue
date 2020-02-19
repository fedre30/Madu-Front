<template>
  <el-dialog
    :title="isEdit ? 'Modifier commerçant' : 'Ajouter un commerçant'"
    :visible.sync="showModal"
    append-to-body
    width="70%"
    @close="closeModal"
  >
    <h2>{{ isEdit ? "Modifier" : "Ajouter" }} un commerçant</h2>
    <el-form :model="formData">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="Nom" class="label-style">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Adresse" class="label-style">
            <el-input v-model="formData.adress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Code Postal" class="label-style">
            <el-input v-model="formData.zipcode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Ville" class="label-style">
            <el-input v-model="formData.city"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="Tags" class="label-style">
            <el-input v-model="formData.tags"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Type" class="label-style">
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
        <el-col :span="12">
          <el-form-item label="Accès au fauteuil roulant" class="label-style">
            <el-radio v-model="formData.accessibility" label="true" border
              >Oui</el-radio
            >
            <el-radio v-model="formData.accessibility" label="false" border
              >Non</el-radio
            >
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Prix" class="label-style">
            <i
              class="el-icon-coin"
              v-for="(_, index) in 3"
              :key="index"
              style="font-size: 1.5rem"
              @click="onClickIcon"
              :class="index <= formData.price ? 'activePrice' : 'inactivePrice'"
            ></i>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="Description" class="label-style">
            <el-input
              type="textarea"
              v-model="formData.description"
              maxlength="100"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-button type="primary" @click="isEdit ? edit() : addShop()"
          >Enregistrer</el-button
        >
        <el-button @click="showModal = false">Annuler</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import axios from "axios";
export default {
  components: {},

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
        price: "",
        description: ""
      },

      showModal: this.visible
    };
  },

  computed: {},

  mounted: function() {
    const parsedTags = this.shop.tags ? this.shop.tags.join(", ") : "";
    // eslint-disable-next-line no-console
    console.log(this.shop.tags);
    this.isEdit ? (this.formData = this.shop) : this.formData;
    this.isEdit ? (this.formData.tags = parsedTags) : this.formData;
  },

  updated: function() {
    const parsedTags = this.shop.tags ? this.shop.tags.join(", ") : "";
    // eslint-disable-next-line no-console
    console.log(this.shop.tags);
    this.isEdit ? (this.formData = this.shop) : this.formData;
    this.isEdit ? (this.formData.tags = parsedTags) : this.formData;
  },

  methods: {
    open() {
      // eslint-disable-next-line no-console
      this.showModal = true;
    },
    successCallback() {
      this.$emit("successCallback");
    },
    edit() {
      this.formData.tags = this.formData.tags.split(", ");

      axios.patch(
        `${window.config.api_root_url}shops/update/${this.shop._id}`,
        this.formData
      );
      this.showModal = false;
      this.$router.go();
    },

    onClickIcon() {
      // eslint-disable-next-line no-console
      if (this.formData.price <= 3) {
        this.formData.price += 1;
      } else {
        this.formData -= 1;
      }
    },
    addShop() {
      this.formData.tags = this.formData.tags.split(", ");
      axios.post(`${window.config.api_root_url}shops/add`, this.formData);

      this.showModal = false;
      this.$router.go();
    },
    closeModal() {
      this.showModal = false;
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
