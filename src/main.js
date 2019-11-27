import Vue from "vue";

import { TooltipPlugin } from "bootstrap-vue";
import "@/assets/scss/global.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faMinus,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import App from "./App";
import router from "./router";
import store from "./store";

import BaseButton from "./components/helper/BaseButton";

library.add(faPlus);
library.add(faMinus);
library.add(faTrashAlt);
library.add(faExclamationTriangle);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("BaseButton", BaseButton);

Vue.use(TooltipPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
