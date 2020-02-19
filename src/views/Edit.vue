<template>
  <div class="content">
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="formLabelAlign"
    >
      <el-form-item label="Categorie">
        <el-select
          class="select"
          v-model="formLabelAlign.categorie"
          placeholder="please select your categorie"
        >
          <el-option label="food" value="food"></el-option>
          <el-option label="materiel" value="mamterie"></el-option>
          <el-option label="social" value="social"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Name">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="Niveau 1">
        <el-input v-model="formLabelAlign.etape_1"></el-input>
      </el-form-item>
      <el-form-item label="Niveau 2">
        <el-input v-model="formLabelAlign.etape_2"></el-input>
      </el-form-item>
      <el-form-item label="Niveau 3">
        <el-input v-model="formLabelAlign.etape_3"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onSubmit">Ajouter</el-button>
        <el-button>Annuler</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},

  props: {},

  data: function() {
    return {
      formLabelAlign: {
        categorie: "",
        name: "",
        atape_1: "",
        etape_2: "",
        etape_3: ""
      }
    };
  },

  computed: {},

  mounted: function() {},

  methods: {
    nSubmit() {
      console.log("submit!"); // eslint-disable-line
    }
  }
};
</script>

<style lang="scss">
.content {
  width: 500px;
  height: 300px;
  position: absolute;
  top: 30%;
  left: 35%;
  .select {
    width: 400px;
  }
}
</style>
