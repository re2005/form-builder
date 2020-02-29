import Vue from 'vue';
import Vuex from 'vuex';
import { userStoreModule } from '@/store/modules/user.store';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        userStoreModule
    }
});
