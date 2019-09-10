// All actions defined in this file will be prefixed with 'cc'
// Example: setName -> ccSetName

import router from "@/router";
import races from "Races";

const routedUUID = () => router.currentRoute.params.uuid;

export default {
  setName({ commit }, name) {
    commit("SET_NAME", { uuid: routedUUID(), name });
  },
  setPlayerName({ commit }, name) {
    commit("SET_PLAYER_NAME", { uuid: routedUUID(), name });
  },
  setPortrait({ commit }, portrait) {
    commit("SET_PORTRAIT", { uuid: routedUUID(), portrait });
  },
  setDescription({ commit }, desc) {
    commit("SET_DESCRIPTION", { uuid: routedUUID(), desc });
  },
  setPassion({ commit }, passion) {
    commit("SET_PASSION", { uuid: routedUUID(), passion });
  },
  setRace({ commit }, race) {
    const racialLang = races.singular[race].spokenLanguage;
    const languages =
      racialLang == null ? ["Throalic"] : ["Throalic", racialLang];

    commit("SET_RACE", { uuid: routedUUID(), race });
    commit("SET_SPOKEN_LANGUAGES", { uuid: routedUUID(), languages });
  },

  setDiscipline({ commit }, discipline) {
    commit("SET_DISCIPLINE", { uuid: routedUUID(), discipline });
  },
  setCircle({ commit }, circle) {
    commit("SET_CIRCLE", { uuid: routedUUID(), circle });
  },

  // TODO: Figure out exact API for these
  // setLegendPoints() {},
  // setKarma() {},

  addWeapon({ commit }, weapon) {
    commit("ADD_WEAPON", { uuid: routedUUID(), weapon });
  },
  removeWeapon({ commit }, weapon) {
    commit("REMOVE_WEAPON", { uuid: routedUUID(), weapon });
  },

  // Discipline Talents
  setTalentRank({ commit }, { talent, rank }) {
    console.log(`Setting talent ${talent} to rank ${rank}`);
    commit("SET_TALENT_RANK", { uuid: routedUUID(), talent, rank });
  },

  // Other Talents
  addOtherTalent({ commit }, { talent, rank = 0 }) {
    commit("ADD_OTHER_TALENT", { uuid: routedUUID(), talent, rank });
  },
  setOtherTalentRank({ commit }, { talent, rank = 0 }) {
    commit("SET_OTHER_TALENT_RANK", { uuid: routedUUID(), talent, rank });
  },
  removeOtherTalent({ commit }, { talent }) {
    commit("REMOVE_OTHER_TALENT", { uuid: routedUUID(), talent });
  },

  // Skills
  addSkill({ commit }, { skill, isTalent = false, rank = 0 }) {
    commit("ADD_SKILL", { uuid: routedUUID(), skill, isTalent, rank });
  },
  setSkillRank({ commit }, { skill, rank = 0 }) {
    commit("SET_SKILL_RANK", { uuid: routedUUID(), skill, rank });
  },
  removeSkill({ commit }, { skill }) {
    commit("REMOVE_SKILL", { uuid: routedUUID(), skill });
  },

  creationWizardFirstStage({ commit }) {
    commit("CREATION_WIZARD_FIRST_STAGE", { uuid: routedUUID() });
  },
  creationWizardPrevStage({ commit }) {
    commit("CREATION_WIZARD_PREV_STAGE", { uuid: routedUUID() });
  },
  creationWizardNextStage({ commit }) {
    commit("CREATION_WIZARD_NEXT_STAGE", { uuid: routedUUID() });
  },
  creationWizardClose({ commit }) {
    commit("CREATION_WIZARD_CLOSE", { uuid: routedUUID() });
  },
  addEffect({ commit }, { name, value }) {
    commit("ADD_EFFECT", { uuid: routedUUID(), name, value });
  },
};
