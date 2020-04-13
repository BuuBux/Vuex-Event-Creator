import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import event from '@/store/modules/event/event';
import user from '@/store/modules/user/user';
import { RootState } from '@/types/StateTyping';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
  },
  modules: {
    user,
    event,
  },
};

export default new Vuex.Store(store);
