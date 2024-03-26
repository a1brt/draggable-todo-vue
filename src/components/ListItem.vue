<template>
  <div class="list-item">
    <div class="item-form" action="">
      <input
        type="text"
        :value="storeRefs.lists.value[props.store].tasks[props.id]"
        @input="updateValue($event.target.value)"
      />
      <div class="button-container">
        <button
          type="button"
          class="previous"
          :class="{ hidden: props.store === 0 }"
          @click="changeList(props.store - 1)"
        >
          ←
        </button>
        <button
          type="button"
          class="next"
          :class="{ hidden: props.store === props.maxIndex }"
          @click="changeList(props.store + 1)"
        >
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
  maxIndex: Number,
});
const store = useListsStore();
const storeRefs = storeToRefs(store);

function handleDelete() {
  store.deleteFromList(props.store, props.id);
}
function changeList(targetListIndex) {
  store.changeLists(props.store, targetListIndex, props.id);
}

function updateValue(newValue) {
  store.updateListItem(props.store, props.id, newValue);
}

watch(
  () => storeRefs.lists.value[props.store].tasks[props.id],
  (val) => {
    if (!val) {
      store.deleteFromList(props.store, props.id);
    }
  }
);
</script>

<style scoped>
.list-item {
  width: 100%;
  border: 0px solid;
  border-radius: 2px;
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
