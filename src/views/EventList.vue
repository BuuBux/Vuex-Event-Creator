<template>
  <div class="event-list-view">
  <event-element
    :key="event.id"
    :event="event"
    v-for="event in events" />
    <event-list-navigation :page="page" />
    <add-event-button />
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import EventElement from '@/components/Event.vue';
import { Event } from '@/types/EventTyping';
import { State } from 'vuex-class';
import EventListNavigation from '@/components/EventListNavigation.vue';
import AddEventButton from '@/components/AddNewEvent.vue';
import store from '@/store';

const namespace = 'event';

const loadBeforeRouting = (to, next) => {
  const currentPage = parseInt(to.query.page, 10) || 1;
  store.dispatch('event/fetchEvents', { page: currentPage })
    .then(() => {
      // TODO remove no-param-reassign error
      // eslint-disable-next-line no-param-reassign
      to.params.page = currentPage;
      next();
    });
};

@Component({
  components: {
    EventElement,
    EventListNavigation,
    AddEventButton,
  },
})
export default class EventList extends Vue {
  @Prop(Number) page: number;

  @State('events', { namespace }) events: Event[];

  @State('eventTotal', { namespace }) eventsTotal: number;

  // TODO remove class-methods-use-this error
  // eslint-disable-next-line class-methods-use-this
  beforeRouteEnter(to, _, next) {
    loadBeforeRouting(to, next);
  }

  // TODO remove class-methods-use-this error
  // eslint-disable-next-line class-methods-use-this
  beforeRouteUpdate(to, _, next) {
    loadBeforeRouting(to, next);
  }
}
</script>

<style lang="scss" scoped>
</style>
