import Vue from 'vue';
import Vuex from 'vuex';
import event from '@/store/modules/event';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    event,
  },
});
