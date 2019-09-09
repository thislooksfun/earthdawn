import Vue from "vue";

import BootstrapVue from "bootstrap-vue";
import Argon from "vue-argon-theme";

import App from "./App";
import router from "./router";
import store from "./store";

Vue.use(Argon);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
