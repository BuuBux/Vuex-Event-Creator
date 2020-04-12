<template>
  <div class="event-details-view">
    <h2 class="event-detail-title"> {{ event.title }} </h2>
    <div class="event-time-and-place">
      <p> Event: <strong> {{ event.date }} @ {{ event.time }} </strong> </p>
      <p> Location:
        <strong>
          <a
            title="Find out where it is"
            target="_blank"
            :href="`https://www.google.com/search?q=${event.location}`">
            {{ event.location }}
          </a>
        </strong>
      </p>
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
        <template v-for="(attende, index) in event.attendees">
          <span :key="index">
            {{(index + 1 !== (event.attendees).length ? `${attende.name}, ` : `${attende.name}`)}}
          </span>
        </template>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapState } from 'vuex';
import NavigationService from '@/services/NavigationService';

@Component({
  computed: mapState({
    event: (state) => state.event.event,
  }),
})
export default class EventDetails extends Vue {
  @Prop(String) id: string;

  public navigationService: NavigationService = new NavigationService();

  created() {
    this.$store.dispatch('event/fetchEvent', this.id);
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
    box-shadow: $shadow;
  }
  .event-detail-title {
    font: 700 48px/1.5 'Ubuntu', sans-serif;
    padding: 0 0 35px 0;
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
</style>