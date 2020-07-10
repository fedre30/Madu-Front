<template>
  <el-dialog
    :title="isValidation ? 'Valider' : 'Supprimer'"
    :visible.sync="showModal"
    width="60%"
    append-to-body
    @close="showModal = false"
  >
    Êtes-vous sûr(e) de vouloir
    {{ isValidation ? "valider" : "supprimer" }} cette nouvelle adresse ?
    <span slot="footer">
      <el-button @click="showModal = false">Annuler</el-button>
      <el-button
        type="primary"
        @click="isValidation ? validateAddress() : deleteAddress()"
      >
        {{ isValidation ? "Valider" : "Supprimer" }}
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    isValidation: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: function() {
    return {
      showModal: false,
      address: {}
    };
  },
  computed: {
    ...mapGetters(["typesOfShops", "greenscoreCriteriasByUid"])
  },
  methods: {
    ...mapActions(["deleteItem", "createItem", "patchItem", "remoteGet"]),
    open(address) {
      this.address = address;
      this.showModal = true;
    },
    async validateAddress() {
      this.remoteGet({ url: `user/${this.address.related_user_uid}` })
        .then(user => {
          user.data.current_leaves = parseInt(user.data.current_leaves) + 30;
          user.data.total_leaves = parseInt(user.data.total_leaves) + 30;
          return user;
        })
        .then(user => {
          this.patchItem({
            item: user.data,
            model: "users"
          });
          let typeOfShop = this.typesOfShops[0];
          this.address.type_uid = typeOfShop.uid;
          let mainCriterias = typeOfShop.criterias.map(criteriaUid => {
            if (this.$store.state["greenscoreCriterias"]) {
              return this.greenscoreCriteriasByUid(criteriaUid);
            } else {
              return {};
            }
          });
          this.address.greenscore = {};
          mainCriterias.forEach(criteria => {
            this.address.greenscore[criteria.uid] = { value: null };
          });
          this.address.greenscore.value = null;
          this.createItem({
            item: this.address,
            model: "shops",
            url: this.$store.state.metaDefinition.listModels.shops.url
          }).then(() => {
            this.deleteAddress();
          });
        });
    },
    deleteAddress() {
      this.deleteItem({
        item: this.address,
        model: "newAddresses"
      });
      this.showModal = false;
    }
  }
};
</script>

<style lang="scss" module></style>
