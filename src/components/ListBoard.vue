<template>
  <div class="board">
    <ListContainer
      class="todo"
      title="todo"
      store-name="todo"
      next="progress"
    />
    <ListContainer
      class="progress"
      title="in progress"
      store-name="progress"
      no-add=true
      previous="todo"
      next="done"
    />
    <ListContainer
      class="done"
      title="done"
      store-name="done"
      no-add=true
      previous="progress"
    />
  </div>
</template>

<script setup lang="ts">
import ListContainer from "./ListContainer.vue";
</script>

<style scoped>
.board {
  display: flex;
  justify-content: space-around;
  background-color: antiquewhite;
  padding: 20px;
  min-height: 80%;
}
</style>
