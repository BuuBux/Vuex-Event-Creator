<template>
  <div class="event-details-view">
    <transition-group tag="h2" class="event-detail-title" name="zoom">
      <span :key="`${letter-index}`" v-for="(letter, index) in poppingTitle">{{letter}}</span>
    </transition-group>
    <div class="event-time-and-place">
      <p> Event: <strong> {{ event.date }} @ {{ event.time }} </strong> </p>
      <p> Location: <strong> {{ event.location }} </strong> </p>
    </div>
    <p class="event-category">Category: <strong>{{ event.category }}</strong></p>
    <p
      @click="navigationService.showOnlyOrganizerEvents(event.organizer)"
      class="organizer"> Organized by: <strong>{{ event.organizer }}</strong></p>
    <div class="event-description">
      <h4 class="title-header"> Description </h4>
      <p class="description"> {{event.description}} </p>
    </div>
    <div class="event-attendees">
      <h4 class="title-header"> Attendees </h4>
      <p>
        <template v-for="(attendee, index) in event.attendees">
          <span :key="index">
            {{(index + 1 !== (event.attendees).length ? `${attendee.name}, ` : `${attendee.name}`)}}
          </span>
        </template>
      </p>
    </div>
    <div class="buttons-wrapper">
      <button
        @click="navigationService.goBackToList()"
        class="event-button"> Show all events </button>
      <button
        @click="navigationService.newEvent()"
        class="event-button"> Create new event </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import NavigationService from '@/services/NavigationService';
import { Event } from '@/types/EventTyping';

@Component
export default class EventDetails extends Vue {
  @Prop(String) id: string;

  @Prop({ required: true }) event: Event;

  public navigationService: NavigationService = new NavigationService();

  public poppingTitle: string[] = [];

  public poppingLettersToTitle() {
    const titleArray = (this.event.title).split('');
    titleArray.map((letter, i) => setTimeout(() => {
      this.poppingTitle.push(letter);
    }, 50 * i));
  }

  public mounted() {
    this.poppingLettersToTitle();
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/mixins';
  @import '../styles/variables';
  @keyframes rollup {
    from { width: 0 }
    to { width: 100% }
  }
  p { margin: 0 0 10px 0 }
  .title-header {
    margin: 10px 0 25px 0;
  }
  .event-details-view {
    text-align: left;
    display: flex;
    background: #fff;
    flex-direction: column;
    margin: 0 auto;
    padding: 35px;
    max-width: 768px;
    width: 100%;
    @extend %card-shadow-radius;
  }
  .event-detail-title {
    font: 700 48px/1.5 'Ubuntu', sans-serif;
    padding: 0 0 35px 0;
    span {
      min-width: 11.5px;
      &.zoom-enter-active {
        display: inline-block;
      }
    }
    &:after {
      content: '';
      display: block;
      max-width: 225px;
      height: 4px;
      margin: 15px 0 0 0;
      background: $flame;
      animation: rollup 2s 1;
    }
  }
  .buttons-wrapper {
    display: flex;
    justify-content: space-between;
    max-width: 768px;
    width: 100%;
    margin: 25px auto 0 auto;
    .event-button {
      @extend %button-events;
    }
  }
  .organizer {
    strong {
      transition: color 0.25s ease-in-out;
      &:hover {
        cursor: pointer;
        color: $flame;
      }
    }
  }
  .zoom-enter {
    opacity: 0;
    transform: translateY(75px) scale(3);
    width: 0;
  }
  .zoom-enter-active{
    transition: all .65s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
</style>
