import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
import { IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import '@/assets/scss/main.scss'; // global css
import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

Vue.use(IconsPlugin)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
