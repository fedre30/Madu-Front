<template>
  <!-- GREENSCORE MODAL -->
  <el-dialog
    width="40%"
    title="GREENSCORE"
    :visible.sync="showModal"
    append-to-body
  >
    <h2>Catégories et critères</h2>
    <div v-if="shop.uid">
      <div v-for="main in mainCriterias" :key="main.uid">
        <h3>
          {{ main.name }}
          {{
            shop.greenscore[main.uid].value
              ? `${shop.greenscore[main.uid].value}%`
              : ""
          }}
        </h3>
        <div v-for="key in Object.keys(shop.greenscore[main.uid])" :key="key">
          <div v-if="key !== 'value' && shop.greenscore[main.uid][key].isUsed">
            {{ greenscoreCriteriasByUid(key).name }}
          </div>
        </div>
      </div>
    </div>
    <span class="add-criteria" @click="showModalCriterias = true">
      + Editer les critères
    </span>

    <el-dialog
      title="critère"
      :visible.sync="showModalCriterias"
      width="40%"
      append-to-body
    >
      <el-tabs v-model="activeName">
        <el-tab-pane
          v-for="item in mainCriterias"
          :key="item.uid"
          :label="item.name"
          :name="item.name"
        >
          <div :key="Object.keys(shop.greenscore[item.uid]).length">
            <el-row :gutter="0">
              <el-col :span="4">
                <div>Use</div>
              </el-col>
              <el-col :span="12">
                <div>Name</div>
              </el-col>
              <el-col :span="6">
                <div>Value</div>
              </el-col>
            </el-row>
            <div
              v-for="criteriaUid in Object.keys(shop.greenscore[item.uid])"
              :key="criteriaUid"
            >
              <el-row :gutter="0" v-if="criteriaUid !== 'value'">
                <el-col :span="4">
                  <el-checkbox
                    v-model="shop.greenscore[item.uid][criteriaUid].isUsed"
                  ></el-checkbox>
                </el-col>
                <el-col :span="12">
                  <div>{{ greenscoreCriteriasByUid(criteriaUid).name }}</div>
                </el-col>
                <el-col :span="6">
                  <el-input
                    v-model="shop.greenscore[item.uid][criteriaUid].value"
                  ></el-input>
                </el-col>
              </el-row>
            </div>
          </div>
          <el-button @click="addCriteria(item.uid)">Ajouter critère</el-button>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer">
        <el-button @click="showModalCriterias = false">Retour</el-button>
        <el-button type="primary" @click="computeNewScore">Ok</el-button>
      </span>
    </el-dialog>

    <el-row style="margin: 2rem 0">
      <el-button type="primary" @click="submitGreenscore">
        Enregistrer
      </el-button>
      <el-button @click="showModal = false">Annuler</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },

  data: function() {
    return {
      showModal: false,
      showModalCriterias: false,
      mainCriterias: [],
      shop: {},
      greenscoreCriterias: [],
      activeName: ""
    };
  },

  computed: {
    ...mapGetters(["typesOfShopsByUid", "greenscoreCriteriasByUid"])
  },

  methods: {
    ...mapActions(["createItem", "patchItem"]),
    computeNewScore() {
      let score = 0;
      let counter = 0;
      this.mainCriterias.forEach(criteria => {
        let subScore = 0;
        let subCounter = 0;
        Object.keys(this.shop.greenscore[criteria.uid]).forEach(entry => {
          console.debug(entry);//eslint-disable-line
          console.debug(this.shop.greenscore[criteria.uid][entry]);//eslint-disable-line
          if (
            entry !== "value" &&
            this.shop.greenscore[criteria.uid][entry].isUsed
          ) {
            score += parseInt(this.shop.greenscore[criteria.uid][entry].value);
            counter++;
            subScore += parseInt(
              this.shop.greenscore[criteria.uid][entry].value
            );
            subCounter++;
          }
        });
        if (subCounter > 0) {
          console.debug(subScore);//eslint-disable-line
          console.debug(subCounter);//eslint-disable-line

          this.shop.greenscore[criteria.uid].value = parseInt(
            subScore / subCounter
          );
        } else {
          this.shop.greenscore[criteria.uid].value = null;
        }
      });
      if (counter > 0) {
        this.shop.greenscore.value = parseInt(score / counter);
      } else {
        this.shop.greenscore.value = null;
      }
      this.showModalCriterias = false;
    },
    open(shop) {
      this.shop = shop;
      delete this.shop.image;
      let typeOfShop = this.typesOfShopsByUid(this.shop.type);
      this.mainCriterias = typeOfShop.criterias.map(criteriaUid => {
        return this.greenscoreCriteriasByUid(criteriaUid);
      });
      this.$set(
        this,
        "greenscoreCriterias",
        this.$store.state["greenscoreCriteriasList"].map(
          objId => this.$store.state["greenscoreCriterias"][objId]
        )
      );
      this.mainCriterias.forEach(criteria => {
        this.generateSubCriterias(criteria.uid);
      });
      this.computeNewScore();
      this.activeName =
        this.mainCriterias.length > 0 ? this.mainCriterias[0].name : "";
      this.showModal = true;
    },
    generateSubCriterias(parent_uid) {
      let criterias = this.greenscoreCriterias.filter(criteria => {
        return criteria.parent_criteria_uid === parent_uid;
      });
      let existingCriterias = this.shop.greenscore[parent_uid];
      let newCriterias = {};
      criterias.forEach(criteria => {
        if (existingCriterias[criteria.uid]) {
          newCriterias[criteria.uid] = existingCriterias[criteria.uid];
        } else {
          newCriterias[criteria.uid] = {
            isUsed: false,
            value: 0
          };
        }
      });
      this.shop.greenscore[parent_uid] = newCriterias;
    },

    submitGreenscore() {
      this.patchItem({
        item: this.shop,
        model: "shops"
      });
      this.showModal = false;
    },

    addCriteria(parentUid) {
      this.$prompt("Entrez le nom du nouveau critère", "Nouveau critère", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel"
      }).then(({ value }) => {
        this.createItem({
          item: {
            name: value,
            parent_criteria_uid: parentUid
          },
          model: "greenscoreCriterias",
          url: this.$store.state.metaDefinition.listModels.greenscoreCriterias
            .url
        })
          .then(async res => {
            this.$notify.success({
              message: `Le nouveau critère ${value} a bien été créé`
            });
            console.debug(res);//eslint-disable-line
            this.greenscoreCriterias.push(res);
            this.mainCriterias.forEach(criteria => {
              this.generateSubCriterias(criteria.uid);
            });
          })
          .catch(() => {
            this.$notify.error({
              message: `Erreur lors de la création du critère ${value}`
            });
          });
      });
    },
    removeCriteria(/*category, id*/) {
      // this.formData[category].splice(id, 1);
    }
  }
};
</script>
