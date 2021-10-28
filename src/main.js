import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex';
import router from './router';
import CKEditor from 'ckeditor4-vue';
// import setupInterceptors from './services/setupInterceptors';
// import store from './store/index';

Vue.config.productionTip = false
Vue.use(Vuex);
Vue.use(CKEditor);
//setupInterceptors(store);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
