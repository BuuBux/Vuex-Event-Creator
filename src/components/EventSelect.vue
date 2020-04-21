<template>
  <label :class="size" class="label-time">
    <select class="event-time" v-model="inputValue">
      <option :value="option" :key="index" v-for="(option, index) in options">
        {{option}}
      </option>
    </select>
  </label>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Watch,
} from 'vue-property-decorator';
  @Component({
    inheritAttrs: false,
  })
export default class EventField extends Vue {
    @Prop(Array) options: string[];

    @Prop(String) title: string;

    @Prop(String) size: string;

    public inputValue = '00:00';

    @Watch('inputValue')
    public updateValue(updateSelectValue: string) {
      this.$emit('input', updateSelectValue);
    }
}
</script>

<style lang="scss" scoped>
  @import '../styles/mixins';
  .label-time {
    width: 100%;
    &.small {
      max-width: 165px;
    }
    &.full {
      max-width: 385px;
      display: inline-block;
      margin: 0 auto 25px 0;
    }
  }
  .event-time {
    @include input-textarea(34px);
  }
</style>
