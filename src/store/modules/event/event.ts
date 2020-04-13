import { Module } from 'vuex';
import { EventState, RootState } from '@/types/StateTyping';
import mutations from './mutations';
import state from './state';
import actions from './actions';
import getters from './getters';

const namespaced = true;

const event: Module<EventState, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters,
};

export default event;
