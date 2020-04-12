import AxiosService from '@/services/AxiosService';
import { AxiosResponse } from 'axios';
import { Event } from '@/types/EventTyping';

const axios = new AxiosService();

export default {
  namespaced: true,
  mutations: {
    SET_EVENTS(state, events: Event[]) {
      state.events = events;
    },
    SET_EVENT(state, event: Event) {
      state.event = event;
    },
    ADD_EVENT(state, event: Event) {
      state.event.push(event);
    },
  },
  actions: {
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
    async fetchEvents({ commit }) {
      try {
        const response: AxiosResponse = await axios.getEvents();
        commit('SET_EVENTS', response.data);
      } catch (error) {
        console.log('There was an error:', error.response);
      }
    },
  },
  getters: {
    getEventById: (state) => (id: number) => state.events.find(
      (event: Event) => event.id === id,
    ),
    getEventByOrganizer: (state) => (organizer: string) => state.events.filter(
      (event: Event) => event.organizer === organizer,
    ),
  },
  state: {
    events: [] as Event[],
    eventTotal: 0 as number,
    event: {} as Event,
  },
};
