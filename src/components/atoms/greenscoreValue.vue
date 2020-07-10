<template>
  <span>
    {{ greenscoreValue !== null ? `${greenscoreValue}%` : `Non calculé` }}
  </span>
</template>

<script>
export default {
  props: {
    relatedShop: {
      type: Object,
      required: true
    }
  },

  computed: {
    greenscoreValue() {
      return this.relatedShop.greenscore.value;
    }
  }
};
</script>
