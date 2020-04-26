<template>
  <div
    class="val-label-group"
    :class="{ center, outline }"
    :title="ttrows.length > 0 ? ttrows.join('<br />') : undefined"
    v-b-tooltip.html
  >
    <div class="label">
      <span>{{ label }}</span>
    </div>
    <div class="value" :class="sizeClass">
      <slot>{{ value }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    value: { type: [String, Number], default: "" },
    centered: { type: Boolean, default: null },
    outlined: { type: Boolean, default: null },
    size: { type: String, default: null },
    ttrows: { type: Array, default: () => [] },
  },
  computed: {
    valIsNum() {
      return typeof this.value === "number";
    },
    center() {
      return this.centered != null ? this.centered : this.valIsNum;
    },
    outline() {
      return this.outlined;
    },
    sizeClass() {
      return `size-${
        this.size != null ? this.size : this.valIsNum ? "large" : "medium"
      }`;
    },
  },
};
</script>

<style scoped lang="scss">
.val-label-group {
  position: relative;

  &.center {
    text-align: center;
  }
  &.outline {
    border: 0.1rem dashed var(--table-primary);
    margin-bottom: 0.1rem;

    & > .label {
      top: -0.5rem;
      left: 0.25rem;
      & > span {
        background-color: var(--background-primary);
        padding: 0 0.1rem;
      }
    }

    & > .value {
      margin-bottom: 0.5rem;
    }
  }

  & > .label {
    position: relative;
    display: block;
    margin: -0.25rem 0 -0.5rem 0;
    color: var(--text-secondary);
    font-size: 0.85rem;
  }
  & > .value {
    display: block;
    margin-bottom: -0.5rem;

    &.size-large {
      font-size: 2rem;
    }
    &.size-medium {
      font-size: 1.75rem;
    }
    &.size-small {
      font-size: 1.5rem;
    }
  }
}
</style>
