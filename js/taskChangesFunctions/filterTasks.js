import { getElements } from "../getElements/getElements.js";
import { renderTasks } from "./renderTasks.js";

export function filterTasks(filter, arrTasks) {
  let filteredTasks;
  if (filter === "all") {
    filteredTasks = arrTasks;
  }
  if (filter === "complete") {
    filteredTasks = arrTasks.filter((task) => task.done);
  }
  if (filter === "incomplete") {
    filteredTasks = arrTasks.filter((task) => !task.done);
  }
  getElements.tasksList.innerHTML = "";
  filteredTasks.forEach((task) => renderTasks(task));
}
