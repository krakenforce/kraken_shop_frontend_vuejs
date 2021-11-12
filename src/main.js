import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex';
import router from './router';
import CKEditor from 'ckeditor4-vue';
import moment from 'moment'
import setupInterceptors from './services/setupInterceptors';
import store from "./store/index";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueDOMPurifyHTML from 'vue-dompurify-html'
import VueHtmlToPaper from 'vue-html-to-paper';

Vue.use(VueHtmlToPaper, options);
Vue.prototype.moment = moment;
Vue.config.productionTip = false
Vue.use(Vuex);
Vue.use(CKEditor);

setupInterceptors(store);

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ]
}

new Vue({
  VueDOMPurifyHTML,
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
