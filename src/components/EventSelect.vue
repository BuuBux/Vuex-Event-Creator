<template>
  <div class="field">
    <label>
      {{title}}
      <select>
        <option
          :key="index"
          :value="option"
          v-for="(option, index) in options">
            {{option}}
        </option>
      </select>
    </label>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
  @Component
export default class EventField extends Vue {
    @Prop(String) type: string;

    @Prop(String) title: string;

    @Prop(Array) options: string[];

    @Prop(String) placeholder: string;
}
</script>

<style lang="scss" scoped></style>
