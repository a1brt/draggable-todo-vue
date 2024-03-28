<template>
  <div class="task-list">
    <div class="task">
      <input
        class="task-input"
        type="text"
        v-model="storeRefs.lists.value[props.storeIndex].tasks[props.id]"
        @blur="l"
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
  if (confirm("Sure?")) {
    store.deleteFromList(props.storeIndex, props.id);
  }
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
.task-list {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  background-color: black;
}
.task {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.button-container {
  display: flex;
}
.delete {
  display: flex;
  padding: 2px;
  border-radius: 50%;
}

.task-input {
  background: none;
  border: none;
  color: white;
  padding-left: 20px;
}
</style>
