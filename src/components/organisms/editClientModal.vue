<template>
  <div class="client-modal">
    <el-dialog
      :title="
        Object.keys(client).length > 0
          ? 'Editer une entreprise'
          : 'Ajouter une entreprise'
      "
      :visible.sync="isOpen"
      width="60%"
      append-to-body
      @close="close"
    >
      <el-row :gutter="20" type="flex" style="flex-wrap: wrap;">
        <el-col :span="24">
          <p class="client-modal-label">Nom</p>
          <el-input
            v-model="editedClient.name"
            placeholder="Nom du client"
          ></el-input>
        </el-col>
        <el-col :span="24">
          <p class="client-modal-label">Adresse</p>
          <el-input
            v-model="editedClient.address"
            placeholder="Adresse du client"
          ></el-input>
        </el-col>
        <el-col :span="12">
          <p class="client-modal-label">Code postal</p>
          <el-input
            v-model="editedClient.zipcode"
            placeholder="zip code de l'adresse"
          ></el-input>
        </el-col>
        <el-col :span="12">
          <p class="client-modal-label">Ville</p>
          <el-input
            v-model="editedClient.city"
            placeholder="Ville de l'adresse"
          ></el-input>
        </el-col>
        <el-col :span="12">
          <div class="taille">
            <p class="client-modal-label">Taille:</p>
            <el-select v-model="editedClient.size">
              <el-option
                v-for="item in sizeAvailables"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="type">
            <p class="client-modal-label">Type:</p>
            <el-select v-model="editedClient.type">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="type">
            <p class="client-modal-label">Nom de domaine de l'email:</p>
            <el-input
              v-model="editedClient.mail_affix"
              placeholder="entreprise.com"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="type">
            <p class="client-modal-label">Visibilité</p>
            <el-checkbox
              v-model="editedClient.show_other_companies"
              label="Peux voir les résultats des autres entreprises"
            ></el-checkbox>
          </div>
        </el-col>
        <el-col :span="12">
          <p class="client-modal-label">Début de forfait</p>
          <el-date-picker
            v-model="editedClient.bundle_start_date"
            type="date"
            :value-format="'yyyy-MM-DD'"
            placeholder="Choisir un jour"
          ></el-date-picker>
        </el-col>
        <el-col :span="12">
          <p class="client-modal-label">Fin de forfait</p>
          <el-date-picker
            v-model="editedClient.bundle_end_date"
            type="date"
            :value-format="'yyyy-MM-DD'"
            placeholder="Choisir un jour"
          ></el-date-picker>
        </el-col>
      </el-row>
      <span slot="footer">
        <el-button @click="isOpen = false">Annuler</el-button>
        <el-button type="primary" @click="validate">Valider</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  components: {},

  props: {
    client: {
      type: Object,
      default: () => {}
    }
  },

  data: function() {
    return {
      isOpen: false,
      editedClient: {},
      options: [
        {
          label: "Business",
          value: "Business"
        }
      ],
      sizeAvailables: ["TPE", "PME"]
    };
  },

  computed: {
    mapCenter() {
      return {
        latitude: this.clientCoords.lat,
        longitude: this.clientCoords.lon
      };
    },
    mapData() {
      return [
        {
          coords: this.mapCenter
        }
      ];
    }
  },
  watch: {
    client(val) {
      this.editedClient = JSON.parse(JSON.stringify(val));
    }
  },

  mounted: function() {
    this.editedClient = JSON.parse(JSON.stringify(this.client));
  },

  methods: {
    ...mapActions(["createItem", "updateItem"]),
    setClientSize(size) {
      this.editedClient.size = size;
    },
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    validate() {
      if (this.client.uid) {
        this.updateItem({
          item: this.editedClient,
          model: "companies"
        });
      } else {
        this.createItem({
          item: this.editedClient,
          model: "companies",
          url: this.$store.state.metaDefinition.listModels.companies.url
        });
      }
      this.close();
    }
  }
};
</script>

<style lang="scss">
.client-modal-label {
  text-transform: uppercase;
  text-align: left !important;
  letter-spacing: 1.5px;
  color: #364ce1 !important;
  width: 100%;
}
</style>
