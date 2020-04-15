<template>
  <div class="field">
    <label>
      {{title}}
      <select v-model="inputValue">
        <option :key="index" v-for="(option, index) in options">
            {{option}}
        </option>
      </select>
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
export default class EventField extends Vue {
    @Prop(Array) options: string[];

    @Prop(String) title: string;

    public inputValue = '';

    @Watch('inputValue')
    public updateValue(updateSelectValue: string) {
      this.$emit('input', updateSelectValue);
    }
}
</script>

<style lang="scss" scoped></style>
