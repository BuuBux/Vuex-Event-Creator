<template>
  <div class="field">
    <label>
      {{title}}
      <textarea
        :placeholder="placeholder"></textarea>
    </label>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
  @Component
export default class EventField extends Vue {
    @Prop(String) type: string;

    @Prop(String) title: string;

    @Prop(String) placeholder: string;
}
</script>

<style lang="scss" scoped></style>
