<template>
  <div class="skill">
    <value-label-group class="name" label="Name" :ttrows="[skill.name]">
      <div class="name-container">{{ skill.name }}</div>
    </value-label-group>
    <value-label-group class="action" label="Action" :value="skill.action" />
    <value-label-group
      class="strain"
      centered
      label="Strain"
      :value="skill.strain"
    />
    <value-label-group class="rank" centered label="Rank" :value="skill.rank" />
    <step-item
      size="medium"
      class="step"
      label="Step"
      :step="skill.step"
      :ttrows="[`Attribute: ${skill.attr}`]"
    />
  </div>
</template>

<script>
import StepItem from "../../helper/StepItem";

export default {
  props: {
    skill: { type: Object, required: true },
  },
  components: {
    StepItem,
  },
};
</script>

<style scoped lang="scss">
.skill {
  display: grid;
  grid-template-columns: minmax(0, 100%) 7rem repeat(3, 3rem);
  grid-template-rows: auto;
  grid-template-areas: "name action strain rank step";
  grid-gap: 1rem;

  @each $area in name, action, strain, rank, step {
    .#{$area} {
      grid-area: $area;
    }
  }

  .name-container {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
