<template>
  <draggable
    class="board"
    v-model="store.lists"
    tag="div"
    item-key="id"
    :disabled="disableDrag"
  >
    <template #item="{ element: item, index }">
      <ListContainer
        :class="item.tag"
        :title="item.title"
        :list-id="item.id"
        :storeIndex="index"
      />
    </template>
  </draggable>
</template>

<script setup>
import ListContainer from "./ListContainer.vue";
import { useListsStore } from "../stores/lists.js";
import draggable from "vuedraggable";
import { watch, ref, onMounted } from "vue";
import axios from "axios";

const store = useListsStore();
const disableDrag = ref(false);

function loadData() {
  axios
    .get(`http://${import.meta.env.VITE_API_BASE_URL}/task_lists`)
    .then((response) => {
      store.setLists(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateListOrderNumber(listId, orderNumber) {
  console.log(listId, orderNumber);
  axios
    .patch(`http://${import.meta.env.VITE_API_BASE_URL}/task_lists/${listId}`, {
      order_number: orderNumber,
    })
    .then((response) => {})
    .catch((error) => {
      console.error("Error:", error);
    });
}

watch(
  () => store.lists,
  () => {
    const data = store.lists.map((element, index) => {
      return {
        id: element.id,
        order_number: index,
      };
    });
    axios
      .patch(`http://${import.meta.env.VITE_API_BASE_URL}/task_lists/bulk`, {
        data: data,
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  }
);
onMounted(() => {
  loadData();
});
</script>

<style scoped>
.board {
  display: flex;
  justify-content: space-around;
  background: linear-gradient(
    109.6deg,
    rgba(0, 0, 0, 0.93) 11.2%,
    rgb(63, 61, 61) 78.9%
  );
  padding: 20px;
  overflow-x: scroll;
}
</style>
