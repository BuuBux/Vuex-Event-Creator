import { RootState, UserState } from '@/types/StateTyping';
import { Module } from 'vuex';
import state from './state';

const namespaced = true;

const user: Module<UserState, RootState> = {
  namespaced,
  state,
};

export default user;
