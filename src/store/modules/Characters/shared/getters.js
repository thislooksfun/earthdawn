import router from "@/router";
const routedUUID = () => router.currentRoute.params.uuid;

export default {
  allCharacters: state => {
    let ch = state.characters;
    for (const key in ch) {
      ch[key].uuid = key;
    }
    return ch;
  },

  currentCharacter: state => {
    const uuid = routedUUID();
    return uuid == null ? null : state.characters[uuid];
  },
};
