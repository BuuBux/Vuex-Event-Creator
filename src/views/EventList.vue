<template>
  <div class="event-list-view">
  <event-element
    :key="event.id"
    :event="event"
    v-for="event in events" />
</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import EventElement from '@/components/Event.vue';
import { mapState } from 'vuex';

@Component({
  components: {
    EventElement,
  },
  computed: mapState({
    events: (state) => state.event.events,
  }),
})
export default class EventList extends Vue {
  created() {
    this.$store.dispatch('event/fetchEvents');
  }
}
</script>

<style lang="scss" scoped>
</style>
