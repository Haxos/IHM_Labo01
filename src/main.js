import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

window.Noty = require('noty');
import VueShortkey from "vue-shortkey";
Vue.use(VueShortkey);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
