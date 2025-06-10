import { allEvents } from "./eventsListeners/eventsListeners.js";
import { addNewTask } from "./taskChangesFunctions/addNewTask.js";
import { renderTasks } from "./taskChangesFunctions/renderTasks.js";
import { lookPrev } from "./previev/lookPrev.js";
import {
  arrTasks,
  loadFromLocalStorage,
} from "./localStorage/saveToLocalStorage.js";
import { updateCounters } from "./updateCounters/updateCounters.js";
import { filterTasks } from "./taskChangesFunctions/filterTasks.js";
import { eventTask } from "./taskChangesFunctions/eventTask.js";

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
