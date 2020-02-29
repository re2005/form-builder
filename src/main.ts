import './hooks';
import Vue from 'vue';
import App from './App.vue';
// import './registerServiceWorker';
import router from './router';
import store from './store';
import '@/assets/scss/styles.scss';
// Here goes all external dependencies
import '@/dependencies/dependencies';
import { i18n } from '@/dependencies/i18n';
import applicationService from '@/services/application.service';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    i18n,
    created: () => applicationService.init(),
    render: h => h(App)
}).$mount('#app');
