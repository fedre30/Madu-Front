<template>
  <div class="container">
    <div class="view-header">
      <h1>Gestion des commerçants</h1>
      <div class="actions">
        <el-button class="create-button" type="primary" @click="addShop()"
          >Ajouter un commerçant</el-button
        >
      </div>
    </div>
    <template>
      <el-table
        :data="shops"
        style="width:100%"
        header-cell-class-name="header-cell"
      >
        <el-table-column label="Nom" prop="name" width="180"></el-table-column>
        <el-table-column label="Type" width="180">
          <template slot-scope="scope">
            <span style="margin-right: 10px">
              {{
                typesOfShopsByUid(scope.row.type)
                  ? typesOfShopsByUid(scope.row.type).name
                  : ""
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Tags" width="300">
          <template slot-scope="scope">
            <div
              style="margin-right: 10px"
              v-for="(tag, index) in scope.row.tags"
              :key="index"
            >
              #{{ tagsByUid(tag) ? tagsByUid(tag).name : "" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Greenscore" width="180">
          <template slot-scope="scope">
            <greenscore-value :relatedShop="scope.row" />
          </template>
        </el-table-column>
        <el-table-column label="Localisation" width="450">
          <template slot-scope="scope">
            <span>
              {{ scope.row.address }}, {{ scope.row.zipcode }}
              {{ scope.row.city }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Prix" width="150">
          <template slot-scope="scope">
            <i
              class="el-icon-coin"
              v-for="(_, index) in 3"
              :key="index"
              :class="
                index < scope.row.range_price ? 'activePrice' : 'inactivePrice'
              "
              style="font-size: 1.5rem"
            ></i>
          </template>
        </el-table-column>
        <el-table-column label="Accessibilité" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.accessibility ? "Oui" : "Non" }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="Opérations" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              class="action-button"
              @click="handleGreenscore(scope.row)"
              v-if="!scope.row.greenscore.length"
            >
              {{ scope.row.greenscore.length ? "Editer" : "Ajouter" }} un
              Greenscore
            </el-button>
            <el-button
              size="mini"
              type="primary"
              class="action-button"
              @click="handleEdit(scope.$index, scope.row)"
            >
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button
              size="mini"
              type="danger"
              class="delete-button"
              @click="handleDelete(scope.row)"
            >
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <poi-modal ref="poiModal" :isEdit="isEdit" />
      <poi-greenscore-modal
        ref="addGreenscoreModal"
        :key="greenscoreShop.uid"
        :shop="greenscoreShop"
      />

      <poi-delete-modal ref="deletePoiModal" />
    </template>
  </div>
</template>

<!-- STYLE -->

<style lang="scss">
.button-container {
  display: flex;
  justify-content: flex-end;
}

.activePrice {
  color: rgba(192, 197, 210, 1);
}

.inactivePrice {
  color: rgba(192, 197, 210, 0.3);
}
.container {
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
  }
  .el-table {
    font-size: 15px;
    color: #77848f;
    background-color: #fafbfc;
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
    .header-cell {
      text-transform: uppercase;
      color: #b4bac6;
    }
  }
  .action-button {
    background-color: #fafbfc;
    color: #364ec1;
    border-color: #364ec1;
    &:hover {
      background-color: #364ec1;
      color: #fafbfc;
    }
  }
  .delete-button {
    border-color: #ff6a62;
    color: #ff6a62;
    background-color: #fafbfc;
    &:hover {
      background-color: #ff6a62;
      color: #fafbfc;
    }
  }
}
</style>

<!-- SCRIPT -->

<script>
import poiGreenscoreModal from "../poi/poiGreenscoreModal";
import poiModal from "../poi/poiModal";
import poiDeleteModal from "../poi/poiDeleteModal";
import greenscoreValue from "../atoms/greenscoreValue";
import { mapGetters } from "vuex";
export default {
  components: {
    poiModal,
    poiDeleteModal,
    poiGreenscoreModal,
    greenscoreValue
  },
  data() {
    return {
      dataTable: null,
      selectedShop: null,
      showPOIModal: false,
      greenscoreShop: {},
      test: "",
      isEdit: false
    };
  },

  computed: {
    ...mapGetters(["shops", "typesOfShopsByUid", "tagsByUid"])
  },

  // METHODS

  methods: {
    handleEdit(index, shop) {
      this.showPOIModal = true;
      this.isEdit = true;
      this.$refs.poiModal.open(shop);
    },
    handleDelete(shop) {
      this.$refs.deletePoiModal.open(shop);
    },
    addShop() {
      this.showPOIModal = true;
      this.isEdit = false;
      this.$refs.poiModal.open({});
    },
    handleGreenscore(shop) {
      this.$refs.addGreenscoreModal.open(shop);
    }
  }
};
</script>
