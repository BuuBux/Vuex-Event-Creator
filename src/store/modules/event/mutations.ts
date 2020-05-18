import { Event } from '@/types/EventTyping';
import { EventState } from '@/types/StateTyping';
import { MutationTree } from 'vuex';

const mutations: MutationTree<EventState> = {
  SET_EVENTS(state, events: Event[]) {
    state.events = events;
  },
  SET_EVENT(state, event: Event) {
    state.event = event;
  },
  ADD_EVENT(state, event: Event) {
    state.events.push(event);
  },
  SET_TOTAL_EVENT(state, eventTotal: number) {
    state.eventTotal = eventTotal;
  },
};

export default mutations;
