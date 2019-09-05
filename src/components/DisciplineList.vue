<template>
  <div class="discipline-list">
    <h1>Disciplines</h1>
    
    <ol>
      <li v-for="discipline in disciplines" :key="discipline.name">
        {{discipline.name}}
      </li>
    </ol>
  </div>
</template>

<script>
import disciplines from 'Disciplines'
export default {
  data() {
    return {
      disciplines
    }
  }
}
</script>

<style>

</style>