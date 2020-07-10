<template>
  <div class="entry" :class="{selected: isSelected}" @click="redirect">
    <el-tooltip
      class="item"
      effect="dark"
      :content="tooltip"
      placement="right-start"
    >
      <img class="icon" :src="imgSrc" />
    </el-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    linkName: {
      type: String,
      required: true
    },
    imageName: {
      type: String,
      required: true
    },
    tooltip: {
      type: String,
      default: "Home"
    }
  },
  data: function() {
    return {
    };
  },
  computed: {
    isSelected() {
      console.debug(this.$route); //eslint-disable-line
      return this.$route.name === this.linkName;
    },
    imgSrc() {
      return require(`../../static/img/${this.imageName}_${this.isSelected ? 'white' : 'blue'}.png`);
    }
  },
  mounted() {
  },
  methods: {
    redirect() {
      this.$router.push({
        name: this.linkName
      });
    }
  }
};
</script>

<style lang="scss">
.entry {
  display: flex;
  align-items: center;
  width: 100%;
  color: #c0c5d2;
  height: 56px;
  + .entry {
    margin-top: 25px;
  }
  .icon {
    margin: auto;
  }
  &.selected {
    border-right: 3px solid white;
  }
  &:hover {
    cursor: pointer;
    background-color: #5B74ED;
  }
}
</style>
