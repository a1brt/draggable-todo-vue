<template>
  <div class="list-item">
    <div class="item-form" action="">
      <input type="text" :value="list[props.store].value[props.id]" @input="updateValue($event.target.value)" />
      <div class="button-container">
        <button type="button" class="next" @click="changeList(props.previous)">
          ←
        </button>
        <button type="button" class="previous" @click="changeList(props.next)">
          →
        </button>
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
  id: { type: Number, required: true },
  store: String,
  previous: String,
  next: String,
});
const store = useListsStore();
const list = storeToRefs(store);

function handleDelete() {
  store.deleteFromList(props.store, props.id);
}
function changeList(listName) {
  if (listName) store.changeLists(props.store, listName, props.id);
}

function updateValue(newValue) {
  store.updateListItem(props.store, props.id, newValue);
}

watch(() => list[props.store].value[props.id], (val) => {
  if (!val) {
    store.deleteFromList(props.store, props.id);
  }
});
</script>

<style scoped>
.list-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: rgb(247, 247, 247);
  border: 0px solid;
  border-radius: 2px;
}
.item-form {
  display: flex;
  margin: 0 auto;
}
.button-container {
  display: flex;
}
.delete {
  margin: 0;
  padding: 0;
}
</style>
