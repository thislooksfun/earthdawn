<template>
  <div class="talent">
    <value-label-group class="name" label="Name" :value="talent.name" />
    <value-label-group class="action" label="Action" :value="talent.action" />
    <value-label-group
      class="strain"
      centered
      label="Strain"
      :value="talent.strain"
    />
    <value-label-group
      class="rank"
      centered
      label="Rank"
      :value="talent.rank"
    />
    <step-item
      size="medium"
      class="step"
      label="Step"
      :step="talent.step"
      :ttrows="[`Attribute: ${talent.attr}`]"
    />
  </div>
</template>

<script>
import StepItem from "../../helper/StepItem";

export default {
  props: {
    talent: { type: Object, required: true },
  },
  components: {
    StepItem,
  },
};
</script>

<style scoped lang="scss">
.talent {
  display: grid;
  grid-template-columns: auto 7rem repeat(3, 3rem);
  grid-template-rows: auto;
  grid-template-areas: "name action strain rank step";
  grid-gap: 1rem;

  @each $area in name, action, strain, rank, step {
    .#{$area} {
      grid-area: $area;
    }
  }
}
</style>
