<template>
  <section @click="navigationService.navigateToDetails(event.id)" class="event-element">
    <div class="category-image">
      <img
        class="event-image"
        :title="event.title"
        :alt="event.category"
        :src="require(`@/assets/${(event.category).toLowerCase()}.jpg`)" />
    </div>
    <div class="event-summary">
      <div class="event-header">
        <h3 class="event-title"> {{ event.title }} </h3>
        <span class="time"> {{ event.date }} @ {{ event.time }} </span>
      </div>
      <div class="about-event">
        <div class="left-side">
          <h5 class="about-title"> About event </h5>
          <p class="description"> {{ concatDescription(event.description) }} </p>
        </div>
        <div class="right-side">
          <h5 class="location-title"> Location </h5>
          <p class="location"> {{event.location}} </p>
        </div>
      </div>
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

  public slicePoint = 16;

  public concatDescription(description: string) {
    const lengthOfDescription = description.split(' ').length;
    if (lengthOfDescription > this.slicePoint) {
      return `${description.split(' ').slice(0, this.slicePoint).join(' ')} ...`;
    }
    return description;
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/mixins';
  @import '../styles/variables';
  .event-element {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    max-width: 768px;
    margin: 0 auto 35px auto;
    background-color: #ffffff;
    @extend %card-shadow-radius;
    &:hover {
      cursor: pointer;
    }
    .category-image, .event-summary {
      width: 100%;
    }
    .event-summary {
      position: relative;
      flex: 0 0 65%;
      max-width: 65%;
      padding: 15px;
      text-align: left;
      .event-header {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
        span.time, h3.event-title {
          width: 100%;
        }
        h3.event-title {
          flex: 0 0 100%;
          max-width: 100%;
          color: $flame;
          margin: 0 0 10px 0;
        }
        span.time {
          clip-path: polygon(0 0, 100% 0, 95% 50%, 100% 100%, 0 100%, 5% 50%);
          position: absolute;
          color: $smoke;
          padding: 7.5px 15px;
          text-align: center;
          max-width: 175px;
          width: 100%;
          top: -15px;
          right: 15px;
          background: $flame;
          font: 400 12px/1.25 'Ubuntu', sans-serif;
        }
      }
    }
    .category-image {
      flex: 0 0 35%;
      max-width: 35%;
      border-top-left-radius: 12px;
      border-bottom-left-radius: 12px;
      overflow: hidden;
    }
  }
  .about-event {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .left-side, .right-side { width: 100%; }
    .left-side {
      max-width: 65%;
      flex: 0 0 65%;
    }
    .right-side {
      max-width: 35%;
      flex: 0 0 35%;
      .location {
        font: 400 14px/1.25 'Ubuntu', sans-serif;
      }
    }
    h5.about-title, h5.location-title {
      font: 700 18px/1.25 'Ubuntu', sans-serif;
      margin: 0 0 10px 0;
    }
  }
  .event-image {
    max-width: 100%;
    width: auto;
    display: block;
  }
</style>
