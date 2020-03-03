<template>
  <div
    class="val-label-group"
    :class="{ centered, outlined }"
    :title="ttrows.length > 0 ? ttrows.join('<br />') : undefined"
    v-b-tooltip.html
  >
    <div class="label">
      <span>{{ label }}</span>
    </div>
    <div class="value" :class="`size-${size}`">
      <slot>{{ value }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    value: { type: String, default: "" },
    centered: { type: Boolean, default: false },
    outlined: { type: Boolean, default: false },
    size: { type: String, default: "medium" },
    ttrows: { type: Array, default: () => [] },
  },
};
</script>

<style scoped lang="scss">
.val-label-group {
  position: relative;

  &.centered {
    text-align: center;
  }
  &.outlined {
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
