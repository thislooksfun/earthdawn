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

  // Talent Options
  setTalentOption({ commit }, { slot, name, rank }) {
    console.log(
      `Setting talent option slot ${slot} to ${name} at rank ${rank}`
    );
    commit("SET_TALENT_OPTION", { uuid: routedUUID(), slot, name, rank });
  },

  // TODO: Implement Skills

  // Creation Wizard
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

  // Misc
  addEffect({ commit }, { name, value }) {
    commit("ADD_EFFECT", { uuid: routedUUID(), name, value });
  },
  // 'circle' is 1-based
  // TODO: Implement this:
  // circleUp({ commit, dispatch, state }, { circle }) {
  //   // const uuid = routedUUID();
  //   // // NOTE: This creates a CLONE of the character object, so any setters here
  //   // // won't work (though they shouldn't be used outside of the mutator itself
  //   // // anyway).
  //   // const char = decorate(state.characters[uuid]);

  //   // // Set circle
  //   // commit("SET_CIRCLE", { uuid, circle });

  //   // // Create any missing talent slots
  //   // commit("ADD_TALENT_OPTIONS_UNTIL", { uuid, circle });

  //   // Assign discipline talents
  //   // circle index here is 0-based
  //   const dTalents = char.discipline.circle[circle - 1];
  //   console.log(dTalents);
  // },
};
