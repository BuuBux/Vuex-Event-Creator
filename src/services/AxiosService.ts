import axios from 'axios';
import { Event } from '@/types/EventTyping';

export default class AxiosService {
  public requestUrl = 'http://localhost:3000/';

  getEvents(perPage: number, page: number) {
    return axios.get(`${this.requestUrl}events?_limit=${perPage}&_page=${page}`);
  }

  getEventById(id: number) {
    return axios.get(`${this.requestUrl}events/${id}`);
  }

  postEvent(event: Event) {
    return axios.post(`${this.requestUrl}events`, event);
  }
}
