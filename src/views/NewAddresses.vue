<template>
  <div class="new-addresses">
    <div class="view-header">
      <h1 class="title">Gestion des nouvelles adresses</h1>
    </div>
    <template>
      <el-table
        header-cell-class-name="header-cell"
        class="el-table"
        :data="newAddresses"
        style="width: 100%"
      >
        <el-table-column label="Nom du commerce" prop="name"></el-table-column>
        <el-table-column label="Adresse" prop="address"></el-table-column>
        <el-table-column label="Code postal" prop="zipcode"></el-table-column>
        <el-table-column label="Ville" prop="city"></el-table-column>
        <el-table-column label="Opérations">
          <template slot-scope="scope" size="mini">
            <el-button
              class="btn"
              size="mini"
              type="default"
              @click="handleValidate(scope.row)"
              >Valider</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <new-address-modal ref="validateModal" isValidation />
    <new-address-modal ref="deleteModal" />
  </div>
</template>

<script>
import NewAddressModal from "../components/molecules/NewAddressModal";
import { mapGetters } from "vuex";
export default {
  components: {
    NewAddressModal
  },

  computed: {
    ...mapGetters(["newAddresses"])
  },

  methods: {
    handleValidate(address) {
      this.$refs.validateModal.open(address);
    },
    handleDelete(address) {
      this.$refs.deleteModal.open(address);
    }
  }
};
</script>

<style lang="scss">
.new-addresses {
  padding: 0 2rem 2rem;
  .view-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 21px;
      font-family: "Lato Bold";
    }
    .searchInput {
      width: 243px;
      margin-right: 36px !important;
    }

    .searchIcon {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  .el-table {
    font-size: 14px;
    color: #77848f;
    background-color: transparent;
    margin-top: 20px;
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
    font-size: 15px;
    color: #000000;
    line-height: 18px;
    text-transform: uppercase;
  }
  .el-image {
    border-radius: 50%;
  }
}
</style>
