import Vue from 'vue';
import Vuex from 'vuex';

import rmc from './modules/rmc';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        rmc
    }
});
