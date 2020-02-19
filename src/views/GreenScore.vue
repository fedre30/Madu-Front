<template>
  <div class="companies">
    <div class="view-header">
      <h1 class="title">Gestion du Greenscore</h1>
    </div>
    <template>
      <el-tabs class="tab_1" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Restaurant" name="Restaurant"></el-tab-pane>
        <el-tab-pane label="Boutique" name="Boutique"></el-tab-pane>
        <el-tab-pane label="Losirs" name="Losirs"></el-tab-pane>
        <el-tab-pane label="Logement" name="Logement"></el-tab-pane>
      </el-tabs>
    </template>
    <template>
      <el-table
        header-cell-class-name="header-cell"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column fixed label="Categorie">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p class="categorie">Nom: {{ scope.row.categorie }}</p>
              <div slot="reference" class="name-wrapper">
                <p class="categorie" size="medium">{{ scope.row.category }}</p>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="Critère">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>Nom:{{ scope.row.name }}</p>
              <div slot="reference" class="name-wrapper">
                <span>{{ scope.row.name }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="Pondération">
          <template slot-scope="scope">
            <span style="margin-right: 10px">{{ scope.row.coefficient }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Opérations">
          <template slot-scope="scope" size="mini">
            <el-button
              class="btn"
              size="mini"
              type="default"
              @click="handleEdit(scope.row)"
              >Éditer</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
<<<<<<< HEAD
import GreenScoreModal from "../components/molecules/greenscoreModal";
=======
>>>>>>> d9c55932b829ba709c039b4e3dbdccd7429a496a
import axios from "axios";
export default {
  components: {},

  props: {},

  data: function() {
    return {
      activeName: "first",
      tableData: ""
    };
  },

  computed: {},

  mounted: function() {
    axios
      .get(`${window.config.api_root_url}/greenscore`)
      .then(response => (this.tableData = response.data));
  },

  methods: {
    handleEdit(shop) {
      this.selectedShop = shop;
      this.$refs.editGreenScoreModal.open();
    },
    handleDelete(index, row) {
      console.log(index, row); // eslint-disable-line
    },
    handleClick(tab, event) {
      console.log(tab, event); // eslint-disable-line
    },
    addCriterium() {
      this.$refs.greenScoreModal.open();
    }
  }
};
</script>

<style lang="scss">
.companies {
  padding: 0 2rem 2rem;
  .view-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 21px;
      font-family: "Lato Bold";
    }
  }
  .el-table {
    font-size: 14px;
    color: #77848f;
    background-color: transparent;
    &::before,
    .el-table__fixed-right::before,
    .el-table__fixed::before {
      display: none;
    }

    th,
    tr {
      background-color: transparent;
      border: none !important;
    }
    td {
      border: none !important;
    }
  }

  .tab_1 {
    font-size: 14px;
    margin-top: 38px;
    text-transform: uppercase;
    font-weight: bold;
    font-style: normal;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 1.49286px;
    color: #515f6d;
  }
  .tab_2 {
    font-size: 15px;
    margin-top: 31px;
    font-weight: normal;
    font-style: normal;
    font-size: 15px;
    line-height: 17px;
    line-height: 18px;
    color: #515f6d;
    letter-spacing: 0.103125px;
    letter-spacing: 1.49286px;
    .el-tabs__nav-wrap::after {
      width: 24%;
    }
  }
  .btn {
    color: #0077ff;
    border-color: #0077ff;
  }
  .categorie {
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    color: #000000;
    line-height: 18px;
    text-transform: capitalize;
  }
}
</style>
