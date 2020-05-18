export interface Event {
  id?: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  organizer: string;
  category: string;
  attendees: Attendees[];
}

export interface Attendees {
  id: string;
  name: string;
}
