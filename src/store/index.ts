import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import event from '@/store/modules/event/event';
import user from '@/store/modules/user/user';
import { RootState } from '@/types/StateTyping';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    categories: [
      'Sustainability',
      'Nature',
      'Animal welfare',
      'Housing',
      'Education',
      'Food',
      'Community',
    ],
  },
  modules: {
    user,
    event,
  },
};

export default new Vuex.Store(store);
