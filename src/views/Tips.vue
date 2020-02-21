<template>
  <div class="companies">
    <div class="view-header">
      <h1 class="title">Gestion des récompenses</h1>
      <div style="margin-top: 15px;">
        <el-input
          type="text"
          class="searchInput"
          placeholder="Recherche ..."
          v-model="input3"
        >
          <el-button
            class="searchIcon"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
        <el-button type="primary" @click="addTip()"
          >Ajouter une récompense</el-button
        >
      </div>
    </div>
    <template>
      <el-table
        header-cell-class-name="header-cell"
        class="el-table"
        :data="tipData"
        style="width: 100%"
      >
        <el-table-column label="Image">
          <div class="demo-image__preview">
            <el-image
              class="el-image"
              style="width: 50px; height: 50px"
              :src="url"
            ></el-image>
          </div>
        </el-table-column>
        <el-table-column fixed label="Nom">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <p class="categorie" size="medium">{{ scope.row.name }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="description">
          <template slot-scope="scope">
            <span style="margin-right: 10px">{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Lien Vidéo Youtube" width="350">
          <template slot-scope="scope">
            <el-link :href="scope.row.videoLink" target="__blank"
              ><span style="margin-right: 10px">{{
                scope.row.videoLink
              }}</span></el-link
            >
          </template>
        </el-table-column>
        <el-table-column label="Points minimaux">
          <template slot-scope="scope">
            <span style="margin-right: 10px">{{ scope.row.points }}</span>
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
              @click="handleDelete(scope.row)"
            >
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <tips-modal ref="editTipsModal" :tip="selectedTip" isEdit />
    <tips-modal ref="addTipsModal" />
    <delete-tips-modal ref="deleteTipModal" :tip="selectedTip" />
  </div>
</template>

<script>
import axios from "axios";
import TipsModal from "../components/molecules/TipsModal";
import DeleteTipsModal from "../components/molecules/deleteTipsModal";
export default {
  components: {
    TipsModal,
    DeleteTipsModal
  },

  data: function() {
    return {
      input3: "",
      activeName: "first",
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      tipData: [],
      selectedTip: null,
      showAddModal: false,
      showEditModal: false
    };
  },
  mounted: function() {
    axios
      .get(`${window.config.api_root_url}rewards`)
      // eslint-disable-next-line no-console
      .then(response => (this.tipData = response.data));
  },

  methods: {
    handleEdit(tip) {
      this.selectedTip = tip;
      this.showEditModal = true;
      this.$refs.editTipsModal.open();
    },
    handleDelete(tip) {
      this.selectedTip = tip;
      this.$refs.deleteTipModal.open();
    },

    addTip() {
      this.showAddModal = true;
      this.$refs.addTipsModal.open();
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
    font-weight: bold;
    font-size: 15px;
    color: #000000;
    line-height: 18px;
    text-transform: capitalize;
  }
  .el-image {
    border-radius: 50%;
  }
}
</style>
