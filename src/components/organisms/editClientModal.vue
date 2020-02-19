<template>
  <div class="">
    <el-dialog
      :title="client.name"
      :visible.sync="isOpen"
      width="60%"
      append-to-body
      @close="close"
    >
      <el-input
        v-model="editedClient.name"
        placeholder="Nom du client"
      ></el-input>
      <el-input
        v-model="editedClient.address"
        placeholder="Adresse du client"
      ></el-input>
      <el-input
        v-model="editedClient.zipCode"
        placeholder="zip code de l'adresse"
      ></el-input>
      <el-input
        v-model="editedClient.city"
        placeholder="Ville de l'adresse"
      ></el-input>
      <div class="client-structure-details">
        <div class="type">
          <p class="label">Type:</p>
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
        <div class="taille">
          <p class="label">Taille:</p>
          <div class="buttons-container">
            <el-button
              v-for="size in sizeAvailables"
              :key="size"
              type="text"
              @click="setClientSize(size)"
              >{{ size }}</el-button
            >
          </div>
        </div>
        <div class="user-number">
          <p class="label">Nb d'utilisateurs:</p>
          <el-input v-model="editedClient.user" disabled></el-input>
        </div>
      </div>
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
    ...mapActions(["postData", "patchData"]),
    setClientSize(size) {
      this.editedClient.size = size;
    },
    open() {
      console.debug('open'); // eslint-disable-line
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    validate() {
      if (this.client._id) {
        this.patchData({
          modelName: "structures",
          objectId: this.client._id,
          data: this.editedClient
        });
      } else {
        this.postData({
          modelName: "structures",
          data: this.editedClient
        });
      }
      this.close();
    }
  }
};
</script>

<style lang="scss" module></style>
