import decorate from "@/charDecorator";

const clamp = (x, min, max) => Math.min(max, Math.max(x, min));

const addAndClampDamage = (char, dmg) => {
  const {
    health: { deathThreshold },
  } = decorate(char);
  char.health.currentDamage = clamp(
    char.health.currentDamage + dmg,
    0,
    deathThreshold
  );
};

const useAndClampKarma = (char, amnt) => {
  const {
    karma: { max },
  } = decorate(char);
  char.karma.used = clamp(char.karma.used + amnt, 0, max);
};

export default {
  DEAL_DAMAGE(state, { uuid, amount }) {
    addAndClampDamage(state.characters[uuid], amount);
  },
  RECOVER_HEALTH(state, { uuid, amount }) {
    addAndClampDamage(state.characters[uuid], -amount);
  },
  CAUSE_WOUND(state, { uuid }) {
    state.characters[uuid].health.wounds++;
  },
  HEAL_WOUND(state, { uuid }) {
    state.characters[uuid].health.wounds--;
  },

  // Karma
  USE_KARMA(state, { uuid }) {
    useAndClampKarma(state.characters[uuid], 1);
  },
};
