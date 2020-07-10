<template>
  <div class="disagreements">
    <div class="view-header">
      <h1 class="title">Gestion des avis</h1>
    </div>
    <template>
      <el-table
        header-cell-class-name="header-cell"
        class="el-table"
        :data="userDisagreements"
        style="width: 100%"
      >
        <el-table-column label="Utilisateur">
          <template slot-scope="scope">
            <div>
              {{
                usersByUid(scope.row.user_uid)
                  ? usersByUid(scope.row.user_uid).email
                  : ""
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Commercant">
          <template slot-scope="scope">
            <div>
              {{
                shopsByUid(scope.row.shop_uid)
                  ? shopsByUid(scope.row.shop_uid).name
                  : ""
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Tags non appropriés">
          <template slot-scope="scope">
            <div
              style="margin-right: 10px"
              v-for="(tag, index) in scope.row.tags_uid"
              :key="index"
            >
              #{{ tagsByUid(tag) ? tagsByUid(tag).name : "" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="éco-responsable">
          <template slot-scope="scope">
            <div>{{ scope.row.is_eco ? "Oui" : "Non" }}</div>
          </template>
        </el-table-column>
        <el-table-column label="Opérations">
          <template slot-scope="scope" size="mini">
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
    ...mapGetters([
      "userDisagreements",
      "usersByUid",
      "shopsByUid",
      "tagsByUid"
    ])
  },

  methods: {
    handleValidate(address) {
      this.$refs.validateModal.open(address);
    },
    handleDelete(disagreement) {
      this.$confirm(
        "Êtes-vous sur de vouloir supprimer cet avis ?",
        "Suppression",
        {
          confirmButtonText: "Supprimer",
          cancelButtonText: "Cancel"
        }
      ).then(() => {
        this.$store.dispatch("deleteItem", {
          item: disagreement,
          model: "userDisagreements"
        });
      });
    }
  }
};
</script>

<style lang="scss">
.disagreements {
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
