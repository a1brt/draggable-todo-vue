<template>
  <div class="container column-flex">
    <h2>{{ title }}</h2>
    <div v-if="!noAdd">
      <input v-model="input" type="text" />
      <button @click="handleAdd" type="button">Add</button>
    </div>
    <div class="list column-flex">
      <ListItem
        v-for="(_, id) in listStore"
        :key="id"
        :id="id"
        :store="props.storeName"
        :previous="props.previous"
        :next="props.next"
      />
    </div>
  </div>
</template>

<script setup>
import ListItem from "./ListItem.vue";
import { ref } from "vue";
import { useListsStore } from "../stores/lists.js";

const store = useListsStore();
const props = defineProps({
  title: String,
  noAdd: Boolean,
  storeName: String,
  previous: String,
  next: String,
});
const input = ref("");
const listStore = store[props.storeName];

function handleAdd() {
  if (input.value) {
    const id = Math.floor(Math.random() * 10000);
    store.addToList(props.storeName, input.value);
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