import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useListsStore = defineStore("lists", {
  state: () => ({
    lists: [
      {
        id: "todo",
        title: "Todo",
        tasks: {},
      },
      {
        id: "progress",
        title: "In Progress",
        noAdd: true,
        tasks: {},
      },
      {
        id: "done",
        title: "Done",
        noAdd: true,
        tasks: {},
      },
    ],
  }),
  actions: {
    addToList(listName, text) {
      const id = uuidv4();
      this.lists[listName].tasks[id] = text;
    },

    deleteFromList(listName, id) {
      delete this.lists[listName].tasks[id];
    },

    changeLists(oldListIndex, newListIndex, id) {
      const item = this.lists[oldListIndex].tasks[id];
      delete this.lists[oldListIndex].tasks[id];
      this.lists[newListIndex].tasks[id] = item;
    },
    
    updateListItem(listNmae, id, newValue) {
      this.lists[listNmae].tasks[id] = newValue;
    },
  },
});
