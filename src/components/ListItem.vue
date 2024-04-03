<template>
  <div>
    <div class="task-container">
      <div class="task">
        <span class="text">{{ taskValue }}</span>
        <div class="dropdown">
          <div class="dropdown-icon" @click.self="toggleDropdown"></div>
          <ul class="dropdown-options column-flex" v-if="dropdownActive">
            <li class="dropdown-option">
              <button @click="handleDelete">Delete</button>
            </li>
            <li class="dropdown-option">
              <button @click="toggleInput">Update</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Transition name="slide-fade">
      <div v-if="inputActive" class="input-container">
        <div class="input-wrapper">
          <input class="input" type="text" v-model="taskValue" />
          <button class="save-btn">
            <img
              src="../assets/save-as-icon.svg"
              alt="save"
              width="15"
              height="15"
              @click="handleUpdate"
            />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { useListsStore } from "../stores/lists.js";
import { storeToRefs } from "pinia";
import { watch, ref } from "vue";
import axios from "axios";

const props = defineProps({
  id: { type: String, required: true },
  listId: Number,
  storeIndex: Number,
  maxIndex: Number,
});
const store = useListsStore();
const storeRefs = storeToRefs(store);
const taskValue = ref(storeRefs.lists.value[props.storeIndex].tasks[props.id]);
const dropdownActive = ref(false);
const inputActive = ref(true);

function toggleDropdown() {
  dropdownActive.value = !dropdownActive.value;
}
function toggleInput() {
  toggleDropdown();
  inputActive.value = !inputActive.value;
}

function handleDelete() {
  toggleDropdown();
  if (confirm("Sure?")) {
    axios
      .delete(
        `http://${import.meta.env.VITE_API_BASE_URL}/task_lists/${
          props.listId
        }/tasks/${props.id}`
      )
      .then((response) => {
        store.deleteFromList(props.storeIndex, props.id);
      })
      .catch((error) => {
        console.error("Error deleting:", error);
      });
  }
}

function handleUpdate() {
  inputActive.value = !inputActive.value;
  if (!taskValue.value) {
    alert("Task cannot be empty");
    return;
  }
  axios
    .patch(
      `http://${import.meta.env.VITE_API_BASE_URL}/task_lists/${
        props.listId
      }/tasks/${props.id}`,
      {
        text: taskValue.value,
      }
    )
    .then((response) => {
      store.updateListItem(props.storeIndex, props.id, taskValue.value);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

watch(
  () => storeRefs.lists.value[props.storeIndex].tasks[props.id],
  (val) => {
    taskValue.value = val;
  }
);
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
input:focus {
  outline: none;
}
input {
  border: none;
}
.task-container {
  width: 100%;
  padding: 12px;
  border-radius: 20px;
  background-color: black;
}
.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.dropdown {
  position: relative;
}

.dropdown-icon {
  cursor: pointer;
}

.dropdown-icon:after {
  content: "\2807";
  font-size: 20px;
  color: white;
}

.dropdown-options {
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  position: absolute;
  padding: 2px;
  gap: 2px;
  z-index: 1;
}

.text {
  color: white;
  padding-left: 20px;
}
.input-container {
  display: flex;
  position: relative;
  bottom: 17px;
  height: 40px;
  border: 1px solid black;
  background-color: black;
  align-items: flex-end;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  background-color: white;
  height: 75%;
  width: 100%;
  padding: 0px 10px 0px 30px;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}
.input-form {
  background-color: white;
}
.input {
  padding: 0;
  color: black;
  width: 100%;
  height: 100%;
}

.save-btn {
  background: none;
  height: 100%;
  color: inherit;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  border-radius: 50%;
}
.save-btn:hover {
  background-color: #f3f0f0;
}


.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
}
</style>
