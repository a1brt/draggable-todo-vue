<template>
  <div class="list-item">
    <div class="item-form" action="">
      <input
        type="text"
        :value="storeRefs.lists.value[props.storeIndex].tasks[props.id]"
        @input="updateValue($event.target.value)"
      />
      <div class="button-container">
        <button
          type="button"
          class="previous"
          :class="{ hidden: props.storeIndex === 0 }"
          @click="changeList(props.storeIndex - 1)"
        >
          ←
        </button>
        <button
          type="button"
          class="next"
          :class="{ hidden: props.storeIndex === props.maxIndex }"
          @click="changeList(props.storeIndex + 1)"
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
  id: { type: String, required: true },
  storeIndex: Number,
  maxIndex: Number,
});
console.log("is", props.id);
const store = useListsStore();
const storeRefs = storeToRefs(store);

function handleDelete() {
  store.deleteFromList(props.storeIndex, props.id);
}
function changeList(targetListIndex) {
  store.changeLists(props.storeIndex, targetListIndex, props.id);
}

function updateValue(newValue) {
  store.updateListItem(props.storeIndex, props.id, newValue);
}

watch(
  () => storeRefs.lists.value[props.storeIndex].tasks[props.id],
  (val) => {
    if (!val) {
      store.deleteFromList(props.storeIndex, props.id);
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
