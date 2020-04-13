import { RootState, UserState } from '@/types/StateTyping';
import { Module } from 'vuex';
import state from './state';

const user: Module<UserState, RootState> = {
  state,
};

export default user;
