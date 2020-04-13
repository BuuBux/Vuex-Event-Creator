<template>
  <div class="event-list-view">
    <div class="restart-header">
      <div class="who-organized">
        <h2> Events only organized by: <span>{{organizer}}</span> </h2>
      </div>
      <div class="restart-button">
        <button
          @click="navigationService.goBackToList()"
          class="restarting-button"> Show all events </button>
      </div>
    </div>
    <event-element
      :key="event.id"
      :event="event"
      v-for="event in events" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import EventElement from '@/components/Event.vue';
import NavigationService from '@/services/NavigationService';
import { Action, State } from 'vuex-class';

const namespace = 'event';

  @Component({
    components: {
      EventElement,
    },
  })
export default class EventList extends Vue {
  @State('events', { namespace }) events: Event[];

  @Action('filterEvents', { namespace }) filterEvents;

  @Prop(String) organizer: string;

  public navigationService: NavigationService = new NavigationService();

  created() {
    this.filterEvents(this.organizer);
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/variables';
  @import '../styles/mixins';
  .restart-header {
    max-width: 768px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 auto 35px auto;
    align-items: center;
    .who-organized,
    .restart-button {
      width: 100%;
    }
    .who-organized {
      flex: 0 0 70%;
      max-width: 70%;
      h2 {
        font: 400 24px/1.5 'Ubuntu', sans-serif;
        span {
          color: $flame;
          font-weight: 700;
        }
      }
    }
    .restart-button {
      flex: 0 0 30%;
      max-width: 30%;
      .restarting-button {
        @extend %button-events;
      }
    }
  }
</style>
