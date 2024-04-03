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
          :list-id="props.listId"
          :storeIndex="props.storeIndex"
        />
      </template>
    </draggable>
    <div class="list-footer">
      <div v-if="!addingTask" class="input-switch">
        <button
          class="switch-button unstyled-button"
          @click="toggleAdd"
          type="button"
        >
          Add a task
        </button>
      </div>
      <form
        v-if="addingTask"
        @keydown.enter.prevent
        action=""
        class="task-input-form"
      >
        <input v-model="input" type="text" />
        <button
          class="unstyled-button input-button"
          @click="handleAdd"
          type="button"
        >
          Add
        </button>
        <button
          class="unstyled-button input-button"
          @click="toggleAdd"
          type="button"
        >
          X
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import ListItem from "./ListItem.vue";
import { ref, toRefs, computed } from "vue";
import { useListsStore } from "../stores/lists.js";
import draggable from "vuedraggable";
import axios from "axios";

const store = useListsStore();
const props = defineProps({
  title: String,
  storeIndex: Number,
  listId: Number,
  toggleListDrag: Object,
});
const input = ref("");
const addingTask = ref(false);
const { tasks } = toRefs(store.lists[props.storeIndex]);

const taskList = computed({
  get: () => {
    return Object.entries(tasks.value);
  },
  set: (newValue) => {
    const listStore = {};
    const taskIds = Object.keys(tasks.value);
    newValue.forEach((e,i) => {
      if (!taskIds.includes(e[0])) {
        changeTasksList(e[0]);
      }
      listStore[e[0]] = e[1];
    });
    store.setListsTasks(listStore, props.storeIndex);
  },
});

function toggleAdd() {
  input.value = "";
  addingTask.value = !addingTask.value;
}

async function handleAdd() {
  if (!input.value) return;
  try {
    const response = await axios.post(
      `http://${import.meta.env.VITE_API_BASE_URL}/task_lists/${props.listId}/tasks`,
      { text: input.value }
    );

    store.addToList(props.storeIndex, response.data.text, response.data.id);
    toggleAdd();
  } catch (error) {
    console.error("Error:", error);
  }
}


function changeTasksList(taskId) {
  axios
    .patch(
      `http://${import.meta.env.VITE_API_BASE_URL}/task_lists/${
        props.listId
      }/tasks/${taskId}`,
      {
        task_list_id: props.listId,
      }
    )
    .then((response) => {})
    .catch((error) => {
      console.error("Error:", error);
    });
}
</script>

<style scoped>
h2 {
  width: 100%;
  text-align: start;
}
.unstyled-button {
  font: inherit;
  cursor: pointer;
  outline: inherit;
}
.container {
  align-items: center;
  min-width: 270px;
  background-color: white;
  border-radius: 20px;
  padding: 0px 20px 10px 20px;
  gap: 20px;
  height: fit-content;
}

.list {
  width: 100%;
  gap: 15px;
}

.list-footer {
  width: 100%;
}

.task-input-form {
  display: flex;
  gap: 2px;
  padding: 5px 6px;
  border-radius: 12px;
  background-color: black;
}
.switch-button {
  background: none;
  color: inherit;
  border: 1px solid black;
  border-radius: 12px;
  padding: 3px 5px;
}
.switch-button:hover {
  background: black;
  color: white;
}

.input-button {
  background-color: white;
  border: 0;
  border-radius: 5px;
}
</style>
