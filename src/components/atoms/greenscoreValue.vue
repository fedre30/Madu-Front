<template>
  <span v-if="value">{{ value }}%</span>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      value: ""
    };
  },

  props: {
    greenscoreId: {
      type: String
    }
  },

  mounted() {
    axios
      .get(`${window.config.api_root_url}greenscore/${this.greenscoreId}`)
      .then(resp => {
        this.value = resp.data[0].score.greenscore;
      });
  }
};
</script>
