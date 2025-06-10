import { getElements } from "../getElements/getElements.js";
import { updateCounters } from "../updateCounters/updateCounters.js";
import { saveToLocalStorage } from "../localStorage/saveToLocalStorage.js";
import { lookPrev } from "../previev/lookPrev.js";
import { renderTasks } from "./renderTasks.js";

export function addNewTask(event, arrTasks) {
  event.preventDefault();

  const taskText = getElements.input.value.trim();

  if (taskText === "" || !taskText || taskText.length < 5) {
    return;
  }

  getElements.taskCounter.textContent = 0;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  arrTasks.push(newTask);
  renderTasks(newTask);
  lookPrev(arrTasks);
  saveToLocalStorage(arrTasks);
  updateCounters(arrTasks);
  getElements.input.focus();
  getElements.input.value = "";
}
