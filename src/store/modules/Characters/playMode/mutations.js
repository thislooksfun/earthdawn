import calculateHealthRatingsFor from '@/helper/calculateHealthRatingsFor'

const clamp = (x, min, max) => Math.min(max, Math.max(x, min));

const addAndClampDamage = (char, dmg) => {
  const { deathThreshold } = calculateHealthRatingsFor(char);
  char.health.currentDamage = clamp(char.health.currentDamage + dmg, 0, deathThreshold)
};

export default {
  DEAL_DAMAGE(state, { uuid, amount }) {
    addAndClampDamage(state.characters[uuid], amount);
  },
  RECOVER_HEALTH(state, { uuid, amount }) {
    addAndClampDamage(state.characters[uuid], -amount);
  },
}