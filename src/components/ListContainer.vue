<template>
  <div class="container column-flex">
    <h2>{{ title }}</h2>
    <draggable
      v-model="taskList"
      tag="div"
      class="list column-flex"
      group="tasks"
      item-key="id"
    >
      <template #item="{ element: item, id }">
        <ListItem
          :key="id"
          :id="item[0]"
          :storeIndex="props.storeIndex"
          :max-index="props.maxIndex"
        />
      </template>
    </draggable>
    <div>
      <input v-model="input" type="text" />
      <button @click="handleAdd" type="button">Add</button>
    </div>
  </div>
</template>

<script setup>
import ListItem from "./ListItem.vue";
import { ref, computed } from "vue";
import { useListsStore } from "../stores/lists.js";
import draggable from "vuedraggable";

const store = useListsStore();
const props = defineProps({
  title: String,
  storeIndex: Number,
  maxIndex: Number,
});
const input = ref("");
const listStore = store.lists[props.storeIndex].tasks;
const taskList = computed({
  get: () => {
    return Object.entries(listStore);
  },
  set: (newValue) => {
    Object.keys(listStore).forEach((key) => delete listStore[key]);
    newValue.forEach((e) => {
      listStore[e[0]] = e[1];
    });
  },
});

function handleAdd() {
  if (input.value) {
    store.addToList(props.storeIndex, input.value);
    input.value = "";
  }
}

</script>

<style scoped>
h2 {
  width: 100%;
  text-align: start;
}

.container {
  align-items: center;
  min-width: 20%;
  background-color: white;
  border-radius: 20px;
  padding: 0px 20px 10px 20px;
  gap: 20px;
  height: fit-content;
}

.list {
  width: 100%;
  gap: 15px;
  padding: 10px;
}
</style>
