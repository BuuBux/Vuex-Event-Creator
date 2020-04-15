<template>
  <div class="event-list-view">
  <event-element
    :key="event.id"
    :event="event"
    v-for="event in events" />
    <template v-if="page !== 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1} }" rel="prev">
        <span v-html="icons.navigation.left" />
      </router-link>
    </template>
    <template v-if="eventTotal > this.page * 4">
      <router-link :to="{ name: 'event-list', query: { page: page + 1} }" rel="next">
        <span v-html="icons.navigation.right" />
      </router-link>
    </template>
</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import EventElement from '@/components/Event.vue';
import { Event } from '@/types/EventTyping';
import { State, Action } from 'vuex-class';
import icons from '@/helpers/icons';
import { SvgIcons } from '@/types/IconsTyping';

const namespace = 'event';

@Component({
  components: {
    EventElement,
  },
})
export default class EventList extends Vue {
  @State('events', { namespace }) events: Event[];

  @State('eventTotal', { namespace }) eventTotal: number;

  @Action('fetchEvents', { namespace }) fetchEvents;

  public icons: SvgIcons = icons;

  public page = 1;

  public mounted() {
    this.page = parseInt((this.$route.query.page as string), 10) || 1;
    this.fetchEvents({ perPage: 4, page: this.page });
  }
}
</script>

<style lang="scss" scoped>
</style>
