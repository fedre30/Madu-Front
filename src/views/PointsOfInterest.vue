<template>
  <div class="poi">
    <PoiTable />
  </div>
</template>

<script>
import PoiTable from "../components/poi/PoiTable.vue";
export default {
  components: {
    PoiTable
  }
};
</script>

<style lang="scss">
.poi {
  padding: 50px 70px;
}
</style>
