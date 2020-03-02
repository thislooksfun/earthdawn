<template>
  <div class="val-label-group" :class="{ centered }">
    <span class="label">{{ label }}</span>
    <div class="value">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    centered: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.val-label-group {
  position: relative;

  &.centered {
    text-align: center;
  }

  .label {
    position: relative;
    display: block;
    margin: -0.25rem 0 -0.5rem 0;
    color: var(--text-secondary);
    font-size: 0.85rem;
  }
  .value {
    display: block;
    margin-bottom: -0.5rem;
    font-size: 2rem;
  }
}
</style>
