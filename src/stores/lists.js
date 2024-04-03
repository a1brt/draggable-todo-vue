import { defineStore } from "pinia";

export const useListsStore = defineStore("lists", {
  state: () => ({
    lists: [],
  }),
  actions: {
    addToList(listName, text, id) {
      this.lists[listName].tasks[id] = text;
    },

    deleteFromList(listName, id) {
      delete this.lists[listName].tasks[id];
    },

    updateListItem(listName, id, newValue) {
      this.lists[listName].tasks[id] = newValue;
    },

    setLists(data) {
      this.lists = data;
    },

    setListsTasks(tasks, listIndex) {
      this.lists[listIndex].tasks = tasks;
    },
  },
});
