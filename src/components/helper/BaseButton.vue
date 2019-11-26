<template>
  <component
    :is="tag"
    :type="tag === 'button' ? nativeType : ''"
    class="btn"
    :class="classes"
    @click="handleClick"
  >
    <span
      v-if="$slots.icon || (icon && $slots.default)"
      class="btn-inner--icon"
    >
      <slot name="icon">
        <font-awesome-icon :icon="icon" />
      </slot>
    </span>
    <font-awesome-icon v-if="!$slots.default" :icon="icon" />
    <span
      v-if="$slots.icon || (icon && $slots.default)"
      class="btn-inner--text"
    >
      <slot>
        {{ text }}
      </slot>
    </span>
    <slot v-if="!$slots.icon && !icon" />
  </component>
</template>

<script>
export default {
  name: "SimpleButton",
  props: {
    tag: {
      type: String,
      default: "button",
      description: "Button tag (default -> button)",
    },
    type: {
      type: String,
      default: "default",
      description: "Button type (e,g primary, danger etc)",
    },
    size: {
      type: String,
      default: "",
      description: "Button size lg|sm",
    },
    textColor: {
      type: String,
      default: "",
      description: "Button text color (e.g primary, danger etc)",
    },
    nativeType: {
      type: String,
      default: "button",
      description: "Button native type (e.g submit,button etc)",
    },
    icon: {
      type: [Object, Array, String],
      default: "",
      description: "Button icon",
    },
    text: {
      type: String,
      default: "",
      description: "Button text in case not provided via default slot",
    },
    outline: {
      type: Boolean,
      default: false,
      description: "Whether button style is outline",
    },
    rounded: {
      type: Boolean,
      default: false,
      description: "Whether button style is rounded",
    },
    iconOnly: {
      type: Boolean,
      default: false,
      description: "Whether button contains only an icon",
    },
    block: {
      type: Boolean,
      default: false,
      description: "Whether button is of block type",
    },
  },
  computed: {
    classes() {
      let btnClasses = [
        { "btn-block": this.block },
        { "rounded-circle": this.rounded },
        { "btn-icon-only": this.iconOnly },
        { [`text-${this.textColor}`]: this.textColor },
        { "btn-icon": this.icon || this.$slots.icon },
        this.type && !this.outline ? `btn-${this.type}` : "",
        this.outline ? `btn-outline-${this.type}` : "",
      ];
      if (this.size) {
        btnClasses.push(`btn-${this.size}`);
      }
      return btnClasses;
    },
  },
  methods: {
    handleClick(evt) {
      this.$emit("click", evt);
    },
  },
};
</script>

<style lang="scss">
// General
.btn {
  position: relative;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  will-change: transform;
  letter-spacing: 0.025em;
  font-size: 0.875rem;

  &:hover {
    @include box-shadow(
      0 7px 14px rgba(50, 50, 93, 0.1),
      0 3px 6px rgba(0, 0, 0, 0.08)
    );
    transform: translateY(-1px);
  }

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
}

.btn-group,
.input-group {
  .btn {
    margin-right: 0;
    transform: translateY(0);
  }
}

// Sizes

.btn-sm {
  font-size: 0.75rem;
}

.btn-lg {
  font-size: 0.875rem;
}

// Fixes

[class*="btn-outline-"] {
  border-width: 1px;
}
.btn-outline-secondary {
  color: darken(theme-color("secondary"), 50%);
}

.btn-inner--icon {
  i:not(.fa) {
    position: relative;
    top: 2px;
  }
}

.btn-link {
  font-weight: $btn-font-weight;
  box-shadow: none;

  &:hover {
    box-shadow: none;
    transform: none;
  }
}

.btn-neutral {
  color: theme-color("primary");
}

// Icons

.btn svg:not(:first-child),
.btn i:not(:first-child) {
  margin-left: 0.5rem;
}

.btn svg:not(:last-child),
.btn i:not(:last-child) {
  margin-right: 0.5rem;
}

// Icon labels

.btn-icon-label {
  position: relative;

  .btn-inner--icon {
    position: absolute;
    height: 100%;
    line-height: 1;
    border-radius: 0;
    text-align: center;
    margin: 0;
    width: 3em;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .btn-inner--icon:not(:first-child) {
    right: 0;
    top: 0;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
  }
  .btn-inner--icon:not(:last-child) {
    left: 0;
    top: 0;
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
  }
  .btn-inner--icon svg {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  .btn-inner--text:not(:first-child) {
    padding-left: 3em;
  }
  .btn-inner--text:not(:last-child) {
    padding-right: 3em;
  }
}

// Icons
.btn-icon {
  .btn-inner--icon {
    img {
      width: 20px;
    }
  }
  .btn-inner--text:not(:first-child) {
    margin-left: 0.75em;
  }
  .btn-inner--text:not(:last-child) {
    margin-right: 0.75em;
  }
}

.btn-icon-only {
  width: 2.375rem;
  height: 2.375rem;
  padding: 0;
}
a.btn-icon-only {
  line-height: 2.5;
}
.btn-icon-only.btn-sm {
  width: 2rem;
  height: 2rem;
}
</style>
