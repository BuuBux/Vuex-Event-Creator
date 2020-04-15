<template>
  <div class="event-create-view">
    <h2>Set up your event</h2>
    <h3> About event </h3>
    <event-input
      v-model="event.title"
      title="Event title"
      type="text"
      placeholder="Enter your event name" />
    <event-textarea
      v-model="event.description"
      title="Event description"
      placeholder="Say something about this event" />
    <h3> Event location & time</h3>
    <event-input
      v-model="event.location"
      title="Event location"
      type="text"
      placeholder="Daytona Beach" />
    <date-picker
      v-model="event.date" />
    <event-select
      title="Event time"
      v-model="event.time"
      :options="times" />
    <h3> How would you categorize you event </h3>
    <event-select
      title="Event category"
      v-model="event.category"
      :options="categories" />
    <h3> Make your event event bigger with friends </h3>
    <event-attendees
      v-model="event.attendees"
      title="Add users to event"/>
    <button
      @click="createNewEvent"
      class="add-new-event-btn"> Add new event </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Event } from '@/types/EventTyping';
import { Action, State } from 'vuex-class';
import DatePicker from 'vue2-datepicker';
import EventInput from '@/components/EventInput.vue';
import EventTextarea from '@/components/EventTextarea.vue';
import EventSelect from '@/components/EventSelect.vue';
import { User } from '@/types/UserTyping';
import EventAttendees from '@/components/EventAttendees.vue';

const namespace = {
  event: 'event',
  user: 'user',
};

@Component({
  components: {
    EventAttendees,
    EventInput,
    EventTextarea,
    EventSelect,
    DatePicker,
  },
})
export default class EventCreate extends Vue {
  @Action('createEvent', { namespace: namespace.event }) createEvent;

  @State('user', { namespace: namespace.user }) user: User;

  @State('categories') categories: string[];

  public times: string[] = [];

  public event: Event = {
    title: '',
    date: '',
    time: '',
    location: '',
    organizer: '',
    category: '',
    description: '',
    attendees: [],
  };

  createFreshEventObject() {
    console.log(this);
    return {
      title: '',
      date: '',
      time: '',
      location: '',
      organizer: '',
      category: '',
      description: '',
      attendees: [],
    };
  }

  createNewEvent() {
    this.createEvent(this.event)
      .then(() => {
        // this.$router.push({ name: 'event-details', params: { id: (this.event.id).toString() } });
        // this.event = this.createFreshEventObject();
      }).catch(() => {
        console.log('There was problem with creating your event');
      });
  }

  mounted() {
    this.event.organizer = this.user.name;
    for (let i = 0; i < 24; i += 1) {
      // TODO Find a way to use shorthand if statment with no-unused-expressions turn on
      if (i < 10) {
        this.times.push(`0${i}:00`);
      } else {
        this.times.push(`${i}:00`);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~vue2-datepicker/index.css';
  @import '../styles/mixins';
  .event-create-view {
    max-width: 768px;
    width: 100%;
    margin: 0 auto;
    @extend %card-shadow-radius;
    background: #fff;
    padding: 35px;
  }
  .add-new-event-btn {
    margin-top: 35px;
    @extend %button-events;
  }
</style>
