import { ActionTree } from 'vuex';
import { Event } from '@/types/EventTyping';
import { EventState, RootState } from '@/types/StateTyping';
import AxiosService from '@/services/AxiosService';
import state from '@/store/modules/event/state';

const axios = new AxiosService();

const actions: ActionTree<EventState, RootState> = {
  creatEvent({ commit }, event: Event) {
    return axios.postEvent(event).then(() => {
      commit('ADD_EVENT', event);
    });
  },
  async filterEvents({ commit, getters, dispatch }, organizer) {
    const events = getters.getEventByOrganizer(organizer);
    if (events && events.length !== 0) {
      commit('SET_EVENTS', events);
    } else {
      await dispatch('fetchEvents');
      const filtered = getters.getEventByOrganizer(organizer);
      commit('SET_EVENTS', filtered);
    }
  },
  fetchEvent({ commit, getters }, id) {
    const event = getters.getEventById(id);
    if (event) {
      commit('SET_EVENT', event);
      return event;
    }
    return axios.getEventById(id)
      .then((response) => {
        commit('SET_EVENT', response.data);
        return response.data;
      }).catch((error) => {
        console.log('There was a problem with this request', error.response);
      });
  },
  fetchEvents({ commit }, { page }) {
    return axios.getEvents(state.perPage, page)
      .then((response) => {
        commit('SET_EVENTS', response.data);
        commit('SET_TOTAL_EVENT', response.headers['x-total-count']);
      }).catch((error) => {
        console.log('There was an error:', error.response);
      });
  },
};

export default actions;
