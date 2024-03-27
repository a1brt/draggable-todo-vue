<template>
  <div class="list-item">
    <div class="item-form" action="">
      <input
        type="text"
        v-model="storeRefs.lists.value[props.storeIndex].tasks[props.id]"
      />
      <div class="button-container">
        <button type="button" class="delete" @click="handleDelete">
          <img width="20" height="20" src="../assets/delete.svg" alt="delete" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useListsStore } from "../stores/lists.js";
import { storeToRefs } from "pinia";
import { watch } from "vue";

const props = defineProps({
  id: { type: String, required: true },
  storeIndex: Number,
  maxIndex: Number,
});
const store = useListsStore();
const storeRefs = storeToRefs(store);

function handleDelete() {
  store.deleteFromList(props.storeIndex, props.id);
}

function updateValue(newValue) {
  store.updateListItem(props.storeIndex, props.id, newValue);
}

watch(
  () => storeRefs.lists.value[props.storeIndex].tasks[props.id],
  (val) => {
    store.updateListItem(props.storeIndex, props.id, val);
  }
);
</script>

<style scoped>
.list-item {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  background-color: black;
}
.item-form {
  display: flex;
  justify-content: center;
}
.button-container {
  display: flex;
}
.delete {
  margin: 0;
  padding: 0;
}
</style>
