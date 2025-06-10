import {
  addNewTask,
  filterTasks,
  eventTask,
  renderTasks,
  allEvents,
} from "./taskChangesFunctions/taskManager.js";
import { lookPrev } from "./previev/lookPrev.js";
import {
  arrTasks,
  loadFromLocalStorage,
} from "./localStorage/saveToLocalStorage.js";
import { updateCounters } from "./updateCounters/updateCounters.js";

function init() {
  const loadedTasks = loadFromLocalStorage();
  loadedTasks.forEach((task) => renderTasks(task));

  updateCounters(arrTasks);
  lookPrev(arrTasks);

  allEvents(
    (event) => addNewTask(event, arrTasks),
    (event) => eventTask(event, arrTasks),
    (filter) => filterTasks(filter, arrTasks)
  );
}

init();
