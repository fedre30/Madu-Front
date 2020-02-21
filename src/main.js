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
  api_root_url: "http://35.180.73.134:3000/"
};
Vue.prototype.$http = Axios;
const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token}`;
  Vue.prototype.$http.defaults.headers.common["Access-Control-Allow-Origin"] =
    "*";
}
Vue.config.productionTip = false;

let app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

window.app = app;

app.$router.push({ name: "home" });
