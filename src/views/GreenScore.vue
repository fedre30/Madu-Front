<template>
        <div class="companies">
            <div class="view-header">
                <h1 class="title">Gestion du Greenscore</h1>
                <el-button type="primary">Ajouter un commençant</el-button>
            </div>
        <template>
                <el-tabs class="tab_1" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane  label="Restaurant" name="Restaurant"></el-tab-pane>
                <el-tab-pane  label="Boutique" name="Boutique"></el-tab-pane>
                <el-tab-pane  label="Losirs" name="Losirs"></el-tab-pane>
                <el-tab-pane label="Logement" name="Logement"></el-tab-pane>
                </el-tabs>
        </template>    
            <template>
                <el-tabs class="tab_2" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane  label="Niveau 1" name="first"></el-tab-pane>
                <el-tab-pane  label="Niveau 2" name="second"></el-tab-pane>
                <el-tab-pane  label="Niveau 3" name="third"></el-tab-pane>
                </el-tabs>
        </template>
            <template>
                
                <el-table header-cell-class-name="header-cell"
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        fixed
                        label="Categorie"
                        width="147">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                        <p>Nom: {{scope.row.categorie}}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.categorie }}</el-tag>
                        </div>
                        </el-popover>
                    </template>
                    
                    </el-table-column>
                    <el-table-column
                        label="Critère"
                        width="300">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                        <p>Nom:{{scope.row.name}}</p>
                        <div slot="reference" class="name-wrapper">
                            <span>{{ scope.row.name }}</span>
                        </div>
                        </el-popover>
                    </template>
                    
                    </el-table-column>
                    <el-table-column
                        label="Caractéristiques"
                        width="300">
                    <el-progress type="circle" :percentage="25"></el-progress>
                        <template slot-scope="scope">
                            <span style="margin-right: 10px">{{ scope.row.etat_1 }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Pondération"
                        width="200">
                        <template slot-scope="scope">
                            <span style="margin-right: 10px">{{ scope.row.etat_2 }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="Opérations">
                    <template 
                        slot-scope="scope"
                        size="mini"
                        >
                        <el-button class="btn"  
                        type="default"
                        @click="handleEdit(scope.$index, scope.row)">Éditer</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </template>
            </div>
    </template>

<script>
export default {
  components: {},

  props: {},

  data: function() {
    return {
        activeName: 'first',
        tableData: [
            {
                categorie:'food',
                name: 'Provenance matières premiéres',
                etat_1:"Locale et circuit court",
                etat_2:"70",
            },
             {
                categorie:'food',
                name: 'Agriculture concernée',
                etat_1:"Bio ou raisonnée",
                etat_2:"82",
            },
                     {
                         categorie:'social',
                         name: 'Trajet travail',
                         etat_1:"Transports communs",
                         etat_2:"76",
                     },
                      {
                         categorie:'social',
                         name: 'Produits',
                         etat_1:"Ethiques",
                         etat_2:"93",
                     },
             
             {
                categorie:'matériel',
                name: 'Mobilier',
                etat_1:"2nd main",
                etat_2:"64",
            },
             {
                categorie:'materiel',
                name: 'À emporter',
                etat_1:"Consigne / contenant du client",
                etat_2:"56",
               
            }
        ]
    };
  },

  computed: {},

  mounted: function() {},

  methods: {
       handleEdit(index, row) {
        console.log(index, row); // eslint-disable-line
      },
      handleDelete(index, row) {
        console.log(index, row); // eslint-disable-line 
      },
        handleClick(tab, event) {
        console.log(tab, event); // eslint-disable-line 
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
  .el-table {
    font-size: 14px;
    color: #77848f;
    background-color: transparent;
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
    
       
    .tab_1{
        font-size:14px;
        margin-top:38px;
        text-transform: uppercase;
        font-weight: bold;
        font-style: normal;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: 1.49286px;
        color: #515F6D;
    }
    .tab_2{
        font-size:15px;
        margin-top:31px;
        font-weight: normal;
        font-style: normal;
        font-size: 15px;
        line-height: 17px;
        line-height: 18px;
        color: #515F6D;
        letter-spacing: 0.103125px;
        letter-spacing: 1.49286px;
        .el-tabs__nav-wrap::after {
        width:24%;
    }
    
    }
    .btn{
        color:#0077FF;
        border-color:#0077FF;
        font-size:14px;
    }
    
}
</style>