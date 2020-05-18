import { Event } from '@/types/EventTyping';
import { User } from '@/types/UserTyping';

export interface State {
  event: EventState;
  user: UserState;
}

export interface RootState {
  categories: string[];
}

export interface EventState {
  events: Event[];
  eventTotal: number;
  event: Event;
  perPage: number;
}

export interface UserState {
  user: User;
  registeredUsers: User[];
}
