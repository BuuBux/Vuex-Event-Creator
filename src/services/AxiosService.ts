import axios from 'axios';

export default class AxiosService {
  public requestUrl: string = 'http://localhost:3000/';
  getEvents() {
    return axios.get(`${this.requestUrl}events`)
  }
  getEventById(id: number) {
    return axios.get(`${this.requestUrl}events/${id}`);
  }
}

