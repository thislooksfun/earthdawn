// HealthBar based on BaseProgress from Argon

<template>
  <div class="health-wrapper">
    <div
      class="health"
      v-b-tooltip.hover.down
      :title="`${damage} damage taken`"
    >
      <!-- TODO: Add aria? -->

      <div class="text-underlay">
        <!-- If the character is still alive-->
        <div
          v-if="alive"
          class="health-bar"
          :style="`width: ${maxUntilDeadWidth};`"
        >
          <span v-if="unconscious" class="hp-info"
            >{{ hitpointsUntilDead }} hp until dead</span
          >
        </div>

        <!-- If the character is conscious -->
        <div
          v-if="conscious"
          class="health-bar until-unconscious"
          :style="`width: ${maxUntilUnconsciousWidth};`"
        >
          <span class="hp-info"
            >{{ hitpointsUntilUnconscious }} hp until unconscious</span
          >
        </div>
      </div>

      <div class="bars">
        <!-- If the health info is invalid -->
        <div
          v-if="disabled || invalid"
          class="health-bar invalid health-invalid striped"
          style="width: 100%;"
        />

        <!-- If the character is dead -->
        <div
          v-if="!disabled && valid && dead"
          class="health-bar dead health-critical striped animated"
          style="width: 100%;"
        >
          <span>YOU DIED</span>
        </div>

        <!-- If the character is still alive-->
        <div
          v-if="!disabled && valid && alive"
          class="health-bar until-dead health-critical striped"
          :class="{ animated: damage >= unconsciousness }"
          :style="`width: ${untilDeadWidth};`"
        >
          <span v-if="unconscious" class="hp-info"
            >{{ hitpointsUntilDead }} hp until dead</span
          >
        </div>

        <!-- If the character is conscious -->
        <div
          v-if="!disabled && valid && conscious"
          class="health-bar until-unconscious"
          :class="computedClassesUntilUnconscious"
          :style="`width: ${untilUnconsciousWidth};`"
        >
          <span class="hp-info"
            >{{ hitpointsUntilUnconscious }} hp until unconscious</span
          >
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="progress-wrapper">
    <div :class="`progress-${type}`">
      <div class="progress-percentage">
        <slot>
          <span>{{ unconsciousness - damage }} hitpoints until unconscious</span>
          <br />
          <span>{{ death - damage }} hitpoints until dead</span>
          <br />
        </slot>
      </div>
    </div>
    <div class="progress" style="height: 3rem">
      <div
        class="progress-bar"
        :class="computedClassesDeath"
        role="progressbar"
        :aria-valuenow="fillPercent"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="`width: ${fillPercent}%;`"
      >
        <span>{{ death - damage }} hitpoints until dead</span>
      </div>
      
      <div
        class="progress-bar unconcious"
        :class="computedClassesUnconscious"
        role="progressbar"
        :aria-valuenow="unconsciousPercent"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="`position: absolute; height:auto; width: ${unconsciousPercent}%;`"
      >
        <span>{{ unconsciousness - damage }} hitpoints until unconscious</span>
      </div>
    </div>
  </div>-->
</template>

<script>
export default {
  name: "HealthBar",
  props: {
    striped: {
      type: Boolean,
      description: "Whether health is striped",
    },
    animated: {
      type: Boolean,
      description:
        "Whether health is animated (works only with `striped` prop together)",
    },
    height: {
      type: Number,
      default: 20,
      description: "Health line height",
    },
    unconsciousness: {
      type: Number,
      default: 0,
      description: "Unconsciousness threshold",
    },
    death: {
      type: Number,
      default: 0,
      description: "Death threshold",
    },
    damage: {
      type: Number,
      default: 0,
      description: "Amount of damage previously taken",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // Earthdawn keeps track of how much damage you've taken, not how many
    // hitpoints you have remaining. These helpers simply convert from damage
    // into relevant hitpoints
    hitpointsUntilDead() {
      return this.death - this.damage;
    },
    hitpointsUntilUnconscious() {
      return this.unconsciousness - this.damage;
    },
    maxHitpointsUntilDead() {
      // The max hitpoints you can have is when you have taken 0 damage. Thus,
      // calculating how many hitpoints until dead when you have 0 damage is
      // this.death - 0 = this.death
      return this.death;
    },
    maxHitpointsUntilUnconscious() {
      // The max hitpoints you can have is when you have taken 0 damage. Thus,
      // calculating how many hitpoints until unconscious when you have 0 damage
      // is this.unconsciousness - 0 = this.unconsciousness
      return this.unconsciousness;
    },

    // State helpers
    valid() {
      return (
        this.death > 0 &&
        this.unconsciousness > 0 &&
        this.death > this.unconsciousness &&
        this.damage >= 0
      );
    },
    invalid() {
      return !this.valid;
    },
    dead() {
      return this.hitpointsUntilDead <= 0;
    },
    alive() {
      return !this.dead;
    },
    unconscious() {
      return this.hitpointsUntilUnconscious <= 0;
    },
    conscious() {
      return !this.unconscious;
    },

    // Widths
    untilDeadWidth() {
      const deathDiff = this.death - this.unconsciousness;
      const hp = Math.min(this.hitpointsUntilDead, deathDiff);
      return `${(hp / this.death) * 100}%`;
    },
    untilUnconsciousWidth() {
      // Divide by death, not unconsciousness, to scale this along the whole
      // width
      return `${(this.hitpointsUntilUnconscious / this.death) * 100}%`;
    },
    maxUntilDeadWidth() {
      const deathDiff = this.death - this.unconsciousness;
      return `${(deathDiff / this.death) * 100}%`;
    },
    maxUntilUnconsciousWidth() {
      return `${(this.maxHitpointsUntilUnconscious / this.death) * 100}%`;
    },

    // Percentages
    percentUntilDead() {
      return (this.hitpointsUntilDead / this.death) * 100;
    },
    percentUntilUnconscious() {
      return (this.hitpointsUntilUnconscious / this.unconsciousness) * 100;
    },

    //
    computedClassesUntilUnconscious() {
      const third = this.unconsciousness / 3;
      return this.damage < third
        ? "health-ok" // green
        : this.damage < 2 * third
        ? "health-hurt" // yellow
        : "health-critical"; //red
    },
  },
};
</script>

<style scoped lang="scss">
$argon-green: #2dce89;
$argon-orange: #fb6340;
$argon-red: #f5365c;

$healthbar-height: 3rem;
$progress-height: 1rem;
$health-bar-animation-timing: 1s linear infinite !default;
@mixin gradient-striped($color: rgba($white, 0.15), $angle: 45deg) {
  background-image: linear-gradient(
    $angle,
    $color 25%,
    transparent 25%,
    transparent 50%,
    $color 50%,
    $color 75%,
    transparent 75%,
    transparent
  );
}
@keyframes health-bar-stripes {
  from {
    background-position: 0 0;
  }
  to {
    background-position: $progress-height 0;
  }
}

.health-invalid {
  background-color: #333;
}
.health-ok {
  background-color: $argon-green;
}
.health-hurt {
  background-color: $argon-orange;
}
.health-critical {
  background-color: $argon-red;
}

.health {
  position: relative;
  width: 100%;
  height: $healthbar-height;
  background-color: rgba(0, 0, 0, 0.15);

  border-radius: 0.5rem;

  overflow: hidden;

  .text-underlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .health-bar {
      overflow: visible;

      .hp-info {
        color: var(--text-primary);
      }
    }
  }

  .health-bar {
    display: inline-block;
    position: relative;
    top: 0;

    height: $healthbar-height;
    font-size: 1rem;

    box-sizing: border-box;
    vertical-align: top;
    overflow: hidden;
    color: var(--color-light-1);

    &.health-ok {
      color: var(--color-light-1);
    }

    .hp-info {
      display: inline-block;
      font-size: 1.5rem;
      white-space: nowrap;
      line-height: $healthbar-height;
      padding-left: 0.5rem;
    }

    &.striped {
      @include gradient-striped(rgba(255, 255, 255, 0.15), -45deg);
      background-size: $progress-height $progress-height;

      &.animated {
        animation: health-bar-stripes $health-bar-animation-timing;
      }
    }

    &.dead {
      width: 100%;
      text-align: center;
      font-size: 2rem;
      color: var(--background-primary);
      font-weight: bold;
    }
  }
}
</style>
