<template>
  <div class="challenges">
    <div class="view-header">
      <h1 class="title">Gestion des défis</h1>
      <div style="margin-top: 15px;">
        <el-button type="primary" @click="handleCreate()">
          Ajouter un nouveau défi
        </el-button>
      </div>
    </div>
    <template>
      <el-table
        header-cell-class-name="header-cell"
        class="el-table"
        :data="challenges"
        style="width: 100%"
      >
        <el-table-column
          label="titre"
          prop="title"
          width="250"
        ></el-table-column>
        <el-table-column
          label="Sous titre"
          prop="subtitle"
          width="250"
        ></el-table-column>
        <el-table-column
          label="Description courte"
          prop="small_description"
          width="350"
        ></el-table-column>
        <el-table-column
          label="Points"
          prop="leaves_amount"
          width="100"
        ></el-table-column>
        <el-table-column
          label="Délai (jours)"
          prop="day_duration"
          width="100"
        ></el-table-column>
        <el-table-column label="Opérations" fixed="right" width="150">
          <template slot-scope="scope" size="mini">
            <el-button
              class="btn"
              size="mini"
              type="default"
              @click="handleEdit(scope.row)"
              >Editer</el-button
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
    <challenge-modal ref="editModal" isEdit />
    <challenge-modal ref="createModal" />
    <delete-challenge-modal ref="deleteModal" />
  </div>
</template>

<script>
import ChallengeModal from "../components/molecules/ChallengeModal";
import DeleteChallengeModal from "../components/molecules/deleteChallengeModal";
import { mapGetters } from "vuex";
export default {
  components: {
    ChallengeModal,
    DeleteChallengeModal
  },

  computed: {
    ...mapGetters(["challenges"])
  },

  methods: {
    handleEdit(address) {
      this.$refs.editModal.open(address);
    },
    handleCreate(address) {
      this.$refs.createModal.open(address);
    },
    handleDelete(address) {
      this.$refs.deleteModal.open(address);
    }
  }
};
</script>

<style lang="scss">
.challenges {
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
    background-color: #fafbfc;
    margin-top: 20px;
    &::before,
    .el-table__fixed-right::before,
    .el-table__fixed::before {
      display: none;
    }
    th,
    tr {
      background-color: #fafbfc;
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
