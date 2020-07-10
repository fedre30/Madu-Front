<template>
  <div class="sidebar">
    <img src="../../static/img/Madu_Logo_white.png" />
    <div class="entries">
      <sidebar-entry
        v-for="entry in sidebarEntries"
        :key="entry.name"
        :linkName="entry.link"
        :imageName="entry.imageName"
        :tooltip="entry.tooltip"
      ></sidebar-entry>
    </div>
    <el-button class="logout-button" @click="logout">
      <img src="../../static/img/logout_white.png" />
    </el-button>
    <div class="version">{{ version }}</div>
  </div>
</template>

<script>
import SidebarEntry from "./../molecules/SidebarEntry.vue";
import { mapActions } from "vuex";

/*global VERSION:true*/

export default {
  components: {
    SidebarEntry
  },
  data: function() {
    return {
      sidebarEntries: [
        {
          link: "home",
          imageName: "map",
          tooltip: "Home"
        },
        {
          link: "company-list",
          imageName: "company",
          tooltip: "Entreprises"
        },
        {
          link: "shops",
          imageName: "shop",
          tooltip: "POI"
        },
        {
          link: "challenges",
          imageName: "leaf",
          tooltip: "Challenges"
        },
        {
          link: "tips",
          imageName: "tips",
          tooltip: "Récompenses"
        },
        {
          link: "new-addresses",
          imageName: "address",
          tooltip: "Nouvelles adresses"
        },
        {
          link: "disagreements",
          imageName: "dislike",
          tooltip: "Avis utilisateur"
        }
      ]
    };
  },
  computed: {
    version() {
      try {
        return VERSION;
      } catch (e) {
        console.error(e); // eslint-disable-line
        return "";
      }
    }
  },
  methods: {
    ...mapActions(["logout"])
  }
};
</script>

<style lang="scss">
.sidebar {
  position: fixed;
  z-index: 2;
  width: 75px;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #738bff;
  border-right: 1px solid #ebedf8;
  display: flex;
  align-items: center;
  padding: 25px 0;
  flex-direction: column;
  .entries {
    flex-grow: 1;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    flex-direction: column;
    padding-top: 60px;
    width: 100%;
  }
  .version {
    position: absolute;
    bottom: 15px;
    left: 10px;
  }
  .logout-button {
    background-color: #364ec1;
    border: none;
    margin-bottom: 30px;
    padding: 15px;
    width: 55px;
    height: 55px;
    &:hover,
    &:focus {
      background-color: #364ec1;
    }
  }
}
</style>
