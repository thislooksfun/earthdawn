<template>
  <div class="talent-list">
    <h1>Talents</h1>
    
    <ol>
      <li v-for="talent in talents" :key="talent.name">
        {{talent.name}}
      </li>
    </ol>
  </div>
</template>

<script>
import talents from 'Talents'
export default {
  data() {
    return {
      talents
    }
  }
}
</script>

<style>

</style>