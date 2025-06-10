// import { arrTasks } from "../getElements/getElements.js";
import { saveToLocalStorage } from "../localStorage/saveToLocalStorage.js";
import { lookPrev } from "../previev/lookPrev.js";
import { updateCounters } from "../updateCounters/updateCounters.js";

export function eventTask(event, arrTasks) {
  if (event.target.dataset.action === "delete") {
    const parentElement = event.target.closest(".tasks-list__task");
    const id = Number(parentElement.id);

    const indexTaskFromArrTasks = arrTasks.findIndex((task) => task.id === id);

    arrTasks.splice(indexTaskFromArrTasks, 1);

    parentElement.remove();
    lookPrev(arrTasks);
    saveToLocalStorage(arrTasks);
    updateCounters(arrTasks);
  }
  if (event.target.dataset.action === "complete") {
    const parentElement = event.target.closest(".tasks-list__task");
    const span = event.target;
    const id = Number(parentElement.id);

    const task = arrTasks.find((task) => task.id === id);
    if (task) {
      task.done = !task.done;
      if (task.done) {
        parentElement.classList.add("active");
        span.classList.add("active");
      } else {
        parentElement.classList.remove("active");
        span.classList.remove("active");
      }
      lookPrev(arrTasks);
      saveToLocalStorage(arrTasks);
      updateCounters(arrTasks);
    }
  }
}
