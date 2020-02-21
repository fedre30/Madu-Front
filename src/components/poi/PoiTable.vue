<template>
  <div class="container">
    <div class="button-container">
      <el-row justify="end" style="margin-bottom: 2rem">
        <el-button class="btn" type="primary" @click="addShop()"
          >Ajouter un commerçant</el-button
        >
      </el-row>
    </div>
    <template>
      <el-table :data="dataTable" style="width: 100%">
        <el-table-column label="Nom" sortable>
          <template slot-scope="scope">
            <b>{{ scope.row.name }}</b>
          </template>
        </el-table-column>
        <el-table-column label="Type" width="180" sortable>
          <el-progress type="circle" :percentage="25"></el-progress>
          <template slot-scope="scope">
            <span style="margin-right: 10px">{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Tags">
          <template slot-scope="scope">
            <span
              style="margin-right: 10px"
              v-for="(tag, index) in scope.row.tags"
              :key="index"
              >#{{ tag }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="Greenscore" width="150">
          <template slot-scope="scope">
            <greenscore-value :greenscoreId="scope.row.greenscore" />
          </template>
        </el-table-column>
        <el-table-column label="Localisation" width="300">
          <template slot-scope="scope">
            <span>
              {{ scope.row.adress }}, {{ scope.row.zipcode }},
              {{ scope.row.city }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Prix">
          <template slot-scope="scope">
            <i
              class="el-icon-coin"
              v-for="(_, index) in 3"
              :key="index"
              :class="index < scope.row.price ? 'activePrice' : 'inactivePrice'"
              style="font-size: 1.5rem"
            ></i>
          </template>
        </el-table-column>
        <el-table-column label="Accessibilité">
          <template slot-scope="scope">
            <span>{{ scope.row.accessibility ? "Oui" : "Non" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Opérations" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleGreenscore(scope.row)"
              v-if="!scope.row.greenscore"
              >Ajouter un Greenscore</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
            >
              <i class="el-icon-edit"></i>
            </el-button>
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
      <poi-modal
        ref="editPoiModal"
        :shop="selectedShop"
        isEdit
        v-if="selectedShop !== null"
        :visible="showEditModal"
      />
      <poi-modal ref="addPoiModal" :visible="showAddModal" />
      <poi-greenscore-modal ref="addGreenscoreModal" :shop="greenscoreShop" />
      <poi-delete-modal :shop="selectedShop" ref="deletePoiModal" />
    </template>
  </div>
</template>

<!-- STYLE -->

<style lang="scss" scoped>
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
</style>

<!-- SCRIPT -->

<script>
import poiGreenscoreModal from "../poi/poiGreenscoreModal";
import poiModal from "../poi/poiModal";
import poiDeleteModal from "../poi/poiDeleteModal";
import greenscoreValue from "../atoms/greenscoreValue";
import axios from "axios";
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
      showAddModal: false,
      showEditModal: false,
      showGreenscoreModal: false,
      greenscoreShop: null,
      test: ""
    };
  },

  mounted() {
    axios
      .get(`${window.config.api_root_url}shops`)
      .then(response => (this.dataTable = response.data));
  },

  // METHODS

  methods: {
    handleEdit(index, shop) {
      this.selectedShop = shop;
      this.showEditModal = true;

      this.$refs.editPoiModal.open();
    },
    handleDelete(shop) {
      this.selectedShop = shop;
      this.$refs.deletePoiModal.open();
    },
    addShop() {
      this.showAddModal = true;
      this.$refs.addPoiModal.open();
    },
    handleGreenscore(shop) {
      this.greenscoreShop = shop;
      this.showGreenscoreModal = true;
      this.$refs.addGreenscoreModal.open();
    },
    getGreenscore(greenscoreId) {
      axios
        .get(`${window.config.api_root_url}greenscore/${greenscoreId}`)
        .then(resp => {
          resp.data[0].score.greenscore;
        });
    }
  }
};
</script>
