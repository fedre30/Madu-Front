<template>
  <div class="companies">
    <div class="view-header">
      <h1 class="title">Gestion des entreprises</h1>
      <el-button type="primary" @click="openCreationModal"
        >Ajouter une entreprise</el-button
      >
    </div>
    <div v-if="clients.length === 0" class="no-results">
      Aucune entreprise n'existe, veuillez en créer une
    </div>
    <el-table
      v-else
      v-loading="loading"
      :data="clients"
      header-cell-class-name="header-cell"
    >
      <el-table-column prop="name" label="Nom">
        <template slot-scope="scope">
          <div class="company-name">{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="Type"></el-table-column>
      <el-table-column prop="size" label="Taille"></el-table-column>
      <el-table-column
        prop="accounts"
        label="Nombre d'inscrits"
      ></el-table-column>
      <el-table-column prop="address" label="Adresse"></el-table-column>
      <el-table-column label="Opération" fixed="right" width="250">
        <template slot-scope="scope">
          <div class="buttons">
            <el-button
              class="edit-button"
              type="primary"
              size="mini"
              @click="editClient(scope.row)"
              >Voir la fiche</el-button
            >
            <el-button
              icon="el-icon-delete"
              size="mini"
              type="danger"
              @click="openArchiveModal(scope.row)"
            ></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <archive-modal
      ref="archiveModal"
      modelName="client"
      @successCallback="archiveClient"
    ></archive-modal>
    <client-modal ref="clientModal" :client="selectedClient"></client-modal>
  </div>
</template>

<script>
import axios from "axios";
import ArchiveModal from "../components/organisms/archiveModal.vue";
import ClientModal from "../components/organisms/editClientModal.vue";
import openGeocoder from "node-open-geocoder";
import { mapActions } from "vuex";

// search
export default {
  components: {
    ArchiveModal,
    ClientModal,
  },

  data: function() {
    return {
      loading: false,
      loadingMap: false,
      clients: [],
      selectedClient: {},
      fakeData: [
        {
          name: "HETIC",
          address: "14 Boulevard Haussmann, 75009 Paris",
          zipCode: 93100,
          gains: 2,
          accounts: 10
        }
      ],
      clientCoords: {}
    };
  },

  computed: {
    keygen() {
      return this.selectedClient.name;
    }
  },

  mounted: function() {
    this.retrieveData();
  },

  methods: {
    ...mapActions(["fetchData", "postData", "createData"]),
    retrieveData() {
      this.loading = true;
      this.fetchData({
        modelName: "structures"
      })
        .then(resp => {
          this.clients = resp.data;
        })
        .catch(err => {
          console.error(err); //eslint-disable-line
        })
        .finally(() => {
          this.loading = false;
        });
    },
    editClient(client) {
      this.selectedClient = client;
      this.$refs.clientModal.open();
    },
    openMapModal(client) {
      this.loadingMap = true;
      openGeocoder()
        .geocode(`${client.address}, ${client.zipCode} ${client.city}`)
        .end((err, res) => {
          console.debug(res); // eslint-disable-line
          this.selectedClient = client;
          this.clientCoords = {
            lat: res[0].lat,
            lon: res[0].lon
          };
          this.loadingMap = false;
          this.$refs.mapModal.open();
        });
    },
    openArchiveModal(client) {
      this.selectedClient = client;
      this.$refs.archiveModal.open();
    },
    archiveClient() {
      axios.delete(
        `${window.config.api_root_url}structures/delete/${this.selectedClient._id}`
      );
      this.showModal = false;
    },
    openCreationModal() {
      this.selectedClient = {};
      this.$refs.clientModal.open();
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
  .no-results {
    margin-top: 45px;
    text-align: center;
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
    .company-name {
      font-family: "Lato Bold";
    }
    .map-button,
    .delete-button {
      border-color: #c0c5d2;
      color: #c0c5d2;
      background-color: #fafbfc;
    }
    .edit-button {
      background-color: #fafbfc;
      color: #0077ff;
      border-color: #0077ff;
    }
  }
}
</style>
