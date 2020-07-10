import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";

import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/fr";
import "element-ui/lib/theme-chalk/index.css";
import Icon from "vue-awesome/components/Icon";

// globally (in your main .js file)
Vue.component("v-icon", Icon);

Vue.use(ElementUI, {
  locale: locale
});
// TODO insérer l'adresse de l'api ici
window.config = {
  api_root_url: "https://2677f78a33eb488385dd84dc43c4b836.instances.fr1.caas.microservices.rest/api/v1.1/"
};
Vue.config.productionTip = false;

let app = new Vue({
  router,
  store,
  render: h => h(App)
});

app.$store.axios = Axios.create({
  baseURL: window.config.api_root_url
});
app.$store.axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
const token = localStorage.getItem("token");
if (token) {
  app.$store.axios.defaults.headers.common["Authorization"] = `Token ${token}`;
}

app.$store.dispatch("initialFetchModels");
app.$mount("#app");
window.app = app;

// app.$router.push({ name: "home" });
