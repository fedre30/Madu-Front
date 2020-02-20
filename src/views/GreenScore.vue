<template>
  <div class="companies">
    <div class="view-header">
      <h1 class="title">Gestion du Greenscore</h1>
    </div>
    <template>
      <el-tabs class="tab_1" v-model="activeNameType" @tab-click="handleClick">
        <el-tab-pane label="Restaurant" name="restaurant"></el-tab-pane>
        <el-tab-pane label="Boutique" name="shop"></el-tab-pane>
        <el-tab-pane label="Activités" name="activity"></el-tab-pane>
      </el-tabs>
    </template>
    <template>
      <el-table
        header-cell-class-name="header-cell"
        :data="resturantData['food']"
        style="width: 100%"
      >
        <el-table-column fixed label="Categorie">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <p class="categorie" size="medium">
                {{ scope.row[0].food.criteria }}
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Critère">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>Nom:{{ scope.row.criteria }}</p>
              <div slot="reference" class="name-wrapper">
                <span>{{ scope.row.name }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="Pondération">
          <template slot-scope="scope">
            <span style="margin-right: 10px">{{ scope.row.coefficient }}</span>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {},

  props: {},

  data: function() {
    return {
      activeNameType: "first",
      arctiveNameCriteria: "first",
      resturantData: ""
    };
  },

  mounted: function() {
    axios
      .get(`${window.config.api_root_url}greenscore/shops/restaurant`)
      .then(response =>
        // eslint-disable-next-line no-console
        console.log(Object.values(response.data))(
          (this.resturantData = response.data)
        )
      );
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
}
</style>
