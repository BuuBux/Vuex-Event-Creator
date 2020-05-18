import { GetterTree } from 'vuex';
import { EventState, RootState } from '@/types/StateTyping';
import { Event } from '@/types/EventTyping';

const getters: GetterTree<EventState, RootState> = {
  getEventById: (state: EventState) => (id: number) => state.events.find(
    (event: Event) => event.id === id,
  ),
  getEventByOrganizer: (state: EventState) => (organizer: string) => state.events.filter(
    (event: Event) => event.organizer === organizer,
  ),
};

export default getters;
