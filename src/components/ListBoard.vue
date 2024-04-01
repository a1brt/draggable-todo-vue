<template>
  <draggable
    class="board"
    v-model="store.lists"
    tag="div"
    item-key="id"
    :disabled="disableDrag"
  >
    <template #item="{ element: item, index }">
      <ListContainer
        :class="item.tag"
        :title="item.title"
        :storeIndex="index"
        :max-index="store.lists.length - 1"
      />
    </template>
  </draggable>
</template>

<script setup lang="ts">
import ListContainer from "./ListContainer.vue";
import { useListsStore } from "../stores/lists.js";
import draggable from "vuedraggable";
import { ref } from "vue";

const store = useListsStore();
const disableDrag = ref(false);
</script>

<style scoped>
.board {
  display: flex;
  justify-content: space-around;
  background: linear-gradient(
    109.6deg,
    rgba(0, 0, 0, 0.93) 11.2%,
    rgb(63, 61, 61) 78.9%
  );
  padding: 20px;
}
</style>
