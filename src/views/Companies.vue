<template>
  <div class="companies">
    <div class="view-header">
      <h1 class="title">Gestion des entreprises</h1>
      <div class="actions">
        <el-button type="primary" class="create-button" @click="openCreationModal"
          >Ajouter une entreprise</el-button
        >
      </div>
    </div>
    <div>
      <div v-if="companies.length === 0" class="no-results">
        Aucune entreprise n'existe, veuillez en créer une
      </div>
      <el-table
        v-else
        v-loading="loading"
        :data="companies"
        header-cell-class-name="header-cell"
      >
        <el-table-column prop="name" label="Nom">
          <template slot-scope="scope">
            <div class="company-name">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="Type"></el-table-column>
        <el-table-column prop="size" label="Taille"></el-table-column>
        <el-table-column prop="total_user" label="Nombre d'utilisateurs">
          <template slot-scope="scope">
            {{ printAndSetUserAmount(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="localisation"></el-table-column>
        <el-table-column label="Opérations" fixed="right" width="150">
          <template slot-scope="scope">
            <div class="buttons">
              <el-button
                class="edit-button"
                type="primary"
                size="mini"
                @click="editClient(scope.row)"
                >Éditer</el-button
              >
              <el-button
                icon="el-icon-delete"
                class="delete-button"
                size="mini"
                type="danger"
                @click="openArchiveModal(scope.row)"
              ></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <archive-modal
      ref="archiveModal"
      modelName="client"
      @successCallback="archiveClient"
    ></archive-modal>
    <client-modal ref="clientModal" :client="selectedClient"></client-modal>
  </div>
</template>

<script>
import ArchiveModal from "../components/organisms/archiveModal.vue";
import ClientModal from "../components/organisms/editClientModal.vue";
import openGeocoder from "node-open-geocoder";
import { mapActions, mapGetters } from "vuex";

// search
export default {
  components: {
    ArchiveModal,
    ClientModal
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
    ...mapGetters(["companies", "users"]),
    keygen() {
      return this.selectedClient.name;
    }
  },
  methods: {
    ...mapActions(["deleteItem", "patchItem"]),
    editClient(client) {
      this.selectedClient = client;
      this.$refs.clientModal.open();
    },
    openMapModal(client) {
      this.loadingMap = true;
      openGeocoder()
        .geocode(`${client.address}, ${client.zipCode} ${client.city}`)
        .end((err, res) => {
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
      this.deleteItem({
        item: this.selectedClient,
        model: "companies"
      });
      this.showModal = false;
    },
    openCreationModal() {
      this.selectedClient = {};
      this.$refs.clientModal.open();
    },
    printAndSetUserAmount(company) {
      let userAmount = this.users.filter(user => {
        return user.company_uid === company.uid;
      }).length;
      if (company.url && company.total_user !== userAmount) {
        this.patchItem({
          item: {
            url: company.url,
            total_user: userAmount
          },
          model: "companies"
        });
      }
      return userAmount;
    }
  }
};
</script>

<style lang="scss">
.companies {
  margin: 50px 70px;
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
      color: #364ce1;
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
    .edit-button {
      background-color: #fafbfc;
      color: #364ec1;
      border-color: #364ec1;
      &:hover {
        background-color: #364ec1;
        color: #fafbfc;
      }
    }
  }
}
</style>
