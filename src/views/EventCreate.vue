<template>
  <div class="event-create-view">

  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Event } from '@/types/EventTyping';

@Component
export default class EventCreate extends Vue {
  event: Event = {
    id: 0,
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
    const { user } = this.$store.state;
    const id = Math.floor(Math.random() * 10000);

    return {
      id,
      title: '',
      date: '',
      time: '',
      location: '',
      organizer: user,
      category: '',
      description: '',
      attendees: [],
    };
  }

  createEvent() {
    this.$store.dispatch('createEvent', this.event).then(() => {
      this.$router.push({ name: 'event-details', params: { id: (this.event.id).toString() } });
      this.event = this.createFreshEventObject();
    }).catch(() => {
      console.log('There was problem with creating your event');
    });
  }
}
</script>

<style lang="scss" scoped>
</style>