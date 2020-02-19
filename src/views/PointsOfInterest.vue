<template>
  <div class="poi">
    <h2>Gestions de commerces</h2>
    <PoiTable />
  </div>
</template>

<script>
import PoiTable from "../components/poi/PoiTable";
export default {
  components: {
    PoiTable
  }
};
</script>

<style lang="scss">
.poi {
  padding: 2rem;
}
</style>
