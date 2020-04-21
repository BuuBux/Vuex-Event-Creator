<template>
  <div class="field">
    <label :class="{ 'focused' : focused }" class="label-textarea">
      <span
        class="label-event-textarea"> {{title}} </span>
      <textarea
        @focusin="focused = true"
        class="event-textarea"
        v-bind="$attrs"
        v-model="description" />
    </label>
  </div>
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';

@Component({
  inheritAttrs: false,
})
export default class EventField extends Vue {
  @Prop(String) title: string;

  public description = '';

  public focused = false;

  @Watch('description')
  public updateValue(updateDescription: string) {
    this.$emit('input', updateDescription);
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/mixins';
  .label-textarea {
    @extend %label-width;
    &.focused {
      .label-event-textarea {
        transform: translate(5px, -14px);
        background: #fff;
        padding: 0 10px;
        color: $lightblue;
      }
      .event-textarea {
        border-color: $lightblue;
      }
    }
  }
  .label-event-textarea {
    top: 6px;
    @extend %input-textarea-label;
    transition:
      transform 0.2s ease-in,
      background 0.2s ease-in,
      padding 0.2s ease-in,
      color 0.2s ease-in;
  }
  .event-textarea {
    resize: none;
    @include input-textarea(220px);
  }
</style>
