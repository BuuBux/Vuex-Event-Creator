<template>
  <section @click="navigationService.navigateToDetails(event.id)" class="event-element">
    <div class="category-image">
      <img
        class="event-image"
        :title="event.title"
        :alt="event.category"
        :src="require(`@/assets/${event.category}.jpg`)" />
    </div>
    <div class="event-summary">
      <h3> {{ event.title }} </h3>
      <span class="time"> {{ event.date }} @ {{ event.time }} </span>
      <h5> {{ event.location }} </h5>
      <p class="description"> {{ event.description }} </p>
      <span class="attendees"> Attendees: {{ (event.attendees).length }}</span>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Event } from '@/types/EventTyping';
import NavigationService from '@/services/NavigationService';

@Component
export default class EventElement extends Vue {
  @Prop(Object) event: Event;

  public navigationService: NavigationService = new NavigationService();
}
</script>

<style lang="scss" scoped>
  @import '../styles/mixins';
  .event-element {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    max-width: 768px;
    margin: 0 auto 35px auto;
    background-color: #ffffff;
    box-shadow: $shadow;
    &:hover {
      cursor: pointer;
    }
    .category-image, .event-summary {
      width: 100%;
    }
    .event-summary {
      flex: 0 0 65%;
      max-width: 65%;
    }
    .category-image {
      flex: 0 0 35%;
      max-width: 35%;
    }
  }
  .event-image {
    max-width: 100%;
    width: auto;
    display: block;
  }
</style>
