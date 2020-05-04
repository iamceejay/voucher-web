import Vue from 'vue';
import Vuex from 'vuex';

import Auth from './Modules/Auth';

Vue.use(Vuex);

export default {
  modules: {
    Auth,
  }
}