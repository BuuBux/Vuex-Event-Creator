<template>
  <router-link class="simple-routing-button" to="/create" v-html="icon.add" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Icons from '@/helpers/icons';
import { SvgIcons } from '@/types/IconsTyping';

@Component
export default class AddEventButton extends Vue {
  public icon: SvgIcons = Icons;
}
</script>

<style lang="scss">
  @import '../styles/variables';
  .simple-routing-button {
    position: fixed;
    right: 55px;
    bottom: 55px;
    max-width: 65px;
    width: 100%;
    display: inline-block;
    line-height: 0;
    border-radius: 50%;
    background: #fff;
    box-shadow: 2px 2px 8px 3px rgba(0, 0, 0, 0.12);
    transition: transform 0.15s ease-in, background-color 0.15s ease-in;
    &:hover {
      transform: scale(1.15);
      background-color: $marigold;
      .svg-icon {
        path {
          fill: #fff;
        }
      }
    }
    .svg-icon {
      path {
        transition: fill 0.15s ease-in-out;
        fill: $marigold;
      }
    }
  }
</style>
