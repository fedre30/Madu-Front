<template>
  <!-- GREENSCORE MODAL -->
  <el-dialog
    width="50%"
    title="GREENSCORE"
    :visible.sync="showModal"
    append-to-body
  >
    <h2 style="margin: 3rem 0 1.5rem 0">
      Food <i class="el-icon-fork-spoon" style="margin-left: 0.5rem"></i>
    </h2>
    <el-form v-model="formData['food']">
      <el-row
        :gutter="40"
        v-for="(foodCriteria, index) in formData.food"
        :key="index"
      >
        <el-col :span="12">
          <el-form-item label="Nom du critère" class="label-style">
            <el-input v-model="formData.food[index].criteria"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="Note" class="label-style">
            <el-input-number
              v-model="formData.food[index].note"
              :min="0"
              :max="100"
              controls-position="right"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="Pondération" class="label-style">
            <el-input-number
              v-model="formData.food[index].coefficient"
              :min="1"
              :max="100"
              controls-position="right"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-button @click="addCriteria('food')">Ajouter critère</el-button>
      </el-row>
    </el-form>
    <h2 style="margin: 3rem 0 1.5rem 0">
      Social <i class="el-icon-user" style="margin-left: 0.5rem"></i>
    </h2>
    <el-form v-model="formData['social']">
      <el-row
        :gutter="20"
        v-for="(socialCriteria, index) in formData.social"
        :key="index"
      >
        <el-col :span="12">
          <el-form-item label="Nom du critère" class="label-style">
            <el-input v-model="formData.social[index].criteria"></el-input>
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
      </el-row>
      <el-row>
        <el-button @click="addCriteria('social')">Ajouter critère</el-button>
      </el-row>
    </el-form>
    <h2 style="margin: 3rem 0 1.5rem 0">
      Matériel <i class="el-icon-box" style="margin-left: 0.5rem"></i>
    </h2>
    <el-form v-model="formData['material']">
      <el-row
        :gutter="20"
        v-for="(materialCriteria, index) in formData.material"
        :key="index"
      >
        <el-col :span="12">
          <el-form-item label="Nom du critère" class="label-style">
            <el-input v-model="formData.material[index].criteria"></el-input>
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
      </el-row>
      <el-row>
        <el-button @click="addCriteria('material')">Ajouter critère</el-button>
      </el-row>
    </el-form>
    <el-row style="margin: 2rem 0">
      <el-button type="primary" @click="submitGreenscore()"
        >Enregistrer</el-button
      >
      <el-button @click="showModal = false">Annuler</el-button>
    </el-row>
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
        food: [{ criteria: "", note: "", coefficient: "" }],
        social: [],
        material: []
      },

      showModal: this.visible
    };
  },

  computed: {},

  mounted: function() {},

  updated: function() {
    this.isEdit ? (this.formData = this.shop) : this.formData;
  },

  methods: {
    open() {
      // eslint-disable-next-line no-console
      this.showModal = true;
    },

    submitGreenscore() {
      axios.post(
        `${window.config.api_root_url}greenscore/add/${this.shop._id}`,
        this.formData
      );
      this.showModal = false;
      this.$router.go();
    },

    closeModal() {
      this.visible = false;
    },

    addCriteria(category) {
      this.formData[category].push({ criteria: "", note: "", coefficient: "" });
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
