import axios from 'axios';
import { Event } from '@/types/EventTyping';

export default class AxiosService {
  public requestUrl = 'http://localhost:3000/';

  getEvents() {
    return axios.get(`${this.requestUrl}events`);
  }

  getEventById(id: number) {
    return axios.get(`${this.requestUrl}events/${id}`);
  }

  postEvent(event: Event) {
    return axios.post(`${this.requestUrl}events`, event);
  }
}
