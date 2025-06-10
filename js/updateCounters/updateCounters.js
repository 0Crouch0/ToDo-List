import { getElements } from "../getElements/getElements.js";

export function updateCounters(arrTasks) {
  getElements.taskCounter.textContent = `${arrTasks.length}`;
  if (
    Number(
      (getElements.completeCounter.textContent = `${
        arrTasks.filter((task) => task.done).length
      }`)
    ) === 0
  ) {
    getElements.completeCounter.textContent = `${0}`;
  } else {
    getElements.completeCounter.textContent = `${
      arrTasks.filter((task) => task.done).length
    } - ${arrTasks.length}`;
  }
}
