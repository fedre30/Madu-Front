<template>
  <div class="view-container">
    <div class="login">
      <div class="form-container">
        <h1>Connectez-vous</h1>
        <el-form class="form" label-position="top" @submit="login">
          <el-form-item label="Identifiant">
            <el-input v-model="mail_pro" placeholder="Identifiant"></el-input>
          </el-form-item>
          <el-form-item label="Mot de passe">
            <el-input
              type="password"
              v-model="password"
              placeholder="Mot de passe"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <button type="submit" @click="login" class="btn-submit">
              Se connecter
            </button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",

  components: {},

  props: {},

  data: function() {
    return {
      mail_pro: "",
      password: ""
    };
  },

  computed: {},

  mounted: function() {},

  methods: {
    login(event) {
      event.preventDefault();
      console.debug("la"); // eslint-disable-line
      this.$store
        .dispatch("login", { mail_pro: this.mail_pro, password: this.password })
        .then(() => this.$router.push({ name: "home" }))
        .catch(err => console.log(err)); // eslint-disable-line
    }
  }
};
</script>

<style lang="scss">
.view-container {
  height: 100vh;
  width: 100vw;
  background-color: #fafbfc;
  display: flex;
  align-items: center;
  justify-content: center;
  .login {
    margin: auto;
    width: 680px;
    text-align: center;
    .form-container {
      width: 100%;
      background: #ffffff;
      padding-top: 45px;
    }
    .form {
      position: relative;
      z-index: 1;
      padding: 45px;
      text-align: left;
      margin: auto;
      width: 305px;
      .email,
      .password {
        margin: 0 auto;
        .label {
          text-transform: uppercase;
          font-size: 14px;
          margin-bottom: 10px;
        }
      }
      h1 {
        text-transform: uppercase;
        font-family: "Lato Bold";
        color: #000d33;
      }
      input {
        background: transparent;
        width: 100%;
        border: 1px solid #c0c5d2;
        padding: 13px 15px;
        font-size: 17px;
        border-radius: 4px;
      }
      button {
        border-radius: 4px;
        font-family: "Roboto", sans-serif;
        text-transform: uppercase;
        outline: 0;
        background: #0077ff;
        width: 200px;
        border: 0;
        margin-top: 60px;
        padding: 15px;
        color: #ffffff;
        font-size: 14px;
        -webkit-transition: all 0.3 ease;
        transition: all 0.3 ease;
        cursor: pointer;
      }
      button:hover,
      button:focus {
        background: #076ee4;
      }
      p {
        margin: 15px 0 0;
        color: #b3b3b3;
        font-size: 12px;
        a {
          color: #4caf50;
          text-decoration: none;
        }
      }
    }
  }
}
</style>
