<template>
  <div class="view-container">
    <div class="login">
      <div class="form-container">
        <img src="../static/img/Madu_Logo.png" />
        <h1>Connectez-vous</h1>
        <el-form class="form" label-position="top" @submit="login">
          <el-form-item class="email" label="Identifiant">
            <el-input v-model="email" placeholder="Identifiant"></el-input>
          </el-form-item>
          <el-form-item class="password" label="Mot de passe">
            <el-input
              type="password"
              v-model="password"
              placeholder="Mot de passe"
            ></el-input>
          </el-form-item>
          <div class="error" v-show="error">
            Les identifiants ne sont pas valides.
          </div>
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
      email: "",
      password: "",
      error: false
    };
  },

  watch: {
    email() {
      if (this.error) {
        this.error = false;
      }
    },
    password() {
      if (this.error) {
        this.error = false;
      }
    }
  },

  methods: {
    login(event) {
      event.preventDefault();
      this.$store
        .dispatch("login", { email: this.email, password: this.password })
        .then(() => this.$router.push({ name: "home" }))
        .catch(err => {
          console.log(err) // eslint-disable-line
          this.error = true;
        });
    }
  }
};
</script>

<style lang="scss">
.view-container {
  height: 100vh;
  width: 100vw;
  background-color: #738bff;
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
      padding: 50px 0;
      h1 {
        text-transform: uppercase;
        font-family: "Lato Bold";
        font-size: 30px;
        line-height: 36px;
        color: #364ec1;
        margin: 63px 0;
      }
    }
    .form {
      position: relative;
      z-index: 1;
      padding: 0 45px;
      text-align: left;
      margin: auto;
      width: 305px;
      .email,
      .password {
        margin: 0 auto;
        .el-form-item__label {
          margin: 0;
          text-transform: uppercase;
          font-size: 14.45px;
          line-height: 17px;
          letter-spacing: 1.50px;
          color: #364ec1;
        }
      }
      .email {
        margin-bottom: 35px;
      }
      .error {
        position: absolute;
        bottom: 85px;
        font-size: 13px;
        line-height: 16px;
        color: #ff6a62;
        letter-spacing: 0.10px;
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
        display: block;
        border-radius: 4px;
        outline: 0;
        background: #364ec1;
        width: 200px;
        border: 0;
        margin: 60px auto 0;
        padding: 15px;
        color: #ffffff;
        font-size: 14px;
        -webkit-transition: all 0.3 ease;
        transition: all 0.3 ease;
        cursor: pointer;
      }
      button:hover,
      button:focus {
        background: #738bff;
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
