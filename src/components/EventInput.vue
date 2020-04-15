<template>
  <div class="field">
    <label>
      {{title}}
      <input
        v-bind="$attrs"
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
  @Prop(String) type: string;

  @Prop(String) title: string;

  @Prop(String) placeholder: string;

  public inputValue = '';

  @Watch('inputValue')
  public updateValue(updateInputValue: string) {
    this.$emit('input', updateInputValue);
  }
}
</script>

<style lang="scss" scoped></style>
