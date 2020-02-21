<template>
  <div id="app">
    <login v-if="!this.$store.state.currentUser.authenticated"></login>
    <div v-else>
      <Header></Header>
      <Sidebar></Sidebar>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "./views/Login.vue";
import Header from "./components/molecules/Header.vue";
import Sidebar from "./components/organisms/Sidebar.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Login,
    Header,
    Sidebar
  },
  created() {
    let token = localStorage.getItem("token");
    console.debug(token); //eslint-disable-line
    if (token !== undefined && token !== "" && token !== null) {
      console.debug("logged"); //eslint-disable-line
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

.main {
  position: absolute;
  z-index: 1;
  top: 80px;
  left: 75px;
  right: 0;
  background-color: #fafbfc;
  min-height: calc(100vh - 80px);
}
</style>
