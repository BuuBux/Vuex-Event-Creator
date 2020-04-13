import { EventState } from '@/types/StateTyping';

const state: EventState = {
  events: [],
  eventTotal: 0,
  event: {
    id: 0,
    date: '',
    description: '',
    attendees: [],
    title: '',
    time: '',
    category: '',
    organizer: '',
    location: '',
  },
};

export default state;
