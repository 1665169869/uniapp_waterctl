import App from './App'
import Vuex from 'vuex'
import store from "@/store";

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
  Vuex
})
app.use(store);
app.$mount()
// #endif



// #ifdef VUE3
import { createSSRApp } from 'vue'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store);
  return {
    app,
    Vuex
  }
}
// #endif


