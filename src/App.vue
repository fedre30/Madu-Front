<template>
  <div id="app">
    <login v-if="!this.$store.state.currentUser.authenticated"></login>
    <div v-else>
      <Sidebar></Sidebar>
      <div v-if="$store.getters.modelsLoaded" class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "./views/Login.vue";
import Sidebar from "./components/organisms/Sidebar.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Login,
    Sidebar
  },
  created() {
    let token = localStorage.getItem("token");
    if (token !== undefined && token !== "" && token !== null) {
      this.$store.commit("AUTHENTICATE_USER");
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    UserIsLogged() {
      return this.$store.state.currentUser.authenticated;
    }
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: "Lato Regular";
  src: url("./static/font/Lato/Lato-Regular.ttf");
}
@font-face {
  font-family: "Lato Bold";
  src: url("./static/font/Lato/Lato-Bold.ttf");
}
body {
  margin: 0;
  font-family: "Lato Regular", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#app {
  min-height: 100vh;
  color: #364ec1;
}
textarea {
  font-family: "Lato Regular";
}
h1 {
  margin: 0;
  font-size: 48px;
}
.el-dialog__title {
  font-family: "Lato Bold";
  display: block;
  margin: 20px !important;
  color: #364ec1 !important;
  font-size: 30px !important;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.el-form-item__label {
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #364ce1 !important;
  width: 100%;
  text-align: left !important;
}

.main {
  position: absolute;
  z-index: 1;
  left: 75px;
  right: 0;
  background-color: #fafbfc;
  min-height: 100vh;
}
</style>
