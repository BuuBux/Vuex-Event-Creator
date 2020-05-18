<template>
  <nav class="navigation-element" aria-label="Navigation">
    <template v-if="page !== 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1} }" rel="prev">
        <span class="navigation-btn back" v-html="icons.navigation.left" />
      </router-link>
    </template>
    <template v-if="eventTotal > this.page * 4">
      <router-link :to="{ name: 'event-list', query: { page: page + 1} }" rel="next">
        <span class="navigation-btn next" v-html="icons.navigation.right" />
      </router-link>
    </template>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import icons from '@/helpers/icons';
import { SvgIcons } from '@/types/IconsTyping';
import { State } from 'vuex-class';

const namespace = 'event';

@Component
export default class EventListNavigation extends Vue {
  @Prop(Number) page: number;

  @State('eventTotal', { namespace }) eventTotal: number;

  public icons: SvgIcons = icons;
}
</script>

<style lang="scss">
  @import '../styles/variables';

  .navigation-element {
    max-width: 285px;
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    .navigation-btn {
      max-width: 45px;
      width: 100%;
      display: block;
      line-height: 0;
      .svg-icon {
        width: 100%;
        path {
          fill: $flame;
        }
      }
    }
  }
</style>
