<template>
  <div class="field">
    <label>
      {{title}}
      <textarea v-bind="$attrs" v-model="description" />
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

  @Watch('description')
    public updateValue(updateDescription: string) {
      this.$emit('input', updateDescription);
    }
}
</script>

<style lang="scss" scoped></style>
