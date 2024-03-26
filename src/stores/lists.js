import { defineStore } from "pinia";

export const useListsStore = defineStore("lists", {
  state: () => ({
    todo: {},
    progress: {},
    done: {},
  }),
  actions: {
    addToList(listName, text) {
      const keys = Object.keys(this[listName]);
      const id = keys.length ? keys.pop() + 1 : 0;
      this[listName][id] = text;
    },
    deleteFromList(listName, id) {
      delete this[listName][id];
    },
    changeLists(oldListName, newListName, id) {
      const item = this[oldListName][id];
      delete this[oldListName][id];
      this[newListName][id] = item;
    },
    updateListItem(listNmae, id, newValue) {
      this[listNmae][id] = newValue;
    },
  },
});
