<template>
  <!-- GREENSCORE MODAL -->
  <el-dialog
    width="40%"
    title="GREENSCORE"
    :visible.sync="showModal"
    append-to-body
  >
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Food" name="food">
        <h2 style="margin: 3rem 0 1.5rem 0">
          Food
          <i class="el-icon-fork-spoon" style="margin-left: 0.5rem"></i>
        </h2>
        <el-form v-model="formData['food']">
          <el-row
            :gutter="40"
            v-for="(foodCriteria, index) in formData.food"
            :key="index"
          >
            <el-col :span="8">
              <el-form-item label="Nom du critère" class="label-style">
                <el-autocomplete
                  v-model="formData.food[index].criteria"
                  :fetch-suggestions="foodQuerySearch"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Note" class="label-style">
                <el-input-number
                  v-model="formData.food[index].note"
                  :min="0"
                  :max="100"
                  controls-position="right"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Pondération" class="label-style">
                <el-input-number
                  v-model="formData.food[index].coefficient"
                  :min="1"
                  :max="100"
                  controls-position="right"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div style="margin: 2.5rem 0">
                <el-button
                  size="mini"
                  type="danger"
                  @click="removeCriteria('food', index)"
                >
                  <i class="el-icon-delete"></i>
                </el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-button @click="addCriteria('food')">Ajouter critère</el-button>
          </el-row>
        </el-form></el-tab-pane
      >
      <el-tab-pane label="Social" name="social">
        <h2 style="margin: 3rem 0 1.5rem 0">
          Social
          <i class="el-icon-user" style="margin-left: 0.5rem"></i>
        </h2>
        <el-form v-model="formData['social']">
          <el-row
            :gutter="20"
            v-for="(socialCriteria, index) in formData.social"
            :key="index"
          >
            <el-col :span="8">
              <el-form-item label="Nom du critère" class="label-style">
                <el-autocomplete
                  v-model="formData.social[index].criteria"
                  :fetch-suggestions="socialQuerySearch"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Note" class="label-style">
                <el-input-number
                  v-model="formData.social[index].note"
                  :min="0"
                  :max="100"
                  controls-position="right"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Pondération" class="label-style">
                <el-input-number
                  v-model="formData.social[index].coefficient"
                  :min="1"
                  :max="100"
                  controls-position="right"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div>
                <el-button
                  size="mini"
                  type="danger"
                  @click="removeCriteria('social', index)"
                >
                  <i class="el-icon-delete"></i>
                </el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-button @click="addCriteria('social')"
              >Ajouter critère</el-button
            >
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="Matériel" name="material"
        ><h2 style="margin: 3rem 0 1.5rem 0">
          Matériel
          <i class="el-icon-box" style="margin-left: 0.5rem"></i>
        </h2>
        <el-form v-model="formData['material']">
          <el-row
            :gutter="20"
            v-for="(materialCriteria, index) in formData.material"
            :key="index"
          >
            <el-col :span="8">
              <el-form-item label="Nom du critère" class="label-style">
                <el-autocomplete
                  v-model="formData.material[index].criteria"
                  :fetch-suggestions="materialQuerySearch"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Note" class="label-style">
                <el-input-number
                  v-model="formData.material[index].note"
                  :min="0"
                  :max="100"
                  controls-position="right"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Pondération" class="label-style">
                <el-input-number
                  v-model="formData.material[index].coefficient"
                  :min="1"
                  :max="100"
                  controls-position="right"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div style="margin: 2.5rem 0">
                <el-button
                  size="mini"
                  type="danger"
                  @click="removeCriteria('material', index)"
                >
                  <i class="el-icon-delete"></i>
                </el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-button @click="addCriteria('material')"
              >Ajouter critère</el-button
            >
          </el-row>
        </el-form></el-tab-pane
      >
    </el-tabs>

    <el-row style="margin: 2rem 0">
      <el-button
        type="primary"
        @click="isEdit ? editGreenscore() : submitGreenscore()"
        :disabled="
          formData.social.length === 0 || formData.material.length === 0
        "
        >Enregistrer</el-button
      >
      <el-button @click="showModal = false">Annuler</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import axios from "axios";

export default {
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
        food: [{ criteria: "", note: "", coefficient: "" }],
        social: [],
        material: []
      },
      showModal: false,
      foodSuggestions: [],
      socialSuggestions: [],
      materialSuggestions: [],
      activeName: "food"
    };
  },

  computed: {},

  mounted: function() {
    axios
      .get(`${window.config.api_root_url}greenscore/shops/restaurant`)
      .then(resp => (this.foodSuggestions = resp.data[0].food));
    axios
      .get(`${window.config.api_root_url}greenscore/shops/restaurant`)
      .then(resp => (this.socialSuggestions = resp.data[0].social));

    axios
      .get(`${window.config.api_root_url}greenscore/shops/restaurant`)
      .then(resp => (this.materialSuggestions = resp.data[0].material));

    this.isEdit
      ? axios
          .get(
            `${window.config.api_root_url}greenscore/${this.shop.greenscore}`
          )
          .then(resp => {
            this.formData = resp.data[0];
          })
      : this.formData;
  },

  methods: {
    open() {
      this.showModal = true;
    },

    submitGreenscore() {
      axios.post(
        `${window.config.api_root_url}greenscore/add/${this.shop._id}`,
        this.formData
      );
      this.showModal = false;
      setTimeout(this.$router.go(), 2000);
    },

    closeModal() {
      this.visible = false;
    },

    addCriteria(category) {
      this.formData[category].push({ criteria: "", note: "", coefficient: "" });
    },

    removeCriteria(category, id) {
      this.formData[category].splice(id, 1);
    },

    editGreenscore() {
      axios.patch(
        `${window.config.api_root_url}greenscore/update/${this.shop.greenscore}`,
        this.formData
      );
      this.showModal = false;
    },
    foodQuerySearch(queryString, cb) {
      const array = this.foodSuggestions.map(
        food => (food["value"] = food["criteria"])
      );
      const parsedArray = array.map(t => {
        return { value: t };
      });
      var results = queryString
        ? parsedArray.filter(this.createFilter(queryString))
        : parsedArray;

      cb(results);
    },
    socialQuerySearch(queryString, cb) {
      const array = this.socialSuggestions.map(
        social => (social["value"] = social["criteria"])
      );
      const parsedArray = array.map(t => {
        return { value: t };
      });
      var results = queryString
        ? parsedArray.filter(this.createFilter(queryString))
        : parsedArray;

      cb(results);
    },
    materialQuerySearch(queryString, cb) {
      const array = this.materialSuggestions.map(
        material => (material["value"] = material["criteria"])
      );
      const parsedArray = array.map(t => {
        return { value: t };
      });
      var results = queryString
        ? parsedArray.filter(this.createFilter(queryString))
        : parsedArray;

      cb(results);
    },
    createFilter(queryString) {
      return sugg => {
        return (
          sugg.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    }
  }
};
</script>
