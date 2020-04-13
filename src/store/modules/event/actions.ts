import { ActionTree } from 'vuex';
import { Event } from '@/types/EventTyping';
import { AxiosResponse } from 'axios';
import { EventState, RootState } from '@/types/StateTyping';
import AxiosService from '@/services/AxiosService';

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
  async fetchEvent({ commit, getters }, id) {
    const event = getters.getEventById(id);
    if (event) {
      commit('SET_EVENT', event);
    } else {
      try {
        const response: AxiosResponse = await axios.getEventById(id);
        commit('SET_EVENT', response.data);
      } catch (error) {
        console.log('There was a problem with this request', error.response);
      }
    }
  },
  async fetchEvents({ commit }, { perPage, page }) {
    try {
      const response: AxiosResponse = await axios.getEvents(perPage, page);
      commit('SET_EVENTS', response.data);
      commit('SET_TOTAL_EVENT', response.headers['x-total-count']);
    } catch (error) {
      console.log('There was an error:', error.response);
    }
  },
};

export default actions;
