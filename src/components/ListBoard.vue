<template>
  <div class="board">
    <ListContainer
      v-for="(props, index) in store.lists"
      :key="props.id"
      :class="props.id"
      :title="props.title"
      :storeIndex="index"
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
  background: linear-gradient(109.6deg, rgba(0, 0, 0, 0.93) 11.2%, rgb(63, 61, 61) 78.9%);
  padding: 20px;
}
</style>
