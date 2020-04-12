<template>
  <div class="event-list-view">
    <div class="restart-section">
      <h2> Events only organized by: {{organizer}} </h2>
      <button
        @click="navigationService.goBackToList()"
        class="reseting-button"> Pokaż wszystkie </button>
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
import { mapState } from 'vuex';
import NavigationService from '@/services/NavigationService';

  @Component({
    components: {
      EventElement,
    },
    computed: mapState({
      events: (state) => state.event.events,
    }),
  })
export default class EventList extends Vue {
  @Prop(String) organizer: string;

  public navigationService: NavigationService = new NavigationService();

  created() {
    this.$store.dispatch('event/filterEvents', this.organizer);
  }
}
</script>

<style lang="scss" scoped>
  .restart-section {
    max-width: 768px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
</style>
