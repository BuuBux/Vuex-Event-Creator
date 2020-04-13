<template>
  <div class="event-list-view">
  <event-element
    :key="event.id"
    :event="event"
    v-for="event in events" />
    <template v-if="page !== 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1} }" rel="prev">
        Prev page
      </router-link>
    </template>
    <template v-if="eventsTotal > this.page * 4">
      <router-link :to="{ name: 'event-list', query: { page: page + 1} }" rel="next">
        Next page
      </router-link>
    </template>
</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import EventElement from '@/components/Event.vue';
import { Event } from '@/types/EventTyping';
import { State, Action } from 'vuex-class';

const namespace = 'event';

@Component({
  components: {
    EventElement,
  },
})
export default class EventList extends Vue {
  @State('events', { namespace }) events: Event[];

  @State('eventsTotal', { namespace }) eventsTotal: number;

  @Action('fetchEvents', { namespace }) fetchEvents;

  public page = 1;

  public mounted() {
    this.page = parseInt((this.$route.query.page as string), 10) || 1;
    this.fetchEvents(4, this.page);
    console.log(this.events);
  }
}
</script>

<style lang="scss" scoped>
</style>
