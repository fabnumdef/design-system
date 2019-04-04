<template>
  <button
    v-on="$listeners"
    v-bind="$attrs"
    :class="classes"
    class="button"
  >
    <slot />
  </button>
</template>

<script>
import genericModifiers, {
  COLORS, GRAYSCALE, STATES, TEXT,
} from '../../mixins/generic-modifiers';
import sizeModifiers from '../../mixins/size-modifiers';

export const FULLWIDTH = 'fullwidth';
export const OUTLINED = 'outlined';
export const INVERTED = 'inverted';
export const MODIFIERS = [...COLORS, ...GRAYSCALE, ...STATES, TEXT, FULLWIDTH, OUTLINED, INVERTED];

export default {
  mixins: [
    genericModifiers('modifiers', ...MODIFIERS, FULLWIDTH, OUTLINED, INVERTED),
    sizeModifiers('sizes'),
  ],
  computed: {
    classes() {
      return Object.assign(
        {},
        this.modifiers,
        this.sizes,
      );
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../../scss/head";
  $button-color: $primary;

  @import "~bulma/sass/elements/button.sass";
</style>
