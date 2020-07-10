<template>
  <div class="rewards">
    <div class="view-header">
      <h1 class="title">Gestion des récompenses</h1>
      <div>
        <el-button class="create-button" @click="addReward()"
          >Ajouter une récompense</el-button
        >
      </div>
    </div>
    <template>
      <el-table
        header-cell-class-name="header-cell"
        class="el-table"
        :data="rewards"
        style="width: 100%"
      >
        <el-table-column label="Titre" prop="name"></el-table-column>
        <el-table-column label="Sous titre" prop="subtitle"></el-table-column>
        <el-table-column label="Points">
          <template slot-scope="scope">
            <span style="margin-right: 10px">
              {{ scope.row.leaves_amount }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Opérations">
          <template slot-scope="scope" size="mini">
            <el-button
              class="edit-btn"
              size="mini"
              type="default"
              @click="handleEdit(scope.row)"
              >Éditer</el-button
            >
            <el-button
              class="delete-btn"
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
    <tips-modal ref="editTipsModal" isEdit />
    <tips-modal ref="addTipsModal" />
    <delete-tips-modal ref="deleteTipModal" />
  </div>
</template>

<script>
import TipsModal from "../components/molecules/TipsModal";
import DeleteTipsModal from "../components/molecules/deleteTipsModal";
import { mapGetters } from "vuex";
export default {
  components: {
    TipsModal,
    DeleteTipsModal
  },

  computed: {
    ...mapGetters(["rewards"])
  },

  methods: {
    handleEdit(reward) {
      this.$refs.editTipsModal.open(reward);
    },
    handleDelete(reward) {
      this.$refs.deleteTipModal.open(reward);
    },
    addReward() {
      this.$refs.addTipsModal.open({});
    }
  }
};
</script>

<style lang="scss">
.rewards {
  padding: 50px 70px;
  .view-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    .create-button {
      background-color: #364ec1;
      color: #fafbfc;
      border-color: #364ec1;
      &:hover {
        background-color: #364ec1;
        color: #fafbfc;
        border-color: #364ec1;
      }
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
    .header-cell {
      text-transform: uppercase;
      color: #b4bac6;
    }
    .delete-btn {
      border-color: #ff6a62;
      color: #ff6a62;
      background-color: #fafbfc;
      &:hover {
        background-color: #ff6a62;
        color: #fafbfc;
      }
    }
    .edit-btn {
      background-color: #fafbfc;
      color: #364ec1;
      border-color: #364ec1;
      &:hover {
        background-color: #364ec1;
        color: #fafbfc;
      }
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
