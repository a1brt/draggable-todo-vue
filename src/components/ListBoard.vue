<template>
  <div class="board">
    <ListContainer
      v-for="(props, index) in store.lists"
      :key="props.id"
      :class="props.id"
      :title="props.title"
      :store="index"
      :no-add="props.noAdd"
      :max-index="store.lists.length - 1"
    />
  </div>
</template>

<script setup lang="ts">
import ListContainer from "./ListContainer.vue";
import { useListsStore } from "../stores/lists.js";

const store = useListsStore();
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
