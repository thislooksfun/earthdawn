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

  // Talents
  SET_TALENT_RANK(state, { uuid, talent, rank }) {
    if (rank == 0) {
      Vue.delete(state.characters[uuid].talents, talent);
    } else {
      Vue.set(state.characters[uuid].talents, talent, rank);
    }
  },

  // Talent Options
  SET_TALENT_OPTION(state, { uuid, slot, name, rank }) {
    Vue.set(state.characters[uuid].talentOptions, slot, { name, rank });
  },

  // Skills
  ADD_SKILL(state, { uuid, name, rank, type }) {
    if (name in state.characters[uuid].skills) {
      throw new Error(`Skill ${name} already exists!`);
    }
    Vue.set(state.characters[uuid].skills, name, { rank, type });
  },

  // Languages
  SET_SPOKEN_LANGUAGES(state, { uuid, languages }) {
    state.characters[uuid].languages.spoken = languages;
  },
  SET_LITERATE_LANGUAGES(state, { uuid, languages }) {
    state.characters[uuid].languages.literate = languages;
  },

  // Creation Wizard
  CREATION_WIZARD_FIRST_STAGE(state, { uuid }) {
    state.characters[uuid].creationWizardStage = 0;
  },
  CREATION_WIZARD_NEXT_STAGE(state, { uuid }) {
    state.characters[uuid].creationWizardStage++;
  },
  CREATION_WIZARD_CLOSE(state, { uuid }) {
    state.characters[uuid].creationWizardStage = null;
  },
  CREATION_WIZARD_PREV_STAGE(state, { uuid }) {
    state.characters[uuid].creationWizardStage--;
  },

  // Misc
  ADD_EFFECT(state, { uuid, name, value }) {
    Vue.set(state.characters[uuid]["effects!"], name, value);
  },
};
