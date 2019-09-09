import Vue from "vue";

export default {
  SET_NAME(state, { uuid, name }) {
    state.characters[uuid].name = name;
  },
  SET_PLAYER_NAME(state, { uuid, name }) {
    state.characters[uuid].playerName = name;
  },
  SET_PORTRAIT(state, { uuid, portrait }) {
    state.characters[uuid].portrait = portrait;
  },
  SET_DESCRIPTION(state, { uuid, desc }) {
    state.characters[uuid].desc = desc;
  },
  SET_PASSION(state, { uuid, passion }) {
    state.characters[uuid].passion = passion;
  },
  SET_RACE(state, { uuid, race }) {
    state.characters[uuid].race = race;
  },

  SET_DISCIPLINE(state, { uuid, discipline }) {
    state.characters[uuid].discipline = discipline;
  },
  SET_CIRCLE(state, { uuid, circle }) {
    state.characters[uuid].circle = circle;
  },

  // TODO: Figure out exact API for these
  // SET_LEGEND_POINTS(state, { uuid }) { },
  // SET_KARMA(state, { uuid }) { },

  ADD_WEAPON(state, { uuid, weapon }) {
    Vue.set(state.characters[uuid].weapons, weapon, null);
  },
  REMOVE_WEAPON(state, { uuid, weapon }) {
    Vue.delete(state.characters[uuid].weapons, weapon);
  },

  // Discipline Talents
  ADD_DISCIPLINE_TALENT(state, { uuid, talent, free, rank }) {
    Vue.set(state.characters[uuid].talents.discipline, talent, { free, rank });
  },
  SET_DISCIPLINE_TALENT_RANK(state, { uuid, talent, rank }) {
    state.characters[uuid].talents.discipline[talent].rank = rank;
  },
  REMOVE_DISCIPLINE_TALENT(state, { uuid, talent }) {
    Vue.delete(state.characters[uuid].talents.discipline, talent);
  },

  // Other Talents
  ADD_OTHER_TALENT(state, { uuid, talent, rank }) {
    Vue.set(state.characters[uuid].talents.other, talent, { rank });
  },
  SET_OTHER_TALENT_RANK(state, { uuid, talent, rank }) {
    state.characters[uuid].talents.other[talent].rank = rank;
  },
  REMOVE_OTHER_TALENT(state, { uuid, talent }) {
    Vue.delete(state.characters[uuid].talents.other, talent);
  },

  // Skills
  ADD_SKILL(state, { uuid, skill, isTalent, rank }) {
    Vue.set(state.characters[uuid].skills, skill, { isTalent, rank });
  },
  SET_SKILL_RANK(state, { uuid, skill, rank }) {
    state.characters[uuid].skills[skill].rank = rank;
  },
  REMOVE_SKILL(state, { uuid, skill }) {
    Vue.delete(state.characters[uuid].skills, skill);
  },

  // Languages
  SET_SPOKEN_LANGUAGES(state, { uuid, languages }) {
    state.characters[uuid].languages.spoken = languages;
  },
  SET_LITERATE_LANGUAGES(state, { uuid, languages }) {
    state.characters[uuid].languages.literate = languages;
  },

  CREATION_WIZARD_FIRST_STAGE(state, { uuid }) {
    state.characters[uuid].creationWizardStage = 0;
  },
  CREATION_WIZARD_NEXT_STAGE(state, { uuid }) {
    // TODO: UPDATE THE MAX STAGE
    if (state.characters[uuid].creationWizardStage == 9) {
      state.characters[uuid].creationWizardStage = null;
    } else {
      state.characters[uuid].creationWizardStage++;
    }
  },
  CREATION_WIZARD_PREV_STAGE(state, { uuid }) {
    state.characters[uuid].creationWizardStage--;
  },
  ADD_EFFECT(state, { uuid, name, value }) {
    Vue.set(state.characters[uuid]["effects!"], name, value);
  },
};
