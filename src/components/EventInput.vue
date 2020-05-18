<template>
  <div class="field">
    <label :class="{ 'focused' : focused }" class="input-label">
      <span class="label-event-input"> {{title}} </span>
      <input
        @focusin="focused = true"
        v-bind="$attrs"
        v-on="$listeners"
        class="event-input"
        v-model="inputValue" />
    </label>
  </div>
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
export default class EventInput extends Vue {
  @Prop(String) title: string;

  public inputValue = '';

  public focused = false;

  @Watch('inputValue')
  public updateValue(updateInputValue: string) {
    this.$emit('input', updateInputValue);
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/mixins';
  .input-label {
    @extend %label-width;
    &.focused {
      .label-event-input {
        transform: translate(5px, -24px);
        background: #fff;
        padding: 0 10px;
        color: $lightblue;
      }
      .event-input {
        border-color: $lightblue;
      }
    }
  }
  .label-event-input {
    top: 50%;
    transform: translateY(-50%);
    transition:
      transform 0.2s ease-in,
      background 0.2s ease-in,
      padding 0.2s ease-in,
      color 0.2s ease-in;
    @extend %input-textarea-label;
  }
  .event-input {
    @include input-textarea(34px);
  }
</style>
