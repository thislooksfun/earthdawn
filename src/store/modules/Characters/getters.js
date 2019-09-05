import router from '@/router'

export default {
  allCharacters: (state) => {
    let ch = state.characters
    for (const key in ch) {
      ch[key].uuid = key
    }
    return ch
  },
  selectedCharacter: (state) => {
    const uuid = router.currentRoute.params.uuid
    return uuid == null ? null : state.characters[uuid];
  }
}