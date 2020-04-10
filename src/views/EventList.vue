<template>
  <div class="event-list-view">
    <event-element :key="event.id" v-for="event in events" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import EventElement from '@/components/Event.vue';

@Component({
  components: {
    EventElement,
  },
})
export default class EventList extends Vue {}
</script>

<style lang="scss" scoped>
</style>
