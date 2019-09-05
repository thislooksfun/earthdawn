<template>
  <div class="character-sheet">
    Character Sheet for {{character.name}} (uuid: {{character.uuid}})
    
    <talent-list />
    <discipline-list />
  </div>
</template>

<script>
import TalentList from '@/components/TalentList'
import DisciplineList from '@/components/DisciplineList'

export default {
  components: {
    TalentList,
    DisciplineList
  },
  data() {
    const uuid = this.$route.params.uuid;
    const character = this.$store.state.Characters.characters[uuid];
    return {
      character
    }
  }
}
</script>

<style>

</style>