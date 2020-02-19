<template>
  <div class="sidebar">
    <sidebar-entry
      v-for="entry in sidebarEntries"
      :key="entry.name"
      :name="entry.name"
      :linkName="entry.link"
      :icon="entry.icon"
    ></sidebar-entry>
    <div class="version">{{ version }}</div>
  </div>
</template>

<script>
import SidebarEntry from "./../molecules/SidebarEntry.vue";

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
          icon: "el-icon-house"
        },
        {
          link: "company-list",
          icon: "el-icon-shopping-bag-2"
        },
        {
          name: "greenscore",
          link: "greenscore",
          icon: "el-icon-shopping-bag-1"
        },
        {
          name: "shops",
          link: "shops",
          icon: "el-icon-shopping-bag-1"
        }
      ]
    };
  },
  computed: {
    //   version() {
    //     try {
    //       return VERSION;
    //     } catch (e) {
    //       console.error(e); // eslint-disable-line
    //       return "";
    //     }
    //   }
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
  background-color: white;
  border-right: 1px solid #ebedf8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20% 0;
  flex-direction: column;
  .version {
    position: absolute;
    bottom: 15px;
    left: 10px;
  }
}
</style>
