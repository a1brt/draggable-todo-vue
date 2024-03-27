<template>
  <div class="container column-flex">
    <h2>{{ title }}</h2>
    <div v-if="!noAdd">
      <input v-model="input" type="text" />
      <button @click="handleAdd" type="button">Add</button>
    </div>
    <div class="list column-flex">
      <draggable v-model="taskList" tag="div" group="tasks">
        <template #item="{ element: item, id }">
          <ListItem
            :key="id"
            :id="item[0]"
            :storeIndex="props.storeIndex"
            :max-index="props.maxIndex"
          />
        </template>
      </draggable>
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
  noAdd: Boolean,
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
p {
  text-align: center;
}

.container {
  align-items: center;
  min-height: 90%;
  width: 269px;
  background-color: #cecece;
}

.list {
  width: 100%;
  gap: 15px;
  padding: 10px;
}
</style>
